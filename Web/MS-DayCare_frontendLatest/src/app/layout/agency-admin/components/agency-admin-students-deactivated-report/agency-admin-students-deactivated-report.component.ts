import { Component, OnInit } from '@angular/core';
import { AgencyApiService } from '../shared/services/agency-api-service/agency-api.service';
import { ErrorHandlerService } from '../../../../shared/services/error-handler/error-handler.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from '../../../../shared/services/notification-service/notification.service';
import { CommonService } from '../../../../shared/services/common/common.service';
import { AgencyAPIURLs } from '../shared/constatant';
import { environment } from '../../../../../environments/environment';
import { BsDatepickerConfig } from 'ngx-bootstrap';

@Component({
  selector: 'app-agency-admin-students-deactivated-report',
  templateUrl: './agency-admin-students-deactivated-report.component.html',
  styleUrls: ['./agency-admin-students-deactivated-report.component.css']
})
export class AgencyAdminStudentsDeactivatedReportComponent implements OnInit {
  reportList: any[] = [];
  pageNo = 0;
  limit = 10;
  totalRecord = 0;
  searchByStudentName = '';
  loader = true;
  fromDate: any;
  toDate: any;
  blankDate: any;
  showClearBtn: any;
  nonPaymentCount = 0;
  relocationCount = 0;
  certificateCount = 0;
  graduatedCount = 0;
  serviceCount = 0;
  behaviorCount = 0;
  healthCount = 0;
  seasonalCount = 0;
  lostJobCount = 0;
  livingCount = 0;
  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  constructor(private apiService: AgencyApiService, private error: ErrorHandlerService,
    private spinner: NgxSpinnerService, private notification: NotificationService,
    private commonService: CommonService) { }

  ngOnInit() {
    this.dpConfig = Object.assign({}, { containerClass: 'theme-dark-blue' }, { showWeekNumbers: false }
    );

    this.getDuePaymentReport();
  }

  getDuePaymentReport() {
    this.loader = true;
    this.reportList = [];
    this.spinner.show();
    const data = {
      'agencyID': this.commonService.getAgencyId(),
      'page': this.pageNo,
      'limit': this.limit,
      'fromDate': this.fromDate ? this.fromDate : this.blankDate,
      'toDate': this.toDate ? this.toDate : this.blankDate,
      'fromDateString': this.commonService.getStringLocalDateTimeFromUTC(this.fromDate),
      'toDateString': this.commonService.getStringLocalDateTimeFromUTC(this.toDate)
    };
    this.apiService.postData(AgencyAPIURLs.GetDeactivatedStudentsReport, data, null).subscribe(res => {
      this.totalRecord = res.body.totalRows;
      if (res.body.statusCode === 200) {
        this.spinner.hide();
        this.reportList = res.body.data;
        this.nonPaymentCount = res.body.nonPaymentCount;
        this.relocationCount = res.body.relocationCount;
        this.certificateCount = res.body.certificateCount;
        this.graduatedCount = res.body.graduatedCount;
        this.serviceCount = res.body.serviceCount;
        this.behaviorCount = res.body.behaviorCount;
        this.healthCount = res.body.healthCount;
        this.seasonalCount = res.body.seasonalCount;
        this.lostJobCount = res.body.lostJobCount;
        this.livingCount = res.body.livingCount;

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
    this.getDuePaymentReport();
  }

  pdfReportForDeactivatedStudent() {
    this.loader = true;
    this.spinner.show();
    const req = {
      'agencyID': this.commonService.getAgencyId(),
      'fromDate': this.fromDate ? this.fromDate : this.blankDate,
      'toDate': this.toDate ? this.toDate : this.blankDate,
      'fromDateString': this.commonService.getStringLocalDateTimeFromUTC(this.fromDate),
      'toDateString': this.commonService.getStringLocalDateTimeFromUTC(this.toDate)
    };
    this.apiService.postData(AgencyAPIURLs.PdfReportForDeactivatedStudents, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        const filename = environment.baseUrl + res.body.fileName;
        const name = res.body.fileName;
        window.open(filename);
        setTimeout(() => {
          this.deletePdFFromServer(name);
        }, 5000);
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
    this.showClearBtn = true;
    this.getDuePaymentReport();
  }

  clearSearch() {
    this.searchByStudentName = '';
    this.fromDate = null;
    this.toDate = null;
    this.showClearBtn = false;
    this.getDuePaymentReport();
  }


}
