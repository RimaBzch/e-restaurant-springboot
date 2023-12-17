import { Injectable } from '@angular/core';
import { Order } from '../common/Order';
import { User } from '../common/User';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  private idOrder:string='';
  private vijayCart: Array<any> = [];
  private cardNotifNumber:any=0;
  private totalToPay:number=0;

  private connected:boolean=false;
  private role:string='';

  private user:any='';
  private pswd:any=''
  private userId:any=''
  private userIdDel:any=''
  private order:Order= new Order('','','',0,false,false,'', new Date(0),new Date(0),false,0,0);
  private address:string = ""

  private userDel!: User;

  setUserDel(user:User)
  {
    this.userDel=user
  }

  getUserDel()
  {
    return this.userDel
  }

  setUserIdDel(userIdDel:any)
  {
    this.userIdDel=userIdDel
  }

  getUserIdDel()
  {
    return this.userIdDel
  }

  setAddress(address:string)
  {
    this.address=address;
  }

  getAddress()
  {
    return this.address;
  }
  
  setIdOrder(id:string)
  {
    this.idOrder=id;
  }

  getIdOrder()
  {
    return this.idOrder;
  }

  SetOrder(order:Order)
  {
    this.order=order;
  }

  GetOrder()
  {
    return this.order;
  }

  SetUserId(userId:any)
  {
    this.userId=userId;
  }

  GetUserId()
  {
    return this.userId;
  }

  SetUser(user:any)
  {
    this.user=user;
  }

  GetUser()
  {
    return this.user;
  }

  SetPswd(p:any)
  {
    this.pswd=p;
  }

  GetPswd()
  {
    return this.pswd;
  }

  SetRole(role:any)
  {
    this.role=role;
  }

  GetRole()
  {
    return this.role;
  }

  SetConnected(con:boolean)
  {
    this.connected = con;
  }

  GetConnected()
  {
    return this.connected;
  }

  SetTotalAmountToPay(amount:any)
  {
      this.totalToPay = amount;
  }
   
  GetTotalAmountToPay():number
  {
      return this.totalToPay;
  }

  GetCart() {
      return this.vijayCart;
  }
  
  SetCart(item:any) {
      this.vijayCart.push(item);
  }

  GetCardNotifNumber()
  {
     return this.cardNotifNumber;
  }

  setCardNotifNumber(num:any)
  {
     this.cardNotifNumber=num;
  }

  incrementNotif(num:any)
  {
    this.cardNotifNumber=this.cardNotifNumber+num;
  }

  decrementNotif()
  {
    this.cardNotifNumber = this.cardNotifNumber-1;
  }

  
}
