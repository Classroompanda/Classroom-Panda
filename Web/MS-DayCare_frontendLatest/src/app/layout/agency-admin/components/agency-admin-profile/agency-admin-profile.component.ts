import { Component, OnInit } from '@angular/core';
import { AgencyApiService } from '../shared/services/agency-api-service/agency-api.service';
import { ErrorHandlerService } from '../../../../shared/services/error-handler/error-handler.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from '../../../../shared/services/notification-service/notification.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { AgencyDetailsVM } from '../../../admin/shared/view-models/agency-view-modal';
import { TeacherAPIURLs } from '../../../teacher/shared/constant';
import { AdminAPIURLs } from '../../../admin/shared/constant';
import { CommonService } from '../../../../shared/services/common/common.service';
import { ActivatedRoute } from '@angular/router';
import { AgencyAPIURLs } from '../shared/constatant';
declare var $: any;
@Component({
  selector: 'app-agency-admin-profile',
  templateUrl: './agency-admin-profile.component.html',
  styleUrls: ['./agency-admin-profile.component.css']
})
export class AgencyAdminProfileComponent implements OnInit {
  agencyForm: FormGroup;
  countryList: any[];
  stateList: any[];
  cityList: any[];
  today = new Date();
  agencyVM: AgencyDetailsVM = {};
  totalRecord = 0;
  agencyList: any[] = [];
  pageNo = 0;
  limit = 10;
  loader = true;
  status = 1;
  addMode = true;
  image: any;
  profileimage: any;
  flag = false;
  public formData = new FormData();
  public fileData: FormData;
  agencyID = 0;
  emailPattern = /^([\w-\.]+\u0040([\w-]+\.)+[\w-]{2,4})?$/;
  constructor(private apiService: AgencyApiService, private error: ErrorHandlerService,
    private spinner: NgxSpinnerService, private notification: NotificationService,
    private fb: FormBuilder, public commonService: CommonService) { }

  ngOnInit() {
    this.spinner.show();
    this.getAgencyDetials();
    this.countryList = [];
    this.cityList = [];
    this.stateList = [];
    this.createAgencyForm();
    this.getAllCountries();
  }

   rotateImage() {
    const img = document.getElementById('myimage');
    img.style.transform = 'rotate(90deg)';
    console.log(img);
}

  createAgencyForm() {
    this.agencyForm = this.fb.group({
      agencyname: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipcode: [''],
      country: ['', Validators.required],
      photo : ['']
    });
  }



  updateAgencyForm() {
    this.agencyForm = this.fb.group({
      agencyname: [this.agencyVM.AgencyName, Validators.required],
      firstname: [this.agencyVM.OwnerFirstName, Validators.required],
      lastname: [this.agencyVM.OwnerLastName, Validators.required],
      email: [this.agencyVM.EmailId],
      phone: [this.agencyVM.Mobile, Validators.required],
      address: [this.agencyVM.Address, Validators.required],
      city: [this.agencyVM.CityId, Validators.required],
      state: [this.agencyVM.StateId, Validators.required],
      zipcode: [this.agencyVM.PostalCode],
      country: [this.agencyVM.CountryId, Validators.required],
      photo : [''],
    });
  }
 
  get f() { return this.agencyForm.controls; }

  getAllCountries() {   
    this.countryList = [];
    const req = {
      'AgencyID': 4
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


  getCitiesList() {
    this.cityList = [];
    const req = {
      'StateId': this.agencyForm.value.state,
      'AgencyID': 4
    };
    this.apiService.postData(TeacherAPIURLs.GetAllCities, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.cityList = res.body.data;
        console.log('city', this.cityList);        
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


  clearStateCity() {
    this.agencyForm.controls['state'].setValue('');
    this.agencyForm.controls['city'].setValue('');
  }

  clearCity() {
    this.agencyForm.controls['city'].setValue('');
  }



  getStatesList() {
    this.stateList = [];
    this.cityList = [];
    const req = {
      'CountryId': this.agencyForm.value.country,
      'AgencyID': 4
    };
    this.apiService.postData(TeacherAPIURLs.GetAllStates, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.stateList = res.body.data;        
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

  verifyAgency() {
    this.spinner.show();
    if (this.agencyForm.valid) {
      this.agencyVM.Id = this.addMode ? 0 : this.agencyID;
      this.agencyVM.AgencyName = this.agencyForm.value.agencyname;
      this.agencyVM.EmailId = this.agencyForm.value.email;
      this.agencyVM.Mobile = this.agencyForm.value.phone;
      this.agencyVM.OwnerFirstName = this.agencyForm.value.firstname;
      this.agencyVM.OwnerLastName = this.agencyForm.value.lastname;
      this.agencyVM.StateId = this.agencyForm.value.state;
      this.agencyVM.CityId = this.agencyForm.value.city;
      this.agencyVM.PostalCode = this.agencyForm.value.zipcode;
      this.agencyVM.Address = this.agencyForm.value.address;
      this.agencyVM.CountryId = this.agencyForm.value.country;
      this.agencyVM.status = this.status;
      this.agencyVM.ImagePath = this.image;
      this.image = this.profileimage;

      const msg = 'Profile details has been updated successfully';
      this.creteNewAgency(this.agencyVM, msg);
    } else {
      this.spinner.hide();
      this.commonService.validateAllFields(this.agencyForm);
    }
  }

  creteNewAgency(req, msg) {
    this.apiService.postData(AdminAPIURLs.SaveAgencyInformation, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.getAgencyDetials();
        this.notification.success({ message: msg, title: '' });
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


  getAgencyDetials() {
    this.spinner.show();
    const req = {
      'agencyID': this.commonService.getReleventUserId('userdetails')
    };
    this.apiService.postData(AgencyAPIURLs.GetParticularAgencyDetails, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        if (res.body.data) {
          this.agencyID = res.body.data[0].id;
          this.addMode = false;
          this.agencyVM.AgencyName = res.body.data[0].agencyName;
          this.agencyVM.EmailId = res.body.data[0].emailId;
          this.agencyVM.Mobile = res.body.data[0].mobile;
          this.agencyVM.OwnerFirstName = res.body.data[0].ownerFirstName;
          this.agencyVM.OwnerLastName = res.body.data[0].ownerLastName;
          this.agencyVM.StateId = res.body.data[0].stateId;
          this.agencyVM.CityId = res.body.data[0].cityId;
          this.agencyVM.PostalCode = res.body.data[0].postalCode;
          this.agencyVM.Address = res.body.data[0].address;
          this.agencyVM.CountryId = res.body.data[0].countryId;
          this.image = res.body.data[0].imagePath;
          this.commonService.saveUserProfileImage(this.image);
          this.agencyVM.status = 1;
          this.updateAgencyForm();
          this.getAllCountries();
          this.getStatesList();
          this.getCitiesList();
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
        this.verifyAgency();
      }
    }, err => {
      this.error.commonError(err);
    });
  }


  SaveProfileDetails() {
    this.spinner.show();
    if (this.flag === true) {
      this.UploadImage();
      this.flag = false;
    } else {
      this.verifyAgency();
    }
  }





  getUserStatus(value) {
    this.status = value;
  }


  paginate(event) {
    this.status = 1;
    this.pageNo = event.page;    
  }


}
