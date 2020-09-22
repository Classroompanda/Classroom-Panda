import { Component, OnInit } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { ErrorHandlerService } from '../../../../shared/services/error-handler/error-handler.service';
import { NotificationService } from '../../../../shared/services/notification-service/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from '../../../../shared/services/common/common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { TeacherAPIURLs } from '../../../teacher/shared/constant';
import { AgencyApiService } from '../shared/services/agency-api-service/agency-api.service';
import { AgencyAPIURLs } from '../shared/constatant';
declare var $: any;

@Component({
  selector: 'app-agency-admin-post-activity',
  templateUrl: './agency-admin-post-activity.component.html',
  styleUrls: ['./agency-admin-post-activity.component.css']
})
export class AgencyAdminPostActivityComponent implements OnInit {
  classList: any[] = [];
  serchByClass: any;
  searchByDate: any;
  postActivityList: any[] = [];
  unApprovedImagesList: any[] = [];
  today = new Date();
  count = 0;
  pageNo = 0;
  limit = 10;
  totalRecord = 0;
  loader = true;
  videoPath = '';
  approvalType = '';
  imagePath = '';
  ImageApprovalForm: FormGroup;
  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  constructor(private apiService: AgencyApiService, private error: ErrorHandlerService,
    private spinner: NgxSpinnerService, private notification: NotificationService,
    private fb: FormBuilder, private confirmationService: ConfirmationService, private commonService: CommonService) {
  }
  ngOnInit() {
    this.searchByDate = new Date();
    this.dpConfig = Object.assign({}, { containerClass: 'theme-dark-blue' }, { showWeekNumbers: false });
    // this.getAllClassess();
    this.GetUnApprovedImages();
    this.getSectionVideo();
    this.GetApprovalType();
    this.createImageApprovalForm();

  }

  OpenInfoVideo(data) {
    $('#infovideo').modal('show');
  }

  getSectionVideo() {
    const req = {
      'SectionID': 10
    };
    this.apiService.postData(TeacherAPIURLs.GetVideoForSection, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.videoPath = res.body.filePath;
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

  // For Image Approval

  checkReceiver() {
    $('.imageapproval').modal('show');
  }

  createImageApprovalForm() {
    this.ImageApprovalForm = this.fb.group({
      approvaltype: ['', Validators.required]
    });
  }

  get f() { return this.ImageApprovalForm.controls; }

  clearForm() {
    this.createImageApprovalForm();
  }

  GetApprovalType() {
    const req = {
      'IsDeleted': false,
      'agencyID': this.commonService.getAgencyId(),
    };
    this.apiService.postData(AgencyAPIURLs.GetImageApprovalType, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.approvalType = res.body.filePath;
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

  saveImageApprovalType() {
    if (this.ImageApprovalForm.valid) {
      const data = {
        'id': 0,
        'ApproveType': this.ImageApprovalForm.value.approvaltype,
        'agencyID': this.commonService.getAgencyId(),
        'createdBy': this.commonService.getLoggedInUserId()
      };

      this.apiService.postData(AgencyAPIURLs.SaveImageApprovalType, data, null).subscribe(res => {
        if (res.body.statusCode === 200) {
          $('.imageapproval').modal('hide');
          this.spinner.hide();
          this.notification.success({ message: 'Image Approval type updated successfully', title: '' });
          this.GetApprovalType();
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
      this.commonService.validateAllFields(this.ImageApprovalForm);
    }

  }

  GetUnApprovedImages() {
    this.loader = true;
    this.spinner.show();
    const data = {
      'agencyID': this.commonService.getAgencyId(),
      'id': 0,
    };
    this.apiService.postData(AgencyAPIURLs.GetUnApproveImages, data, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.totalRecord = res.body.totalRows;
        this.unApprovedImagesList = res.body.data;
        this.spinner.hide();
        this.loader = false;
      } else {
        this.spinner.hide();
        this.notification.warning({ message: 'Something went wrong', title: '' });
      }
    }, err => {
      this.spinner.hide();
      this.notification.warning({ message: 'Something went wrong', title: '' });
    });
  }

  OpenImage(data) {
    this.imagePath = data.imageServerPath;
    $('#unapproveimage').modal('show');
  }


  DeleteImage(value) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this Image?',
      accept: () => {
        this.spinner.show();
        console.log(value);
        const data = {
          'id': value.id,
          'IsDeleted': true,
          'PostActivityImagesID': value.postActivityImagesID,
          'agencyID': value.agencyID,
          'DeletedBy': value.deletedBy
        };
        this.apiService.postData(AgencyAPIURLs.ApproveImages, data, null).subscribe(res => {
          if (res.body.statusCode === 200) {
            this.spinner.hide();
            this.notification.success({ message: 'Image deleted successfully', title: '' });
            this.GetUnApprovedImages();
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
  ApprovalImage(value) {
    this.confirmationService.confirm({
      message: 'Do you want to approve this Image?',
      accept: () => {
        this.spinner.show();
        console.log(value);
        const data = {
          'id': value.id,
          'IsDeleted': false,
          'PostActivityImagesID': value.postActivityImagesID,
          'agencyID': value.agencyID,
          'DeletedBy': value.deletedBy
        };
        this.apiService.postData(AgencyAPIURLs.ApproveImages, data, null).subscribe(res => {
          if (res.body.statusCode === 200) {
            this.spinner.hide();
            this.notification.success({ message: 'Image approved successfully', title: '' });
            this.GetUnApprovedImages();
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



  /**Get All class list */
  getAllClassess() {
    this.spinner.show();
    const data = {
      'agencyID': this.commonService.getAgencyId()
    };
    this.apiService.postData(TeacherAPIURLs.GetAllClasses, data, null).subscribe(res => {
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
      'limit': this.limit,
      'page': this.pageNo
    };
    this.apiService.postData(AgencyAPIURLs.GetAllPostActivitiesForAgencyAdmin, data, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.totalRecord = res.body.totalRows;
        this.postActivityList = res.body.data;
        this.spinner.hide();
        this.loader = false;
      } else {
        this.spinner.hide();
        // this.error.unknownError();
        this.notification.warning({ message: 'Please Select Class', title: '' });
      }

    }, err => {
      this.spinner.hide();
      this.notification.warning({ message: 'Please Select Class', title: '' });
      //this.error.commonError(err);
    });
  }


  deletePost(value) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this Post?',
      accept: () => {
        this.spinner.show();
        console.log(value);
        value.deletedBy = this.commonService.getReleventUserId('userdetails');
        value.deletedDate = new Date();
        value.isDeleted = true;
        if (value.postActivityImages.length !== 0) {
          value.postActivityImages.forEach(element => {
            element.deletedBy = this.commonService.getReleventUserId('userdetails');
            element.deletedDate = new Date();
            element.isDeleted = true;
          });
        } else if (value.postActivityVideos.length !== 0) {
          value.postActivityVideos.forEach(element => {
            element.deletedBy = this.commonService.getReleventUserId('userdetails');
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
    this.count++;
    if (this.count > 2) {
      this.searchByDate = event;
      this.classList = [];
      this.getAllClassess();
    }
  }

  paginate(event) {
    this.pageNo = event.page;
    this.getPostActivityList();
  }


}
