import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroesService } from '../../services/heroes.service';
import { delay, switchMap } from 'rxjs';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-heroe-page',
  standalone: false,

  templateUrl: './heroe-page.component.html',
  styles: ``,
})
export class HeroePageComponent implements OnInit {

  public hero?: Hero;


  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(     
      switchMap(({ id }) => this.heroesService.getHeroById(id)),

    ).subscribe( hero => {
      if (!hero) {
        return this.router.navigateByUrl('/heroes');
      }
      this.hero = hero; 
      return hero; 
    });
  }



  goBack(): void {
    this.router.navigate(['heroes/list']);
  }


}
