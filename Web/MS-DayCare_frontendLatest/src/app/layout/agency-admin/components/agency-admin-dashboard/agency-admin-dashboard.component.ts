import { Component, OnInit } from '@angular/core';
import { AgencyAPIURLs } from '../shared/constatant';
import { ParentApiService } from '../../../parent/shared/services/parent-api-service';
import { ErrorHandlerService } from '../../../../shared/services/error-handler/error-handler.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from '../../../../shared/services/notification-service/notification.service';
import { CommonService } from '../../../../shared/services/common/common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { TeacherAPIURLs } from '../../../teacher/shared/constant';
import { HealthVM } from '../../../teacher/shared/view-model/daily-activityVM';
declare var $: any;
@Component({
  selector: 'app-agency-admin-dashboard',
  templateUrl: './agency-admin-dashboard.component.html',
  styleUrls: ['./agency-admin-dashboard.component.css']
})
export class AgencyAdminDashboardComponent implements OnInit {
  classDetails: any;
  classLogList: any [] = [];
  classId: any;
  classNameForMedication: string;
  classNameForAllergy: string;
  medicationList: any;
  allergyList: any;
  healthForm: FormGroup;
  studentListId: any[] = [];
  HealthVM: HealthVM = {};
  studentMedicationDetails: any;
  teacherPresentList: any [] = [];
  paymentDueList: any [] = [];
  pageNo = 0;
  limit = 5;
  totalRecord = 0;
  presentStudents = 0;
  enrollStudents = 0;
  requestedStudent = 0;
  today = new Date();
  loader: boolean;
  isSubscritionActive = false;
  searchByDate: any;
  searchByDateString: any;
  constructor(private apiService: ParentApiService, private error: ErrorHandlerService,
    private spinner: NgxSpinnerService, private notification: NotificationService,
    private commonService: CommonService, private fb: FormBuilder, private route: ActivatedRoute,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.searchByDate = new Date();
    this.searchByDateString = this.commonService.getStringLocalDateTimeFromUTC(this.searchByDate);
   this.isSubscritionActive = this.commonService.isSubscriptionActive;
    this.GetCountDetailsForAgencyAdmin();
    this.getAllPresentTeachersForAgency();
    this.getDuePaymentAccordingToAgency();
    this.getClassLog();
    this.createHealthForm();
    this.UpdateLastLogin();
    }

