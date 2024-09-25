import {bootstrapApplication} from '@angular/platform-browser';

import {AppComponent} from './app/app.component';
import {HttpEventType, HttpHandlerFn, HttpRequest, provideHttpClient, withInterceptors} from "@angular/common/http";
import {tap} from "rxjs";


function loggingInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  console.log(req.url);
  return next(req);
}

function responseInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  return next(req).pipe(
    tap((event) => {
      if (event.type == HttpEventType.Response) {
        console.log(event.body);
        console.log(event.status);
      }
    })
  );
}


bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([loggingInterceptor, responseInterceptor]))
  ]
}).catch((err) => console.error(err));
