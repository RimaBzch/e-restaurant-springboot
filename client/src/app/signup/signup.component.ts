import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Validation from '../utils/validation';
import { SnotifyPosition, SnotifyService, SnotifyToastConfig } from 'ng-snotify';

import {AuthServiceService} from '../Services/auth-service.service';
import { User } from '../common/User';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
 //for the alert   
 style = 'material';
 title = 'Snotify title!';
 body = 'Lorem ipsum dolor sit amet!';
 timeout = 3000;
 position: SnotifyPosition = SnotifyPosition.centerCenter;
 progressBar = true;
 closeClick = true;
 newTop = true;
 filterDuplicates = false;
 backdrop = -1;
 dockMax = 8;
 blockMax = 6;
 pauseHover = true;
 titleMaxLength = 15;
 bodyMaxLength = 80;
 //.............//
  form: FormGroup = new FormGroup({
   
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    address: new FormControl(''),
    tel : new FormControl('')    
  });
  submitted = false;
  constructor(private formBuilder: FormBuilder ,
              private authService:AuthServiceService,  
              private snotify:SnotifyService,
              private router:Router) 
              { }

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
        ],
        confirmPassword: ['', Validators.required],
        address:['', Validators.required],
        tel:['', Validators.required]
      }
      
    );
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
 
  user: User = new User('','','',[],'',true,true,true,true,false,'',0,'');
  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      console.log("")
      return;
    }

    console.log(JSON.stringify(this.form.value));

    if(this.form.value.password != this.form.value.confirmPassword)
    {
      this.snotify.warning( "Password is not equal to ConfirmPassword value" , "Error", this.getConfig());
      return
    }

    this.user.name=this.form.value.email
    this.user.email=this.form.value.email
    this.user.password=this.form.value.password
    this.user.role=["USER"]
    this.user.address=this.form.value.address
    this.user.tel=this.form.value.tel

                  this.authService.signUp(this.user).subscribe(
                    (res:any)=>{
                      console.log("res sign up : ",res)

                      if(res.success.length>0)
                      {
                            try 
                            {
                            //let username = CryptoJS.AES.encrypt(this.user.email,"ss").toString();
                           // let pswd = CryptoJS.AES.encrypt(this.user.password,"ss").toString();
                           // console.log("aa component : username :",username);
                           // console.log("aa component : password :",pswd);
              
                            //localStorage.setItem("!?,,",username)
                            //localStorage.setItem("!1a32",pswd)
                            
                            this.snotify.success( res.success , "Success", this.getConfig());
                            this.router.navigate(["/login"]);
                            } catch (e) {
                              console.log(e);
                            }
                   
                      }
              
                      if(res.error.length > 0)
                      {
                        this.snotify.error(res.error,"Error", this.getConfig());
                   
                      }
                    },
                    (err:any)=>{
                      console.log("error : ",err)
                      this.snotify.error(err,"Error", this.getConfig());
                   
                    }
                  )

  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

  getConfig(): SnotifyToastConfig {
    this.snotify.setDefaults({
      global: {
        newOnTop: this.newTop,
        maxAtPosition: this.blockMax,
        maxOnScreen: this.dockMax,
        // @ts-ignore
        filterDuplicates: this.filterDuplicates
      }
    });
    return {
      bodyMaxLength: this.bodyMaxLength,
      titleMaxLength: this.titleMaxLength,
      backdrop: this.backdrop,
      position: this.position,
      timeout: this.timeout,
      showProgressBar: this.progressBar,
      closeOnClick: this.closeClick,
      pauseOnHover: this.pauseHover
    };
  }
}
