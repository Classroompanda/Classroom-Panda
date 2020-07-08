import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AgencyAPIURLs } from '../shared/constatant';
import { TeacherAPIURLs } from 'src/app/layout/teacher/shared/constant';
import { CalendarComponent } from 'ng-fullcalendar';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { TeacherApiService } from 'src/app/layout/teacher/shared/services/teacher-api-service/teacher-api.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler/error-handler.service';
import { NotificationService } from 'src/app/shared/services/notification-service/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { ConfirmationService } from 'primeng/api';
import { Options } from 'fullcalendar';
import { MealVM } from 'src/app/layout/teacher/shared/view-model/eventVM';
declare var $: any;

@Component({
  selector: 'app-agency-admin-newmealplanner',
  templateUrl: './agency-admin-newmealplanner.component.html',
  styleUrls: ['./agency-admin-newmealplanner.component.css']
})
export class AgencyAdminNewmealplannerComponent implements OnInit {

  cars: any[] = [];
  display = false;
  events: any[];
  options: any;
  today = new Date();
  calendarOptions: Options;
  showEndsOn: boolean;
  eventDetails: any[] = [];
  multiarray1: any[];
  repeatList: any[] = [];
  repeatNeverID = 0;
  mealVM: MealVM = {};
  eventList: any[] = [];
  cuurentDate = new Date();
  classList: any[] = [];
  mealTyptList: any[] = [];
  mealQuantityType: any[] = [];
  MealMeasureType: any[] = [];
  foodItemList: any[] = [];
  getFood: any[] = [];
  displayFoodList: any[] = [];
  displayFoodListSecond: any[] = [];
  classListArray: any[] = [];
  foodListArray: any[] = [];
  involvedFoodList: any[] = [];
  calenderForm: FormGroup;
  disableEndDate = false;
  mealPlannerId = 0;
  tempFood: any[] = [];
  tempFoodSecond: any[] = [];
  items: FormArray;
  itemsSecond: FormArray;
  clearItems: FormArray;
  foodFieldCount = 1;
  foodFieldCountSecond = 1;
  multiClass: any[];
  foodArrayReq: any[] = [];
  foodArrayReqSecond: any[] = [];
  changeInFoodUpdate = false;
  isSubscriptionActive: boolean;
  mealItemMasterName: string;
  involvedMealClassId = 0;
  firstFoodForm: FormGroup;
  secondFoodForm: FormGroup;
  showNextWeekBtn = false;
  agencyID = 0;
  selectedDay: any;
  addFoodLable = 'Add Food';
  videoPath = '';
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();

  constructor(private apiService: TeacherApiService, private error: ErrorHandlerService,
    private spinner: NgxSpinnerService, private notification: NotificationService,
    public commonService: CommonService, private fb: FormBuilder, private confirmationService: ConfirmationService) {
    this.isSubscriptionActive = this.commonService.getSubscriptionStatus();
    this.agencyID = this.commonService.getAgencyId();
  }

