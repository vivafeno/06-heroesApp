import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { filter, pipe, switchMap, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-page',
  standalone: false,

  templateUrl: './new-page.component.html',
  styles: ``,
})
export class NewPageComponent implements OnInit {
  public heroForm = new FormGroup({
    id: new FormControl(''),
    superhero: new FormControl('', { nonNullable: true }),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_img: new FormControl(''),
  });

  public publishers = [
    { id: 'DC Comics', desc: 'DC - Comics' },
    { id: 'Marvel Comics', desc: 'Marvel - Comics' },
  ];

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (this.router.url.includes('edit')) {
      this.activatedRoute.params
        .pipe(switchMap(({ id }) => this.heroesService.getHeroById(id)))
        .subscribe((hero) => {
          if (!hero) return this.router.navigateByUrl('/');
          this.heroForm.reset(hero);
          return;
        });
    }
  }

  get currentHero(): Hero {
    const hero = this.heroForm.value as Hero;
    return hero;
  }

  onSubmit(): void {
    // Validar formulario
    if (this.heroForm.invalid) return;

    // Actualizar héroe
    if (this.currentHero.id) {
      this.heroesService.updateHero(this.currentHero).subscribe((hero) => {
        this.showSnackBar('Registro actualizado');
      });
      return;
    }
    // Crear nuevo héroe
    this.heroesService.addHero(this.currentHero).subscribe((hero) => {
      this.showSnackBar('Registro creado');
      this.router.navigateByUrl('/heroes/edit/' + hero.id);
    });
  }

  onDeleteHero(): void {

    // Validar ID
    if (!this.currentHero.id)
      throw new Error('No se puede eliminar un héroe sin ID');

    // Abrir dialogo de confirmación
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.heroForm.value,
    });
  
    // Escuchar respuesta del dialogo
    dialogRef.afterClosed()
    .pipe(
      filter( (result):boolean => result === true), 
      switchMap( () => this.heroesService.deleteHeroById(this.currentHero.id)),
      filter( (wasDeleted: boolean) => wasDeleted === true),
    ).subscribe( result =>{
        this.router.navigateByUrl('/heroes')
        this.showSnackBar('Héroe eliminado correctamente...');
    });
  };
  

  showSnackBar(message: string): void {
    this.snackBar
    .open(message, '', {
      duration: 2500,
    });
  }
}
