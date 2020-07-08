import { Component, OnInit } from '@angular/core';
import { ParentApiService } from '../../shared/services/parent-api-service';
import { ErrorHandlerService } from '../../../../shared/services/error-handler/error-handler.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from '../../../../shared/services/notification-service/notification.service';
import { CommonService } from '../../../../shared/services/common/common.service';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { ParentAPIURLs } from '../../shared/constant';
import { ChildListVM } from '../../shared/view-model/parent-detailsvm';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { ActivityVM, MealVM, HealthVM, MoodVM, NotesVM, NapVM, DiperVM } from '../../../teacher/shared/view-model/daily-activityVM';
import { TeacherAPIURLs } from '../../../teacher/shared/constant';
declare var $: any;
@Component({
  selector: 'app-parent-activity-report',
  templateUrl: './parent-activity-report.component.html',
  styleUrls: ['./parent-activity-report.component.css']
})
export class ParentActivityReportComponent implements OnInit {
  childList: ChildListVM[] = [];
  searchDate = new Date();
  searchByDateString: any;
  chhildImagePath = '';
  childName = '';
  studentId = 0;
  activityList: any[] = [];
  today = new Date();
  notesForm: FormGroup;
  activityForm: FormGroup;
  mealForm: FormGroup;
  napForm: FormGroup;
  diperForm: FormGroup;
  healthForm: FormGroup;
  moodForm: FormGroup;
  activityVM: ActivityVM = {};
  mealVm: MealVM = {};
  HealthVM: HealthVM = {};
  MoodVM: MoodVM = {};
  NotesVM: NotesVM = {};
  NapVM: NapVM = {};
  DiperVM: DiperVM = {};
  foodList: any[] = [];
  showHappy = false;
  showSad = false;
  showSleepy = false;
  showFussy = false;
  showGrumpy = false;
  loader = true;
  foodConsumptionType: any[] = [];
  mealPlanList: any[] = [];
  mealId = 0;
  studentListId: any[] = [];
  parentType: string;

  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  constructor(private apiService: ParentApiService, private error: ErrorHandlerService,
    private spinner: NgxSpinnerService, private notification: NotificationService,
    private commonService: CommonService, private confirmationService: ConfirmationService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.searchDate = new Date();
    this.searchByDateString = this.commonService.getStringLocalDateTimeFromUTC(this.searchDate);
    this.parentType = this.commonService.getParentType();
    this.dpConfig = Object.assign({}, { containerClass: 'theme-dark-blue' },
      { showWeekNumbers: false });
    this.getAllChildrenList();
    this.createHealthForm();
    this.createNotesForm();
    this.createMoodForm();
    this.creteActivityForm();
    this.creteNapForm();
    this.creteDiperForm();
    this.creteMealForm();
    this.getFoodConsumption();
    this.getTodaysMealPlan();
  }


  creteActivityForm() {
    this.activityForm = this.fb.group({
      starttime: [{ value: this.activityVM.startTime, disabled: true }],
      endtime: [{ value: this.activityVM.endTime, disabled: true }],
      activity: [{ value: this.activityVM.otherActivityNote, disabled: true }]
    });
  }

  creteNapForm() {
    this.napForm = this.fb.group({
      napstart: [{ value: this.NapVM.sleptAtTime, disabled: true }],
      napend: [{ value: this.NapVM.workUpTime, disabled: true }],
      napdiscription: [{ value: this.NapVM.napNote, disabled: true }]
    });
  }

  creteMealForm() {
    this.mealForm = this.fb.group({
      mealcmnt: [{ value: this.mealVm.mealComment, disabled: true }],
      othermealplan: [{ value: this.mealVm.otherThanPlanMeal, disabled: true }],
      othermealcmnt: [{ value: this.mealVm.otherThanPlanMealComment, disabled: true }],
      plantype: [{ value: this.mealVm.mealPlanTitle, disabled: true }],
      amount: [{ value: '', disabled: true }],
      quantity: [{ value: '', disabled: true }],
      unit: [{ value: '', disabled: true }],
      foodconsumption: this.fb.array([]),
    });
    this.initItemRows();
  }



  creteDiperForm() {
    this.diperForm = this.fb.group({
      diperchangetime: [{ value: this.DiperVM.diaperChangeTime, disabled: true }],
      description: [{ value: this.DiperVM.StudentActivityDiaperNote, disabled: true }]
    });
  }


