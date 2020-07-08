import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
// tslint:disable-next-line:max-line-length
import { DailySheetList, ActivityVM, MealVM, HealthVM, MoodVM, NotesVM, NapVM, DiperVM, MoodList } from '../../../teacher/shared/view-model/daily-activityVM';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { TeacherApiService } from '../../../teacher/shared/services/teacher-api-service/teacher-api.service';
import { ErrorHandlerService } from '../../../../shared/services/error-handler/error-handler.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from '../../../../shared/services/notification-service/notification.service';
import { CommonService } from '../../../../shared/services/common/common.service';
import { ConfirmationService } from 'primeng/api';
import { TeacherAPIURLs } from '../../../teacher/shared/constant';
declare var $: any;
@Component({
  selector: 'app-agency-admin-daily-activity',
  templateUrl: './agency-admin-daily-activity.component.html',
  styleUrls: ['./agency-admin-daily-activity.component.css']
})
export class AgencyAdminDailyActivityComponent implements OnInit, AfterViewInit {
  classList: any[] = [];
  serchByClass = '';
  searchByDate: any;
  searchByDateString: any;
  activityForm: FormGroup;
  napForm: FormGroup;
  diperForm: FormGroup;
  mealForm: FormGroup;
  healthForm: FormGroup;
  moodForm: FormGroup;
  notesForm: FormGroup;
  searchDate: any;
  activityVM: ActivityVM = {};
  mealVm: MealVM = {};
  HealthVM: HealthVM = {};
  MoodVM: MoodVM = {};
  NotesVM: NotesVM = {};
  NapVM: NapVM = {};
  DiperVM: DiperVM = {};
  formType = 'activity';
  today = new Date();
  dailySheetList: any[] = [];
  mealTyptList: any[] = [];
  studentListId: any[] = [];
  studentListIdForEdit: any[] = [];
  suggestArr: any[] = [];
  updateSuggestArr: any[] = [];
  suggestArrDiper: any[] = [];
  listOfStudents: DailySheetList[] = [];
  moodList: MoodList[] = [];
  studentActivitiesID = 0;
  activityId = 0;
  mealId = 0;
  moodId = 0;
  healthId = 0;
  notesId = 0;
  napId = 0;
  diperId = 0;
  showHappy = false;
  showSad = false;
  showSleepy = false;
  showFussy = false;
  showGrumpy = false;
  subActivityList: any[] = [];
  myactivityList: any[] = [];
  value: any;
  mealPlanList: any[] = [];
  foodList: any[] = [];
  tempfoodList: any[] = [];
  allFoodItemList: any[] = [];
  MealMeasureType: any[] = [];
  mealQuantityType: any[] = [];
  selectedMealPlanId: any;
  items: FormArray;
  studentName: string;
  studImage = '';
  studentID: any;
  className = '';
  markAllStudents = false;
  foodConsumptionType: any[] = [];
  count = 0;
  countAfterUpdate = 0;
  foodListToSaveConsumption: any[] = [];
  editMode: boolean;
  pageNo = 0;
  limit = 10;
  totalRecord = 0;
  loader = true;
  videoPath = '';
  showNeweEntryButton = true;
  isSubscriptionActive: boolean;
  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  constructor(private apiService: TeacherApiService, private error: ErrorHandlerService,
    private spinner: NgxSpinnerService, private notification: NotificationService,
    private commonService: CommonService, private fb: FormBuilder, private confirmationService: ConfirmationService,
  ) {
    this.isSubscriptionActive = this.commonService.getSubscriptionStatus();
  }

  ngOnInit() {
    this.searchByDate = new Date();
    this.searchByDateString = this.commonService.getStringLocalDateTimeFromUTC(this.searchByDate);
    this.dpConfig = Object.assign({}, { containerClass: 'theme-dark-blue' }, { showWeekNumbers: false });
    this.getAllClassess();
    this.creteActivityForm();
    this.createHealthForm();
    this.createMoodForm();
    this.createNotesForm();
    this.creteMealForm();
    this.creteNapForm();
    this.creteDiperForm();
    this.getMealType();
    this.getotherActivitySuggetion();
    this.getSectionVideo();
  }

  OpenInfoVideo(data) {
    $('#infovideo').modal('show');
  }

