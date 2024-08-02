

import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Observable } from 'rxjs';


import { Variables } from 'src/app/components/Utils/variables';
import { Actividadeseconomicas } from 'src/app/components/models/tablasmaestras/actividadeseconomicas';


@Injectable({
  providedIn: 'root'
})
export class Actividadeseconomicasservice {

  private variables : Variables = new Variables();

  private endpoint: string = this.variables.URL;
 
  constructor(private http: HttpClient) { }


  Add(objeto:Actividadeseconomicas,idusuario:any,token:any): Observable<any> {
    return this.http.post(`${this.endpoint}/ActividadesEconomicas/Add`, objeto ,{ params :{idusuario:idusuario,token:token} });
  }


 
  Delete(id:number,idusuario:any,token:any): Observable< any> {
    return this.http.delete(`${this.endpoint}/ActividadesEconomicas/Delete/${id}/${idusuario}/${token}`)
  }

  Update(objeto:Actividadeseconomicas,idusuario:any,token:any): Observable<any> {
    return this.http.put(`${this.endpoint}/ActividadesEconomicas/Update`, objeto ,{ params :{idusuario:idusuario,token:token} } );
  }


  GetById(id:number,idusuario:any,token:any): Observable< any> {
    return this.http.get(`${this.endpoint}/ActividadesEconomicas/GetById/${id}/${idusuario}/${token}`)
  }

  GetAll(filtro:string,idusuario:any,token:any): Observable< any> {
    return this.http.get(`${this.endpoint}/ActividadesEconomicas/GetAll/${filtro}/${idusuario}/${token}`)
  }

 



}
