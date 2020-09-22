import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TeacherDetailsVM } from '../../../teacher/shared/view-model/teacher-detailsVM';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { TeacherApiService } from '../../../teacher/shared/services/teacher-api-service/teacher-api.service';
import { ErrorHandlerService } from '../../../../shared/services/error-handler/error-handler.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from '../../../../shared/services/notification-service/notification.service';
import { CommonService } from '../../../../shared/services/common/common.service';
import { TeacherAPIURLs } from '../../../teacher/shared/constant';
import { ConfirmationService } from 'primeng/api';
import { AgencyAPIURLs } from '../shared/constatant';
declare var $: any;
@Component({
  selector: 'app-agency-admin-teacherstaff',
  templateUrl: './agency-admin-teacherstaff.component.html',
  styleUrls: ['./agency-admin-teacherstaff.component.css']
})
export class AgencyAdminTeacherstaffComponent implements OnInit {
  profileForm: FormGroup;
  newEmailForm: FormGroup;
  teacherDetailsVM: TeacherDetailsVM;
  countryList: any[];
  stateList: any[];
  cityList: any[];
  today = new Date();
  image: any;
  id: number;
  tid: number;
  flag = false;
  public formData = new FormData();
  public fileData: FormData;
  profileimage: any;
  teacherList: any[] = [];
  disableEmail = false;
  addMode: boolean;
  activationType = 'Activated';
  pageNo = 0;
  limit = 10;
  totalRecord = 0;
  loader = true;
  isSubscriptionActive: boolean;
  nameSearch = '';
  emailPattern = /^([\w-\.]+\u0040([\w-]+\.)+[\w-]{2,4})?$/;
  rejectedUserList: any[] = [];
  videoPath = '';
  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  constructor(private apiService: TeacherApiService, private error: ErrorHandlerService,
    private spinner: NgxSpinnerService, private notification: NotificationService,
    public commonService: CommonService, private fb: FormBuilder, private confirmationService: ConfirmationService) {
    this.isSubscriptionActive = this.commonService.getSubscriptionStatus();
  }

  ngOnInit() {
    this.spinner.show();
    this.getAllTeachers();
    this.dpConfig = Object.assign({}, { containerClass: 'theme-dark-blue' },
      { showWeekNumbers: false });
    this.image = '';
    this.countryList = [];
    this.cityList = [];
    this.stateList = [];
    this.teacherDetailsVM = {};
    this.createTeacherForm();
    this.getAllCountries();
    this.newEmailCrateForm();
    this.getSectionVideo();
  }

  OpenInfoVideo(data) {
    $('#infovideo').modal('show');
  }

  getSectionVideo() {
    const req = {
      'SectionID': 3
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



  detaildTeacherForm() {
    this.disableEmail = true;
    this.profileForm = this.fb.group({
      firstname: [this.teacherDetailsVM.FirstName, [Validators.required, Validators.minLength(3)]],
      lastname: [this.teacherDetailsVM.LastName, [Validators.required, Validators.minLength(3)]],
      email: [this.teacherDetailsVM.Email],
      mobile: [this.teacherDetailsVM.mPhoneNumber, Validators.required],
      address: [this.teacherDetailsVM.Address, Validators.required],
      country: [this.teacherDetailsVM.CountryId, Validators.required],
      city: [this.teacherDetailsVM.CityId, Validators.required],
      state: [this.teacherDetailsVM.StateId, Validators.required],
      zipcode: [this.teacherDetailsVM.PostalCode],
      birthdate: [this.teacherDetailsVM.DateOfBirth, Validators.required],
      hiringdate: [this.teacherDetailsVM.DateHired, Validators.required],
      grospay: [this.teacherDetailsVM.GrossPayPerHour],
      certification: [this.teacherDetailsVM.Certification, Validators.required],
      photo: [''],
      homephone: [this.teacherDetailsVM.mHomePhone]
    });
  }



  createTeacherForm() {
    this.profileForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(3)]],
      lastname: ['', [Validators.required, Validators.minLength(3)]],
      email: ['',
        [Validators.required, Validators.pattern(this.emailPattern)]],
      mobile: ['', Validators.required],
      address: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipcode: [''],
      birthdate: ['', Validators.required],
      hiringdate: ['', Validators.required],
      grospay: [''],
      certification: ['', Validators.required],
      photo: [''],
      homephone: ['']
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.profileForm.controls; }

