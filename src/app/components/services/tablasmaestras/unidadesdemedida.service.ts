import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Variables } from 'src/app/components/Utils/variables';
import { Unidadesdemedida } from 'src/app/components/models/tablasmaestras/unidadesdemedida';

@Injectable({
  providedIn: 'root',
})
export class Unidadesdemedidaservice {
  private variables : Variables = new Variables();

  private endpoint: string = this.variables.URL;
 

  constructor(private http: HttpClient) {}

  Add(objeto: Unidadesdemedida,idusuario:any,token:any): Observable<any> {
    return this.http.post(`${this.endpoint}/unidadesdemedida/Add`, objeto ,{ params :{idusuario:idusuario,token:token} });
  }

  Delete(id: number,idusuario:any,token:any): Observable<any> {
    return this.http.delete(`${this.endpoint}/unidadesdemedida/Delete/${id}/${idusuario}/${token}`);
  }

  Update(objeto: Unidadesdemedida,idusuario:any,token:any): Observable<any> {
    return this.http.put(`${this.endpoint}/unidadesdemedida/Update`, objeto ,{ params :{idusuario:idusuario,token:token} });
  }

  GetById(id: number,idusuario:any,token:any): Observable<any> {
    return this.http.get(`${this.endpoint}/unidadesdemedida/GetById/${id}/${idusuario}/${token}`);
  }

  GetAll(filtro: string,idusuario:any,token:any): Observable<any> {
    return this.http.get(`${this.endpoint}/unidadesdemedida/GetAll/${filtro}/${idusuario}/${token}`);
  }
}
