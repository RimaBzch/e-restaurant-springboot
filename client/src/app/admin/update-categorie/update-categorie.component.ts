import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import {ProductServiceService} from "../../Services/product-service.service"

export interface PeriodicElement {
  
  id: string;
  name: string;

}



/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'app-update-categorie',
  templateUrl: './update-categorie.component.html',
  styleUrls: ['./update-categorie.component.css']
})
export class UpdateCategorieComponent implements OnInit {
  displayedColumns: string[] = [ 'name' , 'id'];
  ELEMENT_DATA: PeriodicElement[]= [{id:"",name:""}];
  dataSource = this.ELEMENT_DATA;
  name: any
  nameFormControl = new FormControl("", [
    Validators.required
  ]);
  constructor(private productService:ProductServiceService) { }

  ngOnInit(): void {
      this.productService.getCategories().subscribe( (res:any) => 
      { 
      console.log("categories :",res)
      this.ELEMENT_DATA = res;
      this.dataSource=this.ELEMENT_DATA
      },
      ( err: { message: string; }) => {
      console.log(err);
    // this.snotify.warning(err, 'Warning', this.snotifyConfig);
  
    // this.profile.showWarning(err,'Warning')
    }
    )
   
  }

  updateCateg(element:any)
  {
     console.log("element :",element)
     let data= {
        id: element,
        name:this.name
     }
     this.productService.updateCategorie(data).subscribe((res:any)=>{
       console.log("update responce API :"+res);
     }

     )
  }

  getNewValue(event:any)
  {
    console.log("event :",event.target.value)
    this.name = event.target.value
  }
}
