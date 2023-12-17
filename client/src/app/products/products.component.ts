import { Component, OnInit } from '@angular/core';

import { HttpClientModule ,HttpClientXsrfModule, HttpXsrfTokenExtractor, HTTP_INTERCEPTORS} from '@angular/common/http';
import { ProductServiceService } from '../Services/product-service.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import * as CryptoJS from 'crypto-js';  

import {AlertsService} from '../Services/alerts.service';
import {SharedService} from '../Services/shared.service';
import { FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  userCrypted = localStorage.getItem("!?,,")
  pswdCrypted = localStorage.getItem("!1a32")

  products:any
  size:any=1
  showMenu = true;
  id:any
  constructor(private _Activatedroute:ActivatedRoute,
    private productService:ProductServiceService,
    private SharedService:SharedService) { }
  
  ngOnInit(): void {

    this.id=this._Activatedroute.snapshot.paramMap.get("id");
    if(this.userCrypted != undefined && this.userCrypted != null && this.pswdCrypted != undefined && this.pswdCrypted != null )
    {
      
        let username = CryptoJS.AES.decrypt(this.userCrypted,"ss").toString(CryptoJS.enc.Utf8);
        let pswd = CryptoJS.AES.decrypt(this.pswdCrypted,"ss").toString(CryptoJS.enc.Utf8);
    }
            console.log("get products ");
            this.productService.getProductsByCategorie(this.id).subscribe( (res: any) => {
            console.log(res);
            this.products =res
      
      
         }

      )
    

  }


  toggleMenu() {
    this.showMenu = !this.showMenu;
 }


 commands: any={};
 cardNotifNumber:any=0;
 addToCard(productname:any,productprix:any)
 {
   if(this.categorieFormControl.value == undefined || this.categorieFormControl.value == null || this.categorieFormControl.value == "")
   {
   //  this.snotify.error( "select number of order for this product" , "Error");
       
   }
   else
   {
     this.cardNotifNumber=this.cardNotifNumber+1;
  this.commands = {
                    name :productname,
                    prix:productprix,
                    quantity :this.categorieFormControl.value
                  }
   this.SharedService.SetCart(this.commands)
   this.SharedService.incrementNotif(this.categorieFormControl.value)

   console.log(this.SharedService.GetCart())

  console.log(this.commands)
                 }

                 console.log(this.SharedService.GetCart())
 }

 categorieFormControl  = new FormControl("", [
  Validators.required
]);
}