  initItemRows() {

    const ctrl = <FormArray>this.mealForm.get('foodconsumption') as FormArray;
    for (let i = 0; i < this.foodList.length; i++) {
      ctrl.push(this.fb.group({
        foodconsumtionid: [{ value: this.foodList[i].foodConsumtionID, disabled: true }],
        milkconsumptionquantity: [{ value: this.foodList[i].milkConsumptionQuantity, disabled: true }]
      }));
    }
  }



  get consumption() {
    return this.mealForm.get('consumption_arr') as FormArray;
  }

  createHealthForm() {
    this.healthForm = this.fb.group({
      temperature: [this.HealthVM.recordedTemparture],
      tempcmnt: [this.HealthVM.studentHealthDescription],
      howtotake: [this.HealthVM.howTaken],
      repeatdose: [this.HealthVM.doseRepeatName],
      medicationName: [this.HealthVM.studentMedicationName],
      unit: [this.HealthVM.unit],
      parentacknowledge: [this.HealthVM.isParentAcknowledge]
    });
  }

  createMoodForm() {
    this.moodForm = this.fb.group({
      mood: [this.MoodVM.moodTypeID],
      moodcomment: [{ value: this.MoodVM.studentMoodDescription, disabled: true }]
    });
  }

  createNotesForm() {
    this.notesForm = this.fb.group({
      notes: [{ value: this.NotesVM.noteDescription, disabled: true }]
    });

  }


  getAllChildrenList() {
    // this.spinner.show();
    this.childList = [];
    const req = {
      'AgencyID': this.commonService.getAgencyId(),
      'classID': 0,
      'studentID': 0,
      'parentID': this.commonService.getReleventUserId('userdetails'),
      'studentName': '',
    };
    this.apiService.postData(ParentAPIURLs.GetAllStudentsOfParent, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        if (res.body.data.length > 0 && res.body.data !== []) {
          this.childList = res.body.data;
          this.childList[0].isActive = true;
          this.chhildImagePath = this.childList[0].imagePath;
          this.childName = this.childList[0].studentName;
          this.studentId = this.childList[0].studentId;
          console.log('child', this.studentId);
          this.getDailyActivityOfPerticulerChild();
          console.log('chi', this.childList);
        }
        //  this.spinner.hide();
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

  addActivClassStudentList(value) {
    this.childName = value.studentName;
    this.studentId = value.studentId;
    this.chhildImagePath = value.imagePath;
    this.childList.forEach(x => {
      if (x.studentId === value.studentId) {
        x.isActive = true;
      } else {
        x.isActive = false;
      }
    });
    this.getDailyActivityOfPerticulerChild();
  }


  getDailyActivityOfPerticulerChild() {
    this.loader = true;
    this.spinner.show();
    this.activityList = [];
    const req = {
      'agencyID': this.commonService.getAgencyId(),
      'classID': 0,
      'studentID': this.studentId,
      'parentID': this.commonService.getReleventUserId('userdetails'),
      'studentName': '',
      'askedDate': this.searchDate,
      'askedDateString': this.searchByDateString
    };
    this.apiService.postData(ParentAPIURLs.GetDailySheetForParent, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        if (res.body.data && res.body.data !== [] && res.body.data !== null) {
          res.body.data[0].activityDetail.forEach(element => {
            element.activityDescription = element.activityDescription.replace(/^,/, '');
            element.createdDate = this.commonService.getLocalDateTimeFromUTC(element.createdDate);
          });
          this.activityList = res.body.data[0].activityDetail;
          this.spinner.hide();
          this.loader = false;
        } else {
          this.spinner.hide();
          this.loader = false;
          this.activityList = [];
        }
        //  this.spinner.hide();
      } else {
        this.loader = false;
        this.spinner.hide();
        this.error.unknownError();
      }
    }, err => {
      this.loader = false;
      this.spinner.hide();
      this.error.commonError(err);
    }
    );
  }

