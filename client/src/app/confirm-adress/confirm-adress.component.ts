import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import {SharedService} from '../Services/shared.service'
import { Router, ActivatedRoute, ParamMap, NavigationStart } from '@angular/router';
import { AlertsService} from '../Services/alerts.service'
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Validation from '../utils/validation';
import { Observable, Subscriber, Subscription } from 'rxjs';
import {OrderService} from '../Services/order.service'
import{UserService} from '../Services/user.service'
import { User } from '../common/User';
import { PaymentComponent } from '../payment/payment.component';
import * as CryptoJS from 'crypto-js'; 
import { Order } from '../common/Order';

@Component({
  selector: 'app-confirm-adress',
  templateUrl: './confirm-adress.component.html',
  styleUrls: ['./confirm-adress.component.css']
})
export class ConfirmAdressComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<ConfirmAdressComponent> , 
    private SharedService:SharedService,
    private matDialog: MatDialog,
    private Router:Router,
    private spotify:AlertsService,
    private UserService:UserService,
    private OrderService:OrderService
    ) { }
    subscription: Subscription = new Subscription;
    form: FormGroup = new FormGroup({
      adress: new FormControl(''),
      tel : new FormControl('')
    });
    submitted = false;
   lat:any
   long:any
   ngOnInit(): void {
    this.getCurrentPosition().subscribe((position: any) => {
      this.lat = position.latitude 
      this.long =position.longitude
    })
   }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  closeModal() {
    this.dialogRef.close();
  }

  user: User = new User('','','',[],'',true,true,true,true,true,'',0,'');
  onSubmit(): void {
    this.submitted = true;
    
    if (this.form.invalid) {
      return;
    }
     
    let address = this.form.value.adress;
    let tel = this.form.value.tel;
    this.user.tel = tel;
    this.user.address=address;
    console.log(address);
    let idEncript = localStorage.getItem("!?w9-");
    let userEncript = localStorage.getItem("!?,,");
    let passwordEnc = localStorage.getItem("!1a32");

    console.log("idEncript ",idEncript)
    
    console.log("userEncript ",userEncript)
    
    console.log("passwordEnc ",passwordEnc)
    let id = ""
    let username = ""
    let pswd = ""
    if(userEncript!= null)
    {
     username = CryptoJS.AES.decrypt(userEncript,"ss").toString(CryptoJS.enc.Utf8);
    }
    if(passwordEnc != null)
    {
      pswd = CryptoJS.AES.decrypt(passwordEnc,"ss").toString(CryptoJS.enc.Utf8);
    }
    if(idEncript!= null)
    {
     id = CryptoJS.AES.decrypt(idEncript,"ss").toString(CryptoJS.enc.Utf8);
    }
   let order:Order = this.SharedService.GetOrder();
   let idorder = this.SharedService.getIdOrder();
   order.id=idorder
   order.lat=this.lat
   order.lon=this.long
   console.log(order)
    this.OrderService.updateOrder(order).subscribe(
      (data: { status: string ; message: string ; object: string })=>{
        console.log("long lat update :",data)
        if(data.status=="OK")
        {

        }
        if(data.status=="KO")
        {

        }
      }
    )

    this.user.id=id;
    this.user.email= username
    this.user.name= username
    this.user.password=pswd
    this.UserService.updateAddress(this.user).subscribe(
      (            data: { status: string ; message: string ; object: string }) => { 

        console.log("data : ",data)
     
        if(data.status=="OK")
        {
          this.SharedService.setAddress(address);
        
          const dialogConfig = new MatDialogConfig();
          // The user can't close the dialog by clicking outside its body
          dialogConfig.disableClose = true;
          dialogConfig.id = "payment-component";
          dialogConfig.height = "350px";
          dialogConfig.width = "600px";

          this.matDialog.closeAll();
          this.matDialog.open(PaymentComponent, dialogConfig);
        }
        else if(data.status =="KO")
        {
           this.spotify.error(data.message,"Error");
        }
    ///  this.profile.showSuccess('Email has been sent successfully','Success')
  },
      ( err: { message: string; }) => {
       console.log(err);
       this.spotify.warning(err, 'Warning');
    
      }
     )
  }

  private getCurrentPosition(): any {
    return new Observable((observer: Subscriber<any>) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position: any) => {
          observer.next({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          observer.complete();
        });
      } else {
        observer.error();
      }
    });
  }

}
