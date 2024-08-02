import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Observable } from 'rxjs';


import { Variables } from 'src/app/components/Utils/variables';
import { Formasdepago } from 'src/app/components/models/tablasmaestras/formasdepago';


@Injectable({
  providedIn: 'root'
})
export class Formasdepagoservice {

  private variables : Variables = new Variables();

  private endpoint: string = this.variables.URL;
 
 
  constructor(private http: HttpClient) { }


  Add(objeto:Formasdepago,idusuario:any,token:any ): Observable<any> {
    return this.http.post(`${this.endpoint}/FormasDePago/Add`, objeto ,{ params :{idusuario:idusuario,token:token} } );
  }


 
  Delete(id:number,idusuario:any,token:any): Observable< any> {
    return this.http.delete(`${this.endpoint}/FormasDePago/Delete/${id}/${idusuario}/${token}`)
  }

  Update(objeto:Formasdepago,idusuario:any,token:any): Observable<any> {
    return this.http.put(`${this.endpoint}/FormasDePago/Update`, objeto ,{ params :{idusuario:idusuario,token:token} } );
  }


  GetById(id:number,idusuario:any,token:any): Observable< any> {
    return this.http.get(`${this.endpoint}/FormasDePago/GetById/${id}/${idusuario}/${token}`)
  }

  GetAll(filtro:string,idusuario:any,token:any): Observable< any> {
    return this.http.get(`${this.endpoint}/FormasDePago/GetAll/${filtro}/${idusuario}/${token}`)
  }

  


}
