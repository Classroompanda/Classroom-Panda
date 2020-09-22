import { Component, OnInit, Renderer } from '@angular/core';
import { AdminAPIURLs } from '../../../admin/shared/constant';
import {AdminStripKey} from '../../../../shared/constdata';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ErrorHandlerService } from '../../../../shared/services/error-handler/error-handler.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from '../../../../shared/services/notification-service/notification.service';
import { CommonService } from '../../../../shared/services/common/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { AgencyApiService } from '../shared/services/agency-api-service/agency-api.service';
declare var $: any;

@Component({
  selector: 'app-agency-admin-plan-page',
  templateUrl: './agency-admin-plan-page.component.html',
  styleUrls: ['./agency-admin-plan-page.component.css']
})
export class AgencyAdminPlanPageComponent implements OnInit {
  pricingPlanList: any[] = [];
  planForm: FormGroup;
  planId = 0;
  globalListener: any;
  emailid: any;
  constructor(private apiService: AgencyApiService, private error: ErrorHandlerService,
    private spinner: NgxSpinnerService, private notification: NotificationService,
    public commonService: CommonService, private fb: FormBuilder, private route: ActivatedRoute,
    private confirmationService: ConfirmationService, private renderer: Renderer, private router: Router) { }
  ngOnInit() {
    this.getAllPricingPlan();
    this.createPlanForm();
  }


  getAllPricingPlan() {
    this.spinner.show();
    this.pricingPlanList = [];
    const req = {
      'limit': 0,
      'page': 0,
      'agencyID': this.commonService.getAgencyId(),
    };
    this.apiService.postData(AdminAPIURLs.GetAllPricingPlanDetails, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.pricingPlanList = res.body.data;
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

  createPlanForm() {
    this.planForm = this.fb.group({
      agencyid: ['', Validators.required],
    });
  }


  getPlanDetails(plan) {
    this.createPlanForm();
    this.planId = plan.id;
  }

  get f() { return this.planForm.controls; }


  subscribePlan() {
    this.spinner.show();
    if (this.planForm.valid) {
      const req = {
        'id': 0,
        'agencyID': this.planForm.value.agencyid,
        'planID': this.planId,
        'isOffline': true,
        'createdBy': 1
      };
      this.apiService.postData(AdminAPIURLs.SaveSubscriptionInformation, req, null).subscribe(res => {
        if (res.body.statusCode === 200) {
          $('.addplan').modal('hide');
          this.notification.success({ message: 'Subscription done', title: '' });
          this.spinner.hide();
        } else {
          this.error.unknownError();
        }
      }, err => {
        this.error.commonError(err);
      }
      );
    } else {
      this.spinner.hide();
      this.commonService.validateAllFields(this.planForm);
    }
  }



  openCheckout( value) {
    const amounttopay = value.planPrice;
    const handler = (<any>window).StripeCheckout.configure({
      key: AdminStripKey.publishableKey,
      locale: 'auto',
      token: token => {
        this.spinner.show();
        console.log(token);
        const model = {
          'agencyID': this.commonService.getAgencyId(),
          'SourceToken': token.id,
          'CreatedBy': this.commonService.getReleventUserId('userdetails'),
          'IsOffline': false,
          'PlanID': value.id
        };
        console.log(model);
        this.apiService.postData(AdminAPIURLs.SaveSubscriptionInformation, model, null).subscribe(result => {
          if (result.body.statusCode === 200) {
            this.spinner.hide();
            this.notification.success({ message: 'Subscription Successfull!', title: '' });
          $('.addplan').modal('show');
            console.log('data', result.body.data);
          } else if (result.body.statusCode === 205) {
            this.notification.warning({ message: 'Your previous subscription plan still active', title: '' });
            this.spinner.hide();
          } else {
            this.spinner.hide();
            this.error.unknownError();
            console.log('err');
          }
        }, err => {
          this.error.commonError(err);
          this.spinner.hide();
        }
        );
      }
    });
    handler.open({
      name: 'Classroom Panda',
      description: 'Child Day Care',
      amount: amounttopay * 100,
      email: this.commonService.getAgencyemailid(),
    });
    this.globalListener = this.renderer.listenGlobal('window', 'popstate', () => {
      handler.close();
    });
  }

  logout() {
    $('.addplan').modal('hide');
    localStorage.removeItem('isauthenticated');
    localStorage.removeItem('usertype');
    localStorage.removeItem('path');
    localStorage.removeItem('userdetails');
    localStorage.removeItem('imagepath');
    this.router.navigate(['/']);
  }




}
