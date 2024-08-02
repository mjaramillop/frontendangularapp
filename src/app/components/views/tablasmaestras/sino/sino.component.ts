import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

//services
import { Sinoservice } from 'src/app/components/services/tablasmaestras/sino.service';

//variables
import { Variables } from 'src/app/components/Utils/variables';
// models
import { Sino } from 'src/app/components/models/tablasmaestras/sino';

//dto
import { Responsesinodto } from 'src/app/components/dto/tablasmaestras/responsesinodto';
import { Validaciones } from 'src/app/components/Utils/validaciones';


@Component({
  selector: 'app-sino',
  templateUrl: './sino.component.html',
})



export class SinoComponent implements OnInit {
  constructor(
    private sinoservice: Sinoservice,
    private activatedRoute: ActivatedRoute,
    private router: Router
   
  ) {}

  // text model variables
  public objeto: Sino;
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
  public arraysino: Responsesinodto[] = [];



  
  ngOnInit(): void {
    this.variables=new Variables();
    this.objeto = new Sino();
    this.permisos = this.activatedRoute.snapshot.paramMap.get('permisos');
    this.arraysino = [];
    this.validaciones = new Validaciones();
  


  }

  /**************************************************************** */
  /* funciones de consulta                                          */
  /**************************************************************** */

  Consultarregistro(id: string) {
   
    this.sinoservice.GetById(id ,this.idusuario,this.token_).subscribe({
      next: (data) => {
        if (data.length === 0) return;
        this.objeto = new Sino();
        this.objeto.id = data[0].id;
        this.objeto.nombre = data[0].nombre;
        this.objeto.estadodelregistro = data[0].estadodelregistro;
        this.arraysino = data;
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
    
    this.objeto = new Sino();
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

    this.objeto.idusuario=  this.idusuario  ;
    this.objeto.nombreusuario= this.nombreusuario;


    this.validaciones.mensajedeerror="";
    if (this.operacion === 'agregar') {
        this.validaciones.Validarnombre("id", this.objeto.id);
        if (this.validaciones.mensajedeerror.length>0)
        {
          this.errormessage=this.validaciones.mensajedeerror;
          return ;
        }

        

      this.sinoservice.Add(this.objeto,this.idusuario,this.token_).subscribe({
        next: (data) => {
          this.errormessage=data.mensaje;
        },
      });
    }

    if (this.operacion === 'borrar') {
      this.sinoservice.Delete(this.objeto.id,this.idusuario,this.token_).subscribe({
        next: (data) => {
          this.errormessage=data.mensaje;
        },
      });
    }

    if (this.operacion === 'modificar') {
      this.sinoservice.Update(this.objeto,this.idusuario,this.token_).subscribe({
        next: (data) => {
          this.errormessage=data.mensaje;
        },
      });
    }

   
    this.arraysino=[];
   

  }

  Cancelar() {
   
    this.operacion = 'listar';
    this.mostrarventanaedicion=false;
  }

  Refresh(filtro: string) {
    this.operacion = 'listar';
    this.errormessage="";
    this.sinoservice.GetAll(filtro,this.idusuario,this.token_).subscribe({
      next: (data) => {
        this.arraysino = data;
      },
    });
  }

  /******************************************************************* */
  /*   funciones extras                                                */
  /******************************************************************* */
}
