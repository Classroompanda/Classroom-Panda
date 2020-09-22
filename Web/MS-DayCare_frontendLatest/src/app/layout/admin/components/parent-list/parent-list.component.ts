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
  selector: 'app-parent-list',
  templateUrl: './parent-list.component.html',
  styleUrls: ['./parent-list.component.css']
})
export class ParentListComponent implements OnInit {
  parentList: any[] = [];
  ParentDataForCsv = [];
  csvFileNameForParent = 'ProgramJoinParentList';
  isDownloading: boolean;
  csvOptionsForParent = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: false,
    headers: [
      'FirstName',
      'LastName',
      'Email'
    ],
    showTitle: false,
    title: [
      'FirstName',
      'LastName',
      'Email'
    ],
    useBom: false,
    removeNewLines: true,
    keys: [
      'FirstName',
      'LastName',
      'Email'
    ],
  };


  constructor(private apiService: AdminApiService, private error: ErrorHandlerService,
    private spinner: NgxSpinnerService, private notification: NotificationService,
    public commonService: CommonService, private fb: FormBuilder, private route: ActivatedRoute,
    private confirmationService: ConfirmationService) { }
  ngOnInit() {
    this.getAllParentList();
  }

  getAllParentList() {
    this.parentList = [];
    const req = {
      'AgencyID': 1,
    };
    this.apiService.postData(AdminAPIURLs.GetClassroomJoinParent, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.parentList = res.body.data;
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

  generateParentCsvFile() {
    const csvArrayForParent = [];
    this.parentList.forEach(element => {
      csvArrayForParent.push({
      FirstName: element.firstName,
      LastName: element.lastName,
      Email: element.email
      });
    });
    this.ParentDataForCsv = csvArrayForParent;
    // tslint:disable-next-line: no-unused-expression
    new Angular2Csv(this.ParentDataForCsv, this.csvFileNameForParent, this.csvOptionsForParent);
    this.isDownloading = false;
  }

}


