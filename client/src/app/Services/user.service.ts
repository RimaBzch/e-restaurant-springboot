import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../common/User';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl ="//localhost:8082/api/v1";

  constructor(private HttpClient:HttpClient) { }

  updateAddress(user:User):any
  {
    
      const searchUrl=`${this.baseUrl}/updateAdress`;
      console.log("useer : ",user)

      let userStringfy:string = JSON.stringify(user);
      console.log("userStringfy :",userStringfy)
      return this.HttpClient.post<any>(searchUrl,userStringfy,{
        headers :{
       //   'Authorization': 'Basic ' + btoa(user.email + ':' + user.password),
          'Content-Type': 'application/json'     
           },
           withCredentials: true} );
  }

  getUser(idUser:any)
  {
    const searchUrl=`${this.baseUrl}/user`;
    console.log("id : ",idUser)

    return this.HttpClient.post<any>(searchUrl,idUser,{
      headers :{
     //   'Authorization': 'Basic ' + btoa(user.email + ':' + user.password),
        'Content-Type': 'application/json'     
         },
         withCredentials: true} ); 
  }


  

}
