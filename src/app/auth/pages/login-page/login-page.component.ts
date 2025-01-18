import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: false,
  
  templateUrl: './login-page.component.html',
  styles: ``
})
export class LoginPageComponent implements OnInit {

  constructor(
    private AuthService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    ;
  }

  onLogin():void{
    this.AuthService.login('vvf@gmail.com', '123456')
    .subscribe( user => {
      console.log({user});
      this.router.navigate(['/']);
    });  
  }

}
