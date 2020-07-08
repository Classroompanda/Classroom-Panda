import { Component, OnInit } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { AgencyApiService } from '../shared/services/agency-api-service/agency-api.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler/error-handler.service';
import { NotificationService } from 'src/app/shared/services/notification-service/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { AgencyAPIURLs } from '../shared/constatant';
import { environment } from 'src/environments/environment';
import { ConfirmationService } from 'primeng/api';
declare var $: any;
@Component({
  selector: 'app-agency-admin-teacher-attendance-report',
  templateUrl: './agency-admin-teacher-attendance-report.component.html',
  styleUrls: ['./agency-admin-teacher-attendance-report.component.css']
})
export class AgencyAdminTeacherAttendanceReportComponent implements OnInit {
  reportList: any[] = [];
  pageNo = 0;
  limit = 10;
  totalRecord = 0;
  searchByTeacherName = '';
  loader = true;
  fromDate: any;
  toDate: any;
  blankDate: any;
  showClearBtn = false;
  updatedTime = new Date();
  timeDetail: any ;
  recordId = 0;

  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  constructor(private apiService: AgencyApiService, private error: ErrorHandlerService,
    private spinner: NgxSpinnerService, private notification: NotificationService,
    private confirmationService: ConfirmationService,
    private commonService: CommonService) { }

  ngOnInit() {
    this.dpConfig = Object.assign({}, { containerClass: 'theme-dark-blue' }, { showWeekNumbers: false }
    );
    this.getTeacherAttendanceReport();
  }

  getTeacherAttendanceReport() {
    this.loader = true;
    this.reportList = [];
    this.spinner.show();
    const data = {
      'agencyID': this.commonService.getAgencyId(),
      'teacherName': this.searchByTeacherName,
      'page': this.pageNo,
      'limit': this.limit,
      'fromDate': this.fromDate ? this.fromDate : this.blankDate,
      'toDate': this.toDate ? this.toDate : this.blankDate
    };

    this.apiService.postData(AgencyAPIURLs.TeacherClassAttendenceReport, data, null).subscribe(res => {
      this.totalRecord = res.body.totalRows;
      if (res.body.statusCode === 200) {
        this.spinner.hide();
        res.body.data.forEach(element => {
          element.teacherClockIN = this.commonService.getLocalDateTimeFromUTC(element.teacherClockIN);
          if (element.teacherClockOut !== '0001-01-01T00:00:00') {
            element.teacherClockOut = this.commonService.getLocalDateTimeFromUTC(element.teacherClockOut);
          }
        });
        this.reportList = res.body.data;
      } else {
        this.spinner.hide();
        this.error.unknownError();
      }
      this.loader = false;
    }, err => {
      this.spinner.hide();
      this.error.commonError(err);
    });
  }
  paginate(event) {
    this.pageNo = event.page;   
    this.getTeacherAttendanceReport();
  }


