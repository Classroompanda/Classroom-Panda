import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ParentAPIURLs } from '../../../parent/shared/constant';
import { TeacherAPIURLs } from '../../../teacher/shared/constant';
import { GuardiansDetailsVM, TeacherStudentDetailsVM } from '../../../teacher/shared/view-model/teacher-students-detailsVM';
import { MedicationVM, ImmunizationVM, AllergyVM, ChildListVM } from '../../../parent/shared/view-model/parent-detailsvm';
import { AddClassesVM } from '../shared/view-model/AddClassesVM';
import { RecurringBillingVM } from '../shared/view-model/AddClassesVM';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorHandlerService } from '../../../../shared/services/error-handler/error-handler.service';
import { CommonService } from '../../../../shared/services/common/common.service';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { NotificationService } from '../../../../shared/services/notification-service/notification.service';
import { AgencyApiService } from '../shared/services/agency-api-service/agency-api.service';
import { AgencyAPIURLs } from '../shared/constatant';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';

declare var $: any;
@Component({
  selector: 'app-agency-student-details',
  templateUrl: './agency-student-details.component.html',
  styleUrls: ['./agency-student-details.component.css']
})
export class AgencyStudentDetailsComponent implements OnInit {
  isImageUploaderDisplay = true;
  allowedImageFileType = 'application/pdf,image/*';
  studentName = '';
  parentId = 0;
  reqParentId = 0;
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
  nextday = new Date();
  maxEnrolEndtDate: any;
  EnrolEndtDate: any;
  fileData: FormData;
  formData = new FormData();
  profileimage: any;
  image: any;
  flag = false;
  loader = true;
  guardianList: any[] = [];
  guardianDetailsVm: GuardiansDetailsVM = {};
  allergyList: any[] = [];
  immunizationList: any[] = [];
  medicationList: any[] = [];
  disabilityList: any[] = [];
  classList: any[] = [];
  classListBilling: any[] = [];
  pageNo = 0;
  totalRecord = 0;
  doseList: any[] = [];
  relationTypeList: any[] = [];
  immunizationtypeListForDeopdown: any[] = [];
  addImagePreview: any;
  reasonNotToAllowbox = true;
  medicationForm: FormGroup;
  recurringBillingForm: FormGroup;
  immunizationForm: FormGroup;
  medicationVM: MedicationVM = {};
  classVM: AddClassesVM = {};
  billingVM: RecurringBillingVM = {};
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
  id = 0;
  isSubscriptionActive: boolean;
  nullDate: any;
  authorizedPersonList: any[] = [];
  restrictedPersonList: any[] = [];
  studentfileList: any[] = [];
  classesList: any[] = [];
  feeTypeList: any[] = [];
  showEmergency = false;
  emeregencyLable = 'All Contact';
  ImageUploadForm: FormGroup;
  imageUrlArray: any[] = [];
  isImageArray: boolean;
  showUploadBtn = true;
  descriptionList: any[] = [];
  recurringBillingList: any[] = [];
  @ViewChild('pform') pform: any;
  addMode: boolean;
  recurringId = 0;
  tomorrow: any;
  busList: any[] = [];

  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  constructor(private apiService: AgencyApiService, private error: ErrorHandlerService,
    private spinner: NgxSpinnerService, private notification: NotificationService,
    public commonService: CommonService, private fb: FormBuilder, private route: ActivatedRoute,
    private confirmationService: ConfirmationService) {
    this.isSubscriptionActive = this.commonService.getSubscriptionStatus();
  }

