import { ParentApiService } from '../../shared/services/parent-api-service';
import { ErrorHandlerService } from '../../../../shared/services/error-handler/error-handler.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from '../../../../shared/services/notification-service/notification.service';
import { CommonService } from '../../../../shared/services/common/common.service';
import { ActivatedRoute } from '@angular/router';
import { ParentAPIURLs } from '../../shared/constant';
import { AgencyAPIURLs } from '../../../agency-admin/components/shared/constatant';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AchInfoVM, RecurringPayment, VerifyAccountVM, OneTimePaymentVM } from '../../shared/view-model/parent-detailsvm';
import { Component, OnInit, Renderer, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { CalendarComponent } from 'ng-fullcalendar';
import { TeacherApiService } from '../../../teacher/shared/services/teacher-api-service/teacher-api.service';
import { TeacherAPIURLs } from '../../../teacher/shared/constant';
import { Options } from 'fullcalendar';
declare var $: any;

@Component({
  selector: 'app-parent-payment-ach',
  templateUrl: './parent-payment-ach.component.html',
  styleUrls: ['./parent-payment-ach.component.css']
})
export class ParentPaymentAchComponent implements OnInit {
  achInfo: any[] = [];
  recurringPayment: any[] = [];
  pageNo = 0;
  limit = 10;
  loader = true;
  totalRecord = 0;
  isStripAvailable: boolean;
  activeSubscription: boolean;
  isSubscriptionActive: boolean;
  AchInfoForm: FormGroup;
  VerifyAccountForm: FormGroup;
  RecurringPaymentForm: FormGroup;
  OneTimePaymentForm: FormGroup;
  achVM: AchInfoVM = {};
  accountVM: VerifyAccountVM = {};
  recurringVM: RecurringPayment = {};
  oneTimeVM: OneTimePaymentVM = {};
  today = new Date();
  tomorrow: any;
  addMode: any;
  recurringId: any;
  isOngoing: boolean;
  emptyDate: any;

  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();

  constructor(private apiService: ParentApiService, private error: ErrorHandlerService,
    private spinner: NgxSpinnerService, private notification: NotificationService,
    private commonService: CommonService, private fb: FormBuilder, private route: ActivatedRoute,
    private renderer: Renderer, private confirmationService: ConfirmationService) {
    this.isStripAvailable = this.commonService.isStripeAccount();
    this.isSubscriptionActive = this.commonService.getSubscriptionStatus();
    this.activeSubscription = this.commonService.getSubscriptionStatus();
  }

  ngOnInit() {
    this.tomorrow = new Date();
    this.tomorrow.setDate(this.tomorrow.getDate() + 1);
    this.createAchInfoForm();
    this.createRecurringPaymentForm();
    this.createVerifyAccountForm();
    this.getAchInfo();
    this.createOneTimePaymentForm();
    this.dpConfig = Object.assign({}, { containerClass: 'theme-dark-blue' }, { showWeekNumbers: false }
    );

  }

  allowOnlyNumber(event) {
    this.commonService.allowOnlyNumber(event);
  }
  allowOnlyNumberWithDecimal(evevt) {
    this.commonService.allowOnlyNumberWithDecimal(evevt);
  }

  onGoing() {
    debugger;
    if (this.RecurringPaymentForm.value.ongoing === true) {
      this.isOngoing = true;
      const d = new Date('Jan 1, 2080 12:00:00');
      this.RecurringPaymentForm.controls.enddate.setValue(d);
      this.RecurringPaymentForm.controls.enddate.updateValueAndValidity();
    } else {
      if (this.recurringVM.paymentToDate !== undefined) {
        this.RecurringPaymentForm.controls.enddate.setValue(this.recurringVM.paymentToDate);
        this.RecurringPaymentForm.controls.enddate.updateValueAndValidity();
        this.isOngoing = false;
      } else {
      this.RecurringPaymentForm.controls.enddate.setValue(this.emptyDate);
      this.RecurringPaymentForm.controls.enddate.updateValueAndValidity();
      this.isOngoing = false;
      }
    }
  }

  getAchInfo() {
    this.loader = true;
    this.achInfo = [];
    this.spinner.show();
    const data = {
      'agencyID': this.commonService.getAgencyId(),
      'parentID': this.commonService.getReleventUserId('userdetails'),
    };
    this.apiService.postData(ParentAPIURLs.GetACHInformationByParentID, data, null).subscribe(res => {
      //  this.spinner.hide();
      this.totalRecord = res.body.totalRows;
      if (res.body.statusCode === 200) {
        this.achInfo = res.body.data;
        this.loader = false;
      } else {
        this.error.unknownError();
      }
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.error.commonError(err);
    });
  }

  getRecurringPayment() {
    this.loader = true;
    this.recurringPayment = [];
    this.spinner.show();
    const data = {
      'agencyID': this.commonService.getAgencyId(),
      'parentID': this.commonService.getReleventUserId('userdetails'),
    };
    this.apiService.postData(ParentAPIURLs.GetRecurringPaymentByParentID, data, null).subscribe(res => {
      //  this.spinner.hide();
      this.totalRecord = res.body.totalRows;
      if (res.body.statusCode === 200) {
        this.recurringPayment = res.body.data;
        this.loader = false;
      } else {
        this.error.unknownError();
      }
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.error.commonError(err);
    });
  }

  createAchInfoForm() {
    this.AchInfoForm = this.fb.group({
      country: ['US'],
      currency: ['USD'],
      account: ['', Validators.required],
      routing: ['', Validators.required],
      name: ['', Validators.required],
      accounttype: ['', Validators.required],
    });
  }

  cleareAllForm() {
    this.createAchInfoForm();
  }

  get l() { return this.AchInfoForm.controls; }

  verifyAchInfoForm() {
    if (this.AchInfoForm.valid) {
      this.AddAchInfoForm();
    } else {
      this.spinner.hide();
      this.commonService.validateAllFields(this.AchInfoForm);
    }
  }

  AddAchInfoForm() {
    this.spinner.show();
    this.achVM.agencyID = this.commonService.getAgencyId();
    this.achVM.parentID = this.commonService.getReleventUserId('userdetails');
    this.achVM.accountNumber = this.AchInfoForm.value.account;
    this.achVM.routingNumber = this.AchInfoForm.value.routing;
    this.achVM.accountHolderName = this.AchInfoForm.value.name;
    this.achVM.accountType = this.AchInfoForm.value.accounttype;
    this.createAchInfo(this.achVM);
  }

  createAchInfo(req) {
    this.spinner.show();
    this.apiService.postData(ParentAPIURLs.SaveACHInformationByParentID, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.notification.success({ message: 'Bank account Added successfully. Please verify your account.', title: '' });
        $('.addachinfo').modal('hide');
        this.getAchInfo();
        this.getRecurringPayment();
        this.spinner.hide();
      } else if (res.body.statusCode === 987) {
        this.notification.warning({ message: 'Please check your details.', title: '' });
        this.spinner.hide();
      } else if (res.body.statusCode === 204) {
        this.notification.warning({ message: 'Stripe account do not exist for the agency.', title: '' });
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

  deleteAchInformation(value) {
    console.log('testttttt');
    this.confirmationService.confirm({
      message: 'Do you want to delete this ach bank account information?',
      accept: () => {
        this.spinner.show();
        value.IsDeleted = true;
        value.DeletedDate = new Date();
        value.DeletedBy = this.commonService.getAgencyId();
        this.apiService.postData(ParentAPIURLs.SaveACHInformationByParentID, value, null).subscribe(res => {
          if (res.body.statusCode === 200) {
            this.notification.success({
              // tslint:disable-next-line: triple-equals
              message: 'ACH Bank Account deleted successfully', title: ''
            });
            this.getAchInfo();
            this.getRecurringPayment();
          } else if (res.body.statusCode === 988) {
            this.spinner.hide();
            this.notification.warning({ message: res.body.message, title: '' });
          } else if (res.body.statusCode === 903) {
            this.spinner.hide();
            this.notification.warning({ message: res.body.message, title: '' });
          } else {
            this.spinner.hide();
            this.notification.warning({ message: res.body.message, title: '' });
          }
        }, err => {
          this.spinner.hide();
          this.error.commonError(err);
        });
      }
    });
  }


  // Recurring Payment

  createRecurringPaymentForm() {
    if (this.recurringVM.id === undefined || this.recurringVM.id === 0) {
      this.RecurringPaymentForm = this.fb.group({
        amount: ['', Validators.required],
        billigcycle: ['', Validators.required],
        startdate: ['', Validators.required],
        enddate: ['', Validators.required],
        //firstdate: ['', Validators.required],
        ongoing: [false]
      });
    } else {
      this.RecurringPaymentForm = this.fb.group({
        amount: [this.recurringVM.amount, Validators.required],
        billigcycle: [this.recurringVM.billingCycle, Validators.required],
        startdate: [this.recurringVM.paymentFromDate, Validators.required],
        enddate: [this.recurringVM.paymentToDate, Validators.required],
        //firstdate: [this.recurringVM.firstPaymentDate, Validators.required]
      });
    }
  }

  getPerticulerRecurringPayment(value) {
    this.recurringVM.id = value.id;
    console.log(this.recurringVM.id, 'IIIIIIIIIII');
    this.recurringVM.agencyID = value.agencyID;
    this.recurringVM.billingCycle = value.billingCycle;
    this.recurringVM.amount = value.amount;
    this.recurringVM.firstPaymentDate = new Date(value.firstPaymentDate);
    this.recurringVM.paymentFromDate = new Date(value.paymentFromDate);
    this.recurringVM.paymentToDate = new Date(value.paymentToDate);
    this.recurringId = value.id;
    this.createRecurringPaymentForm();
    this.addMode = false;
  }

  cleareRecurringPaymentForm() {
    this.recurringVM = {};
    this.isOngoing = false;
    this.recurringId = 0;
    this.createRecurringPaymentForm();
  }

  get r() { return this.RecurringPaymentForm.controls; }

  verifyRecurrinPaymentForm() {
    if (this.RecurringPaymentForm.valid) {
      this.AddRecurringPaymentForm();
    } else {
      this.spinner.hide();
      this.commonService.validateAllFields(this.RecurringPaymentForm);
    }
  }

  AddRecurringPaymentForm() {
    this.spinner.show();
    this.recurringVM.id = this.recurringId;
    this.recurringVM.agencyID = this.commonService.getAgencyId();
    this.recurringVM.parentID = this.commonService.getReleventUserId('userdetails');
    this.recurringVM.amount = this.RecurringPaymentForm.value.amount;
    this.recurringVM.billingCycle = this.RecurringPaymentForm.value.billigcycle;
    this.recurringVM.paymentFromDate = this.RecurringPaymentForm.value.startdate;
    this.recurringVM.paymentToDate = this.RecurringPaymentForm.value.enddate;
    //this.recurringVM.firstPaymentDate = this.RecurringPaymentForm.value.startdate;

    if (this.recurringVM.paymentFromDate > this.recurringVM.paymentToDate) {
      this.notification.warning({ message: 'Payment start date must be less than end date.', title: '' });
        this.spinner.hide();
    // } else if (this.recurringVM.firstPaymentDate > this.recurringVM.paymentToDate) {
    //   this.notification.warning({ message: 'First payment date must be less than end date.', title: '' });
    //     this.spinner.hide();
    // } else if (this.recurringVM.firstPaymentDate < this.recurringVM.paymentFromDate) {
    //   this.notification.warning({ message: 'First payment date must be greater than start date.', title: '' });
    //     this.spinner.hide();
    // }4444
    } else {
      this.createRecurringPayment(this.recurringVM);
    }
  }

  createRecurringPayment(req) {
    this.spinner.show();
    this.apiService.postData(ParentAPIURLs.SaveRecurringPaymentByParentID, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.notification.success({
          // tslint:disable-next-line: triple-equals
          message: this.recurringId == 0 ? 'Recurring payment added successfully' :
            'Recurring payment updated successfully', title: ''
        });
        $('.recurringpayment').modal('hide');
        this.getRecurringPayment();
        this.spinner.hide();
      } else if (res.body.statusCode === 204) {
        this.notification.warning({ message: 'No bank account added for ACH.', title: '' });
        this.spinner.hide();
      } else if (res.body.statusCode === 206) {
        this.notification.warning({ message: 'Bank account for ACH is not verified.', title: '' });
        this.spinner.hide();
      } else if (res.body.statusCode === 987) {
        this.notification.warning({ message: 'Something went wrong.', title: '' });
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


  deleteRecurringPayment(value) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this recurring payment?',
      accept: () => {
        this.spinner.show();
        value.IsDeleted = true;
        value.DeletedDate = new Date();
        value.DeletedBy = this.commonService.getAgencyId();
        this.apiService.postData(ParentAPIURLs.DeleteRecurringPaymentByParentID, value, null).subscribe(res => {
          if (res.body.statusCode === 200) {
            this.notification.success({
              // tslint:disable-next-line: triple-equals
              message: 'Recurring payment deleted successfully', title: ''
            });
            this.getRecurringPayment();
          } else if (res.body.statusCode === 988) {
            this.spinner.hide();
            this.notification.warning({ message: res.body.message, title: '' });
          } else if (res.body.statusCode === 903) {
            this.spinner.hide();
            this.notification.warning({ message: res.body.message, title: '' });
          } else {
            this.spinner.hide();
            this.notification.warning({ message: res.body.message, title: '' });
          }
        }, err => {
          this.spinner.hide();
          this.error.commonError(err);
        });
      }
    });
  }



  // Verify Account

  createVerifyAccountForm() {
    this.VerifyAccountForm = this.fb.group({
      amountFirst: ['', Validators.required],
      amountSecond: ['', Validators.required],
    });
  }

  clearVerifyForm() {
    this.createVerifyAccountForm();
  }

  get a() { return this.VerifyAccountForm.controls; }

  verifyVerifyAccountForm() {
    if (this.VerifyAccountForm.valid) {
      this.AddVerifyAccountForm();
    } else {
      this.spinner.hide();
      this.commonService.validateAllFields(this.VerifyAccountForm);
    }
  }

  AddVerifyAccountForm() {
    this.spinner.show();
    this.accountVM.agencyID = this.commonService.getAgencyId();
    this.accountVM.parentID = this.commonService.getReleventUserId('userdetails');
    this.accountVM.amountFirst = this.VerifyAccountForm.value.amountFirst;
    this.accountVM.amountSecond = this.VerifyAccountForm.value.amountSecond;

    this.createVerifyAccount(this.accountVM);
  }

  createVerifyAccount(req) {
    this.spinner.show();
    this.apiService.postData(ParentAPIURLs.VerifyACHBankAccountByParentID, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.notification.success({ message: 'Bank account for ACH Verified successfully.', title: '' });
        this.getAchInfo();
        $('.verifyaccount').modal('hide');
        this.spinner.hide();
      } else if (res.body.statusCode === 987) {
        // tslint:disable-next-line: max-line-length
        this.notification.warning({ message: 'The amounts provided do not match the amounts that were sent to the bank account.', title: 'Please check the amounts.' });
        this.spinner.hide();
      } else if (res.body.statusCode === 204) {
        this.notification.warning({ message: 'Stripe bank account do not exist for the agency.', title: '' });
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

  // One Time Payment By ACH

  createOneTimePaymentForm() {
    this.OneTimePaymentForm = this.fb.group({
      amount: ['', Validators.required],
      date: ['', Validators.required],
    });
  }

  clearOneTimePaymentForm() {
    this.createOneTimePaymentForm();
  }

  get o() { return this.OneTimePaymentForm.controls; }

  verifyOneTimePaymentForm() {
    if (this.OneTimePaymentForm.valid) {
      this.AddOneTimePaymentForm();
    } else {
      this.spinner.hide();
      this.commonService.validateAllFields(this.OneTimePaymentForm);
    }
  }

  AddOneTimePaymentForm() {
    this.spinner.show();
    this.oneTimeVM.agencyID = this.commonService.getAgencyId();
    this.oneTimeVM.parentID = this.commonService.getReleventUserId('userdetails');
    this.oneTimeVM.amount = this.OneTimePaymentForm.value.amount;
    this.oneTimeVM.date = this.OneTimePaymentForm.value.date;
    this.createOneTimePayment(this.oneTimeVM);
  }

  createOneTimePayment(req) {
    this.spinner.show();
    this.apiService.postData(ParentAPIURLs.OneTimePaymentByACH, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.notification.success({ message: 'Payment done successfully.', title: '' });
        this.getAchInfo();
        $('.onetimepayment').modal('hide');
        this.spinner.hide();
      } else if (res.body.statusCode === 206) {
        this.notification.warning({ message: 'ACH bank account do not verified.', title: '' });
        this.spinner.hide();
      } else if (res.body.statusCode === 987) {
        this.notification.warning({ message: 'Something went wrong.', title: '' });
        this.spinner.hide();
      } else if (res.body.statusCode === 204) {
        this.notification.warning({ message: res.body.message, title: '' });
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


}

