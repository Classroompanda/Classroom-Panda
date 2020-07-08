import { Component, OnInit } from '@angular/core';
import { TeacherApiService } from '../../../teacher/shared/services/teacher-api-service/teacher-api.service';
import { ErrorHandlerService } from '../../../../shared/services/error-handler/error-handler.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from '../../../../shared/services/notification-service/notification.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TeacherAPIURLs } from '../../../teacher/shared/constant';
import { CommonService } from '../../../../shared/services/common/common.service';
declare var $: any;

@Component({
  selector: 'app-parent-child-breklog',
  templateUrl: './parent-child-breklog.component.html',
  styleUrls: ['./parent-child-breklog.component.css']
})
export class ParentChildBreklogComponent implements OnInit {

  breakList: any[] = [];
  studentId: any;
  attendanceId: any;
  searchDate = new Date();
  mytime = new Date();
  guardiansList: any[] = [];
  idForBreakIn = 0;
  idForEditBreakout = 0;
  disableNewEntry = true;
  today = new Date();
  allowentry: any;
  allowedit = false;
  studentName: string;
  imagePath: string;
  attendanceaDate: any;
  constructor(private apiService: TeacherApiService, private error: ErrorHandlerService,
    private spinner: NgxSpinnerService, private notification: NotificationService, private commonService: CommonService,
  private router: Router, private routedata: ActivatedRoute) {
    this.routedata.queryParams.subscribe(params => {
      this.studentName = params['Name'];
      this.imagePath = params['ImagePath'];
      this.attendanceaDate = params['Date'];
  });

   }

   ngOnInit() {
    this.routedata.params.subscribe(params => {
      this.studentId = params['id'];
      this.attendanceId = params['attendanceid'];
      this.allowentry = params['allowedit'];
      if (this.allowentry === 'false') {
        this.allowedit = false;
      } else {
        this.allowedit = true;
      }
      this.getAllStudentsBreakLogs();
    });

  }





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
        x.breakOutTime = this.commonService.getLocalDateTimeFromUTC( x.breakOutTime);
        x.breakInTime = this.commonService.getLocalDateTimeFromUTC( x.breakInTime);
          });
        } else {
          this.disableNewEntry = false;
        }
      } else {
        this.spinner.hide();
        this.error.unknownError();
      }
      console.log('list student', res);
    }, err => {
      this.spinner.hide();
      this.error.commonError (err);
    } );
  }




openModalForNewEntry() {
  if (this.allowentry === 'true') {
    $('#checkout').modal('show');

  } else {
    this.notification.warning({message: 'You can create new entry for today only', title: ''});
  }

}


  getBreakId(value) {
  this.idForBreakIn =  value.id;
  this.idForEditBreakout = value.id;
}






}
