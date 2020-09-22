import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AgencyApiService } from '../../../agency-admin/components/shared/services/agency-api-service/agency-api.service';
import { ErrorHandlerService } from '../../../../shared/services/error-handler/error-handler.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from '../../../../shared/services/notification-service/notification.service';
import { CommonService } from '../../../../shared/services/common/common.service';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { AdminApiService } from '../../shared/services/admin-api.service';
import { ParentAPIURLs } from 'src/app/layout/parent/shared/constant';
import { AdminAPIURLs } from '../../shared/constant';
declare var $: any;

@Component({
  selector: 'app-text-plan',
  templateUrl: './text-plan.component.html',
  styleUrls: ['./text-plan.component.css']
})
export class TextPlanComponent implements OnInit {
  txtPlanForm: FormGroup;
  txtPlanList: any[];
  constructor(private apiService: AdminApiService, private error: ErrorHandlerService,
    private spinner: NgxSpinnerService, private notification: NotificationService,
    public commonService: CommonService, private fb: FormBuilder, private route: ActivatedRoute,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.txtPlanList = [];
    this.createTextPlanForm();
    this.getPlan();
  }

  createTextPlanForm() {
    this.txtPlanForm = this.fb.group({
      amount: ['', Validators.required],
      messages: ['', Validators.required],
    });
  }

  get t() { return this.txtPlanForm.controls; }

  getPlan() {
    const req = {
      'isActive': true,
      'agencyID': 0
    };
    this.apiService.postData(AdminAPIURLs.GetTextMessagePlan, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.txtPlanList = res.body.data;
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

  }


  // Save Plan
  savePlan() {
    if (this.txtPlanForm.valid) {
      const data = {
        'id': 0,
        'createdBy': this.commonService.getLoggedInUserId(),
        'Amount': this.txtPlanForm.value.amount,
        'Messages': this.txtPlanForm.value.messages,
      };
      this.apiService.postData(AdminAPIURLs.SaveTextMessagePlan, data, null).subscribe(res => {
        if (res.body.statusCode === 200) {
          $('.addtextplan').modal('hide');
          this.notification.success({ message: 'Text Message Plan Added Successfully.', title: '' });
          this.getPlan();
        } else if (res.body.statusCode === 206) {
          this.spinner.hide();
          this.notification.warning({ message: 'Text Message Plan already exists with same amount.', title: '' });
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
      this.commonService.validateAllFields(this.txtPlanForm);
    }
  }


  clearTextPlanForm() {
    this.createTextPlanForm();
  }

  // Method to delete/deactivate Plan
  deactivatePlan(value) {
    this.confirmationService.confirm({
      message: 'Do you want to deactivate this Plan?',
      accept: () => {
        this.spinner.show();
        const req = {
          'Id': value.id,
          'IsDeleted': true,
          'DeletedBy': this.commonService.getReleventUserId('userdetails'),
        };
        this.apiService.postData(AdminAPIURLs.ActivateDeactivateTextMessagePlan, req, null).subscribe(res => {
          if (res.body.statusCode === 200) {
            this.notification.success({ message: 'This Plan has been deactivated', title: '' });
            this.getPlan();
          } else {
            this.spinner.hide();
            this.error.unknownError();
          }
        }, err => {
          this.spinner.hide();
          this.error.commonError(err);
        });
      }
    });
  }


  // Method to Activate Plan
  activatePlan(value) {
    this.confirmationService.confirm({
      message: 'Do you want to activate this Plan?',
      accept: () => {
        this.spinner.show();
        const req = {
          'Id': value.id,
          'IsDeleted': false,
          'UpdatedBy': this.commonService.getReleventUserId('userdetails'),
        };
        this.apiService.postData(AdminAPIURLs.ActivateDeactivateTextMessagePlan, req, null).subscribe(res => {
          if (res.body.statusCode === 200) {
            this.notification.success({ message: 'This Plan has been activated', title: '' });
            this.getPlan();
          } else {
            this.spinner.hide();
            this.error.unknownError();
          }
        }, err => {
          this.spinner.hide();
          this.error.commonError(err);
        });
      }
    });
  }

}

