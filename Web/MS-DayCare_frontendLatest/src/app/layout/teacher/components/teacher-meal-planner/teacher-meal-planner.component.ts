import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { TeacherApiService } from '../../shared/services/teacher-api-service/teacher-api.service';
import { ErrorHandlerService } from '../../../../shared/services/error-handler/error-handler.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from '../../../../shared/services/notification-service/notification.service';
import { CommonService } from '../../../../shared/services/common/common.service';
import { TeacherAPIURLs } from '../../shared/constant';
import { MealVM } from '../../shared/view-model/eventVM';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import {AgencyAPIURLs} from '../../../agency-admin/components/shared/constatant';
declare var $: any;

@Component({
  selector: 'app-teacher-meal-planner',
  templateUrl: './teacher-meal-planner.component.html',
  styleUrls: ['./teacher-meal-planner.component.css']
})
export class TeacherMealPlannerComponent implements OnInit {
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
  showClassName: string;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();

  constructor(private apiService: TeacherApiService, private error: ErrorHandlerService,
    private spinner: NgxSpinnerService, private notification: NotificationService, private commonService: CommonService) { }
  ngOnInit() {
    this.showEndsOn = false;
    this.dpConfig = Object.assign({}, { containerClass: 'theme-dark-blue' },
      { showWeekNumbers: false });
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
  }

  eventClick(data) {
  }


  gotoDate(event) {
    this.showClassName = '';
    this.spinner.show();
    // this.dailogbox = '.addmenu1';
    this.mealVM = {};
    this.classListArray = [];
    this.foodListArray = [];
    this.display = true;

    const req = {
      'mealPlanID': event.event.id,
      'agencyID': this.commonService.getAgencyId(),
    };
    this.apiService.postData(AgencyAPIURLs.GetParticularMealPlan, req, null).subscribe(res => {
      //  this.spinner.hide();
      if (res.body.statusCode === 200) {
        if (res.body.data[0].involvedClass.length !== 0) {
          res.body.data[0].involvedClass.forEach(element => {
            this.showClassName = this.showClassName + ',' + element.className ;
            this.showClassName = this.showClassName.replace(/(,\s*$)|(^,*)/, '');
          });
        }
        this.mealVM.start = new Date(res.body.data[0].start);
        this.mealVM.end = new Date(res.body.data[0].end);
        this.mealVM.involvedEventClassesList = res.body.data[0].involvedClass;
        this.mealVM.description = res.body.data[0].description;
        this.mealVM.title = res.body.data[0].title;
        this.mealVM.endsOn = res.body.data[0].endsOn;
        this.mealVM.endTime = this.commonService.getUTCToLocalFormatedTime(res.body.data[0].endTime);
        this.mealVM.startTime = this.commonService.getUTCToLocalFormatedTime(res.body.data[0].startTime);
        this.mealVM.MealTypeID = res.body.data[0].mealTypeID;
        this.mealVM.plannerRepeatTypeID = res.body.data[0].plannerRepeatTypeID;
        this.mealVM.endsOn = new Date(res.body.data[0].endsOn);
        this.mealVM.MealTypeID = res.body.data[0].mealTypeID;
        if (res.body.data[0].involvedMealFoodItems.length !== 0) {
          res.body.data[0].involvedMealFoodItems.forEach(element => {
            this.foodListArray.push(element.foodTypeID);
          });
        }
        this.involvedFoodList = res.body.data[0].involvedMealFoodItems;
        this.spinner.hide();
      } else {
        this.error.unknownError();
        this.spinner.hide();
      }
    });
    $('.mealdetails').modal('show');
  }

  closeUpdateDialogBox() {
    this.display = false;
  }

  /**Method to get previous and next month events */
  clickButton(value) {
    if (value.buttonType === 'prev' || value.buttonType === 'next') {
      const newDate = new Date(value.data._d);
      newDate.setHours(newDate.getHours() + 24);
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
      //  this.spinner.hide();
      if (res.body.statusCode === 200) {
        this.eventList = res.body.data;
        this.eventList.forEach(x => {
          const lastdt = new Date(x.end);
          const enddt = new Date(x.end);
          lastdt.setHours(enddt.getHours() + 9);
          x.end = lastdt;
        });
        this.configureScheduler();
        // this.events = event;
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
    // this.spinner.show();
    const data = {
      'agencyID': this.commonService.getAgencyId()
    };
    this.apiService.postData(TeacherAPIURLs.GetAllRepeatTypeDropdown, data, null).subscribe(res => {
      //  this.spinner.hide();
      if (res.body.statusCode === 200) {
        this.repeatList = res.body.data;
        // this.repeatList.forEach(element => {
        //   if (element.label === 'Never') {
        //     this.repeatNeverID = element.value;
        //   }
        // });
      } else {
        //     this.spinner.hide();
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
        //   this.spinner.hide();
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
        //   this.spinner.hide();
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

    this.apiService.postData(TeacherAPIURLs.GetAllMeasureQuantityDropdown, data, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        //   this.spinner.hide();
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
        //   this.spinner.hide();
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

  AddFood() {
    // this.displayFoodList.push(this.getFood);
  }

}



