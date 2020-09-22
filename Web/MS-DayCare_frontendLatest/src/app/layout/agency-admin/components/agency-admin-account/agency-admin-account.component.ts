import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AgencyApiService } from '../shared/services/agency-api-service/agency-api.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler/error-handler.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from 'src/app/shared/services/notification-service/notification.service';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { ConfirmationService } from 'primeng/api';
import { AgencyAPIURLs } from '../shared/constatant';
import { ParentAPIURLs } from 'src/app/layout/parent/shared/constant';
declare var $: any;

@Component({
  selector: 'app-agency-admin-account',
  templateUrl: './agency-admin-account.component.html',
  styleUrls: ['./agency-admin-account.component.css']
})
export class AgencyAdminAccountComponent implements OnInit {

  transactionForm: FormGroup;
  authCode: any;
  showBtnCreateAcc = false;
  paymentHistoryList: any[] = [];
  paymentDueList: any[] = [];
  trasactionTypeList: any[] = [];
  trasactionMasterList: any[] = []; // for dropdown
  transMasterList: any[] = []; // for listing
  bankAccountList: any[] = [];
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
  generatedTutionFee: number;
  invoiceFromDate: any;
  invoiceToDate: any;
  showBankdetails = false;

  constructor(private activatedRoute: ActivatedRoute, private apiService: AgencyApiService, private error: ErrorHandlerService,
    private spinner: NgxSpinnerService, private notification: NotificationService,
    public commonService: CommonService, private fb: FormBuilder, private route: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private formBuilder: FormBuilder) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.authCode = params['code'];
    });
  }

  ngOnInit() {  
    this.pushSingleArryForTransHead();
    this.getPaymentDetails();
    this.getPaymentHistory();
    this.getTrasactionTypeList();
    this.getTransactionMasterDetails();
    this.newEditFormBuild();
    this.createTransMaster();
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
    this.transactionForm = this.formBuilder.group({
      transcationtype: ['', Validators.required],
      transdescription: ['', Validators.required],
      accountno: [''],
      ifsc: [''],
      accholdername: [''],
      isdefaultaccount: [false],
      openingbal: ['']

    });
  }

  newEditFormBuild() {
    this.editTransForm = this.fb.group({
      transArraycollection: this.fb.array([this.createItem()])
    });
  }

  get f() { return this.transactionForm.controls; }

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
    this.calculateTotleAmount();
  }

  /**Remove trans heads on minus button */
  removeFood(data) {
    const index = this.displayTransList.findIndex(r => r.id === data.id);
    this.items = this.editTransForm.get('transArraycollection') as FormArray;
    this.items.removeAt(index);
    this.displayTransList.splice(index, 1);
    this.calculateTotleAmount();
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


  getStudentDetails(data) {
    if (data) {
      this.selectedStudentId = data.studentID;
      this.invoiceNo = data.invoiceNo;
      this.generatedTutionFee = data.totalAmount;
      this.invoiceFromDate = new Date(data.invoiceFromDate).toDateString();
      this.invoiceToDate = new Date(data.invoiceToDate).toDateString();
    }
  }

  /** Save Payment heads and subheads for perticuler student */
  saveHeadTransaction() {
    const agencyId = this.commonService.getAgencyId();
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
            'agencyID': agencyId,
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
        if (element.transactionTypeID !== '' && element.description
          && element.amount !== '') {
          status = false;
        } else {
          status = true;
        }
      });
    }
    return status;
  }


  calculateTotleAmount() {
    this.totalAmount = 0;

    if (this.items.value.length !== 0 && this.items !== undefined) {
      this.items.value.forEach(element => {
        const amount = + element.amount;
        this.totalAmount = this.totalAmount + amount;
      });
    }
  }

  getPaymentDetails() {
    this.spinner.show();
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
      'page': this.pageNo
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


  getPaymentHistory() {
    this.loader = true;
    this.paymentHistoryList = [];
    this.spinner.show();
    const model = {
      'agencyID': this.commonService.getAgencyId(),
      'limit': this.limit,
      'page': this.pageNo
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
        this.spinner.hide();
        this.loader = false;
      }
    }, err => {
      this.spinner.hide();
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
    this.pageNo = event.page;   
    if (tab === 1) {
      this.getPaymentHistory();
    } else {
      this.getDuePaymentAccordingToAgency();
    }
  }



  onTabChange() {
    this.pageNo = 0;
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
    const model = {
      'tokenID': 0,
      'agencyID': this.commonService.getAgencyId(),
      'parentID': value.parentID,
      'studentID': value.studentID,      
      'SourceToken': 0,
      'CreatedBy': this.commonService.getReleventUserId('userdetails'),
      'paymentFromDate': value.invoiceFromDate,
      'paymentToDate': value.invoiceToDate,
      'totalAmount': value.totalAmount,
      'InvoiceDetailsID': value.id,
      'IsOffline': true
    };
    this.apiService.postData(ParentAPIURLs.PaymentDetails, model, null).subscribe(result => {
      if (result.body.statusCode === 200) {       
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


  saveTransMasterInformation() {
    this.spinner.show();
    if (this.transactionForm.valid) {
      const data = {
        'agencyID': this.commonService.getAgencyId(),
        'TransactionTypeID': this.transactionForm.controls.transcationtype.value,
        'Description': this.transactionForm.controls.transdescription.value,
        'AccountNumber': this.transactionForm.controls.accountno.value,
        'IFSC': this.transactionForm.controls.ifsc.value,
        'AccountHolderName' : this.transactionForm.controls.accholdername.value,
        'OpeningBalance': this.transactionForm.controls.openingbal.value,
        'IsDefaultAccount': this.transactionForm.controls.isdefaultaccount.value,
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
     this.commonService.validateAllFields(this.transactionForm);
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

  getTransactionType() {
   if (this.transactionForm.controls.transcationtype.value === '1') {
    this.showBankdetails = true;
    this.transactionForm.controls['accountno'].setValidators(Validators.required);
    this.transactionForm.controls['accholdername'].setValidators(Validators.required);
    this.transactionForm.updateValueAndValidity();
   } else {
     this.showBankdetails = false;
     this.transactionForm.controls['accountno'].setValidators(Validators.nullValidator);
     this.transactionForm.controls['accholdername'].setValidators(Validators.nullValidator);
     this.transactionForm.updateValueAndValidity();
   }
  }


  getBankDetails() {
    this.loader = true;
    this.transMasterList = [];
    const req = {
      'AgencyID': this.commonService.getAgencyId()
    };
    this.apiService.postData(AgencyAPIURLs.GetBankAccountDetails, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.bankAccountList = res.body.data;
        this.loader = false;
         console.log('accou', this.bankAccountList);
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





  markAsDefaultAccount(data) {
    if (data) {
      this.bankAccountList.forEach( res =>  {
        if (res.transactionTypeID === data.transactionTypeID) {
          res.isDefaultAccount = true;
        } else {
          res.isDefaultAccount = false;
        }
      });
    }

  }

}
