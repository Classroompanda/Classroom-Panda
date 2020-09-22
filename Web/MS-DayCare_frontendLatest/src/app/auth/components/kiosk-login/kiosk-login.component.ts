import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from '../../../shared/services/notification-service/notification.service';
import { AuthApiService } from '../../shared/services/auth-api-service/auth-api.service';
import { AuthAPIURls } from '../../shared/constant';
import { ErrorHandlerService } from '../../../shared/services/error-handler/error-handler.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from '../../../shared/services/common/common.service';
import { ReplaySubject } from 'rxjs';


@Component({
  selector: 'app-kiosk-login',
  templateUrl: './kiosk-login.component.html',
  styleUrls: ['./kiosk-login.component.css']
})
export class KioskLoginComponent implements OnInit {

  loginForm: FormGroup;
  showEmail = true;
  invalidEmail: boolean;
  invalidPassword: boolean;
  code = '';
  emailPattern = /^([\w-\.]+\u0040([\w-]+\.)+[\w-]{2,4})?$/;
  otp: string;
  showOtpComponent = true;
  showAgencyField: boolean;
  @ViewChild('ngOtpInput') ngOtpInputRef: any;
  config = {
    allowNumbersOnly: true,
    length: 4,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      'width': '50px',
      'height': '50px',
    },
    containerStyles: {
      'margin-left': '0px'
    },
    containerClass: false
  };

  constructor(private fb: FormBuilder, private router: Router,
    private toaster: NotificationService, private apiService: AuthApiService, private error: ErrorHandlerService,
    private spinner: NgxSpinnerService, private notification: NotificationService, private commonService: CommonService) {

  }

  ngOnInit() {
    if (this.commonService.getIsAgencyFieldActive() === 'true') {
      this.showAgencyField = true;
    } else {
      this.showAgencyField = false;
    }
  }

  onOtpChange(otp) {
    this.otp = otp;
    if (this.otp.length === 4) {
      this.doLogin();
    }
  }

  setVal() {
    this.ngOtpInputRef.setValue('');
  }

  onConfigChange() {
    this.showOtpComponent = false;
    this.otp = null;
    setTimeout(() => {
      this.showOtpComponent = true;
    }, 0);
  }


  doLogin() {
    if (!localStorage.getItem('agencyID')) {
      this.setVal();
      this.notification.warning({ message: 'Agency is not login', title: 'Oops!' });
    } else {
    this.spinner.show();
    const data = {
      'quickPin': this.otp,
      'agencyID': localStorage.getItem('agencyID'),
      'BusinessToken': localStorage.getItem('fcmtkn')
    };
    this.apiService.postData(AuthAPIURls.loginforKioskWeb, data, null).subscribe(res => {
      this.spinner.hide();
      if (res.body) {
        if (res.body.access_token) {
          localStorage.setItem('teacherTodayAttendenceId', res.body.data.teacherTodayAttendenceId);
          this.commonService.setUserDetails('userdetails', res.body);
          this.commonService.isSubscriptionActive = res.body.data.isSubscriptionActive;
          this.loginSuccess(res.body.data);
        } else {
          this.setVal();
          this.notification.warning({ message: res.body.message, title: 'Oops!' });
        }
      } else {
        this.spinner.hide();
        this.setVal();
        this.error.unknownError();
      }
    }, err => {
      this.spinner.hide();
      this.setVal();
      this.error.commonError(err);
    });
  }
  }


  loginSuccess(data) {
    localStorage.setItem('imagepath', data.imagePath);
    // localStorage.setItem('agencyID', data.agencyID);
    localStorage.setItem('iskiosklogin', 'true');
    if (data.roleId === 4) {
      localStorage.setItem('isauthenticated', 'true');
      localStorage.setItem('path', '/home/parentdashboard/kiosk');
      this.router.navigate(['/home/parentdashboard/kiosk']);
      this.toaster.success({ message: '', title: 'Welcome' });
    } else {

    }

  }

  agencyLogin() {
    if (this.code === '') {
      this.notification.warning({ message: 'Please enter Agency ID', title: '' });
      this.setVal();
    } else {
      this.spinner.show();
      const data = {
        'quickPin': this.code,
      };
      this.apiService.postData(AuthAPIURls.AgencyLoginForKiosk, data, null).subscribe(res => {
        this.spinner.hide();
        if (res.body) {
          if (res.body.statusCode === 200) {
            localStorage.setItem('agencyID', res.body.agencyId);
            localStorage.setItem('agencyLogin', 'true');
            this.showAgencyField = true;
            this.setVal();
            this.notification.success({ message: 'Login successfully', title: '' });
          } else {
            this.setVal();
            this.notification.warning({ message: 'Agency credentials are wrong', title: 'Oops!' });
          }
        } else {
          this.spinner.hide();
          this.error.unknownError();
        }
      }, err => {
        this.setVal();
        this.spinner.hide();
        this.error.commonError(err);
      });
    }

  }
}
