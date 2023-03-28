import { catchError, EMPTY, Observable } from 'rxjs';
import { GifsService } from '@angular-giphy/gifs/data';
import { Gif, ImageAllTypes, Images, User } from '@angular-giphy/gifs/model';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'pi-exchange-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailComponent implements OnInit {
  gif$!: Observable<Gif>;

  constructor(private service: GifsService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.gif$ = this.service.getById(this.route.snapshot.params['id']).pipe(
      catchError((err) => {
        // Handle error here.
        console.log(err);
        return EMPTY;
      })
    );
  }
}
