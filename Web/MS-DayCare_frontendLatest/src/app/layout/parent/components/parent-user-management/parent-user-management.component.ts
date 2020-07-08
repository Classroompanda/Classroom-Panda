import { Component, OnInit } from '@angular/core';
import { ParentDetailsVM } from '../../shared/view-model/parent-detailsvm';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { ParentApiService } from '../../shared/services/parent-api-service';
import { ErrorHandlerService } from '../../../../shared/services/error-handler/error-handler.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from '../../../../shared/services/notification-service/notification.service';
import { CommonService } from '../../../../shared/services/common/common.service';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { ParentAPIURLs } from '../../shared/constant';
import { AgencyAPIURLs } from '../../../agency-admin/components/shared/constatant';
import { TeacherAPIURLs } from '../../../teacher/shared/constant';
declare var $: any;

@Component({
  selector: 'app-parent-user-management',
  templateUrl: './parent-user-management.component.html',
  styleUrls: ['./parent-user-management.component.css']
})
export class ParentUserManagementComponent implements OnInit {

  linkedChildList: any[] = [];
  parentVM: ParentDetailsVM;
  profileForm: FormGroup;
  countryList: any[];
  stateList: any[];
  cityList: any[];
  agencyStateID: any;
  agencyCountryID: any;
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
  isSecondparent: boolean;
  isGuardian: boolean;
  isSecondary: boolean;
  relationTypeList: any[] = [];
  showExtraFields = true;
  isParent: boolean;
  showBtnGuardian = false;
  reasonNotToAllowbox = true;
  guardian: boolean;
  parent: boolean;
  pageNo = 0;
  limit = 10;
  totalRecord = 0;
  secondParent: boolean;
  loader = true;
  date: any;
  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  constructor(private apiService: ParentApiService, private error: ErrorHandlerService,
    private spinner: NgxSpinnerService, private notification: NotificationService,
    private commonService: CommonService, private fb: FormBuilder, private route: ActivatedRoute,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.getParentTypeForParentList();
    this.initialParentType();
    this.spinner.show();
    this.dpConfig = Object.assign({}, { containerClass: 'theme-dark-blue' },
      { showWeekNumbers: false });
    this.image = '';
    this.countryList = [];
    this.cityList = [];
    this.stateList = [];
    this.parentVM = {};
    this.createParentForm();
    this.getAllCountries();
    this.GetAgencyCountryStateID();
    this.getRelationType();
    this.getMasterParentList();
    this.getAllStudentOfParentList(1);
    this.getAllParentList();
  }



  initialParentType() {
    debugger;
    const type = this.commonService.getParentType();
    if (type === 'secondparent') {
      this.isSecondary = false;
      this.showBtnGuardian = true;
      this.isGuardian = true;
      this.isParent = false;
      this.isSecondparent = false;
    } else if (type === 'parent') {
      this.isSecondary = true;
      this.showBtnGuardian = false;
      this.isGuardian = false;
      this.isParent = false;
      this.isSecondparent = true;
    } else {
      this.isSecondary = false;
      this.showBtnGuardian = false;
    }
  }


