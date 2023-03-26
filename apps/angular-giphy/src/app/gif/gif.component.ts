import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pi-exchange-gif',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gif.component.html',
  styleUrls: ['./gif.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GifComponent {

}
