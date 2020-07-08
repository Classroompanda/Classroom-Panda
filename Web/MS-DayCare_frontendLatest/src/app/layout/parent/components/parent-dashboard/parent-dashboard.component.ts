import { Component, OnInit, Renderer } from '@angular/core';
import { ParentApiService } from '../../shared/services/parent-api-service';
import { ErrorHandlerService } from '../../../../shared/services/error-handler/error-handler.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from '../../../../shared/services/notification-service/notification.service';
import { CommonService } from '../../../../shared/services/common/common.service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ParentAPIURLs } from '../../shared/constant';
import { ChildListVM, PostDetailsVM } from '../../shared/view-model/parent-detailsvm';

import { ConfirmationService } from 'primeng/api';
import { AgencyAPIURLs } from '../../../agency-admin/components/shared/constatant';
declare var StripeCheckout: any;
@Component({
  selector: 'app-parent-dashboard',
  templateUrl: './parent-dashboard.component.html',
  styleUrls: ['./parent-dashboard.component.css']
})
export class ParentDashboardComponent implements OnInit {
  childList: ChildListVM[] = [];
  postAtivityList: PostDetailsVM[] = [];
  serchByChild = 0;
  flag = true;
  shoChildFilter = false;
  comment: string;
  childListWithPayment: any[] = [];
  price = 10;
  globalListener: any;
  stripDetails: any;
  loader = true;
  pageNo = 0;
  limit = 10;
  totalRecord = 0;
  parentType: string;
  constructor(private apiService: ParentApiService, private error: ErrorHandlerService,
    private spinner: NgxSpinnerService, private notification: NotificationService,
    private commonService: CommonService, private fb: FormBuilder, private route: ActivatedRoute,
    private confirmationService: ConfirmationService, private renderer: Renderer) { }

  ngOnInit() {
    this.parentType = this.commonService.getParentType();
    this.getPaymentDetails();
    this.getAllPublicAtivityList();
    this.getAllChildrenListForPayment();
  }




