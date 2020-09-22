import { Component, OnInit } from '@angular/core';
import { TeacherApiService } from '../../shared/services/teacher-api-service/teacher-api.service';
import { ErrorHandlerService } from '../../../../shared/services/error-handler/error-handler.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from '../../../../shared/services/notification-service/notification.service';
import { CommonService } from '../../../../shared/services/common/common.service';
import { TeacherAPIURLs } from '../../shared/constant';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IncidentVM, IncidentInvolvmentVM } from '../../shared/view-model/incidentVm';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { ConfirmationService } from 'primeng/api';
// import * as $ from 'jquery';
declare var $: any;

@Component({
  selector: 'app-teacherincedent',
  templateUrl: './teacherincedent.component.html',
  styleUrls: ['./teacherincedent.component.css']
})
export class TeacherincedentComponent implements OnInit {
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
  bitingLogList: any [] = [];
  loader = true;
  mode = 0;
  activeTab = 1;
  pageNo = 0;
  limit = 10;
  totalRecord = 0;
  fromDate: any;
  toDate: any;
  blankDate: any;
  searchByStudentName: string;
  showClearBtn = false;
  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  constructor(private apiService: TeacherApiService, private error: ErrorHandlerService,
    private spinner: NgxSpinnerService, private notification: NotificationService,
    private commonService: CommonService, private fb: FormBuilder, private confirmationService: ConfirmationService) {
  }

  ngOnInit() {
    this.loader = true;
    this.participantSudents = [];
    this.incidentVm = {};
    this.incidentId = 0;
    this.dpConfig = Object.assign({}, { containerClass: 'theme-dark-blue' },
      { showWeekNumbers: false });
    // this.spinner.show();
    this.today = new Date();
    this.createIncidentForm();
    this.getAllIncidents();
    this.getAllClassess();
    this.getAllTeachers();
    this.getAllNatureofinjury();
    this.getIncidentPriorities();
  }

