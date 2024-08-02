import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Observable } from 'rxjs';


import { Variables } from 'src/app/components/Utils/variables';
import { Conceptosnotadebitocredito } from 'src/app/components/models/tablasmaestras/conceptosnotadebitocredito';


@Injectable({
  providedIn: 'root'
})
export class Conceptosnotadebitocreditoservice {

  private variables : Variables = new Variables();

  private endpoint: string = this.variables.URL;
 
 
  constructor(private http: HttpClient) { }


  Add(objeto:Conceptosnotadebitocredito,idusuario:any,token:any): Observable<any> {
    return this.http.post(`${this.endpoint}/ConceptosNotaDebitoCredito/Add`, objeto,{ params :{idusuario:idusuario,token:token} } );
  }


 
  Delete(id:number,idusuario:any,token:any): Observable< any> {
    return this.http.delete(`${this.endpoint}/ConceptosNotaDebitoCredito/Delete/${id}/${idusuario}/${token}`)
  }

  Update(objeto:Conceptosnotadebitocredito,idusuario:any,token:any): Observable<any> {
    return this.http.put(`${this.endpoint}/ConceptosNotaDebitoCredito/Update`, objeto,{ params :{idusuario:idusuario,token:token} } );
  }


  GetById(id:number,idusuario:any,token:any): Observable< any> {
    return this.http.get(`${this.endpoint}/ConceptosNotaDebitoCredito/GetById/${id}/${idusuario}/${token}`)
  }

  GetAll(filtro:string,idusuario:any,token:any): Observable< any> {
    return this.http.get(`${this.endpoint}/ConceptosNotaDebitoCredito/GetAll/${filtro}/${idusuario}/${token}`)
  }



}
