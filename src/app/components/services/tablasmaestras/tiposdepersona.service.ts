import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Observable } from 'rxjs';


import { Variables } from 'src/app/components/Utils/variables';
import { Tiposdepersona } from 'src/app/components/models/tablasmaestras/tiposdepersona';



@Injectable({
  providedIn: 'root'
})
export class Tiposdepersonaservice {

  private variables : Variables = new Variables();

  private endpoint: string = this.variables.URL;
 
 
  constructor(private http: HttpClient) { }


 
  Add(objeto:Tiposdepersona,idusuario:any,token:any): Observable<any> {
    return this.http.post(`${this.endpoint}/Tiposdepersona/Add`, objeto ,{ params :{idusuario:idusuario,token:token} });
  }


 
  Delete(id:string,idusuario:any,token:any): Observable< any> {
    return this.http.delete(`${this.endpoint}/Tiposdepersona/Delete/${id}/${idusuario}/${token}`)
  }

  Update(objeto:Tiposdepersona,idusuario:any,token:any): Observable<any> {
    return this.http.put(`${this.endpoint}/Tiposdepersona/Update`, objeto ,{ params :{idusuario:idusuario,token:token} });
  }


  GetById(id:string,idusuario:any,token:any): Observable< any> {
    return this.http.get(`${this.endpoint}/Tiposdepersona/GetById/${id}/${idusuario}/${token}`)
  }

  GetAll(filtro:string,idusuario:any,token:any): Observable< any> {
      return this.http.get(`${this.endpoint}/Tiposdepersona/GetAll/${filtro}/${idusuario}/${token}`)
  }

 



}
