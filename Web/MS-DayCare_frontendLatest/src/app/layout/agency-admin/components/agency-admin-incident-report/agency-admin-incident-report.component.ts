import { Component, OnInit } from '@angular/core';
import { TeacherAPIURLs } from '../../../teacher/shared/constant';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { TeacherApiService } from '../../../teacher/shared/services/teacher-api-service/teacher-api.service';
import { ErrorHandlerService } from '../../../../shared/services/error-handler/error-handler.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from '../../../../shared/services/notification-service/notification.service';
import { CommonService } from '../../../../shared/services/common/common.service';
import { IncidentVM } from '../../../teacher/shared/view-model/incidentVm';
import { ConfirmationService } from 'primeng/api';
import { AgencyAPIURLs } from '../shared/constatant';
import { environment } from 'src/environments/environment';
declare var $: any;
@Component({
  selector: 'app-agency-admin-incident-report',
  templateUrl: './agency-admin-incident-report.component.html',
  styleUrls: ['./agency-admin-incident-report.component.css']
})
export class AgencyAdminIncidentReportComponent implements OnInit {
  incidentsList: any[] = [];
  incidentDetails: any[] = [];
  incidentVm: IncidentVM = {};
  incidentForm: FormGroup;
  classList: any[] = [];
  studentList: any[] = [];
  searchedStudentList: any[] = [];
  IncidentInvolvments: any[] = [];
  participantSudents: any[] = [];
  participantsList: any[] = [];
  today: any;
  teacherList: any[] = [];
  incidentId: number;
  closeModal = '';
  injurriesList: any[] = [];
  incidentPrioritiesList: any[] = [];
  bitingLogList: any[] = [];
  loader = true;
  mode = 0;
  activeTab = 1;
  pageNo = 0;
  limit = 10;
  totalRecord = 0;
  isSubscriptionActive: boolean;
  fromDate: any;
  toDate: any;
  blankDate: any;
  searchByStudentName: string;
  showClearBtn = false;
  videoPath = '';
  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  constructor(private apiService: TeacherApiService, private error: ErrorHandlerService,
    private spinner: NgxSpinnerService, private notification: NotificationService,
    private commonService: CommonService, private fb: FormBuilder, private confirmationService: ConfirmationService) {
    this.isSubscriptionActive = this.commonService.getSubscriptionStatus();
  }

  ngOnInit() {
    this.loader = true;
    this.participantSudents = [];
    this.incidentVm = {};
    this.incidentId = 0;
    this.dpConfig = Object.assign({}, { containerClass: 'theme-dark-blue' },
      { showWeekNumbers: false });
    this.today = new Date();
    this.createIncidentForm();
    this.getAllIncidents();
    this.getAllClassess();
    this.getAllTeachers();
    this.getAllNatureofinjury();
    this.getIncidentPriorities();
    this.getSectionVideo();
  }

  OpenInfoVideo(data) {
    $('#infovideo').modal('show');
  }

