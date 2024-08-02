import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Observable } from 'rxjs';


import { Variables } from 'src/app/components/Utils/variables';
import { Tiposdeagente } from 'src/app/components/models/tablasmaestras/tiposdeagente';


@Injectable({
  providedIn: 'root'
})
export class Tiposdeagenteservice {

  private variables : Variables = new Variables();

  private endpoint: string = this.variables.URL;
 
  constructor(private http: HttpClient) { }


  Add(objeto:Tiposdeagente,idusuario:any,token:any): Observable<any> {
    return this.http.post(`${this.endpoint}/Tiposdeagente/Add`, objeto,{ params :{idusuario:idusuario,token:token} } );
  }


 
  Delete(id:number,idusuario:any,token:any): Observable< any> {
    return this.http.delete(`${this.endpoint}/Tiposdeagente/Delete/${id}/${idusuario}/${token}`)
  }

  Update(objeto:Tiposdeagente,idusuario:any,token:any): Observable<any> {
    return this.http.put(`${this.endpoint}/Tiposdeagente/Update`, objeto ,{ params :{idusuario:idusuario,token:token} } );
  }


  GetById(id:number,idusuario:any,token:any): Observable< any> {
    return this.http.get(`${this.endpoint}/Tiposdeagente/GetById/${id}/${idusuario}/${token}`)
  }

  GetAll(filtro:string,idusuario:any,token:any): Observable< any> {
    return this.http.get(`${this.endpoint}/Tiposdeagente/GetAll/${filtro}/${idusuario}/${token}`)
  }

 



}
