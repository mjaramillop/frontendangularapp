



import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Observable } from 'rxjs';


import { Variables } from 'src/app/components/Utils/variables';
import { Tiposdecuentabancaria } from 'src/app/components/models/tablasmaestras/tiposdecuentabancaria';


@Injectable({
  providedIn: 'root'
})
export class Tiposdecuentabancariaservice {

  private variables : Variables = new Variables();

  private endpoint: string = this.variables.URL;
 
 
  constructor(private http: HttpClient) { }


  Add(objeto:Tiposdecuentabancaria,idusuario:any,token:any): Observable<any> {
    return this.http.post(`${this.endpoint}/Tiposdecuentabancaria/Add`, objeto ,{ params :{idusuario:idusuario,token:token} });
  }


 
  Delete(id:number,idusuario:any,token:any): Observable< any> {
    return this.http.delete(`${this.endpoint}/Tiposdecuentabancaria/Delete/${id}/${idusuario}/${token}`)
  }

  Update(objeto:Tiposdecuentabancaria,idusuario:any,token:any): Observable<any> {
    return this.http.put(`${this.endpoint}/Tiposdecuentabancaria/Update`, objeto ,{ params :{idusuario:idusuario,token:token} });
  }


  GetById(id:number,idusuario:any,token:any): Observable< any> {
    return this.http.get(`${this.endpoint}/Tiposdecuentabancaria/GetById/${id}/${idusuario}/${token}`)
  }

  GetAll(filtro:string,idusuario:any,token:any): Observable< any> {
    return this.http.get(`${this.endpoint}/Tiposdecuentabancaria/GetAll/${filtro}/${idusuario}/${token}`)
  }

 


}
