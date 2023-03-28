import { Gif } from '@angular-giphy/gifs/model';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'pi-exchange-gif-item',
  templateUrl: './gif-item.component.html',
  styleUrls: ['./gif-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GifItemComponent {
  @Input() gif?: Gif;
  @Input() thumbnailDisplay = true;
}
