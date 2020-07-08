import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) {
    this.toastr.toastrConfig.closeButton = true;
    this.toastr.toastrConfig.tapToDismiss = true;
    this.toastr.toastrConfig.autoDismiss = true;
  }

  success(body: { message?: string, title?: string }) {
    return this.toastr.success(body.message, body.title, {
    });
  }

  error(body: { message?: string, title?: string }) {
    return this.toastr.error(body.message, body.title);
  }

  warning(body: { message?: string, title?: string }) {
    return this.toastr.warning(body.message, body.title);
  }

  info(body: { message?: string, title?: string }) {
    return this.toastr.info(body.message, body.title);
  }

  pushNotify(body: { message?: string, title?: string }) {
    if (body.title.includes('Alert') ) {
      return this.toastr.info(body.message, body.title,  {disableTimeOut: true });
    } else {
      return this.toastr.info(body.message, body.title,  {disableTimeOut: false});
    }
  }

  closeAllToaster() {
    this.toastr.clear();
  }

}
