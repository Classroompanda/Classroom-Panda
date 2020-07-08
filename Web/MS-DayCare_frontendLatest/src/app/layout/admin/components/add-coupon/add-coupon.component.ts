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
import { AdminAPIURLs } from '../../shared/constant';
declare var $: any;

@Component({
  selector: 'app-add-coupon',
  templateUrl: './add-coupon.component.html',
  styleUrls: ['./add-coupon.component.css']
})
export class AddCouponComponent implements OnInit {
  couponForm: FormGroup;
  couponList: any[];
  constructor(private apiService: AdminApiService, private error: ErrorHandlerService,
    private spinner: NgxSpinnerService, private notification: NotificationService,
    public commonService: CommonService, private fb: FormBuilder, private route: ActivatedRoute,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.couponList = [];
    this.createCouponForm();
    this.getCoupon();
  }

  createCouponForm() {
    this.couponForm = this.fb.group({
      couponname: ['', Validators.required],
      discount: ['', Validators.required],
    });
  }

  get t() { return this.couponForm.controls; }

  getCoupon() {
    const req = {
      'isActive': true,
    };
    this.apiService.postData(ParentAPIURLs.GetCoupons, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.couponList = res.body.data;
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


  // Save Coupon
  saveCoupon() {
    if (this.couponForm.valid) {
      const data = {
        'id': 0,
        'createdBy': this.commonService.getLoggedInUserId(),
        'CouponName': this.couponForm.value.couponname,
        'Discount':  this.couponForm.value.discount,
      };
      this.apiService.postData(ParentAPIURLs.SaveCoupon, data, null).subscribe(res => {
        if (res.body.statusCode === 200) {
          $('.addcoupon').modal('hide');
          //this.spinner.hide();
          this.notification.success({ message: 'Coupon Added successfully', title: '' });
          this.getCoupon();
        } else if (res.body.statusCode === 206) {
          this.spinner.hide();
          this.notification.warning({ message: 'Coupon already exists with same name.', title: '' });
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
      this.commonService.validateAllFields(this.couponForm);
    }
  }


  clearCouponForm() {
    this.createCouponForm();
  }

   // Method to delete/deactivate Coupon
 deactivateCoupon(value) {
  this.confirmationService.confirm({
    message: 'Do you want to deactivate this Coupon?',
    accept: () => {
      this.spinner.show();
      const req = {
        'Id': value.id,
        'IsDeleted': true,
        'DeletedBy': this.commonService.getReleventUserId('userdetails'),
      };
      this.apiService.postData(ParentAPIURLs.ActivateDeactivateCoupon, req, null).subscribe(res => {
        if (res.body.statusCode === 200) {
          //this.spinner.hide();
          this.notification.success({ message: 'This Coupon has been deactivated', title: '' });
          this.getCoupon();
        } else {
          this.spinner.hide();
          this.error.unknownError();
        }
      }, err => {
        this.spinner.hide();
        this.error.commonError(err);
      });
    }
  });
}


// Method to ActivateAuth Coupon
activateCoupon(value) {
  this.confirmationService.confirm({
    message: 'Do you want to activate this Coupon?',
    accept: () => {
      this.spinner.show();
      const req = {
        'Id': value.id,
        'IsDeleted': false,
        'UpdatedBy': this.commonService.getReleventUserId('userdetails'),
      };
      this.apiService.postData(ParentAPIURLs.ActivateDeactivateCoupon, req, null).subscribe(res => {
        if (res.body.statusCode === 200) {
          //this.spinner.hide();
          this.notification.success({ message: 'This Coupon has been activated', title: '' });
          this.getCoupon();
        } else {
          this.spinner.hide();
          this.error.unknownError();
        }
      }, err => {
        this.spinner.hide();
        this.error.commonError(err);
      });
    }
  });
}

}

