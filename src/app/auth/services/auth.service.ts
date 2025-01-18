import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { enviroments } from '../../../environments/environments';
import { User } from '../interfaces/user.insterface';
import { Observable, of, tap, pipe, catchError, map } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {

    private baseUrl= enviroments.baseUrl;
    private user?: User;

    constructor(private http: HttpClient) { }

    get currentUser (): User|undefined {
        if (!this.user) return undefined;
        return structuredClone(this.user); // Clonar el objeto para evitar que se modifique
    }

    login(email: string, password: string): Observable<User> {
    return  this.http.get<User>(`${this.baseUrl}/users/1`)
        .pipe(
            tap( user => this.user = user),
            tap( user => localStorage.setItem('token', 'weWERQq"·$234ERQ34·Rr'),            
            )
        );       
    }


    checkAuthentication(): Observable <boolean> {
        if (!localStorage.getItem('token')) return of(false);

        const token = localStorage.getItem('token');
        return this.http.get<User>(`${this.baseUrl}/users/1`)
            .pipe(
                tap( user => this.user = user),
                map( user => !!user), // Si existe el usuario devuelve true, si no false
                catchError( err => of(false))
        );
    }


    logout():void {
        this.user = undefined;
        localStorage.clear();
    }

    
}