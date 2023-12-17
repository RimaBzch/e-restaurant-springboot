import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../Services/product-service.service';
import { FormControl, Validators } from '@angular/forms';
import {AlertsService} from '../Services/alerts.service';
import * as CryptoJS from 'crypto-js';  
import {SharedService} from '../Services/shared.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashbord-user',
  templateUrl: './dashbord-user.component.html',
  styleUrls: ['./dashbord-user.component.css']
})

export class DashbordUserComponent implements OnInit {
 
  userCrypted =localStorage.getItem("!?,,")
  pswdCrypted =localStorage.getItem("!1a32")
  products:any=''//[{name:'',categorie:'',composition:'',prix:0,picture:{picByte:''}}]

  connected: boolean = false;
  subscription!: Subscription;
  size:any=1

  constructor(private productService:ProductServiceService,
              private spotify:AlertsService ,
              private SharedService:SharedService) 
  {}
       
  categorieFormControl  = new FormControl("", [
    Validators.required
  ]);

  messageNoInternet :string = ""
  timeLeft: number = 30;
  interval:any;
  ngOnInit(): void {
    console.log("get products");
    this.subscription=  this.productService.getProducts().subscribe( (res: any) => {
    console.log(res);
    this.messageNoInternet=""
    this.products =res
    },
    (err:any)=>{ 
    this.messageNoInternet="No Internet connection !"
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
        this.subscription=  this.productService.getProducts().subscribe( (res: any) => {
          console.log(res);
          this.products =res
          this.messageNoInternet=""
          })
      } else {
        clearInterval(this.interval);
      }
    },3000)
    }
    )   
  }

  commands: any={};
  cardNotifNumber:any=0;
  addToCard(productname:any,productprix:any)
  {
    if(this.categorieFormControl.value == undefined || this.categorieFormControl.value == null || this.categorieFormControl.value == "")
    {
      this.spotify.error( "select number of order for this product" , "Error");
    // console.log(this.categorieFormControl)
    }
    else if(this.categorieFormControl.status=="INVALID")
    {
      this.spotify.warning("Please select the quantity  to order","Action cannot be done!")
    }
    else
    {
      this.cardNotifNumber=this.cardNotifNumber+1;
      this.commands = {
                      id:this.cardNotifNumber,
                      name :productname,
                      prix:productprix,
                      quantity :this.categorieFormControl.value
                      }
      this.SharedService.SetCart(this.commands)
      this.SharedService.setCardNotifNumber(this.cardNotifNumber);
      //this.SharedService.incrementNotif(this.categorieFormControl.value)      
      console.log(this.SharedService.GetCart())
      console.log(this.commands)
    }
  }

  ngOnDestroy()
  {
 
  }
  
}

