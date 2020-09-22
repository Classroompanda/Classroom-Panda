import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AgencyApiService } from '../../../agency-admin/components/shared/services/agency-api-service/agency-api.service';
import { ErrorHandlerService } from '../../../../shared/services/error-handler/error-handler.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from '../../../../shared/services/notification-service/notification.service';
import { CommonService } from '../../../../shared/services/common/common.service';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { AdminApiService } from '../../shared/services/admin-api.service';
import { ParentAPIURLs } from 'src/app/layout/parent/shared/constant';
declare var $: any;

@Component({
  selector: 'app-add-dose',
  templateUrl: './add-dose.component.html',
  styleUrls: ['./add-dose.component.css']
})
export class AddDoseComponent implements OnInit {
  doseTypeForm: FormGroup;
  doseList: any[] = [];
  constructor(private apiService: AdminApiService, private error: ErrorHandlerService,
    private spinner: NgxSpinnerService, private notification: NotificationService,
    public commonService: CommonService, private fb: FormBuilder, private route: ActivatedRoute,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.createDoseForm();
    this.getAllDoseRepeat();
  }

  createDoseForm() {
    this.doseTypeForm = this.fb.group({
      dose: ['', Validators.required]
    });
  }


  get t() { return this.doseTypeForm.controls; }

  getAllDoseRepeat() {
    this.doseList = [];
    const data = {
      'agencyID': this.commonService.getAgencyId()
    };
    this.apiService.postData(ParentAPIURLs.GetAllDoseRepeat, data, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.doseList = res.body.data;
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


  // Save Allergy Type
  saveDoseType() {
    if (this.doseTypeForm.valid) {
      const data = {
        'id': 0,
        'agencyID': 4,
        'DoseRepeatName': this.doseTypeForm.value.dose,
        'createdBy': this.commonService.getLoggedInUserId()
      };
      this.apiService.postData(ParentAPIURLs.SaveAllDoseRepeat, data, null).subscribe(res => {
        if (res.body.statusCode === 200) {
          $('.addallergytype').modal('hide');
          this.spinner.hide();
          this.notification.success({ message: 'Dose type Added successfully', title: '' });
          this.getAllDoseRepeat();
        } else if (res.body.statusCode === 206) {
          this.spinner.hide();
          this.notification.warning({ message: 'Dose type already exists with same name.', title: '' });
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
      this.commonService.validateAllFields(this.doseTypeForm);
    }
  }


  cleardoseTypeForm() {
    this.createDoseForm();
  }



}

