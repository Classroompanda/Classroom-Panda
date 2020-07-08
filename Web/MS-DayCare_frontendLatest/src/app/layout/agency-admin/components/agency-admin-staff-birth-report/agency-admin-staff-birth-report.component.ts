import { Component, OnInit } from '@angular/core';
import { AgencyApiService } from '../shared/services/agency-api-service/agency-api.service';
import { ErrorHandlerService } from '../../../../shared/services/error-handler/error-handler.service';
import { NotificationService } from '../../../../shared/services/notification-service/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from '../../../../shared/services/common/common.service';
import { AgencyAPIURLs } from './../shared/constatant';
import { environment } from '../../../../../environments/environment';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { TeacherAPIURLs } from 'src/app/layout/teacher/shared/constant';

@Component({
  selector: 'app-agency-admin-staff-birth-report',
  templateUrl: './agency-admin-staff-birth-report.component.html',
  styleUrls: ['./agency-admin-staff-birth-report.component.css']
})
export class AgencyAdminStaffBirthReportComponent implements OnInit {
  searchName = '';
  staffList = [];
  loader = true;
  pageNo = 0;
  limit = 10;
  totalRecord = 0;
  fromDate: any;
  toDate: any;
  minDate: any;
  blankDate: any;
  showClearBtn = false;
  searchMonth = 0;
  classList: any[] = [];
  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  constructor(private apiService: AgencyApiService, private error: ErrorHandlerService,
    private spinner: NgxSpinnerService, private notification: NotificationService,
    private commonService: CommonService) { }

  ngOnInit() {
    this.dpConfig = Object.assign({}, { containerClass: 'theme-dark-blue' }, { showWeekNumbers: false }
    );
    this.getBirthdayReport();
  }

  getBirthdayReport() {
    this.loader = true;
    this.staffList = [];
    this.spinner.show();
    const req = {
      'TeacherName': this.searchName,
      'agencyID': this.commonService.getAgencyId(),
      'page': this.pageNo,
      'limit': this.limit,
      'fromDate': this.fromDate ? this.fromDate : this.blankDate,
      'toDate': this.toDate ? this.toDate : this.blankDate,
      'month': this.searchMonth
    };
    this.apiService.postData(AgencyAPIURLs.GetStaffBirthDateReport, req, null).subscribe(res => {
      this.totalRecord = res.body.totalRows;
      if (res.body.statusCode === 200) {
        this.staffList = res.body.data;
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

  pdfReportForBirthday() {
    this.loader = true;
    this.spinner.show();
    const req = {
      'TeacherName': this.searchName,
      'agencyID': this.commonService.getAgencyId(),
      'fromDate': this.fromDate ? this.fromDate : this.blankDate,
      'toDate': this.toDate ? this.toDate : this.blankDate,
      'month': this.searchMonth
    };
    this.apiService.postData(AgencyAPIURLs.PdfReportForStaffBirthday, req, null).subscribe(res => {
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

  getRecords() {
    console.log('data', this.staffList);
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

  paginate(event) {
    this.pageNo = event.page;
    this.getBirthdayReport();
  }


  search() {
    this.showClearBtn = true;
    this.getBirthdayReport();
  }

  clearSearch() {
    this.searchName =  '';
    this.searchMonth = 0;
    this.fromDate = null;
    this.toDate = null;
     this.showClearBtn = false;
     this.getBirthdayReport();
  }


}
