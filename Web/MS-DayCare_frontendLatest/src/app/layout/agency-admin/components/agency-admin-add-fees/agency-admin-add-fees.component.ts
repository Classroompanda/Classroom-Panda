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
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { AddFeesVM } from '../shared/view-model/userVM';
import {Message} from 'primeng/components/common/api';
declare var $: any;
@Component({
  selector: 'app-agency-admin-add-fees',
  templateUrl: './agency-admin-add-fees.component.html',
  styleUrls: ['./agency-admin-add-fees.component.css'],
})
export class AgencyAdminAddFeesComponent implements OnInit {
  displayTransList: any[] = [];
  tempTransArry: any[] = [];
  editTransForm: FormGroup;
  clearItems: FormArray;
  transFieldCount = 0;
  items: FormArray;
  getExtraFeesChargeList: any[] = [];
  calculatedFeesList:  any [] = [];
  loader = true;
  pageNo = 0;
  limit = 10;
  totalRecord = 0;
  today = new Date;
  agenyId: number;
  parentList: any [] = [];
  childList: any [] = [];
  studentName: string;
  parentId: any;
  studentId:  any;
  parentName: any;
  totalExtraAmount = 0;
  discountAmount = 0;
  generatedAmount = 0;
  classFees = 0;
  FinalCalculatedFees = 0;
  extraFeesDetailsReqArray: any [] = [];
  showWxtraFeesForm = false;
  showNextBtn = false;
  calculationReqModal  = {};
  getAllCalcultedDetailsList: any [] = [];
  classIdArray: any[] = [];
  addFeesVM: AddFeesVM = {};
  extraFeesDetails: any[] = [];
  isAddMode =  true;
  PreviousFromDate: any;
  PreviousToDate: any;
  fromDateTemp: any;
  todateTemp: any;
  reserveTotalCalFee = 0;
  showNewEntry = true;
  activeSubscription = false;
  nullDate: any;
  isInvoiceGenrated = true;
  duplicateDuration = false;
  CalculatedFeesDate: string;
  CategoryId: any;
  CategoryName: any;
  EnrollClassesId: any[] = [];
  msgs: Message[] = [];
  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  constructor( private apiService: AgencyApiService, private error: ErrorHandlerService,
    private spinner: NgxSpinnerService, private notification: NotificationService,
    public commonService: CommonService, private fb: FormBuilder,
    private routedata: ActivatedRoute, private confirmationService: ConfirmationService,
    ) {

      this.routedata.queryParams.subscribe(params => {
        this.studentName = params['studentName'];
        this.parentId = params['parentId'];
        this.studentId = params['studentId'];
        this.parentName = params['parentName'];
       const str = params['clasessId'];
     this.classIdArray =   this.convertClassArray(str);
     this.CategoryId  = params['categoryId'];
        this.CategoryName  = params['categoryname'];
        console.log('com', this.classIdArray);
    });
     }

  ngOnInit() {
    this.activeSubscription = this.commonService.getSubscriptionStatus();
    this.agenyId = this.commonService.getAgencyId();
    this.newEditFormBuild();
    this.pushSingleArryForTransHead();
    this.getExtraFeesChargeMaster();
    this.getAllDetails();
    this.dpConfig = Object.assign({}, { containerClass: 'theme-dark-blue' }, { showWeekNumbers: false });

  }

