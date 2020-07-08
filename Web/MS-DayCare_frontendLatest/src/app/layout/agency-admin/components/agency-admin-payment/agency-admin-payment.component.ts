import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AgencyApiService } from '../shared/services/agency-api-service/agency-api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from '../../../../shared/services/notification-service/notification.service';
import { CommonService } from '../../../../shared/services/common/common.service';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { AgencyAPIURLs } from '../shared/constatant';
import { ErrorHandlerService } from '../../../../shared/services/error-handler/error-handler.service';
import { ParentAPIURLs } from '../../../parent/shared/constant';
import { Paginator } from 'primeng/paginator';
import { TeacherAPIURLs } from 'src/app/layout/teacher/shared/constant';
import { DailySheetList } from 'src/app/layout/teacher/shared/view-model/daily-activityVM';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { StripClintID } from 'src/app/shared/constdata';
declare var $: any;
@Component({
  selector: 'app-agency-admin-payment',
  templateUrl: './agency-admin-payment.component.html',
  styleUrls: ['./agency-admin-payment.component.css']
})
export class AgencyAdminPaymentComponent implements OnInit {
  transactionForm: FormGroup;
  authCode: any;
  showBtnCreateAcc = false;
  paymentHistoryList: any[] = [];
  paymentDueList: any[] = [];
  trasactionTypeList: any[] = [];
  trasactionMasterList: any[] = []; // for dropdown
  transMasterList: any[] = []; // for listing
  count = 0;
  pageNo = 0;
  limit = 10;
  totalRecord = 0;
  typeid = 0;
  loader = true;
  description: string;
  transactionTypeID = 0;
  transFieldCount = 0;
  tempTransArry: any[] = [];
  items: FormArray;
  displayTransList: any[] = [];
  editTransForm: FormGroup;
  selectedStudentId: number;
  invoiceNo: string;
  clearItems: FormArray;
  totalAmount: number;
  generatedTutionFee: number; // fees with subsidy added
  invoiceFromDate: any;
  invoiceToDate: any;
  paymentMethodForm: FormGroup;
  showFildName = 'cash';
  discountAmount = 0;
  paymentDetails: any[];
  paymentHistoryDetails: PaymentHistoryDetails = {};
  DebitCard = 'Debit Card';
  CreditCard = 'Credit Card';
  extraChargeName = '';
  getExtraFeesChargeList: any[] = [];
  showExtraFeesForm = false;
  searchByClass = '';
  searchByStudentName = '';
  extraFeesDetailsArray: any[] = [];
  studentList: DailySheetList[] = [];
  studentListId: BulkStudentFees[] = [];
  markAllStudents = false;
  agencyId: number;
  fromCalDate: any;
  toCalDate: any;
  clearDate: any;
  balanceAmount = 0;
  actualBalanceAmount = 0;
  useBalanceAmount = false;
  amountToPay: any;
  colm = 4;
  variablePayAmoount = 0;
  debitAdvanceAmount = 0;
  isPartialpayment = false;
  partialAmount = 0;
  subsidyAmount = 0;
  originalFee = 0; // fee without subsidy added
  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  noNeedAdvancebalence = false;
  disabledTotlAmount = false;
  subsidyDetailsID = 0;
  stripClintID: string;
  searchByParentName = '';
  parentListToSendBalance: any[] = [];
  fromDate: any;
  toDate: any;
  blankDate: any;
  reportList: any[] = [];
  studentReportList: any[] = [];
  // @ViewChild('pagiHistory') paginator: Paginator;
  // @ViewChild('DueList') duePagintor: Paginator;
  //@ViewChild('addfees') addfeesPaginator: Paginator;
  // @ViewChild('sndbalancList') sndbalancePaginator: Paginator;

