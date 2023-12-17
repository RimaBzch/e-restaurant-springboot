import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { HttpClient, HttpClientXsrfModule, HttpHeaders, HttpParams} from '@angular/common/http';
import {SharedService} from '../Services/shared.service'
import * as CryptoJS from 'crypto-js'; 
import { Payment } from '../common/Payment';
import {AlertsService} from '../Services/alerts.service'
import { LoadingComponent } from '../loading/loading.component';
import {OrderService} from '../Services/order.service'
import { Order } from '../common/Order';

import { WebSocketAPIService } from '../Services/web-socket-api.service';
import { timeStamp } from 'console';
import { AppComponent } from '../app.component';
import { ProductServiceService } from '../Services/product-service.service';
import { Router } from '@angular/router';
import { AuthServiceService } from '../Services/auth-service.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  static greeting: string= "";
    static handleMessage(message: any) {
      console.log(message)
    }
    payed:boolean = false;
  constructor( 
     public dialogRef: MatDialogRef<PaymentComponent> , 
    private SharedService:SharedService,
    private matDialog: MatDialog,
    private AlertsService:AlertsService,
    private http:HttpClient,
    private orderService:OrderService,
    private webSocketAPI: WebSocketAPIService) { }

    
    greeting: any;
    name: string="asassasasasasas";

     productService!: ProductServiceService;
     Router!: Router;
     HttpClientXsrfModule!: HttpClientXsrfModule; 
     authServiceService!: AuthServiceService;
    
    
    
    
  ngOnInit(): void {
    this.webSocketAPI._connect();
  }
  closeModal() {
    this.dialogRef.close();
  }

  chargeCreditCard() {   
    let form = document.getElementsByTagName("form")[0];
    console.log(form);
  (<any>window).Stripe.card.createToken({
    number: form['cardNumber'].value,
    exp_month: form['expMonth'].value,
    exp_year: form['expYear'].value,
    cvc: form['cvc'].value
  }, (status: number, response: any) => {
    if (status === 200) {
      let token = response.id;
      this.chargeCard(token);
    } else {
      console.log(response.error.message);
    }
  }); 
   // this.closeModal();
  }
   p:Payment = new Payment(0,'');
  chargeCard(token: any) {
 
  let userCrypted = localStorage.getItem("!?,,")
  let pswdCrypted = localStorage.getItem("!1a32")
 // let idCryped = localStorage.getItem("!?w9-")
  if(/*idCryped != undefined && idCryped != null && */userCrypted != undefined && userCrypted != null && pswdCrypted != undefined && pswdCrypted != null )
  {
    
      let username = CryptoJS.AES.decrypt(userCrypted,"ss").toString(CryptoJS.enc.Utf8);
      let pswd = CryptoJS.AES.decrypt(pswdCrypted,"ss").toString(CryptoJS.enc.Utf8);
    //  let id = CryptoJS.AES.decrypt(idCryped,"ss").toString(CryptoJS.enc.Utf8);
    const headers = new Headers();
    //let data = {'token': token , 'amount' : this.SharedService.GetTotalAmountToPay()}
    
    this.p.amount= this.SharedService.GetTotalAmountToPay();
    this.p.token=token;

    console.log("aaaaaa : " ,this.p)
    console.log("user : " ,username)
    console.log("pswd : " ,pswd)
   //let params1 = new HttpParams().set("data", JSON.stringify(data));
    let bodyString: string = JSON.stringify(this.p)
    this.http.post<any>('//localhost:8082/payment/charge', bodyString, {
      headers :{
     'Authorization': 'Basic ' + btoa(username + ':' + pswd),
     'Content-Type': 'application/json'     
      },
      withCredentials: true
    })
    .subscribe(resp => {
      console.log("paymenet : =====>",resp);
      if(resp.status =="succeeded")
      {  try{  
        const _this=this
       // let stompClient:any=this.webSocketAPI._connect();
        this.webSocketAPI._send("");
       // this.webSocketAPI._send_To_CurrentOrderUser("",id);
        /*stompClient.connect({}, function (frame: any) {
        console.log("connected :",frame)
          stompClient.subscribe(_this.webSocketAPI.topic, function (sdkEvent: any) {
               console.log("sdkEvent :",sdkEvent)
              _this.webSocketAPI._send(sdkEvent);
             
          });
          //_this.stompClient.reconnect_delay = 2000;
      }, this.webSocketAPI.errorCallBack);*/

      
          this.AlertsService.success("payment done successfully","Payment")
          let order:Order = this.SharedService.GetOrder();
          let idOrder = this.SharedService.getIdOrder();
          console.log("pay : idOrder :",idOrder)
          order.id= idOrder
          order.payed=true
          this.SharedService.SetOrder(order)
          this.orderService.updateOrder(order).subscribe((data:any)=>{
          console.log("update : ",data)
          })
          const dialogConfig = new MatDialogConfig();
          // The user can't close the dialog by clicking outside its body
          dialogConfig.disableClose = true;
          dialogConfig.id = "loading-component";
          dialogConfig.height = "300px";
          dialogConfig.width = "600px";
          
          //this.matDialog.closeAll();
         
          this.matDialog.open(LoadingComponent, dialogConfig);
          this.closeModal()
        }
        catch(e:any)
        {
          console.log("eerrror : ",e)
          this.AlertsService.error(e,"Payment");
        }
      }
      else{
        this.AlertsService.error("payment failed","Payment")
      }
    })
    }
  }

 


    connect(){
      this.webSocketAPI._connect();
    }

    disconnect(){
      this.webSocketAPI._disconnect();
    }

    sendMessage(){
      this.webSocketAPI._send(this.name);
    }

    handleMessage(message: any){
      this.greeting = message;
    }
}
