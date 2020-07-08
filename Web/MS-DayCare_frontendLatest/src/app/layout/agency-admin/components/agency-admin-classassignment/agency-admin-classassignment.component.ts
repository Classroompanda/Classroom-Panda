import { Component, OnInit } from '@angular/core';
import { AgencyApiService } from '../shared/services/agency-api-service/agency-api.service';
import { ErrorHandlerService } from '../../../../shared/services/error-handler/error-handler.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from '../../../../shared/services/notification-service/notification.service';
import { CommonService } from '../../../../shared/services/common/common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { AgencyAPIURLs } from '../shared/constatant';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { TeacherAPIURLs } from '../../../teacher/shared/constant';
import { ClassAssignmentVM } from '../shared/view-model/AddClassesVM';
declare var $: any;
@Component({
  selector: 'app-agency-admin-classassignment',
  templateUrl: './agency-admin-classassignment.component.html',
  styleUrls: ['./agency-admin-classassignment.component.css']
})
export class AgencyAdminClassassignmentComponent implements OnInit {
  classList: any[] = [];
  allClassList: any[] = [];
  classForm: FormGroup;
  classVM: ClassAssignmentVM = {};
  today = new Date();
  classStartTime: any;
  classEndTime: any;
  classStartDate: any;
  classEndDate: any;
  teacherList: any[] = [];
  agencyId = 0;
  id = 0;
  pageNo = 0;
  limit = 10;
  totalRecord = 0;
  isOngoing: boolean;
  isSubscriptionActive: boolean;
  rejectedUserList: any [] = [];
  formData: FormData;
  emptyDate: any;
  videoPath = '';

  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  constructor(private apiService: AgencyApiService, private error: ErrorHandlerService,
    private spinner: NgxSpinnerService, private notification: NotificationService,
    private commonService: CommonService, private fb: FormBuilder, private route: ActivatedRoute,
    private confirmationService: ConfirmationService) {
    this.isSubscriptionActive = this.commonService.getSubscriptionStatus();
  }

  ngOnInit() {
    this.agencyId = this.commonService.getAgencyId(),
      this.dpConfig = Object.assign({}, { containerClass: 'theme-dark-blue' }, { showWeekNumbers: false }
      );
    this.spinner.show();
    this.getAllClassAssignmentLog();
    this.createClassForm();
    this.getAllClassess();
    this.getAllTeachers();
    this.getSectionVideo();
  }


  OpenInfoVideo(data) {
    $('#infovideo').modal('show');
  }