  ngOnInit() {
    this.spinner.show();   
    this.tomorrow = new Date();
    this.tomorrow.setDate(this.tomorrow.getDate() + 1);
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.reqParentId = params['parentid'];
    });
    this.agencyId = this.commonService.getAgencyId();
    this.dpConfig = Object.assign({}, { containerClass: 'theme-dark-blue' },
      { showWeekNumbers: false });
    this.spinner.show();
    this.createImageUploadForm();
    this.getStudentAllDetails();
    this.childDetailsForm();
    this.childAddForm();
    this.guardianDetailsForm();
    this.createMedicationForm();
    this.createimmunizationForm();
    this.createAllergyForm();
    this.CreateRecurringBillingForm();
    this.getFeeType();
    this.getAllBusList();
    this.getallclassesByStudentId();
  }

  limitOnImageFiles(event) {
    if (event.files.length > 3) {
      this.notification.warning({ message: 'You can upload maximum 3 images only', title: '' });
    }
  }

  myImageUploader(event) {
    this.spinner.show();
    this.flag = true;
    this.isImageArray = true;
    this.formData = new FormData();
    let count = 0;
    if (event.files.length <= 3) {
      for (let index = 0; index < event.files.length; index++) {
        this.formData.append(event.files[index].name, event.files[index]);
        count = index;
        if (count === event.files.length - 1) {
          this.uploadMedia();
        }
      }
    } else {
      this.spinner.hide();
      this.notification.warning({ message: 'You can upload maximum 3 files only', title: '' });
    }
  }

  uploadMedia() {
    if (this.ImageUploadForm.valid) {
      this.imageUrlArray = [];
      const headers = new HttpHeaders();
      headers.set('Content-Type', null);
      headers.set('Accept', 'multipart/form-data');
      const params = headers;
      const loggedInId = this.commonService.getLoggedInUserId();
      const Id = loggedInId.toString();
      this.formData.append('loggedInId', Id);
      this.apiService.postData(TeacherAPIURLs.MultipleImageUpload, this.formData, params).subscribe(res => {
        if (res.body.statusCode === 200) {
          this.flag = false;
          if (this.isImageArray === true) {
            res.body.data.forEach(x => {
              this.imageUrlArray.push({
                'id': 0,
                'FilePath': x
              });
            });
          }
          this.savePost();
          this.formData = new FormData();
        } else {
          this.spinner.hide();
          this.error.unknownError();
          this.formData = new FormData();
        }
      }, err => {
        this.spinner.hide();
        this.error.commonError(err);
        this.formData = new FormData();
      });
    } else {
      this.spinner.hide();
      this.commonService.validateAllFields(this.ImageUploadForm);
    }
  }

    // For Get School Bus
    getAllBusList() {
      this.busList = [];
      const data = {
        'agencyID': this.commonService.getAgencyId()
      };
      this.apiService.postData(AgencyAPIURLs.GetAllBus, data, null).subscribe(res => {
        if (res.body.statusCode === 200) {
          this.busList = res.body.data;
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

  savePost() {
    if (this.ImageUploadForm.valid) {
      if (this.imageUrlArray.length > 0) {
        const data = {
          'agencyID': this.commonService.getAgencyId(),
          'studentID': this.id,
          'studentFiles': this.imageUrlArray,
          'createdBy': this.commonService.getLoggedInUserId()
        };
        this.apiService.postData(AgencyAPIURLs.SavestudentFiles, data, null).subscribe(res => {
          if (res.body.statusCode === 200) {
            $('.studentfiles').modal('hide');
            this.clearImage();
            this.spinner.hide();
            this.getalluploadedByStudentId();
            this.notification.success({ message: 'Student Files Upload successfully', title: '' });
          } else {
            this.spinner.hide();
            this.error.unknownError();
          }
        }, err => {
          this.spinner.hide();
          this.error.commonError(err);
        });
      } else {
        this.spinner.hide();
        this.notification.warning({ message: 'Please upload Image or PDF Files', title: '' });
      }
    } else {
      this.spinner.hide();
      this.commonService.validateAllFields(this.ImageUploadForm);
    }
  }

  clearImage() {
    this.createImageUploadForm();
    this.imageUrlArray = [];
    this.imageUrlArray.length = 0;
    this.pform.clear();
  }

  createImageUploadForm() {
    this.ImageUploadForm = this.fb.group({
      isimage: ['Image']
    });
  }

  getData() {
    setTimeout(() => {
      this.spinner.hide();
    }, 500);

    //
  }
  clearForm() {
    // this.participantsList = [];
    // this.studentList = [];
    // this.ImageUploadForm();
  }
  closeDialog() {
    // this.closeModal = 'modal';
    $('.addimage').modal('hide');
  }
  onUpload(event) {
    // for (const file of event.files) {
    this.formData.append('image', event.files[0]);
    // this.uploadedFiles.push(file);
    // }
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
      physicianaddress: [this.childVM.PhysicianAddress],
      childstartdate: [this.childVM.childStartDate, Validators.required],
      childnotes: [this.childVM.ChildNotes],
      bus: [this.childVM.busID]
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
      physicianaddress: [''],
      childstartdate: [''],
      childnotes: [''],
      bus: [0]
    });
  }

  guardianDetailsForm() {
    if (this.guardianDetailsVm.guardianId === undefined || this.guardianDetailsVm.guardianId === 0) {
      this.guardianForm = this.fb.group({
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        relation: ['', Validators.required],
        mobile: ['', Validators.required],
        allowpickup: [false],
        notallowedreason: ['', Validators.required]
      });
    } else {
      this.guardianForm = this.fb.group({
        firstname: [this.guardianDetailsVm.firstName, Validators.required],
        lastname: [this.guardianDetailsVm.lastName, Validators.required],
        relation: [this.guardianDetailsVm.relationTypeId, Validators.required],
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
  get k() { return this.ImageUploadForm.controls; }

  getAllChildrenList() {
    // this.spinner.show();
    this.childList = [];
    const req = {
      'AgencyID': this.commonService.getAgencyId(),
      'classID': 0,
      'studentID': this.id,
      'parentID': this.commonService.getReleventUserId('userdetails'),
      'studentName': '',
    };
    this.apiService.postData(ParentAPIURLs.GetAllStudentsOfParent, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        if (res.body.data.length > 0 && res.body.data !== []) {
          this.childList = res.body.data;
          this.childList[0].classActive = 'active';
          this.getChildDetails(this.childList[0]);
          console.log('chi', this.childList);
        }
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

  getStudentAllDetails() {
    const data = {
      'agencyID': this.commonService.getAgencyId(),
      'studentID': this.id,
      'ParentID': this.reqParentId
    };

    this.apiService.postData(TeacherAPIURLs.GetStudentInformation, data, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        if (res.body.data) {
          console.log(res.body.data, '     11111');
          this.studentName = res.body.data.studentName;
          this.getChildDetails(res.body.data);
          this.spinner.hide();
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


  getChildDetails(value) {
    this.classList = [];
    if (value !== null || value !== undefined) {
      $('#basicinfo-tab').tab('show');
      this.childVM.address = value.address;
      this.childVM.firstName = value.firstName;
      this.childVM.lastName = value.lastName;
      this.childVM.genderID = value.genderID;
      this.childVM.PhysicianName = value.physicianName;
      this.childVM.ChildNotes = value.childNotes;
      this.childVM.PhysicianAddress = value.physicianAddress;
      if (value.childStartDate == null) {
        this.childVM.childStartDate = '';
      } else {
        this.childVM.childStartDate = new Date(value.childStartDate);
      }
      this.childVM.PreferredHospital = value.preferredHospital;
      this.childVM.countryId = value.countryId;
      this.childVM.stateId = value.stateId;
      this.childVM.cityId = value.cityId;
      this.childVM.postalCode = value.postalCode;
      this.childVM.ChildsContactNumber = value.childsContactNumber;
      this.childVM.address = value.address;
      this.childVM.dateOfBirth = new Date(value.dateOfBirth);
      this.childVM.imagePath = value.imagePath;
      this.childVM.studentId = value.studentId;
      this.parentId = value.parentID;
      this.classList = value.enrolledClassesInformation;
      this.childVM.physicianContactNumber = value.physicianContactNumber;
      this.childVM.busID = value.busID;
      // this.getStudentDetails();
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
    this.spinner.show();
    this.countryList = [];
    const req = {
      'AgencyID': this.commonService.getAgencyId(),
    };
    this.apiService.postData(TeacherAPIURLs.GetAllCountry, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.countryList = res.body.data;
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
      console.log('mge', this.image);
      this.flag = true;
    }
  }

  // Method for getting medication related information
  getStudentDetails() {
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
      'ParentID': this.reqParentId
    };
    this.apiService.postData(TeacherAPIURLs.GetStudentInformation, data, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        if (res.body.data) {
          this.allergyList = res.body.data.studentAllergies;
          this.immunizationList = res.body.data.studentImmunizations;
          this.medicationList = res.body.data.studentMedications;
          this.disabilityList = res.body.data.studentDisabilities;
          this.classList = res.body.data.enrolledClassesInformation;
          console.log('med', this.disabilityList);
          this.spinner.hide();
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
    this.spinner.show();
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
      this.childVM.firstName = this.childForm.value.firstname;
      this.childVM.lastName = this.childForm.value.lastname;
      this.childVM.parentEmailAddress = this.childForm.value.email;
      this.childVM.ChildsContactNumber = this.childForm.value.mobile;
      this.childVM.address = this.childForm.value.address;
      this.childVM.cityId = this.childForm.value.city;
      this.childVM.stateId = this.childForm.value.state;
      this.childVM.countryId = this.childForm.value.country;
      this.childVM.postalCode = this.childForm.value.zipcode;
      this.childVM.dateOfBirth = this.childForm.value.birthdate;
      this.childVM.genderID = this.childForm.value.gender;
      this.childVM.PhysicianName = this.childForm.value.physicianname;
      this.childVM.ChildNotes = this.childForm.value.childnotes;
      this.childVM.PhysicianAddress = this.childForm.value.physicianaddress;
      this.childVM.childStartDate = this.childForm.value.childstartdate;
      this.childVM.PreferredHospital = this.childForm.value.preferredhospital;
      this.childVM.physicianContactNumber = this.childForm.value.physicianContactNumber;
      this.childVM.parentID = this.parentId;
      this.childVM.busID = this.childForm.value.bus;
      this.childVM.transportationID = 1; // change this static value
      this.childVM.feePaymentTypeID = 1; // change this static value
      this.childVM.studentId = (this.childVM.studentId !== undefined && this.childVM.studentId !== null) ? this.childVM.studentId : 0;
      this.childVM.imagePath = this.image === undefined ? this.childVM.imagePath : this.image;
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
      this.childVM.dateOfBirth = this.addChildForm.value.birthdate;
      this.childVM.genderID = this.addChildForm.value.gender;
      this.childVM.PhysicianName = this.addChildForm.value.physicianname;
      this.childVM.ChildNotes = this.childForm.value.childnotes;
      this.childVM.PhysicianAddress = this.childForm.value.physicianaddress;
      this.childVM.childStartDate = this.childForm.value.childstartdate;
      this.childVM.PreferredHospital = this.addChildForm.value.preferredhospital;
      this.childVM.physicianContactNumber = this.addChildForm.value.physicianContactNumber === '' ? 0 :
        this.addChildForm.value.physicianContactNumber;
      this.childVM.parentID = this.parentId;
      this.childVM.busID = this.childForm.value.bus;
      this.childVM.transportationID = 1; // change this static value
      this.childVM.feePaymentTypeID = 1; // change this static value
      this.childVM.studentId = 0;
      this.childVM.imagePath = this.addImagePreview;
      this.childVM.agencyID = this.agencyId;
      this.childVM.id = 0;
      this.addUpdateChildDateUsingAPI(this.childVM, type);
    } else {
      this.spinner.hide();
      this.commonService.validateAllFields(this.addChildForm);
    }
  }


  addUpdateChildDateUsingAPI(req, type) {
    this.apiService.postDataV2(ParentAPIURLs.SaveStudent, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        //  this.spinner.hide();
        this.flag = false;
        this.notification.success({
          message: type === 'add' ? 'Student added successfully' :
            'Student information updated successfully', title: ''
        });
        this.getStudentAllDetails();
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


  getAllCountriesAddMode() {
    this.countryListAddMode = [];
    const req = {
      'AgencyID': this.commonService.getAgencyId(),
    };
    this.apiService.postData(TeacherAPIURLs.GetAllCountry, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.countryListAddMode = res.body.data;
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
      reader.readAsDataURL(event.target.files[0]);
      setTimeout(() => {
        this.addImagePreview = reader.result;
      }, 100);

      this.flag = true;
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
          'lastName': value.lastName
        };
        this.apiService.postData(ParentAPIURLs.SaveStudentGaurdians, data, null).subscribe(res => {
          if (res.body.statusCode === 200) {
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
    this.apiService.uploadImage(TeacherAPIURLs.UploadImage, this.fileData, null).subscribe(res => {
      if (res.status === 200) {
        this.addImagePreview = res.body.data;
        this.saveStudentGaurdians();
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
        };
        this.apiService.postData(ParentAPIURLs.SaveStudentMedication, data, null).subscribe(res => {
          if (res.body.statusCode === 200) {
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
      }
    });
  }


  verifyImmunization() {
    this.spinner.show();
    if (this.immunizationForm.valid) {
      this.immunizationVM.agencyID = this.agencyId;
      this.immunizationVM.studentID = this.childVM.studentId;
      this.immunizationVM.dateReceived = this.immunizationForm.value.date;
      this.immunizationVM.immunizationID = this.immunizationForm.value.immunization;
      this.immunizationVM.otherImmunization = this.immunizationForm.value.other;
      this.immunizationVM.abbreviation = this.immunizationForm.value.abbrivation;
      this.immunizationVM.studentImmunizationID = this.immunizationVM.studentImmunizationID !== undefined ?
        this.immunizationVM.studentImmunizationID : 0;
      this.immunizationVM.id = this.immunizationVM.studentImmunizationID !== undefined ? this.immunizationVM.studentImmunizationID : 0;
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
          'DeletedBy': this.commonService.getReleventUserId('userdetails'),
          'studentID': this.childVM.studentId,
        };
        this.apiService.postData(ParentAPIURLs.SaveStudentImmunization, data, null).subscribe(res => {
          if (res.body.statusCode === 200) {
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
          'DeletedBy': this.commonService.getReleventUserId('userdetails'),
          'studentID': this.childVM.studentId,
          'description': value.description
        };
        this.apiService.postData(ParentAPIURLs.SaveStudentDisabilities, data, null).subscribe(res => {
          if (res.body.statusCode === 200) {
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


  // Method to delete Student files
  deleteStudentfiles(value) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this files?',
      accept: () => {
        this.spinner.show();
        const data = {
          'agencyID': this.commonService.getAgencyId(),
          'id': value.id,
          'DeletedBy': this.commonService.getReleventUserId('userdetails')
        };
        this.apiService.postData(AgencyAPIURLs.DeleteStudentFilesById, data, null).subscribe(res => {
          if (res.body.statusCode === 200) {
            this.spinner.show();
            this.notification.success({ message: 'This files has been deleted successfully', title: '' });
            this.getalluploadedByStudentId();
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
          msg = 'Allergy added successfully';
        } else {
          msg = 'Allergy details updated successfully';
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
          'AllergyComment': value.allergyComment
        };
        this.apiService.postData(ParentAPIURLs.SaveStudentAllergies, data, null).subscribe(res => {
          if (res.body.statusCode === 200) {
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
    this.medicationVM = {};
    this.createMedicationForm();
  }

  getAuthorizedPersonByStudentId() {
    this.loader = true;
    this.spinner.show();
    this.authorizedPersonList = [];
    const req = {
      'AgencyID': this.commonService.getAgencyId(),
      'studentID': this.id,
      'IsEmergencyContact': this.showEmergency
    };
    this.apiService.postData(AgencyAPIURLs.GetAuthorizedPersonByStudentId, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
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

  getRestrictedPersonByStudentId() {
    this.loader = true;
    this.spinner.show();
    this.restrictedPersonList = [];
    const req = {
      'AgencyID': this.commonService.getAgencyId(),
      'studentID': this.id
    };
    this.apiService.postData(AgencyAPIURLs.GetRestrictedPersonByStudentId, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
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

  getalluploadedByStudentId() {
    this.loader = true;
    this.spinner.show();
    this.studentfileList = [];
    const req = {
      'AgencyID': this.commonService.getAgencyId(),
      'studentID': this.id
    };
    this.apiService.postData(AgencyAPIURLs.GetUploadedFilesByStudentId, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.studentfileList = res.body.data;
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

  // Change emeregency label
  changelable() {
    if (this.emeregencyLable === 'All Contact') {
      this.emeregencyLable = 'Emergency Contact';
    } else {
      this.emeregencyLable = 'All Contact';
    }
  }



  getFeeType() {
    this.loader = true;
    this.spinner.show();
    this.feeTypeList = [];
    const req = {
      'AgencyID': this.commonService.getAgencyId()
    };
    this.apiService.postData(AgencyAPIURLs.GetFeeType, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.feeTypeList = res.body.data;
        console.log(this.feeTypeList, '     FFFFFFFFFFFFFF');
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


  // Recurring Billing Section......................

  getallclassesByStudentId() {
    this.loader = true;
    this.spinner.show();
    this.classListBilling = [];
    const req = {
      'AgencyID': this.commonService.getAgencyId(),
      'studentID': this.id
    };
    this.apiService.postData(AgencyAPIURLs.GetClassesByStudentID, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.classListBilling = res.body.data;
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

  getAllClassList() {
    this.classListBilling = [];
    const req = {
      'AgencyID': this.commonService.getAgencyId(),
      'limit': 0,
      'page': this.pageNo
    };
    this.apiService.postData(AgencyAPIURLs.GetAllClasses, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.totalRecord = res.body.totalRows;
        this.classListBilling = res.body.data;
        // this.spinner.hide();
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

  CreateRecurringBillingForm() {
    if (this.billingVM.Id === undefined || this.billingVM.Id === 0) {
      this.recurringBillingForm = this.fb.group({
        billingtype: ['Program Schedule Based', Validators.required],
        ledgertype: ['Sponsor', Validators.required],
        transactiontype: ['', Validators.required],
        description: ['', Validators.required],
        billing: ['', Validators.required],
        amount: ['', Validators.required],
        startdate: ['', Validators.required],
        enddate: ['', Validators.required],
        discount: ['']
      });
    } else {
      this.recurringBillingForm = this.fb.group({
        billingtype: ['Program Schedule Based', Validators.required],
        ledgertype: ['Sponsor', Validators.required],
        transactiontype: [this.billingVM.TransactionType, Validators.required],
        description: [this.billingVM.BillingDescription, Validators.required],
        billing: [this.billingVM.BillingCycle, Validators.required],
        amount: [this.billingVM.Amount, Validators.required],
        startdate: [this.billingVM.BillingFromDate, Validators.required],
        enddate: [this.billingVM.BillingToDate, Validators.required],
        discount: ['']
      });
    }
  }

  getPerticulerRecurringBilling(value) {
    this.billingVM.Id = value.id;
    this.billingVM.AgencyID = value.agencyID;
    this.billingVM.TransactionType = value.transactionType;
    // tslint:disable-next-line: triple-equals
    if (value.classesID != 0) {
      this.billingVM.BillingDescription = value.classesID;
    } else {
      this.billingVM.BillingDescription = value.billingDescription;
    }
    this.billingVM.BillingCycle = value.billingCycle;
    this.billingVM.Amount = value.amount;
    this.billingVM.BillingFromDate = new Date(value.billingFromDate);
    this.billingVM.BillingToDate = new Date(value.billingToDate);
    this.recurringId = value.id;
    this.getDescriptionList(value.transactionType);
    this.CreateRecurringBillingForm();
    this.addMode = false;
  }

  clearRecurringBilling() {
    this.billingVM = {};
    this.addMode = true;
    this.recurringId = 0;
    this.descriptionList = [];
    this.CreateRecurringBillingForm();
  }

  get c() { return this.recurringBillingForm.controls; }

  // Update Enroll class data
  verifyRecurringBillingForm() {
    this.spinner.show();
    if (this.recurringBillingForm.valid) {
      if (this.recurringBillingForm.value.enddate.setHours(0, 0, 0) < this.recurringBillingForm.value.startdate.setHours(0, 0, 0)) {
        this.spinner.hide();
        this.notification.warning({ message: 'End date should be greater than or equal to start date', title: '' });
      } else {
        this.billingVM.AgencyID = this.commonService.getAgencyId();
        this.billingVM.ParentID = this.reqParentId;
        this.billingVM.StudentID = this.id;
        this.billingVM.Id = this.recurringId;
        this.billingVM.Amount = this.recurringBillingForm.value.amount;
        this.billingVM.BillingFromDate = this.recurringBillingForm.value.startdate;
        this.billingVM.BillingToDate = this.recurringBillingForm.value.enddate;
        this.billingVM.BillingCycle = this.recurringBillingForm.value.billing;
        this.billingVM.BillingDescription = this.recurringBillingForm.value.description;
        this.billingVM.TransactionType = this.recurringBillingForm.value.transactiontype;
        this.addUpdateRecurringBillingUsingAPI(this.billingVM);
      }
    } else {
      this.spinner.hide();
      this.commonService.validateAllFields(this.recurringBillingForm);
    }
  }

  addUpdateRecurringBillingUsingAPI(req) {
    this.apiService.postData(AgencyAPIURLs.SaveRecurringBillingByStudentID, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.spinner.hide();
        this.flag = false;
        this.notification.success({
          // tslint:disable-next-line: triple-equals
          message: this.recurringId == 0 ? 'Recurring Billing added successfully' :
          'Recurring Billing updated successfully', title: ''
        });
        $('.recurringbilling').modal('hide');
        this.getRecurringBillingByStudentID();
        this.getallclassesByStudentId();
        this.spinner.hide();
      } else if (res.body.statusCode === 204) {
        this.spinner.hide();
        this.notification.warning({ message: 'Please First Enroll for this class', title: '' });
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

  getDescriptionList(type) {
    this.descriptionList = [];
    this.recurringBillingForm.controls['amount'].setValue('0');
    this.recurringBillingForm.controls['description'].setValue('');
    // tslint:disable-next-line: triple-equals
    if (type == 1) {
      this.getTuitionChargesList();
      // tslint:disable-next-line: triple-equals
    } else if (type == 2) {
      this.getOtherChargesList();
      // tslint:disable-next-line: triple-equals
    } else if (type == 3) {
      this.getCreditList();
      // tslint:disable-next-line: triple-equals
    } else {
      this.recurringBillingForm.controls['description'].setValue('');
    }
  }

  getTuitionChargesList() {
    this.classListBilling.map(ele => {
      this.descriptionList.push({ value: ele.classesID, name: ele.className, classEndDate: ele.classEndDate });
    });
  }

  getOtherChargesList() {
    this.descriptionList =
      [
        { value: 'Deposit Charge', name: 'Deposit Charge' },
        { value: 'Parent Refund', name: 'Parent Refund' },
        { value: 'Return Check', name: 'Return Check' },
        { value: 'Tuition Late Fee', name: 'Tuition Late Fee' }
      ];
  }
  getCreditList() {
    this.descriptionList =
      [
        { value: 'Deposit Refund', name: 'Deposit Refund' },
        { value: 'Sibling Discount', name: 'Sibling Discount' },
        { value: 'Subsidy', name: 'Subsidy' },
        { value: 'State Program', name: 'State Program' }
      ];
  }

  getAmount(type) {
    // tslint:disable-next-line: triple-equals
    if (type == 'Deposit Charge') {
      this.recurringBillingForm.controls['amount'].setValue('50');
      // tslint:disable-next-line: triple-equals
    } else if (type == 'Parent Refund') {
      this.recurringBillingForm.controls['amount'].setValue('0');
      // tslint:disable-next-line: triple-equals
    } else if (type == 'Return Check') {
      this.recurringBillingForm.controls['amount'].setValue('35');
      // tslint:disable-next-line: triple-equals
    } else if (type == 'Tuition Late Fee') {
      this.recurringBillingForm.controls['amount'].setValue('25');
      // tslint:disable-next-line: triple-equals
    } else if (type == 'Deposit Refund') {
      this.recurringBillingForm.controls['amount'].setValue('0');
      // tslint:disable-next-line: triple-equals
    } else if (type == 'Sibling Discount') {
      this.recurringBillingForm.controls['amount'].setValue('5');
    } else if (type == 'Subsidy') {
      this.recurringBillingForm.controls['amount'].setValue('0');
    } else if (type == 'State Program') {
      this.recurringBillingForm.controls['amount'].setValue('0');
    } else {
      for (let i = 0; i < this.classListBilling.length; i++) {
        // tslint:disable-next-line: triple-equals
        if (this.classListBilling[i].classesID == type) {
          this.recurringBillingForm.controls['amount'].setValue(this.classListBilling[i].fees);
          this.EnrolEndtDate = new Date(this.classListBilling[i].classEndDate);
          break;
        } else {
          this.recurringBillingForm.controls['amount'].setValue('');
          this.EnrolEndtDate = 0;
        }
      }
    }
  }

  getRecurringBillingByStudentID() {
    this.recurringBillingList = [];
    const req = {
      'AgencyID': this.commonService.getAgencyId(),
      'ParentID': this.reqParentId,
      'StudentID': this.id
    };
    this.apiService.postData(AgencyAPIURLs.GetRecurringBillingByStudentID, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.recurringBillingList = res.body.data;
        console.log('Recurring Billing ...........', this.recurringBillingList);
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

  deleteRecurringBilling(value) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this Recurring Billing?',
      accept: () => {
        this.spinner.show();
        value.IsDeleted = true;
        value.DeletedDate = new Date();
        value.DeletedBy = this.commonService.getAgencyId();
        this.apiService.postData(AgencyAPIURLs.SaveRecurringBillingByStudentID, value, null).subscribe(res => {
          if (res.body.statusCode === 200) {
            this.getRecurringBillingByStudentID();
          } else if (res.body.statusCode === 988) {
            this.spinner.hide();
            this.notification.warning({ message: res.body.message, title: '' });
          } else if (res.body.statusCode === 903) {
            this.spinner.hide();
            this.notification.warning({ message: res.body.message, title: '' });
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

}
