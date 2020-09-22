import { Component, OnInit, ViewChild } from '@angular/core';
import { ErrorHandlerService } from '../../../../shared/services/error-handler/error-handler.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from '../../../../shared/services/notification-service/notification.service';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { AgencyApiService } from '../shared/services/agency-api-service/agency-api.service';
import { TeacherAPIURLs } from '../../../teacher/shared/constant';
import { ConfirmationService } from 'primeng/api';
import { ParentAPIURLs } from '../../../parent/shared/constant';
import { AgencyAPIURLs } from '../shared/constatant';
import { UnaaprovedStudentVM } from '../shared/view-model/unapproved-studentVM';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TeacherStudentDetailsVM } from '../../../teacher/shared/view-model/teacher-students-detailsVM';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { Paginator } from 'primeng/paginator';
declare var $: any;
@Component({
  selector: 'app-agency-admin-student-list',
  templateUrl: './agency-admin-student-list.component.html',
  styleUrls: ['./agency-admin-student-list.component.css']
})
export class AgencyAdminStudentListComponent implements OnInit {
  deactivateReasonForm: FormGroup;
  toiletingTimeIntervalId: any;
  toiletingActiviId = 0;
  studentList: any[] = [];
  searchByClass: string;
  classList: any[] = [];
  searchByStudentName: string;
  nameSearch: string;
  addChildForm: FormGroup;
  activeAndDeactiveStudentList: any[] = [];
  parentList: any[] = [];
  image: any;
  flag = false;
  fileData: FormData;
  formData: FormData;
  childVM: TeacherStudentDetailsVM = {};
  unApprovedStudentList: UnaaprovedStudentVM[] = [];
  cityList: any[] = [];
  stateList: any[] = [];
  agencyStateID: any;
  agencyCountryID: any;
  countryList: any[] = [];
  rejectedUserList: any[] = [];
  agencyId = 0;
  studentID = 0;
  parentAddress: any;
  today = new Date();
  activationType = 'Activated';
  pageNo = 0;
  limit = 10;
  totalRecord = 0;
  loader = true;
  isSubscriptionActive: boolean;
  mealIntervalId: any;
  mealActiviId = 0;
  NapIntervalId: any;
  NapminIntervalId: any;
  napActiviId = 0;
  videoPath = '';
  deactivateReasonList: any[];
  studentValue: any;
  busList: any[] = [];
  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  @ViewChild('allstudent') allStudPaginator: Paginator;
  @ViewChild('enrollstd') enrollstdPaginator: Paginator;
  @ViewChild('unenrolstd') unenrolstdPaginator: Paginator;
  constructor(private apiService: AgencyApiService, private error: ErrorHandlerService,
    private spinner: NgxSpinnerService, private notification: NotificationService,
    public commonService: CommonService, private confirmationService: ConfirmationService, private fb: FormBuilder) {
    this.isSubscriptionActive = this.commonService.getSubscriptionStatus();
  }

  ngOnInit() {
    this.dpConfig = Object.assign({}, { containerClass: 'theme-dark-blue' },
      { showWeekNumbers: false });
    this.agencyId = this.commonService.getAgencyId();
    this.searchByClass = '';
    this.nameSearch = '';
    this.searchByStudentName = '';
    this.getAllClassess();
    this.childAddForm();
    this.getActivatedAndDeactivatedStudents();
    this.getAllParentList();
    this.getAllCountries();
    this.GetAgencyCountryStateID();
    this.getDeactivateReason();
    this.getSectionVideo();
    this.createReasonForm();
    this.getAllBusList();
  }

  OpenInfoVideo(data) {
    $('#infovideo').modal('show');
  }

