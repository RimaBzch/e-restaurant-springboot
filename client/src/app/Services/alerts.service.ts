import { Injectable } from '@angular/core';
import { SnotifyPosition, SnotifyService, SnotifyToastConfig } from 'ng-snotify';
import { Subscription } from 'rxjs'
import { Router, ActivatedRoute, ParamMap, NavigationStart } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AlertsService {
//for the alert   
style = 'material';
title = 'Snotify title!';
body = 'Lorem ipsum dolor sit amet!';
timeout = 3000;
position: SnotifyPosition = SnotifyPosition.centerCenter;
progressBar = true;
closeClick = true;
newTop = true;
filterDuplicates = false;
backdrop = -1;
dockMax = 8;
blockMax = 6;
pauseHover = true;
titleMaxLength = 15;
bodyMaxLength = 80;
//.............//
  //.............//
  subscription: Subscription = new Subscription;
   
  constructor(public snotify:SnotifyService,private Router:Router) { }


  success(msg:any,title:any)
  {
    this.snotify.success(msg,title, this.getConfig());
  }

  warning(msg:any,title:any)
  {
    this.snotify.warning(msg,title, this.getConfig());
  }

  error(msg:any,title:any){
    this.snotify.error(msg,title, this.getConfig());
  }


  

  clear()
  {
    this.snotify.clear()
  }

  getConfig(): SnotifyToastConfig {
    this.snotify.setDefaults({
      global: {
        newOnTop: this.newTop,
        maxAtPosition: this.blockMax,
        maxOnScreen: this.dockMax,
        // @ts-ignore
        filterDuplicates: this.filterDuplicates
      }
    });
    return {
      bodyMaxLength: this.bodyMaxLength,
      titleMaxLength: this.titleMaxLength,
      backdrop: this.backdrop,
      position: this.position,
      timeout: this.timeout,
      showProgressBar: this.progressBar,
      closeOnClick: this.closeClick,
      pauseOnHover: this.pauseHover
    };
  }
  
}
