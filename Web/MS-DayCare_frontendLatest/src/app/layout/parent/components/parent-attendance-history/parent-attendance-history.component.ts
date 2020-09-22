import { Component, OnInit } from '@angular/core';
import { ErrorHandlerService } from '../../../../shared/services/error-handler/error-handler.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from '../../../../shared/services/notification-service/notification.service';
import { ParentApiService } from '../../shared/services/parent-api-service';
import { ParentAPIURLs } from '../../shared/constant';
import { TeacherAPIURLs } from '../../../teacher/shared/constant';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { NavigationExtras, Router } from '@angular/router';
import { CommonService } from '../../../../shared/services/common/common.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
declare var $: any;

@Component({
  selector: 'app-parent-attendance-history',
  templateUrl: './parent-attendance-history.component.html',
  styleUrls: ['./parent-attendance-history.component.css']
})
export class ParentAttendanceHistoryComponent implements OnInit {
  today = new Date();
  searchDate: any;
  searchByDateString: any;
  serchByChild = '';
  childList: any[] = [];
  attendanceList: any[] = [];
  classList: any[] = [];
  classListDetails: any[] = [];
  className = '';
  serchByClass = '';
  enrollmentList: any[] = [];
  loader = true;
  agencyId = this.commonService.getAgencyId();
  loggedInParentId = this.commonService.getReleventUserId('userdetails');
  enrolForm: FormGroup;
  classId: number;
  maxEnrolEtartDate: any;
  maxEnrolEndtDate: any;
  pageNo = 0;
  limit = 10;
  totalRecord = 0;
  studentNameSerchForEnroll = '';
  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  constructor(private error: ErrorHandlerService,
    private spinner: NgxSpinnerService, private notification: NotificationService,
    private commonService: CommonService, private apiService: ParentApiService, private router: Router,
    private fb: FormBuilder, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.searchDate = new Date();
    this.searchByDateString = this.commonService.getStringLocalDateTimeFromUTC(this.searchDate);
    this.spinner.show();
    this.dpConfig = Object.assign({}, { containerClass: 'theme-dark-blue' },
      { showWeekNumbers: false });
    this.getAllChildrenList();
    this.createEnrolForm();
    this.getAllClasses();
    this.getAllClassessWithDetails();
  }


  createEnrolForm() {
    this.enrolForm = this.fb.group({
      childname: ['', Validators.required],
       classname: [{value: '', disabled: true}],
      startdate: [new Date(), Validators.required],
      enddate: [null]
    });
  }

  get i() { return this.enrolForm.controls; }

