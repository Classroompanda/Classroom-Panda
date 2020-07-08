import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ErrorHandlerService } from '../../../../shared/services/error-handler/error-handler.service';
import { NotificationService } from '../../../../shared/services/notification-service/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from '../../../../shared/services/common/common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { AdminApiService } from 'src/app/layout/admin/shared/services/admin-api.service';
import { AdminAPIURLs } from 'src/app/layout/admin/shared/constant';
import { AgencyAPIURLs } from 'src/app/layout/agency-admin/components/shared/constatant';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { TeacherAPIURLs } from 'src/app/layout/teacher/shared/constant';
import { LayoutApiService } from 'src/app/shared/services/lauout-api-service';
import { LayoutAPIURLs } from 'src/app/shared/services/constant';
declare var $: any;

@Component({
  selector: 'app-parent-kiosk',
  templateUrl: './parent-kiosk.component.html',
  styleUrls: ['./parent-kiosk.component.css']
})
export class ParentKioskComponent implements OnInit {
  @ViewChild(SignaturePad) signaturePad: SignaturePad;
  private signaturePadOptions: Object = {
    'minWidth': 2,
    'canvasWidth': 760,
    'canvasHeight': 500,
    'penColor': 'rgb(0, 0, 0)',
    'backgroundColor': 'rgb(237, 225, 236)'
  };
  studentList: any[] = [];
  planForm: FormGroup;
  agencyList: any[] = [];
  event: any[] = [];
  planId = 0;
  isCheckIn: boolean;
  isCheckOut: boolean;
  isBreaKIn: boolean;
  isBreakOut: boolean;
  desableBreakOut: boolean;
  public fileData: FormData;
  public formData = new FormData();
  image: any;
  profileimage: any;
  flag = false;
  isSign = false;
  studentID: any;
  parentID: any;
  agencyID: any;
  today = new Date();
  constructor(private apiService: AdminApiService, private error: ErrorHandlerService, private layoutService: LayoutApiService,
    private spinner: NgxSpinnerService, private notification: NotificationService, private router: Router,
    public commonService: CommonService, private fb: FormBuilder, private route: ActivatedRoute,
    private confirmationService: ConfirmationService) { }
  ngOnInit() {
    this.getAllStudentList();
  }
  // ngAfterViewInit() {
  //   this.signaturePad.set('minWidth', 2);
  //   this.signaturePad.clear();
  // }

  drawComplete() {
    const base64 = this.signaturePad.toDataURL('image/jpg', 0.5);
    console.log(base64);
    const blob = this.base64toBlob(base64);
    console.log(blob);
    const myDate = new Date();
    // tslint:disable-next-line: prefer-const
    this.event[0] = blob;
    this.event[0].name = 'sign.jpg';
    this.event[0].lastModifiedDate = myDate;
    //  {name: 'sign' , lastModifiedDate: myDate, size: blob.size , type: blob.type};
    console.log(this.event);
    const file: File = this.event[0];
    this.processFile(file);
  }

