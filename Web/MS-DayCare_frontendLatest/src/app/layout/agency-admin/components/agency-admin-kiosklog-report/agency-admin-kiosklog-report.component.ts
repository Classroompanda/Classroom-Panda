import { Component, OnInit } from '@angular/core';
import { AgencyApiService } from '../shared/services/agency-api-service/agency-api.service';
import { ErrorHandlerService } from '../../../../shared/services/error-handler/error-handler.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from '../../../../shared/services/notification-service/notification.service';
import { CommonService } from '../../../../shared/services/common/common.service';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { AgencyAPIURLs } from '../shared/constatant';
import {environment} from '../../../../../environments/environment';
import { ConfirmationService } from 'primeng/api';
declare var $: any;
@Component({
  selector: 'app-agency-admin-kiosklog-report',
  templateUrl: './agency-admin-kiosklog-report.component.html',
  styleUrls: ['./agency-admin-kiosklog-report.component.css']
})
export class AgencyAdminKiosklogReportComponent implements OnInit {
  reportList: any [] = [];
pageNo = 0;
limit = 10;
totalRecord = 0;
searchByStudentName = '';
loader = true;
fromDate: any;
toDate: any;
blankDate: any;
showClearBtn = false;
updateTimeTitle: string;
timetoUpdate = new Date();
isCheckInTime: boolean;
recordId = 0;
studentId = 0;

  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  constructor(private apiService: AgencyApiService, private error: ErrorHandlerService,
    private spinner: NgxSpinnerService, private notification: NotificationService,
    private commonService: CommonService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.dpConfig = Object.assign({}, { containerClass: 'theme-dark-blue' }, { showWeekNumbers: false }
  );

    this.getKioskDetails();
  }



  getKioskDetails () {
    this.loader = true;
    this.reportList = [];
    this.spinner.show();
    const data = {
      'agencyID': this.commonService.getAgencyId(),
      'studentName': this.searchByStudentName,
      'page': this.pageNo,
      'limit': this.limit,
      'fromDate': this.fromDate ? this.fromDate : this.blankDate,
      'toDate': this.toDate ? this.toDate : this.blankDate
    };

    this.apiService.postData(AgencyAPIURLs.GetKioskDetails, data, null).subscribe(res => {
      this.totalRecord = res.body.totalRows;
      if (res.body.statusCode === 200) {
        this.spinner.hide();
        res.body.data.forEach(element => {
          if (element.checkOutTime !== '0001-01-01T00:00:00') {
            element.checkOutTime = this.commonService.getLocalDateTimeFromUTC(element.checkOutTime);
          } else if (element.checkInTime !== '0001-01-01T00:00:00') {
            element.checkInTime = this.commonService.getLocalDateTimeFromUTC(element.checkInTime);
          } else {
            // do nothing
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
      this.error.commonError (err);
    } );
  }

  paginate(event) {
    this.pageNo = event.page;
    this.getKioskDetails();
  }


  pdfReportForClassAttendence() {
    this.loader = true;
    this.spinner.show();
   const req = {
     'StudentName': this.searchByStudentName,
     'agencyID': this.commonService.getAgencyId()
   };
   this.apiService.postData(AgencyAPIURLs.PdfReportForkioskeDetails, req, null).subscribe(res => {
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

  search() {
    this.pageNo = 0;
    this.showClearBtn = true;
    this.getKioskDetails();
  }

  clearSearch() {
    this.searchByStudentName =  '';
    this.fromDate = null;
    this.toDate = null;
     this.showClearBtn = false;
     this.getKioskDetails();
  }



  getDetailsToUpdateTime(data) {
    this.recordId = data.id;
    this.studentId = data.studentID;
    if (data.checkOutTime !== '0001-01-01T00:00:00') {
      this.isCheckInTime = false;
      this.updateTimeTitle = 'Update Check-Out Time';
    } else {
      this.isCheckInTime = true;
      this.updateTimeTitle = 'Update Check-In Time';
    }
    $('.timeupdate').modal('show');
  }




  UpdateClockeOutTime() {
     $('.timeupdate').modal('hide');
     this.confirmationService.confirm({
       message: 'Do you want to update time?',
       accept: () => {
         this.loader = true;
         this.spinner.show();
         const data = {
           'agencyID': this.commonService.getAgencyId(),
           'id': this.recordId,
           'CheckInTime': this.timetoUpdate,
           'CheckOutTime': this.timetoUpdate,
           'IsCheckInTime': this.isCheckInTime,
           'StudentID': this.studentId,
           'UpdatedBy': this.commonService.getLoggedInUserId()
         };
         this.apiService.postData(AgencyAPIURLs.UpdateStudentKioskeTime, data, null).subscribe(res => {
           if (res.body.statusCode === 200) {
             $('.timeupdate').modal('hide');
             this.notification.success({message: 'Time Updated Successfully', title: ''});
             this.getKioskDetails();
           } else {
             this.spinner.hide();
             this.notification.warning({message: res.body.message, title: ''});
           }
           this.loader = false;
         }, err => {
           this.spinner.hide();
           this.error.commonError(err);
         });
       },
       reject: () => {
         $('.timeupdate').modal('show');
       }
   });
   }

}
