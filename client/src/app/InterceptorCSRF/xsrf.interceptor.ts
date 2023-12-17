import { Inject, Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpXsrfTokenExtractor } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class HttpXSRFInterceptor implements HttpInterceptor {

  constructor(private tokenExtractor: HttpXsrfTokenExtractor) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
/*
     if(req.method == 'POST')
     { 
          const headerName = 'XSRF-TOKEN';
          const respHeaderName = 'X-XSRF-TOKEN';
          let token = this.tokenExtractor.getToken() as string;
          console.log('token:', token);
          console.log("req",req);
          if (token !== null && !req.headers.has(respHeaderName)) {      
            req = req.clone({ headers: req.headers.set(respHeaderName, token) });
          }  
          return next.handle(req);
     }
     else
     {
      return next.handle(req);
     }*/
     const headerName = 'XSRF-TOKEN';
     const respHeaderName = 'X-XSRF-TOKEN';
     const lcUrl = req.url.toLowerCase();
    // Skip both non-mutating requests and absolute URLs.
    // Non-mutating requests don't require a token, and absolute URLs require special handling
    // anyway as the cookie set
    // on our origin is not the same as the token expected by another origin.
    /*if (req.method === 'GET' || req.method === 'HEAD' || lcUrl.startsWith('http://') ||
        lcUrl.startsWith('https://')) {
      return next.handle(req);
    }*/
    const token = this.tokenExtractor.getToken();
   console.log(token);
    // Be careful not to overwrite an existing header of the same name.
    if (token !== null ) { //&& !req.headers.has(headerName)) {
      req = req.clone({headers: req.headers.set(respHeaderName, token)});
    }
    return next.handle(req);
  }



}