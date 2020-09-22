import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorHandlerService } from '../../../shared/services/error-handler/error-handler.service';
import { NotificationService } from '../../../shared/services/notification-service/notification.service';
import { CommonService } from '../../../shared/services/common/common.service';
import { AuthApiService } from '../../shared/services/auth-api-service/auth-api.service';
import { AuthAPIURls } from '../../shared/constant';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-create-password',
  templateUrl: './create-password.component.html',
  styleUrls: ['./create-password.component.css']
})
export class CreatePasswordComponent implements OnInit {
  resetForm: FormGroup;
  id: any;
  showMessage: boolean;

  constructor(private apiService: AuthApiService, private error: ErrorHandlerService,
    private spinner: NgxSpinnerService, private notification: NotificationService,
    private commonService: CommonService, private fb: FormBuilder, private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id');
  }



  ngOnInit() {
    this.createPassword();
  }

  createPassword() {
    this.resetForm = this.fb.group({
      newpassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmpassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  public get f() { return this.resetForm.controls; }

  verifyPassword() {
    this.spinner.show();
    if (this.resetForm.valid) {
      const newpwd = this.resetForm.value.newpassword;
      const curpwd = this.resetForm.value.confirmpassword;
      if (newpwd === curpwd) {
        const req = {
          'UserId': this.id,
          'NewPassword': newpwd
        };
        this.apiService.postData(AuthAPIURls.CreatePassword, req, null).subscribe(res => {
          if (res.body.statusCode === 200) {
            this.spinner.hide();
            this.notification.success({ message: 'Password created successfully', title: '' });
            this.showMessage = true;

          } else {
            this.showMessage = false;
            this.spinner.hide();
            this.error.unknownError();
          }
        }, err => {
          this.spinner.hide();
          this.error.commonError(err);
        }
        );
      } else {
        this.spinner.hide();
        this.notification.warning({ message: 'Passowrd not match', title: '' });
      }
    } else {
      this.spinner.hide();
      this.commonService.validateAllFields(this.resetForm);
    }
  }

}





