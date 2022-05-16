import { fromEvent, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AllowedFileExtensions } from './documents.interface';

export const loadFile = (): Observable<File> => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.pdf,.png,.jpeg,.jpg';
  input.click();
  return fromEvent(input, 'change').pipe(
    map(event => {
      const files: FileList = (event.target as HTMLInputElement).files as FileList;
      return files.item(0) as File;
    })
  );
};

export function getFileExt(fileName: string): AllowedFileExtensions | null {
  const list = fileName.split('.');
  return list.length ? list[list.length - 1] as AllowedFileExtensions : null;
}

export function base64ToArrayBuffer(data: string): Uint8Array {
  const bString = window.atob(data);
  const bLength = bString.length;
  const bytes = new Uint8Array(bLength);
  for (let i = 0; i < bLength; i++) {
    bytes[i] = bString.charCodeAt(i);
  }
  return bytes;
}
