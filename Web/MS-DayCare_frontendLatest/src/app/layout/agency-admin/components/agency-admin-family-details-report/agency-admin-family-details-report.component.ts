import { Component, OnInit } from '@angular/core';
import { AgencyApiService } from '../shared/services/agency-api-service/agency-api.service';
import { ErrorHandlerService } from '../../../../shared/services/error-handler/error-handler.service';
import { NotificationService } from '../../../../shared/services/notification-service/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from '../../../../shared/services/common/common.service';
import { AgencyAPIURLs } from '../shared/constatant';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-agency-admin-family-details-report',
  templateUrl: './agency-admin-family-details-report.component.html',
  styleUrls: ['./agency-admin-family-details-report.component.css']
})
export class AgencyAdminFamilyDetailsReportComponent implements OnInit {
  reportList: any [] = [];
pageNo = 0;
limit = 10;
totalRecord = 0;
searchByStudentName = '';
loader = true;
showClearBtn = false;
  constructor(private apiService: AgencyApiService, private error: ErrorHandlerService,
    private spinner: NgxSpinnerService,
    private commonService: CommonService) { }

  ngOnInit() {
    this.getFamilyDetails();
  }

  getFamilyDetails () {
    this.loader = true;
    this.reportList = [];
    this.spinner.show();
    const data = {
      'agencyID': this.commonService.getAgencyId(),
      'studentName': this.searchByStudentName,
      'page': this.pageNo,
      'limit': this.limit
    };

    this.apiService.postData(AgencyAPIURLs.GetFamilyDetailsReport, data, null).subscribe(res => {
      this.totalRecord = res.body.totalRows;
      if (res.body.statusCode === 200) {
        this.spinner.hide();
        this.reportList = res.body.data;
      } else {
        this.spinner.hide();
        this.error.unknownError();
      }
      this.loader = false;
    }, err => {
      this.spinner.hide();
      this.error.commonError (err);
    } );
  }

  paginate(event) {
    this.pageNo = event.page;
    this.getFamilyDetails();
  }

  clearSearch() {
    this.searchByStudentName =  '';
     this.showClearBtn = false;
     this.getFamilyDetails();
  }

  pdfReportForFamilydetails() {
    this.loader = true;
    this.spinner.show();
   const req = {
     'StudentName': this.searchByStudentName,
     'agencyID': this.commonService.getAgencyId()
   };
   this.apiService.postData(AgencyAPIURLs.PdfReportForFamily, req, null).subscribe(res => {
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

  pdfReportForFamilyDetailsStudentId(data, type) {
    this.loader = true;
    this.spinner.show();
   const req = {
    'agencyID': this.commonService.getAgencyId(),
    'studentId': data.studentID
   };
   this.apiService.postData(AgencyAPIURLs.PDFFamilyDetailsReportByStudentID, req, null).subscribe(res => {
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

  search() {
    this.showClearBtn = true;
    this.getFamilyDetails();
  }


}
