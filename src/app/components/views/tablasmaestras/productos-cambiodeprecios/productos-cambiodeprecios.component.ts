
import { Component, EventEmitter, Input, Output,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

//services
import { Productosservice } from 'src/app/components/services/tablasmaestras/productos.service';

//variables
import { Variables } from 'src/app/components/Utils/variables';
import { Validaciones } from 'src/app/components/Utils/validaciones';
// models



//dto
import { Cambiarprecios } from 'src/app/components/modelsparameter/cambiarprecios';


@Component({
  selector: 'app-productos-cambiodeprecios',
  templateUrl: './productos-cambiodeprecios.component.html'
  
})
export class ProductosCambiodepreciosComponent {

  constructor(
    private Productosservice: Productosservice,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}


  // text model variables
   
   public variables : Variables;
   public validaciones : Validaciones;

   public  token_= localStorage.getItem("token");
   public idusuario = localStorage.getItem("idusuario");
   public nombreusuario = localStorage.getItem("nombreusuario");
 


  // array de las entidades
  public arraycodigonombrenivel1:string[] = [];
  public arraycodigonombrenivel2:string[] = [];
  public arraycodigonombrenivel3:string[] = [];
  public arraycodigonombrenivel4:string[] = [];
  public arraycodigonombrenivel5:string[] = [];
  

  //  variables extras
  public cambiarprecios: Cambiarprecios;
  

  @Input()  mostrarventanacambiarprecios :boolean=false;  


  // auxliar variables

  ngOnInit(): void {

    this.cambiarprecios=new Cambiarprecios();
  
    this.variables=new Variables();
    this.validaciones=new Validaciones();
   
    this.arraycodigonombrenivel1=[];
    this.arraycodigonombrenivel2=[];
    this.arraycodigonombrenivel3=[];
    this.arraycodigonombrenivel4=[];
    this.arraycodigonombrenivel5=[];
    
    
    this.Productosservice.GetNivel(1,this.idusuario,this.token_)
    .subscribe({
      next: (data) => {
        this.arraycodigonombrenivel1 = data;
        console.log(data);
      },
    });

 
    this.Productosservice.GetNivel(2,this.idusuario,this.token_)
    .subscribe({
      next: (data) => {
        this.arraycodigonombrenivel2 = data;
      },
    });
 
    this.Productosservice.GetNivel(3,this.idusuario,this.token_)
    .subscribe({
      next: (data) => {
        this.arraycodigonombrenivel3 = data;
      },
    });
 
    this.Productosservice.GetNivel(4,this.idusuario,this.token_)
    .subscribe({
      next: (data) => {
        this.arraycodigonombrenivel4 = data;
      },
    });
 
    this.Productosservice.GetNivel(5,this.idusuario,this.token_)
    .subscribe({
      next: (data) => {
        this.arraycodigonombrenivel5 = data;
      },
    });


   
  }


  
  /***************************************************************************** */
  /* eventos de asignacion de valores */
  /******************************************************************************* */

  changenivel1(event: any) {
    this.cambiarprecios.nivel1 = event?.target.value;
  }


  changenivel2(event: any) {
    this.cambiarprecios.nivel2 = event?.target.value;
  }

  changenivel3(event: any) {
    this.cambiarprecios.nivel3 = event?.target.value;
  }

  changenivel4(event: any) {
    this.cambiarprecios.nivel4 = event?.target.value;
  }

  changenivel5(event: any) {
    this.cambiarprecios.nivel5 = event?.target.value;
  }

 
  changeporcentaje(event: any) {
    this.cambiarprecios.porcentajedeincremento = event?.target.value;
  }

 
  


  /******************************************************************* */
  /*   funciones extras                                                */
  /******************************************************************* */

  Remplazar() {
    if (confirm('Esta seguro incrementar el precio? ')) {

      this.validaciones.Validarvalordiferentedecero("Porcentaje de incremento ",this.cambiarprecios.porcentajedeincremento);

      if (this.validaciones.mensajedeerror!=="")
        {
            return ;
          
        }

      this.Productosservice.CambiarPrecios(this.cambiarprecios,this.idusuario,this.token_).subscribe({
        next: (data) => {

          alert(data[0]);
          this.mostrarventanacambiarprecios = false;
        },
        error: (e) => {
          alert('Error al procesar intente de nuevo');
        },
      });
    }
  }

  Cancelar() {

  
    this.mostrarventanacambiarprecios = false;
  }



}
