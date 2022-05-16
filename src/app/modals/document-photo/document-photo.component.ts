import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'document-photo',
  templateUrl: './document-photo.component.html',
  styleUrls: [ './document-photo.component.scss' ]
})
export class DocumentPhotoComponent implements OnInit {

  @ViewChild('video', { static: true })
  public videoRef!: ElementRef;

  @ViewChild('canvas', { static: true })
  public canvasRef!: ElementRef;

  public photo!: any;
  public videoSettings!: MediaTrackSettings;

  private videoEl!: HTMLVideoElement;
  private stream!: MediaStream;

  constructor(
    public dialog: MatDialogRef<DocumentPhotoComponent>) {

    this.videoSettings = {
      width: 1280,
      height: 720
    };
  }

  public ngOnInit(): void {
    this.startStream();
  }

  public onClose(): void {
    this.stopStream();
    this.dialog.close();
  }

  public onUndo(): void {
    this.startStream();
    this.photo = null;
  }

  public onSave(): void {
    this.stopStream();
    this.dialog.close(this.photo);
  }

  public onPhoto(): void {
    const video = this.videoRef.nativeElement as HTMLVideoElement;
    const canvas = this.canvasRef.nativeElement as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    ctx!.drawImage(video, 0, 0, canvas.width, canvas.height);
    this.photo = canvas.toDataURL('image/jpeg');
    this.stopStream();
  }

  private startStream(): void {
    navigator.mediaDevices.getUserMedia({
      video: {
        width: {
          min: 1280,
          ideal: 1920,
          max: 2560
        },
        height: {
          min: 720,
          ideal: 1080,
          max: 1440
        },
        facingMode: {
          exact: 'environment'
        }
      },
      audio: false
    }).then(stream => {
        this.videoEl = this.videoRef.nativeElement as HTMLVideoElement;
        this.videoEl.srcObject = stream;
        this.stream = stream;
        this.videoSettings = this.stream.getVideoTracks()[0].getSettings();
      }
    ).catch(error => {
      if (error) {
        this.dialog.close();
      }
    });
  }

  private stopStream(): void {
    this.stream.getVideoTracks().forEach(i => {
      i.stop();
      this.stream.removeTrack(i);
    });
  }

}
