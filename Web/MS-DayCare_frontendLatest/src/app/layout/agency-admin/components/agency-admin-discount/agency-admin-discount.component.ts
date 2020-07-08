import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { TeacherAPIURLs } from 'src/app/layout/teacher/shared/constant';
import { AgencyApiService } from '../shared/services/agency-api-service/agency-api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler/error-handler.service';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { NotificationService } from '../../../../shared/services/notification-service/notification.service';
import { AgencyAPIURLs } from '../shared/constatant';
declare var $: any;


@Component({
  selector: 'app-agency-admin-discount',
  templateUrl: './agency-admin-discount.component.html',
  styleUrls: ['./agency-admin-discount.component.css']
})
export class AgencyAdminDiscountComponent implements OnInit {
  today = new Date;
  searchByDate: any;
  serchByClass = '';
  fromDate: any;
  toDate: any;
  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  studentList: any [] = [];
  searchByClass: string;
  agencyId = 0;
  pageNo = 0;
  limit = 10;
  totalRecord = 0;
  searchByStudentName = '';
  parentList: any[] = [];
  classList: any[] = [];
  studentListId: any[] = [];
  listOfStudents: any[] = [];
  markAllStudents = false;
  studentID: number[] = [];
  DiscountAmount: number;
  DiscountDescription: string;
  fromDateTemp: any;
  todateTemp: any;
  editTransForm: FormGroup;
  emptyDate: any;
  constructor(private fb: FormBuilder, private apiService: AgencyApiService, private spinner: NgxSpinnerService,
    private error: ErrorHandlerService, public commonService: CommonService , private notification: NotificationService) { }

  ngOnInit() {
    this.agencyId = this.commonService.getAgencyId();
    this.dpConfig = Object.assign({}, { containerClass: 'theme-dark-blue' }, { showWeekNumbers: false }
    );  
  this.GetStudentFeesDiscountAmount();
  }


  getSingleMarkedStudent(id, event) {
    this.markAllStudents = false;
    if (event.target.checked === true) {
      if (this.studentListId.length === 0) {
        this.studentListId.push(id.studentId);
        const no = this.studentList.findIndex(r => r.studentId === id.studentId);
        if (no !== -1) {
          this.studentList[no].isMarked = true;
        }
      } else {
        const index = this.studentListId.findIndex(r => r === id.studentId);
        if (index === -1) {
          this.studentListId.push(id.studentId);
          const no = this.studentList.findIndex(r => r.studentId === id.studentId);
          if (no !== -1) {
            this.studentList[no].isMarked = true;
          }
        }
      }
    } else if (event.target.checked === false) {
      if (this.studentListId.length > 0) {
        const index = this.studentListId.findIndex(r => r === id.studentId);
        this.studentListId.splice(index, 1);
        const no = this.studentList.findIndex(r => r.studentId === id.studentId);
        if (no !== -1) {
          this.studentList[no].isMarked = false;
        }
      }
    }
    console.log('marksingle', this.studentListId );
  }

  /**Get student id using checkbox */
  getAllMarkedStudents(event, students) {
    if (event.target.checked === true) {
      this.studentListId = [];
      students.forEach(data => {
        this.studentListId.push(data.studentId);
        data.isMarked = true;
      });
    } else {
      this.studentListId = [];
      students.forEach(element => {
        element.isMarked = false;
      });
    }
    console.log('markAll', this.studentListId );
  }



