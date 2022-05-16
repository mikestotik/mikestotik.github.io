import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { from, fromEvent, switchMap } from 'rxjs';
import { DeviceUtils } from './device.utils';
import { base64ToArrayBuffer, loadFile } from './documents.utils';
import { DocumentPhotoComponent } from './modals/document-photo/document-photo.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit {
  public imageFile!: boolean;
  public file!: File;
  public mobileDevice!: boolean;
  public existsMediaDevices!: boolean;
  public title!: string;
  public note!: string;
  public log!: any;

  private fileSizeExceeded!: boolean;
  private pdfFile!: Uint8Array;

  constructor(
    private dialog: MatDialog) {

    this.title = 'Version 1.1';
  }

  public ngOnInit(): void {
    this.mobileDevice = DeviceUtils.isMobile();

    if (this.mobileDevice && 'mediaDevices' in window.navigator && 'getUserMedia' in window.navigator.mediaDevices) {
      this.existsMediaDevices = true;
    }

    this.log = `${ window }`;
    console.log('getUserMedia' in window.navigator.mediaDevices);
  }

  public onMakePhoto(): void {
    const dialog = this.dialog.open(DocumentPhotoComponent, {
      disableClose: true
    });

    dialog.afterClosed().pipe(
      switchMap(imageDataUrl => from(fetch(imageDataUrl).then(i => i.blob())))
    ).subscribe(blob => {
      this.imageFile = true;
      this.file = new File(
        [ blob ],
        `image-${ Date.now() }.jpg`,
        {
          type: 'image/jpeg',
          lastModified: new Date().getUTCDate()
        });
    });
  }

  public onUpload(): void {
    loadFile().subscribe(file => {
      const filesize = Number(((file.size / 1024) / 1024).toFixed(4)); // MB

      if (filesize <= 5) {
        this.fileSizeExceeded = false;
        this.imageFile = file.type.split('/')[0] === 'image';
        this.file = file;

        if (!this.imageFile) {
          const reader = new FileReader();
          reader.readAsDataURL(this.file);

          fromEvent(reader, 'load').subscribe(() => {
            if (typeof reader.result === 'string') {
              const base64Text = clearImageDataUrl(reader.result);
              this.pdfFile = base64ToArrayBuffer(base64Text);
            }
          });
        }
      } else {
        this.fileSizeExceeded = true;
        alert('Превышен допустимый размер файла. Максимально допустимый размер 5мб');
      }
    });
  }

  public onSubmit(): void {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(this.file);
    link.download = 'Download.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}


function clearImageDataUrl(dataUrl: string): string {
  return dataUrl
    .replace('data:', '')
    .replace(/^.+,/, '');
}
