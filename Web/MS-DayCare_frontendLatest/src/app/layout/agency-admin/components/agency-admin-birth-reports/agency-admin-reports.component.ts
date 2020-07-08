
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
  selector: 'app-agency-admin-reports',
  templateUrl: './agency-admin-reports.component.html',
  styleUrls: ['./agency-admin-reports.component.css']
})
export class AgencyAdminReportsComponent implements OnInit {
  searchName = '';
  studentList = [];
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
  searchByClass = '';
  classList: any[] = [];
  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  constructor(private apiService: AgencyApiService, private error: ErrorHandlerService,
    private spinner: NgxSpinnerService, private notification: NotificationService,
    private commonService: CommonService) { }

  ngOnInit() {
    this.dpConfig = Object.assign({}, { containerClass: 'theme-dark-blue' }, { showWeekNumbers: false }
    );
    this.getBirthdayReport();
    this.getAllClassess();
  }

  getBirthdayReport() {
    this.loader = true;
    this.studentList = [];
    this.spinner.show();
    const req = {
      'StudentName': this.searchName,
      'agencyID': this.commonService.getAgencyId(),
      'page': this.pageNo,
      'limit': this.limit,
      'fromDate': this.fromDate ? this.fromDate : this.blankDate,
      'toDate': this.toDate ? this.toDate : this.blankDate,
      'month': this.searchMonth,
      'ClassesIDReq': this.searchByClass
    };
    this.apiService.postData(AgencyAPIURLs.GetBirthDateReport, req, null).subscribe(res => {
      this.totalRecord = res.body.totalRows;
      if (res.body.statusCode === 200) {
        this.studentList = res.body.data;
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
      'StudentName': this.searchName,
      'agencyID': this.commonService.getAgencyId(),
      'fromDate': this.fromDate ? this.fromDate : this.blankDate,
      'toDate': this.toDate ? this.toDate : this.blankDate,
      'month': this.searchMonth,
      'ClassesIDReq': this.searchByClass
    };
    this.apiService.postData(AgencyAPIURLs.PdfReportForBirthday, req, null).subscribe(res => {
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
    console.log('data', this.studentList);

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
    this.searchByClass = '';
    this.searchName =  '';
    this.searchMonth = 0;
    this.fromDate = null;
    this.toDate = null;
     this.showClearBtn = false;
     this.getBirthdayReport();
  }



  getAllClassess() {
    this.classList = [];
    this.spinner.show();
    const data = {
      'agencyID': this.commonService.getAgencyId()
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

}
