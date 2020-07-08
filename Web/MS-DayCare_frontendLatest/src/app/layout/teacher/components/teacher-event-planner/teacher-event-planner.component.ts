import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TeacherApiService } from '../../shared/services/teacher-api-service/teacher-api.service';
import { ErrorHandlerService } from '../../../../shared/services/error-handler/error-handler.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from '../../../../shared/services/notification-service/notification.service';
import { CommonService } from '../../../../shared/services/common/common.service';
import { TeacherAPIURLs } from '../../shared/constant';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { EventVM } from '../../shared/view-model/eventVM';
import { ConfirmationService } from 'primeng/api';
// import * as $ from 'jquery';
declare var $: any;
@Component({
  selector: 'app-teacher-event-planner',
  templateUrl: './teacher-event-planner.component.html',
  styleUrls: ['./teacher-event-planner.component.css']
})
export class TeacherEventPlannerComponent implements OnInit {
  display: boolean;
  cars: any[] = [];
  events: any[];
  options: any;
  today = new Date();
  calenderForm: FormGroup;
  calendarOptions: Options;
  multiarray1: any[];
  multiarray2: any[];
  classList: any[] = [];
  repeatList: any[] = [];
  showEndsOn: boolean;
  eventList: any[] = [];
  eventVM: EventVM = {};
  repeatNeverID = 0;
  multiClass: any[] = [];
  classListArray: any[] = [];
  currentDate: any;
  eventId = 0;
  selectFoodList: any[] = [];
  tempstart: any;
  tempEnd: any;
  shoEventList: any[] = [];
  disableEndDate = false;
  showDays = false;
  minEndDate = false;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();

