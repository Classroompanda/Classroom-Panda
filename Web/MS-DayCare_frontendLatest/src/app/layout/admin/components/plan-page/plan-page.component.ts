import { Component, OnInit } from '@angular/core';
import { AdminApiService } from '../../shared/services/admin-api.service';
import { ErrorHandlerService } from '../../../../shared/services/error-handler/error-handler.service';
import { NotificationService } from '../../../../shared/services/notification-service/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from '../../../../shared/services/common/common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { AdminAPIURLs } from '../../shared/constant';
declare var $: any;
@Component({
  selector: 'app-plan-page',
  templateUrl: './plan-page.component.html',
  styleUrls: ['./plan-page.component.css']
})
export class PlanPageComponent implements OnInit {
  pricingPlanList: any[] = [];
  planForm: FormGroup;
  agencyList: any [] = [];
  planId = 0;
  constructor(private apiService: AdminApiService, private error: ErrorHandlerService,
    private spinner: NgxSpinnerService, private notification: NotificationService,
    public commonService: CommonService, private fb: FormBuilder, private route: ActivatedRoute,
    private confirmationService: ConfirmationService) { }
  ngOnInit() {
    this.getAllPricingPlan();
    this.createPlanForm();
    this.getAllAgencyList();
  }


  getAllPricingPlan() {
    this.spinner.show();
    this.pricingPlanList = [];
    const req = {
      'limit': 0,
      'page': 0
    };
    this.apiService.postData(AdminAPIURLs.GetAllPricingPlanDetails, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.pricingPlanList = res.body.data;
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


  createPlanForm() {
    this.planForm = this.fb.group({
      agencyid: ['', Validators.required],
    });
  }


  getPlanDetails(plan) {
    this.createPlanForm();
    this.planId = plan.id;
  }

  getAllAgencyList() {
    this.agencyList = [];
    const req = {
      'limit': 0,
      'page': 0,
      'status': 1,
      'AgencyName': ''
    };
    this.apiService.postData(AdminAPIURLs.GetAllAgencyDetails, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.agencyList = res.body.data;
      } else {
        this.error.unknownError();
      }
    }, err => {
      this.error.commonError(err);
    }
    );
  }


  get f() { return this.planForm.controls; }


  subscribePlan() {
    this.spinner.show();
    if (this.planForm.valid) {
      const req = {
        'id': 0,
        'agencyID': this.planForm.value.agencyid,
        'planID': this.planId,
        'isOffline': true,
        'createdBy': 1
      };
      this.apiService.postData(AdminAPIURLs.SaveSubscriptionInformation, req, null).subscribe(res => {
        if (res.body.statusCode === 200) {
          $('.addplan').modal('hide');
          this.notification.success({message: 'Subscription Successfull', title: ''});
          this.spinner.hide();
        }  else if (res.body.statusCode === 205) {
          this.notification.warning({ message: 'Your previous subscription plan still active', title: '' });
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
      this.commonService.validateAllFields(this.planForm);
    }
  }
}
