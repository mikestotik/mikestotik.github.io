import { Directive, ElementRef, Input, OnInit } from '@angular/core';


@Directive({
  selector: '[filePreview]'
})
export class FilePreviewDirective implements OnInit {

  @Input()
  public file!: File;

  constructor(
    private elRef: ElementRef) {
  }

  public ngOnInit(): void {
    this.elRef.nativeElement.src = URL.createObjectURL(this.file);
  }

}