  getSectionVideo() {
    const req = {
      'SectionID': 15
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



  createIncidentForm() {
    if (this.incidentId === 0) {
      this.incidentForm = this.fb.group({
        studentname: ['', Validators.required],
        age: [''],
        location: ['', Validators.required],
        nature: ['', Validators.required],
        participants: [''],
        firstaidadmin: ['', Validators.required],
        doctorrequired: ['', Validators.required],
        dateofincident: ['', Validators.required],
        timeofincident: ['', Validators.required],
        parentinformed: ['', Validators.required],
        wayofinform: [''],
        description: [''],
        action: [''],
        class: ['', Validators.required],
        priority: [''],
        partofbody: [''],
        contextenviroment: [''],
        contextchild: [''],
        reporter: [''],
        parentcomment: [''],
        acknowledge: [false]

      });
    }

  }

  createEditablrForm() {
    if (this.incidentId !== 0) {
      this.incidentForm = this.fb.group({
        studentname: [this.incidentVm.StudentID, Validators.required],
        age: [''],
        reporter: [this.incidentVm.Reporter],
        location: [this.incidentVm.IncidentLocation, Validators.required],
        nature: [this.incidentVm.NatureOfInjuryID, Validators.required],
        participants: [this.participantSudents],
        firstaidadmin: [this.incidentVm.FirstAidAdministeredID, Validators.required],
        doctorrequired: [this.incidentVm.IsDoctorRequired, Validators.required],
        dateofincident: [this.incidentVm.IncidentDate, Validators.required],
        timeofincident: [this.incidentVm.IncidentTime, Validators.required],
        parentinformed: [this.incidentVm.WasParentInformed, Validators.required],
        wayofinform: [this.incidentVm.ParentInformedBy],
        description: [this.incidentVm.Description],
        action: [this.incidentVm.ActionTaken],
        class: [this.incidentVm.ClassesID, Validators.required],
        priority: [this.incidentVm.IncidentPriortyTypeID],
        partofbody: [this.incidentVm.partOfBody],
        contextenviroment: [this.incidentVm.contextEnviroment],
        contextchild: [this.incidentVm.contextChild],
        parentcomment: [this.incidentVm.ParentComment],
        acknowledge: [this.incidentVm.isAcknowledge]
      });
    }
  }



  // convenience getter for easy access to form fields
  get f() { return this.incidentForm.controls; }

  getIncidentsDetails(data, type) {
    this.mode = type;
    this.getAllParticipants();
    this.incidentVm = {};
    this.spinner.show();
    const req = {
      'agencyID': this.commonService.getAgencyId(),
      'incidentID': data.id, // Pass proper incident id here
    };
    this.apiService.postData(TeacherAPIURLs.GetIncidentsDetails, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        if (res.body.data.length !== null) {
          this.incidentVm.AgencyID = this.commonService.getAgencyId();
          this.incidentId = res.body.data.id;
          this.incidentVm.ClassesID = res.body.data.classesID;
          this.incidentVm.StudentID = res.body.data.studentID;
          this.incidentVm.Reporter = res.body.data.teacherID;
          this.incidentVm.IncidentLocation = res.body.data.placeOfIncident;
          this.incidentVm.NatureOfInjuryID = res.body.data.natureOfInjuryID;
          this.incidentVm.FirstAidAdministeredID = res.body.data.firstAidAdministeredID;
          this.incidentVm.IsDoctorRequired = res.body.data.isDoctorRequired;
          this.incidentVm.IncidentDate = this.commonService.getLocalDateTimeFromUTC(res.body.data.incidentDate);
          this.incidentVm.IncidentTime = this.commonService.getLocalDateTimeFromUTC(res.body.data.incidentTime);
          this.incidentVm.contextChild = res.body.data.contextChild;
          this.incidentVm.contextEnviroment = res.body.data.contextEnviroment;
          this.incidentVm.partOfBody = res.body.data.partOfBody;
          this.incidentVm.WasParentInformed = res.body.data.wasParentInformed;
          this.incidentVm.Description = res.body.data.description;
          this.incidentVm.ActionTaken = res.body.data.actionTaken;
          this.incidentVm.IncidentPriortyTypeID = res.body.data.incidentPriortyTypeID;
          this.incidentVm.ParentInformedBy = res.body.data.parentInformedBy;
          this.participantSudents = [];
          this.incidentVm.isAcknowledge = res.body.data.isAcknowledge;
          this.incidentVm.ParentComment = res.body.data.parentComment;
          res.body.data.incidentInvolvments.forEach(element => {
            this.participantSudents.push(element.studentID);
          });
          this.createEditablrForm();
          this.getStudentsList();
          this.spinner.hide();
        }
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


  getAllIncidents() {
    this.loader = true;
    this.spinner.show();
    const req = {
      'agencyID': this.commonService.getAgencyId(),
      'limit': this.limit,
      'page': this.pageNo,
      'fromDate': this.fromDate ? this.fromDate : this.blankDate,
      'toDate': this.toDate ? this.toDate : this.blankDate,
      'studentName': this.searchByStudentName
    };
    this.apiService.postData(TeacherAPIURLs.GetAllIncidents, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.totalRecord = res.body.totalRows;
        this.incidentsList = res.body.data;
        this.getIncidentCountWithActionTaken(this.incidentsList);
        this.spinner.hide();
        this.loader = false;
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


  getAllBitingIncidents() {
    this.spinner.show();
    const req = {
      'agencyID': this.commonService.getAgencyId(),
      'limit': this.limit,
      'page': this.pageNo
    };
    this.apiService.postData(TeacherAPIURLs.GetBittingIncidentsDetails, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.totalRecord = res.body.totalRows;
        this.bitingLogList = res.body.data;
        console.log(this.bitingLogList, 'bitttttt');
        this.spinner.hide();
        this.loader = false;
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





  // Get All teacher List
  getAllTeachers() {
    const req = {
      'agencyID': this.commonService.getAgencyId(),
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

  // Method to create incident
  saveIncident(type) {
    this.IncidentInvolvments = [];
    if (this.incidentForm.valid) {
      this.spinner.show();
      this.incidentVm.StudentID = this.incidentForm.value.studentname;
      this.incidentVm.AgencyID = this.commonService.getAgencyId();
      this.incidentVm.TeacherID = this.incidentForm.value.firstaidadmin; // sending teacher id as reporter id
      this.incidentVm.IncidentPriortyTypeID = this.incidentForm.value.priority === '' ? 0 : this.incidentForm.value.priority;
      this.incidentVm.Reporter = this.incidentForm.value.reporter;
      this.incidentVm.PlaceOfIncident = this.incidentForm.value.location;
      this.incidentVm.Id = this.incidentId !== 0 ? this.incidentId : 0;
      this.incidentVm.NatureOfInjuryID = this.incidentForm.value.nature;
      this.incidentVm.IncidentTime = new Date(this.incidentForm.value.timeofincident);
      if (this.incidentForm.value.participants.length !== 0) {
        this.incidentForm.value.participants.forEach(element => {
          this.IncidentInvolvments.push({
            'id': 0,
            'agencyID': this.commonService.getAgencyId(),
            'studentID': element,
            'studentName': '',
            'classesID': this.incidentForm.value.class,
            'className': '',
            'incidentID': this.incidentId !== 0 ? this.incidentId : 0
          });
        });
      }
      this.incidentVm.FirstAidAdministeredID = this.incidentForm.value.firstaidadmin;
      this.incidentVm.IncidentDate = this.incidentForm.value.dateofincident;
      this.incidentVm.ParentInformedBy = this.incidentForm.value.wayofinform;
      this.incidentVm.WasParentInformed = this.incidentForm.value.parentinformed;
      this.incidentVm.Description = this.incidentForm.value.description;
      this.incidentVm.ActionTaken = this.incidentForm.value.action;
      this.incidentVm.ClassesID = this.incidentForm.value.class;
      this.incidentVm.IncidentInvolvments = this.IncidentInvolvments;
      this.incidentVm.partOfBody = this.incidentForm.value.partofbody;
      this.incidentVm.contextEnviroment = this.incidentForm.value.contextenviroment;
      this.incidentVm.contextChild = this.incidentForm.value.contextchild;
      this.incidentVm.isAcknowledge = this.incidentForm.value.acknowledge;
      this.incidentVm.ParentComment = this.incidentForm.value.parentcomment;
      this.apiService.postData(TeacherAPIURLs.SaveIncident, this.incidentVm, null).subscribe(res => {
        if (res.body.statusCode === 200) {
          this.notification.success({
            message: this.incidentId !== 0 ? 'Incident report updated successfully'
              : 'Incident report added successfully', title: ''
          });
          if (type === 2 || this.mode === 1) {
            this.activeTab = 2;
            $('#incidentLog').tab('show');
            this.getAllIncidents();
          } else {
            this.getAllBitingIncidents();
          }
          $('.addincident').modal('hide');
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
      this.commonService.validateAllFields(this.incidentForm);
    }
  }


  changeForm() {
    this.activeTab = 2;
    $('#incidentLog').tab('show');
  }

  closeDialog() {
    this.closeModal = 'modal';
    $('.addincident').modal('hide');
  }

  getAllClassess() {
    const data = {
      'agencyID': this.commonService.getAgencyId()
    };
    this.apiService.postData(TeacherAPIURLs.GetAllClasses, data, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.classList = res.body.data;
      } else {
        this.error.unknownError();
      }

    }, err => {
      this.spinner.hide();
      this.error.commonError(err);
    });
  }


  getStudentsList() {
    this.spinner.show();
    const data = {
      'agencyID': this.commonService.getAgencyId(),
      'classID': this.incidentForm.value.class,
      'studentID': 0,
      'studentName': ''
    };

    this.apiService.postData(TeacherAPIURLs.GetAllStudentsByClass, data, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.spinner.hide();
        this.studentList = res.body.data;
      } else {
        this.spinner.hide();
        this.error.unknownError();
      }
    }, err => {
      this.spinner.hide();
      this.error.commonError(err);
    });
  }

  searchStudent(text) { }

  clearForm() {
    this.incidentId = 0;
    this.participantsList = [];
    this.studentList = [];
    this.createIncidentForm();
  }


  // Method to delete the incident
  deleteIncident(value) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      accept: () => {
        this.spinner.show();
        const data = {
          'agencyID': this.commonService.getAgencyId(),
          'Id': value.id,
          'IsDeleted': true,
          'DeletedDate': new Date(),
          'DeletedBy': 1
        };
        this.apiService.postData(TeacherAPIURLs.DeleteIncident, data, null).subscribe(res => {
          if (res.body.statusCode === 200) {
            this.deleteIncidentSuccess(value);
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

  deleteIncidentSuccess(data) {
    const index = this.incidentsList.findIndex(r => r.id === data.id);
    this.incidentsList.splice(index, 1);
    const index2 = this.bitingLogList.findIndex(r => r.id === data.id);
    this.bitingLogList.splice(index2, 1);
    this.getIncidentCountWithActionTaken(this.incidentsList);
    this.spinner.hide();
    this.notification.success({ message: 'Incident report deleted successfully', title: '' });

  }

  getAllNatureofinjury() {
    const data = {
      'agencyID': this.commonService.getAgencyId()
    };

    this.apiService.postData(TeacherAPIURLs.GetAllNatureofinjury, data, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.injurriesList = res.body.data;
      } else {
        this.spinner.hide();
        this.error.unknownError();
      }
    }, err => {
      this.spinner.hide();
      this.error.commonError(err);
    });
  }


  getAllParticipants() {
    this.incidentForm.controls['participants'].setValue('');
    this.participantsList = [];
    const data = {
      'agencyID': this.commonService.getAgencyId()
    };

    this.apiService.postData(TeacherAPIURLs.GetAllStudentDropdown, data, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        const list = res.body.data;
        list.forEach(element => {
          if (element.value.toString() !== this.incidentForm.value.studentname) {
            this.participantsList.push(element);
          }
        });
      } else {
        this.spinner.hide();
        this.error.unknownError();
      }
    }, err => {
      this.spinner.hide();
      this.error.commonError(err);
    });

  }


  getIncidentPriorities() {
    this.incidentForm.controls['participants'].setValue('');
    this.participantsList = [];
    const data = {
      'agencyID': this.commonService.getAgencyId()
    };

    this.apiService.postData(TeacherAPIURLs.GetAllIncidentPriortyTypeDropdown, data, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.incidentPrioritiesList = res.body.data;
      } else {
        this.spinner.hide();
        this.error.unknownError();
      }
    }, err => {
      this.spinner.hide();
      this.error.commonError(err);
    });
  }

  /**Method to get incident counts on which action is not taken*/
  getIncidentCountWithActionTaken(listofincident) {
    let count = 0;
    listofincident.forEach(element => {
      if (element.actionTaken === '') {
        count++;
      }
    });
    this.commonService.saveIncidentCount(count);
  }

  paginate(event, tab) {
    this.pageNo = event.page;
    if (tab === 1) {
      this.getAllIncidents();
    } else {
      this.getAllBitingIncidents();
    }
  }

  onTabChange() {
    this.pageNo = 0;
  }

  search() {
    this.showClearBtn = true;
    this.getAllIncidents();
  }


  pdfReportForIncident() {
    this.loader = true;
    this.spinner.show();
    const req = {
      'agencyID': this.commonService.getAgencyId(),
      'limit': this.limit,
      'page': this.pageNo,
      'fromDate': this.fromDate ? this.fromDate : this.blankDate,
      'toDate': this.toDate ? this.toDate : this.blankDate,
      'studentName': this.searchByStudentName
    };
    this.apiService.postData(AgencyAPIURLs.PDFAllIncidents, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        const filename = environment.baseUrl + res.body.fileName;
        const name = res.body.fileName;
        window.open(filename);
        setTimeout(() => {
          this.deletePdFFromServer(name);
        }, 10000);
      } else {
        this.error.unknownError();
      }
      this.loader = false;
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.error.commonError(err);
    }
    );
  }

  pdfReportForIncidentForPerticularstudent(data, type) {
    this.loader = true;
    this.spinner.show();
    const req = {
      'agencyID': this.commonService.getAgencyId(),
      'incidentID': data.id
    };
    this.apiService.postData(AgencyAPIURLs.PDFAllIncidentsParticularID, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        const filename = environment.baseUrl + res.body.fileName;
        const name = res.body.fileName;
        window.open(filename);
        setTimeout(() => {
          this.deletePdFFromServer(name);
        }, 10000);
      } else {
        this.error.unknownError();
      }
      this.loader = false;
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.error.commonError(err);
    }
    );
  }

  // Delete pdf after use from server
  deletePdFFromServer(filename) {
    const req = {
      'fileName': filename,
      'agencyID': this.commonService.getAgencyId()
    };
    this.apiService.postData(AgencyAPIURLs.DeleteExistingFile, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
      } else {
      }
    }, err => {
      console.log(err);
    }
    );
  }

  clearSearch() {
    this.searchByStudentName = '';
    this.fromDate = null;
    this.toDate = null;
    this.showClearBtn = false;
    this.getAllIncidents();
  }
}
