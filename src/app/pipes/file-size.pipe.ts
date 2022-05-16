import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'fileSize'
})
export class FileSizePipe implements PipeTransform {

  public transform(value: number): string {
    const kbValue = value / 1000;

    if (kbValue >= 1000) {
      return `${ (kbValue / 1000).toFixed(2) } MB`;
    }

    if (kbValue >= 1 && kbValue <= 1000) {
      return `${ kbValue.toFixed(2) } KB`;
    }

    return `${ value } B`;
  }

}