  createParentForm() {
    this.profileForm = this.fb.group({
      firstname: ['test', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      mobile: ['', Validators.required],
      // address: ['', Validators.required],
      address: [''],
      country: [this.agencyCountryID, Validators.required],
      city: ['', Validators.required],
      state: [this.agencyStateID, Validators.required],
      zipcode: [''],
      // birthdate: ['', Validators.required],
      birthdate: [''],
      hiringdate: [''],
      grospay: [''],
      certification: [''],
      photo: [''],
      homephone: [''],
      gender: ['', Validators.required],
      profession: [''],
      typeofparent: ['secondparent'],
      masterparentid: [''],
      associatedchildid: [''],
      relationid: ['', Validators.required],
      notallowedreason: [''],
      allowpickup: [false],
      employername: [''],
      employernumber: [''],
      employeraddress: ['']
    });
    this.getStatesList();
    this.getCitiesList();
  }

  editParentForm() {
    this.disableEmail = true;
    this.profileForm = this.fb.group({
      firstname: [this.parentVM.FirstName, Validators.required],
      lastname: [this.parentVM.LastName, Validators.required],
      email: [this.parentVM.EmailId],
      mobile: [this.parentVM.Mobile, Validators.required],
      address: [this.parentVM.Address],
      country: [this.parentVM.CountryId, Validators.required],
      city: [this.parentVM.CityId, Validators.required],
      state: [this.parentVM.StateId, Validators.required],
      zipcode: [this.parentVM.PostalCode],
      birthdate: [this.parentVM.DateOfBirth],
      hiringdate: [this.parentVM.DateHired],
      grospay: [this.parentVM.GrossPayPerHour],
      certification: [this.parentVM.Certification],
      photo: [''],
      homephone: [this.parentVM.HomePhone],
      gender: [this.parentVM.GenderID, Validators.required],
      profession: [this.parentVM.Profession],
      typeofparent: [{ value: '', disabled: true }],
      masterparentid: [{ value: this.parentVM.addedByID, disabled: true }],
      associatedchildid: [this.childList],
      relationid: [this.parentVM.relationTypeId, Validators.required],
      notallowedreason: [this.parentVM.ReasonNotToAllow],
      allowpickup: [this.parentVM.IsAuthorizedToPickup],
      employername: [this.parentVM.employerName],
      employernumber: [this.parentVM.employerNumber],
      employeraddress: [this.parentVM.employerAddress]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.profileForm.controls; }

  getParentDetails(value) {
    this.parentVM = {};
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
          this.date = (res.body.data.dateOfBirth).toString();
          if (this.date === '0001-01-01T00:00:00') {
            this.parentVM.DateOfBirth = null;
          } else {
            this.parentVM.DateOfBirth = new Date(res.body.data.dateOfBirth);
          }
          this.parentVM.FirstName = res.body.data.firstName;
          this.parentVM.LastName = res.body.data.lastName;
          this.parentVM.EmailId = res.body.data.emailId;
          this.parentVM.Mobile = res.body.data.mobile;
          this.parentVM.Address = res.body.data.address;
          this.parentVM.CityId = res.body.data.cityId;
          this.parentVM.StateId = res.body.data.stateId;
          this.parentVM.CountryId = res.body.data.countryId;
          this.parentVM.PostalCode = res.body.data.postalCode;
          // this.parentVM.DateOfBirth = new Date(res.body.data.dateOfBirth);
          this.parentVM.GenderID = res.body.data.genderID;
          this.id = res.body.data.id;
          this.parentVM.Profession = res.body.data.profession;
          this.parentVM.relationTypeId = res.body.data.relationTypeId;
          this.parentVM.addedByID = res.body.data.addedByID;
          this.parentVM.isParent = res.body.data.isParent;
          this.parentVM.IsAuthorizedToPickup = res.body.data.isAuthorizedToPickup;
          this.parentVM.ReasonNotToAllow = res.body.data.reasonNotToAllow;
          this.parentVM.isDeleted = res.body.data.isDeleted;
          this.parentVM.employerName = res.body.data.employerName;
          this.parentVM.employerNumber = res.body.data.employerNumber;
          this.parentVM.employerAddress = res.body.data.employerAddress;
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
          this.getAllCountries();
          this.getStatesList();
          this.getCitiesList();
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

  // This methos is use to get parent type to get relevent parent list
  getParentTypeForParentList() {
    const type = this.commonService.getParentType();
    if (type === 'secondparent') {
      this.guardian = false;
      this.parent = false;
      this.secondParent = true;
    } else if (type === 'parent') {
      this.guardian = false;
      this.parent = true;
      this.secondParent = false;
    } else {
      this.guardian = true;
      this.parent = false;
      this.secondParent = false;
    }
  }



  getAllParentList() {
    this.loader = true;
    // this.spinner.show();
    this.parentList = [];
    const req = {
      'AgencyID': this.commonService.getAgencyId(),
      'parentID': this.commonService.getReleventUserId('userdetails'),
      'isParent': this.parent,
      'isSecondaryParent ': this.secondParent,
      'isGaurdian': this.guardian,
      'limit': this.limit,
      'page': this.pageNo
    };
    this.apiService.postData(AgencyAPIURLs.GetParentAccordingtoLogin, req, null).subscribe(res => {
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
    this.loader = true;
    this.spinner.show();
    this.parentChildList = [];
    const req = {
      'AgencyID': this.commonService.getAgencyId(),
      'ParentID': this.commonService.getReleventUserId('userdetails')
      // type === 1 ? this.profileForm.value.masterparentid : this.parentVM.addedByID
    };
    this.apiService.postData(AgencyAPIURLs.GetAllStudentForParentDropdown, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.parentChildList = res.body.data;
        this.spinner.hide();
        this.loader = false;
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
    this.loader = true;
    // this.spinner.show();
    this.masterParentList = [];
    const req = {
      'AgencyID': this.commonService.getAgencyId(),
    };
    this.apiService.postData(AgencyAPIURLs.GetMasterParentForDropdown, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.masterParentList = res.body.data;
        this.loader = false;
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
  deleteParent(value) {
    this.confirmationService.confirm({
      message: 'Do you want to deactivate this user?',
      accept: () => {
        this.spinner.show();
        const req = {
          'AgencyID': this.commonService.getAgencyId(),
          'id': value.id,
          'IsDeleted': true,
          'DeletedDate': new Date(),
          'DeletedBy': this.commonService.getLoggedInUserId()
        };
        this.apiService.postData(ParentAPIURLs.SaveParentInformation, req, null).subscribe(res => {
          if (res.body.statusCode === 200) {
            this.deleteParentSuccess(value);
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

  deleteParentSuccess(data) {
    this.getAllParentList();
    this.notification.success({ message: 'This user has been deactivated', title: '' });
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
          'UpdatedBy': this.commonService.getLoggedInUserId()
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


  getAllCountries() {
    this.countryList = [];
    const req = {
      'AgencyID': this.commonService.getAgencyId(),
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

  getStatesList() {
    this.spinner.show();
    this.stateList = [];
    this.cityList = [];
    const req = {
      'AgencyID': this.commonService.getAgencyId(),
      'CountryId': this.profileForm.value.country
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

  getCitiesList() {
    this.spinner.show();
    this.cityList = [];
    const req = {
      'AgencyID': this.commonService.getAgencyId(),
      'StateId': this.profileForm.value.state
    };
    this.apiService.postData(TeacherAPIURLs.GetAllCities, req, null).subscribe(res => {
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

  GetAgencyCountryStateID() {
    this.spinner.show();
    const req = {
      'AgencyID': this.commonService.getAgencyId(),
    };
    this.apiService.postData(AgencyAPIURLs.GetAgencyCountryStateID, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        console.log(res.body.data);
        this.agencyCountryID = res.body.data.countryId;
        this.agencyStateID = res.body.data.stateId;
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


  SaveParentDetails() {
    this.spinner.show();
    if (this.flag === true) {
      this.UploadImage();
      this.flag = false;
    } else {
      this.updateProfile();
    }
  }


  updateProfile() {
    this.linkedChildList = [];
    if (this.profileForm.valid) {
      if (this.profileForm.value.relationid === 0) {
        this.spinner.hide();
        this.notification.warning({ message: 'Please select relation with student', title: '' });
      } else {
        this.spinner.show();
        this.parentVM.UpdatedFlag = 1;
        this.parentVM.FirstName = this.profileForm.value.firstname;
        this.parentVM.LastName = this.profileForm.value.lastname;
        this.parentVM.EmailId = this.profileForm.value.email;
        this.parentVM.Mobile = this.profileForm.value.mobile;
        this.parentVM.Address = this.profileForm.value.address;
        this.parentVM.CityId = this.profileForm.value.city;
        this.parentVM.StateId = this.profileForm.value.state;
        this.parentVM.CountryId = this.profileForm.value.country;
        this.parentVM.PostalCode = this.profileForm.value.zipcode;
        // tslint:disable-next-line: max-line-length
        this.parentVM.DateOfBirth = this.profileForm.value.birthdate === '' || this.profileForm.value.birthdate === null ? new Date('0001-01-01T05:53:28') : this.profileForm.value.birthdate;
        //this.parentVM.DateOfBirth = this.profileForm.value.birthdate;
        this.parentVM.GenderID = this.profileForm.value.gender;
        this.parentVM.Profession = this.profileForm.value.profession;
        this.parentVM.relationTypeId = this.profileForm.value.relationid;
        this.parentVM.addedByID = this.commonService.getReleventUserId('userdetails');
        if (this.isSecondparent === true) {
          this.parentVM.isParent = false;
          this.parentVM.isGaurdian = false;
          this.parentVM.isSecondaryParent = true;
        } else if (this.isGuardian === true) {
          this.parentVM.isParent = false;
          this.parentVM.isGaurdian = true;
          this.parentVM.isSecondaryParent = false;
        }
        if (this.id === 0) {
          this.parentVM.createdBy = this.commonService.getReleventUserId('userdetails');
        } else {
          this.parentVM.updatedBy = this.commonService.getReleventUserId('userdetails');
        }
        if (this.profileForm.value.associatedchildid.length !== 0) {
          this.profileForm.value.associatedchildid.forEach(element => {
            this.linkedChildList.push({
              'studentID': element
            });
          });
        }
        this.parentVM.ReasonNotToAllow = this.profileForm.value.notallowedreason;
        if (this.isGuardian === true) {
          this.parentVM.IsAuthorizedToPickup = this.profileForm.value.allowpickup;
        } else {
          this.parentVM.IsAuthorizedToPickup = true;
        }
        this.parentVM.HomePhone = this.profileForm.value.homephone ? this.profileForm.value.homephone : 0;
        this.parentVM.ImagePath = this.image;
        this.parentVM.Id = this.id;
        this.image = this.profileimage;
        this.parentVM.AgencyID = this.commonService.getAgencyId();
        this.parentVM.AssociatedChild = this.linkedChildList;
        this.parentVM.employerName = this.profileForm.value.employername;
        this.parentVM.employerNumber = this.profileForm.value.employernumber ? this.profileForm.value.employernumber : 0;
        this.parentVM.employerAddress = this.profileForm.value.employeraddress;
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
      }
    } else {
      this.spinner.hide();
      this.commonService.validateAllFields(this.profileForm);
    }
  }

  allowOnlyNumber(event) {
    this.commonService.allowOnlyNumber(event);
  }
  clearStateCity() {
    this.profileForm.controls['state'].setValue('');
    this.profileForm.controls['city'].setValue('');
  }
  clearCity() {
    this.profileForm.controls['city'].setValue('');
  }
  processFile(event) {
    const self = this;
    this.formData = new FormData();
    if (event.target.files && event.target.files[0]) {
      if (event.target.files[0].type !== 'image/png' && event.target.files[0].type !== 'image/jpeg' &&
        event.target.files[0].type !== 'image/jpg') {
        self.fileData = null;
        self.profileimage = '';
        return false;
      }
      const reader = new FileReader();
      this.formData.append('fileData', event.target.files[0], event.target.files[0].name);
      self.fileData = this.formData;
      reader.readAsDataURL(event.target.files[0]); // read file as data url     
      setTimeout(() => {
        this.image = reader.result;
      }, 100);
      this.flag = true;
    }
  }

  UploadImage() {
    this.apiService.uploadImage(TeacherAPIURLs.UploadImage, this.fileData, null).subscribe(res => {
      if (res.status === 200) {
        this.image = res.body.data;
        this.updateProfile();
      }
    }, err => {
      this.error.commonError(err);
    });
  }

  cleareAllForm() {
    this.initialParentType();
    this.showExtraFields = true;
    this.addMode = true;
    this.id = 0;
    this.parentVM = {};
    this.disableEmail = false;
    this.image = '';
    this.createParentForm();
  }


  getTypeofparent(event) {
    if (event === 'secondparent') {
      this.profileForm.controls['notallowedreason'].setValidators(Validators.nullValidator);
      this.profileForm.controls['associatedchildid'].setValidators(Validators.required);
      this.profileForm.controls['notallowedreason'].updateValueAndValidity();
      this.profileForm.controls['associatedchildid'].updateValueAndValidity();
      this.isSecondparent = true;
      this.isGuardian = false;
      this.isParent = false;
      this.showExtraFields = true;
    } else if (event === 'parent') {

    } else {
      this.isGuardian = true;
      this.isSecondparent = false;
      this.isParent = false;
      this.showExtraFields = true;
      this.profileForm.controls['notallowedreason'].setValidators(Validators.required);
      this.profileForm.controls['notallowedreason'].updateValueAndValidity();
      this.profileForm.controls['associatedchildid'].setValidators(Validators.required);
      this.profileForm.controls['associatedchildid'].updateValueAndValidity();

    }
  }

  markAsAllowToPickup() {
    if (this.profileForm.value.allowpickup === true) {
      this.reasonNotToAllowbox = false;
      this.profileForm.controls['notallowedreason'].setValidators(Validators.nullValidator);
      this.profileForm.controls['notallowedreason'].updateValueAndValidity();
    } else {
      this.reasonNotToAllowbox = true;
      this.profileForm.controls['notallowedreason'].setValue('');
      this.profileForm.controls['notallowedreason'].setValidators(Validators.required);
      this.profileForm.controls['notallowedreason'].updateValueAndValidity();
    }

  }


  getRelationType() {
    this.relationTypeList = [];
    const data = {
      'agencyID': this.commonService.getAgencyId(),
    };
    this.apiService.postData(ParentAPIURLs.GetRelationType, data, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.relationTypeList = res.body.data;
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


  paginate(event) {
    this.pageNo = event.page;
    this.getAllParentList();
  }

}
