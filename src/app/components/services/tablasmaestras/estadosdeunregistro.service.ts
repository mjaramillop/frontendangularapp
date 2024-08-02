import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Observable } from 'rxjs';


import { Variables } from 'src/app/components/Utils/variables';
import { Estadosdeunregistro } from 'src/app/components/models/tablasmaestras/estadosdeunregistro';



@Injectable({
  providedIn: 'root'
})
export class Estadosdeunregistroservice {

  private variables : Variables = new Variables();

  private endpoint: string = this.variables.URL;
 
 
  constructor(private http: HttpClient) { }


  Add(objeto: Estadosdeunregistro,idusuario:any,token:any): Observable<any> {
    return this.http.post(`${this.endpoint}/EstadosDeUnRegistro/Add`, objeto ,{ params :{idusuario:idusuario,token:token} });
  }


 
  Delete(id:number,idusuario:any,token:any): Observable< any> {
    return this.http.delete(`${this.endpoint}/EstadosDeUnRegistro/Delete/${id}/${idusuario}/${token}`)
  }

  Update(objeto:Estadosdeunregistro,idusuario:any,token:any): Observable<any> {
    return this.http.put(`${this.endpoint}/EstadosDeUnRegistro/Update`, objeto ,{ params :{idusuario:idusuario,token:token} });
  }


  GetById(id:number,idusuario:any,token:any): Observable< any> {
    return this.http.get(`${this.endpoint}/EstadosDeUnRegistro/GetById/${id}/${idusuario}/${token}`)
  }

  GetAll(filtro :string,idusuario:any,token:any): Observable< any> {
    return this.http.get(`${this.endpoint}/EstadosDeUnRegistro/GetAll/${filtro}/${idusuario}/${token}`)
  }

 



}
