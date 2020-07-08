import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AgencyApiService } from '../../../agency-admin/components/shared/services/agency-api-service/agency-api.service';
import { ErrorHandlerService } from '../../../../shared/services/error-handler/error-handler.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from '../../../../shared/services/notification-service/notification.service';
import { CommonService } from '../../../../shared/services/common/common.service';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { AgencyAPIURLs } from '../shared/constatant';
declare var $: any;

@Component({
  selector: 'app-agency-admin-food-list',
  templateUrl: './agency-admin-food-list.component.html',
  styleUrls: ['./agency-admin-food-list.component.css']
})
export class AgencyAdminFoodListComponent implements OnInit {
  foodList: any[] = [];
  constructor(private error: ErrorHandlerService, private apiService: AgencyApiService,
    private spinner: NgxSpinnerService, private notification: NotificationService,
    public commonService: CommonService, private fb: FormBuilder, private route: ActivatedRoute,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.getAllFoodList();
  }

  getAllFoodList() {
    this.foodList = [];
    const data = {
      'agencyID': this.commonService.getAgencyId()
    };
    this.apiService.postData(AgencyAPIURLs.GetMealItemInformation, data, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.foodList = res.body.data;
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


}



