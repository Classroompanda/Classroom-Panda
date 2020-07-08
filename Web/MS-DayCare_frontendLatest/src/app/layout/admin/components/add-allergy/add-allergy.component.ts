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
  selector: 'app-add-allergy',
  templateUrl: './add-allergy.component.html',
  styleUrls: ['./add-allergy.component.css']
})
export class AddAllergyComponent implements OnInit {
  allergyForm: FormGroup;
  allergyTypeForm: FormGroup;
  allergyReactionForm: FormGroup;
  allergyList: any[];
  allergyTypeList: any[];
  allergyReactionList: any[];
  constructor(private apiService: AdminApiService, private error: ErrorHandlerService,
    private spinner: NgxSpinnerService, private notification: NotificationService,
    public commonService: CommonService, private fb: FormBuilder, private route: ActivatedRoute,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.allergyList = [];
    this.allergyTypeList = [];
    this.allergyReactionList = [];
    this.createAllergyForm();
    this.createAllergyReactionForm();
    this.createAllergyTypeForm();
    this.getAllergyType();
  }

  createAllergyForm() {
    this.allergyForm = this.fb.group({
      allergytype: ['', Validators.required],
      allergyname: ['', Validators.required]
    });
  }

  createAllergyTypeForm() {
    this.allergyTypeForm = this.fb.group({
      allergytype: ['', Validators.required]
    });
  }

  createAllergyReactionForm() {
    this.allergyReactionForm = this.fb.group({
      allergytype: ['', Validators.required],
      allergyreactionname: ['', Validators.required]
    });
  }

  get a() { return this.allergyForm.controls; }
  get t() { return this.allergyTypeForm.controls; }
  get r() { return this.allergyReactionForm.controls; }

  getAllergyType() {
    const req = {
      'isDeleted': false,
    };
    this.apiService.postData(ParentAPIURLs.GetAllergyType, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.allergyTypeList = res.body.data;
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


  getAllergyName() {
    const req = {
      'isDeleted': false,
    };

    this.apiService.postData(ParentAPIURLs.GetAllergyName, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.allergyList = res.body.data;
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

  getAllergyReactionType() {
    const req = {
      'isDeleted': false,
    };

    this.apiService.postData(ParentAPIURLs.GetAllergyReactionType, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.allergyReactionList = res.body.data;
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



  // Save Allergy
  saveAllergy() {
    if (this.allergyForm.valid) {
        const data = {
          'id': 0,
          'AllergyTypeID': this.allergyForm.value.allergytype,
          'NameOfAllergy': this.allergyForm.value.allergyname,
          'createdBy': this.commonService.getLoggedInUserId()
        };
        this.apiService.postData(ParentAPIURLs.SaveAllergyName, data, null).subscribe(res => {
          if (res.body.statusCode === 200) {
            $('.addallergy').modal('hide');
            this.spinner.hide();
            this.notification.success({ message: 'Allergy Added successfully', title: '' });
            this.getAllergyName();
          } else if (res.body.statusCode === 206) {
            this.spinner.hide();
            this.notification.warning({ message: 'Allergy already exists with same name.', title: '' });
            this.getAllergyName();
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
      this.commonService.validateAllFields(this.allergyForm);
    }
  }

  // Save Allergy Type
  saveAllergyType() {
    if (this.allergyTypeForm.valid) {
        const data = {
          'id': 0,
          'AllergyTypeName': this.allergyTypeForm.value.allergytype,
          'createdBy': this.commonService.getLoggedInUserId()
        };
        this.apiService.postData(ParentAPIURLs.SaveAllergyType, data, null).subscribe(res => {
          if (res.body.statusCode === 200) {
            $('.addallergytype').modal('hide');
            this.spinner.hide();
            this.notification.success({ message: 'Allergy type Added successfully', title: '' });
            this.getAllergyType();
          } else if (res.body.statusCode === 206) {
            this.spinner.hide();
            this.notification.warning({ message: 'Allergy type already exists with same name.', title: '' });
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
      this.commonService.validateAllFields(this.allergyTypeForm);
    }
  }

  // Save Allergy Reaction Type
  saveAllergyReaction() {
    if (this.allergyReactionForm.valid) {
        const data = {
          'id': 0,
          'AllergyTypeID': this.allergyReactionForm.value.allergytype,
          'AllergyReactionTypeName': this.allergyReactionForm.value.allergyreactionname,
          'createdBy': this.commonService.getLoggedInUserId()
        };
        this.apiService.postData(ParentAPIURLs.SaveAllergyReactionType, data, null).subscribe(res => {
          if (res.body.statusCode === 200) {
            $('.addallergyreaction').modal('hide');
            this.spinner.hide();
            this.notification.success({ message: 'Allergy Reaction Added successfully', title: '' });
            this.getAllergyReactionType();
          } else if (res.body.statusCode === 206) {
            this.spinner.hide();
            this.notification.warning({ message: 'Allergy reaction already exists with same name.', title: '' });
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
      this.commonService.validateAllFields(this.allergyReactionForm);
    }
  }



  clearAllergyForm() {
    this.createAllergyForm();
  }

  clearAllergyTypeForm() {
    this.createAllergyTypeForm();
  }
  clearAllergyReactionForm() {
    this.createAllergyReactionForm();
  }


}
