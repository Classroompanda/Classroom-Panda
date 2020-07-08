import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { AgencyApiService } from '../shared/services/agency-api-service/agency-api.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler/error-handler.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from 'src/app/shared/services/notification-service/notification.service';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { AgencyAPIURLs } from '../shared/constatant';
import { ConfirmationService } from 'primeng/api';
declare var $: any;

@Component({
  selector: 'app-agency-admin-subsidy',
  templateUrl: './agency-admin-subsidy.component.html',
  styleUrls: ['./agency-admin-subsidy.component.css']
})
export class AgencyAdminSubsidyComponent implements OnInit {
  isSubscriptionActive: boolean;
  studentList: any [] = [];
  subsidyForm: FormGroup;
  agencyId: number;
  searchByStudentName = '';
  pageNo = 0;
  limit = 10;
  totalRecord: number;
  markAllStudents = false;
  studentListId: any[] = [];
  fromDate: any;
  toDate: any;
  subsidyList: any [] = [];
  emptyDate: any;
  subsidyId: any;
  studentDropdownList: any[] = [];

  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  constructor(private confirmationService: ConfirmationService, private apiService: AgencyApiService, private fb: FormBuilder,
     private error: ErrorHandlerService,
    private spinner: NgxSpinnerService, private notification: NotificationService, public commonService: CommonService,
   ) {
     this.agencyId = this.commonService.getAgencyId();
    this.isSubscriptionActive = this.commonService.getSubscriptionStatus();
   }

  ngOnInit() {
    this.dpConfig = Object.assign({}, { containerClass: 'theme-dark-blue' },
      { showWeekNumbers: false });
    this.createSubsidyForm();
    this.subsidyId = 0;
    this.getSubcityList();
     this.getAllStudentSubsidyList();
    this.getAllStudentDropDown();
  }


  createSubsidyForm() {
    this.subsidyForm = this.fb.group({
     studentName: ['', Validators.required],
     subsidyName: ['', Validators.required],
     startDate: ['', Validators.required],
     endDate: ['', Validators.required],
    });
  }