  getSectionVideo() {
    const req = {
      'SectionID': 9
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

  ngAfterViewInit() {
    this.getFoodItems();
    this.getQuantityType();
    this.getMealMeasureType();
    this.getFoodConsumption();
  }


  creteActivityForm() {
    if (this.activityId === 0) {
      this.activityForm = this.fb.group({
        starttime: ['', Validators.required],
        endtime: ['', Validators.required],
        activity: ['', Validators.required]
      });
    } else {
      this.activityForm = this.fb.group({
        starttime: [this.activityVM.startTime, Validators.required],
        endtime: [this.activityVM.endTime, Validators.required],
        activity: [this.activityVM.otherActivityNote, Validators.required]
      });
      this.updateSuggestArr = this.activityForm.value.activity.split(',');
    }
  }

  creteNapForm() {
    if (this.napId !== 0) {
      this.napForm = this.fb.group({
        napstart: [this.NapVM.sleptAtTime, Validators.required],
        napend: [this.NapVM.workUpTime, Validators.required],
        napdiscription: [this.NapVM.napNote]
      });
    } else {
      this.napForm = this.fb.group({
        napstart: ['', Validators.required],
        napend: ['', Validators.required],
        napdiscription: ['']
      });
    }
  }

  creteMealForm() {
    if (this.mealId === 0) {
      this.mealForm = this.fb.group({
        mealcmnt: [''],
        othermealplan: [''],
        othermealcmnt: [''],
        plantype: ['', Validators.required],
        amount: [''],
        quantity: [''],
        unit: [''],
        foodconsumption: this.fb.array([]),
      });
      console.log('itemssss', this.mealForm.value.items);
    } else {
      this.mealForm = this.fb.group({
        mealcmnt: [this.mealVm.mealComment],
        othermealplan: [this.mealVm.otherThanPlanMeal],
        othermealcmnt: [this.mealVm.otherThanPlanMealComment],
        plantype: [this.mealVm.mealPlanTitle, Validators.required],
        amount: [''],
        quantity: [''],
        unit: [''],
        foodconsumption: this.fb.array([]),
      });
      this.initItemRows();
    }
  }

  creteDiperForm() {
    if (this.diperId !== 0) {
      this.diperForm = this.fb.group({
        diperchangetime: [this.DiperVM.diaperChangeTime, Validators.required],
        description: [this.DiperVM.StudentActivityDiaperNote]
      });
    } else {
      this.diperForm = this.fb.group({
        diperchangetime: ['', Validators.required],
        description: ['']
      });
    }
  }

  initItemRows() {
    if (this.mealId === 0) {
      const ctrl = <FormArray>this.mealForm.get('foodconsumption') as FormArray;
      for (let i = 0; i < this.foodList.length; i++) {
        ctrl.push(this.fb.group({
          foodconsumtionid: [''],
          milkconsumptionquantity: ['']
        }));
      }
    } else {
      const ctrl = <FormArray>this.mealForm.get('foodconsumption') as FormArray;
      for (let i = 0; i < this.foodList.length; i++) {
        ctrl.push(this.fb.group({
          foodconsumtionid: [this.foodList[i].foodConsumtionID],
          milkconsumptionquantity: [this.foodList[i].milkConsumptionQuantity]
        }));
      }
    }
  }

  get consumption() {
    return this.mealForm.get('consumption_arr') as FormArray;
  }

  createHealthForm() {
    if (this.healthId === 0) {
      this.healthForm = this.fb.group({
        temperature: [''],
        tempcmnt: ['', Validators.required],
        howtotake: [''],
        repeatdose: [''],
        medicationName: [''],
        unit: ['']
      });
    } else {
      this.healthForm = this.fb.group({
        temperature: [this.HealthVM.recordedTemparture],
        tempcmnt: [this.HealthVM.studentHealthDescription, Validators.required],
        howtotake: [this.HealthVM.howTaken],
        repeatdose: [this.HealthVM.doseRepeatName],
        medicationName: [this.HealthVM.studentMedicationName],
        unit: [this.HealthVM.unit]
      });
    }
  }

  createMoodForm() {
    if (this.moodId === 0) {
      this.moodForm = this.fb.group({
        mood: ['', Validators.required],
        moodcomment: ['', Validators.required],
        happy: [1],
        sad: [0],
        sleepy: [0],
        fussy: [0],
        Grumpy: [0]
      });
    } else {
      this.moodForm = this.fb.group({
        mood: [this.MoodVM.moodTypeID, Validators.required],
        moodcomment: [this.MoodVM.studentMoodDescription, Validators.required],
        happy: [this.MoodVM.moodTypeID],
        sad: [this.MoodVM.moodTypeID],
        sleepy: [this.MoodVM.moodTypeID],
        fussy: [this.MoodVM.moodTypeID],
        Grumpy: [this.MoodVM.moodTypeID]

      });
    }
  }

  createNotesForm() {
    if (this.notesId === 0) {
      this.notesForm = this.fb.group({
        notes: ['', Validators.required]
      });
    } else {
      this.notesForm = this.fb.group({
        notes: [this.NotesVM.noteDescription, Validators.required]
      });
    }
  }


  // convenience getter for easy access to form fields for activityForm
  get activity() { return this.activityForm.controls; }

  // convenience getter for easy access to form fields for mealForm
  get meal() { return this.mealForm.controls; }

  // convenience getter for easy access to form fields for healthForm
  get health() { return this.healthForm.controls; }

  // convenience getter for easy access to form fields for moodForm
  get mood() { return this.moodForm.controls; }

  // convenience getter for easy access to form fields for notesForm
  get notes() { return this.notesForm.controls; }

  // convenience getter for easy access to form fields for napForm
  get nap() { return this.napForm.controls; }

  // convenience getter for easy access to form fields for diperForm
  get diper() { return this.diperForm.controls; }


  /**Method to get meal quantity type   */

  getQuantityType() {
    const data = {
      'agencyID': this.commonService.getAgencyId()
    };

    this.apiService.postData(TeacherAPIURLs.GetAllMeasureQuantityDropdown, data, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        //   this.spinner.hide();
        this.mealQuantityType = res.body.data;
      } else {
        this.spinner.hide();
        this.error.unknownError();
      }
    }, err => {
      this.spinner.hide();
      this.error.commonError(err);
    });
  }

  /**Method to get meal measer type   */
  getMealMeasureType() {
    const data = {
      'agencyID': this.commonService.getAgencyId()
    };

    this.apiService.postData(TeacherAPIURLs.GetAllMeasureUnitTypeDropdown, data, null).subscribe(res => {
      if (res.body.statusCode === 200) {       
        this.MealMeasureType = res.body.data;
      } else {
        this.spinner.hide();
        this.error.unknownError();
      }
    }, err => {
      this.spinner.hide();
      this.error.commonError(err);
    });
  }

