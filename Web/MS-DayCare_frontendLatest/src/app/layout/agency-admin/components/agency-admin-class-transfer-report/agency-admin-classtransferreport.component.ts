import { Component, OnInit } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler/error-handler.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from 'src/app/shared/services/notification-service/notification.service';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { AgencyApiService } from '../shared/services/agency-api-service/agency-api.service';
import { AgencyAPIURLs } from '../shared/constatant';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-agency-admin-classtransferreport',
  templateUrl: './agency-admin-classtransferreport.component.html',
  styleUrls: ['./agency-admin-classtransferreport.component.css']
})
export class AgencyAdminClasstransferreportComponent implements OnInit {
  searchByStudentName = '';
  pageNo = 0;
  loader = true;
  limit = 10;
  totalRecord = 0;
  fromDate: any;
  toDate: any;
  blankDate: any;
  showClearBtn = false;
  transferList: any[] = [];
  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();

  constructor(private apiService: AgencyApiService, private error: ErrorHandlerService,
    private spinner: NgxSpinnerService, private notification: NotificationService,
    private commonService: CommonService) { }

  ngOnInit() {
    this.dpConfig = Object.assign({}, { containerClass: 'theme-dark-blue' }, { showWeekNumbers: false }
    );
    this.getClassTransferReport();
  }
  getClassTransferReport() {
    this.loader = true;
    this.transferList = [];
    this.spinner.show();
    const data = {
      'agencyID': this.commonService.getAgencyId(),
      'studentName': this.searchByStudentName,
      'fromDate': this.fromDate ? this.fromDate : this.blankDate,
      'toDate': this.toDate ? this.toDate : this.blankDate,
      'page': this.pageNo,
      'limit': this.limit,
    };
    this.apiService.postData(AgencyAPIURLs.StudentTransferAttendanceReport, data, null).subscribe(res => {
      this.totalRecord = res.body.totalRows;
      if (res.body.statusCode === 200) {
        this.spinner.hide();
        this.transferList = res.body.data;
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
    this.getClassTransferReport();
  }
  search() {
    this.showClearBtn = true;
    this.getClassTransferReport();
  }

  pdfStudentTransferAttendanceReport() {
    this.loader = true;
    this.spinner.show();
    const req = {
      'StudentName': this.searchByStudentName,
      'agencyID': this.commonService.getAgencyId()
    };
    this.apiService.postData(AgencyAPIURLs.PDFStudentTransferAttendanceReport, req, null).subscribe(res => {
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
  clearSearch() {
    this.searchByStudentName =  '';
    this.fromDate = null;
    this.toDate = null;
     this.showClearBtn = false;
     this.getClassTransferReport();
  }
}
