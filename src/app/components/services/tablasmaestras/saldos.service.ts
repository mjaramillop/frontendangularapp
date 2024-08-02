import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Observable } from 'rxjs';


import { Variables } from 'src/app/components/Utils/variables';
import { Saldos } from 'src/app/components/models/tablasmaestras/saldos';

@Injectable({
  providedIn: 'root'
})
export class Saldosservice {

  private variables : Variables = new Variables();

  private endpoint: string = this.variables.URL;
 
 
  constructor(private http: HttpClient) { }


  Add(objeto:Saldos,idusuario:any,token:any): Observable<any> {
     return this.http.post(`${this.endpoint}/Saldos/Add`, objeto ,{ params :{idusuario:idusuario,token:token} } );
  }


 
  Delete(id:number,idusuario:any,token:any): Observable< any> {
    return this.http.delete(`${this.endpoint}/Saldos/Delete/${id}/${idusuario}/${token}`)
  }

  Update(objeto:Saldos,idusuario:any,token:any): Observable<any> {
    return this.http.put(`${this.endpoint}/Saldos/Update`, objeto  ,{ params :{idusuario:idusuario,token:token} });
  }


  GetById(id:number,idusuario:any,token:any): Observable< any> {
    return this.http.get(`${this.endpoint}/Saldos/GetById/${id}/${idusuario}/${token}`)
  }

  GetAll(filtroproducto:string,filtrobodega:string,opcion:number,diassinrotar:number,idusuario:any,token:any): Observable< any> {
    return this.http.get(`${this.endpoint}/Saldos/GetAll/${filtroproducto}/${filtrobodega}/${opcion}/${diassinrotar}/${idusuario}/${token}`)
  }

  DownloadCSV(filtroproducto:string,filtrobodega:string,opcion:number,diassinrotar:number,idusuario:any,token:any): Observable< any> {
    return this.http.get(`${this.endpoint}/Saldos/DownloadCSV/${filtroproducto}/${filtrobodega}/${opcion}/${diassinrotar}/${idusuario}/${token}`,
      {
          observe:'response',
          responseType:'blob'
      }
     )
  }
  

 
}
