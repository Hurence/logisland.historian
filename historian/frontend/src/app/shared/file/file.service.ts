
import { Injectable } from '@angular/core';

@Injectable()
export class FileUtil {

/**
   * Read up to and including |maxlines| lines from |file|.
   *
   * @param {File} file - The file to be read.
   * @param {integer} maxlines - The maximum number of lines to read.
   * @param {function(string)} forEachLine - Called for each line.
   * @param {function(error)} onComplete - Called when the end of the file
   *     is reached or when |maxlines| lines have been read.
   */
  readSomeLines(file: File, maxlines: number, forEachLine, onComplete,
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
}
