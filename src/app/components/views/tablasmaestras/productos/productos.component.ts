import {
  Component,
  OnInit,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { saveAs } from 'file-saver';

//services
import { Productosservice } from 'src/app/components/services/tablasmaestras/productos.service';
import { Unidadesdemedidaservice } from 'src/app/components/services/tablasmaestras/unidadesdemedida.service';
import { Ivasservice } from 'src/app/components/services/tablasmaestras/ivas.service';
import { Sinoservice } from 'src/app/components/services/tablasmaestras/sino.service';
import { Utilsservice } from 'src/app/components/services/utils/utils.service';
import { FileUploadService } from 'src/app/components/services/utils/file-upload.service';

//variables
import { Variables } from 'src/app/components/Utils/variables';
// models

import { Productos } from 'src/app/components/models/tablasmaestras/productos';
import { Niveles } from 'src/app/components/modelsparameter/niveles';


//dto
import { Responseproductosdto } from 'src/app/components/dto/tablasmaestras/responseproductosdto';
import { Responseunidadesdemedidadto } from 'src/app/components/dto/tablasmaestras/responseunidadesdemedidadto';
import { Responseivasdto } from 'src/app/components/dto/tablasmaestras/responseivasdto';
import { Responsesinodto } from 'src/app/components/dto/tablasmaestras/responsesinodto';

// validaciones
import { Validaciones } from 'src/app/components/Utils/validaciones';

// utils
import { Utils } from 'src/app/components/Utils/Utils';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
})
export class ProductosComponent implements OnInit {
  // text model variables
  public objeto: Productos;
  public variables: Variables;
  public validaciones: Validaciones;
  public utils: Utils;
  public nombreunidaddemedida: string = '';
  public nombrecodigoiva1: string = '';

  
  public  token_= localStorage.getItem("token");
  public idusuario = localStorage.getItem("idusuario");
  public nombreusuario = localStorage.getItem("nombreusuario");



  //standard const variables
  public errormessage: string = '';
  public operacion: string = '';
  public filtro: any = '';
  public sololectura: boolean = true;
  public permisos: any = '';

  // array de las entidades
  public arrayProductos: Responseproductosdto[] = [];
  public arrayunidadesdemedida: Responseunidadesdemedidadto[] = [];
  public arrayivas: Responseivasdto[] = [];
  public arraysino: Responsesinodto[] = [];

  public arraycodigonombrenivel1: string[] = [];
  public arraycodigonombrenivel2: string[] = [];
  public arraycodigonombrenivel3: string[] = [];
  public arraycodigonombrenivel4: string[] = [];
  public arraycodigonombrenivel5: string[] = [];

  //  variables extras
  public niveles: Niveles;
  public filtronivel1remplazar: string = '';
  public filtronivel2remplazar: string = '';
  public filtronivel3remplazar: string = '';
  public filtronivel4remplazar: string = '';
  public filtronivel5remplazar: string = '';

  public filtronivel1remplazarpor: string = '';
  public filtronivel2remplazarpor: string = '';
  public filtronivel3remplazarpor: string = '';
  public filtronivel4remplazarpor: string = '';
  public filtronivel5remplazarpor: string = '';

  public nivel1: string = '';
  public nivel2: string = '';
  public nivel3: string = '';
  public nivel4: string = '';
  public nivel5: string = '';

  public mostrarventanaedicion: boolean = false;
  public mostrarventanacambiarniveles: boolean = false;
  public mostrarventanacambiarprecios: boolean = false;

  constructor(
    private productosservice: Productosservice,
    private unidaddemedidaservice: Unidadesdemedidaservice,
    private ivasservice: Ivasservice,
    private activatedRoute: ActivatedRoute,
    private sinoservice: Sinoservice,
    private utilsservice: Utilsservice,
    private router: Router,
    private fileuploadservice: FileUploadService
  ) {}

  ngOnInit(): void {
    this.variables = new Variables();
    this.validaciones = new Validaciones();
    this.utils = new Utils(this.fileuploadservice);
    this.objeto = new Productos();
    this.permisos = this.activatedRoute.snapshot.paramMap.get('permisos');
    this.arrayProductos = [];
    this.arraysino = [];

    this.sinoservice.GetAll("*",this.idusuario,this.token_).subscribe({
      next: (data) => {
        this.arraysino = data;
      },
    });
  }

  /**************************************************************** */
  /* funciones de consulta                                          */
  /**************************************************************** */

