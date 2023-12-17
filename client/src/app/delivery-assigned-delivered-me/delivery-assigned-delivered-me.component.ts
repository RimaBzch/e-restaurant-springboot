import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {OrderService} from '../Services/order.service'
import { UserService } from '../Services/user.service';
import {AlertsService} from '../Services/alerts.service'
import { Order } from '../common/Order';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MapModalComponent } from '../map-modal/map-modal.component';
import { Subscription } from 'rxjs';
import {SharedService} from '../Services/shared.service';
import { User } from '../common/User';
import * as CryptoJS from 'crypto-js'; 
import { WebSocketAPIService } from '../Services/web-socket-api.service';
import { ProductServiceService } from '../Services/product-service.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-delivery-assigned-delivered-me',
  templateUrl: './delivery-assigned-delivered-me.component.html',
  styleUrls: ['./delivery-assigned-delivered-me.component.css']
})
export class DeliveryAssignedDeliveredMeComponent implements OnInit {

  handleMessage(arg0: string) {
    
    let a = JSON.parse(arg0)
    let aa = JSON.parse(a)
    
    console.log("JSON recp websoket res:  a   ", aa.object)
    this.dataSource =new MatTableDataSource<PeriodicElement>(aa.object);
    this.dataSource.paginator = this.paginator;
   /// this.ngAfterViewInit()
 }
  displayedColumns: string[] = ['idUser', 'order', 'amount', 'payed','prepared','dateReqOrder','delivered','id'];
  
  subscription!: Subscription;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private OrderService:OrderService,
    private AlertsService:AlertsService,
    private UserService:UserService,
    private matDialog: MatDialog,
    private SharedService:SharedService,
    private webSocketAPI:WebSocketAPIService,
    private _Activatedroute:ActivatedRoute,
    private productService:ProductServiceService ){

  }

  dataSource =new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  ngAfterViewInit() {
  }

  ngOnInit(): void {
   let idCrypted= this._Activatedroute.snapshot.paramMap.get("id");
    console.log("idcryptyed : ", idCrypted)
    if(idCrypted != undefined && idCrypted != null )
    {
     let id = CryptoJS.AES.decrypt(idCrypted,"ss").toString(CryptoJS.enc.Utf8);
    console.log("id : ",id)
     this.subscription =  this.OrderService.getLstOrderAssignedDeleveredByMe(id).subscribe(
      (data:{status:string, message:string, object:any}) => 
      {
        console.log("data :",data)
        if(data.status=="OK")
        {
          this.dataSource =new MatTableDataSource<PeriodicElement>(data.object);
          this.dataSource.paginator = this.paginator;
        }
        else if (data.status =="KO")
        {
          this.AlertsService.error(data.message,"Error")
        }
      }
    )
    }
  //const _this=this
  //  let stompClient:any=this.webSocketAPI._connect_del();
  //stompClient.connect({}, function (frame: any) {
  //console.log("connected :",frame)
  // stompClient.subscribe(_this.webSocketAPI.topicDel, function (sdkEvent: any) {
  //    console.log("sdkEvent :",sdkEvent)
  //  _this.dataSource =new MatTableDataSource<PeriodicElement>(sdkEvent.body);
  //_this.handleMessage(JSON.stringify(sdkEvent.body));
  //});
  //})
  }

  takeIt(element:Order)
  {
    let iddelCr = localStorage.getItem("!?w9-")
    if(iddelCr!= null)
    {
    let idDel = CryptoJS.AES.decrypt(iddelCr,"ss").toString(CryptoJS.enc.Utf8);
    element.idDelivery=idDel
    console.log("this.SharedService.getUserIdDel() ",this.SharedService.getUserIdDel())
      this.OrderService.updateOrder(element).subscribe(
        (data:{status:string,message:String,object:any})=>{
          console.log(data)
          if(data.status=="OK")
          {
            this.AlertsService.success("Order assigned to You!","keep going ;)")
          }
          else if (data.status=="KO")
          {
            this.AlertsService.error(data.message,"error")
          }
        }
      )
    }
  }

  ready(element:Order)
  {
    element.delivered=true;
    element.dateDeliviery=new Date();
   
    this.OrderService.updateOrder(element).subscribe(
      (data:{status:string,message:String,object:any})=>{
        if(data.status=="OK")
        {
          this.AlertsService.success("Order well delivered!","Good job")
        }
        else if (data.status=="KO")
        {
          this.AlertsService.error(data.message,"error")
        }
      }
    )
  }

  ngOnDestroy()
  {
    //this.subscription.unsubscribe();
  }

  map(element:Order)
  {
    let idUser = element.idUser;
    this.SharedService.setUserIdDel(idUser)
    console.log("idUser : ",idUser)
    let user:User= new User('','','',[],'',true,true,true,true,true,'',0,'');
    this.UserService.getUser(idUser).subscribe(
      (data:{status:any,message:any,object:any})=> {
        console.log(data)
        if(data.status=="OK")
        {
          user = data.object
          this.SharedService.setUserDel(user)        
          this.SharedService.SetOrder(element)
          localStorage.setItem("UD",idUser)
          this.matDialog.closeAll()
          const dialogConfig = new MatDialogConfig();
          // The user can't close the dialog by clicking outside its body
          dialogConfig.disableClose = true;
          dialogConfig.id = "MapModal-component";
          dialogConfig.height = "600px";
          dialogConfig.width = "600px";
          this.matDialog.open(MapModalComponent, dialogConfig);
        }
        if(data.status=="KO")
        {
           
        }
      }
    )
  }   


}

export interface PeriodicElement {
   id:string,
   idUser:string,
   order:string, 
   amount:number, 
   payed:boolean,
   delivered:boolean,
   idDelivery:string,
   dateDeliviery:Date,
   dateReqOrder:Date,
   prepared:boolean
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
   id:'',
   idUser:'',
   order:'', 
   amount:0, 
   payed:false,
   delivered:false,
   idDelivery:'',
   dateDeliviery: new Date(0),
   dateReqOrder: new Date(0),
   prepared: false
  }
];