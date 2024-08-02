import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

//services

import { Unidadesdemedidaservice } from 'src/app/components/services/tablasmaestras/unidadesdemedida.service';
//variables
import { Variables } from 'src/app/components/Utils/variables';
// models

import { Unidadesdemedida } from 'src/app/components/models/tablasmaestras/unidadesdemedida';

//dto
import { Responseunidadesdemedidadto } from 'src/app/components/dto/tablasmaestras/responseunidadesdemedidadto';

@Component({
  selector: 'app-unidadesdemedida',
  templateUrl: './unidadesdemedida.component.html',
})
export class UnidadesdemedidaComponent implements OnInit {
  constructor(
   
    private unidadesdemedidaservice: Unidadesdemedidaservice,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  // text model variables
  public objeto: Unidadesdemedida;
  public variables: Variables;


  //standard const variables
  public errormessage: string = '';
  public operacion: string = '';
  public filtro: any = '';
  public sololectura: boolean = true;
  public permisos: any = '';
  public mostrarventanaedicion: boolean = false;

  
  public  token_= localStorage.getItem("token");
  public idusuario = localStorage.getItem("idusuario");
  public nombreusuario = localStorage.getItem("nombreusuario");


  // array de las entidades
  public arrayunidadesdemedida: Responseunidadesdemedidadto[] = [];

  // variables extras
  public topvisiblefiltro: string = '1000px';
  public topvisibleedicion: string = '1000px';
  public topvisiblegrilla: string = '50px';

  ngOnInit(): void {
    this.variables = new Variables();
    this.objeto = new Unidadesdemedida();
    this.permisos = this.activatedRoute.snapshot.paramMap.get('permisos');
    this.arrayunidadesdemedida = [];
  }

  /**************************************************************** */
  /* funciones de consulta                                          */
  /**************************************************************** */

  Consultarregistro(id: number) {
    if (isNaN(id) === true) return;
    this.unidadesdemedidaservice.GetById(id,this.idusuario,this.token_).subscribe({
      next: (data) => {
        if (data.length === 0) return;
        this.objeto = new Unidadesdemedida();
        this.objeto.id = data[0].id;
        this.objeto.nombre = data[0].nombre;
        this.objeto.estadodelregistro = data[0].estadodelregistro;
        this.arrayunidadesdemedida = data;
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

    this.objeto = new Unidadesdemedida();
    this.mostrarventanaedicion = true;
  }

  Borrar(id: number) {
    this.sololectura = true;
    this.operacion = 'borrar';
    this.topvisibleedicion = '50px';
    this.Consultarregistro(id);
    this.mostrarventanaedicion = true;
  }

  Modificar(id: number) {
    this.sololectura = false;
    this.operacion = 'modificar';
    this.Consultarregistro(id);
    this.mostrarventanaedicion = true;
  }

  Procesar() {
    this.objeto.idusuario = localStorage.getItem('idusuario');
    this.objeto.nombreusuario = localStorage.getItem('nombreusuario');

    if (this.operacion === 'agregar') {
      this.unidadesdemedidaservice.Add(this.objeto,this.idusuario,this.token_).subscribe({
        next: (data) => {
          this.errormessage = data.mensaje;
        },
      });
    }

    if (this.operacion === 'borrar') {
      this.unidadesdemedidaservice.Delete(this.objeto.id,this.idusuario,this.token_).subscribe({
        next: (data) => {
          this.errormessage = data.mensaje;
        },
      });
    }

    if (this.operacion === 'modificar') {
      this.unidadesdemedidaservice.Update(this.objeto,this.idusuario,this.token_).subscribe({
        next: (data) => {
          this.errormessage = data.mensaje;
        },
      });
    }

   this.arrayunidadesdemedida=[];
   
  }

  Cancelar() {
    this.operacion = 'listar';
    this.mostrarventanaedicion = false;
  }

  Refresh(filtro: string) {
    this.operacion = 'listar';
    this.errormessage="";
    this.unidadesdemedidaservice.GetAll(filtro,this.idusuario,this.token_).subscribe({
      next: (data) => {
        this.arrayunidadesdemedida = data;
      },
    });
  }

  /******************************************************************* */
  /*   funciones extras                                                */
  /******************************************************************* */
}
