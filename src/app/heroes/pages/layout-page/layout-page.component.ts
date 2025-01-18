import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from '../../../auth/interfaces/user.insterface';
import { Router } from '@angular/router';


@Component({
  selector: 'app-layout-page',
  standalone: false,
  
  templateUrl: './layout-page.component.html',
  styles: `
  .custom-toolbar {
  background-color: #ff5722; /* Cambia este valor al color que desees */
}
  `
})
export class LayoutPageComponent {

  public sidebarItems = [
    {label: 'Listado', icon: 'list', url: './list'},
    {label: 'Añadir', icon: 'add', url: './new-hero'},
    {label: 'Buscar', icon: 'search', url: './search'}
  ];

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  onLogout():void {
    this.authService.logout();    
    this.router.navigate(['/auth/login']);
  } 

  get user(): User | undefined {
    return this.authService.currentUser;
  }



}
