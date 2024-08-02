
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Observable } from 'rxjs';


import { Variables } from 'src/app/components/Utils/variables';
import { Tiposderegimen } from 'src/app/components/models/tablasmaestras/tiposderegimen';




@Injectable({
    providedIn: 'root'
  })
  export class Tiposderegimenservice {
  
    private variables : Variables = new Variables();
  
    private endpoint: string = this.variables.URL;
   
   
    constructor(private http: HttpClient) { }
  
  
    Add(objeto:Tiposderegimen,idusuario:any,token:any): Observable<any> {
      return this.http.post(`${this.endpoint}/Tiposderegimen/Add`, objeto ,{ params :{idusuario:idusuario,token:token} } );
    }
  
  
   
    Delete(id:number,idusuario:any,token:any): Observable< any> {
      return this.http.delete(`${this.endpoint}/Tiposderegimen/Delete/${id}/${idusuario}/${token}`)
    }
  
    Update(objeto:Tiposderegimen,idusuario:any,token:any): Observable<any> {
      return this.http.put(`${this.endpoint}/Tiposderegimen/Update`, objeto ,{ params :{idusuario:idusuario,token:token} });
    }
  
  
    GetById(id:number,idusuario:any,token:any): Observable< any> {
      return this.http.get(`${this.endpoint}/Tiposderegimen/GetById/${id}/${idusuario}/${token}`)
    }
  
    GetAll(filtro:string,idusuario:any,token:any): Observable< any> {
      return this.http.get(`${this.endpoint}/Tiposderegimen/GetAll/${filtro}/${idusuario}/${token}`)
    }
  
   
  
  }
  