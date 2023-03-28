import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'pi-exchange-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadComponent implements OnDestroy {
  accept = 'image/gif, image/webp';
  files: File[] = [];
  preview = false;
  images: string[] = [];

  constructor(private sanitizer: DomSanitizer) {}

  handleFileInput(event: Event) {
    this.files = [];
    const files: FileList | null = (event.target as HTMLInputElement).files;

    if (files) {
      this.files = Array.from(files);
      this.images = this.files.map((f) => URL.createObjectURL(f));

      this.preview = true;
    }
  }

  getImgSrc(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  ngOnDestroy() {
    if (this.images.length > 0) {
      this.images.forEach((url) => {
        URL.revokeObjectURL(url);
      });
    }
  }
}