  constructor(private activatedRoute: ActivatedRoute, private apiService: AgencyApiService, private error: ErrorHandlerService,
    private spinner: NgxSpinnerService, private notification: NotificationService,
    public commonService: CommonService, private fb: FormBuilder,
    private confirmationService: ConfirmationService, private router: Router) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.authCode = params['code'];
    });
    this.agencyId = this.commonService.getAgencyId();
    this.stripClintID = StripClintID.ClientID;
  }

  ngOnInit() {
    this.dpConfig = Object.assign({}, { containerClass: 'theme-dark-blue' }, { showWeekNumbers: false });
    this.searchByParentName = '';
    this.getLedgerReport();
    this.pushSingleArryForTransHead();
    this.createPaymentMethodForm();
    this.getPaymentDetails();
    this.getPaymentHistory();
    this.getTrasactionTypeList();
    this.getTransactionMasterDetails();
    this.getExtraFeesChargeMaster();
    this.newEditFormBuild();
    this.createTransMaster();
  }

  getParentsListForSendBalance() {
    this.loader = true;
    this.paymentDueList = [];
    this.spinner.show();
    const model = {
      'agencyID': this.commonService.getAgencyId(),
      'limit': this.limit,
      'page': this.pageNo,
      'ParentName': this.searchByParentName
    };
    this.apiService.postData(AgencyAPIURLs.GetParentsListForSendBalance, model, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.totalRecord = res.body.totalRows;
        if (res.body.data !== null && res.body.data !== [] && res.body.data !== []) {
          res.body.data.forEach(x => {
            x.invoiceFromDate = new Date(x.invoiceFromDate);
            x.invoiceToDate = new Date(x.invoiceToDate);
          });
          this.parentListToSendBalance = res.body.data;
        }
        this.spinner.hide();
        this.loader = false;
      }
    }, err => {
      this.spinner.hide();
      this.error.commonError(err);
    }
    );
  }

  // method to send due payment (balance) by email to parent
  sendDueBalanceByMail(data) {
    this.paymentDueList = [];
    this.spinner.show();
    const model = {
      'agencyID': this.commonService.getAgencyId(),
      'parentID': data.parentID
    };
    this.apiService.postData(AgencyAPIURLs.GetDuePaymentAccordingToParentAgency, model, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.notification.success({ message: 'Mail sent to your registered email!', title: 'Sent' });
        this.spinner.hide();
      } else {
        this.notification.warning({ message: res.body.message, title: '' });
        this.spinner.hide();
      }
    }, err => {
      this.spinner.hide();
      this.error.commonError(err);
    }
    );
  }





  pushSingleArryForTransHead() {
    this.tempTransArry = [
      {
        'id': 1,
        'transactionTypeID': '',
        'studentID': '',
        'description': '',
        'amount': ''
      }
    ];
    this.displayTransList.push(this.tempTransArry);
  }

  createTransMaster() {
    this.transactionForm = this.fb.group({
      transcationtype: ['', Validators.required],
      transdescription: ['', Validators.required]
    });
  }


  createPaymentMethodForm() {
    this.paymentMethodForm = this.fb.group({
      paymenttype: ['', Validators.required],
      chequeno: [''],
      cardno: [''],
      amount: [''],
      subsidy: ['']
    });
  }

  newEditFormBuild() {
    this.editTransForm = this.fb.group({
      transArraycollection: this.fb.array([this.createItem()])
    });
  }

  get f() { return this.transactionForm.controls; }

  get p() { return this.paymentMethodForm.controls; }

  /** method for Form array for transaction items */
  createItem(): FormGroup {
    return this.fb.group({
      transactionTypeID: [''],
      studentID: [''],
      description: [''],
      amount: ['']
    });
  }



  /** Method to add new transaction into form array while edit payment*/
  addTrans() {
    this.transFieldCount++;
    this.tempTransArry.push({ 'id': this.transFieldCount });
    this.items = this.editTransForm.get('transArraycollection') as FormArray;
    this.items.push(this.createItem());
    this.displayTransList = this.tempTransArry;
  }

  /**Remove trans heads on minus button */
  removeFood(data) {
    const index = this.displayTransList.findIndex(r => r.id === data.id);
    this.items = this.editTransForm.get('transArraycollection') as FormArray;
    this.items.removeAt(index);
    this.displayTransList.splice(index, 1);
  }


  verifyEditTransaction() {
    this.saveHeadTransaction();
  }


  /**To create dynamic trasaction master list for discription drop down */
  pushValues() {
    const tempArray: any[] = [];
    this.trasactionMasterList.push(tempArray);
  }

  /** Get master transaction  master list for dropdown by API */
  getTrasactionMasterList(value, i) {
    this.trasactionMasterList[i] = [];
    this.pushValues();
    const req = {
      'TransactionTypeID': value,
    };
    this.apiService.postData(AgencyAPIURLs.GetTransactionMaster, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.trasactionMasterList[i] = res.body.data;
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



  /** Save Payment heads and subheads for perticuler student */
  saveHeadTransaction() {
    const transArrayReq: any[] = [];
    this.spinner.show();
    if (this.validateEditPaymentForm()) {
      this.spinner.hide();
      this.notification.warning({ message: 'Please enter valid data', title: '' });
    } else {
      if (this.items.value.length !== 0 && this.items !== undefined) {
        this.items.value.forEach(element => {
          transArrayReq.push({
            'id': 0,
            'transactionTypeID': element.transactionTypeID,
            'studentID': this.selectedStudentId,
            'description': element.description,
            'amount': element.amount,
            'agencyID': this.agencyId,
            'invoiceFromDate': this.invoiceFromDate,
            'invoiceToDate': this.invoiceToDate,
            'invoiceNo': this.invoiceNo,
            'totalAmount': this.totalAmount
          });
        });
      }

      this.apiService.postData(AgencyAPIURLs.SaveTransactionDetailsInfo, transArrayReq, null).subscribe(res => {
        if (res.body.statusCode === 200) {
          this.notification.success({ message: 'Transaction Details has been saved', title: '' });
          this.getDuePaymentAccordingToAgency();
          $('.editpayment').modal('hide');
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

  /**Method to check validation for edit payment form */
  validateEditPaymentForm() {
    let status = false;
    if (this.items.value.length !== 0 && this.items !== undefined) {
      this.items.value.forEach(element => {
        if (element.transactionTypeID !== '' && element.amount !== '') {
          status = false;
        } else {
          status = true;
        }
      });
    }
    return status;
  }


  getPaymentDetails() {
    //this.spinner.show();
    debugger;
    const model = {
      'agencyID': this.commonService.getAgencyId()
    };
    this.apiService.postData(AgencyAPIURLs.GetStripeDetailsForAgency, model, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        if (res.body.data === [] || res.body.data === null || res.body.data.length === 0) {
          this.showBtnCreateAcc = true;
          if (this.authCode) {
            this.confirm();
          }
        } else {
          this.showBtnCreateAcc = false;
        }
        //this.spinner.hide();
      } else {
        //this.spinner.hide();
        this.error.unknownError();
      }
    }, err => {
      //this.spinner.hide();
      this.error.commonError(err);
    }
    );
  }



  confirm() {
    this.spinner.show();
    const model = {
      'code': this.authCode,
      'agencyID': this.commonService.getAgencyId(),
      'currentUserId': this.commonService.getReleventUserId('userdetails')
    };
    this.apiService.postData(AgencyAPIURLs.CreateStripeAccount, model, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.showBtnCreateAcc = false;
        this.notification.success({ message: 'Strip account has been created successfully!', title: '' });
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

  getDuePaymentAccordingToAgency() {
    this.loader = true;
    this.paymentDueList = [];
    this.spinner.show();
    const model = {
      'agencyID': this.commonService.getAgencyId(),
      'limit': this.limit,
      'page': this.pageNo,
      'studentName': this.searchByStudentName
    };
    this.apiService.postData(AgencyAPIURLs.GetDuePaymentAccordingToAgency, model, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.totalRecord = res.body.totalRows;
        if (res.body.data !== null && res.body.data !== [] && res.body.data !== []) {
          res.body.data.forEach(x => {
            x.invoiceFromDate = new Date(x.invoiceFromDate);
            x.invoiceToDate = new Date(x.invoiceToDate);
          });
          this.paymentDueList = res.body.data;
        }
        this.spinner.hide();
        this.loader = false;
      }
    }, err => {
      this.spinner.hide();
      this.error.commonError(err);
    }
    );
  }

  getLedgerReport() {
    this.loader = true;
    this.reportList = [];
    this.spinner.show();
    const data = {
      'agencyID': this.commonService.getAgencyId(),
      'ParentName': this.searchByParentName,
      'page': this.pageNo,
      'limit': this.limit,
      'fromDate': this.fromDate ? this.fromDate : this.blankDate,
      'toDate': this.toDate ? this.toDate : this.blankDate,
    };
    this.apiService.postData(AgencyAPIURLs.GetParentLedger, data, null).subscribe(res => {
      this.totalRecord = res.body.totalRows;
      if (res.body.statusCode === 200) {
        this.spinner.hide();
        this.reportList = res.body.data;
        console.log(this.reportList, '  testtttttttt');

      } else {
        this.spinner.hide();
        this.error.unknownError();
      }
      this.loader = false;
    }, err => {
      this.spinner.hide();
      this.error.commonError(err);
    });
  }



  getPaymentHistory() {
    this.loader = true;
    this.paymentHistoryList = [];
    //this.spinner.show();
    const model = {
      'agencyID': this.commonService.getAgencyId(),
      'limit': this.limit,
      'page': this.pageNo,
      'studentName': this.searchByStudentName,
    };
    this.apiService.postData(AgencyAPIURLs.GetPaymentDetailsForAgency, model, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.totalRecord = res.body.totalRows;
        if (res.body.data !== null && res.body.data !== [] && res.body.data !== []) {
          res.body.data.forEach(x => {
            x.paymentFromDate = new Date(x.paymentFromDate);
            x.paymentToDate = new Date(x.paymentToDate);
            x.paymentDate = new Date(x.paymentDate);
          });
          this.paymentHistoryList = res.body.data;
        }
        //this.spinner.hide();
        this.loader = false;
      }
    }, err => {
      //this.spinner.hide();
      this.error.commonError(err);
    }
    );
  }


  invoiceSchedular() {
    const model = {
      'Frequency': 'Weekly'
    };
    this.apiService.postData(AgencyAPIURLs.InvoiceSchedular, model, null).subscribe(res => {
      if (res.body.statusCode === 200) {
      }
    }, err => {
    }
    );
  }

  paginate(event, tab) {
    this.markAllStudents = false;
    this.studentListId = [];
    this.pageNo = event.page;
    if (tab === 1) {
      this.getLedgerReport();
    } else if (tab === 2) {
      this.getPaymentHistory();
    } else if (tab === 3) {
      this.getDuePaymentAccordingToAgency();
    } else if (tab === 4) {
      this.getStudentsList();
    } else {
      this.getParentsListForSendBalance();
    }
  }



  // onTabChangeHistory(event) {
  //   this.studentListId = [];
  //   this.markAllStudents = false;
  //   this.searchByStudentName = '';
  //   this.totalRecord = 0;
  //   this.pageNo = 0;
  //   this.paginator.changePageToFirst(event);
  //   this.duePagintor.changePageToFirst(event);
  //   this.addfeesPaginator.changePageToFirst(event);
  //   this.sndbalancePaginator.changePageToFirst(event);
  //   this.getPaymentDetails();
  //   this.getPaymentHistory();
  // }

  // onTabChangeDue(event) {
  //   this.studentListId = [];
  //   this.markAllStudents = false;
  //   this.searchByStudentName = '';
  //   this.searchByParentName = '';
  //   this.totalRecord = 0;
  //   this.pageNo = 0;
  //   this.paginator.changePageToFirst(event);
  //   this.duePagintor.changePageToFirst(event);
  //   this.addfeesPaginator.changePageToFirst(event);
  //   this.sndbalancePaginator.changePageToFirst(event);
  //   this.getDuePaymentAccordingToAgency();
  // }

  // onTabChangeAddFees(event) {
  //   console.log(event , 'Add Fees');
  //   this.studentListId = [];
  //   this.markAllStudents = false;
  //   this.searchByStudentName = '';
  //   this.searchByParentName = '';
  //   this.totalRecord = 0;
  //   this.pageNo = 0;
  //   // this.paginator.changePageToFirst(event);
  //   // this.duePagintor.changePageToFirst(event);
  //   this.addfeesPaginator.changePageToFirst(event);
  //   // this.sndbalancePaginator.changePageToFirst(event);
  //   this.getStudentsList();
  // }

  // onTabSendBalance(event) {
  //   this.studentListId = [];
  //   this.markAllStudents = false;
  //   this.searchByStudentName = '';
  //   this.searchByParentName = '';
  //   this.totalRecord = 0;
  //   this.pageNo = 0;
  //   this.paginator.changePageToFirst(event);
  //   this.duePagintor.changePageToFirst(event);
  //   this.addfeesPaginator.changePageToFirst(event);
  //   this.sndbalancePaginator.changePageToFirst(event);
  //   this.getParentsListForSendBalance();
  // }

  onTabPaymentLedger(event) {
    this.studentListId = [];
    this.markAllStudents = false;
    this.searchByStudentName = '';
    this.searchByParentName = '';
    this.totalRecord = 0;
    this.pageNo = 0;
    this.searchByParentName = '';
    // this.paginator.changePageToFirst(event);
    // this.duePagintor.changePageToFirst(event);
    //this.addfeesPaginator.changePageToFirst(event);
    // this.sndbalancePaginator.changePageToFirst(event);
    this.getLedgerReport();
  }


  // this method use to check validation before paymnet done.
  payFinalAmount() {
    const value = +   this.paymentMethodForm.controls.amount.value;
    if (this.paymentMethodForm.valid) {
      if (!isNaN(value)) {
        this.isPartialpayment = false;
        // if balance amount is used START
        if (this.useBalanceAmount && (this.actualBalanceAmount < this.generatedTutionFee)) {
          const amountAfterBalanceUsed = + (this.generatedTutionFee - this.actualBalanceAmount).toFixed(2);
          this.debitAdvanceAmount = this.actualBalanceAmount;
          if (value > amountAfterBalanceUsed) {
            this.notification.warning({
              message: 'You have enter more amount than required ',
              title: 'Required amount:' + amountAfterBalanceUsed
            });
          } else if (value <= 0 || value > this.generatedTutionFee) {
            this.notification.warning({ message: 'Amount should be less than payment Amount or greater than 0', title: '' });
          } else if (amountAfterBalanceUsed > value) {
            this.isPartialpayment = true;  // this is partial payment
            this.partialAmount = this.generatedTutionFee - (value + this.actualBalanceAmount);
            this.payOffline(this.paymentDetails);
          } else {
            this.payOffline(this.paymentDetails);
          }
        } else if (this.useBalanceAmount && (this.actualBalanceAmount >= this.generatedTutionFee)) {
          this.isPartialpayment = false;
          this.debitAdvanceAmount = this.generatedTutionFee;
          this.paymentMethodForm.controls['amount'].setValue(0);
          this.paymentMethodForm.controls['amount'].updateValueAndValidity();
          this.payOffline(this.paymentDetails);
        } else { // if balance amount is NOT used START
          this.isPartialpayment = false;
          this.debitAdvanceAmount = 0;
          if (this.disabledTotlAmount) { /** if subsidy amount is greater or equal to payment amount */
            this.payOffline(this.paymentDetails);
          } else { /**if subsidy amount is less than payment amount */
            if ((value > this.generatedTutionFee
              || value < 1)) {
              this.notification.warning({ message: 'Amount should be less than Payment Amount or greater than 0', title: '' });
            } else if (value < this.generatedTutionFee) {
              this.isPartialpayment = true;
              this.partialAmount = this.generatedTutionFee - value;
              this.payOffline(this.paymentDetails);
            } else {
              this.payOffline(this.paymentDetails);
            }
          }
        }
      } else {
        this.spinner.hide();
        this.notification.warning({ message: 'Please enter valid amount ', title: '' });
      }
    } else {
      this.spinner.hide();
      this.commonService.validateAllFields(this.paymentMethodForm);
    }
  }

  payOffline(value) {
    this.confirmationService.confirm({
      message: 'Do you want to proceed for this offline payment?',
      accept: () => {
        this.paymentSuccess(value);
      }
    });
  }

  paymentSuccess(value) {
    this.spinner.show();
    const model = {
      'tokenID': 0,
      'agencyID': this.commonService.getAgencyId(),
      'parentID': value.parentID,
      'studentID': value.studentID,
      'SourceToken': 0,
      'CreatedBy': this.commonService.getReleventUserId('userdetails'),
      'paymentFromDate': value.invoiceFromDate.toDateString(),
      'paymentToDate': value.invoiceToDate.toDateString(),
      'totalAmount': value.totalAmount,
      'InvoiceDetailsID': value.id,
      'IsOffline': true,
      'ChequeNo': this.paymentMethodForm.controls.chequeno.value,
      'CardNo': this.paymentMethodForm.controls.cardno.value,
      'AmoutPaid': this.paymentMethodForm.controls.amount.value,
      'BalanceAmount': 0,
      'DiscountAmount': value.discountAmount,
      'PaymentType': this.paymentMethodForm.controls.paymenttype.value,
      'DebitAdvanceAmount': this.debitAdvanceAmount,
      'CreditAdvanceAmount': 0,
      'BalanceAdvanceAmount': this.balanceAmount, // for advace payment
      'IsBalaceAmountused': this.useBalanceAmount,
      'IsPartialPayment': this.isPartialpayment,
      'PartialAmount': this.partialAmount,
      'SubsidyAmount': this.subsidyAmount,
      'SubsidyDetailsID': this.subsidyDetailsID ? this.subsidyDetailsID : 0
    };
    this.apiService.postData(ParentAPIURLs.PaymentDetails, model, null).subscribe(result => {
      if (result.body.statusCode === 200) {
        $('.paymentmethod').modal('hide');
        this.getDuePaymentAccordingToAgency();
        this.notification.success({ message: 'Payment Successfull!', title: '' });
      } else {
        this.spinner.hide();
        this.error.unknownError();
      }
    }, err => {
      this.error.commonError(err);
      this.spinner.hide();
    }
    );
  }


  getTrasactionTypeList() {
    this.trasactionTypeList = [];
    const req = {
      'AgencyID': 0,
    };
    this.apiService.postData(AgencyAPIURLs.GetTransactionType, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.trasactionTypeList = res.body.data;
        //this.spinner.hide();
      } else {
        //this.spinner.hide();
        this.error.unknownError();
      }
    }, err => {
      //this.spinner.hide();
      this.error.commonError(err);
    }
    );
  }


  saveTransMasterInformation() {
    this.spinner.show();
    if (this.transactionForm.valid) {
      const data = {
        'agencyID': this.commonService.getAgencyId(),
        'TransactionTypeID': this.transactionForm.controls.transcationtype.value,
        'Description': this.transactionForm.controls.transdescription.value
      };
      this.apiService.postData(AgencyAPIURLs.SaveTransactionMasterInfo, data, null).subscribe(res => {
        if (res.body.statusCode === 200) {
          $('.addtransactiontype').modal('hide');
          this.notification.success({ message: 'Transaction master added successfully', title: '' });
          this.spinner.hide();
        } else if (res.body.statusCode === 987) {
          this.notification.warning({ message: 'Already Exist', title: '' });
          this.spinner.hide();
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
      this.notification.warning({ message: 'Please enter valid data', title: '' });
    }
  }

  getTransactionMasterDetails() {
    this.transMasterList = [];
    const req = {
      'AgencyID': 0,
    };
    this.apiService.postData(AgencyAPIURLs.GetTransactionMasterDetails, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.transMasterList = res.body.data;
        //this.spinner.hide();
      } else {
        //this.spinner.hide();
        this.error.unknownError();
      }
    }, err => {
      //this.spinner.hide();
      this.error.commonError(err);
    }
    );

  }

  /**To clear Transition master form */
  clearTransMasterForm() {
    this.createTransMaster();
  }

  /**Clear Trans head form method */
  clearTranHeadForm() {
    this.totalAmount = 0;
    this.displayTransList = [];
    this.items = this.clearItems;
    this.newEditFormBuild();
    this.items = this.editTransForm.get('transArraycollection') as FormArray;
    this.pushSingleArryForTransHead();
  }


  clearPaymentForm() {
    this.isPartialpayment = false;
    this.useBalanceAmount = false;
    this.totalAmount = 0;
    this.displayTransList = [];
    this.items = this.clearItems;
    this.newEditFormBuild();
    this.items = this.editTransForm.get('transArraycollection') as FormArray;
    this.pushSingleArryForTransHead();
    this.createPaymentMethodForm();
  }

  getPaymentType() {
    if (this.paymentMethodForm.controls.paymenttype.value === 'Check') {
      this.showFildName = 'cheque';
    } else if (this.paymentMethodForm.controls.paymenttype.value === 'Debit Card' ||
      this.paymentMethodForm.controls.paymenttype.value === 'Credit Card') {
      this.showFildName = 'card';
    } else {
      this.showFildName = 'cash';
    }
  }

  /**Methos to calculate discount amount  */
  addDiscount() {
    this.discountAmount = 0;
    this.totalAmount = this.generatedTutionFee;
    if (this.paymentMethodForm.controls.subsidy.value) {
      const discountpercentage = + this.paymentMethodForm.controls.subsidy.value;
      const totlFee = + this.generatedTutionFee;
      this.discountAmount = (totlFee * (discountpercentage / 100));
      this.discountAmount = + this.discountAmount.toFixed(2);
      this.totalAmount = this.totalAmount - this.discountAmount;
      this.paymentMethodForm.controls['amount'].setValue(this.totalAmount);
      this.paymentMethodForm.controls['amount'].updateValueAndValidity();
    } else {
      this.totalAmount = this.generatedTutionFee;
      this.paymentMethodForm.controls['amount'].setValue(this.totalAmount);
      this.paymentMethodForm.controls['amount'].updateValueAndValidity();
    }
  }


  getStudentDetails(data) {
    this.paymentDetails = data;
    if (data) {
      this.subsidyDetailsID = data.subsidyDetailsID;
      this.actualBalanceAmount = data.advancePaymentBalanceAmount;
      this.originalFee = data.totalAmount;
      this.balanceAmount = data.advancePaymentBalanceAmount;
      this.amountToPay = data.totalAmount;
      this.subsidyAmount = data.subsidyAmount;
      if (this.originalFee <= this.subsidyAmount) {
        this.disabledTotlAmount = true;
        this.noNeedAdvancebalence = true;
      } else {
        this.disabledTotlAmount = false;
        this.noNeedAdvancebalence = false;
      }
      if (data.totalAmount <= data.subsidyAmount) {
        this.variablePayAmoount = 0; // data.subsidyAmount - data.totalAmount;
        this.generatedTutionFee = 0; // data.subsidyAmount - data.totalAmount;
        this.amountToPay = 0;
      } else {
        this.variablePayAmoount = data.totalAmount - data.subsidyAmount;
        this.generatedTutionFee = data.totalAmount - data.subsidyAmount;
        this.amountToPay = this.variablePayAmoount;
      }
      this.selectedStudentId = data.studentID;
      this.invoiceNo = data.invoiceNo;
      this.paymentMethodForm.controls['amount'].setValue(this.variablePayAmoount);
      this.paymentMethodForm.controls['amount'].updateValueAndValidity();
      this.invoiceFromDate = new Date(data.invoiceFromDate).toDateString();
      this.invoiceToDate = new Date(data.invoiceToDate).toDateString();
    }
  }


  getPaymentHistoryDetails(data) {
    if (data) {
      this.paymentHistoryDetails.amoutPaid = data.amoutPaid;
      this.paymentHistoryDetails.discountAmount = data.discountAmount;
      this.paymentHistoryDetails.totalAmount = data.totalAmount;
      this.paymentHistoryDetails.paymentType = data.paymentType;
      this.paymentHistoryDetails.chequeNo = data.chequeNo;
      this.paymentHistoryDetails.cardNo = data.cardNo;
      this.paymentHistoryDetails.subsidyAmount = data.subsidyAmount;
    }

  }

  saveExtraFeesInfoInformation() {
    this.extraChargeName = this.extraChargeName.trim();
    if (this.extraChargeName === '' || this.extraChargeName === undefined && this.extraChargeName === null) {
      this.notification.warning({ message: 'Please enter valid data', title: '' });
    } else {
      this.spinner.show();
      const data = {
        'agencyID': this.commonService.getAgencyId(),
        'ExtraChargeName': this.extraChargeName
      };
      this.apiService.postData(AgencyAPIURLs.SaveExtraChargeFeeMasterInfo, data, null).subscribe(res => {
        if (res.body.statusCode === 200) {
          $('.extracharge').modal('hide');
          this.notification.success({ message: 'New Fees Type added successfully', title: '' });
          this.spinner.hide();
        } else {
          this.spinner.hide();
          this.error.unknownError();
        }
      }, err => {
        this.spinner.hide();
        this.error.commonError(err);
      });
    }
  }

  clearFeesType() {
    this.extraChargeName = '';
  }

  getExtraFeesChargeMaster() {
    this.getExtraFeesChargeList = [];
    const req = {
      'AgencyID': this.commonService.getAgencyId(),
    };
    this.apiService.postData(AgencyAPIURLs.GetExtraFeeChargeMasterList, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.getExtraFeesChargeList = res.body.data;
        //this.spinner.hide();
      } else {
        //this.spinner.hide();
        this.error.unknownError();
      }
    }, err => {
      //this.spinner.hide();
      this.error.commonError(err);
    }
    );
  }

  showHideExtraCharge() {
    this.showExtraFeesForm = !this.showExtraFeesForm;
  }

  calculateTotleAmount() {
  }



  addExtraFees() {
  }

  /**  Add fees Tab */


  /** method to go add fees page */
  goToAddFees(values) {

    const navigationExtras: NavigationExtras = {
      queryParams: {
        'parentId': values.parentID,
        'studentId': values.studentId,
        'studentName': values.studentName,
        'parentName': values.parentName,
        'clasessId': values.classesId,
        'categoryId': values.categoryID,
        'categoryname': values.categoryName,
      }
    };

    this.router.navigate(['./home/agencydashboard/addfees'], navigationExtras);

  }

  getStudentsList() {
    this.loader = true;
    this.markAllStudents = false;
    this.studentList = [];
    this.spinner.show();
    const data = {
      'agencyID': this.commonService.getAgencyId(),
      'classID': this.searchByClass,
      'studentID': 0,
      'studentName': this.searchByStudentName,
      'page': this.pageNo,
      'limit': this.limit,
    };

    this.apiService.postData(TeacherAPIURLs.GetAllStudents, data, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.totalRecord = res.body.totalRows;
        this.spinner.hide();
        this.studentList = res.body.data;
        this.loader = false;
      } else {
        this.spinner.hide();
        this.error.unknownError();
      }
    }, err => {
      this.spinner.hide();
      this.error.commonError(err);
    });

  }

  keyDownFunction(event, no) {
    debugger;
    if (event.keyCode === 13) {
      if (no === 2) {
        this.getDuePaymentAccordingToAgency();
      } else if (no === 3) {
        this.getStudentsList();
      } else if (no === 1) {
        this.getLedgerReport();
      } else {
        this.getParentsListForSendBalance();
      }
      // rest of your code
    }
  }

  getSingleMarkedStudent(value, event) {
    const classarr = this.convertClassArray(value.classesId);
    this.markAllStudents = false;
    if (event.target.checked === true) {
      if (this.studentListId.length === 0) {
        this.studentListId.push({
          StudentID: value.studentId, ClassesID: classarr, CategoryID: value.categoryID, AgencyID: this.agencyId,
          ParentID: value.parentID
        });
        const no = this.studentList.findIndex(r => r.studentId === value.studentId);
        if (no !== -1) {
          this.studentList[no].isMarked = true;
        }
      } else {
        const index = this.studentListId.findIndex(r => r === value.studentId);
        if (index === -1) {
          this.studentListId.push({
            StudentID: value.studentId, ClassesID: classarr, CategoryID: value.categoryID, AgencyID: this.agencyId,
            ParentID: value.parentID
          });
          const no = this.studentList.findIndex(r => r.studentId === value.studentId);
          if (no !== -1) {
            this.studentList[no].isMarked = true;
          }
        }
      }
    } else if (event.target.checked === false) {
      if (this.studentListId.length > 0) {
        const index = this.studentListId.findIndex(r => r.StudentID === value.studentId);
        this.studentListId.splice(index, 1);
        const no = this.studentList.findIndex(r => r.studentId === value.studentId);
        if (no !== -1) {
          this.studentList[no].isMarked = false;
        }
      }
    }
  }

  /**Get student id using checkbox */
  getAllMarkedStudents(event, students) {
    if (event.target.checked === true) {
      this.studentListId = [];
      students.forEach(data => {
        let classarr: any[] = [];
        classarr = this.convertClassArray(data.classesId);
        this.studentListId.push({
          StudentID: data.studentId, ClassesID: classarr,
          CategoryID: data.categoryID, AgencyID: this.agencyId, ParentID: data.parentID
        });
        data.isMarked = true;
      });
    } else {
      this.studentListId = [];
      students.forEach(element => {
        element.isMarked = false;
      });
    }
  }

  // method to convert string to number array
  convertClassArray(str: string) {
    if (str) {
      let intArray: any[] = [];
      intArray = str.split(',');
      const temparr: any[] = [];
      intArray.forEach(res => {
        temparr.push(parseInt(res, 10));
      });
      return temparr;
    }
  }

  openBultCalForm() {
    this.fromCalDate = this.clearDate;
    this.toCalDate = this.clearDate;
    if (this.studentListId.length < 1) {
      this.notification.warning({ message: 'please select student', title: '' });
    } else {
      $('.bulkCal').modal('show');
    }
  }


  saveBulkCalculation() {
    if (this.fromCalDate && this.toCalDate) {
      if (this.fromCalDate.setHours(0, 0, 0) > this.toCalDate.setHours(0, 0, 0)) {
        this.notification.warning({ message: 'From Date should be less than To Date', title: '' });
      } else {
        this.successSaveBulkCalculation();
      }
    } else {
      this.notification.warning({ message: 'Please select date(s)', title: '' });
    }
  }

  successSaveBulkCalculation() {
    this.studentListId.forEach(data => {
      data.FromDate = this.fromCalDate.toDateString();
      data.ToDate = this.toCalDate.toDateString();
    });

    const bulk = {
      'BulkCalVM': this.studentListId
    };

    this.apiService.postData(AgencyAPIURLs.BulkFeeCalculation, bulk, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.markAllStudents = false;
        $('.bulkCal').modal('hide');
        this.getStudentsList();
        this.spinner.hide();
      } else {
        this.spinner.hide();
        this.error.unknownError();
      }
    }, err => {
      this.spinner.hide();
      this.error.commonError(err);
    });

  }

  // Method to use  balace amount (credit amount) for payment
  moveBalance() {
    if (this.useBalanceAmount === true) {
      if (this.actualBalanceAmount >= this.generatedTutionFee) {
        this.disabledTotlAmount = true;
        this.balanceAmount = this.actualBalanceAmount - this.generatedTutionFee;
        this.amountToPay = 0; // no need to pay because balance amount is enough to pay
        this.paymentMethodForm.controls['amount'].setValue(this.amountToPay);
        this.paymentMethodForm.controls['amount'].updateValueAndValidity();
      } else {
        this.disabledTotlAmount = false;
        this.amountToPay = (this.generatedTutionFee - this.actualBalanceAmount).toFixed(2);
        this.balanceAmount = 0;
        this.paymentMethodForm.controls['amount'].setValue(this.amountToPay);
        this.paymentMethodForm.controls['amount'].updateValueAndValidity();
      }
    } else {
      this.disabledTotlAmount = false;
      this.paymentMethodForm.controls['amount'].setValue(this.generatedTutionFee);
      this.paymentMethodForm.controls['amount'].updateValueAndValidity();
      this.amountToPay = this.generatedTutionFee;
      this.balanceAmount = this.actualBalanceAmount;
    }
  }

  calculateAmountToPay() {
    this.amountToPay = + this.paymentMethodForm.controls.amount.value;
  }

}


export interface PaymentHistoryDetails {
  paymentType?: string;
  totalAmount?: number;
  amoutPaid?: number;
  discountAmount?: number;
  cardNo?: number;
  chequeNo?: number;
  subsidyAmount?: number;
}


export interface BulkStudentFees {
  CategoryID?: number;
  ClassesID?: any[];
  StudentID?: number;
  AgencyID?: number;
  FromDate?: any;
  ToDate?: any;
  ParentID?: number;
}


