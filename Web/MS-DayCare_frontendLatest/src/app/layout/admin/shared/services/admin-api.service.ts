import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ApiService } from '../../../../shared/services/api-service/api.service';


@Injectable({
  providedIn: 'root'
})
export class AdminApiService {
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
  uploadImage(url, data, params) {

      const headers = new HttpHeaders();
      params = headers.set('Content-Type', 'multipart/form-data');
      return this.apiService.postData(url, data, params);
    }
}
