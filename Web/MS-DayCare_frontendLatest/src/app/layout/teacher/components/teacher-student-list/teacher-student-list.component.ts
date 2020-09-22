import { Component, OnInit } from '@angular/core';
import { TeacherApiService } from '../../shared/services/teacher-api-service/teacher-api.service';
import { ErrorHandlerService } from '../../../../shared/services/error-handler/error-handler.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from '../../../../shared/services/notification-service/notification.service';
import { CommonService } from '../../../../shared/services/common/common.service';
import { TeacherAPIURLs } from '../../shared/constant';

@Component({
  selector: 'app-teacher-student-list',
  templateUrl: './teacher-student-list.component.html',
  styleUrls: ['./teacher-student-list.component.css']
})
export class TeacherStudentListComponent implements OnInit {
  studentList: any[] = [];
  searchByClass: string;
  classList: any[] = [];
  searchByStudentName: string;
  pageNo = 0;
  limit = 10;
  loader = true;
  totalRecord = 0;
  constructor(private apiService: TeacherApiService, private error: ErrorHandlerService,
    private spinner: NgxSpinnerService, private notification: NotificationService,
    private commonService: CommonService) { }

  ngOnInit() {
    this.searchByClass = '';
    this.searchByStudentName = '';
    this.getAllClassess();
    this.getStudentsList();
  }


  getSerchClass(event) {}

  getStudentsList () {
    this.loader = true;
    if (this.searchByClass === '' ) {
    this.spinner.show();
    const data = {
      'agencyID': this.commonService.getAgencyId(),
      'classID': this.searchByClass,
      'studentID': 0,
      'studentName' : this.searchByStudentName,
      'page': this.pageNo,
      'limit': this.limit,
    };

    this.apiService.postData(TeacherAPIURLs.GetAllStudents, data, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.totalRecord = res.body.totalRows;
        this.spinner.hide();
        this.studentList = res.body.data;
        this.loader = false;
      } else {
        this.spinner.hide();
        this.error.unknownError();
      }
      console.log('list student', res);
    }, err => {
      this.spinner.hide();
      this.error.commonError (err);
    } );
  } else {
    this.getAllStudentsListByClass();
  }
  }


  getAllStudentsListByClass () {
    this.loader = true;
    this.spinner.show();
    const data = {
      'agencyID': this.commonService.getAgencyId(),
      'classID': this.searchByClass,
      'studentID': 0,
      'studentName' : this.searchByStudentName
    };

    this.apiService.postData(TeacherAPIURLs.GetAllStudentsByClass, data, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.totalRecord = res.body.totalRows;
        this.spinner.hide();
        this.studentList = res.body.data;
        this.loader = false;
      } else {
        this.spinner.hide();
        this.error.unknownError();
      }
      console.log('list student', res);
    }, err => {
      this.spinner.hide();
      this.error.commonError (err);
    } );
  }

  getAllClassess() {
    this.spinner.show();
    const data = {
      'agencyID': this.commonService.getAgencyId()
    };
    this.apiService.postData(TeacherAPIURLs.GetAllClasses, data, null).subscribe(res => {
      console.log(res);
      if (res.body.statusCode === 200) {
        this.spinner.hide();
        this.classList = res.body.data;
      } else {
        this.spinner.hide();
        this.error.unknownError();
      }
     // this.searchByClass = this.classList[0].classesID;
      console.log('this.classList', this.classList );
    }, err => {
      this.spinner.hide();
      this.error.commonError(err);
    });
  }






 paginate(event) {
    this.pageNo = event.page;
    // this.limit = event.page;
    this.getStudentsList();
  }

}


