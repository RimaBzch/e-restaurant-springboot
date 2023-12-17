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
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
 
  subscription!: Subscription;
  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    checkbox : new FormControl('')
  });
  submitted = false;
  constructor(private formBuilder: FormBuilder,
     private authService:AuthServiceService,
     private spotify:AlertsService,
     private router:Router,
     private SharedService:SharedService) { }
 
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
    this.subscription=this.authService.authenticate(this.user).subscribe(
      (            data: { success: string ; error: string ; role: string ; id:string}) => { 

        console.log("data : ",data)
        console.log("data sucess lenght: ",data.success.length)        
        console.log("data error lenght : ",data.error.length)

        let username = CryptoJS.AES.encrypt(this.user.email,"ss").toString();
        let pswd = CryptoJS.AES.encrypt(this.user.password,"ss").toString();
        let id = CryptoJS.AES.encrypt(data.id,"ss").toString();
        this.role = CryptoJS.AES.encrypt(data.role,"ss").toString();
        console.log("aa component : username :",username);
        console.log("aa component : password :",pswd);
        localStorage.setItem("!?,,",username)
        localStorage.setItem("!1a32",pswd)
        localStorage.setItem("!!q21",this.role)
        localStorage.setItem("!?w9-",id)
        this.SharedService.SetRole(this.role);
        console.log("user id : ", data.id)
        this.SharedService.SetUserId(data.id);
        this.SharedService.SetUser(this.user.email); 
        this.SharedService.SetPswd(this.user.password);         
          if(data.success.length>0)
          {

            if(data.role == "[ADMIN]")
            {
                try 
                {
                  this.spotify.success( data.success , "Success");
                  this.SharedService.SetConnected(true)
                  this.router.navigate(["/adminDashboard"]);
                  
                 // Global.connected=true
                 
                } catch (e) {
                  console.log(e);
                }
                
                 
            }
            else if(data.role == "[USER]")
            {
              try 
              {
                this.spotify.success( data.success , "Success");
                this.SharedService.SetConnected(true)
                this.router.navigate(["/userDashboard"]);
             //   Global.connected=true
              }
               catch (e)
              {
                console.log(e);
              }
            }
            else if(data.role == "[DELIVERY]")
            {
              try 
              { this.SharedService.setUserIdDel(data.id)
                this.spotify.success( data.success , "Success");
                this.SharedService.SetConnected(true)
                this.router.navigate(["/deliveryDashboard"]);
             //   Global.connected=true
              }
               catch (e)
              {
                console.log(e);
              }
            }
            else if(data.role == "[RECEPTION]")
            {
              try 
              {
                this.spotify.success( data.success , "Success");
                this.SharedService.SetConnected(true)
                this.router.navigate(["/receptionDashboard"]);
             //   Global.connected=true
              }
               catch (e)
              {
                console.log(e);
              }
            }
            else
            {
             this.spotify.warning( "This user don't have the right privilege" , "Access privilege");
            }
        }
        else if(data.error.length > 0)
        {
           this.spotify.error(data.error,"Error");
        }
    ///  this.profile.showSuccess('Email has been sent successfully','Success')
  },
        ( err: { message: string; statusText:string;}) => {
       console.log(err);
      this.spotify.warning("email or/and password is/are wrong(s)", 'Warning');
   ///   this.spotify.warning("Web service not available ","Error");
     // this.profile.showWarning(err,'Warning')
     }
    )
   
  
   
  }
 ngOnDestroy()
 {
 console.log("ondestroy :",this.subscription)
  this.onReset()
  //this.subscription.unsubscribe();
 // this.spotify.clear()
 }
  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

  
}
