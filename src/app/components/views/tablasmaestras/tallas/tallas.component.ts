import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

//services
import { Tallasservice } from 'src/app/components/services/tablasmaestras/tallas.service';

//variables
import { Variables } from 'src/app/components/Utils/variables';
// models
import { Tallas } from 'src/app/components/models/tablasmaestras/tallas';

//dto
import { Responsetallasdto } from 'src/app/components/dto/tablasmaestras/responsetallasdto';
// validaciones
import { Validaciones } from 'src/app/components/Utils/validaciones';

@Component({
  selector: 'app-tallas',
  templateUrl: './tallas.component.html',
})



export class TallasComponent implements OnInit {
  constructor(
    private tallasservice: Tallasservice,
    private activatedRoute: ActivatedRoute,
    private router: Router
   
  ) {}

  // text model variables
  public objeto: Tallas;
  public nombreestadodelregistro: string = '';
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
  public arraytallas: Responsetallasdto[] = [];



  
  ngOnInit(): void {
    this.variables=new Variables();
    this.objeto = new Tallas();
    this.permisos = this.activatedRoute.snapshot.paramMap.get('permisos');
    this.arraytallas = [];
    this.validaciones=new Validaciones();
  


  }

  /**************************************************************** */
  /* funciones de consulta                                          */
  /**************************************************************** */

  Consultarregistro(id: number) {
    if (isNaN(id) === true) return;
    this.tallasservice.GetById(id,this.idusuario,this.token_).subscribe({
      next: (data) => {
        if (data.length === 0) return;
        this.objeto = new Tallas();
        this.objeto.id = data[0].id;
        this.objeto.nombre = data[0].nombre;
        this.objeto.estadodelregistro = data[0].estadodelregistro;
        this.arraytallas = data;
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
    
    this.objeto = new Tallas();
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

    this.objeto.idusuario=  this.idusuario  ;
    this.objeto.nombreusuario= this.nombreusuario;

  

    if (this.operacion === 'agregar') {

      this.validaciones.mensajedeerror="";
      this.validaciones.Validarnumerico("id",this.objeto.id);
      if (this.validaciones.mensajedeerror.length>0){

        this.errormessage=this.validaciones.mensajedeerror;
        return;
      }

      this.tallasservice.Add(this.objeto,this.idusuario,this.token_).subscribe({
        next: (data) => {
          this.errormessage = data.mensaje;

        },
      });
    }

    if (this.operacion === 'borrar') {
      this.tallasservice.Delete(this.objeto.id,this.idusuario,this.token_).subscribe({
        next: (data) => {
          this.errormessage = data.mensaje;

        },
      });
    }

    if (this.operacion === 'modificar') {
      this.tallasservice.Update(this.objeto,this.idusuario,this.token_).subscribe({
        next: (data) => {
          this.errormessage = data.mensaje;

        },
      });
    }

   
   this.arraytallas=[];
   

  }

  Cancelar() {
   
    this.operacion = 'listar';
    this.mostrarventanaedicion=false;
  }

  Refresh(filtro: string) {
    this.operacion = 'listar';
    this.errormessage="";
    this.tallasservice.GetAll(filtro,this.idusuario,this.token_).subscribe({
      next: (data) => {
        this.arraytallas = data;
      },
    });
  }

  /******************************************************************* */
  /*   funciones extras                                                */
  /******************************************************************* */
}
