import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

//services
import { Proveedoresservice } from 'src/app/components/services/tablasmaestras/proveedores.service';
import { Actividadeseconomicasservice } from 'src/app/components/services/tablasmaestras/actividadeseconomicas.service';
import { Tiposdepersonaservice } from 'src/app/components/services/tablasmaestras/tiposdepersona.service';
import { Tiposdeagenteservice } from 'src/app/components/services/tablasmaestras/tiposdeagente.service';
import { Tiposderegimenservice } from 'src/app/components/services/tablasmaestras/tiposderegimen.service';
import { Tiposdecuentabancariaservice } from 'src/app/components/services/tablasmaestras/tiposdecuentabancaria.service';
import { Retencionesservice } from 'src/app/components/services/tablasmaestras/retenciones.service';

//variables
import { Variables } from 'src/app/components/Utils/variables';

// models
import { Proveedores } from 'src/app/components/models/tablasmaestras/proveedores';
import { Niveles } from 'src/app/components/modelsparameter/niveles';

//dto
import { Responseproveedoresdto } from 'src/app/components/dto/tablasmaestras/responseproveedoresdto';
import { Responseretencionesdto } from 'src/app/components/dto/tablasmaestras/responseretencionesdto';
import { Responseactividadeseconomicasdto } from 'src/app/components/dto/tablasmaestras/responseactividadeseconomicasdto';
import { Responsetiposdepersonadto } from 'src/app/components/dto/tablasmaestras/responsetiposdepersonadto';
import { Responsetiposderegimendto } from 'src/app/components/dto/tablasmaestras/responsetiposderegimendto';
import { Responsetiposdeagentedto } from 'src/app/components/dto/tablasmaestras/responsetiposdeagentedto';
import { Responsetiposdecuentabancariadto } from 'src/app/components/dto/tablasmaestras/responsetiposdecuentabancariadto';

// validaciones
import { Validaciones } from 'src/app/components/Utils/validaciones';

