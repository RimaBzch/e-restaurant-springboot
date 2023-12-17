import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Order } from '../common/Order';
import { SharedService } from './shared.service';
import * as CryptoJS from 'crypto-js'; 
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl ="//localhost:8082/order";
  constructor(private HttpClient:HttpClient, private SharedService:SharedService) { }
  userCrypted = localStorage.getItem("!?,,")
  pswdCrypted = localStorage.getItem("!1a32")

  getOrderByID(id:any):any
  {
    const searchUrl=`${this.baseUrl}/find/${id}`;
      let user = ""
      let password = ""

      if(this.userCrypted != undefined && this.userCrypted != null && this.pswdCrypted != undefined && this.pswdCrypted != null  )
      {
        user = CryptoJS.AES.decrypt(this.userCrypted,"ss").toString(CryptoJS.enc.Utf8);
        password = CryptoJS.AES.decrypt(this.pswdCrypted,"ss").toString(CryptoJS.enc.Utf8);
      } 

      console.log("shared service user : ",user)
      console.log("shared service password : ",password)
      console.log(" Id : ",id)
      console.log("--->",searchUrl)
      return this.HttpClient.get<any>(
                                      searchUrl,
                                      {
                                        params: id,
                                        headers :
                                        {
                                        //'Authorization': 'Basic ' + btoa(user + ':' + password),
                                        'Content-Type': 'application/json'     
                                        },
                                        withCredentials: true
                                      }
    );
  }

  saveOrder(order:Order):any
  {
      // return this.HttpClient.get<GetResponseBooks>(this.baseUrl).pipe(
      // map(response => response._embedded.books)
      const searchUrl=`${this.baseUrl}/save`;
      console.log("order : ",order)
      //{headers: new HttpHeaders().set('Content-Type', 'application/json')}
      let orderStringfy:string = JSON.stringify(order);
      console.log("orderStringfy :",orderStringfy)
      let user = ""
      let password = ""
      if(this.userCrypted != undefined && this.userCrypted != null && this.pswdCrypted != undefined && this.pswdCrypted != null  )
      {
        user = CryptoJS.AES.decrypt(this.userCrypted,"ss").toString(CryptoJS.enc.Utf8);
        password = CryptoJS.AES.decrypt(this.pswdCrypted,"ss").toString(CryptoJS.enc.Utf8);
      } 
      console.log("shared service user : ",user)
      console.log("shared service password : ",password)
      return this.HttpClient.post<any>(searchUrl,
                                       orderStringfy,
                                      {
                                        headers :
                                        {
                                        //'Authorization': 'Basic ' + btoa(user + ':' + password),
                                        'Content-Type': 'application/json'     
                                        },
                                        withCredentials: true
                                      }
                                      );
  }

  updateOrder(order:Order):any
  {
      // return this.HttpClient.get<GetResponseBooks>(this.baseUrl).pipe(
      // map(response => response._embedded.books)
      const searchUrl=`${this.baseUrl}/update`;
      console.log("order : ",order)
      //{headers: new HttpHeaders().set('Content-Type', 'application/json')}
      let orderStringfy:string = JSON.stringify(order);
      console.log("orderStringfy :",orderStringfy)
      let user = ""
      let password = ""
      if(this.userCrypted != undefined && this.userCrypted != null && this.pswdCrypted != undefined && this.pswdCrypted != null  )
      {
        user = CryptoJS.AES.decrypt(this.userCrypted,"ss").toString(CryptoJS.enc.Utf8);
        password = CryptoJS.AES.decrypt(this.pswdCrypted,"ss").toString(CryptoJS.enc.Utf8);
      } 
      console.log("shared service user : ",user)
      console.log("shared service password : ",password)
      return this.HttpClient.post<any>(
          searchUrl,
          orderStringfy,
          {
            headers :
            {
            //'Authorization': 'Basic ' + btoa(user + ':' + password),
            'Content-Type': 'application/json'     
            },
            withCredentials: true
          }
    );
  }


  getLstOrderPayednotPrepared():any
  {
      // return this.HttpClient.get<GetResponseBooks>(this.baseUrl).pipe(
      // map(response => response._embedded.books)
      const searchUrl=`${this.baseUrl}/find/payed/notPrepared`;
      //console.log("page : ",page)
      //{headers: new HttpHeaders().set('Content-Type', 'application/json')}
     // let pageStringfy:string = JSON.stringify(page);
      
      let user = ""
      let password = ""
      if(this.userCrypted != undefined && this.userCrypted != null && this.pswdCrypted != undefined && this.pswdCrypted != null  )
      {
        user = CryptoJS.AES.decrypt(this.userCrypted,"ss").toString(CryptoJS.enc.Utf8);
        password = CryptoJS.AES.decrypt(this.pswdCrypted,"ss").toString(CryptoJS.enc.Utf8);
      } 
      console.log("shared service user : ",user)
      console.log("shared service password : ",password)
      return this.HttpClient.get<any>(
          searchUrl,
         // pageStringfy,
          {
            headers :
            {
            //'Authorization': 'Basic ' + btoa(user + ':' + password),
            'Content-Type': 'application/json'     
            },
            withCredentials: true
          }
    );
  }


  getLstOrderPayedNotAssigned():any
  {
      // return this.HttpClient.get<GetResponseBooks>(this.baseUrl).pipe(
      // map(response => response._embedded.books)
      const searchUrl=`${this.baseUrl}/find/payed/notAssigned`;
      //console.log("page : ",page)
      //{headers: new HttpHeaders().set('Content-Type', 'application/json')}
     // let pageStringfy:string = JSON.stringify(page);
      
      let user = ""
      let password = ""
      if(this.userCrypted != undefined && this.userCrypted != null && this.pswdCrypted != undefined && this.pswdCrypted != null  )
      {
        user = CryptoJS.AES.decrypt(this.userCrypted,"ss").toString(CryptoJS.enc.Utf8);
        password = CryptoJS.AES.decrypt(this.pswdCrypted,"ss").toString(CryptoJS.enc.Utf8);
      } 
      console.log("shared service user : ",user)
      console.log("shared service password : ",password)
      return this.HttpClient.get<any>(
          searchUrl,
         // pageStringfy,
          {
            headers :
            {
            //'Authorization': 'Basic ' + btoa(user + ':' + password),
            'Content-Type': 'application/json'     
            },
            withCredentials: true
          }
    );
  }


  getLstOrderAssignedToMe(id:any):any
  {
    console.log("id :",id)
    const searchUrl=`${this.baseUrl}/find/payed/assigned/${id}`;
    let user = ""
    let password = ""

    if(this.userCrypted != undefined && this.userCrypted != null && this.pswdCrypted != undefined && this.pswdCrypted != null  )
    {
      user = CryptoJS.AES.decrypt(this.userCrypted,"ss").toString(CryptoJS.enc.Utf8);
      password = CryptoJS.AES.decrypt(this.pswdCrypted,"ss").toString(CryptoJS.enc.Utf8);
    } 

    console.log("shared service user : ",user)
    console.log("shared service password : ",password)
    console.log(" Id : ",id)
    console.log("--->",searchUrl)
    return this.HttpClient.get<any>(
        searchUrl,
        {
          params: id,
          headers :
          {
          //'Authorization': 'Basic ' + btoa(user + ':' + password),
          'Content-Type': 'application/json'     
          },
          withCredentials: true
        }
  );
  }


  getLstOrderAssignedDeleveredByMe(id:any):any
  {
    console.log("id :",id)
    const searchUrl=`${this.baseUrl}/find/payed/assigned/delivered/${id}`;
    let user = ""
    let password = ""

    if(this.userCrypted != undefined && this.userCrypted != null && this.pswdCrypted != undefined && this.pswdCrypted != null  )
    {
      user = CryptoJS.AES.decrypt(this.userCrypted,"ss").toString(CryptoJS.enc.Utf8);
      password = CryptoJS.AES.decrypt(this.pswdCrypted,"ss").toString(CryptoJS.enc.Utf8);
    } 

    console.log("shared service user : ",user)
    console.log("shared service password : ",password)
    console.log(" Id : ",id)
    console.log("--->",searchUrl)
    return this.HttpClient.get<any>(
        searchUrl,
        {
          params: id,
          headers :
          {
          //'Authorization': 'Basic ' + btoa(user + ':' + password),
          'Content-Type': 'application/json'     
          },
          withCredentials: true
        }
  );
  }


  getLstOrdersDeliveredByUserID(id:any):any
  {
    console.log("id :",id)
    const searchUrl=`${this.baseUrl}/find/payed/assigned/delivered/user/${id}`;
    let user = ""
    let password = ""

    if(this.userCrypted != undefined && this.userCrypted != null && this.pswdCrypted != undefined && this.pswdCrypted != null  )
    {
      user = CryptoJS.AES.decrypt(this.userCrypted,"ss").toString(CryptoJS.enc.Utf8);
      password = CryptoJS.AES.decrypt(this.pswdCrypted,"ss").toString(CryptoJS.enc.Utf8);
    } 

    console.log("shared service user : ",user)
    console.log("shared service password : ",password)
    console.log(" Id : ",id)
    console.log("--->",searchUrl)
    return this.HttpClient.get<any>(
        searchUrl,
        {
          params: id,
          headers :
          {
          //'Authorization': 'Basic ' + btoa(user + ':' + password),
          'Content-Type': 'application/json'     
          },
          withCredentials: true
        }
  );
  }


  getLstCurrentOrdersByUserID(id:any):any
  {
    console.log("id :",id)
    const searchUrl=`${this.baseUrl}/find/last/ten/user/${id}`;
    let user = ""
    let password = ""

    if(this.userCrypted != undefined && this.userCrypted != null && this.pswdCrypted != undefined && this.pswdCrypted != null  )
    {
      user = CryptoJS.AES.decrypt(this.userCrypted,"ss").toString(CryptoJS.enc.Utf8);
      password = CryptoJS.AES.decrypt(this.pswdCrypted,"ss").toString(CryptoJS.enc.Utf8);
    } 

    console.log("shared service user : ",user)
    console.log("shared service password : ",password)
    console.log(" Id : ",id)
    console.log("--->",searchUrl)
    return this.HttpClient.get<any>(
        searchUrl,
        {
          params: id,
          headers :
          {
          //'Authorization': 'Basic ' + btoa(user + ':' + password),
          'Content-Type': 'application/json'     
          },
          withCredentials: true
        }
  );
  }


  getIncomeByMonths(year:any):any
  {
    console.log("id :",year)
    const searchUrl=`${this.baseUrl}/income/${year}`;
    let user = ""
    let password = ""

    if(this.userCrypted != undefined && this.userCrypted != null && this.pswdCrypted != undefined && this.pswdCrypted != null  )
    {
      user = CryptoJS.AES.decrypt(this.userCrypted,"ss").toString(CryptoJS.enc.Utf8);
      password = CryptoJS.AES.decrypt(this.pswdCrypted,"ss").toString(CryptoJS.enc.Utf8);
    } 

    console.log("shared service user : ",user)
    console.log("shared service password : ",password)
    
   
    return this.HttpClient.get<any>(
        searchUrl,
        {
          params: year,
          headers :
          {
          //'Authorization': 'Basic ' + btoa(user + ':' + password),
          'Content-Type': 'application/json'     
          },
          withCredentials: true
        }
  );
  }
}
