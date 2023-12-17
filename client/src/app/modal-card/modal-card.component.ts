import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { PaymentComponent } from '../payment/payment.component';
import { SignupComponent } from '../signup/signup.component';
import {SharedService} from '../Services/shared.service'
import { Router, ActivatedRoute, ParamMap, NavigationStart } from '@angular/router';
import {AlertsService} from '../Services/alerts.service'
import {SignupModalComponent} from '../signup-modal/signup-modal.component' 
import {LoginModalComponent} from '../login-modal/login-modal.component'
import {OrderService} from '../Services/order.service'
import { Order } from '../common/Order';
import * as CryptoJS from 'crypto-js'; 
import { ConfirmAdressComponent } from '../confirm-adress/confirm-adress.component';

@Component({
  selector: 'app-modal-card',
  templateUrl: './modal-card.component.html',
  styleUrls: ['./modal-card.component.css']
})
export class ModalCardComponent implements OnInit {

  constructor
  (
    public dialogRef: MatDialogRef<ModalCardComponent> , 
    private SharedService:SharedService,
    private matDialog: MatDialog,
    private Router:Router,
    private spotify:AlertsService,
    private orderService:OrderService
  ) { }


  ngOnInit() {
    this.commond = this.SharedService.GetCart()
    for(let i =0;i<this.commond.length;i++)
    {
      this.total = this.total+(this.commond[i].prix*this.commond[i].quantity)
      this.order = this.order +" "+ this.commond[i].quantity + " : " +this.commond[i].name + " : " + this.commond[i].prix + " \n "
    }
    console.log(this.commond.length)
    console.log(this.total)

    this.SharedService.SetTotalAmountToPay(this.total)
  }
  order:string=''
  total:any=2.5
  commond:any
  connected:boolean = false;
  roleCryp = localStorage.getItem("!!q21");
  // When the user clicks the action button a.k.a. the logout button in the\
  // modal, show an alert and followed by the closing of the modal
  actionFunction() {    
    this.closeModal();
    const dialogConfig = new MatDialogConfig();
     
    console.log("roleCryp :",this.roleCryp)
    let role = ""
    if(this.roleCryp != null)
    {
    role =  CryptoJS.AES.decrypt(this.roleCryp,"ss").toString(CryptoJS.enc.Utf8);
    
    }

    console.log("---> :",role)
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "ConfirmAdress-component";
    dialogConfig.height = "350px";
    dialogConfig.width = "600px";
    // https://material.angular.io/components/dialog/overview
    this.connected = this.SharedService.GetConnected();
    if(this.connected == true)
    {
      let idEncript = localStorage.getItem("!?w9-");
      console.log("idEncript : ",idEncript)
      if(idEncript != null)
      {
        let id:string = CryptoJS.AES.decrypt(idEncript,"ss").toString(CryptoJS.enc.Utf8);//this.SharedService.GetUserId();
        console.log("id user :",id)
        let order:Order = new Order('',id,this.order,this.total,false,false,'',new Date(0),new Date(),false,0,0);
        this.SharedService.SetOrder(order);
        this.orderService.saveOrder(order).subscribe(
          (data:{status:string,message:string,object:string}) => {
              console.log("save order : ",data)
              if(data.status=="OK" && role == "[USER]" )
              {
                this.SharedService.setIdOrder(data.object)
                localStorage.setItem("!!!",data.object)
                const modalDialog = this.matDialog.open(ConfirmAdressComponent, dialogConfig);
              }
              else
              {
                this.spotify.warning("Please use a normal user account to pass an order","Warning ! ..")
              }
              if(data.status=="KO")
              {
                this.spotify.error(data.message,"Error, please contact the admin ..")
                console.log("exception : ",data.message)
              }
          }
        )
       
      }
    }
    else
    {
        this.matDialog.open(LoginModalComponent, dialogConfig);
     // this.Router.navigate(["/signup"]);
    }
  }

  // If the user clicks the cancel button a.k.a. the go back button, then\
  // just close the modal
  closeModal() {
    this.dialogRef.close();
  }

  removeItem(id:any,amount:any)
  {
    document.getElementById(id)?.remove();
    let notifNum = this.SharedService.GetCardNotifNumber();
    this.SharedService.setCardNotifNumber(notifNum - 1);
    this.total=this.total-amount;
    this.SharedService.SetTotalAmountToPay(this.total);
  }
}
