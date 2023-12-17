import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Validation from '../utils/validation';
import { SnotifyPosition, SnotifyService, SnotifyToastConfig } from 'ng-snotify';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import {AuthServiceService} from '../Services/auth-service.service';
import { User } from '../common/User';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { PaymentComponent } from '../payment/payment.component';
import {SharedService} from '../Services/shared.service'
@Component({
  selector: 'app-signup-modal',
  templateUrl: './signup-modal.component.html',
  styleUrls: ['./signup-modal.component.css']
})
export class SignupModalComponent implements OnInit {

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
    confirmPassword: new FormControl('')    
  });
  submitted = false;
  constructor(private formBuilder: FormBuilder ,
              private authService:AuthServiceService,  
              private snotify:SnotifyService,
              private router:Router,
              public  dialogRef: MatDialogRef<SignupModalComponent> ,
              private matDialog: MatDialog,
              private SharedService:SharedService) 
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
        confirmPassword: ['', Validators.required]
      }
      
    );
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
 
  user: User = new User('','','',[],'',true,true,true,true,false,'',0,'');
  role:any; 
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

                  this.authService.signUp(this.user).subscribe(
                    (res:any)=>{
                     
                      if(res.success.length>0)
                      {
                            try 
                            {
                           
                            this.user.email = this.form.value.email;
                            this.user.password = this.form.value.password;
                            this.user.rememberme = this.form.value.checkbox;
                            console.log(this.user);
                            this.authService.authenticate(this.user).subscribe(
                              ( data: { success: string ; error: string ; role: string ;}) => { 

                                console.log("data : ",data)
                                console.log("data sucess lenght: ",data.success.length)        
                                console.log("data error lenght : ",data.error.length)

                                let username = CryptoJS.AES.encrypt(this.user.email,"ss").toString();
                                let pswd = CryptoJS.AES.encrypt(this.user.password,"ss").toString();
                                this.role = CryptoJS.AES.encrypt(data.role,"ss").toString();
                                console.log("aa component : username :",username);
                                console.log("aa component : password :",pswd);
                                localStorage.setItem("!?,,",username)
                                localStorage.setItem("!1a32",pswd)
                                localStorage.setItem("!!q21",this.role)
                                this.SharedService.SetRole(this.role);
                                if(data.success.length>0)
                                {
                                  this.snotify.success( res.success , "Success", this.getConfig());
                                  const dialogConfig = new MatDialogConfig();
                                  // The user can't close the dialog by clicking outside its body
                                  dialogConfig.disableClose = true;
                                  dialogConfig.id = "signup-modal-component";
                                  dialogConfig.height = "350px";
                                  dialogConfig.width = "600px";
                                  this.matDialog.open(PaymentComponent, dialogConfig);
                                }
                              }
                             )
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

  closeModal() {
    this.dialogRef.close();
  }

}
