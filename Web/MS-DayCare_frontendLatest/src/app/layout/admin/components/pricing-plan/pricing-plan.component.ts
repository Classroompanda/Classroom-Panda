import { Component, OnInit } from '@angular/core';
import { AdminApiService } from '../../shared/services/admin-api.service';
import { ErrorHandlerService } from '../../../../shared/services/error-handler/error-handler.service';
import { NotificationService } from '../../../../shared/services/notification-service/notification.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from '../../../../shared/services/common/common.service';
import { ConfirmationService } from 'primeng/api';
import { AdminAPIURLs } from '../../shared/constant';
import { PaymentVM } from '../../shared/view-models/agency-view-modal';
declare var $: any;
@Component({
  selector: 'app-pricing-plan',
  templateUrl: './pricing-plan.component.html',
  styleUrls: ['./pricing-plan.component.css']
})
export class PricingPlanComponent implements OnInit {
  totalRecord = 0;
  pricingPlanList: any[] = [];
  pageNo = 0;
  limit = 10;
  planId = 0;
  loader = true;
  pricingForm: FormGroup;
  PaymentVM: PaymentVM = {};
  addMode = true;
  constructor(private apiService: AdminApiService, private error: ErrorHandlerService,
    private spinner: NgxSpinnerService, private notification: NotificationService,
    public commonService: CommonService, private fb: FormBuilder, private route: ActivatedRoute,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.getAllPricingPlan();
    this.createPlanForm();
  }


  createPlanForm() {
    this.pricingForm = this.fb.group({
      planname: ['', Validators.required],
      noofusers: ['', Validators.required],
      price: ['', Validators.required],
      remark: [''],
      limit: ['', Validators.required],
      active: [true]
    });
  }



  updatePlanForm() {
    this.pricingForm = this.fb.group({
      planname: [ this.PaymentVM.planName, Validators.required],
      noofusers: [ this.PaymentVM.numberofUsers, Validators.required],
      price: [ this.PaymentVM.planPrice, Validators.required],
      remark: [this.PaymentVM.remark],
      limit: [ this.PaymentVM.frequency, Validators.required],
      active: [this.PaymentVM.IsActive]
    });
  }

  get f() { return this.pricingForm.controls; }

  getAllPricingPlan() {
    this.spinner.show();
    this.pricingPlanList = [];
    const req = {
      'limit': this.limit,
      'page': this.pageNo
    };
    this.apiService.postData(AdminAPIURLs.GetAllPricingPlanDetails, req, null).subscribe(res => {
      this.totalRecord = res.body.totalRows;
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


  createNewPlan() {
    this.spinner.show();
    if (this.pricingForm.valid) {
      const req = {
        'id': this.addMode ? 0 : this.planId,
        'planName': this.pricingForm.value.planname,
        'numberofUsers': this.pricingForm.value.noofusers,
        'planPrice': this.pricingForm.value.price,
        'frequency': this.pricingForm.value.limit,
        'remark': this.pricingForm.value.remark,
        'IsActive': this.pricingForm.value.active
      };

      this.apiService.postData(AdminAPIURLs.SavePricingPlanInformation, req, null).subscribe(res => {
        this.totalRecord = res.body.totalRows;
        if (res.body.statusCode === 200) {
            this.notification.success({ message: this.addMode ? 'Plan has been created successfully' :
             'Plan has been update successfully', title: '' });
            $('.addplan').modal('hide');
            this.getAllPricingPlan();
        } else if (res.body.statusCode === 987) {
          this.spinner.hide();
          this.notification.warning({ message: 'This plan is already in used ', title: 'Cannnot be updated' });
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
      this.commonService.validateAllFields(this.pricingForm);
    }
  }

  getPlanDetails(obj) {
    this.addMode = false;
    this.planId = obj.id;
    this.PaymentVM.IsActive = obj.isActive;
    this.PaymentVM.planName = obj.planName;
    this.PaymentVM.numberofUsers = obj.numberofUsers;
    this.PaymentVM.planPrice = obj.planPrice;
    this.PaymentVM.remark = obj.remark;
    this.PaymentVM.frequency = obj.frequency;
    this.updatePlanForm();
  }

  clearForm() {
    this.planId = 0;
    this.createPlanForm();
    this.addMode = true;
  }

}
