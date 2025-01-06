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
}