  getSectionVideo() {
    const req = {
      'SectionID': 2
    };
    this.apiService.postData(TeacherAPIURLs.GetVideoForSection, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.videoPath = res.body.filePath;
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

  // Get All Deactivated Reasons
  getDeactivateReason() {
    const req = {
      'isDeleted': false,
      'RoleID': 5 // For Student
    };
    this.apiService.postData(ParentAPIURLs.GetDeactivateReason, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.deactivateReasonList = res.body.data;
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


  childAddForm() {
    this.addChildForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      mobile: ['', Validators.required],
      address: [''],
      country: [this.agencyCountryID, Validators.required],
      city: [''],
      state: [this.agencyStateID, Validators.required],
      childstartdate: ['', Validators.required],
      zipcode: [''],
      birthdate: ['', Validators.required],
      parentid: ['', Validators.required],
      photo: [''],
      gender: ['', Validators.required],
      physicianname: [''],
      physicianaddress: [''],
      preferredhospital: [''],
      physicianContactNumber: [''],
      childnotes: [''],
      addressasparent: [false],
      bus: [0],
    });
    this.getStatesList();
    this.getCitiesList();
  }


  get a() { return this.addChildForm.controls; }

  getSerchClass(event) { }

  getStudentsList() {
    this.loader = true;
    this.studentList = [];
    if (this.searchByClass === '') {
      this.spinner.show();
      const data = {
        'agencyID': this.agencyId,
        'classID': this.searchByClass,
        'studentID': 0,
        'studentName': this.searchByStudentName,
        'page': this.pageNo,
        'limit': this.limit,
      };

      this.apiService.postData(TeacherAPIURLs.GetAllStudents, data, null).subscribe(res => {
        if (res.body.statusCode === 200) {
          this.totalRecord = res.body.totalRows;
          this.spinner.hide();
          this.studentList = res.body.data;
          this.loader = false;
        } else {
          this.spinner.hide();
          this.error.unknownError();
        }
      }, err => {
        this.spinner.hide();
        this.error.commonError(err);
      });
    } else {
      this.getAllStudentsListByClass();
    }
  }


  getAllStudentsListByClass() {
    this.studentList = [];
    this.spinner.show();
    const data = {
      'agencyID': this.agencyId,
      'classID': this.searchByClass,
      'studentID': 0,
      'studentName': this.searchByStudentName,
      'page': this.pageNo,
      'limit': this.limit,
    };

    this.apiService.postData(TeacherAPIURLs.GetAllStudentsByClass, data, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.totalRecord = res.body.totalRows;
        this.spinner.hide();
        this.studentList = res.body.data;
      } else {
        this.spinner.hide();
        this.error.unknownError();
      }
    }, err => {
      this.spinner.hide();
      this.error.commonError(err);
    });
  }

