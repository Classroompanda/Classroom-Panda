import { Component, OnInit } from '@angular/core';
import { AddClassesVM } from '../shared/view-model/AddClassesVM';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler/error-handler.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from 'src/app/shared/services/notification-service/notification.service';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { ActivatedRoute } from '@angular/router';
import { AgencyApiService } from '../shared/services/agency-api-service/agency-api.service';
import { AgencyAPIURLs } from '../shared/constatant';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { ConfirmationService } from 'primeng/api';
import { ParentAPIURLs } from '../../../parent/shared/constant';
import { TeacherAPIURLs } from 'src/app/layout/teacher/shared/constant';
declare var $: any;

@Component({
  selector: 'app-agency-admin-classes',
  templateUrl: './agency-admin-classes.component.html',
  styleUrls: ['./agency-admin-classes.component.css']
})
export class AgencyAdminClassesComponent implements OnInit {
  childList: any[] = [];
  classVM: AddClassesVM = {};
  classForm: FormGroup;
  enrolForm: FormGroup;
  id: number;
  status: number;
  today = new Date();
  classList: any[];
  classcategoryList: any[];
  markAllCheckBox = false;
  minAge: number;
  maxAge: number;
  cateId: number;
  classId: number;
  parentList: any[] = [];
  maxEnrolEtartDate: any;
  maxEnrolEndtDate: any;
  paymentTypeList: any[] = [];
  addMode = true;
  pageNo = 0;
  limit = 10;
  totalRecord = 0;
  classDetails: any;
  isSubscriptionActive: boolean;
  isDriopInSelected: boolean;
  isDriopInSelectedandOngoing: boolean;
  isOngoing: boolean;
  emptyDate: any;
  formData: FormData;
  agencyId = 0;
  rejectedUserList: any[] = [];
  videoPath = '';
  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  constructor(private apiService: AgencyApiService, private error: ErrorHandlerService,
    private spinner: NgxSpinnerService, private notification: NotificationService,
    public commonService: CommonService, private fb: FormBuilder, private route: ActivatedRoute,
    private confirmationService: ConfirmationService) {
    this.agencyId = this.commonService.getAgencyId();
    this.isSubscriptionActive = this.commonService.getSubscriptionStatus();
  }

  ngOnInit() {
    this.spinner.show();
    this.createClassForm();
    this.getAllClassList();
    this.getAllClassCategoryList();
    //this.getAllParentList();
    this.createEnrolForm();
    this.getFessPaymentType();
    this.getAllChildrenList();
    this.getSectionVideo();
    this.dpConfig = Object.assign({}, { containerClass: 'theme-dark-blue' }, { showWeekNumbers: false }
    );
  }

  OpenInfoVideo(data) {
    $('#infovideo').modal('show');
  }

