import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Browser, Map, map, tileLayer } from 'leaflet';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';

import { Observable, Subscriber } from 'rxjs';

import {SharedService} from '../Services/shared.service';
import { environment } from '../../environments/environment';
import { UserService } from '../Services/user.service';
import { User } from '../common/User';
import { Order } from '../common/Order';

@Component({
  selector: 'app-map-modal',
  templateUrl: './map-modal.component.html',
  styleUrls: ['./map-modal.component.css']
})

export class MapModalComponent  implements OnInit,AfterViewInit {

  

  constructor(public dialogRef: MatDialogRef<MapModalComponent> ,
     private UserService:UserService,
      private SharedService:SharedService ) {
  }
  
  
  ngAfterViewInit(): void {
    
  }
  address:any=''
  tel:any=''
  idUser:any
  error:any=''
  latDel:any = 0
  lonDel:any = 0
  lat:any = 0
  lon:any = 0
  user!: User;
  consumer:User = new User('','','',[],'',true,true,true,true,true,'',0,'');
   order!:Order
  ngOnInit(): void {
    this.idUser=localStorage.getItem("UD");
    this.user= this.SharedService.getUserDel()
    this.order= this.SharedService.GetOrder()
  
    this.UserService.getUser(this.order.idUser).subscribe(
      (resp:any)=>{
        this.consumer=resp.object;
      }
    )
  }



  

  close() {
    this.dialogRef.close();
  }

}
