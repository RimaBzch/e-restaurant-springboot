import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  private baseUrl ="//localhost:8082/product";

  constructor(private HttpClient:HttpClient) { }

  getCategories():any
  {
      // return this.HttpClient.get<GetResponseBooks>(this.baseUrl).pipe(
      // map(response => response._embedded.books)
      const searchUrl=`${this.baseUrl}/get/categories`;
      
      //{headers: new HttpHeaders().set('Content-Type', 'application/json')}
    
     
      return this.HttpClient.get<any>(searchUrl,{
       headers :{
      'Content-Type': 'application/json'     
       },
       withCredentials: true} );
  }

  saveCategorie(data:any):any
  {
    const searchUrl=`${this.baseUrl}/save/Categorie`;
      
    //{headers: new HttpHeaders().set('Content-Type', 'application/json')}
  
   
    return this.HttpClient.post<any>(searchUrl , data ,{
                                                        headers :{
                                                        'Content-Type': 'text/plain'     
                                                        },
                                                        withCredentials: true
                                                       } );
  }


  updateCategorie(data:any):any
  {
    const searchUrl=`${this.baseUrl}/update/Categorie`;
    return this.HttpClient.post<any>(searchUrl , data ,{
      headers :{
      'Content-Type': 'application/json'     
      },
      withCredentials: true
     } );
  }

  deleteCategorie(data:any):any
  {
    const searchUrl=`${this.baseUrl}/delete/Categorie`;
    return this.HttpClient.post<any>(searchUrl , data ,{
      headers :{
      'Content-Type': 'text/plain'    
      },
      withCredentials: true
     } );
  }


  getProducts():any
  {
      // return this.HttpClient.get<GetResponseBooks>(this.baseUrl).pipe(
      // map(response => response._embedded.books)
      const searchUrl=`${this.baseUrl}/get/products`;
      
      //{headers: new HttpHeaders().set('Content-Type', 'application/json')}
    
     
      return this.HttpClient.get<any>(searchUrl,{
       headers :{
     // 'Authorization': 'Basic ' + btoa(username + ':' + pswd),
      'Content-Type': 'application/json'     
       },
       withCredentials: true} );
  }

  getProductsByCategorie(id:any):any
  {
      // return this.HttpClient.get<GetResponseBooks>(this.baseUrl).pipe(
      // map(response => response._embedded.books)
      const searchUrl=`${this.baseUrl}/get/productsByCategorie/${id}`;
      
      //{headers: new HttpHeaders().set('Content-Type', 'application/json')}
    
     
      return this.HttpClient.get<any>(searchUrl,{
       headers :{
    //  'Authorization': 'Basic ' + btoa(username + ':' + pswd),
      'Content-Type': 'application/json'     
       },
       withCredentials: true} );
  }

}
