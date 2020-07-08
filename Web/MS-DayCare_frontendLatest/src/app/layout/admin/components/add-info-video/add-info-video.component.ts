import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { AdminApiService } from '../../shared/services/admin-api.service';
import { ErrorHandlerService } from '../../../../shared/services/error-handler/error-handler.service';
import { NotificationService } from '../../../../shared/services/notification-service/notification.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from '../../../../shared/services/common/common.service';
import { ConfirmationService } from 'primeng/api';
import { TeacherAPIURLs } from 'src/app/layout/teacher/shared/constant';
import { HttpHeaders } from '@angular/common/http';
import { TeacherApiService } from 'src/app/layout/teacher/shared/services/teacher-api-service/teacher-api.service';
declare var $: any;

@Component({
  selector: 'app-add-info-video',
  templateUrl: './add-info-video.component.html',
  styleUrls: ['./add-info-video.component.css']
})
export class AddInfoVideoComponent implements OnInit {
  allowedVideoFileType = 'video/mp4';
  showUploadBtn = true;
  flag = false;
  isImageArray: boolean;
  formData = new FormData();
  VideoUploadForm: FormGroup;
  totalRecord = 0;
  pricingPlanList: any[] = [];
  pageNo = 0;
  limit = 10;
  planId = 0;
  loader = true;
  pricingForm: FormGroup;
  videoList: any[];
  sectionList: any[];
  videoUrlArray: any[] = [];
  videoPath: any;
  @ViewChild('pformvideo') pformvideo: any;

  constructor(private apiService: TeacherApiService, private error: ErrorHandlerService,
    private spinner: NgxSpinnerService, private notification: NotificationService,
    public commonService: CommonService, private fb: FormBuilder, private route: ActivatedRoute,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.videoList = [];
    this.createVideoUploadForm();
    this.GetSectionList();
    this.GetVideoInfo();
  }


  GetVideoInfo() {
    this.videoList = [];
    const req = {
      'IsDeleted': false
    };
    this.apiService.postData(TeacherAPIURLs.GetSectionVideo, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.videoList = res.body.data;
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

  GetSectionList() {
    this.sectionList = [];
    const req = {
      'IsDeleted': false
    };
    this.apiService.postData(TeacherAPIURLs.GetSectionList, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.sectionList = res.body.data;
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

  createVideoUploadForm() {
    this.VideoUploadForm = this.fb.group({
      section: ['', Validators.required],
      title: ['', Validators.required]
    });
  }

  get f() { return this.VideoUploadForm.controls; }

  clearForm() {
    this.videoUrlArray = [];
    this.createVideoUploadForm();
    this.pformvideo.clear();
  }

  myVideoUploader(event) {
    this.spinner.show();
    this.flag = true;
    this.isImageArray = false;
    this.formData = new FormData();
    this.formData.append(event.files[0].name, event.files[0]);
    // this.notification.success({ message: 'Video is ready to upload', title: 'Done!' });
    this.uploadMedia();
  }

  uploadMedia() {
    if (this.VideoUploadForm.valid) {
      this.videoUrlArray = [];
      const headers = new HttpHeaders();
      headers.set('Content-Type', null);
      headers.set('Accept', 'multipart/form-data');
      const params = headers;
      const loggedInId = this.commonService.getLoggedInUserId();
      const Id = loggedInId.toString();
      this.formData.append('loggedInId', Id);
      this.apiService.postData(TeacherAPIURLs.MultipleImageUpload, this.formData, params).subscribe(res => {
        if (res.body.statusCode === 200) {
          this.flag = false;
            res.body.data.forEach(x => {
              this.videoUrlArray.push({
                'id': 0,
                'postActivitiesID': 0,
                'vedioServerPath': x
              });
            });
          this.saveVideo();
          this.formData = new FormData();
        } else {
          this.spinner.hide();
          this.error.unknownError();
          this.formData = new FormData();
        }
      }, err => {
        this.spinner.hide();
        this.error.commonError(err);
        this.formData = new FormData();
      });
    } else {
      this.spinner.hide();
      this.commonService.validateAllFields(this.VideoUploadForm);
    }
  }

  saveVideo() {
    if (this.VideoUploadForm.valid) {
      if (this.videoUrlArray.length > 0) {
        const data = {
          'id': 0,
          'title': this.VideoUploadForm.value.title,
          'VideoPath': this.videoUrlArray[0].vedioServerPath,
          'sectionID' : this.VideoUploadForm.value.section,
          'createdBy': this.commonService.getLoggedInUserId()
        };

        this.apiService.postData(TeacherAPIURLs.SaveSectionVideo, data, null).subscribe(res => {
          if (res.body.statusCode === 200) {
            $('.addvideo').modal('hide');
            this.spinner.hide();
            this.notification.success({ message: 'Video uploaded successfully', title: '' });
            this.GetVideoInfo();
          } else {
            this.spinner.hide();
            this.error.unknownError();
          }
        }, err => {
          this.spinner.hide();
          this.error.commonError(err);
        });
      } else {
        this.spinner.hide();
        this.notification.warning({ message: 'Please upload video', title: '' });
      }
    } else {
      this.spinner.hide();
      this.commonService.validateAllFields(this.VideoUploadForm);
    }

  }



}

