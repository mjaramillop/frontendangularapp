

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

//services
import { Conceptosnotadebitocreditoservice } from 'src/app/components/services/tablasmaestras/conceptosnotadebitocredito.service';

//variables
import { Variables } from 'src/app/components/Utils/variables';
// models

import { Conceptosnotadebitocredito } from 'src/app/components/models/tablasmaestras/conceptosnotadebitocredito';

//dto
import { Responseconceptosnotadebitocreditodto } from 'src/app/components/dto/tablasmaestras/responseconceptosnotadebitocredito';

@Component({
  selector: 'app-conceptosnotadebitocredito',
  templateUrl: './conceptosnotadebitocredito.component.html'
 
})
export class ConceptosnotadebitocreditoComponent implements OnInit {

  constructor(
    private conceptosnotadebitocreditoservice: Conceptosnotadebitocreditoservice,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  // text model variables
  public objeto: Conceptosnotadebitocredito;
  public variables : Variables;
  public  token_= localStorage.getItem("token");
  public idusuario = localStorage.getItem("idusuario");
  public nombreusuario = localStorage.getItem("nombreusuario");


 

  //standard const variables
  public errormessage: string = '';
  public operacion: string = '';
  public filtro: any = '';
  public sololectura: boolean = true;
  public permisos: any = '';
  public mostrarventanaedicion:boolean=false;

  // array de las entidades
  public arrayconceptosnotadebitocredito:  Responseconceptosnotadebitocreditodto[] = [];

 

  ngOnInit(): void {
    this.variables=new Variables();
    this.objeto = new Conceptosnotadebitocredito();
    this.permisos = this.activatedRoute.snapshot.paramMap.get('permisos');
    this.arrayconceptosnotadebitocredito = [];
   
  }

  /**************************************************************** */
  /* funciones de consulta                                          */
  /**************************************************************** */

  Consultarregistro(id: number) {
    if (isNaN(id) === true) return;
    this.conceptosnotadebitocreditoservice.GetById(id,this.idusuario,this.token_).subscribe({
      next: (data) => {
        if (data.length === 0) return;
        this.objeto = new Conceptosnotadebitocredito();
        this.objeto.id = data[0].id;
        this.objeto.nombre = data[0].nombre;
        this.objeto.estadodelregistro = data[0].estadodelregistro;
        this.arrayconceptosnotadebitocredito = data;
      },
    });
  }

 
  

  /***************************************************************************** */
  /* eventos de asignacion de valores */
  /******************************************************************************* */
  changenombre(event: any) {
    this.objeto.nombre = event?.target.value;
  }

  changeestadodelregistro(event: any) {
    this.objeto.estadodelregistro = event?.target.value;
  }

  changefiltro(event: any) {
    this.filtro = event?.target.value;
  }

  /************************************************************************************ */
  /*funciones basicas */
  /*************************************************************************************** */
  Agregar() {
    this.sololectura = false;
    this.operacion = 'agregar';
    this.objeto = new Conceptosnotadebitocredito();
    this.mostrarventanaedicion=true;
  }

  Borrar(id: number) {
    this.sololectura = true;
    this.operacion = 'borrar';
     this.Consultarregistro(id);
     this.mostrarventanaedicion=true;

  }

  Modificar(id: number) {
    this.sololectura = false;
    this.operacion = 'modificar';
    this.Consultarregistro(id);
    this.mostrarventanaedicion=true;

  }

  Procesar() {

    this.objeto.idusuario=    this.idusuario  ;
    this.objeto.nombreusuario=this.nombreusuario;


    if (this.operacion === 'agregar') {
    
      this.conceptosnotadebitocreditoservice.Add(this.objeto,this.idusuario,this.token_).subscribe({
        next: (data) => {
          this.errormessage=data.mensaje;
        },
      });
    }

    if (this.operacion === 'borrar') {
      this.conceptosnotadebitocreditoservice.Delete(this.objeto.id,this.idusuario,this.token_).subscribe({
        next: (data) => {
          this.errormessage=data.mensaje;
        },
      });
    }

    if (this.operacion === 'modificar') {
      this.conceptosnotadebitocreditoservice.Update(this.objeto,this.idusuario,this.token_).subscribe({
        next: (data) => {
          this.errormessage=data.mensaje;
        },
      });
    }

    this.arrayconceptosnotadebitocredito=[];
  

  }

  Cancelar() {
   
    this.operacion = 'listar';
    this.mostrarventanaedicion=false;

  }

  Refresh(filtro: string) {
    this.operacion = 'listar';
    this.errormessage="";
    this.conceptosnotadebitocreditoservice.GetAll(filtro,this.idusuario,this.token_).subscribe({
      next: (data) => {
        console.log(data);
        this.arrayconceptosnotadebitocredito = data;
      },
    });
  }

  /******************************************************************* */
  /*   funciones extras                                                */
  /******************************************************************* */


}
