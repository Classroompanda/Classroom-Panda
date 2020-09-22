import { Component, OnInit } from '@angular/core';
import { ParentApiService } from '../../shared/services/parent-api-service';
import { ErrorHandlerService } from '../../../../shared/services/error-handler/error-handler.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from '../../../../shared/services/notification-service/notification.service';
import { CommonService } from '../../../../shared/services/common/common.service';
import { FormBuilder, FormGroup, Validators, Form } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ParentAPIURLs } from '../../shared/constant';
import { element } from '@angular/core/src/render3/instructions';
import { ChildListVM, MedicationVM, ImmunizationVM, AllergyVM } from '../../shared/view-model/parent-detailsvm';
import { TeacherStudentDetailsVM, GuardiansDetailsVM } from '../../../teacher/shared/view-model/teacher-students-detailsVM';
import { TeacherAPIURLs } from '../../../teacher/shared/constant';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { ConfirmationService } from 'primeng/api';
declare var $: any;

@Component({
  selector: 'app-parent-child-fill-form',
  templateUrl: './parent-child-fill-form.component.html',
  styleUrls: ['./parent-child-fill-form.component.css']
})
export class ParentChildFillFormComponent implements OnInit {
  childList: ChildListVM[] = [];
  childVM: TeacherStudentDetailsVM = {};
  childForm: FormGroup;
  addChildForm: FormGroup;
  guardianForm: FormGroup;
  countryList: any[] = [];
  countryListAddMode: any[] = [];
  stateList: any[] = [];
  stateListAddMode: any[] = [];
  cityList: any[] = [];
  cityListAddMode: any[] = [];
  today = new Date();
  fileData: FormData;
  formData = new FormData();
  profileimage: any;
  image: any;
  flag = false;
  guardianList: any[] = [];
  guardianDetailsVm: GuardiansDetailsVM = {};
  allergyList: any[] = [];
  immunizationList: any[] = [];
  medicationList: any[] = [];
  disabilityList: any[] = [];
  classList: any[] = [];
  doseList: any[] = [];
  relationTypeList: any[] = [];
  immunizationtypeListForDeopdown: any[] = [];
  addImagePreview: any;
  reasonNotToAllowbox = true;
  loader = true;
  medicationForm: FormGroup;
  immunizationForm: FormGroup;
  medicationVM: MedicationVM = {};
  showOthwerImmunization = false;
  immunizationVM: ImmunizationVM = {};
  agencyId: any;
  disabilitydiscription: string;
  disabilityId = 0;
  guardianImageUploadFlag = false;
  allergyForm: FormGroup;
  allergyType: any[] = [];
  allergyNameList: any[] = [];
  allergyReactionList: any[] = [];
  allergyVM: AllergyVM = {};
  parentType: string;
  nullDate: any;
  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  constructor(private apiService: ParentApiService, private error: ErrorHandlerService,
    private spinner: NgxSpinnerService, private notification: NotificationService,
    public commonService: CommonService, private fb: FormBuilder, private route: ActivatedRoute,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.parentType = this.commonService.getParentType();
    this.agencyId = this.commonService.getAgencyId();
    this.dpConfig = Object.assign({}, { containerClass: 'theme-dark-blue' },
      { showWeekNumbers: false });
    this.spinner.show();
    this.getAllChildrenList();
    this.childDetailsForm();
    this.childAddForm();
    this.guardianDetailsForm();
    this.createMedicationForm();
    this.createimmunizationForm();
    this.createAllergyForm();
  }

  childDetailsForm() {
    this.childForm = this.fb.group({
      firstname: [this.childVM.firstName, Validators.required],
      lastname: [this.childVM.lastName, Validators.required],
      mobile: [this.childVM.ChildsContactNumber, Validators.required],
      address: [this.childVM.address, Validators.required],
      country: [this.childVM.countryId, Validators.required],
      city: [this.childVM.cityId, Validators.required],
      state: [this.childVM.stateId, Validators.required],
      zipcode: [this.childVM.postalCode],
      birthdate: [this.childVM.dateOfBirth, Validators.required],
      photo: [this.childVM.imagePath],
      gender: [this.childVM.genderID, Validators.required],
      physicianname: [this.childVM.PhysicianName],
      preferredhospital: [this.childVM.PreferredHospital],
      physicianContactNumber: [this.childVM.physicianContactNumber],
      physicianAddress: [this.childVM.PhysicianAddress],
      childStartDate: [this.childVM.childStartDate, Validators.required],
      childNotes: [this.childVM.ChildNotes],
    });
  }

