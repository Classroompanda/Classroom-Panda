import { Component, OnInit, Renderer } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorHandlerService } from '../../../shared/services/error-handler/error-handler.service';
import { NotificationService } from '../../../shared/services/notification-service/notification.service';
import { CommonService } from '../../../shared/services/common/common.service';
import { AuthApiService } from '../../shared/services/auth-api-service/auth-api.service';
import { AuthAPIURls } from '../../shared/constant';
import { ActivatedRoute } from '@angular/router';
import { ParentDetailsVM } from '../../../layout/parent/shared/view-model/parent-detailsvm';
import { DatePipe } from '@angular/common';
import { ConfirmationService } from 'primeng/api';
import { AgencyDetailsVM } from 'src/app/layout/admin/shared/view-models/agency-view-modal';
import { AdminStripKey } from 'src/app/shared/constdata';
import { TabHeadingDirective } from 'ngx-bootstrap';
import { ParentAPIURLs } from 'src/app/layout/parent/shared/constant';
declare var StripeCheckout: any;
declare var $: any;

@Component({
  selector: 'app-agency-registration',
  templateUrl: './agency-registration.component.html',
  styleUrls: ['./agency-registration.component.css']
})
export class AgencyRegistrationComponent implements OnInit {
  agencyForm: FormGroup;
  promoForm: FormGroup;
  id: number;
  showMessage: boolean;
  registrationForm: FormGroup;
  emailPattern = /^([\w-\.]+\u0040([\w-]+\.)+[\w-]{2,4})?$/;
  loader = true;
  short: any;
  image: any;
  profileimage: any;
  flag = false;
  pricingPlanList: any[] = [];
  planId = 0;
  planPrice = 0;
  price = 0;
  countryList: any[];
  stateList: any[];
  cityList: any[];
  agencyVM: AgencyDetailsVM = {};
  status = 1;
  addMode = true;
  globalListener: any;
  isSuccessShow = false;
  isFailShow = false;
  isActive = true;


  constructor(private apiService: AuthApiService, private error: ErrorHandlerService, private confirmationService: ConfirmationService,
    private spinner: NgxSpinnerService, private notification: NotificationService, private datepipe: DatePipe,
    private commonService: CommonService, private fb: FormBuilder, private route: ActivatedRoute, private renderer: Renderer) {
  }


  ngOnInit() {
    this.getAllPricingPlan();
    this.createAgencyForm();
    this.getAllCountries();
    this.createPromoForm();
    this.short = this.datepipe.transform(new Date(), 'dd-MM-yyyy hh:mm:ss');
  }

