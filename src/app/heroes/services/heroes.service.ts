import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Hero } from '../interfaces/hero.interface';
import { catchError, map, Observable, of, pipe } from 'rxjs';
import { enviroments } from '../../../environments/environments.prod';

@Injectable({ providedIn: 'root' })
export class HeroesService {
  private baseUrl: string = enviroments.baseUrl;

  constructor(private http: HttpClient) {}

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes`);
  }

  getHeroById(id: string): Observable<Hero | undefined> {
    return this.http
      .get<Hero>(`${this.baseUrl}/heroes/${id}`)
      .pipe(catchError((err) => of(undefined)));
  }

  getSuggestions(query: string): Observable<Hero[]> {
    const urlConsulta = `${this.baseUrl}/heroes?q=${query}&_limit=6`;
    console.log({ urlConsulta });
    //return this.http.get<Hero[]>(`${this.baseUrl}/heroes?q=${query}&_limit=6`);
    return this.http
      .get<Hero[]>(`${this.baseUrl}/heroes`)
      .pipe(
        map((heroes) =>
          heroes.filter((hero) =>
            Object.values(hero).some((value) =>
                String(value).toLowerCase().includes(query.toLowerCase())))));
  }

  // Crear un nuevo héroe
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(`${this.baseUrl}/heroes`, hero);
  }

  // Actualizar un héroe
  updateHero(hero: Hero): Observable<Hero> {
    if(!hero.id) throw Error('Hero is is required');
    return this.http.patch<Hero>(`${this.baseUrl}/heroes/${hero.id}`, hero);
  }

  // Eliminar un héroe
  deleteHeroById(id: string): Observable<boolean> {
    if(!id) throw Error('Hero id is is required');
    return this.http.delete(`${this.baseUrl}/heroes/${id}`)
    .pipe(
      map(() => true),  // return true if delete is successful
      catchError(() => of(false)) // return false if delete is not successful
    );
  }
}

