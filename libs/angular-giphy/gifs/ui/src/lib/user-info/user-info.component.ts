import { User } from '@angular-giphy/gifs/model';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'pi-exchange-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserInfoComponent {
  @Input() user?: User;
}