  getSectionVideo() {
    const req = {
      'SectionID': 7
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




  processCSVFile(event) {
    this.spinner.show();
    this.formData = new FormData();
    this.agencyId = this.agencyId;
    if (event.target.files && event.target.files[0] && event.target.files[0].name.includes('.csv')) {
      this.formData.append('FileName', event.target.files[0], event.target.files[0].name);
      this.formData.append('AgencyId', this.agencyId.toString());
      this.formData.append('CreatedBy', this.commonService.getLoggedInUserId().toString());
      this.apiService.uploadImage(AgencyAPIURLs.UploadClassesWithFile, this.formData, null).subscribe(res => {
        if (res.body.statusCode === 200) {
          this.spinner.hide();
          event.target.value = '';
          this.getAllClassList();
          this.notification.success({ message: 'File uploaded successfully', title: 'Success' });
        } else if (res.body.statusCode === 987) {
          this.spinner.hide();
          this.getAllClassList();
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



  createClassForm() {
    this.classForm = this.fb.group({
      className: ['', Validators.required],
      id: [''],
      loactionId: [''],
      categoryId: ['', Validators.required],
      classCategory: [''],
      roomId: [''],
      sessionFrom: ['', Validators.required],
      sessionTo: ['', Validators.required],
      enrollementCapacity: ['', Validators.required],
      description: [''],
      days: [''],
      minAgeFrom: [''],
      minAgeTo: [''],
      starttime: [null, Validators.required],
      endtime: [null, Validators.required],
      paymenttype: ['2', Validators.required],
      fees: [null, Validators.required],
      sun: [false],
      mon: [false],
      tue: [false],
      wed: [false],
      thu: [false],
      fri: [false],
      sat: [false],
      ongoing: [false]
    });

  }


  onGoing() {
    if (this.classForm.value.ongoing === true) {
      this.isDriopInSelectedandOngoing = true;
      const d = new Date('Jan 1, 2080 12:00:00');
      this.classForm.controls.sessionTo.setValue(d);
      this.classForm.controls.sessionTo.updateValueAndValidity();
    } else {
      if (this.classVM.classStartDate !== undefined) {
        this.classForm.controls.sessionTo.setValue(this.classVM.classStartDate);
        this.classForm.controls.sessionTo.updateValueAndValidity();
        this.isDriopInSelectedandOngoing = false;
      } else {
      this.classForm.controls.sessionTo.setValue(this.emptyDate);
      this.classForm.controls.sessionTo.updateValueAndValidity();
      this.isDriopInSelectedandOngoing = false;
      }
    }
  }

  editClassForm() {
    this.classForm = this.fb.group({
      className: [this.classVM.className, Validators.required],
      loactionId: [this.classVM.loactionId],
      classCategory: [this.classVM.categoryName],
      roomId: [this.classVM.roomId],
      categoryId: [this.classVM.categoryId, Validators.required],
      sessionFrom: [this.classVM.classStartDate, Validators.required],
      sessionTo: [this.classVM.classEndDate, Validators.required],
      enrollementCapacity: [this.classVM.enrollCapacity, Validators.required],
      description: [this.classVM.description],
      starttime: [this.classVM.startTime, Validators.required],
      endtime: [this.classVM.endTime, Validators.required],
      paymenttype: [this.classVM.feeTypeId, Validators.required],
      fees: [this.classVM.fees, Validators.required],
      days: [this.classVM.days],
      sun: [this.classVM.sun],
      mon: [this.classVM.mon],
      tue: [this.classVM.tue],
      wed: [this.classVM.wed],
      thu: [this.classVM.thu],
      fri: [this.classVM.fri],
      sat: [this.classVM.sat],
      ongoing: [this.classVM.onGoing]
    });
  }

  createEnrolForm() {
    this.enrolForm = this.fb.group({
      childname: ['', Validators.required],
      //parentname: ['', Validators.required],
      classname: [{ value: '', disabled: true }],
      startdate: [new Date(), Validators.required],
      enddate: [null]

    });
  }

  get i() { return this.enrolForm.controls; }


  get f() { return this.classForm.controls; }


  isAnswerProvided(event: any, check: any) {

  }


  getAllParentList() {
    this.parentList = [];
    const req = {
      'AgencyID': this.agencyId,
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


  markAllDays(e) {
    if (e.target.checked === true || e.target.checked === undefined) {
      this.markAllCheckBox = true;
      this.classForm.controls['sun'].setValue(true);
      this.classForm.controls['mon'].setValue(true);
      this.classForm.controls['tue'].setValue(true);
      this.classForm.controls['wed'].setValue(true);
      this.classForm.controls['thu'].setValue(true);
      this.classForm.controls['fri'].setValue(true);
      this.classForm.controls['sat'].setValue(true);
    } else {
      this.markAllCheckBox = false;
      this.classForm.controls['sun'].setValue(false);
      this.classForm.controls['mon'].setValue(false);
      this.classForm.controls['tue'].setValue(false);
      this.classForm.controls['wed'].setValue(false);
      this.classForm.controls['thu'].setValue(false);
      this.classForm.controls['fri'].setValue(false);
      this.classForm.controls['sat'].setValue(false);
    }

  }



  selectedDay(event) {
    this.markAllCheckBox = false;
  }

  saveClassInfo() {
    const startdate = this.commonService.getOnlyDate(this.classForm.value.sessionFrom);
    const enddate = this.commonService.getOnlyDate(this.classForm.value.sessionTo);
    if (startdate >= enddate) {
      this.notification.warning({ message: 'end date must be greater than or equal to start date ', title: '' });
    } else if (this.classForm.value.starttime >= this.classForm.value.endtime) {
      this.notification.warning({ message: 'start time must be less than end time ', title: '' });
    } else if (enddate <= this.commonService.getOnlyDate(this.today)) {
      this.notification.warning({ message: 'End date must be greater than today`s date ', title: '' });
    } else if (this.classForm.valid) {
      this.spinner.show();
      this.classVM.className = this.classForm.value.className.trim();
      this.classVM.loactionId = 1;
      this.classVM.categoryName = this.classForm.value.classCategory;
      this.classVM.categoryId = this.classForm.value.categoryId;
      this.classVM.roomId = 0;
      this.classVM.classStartDate = this.classForm.value.sessionFrom;
      this.classVM.classEndDate = this.classForm.value.sessionTo;
      this.classVM.minAgeFrom = this.minAge;
      this.classVM.minAgeTo = this.maxAge;
      this.classVM.enrollCapacity = this.classForm.value.enrollementCapacity;
      this.classVM.description = this.classForm.value.description,
        this.classVM.startTime = this.classForm.value.starttime,
        this.classVM.endTime = this.classForm.value.endtime,
        this.classVM.days = this.classForm.value.days,
        this.classVM.sun = this.classForm.value.sun,
        this.classVM.mon = this.classForm.value.mon,
        this.classVM.tue = this.classForm.value.tue,
        this.classVM.wed = this.classForm.value.wed,
        this.classVM.thu = this.classForm.value.thu,
        this.classVM.fri = this.classForm.value.fri,
        this.classVM.sat = this.classForm.value.sat,
        this.classVM.id = this.classVM.id === undefined ? 0 : this.classVM.id;
      this.classVM.fees = this.classForm.value.fees;
      this.classVM.feeTypeId = this.classForm.value.paymenttype;
      this.classVM.createdBy = this.commonService.getReleventUserId('userdetails');
      this.classVM.AgencyID = this.agencyId;
      this.apiService.postData(AgencyAPIURLs.SaveClassInformation, this.classVM, null).subscribe(res => {
        if (res.body.statusCode === 200) {
          // tslint:disable-next-line:max-line-length
          this.notification.success({ message: this.classVM.id ? 'Class information updated successfully!' : 'New Class created successfully!', title: '' });
          this.spinner.hide();
          $('.addclass').modal('hide');
          this.getAllClassList();
        } else if (res.body.statusCode === 900) {
          this.spinner.hide();
          this.notification.warning({ message: 'Class name already exists!', title: '' });
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
      this.commonService.validateAllFields(this.classForm);
    }
  }

  getAllClassList() {
    this.classList = [];
    const req = {
      'AgencyID': this.agencyId,
      'limit': this.limit,
      'page': this.pageNo
    };
    this.apiService.postData(AgencyAPIURLs.GetAllClasses, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.totalRecord = res.body.totalRows;
        this.classList = res.body.data;
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

  getAllClassCategoryList() {
    const data = {
      'agencyID': this.agencyId
    };
    this.classcategoryList = [];
    this.apiService.postData(AgencyAPIURLs.GetAllClassCategories, data, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.classcategoryList = res.body.data;
        this.classcategoryList.forEach(element => {
          this.minAge = element.fromAge;
          this.maxAge = element.toAge;
          this.cateId = element.id;
        });
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



  getClassDetails(data) {
    this.addMode = false;
    this.classVM = {};
    this.spinner.show();
    const req = {
      'agencyID': this.agencyId,
      'classID': data.classesID, // Pass proper incident id here
    };
    this.apiService.postData(AgencyAPIURLs.GetParticularClassDetails, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        console.log(res.body.data, 'dddddddddddddd');
        if (res.body.data[0].categoryId === 6) {
          this.isDriopInSelected = true;
          this.isDriopInSelectedandOngoing = true;
        } else {
          this.isDriopInSelected = false;
          this.isDriopInSelectedandOngoing = false;
        }
        if (res.body.data[0].classEndDate == '2080-01-01T00:00:00') {
          this.isDriopInSelectedandOngoing = true;
          this.classVM.onGoing = true;
        } else {
          this.isDriopInSelectedandOngoing = false;
          this.classVM.onGoing = false;
        }
        this.classVM.AgencyID = this.agencyId;
        this.classVM.id = res.body.data[0].id;
        this.classVM.className = res.body.data[0].className;
        this.classVM.enrollCapacity = res.body.data[0].enrollCapacity;
        this.classVM.categoryId = res.body.data[0].categoryId;
        this.cateId = res.body.data[0].categoryId;
        this.classVM.categoryName = res.body.data[0].categoryName;
        this.classVM.classStartDate = new Date(res.body.data[0].classStartDate);
        this.classVM.classEndDate = new Date(res.body.data[0].classEndDate);
        this.classVM.description = res.body.data[0].description;
        this.classVM.fees = res.body.data[0].fees;
        this.classVM.feeTypeId = res.body.data[0].feeTypeId;
        this.classVM.startTime = this.commonService.getLocalDateTimeFromUTC(res.body.data[0].startTime);
        this.classVM.endTime = this.commonService.getLocalDateTimeFromUTC(res.body.data[0].endTime);
        this.classVM.days = res.body.data[0].days;
        this.classVM.sun = res.body.data[0].sun;
        this.classVM.mon = res.body.data[0].mon;
        this.classVM.tue = res.body.data[0].tue;
        this.classVM.wed = res.body.data[0].wed;
        this.classVM.thu = res.body.data[0].thu;
        this.classVM.fri = res.body.data[0].fri;
        this.classVM.sat = res.body.data[0].sat;
        this.minAge = res.body.data[0].fromAge;
        this.maxAge = res.body.data[0].toAge;
        this.editClassForm();
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



  cleareForm() {
    this.isDriopInSelected = false;
    this.isDriopInSelectedandOngoing = false;
    this.addMode = true;
    this.classVM = {};
    this.createClassForm();
  }


  // Method to delete/deactivate class
  deleteClass(value) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this class?',
      accept: () => {
        this.spinner.show();
        value.IsDeleted = true;
        value.DeletedDate = new Date();
        value.DeletedBy = this.commonService.getReleventUserId('userdetails');
        this.apiService.postData(AgencyAPIURLs.SaveClassInformation, value, null).subscribe(res => {
          if (res.body.statusCode === 200) {
            this.deleteClassSuccess(value);
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

  deleteClassSuccess(data) {
    const index = this.classList.findIndex(r => r.classesID === data.classesID);
    this.classList.splice(index, 1);
    this.spinner.hide();
    this.notification.success({ message: 'This class has been deleted', title: '' });
  }



  getClassId(value) {
    //this.childList = [];
    this.classDetails = value;
    this.createEnrolForm();
    this.maxEnrolEndtDate = new Date(value.classEndDate);
    const endDate = new Date(value.classEndDate);
    this.maxEnrolEtartDate = new Date(value.classStartDate);
    this.enrolForm.controls['classname'].setValue(value.className);
    this.enrolForm.controls['enddate'].setValue(endDate);
    this.enrolForm.controls['classname'].updateValueAndValidity();
    this.enrolForm.controls['enddate'].updateValueAndValidity();
    this.classId = value.classesID;
  }

  // Child list of parents
  getAllChildrenList() {
    //this.spinner.show();
    this.childList = [];
    const req = {
      'AgencyID': this.agencyId,
      'classID': 0,
      'studentID': 0,
      'parentID': 0,
      'studentName': '',
    };
    this.apiService.postData(ParentAPIURLs.GetAllStudentsForEnroll, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        if (res.body.data.length > 0 && res.body.data !== []) {
          this.childList = res.body.data;
          console.log(this.childList);
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

  verifyEnrollment() {
    this.spinner.show();
    const startdate = this.commonService.getOnlyDate(this.enrolForm.value.startdate);
    const enddate = this.commonService.getOnlyDate(this.enrolForm.value.enddate);
    if (startdate >= enddate && this.enrolForm.value.enddate !== null) {
      this.spinner.hide();
      this.notification.warning({ message: 'start date must be greater than end date ', title: '' });
    } else if (this.maxEnrolEndtDate.setHours(0, 0, 0) < enddate.setHours(0, 0, 0)) {
      this.spinner.hide();
      this.notification.warning({
        message: 'End date must be smaller than class end date (i.e.' + this.maxEnrolEndtDate.toDateString() +
          ') ', title: ''
      });
    } else if (this.enrolForm.valid) {
      const req = {
        'agencyID': this.agencyId,
        'classesID': this.classId,
        'studentID': this.enrolForm.value.childname,
        'classEnrollStartDate': this.enrolForm.value.startdate,
        'classEnrollEndDate': this.enrolForm.value.enddate,
        'enrollmentStatus': 2,
        'feeTypeId': this.classDetails.feeTypeId,
        'fees': this.classDetails.fees
      };
      const msg = 'Child has been enrolled for this class Successfully!';
      this.spinner.hide();
      this.saveEnrollment(req, msg, 0);
    } else {
      this.spinner.hide();
      this.commonService.validateAllFields(this.enrolForm);
    }
  }

  // enrollment satus id's as follow
  //  0: Not Enrolled
  //  1:Requested
  //   2: Enrolled
  //   3: Cancelled by Parent
  //   4 : Denied by Agency
  //   5: Completed



  saveEnrollment(req, msg, type) {
    this.apiService.postData(ParentAPIURLs.SaveStudentEnrollment, req, null).subscribe(res => {

      if (res.body.statusCode === 200) {
        $('.immunization').modal('hide');
        this.notification.success({ message: msg, title: '' });
        this.getAllClassList();
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
      } else if (res.body.statusCode === 209) {
        this.notification.warning({
          message: 'This Student is already a part of dropin care you cant enroll for another class!',
          title: ''
        });
      } else {
        this.spinner.hide();
        this.error.unknownError();
      }
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.error.commonError(err);
    });
  }


  getFessPaymentType() {
    const value = {
      'agencyID': this.agencyId
    };

    this.apiService.postData(AgencyAPIURLs.GetFessPaymentTypeDropdown, value, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.paymentTypeList = res.body.data;
      } else {
        this.spinner.hide();
      }
    }, err => {
      this.spinner.hide();
    });
  }


  paginate(event) {
    this.pageNo = event.page;
    this.getAllClassList();
  }




  getFeesDetails() {

  }
  removeModalPosition(event) {
    document.getElementsByTagName('body')[0].style.overflow = 'visible';
  }

  removeVisibility() {
    document.getElementsByTagName('body')[0].removeAttribute('style');
  }

  /**Check for dropp in categories */
  checkCategory() {
    if (this.classForm.controls.categoryId.value === '6') {
      this.isDriopInSelected = true;
      this.isDriopInSelectedandOngoing = true;
      const d = new Date();
      const year = d.getFullYear();
      const month = d.getMonth();
      const day = d.getDate();
      const c = new Date(year + 60, month, day);
      this.classForm.controls.sessionTo.setValue(c);
      this.classForm.controls.sessionTo.updateValueAndValidity();
      this.classForm.controls['ongoing'].disable();
    } else {
      this.classForm.controls.sessionTo.setValue(this.emptyDate);
      this.classForm.controls.sessionTo.updateValueAndValidity();
      this.classForm.controls['ongoing'].enable();
      this.isDriopInSelected = false;
      this.isDriopInSelectedandOngoing = false;
    }
  }




}