  getParticularStudentActivityMedications(value) {
    this.spinner.show();
    const req = {
      'AgencyID': this.commonService.getAgencyId(),
      'studentAcitivityId': value.studentActivityID,
    };

    this.apiService.postData(ParentAPIURLs.GetParticularStudentActivityMedications, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        if (res.body.data && res.body.data !== []) {
          this.HealthVM.id = res.body.data.id;
          this.HealthVM.studentActivitiesID = res.body.data.studentActivitiesID;
          this.HealthVM.recordedTemparture = res.body.data.recordedTemparture;
          this.HealthVM.studentHealthDescription = res.body.data.studentHealthDescription;
          this.HealthVM.classesID = res.body.data.classesID;
          this.HealthVM.studentMedicationName = res.body.data.studentMedicationName;
          this.HealthVM.howTaken = res.body.data.howTaken;
          this.HealthVM.doseRepeatName = res.body.data.doseRepeatName;
          this.HealthVM.unit = res.body.data.unit;
          this.HealthVM.acknowledgeTeacherName = res.body.data.acknowledgeTeacherName;
          this.HealthVM.studentMedicationID = res.body.data.studentMedicationID;
          this.HealthVM.doseRepeatID = res.body.data.doseRepeatID;
          this.HealthVM.dosageQuantityID = res.body.data.dosageQuantityID;
          this.HealthVM.AcknowledgeTeacherID = res.body.data.acknowledgeTeacherID;
          this.HealthVM.isParentAcknowledge = res.body.data.isParentAcknowledge;
          this.HealthVM.isTeacherAcknowledge = res.body.data.isTeacherAcknowledge;
          this.createHealthForm();
          $('#edithealth').modal('show');
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

  saveAcknowledgeforMedication() {
    this.studentListId = [];
    this.HealthVM.id = this.HealthVM.id;
    this.HealthVM.studentActivitiesID = this.HealthVM.studentActivitiesID === null ||
      this.HealthVM.studentActivitiesID === undefined ?
      0 : this.HealthVM.studentActivitiesID;
    this.HealthVM.agencyID = this.commonService.getAgencyId();
    this.HealthVM.recordedTemparture = this.healthForm.value.temperature;
    this.HealthVM.studentHealthDescription = this.healthForm.value.tempcmnt;
    this.HealthVM.doseRepeatName = this.healthForm.value.repeatdose;
    this.HealthVM.studentMedicationName = this.healthForm.value.medicationName;
    this.HealthVM.unit = this.HealthVM.unit ? this.HealthVM.unit : 0;
    this.HealthVM.howTaken = this.healthForm.value.howtotake;
    this.HealthVM.doseRepeatID = this.HealthVM.doseRepeatID === undefined ? 0 : this.HealthVM.doseRepeatID;
    this.HealthVM.dosageQuantityID = this.HealthVM.dosageQuantityID === undefined ? 0 : this.HealthVM.dosageQuantityID;
    this.HealthVM.studentMedicationID = this.HealthVM.studentMedicationID === undefined ? 0 : this.HealthVM.studentMedicationID;
    this.HealthVM.isParentAcknowledge = this.healthForm.value.parentacknowledge;
    this.HealthVM.isTeacherAcknowledge = this.HealthVM.AcknowledgeTeacherID !== undefined &&
      this.HealthVM.AcknowledgeTeacherID === 0 ? false : true;
    if (this.healthForm.value.parentacknowledge === true) {
      this.HealthVM.AcknowledgeParentID = this.commonService.getLoggedInUserId();
    } else {
      this.HealthVM.AcknowledgeParentID = 0;
    }
    this.HealthVM.AcknowledgeTeacherID = this.HealthVM.AcknowledgeTeacherID ? this.HealthVM.AcknowledgeTeacherID : 0;
    this.studentListId.push(this.studentId);
    const req = {
      'studentActivityMedications': this.HealthVM,
      'activityTypeID': 1,
      'selectedStudents': this.studentListId,
      'agencyID': this.commonService.getAgencyId(),
      'classesID': this.HealthVM.classesID,
      'id': this.HealthVM.studentActivitiesID,
      'createdBy': this.commonService.getLoggedInUserId(),
      'activityRegisterDate': this.today.toDateString()
    };
    this.saveMedication(req);

  }


  saveMedication(req) {
    this.apiService.postData(TeacherAPIURLs.SaveStudentActivity, req, null).subscribe(res => {
      this.spinner.hide();
      if (res.body.statusCode === 200) {
        $('#edithealth').modal('hide');
        this.notification.success({ message: 'Save Changes', title: '' });
      } else {
        this.spinner.hide();
        this.error.unknownError();
      }

    }, err => {
      this.spinner.hide();
      this.error.commonError(err);
    });
  }


  getParticularStudentActivityMoods(value) {
    this.spinner.show();
    const req = {
      'AgencyID': this.commonService.getAgencyId(),
      'studentAcitivityId': value.studentActivityID,
    };

    this.apiService.postData(ParentAPIURLs.GetParticularStudentActivityMoods, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        if (res.body.data && res.body.data !== []) {
          this.MoodVM.studentMoodDescription = res.body.data.studentMoodDescription;
          this.MoodVM.id = res.body.data.id;
          //  this.moodId = res.body.data.id;
          this.MoodVM.studentActivitiesID = res.body.data.studentActivitiesID;
          this.MoodVM.moodTypeID = res.body.data.moodTypeID;
          if (this.MoodVM.moodTypeID === 1) {
            this.showHappy = true;
            this.showSleepy = false;
            this.showSad = false;
            this.showFussy = false;
            this.showGrumpy = false;
          } else if (this.MoodVM.moodTypeID === 2) {
            this.showSad = true;
            this.showHappy = false;
            this.showSleepy = false;
            this.showFussy = false;
            this.showGrumpy = false;
          } else if (this.MoodVM.moodTypeID === 3) {
            this.showSleepy = true;
            this.showHappy = false;
            this.showSad = false;
            this.showFussy = false;
            this.showGrumpy = false;
          } else if (this.MoodVM.moodTypeID === 4) {
            this.showSleepy = false;
            this.showHappy = false;
            this.showSad = false;
            this.showFussy = true;
            this.showGrumpy = false;
          } else {
            this.showSleepy = false;
            this.showHappy = false;
            this.showSad = false;
            this.showFussy = false;
            this.showGrumpy = true;
          }
          //   this.MoodVM.studentID = studId;
          this.createMoodForm();
          //  this.MoodVM.agencyID = agencyID ;
          this.MoodVM.moodTypeID = res.body.data.moodTypeID;
          $('#editmood').modal('show');
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

  getParticularStudentActivityDiaperChanges(value) {
    this.spinner.show();
    const req = {
      'AgencyID': this.commonService.getAgencyId(),
      'studentAcitivityId': value.studentActivityID,
    };

    this.apiService.postData(ParentAPIURLs.GetParticularStudentActivityDiaperChanges, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        if (res.body.data && res.body.data !== []) {
          // this.DiperVM.id = data.id;
          this.DiperVM.diaperChangeTime = this.commonService.getLocalDateTimeFromUTC(res.body.data.diaperChangeTime);
          this.DiperVM.StudentActivityDiaperNote = res.body.data.studentActivityDiaperNote;
          this.NapVM.studentActivitiesID = res.body.data.studentActivitiesID;
          // this.diperId = res.body.data.id;
          // this.NotesVM.studentID = studId;
          this.creteDiperForm();
          $('#editdiper').modal('show');
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

  getParticularStudentActivityNap(value) {
    this.spinner.show();
    const req = {
      'AgencyID': this.commonService.getAgencyId(),
      'studentAcitivityId': value.studentActivityID,
    };

    this.apiService.postData(ParentAPIURLs.GetParticularStudentActivityNap, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        if (res.body.data && res.body.data !== []) {
          this.NapVM.sleptAtTime = this.commonService.getLocalDateTimeFromUTC(res.body.data.sleptAtTime);
          this.NapVM.workUpTime = this.commonService.getLocalDateTimeFromUTC(res.body.data.workUpTime);
          this.NapVM.napNote = res.body.data.napNote;
          this.NapVM.id = res.body.data.id;
          this.NapVM.studentActivitiesID = res.body.data.studentActivitiesID;
          this.creteNapForm();
          $('#editnap').modal('show');
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


  getParticularStudentActivityMeals(value) {
    this.spinner.show();
    const req = {
      'AgencyID': this.commonService.getAgencyId(),
      'studentAcitivityId': value.studentActivityID,
    };

    this.apiService.postData(ParentAPIURLs.GetParticularStudentActivityMeals, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        if (res.body.data && res.body.data !== []) {
          //   this.getSelectedMealPlan();
          this.mealForm.controls['unit'].setValue('');
          this.mealForm.controls['quantity'].setValue('');
          this.mealForm.updateValueAndValidity();
          this.foodList = [];
          // //  this.mealVm.mealTypeID = this.mealForm.value.meal;
          this.mealVm.mealComment = res.body.data.mealComment;
          this.mealVm.otherThanPlanMeal = res.body.data.otherThanPlanMeal;
          this.mealVm.otherThanPlanMealComment = res.body.data.otherThanPlanMealComment;
          this.mealVm.studentActivitiesID = res.body.data.studentActivitiesID;
          this.mealVm.mealPlanTitle = res.body.data.mealPlanTitle;
          this.mealVm.id = this.mealId;
          // this.mealVm.studentID = studId;
          this.mealId = res.body.data.id;
          this.foodList = res.body.data.studentActivityMealFoodItems;
          this.creteMealForm();
          $('#editmeal').modal('show');
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


  getParticularStudentActivityNotes(value) {
    this.spinner.show();
    const req = {
      'AgencyID': this.commonService.getAgencyId(),
      'studentAcitivityId': value.studentActivityID,
    };

    this.apiService.postData(ParentAPIURLs.GetParticularStudentActivityNotes, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        if (res.body.data && res.body.data !== []) {
          this.NotesVM.noteDescription = res.body.data.noteDescription;
          this.NotesVM.id = res.body.data.id;
          this.NotesVM.studentActivitiesID = res.body.data.studentActivitiesID;
          this.createNotesForm();
          $('#editpost').modal('show');
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

  getParticularStudentOtherActivity(value) {
    this.spinner.show();
    const req = {
      'AgencyID': this.commonService.getAgencyId(),
      'studentAcitivityId': value.studentActivityID,
    };

    this.apiService.postData(ParentAPIURLs.GetParticularStudentOtherActivity, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        if (res.body.data && res.body.data !== []) {
          this.activityVM.startTime = this.commonService.getLocalDateTimeFromUTC(res.body.data.startTime);
          this.activityVM.endTime = this.commonService.getLocalDateTimeFromUTC(res.body.data.endTime);
          this.activityVM.otherActivityNote = res.body.data.otherActivityNote.replace(/^,/, '');
          this.activityVM.id = res.body.data.id;
          // this.activityId = res.body.data.id;
          this.activityVM.studentActivitiesID = res.body.data.studentActivitiesID;
          this.creteActivityForm();
          $('#editactivity').modal('show');
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



  findActivity(value) {
    switch (value.activityTypeID) {
      case 1:
        this.getParticularStudentActivityMedications(value);
        break;
      case 2:
        this.getParticularStudentActivityNotes(value);
        break;
      case 3:
        this.getParticularStudentActivityMeals(value);
        break;
      case 4:
        this.getParticularStudentActivityMoods(value);
        break;
      case 5:
        this.getParticularStudentOtherActivity(value);
        break;
      case 6:
        this.getParticularStudentActivityNap(value);
        break;
      case 7:
        this.getParticularStudentActivityDiaperChanges(value);
        break;
      default:
        break;
    }
  }


  // **  Api for amount consumption for food other than milk */

  getFoodConsumption() {
    const data = {
      'agencyID': this.commonService.getAgencyId()
    };
    this.apiService.postData(TeacherAPIURLs.GetAllFoodConsumtion, data, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        //   this.spinner.hide();
        if (res.body.data !== null && res.body.data !== undefined) {
          let temp: any[] = [];
          this.foodConsumptionType = [];
          temp = res.body.data;
          const nameList = ['None', 'Some', 'Most', 'All'];
          for (let index = 0; index < temp.length; index++) {
            for (let j = 0; j < temp.length; j++) {
              if (nameList[index] === temp[j].foodConsumtionName) {
                this.foodConsumptionType.push(temp[j]);
              }
            }
          }
          console.log('maza', this.foodConsumptionType);
        }
      } else {
        this.spinner.hide();
        this.error.unknownError();
      }
    }, err => {
      this.spinner.hide();
      this.error.commonError(err);
    });
  }

  getTodaysMealPlan() {
    const data = {
      'studentActivitiesId': 0,
      'agencyID': this.commonService.getAgencyId(),
      'studentID': 0,
      'classID': 1,
      'askedDate': this.searchDate,
      'limit': 0,
      'page': 0
    };
    this.apiService.postData(TeacherAPIURLs.GetTodayMealPlan, data, null).subscribe(res => {
      this.spinner.hide();
      if (res.body.statusCode === 200) {
        this.mealPlanList = res.body.data;
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
