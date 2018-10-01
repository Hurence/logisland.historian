import { Component, OnInit } from '@angular/core';
import { TagHistorianService } from '../service/tag-historian.service';
import { IHeader } from '../../../core/modele/rest/Header';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { QuestionBase } from '../../../shared/dynamic-form/question-base';
import { TextboxQuestion } from '../../../shared/dynamic-form/question-textbox';
import { parse, ParseConfig, ParseResult } from 'papaparse';

@Component({
  selector: 'app-tag-csv-import',
  templateUrl: './tag-csv-import.component.html',
  styleUrls: ['./tag-csv-import.component.css']
})
export class TagCsvImportComponent implements OnInit {

  form: FormGroup;
  private separatorCtrl: AbstractControl;
  private encodingCtrl: AbstractControl;

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
              private fb: FormBuilder) {
    this.form = this.fb.group({
      content: [null, Validators.required],
      separator: [';', Validators.required],
      encoding: ['UTF-8', Validators.required],
    });
    this.separatorCtrl = this.form.get('separator');
    this.encodingCtrl = this.form.get('encoding');
    this.questions = [
      new TextboxQuestion({
        key: 'separator',
        label: 'Csv delimiter',
        order: 1,
        required: true,
      }),
      new TextboxQuestion({
        key: 'encoding',
        label: 'Csv encoding',
        order: 2,
        required: true,
      }),
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

  private selectFile(file: File): void {
    this.currentFile = file;
    this.fileSizeString = this.calculStringSize(file);
  }

  private resetMsgs(): void {
    this.displayErrMsg = false;
    this.displaySuccessMsg = false;
  }

  onValidateCsv() {
    this.resetMsgs();
    this.validating = true;
    const parseConfig: ParseConfig = {
      encoding: this.encodingCtrl.value,
      delimiter: this.separatorCtrl.value
    };
    this.readSomeLines(this.currentFile, 1,
      line => this.validateCsvHeader(line, parseConfig),
      () => console.log('Completed'),
      this.encodingCtrl.value,
      {
        fatal: false,
        ignoreBOM: false
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
        missingHeaders.push(h.name);
      }
    });
    if (missingHeaders.length === 0) {
      this.displaySuccessMsg = true;
      this.missingHeaders = missingHeaders;
    } else {
      this.displayErrMsg = true;
      this.missingHeaders = missingHeaders;
    }
    this.headerCurrentFile = headers;
    this.validating = false;
  }

  /**
   * Read up to and including |maxlines| lines from |file|.
   *
   * @param {File} file - The file to be read.
   * @param {integer} maxlines - The maximum number of lines to read.
   * @param {function(string)} forEachLine - Called for each line.
   * @param {function(error)} onComplete - Called when the end of the file
   *     is reached or when |maxlines| lines have been read.
   */
  private readSomeLines(file: File, maxlines: number, forEachLine, onComplete,
                        encoding?: string, decoderOptions?: TextDecoderOptions) {
    const CHUNK_SIZE = 50000; // 50kb, arbitrarily chosen.
    const textDecoder: TextDecoderOptions = {
      fatal: false,
      ignoreBOM: false
    };
    if (decoderOptions) {
      Object.assign(textDecoder, decoderOptions);
    }
    const decoder = new TextDecoder(encoding || 'utf-8', textDecoder);
    let offset = 0;
    let linecount = 0;
    let results = '';
    const fr = new FileReader();
    fr.onload = function() {
        // Use stream:true in case we cut the file
        // in the middle of a multi-byte character
        results += decoder.decode(fr.result, {stream: true});
        const lines = results.split('\n');
        results = lines.pop(); // In case the line did not end yet.
        linecount += lines.length;

        if (linecount > maxlines) {
            // Read too many lines? Truncate the results.
            lines.length -= linecount - maxlines;
            linecount = maxlines;
        }

        for (let i = 0; i < lines.length; ++i) {
            forEachLine(lines[i] + '\n');
        }
        offset += CHUNK_SIZE;
        seek();
    };
    fr.onerror = function() {
        onComplete(fr.error);
    };
    seek();

    function seek() {
      if (linecount === maxlines) {
          // We found enough lines.
          onComplete(); // Done.
          return;
      }
      if (offset !== 0 && offset >= file.size) {
          // We did not find all lines, but there are no more lines.
          forEachLine(results); // This is from lines.pop(), before.
          onComplete(); // Done
          return;
      }
      const slice = file.slice(offset, offset + CHUNK_SIZE);
      fr.readAsArrayBuffer(slice);
    }
  }

  importCsv() {

    this.progress.percentage = 0;

    // this.currentFile = this.selectedFiles.item(0);
    // this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(event => {
    //   if (event.type === HttpEventType.UploadProgress) {
    //     this.progress.percentage = Math.round(100 * event.loaded / event.total);
    //   } else if (event instanceof HttpResponse) {
    //     console.log('File is completely uploaded!');
    //   }
    // });

    // this.selectedFiles = undefined;
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
}
