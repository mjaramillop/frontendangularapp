import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// variables
import { Variables } from 'src/app/components/Utils/variables';

// services
import { Userservice } from '../../../services/seguridad/user.service';
import { Mensajesdelsistemaservice } from '../../../services/seguridad/mensajesdelsistema.service';

//  dto
import { Responsemenudto } from '../../../dto/seguridad/responsemenudto';
import { Responsemensajesdelsistemadto } from '../../../dto/seguridad/responsemensajesdelsistemdto';

@Component({
  selector: 'app-menuuser',
  templateUrl: './menuuser.component.html',
})
export class MenuuserComponent implements OnInit {
  // text variables model
  public idusuario: any;
  public nombreusuario: any;
  public variables: Variables;
  public login: any = '';
  public password: any = '';

  // arrays de lan entidades
  public arraymenu: Responsemenudto;
  public arraymensajesdelsistema: Responsemensajesdelsistemadto;

  constructor(
    private userservice: Userservice,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private mensajesdelsistemaservice: Mensajesdelsistemaservice
  ) {}

  ngOnInit(): void {
    this.login = localStorage.getItem('login');
    this.password = localStorage.getItem('password');
    this.idusuario = localStorage.getItem('idusuario');
    this.nombreusuario = localStorage.getItem('nombreusuario');

    this.variables = new Variables();

    this.arraymenu = new Responsemenudto();
    this.arraymensajesdelsistema = new Responsemensajesdelsistemadto();

    this.userservice.UserValidateAccess(this.login, this.password).subscribe({
      next: (dataResponse) => {
        this.arraymenu.menu = dataResponse;
      },
      error: (e) => {},
    });
  }

  logout() {

    localStorage.removeItem("login");
    localStorage.removeItem("password");
    localStorage.removeItem("idusuario");
    localStorage.removeItem("token");


    this.userservice.LogOut().subscribe({
      next: (dataResponse) => {
        this.router.navigate(['/login']);

      },
    });
  }
}
