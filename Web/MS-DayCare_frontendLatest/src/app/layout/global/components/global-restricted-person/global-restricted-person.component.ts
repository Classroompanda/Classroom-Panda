import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { AgencyAPIURLs } from 'src/app/layout/agency-admin/components/shared/constatant';
import { AgencyApiService } from 'src/app/layout/agency-admin/components/shared/services/agency-api-service/agency-api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler/error-handler.service';
import { NotificationService } from 'src/app/shared/services/notification-service/notification.service';
import { TeacherAPIURLs } from 'src/app/layout/teacher/shared/constant';
import { PersonRestrictedVM } from '../../shared/view-model/authorize-personvm';
import { GlobalAPIURLs } from '../../shared/constant';
import { ConfirmationService } from 'primeng/api';
declare var $: any;

@Component({
  selector: 'app-global-restricted-person',
  templateUrl: './global-restricted-person.component.html',
  styleUrls: ['./global-restricted-person.component.css']
})

export class GlobalRestrictedPersonComponent implements OnInit {
  profileForm: FormGroup;
  formData: FormData;
  fileData: FormData;
  image: any;
  flag = false;
  personRestrictedVM: PersonRestrictedVM;
  disableEmail = false;
  studentsList: any[] = [];
  restrictedPersonList: any[] = [];
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
  videoList: any[];
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
    this.getAllRestrictedPersonList();
    this.createRestrictedForm();
    this.getAllParentList();
    this.getSectionVideo();
  }

  OpenInfoVideo(data) {
    $('#infovideo').modal('show');
  }

  getSectionVideo() {
    const req = {
      'SectionID': 5
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



  getAllRestrictedPersonList() {
    this.loader = true;
    this.spinner.show();
    this.restrictedPersonList = [];
    const req = {
      'AgencyID': this.commonService.getAgencyId(),
      'ParentId': this.role === 4 ? this.roleId : 0,
      'limit': this.limit,
      'page': this.pageNo,
      'restrictedPersonName': this.nameSearch,
    };
    this.apiService.postData(GlobalAPIURLs.GetRestrictedPersonDetails, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.totalRecord = res.body.totalRows;
        this.restrictedPersonList = res.body.data;
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

  createRestrictedForm() {
    this.profileForm = this.fb.group({
      studentName: ['', [Validators.required]],
      parentName: ['', [Validators.required]],
      email: ['', [Validators.pattern(this.emailPattern)]],
      mobile: [''],
      restrictedPersonName: ['', Validators.required],
      photo: [''],
      description: [''],
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
      this.personRestrictedVM = {
        Id: 0,
        AgencyID: this.commonService.getAgencyId(),
        ParentID: this.role === 2 ? this.profileForm.controls.parentName.value : this.commonService.getReleventUserId('userdetails'),
        StudentIDs: this.profileForm.controls.studentName.value,
        Mobile: this.profileForm.controls.mobile.value,
        EmailId: this.profileForm.controls.email.value,
        RestrictedPersonName: this.profileForm.controls.restrictedPersonName.value,
        Description: this.profileForm.controls.description.value,
        imagePath: this.image ? this.image : '',
        IsRestricted: true,
        isAddMode: this.isAddMode,
        CommonId: this.personRestrictedVM.CommonId
      };
      this.apiService.postData(GlobalAPIURLs.SaveRestrictedPersonDetails, this.personRestrictedVM, null).subscribe(res => {
        if (res.body.statusCode === 200) {
          this.totalRecord = res.body.totalRows;
          this.spinner.hide();
          this.notification.success({ message: res.body.message, title: '' });
          $('#authpermodal').modal('hide');
          $('#authparentmodal').modal('hide');
          this.getAllRestrictedPersonList();
        } else {
          this.spinner.hide();
          this.notification.warning({ message: res.body.message, title: '' });
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
    this.personRestrictedVM = {};
    if (this.role === 2) {
      this.studentsList = [];
    }
    this.createRestrictedForm();
    if (this.role === 2) {
      $('#authpermodal').modal('show');
    } else {
      $('#authparentmodal').modal('show');
    }

  }

  // get perticuler user details
  getDetails(data) {
    this.image = '';
    this.personRestrictedVM = {};
    this.personRestrictedVM.AgencyID = this.agencyId;
    this.personRestrictedVM.ParentID = data.parentID;
    this.personRestrictedVM.StudentIDs = data.studentIDs;
    this.personRestrictedVM.EmailId = data.emailId;
    this.personRestrictedVM.RestrictedPersonName = data.restrictedPersonName;
    this.personRestrictedVM.imagePath = data.imagePath;
    this.personRestrictedVM.Mobile = data.mobile; // future use
    this.personRestrictedVM.IsRestricted = true;
    this.personRestrictedVM.Description = data.description;
    this.image = data.imagePath;
    this.isDeactivated = data.isDeleted;
    this.personRestrictedVM.CommonId = data.commonID;

    this.updateRestrictedForm();
    this.getAllStudentsList();
    this.isAddMode = false;
    if (this.role === 2) {
      $('#authpermodal').modal('show');
    } else {
      $('#authparentmodal').modal('show');
    }
  }

  updateRestrictedForm() {
    this.profileForm = this.fb.group({
      studentName: [this.personRestrictedVM.StudentIDs, [Validators.required]],
      parentName: [this.personRestrictedVM.ParentID],
      email: [this.personRestrictedVM.EmailId],
      mobile: [this.personRestrictedVM.Mobile],
      restrictedPersonName: [this.personRestrictedVM.RestrictedPersonName, Validators.required],
      photo: [''],
      description: [this.personRestrictedVM.Description]
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
          'CommonId': value.commonID,
        };
        this.apiService.postData(GlobalAPIURLs.SaveRestrictedPersonDetails, req, null).subscribe(res => {
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
    this.getAllRestrictedPersonList();
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
          'CommonId': value.commonID,
        };
        this.apiService.postData(GlobalAPIURLs.ActivateRestrictedPerson, req, null).subscribe(res => {
          if (res.body.statusCode === 200) {
            this.notification.success({ message: 'This user has been activated', title: '' });
            this.getAllRestrictedPersonList();
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
    this.getAllRestrictedPersonList();
  }

  keyDownFunction(event) {
    if (event.keyCode === 13) {
      this.getAllRestrictedPersonList();
    }
  }

}