  createIncidentForm() {
    if (this.incidentId === 0) {
      this.incidentForm = this.fb.group({
        studentname: ['', Validators.required],
        age: [''],
        reporter: [''],
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
        if (res.body.data !== null) {
          this.incidentVm.AgencyID = this.commonService.getAgencyId();
          this.incidentId = res.body.data.id;
          this.incidentVm.ClassesID = res.body.data.classesID;
          this.incidentVm.StudentID = res.body.data.studentID;
          this.incidentVm.Reporter = res.body.data.teacherID;
          this.incidentVm.IncidentLocation = res.body.data.placeOfIncident;
          this.incidentVm.NatureOfInjuryID = res.body.data.natureOfInjuryID;
          this.incidentVm.FirstAidAdministeredID = res.body.data.firstAidAdministeredID;
          this.incidentVm.IsDoctorRequired = res.body.data.isDoctorRequired;
          this.incidentVm.IncidentDate = this.commonService.getLocalDateTimeFromUTC( res.body.data.incidentDate);
        this.incidentVm.IncidentTime = this.commonService.getLocalDateTimeFromUTC(res.body.data.incidentTime);
       // this.incidentForm.controls['timeofincident'].setValue(this.incidentVm.IncidentTime);
          this.incidentVm.WasParentInformed = res.body.data.wasParentInformed;
          this.incidentVm.Description = res.body.data.description;
          this.incidentVm.ActionTaken = res.body.data.actionTaken;
          this.incidentVm.IncidentPriortyTypeID = res.body.data.incidentPriortyTypeID;
          this.incidentVm.ParentInformedBy = res.body.data.parentInformedBy;
          this.incidentVm.contextChild = res.body.data.contextChild;
          this.incidentVm.contextEnviroment = res.body.data.contextEnviroment;
          this.incidentVm.partOfBody = res.body.data.partOfBody;
          this.incidentVm.isAcknowledge = res.body.data.isAcknowledge;
          this.incidentVm.ParentComment = res.body.data.parentComment;
          this.participantSudents = [];
          res.body.data.incidentInvolvments.forEach(element => {
            this.participantSudents.push(element.studentID);
          });
          this.createEditablrForm();
          this.getStudentsList();
          this.spinner.hide();
        }
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
       // this.getIncidentCountWithActionTaken(this.incidentsList);
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
    // this.spinner.show();
    const req = {
      'agencyID': this.commonService.getAgencyId(),
    };
    this.apiService.postData(TeacherAPIURLs.GetAllTeachers, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.teacherList = res.body.data;
        //  this.spinner.hide();
      } else {
        //   this.spinner.hide();
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
      //  this.incidentVm.Age =  this.incidentForm.value.age;
      this.incidentVm.AgencyID = this.commonService.getAgencyId();
      this.incidentVm.TeacherID = this.commonService.getReleventUserId('userdetails'); // sending teacher id as reporter id
      this.incidentVm.IncidentPriortyTypeID = this.incidentForm.value.priority === '' ? 0 : this.incidentForm.value.priority;
      this.incidentVm.Reporter = this.incidentForm.value.reporter;
      this.incidentVm.PlaceOfIncident = this.incidentForm.value.location;
      this.incidentVm.contextChild = this.incidentForm.value.contextchild;
      this.incidentVm.contextEnviroment = this.incidentForm.value.contextenviroment;
      this.incidentVm.partOfBody = this.incidentForm.value.partofbody;
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
      this.incidentVm.FirstAidAdministeredID =  this.incidentForm.value.firstaidadmin;
      this.incidentVm.IncidentDate = this.incidentForm.value.dateofincident;
      this.incidentVm.ParentInformedBy = this.incidentForm.value.wayofinform;
      this.incidentVm.WasParentInformed =  this.incidentForm.value.parentinformed;
      this.incidentVm.Description = this.incidentForm.value.description;
      this.incidentVm.ActionTaken = this.incidentForm.value.action;
      this.incidentVm.ClassesID = this.incidentForm.value.class;
      this.incidentVm.IncidentInvolvments = this.IncidentInvolvments;
      this.incidentVm.isAcknowledge = this.incidentForm.value.acknowledge;
      this.incidentVm.ParentComment = this.incidentForm.value.parentcomment;
      this.incidentVm.createdBy = this.incidentId === 0 ? null : this.commonService.getLoggedInUserId();
      this.incidentVm.updatedBy = this.incidentId !== 0 ? this.commonService.getLoggedInUserId() : null;
      this.apiService.postData(TeacherAPIURLs.SaveIncident, this.incidentVm, null).subscribe(res => {
        if (res.body.statusCode === 200) {
          // this.incidentForm.reset();
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
         // this.spinner.hide();
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
    //  this.validateAllFields(this.incidentForm);
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
    // this.spinner.show();
    const data = {
      'agencyID': this.commonService.getAgencyId()
    };
    this.apiService.postData(TeacherAPIURLs.GetAllClasses, data, null).subscribe(res => {
      //  this.spinner.hide();
      if (res.body.statusCode === 200) {
        this.classList = res.body.data;
      } else {
        //     this.spinner.hide();
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
        // student.forEach(element => {
        //   this.studentList.push(element.studentName);
        // });
      } else {
        this.spinner.hide();
        this.error.unknownError();
      }
    }, err => {
      this.spinner.hide();
      this.error.commonError(err);
    });
  }


  // Method to search organization name
  //  searchStudent(text) {
  // if (text.query.length <= 2 && text.query !== '') {
  //   return;
  // }
  // this.searchedStudentList = [];
  // for (let i = 0; i < this..length; i++) {
  //   const organization = this.allOrganizationList[i];
  //   if (organization.toLowerCase().indexOf(text.query.toLowerCase()) === 0) {
  //     this.organizationList.push(organization);
  //     }
  //   }
  // }

  searchStudent(text) { }



  clearForm() {
    this.incidentId = 0;
    this.participantsList = [];
    this.studentList = [];
    // this.incidentForm.reset();
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
          'DeletedBy': this.commonService.getLoggedInUserId()
        };
        this.apiService.postData(TeacherAPIURLs.DeleteIncident, data, null).subscribe(res => {
          if (res.body.statusCode === 200) {
            // this.spinner.hide();
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
    // if (res.body === 1) {
      const index = this.incidentsList.findIndex(r => r.id === data.id);
      this.incidentsList.splice(index, 1);
      const index2 = this.bitingLogList.findIndex(r => r.id === data.id);
      this.bitingLogList.splice(index2, 1);
      this.getIncidentCountWithActionTaken(this.incidentsList);
      this.spinner.hide();
      this.notification.success({message: 'Incident report deleted successfully', title: ''});
    // } else {
    //   this.error.unknownError();
    // }
  }

  getAllNatureofinjury() {
   // this.spinner.show();
    const data = {
      'agencyID': this.commonService.getAgencyId()
    };

    this.apiService.postData(TeacherAPIURLs.GetAllNatureofinjury, data, null).subscribe(res => {
      if (res.body.statusCode === 200) {
     //   this.spinner.hide();
        this.injurriesList = res.body.data;
        // student.forEach(element => {
        //   this.studentList.push(element.studentName);
        // });
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
     //   this.spinner.hide();
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
     //   this.spinner.hide();
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
            count ++;
        }
    });
    this.commonService.saveIncidentCount(count);
  }


 paginate(event, tab) {
    this.pageNo = event.page;
    // this.limit = event.page;
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


  clearSearch() {
    this.searchByStudentName = '';
    this.fromDate = null;
    this.toDate = null;
    this.showClearBtn = false;
    this.getAllIncidents();
  }
}