  get f () { return this.subsidyForm.controls; }


getSubcityList() {
  this.subsidyList = [];
  this.spinner.show();
  const data = {
    'agencyID': this.agencyId
  };

  this.apiService.postData(AgencyAPIURLs.GetSubsidyType, data, null).subscribe(res => {
    if (res.body.statusCode === 200) {
      this.totalRecord = res.body.totalRows;
      this.spinner.hide();
      this.subsidyList = res.body.data;
    } else {
      this.spinner.hide();
      this.error.unknownError();
    }
  }, err => {
    this.spinner.hide();
    this.error.commonError(err);
  });
}




getSingleMarkedStudent(id, event) {
  this.markAllStudents = false;
  if (event.target.checked === true) {
    if (this.studentListId.length === 0) {
      this.studentListId.push(id.studentId);
      const no = this.studentList.findIndex(r => r.studentId === id.studentId);
      if (no !== -1) {
        this.studentList[no].isMarked = true;
      }
    } else {
      const index = this.studentListId.findIndex(r => r === id.studentId);
      if (index === -1) {
        this.studentListId.push(id.studentId);
        const no = this.studentList.findIndex(r => r.studentId === id.studentId);
        if (no !== -1) {
          this.studentList[no].isMarked = true;
        }
      }
    }
  } else if (event.target.checked === false) {
    if (this.studentListId.length > 0) {
      const index = this.studentListId.findIndex(r => r === id.studentId);
      this.studentListId.splice(index, 1);
      const no = this.studentList.findIndex(r => r.studentId === id.studentId);
      if (no !== -1) {
        this.studentList[no].isMarked = false;
      }
    }
  }
}


// Student list with applied subsidy
getAllStudentSubsidyList() {
  this.spinner.show();
  this.studentList = [];
  const req = {
    'AgencyID': this.commonService.getAgencyId(),
    'studentID': 0,
    'studentName': '',
    'page': this.pageNo,
    'limit': this.limit,
  };
  this.apiService.postData(AgencyAPIURLs.GetStudentSubsidyDetails, req, null).subscribe(res => {
    if (res.body.statusCode === 200) {
      this.totalRecord = res.body.totalRows;
      if (res.body.data.length > 0 && res.body.data !== []) {
        this.studentList = res.body.data;
        this.spinner.hide();
      } else {
        this.spinner.hide();
      }
    } else {
      this.spinner.hide();
    }
  }, err => {
    this.spinner.hide();
    this.error.commonError(err);
  }
  );
}

// Student list with no subsidy apply yet
getAllStudentDropDown() {
  this.spinner.show();
  this.studentDropdownList = [];
  const req = {
    'AgencyID': this.commonService.getAgencyId()
  };
  this.apiService.postData(AgencyAPIURLs.GetStudentSubsidyList, req, null).subscribe(res => {
    if (res.body.statusCode === 200) {
      if (res.body.data.length > 0 && res.body.data !== []) {
        this.studentDropdownList = res.body.data;
        this.spinner.hide();
      } else {
        this.spinner.hide();
      }
    } else {
      this.spinner.hide();
    }
  }, err => {
    this.spinner.hide();
    this.error.commonError(err);
  }
  );
}


/**Get student id using checkbox */
getAllMarkedStudents(event, students) {
  if (event.target.checked === true) {
    this.studentListId = [];
    students.forEach(data => {
      this.studentListId.push(data.studentId);
      data.isMarked = true;
    });
  } else {
    this.studentListId = [];
    students.forEach(element => {
      element.isMarked = false;
    });
  }
}


//  Check validation apply subsidy
verifySubsidybeforApply() {

  this.spinner.show();
  if (this.subsidyForm.valid)  {
    this.spinner.hide();
    if (this.subsidyForm.controls.startDate.value.setHours(0, 0, 0) >
    this.subsidyForm.controls.endDate.value.setHours(0, 0, 0)) {
      this.notification.warning({message: 'End date should be greater than Start date', title: ''});
    } else {
      this.saveStudentSubsidyDetails();
    }
  } else  {
    this.spinner.hide();
    this.commonService.validateAllFields(this.subsidyForm);
  }

}

saveStudentSubsidyDetails() {
  const data = {
    agencyID: this.agencyId,
    classID: '',
    studentID: 0,
    subsidyDetailsID: this.subsidyForm.controls.subsidyName.value,
    StudentIDs: this.subsidyForm.controls.studentName.value,
    FromDate: new Date(this.subsidyForm.controls.startDate.value).toDateString(),
    ToDate: new Date(this.subsidyForm.controls.endDate.value).toDateString()
    };

  this.apiService.postData(AgencyAPIURLs.SaveStudentSubsidyDetails, data, null).subscribe(res => {
    if (res.body.statusCode === 200) {
      $('.addsubsidy').modal('hide');
      this.getAllStudentDropDown();
      this.getAllStudentSubsidyList();
      this.notification.success({ message: res.body.message, title : 'Success'});
    }  else {
      this.spinner.hide();
      this.error.unknownError();
      this.studentListId = [];
    }
  }, err => {
    this.spinner.hide();
    this.error.commonError(err);
    this.studentListId = [];
  });
}


paginate(event) {
  this.pageNo = event.page;
  this.getAllStudentSubsidyList();
}

deleteSubsidy(value) {
  this.confirmationService.confirm({
    message: 'Do you want to deactivate this user?',
    accept: () => {
      this.spinner.show();
      const req = {
        'AgencyID': this.commonService.getAgencyId(),
        'id': value.id,
        'DeletedBy': this.commonService.getReleventUserId('userdetails')
      };
      this.apiService.postData(AgencyAPIURLs.DeleteStudentSubsidyType, req, null).subscribe(res => {
        if (res.body.statusCode === 200) {
          this.getAllStudentSubsidyList();
          this.getAllStudentDropDown();
          this.notification.success({ message: res.body.message, title : 'Success'});
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


clearSubsidyForm() {
this.createSubsidyForm();
}






}
