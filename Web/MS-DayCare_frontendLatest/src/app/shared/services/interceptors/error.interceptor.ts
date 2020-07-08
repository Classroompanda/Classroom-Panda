import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';



@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor() {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const currentUser = JSON.parse(localStorage.getItem('userdetails'));
        if (currentUser && currentUser.access_token) {
            request = request.clone({
                setHeaders: {
                     Authorization: `Bearer ${currentUser.access_token}`
                }
            });
        }
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                localStorage.removeItem('isauthenticated');
                localStorage.removeItem('usertype');
                localStorage.removeItem('path');
                localStorage.removeItem('userdetails');
                localStorage.removeItem('imagepath');
                location.reload(true);
            }
            const error = err.error.message || err.statusText;
            return throwError(error);
        }));
    }
}
