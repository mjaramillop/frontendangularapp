import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// services
import { Userservice } from 'src/app/components/services/seguridad/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  public login: string;
  public password: string;
  public errormessage: string = '';
  public iconovisible: boolean = false;

 

  constructor(
    private userservice: Userservice,
    private router: Router,
    
  ) {}

  changelogin(event: any) {
    this.login = event.target.value;
  }

  changepassword(event: any) {
    this.password = event.target.value;
  }

  ngOnInit(): void {
    

  }

  

  Authenticate() {
  
  
    localStorage.setItem('login',this.login);
    localStorage.setItem('password',this.password);
    this.iconovisible = true;

    this.userservice.UserValidateAccess(this.login, this.password).subscribe({
      next: (response) => {
     
        if (response.length > 0) {

       
          localStorage.setItem('idusuario', response[0].idusuario);
          localStorage.setItem('nombreusuario', response[0].username);
          localStorage.setItem('token',response[0].token);
        
          this.router.navigate(['menuuser']);
          return;
        }

        if (response.length == 0) {
          this.errormessage = '☠️ Acceso no autorizado ☠️ ';
          return;
        }
      },
      error: (e) => {},
    });
  }
}
