import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

//services
import { Formulasservice } from 'src/app/components/services/tablasmaestras/formulas.service';
import { Productosservice } from 'src/app/components/services/tablasmaestras/productos.service';
import { Unidadesdemedidaservice } from 'src/app/components/services/tablasmaestras/unidadesdemedida.service';

//variables
import { Variables } from 'src/app/components/Utils/variables';
// models
import { Formulas } from 'src/app/components/models/tablasmaestras/formulas';

//dto
import { Responseformulasdto } from 'src/app/components/dto/tablasmaestras/responseformulasdto';
import { Responseproductosdto } from 'src/app/components/dto/tablasmaestras/responseproductosdto';

@Component({
  selector: 'app-formulas',
  templateUrl: './formulas.component.html',
})
export class FormulasComponent implements OnInit {
  constructor(
    private formulasservice: Formulasservice,
    private productosservice: Productosservice,
    private unidaddemedidaservice: Unidadesdemedidaservice,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  // text model variables
  public objeto: Formulas;
  public variables: Variables;

  public nombreformula: string;
  public nombrecomponente: string;
  public nombreunidaddemedida: string;
  public unidaddemedida: string;

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
  public arrayformulas: Responseformulasdto[] = [];
  public arraycomponentes: Responseproductosdto[] = [];
  public arrayformulaprincipal: Responseproductosdto[] = [];

  ngOnInit(): void {
    this.variables = new Variables();

    this.objeto = new Formulas();
    this.permisos = this.activatedRoute.snapshot.paramMap.get('permisos');
    this.arrayformulas = [];
    this.unidaddemedida = '';
  }

  /**************************************************************** */
  /* funciones de consulta                                          */
  /**************************************************************** */

  Consultarregistro(id: number) {
    if (isNaN(id) === true) return;
    this.formulasservice.GetById(id,this.idusuario,this.token_).subscribe({
      next: (data) => {
        if (data.length === 0) return;
        this.objeto = new Formulas();
        this.objeto.id = data[0].id;
        this.objeto.formula = data[0].formula;
        this.objeto.componente = data[0].componente;
        this.objeto.cantidad = data[0].cantidad;

        this.arrayformulas = data;
      },
    });
  }

  Consultarformula() {
    this.productosservice.GetById(Number(this.objeto.formula),this.idusuario,this.token_).subscribe({
      next: (data) => {
        if (data.length === 0) return;
        this.nombreformula = data[0].nombre;
      },
    });
  }

  Consultarcomponente() {
    this.productosservice.GetById(Number(this.objeto.componente),this.idusuario,this.token_).subscribe({
      next: (data) => {
        if (data.length === 0) return;
        this.nombrecomponente = data[0].nombre;
        this.unidaddemedida = data[0].unidaddemedida;
        this.Consultarunidaddemedida();
      },
    });
  }

  Consultarunidaddemedida() {
    this.unidaddemedidaservice.GetById(Number(this.unidaddemedida),this.idusuario,this.token_).subscribe({
      next: (data) => {
        this.nombreunidaddemedida = data[0].nombre;
      },
    });
  }

  /***************************************************************************** */
  /* buscar */
  /******************************************************************************* */

  Buscarformula() {
    this.arrayformulaprincipal = [];
    this.productosservice.GetAll(this.objeto.formula,this.idusuario,this.token_).subscribe({
      next: (data) => {
        this.arrayformulaprincipal = data;
      },
    });
  }

  Buscarcomponente() {
    this.arraycomponentes = [];
    this.productosservice.GetAll(this.objeto.componente,this.idusuario,this.token_).subscribe({
      next: (data) => {
        this.arraycomponentes = data;
      },
    });
  }

  /***************************************************************************** */
  /* eventos de asignacion de valores */
  /******************************************************************************* */
  changeformula(event: any) {
    this.objeto.formula = event?.target.value;
  }

  changecomponente(event: any) {
    this.objeto.componente = event?.target.value;
  }

  changecantidad(event: any) {
    this.objeto.cantidad = event?.target.value;
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
    this.objeto = new Formulas();
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
    this.objeto.idusuario =   this.idusuario;
    this.objeto.nombreusuario = this.nombreusuario;

    if (this.operacion === 'agregar') {
      this.formulasservice.Add(this.objeto,this.idusuario,this.token_).subscribe({
        next: (data) => {
          this.errormessage = data.mensaje;
        },
      });
    }

    if (this.operacion === 'borrar') {
      this.formulasservice.Delete(this.objeto.id,this.idusuario,this.token_).subscribe({
        next: (data) => {
          this.errormessage = data.mensaje;
        },
      });
    }

    if (this.operacion === 'modificar') {
      this.formulasservice.Update(this.objeto,this.idusuario,this.token_).subscribe({
        next: (data) => {
          this.errormessage = data.mensaje;
        },
      });
    }

   this.arrayformulas=[];
  
  }

  Cancelar() {
    this.operacion = 'listar';
    this.mostrarventanaedicion = false;
  }

  Refresh(filtro: string) {
    this.operacion = 'listar';
    this.errormessage="";
    this.formulasservice.GetAll(filtro,this.idusuario,this.token_).subscribe({
      next: (data) => {
        this.arrayformulas = data;
      },
    });
  }

  /******************************************************************* */
  /*   funciones extras                                                */
  /******************************************************************* */
}
