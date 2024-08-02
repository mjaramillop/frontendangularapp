

import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Observable } from 'rxjs';


import { Variables } from 'src/app/components/Utils/variables';
import { Colores } from 'src/app/components/models/tablasmaestras/colores';


@Injectable({
  providedIn: 'root'
})
export class Coloresservice {

  private variables : Variables = new Variables();

  private endpoint: string = this.variables.URL;
 
  constructor(private http: HttpClient) { }


  Add(objeto:Colores,idusuario:any,token:any): Observable<any> {
    return this.http.post(`${this.endpoint}/Colores/Add`, objeto ,{ params :{idusuario:idusuario,token:token} } );
  }


 
  Delete(id:number,idusuario:any,token:any): Observable< any> {
    return this.http.delete(`${this.endpoint}/Colores/Delete/${id}/${idusuario}/${token}`)
  }

  Update(objeto:Colores,idusuario:any,token:any): Observable<any> {
    return this.http.put(`${this.endpoint}/Colores/Update`, objeto ,{ params :{idusuario:idusuario,token:token} }  );
  }


  GetById(id:number,idusuario:any,token:any): Observable< any> {
    return this.http.get(`${this.endpoint}/Colores/GetById/${id}/${idusuario}/${token}`)
  }

  GetAll(filtro:string,idusuario:any,token:any): Observable< any> {
    return this.http.get(`${this.endpoint}/Colores/GetAll/${filtro}/${idusuario}/${token}`)
  }

 



}
