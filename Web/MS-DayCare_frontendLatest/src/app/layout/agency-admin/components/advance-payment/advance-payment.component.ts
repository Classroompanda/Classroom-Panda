import { Component, OnInit } from '@angular/core';
import { ParentDetailsVM } from 'src/app/layout/parent/shared/view-model/parent-detailsvm';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { ParentApiService } from 'src/app/layout/parent/shared/services/parent-api-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler/error-handler.service';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { NotificationService } from 'src/app/shared/services/notification-service/notification.service';
import { ParentAPIURLs } from 'src/app/layout/parent/shared/constant';
import { TeacherAPIURLs } from 'src/app/layout/teacher/shared/constant';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { AgencyAPIURLs } from '../shared/constatant';
declare var $: any;
@Component({
  selector: 'app-advance-payment',
  templateUrl: './advance-payment.component.html',
  styleUrls: ['./advance-payment.component.css']
})
export class AdvancePaymentComponent implements OnInit {
  linkedChildList: any[] = [];
  parentVM: ParentDetailsVM;
  profileForm: FormGroup;
  countryList: any[];
  stateList: any[];
  cityList: any[];
  parentList: any[] = [];
  today = new Date();
  image: any;
  id: number;
  flag = false;
  public formData = new FormData();
  public fileData: FormData;
  profileimage: any;
  disableEmail = false;
  masterParentList: any[] = [];
  parentChildList: any[] = [];
  childList: any[] = [];
  emailPattern = /^([\w-\.]+\u0040([\w-]+\.)+[\w-]{2,4})?$/;
  addMode: boolean;
  isSecondparent = false;
  isGuardian = false;
  relationTypeList: any[] = [];
  showExtraFields = false;
  isParent = true;
  reasonNotToAllowbox = true;
  activationType = 'Activated';
  pageNo = 0;
  limit = 10;
  totalRecord = 0;
  loader = true;
  isSubscriptionActive: boolean;
  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  agencyId: any;
  nameSearch = '';
  rejectedUserList: any [] = [];
  advanceAmount = 0;
  parentIdForAdavance = 0;
  constructor(private apiService: ParentApiService, private error: ErrorHandlerService,
    private spinner: NgxSpinnerService, private notification: NotificationService,
    public commonService: CommonService, private fb: FormBuilder, private route: ActivatedRoute,
    private confirmationService: ConfirmationService, private toaster: NotificationService) {
      this.isSubscriptionActive = this.commonService.getSubscriptionStatus();
    }

  ngOnInit() {
    this.spinner.show();
    this.dpConfig = Object.assign({}, { containerClass: 'theme-dark-blue' },
      { showWeekNumbers: false });
    this.image = '';
    this.countryList = [];
    this.cityList = [];
    this.stateList = [];
    this.parentVM = {};
    this.createParentForm();
    this.getAllParentList();
    this.getMasterParentList();
  }




