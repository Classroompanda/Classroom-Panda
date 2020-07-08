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
  selector: 'app-agency-admin-bus-report',
  templateUrl: './agency-admin-bus-report.component.html',
  styleUrls: ['./agency-admin-bus-report.component.css']
})
export class AgencyAdminBusReportComponent implements OnInit {
  studentList = [];
  loader = true;
  pageNo = 0;
  limit = 10;
  totalRecord = 0;
  showClearBtn = false;
  searchByBus = 0;
  busList: any[] = [];
  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  constructor(private apiService: AgencyApiService, private error: ErrorHandlerService,
    private spinner: NgxSpinnerService, private notification: NotificationService,
    private commonService: CommonService) { }

  ngOnInit() {
    this.dpConfig = Object.assign({}, { containerClass: 'theme-dark-blue' }, { showWeekNumbers: false }
    );
    this.getBusReport();
    this.getAllBusList();
  }

  getBusReport() {
    this.loader = true;
    this.studentList = [];
    this.spinner.show();
    const req = {
      'agencyID': this.commonService.getAgencyId(),
      'page': this.pageNo,
      'limit': this.limit,
      'BusIDReq': this.searchByBus
    };
    this.apiService.postData(AgencyAPIURLs.GetBusReport, req, null).subscribe(res => {
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

  pdfReportForBus() {
    this.loader = true;
    this.spinner.show();
    const req = {
      'agencyID': this.commonService.getAgencyId(),
      'BusIDReq': this.searchByBus
    };
    this.apiService.postData(AgencyAPIURLs.PdfReportForBus, req, null).subscribe(res => {
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

  paginate(event) {
    this.pageNo = event.page;
    this.getBusReport();
  }


  search() {
    this.showClearBtn = true;
    this.getBusReport();
  }

  clearSearch() {
    this.searchByBus = 0;
     this.showClearBtn = false;
     this.getBusReport();
  }

    // For Get School Bus
    getAllBusList() {
      this.busList = [];
      const data = {
        'agencyID': this.commonService.getAgencyId()
      };
      this.apiService.postData(AgencyAPIURLs.GetAllBus, data, null).subscribe(res => {
        if (res.body.statusCode === 200) {
          this.busList = res.body.data;
        } else {
          this.spinner.hide();
          this.error.unknownError();
        }
      }, err => {
        this.spinner.hide();
        this.error.commonError(err);
      }
      );
    }

}
