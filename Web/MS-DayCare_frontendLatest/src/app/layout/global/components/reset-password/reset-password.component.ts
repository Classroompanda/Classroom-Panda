import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorHandlerService } from '../../../../shared/services/error-handler/error-handler.service';
import { NotificationService } from '../../../../shared/services/notification-service/notification.service';
import { AgencyApiService } from '../../../agency-admin/components/shared/services/agency-api-service/agency-api.service';
import { CommonService } from '../../../../shared/services/common/common.service';
import { GlobalAPIURLs } from '../../shared/constant';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup;
  constructor(private apiService: AgencyApiService, private error: ErrorHandlerService,
    private spinner: NgxSpinnerService, private notification: NotificationService,
    private commonService: CommonService, private fb: FormBuilder) { }

  ngOnInit() {
    console.log('sdf', this.commonService.getUserMail());
    this.createResetForm();
  }

createResetForm() {
  this.resetForm = this.fb.group({
    newpassword: ['', [Validators.required, Validators.minLength(6)]],
    confirmpassword: ['', [Validators.required, Validators.minLength(6)]],
  });
}
  get f() { return this.resetForm.controls; }

verifyPassword() {
  this.spinner.show();
  if (this.resetForm.valid) {
    const newpwd = this.resetForm.value.newpassword;
    const curpwd = this.resetForm.value.confirmpassword;
    if (newpwd === curpwd) {
      const req = {
        'requestedEmail': this.commonService.getUserMail(),
        'updatedPassword': newpwd
      };
      this.apiService.postData(GlobalAPIURLs.UpdatedPassword, req, null).subscribe(res => {
        if (res.body.statusCode === 200) {
            this.notification.success({message: 'Password has been updated and  sent to your mail successfully.', title: ''});
            this.resetForm.reset();
            this.spinner.hide();
        } else {
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
      this.notification.warning({message: 'Passowrd not match', title: ''});
    }
  } else {
    this.spinner.hide();
    this.commonService.validateAllFields(this.resetForm);
  }
}

resetFields() {
this.resetForm.reset();
console.log('sdf', this.commonService.getUserMail());
}
}