  /**Method to get Food items   */
  getFoodItems() {
    const data = {
      'agencyID': this.commonService.getAgencyId()
    };

    this.apiService.postData(TeacherAPIURLs.GetAllFoodTypeDropdown, data, null).subscribe(res => {
      if (res.body.statusCode === 200) {        
        const arr = res.body.data;
        arr.forEach(x => {
          this.foodList.forEach(z => {
            if (x.value === z.foodTypeID) {
              this.allFoodItemList.push(x);
            }
          });
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

  getTodaysMealPlan() {
    const data = {
      'studentActivitiesId': 0,
      'agencyID': this.commonService.getAgencyId(),
      'studentID': 0,
      'classID': this.serchByClass,
      'askedDate': this.searchByDate,
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

  filterMealPlan() {
    if (this.mealPlanList) {
      this.mealPlanList.forEach(x => {
        this.tempfoodList = [];
        if (x.mealPlannerID.toString() === this.selectedMealPlanId) {
          this.foodList = [];
          x.studentActivityMealFoodItems.forEach(element => {            
            console.log('item2', this.consumption);
            console.log('Meal form', this.mealForm);
            this.foodList.push(element);           
          });
        }        
        this.initItemRows();
      });
    }
  }

  /**Method to get meal type  */
  getSelectedMealPlan() {
    this.selectedMealPlanId = this.mealForm.value.plantype;
    this.filterMealPlan();
  }

  getMealType() {
    const data = {
      'agencyID': this.commonService.getAgencyId()
    };
    this.apiService.postData(TeacherAPIURLs.GetAllMealTypeDropdown, data, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.mealTyptList = res.body.data;
      } else {
        this.spinner.hide();
        this.error.unknownError();
      }
    }, err => {
      this.spinner.hide();
      this.error.commonError(err);
    });
  }

  // Another Activity suggestion for comments
  getotherActivitySuggetion() {
    this.subActivityList = [
      { subActivityLabel: 'Playing', subActivityText: ' Playing in classroom.'},
      { subActivityLabel: 'Playing Outside', subActivityText: 'Playing Outside.'},
      { subActivityLabel: 'Music', subActivityText: 'Music'},
      { subActivityLabel: 'Dancing', subActivityText: 'Dancing'},
      { subActivityLabel: 'Science', subActivityText: 'Science'},
      { subActivityLabel: 'Colored', subActivityText: 'Colored'},
       {subActivityLabel: 'Free Draw', subActivityText: 'Free Draw'},
       {subActivityLabel: 'Reading', subActivityText: 'Reading'},
       {subActivityLabel: 'Centers', subActivityText: 'Centers'},
       {subActivityLabel: 'Share Day', subActivityText: 'Share Day'},
       {subActivityLabel: 'Circle Time', subActivityText: 'Circle Time'},
       {subActivityLabel: 'Flash Card', subActivityText: 'Flash Card'},
       {subActivityLabel: 'Puzzles', subActivityText: 'Puzzles'},
       {subActivityLabel: 'Blocks', subActivityText: 'Blocks'},
       {subActivityLabel: 'Legos', subActivityText: 'Legos'}
     ];
  }

  /**Get All class list */
  getAllClassess() {
    this.spinner.show();
    const data = {
      'agencyID': this.commonService.getAgencyId()
    };
    this.apiService.postData(TeacherAPIURLs.GetAllClasses, data, null).subscribe(res => {
      this.spinner.hide();
      if (res.body.statusCode === 200) {
        this.classList = res.body.data;
        if (this.classList.length !== 0) {
          this.serchByClass = this.classList[0].classesID;
        }
        this.getDailySheet();
      } else {
        this.spinner.hide();
        this.error.unknownError();
      }

    }, err => {
      this.spinner.hide();
      this.error.commonError(err);
    });
  }

  /**Get All Mood list */
  getAllMood() {
    this.spinner.show();
    const data = {
      'agencyID': this.commonService.getAgencyId()
    };
    this.apiService.postData(TeacherAPIURLs.GetAllMoodTypeDropdown, data, null).subscribe(res => {
      this.spinner.hide();
      const mood = ['assets/img/happy.svg', 'assets/img/sad.svg', 'assets/img/sleeping.svg'];
      if (res.body.statusCode === 200) {
        this.moodList = res.body.data;
        for (let index = 0; index < this.moodList.length; index++) {
          this.moodList[index].imagepath = mood[index];
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

  getDailySheet() {
    this.markAllStudents = false;
    this.loader = true;
    if (new Date(this.searchByDate).toDateString() === (this.today).toDateString()) {
      this.showNeweEntryButton = true;
    } else {
      this.showNeweEntryButton = false;
    }
    this.studentListId = [];
    let myActivity: any[] = [];
    this.spinner.show();
    const data = {
      'agencyID': this.commonService.getAgencyId(),
      'studentActivitiesId': 0,
      'studentID': 0,
      'classID': this.serchByClass === '' ? 0 : this.serchByClass,
      'askedDate': this.searchByDate,
      'askedDateString': this.searchByDateString
    };
    this.apiService.postData(TeacherAPIURLs.GetDailySheet, data, null).subscribe(res => {
      this.spinner.hide();
      if (res.body.statusCode === 200 || res.body.statusCode === 0) {
        this.totalRecord = res.body.totalRows;
        this.countAfterUpdate = 0;
        this.listOfStudents = [];
        const list = res.body.data;
        if (res.body.data !== null && res.body.data !== undefined && res.body.data !== []) {
          this.getTodaysMealPlan();
          list.forEach(element => {
            if (this.listOfStudents.length === 0) {
              this.listOfStudents.push(element);
            } else {
              const index = this.listOfStudents.findIndex(r => r.studentID === element.studentID);
              if (index === -1) {
                this.listOfStudents.push(element);
              }
            }
          });

          this.listOfStudents.forEach(x => {
            list.forEach(element => {
              if (element.studentID === x.studentID) {
                if (element.activityTypeID === 1) {
                  if (element.studentActivityMedications.length > 0) {
                    myActivity.push(element.studentActivityMedications[0]);
                  }
                } else if (element.activityTypeID === 2) {
                  if (element.studentActivityNotes.length > 0) {
                    myActivity.push(element.studentActivityNotes[0]);
                  }
                } else if (element.activityTypeID === 3) {
                  if (element.studentActivityMeals.length > 0) {
                    myActivity.push(element.studentActivityMeals[0]);
                  }
                } else if (element.activityTypeID === 4) {
                  if (element.studentActivityMoods.length > 0) {
                    myActivity.push(element.studentActivityMoods[0]);
                  }
                } else if (element.activityTypeID === 5) {
                  if (element.studentOtherActivity.length > 0) {
                    element.studentOtherActivity[0].endTime =
                      this.commonService.getLocalDateTimeFromUTC(element.studentOtherActivity[0].endTime);
                    element.studentOtherActivity[0].startTime =
                      this.commonService.getLocalDateTimeFromUTC(element.studentOtherActivity[0].startTime);
                    myActivity.push(element.studentOtherActivity[0]);
                  }
                } else if (element.activityTypeID === 6) {
                  if (element.studentAcitivityNap.length > 0) {
                    element.studentAcitivityNap[0].sleptAtTime =
                      this.commonService.getLocalDateTimeFromUTC(element.studentAcitivityNap[0].sleptAtTime);
                    element.studentAcitivityNap[0].workUpTime =
                      this.commonService.getLocalDateTimeFromUTC(element.studentAcitivityNap[0].workUpTime);
                    myActivity.push(element.studentAcitivityNap[0]);
                  }
                } else if (element.activityTypeID === 7) {
                  if (element.studentActivityDiaper.length > 0) {
                    element.studentActivityDiaper[0].diaperChangeTime =
                      this.commonService.getLocalDateTimeFromUTC(element.studentActivityDiaper[0].diaperChangeTime);
                    myActivity.push(element.studentActivityDiaper[0]);
                    console.log('sttttt', element.studentActivityDiaper);
                  }
                } else {
                }
                x.myActivity = myActivity;
                this.countAfterUpdate = this.countAfterUpdate + 1;
              }
              if (this.countAfterUpdate === list.length) {
                this.viewAllActivityListAfterUpdate(this.listOfStudents);
              }
            });
            myActivity = [];
            this.spinner.hide();
          });
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



  getSerchClass(event) {

  }

  /** Save  Activity */
  addNewEntry(option, type) {
    console.log(this.mealForm);
    this.spinner.show();
    if (option === 2) {
      this.formType = type;
    } else {
      this.activityVM = {};
      this.mealVm = {};
      this.MoodVM = {};
      this.HealthVM = {};
      this.NotesVM = {};
      this.NapVM = {};
      this.DiperVM = {};
    }
    const agencyID = this.commonService.getAgencyId();
    if (this.studentListId.length > 0 || option === 2) {
      if (this.formType === 'activity') {  /**Save Activity  form */
        if (this.activityForm.valid) {
          if (this.activityForm.value.starttime > this.activityForm.value.endtime) {
            this.spinner.hide();
            this.notification.warning({ message: 'End time should be greater than Start time  ', title: '' });
          } else {
            this.activityVM.agencyID = agencyID;
            this.activityVM.startTime = this.activityForm.value.starttime;
            this.activityVM.endTime = this.activityForm.value.endtime;
            this.activityVM.otherActivityNote = (this.activityForm.value.activity).toString();
            this.activityVM.id = this.activityId;
            this.activityVM.studentActivitiesID = this.activityVM.studentActivitiesID === null ||
              this.activityVM.studentActivitiesID === undefined ?
              0 : this.activityVM.studentActivitiesID;
            this.addNewEntrySuccess(this.formType);
          }
        } else {
          this.spinner.hide();
          this.notification.warning({ message: 'Please fill mandetory fields marked as star', title: '' });
          this.commonService.validateAllFields(this.activityForm);
        }
      } else if (this.formType === 'meal') { /**Save Meal  form */
        if (this.mealForm.valid) {
          this.mealVm.agencyID = agencyID;         
          this.mealVm.mealComment = this.mealForm.value.mealcmnt;
          this.mealVm.otherThanPlanMeal = this.mealForm.value.othermealplan;
          this.mealVm.otherThanPlanMealComment = this.mealForm.value.othermealcmnt;
          this.mealVm.studentActivitiesID = this.mealVm.studentActivitiesID === null || this.mealVm.studentActivitiesID === undefined ?
            0 : this.mealVm.studentActivitiesID;
          this.mealVm.id = this.mealId;
          this.mealVm.StudentActivityMealFoodItems = this.foodListToSaveConsumption;
          this.mealVm.MealPlannerID = option === 1 ? this.mealForm.value.plantype : this.mealVm.MealPlannerID;
          this.addNewEntrySuccess(this.formType);
        } else {
          this.spinner.hide();
          this.notification.warning({ message: 'Please fill mandetory fields marked as star', title: '' });
          this.commonService.validateAllFields(this.mealForm);
        }
      } else if (this.formType === 'health') { /**Save Health  form */
        if (this.healthForm.valid) {
          this.HealthVM.id = this.healthId;
          this.HealthVM.studentActivitiesID = this.HealthVM.studentActivitiesID === null ||
            this.HealthVM.studentActivitiesID === undefined ?
            0 : this.HealthVM.studentActivitiesID;
          this.HealthVM.agencyID = agencyID;
          this.HealthVM.recordedTemparture = this.healthForm.value.temperature;
          this.HealthVM.studentHealthDescription = this.healthForm.value.tempcmnt;
          this.HealthVM.doseRepeatName = this.healthForm.value.repeatdose;
          this.HealthVM.studentMedicationName = this.healthForm.value.medicationName;
          this.HealthVM.unit = this.HealthVM.unit ? this.HealthVM.unit : 0 ;
          this.HealthVM.howTaken = this.healthForm.value.howtotake;
          this.HealthVM.doseRepeatID = this.HealthVM.doseRepeatID === undefined ? 0 : this.HealthVM.doseRepeatID;
          this.HealthVM.dosageQuantityID = this.HealthVM.dosageQuantityID === undefined ? 0 : this.HealthVM.dosageQuantityID;
          this.HealthVM.studentMedicationID = this.HealthVM.studentMedicationID === undefined ? 0 : this.HealthVM.studentMedicationID;
          this.HealthVM.AcknowledgeTeacherID = this.HealthVM.AcknowledgeTeacherID ? this.HealthVM.AcknowledgeTeacherID : 0;
          this.HealthVM.isParentAcknowledge = this.HealthVM.isParentAcknowledge === undefined ? false : this.HealthVM.isParentAcknowledge;
          this.HealthVM.isTeacherAcknowledge = this.HealthVM.isTeacherAcknowledge === undefined ? false
           : this.HealthVM.isTeacherAcknowledge;
          this.HealthVM.AcknowledgeParentID = this.HealthVM.AcknowledgeParentID ? this.HealthVM.AcknowledgeParentID :
          0 ;
          this.addNewEntrySuccess(this.formType);
        } else {
          this.spinner.hide();
          this.notification.warning({ message: 'Please fill mandetory fields marked as star', title: '' });
          this.commonService.validateAllFields(this.healthForm);
        }
      } else if (this.formType === 'mood') { /**Save Mood  form */
        if (this.moodForm.valid) {
          this.MoodVM.studentMoodDescription = this.moodForm.value.moodcomment;
          this.MoodVM.id = this.moodId;
          this.MoodVM.studentActivitiesID = this.MoodVM.studentActivitiesID === null || this.MoodVM.studentActivitiesID === undefined ?
            0 : this.MoodVM.studentActivitiesID;
          this.MoodVM.agencyID = agencyID;
          this.MoodVM.moodTypeID = this.moodForm.value.mood;
          this.addNewEntrySuccess(this.formType);
        } else {
          this.spinner.hide();
          this.notification.warning({ message: 'Please fill mandetory fields marked as star', title: '' });
          this.commonService.validateAllFields(this.moodForm);
        }
      } else if (this.formType === 'notes') { /**Save Notes  form */
        if (this.notesForm.valid) {
          this.NotesVM.noteDescription = this.notesForm.value.notes;
          this.NotesVM.id = this.notesId;
          this.NotesVM.studentActivitiesID = this.NotesVM.studentActivitiesID === null || this.NotesVM.studentActivitiesID === undefined ?
            0 : this.NotesVM.studentActivitiesID;
          this.NotesVM.agencyID = agencyID;
          this.addNewEntrySuccess(this.formType);
        } else {
          this.spinner.hide();
          this.notification.warning({ message: 'Please fill mandetory fields marked as star', title: '' });
          this.commonService.validateAllFields(this.notesForm);
        }
      } else if (this.formType === 'nap') { /**Save Notes  form */
        if (this.napForm.valid) {
          if (this.napForm.value.napstart > this.napForm.value.napend) {
            this.spinner.hide();
            this.notification.warning({ message: 'slept at time  should be greater than woke-up time  ', title: '' });
          } else {
            this.NapVM.id = this.napId;
            this.NapVM.agencyID = agencyID;
            this.NapVM.studentActivitiesID = this.NapVM.studentActivitiesID === null || this.NapVM.studentActivitiesID === undefined ?
              0 : this.NapVM.studentActivitiesID;
            this.NapVM.sleptAtTime = this.napForm.value.napstart;
            this.NapVM.workUpTime = this.napForm.value.napend;
            this.NapVM.napNote = this.napForm.value.napdiscription;
            this.addNewEntrySuccess(this.formType);
          }

        } else {
          this.spinner.hide();
          this.notification.warning({ message: 'Please fill mandetory fields marked as star', title: '' });
          this.commonService.validateAllFields(this.napForm);
        }
      } else if (this.formType === 'diper') { /**Save Diper  form */
        if (this.diperForm.valid) {
          this.DiperVM.id = this.diperId;
          this.DiperVM.agencyID = agencyID;
          this.DiperVM.studentActivitiesID = this.DiperVM.studentActivitiesID === null || this.DiperVM.studentActivitiesID === undefined ?
            0 : this.DiperVM.studentActivitiesID;
          this.DiperVM.diaperChangeTime = this.diperForm.value.diperchangetime;
          this.DiperVM.StudentActivityDiaperNote = (this.diperForm.value.description).toString();
          this.addNewEntrySuccess(this.formType);
        } else {
          this.spinner.hide();
          this.notification.warning({ message: 'Please fill mandetory fields marked as star', title: '' });
          this.commonService.validateAllFields(this.diperForm);
        }
      } else {
        this.spinner.hide();
        this.notification.warning({ message: 'Please select students', title: '' });
      }
    }
  }

  addNewEntrySuccess(data) {
    const agencyID = this.commonService.getAgencyId();
    let finalReq: any = {};
    if (data === 'activity') {
      const req = {
        'studentOtherActivity': this.activityVM,
        'activityTypeID': 5,
        'selectedStudents': this.editMode === false ? this.studentListId :  this.studentListIdForEdit,
        'agencyID': agencyID,
        'classesID': this.serchByClass,
        'id': this.activityVM.studentActivitiesID,
        'activityRegisterDate': new Date()
      };
      finalReq = req;
    } else if (data === 'meal') {
      const req = {
        'studentActivityMeals': this.mealVm,
        'activityTypeID': 3,
        'selectedStudents': this.editMode === false ? this.studentListId :  this.studentListIdForEdit,
        'agencyID': agencyID,
        'classesID': this.serchByClass,
        'id': this.mealVm.studentActivitiesID,
        'activityRegisterDate': new Date() 
      };
      finalReq = req;
    } else if (data === 'health') {
      const req = {
        'studentActivityMedications': this.HealthVM,
        'activityTypeID': 1,
        'selectedStudents': this.editMode === false ? this.studentListId :  this.studentListIdForEdit,
        'agencyID': agencyID,
        'classesID': this.serchByClass,
        'id': this.HealthVM.studentActivitiesID,
        'activityRegisterDate': new Date()
      };
      finalReq = req;
    } else if (data === 'mood') {
      const req = {
        'studentActivityMoods': this.MoodVM,
        'activityTypeID': 4,
        'selectedStudents': this.editMode === false ? this.studentListId :  this.studentListIdForEdit,
        'agencyID': agencyID,
        'classesID': this.serchByClass,
        'id': this.MoodVM.studentActivitiesID,
        'activityRegisterDate': new Date() 
      };
      finalReq = req;
    } else if (data === 'notes') {
      const req = {
        'studentActivityNotes': this.NotesVM,
        'activityTypeID': 2,
        'selectedStudents': this.editMode === false ? this.studentListId :  this.studentListIdForEdit,
        'agencyID': agencyID,
        'classesID': this.serchByClass,
        'id': this.NotesVM.studentActivitiesID,
        'activityRegisterDate': new Date() 
      };
      finalReq = req;
    } else if (data === 'nap') {
      const req = {
        'studentAcitivityNap': this.NapVM,
        'activityTypeID': 6,
        'selectedStudents': this.editMode === false ? this.studentListId :  this.studentListIdForEdit,
        'agencyID': agencyID,
        'classesID': this.serchByClass,
        'id': this.NapVM.studentActivitiesID,
        'activityRegisterDate': new Date() 
      };
      finalReq = req;
    } else if (data === 'diper') {
      const req = {
        'studentActivityDiaper': this.DiperVM,
        'activityTypeID': 7,
        'selectedStudents': this.editMode === false ? this.studentListId :  this.studentListIdForEdit,
        'agencyID': agencyID,
        'classesID': this.serchByClass,
        'id': this.DiperVM.studentActivitiesID,
        'activityRegisterDate': new Date() 
      };
      finalReq = req;
    }

    this.saveNewDailyActivity(finalReq);

  }

  /**Methd to save new activity over API */
  saveNewDailyActivity(req) {

    this.apiService.postData(TeacherAPIURLs.SaveStudentActivity, req, null).subscribe(res => {
      this.spinner.hide();
      if (res.body.statusCode === 200) {
        this.markAllStudents = false;
        $('#editactivity12').modal('hide');
        $('#edithealth').modal('hide');
        $('#editactivity').modal('hide');
        $('#editmeal').modal('hide');
        $('#editmood').modal('hide');
        $('#editpost').modal('hide');
        $('#editnap').modal('hide');
        $('#editdiper').modal('hide');
        this.notification.success({ message: req.id === 0 ? 'Activity added successfully' : 'Activity updated successfully', title: '' });
        this.getDailySheet();
      } else {
        this.spinner.hide();
        this.error.unknownError();
      }

    }, err => {
      this.spinner.hide();
      this.error.commonError(err);
    });

  }

  /**Get student id using checkbox */
  getSingleMarkedStudent(student, event) {
    this.markAllStudents = false;
    if (event.target.checked === true) {
      if (this.studentListId.length === 0) {
        this.studentListId.push(student.studentID);
        const no = this.listOfStudents.findIndex(r => r.studentID === student.studentID);
        if (no !== -1) {
          this.listOfStudents[no].isMarked = true;
        }
      } else {
        const index = this.studentListId.findIndex(r => r === student.studentID);
        if (index !== -1) {
          this.studentListId.push(student.studentID);
          const no = this.listOfStudents.findIndex(r => r.studentID  === student.studentID);
          if (no !== -1) {
            this.listOfStudents[no].isMarked = true;
          }
        }
      }
    } else if (event.target.checked === false) {
      if (this.studentListId.length > 0) {
        const index = this.studentListId.findIndex(r => r === student.studentID);
        this.studentListId.splice(index, 1);
        const no = this.listOfStudents.findIndex(r => r.studentID  === student.studentID);
        if (no !== -1) {
          this.listOfStudents[no].isMarked = false;
        }
      }
    }
  }

  getAllMarkedStudent(event) {
    if (event.target.checked === true) {
      this.studentListId = [];
      this.listOfStudents.forEach(data => {
        this.studentListId.push(data.studentID);
        data.isMarked = true;
      });
    } else {
      this.studentListId = [];
      this.listOfStudents.forEach(element => {
        element.isMarked = false;
      });
    }
  }

  saveActivity() {
  }

  getFormType(type) {
    this.clearAllForm();
    if (type === 'activity') {
      this.formType = 'activity';
    } else if (type === 'meal') {
      this.formType = 'meal';
    } else if (type === 'health') {
      this.formType = 'health';
    } else if (type === 'notes') {
      this.formType = 'notes';
    } else if (type === 'mood') {
      this.formType = 'mood';
    } else if (type === 'activity') {
      this.formType = 'activity';
    } else if (type === 'diper') {
      this.formType = 'diper';
    } else {
      this.formType = 'nap';
    }
  }

  clearAllForm() {
    this.editMode = false;
    this.mealId = 0;
    this.notesId = 0;
    this.moodId = 0;
    this.activityId = 0;
    this.healthId = 0;
    this.napId = 0;
    this.diperId = 0;
    this.creteDiperForm();
    this.createHealthForm();
    this.createMoodForm();
    this.createNotesForm();
    this.creteActivityForm();
    this.creteMealForm();
    this.creteNapForm();
    this.suggestArr = [];
    this.foodList = [];
    this.foodListToSaveConsumption = [];
  }

  getMarkedMood(data) {
    this.moodForm.controls['mood'].setValue(data);
    this.moodForm.controls['mood'].updateValueAndValidity();
  }

  // Get Activity details
  getActivityDetails(data, formType, studId) {
    this.editMode = true;
    this.markAllStudents = false;
    this.studentListId = [];
    this.listOfStudents.forEach(element => {
      element.isMarked = false;
    });
    this.studentListId = [];
    this.studentListIdForEdit = [];
    this.showHappy = false;
    this.showSad = false;
    this.showSleepy = false;
    this.showFussy = false;
    this.showGrumpy = false;    
    this.studentListIdForEdit.push(studId);
    if (formType === 'activity') {  /** Activity  form */     
      this.activityVM.startTime = data.startTime;
      this.activityVM.endTime = data.endTime;
      this.activityVM.otherActivityNote = data.otherActivityNote;
      this.activityVM.id = data.id;
      this.activityId = data.id;
      this.activityVM.studentActivitiesID = data.studentActivitiesID;
      this.creteActivityForm();
    } else if (formType === 'meal') { /** Meal  form */     
      this.getSelectedMealPlan();
      this.mealForm.controls['unit'].setValue('');
      this.mealForm.controls['quantity'].setValue('');
      this.mealForm.updateValueAndValidity();
      this.foodList = [];      
      this.mealVm.mealComment = data.mealComment;
      this.mealVm.otherThanPlanMeal = data.otherThanPlanMeal;
      this.mealVm.otherThanPlanMealComment = data.otherThanPlanMealComment;
      this.mealVm.studentActivitiesID = data.studentActivitiesID;
      this.mealVm.MealPlannerID = data.mealPlannerID;
      this.mealVm.id = this.mealId;
      this.mealVm.studentID = studId;
      this.mealId = data.id;
      this.foodList = data.studentActivityMealFoodItems;
      this.mealVm.mealPlanTitle = data.mealPlanTitle;
      this.creteMealForm();      
    } else if (formType === 'health') {/** Health  form */
      this.HealthVM.id = data.id;
      this.HealthVM.studentActivitiesID = data.studentActivitiesID;     
      this.HealthVM.recordedTemparture = data.recordedTemparture;
      this.HealthVM.studentHealthDescription = data.studentHealthDescription;
      this.HealthVM.studentID = studId;
      this.healthId = data.id;
      this.HealthVM.studentMedicationName = data.studentMedicationName;
      this.HealthVM.howTaken = data.howTaken;
      this.HealthVM.doseRepeatName = data.doseRepeatName;
      this.HealthVM.unit = data.unit;
      this.HealthVM.studentMedicationID = data.studentMedicationID,
      this.HealthVM.doseRepeatID = data.doseRepeatID,
      this.HealthVM.dosageQuantityID = data.dosageQuantityID,
      this.HealthVM.AcknowledgeTeacherID = data.acknowledgeTeacherID;
      this.HealthVM.isParentAcknowledge = data.isParentAcknowledge;
      this.HealthVM.isTeacherAcknowledge = data.isTeacherAcknowledge;
      this.HealthVM.AcknowledgeParentID = data.acknowledgeParentID;
      this.HealthVM.acknowledgeParentName = data.acknowledgeParentName;
      this.HealthVM.acknowledgeTeacherName = data.acknowledgeTeacherName;
      this.createHealthForm();
    } else if (formType === 'mood') { /** Mood  form */

      this.MoodVM.studentMoodDescription = data.studentMoodDescription;
      this.MoodVM.id = data.id;
      this.moodId = data.id;
      this.MoodVM.studentActivitiesID = data.studentActivitiesID;
      this.MoodVM.moodTypeID = data.moodTypeID;
      if (this.MoodVM.moodTypeID === 1) {
        $('#hp').prop('checked', true);
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
        $('#sd').prop('checked', true);
      } else if (this.MoodVM.moodTypeID === 3) {
        this.showSleepy = true;
        this.showSad = false;
        this.showHappy = false;
        this.showFussy = false;
        this.showGrumpy = false;
        $('#sl').prop('checked', true);
      } else if (this.MoodVM.moodTypeID === 4) {
        this.showSad = false;
        this.showHappy = false;
        this.showSleepy = false;
        this.showFussy = true;
        this.showGrumpy = false;
        $('#fs').prop('checked', true);
      } else  {
        this.showSad = false;
        this.showHappy = false;
        this.showSleepy = false;
        this.showFussy = false;
        this.showGrumpy = true;
        $('#gr').prop('checked', true);
      }
      this.MoodVM.studentID = studId;
      this.createMoodForm();     
      this.MoodVM.moodTypeID = data.moodTypeID;
    } else if (formType === 'notes') { /** Notes  form */
      this.NotesVM.noteDescription = data.noteDescription;
      this.NotesVM.id = data.id;
      this.NotesVM.studentActivitiesID = data.studentActivitiesID;
      this.notesId = data.id;
      this.NotesVM.studentID = studId;
      this.createNotesForm();     
    } else if (formType === 'nap') { /** Notes  form */
      this.NapVM.id = data.id;     
      this.NapVM.sleptAtTime = data.sleptAtTime;
      this.NapVM.workUpTime = data.workUpTime;
      this.NapVM.napNote = data.napNote;
      this.NapVM.id = data.id;
      this.NapVM.studentActivitiesID = data.studentActivitiesID;
      this.napId = data.id;
      this.NotesVM.studentID = studId;
      this.creteNapForm();
    } else if (formType === 'diper') { /** Notes  form */      
      this.suggestArrDiper = [];
      this.DiperVM.id = data.id;
      this.DiperVM.diaperChangeTime = data.diaperChangeTime;
      this.DiperVM.StudentActivityDiaperNote = data.studentActivityDiaperNote;
      this.NapVM.studentActivitiesID = data.studentActivitiesID;
      this.diperId = data.id;
      this.NotesVM.studentID = studId;
      this.creteDiperForm();
    } else {
    }
  }

  addSuggestion(data, length) {
    if (this.activityForm.value.activity) {      
      this.suggestArr.push(data.subActivityText);
      this.activityForm.controls['activity'].setValue(this.suggestArr);
      this.activityForm.controls['activity'].updateValueAndValidity();
    } else {
      this.suggestArr = [];
      this.suggestArr.push(data.subActivityText);
      this.activityForm.controls['activity'].setValue(this.suggestArr);
      this.activityForm.controls['activity'].updateValueAndValidity();
    }
  }

  updateSuggestion(data) {
    if (this.activityForm.value.activity) {      
      this.updateSuggestArr.push(data.subActivityText);
      this.activityForm.controls['activity'].setValue(this.updateSuggestArr);
      this.activityForm.controls['activity'].updateValueAndValidity();
    } else {
      this.updateSuggestArr = [];
      this.updateSuggestArr.push(data.subActivityText);
      this.activityForm.controls['activity'].setValue(this.updateSuggestArr);
      this.activityForm.controls['activity'].updateValueAndValidity();
    }
  }


  viewAllActivityList(dailysheet) {

    this.studentID = dailysheet.studentID;
    if (dailysheet.myActivity.length > 0) {
      this.myactivityList = dailysheet.myActivity;
      this.studentName = dailysheet.studentName;
      this.studImage = dailysheet.imagePath;
      this.className = dailysheet.className;
    } else {
      this.myactivityList = [];
    }   
    console.log('tactivity list', this.myactivityList);
  }

  viewAllActivityListAfterUpdate(studentList) {
    studentList.forEach(element => {
      if (element.studentID === this.studentID) {
        this.studentID = element.studentID;
        if (element.myActivity.length > 0) {
          this.myactivityList = element.myActivity;
          this.studentName = element.studentName;
          this.studImage = element.imagePath;         
          console.log('list of st', studentList);
        } else {
          this.myactivityList = [];
        }
      }
    });    
  }

  // Method to delete the incident
  deleteActivity(value) {
    const stid: number[] = [];
    stid.push(value.studentID);
    this.confirmationService.confirm({
      message: 'Do you want to delete this activity?',
      accept: () => {
        this.spinner.show();
        const data = {
          'agencyID': this.commonService.getAgencyId(),        
          'IsDeleted': true,
          'DeletedDate': new Date(),
          'DeletedBy': 1,         
          'activityTypeID': value.activityTypeID,
          'selectedStudents': stid,
          'classesID': this.serchByClass,
          'studentActivitiesID': value.studentActivitiesID,
          'id': value.studentActivitiesID
        };
        this.apiService.postData(TeacherAPIURLs.SaveStudentActivity, data, null).subscribe(res => {
          if (res.body.statusCode === 200) {           
            this.deleteActivitySuccess(value);
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

  deleteActivitySuccess(data) {   
    const index = this.myactivityList.findIndex(r => r.id === data.id);
    this.myactivityList.splice(index, 1);
    this.spinner.hide();
    this.notification.success({ message: 'Activity deleted successfully', title: '' });    
  }

  /** Get food Consumption values for students from form */
  getConsumedAmount(data) {
    this.foodListToSaveConsumption = this.foodList;
    console.log('amonzzzz', this.mealForm.value.foodconsumption);
    for (let index = 0; index < this.foodList.length; index++) {
      if (data.foodTypeID === this.foodListToSaveConsumption[index].foodTypeID) {       
        this.foodListToSaveConsumption[index].milkConsumptionQuantity = this.mealForm.value.foodconsumption[index].milkconsumptionquantity;
        this.foodListToSaveConsumption[index].foodConsumtionID = this.mealForm.value.foodconsumption[index].foodconsumtionid === ''
          ? 0 : this.mealForm.value.foodconsumption[index].foodconsumtionid;
      }
    }
    console.log('final', this.foodListToSaveConsumption);
  }

  checkIsStudentSelected() {
    if (this.studentListId.length === 0) {
      this.notification.warning({ message: 'You cannot add new activity without selecting student ', title: 'Please select student' });
    } else {
      this.initItemRows();
      $('#editactivity12').modal('show');
    }
  }


  // **  Api for amount consumption for food other than milk */
  getFoodConsumption() {
    const data = {
      'agencyID': this.commonService.getAgencyId()
    };
    this.apiService.postData(TeacherAPIURLs.GetAllFoodConsumtion, data, null).subscribe(res => {
      if (res.body.statusCode === 200) {
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


  getMealActivityByAPI(data, formType, studId) {
    this.editMode = true;
    this.markAllStudents = false;
    this.studentListId = [];
    this.studentListIdForEdit = [];
    this.listOfStudents.forEach(element => {
      element.isMarked = false;
    });
    this.studentListIdForEdit.push(studId);
    this.spinner.show();
    const req = {
      'agencyID': this.commonService.getAgencyId(),
      'studentAcitivityId': data.studentActivitiesID,
      'studentID': studId,
    };
    this.apiService.postData(TeacherAPIURLs.GetParticularStudentActivityMeals, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.mealForm.controls['unit'].setValue('');
        this.mealForm.controls['quantity'].setValue('');
        this.mealForm.updateValueAndValidity();
        this.foodList = [];       
        this.mealVm.mealComment = res.body.data.mealComment;
        this.mealVm.otherThanPlanMeal = res.body.data.otherThanPlanMeal;
        this.mealVm.otherThanPlanMealComment = res.body.data.otherThanPlanMealComment;
        this.mealVm.studentActivitiesID = res.body.data.studentActivitiesID;
        this.mealVm.MealPlannerID = res.body.data.mealPlannerID;
        this.mealVm.id = this.mealId;
        this.mealVm.studentID = studId;
        this.mealId = res.body.data.id;
        this.mealVm.mealPlanTitle = res.body.data.mealPlanTitle;
        this.foodList = res.body.data.studentActivityMealFoodItems;
        this.creteMealForm();
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


  getTeacherOperationalClasses() {
    this.classList = [];
    this.spinner.show();
    console.log('date', this.searchByDate);
    const data = {
      'agencyID': this.commonService.getAgencyId(),
      'askingDate': this.searchByDate,
      'teacherID': this.commonService.getReleventUserId('userdetails'),
    };
    this.apiService.postData(TeacherAPIURLs.GetTeacherOperationalClasses, data, null).subscribe(res => {
      this.spinner.hide();
      if (res.body.statusCode === 200) {
        if (res.body.data !== null && res.body.data !== undefined) {
          this.classList = res.body.data;
          console.log('he class', this.classList);
          if (this.classList.length !== 0) {
            this.serchByClass = this.classList[0].value;
            this.getDailySheet();
          } else {
            this.serchByClass = '';
          }
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

  getSerchDate(event: Date) {
    this.count++;
    if (this.count > 2) {
      this.searchByDate = event;
      this.searchByDateString = this.commonService.getStringLocalDateTimeFromUTC(this.searchByDate);
      console.log(this.searchByDateString, 'sssssss');
    }
  }

  addDiaperSuggestion(text) {
    if (this.diperForm.value.description) {
      this.suggestArrDiper.push(text);
      this.diperForm.controls['description'].setValue(this.suggestArrDiper);
      this.diperForm.controls['description'].updateValueAndValidity();
    } else {
      this.suggestArrDiper = [];
      this.suggestArrDiper.push(text);
      this.diperForm.controls['description'].setValue(this.suggestArrDiper);
      this.diperForm.controls['description'].updateValueAndValidity();
    }
  }


  paginate(event) {
    console.log('Index of the first record', event.first  );
           console.log('= Number of rows to display in new page', event.rows );
           console.log( '= Index of the new page', event.page );
           console.log('= Total number of pages', event.pageCount );
           this.pageNo = event.page;
           this.getDailySheet();
   }
}
