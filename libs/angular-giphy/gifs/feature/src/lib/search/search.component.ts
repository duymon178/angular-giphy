import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'pi-exchange-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {}