  getAllPricingPlan() {
    this.spinner.show();
    this.pricingPlanList = [];
    const req = {
      'limit': 0,
      'page': 0
    };
    this.apiService.postData(AuthAPIURls.GetAllPricingPlanDetails, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.pricingPlanList = res.body.data;
        this.showMessage = false;
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

  getPlanDetails(plan) {
    this.createAgencyForm();
    this.planId = plan.id;
    this.planPrice = plan.planPrice;
    this.price = plan.planPrice;
    this.agencyVM = {};
    this.addMode = true;
    this.status = 1;
    this.isFailShow = false;
    this.isSuccessShow = false;
  }

  // Agency Registration

  createAgencyForm() {
    this.agencyForm = this.fb.group({
      agencyname: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipcode: [''],
      country: ['', Validators.required]
    });
  }

  get f() { return this.agencyForm.controls; }

  openCheckout() {
    if (this.agencyForm.valid) {
      const amounttopay = this.price;
      const handler = (<any>window).StripeCheckout.configure({
        key: AdminStripKey.publishableKey,
        locale: 'auto',
        token: token => {
          this.spinner.show();
          console.log(token);
          const model = {
            'agencyID': 0,
            'SourceToken': token.id,
            'CreatedBy': 0,
            'IsOffline': false,
            'PlanID': this.planId,
            'Amount': this.price,
            'IsNew': this.isSuccessShow,
            'Id': 0,
            'AgencyName': this.agencyForm.value.agencyname,
            'EmailId': this.agencyForm.value.email,
            'Mobile': this.agencyForm.value.phone,
            'OwnerFirstName': this.agencyForm.value.firstname,
            'OwnerLastName': this.agencyForm.value.lastname,
            'StateId': this.agencyForm.value.state,
            'CityId': this.agencyForm.value.city,
            'PostalCode': this.agencyForm.value.zipcode,
            'Address': this.agencyForm.value.address,
            'CountryId': this.agencyForm.value.country,
            'status': this.status
          };
          console.log(model);
          this.apiService.postData(AuthAPIURls.AgencyRegistration, model, null).subscribe(result => {
            if (result.body.statusCode === 200) {
              this.showMessage = true;
              this.spinner.hide();
              this.notification.success({ message: 'Registration done successfully!', title: '' });
              $('.addagency').modal('hide');
              console.log('data', result.body.data);
            } else if (result.body.statusCode === 986) {
              this.showMessage = false;
              this.notification.warning({ message: 'This email Address already exist!', title: '' });
              this.spinner.hide();
            } else {
              this.showMessage = false;
              this.spinner.hide();
              this.error.unknownError();
              console.log('err');
            }
          }, err => {
            this.error.commonError(err);
            this.spinner.hide();
          }
          );
        }
      });
      handler.open({
        name: 'Classroom Panda',
        description: 'Child Day Care',
        amount: amounttopay * 100,
        email: this.agencyForm.value.email,
        panelLabel: 'Subscribe'
      });
      this.globalListener = this.renderer.listenGlobal('window', 'popstate', () => {
        handler.close();
      });
    } else {
      this.spinner.hide();
      this.commonService.validateAllFields(this.agencyForm);
    }
  }


  // Get City State Country List

  getAllCountries() {
    this.countryList = [];
    const req = {
      'AgencyID': 4
    };
    this.apiService.postData(AuthAPIURls.GetAllCountry, req, null).subscribe(res => {
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

  getStatesList() {
    this.spinner.show();
    this.stateList = [];
    this.cityList = [];
    const req = {
      'CountryId': this.agencyForm.value.country,
      'AgencyID': 4
    };
    this.apiService.postData(AuthAPIURls.GetAllStates, req, null).subscribe(res => {
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

  getCitiesList() {
    this.spinner.show();
    this.cityList = [];
    const req = {
      'StateId': this.agencyForm.value.state,
      'AgencyID': 4
    };
    this.apiService.postData(AuthAPIURls.GetAllCities, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.cityList = res.body.data;
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

  clearStateCity() {
    this.agencyForm.controls['state'].setValue('');
    this.agencyForm.controls['city'].setValue('');
  }

  clearCity() {
    this.agencyForm.controls['city'].setValue('');
  }

  // Promocode

  createPromoForm() {
    this.promoForm = this.fb.group({
      promocodename: ['', Validators.required],
    });
  }

  get p() { return this.promoForm.controls; }

  promocodeForm() {
    this.isSuccessShow = false;
    this.isFailShow = false;
    this.price = this.planPrice;
    this.createPromoForm();
  }

  checkPromoCode() {
    const req = {
      'Id': 0,
      'CouponName': this.promoForm.value.promocodename,
      'Amount': this.price
    };
    this.apiService.postData(ParentAPIURLs.CheckCoupon, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        if (res.body.isSuccess === true) {
          $('.promocode').modal('hide');
          this.price = res.body.amount;
          this.isSuccessShow = true;
          this.isFailShow = false;
        } else {
          this.isSuccessShow = false;
          this.isFailShow = true;
        }
        this.spinner.hide();
      } else {
        this.isSuccessShow = false;
        this.isFailShow = true;
        this.spinner.hide();
        this.error.unknownError();
      }
    }, err => {
      this.isSuccessShow = false;
      this.isFailShow = true;
      this.spinner.hide();
      this.error.commonError(err);
    }
    );

  }

  close() {
    debugger;
    this.isFailShow = false;
    this.isSuccessShow = false;
  }

  addAddress(event) {
    debugger;
    if (event.target.checked === true) {
      this.isActive = false;
    } else {
      this.isActive = true;
    }

    // if (this.addChildForm.value.addressasparent === true) {
    //   this.addChildForm.get('address').setValue(this.parentAddress);
    //   this.addChildForm.controls['address'].disable();
    // } else {
    //   this.addChildForm.get('address').setValue('');
    //   this.addChildForm.controls['address'].enable();
    // }
  }


}








