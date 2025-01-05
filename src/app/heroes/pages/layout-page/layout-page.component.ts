import { Component } from '@angular/core';


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
}
