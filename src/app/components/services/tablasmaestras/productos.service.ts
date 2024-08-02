import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Observable } from 'rxjs';


import { Variables } from 'src/app/components/Utils/variables';
import { Productos } from 'src/app/components/models/tablasmaestras/productos';
import { Niveles } from 'src/app/components/modelsparameter/niveles';
import { Cambiarprecios } from 'src/app/components/modelsparameter/cambiarprecios';

@Injectable({
  providedIn: 'root'
})
export class Productosservice {

  private variables : Variables = new Variables();

  private endpoint: string = this.variables.URL;
 
 
  constructor(private http: HttpClient) { }


  Add(objeto:Productos,idusuario:any,token:any): Observable<any> {
     return this.http.post(`${this.endpoint}/Productos/Add`, objeto ,{ params :{idusuario:idusuario,token:token} });
  }


 
  Delete(id:number,idusuario:any,token:any): Observable< any> {
    return this.http.delete(`${this.endpoint}/Productos/Delete/${id}/${idusuario}/${token}`)
  }

  Update(objeto:Productos,idusuario:any,token:any): Observable<any> {
    return this.http.put(`${this.endpoint}/Productos/Update`, objeto,{ params :{idusuario:idusuario,token:token} } );
  }


  GetById(id:number,idusuario:any,token:any): Observable< any> {
    return this.http.get(`${this.endpoint}/Productos/GetById/${id}/${idusuario}/${token}`)
  }

  GetAll(filtro:string,idusuario:any,token:any): Observable< any> {
    return this.http.get(`${this.endpoint}/Productos/GetAll/${filtro}/${idusuario}/${token}`)
  }

  GetNivel(id:number,idusuario:any,token:any): Observable< any> {
    return this.http.get(`${this.endpoint}/Productos/GetNivel/${id}/${idusuario}/${token}`)
  }

 
  
  UpdateNiveles(objeto: Niveles,idusuario:any,token:any): Observable<any> {
    return this.http.put(`${this.endpoint}/Productos/UpdateNiveles`, objeto,{ params :{idusuario:idusuario,token:token} } );
  }
 
 
  CambiarPrecios(objeto: Cambiarprecios,idusuario:any,token:any): Observable<any> {
    return this.http.put(`${this.endpoint}/Productos/CambiarPrecios`, objeto,{ params :{idusuario:idusuario,token:token} } );
  }
 

}
