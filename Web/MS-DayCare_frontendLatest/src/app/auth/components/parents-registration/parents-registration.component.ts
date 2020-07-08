import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorHandlerService } from '../../../shared/services/error-handler/error-handler.service';
import { NotificationService } from '../../../shared/services/notification-service/notification.service';
import { CommonService } from '../../../shared/services/common/common.service';
import { AuthApiService } from '../../shared/services/auth-api-service/auth-api.service';
import { AuthAPIURls } from '../../shared/constant';
import { ActivatedRoute } from '@angular/router';
import { ParentDetailsVM } from '../../../layout/parent/shared/view-model/parent-detailsvm';
import { DatePipe } from '@angular/common';
import { ConfirmationService } from 'primeng/api';


@Component({
  selector: 'app-parents-registration',
  templateUrl: './parents-registration.component.html',
  styleUrls: ['./parents-registration.component.css'],
})
export class ParentsRegistrationComponent implements OnInit {
  resetForm: FormGroup;
  parentVM: ParentDetailsVM;
  id: number;
  showMessage: boolean;
  registrationForm: FormGroup;
  emailPattern = /^([\w-\.]+\u0040([\w-]+\.)+[\w-]{2,4})?$/;
  loader = true;
  agencyList: any[] = [];
  status = 1;
  totalRecord = 0;
  nameSearch = '';
  pageNo = 0;
  limit = 0;
  short: any;
  image: any;
  profileimage: any;
  linkedChildList: any[] = [];
  flag = false;


  constructor(private apiService: AuthApiService, private error: ErrorHandlerService, private confirmationService: ConfirmationService,
    private spinner: NgxSpinnerService, private notification: NotificationService, private datepipe: DatePipe,
    private commonService: CommonService, private fb: FormBuilder, private route: ActivatedRoute) {
  }


  ngOnInit() {
    console.log('sdf', this.commonService.getUserMail());
    this.validateRegistration();
    this.getAllAgency();
    this.parentVM = {};
    this.short = this.datepipe.transform(new Date(), 'dd-MM-yyyy hh:mm:ss');
  }

  validateRegistration() {
    this.registrationForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(3)]],
      lastname: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      agencyList: ['', [Validators.required]],
    });
  }
  public get f() { return this.registrationForm.controls; }

  getAllAgency() {
    this.spinner.show();
    this.agencyList = [];
    if (!this.registrationForm.valid) {
      const req = {
        'limit': this.limit,
        'page': this.pageNo,
        'status': this.status,
        'AgencyName': this.nameSearch,
      };
      this.apiService.postData(AuthAPIURls.GetAllAgencyList, req, null).subscribe(res => {
        this.totalRecord = res.body.totalRows;
        if (res.body.statusCode === 200) {
          this.spinner.hide();
          this.agencyList = res.body.data;
        } else {
          this.showMessage = false;
          this.spinner.hide();
          this.error.unknownError();
        }
      }, err => {
        this.spinner.hide();
        this.error.commonError(err);
      }
      );

    } else {
      this.spinner.hide();
      this.commonService.validateAllFields(this.registrationForm);
    }
  }


  registerParentProfile() {
    this.linkedChildList = [];
    if (this.registrationForm.valid) {
      this.spinner.show();
      this.parentVM.FirstName = this.registrationForm.value.firstname;
      this.parentVM.LastName = this.registrationForm.value.lastname;
      this.parentVM.EmailId = this.registrationForm.value.email;
      this.parentVM.isParent = true;
      this.parentVM.AgencyID = this.registrationForm.value.agencyList;
      this.parentVM.createdBy = this.registrationForm.value.agencyList;
      this.spinner.hide();
      console.log('data', this.parentVM);

      this.apiService.postData(AuthAPIURls.RegisterParentInformation, this.parentVM, null).subscribe(res => {
        if (res.body.statusCode === 200) {
          this.flag = false;
          this.showMessage = true;
          this.notification.success({ message: 'New user created successfully!', title: '' });
          this.spinner.hide();
        } else if (res.body.statusCode === 986) {
          this.spinner.hide();
          this.notification.warning({ message: ' User already exist !', title: '' });
        } else if (res.body.statusCode === 205) {
          this.spinner.hide();
          this.notification.warning({ message: 'Please enter valid name', title: '' });
        } else {
          this.spinner.hide();
          this.error.unknownError();
        }
      }, err => {
        this.spinner.hide();
        this.error.commonError(err);
      }
      );
    } else {
      this.spinner.hide();
      this.commonService.validateAllFields(this.registrationForm);
    }
  }


  selectAgency(value) {
    if (value === '') {
      this.notification.warning({ message: 'Please select agency', title: '' });
    } else {
      this.confirmationService.confirm({
        message: 'Are you sure you want to join this agency?',
        accept: () => {
          this.notification.success({ message: 'Agency selected successfully', title: '' });
        },
        reject: () => {
          this.registrationForm.get('agencyList').reset('');
      }
      });
    }
  }





}








