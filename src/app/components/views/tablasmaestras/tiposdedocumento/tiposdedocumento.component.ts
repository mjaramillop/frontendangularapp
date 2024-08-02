import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

//services
import { Tiposdedocumentoservice } from 'src/app/components/services/tablasmaestras/tiposdedocumento.service';
import { Sinoservice } from 'src/app/components/services/tablasmaestras/sino.service';
import { Proveedoresservice } from 'src/app/components/services/tablasmaestras/proveedores.service';
import { Tiposdeagenteservice } from 'src/app/components/services/tablasmaestras/tiposdeagente.service';
//variables
import { Variables } from 'src/app/components/Utils/variables';
// models

import { Tiposdedocumento } from 'src/app/components/models/tablasmaestras/tiposdedocumento';

//dto
import { Responsetiposdedocumentodto } from 'src/app/components/dto/tablasmaestras/responsetiposdedocumento';
import { Responsesinodto } from 'src/app/components/dto/tablasmaestras/responsesinodto';
import { Responseproveedoresdto } from 'src/app/components/dto/tablasmaestras/responseproveedoresdto';
import { Responsetiposdeagentedto } from 'src/app/components/dto/tablasmaestras/responsetiposdeagentedto';

@Component({
  selector: 'app-tiposdedocumento',
  templateUrl: './tiposdedocumento.component.html',
})
export class TiposdedocumentoComponent {
  constructor(
    private tiposdedocumentoservice: Tiposdedocumentoservice,
    private sinoservice : Sinoservice,
    private proveedoresservice : Proveedoresservice,
    private tiposdeagenteservice : Tiposdeagenteservice,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  // text model variables
  public objeto: Tiposdedocumento;
  public variables:Variables;
  public nombredespacha: string = '';
  public nombrerecibe: string = '';
  public nombretipodeagentedespacha="";
  public nombretipodeagenterecibe="";
  public mostrarventanaedicion:boolean=false;

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
  public arraytiposdedocumento: Responsetiposdedocumentodto[] = [];
  public arraysino:  Responsesinodto[] = [];
  public arrayproveedores:  Responseproveedoresdto[] = [];
  public arraytiposdeagente : Responsetiposdeagentedto[]=[];
  
  

  ngOnInit(): void {
    this.variables=new Variables();
    this.objeto = new Tiposdedocumento();
    this.permisos = this.activatedRoute.snapshot.paramMap.get('permisos');
    this.arraytiposdedocumento = [];
    this.arraysino=[];
    
    this.sinoservice.GetAll("*",this.idusuario,this.token_)
    .subscribe({
      next: (data) => {
        this.arraysino = data;
      },
    });



  }

  /**************************************************************** */
  /* funciones de consulta                                          */
  /**************************************************************** */

  Consultarregistro(id: number) {
    this.objeto = new Tiposdedocumento();

    
   
    this.tiposdedocumentoservice.GetById(id,this.idusuario,this.token_).subscribe({
      next: (data) => {
    
    

        this.objeto.id = data[0].id;
        this.objeto.nombre = data[0].nombre;
        this.objeto.abreviatura = data[0].abreviatura;
        this.objeto.consecutivo = data[0].consecutivo;
        this.objeto.cuentacontabledebito = data[0].cuentacontabledebito;
        this.objeto.cuentacontablecredito = data[0].cuentacontablecredito;
        this.objeto.despacha = data[0].despacha;
        this.objeto.recibe = data[0].recibe;
       
        this.objeto.pidefechadevencimiento = data[0].pidefechadevencimiento;
        this.objeto.pideprograma = data[0].pideprograma;
        this.objeto.pideconceptonotadebitocredito =
          data[0].pideconceptonotadebitocredito;
        this.objeto.pidevendedor = data[0].pidevendedor;
        this.objeto.pidetipodedocumentoaafectar =
          data[0].pidetipodedocumentoaafectar;
        this.objeto.pideproducto = data[0].pideproducto;
        this.objeto.pidetalla = data[0].pidetalla;
        this.objeto.pidecolor = data[0].pidecolor;
        this.objeto.pideempaque = data[0].pideempaque;
        this.objeto.pidecantidad = data[0].pidecantidad;
        this.objeto.pidevalorunitario = data[0].pidevalorunitario;
    
        this.objeto.pidedescuentodetalle = data[0].pidedescuentodetalle;
        this.objeto.pideivadetalle = data[0].pideivadetalle;
        this.objeto.pidetipodedocumentoaafectardetalle =
          data[0].pidetipodedocumentoaafectardetalle;
        this.objeto.pideconsecutivoautomatico =
          data[0].pideconsecutivoautomatico;
        this.objeto.eldocumentoseimprime = data[0].eldocumentoseimprime;
        this.objeto.esunacompra = data[0].esunacompra;
        this.objeto.esunaventa = data[0].esunaventa;
        this.objeto.esunpago = data[0].esunpago;
        this.objeto.restarcartera = data[0].restarcartera;
        this.objeto.sumarcartera = data[0].sumarcartera;
        this.objeto.restainventario = data[0].restainventario;
        this.objeto.sumainventario = data[0].sumainventario;
        this.objeto.saldarcantidadesdeldocumentollamado =
          data[0].saldarcantidadesdeldocumentollamado;
        this.objeto.leyendaimpresaeneldocumento =
          data[0].leyendaimpresaeneldocumento;
        this.objeto.pidefisico = data[0].pidefisico;
       
        this.objeto.eldocumentoallamarsolosepuedellamarunavez =
          data[0].eldocumentoallamarsolosepuedellamarunavez;
        this.objeto.eldocumentoseimprimeanombrededespachaorecibe =
          data[0].eldocumentoseimprimeanombrededespachaorecibe;
        this.objeto.esunanota = data[0].esunanota;
        this.objeto.esuninventarioinicial = data[0].esuninventarioinicial;
       
        this.objeto.titulodespacha = data[0].titulodespacha;
        this.objeto.titulorecibe = data[0].titulorecibe;
        this.objeto.transaccionesquepuedellamar =
          data[0].transaccionesquepuedellamar;
       
        this.objeto.estadodelregistro = data[0].estadodelregistro;

        this.arraytiposdedocumento = data;
      },
    });
  }


  Consultardespacha() {
    this.nombredespacha = '.';

    this.proveedoresservice
      .GetById(parseInt( this.objeto.despacha) ,this.idusuario,this.token_ )
      .subscribe({
        next: (data) => {
          this.nombredespacha = data[0].nombre;
        },
      });
  }

  
  Buscardespacha() {
    this.arrayproveedores = [];
    this.proveedoresservice
      .GetAll(this.objeto.despacha,this.idusuario,this.token_)
      .subscribe({
        next: (data) => {
          this.arrayproveedores = data;
        },
      });
  }



  Consultarrecibe() {
    this.nombrerecibe = '.';

    this.proveedoresservice
      .GetById(parseInt( this.objeto.recibe),this.idusuario,this.token_)
      .subscribe({
        next: (data) => {
          this.nombrerecibe = data[0].nombre;
        },
      });
  }

  
  Buscarrecibe() {
    this.arrayproveedores = [];
    this.proveedoresservice
      .GetAll(this.objeto.recibe,this.idusuario,this.token_)
      .subscribe({
        next: (data) => {
          this.arrayproveedores = data;
        },
      });
  }

   


  /***************************************************************************** */
  /* eventos de asignacion de valores */
  /******************************************************************************* */
  changenombre(event: any) {
    this.objeto.nombre = event?.target.value;
  }

  changeabreviatura(event: any) {
    this.objeto.abreviatura = event?.target.value;
  }

  changeconsecutivo(event: any) {
    this.objeto.consecutivo = parseInt( event?.target.value);
  }

  changecuentacontabledebito(event: any) {
    this.objeto.cuentacontabledebito = event?.target.value;
  }

  changecuentacontablecredito(event: any) {
    this.objeto.cuentacontablecredito = event?.target.value;
  }

  changedespacha(event: any) {
    this.objeto.despacha = event?.target.value;
  }

  changerecibe(event: any) {
    this.objeto.recibe = event?.target.value;
  }




  changepidefechadevencimiento(event: any) {
    this.objeto.pidefechadevencimiento = event?.target.value;
  }

  changepideprograma(event: any) {
    this.objeto.pideprograma = event?.target.value;
  }


  changepideconceptonotadebitocredito(event: any) {
    this.objeto.pideconceptonotadebitocredito = event?.target.value;
  }

  changepidevendedor(event: any) {
    this.objeto.pidevendedor = event?.target.value;
  }


  
  changepidetipodedocumentoaafectar(event: any) {
    this.objeto.pidetipodedocumentoaafectar = event?.target.value;
  }



  changepideproducto(event: any) {
    this.objeto.pideproducto = event?.target.value;
  }
  changepidetalla(event: any) {
    this.objeto.pidetalla = event?.target.value;
  }

  changepidecolor(event: any) {
    this.objeto.pidecolor = event?.target.value;
  }

  changepideempaque(event: any) {
    this.objeto.pideempaque = event?.target.value;
  }
  changepidecantidad(event: any) {
    this.objeto.pidecantidad = event?.target.value;
  }

  changepidevalorunitario(event: any) {
    this.objeto.pidevalorunitario = event?.target.value;
  }


  changepidedescuentodetalle(event: any) {
    this.objeto.pidedescuentodetalle = event?.target.value;
  }

  changepideivadetalle(event: any) {
    this.objeto.pideivadetalle = event?.target.value;
  }

  changepidetipodedocumentoaafectardetalle(event: any) {
    this.objeto.pidetipodedocumentoaafectardetalle = event?.target.value;
  }

  changepideconsecutivoautomatico(event: any) {
    this.objeto.pideconsecutivoautomatico = event?.target.value;
  }

  changeeldocumentoseimprime(event: any) {
    this.objeto.eldocumentoseimprime = event?.target.value;
  }

  changeesunacompra(event: any) {
    this.objeto.esunacompra = event?.target.value;
  }

  changeesunaventa(event: any) {
    this.objeto.esunaventa = event?.target.value;
  }
  changeesunpago(event: any) {
    this.objeto.esunpago = event?.target.value;
  }

  changerestarcartera(event: any) {
    this.objeto.restarcartera = event?.target.value;
  }

  changesumarcartera(event: any) {
    this.objeto.sumarcartera = event?.target.value;
  }


  changerestainventario(event: any) {
    this.objeto.restainventario = event?.target.value;
  }


  changesumainventario(event: any) {
    this.objeto.sumainventario = event?.target.value;
  }



  changesaldarcantidadesdeldocumentollamado(event: any) {
    this.objeto.saldarcantidadesdeldocumentollamado = event?.target.value;
  }


  
  changeleyendaimpresaeneldocumento(event: any) {
    this.objeto.leyendaimpresaeneldocumento = event?.target.value;
  }

 
  changepidefisico(event: any) {
    this.objeto.pidefisico = event?.target.value;
  }


 

  changeeldocumentoallamarsolosepuedellamarunavez(event: any) {
    this.objeto.eldocumentoallamarsolosepuedellamarunavez = event?.target.value;
  }

  
  changeeldocumentoseimprimeanombrededespachaorecibe(event: any) {
    this.objeto.eldocumentoseimprimeanombrededespachaorecibe = event?.target.value;
  }
 

  changeesunanota(event: any) {
    this.objeto.esunanota = event?.target.value;
  }

  changeesuninventarioinicial(event: any) {
    this.objeto.esuninventarioinicial = event?.target.value;
  }

  changetitulodespacha(event: any) {
    this.objeto.titulodespacha = event?.target.value;
  }

  changetitulorecibe(event: any) {
    this.objeto.titulorecibe = event?.target.value;
  }

  changetransaccionesquepuedellamar(event: any) {
    this.objeto.transaccionesquepuedellamar = event?.target.value;
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
    this.objeto = new Tiposdedocumento();
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
    this.objeto.idusuario= this.idusuario  ;
    this.objeto.nombreusuario= this.nombreusuario;

    if (this.operacion === 'agregar') {
      this.tiposdedocumentoservice.Add(this.objeto,this.idusuario,this.token_).subscribe({
        next: (data) => {
          this.errormessage=data.mensaje;
        },
      });
    }

    if (this.operacion === 'borrar') {
      this.tiposdedocumentoservice.Delete(this.objeto.id,this.idusuario,this.token_).subscribe({
        next: (data) => {
          this.errormessage=data.mensaje;
        },
      });
    }

    if (this.operacion === 'modificar') {

      this.tiposdedocumentoservice.Update(this.objeto,this.idusuario,this.token_).subscribe({
        next: (data) => {
          this.errormessage=data.mensaje;
        },
      });
    }

 
    this.arraytiposdedocumento=[];
   

  }

  Cancelar() {
 
    this.operacion = 'listar';
    this.mostrarventanaedicion=false;
  }

  Refresh(filtro: string) {
    this.operacion = 'listar';
    this.errormessage="";
    this.tiposdedocumentoservice.GetAll(filtro,this.idusuario,this.token_).subscribe({
      next: (data) => {
        this.arraytiposdedocumento = data;
      },
    });
  }

  /******************************************************************* */
  /*   funciones extras                                                */
  /******************************************************************* */
}
