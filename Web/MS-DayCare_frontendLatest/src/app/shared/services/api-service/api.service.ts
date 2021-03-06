import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpParams, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs/Observable';
// import { ErrorHandlerService } from '../error-handler/error-handler.service';
import { ApiParams } from '.././view-models/api-params';
// import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

   // common get method for all http requests

   getData(url: string, reqAPIParams: ApiParams[] | null) {
    let newHTTPParams = new HttpParams();
    if (reqAPIParams != null) {
      reqAPIParams.forEach(element => {
        newHTTPParams = newHTTPParams.append(element.Key, element.Value);
      });
    }
    return this.http.get<any>(this.getUrl(url), { params: newHTTPParams, observe: 'response' });
  }

  // common post method for all http requests

  postData<T>(url: string, data: {}, reqAPIParams: ApiParams[]) {
    let newHTTPParams = new HttpParams();
    if (reqAPIParams != null) {
      reqAPIParams.forEach(element => {
        newHTTPParams = newHTTPParams.append(element.Key, element.Value);
      });
    }
    return this.http.post<any>(this.getUrl(url), data, { params: newHTTPParams, observe: 'response' });
  }

  postDataV2<T>(url: string, data: {}, reqAPIParams: ApiParams[]) {
    let newHTTPParams = new HttpParams();
    if (reqAPIParams != null) {
      reqAPIParams.forEach(element => {
        newHTTPParams = newHTTPParams.append(element.Key, element.Value);
      });
    }
    return this.http.post<any>(this.getUrl(url), data, { params: newHTTPParams, headers: {'api-version': '2.0'}, observe: 'response' });
  }


  // attach base url
  private getUrl(url: string): string {
    return environment.baseUrl + url;
  }

  //  getToken(): string {
  // //   const token = this.cookie.get('token') ? this.cookie.get('token') : null;
  // //   return token;
  //  }


  deleteData<T>(url: string, reqAPIParams: ApiParams[]) {
    let newHTTPParams = new HttpParams();
    if (reqAPIParams != null) {
      reqAPIParams.forEach(element => {
        newHTTPParams = newHTTPParams.append(element.Key, element.Value);
      });
    }
    return this.http.delete<any>(this.getUrl(url), { params: newHTTPParams, observe: 'response' });
  }
}


