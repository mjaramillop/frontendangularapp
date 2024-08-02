


import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Observable } from 'rxjs';


import { Variables } from 'src/app/components/Utils/variables';
import { Programas } from 'src/app/components/models/tablasmaestras/programas';


@Injectable({
  providedIn: 'root'
})
export class Programasservice {

  private variables : Variables = new Variables();

  private endpoint: string = this.variables.URL;
 
  constructor(private http: HttpClient) { }


  Add(objeto:Programas,idusuario:any,token:any): Observable<any> {
    return this.http.post(`${this.endpoint}/Programas/Add`, objeto ,{ params :{idusuario:idusuario,token:token} } );
  }


 
  Delete(id:number,idusuario:any,token:any): Observable< any> {
    return this.http.delete(`${this.endpoint}/Programas/Delete/${id}/${idusuario}/${token}`)
  }

  Update(objeto:Programas,idusuario:any,token:any): Observable<any> {
    return this.http.put(`${this.endpoint}/Programas/Update`, objeto ,{ params :{idusuario:idusuario,token:token} });
  }


  GetById(id:number,idusuario:any,token:any): Observable< any> {
    return this.http.get(`${this.endpoint}/Programas/GetById/${id}/${idusuario}/${token}`)
  }

  GetAll(filtro:string,idusuario:any,token:any): Observable< any> {
    return this.http.get(`${this.endpoint}/Programas/GetAll/${filtro}/${idusuario}/${token}`)
  }

 



}
