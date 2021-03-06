import { IDefaultHeader } from './../../../core/modele/rest/Header';
import { Component, OnInit } from '@angular/core';
import { TagHistorianService } from '../service/tag-historian.service';
import { IHeader } from '../../../core/modele/rest/Header';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { QuestionBase } from '../../../shared/dynamic-form/question-base';
import { TextboxQuestion } from '../../../shared/dynamic-form/question-textbox';
import { parse, ParseConfig, ParseResult } from 'papaparse';
import { FileUtil } from '../../../shared/file/file.service';
import { HttpEventType, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ConfirmationService } from 'primeng/api';
import { IImportTagReport } from '../../../core/modele/rest/ImportTagReport';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-tag-csv-import',
  templateUrl: './tag-csv-import.component.html',
  styleUrls: ['./tag-csv-import.component.css']
})
export class TagCsvImportComponent implements OnInit {

  form: FormGroup;
  private separatorCtrl: AbstractControl;
  private encodingCtrl: AbstractControl;
  private defaultsCtrl: AbstractControl;
  private separatorQuestion: TextboxQuestion;
  private encodingQuestion: TextboxQuestion;


  questions: QuestionBase<any>[];
  headers: Set<IHeader>;
  headersQuestions: QuestionBase<any>[];
  fileSizeString: string;
  // Validation property
  validating: boolean = false;
  displayValidatingErrMsg: boolean = false;
  displayValidatingSuccessMsg: boolean = false;
  errValidatingMsg = `This csv file does not contain the required column(s).\n
  Please see the table below to see which column is missing and add it.\n
  Alternatively check the encoding or delimiter value.`;
  // Importation property
  importing: boolean = false;
  displayImportErrMsg: boolean = false;
  errImportMsg: string;
  displayImportSuccessMsg: boolean = false;
  importReport: IImportTagReport;

  currentFile: File;
  headerCurrentFile: string[];
  missingHeaders: Set<IHeader>;

  private REIMPORT_SAME_FILE_CONFIRMATION = 'Are you sure you want to reimport the same file ?';

  // Progress
  progress: {
    percentage: number
  } = {
    percentage: 0
  };
  progressBarMode: string = 'determinate';

  constructor(private tagHistorianService: TagHistorianService,
              private fb: FormBuilder,
              private fileUtil: FileUtil,
              private confirmationService: ConfirmationService,
              private cookieService: CookieService) {

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
    if (this.cookieService.check('tag-csv-headers')) {
      const hs: IHeader[] = JSON.parse(this.cookieService.get('tag-csv-headers'));
      this.initialize(hs);
    } else {
      this.tagHistorianService.getTagCsvHeaders().subscribe(hs => {
        this.cookieService.set('tag-csv-headers', JSON.stringify(hs));
        this.initialize(hs);
      });
    }
  }

  private initialize(headers: IHeader[]): void {
    this.headers = new Set(headers);
    const defaultsController = {};
    headers.forEach(h => {
      defaultsController[h.name] = null;
    });
    this.form = this.fb.group( {
      content: [null, Validators.required],
      separator: [',', Validators.required],
      encoding: ['UTF-8', [Validators.required, this.doesEncodingExist.bind(this)]],
      defaults: this.fb.group(defaultsController)
    });
    this.separatorCtrl = this.form.get('separator');
    this.encodingCtrl = this.form.get('encoding');
    this.defaultsCtrl = this.form.get('defaults');
  }

  onFileChange(event) {
    if (event.target.files && event.target.files.length) {
      this.selectFile(event.target.files.item(0));
    } else {
      this.currentFile = null;
    }
  }

  onValidateCsv() {
    this.resetValidationMsgs();
    this.validating = true;
    const parseConfig: ParseConfig = {
      encoding: this.encodingCtrl.value,
      delimiter: this.separatorCtrl.value
    };
    this.fileUtil.readSomeLines(this.currentFile, 1,
      line => this.validateCsvHeader(line, parseConfig),
      () => null,
      this.encodingCtrl.value,
      {
        fatal: false,
        ignoreBOM: false
      }
    );
  }