  ngOnInit() {
    this.showEndsOn = false;
    this.dpConfig = Object.assign({}, { containerClass: 'theme-dark-blue' },
      { showWeekNumbers: false });
    this.tempFood = [
      {
        'id': 1,
        'foodItem': '',
        'amount': '',
        'unit': ''
      }
    ];

    this.tempFoodSecond = [
      {
        'id': 1,
        'foodItem': '',
        'amount': '',
        'unit': ''
      }
    ];

    this.events = [
      {
        'title': 'Todays Meal',
        'start': this.today,
        'end': this.today,
        'id': 'a',
        'description': 'Snacks type as follows ',
        'class': this.multiarray1,
        'repeate': 'Never'
      }
    ];
    this.displayFoodList.push(this.tempFood);
    this.displayFoodListSecond.push(this.tempFoodSecond);
    this.calendarOptions = {
      editable: false,
      eventLimit: false,
      displayEventTime: false,
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay,listMonth'
      },
      events: this.eventList
    };
    this.callEvent(this.cuurentDate);
    this.getRepeatTypelist();
    this.getAllClasses();
    this.getMealType();
    this.getQuantityType();
    this.getMealMeasureType();
    this.getFoodItems();
    this.createMealPlannerForm();
    this.createFirstFoodForm();
    this.createSecondFoodForm();
    this.getSectionVideo();
  }

  OpenInfoVideo(data) {
    $('#infovideo').modal('show');
  }

  getSectionVideo() {
    const req = {
      'SectionID': 13
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


  createMealPlannerForm() {
    if (this.mealPlannerId === 0) {
      this.calenderForm = this.fb.group({
        startdate: ['', Validators.required],
        enddate: ['', Validators.required],
        class: ['', Validators.required],
        title: ['', Validators.required],
        description: [''],
        repeat: [this.repeatNeverID],
        endson: [''],
        biweekly: [false],
        sun: [false],
        mon: [false],
        tue: [false],
        wed: [false],
        thu: [false],
        fri: [false],
        sat: [false],
        alldays: [false],
        foodcollectionUp: this.fb.array([this.createItem()])
      });
    }
  }


  updateMealPlannerForm() {
    this.calenderForm = this.fb.group({
      startdate: [this.mealVM.start, Validators.required],
      enddate: [this.mealVM.end, Validators.required],
      class: [this.classListArray, Validators.required],
      title: [this.mealVM.title, Validators.required],
      description: [this.mealVM.description],
      biweekly: [this.mealVM.isBiweekly],
      foodcollectionUp: this.fb.array([]),
      alldays: [false],
      sun: [this.mealVM.sun],
      mon: [this.mealVM.mon],
      tue: [this.mealVM.tue],
      wed: [this.mealVM.wed],
      thu: [this.mealVM.thu],
      fri: [this.mealVM.fri],
      sat: [this.mealVM.sat]
    });
    this.updateItem();
  }

  createFirstFoodForm() {
    if (this.mealPlannerId === 0) {
      this.firstFoodForm = this.fb.group({
        foodcollection: this.fb.array([this.createItem()])
      });
    }
  }

  createSecondFoodForm() {
    if (this.mealPlannerId === 0) {
      this.secondFoodForm = this.fb.group({
        foodcollectionsecond: this.fb.array([this.createItem()])
      });
    }
  }

  updateSecondFoodForm() {
    if (this.mealPlannerId !== 0) {
      this.secondFoodForm = this.fb.group({
        foodcollectionsecond: this.fb.array([])
      });
      this.updateItemSecond();
    }
  }


  createItem(): FormGroup {
    return this.fb.group({
      fooditem: [''],
      amount: [''],
      unit: [''],
    });
  }


  updateItem() {
    const ctrl = <FormArray>this.calenderForm.get('foodcollectionUp') as FormArray;
    for (let i = 0; i < this.involvedFoodList.length; i++) {
      ctrl.push(this.fb.group({
        fooditem: [this.involvedFoodList[i].foodTypeID],
        amount: [this.involvedFoodList[i].amount],
        unit: [this.involvedFoodList[i].measureUnitTypeID]
      }));
    }
  }


  updateItemSecond() {
    const ctrl = <FormArray>this.secondFoodForm.get('foodcollectionsecond') as FormArray;
    for (let i = 0; i < this.involvedFoodList.length; i++) {
      ctrl.push(this.fb.group({
        fooditem: [this.involvedFoodList[i].foodTypeID],
        amount: [this.involvedFoodList[i].amount],
        unit: [this.involvedFoodList[i].measureUnitTypeID]
      }));
    }
  }



  get f() { return this.calenderForm.controls; }
  eventClick(data) {
  }



  gotoDate(event) {
    this.selectedDay = event.event.end._d;
    this.getDayFromSelectedPlan();
    this.spinner.show();
    this.mealVM = {};
    this.classListArray = [];
    this.foodListArray = [];
    $('.addmealup').modal('show');
    this.items = this.fb.array([this.createItem()]);
    const req = {
      'mealPlanID': event.event.id,
      'agencyID': this.agencyID,
    };
    this.apiService.postData(AgencyAPIURLs.GetParticularMealPlan, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        if (res.body.data.length > 0) {
          this.mealPlannerId = res.body.data[0].id;
          this.eventDetails = res.body.data[0];
          if (res.body.data[0].involvedClass.length !== 0) {
            res.body.data[0].involvedClass.forEach(element => {
              this.classListArray.push(element.classesID);
            });
          }
          this.mealVM.start = new Date(this.selectedDay);
          this.mealVM.end = new Date(this.selectedDay);
          this.mealVM.involvedClass = res.body.data[0].involvedClass;
          this.mealVM.description = res.body.data[0].description;
          this.mealVM.title = res.body.data[0].title;
          this.mealVM.MealTypeID = res.body.data[0].mealTypeID;
          this.mealVM.isBiweekly = res.body.data[0].isBiweekly;
          this.items.removeAt(0);
          if (res.body.data[0].involvedMealFoodItems.length !== 0) {
            res.body.data[0].involvedMealFoodItems.forEach(element => {
              this.foodListArray.push(element.foodTypeID);
              this.items.value.push({
                'id': element.id, 'fooditem': element.foodTypeID, 'amount': element.amount, 'unit': element.measureUnitTypeID
              });
            });
          }
          this.involvedFoodList = res.body.data[0].involvedMealFoodItems;
          this.displayFoodList = res.body.data[0].involvedMealFoodItems;
          this.mealVM.mon = this.calenderForm.value.mon;
          this.mealVM.tue = this.calenderForm.value.tue;
          this.mealVM.wed = this.calenderForm.value.wed;
          this.mealVM.thu = this.calenderForm.value.thu;
          this.mealVM.fri = this.calenderForm.value.fri;
          this.mealVM.sat = this.calenderForm.value.sat;
          this.mealVM.sun = this.calenderForm.value.sun;
          this.updateMealPlannerForm();
        }
      }
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.error.commonError(err);
    });
  }

  closeUpdateDialogBox() {
    this.display = false;
    $('.mealdetails').modal('hide');
  }

  /**Method to get previous and next month events */
  clickButton(value) {
    if (value.buttonType === 'prev' || value.buttonType === 'next') {
      const newDate = new Date(value.data._d);
      newDate.setHours(newDate.getHours() + 24);
      this.cuurentDate = newDate;
      this.callEvent(newDate);
    }
  }

  updateEvent(data) {
  }

  callEvent(date) {
    this.getAllEvent(date);
  }


  getAllEvent(date) {
    this.spinner.show();
    const data = {
      'agencyID': this.agencyID,
      'eventSearchFromDate': this.commonService.getFirstDayOfMonth(date),
      'eventSearchToDate': this.commonService.getLastDayOfMonth(date),
    };

    this.apiService.postData(TeacherAPIURLs.GetAllMealPlan, data, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.eventList = res.body.data;
        this.eventList.forEach(x => {
          const lastdt = new Date(x.end);
          const enddt = new Date(x.end);
          lastdt.setHours(enddt.getHours() + 9);
          x.end = lastdt;
        });
        this.configureScheduler();
      } else {
        this.spinner.hide();
        this.error.unknownError();
      }

    }, err => {
      this.spinner.hide();
      this.error.commonError(err);
    });
  }

  configureScheduler() {
    this.ucCalendar.renderEvents(this.eventList);
    this.spinner.hide();
  }

  getRepeatTypelist() {
    const data = {
      'agencyID': this.agencyID
    };
    this.apiService.postData(TeacherAPIURLs.GetAllRepeatTypeDropdown, data, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.repeatList = res.body.data;
        this.repeatList.forEach(element => {
          if (element.label === 'Never') {
            this.repeatNeverID = element.value;
            this.calenderForm.controls['repeat'].setValue(this.repeatNeverID);
            this.calenderForm.controls['repeat'].updateValueAndValidity();
          }
        });
      } else {
        this.error.unknownError();
      }

    }, err => {
      this.spinner.hide();
      this.error.commonError(err);
    });
  }

  /**Method to get class list for multiselect component */
  getAllClasses() {
    this.classList = [];
    const data = {
      'agencyID': this.agencyID
    };

    this.apiService.postData(TeacherAPIURLs.GetAllClassesDropdown, data, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.classList = res.body.data;
      } else {
        this.spinner.hide();
        this.error.unknownError();
      }
    }, err => {
      this.spinner.hide();
      this.error.commonError(err);
    });
  }

  /**Method to get meal type  */

  getMealType() {
    const data = {
      'agencyID': this.agencyID
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

  /**Method to get meal quantity type   */
  getQuantityType() {
    const data = {
      'agencyID': this.agencyID
    };

    this.apiService.postData(TeacherAPIURLs.GetAllMeasureUnitTypeDropdown, data, null).subscribe(res => {
      if (res.body.statusCode === 200) {
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
      'agencyID': this.agencyID
    };

    this.apiService.postData(TeacherAPIURLs.GetAllMeasureQuantityDropdown, data, null).subscribe(res => {
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
    this.foodItemList = [];
    const data = {
      'agencyID': this.agencyID
    };

    this.apiService.postData(TeacherAPIURLs.GetAllFoodTypeDropdown, data, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.foodItemList = res.body.data;
      } else {
        this.spinner.hide();
        this.error.unknownError();
      }
    }, err => {
      this.spinner.hide();
      this.error.commonError(err);
    });
  }

  addFood() {
    this.foodFieldCount++;
    this.tempFood.push({ 'id': this.foodFieldCount });
    this.items = this.firstFoodForm.get('foodcollection') as FormArray;
    this.items.push(this.createItem());
    this.displayFoodList = this.tempFood;
  }

  // remove food item in second week modal
  addFoodSecond() {
    this.foodFieldCountSecond++;
    this.tempFoodSecond.push({ 'id': this.foodFieldCountSecond });
    this.itemsSecond = this.secondFoodForm.get('foodcollectionsecond') as FormArray;
    this.itemsSecond.push(this.createItem());
    this.displayFoodListSecond = this.tempFoodSecond;
  }


  addFoodWhileUpdate() {
    this.changeInFoodUpdate = true;
    let count = this.involvedFoodList.length;
    this.items = this.calenderForm.get('foodcollectionUp') as FormArray;
    this.involvedFoodList.push({ 'id': ++count });
    this.items.push(this.createItem());
  }

  removeFoodWhileUpdate(data) {
    this.changeInFoodUpdate = true;
    const index = this.involvedFoodList.findIndex(r => r.id === data.id);
    this.items = this.calenderForm.get('foodcollectionUp') as FormArray;
    this.items.removeAt(index);
    this.involvedFoodList.splice(index, 1);
  }

  removeFood(data) {
    const index = this.displayFoodList.findIndex(r => r.id === data.id);
    this.items = this.firstFoodForm.get('foodcollection') as FormArray;
    this.items.removeAt(index);
    this.displayFoodList.splice(index, 1);
  }

  // remove food item in second week modal
  removeFoodSecond(data) {
    const index = this.displayFoodList.findIndex(r => r.id === data.id);
    this.itemsSecond = this.secondFoodForm.get('foodcollectionsecond') as FormArray;
    this.itemsSecond.removeAt(index);
    this.displayFoodListSecond.splice(index, 1);
  }


  // Method to hide and show reapet end date field
  getRepeatOptions() {
    this.showEndsOn = false;
    if (this.calenderForm.value.repeat !== this.repeatNeverID.toString()) {
      this.showEndsOn = true;
      this.calenderForm.controls['endson'].setValidators(Validators.required);
      this.calenderForm.controls['endson'].updateValueAndValidity();
    } else if (this.calenderForm.value.repeat === this.repeatNeverID.toString()) {
      this.calenderForm.controls['endson'].setValidators(Validators.nullValidator);
      this.calenderForm.controls['endson'].updateValueAndValidity();
      this.showEndsOn = false;
    } else {
    }

    if (this.calenderForm.value.repeat === '2') {
      this.disableEndDate = true;
      this.notification.warning({
        message: 'This event will repeat daily from "Begins" to "Ends On" date you will select',
        title: ''
      });
    } else {
      this.disableEndDate = false;
    }
  }

  // Check weither for details added or not while adding meal plan
  checkIfFoodDetailsEmpty() {
    if (this.items !== undefined || this.itemsSecond !== undefined) {
      let count = 0;
      let CountSecond = 0;
      this.firstFoodForm.value.foodcollection.forEach(element => {
        if (element.amount === '' || element.fooditem === '' || element.unit === '') {
          count = count + 1;
        } else {
        }
      });

      this.secondFoodForm.value.foodcollectionsecond.forEach(element => {
        if (element.amount === '' || element.fooditem === '' || element.unit === '') {
          CountSecond = CountSecond + 1;
        } else {
        }
      });
      if (count > 0) {
        const msg1 = 'Please fill the food details';
        const msg2 = 'Please fill the food details for first week';
        this.notification.warning({ message: this.calenderForm.value.biweekly ? msg2 : msg1, title: '' });
      } else if (this.calenderForm.value.biweekly === true && CountSecond > 0) {
        this.notification.warning({ message: 'Please fill the food details for Second week', title: '' });
      } else {
        this.createMealPlan();
      }
    } else {
      this.notification.warning({ message: 'Please fill the food details', title: '' });
    }

  }

  // Check validation before adding new meal plan
  verifyMealPlan() {
    this.items = this.firstFoodForm.get('foodcollection') as FormArray;
    this.itemsSecond = this.secondFoodForm.get('foodcollectionsecond') as FormArray;
    this.multiClass = [];
    if (this.calenderForm.valid) {
      if (this.calenderForm.value.startdate.setHours(0, 0, 0) > this.calenderForm.value.enddate.setHours(0, 0, 0)) {
        this.spinner.hide();
        this.notification.warning({ message: 'End date should be greater or equal than Begins date ', title: '' });
      } else if (this.items.value.length === 0 || this.items === undefined) {
        this.spinner.hide();
        this.notification.warning({ message: 'Please add food for first week', title: '' });
      } else if (this.calenderForm.value.biweekly === true && (this.itemsSecond.value.length === 0 || this.itemsSecond === undefined)) {
        this.spinner.hide();
        this.notification.warning({ message: 'Please add food for next week', title: '' });
      } else if (this.checkNoDaysSelected()) {
        this.notification.warning({ message: 'Please select day(s)', title: '' });
      } else {
        this.checkIfFoodDetailsEmpty();
      }
    } else {
      this.spinner.hide();
      this.commonService.validateAllFields(this.calenderForm);
    }
  }

  // Check validation before adding new meal plan
  verifyMealPlanWhileUpdate() {
    this.items = this.calenderForm.get('foodcollectionUp') as FormArray;
    this.multiClass = [];
    if (this.calenderForm.valid) {
      if (this.calenderForm.value.startdate.setHours(0, 0, 0) > this.calenderForm.value.enddate.setHours(0, 0, 0)) {
        this.notification.warning({ message: 'End date should be greater or equal than Begins date ', title: '' });
      } else {
        this.checkIfFoodDetailsEmptyForUpdate();
      }
    } else {
      this.spinner.hide();
      this.commonService.validateAllFields(this.calenderForm);
    }
  }

  // Check weither for details added or not while update meal plan
  checkIfFoodDetailsEmptyForUpdate() {
    if (this.items !== undefined) {
      let count = 0;
      this.calenderForm.value.foodcollectionUp.forEach(element => {
        if (element.amount === '' || element.fooditem === '' || element.unit === '') {
          count = count + 1;
        } else {
        }
      });
      if (count === 0) {
        this.createMealPlan();
      } else {
        this.notification.warning({ message: 'Please fill the food details', title: '' });
      }
    } else {
      this.notification.warning({ message: 'Please fill the food details', title: '' });
    }

  }




  // Method to cretae and Update meal plan
  createMealPlan() {
    let mealAPI = '';
    this.foodArrayReq = [];
    this.foodArrayReqSecond = [];
    this.multiClass = [];
    this.mealVM = {};
    this.spinner.show();
    this.mealVM.agencyID = this.agencyID;
    this.mealVM.title = this.calenderForm.value.title;
    this.mealVM.start = new Date(this.calenderForm.value.startdate).toDateString();
    this.mealVM.end = new Date(this.calenderForm.value.enddate).toDateString();
    this.mealVM.description = this.calenderForm.value.description;
    this.mealVM.isBiweekly = this.calenderForm.value.biweekly;
    this.mealVM.id = this.mealPlannerId !== 0 ? this.mealPlannerId : 0;
    if (this.calenderForm.value.class.length !== 0) {
      this.calenderForm.value.class.forEach(element => {
        this.multiClass.push({
          'agencyID': this.agencyID,
          'classesID': element,
          'MealPlannerID': this.mealPlannerId !== 0 ? this.mealPlannerId : 0,
          'id': this.involvedMealClassId
        });
      });
    }

    this.mealVM.mon = this.calenderForm.value.mon;
    this.mealVM.tue = this.calenderForm.value.tue;
    this.mealVM.wed = this.calenderForm.value.wed;
    this.mealVM.thu = this.calenderForm.value.thu;
    this.mealVM.fri = this.calenderForm.value.fri;
    this.mealVM.sat = this.calenderForm.value.sat;
    this.mealVM.sun = this.calenderForm.value.sun;


    this.mealVM.involvedClass = this.multiClass;
    if (this.items.value.length !== 0 && this.items !== undefined) {
      this.items.value.forEach(element => {
        this.foodArrayReq.push({
          'id': this.mealPlannerId !== 0 ? element.id : 0,
          'agencyID': this.agencyID,
          'MealPlannerID': this.mealPlannerId !== 0 ? this.mealPlannerId : 0,
          'foodTypeID': element.fooditem,
          'amount': element.amount,
          'measureUnitTypeID': element.unit
        });
      });
    }
    if (this.mealPlannerId === 0) {
      mealAPI = AgencyAPIURLs.SaveMealPlan;
      if (this.itemsSecond.value.length !== 0 && this.itemsSecond !== undefined) {
        this.itemsSecond.value.forEach(element => {
          this.foodArrayReqSecond.push({
            'id': this.mealPlannerId !== 0 ? element.id : 0,
            'agencyID': this.agencyID,
            'MealPlannerID': this.mealPlannerId !== 0 ? this.mealPlannerId : 0,
            'foodTypeID': element.fooditem,
            'amount': element.amount,
            'measureUnitTypeID': element.unit
          });
        });
      }
    } else {
      mealAPI = AgencyAPIURLs.UpdateParticularMealPlan;
    }

    this.mealVM.involvedMealFoodItems = this.foodArrayReq;
    if (this.mealVM.isBiweekly) {
      this.mealVM.involvedMealFoodItemsSecond = this.foodArrayReqSecond;
    } else {
      this.mealVM.involvedMealFoodItemsSecond = [];
    }
    this.mealVM.involvedMealFoodItems = this.foodArrayReq;
    this.apiService.postData(mealAPI, this.mealVM, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.spinner.hide();
        $('.addmeal').modal('hide');
        this.display = false;
        $('.addmealup').modal('hide');
        this.callEvent(this.cuurentDate);
        this.notification.success({
          message: this.mealPlannerId === 0 ? 'Meal plan created successfully' :
            'Meal plan updated successfully', title: ''
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

  clearForm() {
    this.mealPlannerId = 0;
    if (this.items) {
      this.items = this.clearItems;
    }
    if (this.itemsSecond) {
      this.itemsSecond = this.clearItems;
    }
    this.showNextWeekBtn = false;
    this.foodFieldCount = 1;
    this.foodFieldCountSecond = 1;
    this.involvedMealClassId = 0;
    this.display = false;
    $('.mealdetails').modal('hide');
    this.changeInFoodUpdate = false;
    this.displayFoodList = [];
    this.displayFoodListSecond = [];
    this.tempFood = [];
    this.tempFoodSecond = [];
    this.tempFood = [
      {
        'id': 1,
        'foodItem': '',
        'amount': '',
        'unit': ''
      }
    ];
    this.tempFoodSecond = [
      {
        'id': 1,
        'foodItem': '',
        'amount': '',
        'unit': ''
      }
    ];
    this.displayFoodList.push(this.tempFood);
    this.displayFoodListSecond.push(this.tempFoodSecond);
    this.createMealPlannerForm();
    this.createFirstFoodForm();
    this.createSecondFoodForm();
  }


  isBiweeklyCheck() {
    if (this.calenderForm.value.biweekly === true) {
      this.showNextWeekBtn = true;
      this.addFoodLable = 'Add First Week Food';
    } else {
      this.addFoodLable = 'Add Food';
      this.foodFieldCountSecond = 1;
      this.displayFoodListSecond = [];
      this.tempFoodSecond = [
        {
          'id': 1,
          'foodItem': '',
          'amount': '',
          'unit': ''
        }
      ];
      this.displayFoodListSecond.push(this.tempFoodSecond);
      this.createSecondFoodForm();
      this.showNextWeekBtn = false;
    }
  }





  // Method to add new food item into food list
  saveMealItemInformation() {
    this.mealItemMasterName = this.mealItemMasterName.trim();
    if (this.mealItemMasterName === '' || this.mealItemMasterName === undefined && this.mealItemMasterName === null) {
      this.notification.warning({ message: 'Please enter valid food name', title: '' });
    } else {
      this.spinner.show();
      const data = {
        'agencyID': this.agencyID,
        'FoodTypeName': this.mealItemMasterName
      };
      this.apiService.postData(AgencyAPIURLs.SaveMealItemInformation, data, null).subscribe(res => {
        if (res.body.statusCode === 200) {
          this.getFoodItems();
          $('.newfood').modal('hide');
          this.notification.success({ message: 'New food item added successfully', title: '' });
          this.spinner.hide();
        } else if (res.body.statusCode === 987) {
          this.notification.warning({ message: 'Already Exist', title: '' });
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


  clearFoodFormForm() {
    this.mealItemMasterName = '';
  }




  /**Delete event method */
  deleteEvent() {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      accept: () => {
        if (this.mealPlannerId > 0) {
          this.spinner.show();
          const data = {
            'agencyID': this.agencyID,
            'mealPlannerID': this.mealPlannerId,
            'mon': this.calenderForm.value.mon,
            'tue': this.calenderForm.value.tue,
            'wed': this.calenderForm.value.wed,
            'thu': this.calenderForm.value.thu,
            'fri': this.calenderForm.value.fri,
            'sat': this.calenderForm.value.sat,
            'sun': this.calenderForm.value.sun
          };
          this.apiService.postData(TeacherAPIURLs.DeleteParticularMealPlan, data, null).subscribe(res => {
            if (res.body.statusCode === 200) {
              this.deleteMealPlanSuccess(this.mealPlannerId);
            } else {
              this.spinner.hide();
              this.error.unknownError();
            }
          }, err => {
            this.spinner.hide();
            this.error.commonError(err);
          });
        } else {
          this.error.unknownError();
        }
      }
    });
  }

  /**Success method for delete meal plan */
  deleteMealPlanSuccess(data) {
    $('.addmealup').modal('hide');
    this.callEvent(this.cuurentDate);
    this.notification.success({ message: 'Record deleted successfully', title: '' });
  }


  marUnmarkAllDays() {
    if (this.calenderForm.value.alldays) {
      this.calenderForm.controls['mon'].setValue(true);
      this.calenderForm.controls['tue'].setValue(true);
      this.calenderForm.controls['wed'].setValue(true);
      this.calenderForm.controls['thu'].setValue(true);
      this.calenderForm.controls['fri'].setValue(true);
      this.calenderForm.controls['sat'].setValue(true);
      this.calenderForm.controls['sun'].setValue(true);
      this.calenderForm.updateValueAndValidity();
    } else {
      this.calenderForm.controls['mon'].setValue(false);
      this.calenderForm.controls['tue'].setValue(false);
      this.calenderForm.controls['wed'].setValue(false);
      this.calenderForm.controls['thu'].setValue(false);
      this.calenderForm.controls['fri'].setValue(false);
      this.calenderForm.controls['sat'].setValue(false);
      this.calenderForm.controls['sun'].setValue(false);
      this.calenderForm.updateValueAndValidity();
    }
  }

  unmarkAllDaysCheck(contrl) {
    console.log(this.calenderForm);
    this.calenderForm.controls['alldays'].setValue(false);
    this.calenderForm.updateValueAndValidity();
  }


  checkNoDaysSelected() {
    if (this.calenderForm.value.mon === false && this.calenderForm.value.tue === false && this.calenderForm.value.wed === false
      && this.calenderForm.value.thu === false && this.calenderForm.value.fri === false && this.calenderForm.value.mon === false
      && this.calenderForm.value.sun === false) {
      return true;
    }
  }


  getDayFromSelectedPlan() {
    const d = new Date(this.selectedDay).getDay();
    if (d === 0) {
      this.calenderForm.controls['sun'].setValue(true);
      this.calenderForm.controls['mon'].setValue(false);
      this.calenderForm.controls['tue'].setValue(false);
      this.calenderForm.controls['wed'].setValue(false);
      this.calenderForm.controls['thu'].setValue(false);
      this.calenderForm.controls['fri'].setValue(false);
      this.calenderForm.controls['sat'].setValue(false);
    } else if (d === 1) {
      this.calenderForm.controls['mon'].setValue(true);
      this.calenderForm.controls['tue'].setValue(false);
      this.calenderForm.controls['wed'].setValue(false);
      this.calenderForm.controls['thu'].setValue(false);
      this.calenderForm.controls['fri'].setValue(false);
      this.calenderForm.controls['sat'].setValue(false);
      this.calenderForm.controls['sun'].setValue(false);
    } else if (d === 2) {
      this.calenderForm.controls['tue'].setValue(true);
      this.calenderForm.controls['mon'].setValue(false);
      this.calenderForm.controls['wed'].setValue(false);
      this.calenderForm.controls['thu'].setValue(false);
      this.calenderForm.controls['fri'].setValue(false);
      this.calenderForm.controls['sat'].setValue(false);
      this.calenderForm.controls['sun'].setValue(false);
    } else if (d === 3) {
      this.calenderForm.controls['wed'].setValue(true);
      this.calenderForm.controls['mon'].setValue(false);
      this.calenderForm.controls['tue'].setValue(false);
      this.calenderForm.controls['thu'].setValue(false);
      this.calenderForm.controls['fri'].setValue(false);
      this.calenderForm.controls['sat'].setValue(false);
      this.calenderForm.controls['sun'].setValue(false);
    } else if (d === 4) {
      this.calenderForm.controls['thu'].setValue(true);
      this.calenderForm.controls['mon'].setValue(false);
      this.calenderForm.controls['tue'].setValue(false);
      this.calenderForm.controls['wed'].setValue(false);
      this.calenderForm.controls['fri'].setValue(false);
      this.calenderForm.controls['sat'].setValue(false);
      this.calenderForm.controls['sun'].setValue(false);
    } else if (d === 5) {
      this.calenderForm.controls['fri'].setValue(true);
      this.calenderForm.controls['mon'].setValue(false);
      this.calenderForm.controls['tue'].setValue(false);
      this.calenderForm.controls['wed'].setValue(false);
      this.calenderForm.controls['thu'].setValue(false);
      this.calenderForm.controls['sat'].setValue(false);
      this.calenderForm.controls['sun'].setValue(false);
    } else {
      this.calenderForm.controls['sat'].setValue(true);
      this.calenderForm.controls['mon'].setValue(false);
      this.calenderForm.controls['tue'].setValue(false);
      this.calenderForm.controls['wed'].setValue(false);
      this.calenderForm.controls['thu'].setValue(false);
      this.calenderForm.controls['fri'].setValue(false);
      this.calenderForm.controls['sun'].setValue(false);
    }
  }

  // this method is use to close add food modal (first and second week)
  closeAddFoodModel(no) {
    if (no === 1) {
      $('.secondfood').modal('hide');
    } else {
      $('.firstfood').modal('hide');
    }
  }


}
