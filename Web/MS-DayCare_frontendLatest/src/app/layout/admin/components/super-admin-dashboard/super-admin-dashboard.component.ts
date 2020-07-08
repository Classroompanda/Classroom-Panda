import { Component, OnInit } from '@angular/core';
import { AdminApiService } from '../../shared/services/admin-api.service';
import { NotificationService } from 'src/app/shared/services/notification-service/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder } from '@angular/forms';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler/error-handler.service';
import { AdminAPIURLs } from '../../shared/constant';

@Component({
  selector: 'app-super-admin-dashboard',
  templateUrl: './super-admin-dashboard.component.html',
  styleUrls: ['./super-admin-dashboard.component.css']
})
export class SuperAdminDashboardComponent implements OnInit {

  totalRecord = 0;
  agencyPlanList: any[] = [];
  countList: any[] = [];
  pageNo = 0;
  limit = 10;
  loader = true;
  approvedAgencyCount = 0;
  subscriptionActiveAgencyCount = 0;
  unApprovedAgencyCount = 0;
  nameSearch = '';
  constructor(private apiService: AdminApiService, private error: ErrorHandlerService,
    private spinner: NgxSpinnerService, private notification: NotificationService,
    public commonService: CommonService, private fb: FormBuilder, private route: ActivatedRoute,
    private confirmationService: ConfirmationService) { }
  ngOnInit() {
    this.getAllAgencyPlanDetailsList();
    this.getCount();
  }

  getAllAgencyPlanDetailsList() {
    this.loader = true;
     this.spinner.show();
    this.agencyPlanList = [];
    this.countList = [];

    const req = {
      'limit': this.limit,
      'page': this.pageNo,
      'AgencyName': this.nameSearch
    };
    this.apiService.postData(AdminAPIURLs.GetAllAgencyPlanDetails, req, null).subscribe(res => {
      this.totalRecord = res.body.totalRows;
      if (res.body.statusCode === 200) {
        this.totalRecord = res.body.totalRows;
        this.agencyPlanList = res.body.data;
        this.loader = false;
        this.spinner.hide();
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

  getCount() {
    this.spinner.show();
    this.countList = [];

    const req = {
      'limit': this.limit,
      'page': this.pageNo
    };
    this.apiService.postData(AdminAPIURLs.GetCountDetailsForSuperAdmin, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.countList = res.body.data;
        this.approvedAgencyCount = res.body.data.approvedAgencyCount;
        this.unApprovedAgencyCount = res.body.data.unApprovedAgencyCount;
        this.subscriptionActiveAgencyCount = res.body.data.subscriptionActiveAgencyCount;
        this.spinner.hide();
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

  paginate(event) {
    this.pageNo = event.page;
    // this.limit = event.page;
    this.getAllAgencyPlanDetailsList();
  }

  keyDownFunction(event) {
    if (event.keyCode === 13) {
      this.getAllAgencyPlanDetailsList();
    }
  }
}
