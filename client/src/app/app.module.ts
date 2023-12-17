import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SignupComponent } from './signup/signup.component';
import { ProductsComponent } from './products/products.component';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';


import { HttpClientModule ,HttpClientXsrfModule, HttpXsrfTokenExtractor, HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpXSRFInterceptor } from './InterceptorCSRF/xsrf.interceptor';
import { DashbordUserComponent } from './dashbord-user/dashbord-user.component';
import { DashboardAdminComponent } from './admin/dashboard-admin/dashboard-admin.component';
import { AddProductComponent } from './admin/add-product/add-product.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatSliderModule } from '@angular/material/slider';
import { MatSidenavModule } from '@angular/material/sidenav';

import { MatToolbarModule} from '@angular/material/toolbar';

import { MatButtonModule} from '@angular/material/button';

import { MatIconModule} from '@angular/material/icon';

import { MatDividerModule} from '@angular/material/divider';

import { MatListModule} from '@angular/material/list';

import { MatTableModule } from '@angular/material/table'  

import { MatBadgeModule } from '@angular/material/badge';
import {MatCardModule} from '@angular/material/card'
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { SideBarAdminComponent } from './side-bar-admin/side-bar-admin.component';

import { FormControl, Validators  } from '@angular/forms';
import { NgForm } from "@angular/forms";
import { NgxMatErrorsModule} from 'ngx-mat-errors';
import { MatFormFieldModule} from '@angular/material/form-field';
import { AddCategorieComponent } from './admin/add-categorie/add-categorie.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { UpdateCategorieComponent } from './admin/update-categorie/update-categorie.component'; 
import { DeleteCategorieComponent } from './admin/delete-categorie/delete-categorie.component'; 
import { MatDialog, MatDialogConfig, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {SharedService} from './Services/shared.service';
import { ModalCardComponent } from './modal-card/modal-card.component';
import { PaymentComponent } from './payment/payment.component'
import {AlertsService} from './Services/alerts.service';
import { ProductCRUDComponent } from './product-crud/product-crud.component';
import { SignupModalComponent } from './signup-modal/signup-modal.component';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { LoadingComponent } from './loading/loading.component';
import { DeliveryDashboradComponent } from './delivery-dashborad/delivery-dashborad.component';
import { ConfirmAdressComponent } from './confirm-adress/confirm-adress.component';
import { RegisterDRComponent } from './register-dr/register-dr.component';
import { MatSelectModule} from '@angular/material/select';
import { MatPaginatorModule} from '@angular/material/paginator'
import { ReceptionDashboardComponent } from './reception-dashboard/reception-dashboard.component';
import { MapModalComponent } from './map-modal/map-modal.component';

//import { GeoapifyGeocoderAutocompleteModule } from '@geoapify/angular-geocoder-autocomplete';
import { AuthServiceService } from './Services/auth-service.service';
import { UserService } from './Services/user.service';
import { ProductServiceService } from './Services/product-service.service';
import { OrderService } from './Services/order.service';
import { WebSocketAPIService } from './Services/web-socket-api.service';
import { DeliveryAssignedMeComponent } from './delivery-assigned-me/delivery-assigned-me.component'
import { DeliveryAssignedDeliveredMeComponent } from './delivery-assigned-delivered-me/delivery-assigned-delivered-me.component';
import { UserOrdersHistoryComponent } from './user-orders-history/user-orders-history.component';
import { UserCurrentOrderStatusComponent } from './user-current-order-status/user-current-order-status.component';
import { AnalyticsComponent } from './analytics/analytics.component';

import * as CanvasJSAngularChart from '../assets/canvasjs.angular.component';
var CanvasJSChart = CanvasJSAngularChart.CanvasJSChart;
  const routes: Routes = [
    {path:'login',component: LoginComponent},
    {path:'signup',component: SignupComponent},
    {path:'userDashboard',component: DashbordUserComponent},
    {path:'adminDashboard',component: DashboardAdminComponent},
    {path:'addProduct',component: AddProductComponent},
    {path:'addCategorie',component: AddCategorieComponent},
    {path:'updateCategorie',component: UpdateCategorieComponent},
    {path:'deleteCategorie',component: DeleteCategorieComponent},
    {path:'productsByCategorie/:id',component: ProductsComponent},
    {path:'productsByCategorieAdm/:id',component: ProductCRUDComponent},
    {path:'updateProduct',component: DashboardAdminComponent},
    {path:'deleteProduct',component: DashboardAdminComponent},
    {path:'deliveryDashboard', component: DeliveryDashboradComponent},
    {path:'users', component: RegisterDRComponent},
    {path:'receptionDashboard', component: ReceptionDashboardComponent},
 
    {path:'order/assigned/:id', component: DeliveryAssignedMeComponent},
    {path:'order/assigned/delivered/:id', component: DeliveryAssignedDeliveredMeComponent},
    {path:'userDashboard/orders/:id', component: UserOrdersHistoryComponent},
    {path:'userDashboard/current/orders/:id', component: UserCurrentOrderStatusComponent},
    {path:'adminDashboard/analytics', component: AnalyticsComponent},
    {path:'**',component: DashbordUserComponent}
  ];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    SignupComponent,
    DashbordUserComponent,
    DashboardAdminComponent,
    AddProductComponent,
    SideBarAdminComponent,
    AddCategorieComponent,
    UpdateCategorieComponent,
    DeleteCategorieComponent,
    ProductsComponent,
    ModalCardComponent,
    PaymentComponent,
    ProductCRUDComponent,
    SignupModalComponent,
    LoginModalComponent,
    LoadingComponent,
    DeliveryDashboradComponent,
    ConfirmAdressComponent,
    RegisterDRComponent,
    ReceptionDashboardComponent,
    MapModalComponent,
    DeliveryAssignedMeComponent    ,
    DeliveryAssignedDeliveredMeComponent,
    UserOrdersHistoryComponent,
    UserCurrentOrderStatusComponent,
    AnalyticsComponent,
    CanvasJSChart
  ],
  imports: [
    BrowserModule,    
    AppRoutingModule,
    RouterModule.forRoot(routes),
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-XSRF-TOKEN'
    }),
    SnotifyModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatTableModule,
    FormsModule,
    MatBadgeModule,
    NgxMatErrorsModule,
    MatFormFieldModule,
    NgxPaginationModule,   
    MatDialogModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatPaginatorModule
 // GeoapifyGeocoderAutocompleteModule.withConfig('c82fe131fa3742db8b1aca6bb02f8cf2')
  ],
  providers: [
  { provide: HTTP_INTERCEPTORS, useClass: HttpXSRFInterceptor, multi: true },
//{ provide: HttpXsrfTokenExtractor, useClass: HttpXsrfCookieExtractor }
  { provide: 'SnotifyToastConfig', 
   useValue: ToastDefaults},
  SnotifyService,
  SharedService,
  OrderService,
  ProductServiceService,
  UserService,
  AuthServiceService,
  AlertsService,
  WebSocketAPIService,
  
  ],
  bootstrap: [AppComponent],
  entryComponents: [ModalCardComponent]
})
export class AppModule { }
