import { Component, OnInit, Renderer } from '@angular/core';
import { ParentApiService } from '../../shared/services/parent-api-service';
import { ErrorHandlerService } from '../../../../shared/services/error-handler/error-handler.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from '../../../../shared/services/notification-service/notification.service';
import { CommonService } from '../../../../shared/services/common/common.service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ParentAPIURLs } from '../../shared/constant';
import { AgencyAPIURLs } from '../../../agency-admin/components/shared/constatant';
import { ConvertActionBindingResult } from '@angular/compiler/src/compiler_util/expression_converter';
declare var $: any;
@Component({
  selector: 'app-parent-payment-history',
  templateUrl: './parent-payment-history.component.html',
  styleUrls: ['./parent-payment-history.component.css']
})
export class ParentPaymentHistoryComponent implements OnInit {
  paymentDueList: any[] = [];
  globalListener: any;
  stripDetails: any;
  paymentHistoryList: any[] = [];
  pageNo = 0;
  limit = 10;
  loader = true;
  totalRecord = 0;
  isStripAvailable: boolean;
  activeSubscription: boolean;
  balanceAmount = '';
  offlineReq = {};
  Children: any;
  constructor(private apiService: ParentApiService, private error: ErrorHandlerService,
    private spinner: NgxSpinnerService, private notification: NotificationService,
    private commonService: CommonService, private fb: FormBuilder, private route: ActivatedRoute, private renderer: Renderer) {
    this.isStripAvailable = this.commonService.isStripeAccount();
    this.activeSubscription = this.commonService.getSubscriptionStatus();

  }

  ngOnInit() {
    // this.spinner.show();
    this.getPaymentDetails();
    this.getDuePaymentAccordingToParent();
    this.getPaymentHistory();
  }


