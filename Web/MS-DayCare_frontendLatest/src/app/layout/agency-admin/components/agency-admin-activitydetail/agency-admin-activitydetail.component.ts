import { Component, OnInit } from '@angular/core';
import { TeacherAPIURLs } from '../../../teacher/shared/constant';
import { FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { TeacherApiService } from '../../../teacher/shared/services/teacher-api-service/teacher-api.service';
import { PostDetailsVM } from '../../../parent/shared/view-model/parent-detailsvm';
import { ErrorHandlerService } from '../../../../shared/services/error-handler/error-handler.service';
import { NotificationService } from '../../../../shared/services/notification-service/notification.service';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '../../../../shared/services/common/common.service';

@Component({
  selector: 'app-agency-admin-activitydetail',
  templateUrl: './agency-admin-activitydetail.component.html',
  styleUrls: ['./agency-admin-activitydetail.component.css']
})
export class AgencyAdminActivitydetailComponent implements OnInit {
  id: any;
  postdetails: PostDetailsVM = {};
  classID: any;
  imagePath: '';
  mediaList: any[] = [];
  showImage: boolean;
  testPath: any;
  constructor(private spinner: NgxSpinnerService, private apiService: TeacherApiService, private commonService: CommonService,
    private fb: FormBuilder, private error: ErrorHandlerService,
    private notification: NotificationService, private route: ActivatedRoute) { }

  ngOnInit() {  
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.classID = params['classid'];
      this.getPostDetails();
    });
  }

  getTeacherOperationalClasses() {

  }

  /**Get All class list */
getPostDetails() {
  this.spinner.show();
  const data = {
    'agencyID': this.commonService.getAgencyId(),
    'id': this.id,
    'classesID': this.classID
  };
  this.apiService.postData(TeacherAPIURLs.GetPostActivityInfo, data, null).subscribe(res => {
    if (res.body.statusCode === 200) {
      this.postdetails = res.body.data;
      this.spinner.hide();
      console.log('details', this.postdetails);
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
