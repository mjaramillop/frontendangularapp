

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

//services

import { Tiposdepersonaservice } from 'src/app/components/services/tablasmaestras/tiposdepersona.service';
//variables
import { Variables } from 'src/app/components/Utils/variables';
// models
import { Tiposdepersona } from 'src/app/components/models/tablasmaestras/tiposdepersona';

//dto
import { Responsetiposdepersonadto } from 'src/app/components/dto/tablasmaestras/responsetiposdepersonadto';
import { Validaciones } from 'src/app/components/Utils/validaciones';


@Component({
  selector: 'app-tiposdepersona',
  templateUrl: './tiposdepersona.component.html',
})



export class TiposdepersonaComponent implements OnInit {
  constructor(
    private tiposdepersonaservice: Tiposdepersonaservice,
    private activatedRoute: ActivatedRoute,
    private router: Router
   
  ) {}

  // text model variables
  public objeto: Tiposdepersona;
  public variables : Variables;
  public validaciones : Validaciones;

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
  public arraytiposdepersona: Responsetiposdepersonadto[] = [];



  
  ngOnInit(): void {
    this.variables=new Variables();
    this.objeto = new Tiposdepersona();
    this.permisos = this.activatedRoute.snapshot.paramMap.get('permisos');
    this.arraytiposdepersona = [];
    this.validaciones = new Validaciones();
  


  }

  /**************************************************************** */
  /* funciones de consulta                                          */
  /**************************************************************** */

  Consultarregistro(id: string) {
   
    this.tiposdepersonaservice.GetById(id,this.idusuario,this.token_).subscribe({
      next: (data) => {
        if (data.length === 0) return;
        this.objeto = new Tiposdepersona();
        this.objeto.id = data[0].id;
        this.objeto.nombre = data[0].nombre;
        this.objeto.estadodelregistro = data[0].estadodelregistro;
        this.arraytiposdepersona = data;
      },
    });
  }


  /***************************************************************************** */
  /* eventos de asignacion de valores */
  /******************************************************************************* */
  changeid(event: any) {
    this.objeto.id = event?.target.value;
  }

  
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
    
    this.objeto = new Tiposdepersona();
    this.mostrarventanaedicion=true;
  }

  Borrar(id: string) {
    this.sololectura = true;
    this.operacion = 'borrar';
   
    this.Consultarregistro(id);
    this.mostrarventanaedicion=true;

  }

  Modificar(id: string) {
    this.sololectura = false;
    this.operacion = 'modificar';
  
    this.Consultarregistro(id);
    this.mostrarventanaedicion=true;

  }

  Procesar() {

    this.objeto.idusuario=localStorage.getItem('idusuario')  ;
    this.objeto.nombreusuario=localStorage.getItem('nombreusuario');


    this.validaciones.mensajedeerror="";
    if (this.operacion === 'agregar') {
        this.validaciones.Validarnombre("id", this.objeto.id);
        if (this.validaciones.mensajedeerror.length>0)
        {
          this.errormessage=this.validaciones.mensajedeerror;
          return ;
        }

        

      this.tiposdepersonaservice.Add(this.objeto,this.idusuario,this.token_).subscribe({
        next: (data) => {
          this.errormessage=data.mensaje;
        },
      });
    }

    if (this.operacion === 'borrar') {
      this.tiposdepersonaservice.Delete(this.objeto.id,this.idusuario,this.token_).subscribe({
        next: (data) => {
          this.errormessage=data.mensaje;
        },
      });
    }

    if (this.operacion === 'modificar') {
      this.tiposdepersonaservice.Update(this.objeto,this.idusuario,this.token_).subscribe({
        next: (data) => {
          this.errormessage=data.mensaje;
        },
      });
    }

   
    this.arraytiposdepersona=[];
   

  }

  Cancelar() {
   
    this.operacion = 'listar';
    this.mostrarventanaedicion=false;
  }

  Refresh(filtro: string) {
    this.operacion = 'listar';
    this.errormessage="";
    this.tiposdepersonaservice.GetAll(filtro,this.idusuario,this.token_).subscribe({
      next: (data) => {
        this.arraytiposdepersona = data;
      },
    });
  }

  /******************************************************************* */
  /*   funciones extras                                                */
  /******************************************************************* */
}
