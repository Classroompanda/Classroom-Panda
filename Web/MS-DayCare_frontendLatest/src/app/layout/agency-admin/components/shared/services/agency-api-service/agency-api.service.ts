import { Injectable } from '@angular/core';
import { ApiService } from '../../../../../../shared/services/api-service/api.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AgencyApiService {

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

    postDataV2(url, data, params) {
      return this.apiService.postDataV2(url, data, params);
    }



}
