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
  selector: 'app-agency-admin-bus',
  templateUrl: './agency-admin-bus.component.html',
  styleUrls: ['./agency-admin-bus.component.css']
})
export class AgencyAdminBusComponent implements OnInit {
  busForm: FormGroup;
  busList: any[] = [];
  constructor(private error: ErrorHandlerService, private apiService: AgencyApiService,
    private spinner: NgxSpinnerService, private notification: NotificationService,
    public commonService: CommonService, private fb: FormBuilder, private route: ActivatedRoute,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.createBusForm();
    this.getAllBusList();
  }

  createBusForm() {
    this.busForm = this.fb.group({
      busname: ['', Validators.required]
    });
  }


  get t() { return this.busForm.controls; }

  getAllBusList() {
    this.busList = [];
    const data = {
      'agencyID': this.commonService.getAgencyId()
    };
    this.apiService.postData(AgencyAPIURLs.GetAllBus, data, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.busList = res.body.data;
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


  // Save Bus Name
  saveBusName() {
    if (this.busForm.valid) {
      const data = {
        'id': 0,
        'agencyID': this.commonService.getAgencyId(),
        'BusName': this.busForm.value.busname,
        'createdBy': this.commonService.getAgencyId()
      };
      this.apiService.postData(AgencyAPIURLs.SaveAllBus, data, null).subscribe(res => {
        if (res.body.statusCode === 200) {
          $('.addallergytype').modal('hide');
          this.spinner.hide();
          this.notification.success({ message: 'Bus Added successfully', title: '' });
          this.getAllBusList();
        } else if (res.body.statusCode === 206) {
          this.spinner.hide();
          this.notification.warning({ message: 'Bus already exists with same name.', title: '' });
        } else {
          this.spinner.hide();
          this.error.unknownError();
        }
      }, err => {
        this.spinner.hide();
        this.error.commonError(err);
      });
    } else {
      this.spinner.hide();
      this.commonService.validateAllFields(this.busForm);
    }
  }

// Delete Bus Name

deleteBus(value) {
  this.confirmationService.confirm({
    message: 'Do you want to delete this Bus?',
    accept: () => {
      this.spinner.show();
      value.IsDeleted = true;
      value.DeletedDate = new Date();
      value.DeletedBy = this.commonService.getReleventUserId('userdetails');
      this.apiService.postData(AgencyAPIURLs.SaveAllBus, value, null).subscribe(res => {
        if (res.body.statusCode === 200) {
          this.notification.success({ message: 'This Bus has been deleted', title: '' });
          this.getAllBusList();
        } else if (res.body.statusCode === 986) {
          this.spinner.hide();
          this.notification.warning({ message: res.body.message, title: '' });
        } else {
          this.spinner.hide();
          this.notification.warning({ message: res.body.message, title: '' });
        }
      }, err => {
        this.spinner.hide();
        this.error.commonError(err);
      });
    }
  });
}


  clearBusForm() {
    this.createBusForm();
  }



}


