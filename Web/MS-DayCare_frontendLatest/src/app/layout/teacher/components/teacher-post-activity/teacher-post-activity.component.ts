import { Component, OnInit, ViewChild } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { TeacherApiService } from '../../shared/services/teacher-api-service/teacher-api.service';
import { ErrorHandlerService } from '../../../../shared/services/error-handler/error-handler.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from '../../../../shared/services/notification-service/notification.service';
import { CommonService } from '../../../../shared/services/common/common.service';
import { FormBuilder } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { TeacherAPIURLs } from '../../shared/constant';
import { Paginator } from 'primeng/paginator';

@Component({
  selector: 'app-teacher-post-activity',
  templateUrl: './teacher-post-activity.component.html',
  styleUrls: ['./teacher-post-activity.component.css']
})
export class TeacherPostActivityComponent implements OnInit {

  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  constructor(private apiService: TeacherApiService, private error: ErrorHandlerService,
    private spinner: NgxSpinnerService, private notification: NotificationService,
    private commonService: CommonService, private fb: FormBuilder, private confirmationService: ConfirmationService) {}

    classList: any [] = [];
    serchByClass: any;
    searchByDate: any;
    postActivityList: any [] = [];
    today = new Date();
    count = 0;
    pageNo = 0;
    limit = 10;
    totalRecord = 0;
    loader = true;
    @ViewChild('postpage') paginator: Paginator;
  ngOnInit() {
    this.searchByDate = new Date();
    this.dpConfig = Object.assign({}, { containerClass: 'theme-dark-blue' }, { showWeekNumbers: false });
   // this.getAllClassess();
   this.getTeacherOperationalClasses();
  }

/**Get All class list */
getAllClassess() {
  this.spinner.show();
  const data = {
    'agencyID': this.commonService.getAgencyId()
  };
  this.apiService.postData(TeacherAPIURLs.GetAllClasses, data, null).subscribe(res => {
 //   this.spinner.hide();
    if (res.body.statusCode === 200) {
      this.classList = res.body.data;
      if (this.classList.length !== 0) {
      this.serchByClass = this.classList[0].classesID;
      }
      this.getPostActivityList();
    } else {
      this.spinner.hide();
      this.error.unknownError();
    }

  }, err => {
    this.spinner.hide();
    this.error.commonError(err);
  });
}


/**Get post activity list */
getPostActivityList() {
  this.loader = true;
  this.spinner.show();
  const data = {
    'agencyID': this.commonService.getAgencyId(),
    'id': 0,
    'classesID': this.serchByClass,
    'postedDate': this.searchByDate,
    'userID': this.commonService.getReleventUserId('userdetails'),
    'limit': this.limit,
    'page': this.pageNo
  };
  this.apiService.postData(TeacherAPIURLs.GetAllPostActivities, data, null).subscribe(res => {
    if (res.body.statusCode === 200) {
      this.totalRecord = res.body.totalRows;
      this.postActivityList = res.body.data;
      console.log('ppppppppp', this.postActivityList);
      this.loader = false;
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


deletePost(value) {
  this.confirmationService.confirm({
    message: 'Do you want to delete this Post?',
    accept: () => {
      this.spinner.show();
      console.log(value);
        value.deletedBy = this.commonService.getLoggedInUserId();
        value.deletedDate = new Date();
        value.isDeleted = true;
        if (value.postActivityImages.length !== 0) {
            value.postActivityImages.forEach(element => {
              element.deletedBy = this.commonService.getLoggedInUserId();
              element.deletedDate = new Date();
              element.isDeleted = true;
            });
        } else if (value.postActivityVideos.length !== 0) {
          value.postActivityVideos.forEach(element => {
            element.deletedBy = this.commonService.getLoggedInUserId();
            element.deletedDate = new Date();
            element.isDeleted = true;
          });
        } else {

        }

      this.apiService.postData(TeacherAPIURLs.SavePostActivites, value, null).subscribe(res => {
        if (res.body.statusCode === 200) {
             this.deletePostSuccess(value);
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


deletePostSuccess(data) {
  const index = this.postActivityList.findIndex(r => r.id === data.id);
  this.postActivityList.splice(index, 1);
  this.spinner.hide();
  this.notification.success({ message: 'Post deleted successfully', title: '' });
}



getTeacherOperationalClasses() {
  this.classList = [];
  this.spinner.show();
  const data = {
    'agencyID': this.commonService.getAgencyId(),
    'askingDate': this.searchByDate,
    'teacherID': this.commonService.getReleventUserId('userdetails'),
  };
  this.apiService.postData(TeacherAPIURLs.GetTeacherOperationalClasses, data, null).subscribe(res => {
    this.spinner.hide();
    if (res.body.statusCode === 200) {
      this.classList = res.body.data;
      if (this.classList.length !== 0) {
        this.serchByClass = this.classList[0].value;
      } else {
        this.serchByClass = 0;
      //  this.notification.info({message: 'It seems like you have not checked-in into the class yet', title: '' });
      }
      this.getPostActivityList();
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
  this.count ++;
if (this.count > 2) {
this.searchByDate = event;
this.pageNo = 0;
this.classList = [];
this.getTeacherOperationalClasses();
}
}

paginate(event) {
  this.pageNo = event.page;
  // this.limit = event.page;
  this.getPostActivityList();
}


onClickSearch(event) {
  this.pageNo = 0;
  this.paginator.changePageToFirst(event);
  this.getPostActivityList();
}

}
