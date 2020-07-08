import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AgencyApiService } from '../shared/services/agency-api-service/agency-api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from '../../../../shared/services/notification-service/notification.service';
import { CommonService } from '../../../../shared/services/common/common.service';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { AgencyAPIURLs } from '../shared/constatant';
import { ErrorHandlerService } from '../../../../shared/services/error-handler/error-handler.service';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { StripClintID } from 'src/app/shared/constdata';
import { TeacherAPIURLs } from 'src/app/layout/teacher/shared/constant';
declare var $: any;

@Component({
  selector: 'app-agency-admin-parent-ledger',
  templateUrl: './agency-admin-parent-ledger.component.html',
  styleUrls: ['./agency-admin-parent-ledger.component.css']
})

export class AgencyAdminParentLedgerComponent implements OnInit {
  transactionForm: FormGroup;
  authCode: any;
  showBtnCreateAcc = false;
  count = 0;
  pageNo = 0;
  limit = 10;
  totalRecord = 0;
  typeid = 0;
  loader = true;
  totalAmount: number;
  agencyId: number;
  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  subsidyDetailsID = 0;
  stripClintID: string;
  searchByParentName = '';
  fromDate: any;
  toDate: any;
  blankDate: any;
  reportList: any[] = [];
  studentReportList: any[] = [];
  videoPath = '';

  constructor(private activatedRoute: ActivatedRoute, private apiService: AgencyApiService, private error: ErrorHandlerService,
    private spinner: NgxSpinnerService, private notification: NotificationService,
    public commonService: CommonService, private fb: FormBuilder,
    private confirmationService: ConfirmationService, private router: Router) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.authCode = params['code'];
    });
    this.agencyId = this.commonService.getAgencyId();
    this.stripClintID = StripClintID.ClientID;
  }

  ngOnInit() {
    this.dpConfig = Object.assign({}, { containerClass: 'theme-dark-blue' }, { showWeekNumbers: false });
    this.searchByParentName = '';
    this.getLedgerReport();
    this.getPaymentDetails();
    this.getSectionVideo();
  }

  OpenInfoVideo(data) {
    $('#infovideo').modal('show');
  }

  getSectionVideo() {
    const req = {
      'SectionID': 17
    };
    this.apiService.postData(TeacherAPIURLs.GetVideoForSection, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.videoPath = res.body.filePath;
        console.log(this.videoPath, 'bbbbbbbbbbbbbbb');
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


  PauseInfoVideo() {
    const myVideo: any = document.getElementById('pausevideo');
      myVideo.pause();
      myVideo.currentTime = 0;
  }

  // Methode for get Parent Ledger
  getLedgerReport() {
    this.loader = true;
    this.reportList = [];
    this.spinner.show();
    const data = {
      'agencyID': this.commonService.getAgencyId(),
      'ParentName': this.searchByParentName,
      'page': this.pageNo,
      'limit': this.limit,
      'fromDate': this.fromDate ? this.fromDate : this.blankDate,
      'toDate': this.toDate ? this.toDate : this.blankDate,
    };
    this.apiService.postData(AgencyAPIURLs.GetParentLedger, data, null).subscribe(res => {
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
      this.error.commonError(err);
    });
  }

  getPaymentDetails() {
    const model = {
      'agencyID': this.commonService.getAgencyId()
    };
    this.apiService.postData(AgencyAPIURLs.GetStripeDetailsForAgency, model, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        if (res.body.data === [] || res.body.data === null || res.body.data.length === 0) {
          this.showBtnCreateAcc = true;
          if (this.authCode) {
            this.confirm();
          }
        } else {
          this.showBtnCreateAcc = false;
        }
      } else {
        this.error.unknownError();
      }
    }, err => {
      this.error.commonError(err);
    }
    );
  }

  confirm() {
    this.spinner.show();
    const model = {
      'code': this.authCode,
      'agencyID': this.commonService.getAgencyId(),
      'currentUserId': this.commonService.getReleventUserId('userdetails')
    };
    this.apiService.postData(AgencyAPIURLs.CreateStripeAccount, model, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.showBtnCreateAcc = false;
        this.notification.success({ message: 'Strip account has been created successfully!', title: '' });
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

  onTabPaymentLedger(event) {
    this.searchByParentName = '';
    this.totalRecord = 0;
    this.pageNo = 0;
    this.searchByParentName = '';
    this.getLedgerReport();
  }

  keyDownFunction(event, no) {
    if (event.keyCode === 13) {
      if (no === 1) {
        this.getLedgerReport();
      }
    }
  }
}



