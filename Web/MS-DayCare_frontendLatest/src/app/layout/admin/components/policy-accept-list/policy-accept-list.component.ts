import { Component, OnInit } from '@angular/core';
import { AdminApiService } from '../../shared/services/admin-api.service';
import { ErrorHandlerService } from '../../../../shared/services/error-handler/error-handler.service';
import { NotificationService } from '../../../../shared/services/notification-service/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from '../../../../shared/services/common/common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { AdminAPIURLs } from '../../shared/constant';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
declare var $: any;

@Component({
  selector: 'app-policy-accept-list',
  templateUrl: './policy-accept-list.component.html',
  styleUrls: ['./policy-accept-list.component.css']
})
export class PolicyAcceptListComponent implements OnInit {
  agencyList: any[] = [];
  ParentDataForCsv = [];
  csvFileNameForParent = 'AgencyList';
  isDownloading: boolean;
  csvOptionsForAgency = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: false,
    headers: [
      'AgencyName',
      'OwnerName',
      'TimeOfRegistration'
    ],
    showTitle: false,
    title: [
      'AgencyName',
      'OwnerName',
      'TimeOfRegistration'
    ],
    useBom: false,
    removeNewLines: true,
    keys: [
      'AgencyName',
      'OwnerName',
      'TimeOfRegistration'
    ],
  };

  constructor(private apiService: AdminApiService, private error: ErrorHandlerService,
    private spinner: NgxSpinnerService, private notification: NotificationService,
    public commonService: CommonService, private fb: FormBuilder, private route: ActivatedRoute,
    private confirmationService: ConfirmationService) { }
  ngOnInit() {
    this.getAllAgencyList();
  }

  getAllAgencyList() {
    this.agencyList = [];
    const req = {
      'limit': 0,
      'page': 0,
      'status': 1,
      'AgencyName': ''
    };
    this.apiService.postData(AdminAPIURLs.GetAllAgencyDetails, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.agencyList = res.body.data;
      } else {
        this.error.unknownError();
      }
    }, err => {
      this.error.commonError(err);
    }
    );
  }


  generateAgencyCsvFile() {
    const csvArrayForParent = [];
    this.agencyList.forEach(element => {
      csvArrayForParent.push({
        AgencyName: element.agencyName,
        OwnerName: element.ownerName,
        TimeOfRegistration: element.policyEULAAcceptDate
      });
    });
    this.ParentDataForCsv = csvArrayForParent;
    // tslint:disable-next-line: no-unused-expression
    new Angular2Csv(this.ParentDataForCsv, this.csvFileNameForParent, this.csvOptionsForAgency);
    this.isDownloading = false;
  }

}

