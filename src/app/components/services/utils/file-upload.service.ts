import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Variables } from 'src/app/components/Utils/variables';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

 // API url 

 
    
 constructor(private http:HttpClient) { } 
 
 // Returns an observable 
 upload(ruta:string, file: File ,  directorio:string , idusuario:number , tipodedocumento:number  ):Observable<any> { 
 
     // Create form data 
     const formData = new FormData();  
       
     // Store form name as "file" with file data 
     formData.append("file", file, file.name); 
       
     // Make http post request over api 
     // with formData as req 
     return this.http.post(ruta, formData ,  { params: {  directorio:directorio, idusuario: idusuario,tipodedocumento:tipodedocumento }}  ) 
 } 
}
