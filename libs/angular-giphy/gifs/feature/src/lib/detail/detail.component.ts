import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'pi-exchange-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailComponent {}
