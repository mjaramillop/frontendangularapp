import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Observable } from 'rxjs';


import { Variables } from 'src/app/components/Utils/variables';
import { Tallas } from 'src/app/components/models/tablasmaestras/tallas';



@Injectable({
  providedIn: 'root'
})
export class Tallasservice {

  private variables : Variables = new Variables();

  private endpoint: string = this.variables.URL;
 
 
  constructor(private http: HttpClient) { }


  Add(objeto: Tallas,idusuario:any,token:any): Observable<any> {
    return this.http.post(`${this.endpoint}/Tallas/Add`, objeto ,{ params :{idusuario:idusuario,token:token} }  );
  }


 
  Delete(id:number,idusuario:any,token:any): Observable< any> {
    return this.http.delete(`${this.endpoint}/Tallas/Delete/${id}/${idusuario}/${token}`)
  }

  Update(objeto:Tallas,idusuario:any,token:any): Observable<any> {
    return this.http.put(`${this.endpoint}/Tallas/Update`, objeto ,{ params :{idusuario:idusuario,token:token} } );
  }


  GetById(id:number,idusuario:any,token:any): Observable< any> {
    return this.http.get(`${this.endpoint}/Tallas/GetById/${id}/${idusuario}/${token}`)
  }

  GetAll(filtro :string,idusuario:any,token:any): Observable< any> {
    return this.http.get(`${this.endpoint}/Tallas/GetAll/${filtro}/${idusuario}/${token}`)
  }

 



}
