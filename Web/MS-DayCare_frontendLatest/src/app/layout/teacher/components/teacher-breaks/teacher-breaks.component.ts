import { Component, OnInit } from '@angular/core';
import { TeacherApiService } from '../../shared/services/teacher-api-service/teacher-api.service';
import { ErrorHandlerService } from '../../../../shared/services/error-handler/error-handler.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from '../../../../shared/services/notification-service/notification.service';
import { CommonService } from '../../../../shared/services/common/common.service';
import { TeacherAPIURLs } from '../../shared/constant';
import { BsDatepickerConfig } from 'ngx-bootstrap';

@Component({
  selector: 'app-teacher-breaks',
  templateUrl: './teacher-breaks.component.html',
  styleUrls: ['./teacher-breaks.component.css'],
  providers: []
})
export class TeacherBreaksComponent implements OnInit {
breakList: any [] = [];
searchDate =  new Date();
today = new Date();
public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  constructor(private apiService: TeacherApiService, private error: ErrorHandlerService,
    private spinner: NgxSpinnerService, private notification: NotificationService,
    private commonService: CommonService) { }

  ngOnInit() {
    this.dpConfig = Object.assign({}, { containerClass: 'theme-dark-blue' }, { showWeekNumbers: false }
  );

  this.commonService.getTeacherBreakLogAPI().subscribe(name => {
    this.getBreakLog();
    // console.log('nm', this.userName);
  });
    this.getBreakLog();
  }


  getBreakLog () {
    this.spinner.show();
    const data = {
      'agencyID': this.commonService.getAgencyId(),
      'askingDate': this.searchDate,
      'teacherID': this.commonService.getReleventUserId('userdetails'),
      // 'teacherDailyAttendenceID': this.commonService.getTeacherTodayAttendenceId()
    };

    this.apiService.postData(TeacherAPIURLs.GetTeacherBreakLog, data, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.spinner.hide();
        this.breakList = res.body.data;
        if (this.breakList) {
          this.breakList.forEach(value => {
            value.breakOut = this.commonService.getLocalDateTimeFromUTC( value.breakOut);
            value.breakIn = this.commonService.getLocalDateTimeFromUTC( value.breakIn);
           });
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


}
