import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { TeacherApiService } from '../../../teacher/shared/services/teacher-api-service/teacher-api.service';
import { ErrorHandlerService } from '../../../../shared/services/error-handler/error-handler.service';
import { NotificationService } from '../../../../shared/services/notification-service/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import { TeacherAPIURLs } from '../../../teacher/shared/constant';
import { CommonService } from '../../../../shared/services/common/common.service';
declare var $: any;

@Component({
  selector: 'app-agency-student-break',
  templateUrl: './agency-student-break.component.html',
  styleUrls: ['./agency-student-break.component.css']
})
export class AgencyStudentBreakComponent implements OnInit {
  breakList: any[] = [];
  studentId: any;
  attendanceId: any;
  breakInForm: FormGroup;
  breakOutForm: FormGroup;
  searchDate = new Date();
  mytime = new Date();
  guardiansList: any[] = [];
  tabType = 'breakouttab';
  idForBreakIn = 0;
  idForEditBreakout = 0;
  disableNewEntry = true;
  today = new Date();
  allowentry: any;
  attendanceStatus: any;
  allowedit = false;
  studentName: string;
  imagePath: string;
  attendanceaDate: any;
  breakOutDateTime: any;
  isSubscriptionActive: boolean;
  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  constructor(private apiService: TeacherApiService, private fb: FormBuilder, private error: ErrorHandlerService,
    private spinner: NgxSpinnerService, private notification: NotificationService, private commonService: CommonService,
  private router: Router, private routedata: ActivatedRoute) {
    this.isSubscriptionActive = this.commonService.getSubscriptionStatus();
    this.routedata.queryParams.subscribe(params => {
      this.studentName = params['Name'];
      this.imagePath = params['ImagePath'];
      this.attendanceaDate = params['Date'];
      this.attendanceStatus = params['attendenceStatusID'];
  });

   }

  ngOnInit() {
    this.createBreakInForm();
    this.createBreakOutForm();
    this.routedata.params.subscribe(params => {
      this.studentId = params['id'];
      this.attendanceId = params['attendanceid'];
      this.allowentry = params['allowedit'];
      const allowFlag = this.allowEditMethod();
      if (this.allowentry === 'true' && allowFlag === true) {
        this.allowedit = true;
      } else {
        this.allowedit = false;
      }
      this.getAllStudentsBreakLogs();
      this.getGuardianList();
    });

  }


  createBreakInForm() {
    this.breakInForm = this.fb.group({
      indate: [this.searchDate, Validators.required],
      inclass: [null],
      dropby: ['', Validators.required],
      intime: [this.mytime, Validators.required],
    });
  }

  createBreakOutForm() {
    this.breakOutForm = this.fb.group({
      outdate: [this.searchDate, Validators.required],
      reason: [null, Validators.required],
      pickupby: ['', Validators.required],
      outtime: [this.mytime, Validators.required],
    });
  }


 // Check In Form
 get outdate() { return this.breakInForm.get('outdate'); }
 get inclass() { return this.breakInForm.get('inclass'); }
 get dropby() { return this.breakInForm.get('dropby'); }

 // Check Out Form
 get indate() { return this.breakOutForm.get('indate'); }
 get reason() { return this.breakOutForm.get('reason'); }
 get pickupby() { return this.breakOutForm.get('pickupby'); }




  getAllStudentsBreakLogs () {
    this.spinner.show();
    const data = {
      'agencyID': this.commonService.getAgencyId(),
      'studentID': this.studentId,
      'classAttendenceID': this.attendanceId
    };

    this.apiService.postData(TeacherAPIURLs.GetStudentBreakLogs, data, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.spinner.hide();
        this.breakList = res.body.data;
        if (this.breakList.length > 0) {
          if ( res.body.data[(res.body.data.length - 1)].breakStatusId === 2 ) {
            this.disableNewEntry = false;
           } else {
            this.disableNewEntry = true;
           }
          this.breakList.forEach(x => {
        x.breakOutTime = new Date (this.commonService.getLocalDateTimeFromUTC( x.breakOutTime));
        x.breakInTime = new Date(this.commonService.getLocalDateTimeFromUTC( x.breakInTime));
          });
        } else {
          this.disableNewEntry = false;
        }
      } else {
        this.spinner.hide();
        this.error.unknownError();
      }
    }, err => {
      this.spinner.hide();
      this.error.commonError (err);
    } );
  }


  // Get check in Out Details
  getGuardianList() {    
    const req = {
      'studentID': this.studentId,
      'agencyID': this.commonService.getAgencyId(),
      'isAuthorized': true
    };
    this.apiService.postData(TeacherAPIURLs.GetAllGuardiansForStudents, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.guardiansList = res.body.data;
      } else {
        this.error.unknownError();
      }

    }, err => {
      this.spinner.hide();
      this.error.commonError(err);
    }
    );
  }



  saveBreakIn() {
    if (this.breakOutDateTime > this.breakInForm.value.intime) {
      this.notification.warning({message: 'Break-In time should be greater than break-Out time', title: ''});
  } else {
    const data = {
      'id': this.idForBreakIn,
      'agencyID': this.commonService.getAgencyId(),
      'studentID': this.studentId,
      'classAttendenceID': this.attendanceId,
      'breakInTime': this.breakInForm.value.intime,
      'attendenceStatusID': 0,
      'attendanceDate': '2019-02-07T04:05:42.198Z',
      'dropedById': this.breakInForm.value.dropby,
      'dropedByOtherId': 0,
      'pickupById': 0,
      'pickupByOtherId': 0,
      'approvedDropedById': 0,
      'approvedPickupById': 0,
      'dropedByOtherNames': 'string',
      'pickupByOtherName': 'string',
      'breakStatusId': 2
    };
    this.apiService.postData(TeacherAPIURLs.BreakInAttendenceStudent, data, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        $('#checkin').modal('hide');
        $('#edittimecheckout').modal('hide');
        this.notification.success({ message:  'Breaked In Successfully', title: '' });
        this.getAllStudentsBreakLogs();
      } else {
        this.error.unknownError();
      }

    }, err => {
      this.spinner.hide();
      this.error.commonError(err);
    }
    );
  }
}