  Consultarregistro(id: number) {
    this.arraycodigonombrenivel1 = [];
    this.arraycodigonombrenivel2 = [];
    this.arraycodigonombrenivel3 = [];
    this.arraycodigonombrenivel4 = [];
    this.arraycodigonombrenivel5 = [];

    if (isNaN(id) === true) return;
    this.productosservice.GetById(id,this.idusuario,this.token_).subscribe({
      next: (data) => {
        if (data.length === 0) return;
        this.objeto = new Productos();
        this.objeto.id = data[0].id;
        this.objeto.codigoiva1 = data[0].codigoiva1;
        this.objeto.costoultimo = data[0].costoultimo;
        this.objeto.precio1 = data[0].precio1;
        this.objeto.secargalinventario = data[0].secargalinventario;
        this.objeto.nombre = data[0].nombre;
        this.objeto.unidaddemedida = data[0].unidaddemedida;
        this.objeto.nivel1 = data[0].nivel1;
        this.objeto.nivel2 = data[0].nivel2;
        this.objeto.nivel3 = data[0].nivel3;
        this.objeto.nivel4 = data[0].nivel4;
        this.objeto.nivel5 = data[0].nivel5;
        this.objeto.estadodelregistro = data[0].estadodelregistro;
        this.objeto.idusuario = this.idusuario;
        this.arrayProductos = data;

        this.Consultarcodigoiva1();
        this.Consultarunidaddemedida();
      },
    });
  }

  Consultarunidaddemedida() {
    this.nombreunidaddemedida = '.';

    this.unidaddemedidaservice
      .GetById(Number(this.objeto.unidaddemedida), this.idusuario,this.token_)
      .subscribe({
        next: (data) => {
          this.nombreunidaddemedida = data[0].nombre;
        },
      });
  }

  Consultarcodigoiva1() {
    this.nombrecodigoiva1 = '.';

    this.ivasservice.GetById(Number(this.objeto.codigoiva1),this.idusuario,this.token_).subscribe({
      next: (data) => {
        this.nombrecodigoiva1 = data[0].nombre;
      },
    });
  }

  consultarnivel1(event: any) {
    if (event.key !== 'Enter') {
      return;
    }
    let element = null;

    if (this.objeto.nivel1.includes('*')) {
      this.arraycodigonombrenivel1 = [];
      this.productosservice.GetNivel(1,this.idusuario,this.token_).subscribe({
        next: (data) => {
          this.arraycodigonombrenivel1 = data;
        },
      });
      element = document.getElementById('selectnivel1');
      if (element != null) element.focus();
      return;
    }

    element = document.getElementById('inputnivel2');
    if (element != null) element.focus();
  }

  consultarnivel2(event: any) {
    if (event.key !== 'Enter') {
      return;
    }

    let element = null;

    if (this.objeto.nivel2.includes('*')) {
      element = document.getElementById('selectnivel2');
      if (element != null) element.focus();
      this.arraycodigonombrenivel2 = [];
      this.productosservice.GetNivel(2,this.idusuario,this.token_).subscribe({
        next: (data) => {
          this.arraycodigonombrenivel2 = data;
        },
      });

      return;
    }

    element = document.getElementById('inputnivel3');
    if (element != null) element.focus();
  }

  consultarnivel3(event: any) {
    if (event.key !== 'Enter') {
      return;
    }

    let element = null;

    if (this.objeto.nivel3.includes('*')) {
      element = document.getElementById('selectnivel3');
      if (element != null) element.focus();
      this.arraycodigonombrenivel3 = [];
      this.productosservice.GetNivel(3,this.idusuario,this.token_).subscribe({
        next: (data) => {
          this.arraycodigonombrenivel3 = data;
        },
      });

      return;
    }

    element = document.getElementById('inputnivel4');
    if (element != null) element.focus();
  }

  consultarnivel4(event: any) {
    if (event.key !== 'Enter') {
      return;
    }

    let element = null;

    if (this.objeto.nivel4.includes('*')) {
      element = document.getElementById('selectnivel4');
      if (element != null) element.focus();
      this.arraycodigonombrenivel4 = [];
      this.productosservice.GetNivel(4,this.idusuario,this.token_).subscribe({
        next: (data) => {
          this.arraycodigonombrenivel4 = data;
        },
      });

      return;
    }
    element = document.getElementById('inputnivel5');
    if (element != null) element.focus();
  }

  consultarnivel5(event: any) {
    if (event.key !== 'Enter') {
      return;
    }

    let element = null;

    if (this.objeto.nivel5.includes('*')) {
      element = document.getElementById('selectnivel5');
      if (element != null) element.focus();
      this.arraycodigonombrenivel5 = [];
      this.productosservice.GetNivel(5,this.idusuario,this.token_).subscribe({
        next: (data) => {
          this.arraycodigonombrenivel5 = data;
        },
      });

      return;
    }

    element = document.getElementById('inputestadodelregistro');
    if (element != null) element.focus();
  }

  /***************************************************************************** */
  /* buscar */
  /******************************************************************************* */

