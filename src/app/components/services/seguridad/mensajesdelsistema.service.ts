import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Observable } from 'rxjs';


import { Variables } from 'src/app/components/Utils/variables';



@Injectable({
  providedIn: 'root'
})
export class Mensajesdelsistemaservice {

  private variables : Variables = new Variables();

  private endpoint: string = this.variables.URL;
 
 
  constructor(private http: HttpClient) { }


  GetAllActive(idusuario:any,token:any): Observable<any> {
    return this.http.get(`${this.endpoint}/MensajesDelSistema/GetAllActive/${idusuario}/${token}`)
  }

}
