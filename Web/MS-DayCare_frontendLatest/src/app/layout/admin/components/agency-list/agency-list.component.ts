import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AgencyApiService } from '../../../agency-admin/components/shared/services/agency-api-service/agency-api.service';
import { ErrorHandlerService } from '../../../../shared/services/error-handler/error-handler.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from '../../../../shared/services/notification-service/notification.service';
import { CommonService } from '../../../../shared/services/common/common.service';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { TeacherAPIURLs } from 'src/app/layout/teacher/shared/constant';
import { AgencyDetailsVM } from '../../shared/view-models/agency-view-modal';
import { AdminAPIURLs } from '../../shared/constant';
import { AdminApiService } from '../../shared/services/admin-api.service';
declare var $: any;
@Component({
  selector: 'app-agency-list',
  templateUrl: './agency-list.component.html',
  styleUrls: ['./agency-list.component.css']
})
export class AgencyListComponent implements OnInit {

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
  agencyID = 0;
  emailPattern = /^([\w-\.]+\u0040([\w-]+\.)+[\w-]{2,4})?$/;
  nameSearch = '';
  constructor(private apiService: AdminApiService, private error: ErrorHandlerService,
    private spinner: NgxSpinnerService, private notification: NotificationService,
    public commonService: CommonService, private fb: FormBuilder, private route: ActivatedRoute,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.countryList = [];
    this.cityList = [];
    this.stateList = [];
    this.createAgencyForm();
    this.getAllCountries();
    this.getAllAgencyList();
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
      country: ['', Validators.required]
    });
  }



  updateAgencyForm() {
    this.agencyForm = this.fb.group({
      agencyname: [this.agencyVM.AgencyName, Validators.required],
      firstname: [this.agencyVM.OwnerFirstName, Validators.required],
      lastname: [this.agencyVM.OwnerLastName, Validators.required],
      email: [ this.agencyVM.EmailId],
      phone: [this.agencyVM.Mobile, Validators.required],
      address: [this.agencyVM.Address, Validators.required],
      city: [this.agencyVM.CityId, Validators.required],
      state: [this.agencyVM.StateId, Validators.required],
      zipcode: [this.agencyVM.PostalCode],
      country: [this.agencyVM.CountryId, Validators.required]
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
    this.spinner.show();
    this.cityList = [];
    const req = {
      'StateId': this.agencyForm.value.state,
      'AgencyID': 4
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


  clearStateCity() {
    this.agencyForm.controls['state'].setValue('');
    this.agencyForm.controls['city'].setValue('');
  }

  clearCity() {
    this.agencyForm.controls['city'].setValue('');
  }



  getStatesList() {
    this.spinner.show();
    this.stateList = [];
    this.cityList = [];
    const req = {
      'CountryId': this.agencyForm.value.country,
      'AgencyID': 4
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

  verifyAgency() {
    this.spinner.show();
    if (this.agencyForm.valid) {
      this.agencyVM.Id = this.agencyID;
        this.agencyVM.AgencyName = this.agencyForm.value.agencyname;
        this.agencyVM.EmailId = this.agencyForm.value.email;
        this.agencyVM.Mobile = this.agencyForm.value.phone;
        this.agencyVM.OwnerFirstName = this.agencyForm.value.firstname;
        this.agencyVM.OwnerLastName = this.agencyForm.value.lastname;
        this.agencyVM.StateId = this.agencyForm.value.state;
        this.agencyVM.CityId = this.agencyForm.value.city;
        this.agencyVM.PostalCode = this.agencyForm.value.zipcode;
        this.agencyVM.Address =  this.agencyForm.value.address;
        this.agencyVM.CountryId = this.agencyForm.value.country;
        this.agencyVM.status = this.status;
        const msg = 'Agency information has been saved successfully';
        this.creteNewAgency(this.agencyVM, msg);
    } else {
      this.spinner.hide();
      this.commonService.validateAllFields(this.agencyForm);
    }
  }

  creteNewAgency(req, msg ) {
    this.apiService.postData(AdminAPIURLs.SaveAgencyInformation, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        $('.addagency').modal('hide');
        this.getAllAgencyList();
        this.notification.success({message: msg, title: ''});
          this.spinner.hide();
      } else if (res.body.statusCode === 986) {
        this.spinner.hide();
        this.notification.warning({message: 'This email Address already exist!', title: ''});
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


  getAgencyDetials(obj) {
    this.agencyID = obj.id;
    this.addMode = false;
    this.agencyVM.AgencyName = obj.agencyName;
    this.agencyVM.EmailId = obj.emailId;
    this.agencyVM.Mobile = obj.mobile;
    this.agencyVM.OwnerFirstName = obj.ownerFirstName;
    this.agencyVM.OwnerLastName = obj.ownerLastName;
    this.agencyVM.StateId = obj.stateId;
    this.agencyVM.CityId = obj.cityId;
    this.agencyVM.PostalCode = obj.postalCode;
    this.agencyVM.Address =  obj.address;
    this.agencyVM.CountryId = obj.countryId;
    this.agencyVM.status = 1;
    this.updateAgencyForm();
    this.getAllCountries();
    this.getStatesList();
    this.getCitiesList();
  }



  getAllAgencyList() {
    this.loader = true;
     this.spinner.show();
    this.agencyList = [];
    const req = {
      'limit': this.limit,
      'page': this.pageNo,
      'status': this.status,
      'AgencyName': this.nameSearch,
    };
    this.apiService.postData(AdminAPIURLs.GetAllAgencyDetails, req, null).subscribe(res => {
      this.totalRecord = res.body.totalRows;
      if (res.body.statusCode === 200) {
        this.totalRecord = res.body.totalRows;
        this.agencyList = res.body.data;
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

getUserStatus(value) {
  this.status = value;
  this.getAllAgencyList();
}


paginate(event) {
  this.status = 1;
  this.pageNo = event.page;
  // this.limit = event.page;
  this.getAllAgencyList();
}

approvedDenyRequest(event, obj) {
    this.confirmationService.confirm({
      message:  'Do you want to approve this agency ?' ,
      accept: () => {
        this.spinner.show();
        obj.status = 1;
        const msg = 'This agency has been activated successfully!';
        this.creteNewAgency(obj, msg);
      }
    });
}

clearForm() {
  this.createAgencyForm();
  this.agencyVM = {};
  this.addMode = true;
  this.status = 0;
}

// to serch agency list by enter key
keyDownFunction(event) {
  if (event.keyCode === 13) {
    this.getAllAgencyList();
  }
}

 // Method to delete/deactivate Parent
 deleteAgency(value) {
  this.confirmationService.confirm({
    message: 'Do you want to deactivate this Agency?',
    accept: () => {
      this.spinner.show();
      const req = {
        'AgencyID': value.id,
        'IsDeleted': true,
        'DeletedBy': this.commonService.getReleventUserId('userdetails'),
      };
      this.apiService.postData(AdminAPIURLs.ActivateDeactivateAgency, req, null).subscribe(res => {
        if (res.body.statusCode === 200) {
          this.deleteAgencySuccess(value);
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

deleteAgencySuccess(data) {
  this.getAllAgencyList();
  this.notification.success({ message: 'This Agency has been deactivated', title: '' });
}

// Method to delete/deactivateAuth Person
activateAgency(value) {
  this.confirmationService.confirm({
    message: 'Do you want to activate this Agency?',
    accept: () => {
      this.spinner.show();
      const req = {
        'AgencyID': value.id,
        'IsDeleted': false,
        'UpdatedBy': this.commonService.getReleventUserId('userdetails'),
      };
      this.apiService.postData(AdminAPIURLs.ActivateDeactivateAgency, req, null).subscribe(res => {
        if (res.body.statusCode === 200) {
          // this.spinner.hide();
          this.notification.success({ message: 'This Agency has been activated', title: '' });
          this.getAllAgencyList();
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



}
