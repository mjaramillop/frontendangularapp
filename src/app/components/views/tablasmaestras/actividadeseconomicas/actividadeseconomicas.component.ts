import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

//services
import { Actividadeseconomicasservice } from 'src/app/components/services/tablasmaestras/actividadeseconomicas.service';

//variables
import { Variables } from 'src/app/components/Utils/variables';
// models
import { Actividadeseconomicas } from 'src/app/components/models/tablasmaestras/actividadeseconomicas';

//dto
import { Responseactividadeseconomicasdto } from 'src/app/components/dto/tablasmaestras/responseactividadeseconomicasdto';

@Component({
  selector: 'app-actividadeseconomicas',
  templateUrl: './actividadeseconomicas.component.html',
})
export class ActividadeseconomicasComponent implements OnInit {
  constructor(
    private actividadeseconomicasservice: Actividadeseconomicasservice,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  // text model variables
  public objeto: Actividadeseconomicas;
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
  public arrayactividadeseconomicas: Responseactividadeseconomicasdto[] = [];

  ngOnInit(): void {
    this.variables = new Variables();
    this.objeto = new Actividadeseconomicas();
    this.permisos = this.activatedRoute.snapshot.paramMap.get('permisos');
    this.arrayactividadeseconomicas = [];
  }

  /**************************************************************** */
  /* funciones de consulta                                          */
  /**************************************************************** */

  Consultarregistro(id: number) {
    if (isNaN(id) === true) return;
    this.actividadeseconomicasservice.GetById(id,this.idusuario,this.token_).subscribe({
      next: (data) => {
        if (data.length === 0) return;
        this.objeto = new Actividadeseconomicas();
        this.objeto.id = data[0].id;
        this.objeto.nombre = data[0].nombre;
        this.objeto.estadodelregistro = data[0].estadodelregistro;
        this.arrayactividadeseconomicas = data;
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

    this.objeto = new Actividadeseconomicas();
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
    this.objeto.idusuario =  this.idusuario;
    this.objeto.nombreusuario = this.nombreusuario;

    if (this.operacion === 'agregar') {
      this.actividadeseconomicasservice.Add(this.objeto,this.idusuario,this.token_).subscribe({
        next: (data) => {
          this.errormessage = data.mensaje;
        },
      });
    }

    if (this.operacion === 'borrar') {
      this.actividadeseconomicasservice.Delete(this.objeto.id,this.idusuario,this.token_).subscribe({
        next: (data) => {
          this.errormessage = data.mensaje;
        },
      });
    }

    if (this.operacion === 'modificar') {
      this.actividadeseconomicasservice.Update(this.objeto,this.idusuario,this.token_).subscribe({
        next: (data) => {
          this.errormessage = data.mensaje;
        },
      });
    }
    this.arrayactividadeseconomicas=[];
   
  }

  Cancelar() {
    this.operacion = 'listar';
    this.mostrarventanaedicion = false;
  }

  Refresh(filtro: string) {
    this.operacion = 'listar';
    this.errormessage="";
    this.actividadeseconomicasservice.GetAll(filtro,this.idusuario,this.token_).subscribe({
      next: (data) => {
        this.arrayactividadeseconomicas = data;
      },
    });
  }

  /******************************************************************* */
  /*   funciones extras                                                */
  /******************************************************************* */
}
