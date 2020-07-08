import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from '../../../shared/services/notification-service/notification.service';
import { ErrorHandlerService } from '../../../shared/services/error-handler/error-handler.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthAPIURls } from '../../shared/constant';
import { AuthApiService } from '../../shared/services/auth-api-service/auth-api.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  invalidEmail = false;
  forgotPassword: FormGroup;
  email = '';
  showMessage: boolean;
  msg = '';
  emailPattern = /^([\w-\.]+\u0040([\w-]+\.)+[\w-]{2,4})?$/;
  showSuccessMsg = false;
  constructor( private router: Router, private route: ActivatedRoute,
    private notificationService: NotificationService, private error: ErrorHandlerService, private apiService: AuthApiService,
  private spinner: NgxSpinnerService) {

  }

  ngOnInit() {
    this.showMessage = false;
    // this.route.params.subscribe(res => {
    //   this.email = res['email'];
    // });
    this.forgotPassword = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.pattern(this.emailPattern), Validators.maxLength(100)])
    });
  }

  forgetPassword() {
    this.spinner.show();
    const data = {
      'requestedEmail': this.forgotPassword.value.email
    };
    this.apiService.postData(AuthAPIURls.ForgotPassword, data, null).subscribe(res => {
      if (res.body.statusCode === 200) {

        if (res.body.statusCode === 200) {
          this.spinner.hide();
          this.showMessage = true;
         // this.notificationService.warning({message: 'The email you have entered does not exist', title: ''});
        } else {
          this.showMessage = false;
          this.spinner.hide();
        }

      } else if (res.body.statusCode === 989) {
        this.spinner.hide();
        this.notificationService.warning({message: 'The email you have entered does not exist', title: ''});
      } else {
        this.spinner.hide();
        this.error.unknownError();
      }
    }, err => {
      this.spinner.hide();
      this.error.commonError(err);
    });
  }

}



