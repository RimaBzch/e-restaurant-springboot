import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType, HttpParams } from '@angular/common/http';
import { FormControl, Validators } from '@angular/forms';
import { NgForm } from "@angular/forms";

import {ProductServiceService} from "../../Services/product-service.service"
import { Categorie } from '../../common/Categorie';
@Component({
  selector: 'app-add-categorie',
  templateUrl: './add-categorie.component.html',
  styleUrls: ['./add-categorie.component.css']
})
export class AddCategorieComponent implements OnInit {

  constructor(private httpClient: HttpClient,private productService: ProductServiceService) { }
  name:any
  nameFormControl = new FormControl("", [
    Validators.required,
    Validators.email
  ]);

  ngOnInit(): void {
   
  }

  cat :Categorie = new Categorie("");
  save()
  {
    console.log("json.stringfy()",this.nameFormControl.value)

    this.productService.saveCategorie(this.nameFormControl.value).subscribe( (res:any) => 
    console.log("response save req :",res)
    )
  }

}
