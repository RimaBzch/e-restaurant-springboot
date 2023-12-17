import { Component, OnInit } from '@angular/core';
import {ProductServiceService} from '../../Services/product-service.service'
import * as CryptoJS from 'crypto-js';  
@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {
  userCrypted = localStorage.getItem("!?,,")
  pswdCrypted = localStorage.getItem("!1a32")
  products:any
  size:any=1
  showMenu = true;
  constructor(private productService:ProductServiceService) { }

  ngOnInit(): void {

   if(this.userCrypted != undefined && this.userCrypted != null && this.pswdCrypted != undefined && this.pswdCrypted != null )
    {
      
        let username = CryptoJS.AES.decrypt(this.userCrypted,"ss").toString(CryptoJS.enc.Utf8);
        let pswd = CryptoJS.AES.decrypt(this.pswdCrypted,"ss").toString(CryptoJS.enc.Utf8);
     
    
    }

    console.log("get products ");
    this.productService.getProducts().subscribe( (res: any) => {
    console.log(res);
    this.products =res


}
)
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
 }

}
  
  //ff71ea927561

  
