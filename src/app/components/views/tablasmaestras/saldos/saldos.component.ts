import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
//services
import { Saldosservice } from 'src/app/components/services/tablasmaestras/saldos.service';
//variables
import { Variables } from 'src/app/components/Utils/variables';
// models
import { Saldos } from 'src/app/components/models/tablasmaestras/saldos';

//dto
import { Responsesaldosdto } from 'src/app/components/dto/tablasmaestras/responsesaldosdto';

@Component({
  selector: 'app-saldos',
  templateUrl: './saldos.component.html',
})
export class SaldosComponent {
  constructor(
    private saldosservice: Saldosservice,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  // text model variables
  public objeto: Saldos;
  public variables: Variables;
  public opcion: number=0;
  public diassinrotar: number = 0;

   
  public  token_= localStorage.getItem("token");
  public idusuario = localStorage.getItem("idusuario");
  public nombreusuario = localStorage.getItem("nombreusuario");


  //standard const variables
  public errormessage: string = '';
  public operacion: string = '';
  public filtroproducto: any = '*';
  public filtrobodega: any = '*';

  public sololectura: boolean = true;
  public permisos: any = '';
  public mostrarventanaedicion: boolean = false;

 

  // array de las entidades
  public arraysaldos: Responsesaldosdto[] = [];

  //  variables extras
  public stockminimo: number = 0;
  public stockmaximo: number = 0;

  public totaldiferencia: number = 0;
  public totalvalordiferencia: number = 0;
  public totalvalorinventario: number = 0;

  public iconovisible: boolean = false;
  public visiblecolumna1=true;
  public visiblecolumna2=true;
  public visiblecolumna3=true;
  public visiblecolumna4=true;
  public visiblecolumna5=true;
  public visiblecolumna6=true;
  public visiblecolumna7=true;
  public visiblecolumna8=true;
  public visiblecolumna9=true;
  public visiblecolumna10=true;
  
  public visiblecolumna11=true;
  public visiblecolumna12=true;
  public visiblecolumna13=true;
  public visiblecolumna14=true;
  public visiblecolumna15=true;
  public visiblecolumna16=true;
  public visiblecolumna17=true;
  public visiblecolumna18=true;
  public visiblecolumna19=true;
  


  ngOnInit(): void {
    this.variables = new Variables();
    this.objeto = new Saldos();
    this.permisos = this.activatedRoute.snapshot.paramMap.get('permisos');
    this.arraysaldos = [];
  }

  /**************************************************************** */
  /* funciones de consulta                                          */
  /**************************************************************** */

  /***************************************************************************** */
  /* eventos de asignacion de valores */
  /******************************************************************************* */

  changecolumna1(event:any) {
    this.visiblecolumna1 = event?.target.checked ? true : false;
    this.Refresh();
  }

  changecolumna2(event:any) {
    this.visiblecolumna2 = event?.target.checked ? true : false;
    this.Refresh();
  }

  changecolumna3(event:any) {
    this.visiblecolumna3 = event?.target.checked ? true : false;
    this.Refresh();
  }

  changecolumna4(event:any) {
    this.visiblecolumna4 = event?.target.checked ? true : false;
    this.Refresh();
  }

  changecolumna5(event:any) {
    this.visiblecolumna5 = event?.target.checked ? true : false;
    this.Refresh();
  }

  changecolumna6(event:any) {
    this.visiblecolumna6 = event?.target.checked ? true : false;
    this.Refresh();
  }

  changecolumna7(event:any) {
    this.visiblecolumna7 = event?.target.checked ? true : false;
    this.Refresh();
  }


  changecolumna8(event:any) {
    this.visiblecolumna8 = event?.target.checked ? true : false;
    this.Refresh();
  }


  changecolumna9(event:any) {
    this.visiblecolumna9 = event?.target.checked ? true : false;
    this.Refresh();
  }
  changecolumna10(event:any) {
    this.visiblecolumna10 = event?.target.checked ? true : false;
    this.Refresh();
  }
  changecolumna11(event:any) {
    this.visiblecolumna11 = event?.target.checked ? true : false;
    this.Refresh();
  }

  changecolumna12(event:any) {
    this.visiblecolumna12 = event?.target.checked ? true : false;
    this.Refresh();
  }

  changecolumna13(event:any) {
    this.visiblecolumna13 = event?.target.checked ? true : false;
    this.Refresh();
  }

  changecolumna14(event:any) {
    this.visiblecolumna14 = event?.target.checked ? true : false;
    this.Refresh();
  }

  changecolumna15(event:any) {
    this.visiblecolumna15 = event?.target.checked ? true : false;
    this.Refresh();
  }

  changecolumna16(event:any) {
    this.visiblecolumna16 = event?.target.checked ? true : false;
    this.Refresh();
  }

  changecolumna17(event:any) {
    this.visiblecolumna17 = event?.target.checked ? true : false;
    this.Refresh();
  }

  changecolumna18(event:any) {
    this.visiblecolumna18 = event?.target.checked ? true : false;
    this.Refresh();
  }

  changecolumna19(event:any) {
    this.visiblecolumna19 = event?.target.checked ? true : false;
    this.Refresh();
  }

  changeopcion1() {
    this.opcion = 1;
    this.Refresh();
   
  }

  changeopcion2() {
    this.opcion = 2;
    this.Refresh();

   
  }
  changeopcion3() {
    this.opcion = 3;
    this.Refresh();

   
  }
  changeopcion4() {
    this.opcion = 4;
    this.Refresh();

  
  }
  changeopcion5() {
    this.opcion = 5;
    this.Refresh();

    
  }

  changeopcion6() {
    this.opcion = 6;
    this.Refresh();

    
  }

  changestockminimo(event: any) {
    this.stockminimo = event?.target.value;
  }

  changestockmaximo(event: any) {
    this.stockmaximo = event?.target.value;
  }

  changediassinrotar(event: any) {
    this.diassinrotar = event?.target.value;
  }

  changefiltroproducto(event: any) {
    this.filtroproducto = event?.target.value;
  }

  changefiltrobodega(event: any) {
    this.filtrobodega = event?.target.value;
  }

  /************************************************************************************ */
  /*funciones basicas */
  /*************************************************************************************** */

  colorGreen(saldo: number, stockminimo: number, stockmaximo: number) {
    if (saldo < stockminimo) return 'red';
    if (saldo > stockmaximo) return 'blue';
    return 'black';
  }

  Modificar(id: number) {
    this.saldosservice.GetById(id,this.idusuario,this.token_).subscribe({
      next: (data) => {
        this.objeto = new Saldos();
        this.objeto.id = data[0].id;
        this.objeto.producto = data[0].producto;
        this.objeto.bodega = data[0].bodega;
        this.objeto.saldoinicial = data[0].saldoinicial;
        this.objeto.entradas = data[0].entradas;
        this.objeto.salidas = data[0].salidas;
        this.objeto.saldo = data[0].saldo;
        this.objeto.saldofisico = data[0].saldofisico;
        this.objeto.costopromedio = data[0].costopromedio;
        this.objeto.fechadelaultimasalida = data[0].fechadelaultimasalida;
        this.objeto.stockminimo = data[0].stockminimo;
        this.objeto.stockmaximo = data[0].stockmaximo;

        if (this.stockminimo > 0) this.objeto.stockminimo = this.stockminimo;
        if (this.stockmaximo > 0) this.objeto.stockmaximo = this.stockmaximo;
        console.log(this.objeto);
        this.saldosservice.Update(this.objeto,this.idusuario,this.token_).subscribe({
          next: (data) => {
            this.errormessage = data.mensaje;
          },
        });
      },
    });
  }

  DownloadCSV() {

    if (this.opcion===0){

      alert('Debes seleccionar una opcion');
      return;
    }

    this.iconovisible=true;
    this.saldosservice
      .DownloadCSV(
        this.filtroproducto,
        this.filtrobodega,
        this.opcion,
        this.diassinrotar,
        this.idusuario,
        this.token_
      )
      .subscribe({
        next: (data) => {
          let filename = data.headers
            .get('content-disposition')
            ?.split(';')[1]
            .split('=')[1];
          let blob: Blob = data.body as Blob;
          let a = document.createElement('a');
          a.download = filename;
          a.href = window.URL.createObjectURL(blob);
          a.click();
          this.errormessage="Archivo descargado con exito..."
         
        },
        error: (e) => {
          this.errormessage=e; // This block will only execute if catchError is used
        },
      });
  }

  Refresh() {

 

    if (this.opcion===0  ){
      alert('Debes seleccionar una opcion');
      return ;
    }

    this.iconovisible=false;
    this.totaldiferencia = 0;
    this.totalvalordiferencia = 0;
    this.errormessage = '';
    this.saldosservice
      .GetAll(
        this.filtroproducto,
        this.filtrobodega,
        this.opcion,
        this.diassinrotar,
        this.idusuario,
        this.token_
      )
      .subscribe({
        next: (data) => {
          this.arraysaldos = data;

          this.arraysaldos.forEach((element) => {
            this.totaldiferencia =
              this.totaldiferencia +
              element.diferencia_saldofisico_saldoteorico;
            this.totalvalordiferencia =
              this.totalvalordiferencia + element.valordiferencia;
            this.totalvalorinventario =
              this.totalvalorinventario + element.valorinventario;
          });
        },

        error: (e) => {
          this.errormessage=e; // This block will only execute if catchError is used
        },


      });
  }

  /******************************************************************* */
  /*   funciones extras                                                */
  /******************************************************************* */
}
