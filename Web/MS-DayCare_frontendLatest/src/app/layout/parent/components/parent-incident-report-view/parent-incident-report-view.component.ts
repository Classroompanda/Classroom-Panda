import { Component, OnInit } from '@angular/core';
import { ParentApiService } from '../../shared/services/parent-api-service';
import { ErrorHandlerService } from '../../../../shared/services/error-handler/error-handler.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from '../../../../shared/services/notification-service/notification.service';
import { CommonService } from '../../../../shared/services/common/common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ParentAPIURLs } from '../../shared/constant';
import { ChildListVM } from '../../shared/view-model/parent-detailsvm';
import { TeacherStudentDetailsVM, GuardiansDetailsVM } from '../../../teacher/shared/view-model/teacher-students-detailsVM';
import { TeacherAPIURLs } from 'src/app/layout/teacher/shared/constant';
import { IncidentVM } from 'src/app/layout/teacher/shared/view-model/incidentVm';
import { BsDatepickerConfig } from 'ngx-bootstrap';
declare var $: any;
@Component({
  selector: 'app-parent-incident-report-view',
  templateUrl: './parent-incident-report-view.component.html',
  styleUrls: ['./parent-incident-report-view.component.css']
})
export class ParentIncidentReportViewComponent implements OnInit {
  childList: ChildListVM[] = [];
  childVM: TeacherStudentDetailsVM = {};
  incidentsList: any [] = [];
  loader = true;
  searchDate: any;
  incidentId: number;
  incidentVm: IncidentVM = {};
  incidentForm: FormGroup;
  participantSudents: any[] = [];
  studentList: any[] = [];
  participantsList: any[] = [];
  classList: any[] = [];
  teacherList: any[] = [];
  injurriesList: any[] = [];
  incidentPrioritiesList: any[] = [];
  IncidentInvolvments: any[] = [];
  pageNo = 0;
  limit = 10;
  totalRecord = 0;
  nullDate: any;
  showClearBtn = false;
  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  constructor(private apiService: ParentApiService, private error: ErrorHandlerService,
    private spinner: NgxSpinnerService, private notification: NotificationService,
    private commonService: CommonService, private fb: FormBuilder, private route: ActivatedRoute) { }
    serchByChild: number;
    today = new Date();
  ngOnInit() {
    this.dpConfig = Object.assign({}, { containerClass: 'theme-dark-blue' },
      { showWeekNumbers: false });
    this.incidentId = 0;
    this.getAllChildrenList();
    this.createIncidentForm();
   this.getAllClassess();
    this.getAllTeachers();
    this.getAllNatureofinjury();
     this.getIncidentPriorities();
  }


