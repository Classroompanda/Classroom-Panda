import { Component, OnInit } from '@angular/core';
import { AgencyApiService } from '../shared/services/agency-api-service/agency-api.service';
import { ErrorHandlerService } from '../../../../shared/services/error-handler/error-handler.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from '../../../../shared/services/notification-service/notification.service';
import { CommonService } from '../../../../shared/services/common/common.service';
import { AgencyAPIURLs } from '../shared/constatant';
import { environment } from '../../../../../environments/environment';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import * as moment from 'moment';

@Component({
  selector: 'app-agency-admin-tax-statement-report',
  templateUrl: './agency-admin-tax-statement-report.component.html',
  styleUrls: ['./agency-admin-tax-statement-report.component.css']
})
export class AgencyAdminTaxStatementReportComponent implements OnInit {
  reportList: any[] = [];
  pageNo = 0;
  limit = 10;
  totalRecord = 0;
  checkAmount = 0;
  cashAmount = 0;
  totalCheck = 0;
  totalAmount = 0;
  today = new Date;
  loader = true;
  searchByDate: any;
  searchByDateString: any;

  count = 0;
  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  constructor(private apiService: AgencyApiService, private error: ErrorHandlerService,
    private spinner: NgxSpinnerService, private notification: NotificationService,
    private commonService: CommonService) { }

  ngOnInit() {
    this.searchByDate = new Date();
    this.searchByDateString = this.commonService.getStringLocalDateTimeFromUTC(this.searchByDate);
    this.dpConfig = Object.assign({}, { containerClass: 'theme-dark-blue' }, { showWeekNumbers: false, dateInputFormat: 'YYYY' }
    );

    this.getTaxStatementReport();
  }

  getTaxStatementReport() {
    this.loader = true;
    this.reportList = [];
    this.spinner.show();
    const data = {
      'agencyID': this.commonService.getAgencyId(),
      'page': this.pageNo,
      'limit': this.limit,
      'askedDate': this.searchByDate,
      'askedDateString': this.searchByDateString,
    };
    this.apiService.postData(AgencyAPIURLs.GetTaxStatementReport, data, null).subscribe(res => {
      this.totalRecord = res.body.totalRows;
      if (res.body.statusCode === 200) {
        this.spinner.hide();
        this.reportList = res.body.data;
        this.totalAmount = res.body.totalPaidAmount;
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
    this.getTaxStatementReport();
  }

  pdfReportForBankStatement() {
    this.loader = true;
    this.spinner.show();
    const req = {
      'agencyID': this.commonService.getAgencyId(),
      'askedDate': this.searchByDate,
      'askedDateString': this.searchByDateString,
    };
    this.apiService.postData(AgencyAPIURLs.PdfReportForTaxStatement, req, null).subscribe(res => {
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


  getSerchDate(event: Date) {
    this.count++;
    if (this.count > 2) {
      this.searchByDate = event;
      this.searchByDateString = this.commonService.getStringLocalDateTimeFromUTC(this.searchByDate);
    }
  }

  onOpenCalendar(container) {
    container.yearSelectHandler = (event: any): void => {
      container.value =  event.date;
  };
    container.setViewMode('year');
   }



}

