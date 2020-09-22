import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { AgencyAPIURLs } from 'src/app/layout/agency-admin/components/shared/constatant';
import { AgencyApiService } from 'src/app/layout/agency-admin/components/shared/services/agency-api-service/agency-api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler/error-handler.service';
import { NotificationService } from 'src/app/shared/services/notification-service/notification.service';
import { TeacherAPIURLs } from 'src/app/layout/teacher/shared/constant';
import { PersonAuthorizationVM } from '../../shared/view-model/authorize-personvm';
import { GlobalAPIURLs } from '../../shared/constant';
import { ConfirmationService } from 'primeng/api';
declare var $: any;


@Component({
  selector: 'app-global-authorized-person',
  templateUrl: './global-authorized-person.component.html',
  styleUrls: ['./global-authorized-person.component.css']
})
export class GlobalAuthorizedPersonComponent implements OnInit {
  profileForm: FormGroup;
  formData: FormData;
  fileData: FormData;
  image: any;
  flag = false;
  personAuthorizedVM: PersonAuthorizationVM;
  disableEmail = false;
  studentsList: any[] = [];
  authorizedPersonList: any[] = [];
  parentList: any[] = [];
  StudentIDs: any[] = [];
  studentId: number;
  totalRecord = 0;
  reasonNotToAllowbox = true;
  emailPattern = /^([\w-\.]+\u0040([\w-]+\.)+[\w-]{2,4})?$/;
  role = 0;
  roleId = 0;
  agencyId = 0;
  isSubscriptionActive: boolean;
  isAddMode: boolean;
  limit = 10;
  pageNo = 0;
  isDeactivated = true;
  nameSearch = '';
  showEmergency = false;
  loader = false;
  videoPath = '';
  constructor(private fb: FormBuilder, public commonService: CommonService,
    private apiService: AgencyApiService, private confirmationService: ConfirmationService,
    private spinner: NgxSpinnerService, private error: ErrorHandlerService, private notification: NotificationService) {
       this.role = this.commonService.getUserRole('userdetails');
       this.agencyId = this.commonService.getAgencyId();
       this.isSubscriptionActive = this.commonService.getSubscriptionStatus();
     }

  ngOnInit() {
    this.roleId = this.commonService.getReleventUserId('userdetails');
    if (this.role === 4) {
      this.getAllStudentsList();
    }
    this.getAllAuthorizedPersonList();
    this.createAuthorizationForm();
    this.getAllParentList();
    this.getSectionVideo();
  }


  OpenInfoVideo(data) {
    $('#infovideo').modal('show');
  }

