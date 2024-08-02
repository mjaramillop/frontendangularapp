import { Component,  Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

//services
import { Proveedoresservice } from 'src/app/components/services/tablasmaestras/proveedores.service';

//variables
import { Variables } from 'src/app/components/Utils/variables';
// models

import { Niveles } from 'src/app/components/modelsparameter/niveles';

//dto



@Component({
  selector: 'app-proveedoresniveles',
  templateUrl: './proveedoresniveles.component.html',
})
export class ProveedoresnivelesComponent implements OnInit {
  constructor(
    private proveedoresservice: Proveedoresservice,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}


  // text model variables
   
   public variables : Variables;
    
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
  public niveles: Niveles;
  

  @Input()  mostrarventanacambiarniveles :boolean=false;  


  // auxliar variables

  ngOnInit(): void {

    this.niveles=new Niveles();
  
    this.variables=new Variables();
   
    this.arraycodigonombrenivel1=[];
    this.arraycodigonombrenivel2=[];
    this.arraycodigonombrenivel3=[];
    this.arraycodigonombrenivel4=[];
    this.arraycodigonombrenivel5=[];
    
    
    this.proveedoresservice.GetNivel(1,this.idusuario,this.token_)
    .subscribe({
      next: (data) => {
        this.arraycodigonombrenivel1 = data;
     
      },
    });

 
    this.proveedoresservice.GetNivel(2,this.idusuario,this.token_)
    .subscribe({
      next: (data) => {
        this.arraycodigonombrenivel2 = data;
      },
    });
 
    this.proveedoresservice.GetNivel(3,this.idusuario,this.token_)
    .subscribe({
      next: (data) => {
        this.arraycodigonombrenivel3 = data;
      },
    });
 
    this.proveedoresservice.GetNivel(4,this.idusuario,this.token_)
    .subscribe({
      next: (data) => {
        this.arraycodigonombrenivel4 = data;
      },
    });
 
    this.proveedoresservice.GetNivel(5,this.idusuario,this.token_)
    .subscribe({
      next: (data) => {
        this.arraycodigonombrenivel5 = data;
      },
    });


   
  }


  
  /***************************************************************************** */
  /* eventos de asignacion de valores */
  /******************************************************************************* */

  changefiltronivel1remplazar(event: any) {
  
    this.niveles.filtronivel1remplazar = event?.target.value;
  }

  changefiltronivel2remplazar(event: any) {
    this.niveles.filtronivel2remplazar = event?.target.value;
  }

  changefiltronivel3remplazar(event: any) {
    this.niveles.filtronivel3remplazar = event?.target.value;
  }

  changefiltronivel4remplazar(event: any) {
    this.niveles.filtronivel4remplazar = event?.target.value;
  }

  changefiltronivel5remplazar(event: any) {
    this.niveles.filtronivel1remplazar = event?.target.value;
  }

  changefiltronivel1remplazarpor(event: any) {
    this.niveles.filtronivel1remplazarpor = event?.target.value;
  }

  changefiltronivel2remplazarpor(event: any) {
    this.niveles.filtronivel2remplazarpor = event?.target.value;
  }

  changefiltronivel3remplazarpor(event: any) {
    this.niveles.filtronivel3remplazarpor = event?.target.value;
  }

  changefiltronivel4remplazarpor(event: any) {
    this.niveles.filtronivel4remplazarpor = event?.target.value;
  }

  changefiltronivel5remplazarpor(event: any) {
    this.niveles.filtronivel1remplazarpor = event?.target.value;
  }


  


  /******************************************************************* */
  /*   funciones extras                                                */
  /******************************************************************* */

  Remplazar() {
    if (confirm('Esta seguro de remplazar los cambios? ')) {
      this.proveedoresservice.UpdateNiveles(this.niveles,this.idusuario,this.token_).subscribe({
        next: (data) => {
        
        
          this.mostrarventanacambiarniveles = false;
        },
        error: (e) => {
          alert('Error al procesar intente de nuevo');
        },
      });
    }
  }

  Cancelar() {

  
    this.mostrarventanacambiarniveles = false;
  }


}
