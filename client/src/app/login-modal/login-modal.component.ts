import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { User } from '../common/User';
import Validation from '../utils/validation';
import {AuthServiceService} from '../Services/auth-service.service'
import {AlertsService} from '../Services/alerts.service'
import { ignoreElements } from 'rxjs';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import * as CryptoJS from 'crypto-js'; 
import { Global } from '../common/Global';
import { Subscription } from 'rxjs'
import {SharedService} from '../Services/shared.service'
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { PaymentComponent } from '../payment/payment.component';
import {SignupModalComponent} from '../signup-modal/signup-modal.component'
import { Order } from '../common/Order';
import {OrderService} from '../Services/order.service'
import { ConfirmAdressComponent } from '../confirm-adress/confirm-adress.component';
@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent implements OnInit {

  subscription: Subscription = new Subscription;
  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    checkbox : new FormControl('')
  });
  submitted = false;
  constructor(private formBuilder: FormBuilder,
              private authService:AuthServiceService,
              private snotify:AlertsService,
              private router:Router,
              private SharedService:SharedService,
              public dialogRef: MatDialogRef<LoginModalComponent> ,
              private matDialog: MatDialog ,
              private orderService:OrderService) { }
 
  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
        ]
        ,
        checkbox:['']
      }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  role:any
  user: User = new User('','','',[],'',true,true,true,true,true,'',0,'');
  onSubmit(): void {
    this.submitted = true;
    
    if (this.form.invalid) {
      return;
    }
    console.log(JSON.stringify(this.form.value, null, 2));
    this.user.email = this.form.value.email;
    this.user.password = this.form.value.password;
    this.user.rememberme = this.form.value.checkbox;
    console.log(this.user);
    this.authService.authenticate(this.user).subscribe(
      (            data: { success: string ; error: string ; role: string ;id:string}) => { 

        console.log("data : ",data)
        console.log("data sucess lenght: ",data.success.length)        
        console.log("data error lenght : ",data.error.length)

        let username = CryptoJS.AES.encrypt(this.user.email,"ss").toString();
        let pswd = CryptoJS.AES.encrypt(this.user.password,"ss").toString();
        this.role = CryptoJS.AES.encrypt(data.role,"ss").toString();
        let id = CryptoJS.AES.encrypt(data.id,"ss").toString();
        console.log("aa component : username :",username);
        console.log("aa component : password :",pswd);
        console.log("aa component : id :",data.id);
        localStorage.setItem("!?,,",username)
        localStorage.setItem("!1a32",pswd)
        localStorage.setItem("!!q21",this.role)
        localStorage.setItem("!?w9-",id)
        this.SharedService.SetRole(this.role);
        this.SharedService.SetConnected(true)
        this.SharedService.SetUser(this.user.email) 
        this.SharedService.SetPswd(this.user.password)  
        this.SharedService.SetUserId(data.id);
        if(data.success.length>0 && data.role =="[USER]")
        {

          
          let order:Order = this.SharedService.GetOrder();
          order.setIdUser(id);
          this.SharedService.SetOrder(order);
          this.orderService.saveOrder(order).subscribe(
          (data:any) => {
          console.log("save order : ",data)
          }
        )
          const dialogConfig = new MatDialogConfig();
          // The user can't close the dialog by clicking outside its body
          dialogConfig.disableClose = true;
          dialogConfig.id = "confirmAdress-component";
          dialogConfig.height = "350px";
          dialogConfig.width = "600px";
          this.matDialog.closeAll();
          this.matDialog.open(ConfirmAdressComponent, dialogConfig);
        }
        
         else if(data.error.length > 0)
        {
           this.snotify.error(data.error,"Error");
        }
        else
        {
          this.snotify.warning("Please use a normal user account to pass an order","Warning ! ..")
         
        }
        
    ///  this.profile.showSuccess('Email has been sent successfully','Success')
  },
        ( err: { message: string; }) => {
       console.log(err);
     // this.snotify.warning(err, 'Warning', this.snotifyConfig);
     ///   this.snotify.warning("Web service not available ","Error");
     // this.profile.showWarning(err,'Warning')
     }
    )
  }
  ngOnDestroy()
  {
   this.subscription.unsubscribe();
   this.onReset()
  // this.snotify.clear()
  }
  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
  closeModal() {
    this.dialogRef.close();
  }

  goSignUp()
  {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "signup-component";
    dialogConfig.height = "350";
    dialogConfig.width = "600px";
    this.matDialog.open(SignupModalComponent, dialogConfig);
  }

}