  getSectionVideo() {
    const req = {
      'SectionID': 4
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



  getAllAuthorizedPersonList() {
    this.loader = true;
    this.spinner.show();
    this.authorizedPersonList = [];
    const req = {
      'AgencyID': this.commonService.getAgencyId(),
      'ParentId': this.role === 4 ? this.roleId : 0,
      'limit': this.limit,
      'page': this.pageNo,
      'authorizedPersonName': this.nameSearch,
      'IsEmergencyContact': this.showEmergency,

    };
    this.apiService.postData(GlobalAPIURLs.GetAuthorizedPersonDetails, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.totalRecord = res.body.totalRows;
          this.authorizedPersonList = res.body.data;
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

  createAuthorizationForm() {
    this.profileForm = this.fb.group({
      studentName: ['', [Validators.required]],
      parentName: ['', [Validators.required]],
      email: ['', [ Validators.pattern(this.emailPattern)]],
      mobile: [''],
      authorizedPersonName: ['', Validators.required],
      photo: [''],
      notallowedreason: [''],
      emergencypickup: [false],
    });
  }

  get f() { return this.profileForm.controls; }


  saveForm() {
    if (this.role === 2) {
      this.profileForm.controls['parentName'].setValidators(Validators.required);
      this.profileForm.controls['parentName'].updateValueAndValidity();
    } else {
      this.profileForm.controls['parentName'].setValidators(Validators.nullValidator);
      this.profileForm.controls['parentName'].updateValueAndValidity();
    }
    if (this.profileForm.valid) {
      this.personAuthorizedVM = {
        Id: 0,
        AgencyID: this.commonService.getAgencyId(),
        ParentID : this.role === 2 ?  this.profileForm.controls.parentName.value : this.commonService.getReleventUserId('userdetails'),
        StudentIDs : this.profileForm.controls.studentName.value,
        Mobile: this.profileForm.controls.mobile.value,
        EmailId: this.profileForm.controls.email.value,
        AuthorizedPersonName: this.profileForm.controls.authorizedPersonName.value,
        imagePath: this.image ? this.image : '',
        IsAuthorizedPickUp: true,
        isAddMode: this.isAddMode,
        IsEmergencyContact: this.profileForm.controls.emergencypickup.value,
        QuickPin: this.personAuthorizedVM.QuickPin
      };
      this.apiService.postData(GlobalAPIURLs.SaveAuthorizedPersonDetails, this.personAuthorizedVM, null).subscribe(res => {
        if (res.body.statusCode === 200) {
          this.totalRecord = res.body.totalRows;
          this.spinner.hide();
          this.notification.success({message: res.body.message , title: ''});
          $('#authpermodal').modal('hide');
          $('#authparentmodal').modal('hide');
          this.getAllAuthorizedPersonList();
        } else {
          this.spinner.hide();
          this.notification.warning({message: res.body.message , title: ''});
        }
      }, err => {
        this.spinner.hide();
        this.error.commonError(err);
      });
    } else {
      this.spinner.hide();
      this.commonService.validateAllFields(this.profileForm);
    }
  }

  getAllParentList() {
    this.parentList = [];
    const req = {
      'AgencyID': this.commonService.getAgencyId(),
    };
    this.apiService.postData(AgencyAPIURLs.GetAllParentWithoutGuardian, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.parentList = res.body.data;
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

  getAllStudentsList() {
    this.spinner.show();
    this.studentsList = [];
    const req = {
      'AgencyID': this.commonService.getAgencyId(),
      'studentID': 0,
      'parentID': this.role !== 2 ? this.commonService.getReleventUserId('userdetails') :
      this.profileForm.value.parentName,
      'studentName': '',
    };
    this.apiService.postData(GlobalAPIURLs.GetAllStudentByParentIdDropdown, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        if (res.body.data.length > 0 && res.body.data !== []) {
          this.studentsList = res.body.data;
          this.spinner.hide();
        } else {
          this.spinner.hide();
        }
      } else {
        this.spinner.hide();
      }
    }, err => {
      this.spinner.hide();
      this.error.commonError(err);
    }
    );
  }

  processFile(event) {
    this.formData = new FormData();
    const self = this;
    if (event.target.files && event.target.files[0]) {
      if (event.target.files[0].type !== 'image/png' && event.target.files[0].type !== 'image/jpeg' &&
        event.target.files[0].type !== 'image/jpg') {
        self.fileData = null;
        this.notification.warning({ message: 'File not format not supported', title: '' });
        return false;
      }
      const reader = new FileReader();
      this.formData = new FormData();
      this.formData.append('fileData', event.target.files[0], event.target.files[0].name);
      self.fileData = this.formData;
      reader.readAsDataURL(event.target.files[0]);
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

        this.saveForm();
      }
    }, err => {
      this.error.commonError(err);
    });
  } 

  saveDetails() {
  this.spinner.show();
    if (this.flag === true) {
      this.UploadImage();
      this.flag = false;
    } else {
      this.saveForm();
    }
  }


  onClick() {
    this.image = '';
    this.isAddMode = true;
    this.isDeactivated = false;
    this.personAuthorizedVM = {};
    if (this.role === 2) {
      this.studentsList = [];
    }
    this.createAuthorizationForm();
    if (this.role === 2) {
      $('#authpermodal').modal('show');
    } else {
      $('#authparentmodal').modal('show');
    }

    }

// get perticuler user details
    getDetails(data) {
      this.image = '';
      this.personAuthorizedVM = {};
      this.personAuthorizedVM.AgencyID = this.agencyId;
      this.personAuthorizedVM.ParentID = data.parentID;
      this.personAuthorizedVM.StudentIDs = data.studentIDs;
      this.personAuthorizedVM.EmailId = data.emailId;
      this.personAuthorizedVM.AuthorizedPersonName = data.authorizedPersonName;
      this.personAuthorizedVM.imagePath = data.imagePath;
      this.personAuthorizedVM.Mobile = data.mobile; // future use
      this.personAuthorizedVM.IsAuthorizedPickUp = true;
      this.personAuthorizedVM.IsEmergencyContact = data.isEmergencyContact;
      this.image = data.imagePath;
      this.isDeactivated = data.isDeleted;
      this.personAuthorizedVM.QuickPin = data.quickPin;
      this.updateAuthorizationForm();
      this.getAllStudentsList();
      this.isAddMode = false;
      if (this.role === 2) {
        $('#authpermodal').modal('show');
      } else {
        $('#authparentmodal').modal('show');
      }
    }


    updateAuthorizationForm() {
        this.profileForm = this.fb.group({
          studentName: [this.personAuthorizedVM.StudentIDs, [Validators.required]],
          parentName: [this.personAuthorizedVM.ParentID],
          email: [this.personAuthorizedVM.EmailId],
          mobile: [this.personAuthorizedVM.Mobile],
          authorizedPersonName: [this.personAuthorizedVM.AuthorizedPersonName, Validators.required],
          photo: [''],
          notallowedreason: [''],
          allowpickup: [true],
          emergencypickup: [this.personAuthorizedVM.IsEmergencyContact],
        });
    }


      // Method to delete/deactivate Parent
  deleteRow(value) {
    this.confirmationService.confirm({
      message: 'Do you want to deactivate this user?',
      accept: () => {
        this.spinner.show();
        const req = {
          'AgencyID': this.agencyId,
          'EmailId': value.emailId,
          'IsDeleted': true,
          'DeletedDate': new Date(),
          'DeletedBy': this.commonService.getReleventUserId('userdetails'),
          'QuickPin': value.quickPin,
        };
        this.apiService.postData(GlobalAPIURLs.SaveAuthorizedPersonDetails, req, null).subscribe(res => {
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
    this.getAllAuthorizedPersonList();
    this.notification.success({ message: 'This User has been deactivated', title: '' });
  }

  // Method to delete/deactivateAuth Person
  activatePerson(value) {
    this.confirmationService.confirm({
      message: 'Do you want to activate this user?',
      accept: () => {
        this.spinner.show();
        const req = {
          'AgencyID': this.commonService.getAgencyId(),
          'EmailId': value.emailId,
          'IsDeleted': false,
          'UpdatedBy': this.commonService.getReleventUserId('userdetails'),
          'QuickPin': value.quickPin,
        };
        this.apiService.postData(GlobalAPIURLs.ActivateAuthPerson, req, null).subscribe(res => {
          if (res.body.statusCode === 200) {           
            this.notification.success({ message: 'This user has been activated', title: '' });
            this.getAllAuthorizedPersonList();
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


  paginate(event) {
    this.pageNo = event.page;
    this.getAllAuthorizedPersonList();
    }

    keyDownFunction(event) {
      if (event.keyCode === 13) {
        this.getAllAuthorizedPersonList();
      }
    }

}

