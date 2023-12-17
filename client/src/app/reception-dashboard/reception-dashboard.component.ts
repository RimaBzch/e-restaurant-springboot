import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {OrderService} from '../Services/order.service'
import {AlertsService} from '../Services/alerts.service'
import { Order } from '../common/Order';
import { WebSocketAPIService } from '../Services/web-socket-api.service';

@Component({
  selector: 'app-reception-dashboard',
  templateUrl: './reception-dashboard.component.html',
  styleUrls: ['./reception-dashboard.component.css']
})
export class ReceptionDashboardComponent  implements AfterViewInit , OnInit{
 
    handleMessage(arg0: string) {
    
     let a = JSON.parse(arg0)
     let aa = JSON.parse(a)
     
     console.log("JSON recp websoket res:  a   ", aa.object)
     this.dataSource =new MatTableDataSource<PeriodicElement>(aa.object);
     this.dataSource.paginator = this.paginator;
    /// this.ngAfterViewInit()
    }


  displayedColumns: string[] = ['idUser', 'order', 'amount', 'payed','prepared','dateReqOrder','id'];
  

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource =new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  constructor(private OrderService:OrderService,
              private AlertsService:AlertsService,
              private webSocketAPI:WebSocketAPIService)
              {
                
              }

 

  ngAfterViewInit() {
    this.OrderService.getLstOrderPayednotPrepared().subscribe(
      (data:{status:string, message:string, object:any}) => 
      {
        console.log("data :",data)
        if(data.status=="OK")
        {
          this.dataSource =new MatTableDataSource<PeriodicElement>(data.object);
        }
        else if (data.status =="KO")
        {
          this.AlertsService.error(data.message,"Error")
        }
      }
    )
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    const _this=this
    let stompClient:any=this.webSocketAPI._connect();
    stompClient.connect({}, function (frame: any) {
    console.log("connected :",frame)
      stompClient.subscribe(_this.webSocketAPI.topic, function (sdkEvent: any) {
           console.log("sdkEvent :",sdkEvent)
           _this.dataSource =new MatTableDataSource<PeriodicElement>(sdkEvent.body);
           _this.handleMessage(JSON.stringify(sdkEvent.body));
      });   
    })
  }

  ready(element:Order)
  {
    element.prepared=true;
   this.OrderService.updateOrder(element).subscribe(
    (data:{status:string,message:String,object:any})=>{
      if(data.status=="OK")
      {
        console.log("element.idUser :",element.idUser)
        this.webSocketAPI._send_To_Del("");
        this.webSocketAPI._send_To_CurrentOrderUser(element.idUser);
        this.AlertsService.success("Order ready to be delivered!","Good job")
      }
      else if (data.status=="KO")
      {
        this.AlertsService.error(data.message,"error")
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


