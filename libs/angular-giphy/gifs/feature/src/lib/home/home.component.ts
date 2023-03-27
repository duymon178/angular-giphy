import { GifsService } from '@angular-giphy/gifs/data';
import { Gif } from '@angular-giphy/gifs/model';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'pi-exchange-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  trending$!: Observable<Gif[]>;

  constructor(private router: Router, private service: GifsService) {}

  ngOnInit() {
    this.trending$ = this.service.getTrending();
  }

  handleSearch(term: string) {
    this.router.navigateByUrl(`search?q=${term}`);
  }
}
