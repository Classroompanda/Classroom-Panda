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
  selector: 'app-agency-admin-parent',
  templateUrl: './agency-admin-parent.component.html',
  styleUrls: ['./agency-admin-parent.component.css']
})
export class AgencyAdminParentComponent implements OnInit {
  linkedChildList: any[] = [];
  parentVM: ParentDetailsVM;
  profileForm: FormGroup;
  newEmailForm: FormGroup;
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
  allowPickup = false;
  masterParentList: any[] = [];
  parentChildList: any[] = [];
  parentUpdatedInfoList: any[] = [];
  childList: any[] = [];
  emailPattern = /^([\w-\.]+\u0040([\w-]+\.)+[\w-]{2,4})?$/;
  addMode: boolean;
  isSecondparent = false;
  isGuardian = false;
  isSecondary = false;
  relationTypeList: any[] = [];
  showExtraFields = false;
  isParent = true;
  reasonNotToAllowbox = true;
  parentID: number;
  activationType = 'Activated';
  pageNo = 0;
  limit = 10;
  totalRecord = 0;
  loader = true;
  isSubscriptionActive: boolean;
  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  agencyId: any;
  nameSearch = '';
  rejectedUserList: any[] = [];
  advanceAmount = 0;
  parentIdForAdavance = 0;
  date: any;
  videoPath = '';
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
    this.getAllCountries();
    this.GetAgencyCountryStateID();
    this.getAllParentList();
    this.getRelationType();
    this.getMasterParentList();
    this.newEmailCrateForm();
    this.getSectionVideo();
  }

  OpenInfoVideo(data) {
    $('#infovideo').modal('show');
  }

  getSectionVideo() {
    const req = {
      'SectionID': 1
    };
    this.apiService.postData(TeacherAPIURLs.GetVideoForSection, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.videoPath = res.body.filePath;
        console.log(this.videoPath, 'bbbbbbbbbbbbbbb');
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

  PauseInfoVideo() {
    const myVideo: any = document.getElementById('pausevideo');
    myVideo.pause();
    myVideo.currentTime = 0;
  }

  newEmailCrateForm() {
    this.newEmailForm = this.fb.group({
      newemail: ['', [Validators.required, Validators.pattern(this.emailPattern)]]
    });
  }


  getparentIdForEmailUpdate(data) {
    if (data) {
      this.id = data.id;
    }
  }


  // method to update email
  upateEmail() {
    if (this.newEmailForm.valid) {
      this.loader = true;
      this.spinner.show();
      const req = {
        'AgencyID': this.commonService.getAgencyId(),
        'id': this.id,
        'EmailId': this.newEmailForm.controls.newemail.value.trim()
      };
      this.apiService.postData(AgencyAPIURLs.UpdateEmailForParent, req, null).subscribe(res => {
        if (res.body.statusCode === 200) {
          $('.mailupdate').modal('hide');
          this.notification.success({ message: res.body.message, title: '' });
          this.getAllParentList();
        } else {
          this.spinner.hide();
          this.notification.warning({ message: res.body.message, title: '' });
        }
      }, err => {
        this.spinner.hide();
        this.error.commonError(err);
      }
      );
    } else {
      this.spinner.hide();
      this.commonService.validateAllFields(this.newEmailForm);
    }
  }

  // Methode to change Quick Pin for User
  changeQuickPin(value) {
    this.confirmationService.confirm({
      message: 'Do you want to change Quick Pin for this user?',
      accept: () => {
        this.spinner.show();
        const req = {
          'AgencyID': this.commonService.getAgencyId(),
          'id': value.id,
        };
        this.apiService.postData(AgencyAPIURLs.ChangeQuickPinForParent, req, null).subscribe(res => {
          if (res.body.statusCode === 200) {
            this.spinner.hide();
            this.notification.success({ message: res.body.message, title: '' });
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



  clearEmailForm() {
    this.newEmailCrateForm();
  }

  createParentForm() {
    this.profileForm = this.fb.group({
      firstname: ['', Validators.required],
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
      typeofparent: ['parent'],
      masterparentid: [''],
      associatedchildid: [''],
      relationid: ['', Validators.required],
      notallowedreason: [''],
      allowpickup: [false],
      notallowpickup: [false],
      employername: [''],
      employernumber: [''],
      employeraddress: [''],
      joinclassroom: [false]
    });
    this.getStatesList();
    this.getCitiesList();
  }

  editParentForm() {
    this.disableEmail = true;
    if (this.parentVM.IsAuthorizedToPickup === true) {
      this.allowPickup = false;
    } else {
      this.allowPickup = true;
    }
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
      notallowpickup: this.allowPickup,
      joinclassroom: [this.parentVM.IsJoinClassroom],
      employername: [this.parentVM.employerName],
      employernumber: [this.parentVM.employerNumber],
      employeraddress: [this.parentVM.employerAddress]
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
          this.parentVM.employerName = res.body.data.employerName;
          this.parentVM.employerNumber = res.body.data.employerNumber;
          this.parentVM.employerAddress = res.body.data.employerAddress;
          this.parentVM.IsJoinClassroom = res.body.data.isJoinClassroom;
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

  getParentUpdateInfo(value) {
    this.spinner.show();
    this.parentUpdatedInfoList = [];
    const req = {
      'AgencyID': this.commonService.getAgencyId(),
      'parentID': value.id
    };
    this.apiService.postData(ParentAPIURLs.GetParentUpdatedInformation, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.parentUpdatedInfoList = res.body.data;
        if (this.parentUpdatedInfoList.length > 0) {
          this.parentID = this.parentUpdatedInfoList[0].parentID;
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

  deleteParentUpdatedInfo(id) {
    this.spinner.show();
    this.parentUpdatedInfoList = [];
    const req = {
      'AgencyID': this.commonService.getAgencyId(),
      'ParentID': id
    };
    this.apiService.postData(ParentAPIURLs.DeleteParentUpdatedInformation, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        $('.pupdated').modal('hide');
        this.parentID = 0;
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
        console.log(this.parentList);
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
          'DeletedBy': this.commonService.getReleventUserId('userdetails')
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
    this.notification.success({ message: 'This User has been deactivated', title: '' });
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


  // verify thta profile updating  with new photo or without photo
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
        this.parentVM.GenderID = this.profileForm.value.gender;
        this.parentVM.Profession = this.profileForm.value.profession;
        this.parentVM.relationTypeId = this.profileForm.value.relationid;
        this.parentVM.employerName = this.profileForm.value.employername;
        this.parentVM.employerNumber = this.profileForm.value.employernumber === '' ? 0 : this.profileForm.value.employernumber;
        this.parentVM.employerAddress = this.profileForm.value.employeraddress;
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
        this.parentVM.ReasonNotToAllow = this.profileForm.value.notallowedreason;
        /**Only guardian and second parent users has option for Is auth to pickup, parent always authorize to pickup  */
        if (this.isGuardian === true) {
          this.parentVM.IsAuthorizedToPickup = this.profileForm.value.allowpickup;
        } else if (this.isSecondparent === true) {
          if (this.profileForm.value.notallowpickup === true) {
            this.parentVM.IsAuthorizedToPickup = false;
          } else {
            this.parentVM.IsAuthorizedToPickup = true;
          }
        } else {
          this.parentVM.IsAuthorizedToPickup = true;
        }
        this.parentVM.HomePhone = this.profileForm.value.homephone;
        this.parentVM.ImagePath = this.image;
        this.parentVM.Id = this.id;
        this.image = this.profileimage;
        this.parentVM.AgencyID = this.commonService.getAgencyId();
        this.spinner.hide();
        this.parentVM.AssociatedChild = this.linkedChildList;
        this.parentVM.IsJoinClassroom = this.profileForm.value.joinclassroom;
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
    this.formData = new FormData();
    const self = this;
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
      console.log(this.fileData, 'fffffffffffffffffff');
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
    this.showExtraFields = false;
    this.isParent = true;
    this.isGuardian = false;
    this.isSecondparent = false;
    this.addMode = true;
    this.id = 0;
    this.parentVM = {};
    this.disableEmail = false;
    this.image = '';
    this.createParentForm();
  }


  getTypeofparent(event) {
    if (event === 'secondparent') {
      this.profileForm.controls['masterparentid'].setValidators(Validators.required);
      this.profileForm.controls['associatedchildid'].setValidators(Validators.required);
      this.profileForm.controls['masterparentid'].updateValueAndValidity();
      this.profileForm.controls['associatedchildid'].updateValueAndValidity();
      this.profileForm.controls['notallowedreason'].setValidators(Validators.nullValidator);
      this.profileForm.controls['notallowedreason'].updateValueAndValidity();
      this.isSecondparent = true;
      this.isGuardian = false;
      this.isParent = false;
      this.showExtraFields = true;
      this.reasonNotToAllowbox = false;
    } else if (event === 'parent') {
      this.isSecondparent = false;
      this.isGuardian = false;
      this.isParent = true;
      this.showExtraFields = false;
      this.reasonNotToAllowbox = false;
      this.profileForm.controls['notallowedreason'].setValidators(Validators.nullValidator);
      this.profileForm.controls['notallowedreason'].updateValueAndValidity();
      this.profileForm.controls['masterparentid'].setValidators(Validators.nullValidator);
      this.profileForm.controls['associatedchildid'].setValidators(Validators.nullValidator);
      this.profileForm.controls['masterparentid'].updateValueAndValidity();
      this.profileForm.controls['associatedchildid'].updateValueAndValidity();
    } else {
      this.isGuardian = true;
      this.isSecondparent = false;
      this.isParent = false;
      this.showExtraFields = true;
      this.profileForm.controls['masterparentid'].setValidators(Validators.required);
      this.profileForm.controls['masterparentid'].updateValueAndValidity();
      this.profileForm.controls['associatedchildid'].setValidators(Validators.required);
      this.profileForm.controls['associatedchildid'].updateValueAndValidity();
      this.profileForm.controls['notallowedreason'].setValidators(Validators.required);
      this.profileForm.controls['notallowedreason'].updateValueAndValidity();
      this.reasonNotToAllowbox = true;
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

  markAsNotAllowToPickup() {
    if (this.profileForm.value.notallowpickup === true) {
      this.reasonNotToAllowbox = true;
      this.profileForm.controls['notallowedreason'].setValidators(Validators.required);
      this.profileForm.controls['notallowedreason'].updateValueAndValidity();
    } else {
      this.reasonNotToAllowbox = false;
      this.profileForm.controls['notallowedreason'].setValue('');
      this.profileForm.controls['notallowedreason'].setValidators(Validators.nullValidator);
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
    console.log(event);
    this.pageNo = event.page;
    this.getAllParentList();
  }
  processCSVFile(event) {

    this.spinner.show();
    this.formData = new FormData();
    this.agencyId = this.commonService.getAgencyId();
    if (event.target.files && event.target.files[0] && event.target.files[0].name.includes('.csv')) {
      this.formData.append('FileName', event.target.files[0], event.target.files[0].name);
      this.formData.append('AgencyId', this.commonService.getAgencyId().toString());
      this.formData.append('CreatedBy', this.commonService.getLoggedInUserId().toString());
      this.apiService.uploadImage(AgencyAPIURLs.UploadParentUserWithFile, this.formData, null).subscribe(res => {

        if (res.body.statusCode === 200) {
          this.spinner.hide();
          event.target.value = '';
          this.getAllParentList();
          this.notification.success({ message: 'File uploaded successfully', title: 'Success' });
        } else if (res.body.statusCode === 987) {
          this.spinner.hide();
          this.getAllParentList();
          this.rejectedUserList = res.body.data;
          $('.rejectedUsr').modal('show');
        } else {
          this.spinner.hide();
          this.error.unknownError();
        }
      }, err => {
        this.spinner.hide();
        this.error.commonError(err);
        this.toaster.error({ message: 'Something went wrong', title: 'Error' });
      });
    } else {
      this.spinner.hide();
      this.toaster.warning({ message: 'Unsupported file type', title: 'Warning' });
    }
  }

  saveAdvancePay() {
    this.spinner.show();
    if (this.advanceAmount > 0) {
      const data = {
        'agencyID': this.commonService.getAgencyId(),
        'ParentId': this.parentIdForAdavance,
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
      this.notification.warning({ message: 'Amount should be grater than zero', title: '' });
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
