import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType, HttpParams } from '@angular/common/http';
import { FormControl, Validators } from '@angular/forms';
import { NgForm } from "@angular/forms";

import {ProductServiceService} from "../../Services/product-service.service"
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
 
  constructor(private httpClient: HttpClient,private productService: ProductServiceService) { }

  selectedFile!: File;

  retrievedImage: any;

  base64Data: any;
  retrieveResonse: any;

  message!: string;

  imageName: any;

  name:string= " "
  composition:string = " "
  price:string = " "
  categories:any
  nameFormControl = new FormControl("", [
    Validators.required,
    Validators.email
  ]);
  categorieFormControl  = new FormControl("", [
    Validators.required
  ]);

  compositionFormControl = new FormControl("", [
    Validators.required,
    Validators.minLength(4)
  ]);

  priceFormControl = new FormControl("", [
    Validators.required,
    Validators.pattern('[0-9]*,[0-9]^2')
  ]);


  

  ngOnInit(): void {
    this.productService.getCategories().subscribe( (res:any) => 
     { 
      console.log("categories :",res)
      this.categories = res;  
     },
     ( err: { message: string; }) => {
      console.log(err);
    // this.snotify.warning(err, 'Warning', this.snotifyConfig);
  
    // this.profile.showWarning(err,'Warning')
    }
   )
   console.log("categories :", this.categories)
  }

  public onFileChanged(event : any) {
    //Select File    
    this.selectedFile = event.target.files[0];    
  }
    
    
  //Gets called when the user clicks on submit to upload the image
  private baseUrl ="http://localhost:8082/product"
  save() {

    console.log(this.selectedFile);
    
    let data = {
      name : this.nameFormControl.value,
      composition : this.compositionFormControl.value,
      price : this.priceFormControl.value  ,
      categorie:this.categorieFormControl.value
    }
    console.log("user", data);
    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.

    const reqData = new FormData();

   // reqData.append('food', /*new Blob([*/JSON.stringify(data)/*], { type: 'application/json' })*/);
    reqData.append('file', this.selectedFile , 'file');
    

    console.log("uploadImageData :",reqData)

   //Make a call to the Spring Boot Application to save the image
   /*let reqToSend = {
      name : this.nameFormControl.value,
      composition : this.compositionFormControl.value,
      price : this.priceFormControl.value,
      image : reqData.get('image')
    }*/

   console.log("before sending : ",reqData)
   let params1 = new HttpParams().set("data", JSON.stringify(data));

    this.httpClient.post<any>(`${this.baseUrl}/upload`  ,  reqData ,
                                { 
                                  /* headers :{
                                  'Content-Type' : 'multipart/form-data'
                                  //   'Access-Control-Allow-Origin' : '*'    
                                  },*/

                                    params: params1,                             
                                    withCredentials : true
                                }
                             )
      .subscribe((response : any) => {
        console.log("responce :",response)
        if (response.status === 200) {
          this.message = 'Image uploaded successfully';
        } 
        else {
          this.message = 'Image not uploaded successfully';
        }
       }
      );
    }
    
    
        //Gets called when the user clicks on retieve image button to get the image from back end
    
  submit() {

    //Make a call to Sprinf Boot to get the Image Bytes.

    this.httpClient.get(this.baseUrl+'/get/' + this.imageName)

      .subscribe(

        res => {

          this.retrieveResonse = res;

          this.base64Data = this.retrieveResonse.picByte;

          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;

        }

      );

  }
}
