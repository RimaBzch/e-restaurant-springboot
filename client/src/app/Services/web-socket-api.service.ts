import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { AppComponent } from '../app.component';
import {PaymentComponent} from '../payment/payment.component'
import { Router } from '@angular/router';
import { HttpClient, HttpClientXsrfModule } from '@angular/common/http';
import { AuthServiceService } from './auth-service.service';
import { SharedService } from './shared.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductServiceService } from './product-service.service';
import { ReceptionDashboardComponent } from '../reception-dashboard/reception-dashboard.component';
import { OrderService } from './order.service';
import { AlertsService } from './alerts.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class WebSocketAPIService {


  webSocketEndPoint: string = 'http://localhost:8082/websocket';
    topic: string = "/topic/receptionDashboard";
    topicDel: string = "/topic/deliveryDashboard";
    topicCurrentUser : string = "/topic/usercurrentOrder";
    stompClient: any;
    productService!: ProductServiceService;
    Router!: Router;
    HttpClientXsrfModule: HttpClientXsrfModule = new HttpClientXsrfModule;
    authServiceService!: AuthServiceService;
    SharedService: SharedService = new SharedService;
    matDialog!: MatDialog ;
    http!: HttpClient  ;
    appComponent!: AppComponent;

    paymentComponent!: PaymentComponent; 
    orderService!: OrderService;
    alertService!: AlertsService;
    constructor(){
      
    }
    _connect():any {
        console.log("Initialize WebSocket Connection");
        let ws = new SockJS(this.webSocketEndPoint);
        this.stompClient = Stomp.over(ws);
        const _this = this;
        _this.stompClient.connect({}, function (frame: any) {
          console.log("connected :",frame)
            _this.stompClient.subscribe(_this.topic, function (sdkEvent: any) {
                 console.log("sdkEvent :",sdkEvent)
                _this.onMessageReceived(sdkEvent);
            });
            //_this.stompClient.reconnect_delay = 2000;
        }, this.errorCallBack);

        return this.stompClient;
   
    };

    _connect_del():any {
      console.log("Initialize WebSocket Connection");
      let ws = new SockJS(this.webSocketEndPoint);
      this.stompClient = Stomp.over(ws);
      const _this = this;
      _this.stompClient.connect({}, function (frame: any) {
        console.log("connected :",frame)
          _this.stompClient.subscribe(_this.topicDel, function (sdkEvent: any) {
               console.log("sdkEvent :",sdkEvent)
              _this.onMessageReceived(sdkEvent);
          });
          //_this.stompClient.reconnect_delay = 2000;
      }, this.errorCallBack);

      return this.stompClient;
 
  };


  _connect_current()
  {
    console.log("Initialize WebSocket Connection");
    let ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);
    const _this = this;
    _this.stompClient.connect({}, function (frame: any) {
      console.log("connected :",frame)
        _this.stompClient.subscribe(_this.topicCurrentUser, function (sdkEvent: any) {
             console.log("sdkEvent :",sdkEvent)
            _this.onMessageReceived(sdkEvent);
        });
        //_this.stompClient.reconnect_delay = 2000;
    }, this.errorCallBack);

    return this.stompClient;
  }

    /* _connect(): Observable<any> {
        const socket = new SockJS('http://localhost:8082/websocket');
        this.stompClient = Stomp.over(socket);
        const observable = new Observable(observer => {
          this.stompClient.connect({}, (frame: any) => {
            observer.next(frame);
          });
        });
        return observable;
      }*/

    _disconnect() {
        if (this.stompClient !== null) {
            this.stompClient.disconnect();
        }
        console.log("Disconnected");
    }

    // on error, schedule a reconnection attempt
    errorCallBack(error: string) {
        console.log("errorCallBack -> " + error)
        setTimeout(() => {
            this._connect();
        }, 5000);
    }

 /**
  * Send message to sever via web socket
  * @param {*} message 
  */
    _send(message: any) {
        console.log("calling logout api via web socket");
        this.stompClient.send("/app/synchronize/recepdash", {}, JSON.stringify(message));
    }

    _send_To_Del(message: any) {
      console.log("calling logout api via web socket");
      this.stompClient.send("/app/synchronize/deliverydash", {}, JSON.stringify(message));
    }

    _send_To_CurrentOrderUser(message: any) {
    console.log("calling logout api via web socket");
    this.stompClient.send("/app/synchronize/userCurrentOrder", {}, message);
    }

    onMessageReceived(message: {body:any}) {
        console.log("Message Recieved from Server :: " + message);
        AppComponent.handleMessage(JSON.stringify(message.body));
    }

    onMessageReceived2(message: {body:any}) {
        console.log("Message Recieved from Server :: " + message);
        PaymentComponent.handleMessage(JSON.stringify(message.body));
    }

  /* onMessageReceived3(message: {body:any}) {
        console.log("Message Recieved from Server :: " + message);
       let recepDashboard = new ReceptionDashboardComponent(this.orderService,this.alertService);
       recepDashboard.handleMessage(JSON.stringify(message.body));
    }*/

    getMessages() {
        const observable = new Observable(observer => {
          this.stompClient.subscribe('/topic/receptionDashboard', (message: any) => {
            console.log("console.log(message); ",message);
            observer.next(message);
            
          });
        });

        console.log("observable :",observable)
    }
}