  constructor(private apiService: TeacherApiService, private fb: FormBuilder, private error: ErrorHandlerService,
    private spinner: NgxSpinnerService, private notification: NotificationService, private commonService: CommonService,
    private confirmationService: ConfirmationService) { }
  ngOnInit() {
    this.currentDate = new Date();
    this.eventId = 0;
    this.classListArray = [];
    this.getAllClassess();
    this.getRepeatTypelist();
    this.dpConfig = Object.assign({}, { containerClass: 'theme-dark-blue' },
      { showWeekNumbers: false });
    this.calendarOptions = {
      editable: false,
      eventLimit: false,
      displayEventTime: false,
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay,listMonth'
      },
      events: this.eventList,
    };
    this.showEndsOn = false;
    this.multiarray1 = ['Yoga', 'Singing'];
    this.multiarray2 = ['Yoga'];
    this.display = false;
    this.createEventForm();
    this.callEvent(this.currentDate);
    this.getFirstDayOfMonth();
    this.getLastDayOfMonth();
  }

  eventClick(data) {

  }
  createEventForm() {
    if (this.eventId === 0) {
      this.calenderForm = this.fb.group({
        startdate: ['', Validators.required],
        enddate: ['', Validators.required],
        starttime: ['', Validators.required],
        endtime: ['', Validators.required],
        class: ['', Validators.required],
        title: ['', Validators.required],
        description: ['', [Validators.required, Validators.maxLength(500)]],
        repeat: [this.repeatNeverID],
        endson: ['']
      });
    }
  }

  editEventForm() {
    if (this.eventId !== 0) {
      this.calenderForm = this.fb.group({
        startdate: [this.eventVM.start, Validators.required],
        enddate: [this.eventVM.end, Validators.required],
        starttime: [this.eventVM.startTime, Validators.required],
        endtime: [this.eventVM.endTime, Validators.required],
        class: [this.classListArray, Validators.required],
        title: [this.eventVM.title, Validators.required],
        description: [this.eventVM.description, Validators.required],
        repeat: [this.eventVM.plannerRepeatTypeID],
        endson: [this.eventVM.endsOn]
      });
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.calenderForm.controls; }

  callEvent(date) {
    this.getAllEvent(date);
  }


  /**Method to get event details */
  gotoDate(event) {
    this.display = true;
    this.disableEndDate = false;
    this.eventVM = {};
    this.classListArray = [];
    this.eventList.forEach(x => {
      if (x.id === event.event.id) {
        this.eventId = event.event.id;
        this.eventVM.title = event.event.title;
        this.eventVM.start = (new Date(x.start));
        this.eventVM.end = (new Date(x.end));
        this.eventVM.description = x.description;
        this.eventVM.startTime = this.commonService.getLocalDateTimeFromUTC(x.startTime);
        this.eventVM.endTime = this.commonService.getLocalDateTimeFromUTC(x.endTime);
        if (x.plannerRepeatTypeID === 2) {
          this.disableEndDate = true;
        } else {
          this.disableEndDate = false;
        }
        this.eventVM.plannerRepeatTypeID = x.plannerRepeatTypeID;
        this.eventVM.endsOn = new Date(x.endsOn);
        if (x.involvedEventClassesList.length !== 0) {
          x.involvedEventClassesList.forEach(element => {
            this.classListArray.push(element.classesID);
          });
        }
        this.editEventForm();
        if (this.calenderForm.value.repeat !== this.repeatNeverID) {
          this.showEndsOn = true;
          this.calenderForm.controls['endson'].setValidators(Validators.required);
        } else if (this.calenderForm.value.repeat === this.repeatNeverID) {
          this.calenderForm.controls['endson'].setValidators(Validators.nullValidator);
          this.showEndsOn = false;
        } else {
        }
      }
    });
  }

  closeUpdateDialogBox() {
    this.display = false;
  }

  /**Method to get previous and next month events */
  clickButton(value) {
    if (value.buttonType === 'prev' || value.buttonType === 'next') {
      const newDate = new Date(value.data._d);
      newDate.setHours(newDate.getHours() + 24);
      this.currentDate = newDate;
      this.callEvent(newDate);
    }
  }

  updateEvent(data) {
    console.log('update', this.calenderForm);
  }

  addNewEvent() {
    const temp = this.calenderForm.controls['repeat'].value;
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
      this.notification.warning({ message: 'This event will repeat daily from "Begins" to "Ends On" date you will select', title: '' });
    } else {
      this.disableEndDate = false;
    }
  }

  getAllClassess() {
    // this.spinner.show();
    const data = {
      'agencyID': this.commonService.getAgencyId()
    };
    this.apiService.postData(TeacherAPIURLs.GetAllClassesDropdown, data, null).subscribe(res => {
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


  getRepeatTypelist() {
    // this.spinner.show();
    const data = {
      'agencyID': this.commonService.getAgencyId()
    };
    this.apiService.postData(TeacherAPIURLs.GetAllRepeatTypeDropdown, data, null).subscribe(res => {
      //  this.spinner.hide();
      if (res.body.statusCode === 200) {
        this.repeatList = res.body.data;
        this.repeatList.forEach(element => {
          if (element.label === 'Never') {
            this.repeatNeverID = element.value;
            this.createEventForm();
          }
        });
      } else {
        //     this.spinner.hide();
        this.error.unknownError();
      }

    }, err => {
      this.spinner.hide();
      this.error.commonError(err);
    });
  }

  getAllEvent(date) {
    this.spinner.show();
    const data = {
      'agencyID': this.commonService.getAgencyId(),
      'eventSearchFromDate': this.commonService.getFirstDayOfMonth(date),
      'eventSearchToDate': this.commonService.getLastDayOfMonth(date),
    };

    this.apiService.postData(TeacherAPIURLs.GetAllEvents, data, null).subscribe(res => {
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
    this.disableEndDate = false;
    // this.showDays = false;
    this.eventId = 0;
    this.createEventForm();
  }

  // method to bring repeate id and endson field inital state
  cleareRepeateIDStatus() {
    this.showEndsOn = false;
    this.calenderForm.controls['repeat'].setValue(this.repeatNeverID);
    this.calenderForm.controls['endson'].setValidators(Validators.nullValidator);
  }

  getFirstDayOfMonth() {
    const date = this.currentDate,
      y = date.getFullYear(), m = date.getMonth();
    const firstDay = new Date(y, m, 1);
    return firstDay.toDateString();
  }

  getLastDayOfMonth() {
    const date = this.currentDate,
      y = date.getFullYear(), m = date.getMonth();
    const lastDay = new Date(y, m + 1, 0);
    return lastDay.toDateString();
  }


  configureScheduler() {
    this.ucCalendar.renderEvents(this.eventList);
    this.spinner.hide();
  }

  removeEventPopupShow(event) {
  }

  click(event) {
  }

  eventRenderMethod(event) {
    // event.element.children('.fc-content')
    // .append(`<span>x</span>`);
  }

  saveEvent() {
    this.validateEndDate();
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
        debugger;
        this.spinner.show();
        this.eventVM.agencyID = this.commonService.getAgencyId();
        this.eventVM.title = this.calenderForm.value.title;
        this.eventVM.start = new Date(this.calenderForm.value.startdate).toDateString();
        this.eventVM.end = new Date(this.calenderForm.value.enddate).toDateString();
        this.eventVM.description = this.calenderForm.value.description;
        this.eventVM.plannerRepeatTypeID = this.calenderForm.value.repeat;
        this.eventVM.endsOn = this.calenderForm.value.endson === '' ? new Date() : new Date(this.calenderForm.value.endson).toDateString();
        this.eventVM.startTime = this.calenderForm.value.starttime;
        this.eventVM.endTime = this.calenderForm.value.endtime;
        this.eventVM.id = this.eventId !== 0 ? this.eventId : 0;
        this.eventVM.createdBy = this.eventId !== 0 ? null : this.commonService.getLoggedInUserId();
        this.eventVM.updatedBy = this.eventId !== 0 ? this.commonService.getLoggedInUserId() : null;
        if (this.calenderForm.value.class.length !== 0) {
          this.calenderForm.value.class.forEach(element => {
            this.multiClass.push({
              'agencyID': this.commonService.getAgencyId(),
              'classesID': element,
              'eventID': this.eventId !== 0 ? this.eventId : 0
            });
          });
        }
        this.eventVM.involvedEventClassesList = this.multiClass;
        this.apiService.postData(TeacherAPIURLs.SaveEvent, this.eventVM, null).subscribe(res => {
          if (res.body.statusCode === 200) {
            $('.addevent').modal('hide');
            this.display = false;
            this.callEvent(this.currentDate);
            this.notification.success({
              message: this.eventId === 0 ? 'Event created successfully' :
                'Event updated successfully', title: ''
            });
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
      }
    } else if (this.calenderForm.value.startdate <= this.today || this.calenderForm.value.enddate <= this.today) {
      this.notification.warning({ message: 'Your begins or End date should be greater or equal to current date', title: '' });
    } else {
      this.spinner.hide();
      this.commonService.validateAllFields(this.calenderForm);
    }
  }

  /**Delete event method */
  deleteEvent() {
    this.confirmationService.confirm({
      message: 'Do you want to delete this event?',
      accept: () => {
        if (this.eventId > 0) {
          this.spinner.show();
          const data = {
            'agencyID': this.commonService.getAgencyId(),
            'Id': this.eventId,
            'IsDeleted': true,
            'DeletedDate': new Date(),
            'DeletedBy': this.commonService.getLoggedInUserId()
          };
          this.apiService.postData(TeacherAPIURLs.DeleteEvent, data, null).subscribe(res => {
            if (res.body.statusCode === 200) {
              // this.spinner.hide();
              this.deleteIncidentSuccess(this.eventId);
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

  /**Success method for delete event */
  deleteIncidentSuccess(data) {
    const index = this.eventList.findIndex(r => r.id === data);
    this.eventList.splice(index, 1);
    this.spinner.hide();
    this.ucCalendar.renderEvents(this.eventList);
    this.display = false;
    this.notification.success({ message: 'Event deleted successfully', title: '' });
  }

  validateEndDate() {
  }

}