  getPaymentDetails() {
    // this.spinner.show();
    const model = {
      'agencyID': this.commonService.getAgencyId()
    };
    this.apiService.postData(AgencyAPIURLs.GetStripeDetailsForAgency, model, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        if (res.body.data.length !== 0 && res.body.data !== [] && res.body.data) {
          this.stripDetails = res.body.data[0];
        }
        //  this.spinner.hide();
      } else {
        //  this.spinner.hide();
        // this.error.unknownError();
      }
    }, err => {
      //  this.spinner.hide();
      this.error.commonError(err);
    }
    );
  }

  getAllChildrenList() {
    //  this.spinner.show();
    this.postAtivityList = [];
    this.shoChildFilter = true;
    this.childList = [];
    const req = {
      'AgencyID': this.commonService.getAgencyId(),
      'classID': 0,
      'studentID': 0,
      'parentID': this.commonService.getReleventUserId('userdetails'),
      'studentName': '',
    };
    this.apiService.postData(ParentAPIURLs.GetAllStudentsOfParent, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        if (res.body.data.length > 0 && res.body.data !== []) {
          this.childList = res.body.data;
          this.childList[0].isActive = true;
          this.serchByChild = this.childList[0].studentId;
          this.getAllPostAtivityList();
        } else {
          this.spinner.hide();
        }
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


  addActivClassStudentList(value) {
    // this.childName  =  value.studentName;
    // this.studentId = value.studentId;
    this.childList.forEach(x => {
      if (x.studentId === value.studentId) {
        x.isActive = true;
      } else {
        x.isActive = false;
      }
    });
    this.getAllPostAtivityList();
  }

  // For private post activities
  getAllPostAtivityList() {
    if (this.serchByChild) {
      this.loader = true;
      this.spinner.show();
      this.postAtivityList = [];
      const req = {
        'AgencyID': this.commonService.getAgencyId(),
        'studentID': this.serchByChild,
        'isPublic': false,
        'limit': this.limit,
        'page': this.pageNo,
      };
      this.apiService.postData(ParentAPIURLs.GetAllPostActivitiesByChildID, req, null).subscribe(res => {
        if (res.body.statusCode === 200) {
          this.totalRecord = res.body.totalRows;
          if (res.body.data.length > 0 && res.body.data !== []) {
            this.postAtivityList = res.body.data;
            this.postAtivityList.forEach(resp => {
              resp.postedDate = this.commonService.getLocalDateTimeFromUTC(resp.postedDate);
              resp.isTodaysPost = this.isPostFromCurrentDate(resp.postedDate);
              console.log('is', resp.isTodaysPost);
            });
            this.postAtivityList = res.body.data;
            this.loader = false;
            this.spinner.hide();
          }
          this.spinner.hide();
          this.loader = false;
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

  }


  // For all public post
  getAllPublicAtivityList() {
    this.loader = true;
    this.shoChildFilter = false;
    this.spinner.show();
    this.postAtivityList = [];
    const req = {
      'AgencyID': this.commonService.getAgencyId(),
      'studentID': 0,
      'isPublic': true,
      'userID': this.commonService.getReleventUserId('userdetails'),
      'limit': this.limit,
      'page': this.pageNo,
      'createdBy' : this.commonService.getLoggedInUserId()
    };
    this.apiService.postData(ParentAPIURLs.GetAllPostActivitiesByChildID, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        if (res.body.data.length > 0 && res.body.data !== []) {
          this.totalRecord = res.body.totalRows;
          this.postAtivityList = res.body.data;
          this.postAtivityList.forEach(resp => {
            resp.postedDate = this.commonService.getLocalDateTimeFromUTC(resp.postedDate);
            resp.isTodaysPost = this.isPostFromCurrentDate(resp.postedDate);
          });
          this.loader = false;
          this.spinner.hide();
        }
        this.loader = false;
        this.spinner.hide();
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


  // Method to identify that post is from current date or not
  isPostFromCurrentDate(date) {
    const today = this.commonService.getOnlyDate(new Date());
    const postdate = this.commonService.getOnlyDate(this.commonService.getLocalDateTimeFromUTC(date));
    if (postdate.toDateString() === today.toDateString()) {
      return true;
    } else {
      return false;
    }
  }

  getChildDetails(value) {
    if (value !== null || value !== undefined) {
      setTimeout(() => {
        this.spinner.hide();
      }, 500);

    }
  }

  checkPublicorPrivate(value) {
    if (value === 0) {
      this.flag = true;
    } else {
      this.flag = false;
      this.getAllPostAtivityList();
    }
  }


  getAllChildrenListForPayment() {
    this.shoChildFilter = false;
    this.childList = [];
    const req = {
      'AgencyID': this.commonService.getAgencyId(),
      'classID': 0,
      'studentID': 0,
      'parentID': this.commonService.getReleventUserId('userdetails'),
      'studentName': '',
    };
    this.apiService.postData(ParentAPIURLs.GetAllStudentsOfParent, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        if (res.body.data.length > 0 && res.body.data !== []) {
          this.childListWithPayment = res.body.data;
        }
      } else {
        this.error.unknownError();
      }
    }, err => {
      this.error.commonError(err);
    }
    );
  }

  saveParentDashboardImagedLikeInformation(value, flag, post) {
    const req = {
      'postActivitiesID': value.postActivitiesID,
      'postActivityImagesID': value.id,
      'agencyID': this.commonService.getAgencyId(),
      'studentID': value.studentID,
      'likeCount': flag === 1 ? 1 : 0,
      'comment': post.postComment,
      'isActive': true,
      'createdBy': this.commonService.getLoggedInUserId()
    };

    this.apiService.postData(ParentAPIURLs.SaveParentDashboardImagedLikeInformation, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.postAtivityList.forEach(x => {
          if (x.id === value.postActivitiesID && flag === 1) {
            if (x.isPostALreadyLiked === true) {
              x.totalLikes = x.totalLikes - 1;
              x.isPostALreadyLiked = false;
            } else {
              x.totalLikes = x.totalLikes + 1;
              x.isPostALreadyLiked = true;
            }
            // x.totalLikes = x.totalLikes + 1;
            // x.isPostALreadyLiked = true;
          }
          if (x.id === value.postActivitiesID && flag === 2) {
            x.postComment = x.postComment;
            x.isAlreadyPostComment = true;
          }
        });
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



  saveParentDashboardVideoLikeInformation(value, flag, post) {
    const req = {
      'postActivitiesID': value.postActivitiesID,
      'postActivityVideosID': value.id,
      'agencyID': this.commonService.getAgencyId(),
      'studentID': value.studentID,
      'likeCount': flag === 1 ? 1 : 0,
      'comment': post.postComment,
      'isActive': true,
      'createdBy': this.commonService.getLoggedInUserId()
    };

    this.apiService.postData(ParentAPIURLs.SaveParentDashboardVideoLikeInformation, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.postAtivityList.forEach(x => {
          if (x.id === value.postActivitiesID && flag === 1) {
            if (x.isPostALreadyLiked === false) {
              x.totalLikes = x.totalLikes + 1;
            x.isPostALreadyLiked = true;
            } else {
              x.totalLikes = x.totalLikes - 1;
              x.isPostALreadyLiked = false;
            }
            // x.totalLikes = x.totalLikes + 1;
            // x.isPostALreadyLiked = true;
          }
          if (x.id === value.postActivitiesID && flag === 2) {
            x.postComment = x.postComment;
            x.isAlreadyPostComment = true;
          }
        });
      } else {
        this.spinner.hide();
        this.error.unknownError();
        // if (res.body.data  && res.body.data !== []) {
        // }
        // } else {
        // this.spinner.hide();
        // this.error.unknownError();
      }
    }, err => {
      this.spinner.hide();
      this.error.commonError(err);
    }
    );
  }

  onTabChange() {
    this.spinner.show();
  }


  openCheckout(amount, value) {
    const amounttopay = amount;
    const handler = (<any>window).StripeCheckout.configure({
      key: this.stripDetails.stripePublishableKey,
      locale: 'auto',
      token: token => {
        this.spinner.show();
        console.log(token);
        const model = {
          // client_ip: token.client_ip,
          'tokenID': token.id,
          'agencyID': this.commonService.getAgencyId(),
          'parentID': this.commonService.getReleventUserId('userdetails'),
          'studentID': value.studentId,
          'totalFees': amounttopay,
          'feesPaid': amounttopay,
          'Email': token.email,
          'SourceToken': token.id,
          'CreatedBy': this.commonService.getLoggedInUserId()
        };
        console.log(model);
        this.apiService.postData(ParentAPIURLs.PaymentDetails, model, null).subscribe(result => {
          if (result.body.statusCode === 200) {
            this.spinner.hide();
            this.getAllChildrenListForPayment();
            this.notification.success({ message: 'Payment Successfull!', title: '' });
            console.log('data', result.body.data);
          } else {
            this.error.unknownError();
            console.log('err');
          }
        }, err => {
          this.error.commonError(err);
          this.spinner.hide();
        }
        );
      }
    });
    handler.open({
      name: 'Classroom Panda',
      description: 'Child Day Care',
      amount: amount * 100
    });
    this.globalListener = this.renderer.listenGlobal('window', 'popstate', () => {
      handler.close();
    });
  }


  paginate(event) {
    this.pageNo = event.page;
    // this.limit = event.page;
    this.getAllPublicAtivityList();
  }
}