  getSectionVideo() {
    const req = {
      'SectionID': 8
    };
    this.apiService.postData(TeacherAPIURLs.GetVideoForSection, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.videoPath = res.body.filePath;
        console.log(this.videoPath, 'bbbbbbbbbbbbbbb');
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


  PauseInfoVideo() {
    const myVideo: any = document.getElementById('pausevideo');
      myVideo.pause();
      myVideo.currentTime = 0;
  }


  onGoing() {
    debugger;
    if (this.classForm.value.ongoing === true) {
      this.isOngoing = true;
      const d = new Date('Jan 1, 2080 12:00:00');
      this.classForm.controls.enrollendtdate.setValue(this.classEndDate);
      this.classForm.controls.enrollendtdate.updateValueAndValidity();
    } else {
      if (this.classVM.ClassEnrollEndDate !== undefined) {
        this.classForm.controls.enrollendtdate.setValue(this.classVM.ClassEnrollEndDate);
        this.classForm.controls.enrollendtdate.updateValueAndValidity();
        this.isOngoing = false;
      } else {
      this.classForm.controls.enrollendtdate.setValue(this.emptyDate);
      this.classForm.controls.enrollendtdate.updateValueAndValidity();
      this.isOngoing = false;
      }
    }
  }


  createClassForm() {
    this.classForm = this.fb.group({
      classId: ['', Validators.required],
      teacherId: ['', Validators.required],
      enrollstartdate: ['', Validators.required],
      enrollendtdate: ['', Validators.required],
      starttime: [{ value: '', disabled: true }],
      endtime: [{ value: '', disabled: true }],
      ongoing: [false]
    });
  }

  editClassForm() {
    this.classForm = this.fb.group({
      classId: [this.classVM.ClassesID, Validators.required],
      teacherId: [this.classVM.TeacherID, Validators.required],
      enrollstartdate: [this.classVM.ClassEnrollStartDate, Validators.required],
      enrollendtdate: [this.classVM.ClassEnrollEndDate, Validators.required],
      starttime: [{ value: this.classVM.ClassStartTime, disabled: true }],
      endtime: [{ value: this.classVM.ClassEndTime, disabled: true }],
      ongoing: [this.classVM.onGoing]
    });
  }


  processCSVFile(event) {
    this.spinner.show();
    this.formData = new FormData();
    this.agencyId = this.agencyId;
  if (event.target.files && event.target.files[0] && event.target.files[0].name.includes('.csv')) {
    this.formData.append('FileName', event.target.files[0], event.target.files[0].name);
    this.formData.append('AgencyId', this.agencyId.toString());
    this.formData.append('CreatedBy', this.commonService.getLoggedInUserId().toString());
    this.apiService.uploadImage(AgencyAPIURLs.ClassAssignmentUsingFile, this.formData, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.spinner.hide();
        event.target.value = '';
        this.getAllClassAssignmentLog();
        this.notification.success({ message: 'File uploaded successfully', title : 'Success'});
      } else if (res.body.statusCode === 987) {
        this.spinner.hide();
         this.getAllClassAssignmentLog();
         this.rejectedUserList = res.body.data;
        $('.rejectedUsr').modal('show');
      } else {
        this.spinner.hide();
        this.error.unknownError();
      }
    }, err => {
      this.spinner.hide();
      this.error.commonError(err);
      this.notification.error({ message: 'Something went wrong', title : 'Error'});
    });
  } else {
    this.spinner.hide();
    this.notification.warning({ message: 'Unsupported file type', title : 'Warning'});
  }
  }




  get f() { return this.classForm.controls; }

  getAllClassAssignmentLog() {
    this.classList = [];
    const req = {
      'AgencyID': this.agencyId,
      'Page': this.pageNo,
      'limit': this.limit
    };
    this.apiService.postData(AgencyAPIURLs.GetAllClassAssignmentLog, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.totalRecord = res.body.totalRows;
        res.body.data.forEach(x => {
          x.classStartTime = this.commonService.getLocalDateTimeFromUTC(x.classStartTime);
          x.classEndTime = this.commonService.getLocalDateTimeFromUTC(x.classEndTime);
        });
        this.classList = res.body.data;
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


  getAllTeachers() {   
    this.teacherList = [];
    const req = {
      'agencyID': this.agencyId,
    };
    this.apiService.postData(TeacherAPIURLs.GetAllTeachers, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.teacherList = res.body.data;
      } else {       
        this.error.unknownError();
      }
    }, err => {
      this.spinner.hide();
      this.error.commonError(err);
    }
    );
  }