// utils
import { Utils } from 'src/app/components/Utils/Utils';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
})
export class ProveedoresComponent implements OnInit {
  constructor(
    private proveedoresservice: Proveedoresservice,
    private actividadeseconomicasservice: Actividadeseconomicasservice,
    private tiposdepersonaservice: Tiposdepersonaservice,
    private tiposdeagenteservice: Tiposdeagenteservice,
    private tiposderegimenservice: Tiposderegimenservice,
    private tiposdecuentabancaria: Tiposdecuentabancariaservice,
    private Retencionesservice: Retencionesservice,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  // text model variables
  public objeto: Proveedores;
  public variables: Variables;
  public validaciones: Validaciones;
  public utils: Utils;

   
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
  public arrayproveedores: Responseproveedoresdto[] = [];
  public arrayactividadeseconomicas: Responseactividadeseconomicasdto[] = [];
  public arraytiposdeagente: Responsetiposdeagentedto[] = [];
  public arraytiposdepersona: Responsetiposdepersonadto[] = [];
  public arraytiposderegimen: Responsetiposderegimendto[] = [];
  public arraytiposdecuentabancaria: Responsetiposdecuentabancariadto[] = [];
  public arrayretenciones: Responseretencionesdto[] = [];

  public arraycodigonombrenivel1: string[] = [];
  public arraycodigonombrenivel2: string[] = [];
  public arraycodigonombrenivel3: string[] = [];
  public arraycodigonombrenivel4: string[] = [];
  public arraycodigonombrenivel5: string[] = [];

  // variables extras
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

  public tipodeagentecliente: number = 0;
  public tipodeagenteproveedor: number = 0;
  public iconovisible: boolean = false;

  ngOnInit(): void {
    this.variables = new Variables();
    this.objeto = new Proveedores();
    this.permisos = this.activatedRoute.snapshot.paramMap.get('permisos');
    this.arrayproveedores = [];
    this.tipodeagentecliente = Number(this.variables.codigotipodeagentecliente);
    this.tipodeagenteproveedor = Number(
      this.variables.codigotipodeagenteproveedor
    );

    this.actividadeseconomicasservice.GetAll("*" , this.idusuario,this.token_).subscribe({
      next: (data) => {
        this.arrayactividadeseconomicas = data;
      },
    });

    this.tiposdepersonaservice.GetAll("*", this.idusuario,this.token_).subscribe({
      next: (data) => {
        this.arraytiposdepersona = data;
      },
    });

    this.tiposdeagenteservice.GetAll("*", this.idusuario,this.token_).subscribe({
      next: (data) => {
        this.arraytiposdeagente = data;
      },
    });

    this.tiposderegimenservice.GetAll("*", this.idusuario,this.token_).subscribe({
      next: (data) => {
        this.arraytiposderegimen = data;
      },
    });

    this.tiposdecuentabancaria.GetAll("*", this.idusuario,this.token_).subscribe({
      next: (data) => {
        this.arraytiposdecuentabancaria = data;
      },
    });

    this.Retencionesservice.GetAll("*", this.idusuario,this.token_).subscribe({
      next: (data) => {
        this.arrayretenciones = data;
      },
    });
  }

  /**************************************************************** */
  /* funciones de consulta                                          */
  /**************************************************************** */

  Consultarregistro(id: number) {
    if (isNaN(id) === true) return;
    this.proveedoresservice.GetById(id, this.idusuario,this.token_).subscribe({
      next: (data) => {
        if (data.length === 0) return;
        this.objeto = new Proveedores();
        this.objeto.id = data[0].id;
        this.objeto.nombre = data[0].nombre;
        this.objeto.direccion = data[0].direccion;
        this.objeto.telefono = data[0].telefono;
        this.objeto.celular1 = data[0].celular1;
        this.objeto.celular2 = data[0].celular2;
        this.objeto.email1 = data[0].email1;
        this.objeto.email2 = data[0].email2;
        this.objeto.nit = data[0].nit;
        this.objeto.fechadeingreso = data[0].fechadeingreso;
        this.objeto.observaciones = data[0].observaciones;
        this.objeto.contactos = data[0].contactos;
        this.objeto.actividadcomercial = data[0].actividadcomercial;
        this.objeto.seleretienefuente = data[0].seleretienefuente;
        this.objeto.seleretieneiva = data[0].seleretieneiva;
        this.objeto.seleretieneica = data[0].seleretieneica;
        this.objeto.puedecobrariva = data[0].puedecobrariva;
        this.objeto.espersonanaturalojuridica =
          data[0].espersonanaturalojuridica;
        this.objeto.declararenta = data[0].declararenta;
        this.objeto.esgrancontribuyente = data[0].esgrancontribuyente;
        this.objeto.tipoderegimen = data[0].tipoderegimen;
        this.objeto.tipodeagente = data[0].tipodeagente;
        this.objeto.cuentacontable = data[0].cuentacontable;
        this.objeto.codigoderetencionaaplicar =
          data[0].codigoderetencionaaplicar;
        this.objeto.cuentabancaria = data[0].cuentabancaria;
        this.objeto.tipodecuenta = data[0].tipodecuenta;
        this.objeto.nivel1 = data[0].nivel1;
        this.objeto.nivel2 = data[0].nivel2;
        this.objeto.nivel3 = data[0].nivel3;
        this.objeto.nivel4 = data[0].nivel4;
        this.objeto.nivel5 = data[0].nivel5;
        this.objeto.clavedeseguridadparapedidosporweb =
          data[0].clavedeseguridadparapedidosporweb;
        this.objeto.estadodelregistro = data[0].estadodelregistro;
        this.objeto.secargainventario = data[0].secargainventario;
       



        var element1 = <HTMLInputElement>document.getElementById('inputsecargainventario');
        var element2 = <HTMLInputElement>document.getElementById('inputseleretienefuente');
        var element3 = <HTMLInputElement>document.getElementById('inputseleretieneiva');
        var element4 = <HTMLInputElement>document.getElementById('inputseleretieneica');
        var element5 = <HTMLInputElement>document.getElementById('inputpuedecobrariva');
        var element6 = <HTMLInputElement>document.getElementById('inputdeclararenta');
        var element7 = <HTMLInputElement>document.getElementById('inputesgrancontribuyente');

        element1.checked=false;
        element2.checked=false;
        element3.checked=false;
        element4.checked=false;
        element5.checked=false;
        element6.checked=false;
        element7.checked=false;

       

        if (this.objeto.secargainventario==="S") element1.checked=true;
        if (this.objeto.seleretienefuente==="S") element2.checked=true;
        if (this.objeto.seleretieneiva==="S") element3.checked=true;
        if (this.objeto.seleretieneica==="S") element4.checked=true;
        if (this.objeto.puedecobrariva==="S") element5.checked=true;
        if (this.objeto.declararenta==="S") element6.checked=true;
        if (this.objeto.esgrancontribuyente==="S") element7.checked=true;

        this.arrayproveedores = data;
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
      this.proveedoresservice.GetNivel(1, this.idusuario,this.token_).subscribe({
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
      this.proveedoresservice.GetNivel(2, this.idusuario,this.token_).subscribe({
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
      this.proveedoresservice.GetNivel(3, this.idusuario,this.token_).subscribe({
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
      this.proveedoresservice.GetNivel(4, this.idusuario,this.token_).subscribe({
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
      this.proveedoresservice.GetNivel(5, this.idusuario,this.token_).subscribe({
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
  /* eventos de asignacion de valores */
  /******************************************************************************* */
  changenombre(event: any) {
    this.objeto.nombre = event?.target.value;
  }

  changedireccion(event: any) {
    this.objeto.direccion = event?.target.value;
  }

  changetelefono(event: any) {
    this.objeto.telefono = event?.target.value;
  }

  changecelular1(event: any) {
    this.objeto.celular1 = event?.target.value;
  }

  changecelular2(event: any) {
    this.objeto.celular2 = event?.target.value;
  }

  changeemail1(event: any) {
    this.objeto.email1 = event?.target.value;
  }

  changeemail2(event: any) {
    this.objeto.email2 = event?.target.value;
  }

  changenit(event: any) {
    this.objeto.nit = event?.target.value;
  }

  changeobservaciones(event: any) {
    this.objeto.observaciones = event?.target.value;
  }

  changecontactos(event: any) {
    this.objeto.contactos = event?.target.value;
  }

  changeactividadcomercial(event: any) {
    this.objeto.actividadcomercial = event?.target.value;
  }

  changeseleretienefuente(event: any) {
    this.objeto.seleretienefuente = event?.target.checked ? 'S' : 'N';
  }

  changeseleretieneiva(event: any) {
    this.objeto.seleretieneiva = event?.target.checked ? 'S' : 'N';
  }

  changeseleretieneica(event: any) {
    this.objeto.seleretieneica = event?.target.checked ? 'S' : 'N';
  }

  changepuedecobrariva(event: any) {
    this.objeto.puedecobrariva = event?.target.checked ? 'S' : 'N';
  }

  changeespersonanaturalojuridica(event: any) {
    this.objeto.espersonanaturalojuridica = event?.target.value;
  }

  changedeclararenta(event: any) {
    this.objeto.declararenta = event?.target.checked ? 'S' : 'N';
  }

  changeesgrancontribuyente(event: any) {
    this.objeto.esgrancontribuyente = event?.target.checked ? 'S' : 'N';
  }

  changetipoderegimen(event: any) {
    this.objeto.tipoderegimen = event?.target.value;
  }
  changetipodeagente(event: any) {
    this.objeto.tipodeagente = event?.target.value;
  }

  changecuentacontable(event: any) {
    this.objeto.cuentacontable = event?.target.value;
  }

  changecodiogderetencionaaplicar(event: any) {
    this.objeto.codigoderetencionaaplicar = event?.target.value;
  }

  changecuentabancaria(event: any) {
    this.objeto.cuentabancaria = event?.target.value;
  }

  changetipodecuenta(event: any) {
    this.objeto.tipodecuenta = event?.target.value;
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

  changeclavedeseguridadparapedidosporweb(event: any) {
    this.objeto.clavedeseguridadparapedidosporweb = event?.target.value;
  }

  changeestadodelregistro(event: any) {
    this.objeto.estadodelregistro = event?.target.value;
  }

  changesecargainventario(event: any) {
    this.objeto.secargainventario = event?.target.checked ? 'S' : 'N';
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

    let fecha = new Date();
    let mes = fecha.getMonth().toString();
    let dia = fecha.getDay().toString();

    if (mes.length <= 1) mes = '0' + mes;
    if (dia.length <= 1) dia = '0' + dia;

    this.objeto = new Proveedores();

    this.objeto.fechadeingreso =
      fecha.getFullYear().toString() + '-' + mes + '-' + dia;

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

    this.errormessage = '';

    if (this.operacion === 'agregar') {
      this.proveedoresservice.Add(this.objeto, this.idusuario,this.token_).subscribe({
        next: (data) => {
          this.errormessage = data.mensaje;
        },

        error: (e) => {
          // This block will only execute if catchError is used
        },
      });
    }

    if (this.operacion === 'borrar') {
      this.proveedoresservice.Delete(this.objeto.id, this.idusuario,this.token_).subscribe({
        next: (data) => {
          this.errormessage = data.mensaje;
        },
      });
    }

    if (this.operacion === 'modificar') {
      this.proveedoresservice.Update(this.objeto, this.idusuario,this.token_).subscribe({
        next: (data) => {
          this.errormessage = data.mensaje;
        },
      });
    }

    this.objeto.tipodeagente = -1;
    this.arrayproveedores = [];
  }

  Generarclave() {
    this.iconovisible = true;
    this.proveedoresservice.Generarclave(this.objeto.id, this.idusuario,this.token_).subscribe({
      next: (data) => {
        this.objeto.clavedeseguridadparapedidosporweb = data[0].mensaje;
        this.errormessage = data[1].mensaje;
      },
    });
  }

  Cancelar() {
    this.operacion = 'listar';
    this.mostrarventanaedicion = false;
    this.objeto = new Proveedores();
  }

  Refresh(filtro: string) {
    this.operacion = 'listar';
    this.errormessage = '';
    this.proveedoresservice.GetAll(filtro, this.idusuario,this.token_,0).subscribe({
      next: (data) => {
        this.arrayproveedores = data;
      },
    });
  }

  /******************************************************************* */
  /*   funciones extras                                                */
  /******************************************************************* */

  CambiarNiveles() {
    this.mostrarventanacambiarniveles = true;
  }

  Esclienteoproveedor(valor: Boolean) {
    if (
      this.objeto.tipodeagente === this.tipodeagentecliente ||
      this.objeto.tipodeagente === this.tipodeagenteproveedor
    ) {
      return true;
    }

    if (
      this.objeto.tipodeagente !== this.tipodeagentecliente &&
      this.objeto.tipodeagente !== this.tipodeagenteproveedor
    ) {
      return false;
    }

    return false;
  }
}
