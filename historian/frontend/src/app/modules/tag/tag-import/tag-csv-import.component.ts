import { Component, OnInit } from '@angular/core';
import { TagHistorianService } from '../service/tag-historian.service';
import { IHeader } from '../../../core/modele/rest/Header';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { QuestionBase } from '../../../shared/dynamic-form/question-base';
import { TextboxQuestion } from '../../../shared/dynamic-form/question-textbox';
import { parse, ParseConfig, ParseResult } from 'papaparse';
import { FileUtil } from '../../../shared/file/file.service';

@Component({
  selector: 'app-tag-csv-import',
  templateUrl: './tag-csv-import.component.html',
  styleUrls: ['./tag-csv-import.component.css']
})
export class TagCsvImportComponent implements OnInit {

  form: FormGroup;
  private separatorCtrl: AbstractControl;
  private encodingCtrl: AbstractControl;
  private separatorQuestion: TextboxQuestion;
  private encodingQuestion: TextboxQuestion;


  questions: QuestionBase<any>[];
  headers: Set<IHeader>;
  validating: boolean = false;
  displayErrMsg: boolean = false;
  displaySuccessMsg: boolean = false;
  fileSizeString: string;

  currentFile: File;
  headerCurrentFile: string[];
  missingHeaders: string[];
  errMsg = 'this csv file does not contain some required column (using specified delimiter and encoding)';
  progress: {
    percentage: number
  } = {
    percentage: 0
  };

  constructor(private tagHistorianService: TagHistorianService,
              private fb: FormBuilder,
              private fileUtil: FileUtil) {
    this.form = this.fb.group({
      content: [null, Validators.required],
      separator: [',', Validators.required],
      encoding: ['UTF-8', Validators.required],
    });
    this.separatorCtrl = this.form.get('separator');
    this.encodingCtrl = this.form.get('encoding');
    this.separatorQuestion = new TextboxQuestion({
      key: 'separator',
      label: 'Csv delimiter',
      order: 1,
      required: true,
    });
    this.encodingQuestion = new TextboxQuestion({
      key: 'encoding',
      label: 'Csv encoding',
      order: 2,
      required: true,
    });
    this.questions = [
      this.separatorQuestion,
      this.encodingQuestion    
    ];
   }

  ngOnInit() {
    this.tagHistorianService.getTagCsvHeaders().subscribe(hs => {
      this.headers = new Set(hs);
    });
  }

  onFileChange(event) {
    if (event.target.files && event.target.files.length) {
      this.selectFile(event.target.files.item(0));
    } else {
      this.currentFile = null;
    }
  }

  onValidateCsv() {
    this.resetMsgs();
    this.validating = true;
    const parseConfig: ParseConfig = {
      encoding: this.encodingCtrl.value,
      delimiter: this.separatorCtrl.value
    };
    this.fileUtil.readSomeLines(this.currentFile, 1,
      line => this.validateCsvHeader(line, parseConfig),
      () => console.log('Completed'),
      this.encodingCtrl.value,
      {
        fatal: false,
        ignoreBOM: false
      }
    );
  }

  importCsv(file: File) {

    this.progress.percentage = 0;
    
    this.tagHistorianService.importTagCsv(file, {
      separator: this.separatorCtrl.value,
      charset: this.encodingCtrl.value,
      bulkSize: 10000
    })

    // this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(event => {
    //   if (event.type === HttpEventType.UploadProgress) {
    //     this.progress.percentage = Math.round(100 * event.loaded / event.total);
    //   } else if (event instanceof HttpResponse) {
    //     console.log('File is completely uploaded!');
    //   }
    // });

    // this.selectedFiles = undefined;
  }

  private validateCsvHeader(header: string, parseconfig: ParseConfig): void {
    const parseResult: ParseResult = parse(header, parseconfig);
    if (parseResult.errors.length !== 0) {
      console.error('error parsing csv', parseResult.errors);
    }
    // check that required headers are presents
    const missingHeaders: string[] = [];
    const headers: string[] = parseResult.data[0];
    const headersAsSet: Set<string> = new Set(headers);
    this.headers.forEach((h) => {
      if (h.required && !headersAsSet.has(h.name)) {
        missingHeaders.push(h.name);
      }
    });
    if (missingHeaders.length === 0) {//VALID      
      this.displaySuccessMsg = true;
      this.missingHeaders = missingHeaders;
      this.encodingQuestion.readonly = true;
      this.separatorQuestion.readonly = true;      
    } else {//NOT VALID
      this.displayErrMsg = true;      
      this.missingHeaders = missingHeaders;
    }
    this.headerCurrentFile = headers;
    this.validating = false;
  }

  private calculStringSize(file: File): string {
    const nBytes = file.size;
    let sOutput = nBytes + ' bytes';
    const aMultiples = ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
    for (let nMultiple = 0, nApprox = nBytes / 1024; nApprox > 1; nApprox /= 1024, nMultiple++) {
      sOutput = nApprox.toFixed(3) + ' ' + aMultiples[nMultiple] + ' (' + nBytes + ' bytes)';
    }
    return sOutput;
  }

  private selectFile(file: File): void {
    this.currentFile = file;
    this.resetMsgs();
    this.setQuestionEditable();
    this.fileSizeString = this.calculStringSize(file);
  }

  private setQuestionEditable(): void {
    this.encodingQuestion.readonly = false;
    this.separatorQuestion.readonly = false;
  }

  private resetMsgs(): void {
    this.displayErrMsg = false;
    this.displaySuccessMsg = false;
  }
}