  // Delete pdf after use from server
  deletePdFFromServer(filename) {
    const req = {
      'fileName': filename,
      'agencyID': this.commonService.getAgencyId()
    };
    this.apiService.postData(AgencyAPIURLs.DeleteExistingFile, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
      } else {
      }
    }, err => {
      console.log(err);
    }
    );
  }

  search() {
    this.pageNo = 0;
    this.showClearBtn = true;
    this.getTeacherAttendanceReport();
  }

  clearSearch() {
    this.searchByTeacherName = '';
    this.fromDate = null;
    this.toDate = null;
    this.showClearBtn = false;
    this.getTeacherAttendanceReport();
  }

  pdfReportForClassAttendence() {
    this.loader = true;
    this.spinner.show();
    const req = {
     'StudentName': this.searchByTeacherName,
     'agencyID': this.commonService.getAgencyId(),
     'fromDate': this.fromDate ? this.fromDate : this.blankDate,
     'toDate': this.toDate ? this.toDate : this.blankDate
   };
   this.apiService.postData(AgencyAPIURLs.PDFTeacherClassAttendenceReport, req, null).subscribe(res => {
     if (res.body.statusCode === 200) {
      const filename = environment.baseUrl + res.body.fileName;
     const name = res.body.fileName;
      window.open(filename);
      setTimeout(() => {
        this.deletePdFFromServer(name);
      }, 10000);
     } else {
       this.error.unknownError();
     }
     this.loader = false;
     this.spinner.hide();
   }, err => {
     this.spinner.hide();
     this.error.commonError(err);
   }
   );
  }

  openFormClockout(data) {
    this.timeDetail = data;
    this.recordId = data.id;
    if (data.teacherClockOut == '0001-01-01T00:00:00') {
      this.updatedTime = new Date();
    } else {
      this.updatedTime = data.teacherClockOut;
    }
    
    $('.timeupdateclockout').modal('show');
  }

  openFormClockIn(data) {
    this.timeDetail = data;
    this.recordId = data.id;
    this.updatedTime = data.teacherClockIN;
    $('.timeupdateclockIn').modal('show');
  }


  UpdateClockOutTime() {
     const t1 = new Date(this.timeDetail.teacherClockIN);
     const t2 = new Date(t1.getFullYear(), t1.getMonth(), t1.getDate(), this.updatedTime.getHours(),
     this.updatedTime.getMinutes(), this.updatedTime.getSeconds()); 
    if ( t1 >= t2) {
      this.notification.warning({message: 'Clock-out time should be greater than Clock-in time', title: ''});
    } else {
      $('.timeupdateclockout').modal('hide');
      this.confirmationService.confirm({
        message: 'Do you want to update clock out time?',
        accept: () => {
          this.loader = true;        
          this.spinner.show();
          const data = {
            'agencyID': this.commonService.getAgencyId(),
            'id': this.recordId,
            'ClockOutTime': this.updatedTime
          };
          this.apiService.postData(AgencyAPIURLs.UpdateTeacherClockOutTime, data, null).subscribe(res => {
            if (res.body.statusCode === 200) {
              $('.timeupdateclockout').modal('hide');
              this.notification.success({message: 'ClockOut Time Updated Successfully', title: ''});
              this.getTeacherAttendanceReport();
            } else {
              this.spinner.hide();
              this.error.unknownError();
            }
            this.loader = false;
          }, err => {
            this.spinner.hide();
            this.error.commonError(err);
          });
        },
        reject: () => {
          $('.timeupdateclockout').modal('show');
        }
    });
    }
    }


  UpdateClockInTime() {
      const t1 = new Date(this.timeDetail.teacherClockOut);     
      const t2 = new Date(t1.getFullYear(), t1.getMonth(), t1.getDate(), this.updatedTime.getHours(),
      this.updatedTime.getMinutes(), this.updatedTime.getSeconds()); 
     if ( t1 <= t2 && (!(this.timeDetail.teacherClockOut == '0001-01-01T00:00:00'))) {
       this.notification.warning({message: 'Clock-In time should not be greater than Clock-Out time', title: ''});
     } else {
       $('.timeupdateclockIn').modal('hide');
       this.confirmationService.confirm({
         message: 'Do you want to update clock In time?',
         accept: () => {
           this.loader = true;        
           this.spinner.show();
           const data = {
             'agencyID': this.commonService.getAgencyId(),
             'id': this.recordId,
             'ClockInTime': this.updatedTime
           };
           this.apiService.postData(AgencyAPIURLs.UpdateTeacherClockInTime, data, null).subscribe(res => {
             if (res.body.statusCode === 200) {
               $('.timeupdateclockIn').modal('hide');
               this.notification.success({message: 'ClockIn Time Updated Successfully', title: ''});
               this.getTeacherAttendanceReport();
             } else {
               this.spinner.hide();
               this.error.unknownError();
             }
             this.loader = false;
           }, err => {
             this.spinner.hide();
             this.error.commonError(err);
           });
         },
         reject: () => {
           $('.timeupdateclockIn').modal('show');
         }
     });
     }
    }
 

    



}
