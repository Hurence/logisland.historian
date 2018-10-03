import { IDefaultHeader } from './../../../core/modele/rest/Header';
import { Component, OnInit } from '@angular/core';
import { TagHistorianService } from '../service/tag-historian.service';
import { IHeader } from '../../../core/modele/rest/Header';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { QuestionBase } from '../../../shared/dynamic-form/question-base';
import { TextboxQuestion } from '../../../shared/dynamic-form/question-textbox';
import { parse, ParseConfig, ParseResult } from 'papaparse';
import { FileUtil } from '../../../shared/file/file.service';
import { HttpEventType, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ConfirmationService } from 'primeng/api';
import { IImportTagReport } from '../../../core/modele/rest/ImportTagReport';

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
  errValidatingMsg = `this csv file does not contain some required column.\n
  This may occur because you did not choose the correct delimiter and/or encoding for the file.\n
  If the file really did not contain any of below listed columns, you can specify a default value.`;
  // Importation property
  importing: boolean = false;
  displayImportErrMsg: boolean = false;
  errImportMsg: string;
  displayImportSuccessMsg: boolean = false;
  importReport: IImportTagReport;

  currentFile: File;
  headerCurrentFile: string[];
  missingHeaders: string[];

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
              private confirmationService: ConfirmationService) {

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
      const defaultsController = {};
      hs.forEach(h => {
        defaultsController[h.name] = null;
      });
      this.form = this.fb.group( {
        content: [null, Validators.required],
        separator: [',', Validators.required],
        encoding: ['UTF-8', Validators.required],
        defaults: this.fb.group(defaultsController)
      });
      this.separatorCtrl = this.form.get('separator');
      this.encodingCtrl = this.form.get('encoding');
      this.defaultsCtrl = this.form.get('defaults');
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
    const missingHeaders: string[] = [];
    const headers: string[] = parseResult.data[0];
    const headersAsSet: Set<string> = new Set(headers);
    this.headers.forEach((h) => {
      if (h.required && !headersAsSet.has(h.name)) {
        const defaultValue = this.defaultsCtrl.get(h.name).value;
        if (defaultValue === null || defaultValue === undefined || defaultValue === '') {
          missingHeaders.push(h.name);
        }
      }
    });
    if (missingHeaders.length === 0) {// VALID
      this.displayValidatingSuccessMsg = true;
      this.missingHeaders = missingHeaders;
      this.encodingQuestion.readonly = true;
      this.separatorQuestion.readonly = true;
    } else {// NOT VALID
      this.displayValidatingErrMsg = true;
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