openModalForNewEntry() {
  if ( this.allowEditMethod() && this.attendanceStatus === '3') {
    $('#checkout').modal('show');
    return true;
  } else if (this.attendanceStatus === '4' && this.allowEditMethod()) {
    this.notification.warning({message: 'Student has been checked out', title: 'Break not allowed!'});
  } else {
    this.notification.warning({message: 'You can create new entry for today only', title: ''});
    return false;
  }

}


allowEditMethod() {
  const today = this.commonService.getOnlyDate(new Date());
  const breakdate =  this.commonService.getOnlyDate(this.attendanceaDate);
  if (today.toDateString() === breakdate.toDateString()) {
    return true;
  } else {
    return false;
  }
}


  saveBreakOut(statusid) {
    const data = {
      'id': this.idForEditBreakout,
      'agencyID': this.commonService.getAgencyId(),
      'studentID': this.studentId,
      'classAttendenceID': this.attendanceId,
      'breakOutTime': this.breakOutForm.value.outtime,
      'attendenceStatusID': 0,
      'attendanceDate': '2019-02-07T04:05:42.198Z',
      'dropedById': 0,
      'dropedByOtherId': 0,
      'pickupById': this.breakOutForm.value.pickupby,
      'pickupByOtherId': 0,
      'approvedDropedById': 0,
      'approvedPickupById': 0,
      'dropedByOtherNames': 'string',
      'pickupByOtherName': 'string',
      'breakReason': this.breakOutForm.value.reason,
      'breakStatusId': statusid
    };
    this.apiService.postData(TeacherAPIURLs.BreakOutAttendenceStudent, data, null).subscribe(res => {
      if (res.body.statusCode === 200) {      
        this.notification.success({ message:  'Breaked out Successfully', title: '' });
        this.getAllStudentsBreakLogs();
      } else {
        this.error.unknownError();
      }

    }, err => {
      this.spinner.hide();
      this.error.commonError(err);
    }
    );
  }




  getBreakTabDetails(type) {
    this.tabType = type;    
  }


  clearForm() {
    this.breakOutForm.controls['outtime'].setValue(new Date());
    this.idForEditBreakout = 0;
    this.createBreakInForm();
    this.createBreakOutForm();
  }


  clearTabs() {
    this.tabType = 'breakouttab';
    $('#checkout-tab').tab('show');
  }


  getBreakId(value) {
  this.idForBreakIn =  value.id;
  this.idForEditBreakout = value.id;
  this.breakOutDateTime = this.commonService.getLocalDateTimeFromUTC(value.breakOutTime);
}

getBreakOutDetails(value) {
  this.idForEditBreakout = value.id;
  const outdate = this.commonService.getLocalDateTimeFromUTC(value.breakOutTime);
  this.breakOutForm.controls['outdate'].setValue(outdate);
  this.breakOutForm.controls['reason'].setValue(value.breakReason);
  this.breakOutForm.controls['pickupby'].setValue(value.pickupById);
  this.breakOutForm.controls['outtime'].setValue(new Date(this.commonService.getLocalDateTimeFromUTC(value.breakOutTime)));
}

getAllBreakInDetails(value) {
  this.idForEditBreakout = value.id;
  this.idForBreakIn =  value.id;
  const indate = this.commonService.getLocalDateTimeFromUTC(value.breakInTime);
  const outdate = this.commonService.getLocalDateTimeFromUTC(value.breakOutTime);
  this.breakOutDateTime = outdate;
  this.breakOutForm.controls['outdate'].setValue(outdate);
  this.breakOutForm.controls['reason'].setValue(value.breakReason);
  this.breakOutForm.controls['pickupby'].setValue(value.pickupById);
  this.breakOutForm.controls['outtime'].setValue(new Date(this.commonService.getLocalDateTimeFromUTC(value.breakOutTime)));
  this.breakInForm.controls['indate'].setValue(indate);
  this.breakInForm.controls['dropby'].setValue(value.dropedById );
  this.breakInForm.controls['intime'].setValue(new Date(this.commonService.getLocalDateTimeFromUTC(value.breakInTime)));
}


}