  createParentForm() {
    this.profileForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      mobile: ['', Validators.required],
      photo: [''],
      typeofparent: ['parent'],
      masterparentid: [''],
      associatedchildid: [''],
      relationid: ['', Validators.required],
    });
  }

  editParentForm() {
    this.disableEmail = true;
    this.profileForm = this.fb.group({
      firstname: [this.parentVM.FirstName, Validators.required],
      lastname: [this.parentVM.LastName, Validators.required],
      email: [this.parentVM.EmailId],
      mobile: [this.parentVM.Mobile, Validators.required],
      photo: [''],
      typeofparent: [{ value: '', disabled: true }],
      masterparentid: [{ value: this.parentVM.addedByID, disabled: true }],
      associatedchildid: [this.childList],
      relationid: [this.parentVM.relationTypeId, Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.profileForm.controls; }

  getParentDetails(value) {
    this.addMode = false;
    this.spinner.show();
    const req = {
      'AgencyID': this.commonService.getAgencyId(),
      'classID': 0,
      'studentID': 0,
      'parentID': value.id,
      'studentName': 'string',
    };
    this.apiService.postData(ParentAPIURLs.GetParentInformation, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        if (res.body.data !== null && res.body.data !== []) {
          this.parentVM.FirstName = res.body.data.firstName;
          this.parentVM.LastName = res.body.data.lastName;
          this.parentVM.EmailId = res.body.data.emailId;
          this.parentVM.Mobile = res.body.data.mobile;
          this.parentVM.Address = res.body.data.address;
          this.parentVM.CityId = res.body.data.cityId;
          this.parentVM.StateId = res.body.data.stateId;
          this.parentVM.CountryId = res.body.data.countryId;
          this.parentVM.PostalCode = res.body.data.postalCode;
          this.parentVM.DateOfBirth = new Date(res.body.data.dateOfBirth);
          this.parentVM.GenderID = res.body.data.genderID;
          this.id = res.body.data.id;
          this.parentVM.Profession = res.body.data.profession;
          this.parentVM.relationTypeId = res.body.data.relationTypeId;
          this.parentVM.addedByID = res.body.data.addedByID;
          this.parentVM.isParent = res.body.data.isParent;
          this.parentVM.IsAuthorizedToPickup = res.body.data.isAuthorizedToPickup;
          this.parentVM.ReasonNotToAllow = res.body.data.reasonNotToAllow;
          this.parentVM.employerName =  res.body.data.employerName;
          this.parentVM.employerNumber =  res.body.data.employerNumber;
          this.childList = [];
          if (res.body.data.associatedChild !== null && res.body.data.associatedChild !== []) {
            res.body.data.associatedChild.forEach(element => {
              this.childList.push(element.studentID);
            });
          }
          if (res.body.data.isSecondaryParent === true) {
            this.isSecondparent = true;
            this.isGuardian = false;
            this.isParent = false;
            this.showExtraFields = true;
            this.profileForm.controls['masterparentid'].setValidators(Validators.required);
            this.profileForm.controls['masterparentid'].updateValueAndValidity();
            this.profileForm.controls['associatedchildid'].setValidators(Validators.required);
            this.profileForm.controls['associatedchildid'].updateValueAndValidity();
          } else if (this.parentVM.isParent === true) {
            this.isGuardian = false;
            this.isParent = true;
            this.isSecondparent = false;
            this.showExtraFields = false;
            this.profileForm.controls['masterparentid'].setValidators(Validators.nullValidator);
            this.profileForm.controls['masterparentid'].updateValueAndValidity();
            this.profileForm.controls['associatedchildid'].setValidators(Validators.nullValidator);
            this.profileForm.controls['associatedchildid'].updateValueAndValidity();
          } else {
            this.isGuardian = true;
            this.isParent = false;
            this.isSecondparent = false;
            this.showExtraFields = true;
            this.profileForm.controls['masterparentid'].setValidators(Validators.required);
            this.profileForm.controls['masterparentid'].updateValueAndValidity();
            this.profileForm.controls['associatedchildid'].setValidators(Validators.required);
            this.profileForm.controls['associatedchildid'].updateValueAndValidity();
          }

          if (res.body.data.isAuthorizedToPickup === true) {
            this.reasonNotToAllowbox = false;
            this.profileForm.controls['notallowedreason'].setValidators(Validators.nullValidator);
            this.profileForm.controls['notallowedreason'].updateValueAndValidity();
          } else {
            this.reasonNotToAllowbox = true;
            this.profileForm.controls['notallowedreason'].setValue('');
            this.profileForm.controls['notallowedreason'].setValidators(Validators.required);
            this.profileForm.controls['notallowedreason'].updateValueAndValidity();
          }


          this.parentVM.HomePhone = res.body.data.homePhone;
          this.image = res.body.data.imagePath;
          this.editParentForm();
          this.getAllStudentOfParentList(2);
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


  getAllParentList() {
    this.loader = true;
    this.parentList = [];
    const req = {
      'AgencyID': this.commonService.getAgencyId(),
      'ActivationType': this.activationType,
      'limit': this.limit,
      'page': this.pageNo,
      'ParentName': this.nameSearch
    };
    this.apiService.postData(AgencyAPIURLs.GetAllParentInformationForAgency, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.totalRecord = res.body.totalRows;
        this.parentList = res.body.data;
        this.loader = false;
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


  getAllStudentOfParentList(type) {
    this.spinner.show();
    this.parentChildList = [];
    const req = {
      'AgencyID': this.commonService.getAgencyId(),
      'ParentID': type === 1 ? this.profileForm.value.masterparentid : this.parentVM.addedByID
    };
    this.apiService.postData(AgencyAPIURLs.GetAllStudentForParentDropdown, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.parentChildList = res.body.data;
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


  getMasterParentList() {
    this.masterParentList = [];
    const req = {
      'AgencyID': this.commonService.getAgencyId(),
    };
    this.apiService.postData(AgencyAPIURLs.GetMasterParentForDropdown, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.masterParentList = res.body.data;
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


  // Method to delete/deactivate Parent
  activateParent(value) {
    this.confirmationService.confirm({
      message: 'Do you want to activate this user?',
      accept: () => {
        this.spinner.show();
        const req = {
          'AgencyID': this.commonService.getAgencyId(),
          'id': value.id,
          'IsDeleted': false,
          'UpdatedBy': this.commonService.getReleventUserId('userdetails')
        };
        this.apiService.postData(AgencyAPIURLs.ActivateParent, req, null).subscribe(res => {
          if (res.body.statusCode === 200) {
            this.notification.success({ message: 'This user has been activated', title: '' });
            this.getAllParentList();
          } else {
            this.spinner.hide();
            this.error.unknownError();
          }
        }, err => {
          this.spinner.hide();
          this.error.commonError(err);
        });
      }
    });
  }


  updateProfile() {
    this.linkedChildList = [];
    if (this.profileForm.valid) {
      this.spinner.show();
      this.parentVM.FirstName = this.profileForm.value.firstname;
      this.parentVM.LastName = this.profileForm.value.lastname;
      this.parentVM.EmailId = this.profileForm.value.email;
      this.parentVM.Mobile = this.profileForm.value.mobile;
      this.parentVM.relationTypeId = this.profileForm.value.relationid;
      this.parentVM.employerName = this.profileForm.value.employername;
      this.parentVM.employerNumber = this.profileForm.value.employernumber === '' ? 0 : this.profileForm.value.employernumber ;
      this.parentVM.addedByID = this.profileForm.value.masterparentid === '' ? 0 : this.profileForm.value.masterparentid;
      if (this.isParent === true) {
        this.parentVM.isParent = true;
        this.parentVM.isGaurdian = false;
        this.parentVM.isSecondaryParent = false;
      } else if (this.isGuardian === true) {
        this.parentVM.isParent = false;
        this.parentVM.isGaurdian = true;
        this.parentVM.isSecondaryParent = false;
      } else {
        this.parentVM.isParent = false;
        this.parentVM.isGaurdian = false;
        this.parentVM.isSecondaryParent = true;
      }
      if (this.id === 0) {
        this.parentVM.createdBy = this.commonService.getReleventUserId('userdetails');
      } else {
        this.parentVM.updatedBy = this.commonService.getReleventUserId('userdetails');
      }
      if (this.profileForm.value.associatedchildid.length !== 0) {
        this.profileForm.value.associatedchildid.forEach(element => {
          this.linkedChildList.push({
            'studentID': element,
          });
        });
      }
      this.parentVM.ImagePath = this.image;
      this.parentVM.Id = this.id;
      this.image = this.profileimage;
      this.parentVM.AgencyID = this.commonService.getAgencyId();
      this.spinner.hide();
      this.parentVM.AssociatedChild = this.linkedChildList;
      console.log('data', this.parentVM);

      this.apiService.postData(ParentAPIURLs.SaveParentInformation, this.parentVM, null).subscribe(res => {
        if (res.body.statusCode === 200) {
          this.flag = false;
          this.notification.success({
            message: this.id === 0 ? 'New user created successfully!' : 'User information updated successfully!',
            title: ''
          });
          this.spinner.hide();
          $('.addparent').modal('hide');
          this.getAllParentList();
        } else if (res.body.statusCode === 986) {
          this.spinner.hide();
          this.notification.warning({ message: ' User already exist !', title: '' });
        } else if (res.body.statusCode === 205) {
          this.spinner.hide();
          this.notification.warning({ message: 'Please enter valid name', title: '' });
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
      this.commonService.validateAllFields(this.profileForm);
    }
  }


  paginate(event) {
    this.pageNo = event.page;
    this.getAllParentList();
  }

saveAdvancePay() {
  this.spinner.show();
  if (this.advanceAmount > 0 ) {
    const data = {
      'agencyID': this.commonService.getAgencyId(),
      'ParentId':  this.parentIdForAdavance,
      'CreditAdvanceAmount': this.advanceAmount
    };
    this.apiService.postData(ParentAPIURLs.SaveAdvanceFeePaymentDetails, data, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        $('.advancepay').modal('hide');
       this.getAllParentList();
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
    this.notification.warning({message: 'Amount should be grater than zero', title: ''});
  }
}

parentInfoForAdavance(value) {
  this.advanceAmount = 0;
  this.parentIdForAdavance = value.id;
}
keyDownFunction(event) {
  if (event.keyCode === 13) {
    this.getAllParentList();
  }
}

}
