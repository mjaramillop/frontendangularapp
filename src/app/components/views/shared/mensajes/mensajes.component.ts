import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// variables
import { Variables } from 'src/app/components/Utils/variables';

// services

import { Mensajesdelsistemaservice } from '../../../services/seguridad/mensajesdelsistema.service';

//  dto

import { Responsemensajesdelsistemadto } from '../../../dto/seguridad/responsemensajesdelsistemdto';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
})
export class MensajesComponent implements OnInit {
  // standard const variables
  public token: any = '';
  public url: string = '';

  // text variables model
  public variables : Variables;

  public  token_= localStorage.getItem("token");
  public idusuario = localStorage.getItem("idusuario");
  public nombreusuario = localStorage.getItem("nombreusuario");


  // arrays de lan entidades

  public arraymensajesdelsistema: Responsemensajesdelsistemadto;

  // auxliar variables
  public visible:boolean =true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private mensajesdelsistemaservice: Mensajesdelsistemaservice
  ) {}

  ngOnInit(): void {
    this.token = this.activatedRoute.snapshot.paramMap.get('token');
    this.arraymensajesdelsistema = new Responsemensajesdelsistemadto();

    this.mensajesdelsistemaservice.GetAllActive(this.idusuario,this.token_).subscribe({
      next: (dataResponse) => {
        this.arraymensajesdelsistema.mensajesdelsistema = dataResponse;
       
      },
    });
  }

  ngAfterViewInit() {}

  cerrarventana() {

 
   this.visible=false;
  }

}
