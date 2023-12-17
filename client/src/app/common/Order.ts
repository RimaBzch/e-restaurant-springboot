import { NamedTupleMember } from "typescript";

export class Order {

      id!:string;
	
	  idUser!:string;
	  order!:string;
	  amount!:number ;
	  payed!:boolean;
	  delivered!:boolean;
       prepared!:boolean;
	  idDelivery!:string;
	  dateDeliviery!:Date;
	  dateReqOrder!:Date;
       lat!:number;
       lon!:number

    constructor(id:string,	
                idUser:string,
                order:string,
                amount:number ,
                payed:boolean,
                delivered:boolean,            
                idDelivery:string,
                dateDeliviery:Date,
                dateReqOrder:Date,
                prepared:boolean,
                lat:number,
                lon:number
                )
                {
                this.id=id;	
                this.idUser=idUser;
                this.order=order;
                this.amount=amount; 
                this.payed=payed;
                this.delivered=delivered;
                this.idDelivery=idDelivery;
                this.dateDeliviery=dateDeliviery;
                this.dateReqOrder=dateReqOrder;
                this.prepared=prepared;
                this.lat=lat
                this.lon=lon
                }

       setIdUser(idUser:string)
       {
            this.idUser=idUser;
       }         
}