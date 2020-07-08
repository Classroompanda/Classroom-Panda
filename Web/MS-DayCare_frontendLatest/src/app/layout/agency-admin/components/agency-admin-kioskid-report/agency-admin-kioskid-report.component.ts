import { Component, OnInit } from '@angular/core';
import { AgencyApiService } from '../shared/services/agency-api-service/agency-api.service';
import { ErrorHandlerService } from '../../../../shared/services/error-handler/error-handler.service';
import { NotificationService } from '../../../../shared/services/notification-service/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from '../../../../shared/services/common/common.service';
import { AgencyAPIURLs } from './../shared/constatant';
import { environment } from '../../../../../environments/environment';
import { BsDatepickerConfig } from 'ngx-bootstrap';

@Component({
  selector: 'app-agency-admin-kioskid-report',
  templateUrl: './agency-admin-kioskid-report.component.html',
  styleUrls: ['./agency-admin-kioskid-report.component.css']
})
export class AgencyAdminKioskidReportComponent implements OnInit {
  searchName = '';
  parentList = [];
  loader = true;
  pageNo = 0;
  limit = 10;
  totalRecord = 0;
  showClearBtn = false;
  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  constructor(private apiService: AgencyApiService, private error: ErrorHandlerService,
    private spinner: NgxSpinnerService, private notification: NotificationService,
    private commonService: CommonService) { }

  ngOnInit() {
    this.dpConfig = Object.assign({}, { containerClass: 'theme-dark-blue' }, { showWeekNumbers: false }
    );
    this.getKioskIDReport();
  }

  getKioskIDReport() {
    this.loader = true;
    this.parentList = [];
    this.spinner.show();
    const req = {
      'ParentName': this.searchName,
      'agencyID': this.commonService.getAgencyId(),
      'page': this.pageNo,
      'limit': this.limit
    };
    this.apiService.postData(AgencyAPIURLs.GetKioskeIDDetails, req, null).subscribe(res => {
      this.totalRecord = res.body.totalRows;
      if (res.body.statusCode === 200) {
        this.parentList = res.body.data;
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

  pdfReportForKioskID() {
    this.loader = true;
    this.spinner.show();
    const req = {
      'ParentName': this.searchName,
      'agencyID': this.commonService.getAgencyId()
    };
    this.apiService.postData(AgencyAPIURLs.PdfReportForKioskeIDDetails, req, null).subscribe(res => {
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
    console.log('data', this.parentList);
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
    this.getKioskIDReport();
  }


  search() {
    this.showClearBtn = true;
    this.getKioskIDReport();
  }

  clearSearch() {
    this.searchName = '';
    this.showClearBtn = false;
    this.getKioskIDReport();
  }


}