  getTeacherDetails(value) {
    this.addMode = false;
    this.spinner.show();
    const req = {
      'AgencyID': this.commonService.getAgencyId(),
      'TeacherID': value.id,
    };
    this.apiService.postData(TeacherAPIURLs.GetTeacherInformation, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.teacherDetailsVM.FirstName = res.body.data.firstName;
        this.teacherDetailsVM.LastName = res.body.data.lastName;
        this.teacherDetailsVM.Email = res.body.data.email;
        this.teacherDetailsVM.PhoneNumber = res.body.data.phoneNumber;
        this.teacherDetailsVM.mPhoneNumber = res.body.data.mPhoneNumber;
        this.teacherDetailsVM.Address = res.body.data.address;
        this.teacherDetailsVM.CityId = res.body.data.cityId;
        this.teacherDetailsVM.StateId = res.body.data.stateId;
        this.teacherDetailsVM.CountryId = res.body.data.countryId;
        this.teacherDetailsVM.PostalCode = res.body.data.postalCode;
        this.teacherDetailsVM.DateOfBirth = new Date(res.body.data.dateOfBirth);
        this.teacherDetailsVM.DateHired = new Date(res.body.data.dateHired);
        this.teacherDetailsVM.GrossPayPerHour = res.body.data.grossPayPerHour;
        this.teacherDetailsVM.Certification = res.body.data.certification;
        this.teacherDetailsVM.HomePhone = res.body.data.homePhone;
        this.teacherDetailsVM.mHomePhone = res.body.data.mHomePhone;
        this.id = res.body.data.id;
        this.image = res.body.data.imagePath;
        if (this.id === 0) {
          this.teacherDetailsVM.createdBy = this.commonService.getReleventUserId('userdetails');
        } else {
          this.teacherDetailsVM.updatedBy = this.commonService.getReleventUserId('userdetails');
        }
        this.detaildTeacherForm();
        this.getAllCountries();
        this.getStatesList();
        this.getCitiesList();
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
  SaveTeacherDetails() {
    this.spinner.show();
    if (this.flag === true) {
      this.UploadImage();
      this.flag = false;
    } else {
      this.updateProfile();
    }
  }
  updateProfile() {
    if (this.profileForm.valid) {
      this.spinner.show();
      this.teacherDetailsVM.FirstName = this.profileForm.value.firstname;
      this.teacherDetailsVM.LastName = this.profileForm.value.lastname;
      this.teacherDetailsVM.Email = this.profileForm.value.email;
      this.teacherDetailsVM.PhoneNumber = 0;
      this.teacherDetailsVM.mPhoneNumber = this.profileForm.value.mobile;
      this.teacherDetailsVM.Address = this.profileForm.value.address;
      this.teacherDetailsVM.CityId = this.profileForm.value.city;
      this.teacherDetailsVM.StateId = this.profileForm.value.state;
      this.teacherDetailsVM.CountryId = this.profileForm.value.country;
      this.teacherDetailsVM.PostalCode = this.profileForm.value.zipcode;
      this.teacherDetailsVM.DateOfBirth = this.profileForm.value.birthdate;
      this.teacherDetailsVM.DateHired = this.profileForm.value.hiringdate;
      this.teacherDetailsVM.GrossPayPerHour = this.profileForm.value.grospay === '' ? 0 : this.profileForm.value.grospay;
      this.teacherDetailsVM.Certification = this.profileForm.value.certification;
      if (this.id === 0) {
        this.teacherDetailsVM.createdBy = this.commonService.getReleventUserId('userdetails');
      } else {
        this.teacherDetailsVM.updatedBy = this.commonService.getReleventUserId('userdetails');
      }
      this.teacherDetailsVM.mHomePhone = this.profileForm.value.homephone;
      this.teacherDetailsVM.Id = this.id;
      this.teacherDetailsVM.ImagePath = this.image;
      this.teacherDetailsVM.AgencyID = this.commonService.getAgencyId();
      this.teacherDetailsVM.Id = this.id;
      this.apiService.postData(TeacherAPIURLs.SaveTeacherDetails, this.teacherDetailsVM, null).subscribe(res => {
        if (res.body.statusCode === 200) {         
          this.getAllTeachers();
          this.notification.success({
            message: this.id === 0 ?
              'New user created successfully!' : 'User information updated successfully!',
            title: ''
          });
          $('.addstaff').modal('hide');
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
        self.image = reader.result;
      }, 100);
      this.flag = true;
    }
  }

  UploadImage() {
    this.apiService.uploadImage(TeacherAPIURLs.UploadImage, this.fileData, null).subscribe(
      (res) => {
        if (res.status === 200) {
          this.image = res.body.data;
          this.updateProfile();
        }
      },
      (err) => {
      console.log(err);

      });
  }


  // Get All teacher List
  getAllTeachers() {
    this.loader = true;
    this.teacherList = [];
    const req = {
      'agencyID': this.commonService.getAgencyId(),
      'ActivationType': this.activationType,
      'limit': this.limit,
      'page': this.pageNo,
      'TeacherName': this.nameSearch
    };
    this.apiService.postData(AgencyAPIURLs.GetAllTeacherForAgency, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.totalRecord = res.body.totalRows;
        this.teacherList = res.body.data;
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


  cleareTeacherForm() {
    this.addMode = true;
    this.teacherDetailsVM = {};
    this.disableEmail = false;
    this.id = 0;
    this.image = '';
    this.createTeacherForm();
  }

  // Update Email

  newEmailCrateForm() {
    this.newEmailForm = this.fb.group({
      newemail: ['', [Validators.required, Validators.pattern(this.emailPattern)]]
    });
  }

  getteacherIdForEmailUpdate(data) {
    if (data) {
      this.tid = data.id;
    }
  }

  clearEmailForm() {
    this.newEmailCrateForm();
  }

  upateEmail() {
    if (this.newEmailForm.valid) {
      this.loader = true;
       this.spinner.show();
      const req = {
        'AgencyID': this.commonService.getAgencyId(),
        'id': this.tid,
        'Email': this.newEmailForm.controls.newemail.value.trim()
      };
      this.apiService.postData(AgencyAPIURLs.UpdateEmailForTeacher, req, null).subscribe(res => {
        if (res.body.statusCode === 200) {
          $('.mailupdate').modal('hide');
          this.notification.success({message: res.body.message, title: ''});
          this.getAllTeachers();
        } else {
          this.spinner.hide();
          this.notification.warning({message: res.body.message, title: ''});
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



  // Method to delete/deactivate Teacher
  deleteTeacher(value) {
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
        this.apiService.postData(TeacherAPIURLs.SaveTeacherDetails, req, null).subscribe(res => {
          if (res.body.statusCode === 200) {           
            this.deleteTeacherSuccess(value);
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

  deleteTeacherSuccess(data) {
    this.getAllTeachers();
    this.notification.success({ message: 'This User has been deactivated', title: '' });
  }


  activateTeacher(value) {
    this.confirmationService.confirm({
      message: 'Do you want to activate this user?',
      accept: () => {
        this.spinner.show();
        const req = {
          'AgencyID': this.commonService.getAgencyId(),
          'id': value.id,
          'IsDeleted': false,
          'UpdateDate': new Date(),
          'UpdatedBy': this.commonService.getReleventUserId('userdetails')
        };
        this.apiService.postData(AgencyAPIURLs.ActivateTeacher, req, null).subscribe(res => {
          if (res.body.statusCode === 200) {           
            this.notification.success({ message: 'This User has been activated', title: '' });
            this.getAllTeachers();
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


  activateClockInTeacher(value) {
    this.confirmationService.confirm({
      message: 'This teacher clocked out, do you want to enable login?',
      accept: () => {
        this.spinner.show();
        const req = {
          'AgencyID': this.commonService.getAgencyId(),
          'id': value.id,
          'IsDeleted': false,
          'UpdateDate': new Date(),
          'UpdatedBy': this.commonService.getReleventUserId('userdetails'),
          'TeacherDailyAttendenceID': value.teacherDailyAttendenceID
        };
        this.apiService.postData(AgencyAPIURLs.ActivateClockInTeacher, req, null).subscribe(res => {
          if (res.body.statusCode === 200) {           
            this.notification.success({ message: 'This User has been activated', title: '' });
            this.getAllTeachers();
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
    this.getAllTeachers();
  }
  keyDownFunction(event) {
    if (event.keyCode === 13) {
      this.getAllTeachers();
    }
  }


  processCSVFile(event) {
    this.spinner.show();
    this.formData = new FormData();
  if (event.target.files && event.target.files[0] && event.target.files[0].name.includes('.csv')) {
    this.formData.append('FileName', event.target.files[0], event.target.files[0].name);
    this.formData.append('AgencyId', this.commonService.getAgencyId().toString());
    this.formData.append('CreatedBy', this.commonService.getLoggedInUserId().toString());
    this.apiService.uploadImage(AgencyAPIURLs.UploadTeacherUserWithFile, this.formData, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.spinner.hide();
        event.target.value = '';
        this.getAllTeachers();
        this.notification.success({ message: 'File uploaded successfully', title : 'Success'});
      } else if (res.body.statusCode === 987) {
        this.spinner.hide();
         this.getAllTeachers();
         this.rejectedUserList = res.body.data;
        $('.rejectedUsr').modal('show');
      } else {
        this.spinner.hide();
        this.error.unknownError();
      }
    }, err => {
      this.spinner.hide();
      this.error.commonError(err);
      this.notification.error({ message: 'Something went wrong', title : 'Error'});
    });
  } else {
    this.spinner.hide();
    this.notification.warning({ message: 'Unsupported file type', title : 'Warning'});
  }
}



}
