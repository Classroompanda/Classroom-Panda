import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { TeacherApiService } from '../../shared/services/teacher-api-service/teacher-api.service';
import { CommonService } from '../../../../shared/services/common/common.service';
import { FormBuilder } from '@angular/forms';
import { ErrorHandlerService } from '../../../../shared/services/error-handler/error-handler.service';
import { NotificationService } from '../../../../shared/services/notification-service/notification.service';
import { ActivatedRoute } from '@angular/router';
import { TeacherAPIURLs } from '../../shared/constant';
import { PostDetailsVM } from '../../shared/view-model/post-detailsVM';

@Component({
  selector: 'app-teacher-activity-details',
  templateUrl: './teacher-activity-details.component.html',
  styleUrls: ['./teacher-activity-details.component.css']
})
export class TeacherActivityDetailsComponent implements OnInit {
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
  //  this.testPath = 'https://localhost:44391/ReviewTemplateImage/iphonvideo.mov';
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
      // if (this.postdetails) {
      //   ;
      // }

      // if (this.postdetails) {
      //     if (this.postdetails.postActivityImages) {
      //       this.showImage = true;
      //         this.mediaList = this.postdetails.postActivityImages;
      //     } else {
      //       this.showImage = false;
      //       this.mediaList = this.postdetails.postActivityVideos;
      //     }
      // }
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
