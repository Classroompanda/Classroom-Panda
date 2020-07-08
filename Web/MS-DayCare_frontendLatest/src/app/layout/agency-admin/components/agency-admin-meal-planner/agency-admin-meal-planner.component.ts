import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { TeacherAPIURLs } from '../../../teacher/shared/constant';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { TeacherApiService } from '../../../teacher/shared/services/teacher-api-service/teacher-api.service';
import { ErrorHandlerService } from '../../../../shared/services/error-handler/error-handler.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from '../../../../shared/services/notification-service/notification.service';
import { CommonService } from '../../../../shared/services/common/common.service';
import { MealVM } from '../../../teacher/shared/view-model/eventVM';
import { AgencyAPIURLs } from '../shared/constatant';
import { ConfirmationService } from 'primeng/api';
declare var $: any;
@Component({
  selector: 'app-agency-admin-meal-planner',
  templateUrl: './agency-admin-meal-planner.component.html',
  styleUrls: ['./agency-admin-meal-planner.component.css']
})
export class AgencyAdminMealPlannerComponent implements OnInit {

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
  classListArray: any[] = [];
  foodListArray: any[] = [];
  involvedFoodList: any[] = [];
  calenderForm: FormGroup;
  disableEndDate = false;
  mealPlannerId = 0;
  tempFood: any [] = [];
  items: FormArray;
  clearItems: FormArray;
  foodFieldCount = 1;
  multiClass: any [];
  foodArrayReq: any [] = [];
  changeInFoodUpdate = false;
  isSubscriptionActive: boolean;
  mealItemMasterName: string;
  involvedMealClassId = 0;
  videoPath = '';
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();

  constructor(private apiService: TeacherApiService, private error: ErrorHandlerService,
    private spinner: NgxSpinnerService, private notification: NotificationService,
     public commonService: CommonService, private fb: FormBuilder, private confirmationService: ConfirmationService) {
      this.isSubscriptionActive = this.commonService.getSubscriptionStatus();
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
    this.getSectionVideo();
  }

  
OpenInfoVideo(data) {
  $('#infovideo').modal('show');
}

getSectionVideo() {
  const req = {
    'SectionID': 5
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
            starttime: ['', Validators.required],
            endtime: ['', Validators.required],
            class: ['', Validators.required],
            title: ['', Validators.required],
            description: [''],
            repeat: [this.repeatNeverID],
            endson: [''],
            category: ['', Validators.required],
            foodcollection: this.fb.array([this.createItem()])
        });
    }
}


