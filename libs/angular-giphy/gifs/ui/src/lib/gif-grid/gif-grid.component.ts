import { Gif } from '@angular-giphy/gifs/model';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'pi-exchange-gif-grid',
  templateUrl: './gif-grid.component.html',
  styleUrls: ['./gif-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GifGridComponent {
  @Input() gifs: Gif[] = [];
}