  childAddForm() {
    this.addChildForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      mobile: ['', Validators.required],
      address: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipcode: [''],
      birthdate: ['', Validators.required],
      photo: [''],
      gender: ['', Validators.required],
      physicianname: [''],
      preferredhospital: [''],
      physicianContactNumber: [''],
      physicianAddress: [''],
      childStartDate: ['', Validators.required],
      childNotes: [''],
    });
  }

  guardianDetailsForm() {
    if (this.guardianDetailsVm.guardianId === undefined || this.guardianDetailsVm.guardianId === 0) {
      this.guardianForm = this.fb.group({
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        relation: ['', Validators.required], // please check it again
        mobile: ['', Validators.required],
        allowpickup: [false],
        notallowedreason: ['', Validators.required]
      });
    } else {
      this.guardianForm = this.fb.group({
        firstname: [this.guardianDetailsVm.firstName, Validators.required],
        lastname: [this.guardianDetailsVm.lastName, Validators.required],
        relation: [this.guardianDetailsVm.relationTypeId, Validators.required], // please check it again
        mobile: [this.guardianDetailsVm.mobile, Validators.required],
        allowpickup: [this.guardianDetailsVm.isAuthorizedToPickup],
        notallowedreason: [this.guardianDetailsVm.reasonNotToAllow]
      });
    }
  }

  createMedicationForm() {
    if (this.medicationVM.studentMedicationID === undefined || this.medicationVM.studentMedicationID === 0) {
      this.medicationForm = this.fb.group({
        medication: ['', Validators.required],
        strength: ['', Validators.required],
        units: ['', Validators.required],
        dose: ['', Validators.required],
        howtotake: ['', Validators.required],
        othermedication: [''],
        startdate: ['', Validators.required],
        enddate: ['', Validators.required]
      });
    } else {
      this.medicationForm = this.fb.group({
        medication: [this.medicationVM.medicationName, Validators.required],
        strength: [this.medicationVM.strength, Validators.required],
        units: [this.medicationVM.units, Validators.required],
        dose: [this.medicationVM.doseRepeatID, Validators.required],
        howtotake: [this.medicationVM.howTaken, Validators.required],
        othermedication: [this.medicationVM.otherMedication],
        startdate: [this.medicationVM.startDate, Validators.required],
        enddate: [this.medicationVM.endDate, Validators.required]
      });
    }
  }

  createimmunizationForm() {
    if (this.immunizationVM.studentImmunizationID === undefined || this.immunizationVM.studentImmunizationID === 0) {
      this.immunizationForm = this.fb.group({
        immunization: ['', Validators.required],
        date: ['', Validators.required],
        other: [''],
        abbrivation: ['']
      });
    } else {
      this.immunizationForm = this.fb.group({
        immunization: [this.immunizationVM.immunizationID, Validators.required],
        date: [this.immunizationVM.dateReceived, Validators.required],
        other: [this.immunizationVM.otherImmunization],
        abbrivation: [this.immunizationVM.abbreviation]
      });
    }
  }


  // convenience getter for easy access to form fields
  get f() { return this.childForm.controls; }
  get a() { return this.addChildForm.controls; }
  get g() { return this.guardianForm.controls; }
  get m() { return this.medicationForm.controls; }
  get i() { return this.immunizationForm.controls; }

  getAllChildrenList() {
    // this.spinner.show();
    this.childList = [];
    const req = {
      'AgencyID': this.commonService.getAgencyId(),
      'classID': 0,
      'studentID': 0,
      'parentID': this.commonService.getReleventUserId('userdetails'),
      'studentName': '',
    };
    this.apiService.postData(ParentAPIURLs.GetAllStudentsOfParent, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        if (res.body.data.length > 0 && res.body.data !== []) {
          this.childList = res.body.data;
          this.childList[0].classActive = 'active';
          this.getChildDetails(this.childList[0]);
        } else {
          this.spinner.hide();
        }
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

  getChildDetails(value) {
    console.log(value , '      1111111');
    if (value !== null || value !== undefined) {
      $('#basicinfo-tab').tab('show');
      this.childVM.address = value.address;
      this.childVM.firstName = value.firstName;
      this.childVM.lastName = value.lastName;
      this.childVM.genderID = value.genderID;
      this.childVM.countryId = value.countryId;
      this.childVM.stateId = value.stateId;
      this.childVM.cityId = value.cityId;
      this.childVM.postalCode = value.postalCode;
      this.childVM.ChildsContactNumber = value.childsContactNumber;
      this.childVM.address = value.address;
      this.childVM.dateOfBirth = new Date(value.dateOfBirth);
      this.childVM.imagePath = value.imagePath;
      this.childVM.studentId = value.studentId;
      this.childVM.PhysicianName = value.physicianName;
      this.childVM.PreferredHospital = value.preferredHospital;
      this.childVM.physicianContactNumber = value.physicianContactNumber;
      this.childVM.ChildNotes = value.childNotes;
      this.childVM.PhysicianAddress = value.physicianAddress;
      if (value.childStartDate == null) {
        this.childVM.childStartDate = '';
      } else {
        this.childVM.childStartDate = new Date(value.childStartDate);
      }
      this.getStudentDetails();
      this.childDetailsForm();
      this.getAllCountries();
      this.getStatesList();
      this.getCitiesList();

      setTimeout(() => {
        this.spinner.hide();
      }, 500);

    }
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
    this.spinner.show();
    this.stateList = [];
    this.cityList = [];
    const req = {
      'AgencyID': this.commonService.getAgencyId(),
      'CountryId': this.childForm.value.country
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
      'StateId': this.childForm.value.state
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


  AddActivClassStudentList(data) {
    this.spinner.show();
    this.childList.forEach(x => {
      if (data.studentId === x.studentId) {
        x.classActive = 'active';
      } else {
        x.classActive = '';
      }
    });

    this.getChildDetails(data);
  }
  clearStateCity() {
    this.childForm.controls['state'].setValue('');
    this.childForm.controls['city'].setValue('');
  }
  clearCity() {
    this.childForm.controls['city'].setValue('');
  }

  processFile(event) {
    this.formData = new FormData();
    const self = this;
    if (event.target.files && event.target.files[0]) {
      if (event.target.files[0].type !== 'image/png' && event.target.files[0].type !== 'image/jpeg' &&
        event.target.files[0].type !== 'image/jpg') {
        self.fileData = null;
        self.profileimage = '';
        this.notification.warning({ message: 'File not formatt not supported', title: '' });
        return false;
      }
      const reader = new FileReader();
      this.formData = new FormData();
      this.formData.append('fileData', event.target.files[0], event.target.files[0].name);
      self.fileData = this.formData;
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      setTimeout(() => {
        this.image = reader.result;
        this.childVM.imagePath = this.image;
      }, 100);
      this.flag = true;
      // this.UploadImage();
    }
  }

  // Method for getting medication related information
  getStudentDetails() {
    this.loader = true;
    this.getAllDoseRepeat();
    this.getImmunizationType();
    this.getAllergyType();
    this.getAllergyName();
    this.getAllergyReactionType();
    this.spinner.show();
    this.allergyList = [];
    this.immunizationList = [];
    this.medicationList = [];
    this.disabilityList = [];
    this.classList = [];
    const data = {
      'agencyID': this.commonService.getAgencyId(),
      'studentID': this.childVM.studentId,
      'ParentID': this.commonService.getReleventUserId('userdetails')
    };
    this.apiService.postData(TeacherAPIURLs.GetStudentInformation, data, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        if (res.body.data) {
          this.allergyList = res.body.data.studentAllergies;
          this.immunizationList = res.body.data.studentImmunizations;
          this.medicationList = res.body.data.studentMedications;
          this.disabilityList = res.body.data.studentDisabilities;
          this.classList = res.body.data.enrolledClassesInformation;
          //  this.guardianList = res.body.data.guardians;
          this.spinner.hide();
          this.loader = false;
        } else {
          this.spinner.hide();
        }
      } else {
        this.spinner.hide();
        this.error.unknownError();
      }
    }, err => {
      this.spinner.hide();
      this.error.commonError(err);
    });
  }



  saveChildDetails(type) {
    if (this.flag === true) {
      this.UploadImage(type);
      this.flag = false;
    } else {
      if (type === 'add') {
        this.verifyChildAddForm(type);
      } else {
        this.verifyChildUpdateForm(type);
      }
    }
  }



  UploadImage(type) {
    // this.apiService.uploadImage(this.fileData).subscribe(
    this.apiService.uploadImage(TeacherAPIURLs.UploadImage, this.fileData, null).subscribe(res => {
      if (res.status === 200) {
        this.image = res.body.data;
        if (type === 'add') {
          this.addImagePreview = res.body.data;
          this.verifyChildAddForm(type);
        } else {
          this.image = res.body.data;
          this.verifyChildUpdateForm(type);
        }
      }
    }, err => {
      this.error.commonError(err);
    });
  }


  verifyChildUpdateForm(type) {
    if (this.childForm.valid) {
      this.spinner.show();
      this.childVM.UpdatedFlag = 1;
      this.childVM.updatedBy = this.commonService.getReleventUserId('userdetails');
      this.childVM.firstName = this.childForm.value.firstname;
      this.childVM.lastName = this.childForm.value.lastname;
      this.childVM.parentEmailAddress = this.childForm.value.email;
      this.childVM.ChildsContactNumber = this.childForm.value.mobile;
      this.childVM.address = this.childForm.value.address;
      this.childVM.cityId = this.childForm.value.city;
      this.childVM.stateId = this.childForm.value.state;
      this.childVM.countryId = this.childForm.value.country;
      this.childVM.postalCode = this.childForm.value.zipcode;
      this.childVM.dateOfBirth = new Date(this.childForm.value.birthdate).toDateString();
      this.childVM.genderID = this.childForm.value.gender;
      this.childVM.PhysicianName = this.childForm.value.physicianname;
      this.childVM.PreferredHospital = this.childForm.value.preferredhospital;
      this.childVM.physicianContactNumber = this.childForm.value.physicianContactNumber;
      this.childVM.ChildNotes = this.childForm.value.childNotes;
      this.childVM.PhysicianAddress = this.childForm.value.physicianAddress;
      this.childVM.childStartDate = this.childForm.value.childStartDate;
      this.childVM.parentID = this.commonService.getReleventUserId('userdetails');
      this.childVM.transportationID = 1; // change this static value
      this.childVM.feePaymentTypeID = 1; // change this static value
      this.childVM.studentId = (this.childVM.studentId !== undefined && this.childVM.studentId !== null) ? this.childVM.studentId : 0;
      this.childVM.imagePath = this.image === undefined ? this.childVM.imagePath : this.image;
      // this.image = this.profileimage;
      this.childVM.agencyID = this.agencyId;
      this.childVM.id = (this.childVM.studentId !== undefined && this.childVM.studentId !== null) ? this.childVM.studentId : 0;
      this.addUpdateChildDateUsingAPI(this.childVM, type);
    } else {
      this.spinner.hide();
      this.commonService.validateAllFields(this.childForm);
    }
  }


  verifyChildAddForm(type) {
    if (this.addChildForm.valid) {
      this.spinner.show();
      this.childVM.firstName = this.addChildForm.value.firstname;
      this.childVM.lastName = this.addChildForm.value.lastname;
      this.childVM.parentEmailAddress = this.addChildForm.value.email;
      this.childVM.ChildsContactNumber = this.addChildForm.value.mobile;
      this.childVM.address = this.addChildForm.value.address;
      this.childVM.cityId = this.addChildForm.value.city;
      this.childVM.stateId = this.addChildForm.value.state;
      this.childVM.countryId = this.addChildForm.value.country;
      this.childVM.postalCode = this.addChildForm.value.zipcode;
      this.childVM.dateOfBirth = new Date(this.addChildForm.value.birthdate).toDateString();
      this.childVM.genderID = this.addChildForm.value.gender;
      this.childVM.PhysicianName = this.addChildForm.value.physicianname;
      this.childVM.PreferredHospital = this.addChildForm.value.preferredhospital;
      // tslint:disable-next-line: max-line-length
      this.childVM.physicianContactNumber = this.addChildForm.value.physicianContactNumber === '' ? 0 : this.addChildForm.value.physicianContactNumber;
      this.childVM.ChildNotes = this.addChildForm.value.childNotes;
      this.childVM.PhysicianAddress = this.addChildForm.value.physicianAddress;
      this.childVM.childStartDate = this.addChildForm.value.childStartDate;
      this.childVM.parentID = this.commonService.getReleventUserId('userdetails');
      this.childVM.transportationID = 1; // change this static value
      this.childVM.feePaymentTypeID = 1; // change this static value
      this.childVM.studentId = 0;
      this.childVM.imagePath = this.addImagePreview;
      // this.image = this.profileimage;
      this.childVM.agencyID = this.agencyId;
      this.childVM.id = 0;
      this.childVM.createdBy = this.commonService.getLoggedInUserId();
      // this.spinner.hide();
      this.addUpdateChildDateUsingAPI(this.childVM, type);
    } else {
      this.spinner.hide();
      this.commonService.validateAllFields(this.addChildForm);
    }
  }


  addUpdateChildDateUsingAPI(req, type) {
    console.log(req , '      req');
    console.log(type , '      type');
    this.apiService.postDataV2(ParentAPIURLs.SaveStudent, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        //  this.spinner.hide();
        this.flag = false;
        $('.addchild').modal('hide');
        this.notification.success({
          message: type === 'add' ? 'Child added successfully' :
            'Child information updated successfully', title: ''
        });
        this.getAllChildrenList();
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

  clearAddChildForm() {
    this.getAllCountriesAddMode();
    this.addImagePreview = '';
    this.childAddForm();

  }

  // City , state and Countries List api for add mode

  getAllCountriesAddMode() {
    // this.spinner.show();
    this.countryListAddMode = [];
    const req = {
      'AgencyID': this.commonService.getAgencyId(),
    };
    this.apiService.postData(TeacherAPIURLs.GetAllCountry, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.countryListAddMode = res.body.data;
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

  getStatesListAddMode() {
    this.stateListAddMode = [];
    this.cityListAddMode = [];
    const req = {
      'AgencyID': this.commonService.getAgencyId(),
      'CountryId': this.addChildForm.value.country
    };
    this.apiService.postData(TeacherAPIURLs.GetAllStates, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.stateListAddMode = res.body.data;
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


  getCitiesListAddMode() {
    this.cityListAddMode = [];
    const req = {
      'AgencyID': this.commonService.getAgencyId(),
      'StateId': this.addChildForm.value.state
    };
    this.apiService.postData(TeacherAPIURLs.GetAllCities, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.cityListAddMode = res.body.data;
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

  clearStateCityAddMode() {
    this.addChildForm.controls['state'].setValue('');
    this.addChildForm.controls['city'].setValue('');
  }
  clearCityAddMode() {
    this.addChildForm.controls['city'].setValue('');
  }

  // Image process for add chbild Mode

  processFileAddMode(event) {
    const self = this;
    if (event.target.files && event.target.files[0]) {
      if (event.target.files[0].type !== 'image/png' && event.target.files[0].type !== 'image/jpeg' &&
        event.target.files[0].type !== 'image/jpg') {
        self.fileData = null;
        self.profileimage = '';
        this.notification.warning({ message: 'File not formatt not supported', title: '' });
        return false;
      }
      const reader = new FileReader();
      this.formData = new FormData();
      this.formData.append('fileData', event.target.files[0], event.target.files[0].name);
      self.fileData = this.formData;
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      setTimeout(() => {
        this.addImagePreview = reader.result;
      }, 100);

      this.flag = true;
      // this.UploadImage();
    }
  }

  // Get Guardin list

  getGuardianInfo() {
    this.getRelationType();
    this.guardianList = [];
    this.spinner.show();
    const req = {
      'studentID': this.childVM.studentId,
      'agencyID': this.commonService.getAgencyId(),
      'isAuthorized': true
    };
    this.apiService.postData(TeacherAPIURLs.GetAllGuardiansForStudents, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.spinner.hide();
        this.guardianList = res.body.data;
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


  saveStudentGaurdians() {
    this.spinner.show();
    if (this.guardianForm.valid) {
      this.guardianDetailsVm.agencyID = this.commonService.getAgencyId(),
        this.guardianDetailsVm.firstName = this.guardianForm.value.firstname;
      this.guardianDetailsVm.lastName = this.guardianForm.value.lastname;
      this.guardianDetailsVm.mobile = this.guardianForm.value.mobile;
      this.guardianDetailsVm.relationTypeId = this.guardianForm.value.relation;
      this.guardianDetailsVm.isAuthorizedToPickup = this.guardianForm.value.allowpickup;
      this.guardianDetailsVm.reasonNotToAllow = this.guardianForm.value.notallowedreason;
      this.guardianDetailsVm.guardianId = this.guardianDetailsVm.guardianId !== undefined ? this.guardianDetailsVm.guardianId : 0;
      this.guardianDetailsVm.countryId = 0;
      this.guardianDetailsVm.stateId = 0;
      this.guardianDetailsVm.cityId = 0;
      this.guardianDetailsVm.address = '';
      this.guardianDetailsVm.id = this.guardianDetailsVm.guardianId !== undefined ? this.guardianDetailsVm.guardianId : 0;
      this.guardianDetailsVm.studentId = this.childVM.studentId;
      this.guardianDetailsVm.imagePath = this.addImagePreview;
      this.guardianDetailsVm.createdBy = this.guardianDetailsVm.guardianId !== undefined ? null : this.commonService.getLoggedInUserId();
      this.guardianDetailsVm.updatedBy = this.guardianDetailsVm.guardianId !== undefined ? this.commonService.getLoggedInUserId() : null;
      let msg = '';
      if (this.guardianDetailsVm.guardianId === 0) {
        msg = 'Guardian added successfully ';
      } else {
        msg = 'Guardian information updated successfully ';
      }

      this.saveGuardianInfoWithAPI(msg);
    } else {
      this.spinner.hide();
      this.commonService.validateAllFields(this.guardianForm);
    }

  }


  saveGuardianInfoWithAPI(msg) {
    this.apiService.postData(ParentAPIURLs.SaveStudentGaurdians, this.guardianDetailsVm, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.notification.success({ message: msg, title: '' });
        this.guardianImageUploadFlag = false;
        this.getGuardianInfo();
        $('.guardianinfo').modal('hide');
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


  // Method to delete Guardian
  deleteGuardian(value) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      accept: () => {
        this.spinner.show();
        const data = {
          'guardianId': value.guardianId,
          'agencyID': this.commonService.getAgencyId(),
          'id': value.guardianId,
          'IsDeleted': true,
          'DeletedDate': new Date(),
          'DeletedBy': this.commonService.getReleventUserId('userdetails'),
          'studentID': this.childVM.studentId,
          'firstName': value.firstName,
          'lastName': value.lastName,
          'updatedBy': this.commonService.getLoggedInUserId()
        };
        this.apiService.postData(ParentAPIURLs.SaveStudentGaurdians, data, null).subscribe(res => {
          if (res.body.statusCode === 200) {
            // this.spinner.hide();
            this.deleteGuardianSuccess(value);
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

  deleteGuardianSuccess(data) {
    const index = this.guardianList.findIndex(r => r.guardianId === data.guardianId);
    this.guardianList.splice(index, 1);
    this.spinner.hide();
    this.notification.success({ message: 'This guardian has been deleted successfully', title: '' });
  }

  getPerticulerGuardianInfo(data) {
    this.guardianDetailsVm.isAuthorizedToPickup = data.isAuthorizedToPickup;
    this.guardianDetailsVm.firstName = data.firstName;
    this.guardianDetailsVm.lastName = data.lastName;
    this.guardianDetailsVm.mobile = data.mobile;
    this.guardianDetailsVm.relationTypeId = data.relationTypeId;
    this.guardianDetailsVm.reasonNotToAllow = data.reasonNotToAllow;
    this.guardianDetailsVm.isAuthorizedToPickup = data.isAuthorizedToPickup;
    if (this.guardianDetailsVm.isAuthorizedToPickup === true) {
      // this.reasonNotToAllowbox = false;
      this.guardianForm.controls['notallowedreason'].setValidators(Validators.nullValidator);
      this.guardianForm.controls['notallowedreason'].updateValueAndValidity();
    } else {
      this.reasonNotToAllowbox = true;
      this.guardianForm.controls['notallowedreason'].setValue('');
      this.guardianForm.controls['notallowedreason'].setValidators(Validators.required);
      this.guardianForm.controls['notallowedreason'].updateValueAndValidity();
    }
    this.guardianDetailsVm.guardianId = data.guardianId;
    this.addImagePreview = data.imagePath;
    if (this.guardianDetailsVm.isAuthorizedToPickup === true) {
      this.reasonNotToAllowbox = false;
    } else {
      this.reasonNotToAllowbox = true;
    }

    this.guardianDetailsForm();
  }


  markAsAllowToPickup() {
    if (this.guardianForm.value.allowpickup === true) {
      this.reasonNotToAllowbox = false;
      this.guardianForm.controls['notallowedreason'].setValidators(Validators.nullValidator);
      this.guardianForm.controls['notallowedreason'].updateValueAndValidity();
    } else {
      this.reasonNotToAllowbox = true;
      this.guardianForm.controls['notallowedreason'].setValue('');
      this.guardianForm.controls['notallowedreason'].setValidators(Validators.required);
      this.guardianForm.controls['notallowedreason'].updateValueAndValidity();
    }

  }

  getRelationType() {
    this.relationTypeList = [];
    const data = {
      'agencyID': this.commonService.getAgencyId(),
      'studentID': this.childVM.studentId
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



  processFileGuardian(event) {
    const self = this;
    if (event.target.files && event.target.files[0]) {
      if (event.target.files[0].type !== 'image/png' && event.target.files[0].type !== 'image/jpeg' &&
        event.target.files[0].type !== 'image/jpg') {
        self.fileData = null;
        self.profileimage = '';
        this.notification.warning({ message: 'File not formatt not supported', title: '' });
        return false;
      }
      const reader = new FileReader();
      this.formData = new FormData();
      this.formData.append('fileData', event.target.files[0], event.target.files[0].name);
      self.fileData = this.formData;
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      setTimeout(() => {
        this.addImagePreview = reader.result;
      }, 100);

      this.guardianImageUploadFlag = true;
      // this.UploadImage();
    }
  }



  verifyImageUploadForGuardian() {
    if (this.guardianImageUploadFlag === true) {
      this.UploadImageForGuardian();
      this.guardianImageUploadFlag = false;
    } else {
      this.saveStudentGaurdians();
    }
  }


  UploadImageForGuardian() {
    // this.apiService.uploadImage(this.fileData).subscribe(
    this.apiService.uploadImage(TeacherAPIURLs.UploadImage, this.fileData, null).subscribe(res => {
      if (res.status === 200) {
        this.addImagePreview = res.body.data;
        this.saveStudentGaurdians();
        // if (type === 'add') {
        //   this.addImagePreview = res.body.data.filePath;
        //   this.verifyChildAddForm(type);
        // } else {
        //   this.image = res.body.data.filePath;
        //   this.verifyChildUpdateForm(type);
        // }
      }
    }, err => {
      this.spinner.hide();
      this.error.commonError(err);
    });
  }


  cleareGuardianForm() {
    this.addImagePreview = '';
    this.guardianDetailsVm = {};
    this.reasonNotToAllowbox = true;
    this.guardianDetailsForm();
  }

  // Medication section
  verifyMedication() {
    this.spinner.show();
    if (this.medicationForm.valid) {
      if (this.medicationForm.value.enddate.setHours(0, 0, 0) < this.medicationForm.value.startdate.setHours(0, 0, 0)) {
        this.spinner.hide();
        this.notification.warning({ message: 'End date should be greater than or equal to start date', title: '' });
      } else {
        this.medicationVM.UpdatedFlag = 1;
        this.medicationVM.updatedBy = this.commonService.getReleventUserId('userdetails');
        this.medicationVM.id = this.medicationVM.studentMedicationID !== undefined ? this.medicationVM.studentMedicationID : 0;
        this.medicationVM.studentMedicationID = this.medicationVM.studentMedicationID !== undefined ?
        this.medicationVM.studentMedicationID : 0;
        this.medicationVM.medicationName = this.medicationForm.value.medication;
        this.medicationVM.strength = this.medicationForm.value.strength;
        this.medicationVM.units = this.medicationForm.value.units;
        this.medicationVM.doseRepeatID = this.medicationForm.value.dose;
        this.medicationVM.howTaken = this.medicationForm.value.howtotake;
        this.medicationVM.otherMedication = this.medicationForm.value.othermedication;
        this.medicationVM.startDate = new Date(this.medicationForm.value.startdate).toDateString();
        this.medicationVM.endDate = new Date(this.medicationForm.value.enddate).toDateString();
        this.medicationVM.studentID = this.childVM.studentId;
        this.medicationVM.agencyID = this.agencyId;
        this.medicationVM.dosageQuantityID = 2;
        this.medicationVM.createdBy = this.medicationVM.studentMedicationID !== undefined ? null : this.commonService.getLoggedInUserId();
        this.medicationVM.modifiedBy = this.medicationVM.studentMedicationID !== undefined ? this.commonService.getLoggedInUserId() : null;
        let msg = '';
        if (this.medicationVM.studentMedicationID === 0) {
          msg = 'Medication added successfully ';
        } else {
          msg = 'Medication details updated successfully ';
        }
        this.saveMedication(msg);
      }
    } else {
      this.spinner.hide();
      this.commonService.validateAllFields(this.medicationForm);
    }
  }

  saveMedication(msg) {
    this.apiService.postData(ParentAPIURLs.SaveStudentMedication, this.medicationVM, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.notification.success({ message: msg, title: '' });
        this.getStudentDetails();
        $('.medication').modal('hide');
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

  // Method to delete medication
  deleteMedication(value) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      accept: () => {
        this.spinner.show();
        const data = {
          'studentMedicationID': value.studentMedicationID,
          'agencyID': this.commonService.getAgencyId(),
          'id': value.studentMedicationID,
          'IsDeleted': true,
          'DeletedDate': new Date(),
          'DeletedBy': this.commonService.getReleventUserId('userdetails'),
          'studentID': this.childVM.studentId,
          'updatedBy': this.commonService.getLoggedInUserId()
        };
        this.apiService.postData(ParentAPIURLs.SaveStudentMedication, data, null).subscribe(res => {
          if (res.body.statusCode === 200) {
            // this.spinner.hide();
            this.deleteMedicationSuccess(value);
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

  deleteMedicationSuccess(data) {
    const index = this.medicationList.findIndex(r => r.studentMedicationID === data.studentMedicationID);
    this.medicationList.splice(index, 1);
    this.spinner.hide();
    this.notification.success({ message: 'This medication has been deleted successfully', title: '' });
  }


  getPerticulerMedication(value) {
    this.medicationVM.id = value.id;
    this.medicationVM.studentMedicationID = value.studentMedicationID;
    this.medicationVM.medicationName = value.medicationName;
    this.medicationVM.strength = value.strength;
    this.medicationVM.units = value.units;
    this.medicationVM.doseRepeatID = value.doseRepeatID;
    this.medicationVM.howTaken = value.howTaken;
    this.medicationVM.otherMedication = value.otherMedication;
    this.medicationVM.startDate = new Date(value.startDate);
    this.medicationVM.endDate = new Date(value.endDate);
    this.medicationVM.studentID = this.childVM.studentId;
    this.medicationVM.agencyID = this.agencyId;
    this.medicationVM.dosageQuantityID = 2;
    this.createMedicationForm();
  }



  getAllDoseRepeat() {
    this.doseList = [];
    const data = {
      'agencyID': this.commonService.getAgencyId()
    };
    this.apiService.postData(ParentAPIURLs.GetAllDoseRepeat, data, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.doseList = res.body.data;
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

  // Immunization section
  getImmunizationType() {
    this.immunizationtypeListForDeopdown = [];
    const data = {
      'agencyID': this.commonService.getAgencyId()
    };
    this.apiService.postData(ParentAPIURLs.GetImmunizationType, data, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.immunizationtypeListForDeopdown = res.body.data;
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

  CheckImmunizationType() {
    const index = this.immunizationForm.value.immunization;
    this.immunizationtypeListForDeopdown.forEach(x => {
      if (x.value.toString() === index) {
        if (x.label === 'other' || x.label === 'Other' || x.label === 'OTHER') {
          this.showOthwerImmunization = true;
          this.immunizationForm.controls['other'].setValidators(Validators.required);
          this.immunizationForm.controls['other'].updateValueAndValidity();
        } else {
          this.showOthwerImmunization = false;
          this.immunizationForm.controls['other'].setValue('');
          this.immunizationForm.controls['abbrivation'].setValue('');
          this.immunizationForm.controls['other'].setValidators(Validators.nullValidator);
          this.immunizationForm.controls['other'].updateValueAndValidity();
        }
      } else {

      }
    });
    // console.log('id', this.immunizationForm.value.immunization);
    // console.log('imm', this.immunizationtypeListForDeopdown[index] );
    // if (this.immunizationForm.value === ) {
    // } else {
    // }
  }


  verifyImmunization() {
    this.spinner.show();
    if (this.immunizationForm.valid) {
      this.immunizationVM.UpdatedFlag = 1;
      this.immunizationVM.updatedBy = this.commonService.getReleventUserId('userdetails');
      this.immunizationVM.agencyID = this.agencyId;
      this.immunizationVM.studentID = this.childVM.studentId;
      this.immunizationVM.dateReceived = new Date(this.immunizationForm.value.date).toDateString();
      this.immunizationVM.immunizationID = this.immunizationForm.value.immunization;
      this.immunizationVM.otherImmunization = this.immunizationForm.value.other;
      this.immunizationVM.abbreviation = this.immunizationForm.value.abbrivation;
      this.immunizationVM.studentImmunizationID = this.immunizationVM.studentImmunizationID !== undefined ?
        this.immunizationVM.studentImmunizationID : 0;
      this.immunizationVM.id = this.immunizationVM.studentImmunizationID !== undefined ? this.immunizationVM.studentImmunizationID : 0;
      this.immunizationVM.createdBy = this.immunizationVM.studentImmunizationID !== undefined ?
        null : this.commonService.getLoggedInUserId();
      this.immunizationVM.modifiedBy = this.immunizationVM.studentImmunizationID !== undefined ?
        this.commonService.getLoggedInUserId() : null;
      this.saveImmunization();
    } else {
      this.spinner.hide();
      this.commonService.validateAllFields(this.immunizationForm);
    }
  }


  saveImmunization() {
    this.apiService.postData(ParentAPIURLs.SaveStudentImmunization, this.immunizationVM, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.getStudentDetails();
        $('.immunization').modal('hide');
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


  // Method to delete immunization
  deleteimmunization(value) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      accept: () => {
        this.spinner.show();
        const data = {
          'studentImmunizationID': value.studentImmunizationID,
          'agencyID': this.commonService.getAgencyId(),
          'id': value.studentImmunizationID,
          'IsDeleted': true,
          'DeletedDate': new Date(),
          'DeletedBy': this.commonService.getLoggedInUserId,
          'studentID': this.childVM.studentId
        };
        this.apiService.postData(ParentAPIURLs.SaveStudentImmunization, data, null).subscribe(res => {
          if (res.body.statusCode === 200) {
            // this.spinner.hide();
            this.deleteimmunizationSuccess(value);
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

  deleteimmunizationSuccess(data) {
    const index = this.immunizationList.findIndex(r => r.studentImmunizationID === data.studentImmunizationID);
    this.immunizationList.splice(index, 1);
    this.spinner.hide();
    this.notification.success({ message: 'This immunization has been deleted successfully', title: '' });
  }

  getPerticulerStudentimmunization(value) {
    this.immunizationVM.agencyID = this.agencyId;
    this.immunizationVM.studentID = this.childVM.studentId;
    this.immunizationVM.dateReceived = new Date(value.dateReceived);
    this.immunizationVM.immunizationID = value.immunizationID;
    if (value.immunizationName === 'Other' || value.immunizationName === 'other' || value.immunizationName === 'OTHER') {
      this.showOthwerImmunization = true;
    } else {
      this.showOthwerImmunization = false;
    }
    this.immunizationVM.otherImmunization = value.otherImmunization;
    this.immunizationVM.abbreviation = value.abbreviation;
    this.immunizationVM.studentImmunizationID = value.studentImmunizationID;
    this.immunizationVM.id = value.studentImmunizationID;
    this.createimmunizationForm();
  }

  clearImmunization() {
    this.showOthwerImmunization = false;
    this.immunizationVM = {};
    this.createimmunizationForm();
  }

  // Disability section

  verifyDisability() {
    if (this.disabilitydiscription === '') {
      this.notification.warning({ message: 'Please enter description', title: '' });
    } else {
      this.spinner.show();
      const req = {
        'id': this.disabilityId,
        'studentID': this.childVM.studentId,
        'description': this.disabilitydiscription,
        'agencyID': this.agencyId,
        'updatedBy': this.commonService.getReleventUserId('userdetails'),
        'UpdatedFlag': 1
      };

      this.apiService.postData(ParentAPIURLs.SaveStudentDisabilities, req, null).subscribe(res => {
        if (res.body.statusCode === 200) {
          this.getStudentDetails();
          $('.disability').modal('hide');
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

  }

  // Method to delete disability
  deleteDisability(value) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      accept: () => {
        this.spinner.show();
        const data = {
          'agencyID': this.commonService.getAgencyId(),
          'id': value.id,
          'IsDeleted': true,
          'DeletedDate': new Date(),
          'DeletedBy': this.commonService.getLoggedInUserId(),
          'studentID': this.childVM.studentId,
          'description': value.description
        };
        this.apiService.postData(ParentAPIURLs.SaveStudentDisabilities, data, null).subscribe(res => {
          if (res.body.statusCode === 200) {
            // this.spinner.hide();
            this.deleteDisabilitySuccess(value);
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

  deleteDisabilitySuccess(data) {
    const index = this.disabilityList.findIndex(r => r.id === data.id);
    this.disabilityList.splice(index, 1);
    this.spinner.hide();
    this.notification.success({ message: 'This record has been deleted successfully', title: '' });
  }


  disabiltyDetials(value) {
    this.disabilityId = value.id;
    this.disabilitydiscription = value.description;
  }

  clearDisability() {
    this.disabilitydiscription = '';
    this.disabilityId = 0;
  }

  // Child Allergy

  createAllergyForm() {
    if (this.allergyVM.studentAllergiesID === undefined || this.allergyVM.studentAllergiesID === 0) {
      this.allergyForm = this.fb.group({
        allergy: ['', Validators.required],
        allergyname: ['', Validators.required],
        reaction: ['', Validators.required],
        treatment: ['', Validators.required],
        firstobserverddate: [''],
        lastobserveddate: [''],
        comments: ['']
      });
    } else {
      this.allergyForm = this.fb.group({
        allergy: [this.allergyVM.allergyTypeID, Validators.required],
        allergyname: [this.allergyVM.allergyNameID, Validators.required],
        reaction: [this.allergyVM.allergyReactionTypeID, Validators.required],
        treatment: [this.allergyVM.treatment, Validators.required],
        firstobserverddate: [this.allergyVM.firstAllergyObservation],
        lastobserveddate: [this.allergyVM.lastAllergyObservation],
        comments: [this.allergyVM.allergyComment]
      });
    }

  }


  get al() { return this.allergyForm.controls; }


  getAllergyType() {
    const req = {
      'id': this.disabilityId,
      'studentID': this.childVM.studentId,
      'description': this.disabilitydiscription,
      'agencyID': this.agencyId,
    };

    this.apiService.postData(ParentAPIURLs.GetAllergyType, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.allergyType = res.body.data;
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


  getAllergyName() {
    const req = {
      'id': this.disabilityId,
      'studentID': this.childVM.studentId,
      'description': this.disabilitydiscription,
      'agencyID': this.agencyId,
    };

    this.apiService.postData(ParentAPIURLs.GetAllergyName, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.allergyNameList = res.body.data;
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

  getAllergyReactionType() {
    const req = {
      'id': this.disabilityId,
      'studentID': this.childVM.studentId,
      'description': this.disabilitydiscription,
      'agencyID': this.agencyId,
    };

    this.apiService.postData(ParentAPIURLs.GetAllergyReactionType, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.allergyReactionList = res.body.data;
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

  verifyAllergy() {
    this.spinner.show();
    const firstObDate = this.commonService.getOnlyDate(this.allergyForm.value.firstobserverddate);
    const lastObDate = this.commonService.getOnlyDate(this.allergyForm.value.lastobserveddate);
    if (this.allergyForm.valid) {
      if (firstObDate > lastObDate
        && this.allergyForm.value.firstobserverddate !== '' && this.allergyForm.value.lastobserveddate !== '') {
        this.spinner.hide();
        this.notification.warning({ message: 'First observerd date should be less than Last Observed date', title: '' });
      } else {
        this.allergyVM.UpdatedFlag = 1;
        this.allergyVM.updatedBy = this.commonService.getReleventUserId('userdetails');
        this.allergyVM.agencyID = this.agencyId;
        this.allergyVM.allergyTypeID = this.allergyForm.value.allergy;
        this.allergyVM.allergyNameID = this.allergyForm.value.allergyname;
        this.allergyVM.allergyReactionTypeID = this.allergyForm.value.reaction;
        this.allergyVM.treatment = this.allergyForm.value.treatment;
        this.allergyVM.firstAllergyObservation = this.allergyForm.value.firstobserverddate;
        this.allergyVM.lastAllergyObservation = this.allergyForm.value.lastobserveddate;
        this.allergyVM.studentID = this.childVM.studentId;
        this.allergyVM.allergyComment = this.allergyForm.value.comments;
        this.allergyVM.studentAllergiesID = this.allergyVM.studentAllergiesID === undefined ? 0 : this.allergyVM.studentAllergiesID;
        this.allergyVM.id = this.allergyVM.studentAllergiesID === undefined ? 0 : this.allergyVM.studentAllergiesID;
        this.allergyVM.createdBy = this.allergyVM.studentAllergiesID === undefined ? this.commonService.getLoggedInUserId() : null;
        this.allergyVM.modifiedBy = this.allergyVM.studentAllergiesID === undefined ? null : this.commonService.getLoggedInUserId();
        let msg = '';
        if (this.allergyVM.studentAllergiesID === 0) {
          msg = 'Allergy added successfully for this child ';
        } else {
          msg = 'Allergy details updated successfully for this child ';
        }
        this.saveAllergy(msg);
      }
    } else {
      this.spinner.hide();
      this.commonService.validateAllFields(this.allergyForm);
    }
  }

  saveAllergy(msg) {
    this.apiService.postData(ParentAPIURLs.SaveStudentAllergies, this.allergyVM, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.spinner.hide();
        this.notification.success({ message: msg, title: '' });
        $('.allergies').modal('hide');
        this.getStudentDetails();
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


  getPerticulerAllergyDetaild(value) {
    this.allergyVM.allergyTypeID = value.allergyTypeID;
    this.allergyVM.allergyNameID = value.allergyNameID;
    this.allergyVM.allergyReactionTypeID = value.allergyReactionTypeID;
    this.allergyVM.treatment = value.treatment;
    this.allergyVM.firstAllergyObservation = value.firstAllergyObservation !== null ?
      this.commonService.getLocalDateTimeFromUTC(value.firstAllergyObservation) : this.nullDate;
    this.allergyVM.lastAllergyObservation = value.lastAllergyObservation !== null ?
      this.commonService.getLocalDateTimeFromUTC(value.lastAllergyObservation) : this.nullDate;
    this.allergyVM.studentID = value.studentId;
    this.allergyVM.allergyComment = value.allergyComment;
    this.allergyVM.studentAllergiesID = value.studentAllergiesID;
    this.allergyVM.id = value.studentAllergiesID;
    this.createAllergyForm();
  }



  // Method to delete disability
  deleteAllergy(value) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      accept: () => {
        this.spinner.show();
        const data = {
          'agencyID': this.agencyId,
          'id': value.studentAllergiesID,
          'IsDeleted': true,
          'DeletedDate': new Date(),
          'DeletedBy': this.commonService.getReleventUserId('userdetails'),
          'studentID': this.childVM.studentId,
          'description': value.description,
          'studentAllergiesID': value.studentAllergiesID,
          'AllergyComment': value.allergyComment,
          'createdBy': this.commonService.getLoggedInUserId()
        };
        this.apiService.postData(ParentAPIURLs.SaveStudentAllergies, data, null).subscribe(res => {
          if (res.body.statusCode === 200) {
            // this.spinner.hide();
            this.deleteallergySuccess(value);
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

  deleteallergySuccess(data) {
    const index = this.allergyList.findIndex(r => r.studentAllergiesID === data.studentAllergiesID);
    this.allergyList.splice(index, 1);
    this.spinner.hide();
    this.notification.success({ message: 'This record has been deleted successfully', title: '' });
  }


  clearallergy() {
    this.allergyVM = {};
    this.createAllergyForm();
  }

  clearMedicationForm() {
    this.createMedicationForm();
  }

}

