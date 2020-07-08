import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TeacherApiService } from '../../shared/services/teacher-api-service/teacher-api.service';
import { ErrorHandlerService } from '../../../../shared/services/error-handler/error-handler.service';
import { NotificationService } from '../../../../shared/services/notification-service/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from '../../../../shared/services/common/common.service';
import { TeacherAPIURLs } from '../../shared/constant';
import { TeacherDetailsVM } from '../../shared/view-model/teacher-detailsVM';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-teacher-profile',
  templateUrl: './teacher-profile.component.html',
  styleUrls: ['./teacher-profile.component.css']
})
export class TeacherProfileComponent implements OnInit {
  profileForm: FormGroup;
  teacherDetailsVM: TeacherDetailsVM;
  countryList: any[];
  stateList: any[];
  cityList: any[];
  today = new Date();
  image: any;
  id: number;
  flag = false;
  public formData = new FormData();
  public fileData: FormData;
  profileimage: any;
  emailPattern = /^([\w-\.]+\u0040([\w-]+\.)+[\w-]{2,4})?$/;
  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  constructor(private apiService: TeacherApiService, private error: ErrorHandlerService,
    private spinner: NgxSpinnerService, private notification: NotificationService,
    private commonService: CommonService, private fb: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.dpConfig = Object.assign({}, { containerClass: 'theme-dark-blue' },
      { showWeekNumbers: false });
    this.image = '';
    this.countryList = [];
    this.cityList = [];
    this.stateList = [];
    this.teacherDetailsVM = {};
    this.getTeacherDetails();
    this.editIncidentForm();
  }

  editIncidentForm() {
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
      certification: [this.teacherDetailsVM.Certification, [Validators.required, Validators.maxLength(200)]],
      photo: [''],
      homephone: [this.teacherDetailsVM.mHomePhone]
    });
  }


  // convenience getter for easy access to form fields
  get f() { return this.profileForm.controls; }

  getTeacherDetails() {
    this.spinner.show();
    const req = {
      'AgencyID': this.commonService.getAgencyId(),
      'TeacherID': this.id,
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
        this.teacherDetailsVM.DateOfBirth = this.commonService.getLocalDateTimeFromUTC(res.body.data.dateOfBirth);
        this.teacherDetailsVM.DateHired = this.commonService.getLocalDateTimeFromUTC(res.body.data.dateHired);
        this.teacherDetailsVM.GrossPayPerHour = res.body.data.grossPayPerHour;
        this.teacherDetailsVM.Certification = res.body.data.certification;
        this.teacherDetailsVM.HomePhone = res.body.data.homePhone;
        this.teacherDetailsVM.mHomePhone = res.body.data.mHomePhone;
        this.image = res.body.data.imagePath;
        this.commonService.saveUserProfileImage(this.image);
        this.commonService.saveUserFullNameFromProfile(res.body.data.firstName + ' ' + res.body.data.lastName);
        localStorage.setItem('imagepath', this.image);
        this.editIncidentForm();
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
    // this.spinner.show();
    this.countryList = [];
    const req = {
      'AgencyID': this.commonService.getAgencyId(),
    };
    this.apiService.postData(TeacherAPIURLs.GetAllCountry, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.countryList = res.body.data;
        //  this.spinner.hide();
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
    this.stateList = [];
    this.cityList = [];
    const req = {
      'AgencyID': this.commonService.getAgencyId(),
      'CountryId': this.profileForm.value.country
    };
    this.apiService.postData(TeacherAPIURLs.GetAllStates, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.stateList = res.body.data;
        //  this.spinner.hide();
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
    this.cityList = [];
    const req = {
      'AgencyID': this.commonService.getAgencyId(),
      'StateId': this.profileForm.value.state
    };
    this.apiService.postData(TeacherAPIURLs.GetAllCities, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.cityList = res.body.data;
        console.log('city', this.cityList);
        //  this.spinner.hide();
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
      this.teacherDetailsVM.DateOfBirth = this.commonService.getUTCDate(this.profileForm.value.birthdate);
      this.teacherDetailsVM.DateHired = this.profileForm.value.hiringdate;
      this.teacherDetailsVM.GrossPayPerHour = this.profileForm.value.grospay;
      this.teacherDetailsVM.Certification = this.profileForm.value.certification;
      // this.teacherDetailsVM.HomePhone = this.profileForm.value.homephone;
      this.teacherDetailsVM.mHomePhone = this.profileForm.value.homephone;
      this.teacherDetailsVM.ImagePath = this.image;
      // this.image = this.profileimage;
      this.teacherDetailsVM.AgencyID = this.commonService.getAgencyId();
      this.teacherDetailsVM.Id = this.id;
      this.teacherDetailsVM.updatedBy = this.commonService.getLoggedInUserId();
      this.apiService.postData(TeacherAPIURLs.SaveTeacherDetails, this.teacherDetailsVM, null).subscribe(res => {
        if (res.body.statusCode === 200) {
          //  this.spinner.hide();
          this.notification.success({ message: 'Profile updated successfully', title: '' });
          this.getTeacherDetails();
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
    this.formData = new FormData();
    const self = this;
    if (event.target.files && event.target.files[0]) {
      if (event.target.files[0].type !== 'image/png' && event.target.files[0].type !== 'image/jpeg' &&
        event.target.files[0].type !== 'image/jpg') {
        self.fileData = null;
        self.profileimage = '';
        // self.toasterService.error('error', 'Please select image only');
        return false;
      }
      const reader = new FileReader();
      // self.filepath = event.target.files[0];
      // self.filename = event.target.files[0].name;
      this.formData.append('fileData', event.target.files[0], event.target.files[0].name);
      self.fileData = this.formData;
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = function (e) {
        self.profileimage = reader.result;
        self.image = reader.result;
      };
      this.flag = true;
      // this.UploadImage();
    }
  }

  UploadImage() {
    // this.apiService.uploadImage(this.fileData).subscribe(
    this.apiService.uploadImage(TeacherAPIURLs.UploadImage, this.fileData, null).subscribe(
      (res) => {
        if (res.status === 200) {
          this.image = res.body.data;
          this.updateProfile();
        }
      },
      (err) => {

      });
  }
}