updateMealPlannerForm() {
  if (this.mealPlannerId !== 0) {
      this.calenderForm = this.fb.group({
          startdate: [this.mealVM.start, Validators.required],
          enddate: [this.mealVM.end, Validators.required],
          starttime: [this.mealVM.startTime, Validators.required],
          endtime: [this.mealVM.endTime, Validators.required],
          class: [this.classListArray, Validators.required],
          title: [this.mealVM.title, Validators.required],
          description: [this.mealVM.description],
          repeat: [this.mealVM.plannerRepeatTypeID],
          endson: [this.mealVM.endsOn],
          category: [this.mealVM.MealTypeID, Validators.required],
          foodcollection: this.fb.array([])
      });
this.updateItem();
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
  const ctrl = <FormArray>this.calenderForm.get('foodcollection') as FormArray;
  for (let i = 0; i < this.involvedFoodList.length; i++) {
    ctrl.push(this.fb.group({
      fooditem: [this.involvedFoodList[i].foodTypeID],
      amount: [this.involvedFoodList[i].amount],
      unit: [this.involvedFoodList[i].measureUnitTypeID]
    }));
  }
}

initItemRows() {
  if (this.mealPlannerId === 0) {
    const ctrl = <FormArray>this.calenderForm.get('foodcollection') as FormArray;
    for (let i = 0; i < this.involvedFoodList.length; i++) {
      ctrl.push(this.fb.group({
        foodItem: ['', Validators.required],
        amount: ['', Validators.required],
        unit: ['', Validators.required]
      }));
    }
  } else {
    
  }
}

get f() { return this.calenderForm.controls; }
  eventClick(data) {
  }



  gotoDate(event) {
    this.spinner.show();
    this.mealVM = {};
    this.classListArray = [];
    this.foodListArray = [];
    $('.mealdetails').modal('show');
   this.items = this.fb.array([this.createItem()]);
    const req = {
      'mealPlanID': event.event.id,
      'agencyID': this.commonService.getAgencyId(),
    };
    this.apiService.postData(AgencyAPIURLs.GetParticularMealPlan, req, null).subscribe(res => {
      //  this.spinner.hide();
      if (res.body.statusCode === 200) {
        this.mealPlannerId = res.body.data[0].id;
        this.eventDetails = res.body.data[0];
        if (res.body.data[0].involvedClass.length !== 0) {
          res.body.data[0].involvedClass.forEach(element => {
            this.classListArray.push(element.classesID);
          });
        }
        this.mealVM.start = new Date(res.body.data[0].start);
        this.mealVM.end = new Date(res.body.data[0].end);
        this.mealVM.involvedClass = res.body.data[0].involvedClass;
        this.mealVM.description = res.body.data[0].description;
        this.mealVM.title = res.body.data[0].title;
        this.mealVM.endTime = this.commonService.getUTCToLocalFormatedTime(res.body.data[0].endTime);
        this.mealVM.startTime = this.commonService.getUTCToLocalFormatedTime(res.body.data[0].startTime);
        this.mealVM.endsOn = res.body.data[0].endsOn;
        this.mealVM.MealTypeID = res.body.data[0].mealTypeID;
        this.mealVM.plannerRepeatTypeID = res.body.data[0].plannerRepeatTypeID;
        this.mealVM.MealTypeID = this.calenderForm.value.category;

        if ( this.mealVM.plannerRepeatTypeID === 2) {
        this.disableEndDate = true;
        } else {
          this.disableEndDate = false;
        }
        this.mealVM.endsOn = new Date(res.body.data[0].endsOn);
        this.mealVM.MealTypeID = res.body.data[0].mealTypeID;
        this.items.removeAt(0);
        if (res.body.data[0].involvedMealFoodItems.length !== 0) {
          res.body.data[0].involvedMealFoodItems.forEach(element => {
            this.foodListArray.push(element.foodTypeID);
            this.items.value.push({
            'id': element.id,  'fooditem': element.foodTypeID, 'amount': element.amount, 'unit': element.measureUnitTypeID
            });
          });
        }
        this.involvedFoodList = res.body.data[0].involvedMealFoodItems;
        this.displayFoodList = res.body.data[0].involvedMealFoodItems;
        this.updateMealPlannerForm();
      }
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.error.commonError(err);
    });
    this.updateMealPlannerForm();
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
      'agencyID': this.commonService.getAgencyId(),
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
      'agencyID': this.commonService.getAgencyId()
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
      'agencyID': this.commonService.getAgencyId()
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

  /**Method to get meal quantity type   */
  getQuantityType() {
    const data = {
      'agencyID': this.commonService.getAgencyId()
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
      'agencyID': this.commonService.getAgencyId()
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
      'agencyID': this.commonService.getAgencyId()
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
    this.foodFieldCount ++;
    this.tempFood.push({'id' : this.foodFieldCount});
     this.items = this.calenderForm.get('foodcollection') as FormArray;
   this.items.push(this.createItem());
    this.displayFoodList = this.tempFood;
  }

  addFoodWhileUpdate() {
    this.changeInFoodUpdate = true;
    let count = this.involvedFoodList.length;
     this.items = this.calenderForm.get('foodcollection') as FormArray;
    this.involvedFoodList.push({'id': ++ count });
   this.items.push(this.createItem());
  }

  removeFoodWhileUpdate(data) {
    this.changeInFoodUpdate = true;
    const index = this.involvedFoodList.findIndex(r => r.id === data.id);
    this.items = this.calenderForm.get('foodcollection') as FormArray;
    this.items.removeAt(index);
    this.involvedFoodList.splice(index, 1);
  }

  removeFood(data) {
    const index = this.displayFoodList.findIndex(r => r.id === data.id);
    this.items = this.calenderForm.get('foodcollection') as FormArray;
     this.items.removeAt(index);
    this.displayFoodList.splice(index, 1);
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
          this.notification.warning({ message: 'This event will repeat daily from "Begins" to "Ends On" date you will select',
           title: '' });
      } else {
          this.disableEndDate = false;
      }
  }



checkIfFoodDetailsEmpty() {
    if (this.calenderForm.value.foodcollection.length === 1 && this.mealPlannerId === 0) {
      this.items = this.calenderForm.get('foodcollection') as FormArray;
      this.items.value[0] = this.calenderForm.value.foodcollection[0];
    }
    if (this.mealPlannerId > 0 && !this.changeInFoodUpdate ) {
      for (let index = 0; index < this.items.value.length; index++) {
        this.items.value[index] = this.calenderForm.value.foodcollection[index];
      }
    }
  if (this.items !== undefined ) {
    let count = 0;
    this.calenderForm.value.foodcollection.forEach(element => {
        if (element.amount === ''  || element.fooditem === '' || element.unit === '') {
          count  = count + 1 ;
        } else {
        }
    });
    if (count === 0) {
      this.createMealPlan();
    } else {
      this.notification.warning({message: 'Please fill the food details', title: ''});
    }
  } else {
    this.notification.warning({message: 'Please fill the food details', title: ''});
  }

}


  verifyMealPlan() {
    this.multiClass = [];
    if (this.calenderForm.valid) {
        if (this.calenderForm.value.startdate.setHours(0, 0, 0) > this.calenderForm.value.enddate.setHours(0, 0, 0)) {
            this.notification.warning({ message: 'End date should be greater or equal than Begins date ', title: '' });
        } else if (this.calenderForm.value.starttime > this.calenderForm.value.endtime) {
            this.notification.warning({ message: 'End time should be greater than Start time  ', title: '' });
        } else if (this.showEndsOn &&
            (this.calenderForm.value.enddate.setHours(0, 0, 0) > this.calenderForm.value.endson.setHours(0, 0, 0))) {
            this.notification.warning({ message: 'Ends On  date should be greater than End date ', title: '' });
        } else {
       this.checkIfFoodDetailsEmpty();
        }
  } else {
    this.spinner.hide();
    this.commonService.validateAllFields(this.calenderForm);
  }
}

createMealPlan() {
  this.foodArrayReq = [];
  this.multiClass = [];
  this.mealVM = {};
  this.spinner.show();
  this.mealVM.agencyID = this.commonService.getAgencyId();
  this.mealVM.title = this.calenderForm.value.title;
  this.mealVM.start = new Date(this.calenderForm.value.startdate).toDateString();
  this.mealVM.end = new Date(this.calenderForm.value.enddate).toDateString();
  this.mealVM.description = this.calenderForm.value.description;
  this.mealVM.plannerRepeatTypeID = this.calenderForm.value.repeat;
  this.mealVM.endsOn = this.calenderForm.value.endson === '' ?
      new Date() : new Date(this.calenderForm.value.endson).toDateString();
  this.mealVM.startTime = this.calenderForm.value.starttime;
  this.mealVM.endTime = this.calenderForm.value.endtime;
  this.mealVM.id = this.mealPlannerId !== 0 ? this.mealPlannerId : 0;
  if (this.calenderForm.value.class.length !== 0) {
      this.calenderForm.value.class.forEach(element => {
          this.multiClass.push({
              'agencyID': this.commonService.getAgencyId(),
              'classesID': element,
              'MealPlannerID': this.mealPlannerId !== 0 ? this.mealPlannerId : 0,
              'id': this.involvedMealClassId
          });
      });
  }
  this.mealVM.involvedClass = this.multiClass;
  this.mealVM.MealTypeID = this.calenderForm.value.category;
  if (this.items.value.length !== 0 && this.items !== undefined) {
    this.items.value.forEach(element => {
    this.foodArrayReq.push({
      'id': this.mealPlannerId !== 0 ? element.id : 0,
      'agencyID': this.commonService.getAgencyId(),
      'MealPlannerID': this.mealPlannerId !== 0 ? this.mealPlannerId : 0,
      'foodTypeID': element.fooditem,
      'amount': element.amount,
      'measureUnitTypeID': element.unit
    });
  });
}

 this.mealVM.involvedMealFoodItems = this.foodArrayReq;
  this.apiService.postData(AgencyAPIURLs.SaveMealPlan, this.mealVM, null).subscribe( res => {
    if ( res.body.statusCode === 200) {
      this.spinner.hide();
      $('.addmeal').modal('hide');
      this.display = false;
      $('.mealdetails').modal('hide');
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
  if (this.items) {
    this.items = this.clearItems;
  }
  this.foodFieldCount = 1;
  this.involvedMealClassId = 0;
  this.display = false;
  $('.mealdetails').modal('hide');
  this.changeInFoodUpdate = false;
  this.mealPlannerId = 0;
  this.displayFoodList = [];
  this.tempFood = [];
  this.tempFood = [
    {
      'id': 1,
      'foodItem': '',
      'amount': '',
      'unit': ''
    }
  ];
  this.displayFoodList.push(this.tempFood);
  this.createMealPlannerForm();
}

updatePlan() {
}

// Method to add new food item into food list
saveMealItemInformation() {
  this.mealItemMasterName = this.mealItemMasterName.trim();
  if (this.mealItemMasterName === '' || this.mealItemMasterName === undefined && this.mealItemMasterName === null ) {
    this.notification.warning({message: 'Please enter valid food name', title: ''});
  } else {
    this.spinner.show();
    const data = {
      'agencyID': this.commonService.getAgencyId(),
      'FoodTypeName': this.mealItemMasterName
    };
    this.apiService.postData(AgencyAPIURLs.SaveMealItemInformation, data, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.getFoodItems();
        $('.newfood').modal('hide');
        this.notification.success({message: 'New food item added successfully', title: ''});
         this.spinner.hide();
      } else if (res.body.statusCode === 987) {
        this.notification.warning({message: 'Already Exist', title: ''});
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

removeModalPosition(event) {
  document.getElementsByTagName('body')[0].removeAttribute('style');
}



/**Delete event method */
deleteEvent() {
  console.log(this.mealPlannerId);
  this.confirmationService.confirm({
      message: 'Do you want to delete this event?',
      accept: () => {
          if (this.mealPlannerId > 0) {
              this.spinner.show();
              const data = {
                  'agencyID': this.commonService.getAgencyId(),
                  'mealPlannerID': this.mealPlannerId
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
  const index = this.eventList.findIndex(r => r.id === data);
  this.eventList.splice(index, 1);
  this.spinner.hide();
  this.ucCalendar.renderEvents(this.eventList);
  $('.mealdetails').modal('hide');
  this.notification.success({ message: 'Plan deleted successfully', title: '' });
}

}

