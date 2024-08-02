import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Observable } from 'rxjs';


import { Variables } from 'src/app/components/Utils/variables';
import { Sino } from 'src/app/components/models/tablasmaestras/sino';



@Injectable({
  providedIn: 'root'
})
export class Sinoservice {

  private variables : Variables = new Variables();

  private endpoint: string = this.variables.URL;
 
 
  constructor(private http: HttpClient) { }


 
  Add(objeto:Sino,idusuario:any,token:any): Observable<any> {
    return this.http.post(`${this.endpoint}/SiNo/Add`, objeto,{ params :{idusuario:idusuario,token:token} } );
  }


 
  Delete(id:string,idusuario:any,token:any): Observable< any> {
    return this.http.delete(`${this.endpoint}/SiNo/Delete/${id}/${idusuario}/${token}`)
  }

  Update(objeto:Sino,idusuario:any,token:any): Observable<any> {
    return this.http.put(`${this.endpoint}/SiNo/Update`, objeto ,{ params :{idusuario:idusuario,token:token} } );
  }


  GetById(id:string,idusuario:any,token:any): Observable< any> {
    return this.http.get(`${this.endpoint}/SiNo/GetById/${id}/${idusuario}/${token}`)
  }

  GetAll(filtro:string,idusuario:any,token:any): Observable< any> {
      return this.http.get(`${this.endpoint}/SiNo/GetAll/${filtro}/${idusuario}/${token}`)
  }

 



}