  getAllClassess() {
    this.allClassList = [];
    const req = {
      'AgencyID': this.agencyId,
    };
    this.apiService.postData(AgencyAPIURLs.GetAllClasses, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.allClassList = res.body.data;
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


  getClassTime() {
    this.allClassList.forEach(element => {
      if (this.classForm.value.classId === element.classesID.toString()) {
        this.classEndDate = new Date(element.classEndDate);
        this.classStartTime = this.commonService.getLocalDateTimeFromUTC(element.startTime);
        this.classEndTime = this.commonService.getLocalDateTimeFromUTC(element.endTime);
        this.classForm.controls['starttime'].setValue(this.classStartTime);
        this.classForm.controls['endtime'].setValue(this.classEndTime);
        this.classForm.controls['starttime'].updateValueAndValidity();
        this.classForm.controls['endtime'].updateValueAndValidity();
      }
    });
  }

  saveClassAssignment() {
    this.spinner.show();
    const startdate = this.commonService.getOnlyDate(this.classForm.value.enrollstartdate);
    const enddate = this.commonService.getOnlyDate(this.classForm.value.enrollendtdate);
    if (startdate >= enddate) {
      this.notification.warning({ message: 'start date must be greater than end date ', title: '' });
      this.spinner.hide();
    } else if (this.classForm.valid) {
      this.classVM.agencyID = this.commonService.getAgencyId();
      this.classVM.ClassesID = this.classForm.value.classId;
      this.classVM.TeacherID = this.classForm.value.teacherId;
      this.classVM.ClassEnrollStartDate = this.classForm.value.enrollstartdate;
      this.classVM.ClassEnrollEndDate = this.classForm.value.enrollendtdate;
      this.classVM.ClassStartTime = this.classStartTime;
      this.classVM.ClassEndTime = this.classEndTime;
      this.classVM.id = this.id;
      this.apiService.postData(AgencyAPIURLs.SaveClassAssignmentInformation, this.classVM, null).subscribe(res => {
        if (res.body.statusCode === 200) {
          $('.addclass').modal('hide');
          this.getAllClassAssignmentLog();
          this.notification.success({ message: 'Class Assign successfully! ', title: '' });
        } else if (res.body.statusCode === 700) {
          this.spinner.hide();
          this.notification.warning({ message: 'Teacher is already assigned to this class. ', title: '' });
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
      this.commonService.validateAllFields(this.classForm);
    }
  }

  cleareForm() {
    this.id = 0;
    this.createClassForm();
  }


  getClassDetails(value) {
    debugger;
    this.classEndDate = new Date(value.classEndDate);
    this.classVM.ClassesID = value.classesID;
    this.classVM.TeacherID = value.teacherID;
    this.classVM.ClassEnrollStartDate = new Date(value.classEnrollStartDate);
    this.classVM.ClassEnrollEndDate = new Date(value.classEnrollEndDate);
    this.classVM.ClassStartTime = value.classStartTime;
    this.classVM.ClassEndTime = value.classEndDate;
    this.classEndDate = new Date(value.classEndDate);
    this.classStartTime = this.commonService.getLocalDateTimeFromUTC(value.classStartTime);
    this.classEndTime = this.commonService.getLocalDateTimeFromUTC(value.classEndTime);
    this.classVM.ClassStartTime = new Date(value.classStartTime);
    this.classVM.ClassEndTime = new Date(value.classEndTime);
    this.id = value.id;
    if (value.classEnrollEndDate == '2080-01-01T00:00:00') {
      this.isOngoing = true;
      this.classVM.onGoing = true;
    } else {
      this.isOngoing = false;
      this.classVM.onGoing = false;
    }
    this.editClassForm();

  }


  // Method to delete/deactivate Teacher
  deleteClassAssignment(value) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      accept: () => {
        this.spinner.show();
        const req = {
          'AgencyID': this.agencyId,
          'id': value.id,
          'IsDeleted': true,
          'DeletedDate': new Date(),
          'DeletedBy': this.commonService.getReleventUserId('userdetails')
        };
        this.apiService.postData(AgencyAPIURLs.SaveClassAssignmentInformation, req, null).subscribe(res => {
          if (res.body.statusCode === 200) {           
            this.deleteClassAssignmentSuccess(value);
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

  deleteClassAssignmentSuccess(data) {
    const index = this.classList.findIndex(r => r.id === data.id);
    this.classList.splice(index, 1);
    this.spinner.hide();
    this.notification.success({ message: 'This record has been deleted', title: '' });
  }
  paginate(event) {
    this.pageNo = event.page;   
    this.getAllClassAssignmentLog();
  }


}


