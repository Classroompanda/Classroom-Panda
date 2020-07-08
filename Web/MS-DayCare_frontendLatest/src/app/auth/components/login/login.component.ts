import { Component, OnInit } from '@angular/core';
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
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  showEmail = true;
  invalidEmail: boolean;
  invalidPassword: boolean;
  emailPattern = /^([\w-\.]+\u0040([\w-]+\.)+[\w-]{2,4})?$/;

  constructor(private fb: FormBuilder, private router: Router,
     private toaster: NotificationService, private apiService: AuthApiService, private error: ErrorHandlerService,
     private spinner: NgxSpinnerService, private notification: NotificationService, private commonService: CommonService) {

  }

  ngOnInit() {
    this.commonService.incidentData = new ReplaySubject<Array<Object>>();
    this.commonService.userProfileData = new ReplaySubject<Array<Object>>();
    this.commonService.fullNameObj = new ReplaySubject();
    this.invalidEmail = false;
    this.invalidPassword = false;
    this.loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.pattern(this.emailPattern), Validators.maxLength(100)]],
        password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // get email() { return this.loginForm.get('email'); }
  // get password() { return this.loginForm.get('password'); }


  doLogin(event) {
    if ((event.keyCode === 13 || event.type === 'click') && this.loginForm.valid) {
      this.spinner.show();
      const data = {
        'emailAddress': this.loginForm.value.email,
        'password': this.loginForm.value.password,
        'OSType': 3,
        'BusinessToken': localStorage.getItem('fcmtkn')
      };
      this.apiService.postData(AuthAPIURls.login, data, null).subscribe(res => {
        this.spinner.hide();
        if (res.body) {
          if (res.body.access_token) {
              //  this.commonService.saveLoginUserDetails(res.body.data); // this method is alternate for local storage
            if (res.body.data.roleId === 3 && res.body.data.teacherTodayAttendenceStatusId === 2
              && res.body.data.isSubscriptionActive === true) {
              this.notification.warning({message: 'You are clocked out for today', title: ''});
            } else if (res.body.data.roleId === 3 && res.body.data.isSubscriptionActive === false) {
                this.notification.warning({message: 'Please contact to agency admin ', title: 'Subscription expired!'});
            } else if (res.body.data.roleId === 2 && res.body.data.isApprovedAgency === false) {
              this.notification.warning({message: 'This account is not approved ', title: 'Contact to admin!'});
            } else {
              localStorage.setItem('teacherTodayAttendenceId', res.body.data.teacherTodayAttendenceId);
              this.commonService.isSubscriptionActive =  res.body.data.isSubscriptionActive;
              this.commonService.setUserDetails('userdetails', res.body);
              this.loginSuccess(res.body.data);
            }
          } else {
            this.loginForm.reset();
            // tslint:disable-next-line: comment-format
            //this.notification.error({message: 'Invalid email address or password', title: 'Oops!'});
            this.notification.warning({message: res.body.message, title: 'Oops!'});
          }
        } else {
          this.spinner.hide();
          this.loginForm.reset();
          this.error.unknownError();
        }
      }, err => {
        this.spinner.hide();
        this.loginForm.reset();
        this.error.commonError(err);
      });
    }

  }

  loginSuccess(data) {
    localStorage.setItem('imagepath', data.imagePath) ;
    localStorage.setItem('iskiosklogin', 'false');
    if (data.roleId === 1) {
     // localStorage.setItem('isauthenticated', 'true');
      localStorage.setItem('path', '/home/superadmin');
    //  localStorage.setItem('usertype', '1');
      this.router.navigate(['/home/superadmin']);
      this.toaster.success({message: '', title: 'Welcome'});
    } else if (data.roleId === 2) {
    //  localStorage.setItem('isauthenticated', 'true');
      localStorage.setItem('path', '/home/agencydashboard');
    //  localStorage.setItem('usertype', '2');
      this.router.navigate(['/home/agencydashboard']);
      this.toaster.success({message: '', title: 'Welcome'});
    } else if (data.roleId === 3) {
      // tslint:disable-next-line:max-line-length
      localStorage.setItem('isteacherclockedin', data.teacherTodayAttendenceStatusId); // 0 for not clockedin, 1 for clockedin 2 for clocked out
      localStorage.setItem('isauthenticated', 'true');
      localStorage.setItem('path', '/home/teacherdashboard');
    //  localStorage.setItem('usertype', '3');
      this.router.navigate(['/home/teacherdashboard']);
      this.toaster.success({message: '', title: 'Welcome'});
      // this.commonService.getUserRole('userdetails');
    } else if (data.roleId === 4) {
   //   localStorage.setItem('isauthenticated', 'true');
      localStorage.setItem('path', '/home/parentdashboard');
    //  localStorage.setItem('usertype', '4');
      this.router.navigate(['/home/parentdashboard']);
      this.toaster.success({message: '', title: 'Welcome'});
    } else {

    }

  }

}
