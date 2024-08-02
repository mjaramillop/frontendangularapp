import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Observable } from 'rxjs';


import { Variables } from 'src/app/components/Utils/variables';
import { Ivas } from 'src/app/components/models/tablasmaestras/ivas';


@Injectable({
  providedIn: 'root'
})
export class Ivasservice {

  private variables : Variables = new Variables();

  private endpoint: string = this.variables.URL;
 
  constructor(private http: HttpClient) { }


  Add(objeto:Ivas,idusuario:any,token:any): Observable<any> {
    return this.http.post(`${this.endpoint}/Ivas/Add`, objeto,{ params :{idusuario:idusuario,token:token} } );
  }


 
  Delete(id:number,idusuario:any,token:any): Observable< any> {
    return this.http.delete(`${this.endpoint}/Ivas/Delete/${id}/${idusuario}/${token}`)
  }

  Update(objeto:Ivas,idusuario:any,token:any): Observable<any> {
    return this.http.put(`${this.endpoint}/Ivas/Update`, objeto ,{ params :{idusuario:idusuario,token:token} });
  }


  GetById(id:number,idusuario:any,token:any): Observable< any> {
    return this.http.get(`${this.endpoint}/Ivas/GetById/${id}/${idusuario}/${token}`)
  }

  GetAll(filtro:string,idusuario:any,token:any): Observable< any> {
    return this.http.get(`${this.endpoint}/Ivas/GetAll/${filtro}/${idusuario}/${token}`)
  }

 



}
