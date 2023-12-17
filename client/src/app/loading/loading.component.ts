import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import {SharedService} from '../Services/shared.service';
import {OrderService} from '../Services/order.service'
import { Order } from '../common/Order';
import {UserService} from '../Services/user.service';
@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {
   message:any = 'Something delicious is been cooking ...'
  interval!: any;
  constructor(
            public dialogRef: MatDialogRef<LoadingComponent>,
            private matDialog: MatDialog,
            private SharedService:SharedService,
            private OrderService:OrderService ,
            private UserService:UserService
            )
          { }

  idOrder:any=''
  order!: Order;
  prepared:any=false
  delivered:any=false

  ngOnInit(): void {
   
  }

  ngAfterViewInit() {
    this.idOrder = this.SharedService.getIdOrder();
    this.idOrder= localStorage.getItem("!!!")
    console.log("this.idOrder",this.idOrder)
    this.interval = setInterval(() => {
      this.getOrderById(this.idOrder)
    
    if(this.order.prepared==true)
    {
      this.message="your order is on the way to your house , be prepared for it!"
    }

    if(this.order.delivered==true)
    {
      
      this.UserService.getUser(this.order.idDelivery).subscribe(
        (data:{status:any,message:any,object:any})=> {
          console.log(data)
          if(data.status=="OK")
          {
            this.message="Your order should be recieved!"+ "if any doubt please contact the delivery : "+data.object.tel
          }
          if(data.status=="KO")
          {
            this.message="SOMETHING WENT WRONG PLEASE CONTACT THE RESTO-IT-DEPARTMENT"
          }
        }
      )
     
      clearInterval(this.interval)
    }
  },10000)

  



  }

  closeModal() {
    clearInterval(this.interval)
    this.dialogRef.close();
  }

  getOrderById(idOrder:any)
  {
    this.OrderService.getOrderByID(idOrder).subscribe(
      (data:{status:any,message:any,object:any})=>{
        console.log("data order:",data)
        if(data.status=="OK")
        {
          this.order=data.object
        }

        if(data.status=="KO")
        {
        }
      })
  }

}
