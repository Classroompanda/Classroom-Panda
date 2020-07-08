import { Component, OnInit } from '@angular/core';
import { ParentApiService } from '../../shared/services/parent-api-service';
import { ErrorHandlerService } from '../../../../shared/services/error-handler/error-handler.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from '../../../../shared/services/notification-service/notification.service';
import { CommonService } from '../../../../shared/services/common/common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ParentDetailsVM } from '../../shared/view-model/parent-detailsvm';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { ParentAPIURLs } from '../../shared/constant';
import { TeacherAPIURLs } from '../../../teacher/shared/constant';

@Component({
  selector: 'app-parent-profile',
  templateUrl: './parent-profile.component.html',
  styleUrls: ['./parent-profile.component.css']
})
export class ParentProfileComponent implements OnInit {
  parentVM: ParentDetailsVM;
  profileForm: FormGroup;
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
  constructor(private apiService: ParentApiService, private error: ErrorHandlerService,
    private spinner: NgxSpinnerService, private notification: NotificationService,
    public commonService: CommonService, private fb: FormBuilder, private route: ActivatedRoute) { }

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
    this.parentVM = {};
    this.getTeacherDetails();
    this.editParentForm();
  }

  editParentForm() {
    this.profileForm = this.fb.group({
      firstname: [this.parentVM.FirstName, Validators.required],
      lastname: [this.parentVM.LastName, Validators.required],
      email: [this.parentVM.EmailId],
      mobile: [this.parentVM.Mobile, Validators.required],
      address: [this.parentVM.Address, Validators.required],
      country: [this.parentVM.CountryId, Validators.required],
      city: [this.parentVM.CityId, Validators.required],
      state: [this.parentVM.StateId, Validators.required],
      zipcode: [this.parentVM.PostalCode],
      birthdate: [this.parentVM.DateOfBirth, Validators.required],
      hiringdate: [this.parentVM.DateHired],
      grospay: [this.parentVM.GrossPayPerHour],
      certification: [this.parentVM.Certification],
      photo: [''],
      homephone: [this.parentVM.HomePhone],
      gender: [this.parentVM.GenderID, Validators.required],
      profession: [this.parentVM.Profession],
      employername: [this.parentVM.employerName],
      employernumber: [this.parentVM.employerNumber]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.profileForm.controls; }

  getTeacherDetails() {
    this.spinner.show();
    const req = {
      'AgencyID': this.commonService.getAgencyId(),
      'classID': 0,
      'studentID': 0,
      'parentID': this.id,
      'studentName': 'string',
    };
    this.apiService.postData(ParentAPIURLs.GetParentInformation, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
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
        this.parentVM.employerName = res.body.data.employerName;
        this.parentVM.employerNumber = res.body.data.employerNumber;
        this.parentVM.Profession = res.body.data.profession;
        this.parentVM.HomePhone = res.body.data.homePhone;
        this.image = res.body.data.imagePath;
        this.commonService.saveUserProfileImage(this.image);
        this.commonService.saveUserFullNameFromProfile(res.body.data.firstName + ' ' + res.body.data.lastName);
        localStorage.setItem('imagepath', this.image);
        this.editParentForm();
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
  SaveParentDetails() {
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
      this.parentVM.DateOfBirth = this.profileForm.value.birthdate;
      this.parentVM.GenderID = this.profileForm.value.gender;
      this.parentVM.employerName = this.profileForm.value.employername;
      this.parentVM.employerNumber = this.profileForm.value.employernumber;
      this.parentVM.Profession = this.profileForm.value.profession;
      this.parentVM.HomePhone = this.profileForm.value.homephone;
      this.parentVM.ImagePath = this.image;
      this.parentVM.IsAuthorizedToPickup = true;
      // this.image = this.profileimage;
      this.parentVM.AgencyID = this.commonService.getAgencyId();
      this.parentVM.Id = this.id;
      this.parentVM.updatedBy = this.commonService.getReleventUserId('userdetails');
      this.apiService.postData(ParentAPIURLs.SaveParentInformation, this.parentVM, null).subscribe(res => {
        if (res.body.statusCode === 200) {
          //  this.spinner.hide();
          this.flag = false;
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
      // reader.onload = function (e) {
      //   self.profileimage = reader.result;
      //   self.image = reader.result;
      // };
      setTimeout(() => {
        this.image = reader.result;
      }, 100);
      this.flag = true;
    }
  }

  UploadImage() {
    // this.apiService.uploadImage(this.fileData).subscribe(
    this.apiService.uploadImage(TeacherAPIURLs.UploadImage, this.fileData, null).subscribe(res => {
        if (res.status === 200) {
          this.image = res.body.data;
          this.updateProfile();
        }
      }, err => {
          this.error.commonError(err);
      });
  }

}
