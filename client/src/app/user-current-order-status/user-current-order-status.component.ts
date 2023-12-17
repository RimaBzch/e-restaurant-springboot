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
  selector: 'app-user-current-order-status',
  templateUrl: './user-current-order-status.component.html',
  styleUrls: ['./user-current-order-status.component.css']
})
export class UserCurrentOrderStatusComponent implements OnInit,AfterViewInit {

  constructor(private OrderService:OrderService,
              private AlertsService:AlertsService,
              private UserService:UserService,
              private matDialog: MatDialog,
              private SharedService:SharedService,
              private webSocketAPI:WebSocketAPIService,
              private _Activatedroute:ActivatedRoute,
              private productService:ProductServiceService) { }


  arrOrder :Order[] = [] ;
  warning: any="";
  name = "Angular";
  currentStep : number[]=[];
  numSteps = 4;
  ngOnInit(): void {
   
    let idCrypted= this._Activatedroute.snapshot.paramMap.get("id");
    console.log("idcryptyed : ", idCrypted)
    if(idCrypted != undefined && idCrypted != null )
    {
      let id = CryptoJS.AES.decrypt(idCrypted,"ss").toString(CryptoJS.enc.Utf8);
      this.OrderService.getLstCurrentOrdersByUserID(id).subscribe(async (data:any)=>
        {
          console.log("get current user : ", data)
          if(data.object != null)
          {
            this.arrOrder= data.object;
            for(let i = 0; i<this.arrOrder.length;i++)
            {
              this.updateCurrentStep(this.arrOrder[i]);
            }

          //  this.nextStep()
            
          }
          else
          {
            this.warning= data.message;
          }        
        }
      )
     }
    

     const _this=this
     let stompClient:any=this.webSocketAPI._connect_current();
     stompClient.connect({}, function (frame: any) {
     console.log("connected :",frame)
       stompClient.subscribe(_this.webSocketAPI.topicCurrentUser, function (sdkEvent: any) {
            console.log("sdkEvent :",sdkEvent)
            _this.arrOrder = sdkEvent.body;
            for(let i = 0; i<_this.arrOrder.length;i++)
            {
              _this.updateCurrentStep(_this.arrOrder[i]);
            }
            setTimeout(() => {
              _this.nextStep();
            },10000);
            _this.handleMessage(JSON.stringify(sdkEvent.body));
       });   
     })
   
  } 

  updateCurrentStep(order:any) {
    if (order.payed == true && order.prepared == false && order.delivered == false && order.idDelivery == "") {
      this.currentStep.push(1);
    } else if (order.payed == true && order.prepared == true && order.delivered == false && order.idDelivery == "") {
      this.currentStep.push(2);
    } else if (order.payed == true && order.prepared == true && order.delivered == false && order.idDelivery != "") {
      this.currentStep.push(3);
    } else if (order.payed == true && order.prepared == true && order.delivered == true && order.idDelivery != "") {
       this.currentStep.push(4);
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.nextStep();
    },10000);
  }
  handleMessage(arg0: string) {
    
    let a = JSON.parse(arg0)
    let aa = JSON.parse(a)
    
    console.log("JSON recp websoket res:  a   ", aa.object)
    this.arrOrder =aa.object;
    
   /// this.ngAfterViewInit()
   }
 

  nextStep() {
   
    for(let i=0;i<this.arrOrder.length;i++)
    {
          var stepper = document.getElementById("stepper"+this.arrOrder[i].id);
          if(stepper!=null)
          {
          var steps = stepper.getElementsByClassName("step");

          Array.from(steps).forEach((step, index) => {
            let stepNum = index + 1;
            if (stepNum === this.currentStep[i]) {
              this.addClass(step, "editing");
            } else {
              this.removeClass(step, "editing");
            }
            if (stepNum < this.currentStep[i]) {
              this.addClass(step, "done");
            } else {
              this.removeClass(step, "done");
            }
          });
        }
      }
  }
  hasClass(elem:any, className:any) {
    return new RegExp(" " + className + " ").test(" " + elem.className + " ");
  }

  addClass(elem:any, className:any) {
    if (!this.hasClass(elem, className)) {
      elem.className += " " + className;
    }
  }

  removeClass(elem:any, className:any) {
    var newClass = " " + elem.className.replace(/[\t\r\n]/g, " ") + " ";
    if (this.hasClass(elem, className)) {
      while (newClass.indexOf(" " + className + " ") >= 0) {
        newClass = newClass.replace(" " + className + " ", " ");
      }
      elem.className = newClass.replace(/^\s+|\s+$/g, "");
    }
  }
}