  getAllChildrenList() {
    this.childList = [];
    const req = {
      'AgencyID': this.agencyId,
      'classID': 0,
      'studentID': this.serchByChild,
      'parentID': this.loggedInParentId,
      'studentName': '',
    };
    this.apiService.postData(ParentAPIURLs.GetAllStudentsOfParent, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        if (res.body.data.length > 0 && res.body.data !== []) {
          this.childList = res.body.data;
          if (this.childList.length !== 0) {
            this.serchByChild = this.childList[0].studentId;
            this.getAttendenceList();
          } else {
            this.spinner.hide();
          }
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




  getAllClasses() {
    this.classList = [];
    const data = {
      'agencyID': this.agencyId
    };
    this.apiService.postData(TeacherAPIURLs.GetAllClassesDropdown, data, null).subscribe(res => {
      if (res.body.statusCode === 200) {      
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



  getAttendenceList() {
    this.loader = true;
    this.spinner.show();
    this.attendanceList = [];
    this.loader = true;
    const data = {
      'agencyId': this.agencyId,
      'askedDate': this.searchDate,
      'askedDateString': this.searchByDateString,
      'studentID': this.serchByChild,
      'parentID': this.loggedInParentId,
      'limit': this.limit,
      'page': this.pageNo
    };
    this.apiService.postData(ParentAPIURLs.GetAttendanceListforparent, data, null).subscribe(res => {
      this.loader = false;
      if (res.body.statusCode === 200) {
        this.totalRecord = res.body.totalRows;
        if (res.body.data.length > 0) {
          res.body.data.forEach(element => {
            element.checkInTime = this.commonService.getLocalDateTimeFromUTC(element.checkInTime);
            element.checkOutTime = this.commonService.getLocalDateTimeFromUTC(element.checkOutTime);
          });
          this.attendanceList = res.body.data;
          this.className = res.body.data[0].className;
          this.loader = false;
        }
        this.spinner.hide();
      } else {
        this.spinner.hide();
        this.notification.warning({message: 'Please Select Child', title: ''});
       // this.error.unknownError();
      }
    }, err => {
      this.spinner.hide();
      this.error.commonError(err);
    });

  }

  getStudentClassEnrollment() {
    this.loader = true;
    const data = {
      'agencyID': this.agencyId,
      'classID': 0,
      'studentID': this.studentNameSerchForEnroll,
      'parentID': this.loggedInParentId,
      'studentName': '',
      'askedDate': new Date(),
      'limit': 0,
      'page': 0
    };
    this.apiService.postData(ParentAPIURLs.GetStudentClassEnrollment, data, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        res.body.data.forEach(element => {
            if (element.classEnrollEndDate === '0001-01-01T00:00:00') {
              element.classEnrollEndDate = null;
            }
        });
        this.enrollmentList = res.body.data;
        this.spinner.hide();
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


  cleareData() {
    this.serchByChild = '' ;
    this.searchDate = new Date();
    this.searchByDateString = this.commonService.getStringLocalDateTimeFromUTC(this.searchDate);
    this.attendanceList = [];
    this.enrollmentList = [];
  }


  goToBreak(values) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        'Name': values.studentName,
        'ImagePath': values.imagePath,
        'Date': this.searchDate
      }
    };
    this.router.navigate(['./home/parentdashboard/studentbreaks', values.studentID, values.id], navigationExtras);
  }

  verifyEnrollment() {
    const startdate = this.commonService.getOnlyDate(this.enrolForm.value.startdate);
    const enddate = this.commonService.getOnlyDate(this.enrolForm.value.enddate);
    if (startdate >= enddate &&  this.enrolForm.value.enddate !== null) {
      this.notification.warning({ message: 'End date must be greater than start date ', title: '' });
    } else if (this.maxEnrolEndtDate.setHours(0, 0, 0) < enddate.setHours(0, 0, 0) ) {
      this.spinner.hide();
      this.notification.warning({ message: 'End date must be smaller than class end date (i.e.' + this.maxEnrolEndtDate.toDateString() +
       ') ', title: '' });
    } else if (this.enrolForm.valid) {
      const req = {
        'agencyID': this.agencyId,
        'classesID': this.classId,
        'studentID': this.enrolForm.value.childname,
        'classEnrollStartDate': this.enrolForm.value.startdate,
        'classEnrollEndDate': this.enrolForm.value.enddate,
        'enrollmentStatus': 1,
        'updatedBy' : this.commonService.getLoggedInUserId()
      };
      const msg = 'Child has been requested for this class Successfully!';
     this.saveEnrollment(req, msg, 0);
    } else {
      this.spinner.hide();
      this.commonService.validateAllFields(this.enrolForm);
    }
  }

  // enrollment satus id's as follow
  //  0: Not Enrolled
  //  1: Requested
  //  2: Enrolled
  //  3: Cancelled by Parent
  //  4: Denied by Agency
  //  5: Completed



  saveEnrollment(req, msg, type) {
    this.apiService.postData(ParentAPIURLs.SaveStudentEnrollment, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        $('.immunization').modal('hide');
        this.notification.success({message: msg, title: ''});
        if (type === 1) {
          this.getStudentClassEnrollment();
        } else {
          this.spinner.hide();     
        }      
      } else if (res.body.statusCode === 205) {
        this.spinner.hide();
        this.notification.warning({message: 'Already enrolled for this class', title: '' });
      } else if (res.body.statusCode === 206) { // Enroll capacity full
        this.spinner.hide();
        this.notification.warning({message: res.body.message, title: '' });
      } else if (res.body.statusCode === 207) {
        this.spinner.hide();
        this.notification.warning({message: 'This student is part of regular class , you cant enroll for drop in class', title: '' });
      }  else if (res.body.statusCode === 208) {
        this.spinner.hide();
        this.notification.warning({message: 'This student is part of drop in class , you cant enroll for regular class', title: '' });
      } else if (res.body.statusCode === 209) {
        this.notification.warning({message: 'This Student is already a part of dropin care you cant enroll for another class!',
         title: '' });
      } else {
        this.spinner.hide();
        this.error.unknownError();
      }
    }, err => {
      this.spinner.hide();
      this.error.commonError(err);
    });
  }



  getAllClassessWithDetails() {
    this.spinner.show();
    const data = {
      'agencyID': this.agencyId
    };
    this.apiService.postData(TeacherAPIURLs.GetAllClasses, data, null).subscribe(res => {
      this.spinner.hide();
      if (res.body.statusCode === 200) {
        res.body.data.forEach(element => {
          element.startTime =  this.commonService.getLocalDateTimeFromUTC(element.startTime);
          element.endTime = this.commonService.getLocalDateTimeFromUTC(element.endTime);
        });
        this.classListDetails = res.body.data;
      } else {
        this.spinner.hide();
        this.error.unknownError();
      }

    }, err => {
      this.spinner.hide();
      this.error.commonError(err);
    });
  }


  getClassId(value) {
    this.maxEnrolEndtDate = new Date(value.classEndDate);
    this.maxEnrolEtartDate = new Date(value.classStartDate);
    this.classId =  value.classesID;
    this.enrolForm.controls['childname'].setValue('');
    this.enrolForm.get('childname').markAsUntouched({ onlySelf: true });
    this.enrolForm.get('childname').markAsPristine({ onlySelf: true });
    this.enrolForm.controls['classname'].setValue(value.className);
    this.enrolForm.controls['classname'].updateValueAndValidity();
    this.enrolForm.controls['enddate'].setValue(this.maxEnrolEndtDate);
    this.enrolForm.controls['enddate'].updateValueAndValidity();
  }


  cancelEnrollmentRequest(value) {

    this.confirmationService.confirm({
      message: 'Do you want to cancel this request?',
      accept: () => {
        this.spinner.show();
    const req = {
      'id': value.id,
      'agencyID': this.agencyId,
      'classesID': value.classesID,
      'studentID': value.studentID,
      'classEnrollStartDate': value.classEnrollStartDate,
       'classEnrollEndDate': value.classEnrollEndDate,
      'enrollmentStatus': 3,     //  status 3 for Canceling the enrollmanet request before accept by the agency
    };
    const msg = 'Your request has been cancelled!';
    this.saveEnrollment(req, msg, 1);
  }
    });
}


paginate(event, tab) {
  this.pageNo = event.page;
  if (tab === 1) {
    this.getAttendenceList();
  } else {
  }
}

onChangeTab() {
  this.pageNo = 0;
}


}