  getAllClassess() {
    this.classList = [];
    this.spinner.show();
    const data = {
      'agencyID': this.agencyId
    };
    this.apiService.postData(TeacherAPIURLs.GetAllClasses, data, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.spinner.hide();
        this.classList = res.body.data;
      } else {
        this.spinner.hide();
        this.error.unknownError();
      }
    }, err => {
      this.spinner.hide();
      this.error.commonError(err);
    });
  }

  addAddress() {
    if (this.addChildForm.value.addressasparent === true) {
      this.addChildForm.get('address').setValue(this.parentAddress);
      this.addChildForm.controls['address'].disable();
    } else {
      this.addChildForm.get('address').setValue('');
      this.addChildForm.controls['address'].enable();
    }
  }

  // Method to delete/deactivate student

  createReasonForm() {
    this.deactivateReasonForm = this.fb.group({
      reason: ['', Validators.required],
      deletedate: ['', Validators.required]
    });
  }

  get d() { return this.deactivateReasonForm.controls; }
  deleteStudentReason(value) {
    this.studentValue = value;
    this.createReasonForm();
  }

  deleteStudent() {
    this.confirmationService.confirm({
      message: 'Do you want to deactivate this student?',
      accept: () => {
        this.spinner.show();
        this.studentValue.DeletedReason = this.deactivateReasonForm.value.reason;
        this.studentValue.IsDeleted = true;
        this.studentValue.DeletedDate = new Date();
        this.studentValue.DeletedBy = this.commonService.getReleventUserId('userdetails');
        this.apiService.postDataV2(ParentAPIURLs.SaveStudent, this.studentValue, null).subscribe(res => {
          if (res.body.statusCode === 200) {
            $('.addreason').modal('hide');
            this.deleteStudentSuccess(this.studentValue);
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

  deleteStudentSuccess(data) {
    this.getActivatedAndDeactivatedStudents();
    this.spinner.hide();
    this.notification.success({ message: 'This Student has been deactivated', title: '' });
  }


  activateStudent(value) {
    this.confirmationService.confirm({
      message: 'Do you want to Activate this student?',
      accept: () => {
        this.spinner.show();
        value.IsDeleted = false;
        value.updatedBy = this.commonService.getReleventUserId('userdetails');
        this.apiService.postData(ParentAPIURLs.ActivateStudent, value, null).subscribe(res => {
          if (res.body.statusCode === 200) {
            this.notification.success({ message: 'This Student has been activated', title: '' });
            this.getActivatedAndDeactivatedStudents();
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


  getAllUnApprovedStudent() {
    this.loader = true;
    this.unApprovedStudentList = [];
    this.spinner.show();
    const data = {
      'agencyID': this.commonService.getAgencyId(),
      'page': this.pageNo,
      'limit': this.limit,
    };
    this.apiService.postData(AgencyAPIURLs.GetAllUnaaprovedStudents, data, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.totalRecord = res.body.totalRows;
        this.spinner.hide();
        if (res.body.data) {
          this.loader = false;
          this.unApprovedStudentList = res.body.data;
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

  getActivatedAndDeactivatedStudents() {
    this.loader = true;
    this.activeAndDeactiveStudentList = [];
    this.spinner.show();
    const data = {
      'studentName': this.nameSearch,
      'agencyID': this.agencyId,
      'ActivationType': this.activationType,
      'limit': this.limit,
      'page': this.pageNo
    };
    this.apiService.postData(AgencyAPIURLs.GetActivatedAndDeactivatedStudents, data, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.totalRecord = res.body.totalRows;
        this.spinner.hide();
        if (res.body.data) {
          this.activeAndDeactiveStudentList = res.body.data;
        }
        this.loader = false;
      } else {
        this.spinner.hide();
        this.error.unknownError();
      }
    }, err => {
      this.spinner.hide();
      this.error.commonError(err);
    });
  }


  approvedDenyRequest(event, student) {
    if (event.target.value === '2') {
      this.confirmationService.confirm({
        message: 'Do you want to enroll this child ?',
        accept: () => {
          this.spinner.show();
          const req = {
            'id': student.enrollmentID,
            'agencyID': student.agencyID,
            'classesID': student.classID,
            'studentID': student.studentID,
            'classEnrollStartDate': student.classEnrollStartDate,
            'classEnrollEndDate': student.classEnrollEndDate,
            'enrollmentStatus': 2,     //  status 3 for Canceling the enrollmanet request before accept by the agency
            'feeTypeId': student.feeTypeId,
            'fees': student.fees
          };
          const msg = 'This student has been enrroled successfully!';
          this.saveEnrollment(req, msg, 1);
        }
      });

    } else if (event.target.value === '4') {
      this.confirmationService.confirm({
        message: 'Do you want to deny this request?',
        accept: () => {
          this.spinner.show();
          const req = {
            'id': student.enrollmentID,
            'agencyID': student.agencyID,
            'classesID': student.classID,
            'studentID': student.studentID,
            'classEnrollStartDate': student.classEnrollStartDate,
            'classEnrollEndDate': student.classEnrollEndDate,
            'enrollmentStatus': 4,     //  status 3 for Canceling the enrollmanet request before accept by the agency
          };
          const msg = 'This request has been denied!';
          this.saveEnrollment(req, msg, 1);
        }
      });
    }

  }


  saveEnrollment(req, msg, type) {
    this.apiService.postData(ParentAPIURLs.SaveStudentEnrollment, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        if (type === 2) {
          if (this.searchByClass === '') {
            this.getStudentsList();
          } else {
            this.getAllStudentsListByClass();
          }
        } else {
          this.getAllUnApprovedStudent();
        }
        this.notification.success({ message: msg, title: '' });
      } else if (res.body.statusCode === 205) {
        this.spinner.hide();
        this.notification.warning({ message: 'Already enrolled for this class', title: '' });
      } else if (res.body.statusCode === 206) { // Enroll capacity full
        this.spinner.hide();
        this.notification.warning({ message: res.body.message, title: '' });
      } else if (res.body.statusCode === 207) {
        this.spinner.hide();
        this.notification.warning({ message: 'This student is part of regular class , you cant enroll for drop in class', title: '' });
      } else if (res.body.statusCode === 208) {
        this.spinner.hide();
        this.notification.warning({ message: 'This student is part of drop in class , you cant enroll for regular class', title: '' });
      } else {
        this.spinner.hide();
        this.error.unknownError();
      }
    }, err => {
      this.spinner.hide();
      this.error.commonError(err);
    });
  }


  completeStatus(event, student) {
    this.confirmationService.confirm({
      message: 'Do you want to complete this class enrollment for the student ?',
      accept: () => {
        this.spinner.show();
        const req = {
          'id': student.classEnnrollmentID,
          'agencyID': student.agencyID,
          'classesID': student.classId,
          'studentID': student.studentId,
          'classEnrollStartDate': student.classEnrollStartDate,
          'classEnrollEndDate': student.classEnrollEndDate,
          'enrollmentStatus': 5,     //  status 3 for Canceling the enrollmanet request before accept by the agency
        };
        const msg = 'Change status successfully!';
        this.saveEnrollment(req, msg, 2);
      }
    });
  }

  getAllParentList() {
    this.parentList = [];
    const req = {
      'AgencyID': this.agencyId,
    };
    this.apiService.postData(AgencyAPIURLs.GetMasterParentForDropdown, req, null).subscribe(res => {
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

  clearForm() {
    this.image = '';
    this.childAddForm();
  }

  saveChildDetails() {
    if (this.flag === true) {
      this.UploadImage();
      this.flag = false;
    } else {
      this.verifyChildAddForm();
    }
  }

  UploadImage() {
    this.apiService.uploadImage(TeacherAPIURLs.UploadImage, this.fileData, null).subscribe(res => {
      if (res.status === 200) {
        this.image = res.body.data;
        this.verifyChildAddForm();
      }
    }, err => {
      this.error.commonError(err);
    });
  }


  verifyChildAddForm() {
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
      this.childVM.PhysicianAddress = this.addChildForm.value.physicianaddress;
      this.childVM.childStartDate = this.addChildForm.value.childstartdate;
      this.childVM.ChildNotes = this.addChildForm.value.childnotes;
      this.childVM.PreferredHospital = this.addChildForm.value.preferredhospital;
      this.childVM.parentID = this.addChildForm.value.parentid;
      this.childVM.transportationID = 1; // change this static value
      this.childVM.feePaymentTypeID = 1; // change this static value
      this.childVM.studentId = 0;
      this.childVM.imagePath = this.image;
      this.childVM.physicianContactNumber = this.addChildForm.value.physicianContactNumber === '' ? 0 :
      this.addChildForm.value.physicianContactNumber;
      this.childVM.agencyID = this.agencyId;
      this.childVM.id = 0;
      this.childVM.addressasparent = this.addChildForm.value.addressasparent;
      this.childVM.busID = this.addChildForm.value.bus;
      this.addUpdateChildDateUsingAPI(this.childVM);
    } else {
      this.spinner.hide();
      this.commonService.validateAllFields(this.addChildForm);
    }
  }

  addUpdateChildDateUsingAPI(req) {
    this.apiService.postDataV2(ParentAPIURLs.SaveStudent, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.flag = false;
        this.notification.success({ message: 'Student added successfully', title: '' });
        $('#pills-allstudent').tab('show');
        $('.addchild').modal('hide');
        this.getActivatedAndDeactivatedStudents();
      } else if (res.body.statusCode === 205) {
        this.spinner.hide();
        this.notification.warning({ message: 'Please enter valid name', title: '' });
      } else if (res.body.statusCode === 206) {
        this.spinner.hide();
        this.notification.warning({ message: 'Student already exists with same name', title: '' });
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
        this.notification.warning({ message: 'File not format not supported', title: '' });
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
    }
  }

  getParentAddress(value) {
    this.spinner.show();
    const req = {
      'AgencyID': this.commonService.getAgencyId(),
      'ParentId': value
    };
    this.apiService.postData(ParentAPIURLs.GetParentAddress, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
         this.parentAddress = res.body.data.address;
         console.log(this.parentAddress);
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
    this.spinner.show();
    this.countryList = [];
    const req = {
      'AgencyID': this.commonService.getAgencyId(),
    };
    this.apiService.postData(TeacherAPIURLs.GetAllCountry, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.countryList = res.body.data;
        this.addChildForm.controls['state'].setValue('');
        this.addChildForm.controls['state'].updateValueAndValidity();
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

  /**Method to get state list */
  getStatesList() {
    this.spinner.show();
    this.stateList = [];
    this.cityList = [];
    const req = {
      'AgencyID': this.commonService.getAgencyId(),
      'CountryId': this.addChildForm.value.country
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
    this.addChildForm.controls['city'].setValue('');
    this.cityList = [];
    const req = {
      'AgencyID': this.commonService.getAgencyId(),
      'StateId': this.addChildForm.value.state
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
        console.log(this.agencyCountryID, this.agencyStateID, 'AAAAAAAAAA');
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

  clearOnTabChange(event) {
    this.allStudPaginator.changePageToFirst(event);
    this.enrollstdPaginator.changePageToFirst(event);
    this.unenrolstdPaginator.changePageToFirst(event);
    this.searchByClass = '';
    this.activationType = '';
    this.searchByStudentName = '';
    this.nameSearch = '';
    this.pageNo = 0;
    this.limit = 10;
    this.totalRecord = 0;
  }


  paginate(event, tab) {
    this.pageNo = event.page;
    if (tab === 1) {
      this.getActivatedAndDeactivatedStudents();
    } else if (tab === 2) {
      this.getStudentsList();
    } else {
      this.getAllUnApprovedStudent();
    }
  }

  processCSVFile(event) {
    this.spinner.show();
    this.formData = new FormData();
    this.agencyId = this.commonService.getAgencyId();
    if (event.target.files && event.target.files[0] && event.target.files[0].name.includes('.csv')) {
      this.formData.append('FileName', event.target.files[0], event.target.files[0].name);
      this.formData.append('AgencyId', this.commonService.getAgencyId().toString());
      this.formData.append('CreatedBy', this.commonService.getLoggedInUserId().toString());
      this.apiService.uploadImage(AgencyAPIURLs.UploadStudentUserWithFile, this.formData, null).subscribe(res => {
        if (res.body.statusCode === 200) {
          this.spinner.hide();
          event.target.value = '';
          this.getActivatedAndDeactivatedStudents();
          this.notification.success({ message: 'File uploaded successfully', title: 'Success' });
        } else if (res.body.statusCode === 987) {
          this.spinner.hide();
          this.getActivatedAndDeactivatedStudents();
          this.rejectedUserList = res.body.data;
          $('.rejectedUsr').modal('show');
        } else {
          this.spinner.hide();
          this.error.unknownError();
        }
      }, err => {
        this.spinner.hide();
        this.error.commonError(err);
        this.notification.error({ message: 'Something went wrong', title: 'Error' });
      });
    } else {
      this.spinner.hide();
      this.notification.warning({ message: 'Unsupported file type', title: 'Warning' });
    }
  }


  keyDownFunction(event, no) {
    if (event.keyCode === 13) {
      if (no === 2) {
        this.getStudentsList();
      } else {
        this.getActivatedAndDeactivatedStudents();
      }
    }
  }

  saveToiletNotyInterval() {
    this.spinner.show();
    if (this.toiletingTimeIntervalId) {
      const req = {
        'agencyID': this.agencyId,
        'ActivityTypeID': 7,
        'hrsinterval': this.toiletingTimeIntervalId,
        'id': this.toiletingActiviId,
        'studentID': this.studentID
      };
      this.apiService.postData(AgencyAPIURLs.SaveDDMasterInformationIndStudent, req, null).subscribe(res => {
        if (res.body.statusCode === 200) {
          this.spinner.hide();
          this.notification.success({ message: 'Time interval updated', title: '' });
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
      this.notification.warning({ message: 'Please select time interval', title: '' });
    }
  }

  saveNapNotyInterval() {
    this.spinner.show();
    if (this.NapIntervalId || this.NapminIntervalId) {
      if (this.NapIntervalId === '') {
        this.NapIntervalId = 0;
      }
      if (this.NapminIntervalId === '') {
        this.NapminIntervalId = 0;
      }
      const req = {
        'agencyID': this.agencyId,
        'ActivityTypeID': 6,
        'hrsinterval': this.NapIntervalId,
        'minInterval': this.NapminIntervalId,
        'id': this.napActiviId,
        'studentID': this.studentID
      };
      this.apiService.postData(AgencyAPIURLs.SaveDDMasterInformationIndStudent, req, null).subscribe(res => {
        if (res.body.statusCode === 200) {
          this.spinner.hide();
          this.notification.success({ message: 'Time interval updated', title: '' });
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
      this.notification.warning({ message: 'Please select time interval', title: '' });
    }
  }

  saveMealNotyInterval() {
    this.spinner.show();
    if (this.mealIntervalId) {
      const req = {
        'agencyID': this.agencyId,
        'ActivityTypeID': 3,
        'hrsinterval': this.mealIntervalId,
        'studentID': this.studentID,
        'id': this.mealActiviId
      };
      this.apiService.postData(AgencyAPIURLs.SaveDDMasterInformationIndStudent, req, null).subscribe(res => {
        if (res.body.statusCode === 200) {        
          this.spinner.hide();
          this.notification.success({ message: 'Time interval updated', title: '' });
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
      this.notification.warning({ message: 'Please select time interval', title: '' });
    }
  }



// get perticuler student details
getDetails(data) {
  this.toiletingTimeIntervalId = 0;
  this.toiletingActiviId = 0;

  this.NapIntervalId = 0;
  this.NapminIntervalId = 0;
  this.napActiviId = 0;

  this.mealIntervalId = 0;
  this.mealActiviId = 0;

  this.spinner.show();
  this.studentID = data;
  if (this.studentID) {
    const req = {
      'agencyID': this.agencyId,     
      'studentID': this.studentID
    };
    this.apiService.postData(AgencyAPIURLs.GetDDMasterInformationIndStudent, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {     
        if (res.body.data.length > 0) {
          res.body.data.forEach(element => {
            if (element.activityTypeID === 7) {
              this.toiletingTimeIntervalId = element.hrsInterval;
              this.toiletingActiviId = element.id;
            }
            if (element.activityTypeID === 6) {
              this.NapIntervalId = element.hrsInterval;
              this.NapminIntervalId = element.minInterval
              this.napActiviId = element.id;
            }
            if (element.activityTypeID === 3) {
              this.mealIntervalId = element.hrsInterval;
              this.mealActiviId = element.id;
            }
          });
        }
        $('#authpermodal').modal('show');  
       this.spinner.hide();      
      } else {
           this.toiletingTimeIntervalId = 0;
           this.toiletingActiviId = 0;

           this.NapIntervalId = 0;
           this.NapminIntervalId = 0;
           this.napActiviId = 0;

           this.mealIntervalId = 0;
           this.mealActiviId = 0;
        $('#authpermodal').modal('show');
        this.spinner.hide();       
      }
    }, err => {
      this.spinner.hide();
      this.error.commonError(err);
    });
  } else {
    this.spinner.hide();
    this.notification.warning({ message: 'Please select time interval', title: '' });
  }
}


}