  onClickImportCsv() {
    if (this.displayImportSuccessMsg) {
      this.confirmationService.confirm({
        message: this.REIMPORT_SAME_FILE_CONFIRMATION,
        header: 'Confirmation',
        rejectLabel: 'Cancel',
        acceptLabel: 'Ok',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.importCsv();
        },
        reject: () => { }
      });
    } else {
      this.importCsv();
    }
  }

  private doesEncodingExist(control: AbstractControl): ValidationErrors | ValidationErrors | null {
    const textDecoder: TextDecoderOptions = {
      fatal: false,
      ignoreBOM: false
    };
    try {
      const test = new TextDecoder(control.value, textDecoder);
      return null;
    } catch (e) {
      return { 'isNotSupported': true };
    }
  }

  private parseDefaultValues(): IDefaultHeader[] {
    const defaults: {[s: string]: string; } = this.defaultsCtrl.value;
    return Object.keys(defaults)
      .filter(k => defaults[k] !== null && defaults[k] !== undefined && defaults[k] !== '')
      .map(k => {
        return {
          name: k,
          value: defaults[k]
        };
      });
  }

  private importCsv(): void {
    this.importing = true;
    this.resetImportMsgs();
    this.progressBarMode = 'indeterminate';
    this.progress.percentage = 0;
    const defaultValues = this.parseDefaultValues();
    this.tagHistorianService.importTagCsv(this.currentFile, {
      separator: this.separatorCtrl.value,
      charset: this.encodingCtrl.value,
      bulkSize: 10000,
      defaultValues: defaultValues
    }).subscribe(
      event => {
        switch (event.type) {
          case HttpEventType.Sent:
            console.log(`Uploading file "${this.currentFile.name}" of size ${this.currentFile.size}.`);
            break;
          case HttpEventType.UploadProgress:
            this.progressBarMode = 'determinate';
            this.progress.percentage = Math.round(100 * event.loaded / event.total);
            console.log(`File "${this.currentFile.name}" is ${this.progress.percentage}% uploaded.`);
            break;
          case HttpEventType.Response:
            this.progress.percentage = 100;
            const report: IImportTagReport = event.body;
            this.importReport = report;
            console.log('File is completely uploaded!');
            break;
          default:
            console.log(`File "${this.currentFile.name}" surprising upload event: ${event.type}.`);
            break;
        }
      },
      error => {
        const err: HttpErrorResponse = error;
        this.errImportMsg = `${err.error.error}: ${err.error.message}`;
        this.displayImportErrMsg = true;
        this.importing = false;
      },
      () => {
        this.displayImportSuccessMsg = true;
        this.importing = false;
      }
    );
  }

  private validateCsvHeader(header: string, parseconfig: ParseConfig): void {
    const parseResult: ParseResult = parse(header, parseconfig);
    if (parseResult.errors.length !== 0) {
      console.error('error parsing csv', parseResult.errors);
    }
    // check that required headers are presents
    const missingHeaders: Set<IHeader> = new Set();
    const headersFromCsv: string[] = parseResult.data[0];
    const headersFromCsvAsSet: Set<string> = new Set(headersFromCsv);
    let valid: boolean = true;
    this.headers.forEach((h) => {
      if (!headersFromCsvAsSet.has(h.name)) {
        missingHeaders.add(h);
        if (h.required) {
          valid = false;
        }
      }
    });
    if (valid) {
      this.displayValidatingSuccessMsg = true;
      this.encodingQuestion.readonly = true;
      this.separatorQuestion.readonly = true;
    } else {
      this.displayValidatingErrMsg = true;
    }
    this.missingHeaders = missingHeaders;
    this.headerCurrentFile = headersFromCsv;
    this.validating = false;
  }

  private findClass(h: IHeader): string {
    if (this.missingHeaders.has(h)) {
      if (h.required) {
        return 'red';
      } else {
        return 'orange';
      }
    } else {
      return 'green';
    }
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
    this.importing = false;
    this.resetMsgs();
    this.setQuestionEditable();
    this.fileSizeString = this.calculStringSize(file);
  }

  private setQuestionEditable(): void {
    this.encodingQuestion.readonly = false;
    this.separatorQuestion.readonly = false;
  }

  private resetValidationMsgs(): void {
    this.displayValidatingErrMsg = false;
    this.displayValidatingSuccessMsg = false;
  }

  private resetImportMsgs(): void {
    this.displayImportErrMsg = false;
    this.displayImportSuccessMsg = false;
  }

  private resetMsgs(): void {
    this.resetValidationMsgs();
    this.resetImportMsgs();
  }
}
