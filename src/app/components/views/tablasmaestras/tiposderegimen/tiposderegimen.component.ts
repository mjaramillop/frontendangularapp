import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

//services
import { Tiposderegimenservice } from 'src/app/components/services/tablasmaestras/tiposderegimen.service';
//variables
import { Variables } from 'src/app/components/Utils/variables';
// models
import { Tiposderegimen } from 'src/app/components/models/tablasmaestras/tiposderegimen';

//dto
import { Responsetiposderegimendto } from 'src/app/components/dto/tablasmaestras/responsetiposderegimendto';

@Component({
  selector: 'app-tiposderegimen',
  templateUrl: './tiposderegimen.component.html',
})
export class TiposderegimenComponent implements OnInit {
  constructor(
    private tiposderegimenservice: Tiposderegimenservice,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  // text model variables
  public objeto: Tiposderegimen;
  public variables: Variables;
  public  token_= localStorage.getItem("token");
  public idusuario = localStorage.getItem("idusuario");
  public nombreusuario = localStorage.getItem("nombreusuario");

  //standard const variables
  public errormessage: string = '';
  public operacion: string = '';
  public filtro: any = '';
  public sololectura: boolean = true;
  public permisos: any = '';
  public mostrarventanaedicion: boolean = false;

  // array de las entidades
  public arraytiposderegimen: Responsetiposderegimendto[] = [];

  ngOnInit(): void {
    this.variables = new Variables();
    this.objeto = new Tiposderegimen();
    this.permisos = this.activatedRoute.snapshot.paramMap.get('permisos');
    this.arraytiposderegimen = [];
  }

  /**************************************************************** */
  /* funciones de consulta                                          */
  /**************************************************************** */

  Consultarregistro(id: number) {
    if (isNaN(id) === true) return;
    this.tiposderegimenservice.GetById(id,this.idusuario,this.token_).subscribe({
      next: (data) => {
        if (data.length === 0) return;
        this.objeto = new Tiposderegimen();
        this.objeto.id = data[0].id;
        this.objeto.nombre = data[0].nombre;
        this.objeto.estadodelregistro = data[0].estadodelregistro;
        this.arraytiposderegimen = data;
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

    this.objeto = new Tiposderegimen();
    this.mostrarventanaedicion = true;
  }

  Borrar(id: number) {
    this.sololectura = true;
    this.operacion = 'borrar';

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
      this.tiposderegimenservice.Add(this.objeto,this.idusuario,this.token_).subscribe({
        next: (data) => {
          this.errormessage = data.mensaje;
        },
      });
    }

    if (this.operacion === 'borrar') {
      this.tiposderegimenservice.Delete(this.objeto.id,this.idusuario,this.token_).subscribe({
        next: (data) => {
          this.errormessage = data.mensaje;
        },
      });
    }

    if (this.operacion === 'modificar') {
      this.tiposderegimenservice.Update(this.objeto,this.idusuario,this.token_).subscribe({
        next: (data) => {
          this.errormessage = data.mensaje;
        },
      });
    }

    this.arraytiposderegimen=[];
  
  }

  Cancelar() {
    this.operacion = 'listar';
    this.mostrarventanaedicion = false;
  }

  Refresh(filtro: string) {
    this.operacion = 'listar';
    this.errormessage="";
    this.tiposderegimenservice.GetAll(filtro,this.idusuario,this.token_).subscribe({
      next: (data) => {
        this.arraytiposderegimen = data;
      },
    });
  }

  /******************************************************************* */
  /*   funciones extras                                                */
  /******************************************************************* */
}