  base64toBlob(base64) {
    const byteString = atob(base64.split(',')[1]);
    const mimeString = base64.split(',')[0].split(':')[1].split(':')[0];
    const byteNumbers = new Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      byteNumbers[i] = byteString.charAt(i);
    }
    const ia = new Uint8Array(byteNumbers);
    return new Blob([ia], { type: 'image/jpg' });
  }

  drawStart() {
    console.log('begin drawing');
  }
  drawClear() {
    this.signaturePad.clear();
  }

  OpenInfoVideo(data) {
    $('#infovideo').modal('show');
  }

  processFile(event1) {
    this.formData = new FormData();
    const self = this;
    if (event1.type !== 'image/png' && event1.type !== 'image/jpeg' && event1.type !== 'image/jpg') {
      self.fileData = null;
      self.profileimage = '';
      return false;
    } else {
      const reader = new FileReader();
      this.formData.append('fileData', event1, event1.name);
      self.fileData = this.formData;
      reader.readAsDataURL(event1); // read file as data url
      setTimeout(() => {
        this.image = reader.result;
      }, 100);
      this.flag = true;
      this.UploadImage();
    }
  }

  UploadImage() {
    this.spinner.show();
    this.apiService.uploadImage(TeacherAPIURLs.UploadImage, this.fileData, null).subscribe(res => {
      if (res.status === 200) {
        this.image = res.body.data;
        this.saveParentSign();
      }
    }, err => {
      this.error.commonError(err);
    });
  }


  getAllStudentList() {
    this.spinner.show();
    this.studentList = [];
    const req = {
      'agencyID': this.commonService.getAgencyId(),
      'parentID': this.commonService.getReleventUserId('userdetails'),
    };
    this.apiService.postData(AgencyAPIURLs.GetAllStudentsforKioskApp, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.studentList = res.body.data;
        console.log(this.studentList, 'testt');
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

  checkIn(value) {
    this.spinner.show();
    this.studentList = [];
    this.studentID = value.studentID;
    this.agencyID = this.commonService.getAgencyId();
    this.parentID = this.commonService.getReleventUserId('userdetails');

    const req = {
      'agencyID': this.commonService.getAgencyId(),
      'parentID': this.commonService.getReleventUserId('userdetails'),
      'studentID': value.studentId,
      'CreatedBy': this.commonService.getReleventUserId('userdetails'),
      'IsDropIn': true,
      'IsDropOut': false,
      'IsBreakOut': false,
      'IsBreakIn': false
    };
    this.apiService.postData(AgencyAPIURLs.SaveKioskeStudentSignInDetails, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.isSign = true;
        this.getAllStudentList();
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

  checkOut(value) {
    this.spinner.show();
    this.studentList = [];
    const req = {
      'agencyID': this.commonService.getAgencyId(),
      'parentID': this.commonService.getReleventUserId('userdetails'),
      'studentID': value.studentId,
      'CreatedBy': this.commonService.getReleventUserId('userdetails'),
      'IsDropIn': false,
      'IsDropOut': true,
      'IsBreakOut': false,
      'IsBreakIn': false
    };
    this.apiService.postData(AgencyAPIURLs.SaveKioskeStudentSignInDetails, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.isSign = false;
        this.getAllStudentList();
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

  breakIn(value) {
    this.spinner.show();
    this.studentList = [];
    const req = {
      'agencyID': this.commonService.getAgencyId(),
      'parentID': this.commonService.getReleventUserId('userdetails'),
      'studentID': value.studentId,
      'CreatedBy': this.commonService.getReleventUserId('userdetails'),
      'IsDropIn': false,
      'IsDropOut': false,
      'IsBreakOut': false,
      'IsBreakIn': true
    };
    this.apiService.postData(AgencyAPIURLs.SaveKioskeStudentSignInDetails, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.isSign = false;
        this.studentList = res.body.data;
        this.getAllStudentList();
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

  breakOut(value) {
    this.spinner.show();
    this.studentList = [];
    const req = {
      'agencyID': this.commonService.getAgencyId(),
      'parentID': this.commonService.getReleventUserId('userdetails'),
      'studentID': value.studentId,
      'CreatedBy': this.commonService.getReleventUserId('userdetails'),
      'IsDropIn': false,
      'IsDropOut': false,
      'IsBreakOut': true,
      'IsBreakIn': false
    };
    this.apiService.postData(AgencyAPIURLs.SaveKioskeStudentSignInDetails, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.isSign = false;
        this.getAllStudentList();
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

  saveParentSign() {
    this.spinner.show();
    const req = {
      'agencyID': this.agencyID,
      'parentID': this.parentID,
      'studentID': this.studentID,
      'CreatedBy': this.commonService.getReleventUserId('userdetails'),
      'ImagePath': this.image
    };
    this.apiService.postData(AgencyAPIURLs.SaveParentSignatureDetails, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.isSign = false;
        $('#infovideo').modal('hide');
        this.drawClear();
        this.notification.success({ message: 'Signature saved successfully', title: '' });
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

  kiosklogOut() {
    this.deleteDeviceToken();
    localStorage.removeItem('isauthenticated');
    localStorage.removeItem('usertype');
    localStorage.removeItem('path');
    localStorage.removeItem('userdetails');
    localStorage.removeItem('imagepath');
    localStorage.removeItem('iskiosklogin');
    this.router.navigate(['/kiosklogin']);
  }

  deleteDeviceToken() {
    const reqdata = {
      'BusinessToken': localStorage.getItem('fcmtkn')
    };
    this.layoutService.postData(LayoutAPIURLs.DeleteToken, reqdata, null).subscribe(res => {
      if (res.body.statusCode === 200) {
      } else {
        //  this.error.unknownError();
      }
    }, err => {
      this.spinner.hide();
    });
  }


}

