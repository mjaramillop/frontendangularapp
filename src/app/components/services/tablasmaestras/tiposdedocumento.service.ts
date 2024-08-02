import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Observable } from 'rxjs';


import { Variables } from 'src/app/components/Utils/variables';
import { Tiposdedocumento } from 'src/app/components/models/tablasmaestras/tiposdedocumento';


@Injectable({
  providedIn: 'root'
})
export class Tiposdedocumentoservice {

  private variables : Variables = new Variables();

  private endpoint: string = this.variables.URL;
 
 
  constructor(private http: HttpClient) { }


  Add(objeto:Tiposdedocumento,idusuario:any,token:any): Observable<any> {
    return this.http.post(`${this.endpoint}/TiposDeDocumento/Add`, objeto ,{ params :{idusuario:idusuario,token:token} });
  }


 
  Delete(id:number,idusuario:any,token:any): Observable< any> {
    return this.http.delete(`${this.endpoint}/TiposDeDocumento/Delete/${id}/${idusuario}/${token}`)
  }

  Update(objeto:Tiposdedocumento,idusuario:any,token:any): Observable<any> {
    return this.http.put(`${this.endpoint}/TiposDeDocumento/Update`, objeto ,{ params :{idusuario:idusuario,token:token} });
  }


  GetById(id:number,idusuario:any,token:any): Observable< any> {
    return this.http.get(`${this.endpoint}/TiposDeDocumento/GetById/${id}/${idusuario}/${token}`)
  }

  GetAll(filtro :string,idusuario:any,token:any): Observable< any> {
    return this.http.get(`${this.endpoint}/TiposDeDocumento/GetAll/${filtro}/${idusuario}/${token}`)
  }




}