  checkIsStudentSelected() {
    const amount = + this.DiscountAmount;
     if (this.studentListId.length > 0 && this.DiscountAmount && this.fromDate && this.toDate) {
       if (this.fromDate.setHours(0, 0, 0)  > this.toDate.setHours(0, 0, 0)) {
        this.spinner.hide();
        this.notification.warning({ message: 'From date shuld be less than To date', title: '' });
       } else if (!this.DiscountAmount || amount <= 0 || isNaN(amount) ) {
        this.spinner.hide();
        this.notification.warning({ message: 'Amount should be greater than zero', title: '' });
      }  else {
        this.SaveFeesDiscountAmount();
       }
    } else if (this.studentListId.length === 0) {   
    this.spinner.hide();
    this.notification.warning({ message: 'Please select student', title: '' });
    } else if (!this.DiscountAmount || amount < 0 || isNaN(amount) ) {
      this.spinner.hide();
      this.notification.warning({ message: 'Please enter valid amount', title: '' });
    } else if (!this.fromDate || !this.toDate) {
      this.spinner.hide();
      this.notification.warning({ message: 'Please select date', title: '' });
    }
  }


  getStudentsList() {
    this.studentList = [];
    this.spinner.show();
    const data = {
      'agencyID': this.agencyId,
      'classID': '',
      'studentID': 0,
      'studentName': this.searchByStudentName,
      'page': this.pageNo,
      'limit': this.limit,
    };

    this.apiService.postData(TeacherAPIURLs.GetAllStudents, data, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.totalRecord = res.body.totalRows;
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

  SaveFeesDiscountAmount() {
    this.spinner.show();
    const data = {
      agencyID: this.agencyId,
      classID: '',
      studentID: 0,
      studentName: this.searchByStudentName,
      FromDate: this.fromDate.toDateString(),
      ToDate: this.toDate.toDateString(),
      DiscountAmount: this.DiscountAmount,
      DiscountDescription: this.DiscountDescription,
      StudentIDs: this.studentListId
    };

    this.apiService.postData(AgencyAPIURLs.SaveStudentFeesDiscountAmount, data, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.totalRecord = res.body.totalRows;
        this.spinner.hide();
        this.studentList = [];
        this.studentListId = [];
        this.studentList = res.body.data;
        this.fromDate = this.emptyDate;
        this.toDate = this.emptyDate;
        this.DiscountAmount = null;
        this.DiscountDescription = '';
        this.GetStudentFeesDiscountAmount();
      } else {
        this.spinner.hide();
        this.error.unknownError();
        this.studentListId = [];
      }
    }, err => {
      this.spinner.hide();
      this.error.commonError(err);
      this.studentListId = [];
    });
  }


  getFromDate(value: Date) {
    this.fromDateTemp = value;
    if (this.fromDateTemp && this.todateTemp) {
      this.GetStudentFeesDiscountAmount();
    }
  }

  getTODate(value: Date) {
    this.todateTemp = value;
    if (this.fromDateTemp && this.todateTemp) {
    this.GetStudentFeesDiscountAmount();
    }
  }

  GetStudentFeesDiscountAmount() {     
        this.spinner.show();
        const modal = {
          'agencyId': this.agencyId,
          'fromDate': this.fromDate ?  this.fromDateTemp.toDateString() : this.emptyDate,
          'toDate': this.todateTemp ?  this.todateTemp.toDateString() : this.emptyDate ,
          'page': this.pageNo,
          'limit': this.limit,
         };
         console.log('perday', modal);       
           this.apiService.postData(AgencyAPIURLs.GetStudentFeesDiscountAmount, modal, null).subscribe(res => {
            if (res.body.statusCode === 200) {
              this.totalRecord = res.body.totalRows;
              this.spinner.hide();
              this.studentList = [];
              this.studentListId = [];
              this.studentList = res.body.data;
              if (this.studentList.length > 0) {
              this.studentList.forEach(element => {
                if (element.isMarked === true) {
                  this.studentListId.push(element.studentId);
                }
              });
            }
            } else {
              this.spinner.hide();
              this.error.unknownError();
              this.studentListId = [];
            }
          }, err => {
            this.spinner.hide();
            this.error.commonError(err);
          }
          );       
        }
  

    paginate(event) {
      this.markAllStudents = false;
      this.studentListId = [];
      this.pageNo = event.page;
      this.GetStudentFeesDiscountAmount();
    }

}
