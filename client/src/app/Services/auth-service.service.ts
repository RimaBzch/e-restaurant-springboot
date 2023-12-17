import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../common/User';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private baseUrl ="//localhost:8082/api/v1";

  constructor(private HttpClient:HttpClient) { }

  authenticate(user:User):any
  {
      // return this.HttpClient.get<GetResponseBooks>(this.baseUrl).pipe(
      // map(response => response._embedded.books)
      const searchUrl=`${this.baseUrl}/auth`;
      console.log("useer : ",user)
      //{headers: new HttpHeaders().set('Content-Type', 'application/json')}
      let userStringfy:string = JSON.stringify(user);
      console.log("userStringfy :",userStringfy)
      return this.HttpClient.post<any>(searchUrl,userStringfy,{
        headers :{
          'Authorization': 'Basic ' + btoa(user.email + ':' + user.password),
          'Content-Type': 'application/json'     
           },
           withCredentials: true} );
  }


  signUp(user:User):any
  {
    const searchUrl=`${this.baseUrl}/signup`;
      console.log("useer : ",user)
      //{headers: new HttpHeaders().set('Content-Type', 'application/json')}
      //let userStringfy:string = JSON.stringify(data);
      //console.log("userStringfy :",userStringfy)
      console.log("user.role : ",JSON.stringify(user.role))
      
      let userStringfy:string = JSON.stringify(user);
      console.log("userStringfy :",userStringfy)
      return this.HttpClient.post<any>(searchUrl,userStringfy,{
       headers :{
      'Content-Type': 'application/json',
     // 'Authorization': 'Basic ' + btoa(user.name + ':' + user.password),     
       },
       withCredentials: true} );

  }

  logout():any
  {
    const searchUrl=`${this.baseUrl}/logout`;
    return this.HttpClient.get<any>(searchUrl,{
     
      withCredentials: true} );
 
   }

  
  
  checkAuthenticate(user:string,password:string):any
  {
    const searchUrl=`${this.baseUrl}/checkLogged`;
    console.log("useer : ",user)
    //{headers: new HttpHeaders().set('Content-Type', 'application/json')}
    let userStringfy:string = user+";"+password

    console.log("userStringfy :",userStringfy.toString())
    return this.HttpClient.post<any>(searchUrl,userStringfy,{
     headers :{
    'Content-Type': 'application/json'     
     },
     withCredentials: true} );

  }
}




interface GetResponseAuthenticate{
  _embedded :{
    user:User;
  }
}


