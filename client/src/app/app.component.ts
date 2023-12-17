import { Component, SimpleChanges } from '@angular/core';

import { HttpClientXsrfModule} from '@angular/common/http';
import { AuthServiceService } from './Services/auth-service.service';
import { Router } from '@angular/router';

import * as CryptoJS from 'crypto-js';  
import { ModalCardComponent } from './modal-card/modal-card.component';
import { SharedService} from './Services/shared.service'
import { MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { ProductServiceService } from './Services/product-service.service';
import { Subscription } from 'rxjs';

import { HttpClient } from '@angular/common/http';

import { WebsocketshareService } from './Services/websocketshare.service';
import { WebSocketAPIService } from './Services/web-socket-api.service';
import { timeStamp } from 'console';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
        //this.connected=false;
       
  userCrypted = localStorage.getItem("!?,,")
  pswdCrypted = localStorage.getItem("!1a32")
  title = 'restaurant'
  role = localStorage.getItem("!!q21")
  roleToCheck = this.role
  connected = false 
  subscription!: Subscription;

  wsData: string = 'Hello'; // default data, will be updated when the new data is pushed from spring boot backend
  constructor(
     private productService:ProductServiceService,
     private Router:Router ,
     private HttpClientXsrfModule:HttpClientXsrfModule ,
     private authServiceService:AuthServiceService,
     private SharedService:SharedService,
     private matDialog: MatDialog,
     private http: HttpClient
    
      )
      {
      this.getCategories()
      }

  gotoTables()
  {
    this.Router.navigate(["/tables"]);
  }

  addProduct()
  {
    this.Router.navigate(["/addProduct"]);
  }
  deleteProduct()
  {
    this.Router.navigate(["/deleteProduct"]);
  }  

  updateProduct()
  {    
    this.Router.navigate(["/updateProduct"]);
  }
//---------------------------
  addCategorie()
  { 
    this.Router.navigate(["/addCategorie"]);
  }

  deleteCategorie()
  {
    this.Router.navigate(["/deleteCategorie"]);
  }

  updateCategorie()
  {
    this.Router.navigate(["/updateCategorie"]);
  }

  goToHome()
  {
    this.Router.navigate(["/adminDashboard"]);
  }

  goToHomeDel()
  {
    this.Router.navigate(["/deliveryDashboard"]);
  }
  goToHomeUser()
  {
    this.Router.navigate(["/userDashboard"]);
  }

  addUser()
  {
    this.Router.navigate(["/users"]);
  }

  updateUser()
  {

  }

  deleteUser()
  {

  }

  getOrderAssignedToMe()
  {
    //sdws
  
    let id =   localStorage.getItem("!?w9-");
    this.Router.navigate(['order/assigned',id]);
  }

  getUserOrder()
  {
    let id =   localStorage.getItem("!?w9-");
    this.Router.navigate(['userDashboard/orders',id]);
  }

  
  getCurrentOrderByUserId()
  {
    //sdws
  
    let id =   localStorage.getItem("!?w9-");
    this.Router.navigate(['userDashboard/current/orders',id]);
  }
  getOrderAssignedDeliveredByMe()
  {
    //sdws
  
    let id =   localStorage.getItem("!?w9-");
    this.Router.navigate(['order/assigned/delivered',id]);
  }

  username:any 
  pswd:any
  roleToUse:any
//-----------------------------
  ngOnInit()
  {          
    
    //this.connected=false;
    
    HttpClientXsrfModule.disable();
    this.numOrder = this.SharedService.GetCardNotifNumber();
   
   // console.log("user Crypt",this.userCrypted)
    //console.log("pswd Crypt",this.pswdCrypted)
    try
    {
     if(this.userCrypted != undefined && this.userCrypted != null && this.pswdCrypted != undefined && this.pswdCrypted != null && this.role != undefined && this.role != null )
     {
        this.username = CryptoJS.AES.decrypt(this.userCrypted,"ss").toString(CryptoJS.enc.Utf8);
        this.pswd = CryptoJS.AES.decrypt(this.pswdCrypted,"ss").toString(CryptoJS.enc.Utf8);
        this.roleToUse = CryptoJS.AES.decrypt(this.role,"ss").toString(CryptoJS.enc.Utf8);
        this.roleToCheck = this.roleToUse
    
        //console.log(this.username)
        //console.log(this.pswd)
        //console.log(this.roleToUse)
      
        this.subscription= this.authServiceService.checkAuthenticate(this.username,this.pswd).subscribe(
          (data: any) => 
          { 
            console.log("data component ", this.roleToUse)  
            //this.Router.navigateByUrl("userDashboard");  
            this.SharedService.SetConnected(this.connected);
            if(data.role == "[USER]")
            {
              
              this.connected=true
              this.Router.navigate(['/userDashboard']); 
               
            }  
            else  if    
            (data.role == "[ADMIN]")
            {
              this.connected=true
              this.Router.navigate(['/adminDashboard']);    
            } 
            else  if    
            (data.role == "[DELIVERY]")
            {
              this.connected=true
              this.Router.navigate(['/deliveryDashboard']);    
            } 
            else  if    
            (data.role == "[RECEPTION]")
            {
              this.webSocketAPI = new WebSocketAPIService();
              this.connect();   
              this.connected=true
              this.Router.navigate(['/receptionDashboard']);    
            }    
            else   
            {
              console.log()
              this.connected=false
              localStorage.removeItem("!?,,")
              localStorage.removeItem("!1a32")
              localStorage.removeItem("!!q21")
              localStorage.clear()
              this.Router.navigate(['/']);
            }     
            this.SharedService.SetConnected(this.connected)                   
          }
          ,
            (err: any) =>
            {
              console.log("err :",err)    
            }
          )
        // console.log("connected :",this.connected)
        }
       }
       catch(e)
       {
        console.log("error compononts ts ",e)
       }

      this.webSocketAPI = new WebSocketAPIService();
      this.connect();     
      }


   
    goToLogin()
  {
    this.Router.navigate(['/login']);
  }

  goToAnalytics()
  {
    this.Router.navigate(['/adminDashboard/analytics']);
  }

  
  categories:any
  getCategories()
  {
    console.log("get products ");
    this.subscription= this.productService.getCategories().subscribe( (res: any) => {
      console.log(res);
      this.categories =res  
    })
  }

  goToProductsByCategorie(id:any)
  {

  }

  numOrder:any
  logout()
  {
      this.subscription=  this.authServiceService.logout().subscribe((res:any)=>
            {
              console.log("res :",res)
              localStorage.removeItem("!?,,")
              localStorage.removeItem("!1a32")
              localStorage.removeItem("!!q21")
              localStorage.clear()
                                         
            }
            ,
            (err:any)=>{
              console.log("err : ",err)
            }
        )
        this.SharedService.SetConnected(false);
        setTimeout(() => {
        this.Router.navigate(['/']); 
        },1000); 
  }

  ngDoCheck()
  {
      let role = localStorage.getItem("!!q21")
      this.numOrder = this.SharedService.GetCardNotifNumber();
      if(role != null)
      {
      this.roleToCheck = CryptoJS.AES.decrypt(role,"ss").toString(CryptoJS.enc.Utf8);
      this.connected=true
      }
      else
      {
      this.roleToCheck=''
      this.connected = false
      }
  }

  openCard()
  {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "350px";
    dialogConfig.width = "600px";
    const modalDialog = this.matDialog.open(ModalCardComponent, dialogConfig);
  }

  ngOnDestroy()
  {
    this.subscription.unsubscribe;
  }

  

  webSocketAPI!: WebSocketAPIService;
  greeting: any;
  name: string="asassasasasasas";
  

  connect(){
    this.webSocketAPI._connect();
  }

  disconnect(){
    this.webSocketAPI._disconnect();
  }

  sendMessage(){
    this.webSocketAPI._send(this.name);
  }
  getMessage(){
    this.webSocketAPI.getMessages();
  }
  handleMessage(message: any){
    this.greeting = message;
  }
  static greeting:string = ''
  static  handleMessage(message: string) {
    this.greeting = message;
    console.log(this.greeting)
  }

}
