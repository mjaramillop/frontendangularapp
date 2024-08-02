import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Observable } from 'rxjs';


import { Variables } from 'src/app/components/Utils/variables';
import { Proveedores } from 'src/app/components/models/tablasmaestras/proveedores';
import { Niveles } from 'src/app/components/modelsparameter/niveles';


@Injectable({
  providedIn: 'root'
})
export class Proveedoresservice {

  private variables : Variables = new Variables();

  private endpoint: string = this.variables.URL;
 
 
  constructor(private http: HttpClient) { }


  Add(objeto:Proveedores,idusuario:any,token:any): Observable<any> {
    return this.http.post(`${this.endpoint}/Proveedores/Add`, objeto ,{ params :{idusuario:idusuario,token:token} } );
  }


 
  Delete(id:number,idusuario:any,token:any): Observable< any> {
    return this.http.delete(`${this.endpoint}/Proveedores/Delete/${id}/${idusuario}/${token}`)
  }

  Update(objeto:Proveedores,idusuario:any,token:any): Observable<any> {
    return this.http.put(`${this.endpoint}/Proveedores/Update`, objeto,{ params :{idusuario:idusuario,token:token} } );
  }


  GetById(id:number,idusuario:any,token:any): Observable< any> {
    return this.http.get(`${this.endpoint}/Proveedores/GetById/${id}/${idusuario}/${token}`)
  }

  GetAll(filtro:string,idusuario:any,token:any,tipodeagente?:number): Observable< any> {
    return this.http.get(`${this.endpoint}/Proveedores/GetAll/${filtro}/${idusuario}/${token}/${tipodeagente}`)
  }

  GetNivel(id:number,idusuario:any,token:any): Observable< any> {
    return this.http.get(`${this.endpoint}/Proveedores/GetNivel/${id}/${idusuario}/${token}`)
  }
 
  
  UpdateNiveles(objeto: Niveles,idusuario:any,token:any): Observable<any> {
    return this.http.put(`${this.endpoint}/Proveedores/UpdateNiveles`, objeto ,{ params :{idusuario:idusuario,token:token} });
  }

  
  Generarclave(id:number,idusuario:any,token:any): Observable< any> {
    return this.http.get(`${this.endpoint}/Proveedores/GenerarClave/${id}/${idusuario}/${token}`)
  }



}