  createHealthForm() {
    this.healthForm = this.fb.group({
      temperature: [''],
      tempcmnt: ['', Validators.required],
      teacherack: [true]
    });
  }

getAllPresentTeachersForAgency() {
  this.teacherPresentList = [];
    const req = {
      'AgencyID': this.commonService.getAgencyId(),
      'askedDate': this.searchByDate,
      'askedDateString': this.searchByDateString
    };
    this.apiService.postData(AgencyAPIURLs.GetAllPresentTeachersForAgency, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.teacherPresentList = res.body.data;
        console.log(this.teacherPresentList, 'tttttttttttttttttttttttttt');
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

UpdateLastLogin() {
  this.loader = true;
  const req = {
    'AgencyID': this.commonService.getAgencyId(),
  };
  this.apiService.postData(AgencyAPIURLs.UpdateLastLogin, req, null).subscribe(res => {
    if (res.body.statusCode === 200) {
      this.loader = false;
    } else {
      this.error.unknownError();
    }
  }, err => {
    this.error.commonError(err);
  }
  );
}

GetCountDetailsForAgencyAdmin() {
    const req = {
      'AgencyID': this.commonService.getAgencyId(),
    };
    this.apiService.postData(AgencyAPIURLs.GetCountDetailsForAgencyAdmin, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        if (res.body.data) {
          this.presentStudents = res.body.data.presentStudent;
          this.requestedStudent = res.body.data.requestedStudent;
          this.enrollStudents = res.body.data.enrolledStudent;
        }
      } else {
        this.error.unknownError();
      }
    }, err => {
      this.error.commonError(err);
    }
    );
}


getDuePaymentAccordingToAgency() {
  this.paymentDueList = [];
   this.spinner.show();
  const model = {
    'agencyID': this.commonService.getAgencyId(),
    'limit': this.limit,
    'page': this.pageNo,
    'studentName': ''
  };
  this.apiService.postData(AgencyAPIURLs.GetDuePaymentAccordingToAgency, model, null).subscribe(res => {
    if (res.body.statusCode === 200) {
     this.totalRecord = res.body.totalRows;
      if (res.body.data !== null && res.body.data !== [] && res.body.data !== []) {
        res.body.data.forEach(x => {
          x.invoiceFromDate = new Date(x.invoiceFromDate);
          x.invoiceToDate = new Date(x.invoiceToDate);
        });
        this.paymentDueList = res.body.data;
      }
        this.spinner.hide();
    }
  }, err => {
      this.spinner.hide();
    this.error.commonError(err);
  }
  );
}


getClassLog() {
  this.classLogList = [];
  const data = {
    'agencyID': this.commonService.getAgencyId(),
  };

  this.apiService.postData(AgencyAPIURLs.GetAllClasses, data, null).subscribe(res => {
    if (res.body.statusCode === 200) {
      if (res.body.data !== null && res.body.data !== undefined && res.body.data.length !== 0) {
        this.classLogList = res.body.data;
        this.classLogList.forEach(x => {
          x.endTime = this.commonService.getLocalDateTimeFromUTC(x.endTime);
          x.startTime = this.commonService.getLocalDateTimeFromUTC(x.startTime);
        });
        this.classDetails = this.classLogList[0];
        this.classId = this.classDetails.classesID;
        this.classNameForMedication = this.classDetails.className;
        this.classNameForAllergy = this.classDetails.className;
          this.getStudentMedication();
          this.getStudentAllergy();
      }
      this.spinner.hide();
    } else {
      this.spinner.hide();
      this.error.unknownError();
    }
  }, err => {
    this.spinner.hide();
    this.error.commonError(err);
  });

}


getStudentMedication() {
  this.loader = true;
  const reqData = {
    'agencyID': this.commonService.getAgencyId(),
    'askingDate': new Date(),
    'teacherID': 0,
    'classID': this.classId
  };
  this.apiService.postData(TeacherAPIURLs.GetTeacherTodayMedicationTasks, reqData, null).subscribe(res => {
    if (res.body.statusCode === 200) {
      if (res.body.data !== null && res.body.data !== undefined) {
        this.medicationList = res.body.data;
        this.loader = false;
      }
      this.spinner.hide();
    } else {
      this.spinner.hide();
      this.error.unknownError();
    }
  }, err => {
    this.spinner.hide();
    this.error.commonError(err);
  });
}

getPageDetailsForClass(event) {
  this.medicationList = [];
  this.allergyList = [];
  this.classDetails = [];
  this.classDetails = this.classLogList[event.page];
  if (this.classDetails) {
    this.classNameForMedication = this.classDetails.className;
    this.classNameForAllergy = this.classDetails.className;
  }
  if (this.classDetails !== undefined && this.classDetails !== null ) {
    this.classId = this.classDetails.classesID;
    this.classNameForMedication = this.classDetails.className;
    this.classNameForAllergy = this.classDetails.className;
    this.getStudentMedication();
    this.getStudentAllergy();
  }
}

medicationDone() {
  if (this.healthForm.valid) {
    const agencyID = this.commonService.getAgencyId();
    this.HealthVM.id = 0;
    this.HealthVM.studentActivitiesID = 0;
    this.HealthVM.agencyID = agencyID;
    this.HealthVM.recordedTemparture = this.healthForm.value.temperature;
    this.HealthVM.studentHealthDescription = this.healthForm.value.tempcmnt;
    this.HealthVM.howTaken = this.studentMedicationDetails.howTaken;
    this.HealthVM.studentMedicationID = this.studentMedicationDetails.studentMedicationID;
    this.HealthVM.doseRepeatID = this.studentMedicationDetails.doseRepeatID;
    this.HealthVM.isTeacherAcknowledge = this.healthForm.value.teacherack;
    this.HealthVM.AcknowledgeTeacherID = this.commonService.getLoggedInUserId();
    this.HealthVM.AcknowledgeParentID = 0;
    this.HealthVM.IsMedicationDoneToday = true;

    const req = {
      'studentActivityMedications': this.HealthVM,
      'activityTypeID': 1,
      'selectedStudents': this.studentListId,
      'agencyID': agencyID,
      'classesID': this.classId,
      'id': 0,
      'createdBy': this.commonService.getLoggedInUserId(),
      'activityRegisterDate' :  this.today.toDateString(),
    };
    this.saveMedication(req);
  } else {
    this.notification.warning({ message: 'Please add health note', title: '' });
  }

}

saveMedication(req) {
  this.apiService.postData(TeacherAPIURLs.SaveStudentActivity, req, null).subscribe(res => {
    this.spinner.hide();
    if (res.body.statusCode === 200) {
      $('#edithealth').modal('hide');
      this.notification.success({ message: 'Activity added successfully', title: '' });
      this.getStudentMedication();
    } else {
      this.spinner.hide();
      this.error.unknownError();
    }

  }, err => {
    this.spinner.hide();
    this.error.commonError(err);
  });
}

getStudentDetailsOfMedication(value) {
  this.createHealthForm();
   this.studentListId = [];
   this.studentMedicationDetails = [];
   this.studentListId.push(value.studentID);
   this.studentMedicationDetails = value;
 }

// Allergy.....................

getStudentAllergy() {
  this.loader = true;
  const reqData = {
    'agencyID': this.commonService.getAgencyId(),
    'askingDate': new Date(),
    'teacherID': 0,
    'classID': this.classId
  };
  this.apiService.postData(TeacherAPIURLs.GetStudentAllergy, reqData, null).subscribe(res => {
    if (res.body.statusCode === 200) {
      if (res.body.data !== null && res.body.data !== undefined) {
        this.allergyList = res.body.data;
        this.loader = false;
      }
      this.spinner.hide();
    } else {
      this.spinner.hide();
      this.error.unknownError();
    }
  }, err => {
    this.spinner.hide();
    this.error.commonError(err);
  });
}

}