  showInfoMsg(msg: string, title: string) {
    this.msgs = [];
    this.msgs.push({severity: 'info', summary: title , detail: msg});
}
  convertClassArray(str: string) {
    if (str) {
      let intArray: any [] = [];
      intArray  =  str.split(',');
      const temparr: any[] = [];
      intArray.forEach(res => {
        temparr.push( parseInt(res, 10));
      });
      console.log('inmeth', temparr);
      return temparr;
    }
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

  newEditFormBuild() {
    this.editTransForm = this.fb.group({
      fromdate: ['', Validators.required],
      todate: ['', Validators.required],
      generatedfees: [0, Validators.required],
      childname: [''],
      parentname: [''],
      totalammount: [''],
      discountamount: [''],
      discountdetails: [''],
      transArraycollection: this.fb.array([this.createItem()]),
    });

  }

   /* method for Form array for transaction items */
   createItem(): FormGroup {
    return this.fb.group({
      transactionTypeID: [''],
      studentID: [''],
      description: [''],
      amount: ['']
    });
  }


  /**Form Update builder */
  newEditFormBuildUpdate() {
    this.editTransForm = this.fb.group({
      fromdate: [this.addFeesVM.fromDate, Validators.required],
      todate: [this.addFeesVM.toDate, Validators.required],
      generatedfees: [this.addFeesVM.generatedFees, Validators.required],
      childname: [this.studentName],
      parentname: [this.parentName],
      totalammount: [this.FinalCalculatedFees],
      discountamount: [this.addFeesVM.Discountamount],
      discountdetails: [this.addFeesVM.DiscountDetails],
      transArraycollection: this.fb.array([]),
    });
    this.updateItem();
  }

    /**Form Update builder */
    reIntializeFormWhileUpdate() {
      this.editTransForm = this.fb.group({
        transArraycollection: this.fb.array([]),
      });
    }

  updateItem() {
    const ctrl = <FormArray>this.editTransForm.get('transArraycollection') as FormArray;
    for (let i = 0; i < this.extraFeesDetails.length; i++) {
      ctrl.push(this.fb.group({
        transactionTypeID: [this.extraFeesDetails[i].extraFeeChargeMasterID],
        studentID: [''],
        description: [this.extraFeesDetails[i].discountDetails],
        amount: [this.extraFeesDetails[i].chargeAmount]
      }));
    }
  }


  getCalculationDetails(value) {
    this.msgs = [];
    this.spinner.show();
    this.isAddMode = false;
    this.addFeesVM = {};
    this.showNextBtn = false;
    this.reserveTotalCalFee = 0;
    this.totalExtraAmount = 0;
    this.FinalCalculatedFees = 0;
    this.discountAmount = 0;
    this.showWxtraFeesForm = false;
    this.displayTransList = [];
    this.tempTransArry = [];
    this.transFieldCount = 0;
    this.tempTransArry = [
      {
        'id': 1,
        'transactionTypeID': '',
        'studentID': '',
        'description': '',
        'amount': ''
      }
    ];
    let sendArr: any [] = [];
    this.items = this.fb.array([this.createItem()]);
    sendArr = this.convertClassArray(value.classIDs);
    this.extraFeesDetails = [];
    const fdate = new Date(value.fromDate);
    const tdate = new Date(value.toDate);
    this.PreviousFromDate = fdate.toDateString();
    this.PreviousToDate = tdate.toDateString();
    const req = {
      'FromDate': fdate.toDateString(),
      'ToDate': tdate.toDateString(),
      'StudentID': this.studentId,
      'ParentID': this.parentId,
      'ClassesId': sendArr,
      'AgencyID': this.agenyId
    };
    this.apiService.postData(AgencyAPIURLs.GetAddFeesDetailsView, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        if (res.body.data.length > 0 ) {
          this.addFeesVM.fromDate = new Date ( res.body.data[0].fromDate);
          this.addFeesVM.toDate = new Date(res.body.data[0].toDate);
          this.addFeesVM.generatedFees = res.body.data[0].totalPerDayFee;
          this.FinalCalculatedFees = res.body.data[0].totalCalculatedAmount;
          this.reserveTotalCalFee = res.body.data[0].totalCalculatedAmount;
          this.extraFeesDetails = res.body.data[0].extraFees;
          this.isInvoiceGenrated = res.body.data[0].isInvoiceGenrated;
          this.displayTransList = res.body.data[0].extraFees;
          this.addFeesVM.Discountamount = res.body.data[0].discountAmount;
          this.addFeesVM.DiscountDetails = res.body.data[0].discountDetails;
          this.items.removeAt(0);
          this.totalExtraAmount = 0;
          if (res.body.data[0].extraFees.length !== 0) {
            this.showWxtraFeesForm = true;
            res.body.data[0].extraFees.forEach(element => {
              const amount = + element.chargeAmount;
              this.totalExtraAmount = this.totalExtraAmount + amount;
              this.items.value.push({
              'transactionTypeID': element.extraFeeChargeMasterID, 'studentID': '', 'description': element.discountDetails,
               'amount': element.chargeAmount
              });
            });
          }


          this.newEditFormBuildUpdate();
          this.spinner.hide();
          $('.feescalculation').modal('show');
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
    this.newEditFormBuildUpdate();
  }





  get f() { return this.editTransForm.controls; }


    /** Method to add new transaction into form array while edit payment*/
    addFees() {
      this.showNextBtn = false;
      this.transFieldCount++;
      this.tempTransArry.push({ 'id': this.transFieldCount });
      this.items = this.editTransForm.get('transArraycollection') as FormArray;
      this.items.push(this.createItem());
      this.displayTransList = this.tempTransArry;
       this.calculateTotleAmount();
    }


    /**Remove trans heads on minus button */
    removeExtraFees(data) {
      this.showNextBtn = false;
      const index = this.displayTransList.findIndex(r => r.id === data.id);
      this.items = this.editTransForm.get('transArraycollection') as FormArray;
      this.items.removeAt(index);
      this.displayTransList.splice(index, 1);
         this.calculateTotleAmount();
    }

    getExtraFeesChargeMaster() {
      this.getExtraFeesChargeList = [];
      const req = {
        'AgencyID': this.agenyId
      };
      this.apiService.postData(AgencyAPIURLs.GetExtraFeeChargeMasterList, req, null).subscribe(res => {
        if (res.body.statusCode === 200) {
          this.getExtraFeesChargeList = res.body.data;
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

    getDetails() {
      this.editTransForm.controls['childname'].setValue(this.studentName);
      this.editTransForm.controls['parentname'].setValue(this.parentName);
      this.editTransForm.controls['childname'].updateValueAndValidity();
      this.editTransForm.controls['parentname'].updateValueAndValidity();
     }




     verifyCalculateFees() {
       console.log(this.FinalCalculatedFees);
        if (this.editTransForm.valid) {
          if (this.editTransForm.value.fromdate.setHours(0, 0, 0) > this.editTransForm.value.todate.setHours(0, 0, 0)) {
            this.notification.warning({ message: 'To Date should be greater or equal than From date ', title: '' });
        } else {
          this.calculateFinalAmount();
          this.calculationReqModal = {};
          const req = {
            'studentID': this.studentId,
            'ParentID': this.parentId,
            'fromDate': new Date (this.editTransForm.controls.fromdate.value).toDateString(),
            'toDate': new Date(this.editTransForm.controls.todate.value).toDateString(),
            'totalPerDayFee': this.generatedAmount,
            'agencyID': this.agenyId,
            'totalCalculatedAmount': this.FinalCalculatedFees,
            'ClassesID': this.EnrollClassesId,
            'ExtraFees': this.showWxtraFeesForm ? this.extraFeesDetailsReqArray : [],
            'PreviousFromDate': this.isAddMode ?  this.nullDate : new Date(this.PreviousFromDate).toDateString(),
            'PreviousToDate': this.isAddMode ?  this.nullDate : new Date(this.PreviousToDate).toDateString(),
            'DiscountAmount': this.editTransForm.controls.discountamount.value ? this.editTransForm.controls.discountamount.value : 0,
            'DiscountDetails': this.editTransForm.controls.discountdetails.value,
            'CalculatedFeeDate': this.CalculatedFeesDate
          };
          this.calculationReqModal = req;
          console.log('arryFin', this.calculationReqModal );
        }
        } else {
          this.spinner.hide();
          this.commonService.validateAllFields(this.editTransForm);
        }
     }

     confirmCalculation() {
      if (isNaN(this.FinalCalculatedFees)) {
        this.showNextBtn = false;
        this.notification.warning({message: 'Please enter valid amount', title: ''});
      } else {
        this.confirmationService.confirm({
          message: 'Do you want to proceed for Following calculation? TotalExtra Fees:' + ' ' + this.totalExtraAmount +
           ' ' + 'Class Fees:' + ' ' +
          + this.generatedAmount + ' ' + 'Discount Amount:' + ' ' + this.discountAmount + '  ' +
           'Total Amount:' + ' ' + this.FinalCalculatedFees ,
          accept: () => {
            this.successCalculation(this.calculationReqModal);
          },
          reject: () => {
              this.showNextBtn = false;
          }
        });
      }
     }


     // method to open confirmation for invoice generation
     confirmInvoice(value) {
      this.confirmationService.confirm({
        message: 'Do you want to generate invoice?',
        accept: () => {
          this.successInvoice(value);
        },
      });
     }



     successCalculation(req) {
       this.spinner.show();
        console.log('req', req);
        const url = this.isAddMode ? AgencyAPIURLs.SaveCalculatedFees : AgencyAPIURLs.UpdateCalculatedFees;

      this.apiService.postData(url, req, null).subscribe(res => {
        if (res.body.statusCode === 200) {
          const msg = this.isAddMode ? 'Calculation Saved sucessfully' : 'Calculation Updated sycessfully';

          this.notification.success({message: msg, title: '' });
          $('.feescalculation').modal('hide');
          this.getAllDetails();
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


     successInvoice(value) {
        let sendArr: any [] = [];
       sendArr = this.convertClassArray(value.classIDs);
      const req = {
        'InvoiceFromDate': value.fromDate,
        'InvoiceToDate': value.toDate,
        'AgencyID': this.agenyId,
        'ParentID': this.parentId,
        'StudentID': this.studentId,
        'Totalamount': value.totalCalculatedAmount,
        'ClassesId': sendArr,
        'DiscountAmount': value.discountAmount
      };


    this.apiService.postData(AgencyAPIURLs.SaveInvoiceDetails, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        $('.feescalculation').modal('hide');
        this.getAllDetails();
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


     verifyExtraFeesForm() {
        console.log('this', this.editTransForm);
        for (let index = 0; index < this.editTransForm.controls.transArraycollection.value.length; index++) {
          this.items.value[index].transactionTypeID =  this.editTransForm.controls.transArraycollection.value[index].transactionTypeID;
          this.items.value[index].amount =  this.editTransForm.controls.transArraycollection.value[index].amount;
          this.items.value[index].description =  this.editTransForm.controls.transArraycollection.value[index].description;
        }
      if (this.showWxtraFeesForm) {
        const status = this.validateExtraFeesPaymentForm();
        if (status > 0) {
          this.notification.warning({message: 'Please enter valid details for extra fees', title: ''});
        } else  {
          const duplicate = this.checkForDuplicateIdFessTypeID();
            if (duplicate > 0) {
              this.notification.warning({message: 'Please remove identical extra fee type', title: ''});
            } else {
              this.extraFeesDetailsReqArray = [];
              if (this.items.value.length !== 0 && this.items !== undefined && this.showWxtraFeesForm) {
                this.items.value.forEach(element => {
                  this.extraFeesDetailsReqArray.push({
                    'extraFeeChargeMasterID': element.transactionTypeID,
                    'amount': element.amount,
                    'discountDetails': element.description
                  });
                });
              }
              this.verifyCalculateFees();
            }
        }
      } else {
        this.verifyCalculateFees();
      }
    }



     calculateFinalAmount() {
      this.calculateTotleAmount();
       this.generatedAmount = 0;
       this.generatedAmount =  + this.editTransForm.controls.generatedfees.value;
       this.FinalCalculatedFees = 0;
     const fees = (this.totalExtraAmount + this.generatedAmount);
     this.discountAmount = + this.editTransForm.controls.discountamount.value;
     if (fees < this.discountAmount) {
       this.showNextBtn = false;
         this.notification.warning({message: 'Discount Amount should be less than or equals to total amount', title: 'Total:' + fees});
    } else {
      this.FinalCalculatedFees = fees - this.discountAmount;
      this.showNextBtn = true;
    }
      }

      /* To calculate Extar amount */
     calculateTotleAmount() {
       if (this.showWxtraFeesForm) {
        for (let index = 0; index < this.editTransForm.controls.transArraycollection.value.length; index++) {
          this.items.value[index].transactionTypeID =  this.editTransForm.controls.transArraycollection.value[index].transactionTypeID;
          this.items.value[index].amount =  this.editTransForm.controls.transArraycollection.value[index].amount;
        }
        this.totalExtraAmount = 0;
        if (this.items.value.length !== 0 && this.items !== undefined) {
          this.items.value.forEach(element => {
            const amount = + element.amount;
            this.totalExtraAmount = this.totalExtraAmount + amount;
          });
        }
       } else {
        this.totalExtraAmount = 0;
       }
    }

     /**Clear Trans head form method */
  clearAddFeesForm() {
    this.msgs = [];
    this.isInvoiceGenrated = false;
    this.addFeesVM = {};
    this.isAddMode = true;
    this.showWxtraFeesForm = false;
    this.generatedAmount = 0;
    this.FinalCalculatedFees = 0;
    this.totalExtraAmount = 0;
    this.displayTransList = [];
    this.reserveTotalCalFee = 0;
    this.items = this.clearItems;
    this.newEditFormBuild();
    this.items = this.editTransForm.get('transArraycollection') as FormArray;
    this.pushSingleArryForTransHead();
  }

/**Show-hide extra fees*/
  shoHideExtrFees() {
    const ctrl = this.editTransForm.get('transArraycollection') as FormArray;
    this.clearFormArray(ctrl);
    ctrl.push(this.fb.group({
      transactionTypeID: [''],
      studentID: [''],
      description: [''],
      amount: ['']
    }));
     console.log(this.editTransForm.controls.transArraycollection.value);
    this.showNextBtn = false;
    this.showWxtraFeesForm = !this.showWxtraFeesForm;
    this.totalExtraAmount = 0;
      this.displayTransList = [];
       this.items = this.clearItems;
      this.items = this.editTransForm.get('transArraycollection') as FormArray;
      this.pushSingleArryForTransHead();
  }


  clearFormArray = (formArray: FormArray) => {
    while (formArray.length !== 0) {
      formArray.removeAt(0);
    }
  }


  /**Method to check validation for Extra Charges form */
  validateExtraFeesPaymentForm() {
     // Means valid data
    let count = 0;
    if (this.items.value.length !== 0 && this.items !== undefined) {
      this.items.value.forEach(element => {
        if (element.transactionTypeID === '' || element.amount === '') {
          count = count + 1;
        }
      });
    }
    return count;
  }

// Method to find duplicate extra fee type
  checkForDuplicateIdFessTypeID() {
    let count = 0;
    return count;
  }


  getFromDate(value: Date) {
    this.fromDateTemp = value;
    this.getPerDayCalculatedFees();
  }

  getTODate(value: Date) {
    this.todateTemp = value;
    this.getPerDayCalculatedFees();
  }


  getPerDayCalculatedFees() {
    this.msgs = [];
    this.CalculatedFeesDate = '';
    this.EnrollClassesId = [];
      this.showNextBtn = false;
      if (this.fromDateTemp && this.todateTemp) {
        if (this.fromDateTemp.setHours(0, 0, 0) > this.todateTemp.setHours(0, 0, 0)) {
          this.notification.warning({ message: 'To Date should be greater or equal than From date ', title: '' });
        } else {
        this.spinner.show();
        const modal = {
          'studentID': this.studentId,
          'parentID':  this.parentId,
          'agencyId': this.agenyId,
          'fromDate': new Date(this.fromDateTemp).toDateString(),
          'toDate': new Date(this.todateTemp).toDateString(),
          'CategoryId': this.CategoryId,
          'Categoryname': this.CategoryName
         };
         console.log('perday', modal);
         if (this.editTransForm.controls.fromdate.value !== '') {
           this.apiService.postData(AgencyAPIURLs.PerDayFeeCalculation, modal, null).subscribe(res => {
            if (res.body.statusCode === 200) {
              if (res.body.paidFeeDate) {
                this.showInfoMsg('Invoice for some date has been already generated', '');
              }
              this.duplicateDuration = false;
              this.editTransForm.controls['generatedfees'].setValue(res.body.data);
              this.editTransForm.controls['generatedfees'].updateValueAndValidity();
              this.editTransForm.controls['discountamount'].setValue(res.body.discountAmount);
              this.editTransForm.controls['discountamount'].updateValueAndValidity();
             this.generatedAmount = res.body.data;
             this.CalculatedFeesDate = res.body.calculatedFeeDate;
             this.EnrollClassesId = res.body.enrollClassesId[0];
              this.spinner.hide();
            } else if (res.body.statusCode === 10) {
              this.spinner.hide();
              this.duplicateDuration = true;
                this.notification.warning({message: 'Invoice is already generated for this dates', title: 'Oops!'});
            } else if (res.body.statusCode === 13) {
              this.spinner.hide();
              this.duplicateDuration = true;
                this.notification.warning({message: 'Student not enroll for this date', title: ''});
            } else if (res.body.statusCode === 12) {
              this.spinner.hide();
              this.duplicateDuration = true;
                this.notification.warning({message: 'Student Not Present for this duration', title: ''});
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
      }
   }


   getAllDetails() {
     this.loader = true;
     this.spinner.show();
    this.getAllCalcultedDetailsList = [];
    const req = {
      'AgencyID': this.agenyId,
      'StudentID': this.studentId,
      'ParentID': this.parentId
    };
    this.apiService.postData(AgencyAPIURLs.GetAddFeesDetails, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.totalRecord = res.body.totalRows;
        if (res.body.data.length > 0) {
          this.getAllCalcultedDetailsList = res.body.data;
        this.showNewEntry =  this.getAllCalcultedDetailsList[0].isInvoiceGenrated ? true :  false ;
        } else {
          this.showNewEntry = true;
        }
        this.spinner.hide();
      } else {
        this.spinner.hide();
        this.error.unknownError();
      }
      this.loader = false;
    }, err => {
      this.spinner.hide();
      this.error.commonError(err);
    }
    );
  }


  changeInAmount() {
    this.showNextBtn = false;
  }


  isDiscount() {
    if (this.editTransForm.controls.value) {
    } else {
      this.FinalCalculatedFees = 0;
      this.FinalCalculatedFees = this.reserveTotalCalFee ;
    }
  }



   // method to open confirmation for invoice generation
   deleteCalulation(value) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      accept: () => {
        this.successdeleteCalulation(value);
      },
    });
   }


   successdeleteCalulation(value) {
  const req = {
    'FromDate': value.fromDate,
    'ToDate': value.toDate,
    'AgencyID': this.agenyId,
    'ParentID': this.parentId,
    'StudentID': this.studentId,
    'DeletedBy': this.commonService.getReleventUserId('userdetails')
  };


this.apiService.postData(AgencyAPIURLs.DeleteFeesCalculation, req, null).subscribe(res => {
  if (res.body.statusCode === 200) {
    const index = this.getAllCalcultedDetailsList.findIndex(r => ( r.fromDate === value.fromDate && r.toDate === value.toDate));
    this.getAllCalcultedDetailsList.splice(index, 1);
    this.showNewEntry = true;
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
