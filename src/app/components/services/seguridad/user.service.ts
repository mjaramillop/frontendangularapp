import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Observable } from 'rxjs';


import { Variables } from 'src/app/components/Utils/variables';


@Injectable({
  providedIn: 'root'
})
export class Userservice {

  private variables : Variables = new Variables();

  private endpoint: string = this.variables.URL;
 
 
  constructor(private http: HttpClient) { }


  UserValidateAccess(login:string , password:string): Observable<any> {
    return this.http.get(`${this.endpoint}/User/ValidateAccess/${login}/${password}`)
  }

 


  UserValidateToken(token:string): Observable< any> {
    return this.http.get(`${this.endpoint}/User/ValidateToken/${token}`)
  }


  LogOut(): Observable<any> {
    return this.http.get(`${this.endpoint}/User/LogOut`)
  }


  
 
  GetById(userid:number):Observable<any> {
    return this.http.get( `${this.endpoint}/User/GetById/${userid}` );
  }











}
