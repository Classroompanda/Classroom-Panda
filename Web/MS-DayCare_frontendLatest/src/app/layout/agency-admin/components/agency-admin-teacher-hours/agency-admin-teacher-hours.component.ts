import { Component, OnInit } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { AgencyApiService } from '../shared/services/agency-api-service/agency-api.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler/error-handler.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from 'src/app/shared/services/notification-service/notification.service';
import { ConfirmationService } from 'primeng/api';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { AgencyAPIURLs } from '../shared/constatant';
import { environment } from 'src/environments/environment';
import { Timestamp } from 'rxjs/internal/operators/timestamp';

@Component({
  selector: 'app-agency-admin-teacher-hours',
  templateUrl: './agency-admin-teacher-hours.component.html',
  styleUrls: ['./agency-admin-teacher-hours.component.css']
})
export class AgencyAdminTeacherHoursComponent implements OnInit {

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
  totalHrs: any;

  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  constructor(private apiService: AgencyApiService, private error: ErrorHandlerService,
    private spinner: NgxSpinnerService, private notification: NotificationService,
    private commonService: CommonService) { }
    
  ngOnInit() {
    this.dpConfig = Object.assign({}, { containerClass: 'theme-dark-blue' }, { showWeekNumbers: false }
    );
    this.getTeacherAttendanceHoursReport();
  }

  getTeacherAttendanceHoursReport() {
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

    this.apiService.postData(AgencyAPIURLs.GetTeacherSpentHoursReport, data, null).subscribe(res => {
      if (res.body.totalHours !== '00:00:00') {        
        this.totalHrs = res.body.totalHours;
      }
      this.totalRecord = res.body.totalRows;
      if (res.body.statusCode === 200) {
        this.spinner.hide();       
        this.totalHrs = res.body.totalHours;
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
    this.getTeacherAttendanceHoursReport();
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
    this.getTeacherAttendanceHoursReport();
  }

  clearSearch() {
    this.searchByTeacherName = '';
    this.fromDate = null;
    this.toDate = null;
    this.showClearBtn = false;
    this.getTeacherAttendanceHoursReport();
  }

  pdfReportForAttendedHours() {
    this.loader = true;
    this.spinner.show();
   const req = {
     'agencyID': this.commonService.getAgencyId(),
     'fromDate': this.fromDate ? this.fromDate : this.blankDate,
     'toDate': this.toDate ? this.toDate : this.blankDate,
     'teacherName': this.searchByTeacherName,
     'page': this.pageNo,
     'limit': this.limit,
   };
   this.apiService.postData(AgencyAPIURLs.GetPDFTeacherSpenHoursReport, req, null).subscribe(res => {
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

}
