import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'pi-exchange-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadComponent {}
