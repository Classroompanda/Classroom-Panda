import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ErrorHandlerService } from '../../../../shared/services/error-handler/error-handler.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from '../../../../shared/services/notification-service/notification.service';
import { CommonService } from '../../../../shared/services/common/common.service';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { TeacherAPIURLs } from 'src/app/layout/teacher/shared/constant';
import { AgencyDetailsVM } from '../../shared/view-models/agency-view-modal';
import { AdminAPIURLs } from '../../shared/constant';
import { AdminApiService } from '../../shared/services/admin-api.service';
import { ParentAPIURLs } from 'src/app/layout/parent/shared/constant';
declare var $: any;


@Component({
  selector: 'app-add-deactivate-reason',
  templateUrl: './add-deactivate-reason.component.html',
  styleUrls: ['./add-deactivate-reason.component.css']
})
export class AddDeactivateReasonComponent implements OnInit {
  deactivateReasonForm: FormGroup;
  deactivateReasonList: any[];
  constructor(private apiService: AdminApiService, private error: ErrorHandlerService,
    private spinner: NgxSpinnerService, private notification: NotificationService,
    public commonService: CommonService, private fb: FormBuilder, private route: ActivatedRoute,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.deactivateReasonList = [];
    this.createDeactivateReasonForm();
    this.getDeactivateReason();
  }

  createDeactivateReasonForm() {
    this.deactivateReasonForm = this.fb.group({
      reason: ['', Validators.required]
    });
  }

  get t() { return this.deactivateReasonForm.controls; }

  getDeactivateReason() {
    const req = {
      'isDeleted': false,
      'RoleID': 5 // For Student
    };
    this.apiService.postData(ParentAPIURLs.GetDeactivateReason, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.deactivateReasonList = res.body.data;
      } else {
        this.spinner.hide();
        this.error.unknownError();
      }
    }, err => {
      this.spinner.hide();
      this.error.commonError(err);
    }
    );

  }


  // Save Deactivate Reason
  saveDeactivateReason() {
    if (this.deactivateReasonForm.valid) {
      const data = {
        'id': 0,
        'Reason': this.deactivateReasonForm.value.reason,
        'RoleID': 5
      };
      this.apiService.postData(ParentAPIURLs.SaveDeactivateReason, data, null).subscribe(res => {
        if (res.body.statusCode === 200) {
          $('.adddeactivatereason').modal('hide');
          this.spinner.hide();
          this.notification.success({ message: 'Deactivate Reason Added successfully', title: '' });
          this.getDeactivateReason();
        } else if (res.body.statusCode === 206) {
          this.spinner.hide();
          this.notification.warning({ message: 'Deactivate Reason already exists with same name.', title: '' });
        } else {
          this.spinner.hide();
          this.error.unknownError();
        }
      }, err => {
        this.spinner.hide();
        this.error.commonError(err);
      });
    } else {
      this.spinner.hide();
      this.commonService.validateAllFields(this.deactivateReasonForm);
    }
  }



  clearDeactivateReasonForm() {
    this.createDeactivateReasonForm();
  }


}
