import { Injectable } from '@angular/core';
import { ApiService } from './api-service/api.service';

@Injectable({
  providedIn: 'root'
})
export class LayoutApiService {

  constructor(private apiService: ApiService) { }

  /**API to get projects by  user email  */

  getData(url, data) {
    return this.apiService.getData(url, data);
  }

  postData(url, data, params) {
    return this.apiService.postData(url, data, params);
  }

  deleteData(url, params) {
    return this.apiService.deleteData(url, params);
  }
}