  getAllChildrenList() {
     this.spinner.show();
    this.childList = [];
    const req = {
      'AgencyID': this.commonService.getAgencyId(),
      'classID': 0,
      'studentID': this.serchByChild,
      'parentID': this.commonService.getReleventUserId('userdetails'),
      'studentName': '',
    };
    this.apiService.postData(ParentAPIURLs.GetAllStudentsOfParent, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        if (res.body.data.length > 0 && res.body.data !== []) {
          this.childList = res.body.data;
          if (this.childList.length !== 0) {
            this.serchByChild = this.childList[0].studentId;
             this.getPerticuerStudentIncident();
          } else {
            this.spinner.hide();
          }
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



  getPerticuerStudentIncident() {
    this.loader = true;
    this.incidentsList = [];
    this.spinner.show();
    const req = {
      'agencyID': this.commonService.getAgencyId(),
      'studentID' : this.serchByChild ? this.serchByChild : 0,
      'incidentDate': this.searchDate ? this.searchDate.toDateString() : this.searchDate,
      'limit': this.limit,
      'page': this.pageNo
    };
    this.apiService.postData(TeacherAPIURLs.GetAllIncidentsByChildID, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.totalRecord = res.body.totalRows;
        this.incidentsList = res.body.data;
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
        timeofincident: [''],
        parentinformed: ['', Validators.required],
        wayofinform: [''],
        description: [''],
        action: [''],
        class: ['', Validators.required],
        priority: [''],
        parentcomment: [''],
        partofbody: [''],
        contextenviroment: [''],
        contextchild: [''],
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
        timeofincident: [this.incidentVm.IncidentTime],
        parentinformed: [this.incidentVm.WasParentInformed, Validators.required],
        wayofinform: [this.incidentVm.ParentInformedBy],
        description: [this.incidentVm.Description],
        action: [this.incidentVm.ActionTaken],
        class: [this.incidentVm.ClassesID, Validators.required],
        priority: [this.incidentVm.IncidentPriortyTypeID],
        parentcomment: [this.incidentVm.ParentComment],
        partofbody: [this.incidentVm.partOfBody],
        contextenviroment: [this.incidentVm.contextEnviroment],
        contextchild: [this.incidentVm.contextChild],
        acknowledge: [this.incidentVm.isAcknowledge]
      });
    }
  }

   // convenience getter for easy access to form fields
   get f() { return this.incidentForm.controls; }

   getIncidentsDetails(data) {
     this.getAllParticipants();
     this.incidentVm = {};
     this.spinner.show();
     const req = {
       'agencyID': this.commonService.getAgencyId(),
       'incidentID': data.id // Pass proper incident id here,
     };
     this.apiService.postData(TeacherAPIURLs.GetIncidentsDetails, req, null).subscribe(res => {
       if (res.body.statusCode === 200) {
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
         this.incidentVm.ParentComment = res.body.data.parentComment;
         this.incidentVm.contextChild = res.body.data.contextChild;
        this.incidentVm.contextEnviroment = res.body.data.contextEnviroment;
        this.incidentVm.partOfBody = res.body.data.partOfBody;
         this.participantSudents = [];
         res.body.data.incidentInvolvments.forEach(element => {
           this.participantSudents.push(element.studentID);
         });
         this.incidentVm.isAcknowledge = res.body.data.isAcknowledge;
         this.createEditablrForm();
         this.getStudentsList();
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



  getAllIncidents() {
    this.spinner.show();
    const req = {
      'agencyID': this.commonService.getAgencyId(),
     // 'limit': this.limit,
     // 'page': this.pageNo
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
  getIncidentCountWithActionTaken(listofincident) {
    let count = 0;
    listofincident.forEach(element => {
        if (element.actionTaken === '') {
            count ++;
        }
    });
    this.commonService.saveIncidentCount(count);
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

// Method to create incident
saveIncident() {
  this.IncidentInvolvments = [];
  if (this.incidentForm.valid) {
    this.spinner.show();
    this.incidentVm.StudentID = this.incidentForm.value.studentname;
    //  this.incidentVm.Age =  this.incidentForm.value.age;
    this.incidentVm.AgencyID = this.commonService.getAgencyId();
    this.incidentVm.TeacherID = this.incidentForm.value.reporter; // sending teacher id as reporter id
    this.incidentVm.IncidentPriortyTypeID = this.incidentForm.value.priority;
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
    this.incidentVm.FirstAidAdministeredID =  this.incidentForm.value.firstaidadmin;
    this.incidentVm.IncidentDate = this.incidentForm.value.dateofincident;
    this.incidentVm.ParentInformedBy = this.incidentForm.value.wayofinform;
    this.incidentVm.WasParentInformed =  this.incidentForm.value.parentinformed;
    this.incidentVm.Description = this.incidentForm.value.description;
    this.incidentVm.ActionTaken = this.incidentForm.value.action;
    this.incidentVm.ClassesID = this.incidentForm.value.class;
    this.incidentVm.IncidentInvolvments = this.IncidentInvolvments;
    this.incidentVm.ParentComment = this.incidentForm.value.parentcomment;
    this.incidentVm.isAcknowledge = this.incidentForm.value.acknowledge;
    this.incidentVm.contextChild = this.incidentForm.value.contextchild;
    this.incidentVm.contextEnviroment = this.incidentForm.value.contextenviroment;
    this.incidentVm.partOfBody = this.incidentForm.value.partofbody;
    this.incidentVm.createdBy = this.commonService.getLoggedInUserId();
    this.apiService.postData(TeacherAPIURLs.SaveIncident, this.incidentVm, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        // this.incidentForm.reset();
        this.notification.success({
          message: this.incidentId !== 0 ? 'Incident report updated successfully'
            : 'Incident report added successfully', title: ''
        });
        // this.getAllIncidents();
        this.getPerticuerStudentIncident();

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


paginate(event) {
  this.pageNo = event.page;
  // this.limit = event.page;
  this.getPerticuerStudentIncident();
}

clearSearch() {
  this.showClearBtn = false;
  this.pageNo = 0;
  this.serchByChild = 0;
  this.searchDate = this.nullDate;
  this.getPerticuerStudentIncident();

}

serachIncident() {
  this.showClearBtn = true;
  this.getPerticuerStudentIncident();
}

}
