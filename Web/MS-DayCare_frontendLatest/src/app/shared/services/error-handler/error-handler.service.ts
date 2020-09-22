import { Injectable } from '@angular/core';
import { NotificationService } from '../notification-service/notification.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private toster: NotificationService) { }

  unknownError() {
    this.toster.error({message: 'Something Went Wrong, please try again', title: ''});
  }

  commonSucess(msg) {
    this.toster.success({message: msg, title: ''});
  }
  commonError(error) {
    if (error.statusText === 'Unknown Error') {
      this.unknownError();
    } else if (error.statusText === !undefined) {
    this.toster.error({message: error.statusText, title: error.status});
    } else {
      this.unknownError();
    }
  }
}