  Buscarunidaddemedida() {
    this.arrayunidadesdemedida = [];
    this.unidaddemedidaservice.GetAll(this.objeto.unidaddemedida,this.idusuario,this.token_).subscribe({
      next: (data) => {
        this.arrayunidadesdemedida = data;
      },
    });
  }

  Buscarcodigoiva1() {
    this.arrayivas = [];
    this.ivasservice.GetAll(this.objeto.codigoiva1,this.idusuario,this.token_).subscribe({
      next: (data) => {
        this.arrayivas = data;
      },
    });
  }

  /***************************************************************************** */
  /* eventos de asignacion de valores */
  /******************************************************************************* */
  changenombre(event: any) {
    this.objeto.nombre = event?.target.value;
  }

  changeunidaddemedida(event: any) {
    this.objeto.unidaddemedida = event?.target.value;
  }

  changeprecio1(event: any) {
    this.objeto.precio1 = event?.target.value;
  }
  changecostoultimo(event: any) {
    this.objeto.costoultimo = event?.target.value;
  }

  changecodigoiva1(event: any) {
    this.objeto.codigoiva1 = event?.target.value;
  }

  changesecargaalinventario(event: any) {
    this.objeto.secargalinventario = event?.target.value;
  }

  changenivel1(event: any) {
    this.objeto.nivel1 = event?.target.value;
    this.nivel1 = event?.target.value;
    const element = document.getElementById('inputnivel1');
    if (element != null) element.focus();
  }

  changenivel2(event: any) {
    this.objeto.nivel2 = event?.target.value;
    this.nivel2 = event?.target.value;
    const element = document.getElementById('inputnivel2');
    if (element != null) element.focus();
  }
  changenivel3(event: any) {
    this.objeto.nivel3 = event?.target.value;
    this.nivel3 = event?.target.value;
    const element = document.getElementById('inputnivel3');
    if (element != null) element.focus();
  }
  changenivel4(event: any) {
    this.objeto.nivel4 = event?.target.value;
    this.nivel4 = event?.target.value;
    const element = document.getElementById('inputnivel4');
    if (element != null) element.focus();
  }
  changenivel5(event: any) {
    this.objeto.nivel5 = event?.target.value;
    this.nivel5 = event?.target.value;
    const element = document.getElementById('inputnivel5');
    if (element != null) element.focus();
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
    this.objeto = new Productos();
    this.objeto.nivel1 = this.nivel1;
    this.objeto.nivel2 = this.nivel2;
    this.objeto.nivel3 = this.nivel3;
    this.objeto.nivel4 = this.nivel4;
    this.objeto.nivel5 = this.nivel5;

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

    this.nivel1 = this.objeto.nivel1;
    this.nivel2 = this.objeto.nivel2;
    this.nivel3 = this.objeto.nivel3;
    this.nivel4 = this.objeto.nivel4;
    this.nivel5 = this.objeto.nivel5;
    this.validaciones.mensajedeerror = '';

    this.validaciones.Validarvalormenorquecero(
      'Precio de venta ',
      this.objeto.precio1
    );

    if (this.validaciones.mensajedeerror !== '') {
      this.errormessage=this.validaciones.mensajedeerror;
      return;
    }

    if (this.operacion === 'agregar') {
     
      this.productosservice.Add(this.objeto,this.idusuario,this.token_).subscribe({
        next: (data) => {
          this.errormessage = data.mensaje;
        },
      });
    }

    if (this.operacion === 'borrar') {
      this.productosservice.Delete(this.objeto.id,this.idusuario,this.token_).subscribe({
        next: (data) => {
          this.errormessage = data.mensaje;
        },
      });
    }

    if (this.operacion === 'modificar') {
      this.productosservice.Update(this.objeto,this.idusuario,this.token_).subscribe({
        next: (data) => {
          this.errormessage = data.mensaje;
        },
      });
    }

   
  
  }

  Cancelar() {
    this.operacion = 'listar';
    this.mostrarventanaedicion = false;
  }

  Refresh(filtro: string) {
    this.operacion = 'listar';
    this.productosservice.GetAll(this.filtro,this.idusuario,this.token_).subscribe({
      next: (data) => {
        this.arrayProductos = data;
      },
    });
  }

  /************************************************************************************ */
  /*funciones extras */
  /*************************************************************************************** */

  Uploadfile(ruta:string ,nombredelarchivoacargar:string ,directorio:string ,idusuario:number, tipodedocumento:number  ) 
    {

     
    this.utils.onUploadfile( ruta,nombredelarchivoacargar, directorio,idusuario, tipodedocumento);
  }

  CambiarNiveles() {
    this.mostrarventanacambiarniveles = true;
  }

  CambiarPrecios() {
    this.mostrarventanacambiarprecios = true;
  }

  download() {
    this.utilsservice
      .downloadFile(this.objeto.id)
      .subscribe((data) => saveAs(data, 'Example.docx'));
  }
}
