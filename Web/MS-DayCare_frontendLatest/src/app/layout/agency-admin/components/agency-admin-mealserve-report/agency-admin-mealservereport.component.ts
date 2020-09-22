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
  selector: 'app-agency-admin-mealservereport',
  templateUrl: './agency-admin-mealservereport.component.html',
  styleUrls: ['./agency-admin-mealservereport.component.css']
})
export class AgencyAdminMealServereportComponent implements OnInit {
  searchByStudentName = '';
  studentList = [];
  loader = true;
  pageNo = 0;
  limit = 10;
  totalRecord = 0;
  minDate: any;
  blankDate: any;
  searchMonth = 0;
  searchYear = 0;
  searchByClass = '';
  classList: any[] = [];
  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();

  constructor(private apiService: AgencyApiService, private error: ErrorHandlerService,
    private spinner: NgxSpinnerService, private notification: NotificationService,
    private commonService: CommonService) { }

  ngOnInit() {
    this.dpConfig = Object.assign({}, { containerClass: 'theme-dark-blue' }, { showWeekNumbers: false }
    );
    this.getAllClassess();
  }

  getAllClassess() {
    this.classList = [];
    this.spinner.show();
    const data = {
      'agencyID': this.commonService.getAgencyId()
    };
    this.apiService.postData(AgencyAPIURLs.GetAllClasses, data, null).subscribe(res => {
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

  
  
  search() {
   
  }

  pdfmealserveReport() {
    if(this.searchMonth == 0 || this.searchMonth == null)
    {
      this.notification.warning({ message: 'Please select Month', title: '' });
      return;
    }
    
    if(this.searchYear == 0 || this.searchYear == null)
    {
      this.notification.warning({ message: 'Please select Year', title: '' });
      return;
    }
    if(!(this.searchMonth == 0 || this.searchMonth == null && this.searchYear == 0 || this.searchYear == null))
    {
      this.loader = true;
      this.spinner.show();
      const req = {
        'StudentName': this.searchByStudentName,
        'agencyID': this.commonService.getAgencyId(),      
        'month': this.searchMonth,
        'ClassesIDReq': this.searchByClass,
        'year': this.searchYear
      };
      this.apiService.postData(AgencyAPIURLs.GetMealServeReportPDF, req, null).subscribe(res => {
        if (res.body.statusCode === 200) {
          this.searchMonth = 0;
          this.searchYear = 0;
          this.searchByClass = '';
          const filename = environment.baseUrl + res.body.fileName;
          const name = res.body.fileName;
          window.open(filename);
          setTimeout(() => {
            this.deletePdFFromServer(name);
          }, 5000);
        } else {
          this.notification.warning({ message: 'No Record Found', title: '' });         
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
  
}