  getDuePaymentAccordingToParent() {
    this.loader = true;
    this.paymentDueList = [];
    this.spinner.show();
    const data = {
      'agencyID': this.commonService.getAgencyId(),
      'parentID': this.commonService.getReleventUserId('userdetails'),
      'limit': this.limit,
      'page': this.pageNo
    };
    this.apiService.postData(ParentAPIURLs.GetBalanceAccordingToParent, data, null).subscribe(res => {
      //  this.spinner.hide();
      //this.totalRecord = res.body.totalRows;
      if (res.body.statusCode === 200) {
        this.paymentDueList = res.body.data;
        this.Children = res.body.studentNames;
        console.log(this.Children, 'ttttttttttttttttt');
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

  CheckPaymentType(amount, value) {
    this.offlineReq = {};
    if (amount === 0) {
      this.offlineReq = {
        // client_ip: token.client_ip,
        'tokenID': 0,
        'agencyID': this.commonService.getAgencyId(),
        'parentID': this.commonService.getReleventUserId('userdetails'),
        'studentID': value.studentID,
        // 'Email': token.email,
        'SourceToken': 0,
        'CreatedBy': this.commonService.getReleventUserId('userdetails'),
        'paymentFromDate': value.invoiceFromDate,
        'paymentToDate': value.invoiceToDate,
        'totalAmount': value.totalAmount,
        'InvoiceDetailsID': value.id,
        'IsOffline': true,
        // tslint:disable-next-line:max-line-length
        'AmoutPaid': 0, // this is final amount which will be zero after diduct subsidy or pre applied discount  greater than total fee amount
        'BalanceAmount': 0,
        'CreditAdvanceAmount': 0,
        'SubsidyAmount': value.subsidyAmount,
        'SubsidyDetailsID': value.subsidyDetailsID ? value.subsidyDetailsID : 0,
        'DiscountAmount': value.discountAmount
      };
      $('.offlinepay').modal('show');
    } else {
      this.openCheckout(amount, value);
    }
  }

  openCheckout(amount, value) {
    if (this.balanceAmount == '') {
      this.notification.warning({ message: 'Please enter some Amount To Pay', title: '' });
    } else {
    if (!this.isStripAvailable || !this.activeSubscription) {
      this.notification.warning({ message: 'Please contact agency admin for Payment', title: 'Sorry!' });
    } else {
      //  const amounttopay = amount - value.subsidyAmount;
      const handler = (<any>window).StripeCheckout.configure({
        key: this.stripDetails.stripePublishableKey,
        locale: 'auto',
        token: token => {
          this.spinner.show();
          console.log(token, );
          const model = {
            // client_ip: token.client_ip,
            'tokenID': token.id,
            'agencyID': this.commonService.getAgencyId(),
            'parentID': this.commonService.getReleventUserId('userdetails'),
            'studentID': value.studentID,
            'Email': token.email,
            'SourceToken': token.id,
            'CreatedBy': this.commonService.getReleventUserId('userdetails'),
            'paymentFromDate': value.invoiceFromDate,
            'paymentToDate': value.invoiceToDate,
            'totalAmount': value.totalAmount,
            'AmoutPaid': this.balanceAmount,
            'InvoiceDetailsID': value.id,
            'SubsidyAmount': value.subsidyAmount,
            'SubsidyDetailsID': value.subsidyDetailsID ? value.subsidyDetailsID : 0,
            'IsOffline': false,
            'DiscountAmount': value.discountAmount
          };
          this.apiService.postData(ParentAPIURLs.PaymentDetails, model, null).subscribe(result => {
            if (result.body.statusCode === 200) {
              this.spinner.hide();
              this.getDuePaymentAccordingToParent();
              this.notification.success({ message: 'Payment Successfull!', title: '' });
              this.balanceAmount = '';
            } else {
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
        // tslint:disable-next-line: radix
        amount: parseInt(this.balanceAmount) * 100
      });
      this.globalListener = this.renderer.listenGlobal('window', 'popstate', () => {
        handler.close();
      });
    }
  }
  }

  payOfflineIfAmountZero() {
    this.apiService.postData(ParentAPIURLs.PaymentDetails, this.offlineReq, null).subscribe(result => {
      if (result.body.statusCode === 200) {
        this.spinner.hide();
        this.getDuePaymentAccordingToParent();
        this.notification.success({ message: 'Payment Successfull!', title: '' });
      } else {
        this.spinner.hide();
        this.error.unknownError();
      }
    }, err => {
      this.error.commonError(err);
      this.spinner.hide();
    });
  }

  getPaymentDetails() {
    // this.spinner.show();
    const model = {
      'agencyID': this.commonService.getAgencyId()
    };
    this.apiService.postData(AgencyAPIURLs.GetStripeDetailsForAgency, model, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        if (res.body.data.length !== 0 && res.body.data !== [] && res.body.data) {
          this.stripDetails = res.body.data[0];
        }
        //  this.spinner.hide();
      } else {
        //  this.spinner.hide();
        // this.error.unknownError();
      }
    }, err => {
      //  this.spinner.hide();
      this.error.commonError(err);
    }
    );
  }


  getPaymentHistory() {
    this.loader = true;
    this.paymentHistoryList = [];
    this.spinner.show();
    const model = {
      'agencyID': this.commonService.getAgencyId(),
      'parentID': this.commonService.getReleventUserId('userdetails'),
      'limit': this.limit,
      'page': this.pageNo
    };
    this.apiService.postData(ParentAPIURLs.GetPaymentDetailForParent, model, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.totalRecord = res.body.totalRows;
        if (res.body.data !== null && res.body.data !== [] && res.body.data !== []) {
          res.body.data.forEach(x => {
            x.paymentFromDate = new Date(x.paymentFromDate);
            x.paymentToDate = new Date(x.paymentToDate);
            x.paymentDate = new Date(x.paymentDate);
          });
          this.paymentHistoryList = res.body.data;
          this.loader = false;
        }
        this.spinner.hide();
      }
    }, err => {
      this.spinner.hide();
      this.error.commonError(err);
    }
    );
  }
  paginate(event, tab) {
    this.pageNo = event.page;
    // this.limit = event.page;
    if (tab === 1) {
      this.getPaymentHistory();
    } else {
      this.getDuePaymentAccordingToParent();
    }
  }
  onChangeTab() {
    this.pageNo = 0;
  }

  // For Online Payment

  openOnlineCheckout(amount, value) {
    if (this.balanceAmount == '') {
      this.notification.warning({ message: 'Please enter some Amount To Pay', title: '' });
    } else {
    if (!this.isStripAvailable || !this.activeSubscription) {
      this.notification.warning({ message: 'Please contact agency admin for Payment', title: 'Sorry!' });
    } else {
      //  const amounttopay = amount - value.subsidyAmount;
      const handler = (<any>window).StripeCheckout.configure({
        key: this.stripDetails.stripePublishableKey,
        locale: 'auto',
        token: token => {
          this.spinner.show();
          console.log(token, );
          const model = {
            // client_ip: token.client_ip,
            'tokenID': token.id,
            'agencyID': this.commonService.getAgencyId(),
            'parentID': this.commonService.getReleventUserId('userdetails'),
            'Email': token.email,
            'SourceToken': token.id,
            'CreatedBy': this.commonService.getReleventUserId('userdetails'),
            'AmoutPaid': this.balanceAmount,
            'IsOffline': false
          };
          this.apiService.postData(ParentAPIURLs.PayPayment, model, null).subscribe(result => {
            if (result.body.statusCode === 200) {
              this.spinner.hide();
              this.getDuePaymentAccordingToParent();
              this.notification.success({ message: 'Payment Successfull!', title: '' });
              this.balanceAmount = '';
            } else {
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
        // tslint:disable-next-line: radix
        amount: parseInt(this.balanceAmount) * 100
      });
      this.globalListener = this.renderer.listenGlobal('window', 'popstate', () => {
        handler.close();
      });
    }
  }
  }

}
