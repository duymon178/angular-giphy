import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'pi-exchange-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBoxComponent implements OnInit {
  @Output() search = new EventEmitter<string>();

  form!: FormGroup;

  ngOnInit() {
    this.form = new FormGroup({
      term: new FormControl<string>(''),
    });
  }

  onSubmit() {
    if (this.form.controls['term'].value.length === 0) return;

    this.search.emit(this.form.controls['term'].value);
  }
}
