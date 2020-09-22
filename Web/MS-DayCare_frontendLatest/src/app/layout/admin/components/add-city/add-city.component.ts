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
import { TeacherAPIURLs } from 'src/app/layout/teacher/shared/constant';
declare var $: any;
@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.css']
})
export class AddCityComponent implements OnInit {
  totalRecord = 0;
  pricingPlanList: any[] = [];
  pageNo = 0;
  limit = 10;
  planId = 0;
  loader = true;
  pricingForm: FormGroup;
  PaymentVM: PaymentVM = {};
  addMode = true;

  countryList: any[];
  stateList: any[];
  cityList: any[];

  constructor(private apiService: AdminApiService, private error: ErrorHandlerService,
    private spinner: NgxSpinnerService, private notification: NotificationService,
    public commonService: CommonService, private fb: FormBuilder, private route: ActivatedRoute,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.countryList = [];
    this.cityList = [];
    this.stateList = [];
    this.getAllCountries();
    this.createPlanForm();
  }

  getStatesList() {
    this.spinner.show();
    this.stateList = [];
    this.cityList = [];
    const req = {
      'CountryId': this.pricingForm.value.country,
      'AgencyID': 4
    };
    this.apiService.postData(TeacherAPIURLs.GetAllStates, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.stateList = res.body.data;
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
  getAllCountries() {   
    this.countryList = [];
    const req = {
      'AgencyID': 4
    };
    this.apiService.postData(TeacherAPIURLs.GetAllCountry, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.countryList = res.body.data;        
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
    this.pricingForm = this.fb.group({     
      country: ['', Validators.required],
      state: ['', Validators.required],
      cityname: ['', Validators.required],
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

  getAllstatelist() {
    this.spinner.show();
    this.stateList = [];
    const req = {
      'limit': this.limit,
      'page': this.pageNo
    };
    this.apiService.postData(AdminAPIURLs.GetAllState, req, null).subscribe(res => {
      this.totalRecord = res.body.totalRows;
      if (res.body.statusCode === 200) {
        this.stateList = res.body.data;
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
        'cityname': this.pricingForm.value.cityname,
        'countryId': this.pricingForm.value.country,
        'stateId': this.pricingForm.value.state
      };

      this.apiService.postData(AdminAPIURLs.SaveCity, req, null).subscribe(res => {
        this.totalRecord = res.body.totalRows;
        if (res.body.statusCode === 200) {
            this.notification.success({ message: this.addMode ? 'City has been created successfully' :
             'Plan has been update successfully', title: '' });
            $('.addplan').modal('hide');
            this.getAllstatelist();
        } else if (res.body.statusCode === 987) {
          this.spinner.hide();
          this.notification.warning({ message: 'This City is already in used ', title: 'Cannnot be updated' });
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
