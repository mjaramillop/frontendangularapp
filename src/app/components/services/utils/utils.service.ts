import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Observable } from 'rxjs';



import { Variables } from 'src/app/components/Utils/variables';



@Injectable({
  providedIn: 'root'



})
export class Utilsservice {

  private variables : Variables = new Variables();

  private endpoint: string = this.variables.URL;
 
  constructor(private http: HttpClient) { }


  downloadFile(id:number) {
    return this.http.get(`${this.endpoint}/Image/Dwonload/${id}`, { responseType: 'blob' });
  }
 
 



}
