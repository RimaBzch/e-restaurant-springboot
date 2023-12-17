export class Payment {

    token!: string;
    amount!: number;
    constructor(amount:number,token:string)
    {
this.token=token;
this.amount=amount;
    }
}