import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Observable } from 'rxjs';


import { Variables } from 'src/app/components/Utils/variables';
import { Formulas }  from 'src/app/components/models/tablasmaestras/formulas'

@Injectable({
  providedIn: 'root'
})
export class Formulasservice {

  private variables : Variables = new Variables();

  private endpoint: string = this.variables.URL;
 
  constructor(private http: HttpClient) { }


  Add(objeto:Formulas,idusuario:any,token:any): Observable<any> {
    return this.http.post(`${this.endpoint}/Formulas/Add`, objeto,{ params :{idusuario:idusuario,token:token} } );
  }


 
  Delete(id:number,idusuario:any,token:any): Observable< any> {
    return this.http.delete(`${this.endpoint}/Formulas/Delete/${id}/${idusuario}/${token}`)
  }

  Update(objeto:Formulas,idusuario:any,token:any): Observable<any> {
    return this.http.put(`${this.endpoint}/Formulas/Update`, objeto , { params :{idusuario:idusuario,token:token} } );
  }


  GetById(id:number,idusuario:any,token:any): Observable< any> {
    return this.http.get(`${this.endpoint}/Formulas/GetById/${id}/${idusuario}/${token}`)
  }

  GetAll(filtro:string,idusuario:any,token:any): Observable< any> {
    return this.http.get(`${this.endpoint}/Formulas/GetAll/${filtro}/${idusuario}/${token}`)
  }

 


}
