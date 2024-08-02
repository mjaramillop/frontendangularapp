import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Observable } from 'rxjs';


import { Variables } from 'src/app/components/Utils/variables';
import { Retenciones } from 'src/app/components/models/tablasmaestras/retenciones';

@Injectable({
  providedIn: 'root'
})
export class Retencionesservice {

  private variables : Variables = new Variables();

  private endpoint: string = this.variables.URL;
 
  constructor(private http: HttpClient) { }


  Add(objeto:Retenciones,idusuario:any,token:any): Observable<any> {
    return this.http.post(`${this.endpoint}/Retenciones/Add`, objeto ,{ params :{idusuario:idusuario,token:token} } );
  }


 
  Delete(id:number,idusuario:any,token:any): Observable< any> {
    return this.http.delete(`${this.endpoint}/Retenciones/Delete/${id}/${idusuario}/${token}`)
  }

  Update(objeto:Retenciones,idusuario:any,token:any): Observable<any> {
    return this.http.put(`${this.endpoint}/Retenciones/Update`, objeto  ,{ params :{idusuario:idusuario,token:token} } );
  }


  GetById(id:number,idusuario:any,token:any): Observable< any> {
    return this.http.get(`${this.endpoint}/Retenciones/GetById/${id}/${idusuario}/${token}`)
  }

  GetAll(filtro:string,idusuario:any,token:any): Observable< any> {
    return this.http.get(`${this.endpoint}/Retenciones/GetAll/${filtro}/${idusuario}/${token}`)
  }

 



}
