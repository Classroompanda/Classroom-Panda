import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorHandlerService } from '../../../../shared/services/error-handler/error-handler.service';
import { CommonService } from '../../../../shared/services/common/common.service';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { NotificationService } from '../../../../shared/services/notification-service/notification.service';
import { AgencyApiService } from '../shared/services/agency-api-service/agency-api.service';
import { AgencyAPIURLs } from '../shared/constatant';
import { PostLedgerVM } from '../../../agency-admin/components/shared/view-model/AddClassesVM';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { environment } from 'src/environments/environment';
declare var $: any;
@Component({
  selector: 'app-agency-admin-payment-ledger',
  templateUrl: './agency-admin-payment-ledger.component.html',
  styleUrls: ['./agency-admin-payment-ledger.component.css']
})
export class AgencyAdminPaymentLedgerComponent implements OnInit {
  id = 0;
  parentId = 0;
  pageIndex = 1;
  reqParentId = 0;
  studentName = '';
  loader = true;
  agencyId: any;
  searchByStudentName = '';
  studentReportList: any[] = [];
  fromDate: any;
  toDate: any;
  blankDate: any;
  parentName: any;
  lastName: any;
  pageNo = 0;
  limit = 10;
  totalRecord = 0;
  totalBalance = 0;
  totalPage = 0;
  ledgerItemForm: FormGroup;
  isSubscriptionActive: boolean;
  myDate = new Date();
  descriptionList: any[] = [];
  classList: any[];
  parentChildList: any[] = [];
  ledgerVM: PostLedgerVM = {};

  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  constructor(private apiService: AgencyApiService, private error: ErrorHandlerService,
    private spinner: NgxSpinnerService, private notification: NotificationService,
    public commonService: CommonService, private fb: FormBuilder, private route: ActivatedRoute,
    private confirmationService: ConfirmationService) {
    this.isSubscriptionActive = this.commonService.getSubscriptionStatus();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.reqParentId = params['parentid'];
    });
    //this.GetStudentLedger();
    this.GetLedgerFirstTime();
    this.createLedgerItemForm();
    //this.getAllClassList();
    this.getAllStudentOfParentList();
    this.dpConfig = Object.assign({}, { containerClass: 'theme-dark-blue' }, { showWeekNumbers: false }
    );
  }

  GetStudentLedger() {
    this.loader = true;
    this.studentReportList = [];
    this.spinner.show();
    const data = {
      'agencyID': this.commonService.getAgencyId(),
      'studentName': this.searchByStudentName,
      'parentID': this.reqParentId,
      'page': this.pageNo,
      'limit': this.limit,
      'fromDate': this.fromDate ? this.fromDate : this.blankDate,
      'toDate': this.toDate ? this.toDate : this.blankDate
    };
    this.apiService.postData(AgencyAPIURLs.GetStudentLedger, data, null).subscribe(res => {
      this.totalRecord = res.body.totalRows;
      this.totalBalance = res.body.totalBalanceAmount;
      if (res.body.statusCode === 200) {
        this.spinner.hide();
        this.studentReportList = res.body.data;
        this.parentName = res.body.parentName;
        this.lastName = res.body.lastName;
        if (this.totalRecord % this.limit === 0) {
          this.totalPage = this.totalRecord / this.limit;
          this.totalRecord = this.totalRecord - 1;
        } else {
          this.totalPage = Math.ceil(this.totalRecord / this.limit);
        }
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

  GetLedgerFirstTime() {
    this.loader = true;
    this.studentReportList = [];
    this.spinner.show();
    const data = {
      'agencyID': this.commonService.getAgencyId(),
      'studentName': this.searchByStudentName,
      'parentID': this.reqParentId,
      'page': this.pageNo,
      'limit': this.limit,
      'fromDate': this.fromDate ? this.fromDate : this.blankDate,
      'toDate': this.toDate ? this.toDate : this.blankDate
    };
    this.apiService.postData(AgencyAPIURLs.GetStudentLedger, data, null).subscribe(res => {
      this.totalRecord = res.body.totalRows;
      console.log(this.totalRecord, 'testttt');
      this.totalBalance = res.body.totalBalanceAmount;
      if (res.body.statusCode === 200) {
        this.spinner.hide();
        this.studentReportList = res.body.data;
        this.parentName = res.body.parentName;
        this.lastName = res.body.lastName;
        if (this.totalRecord % this.limit === 0) {
          this.totalPage = this.totalRecord / this.limit;
          this.totalRecord = this.totalRecord - 1;
          this.pageIndex = this.totalPage;
          this.pageNo = this.totalPage - 1;
          this.GetStudentLedger();
        } else {
          this.totalPage = Math.ceil(this.totalRecord / this.limit);
          this.pageIndex = this.totalPage;
          this.pageNo = this.totalPage - 1;
          this.GetStudentLedger();
        }
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

  // getAllClassList() {
  //   this.classList = [];
  //   const req = {
  //     'AgencyID': this.commonService.getAgencyId(),
  //     'ParentID': this.reqParentId,
  //     'limit': 0,
  //     'page': this.pageNo
  //   };
  //   this.apiService.postData(AgencyAPIURLs.GetAllClassesForParent, req, null).subscribe(res => {
  //     if (res.body.statusCode === 200) {
  //       this.totalRecord = res.body.totalRows;
  //       this.classList = res.body.data;
  //       // this.spinner.hide();
  //     } else {
  //       this.spinner.hide();
  //       this.error.unknownError();
  //     }
  //   }, err => {
  //     this.spinner.hide();
  //     this.error.commonError(err);
  //   }
  //   );
  // }

  getClass(type) {
    this.classList = [];
    this.descriptionList = [];
    this.ledgerItemForm.controls['transactiontype'].setValue('');
    this.ledgerItemForm.controls['description'].setValue('');
    if (type != 0) {
    this.getAllclassesByStudentId(type);
  }
}

  getAllclassesByStudentId(type) {
    this.loader = true;
    this.spinner.show();
    this.classList = [];
    const req = {
      'AgencyID': this.commonService.getAgencyId(),
      'studentID': type
    };
    this.apiService.postData(AgencyAPIURLs.GetClassesByStudentID, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.totalRecord = res.body.totalRows;
        this.classList = res.body.data;
        console.log(this.classList, 'ccccccccccccccccccccccccc');
        this.loader = false;
        this.spinner.hide();
      } else {
        this.spinner.hide();
      }
    }, err => {
      this.spinner.hide();
      this.error.commonError(err);
    }
    );
  }


  getAllStudentOfParentList() {
    this.spinner.show();
    this.parentChildList = [];
    const req = {
      'AgencyID': this.commonService.getAgencyId(),
      'ParentID': this.reqParentId
    };
    this.apiService.postData(AgencyAPIURLs.GetAllStudentForParentDropdown, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.parentChildList = res.body.data;
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

  SendInvoiceMail() {
    this.loader = true;
    this.spinner.show();
    const req = {
      'agencyID': this.commonService.getAgencyId(),
      'studentName': this.searchByStudentName,
      'parentID': this.reqParentId,
      'page': this.pageNo,
      'limit': this.limit,
      'fromDate': this.fromDate ? this.fromDate : this.blankDate,
      'toDate': this.toDate ? this.toDate : this.blankDate
    };
    this.apiService.postData(AgencyAPIURLs.SendInvoiceMail, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.notification.success({ message: 'Mail sent to  registered parent email!', title: 'Sent' });
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

  paginate(event) {
    console.log(event);
    this.pageNo = event.page;
    this.GetStudentLedger();
  }



  createLedgerItemForm() {
    this.ledgerItemForm = this.fb.group({
      ledger: ['Sponsor'],
      postingdate: [this.myDate, Validators.required],
      transactiontype: ['', Validators.required],
      description: ['', Validators.required],
      check: [''],
      notes: [''],
      amount: ['', Validators.required],
      child: ['', Validators.required],
      comments: [''],
    });
    this.ledgerItemForm.controls['check'].disable();
    this.ledgerItemForm.controls['notes'].disable();
  }

  cleareAllForm() {
    this.descriptionList = [];
    this.createLedgerItemForm();
  }

  get l() { return this.ledgerItemForm.controls; }

  getDescriptionList(type) {
    this.descriptionList = [];
    this.ledgerItemForm.controls['amount'].setValue('0');
    this.ledgerItemForm.controls['description'].setValue('');
    // tslint:disable-next-line: triple-equals
    if (type == 1) {
      this.getTuitionChargesList();
      // tslint:disable-next-line: triple-equals
    } else if (type == 2) {
      this.getOtherChargesList();
      // tslint:disable-next-line: triple-equals
    } else if (type == 3) {
      this.getCreditList();
      // tslint:disable-next-line: triple-equals
    } else if (type == '') {
      this.ledgerItemForm.controls['description'].setValue('');
    } else {
      this.getPaymentList();
    }
  }

  getTuitionChargesList() {
    this.classList.map(ele => {
      this.descriptionList.push({ value: ele.classesID, name: ele.className });
    });
  }

  getOtherChargesList() {
    this.descriptionList =
      [
        { value: 'Deposit Charge', name: 'Deposit Charge' },
        { value: 'Parent Refund', name: 'Parent Refund' },
        { value: 'Return Check', name: 'Return Check' },
        { value: 'Tuition Late Fee', name: 'Tuition Late Fee' },
        { value: 'Other', name: 'Other' }
      ];
  }
  getCreditList() {
    this.descriptionList =
      [
        { value: 'Deposit Refund', name: 'Deposit Refund' },
        { value: 'Sibling Discount', name: 'Sibling Discount' },
        { value: 'Credit Forward', name: 'Credit Forward' },
        { value: 'Other', name: 'Other' }
      ];
  }
  getPaymentList() {
    this.descriptionList =
      [
        { value: 'Payment - Cash', name: 'Payment - Cash' },
        { value: 'Payment - Check', name: 'Payment - Check' },
        { value: 'Payment - Credit Card', name: 'Payment - Credit Card' },
        { value: 'Other', name: 'Other' }
      ];
  }

  enableCheckTab(type) {
    // tslint:disable-next-line: triple-equals
    if (type == 4) {
      this.ledgerItemForm.controls['check'].enable();
    } else {
      this.ledgerItemForm.controls['check'].setValue('');
      this.ledgerItemForm.controls['check'].disable();
    }
  }

  enableNoteTab(type) {
    // tslint:disable-next-line: triple-equals
    if (type == 'Other') {
      this.ledgerItemForm.controls['notes'].enable();
    } else {
      this.ledgerItemForm.controls['notes'].setValue('');
      this.ledgerItemForm.controls['notes'].disable();
    }
  }

  getAmount(type) {
    // tslint:disable-next-line: triple-equals
    if (type == 'Deposit Charge') {
      this.ledgerItemForm.controls['amount'].setValue('50');
      // tslint:disable-next-line: triple-equals
    } else if (type == 'Parent Refund') {
      this.ledgerItemForm.controls['amount'].setValue('0');
    } else if (type == 'Credit Forward') {
      this.ledgerItemForm.controls['amount'].setValue('0');
      // tslint:disable-next-line: triple-equals
    } else if (type == 'Return Check') {
      this.ledgerItemForm.controls['amount'].setValue('35');
      // tslint:disable-next-line: triple-equals
    } else if (type == 'Tuition Late Fee') {
      this.ledgerItemForm.controls['amount'].setValue('25');
      // tslint:disable-next-line: triple-equals
    } else if (type == 'Deposit Refund') {
      this.ledgerItemForm.controls['amount'].setValue('0');
      // tslint:disable-next-line: triple-equals
    } else if (type == 'Sibling Discount') {
      this.ledgerItemForm.controls['amount'].setValue('5');
    } else {
      for (let i = 0; i < this.classList.length; i++) {
        // tslint:disable-next-line: triple-equals
        if (this.classList[i].classesID == type) {
          this.ledgerItemForm.controls['amount'].setValue(this.classList[i].fees);
          break;
        } else {
          this.ledgerItemForm.controls['amount'].setValue('');
        }
      }
    }
  }

  verifyledgerItemForm() {
    if (this.ledgerItemForm.valid) {
      this.verifyLedgerAddForm();
    } else {
      this.spinner.hide();
      this.commonService.validateAllFields(this.ledgerItemForm);
    }
  }

  verifyLedgerAddForm() {
    this.spinner.show();
    // tslint:disable-next-line: triple-equals
    if (this.ledgerItemForm.value.transactiontype == 1) {
      this.ledgerVM.ClassId = this.ledgerItemForm.value.description;
    } else {
      this.ledgerVM.ClassId = 0;
    }
    this.ledgerVM.AgencyID = this.commonService.getAgencyId();
    this.ledgerVM.ParentID = this.reqParentId;
    this.ledgerVM.StudentID = this.ledgerItemForm.value.child;
    this.ledgerVM.PostingDate = this.ledgerItemForm.value.postingdate;
    this.ledgerVM.InvoiceDescription = this.ledgerItemForm.value.description;
    this.ledgerVM.PaymentDescription = this.ledgerItemForm.value.description;
    this.ledgerVM.Amount = this.ledgerItemForm.value.amount;
    this.ledgerVM.ChequeNo = this.ledgerItemForm.value.check;
    this.ledgerVM.PaymentComment = this.ledgerItemForm.value.comments;
    this.ledgerVM.InvoiceComment = this.ledgerItemForm.value.comments;
    this.ledgerVM.Notes = this.ledgerItemForm.value.notes;
    // tslint:disable-next-line: triple-equals
    if (this.ledgerItemForm.value.transactiontype == 1 || this.ledgerItemForm.value.transactiontype == 2) {
      this.createInvoiceLedgerItem(this.ledgerVM);
    } else {
      this.createPaymentLedgerItem(this.ledgerVM);
    }
  }

  createInvoiceLedgerItem(req) {
    this.spinner.show();
    this.apiService.postData(AgencyAPIURLs.CreateInvoiceLedgerItem, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.notification.success({ message: 'Invoice Generated Successfully', title: '' });
        $('.postLedger').modal('hide');
        this.GetLedgerFirstTime();
        this.spinner.hide();
      } else if (res.body.statusCode === 987) {
        this.notification.warning({ message: 'Something went wrong.', title: '' });
        this.spinner.hide();
      } else if (res.body.statusCode === 204) {
        this.notification.warning({ message: 'Select Enroll Class.', title: '' });
        this.spinner.hide();
      } else if (res.body.statusCode === 203) {
        this.notification.warning({ message: 'No Recurring Billing', title: '' });
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

  createPaymentLedgerItem(req) {
    this.spinner.show();
    this.apiService.postData(AgencyAPIURLs.CreatePaymentLedgerItem, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.notification.success({ message: 'Payment Generated Successfully', title: '' });
        $('.postLedger').modal('hide');
        this.GetLedgerFirstTime();
        this.spinner.hide();
      } else if (res.body.statusCode === 987) {
        this.notification.warning({ message: 'Something went wrong.', title: '' });
        this.spinner.hide();
      } else if (res.body.statusCode === 203) {
        this.notification.warning({ message: 'No Recurring Billing', title: '' });
        this.spinner.hide();
      } else if (res.body.statusCode === 204) {
        this.notification.warning({ message: 'Select Enroll Class.', title: '' });
        this.spinner.hide();
      } else if (res.body.statusCode === 209) {
        this.notification.warning({ message: 'No Invoice for this student.', title: '' });
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

  pdfReportForPaymentLedger() {
    this.loader = true;
    this.spinner.show();
    const req = {
      'agencyID': this.commonService.getAgencyId(),
      'studentName': this.searchByStudentName,
      'parentID': this.reqParentId,
      'page': this.pageNo,
      'limit': this.limit,
      'fromDate': this.fromDate ? this.fromDate : this.blankDate,
      'toDate': this.toDate ? this.toDate : this.blankDate
    };
    this.apiService.postData(AgencyAPIURLs.GetPdfReportForPaymentLedger, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        const filename = environment.baseUrl + res.body.fileName;
        const name = res.body.fileName;
        window.open(filename);
        setTimeout(() => {
          this.deletePdFFromServer(name);
        }, 5000);
      } else {
        this.error.unknownError();
      }
      this.loader = false;
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.error.commonError(err);
    }
    );
  }

  // Delete pdf after use from server
  deletePdFFromServer(filename) {
    const req = {
      'fileName': filename,
      'agencyID': this.commonService.getAgencyId()
    };
    this.apiService.postData(AgencyAPIURLs.DeleteExistingFile, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
      } else {
      }
    }, err => {
      console.log(err);
    }
    );
  }


}
