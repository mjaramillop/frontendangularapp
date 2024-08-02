import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

//services
import { Retencionesservice } from 'src/app/components/services/tablasmaestras/retenciones.service';
//variables
import { Variables } from 'src/app/components/Utils/variables';
// models
import { Retenciones } from 'src/app/components/models/tablasmaestras/retenciones';

//dto
import { Responseretencionesdto } from 'src/app/components/dto/tablasmaestras/responseretencionesdto';

@Component({
  selector: 'app-retenciones',
  templateUrl: './retenciones.component.html',
})
export class RetencionesComponent {
  constructor(
    private retencionesservice: Retencionesservice,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  // text model variables
  public objeto: Retenciones;
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
  public arrayretenciones: Responseretencionesdto[] = [];

  ngOnInit(): void {
    this.variables = new Variables();
    this.objeto = new Retenciones();
    this.permisos = this.activatedRoute.snapshot.paramMap.get('permisos');
    this.arrayretenciones = [];
  }

  /**************************************************************** */
  /* funciones de consulta                                          */
  /**************************************************************** */

  Consultarregistro(id: number) {
    if (isNaN(id) === true) return;
    this.retencionesservice.GetById(id,this.idusuario,this.token_).subscribe({
      next: (data) => {
        if (data.length === 0) return;
        this.objeto = new Retenciones();
        this.objeto.id = data[0].id;
        this.objeto.nombre = data[0].nombre;
        this.objeto.porcentaje = data[0].porcentaje;
        this.objeto.basedelaretencion = data[0].basedelaretencion;
        this.objeto.estadodelregistro = data[0].estadodelregistro;
        this.arrayretenciones = data;
      },
    });
  }

  /***************************************************************************** */
  /* eventos de asignacion de valores */
  /******************************************************************************* */
  changenombre(event: any) {
    this.objeto.nombre = event?.target.value;
  }

  changeporcentaje(event: any) {
    this.objeto.porcentaje = event?.target.value;
  }

changebasedelaretencion(event: any) {
    this.objeto.basedelaretencion = event?.target.value;
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

    this.objeto = new Retenciones();
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
      this.retencionesservice.Add(this.objeto,this.idusuario,this.token_).subscribe({
        next: (data) => {
          this.errormessage = data.mensaje;
        },
      });
    }

    if (this.operacion === 'borrar') {
      this.retencionesservice.Delete(this.objeto.id,this.idusuario,this.token_).subscribe({
        next: (data) => {
          this.errormessage = data.mensaje;
        },
      });
    }

    if (this.operacion === 'modificar') {
      this.retencionesservice.Update(this.objeto,this.idusuario,this.token_).subscribe({
        next: (data) => {
          this.errormessage = data.mensaje;
        },
      });
    }

      this.arrayretenciones=[];
   
  }

  Cancelar() {
    this.operacion = 'listar';
    this.mostrarventanaedicion = false;
  }

  Refresh(filtro: string) {
    this.operacion = 'listar';
    this.errormessage="";
    this.retencionesservice.GetAll(filtro,this.idusuario,this.token_).subscribe({
      next: (data) => {
        this.arrayretenciones = data;
      },
    });
  }

  /******************************************************************* */
  /*   funciones extras                                                */
  /******************************************************************* */
}
