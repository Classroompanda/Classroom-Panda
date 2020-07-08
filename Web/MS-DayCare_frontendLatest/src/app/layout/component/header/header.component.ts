import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../../../shared/services/common/common.service';
import { LayoutApiService } from '../../../shared/services/lauout-api-service';
import { LayoutAPIURLs } from '../../../shared/services/constant';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorHandlerService } from '../../../shared/services/error-handler/error-handler.service';
import { NotificationService } from '../../../shared/services/notification-service/notification.service';
import { ConfirmationService } from 'primeng/api';
import { TeacherAPIURLs } from '../../teacher/shared/constant';
import * as signalR from '@aspnet/signalr';
import { environment } from 'src/environments/environment';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ParentAPIURLs } from 'src/app/layout/parent/shared/constant';
// import { document } from 'ngx-bootstrap/utils/facade/browser';
declare var $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  notificationForm: FormGroup;
  userName: any;
  userType: any;
  profileImage: any;
  reqData: any = [];
  breakReason = '';
  notificationSound: any;
  teacherBreakStatus = 0;
  teacherBreakSaveId = 0;
  userRelaventId = 0;
  notificationType = '';
  sound = true;
  kiosklogn: any;
  private _hubConnection: signalR.HubConnection;
  constructor(private router: Router, private commonService: CommonService, private layoutService: LayoutApiService,
    private spinner: NgxSpinnerService, private error: ErrorHandlerService, private notification: NotificationService,
    private confirmationService: ConfirmationService, private fb: FormBuilder, private route: ActivatedRoute) {
  }
  toggleSidebar() {
    document.getElementsByTagName('body')[0].classList.toggle('collapsedSidebar');
    document.getElementById('sidebarLinksParent').classList.toggle('collapse');
  }
  ngOnInit() {
    this.createNotificationForm();
    this.GetNotificationSetting();
    this.signalRConnectionToGetMsgNotifivation();
    this.userRelaventId = this.commonService.getReleventUserId('userdetails');
    this.userType = this.commonService.getUserRole('userdetails');
    if (this.userType === 3) { // 3 for teacher
      this.getTeacherCurrentBreakStatus();
    }
    if (this.commonService.getIsKioskLogin() === 'true') {
      this.kiosklogn = true;
    } else {
      this.kiosklogn = false;
    }
    if (this.commonService.getUserRole('userdetails') === 3 && localStorage.getItem('isteacherclockedin') === '0') {
      $('#exampleModal').modal('show');
    }

    this.commonService.getUserFullNameFromProfile().subscribe(name => {
      this.userName = name;
      // console.log('nm', this.userName);
    });
    this.profileImage = localStorage.getItem('imagepath');

    this.commonService.getUserProfileImage().subscribe(image => {
      this.profileImage = image;
    });
    this.userName = this.commonService.getUserFullName('userdetails');
  }

  getTeacherCurrentBreakStatus() {
    const reqdata = {
      'agencyID': this.commonService.getAgencyId(),
      'askingDate': new Date(),
      'teacherID': this.commonService.getReleventUserId('userdetails'),
      'teacherDailyAttendenceID': this.commonService.getTeacherTodayAttendenceId(),
    };
    this.layoutService.postData(TeacherAPIURLs.GetTeacherCurrentBreakStatus, reqdata, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        if (res.body.data) {
          this.teacherBreakStatus = res.body.data.breakStatusID;
          this.teacherBreakSaveId = res.body.data.id;
          if (this.teacherBreakStatus === 1) {
            $('#breakin').modal('show'); // show brek in modal if teacher is on break
          }
        }
      } else {
        //  this.error.unknownError();
      }
    }, err => {
      this.spinner.hide();
      // this.error.commonError(err);
    });
  }

  logOut() {
    this.deleteDeviceToken();
    localStorage.removeItem('isauthenticated');
    localStorage.removeItem('usertype');
    localStorage.removeItem('path');
    localStorage.removeItem('userdetails');
    localStorage.removeItem('imagepath');
    this.router.navigate(['/']);
  }

  kiosklogOut() {
    this.deleteDeviceToken();
    localStorage.removeItem('isauthenticated');
    localStorage.removeItem('usertype');
    localStorage.removeItem('path');
    localStorage.removeItem('userdetails');
    localStorage.removeItem('imagepath');
    localStorage.removeItem('iskiosklogin');
    this.router.navigate(['/kiosklogin']);
  }
  ngAfterViewInit() {
    $.getScript('../../../../assets/js/custom.js', function () { });
    // $(window).on('load', function () {
    //   if (screen.width < 990) {
    //     $('.an-nav-item > a').click(function () {

    //       if ($(this).parent().find('ul').length > 0) {
    //       } else {
    //         alert('else called');
    //         $("#toggleButtons").click();
    //       }
    //     });
    //     $('#overlay-section, .an-nav-item > ul > li > a').click(function () {
    //       alert('this is called');
    //       $('.js-toggle-sidebar').click();
    //     });
    //   }
    // });


  }


  teacherClockOut(status) {
    this.confirmationService.confirm({
      message: 'Do you really want to clock out for today?',
      accept: () => {

        this.teacherClockIn(status);
      }
    });
  }


  /**Get All class list */
  teacherClockIn(status) {
    this.spinner.show();
    if (status === 1) {
      this.reqData = {
        'id': 0,
        'agencyID': this.commonService.getAgencyId(),
        'teacherID': this.commonService.getReleventUserId('userdetails'),
        'attendenceStatusID': status, // 1 for clock in and 2 for clock out
        'classesID': 0,
        'clockIn': status === 1 ? new Date() : '',
        'attendanceDate': new Date(),
      };
    } else {
      this.reqData = {
        'id': localStorage.getItem('teacherTodayAttendenceId'),
        'agencyID': this.commonService.getAgencyId(),
        'teacherID': this.commonService.getReleventUserId('userdetails'),
        'attendenceStatusID': status, // 1 for clock in and 2 for clock out
        'classesID': 0,
        'clockOut': status === 2 ? new Date() : '',
        'attendanceDate': new Date(),
      };

    }
    this.spinner.hide();
    this.layoutService.postData(LayoutAPIURLs.TeacherClockInClockOut, this.reqData, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        if (status === 1) {
          this.notification.success({ message: 'Clocked in successfully', title: '' });
          localStorage.setItem('isteacherclockedin', 'true');
          localStorage.setItem('teacherTodayAttendenceId', res.body.saveId);
        } else {
          this.notification.success({ message: 'Clocked out successfully', title: '' });
          localStorage.removeItem('teacherTodayAttendenceId');
          localStorage.removeItem('isTeacherclockedout');
          localStorage.removeItem('isteacherclockedin');
          this.logOut();
        }
        $('#exampleModal').modal('hide');
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


  verifyBreakOut() {
    this.breakReason = this.breakReason.trim();
    if (this.breakReason !== '' && this.breakReason != null) {
      if (this.breakReason === '') {
        this.notification.warning({ message: 'Please add reason', title: '' });
      } else {
        this.spinner.show();
        const data = {
          'id': 0,
          'agencyID': this.commonService.getAgencyId(),
          'breakOut': new Date(),
          'teacherDailyAttendenceID': localStorage.getItem('teacherTodayAttendenceId'),
          'breakTypesID': 0,
          'breakStatusID': 1,
          'breakReason': this.breakReason
        };
        const msg = 'Break out successfully!';
        this.breakInBreakOut(data, msg, 1);
      }
    } else {
      this.notification.warning({ message: 'Please add reason', title: '' });
    }

  }

  verifyBreakIn() {
    this.spinner.show();
    const data = {
      'id': this.teacherBreakSaveId,
      'agencyID': this.commonService.getAgencyId(),
      'breakIn': new Date(),
      'teacherDailyAttendenceID': localStorage.getItem('teacherTodayAttendenceId'),
      'breakTypesID': 0,
      'breakStatusID': 2,
    };
    const msg = 'Break in successfully!';
    this.breakInBreakOut(data, msg, 2);
  }

  breakInBreakOut(reqdata, msg, type) {
    this.layoutService.postData(TeacherAPIURLs.TeacherBreakInBreakOut, reqdata, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.teacherBreakSaveId = res.body.saveId;
        this.teacherBreakStatus = res.body.data;
        if (type === 1) {
          this.notification.success({ message: msg, title: '' });
          $('#breakout').modal('hide');
          $('#breakin').modal('show');
        } else {
          this.notification.success({ message: msg, title: '' });
          $('#breakin').modal('hide');
        }
        const myBreak = {
          'break': true
        };
        this.commonService.saveTeacherBreakLogAPI(myBreak);
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

  clearBreakReason() {
    this.breakReason = '';
  }

  // For Notification

  clearNotificationForm() {
    this.createNotificationForm();
  }
  createNotificationForm() {
    this.notificationForm = this.fb.group({
      sound: ['', Validators.required]
    });
  }

  get t() { return this.notificationForm.controls; }

  GetNotificationSetting() {
    const req = {
      'IsDeleted': false,
      'UserID': this.commonService.getLoggedInUserId(),
    };
    this.layoutService.postData(ParentAPIURLs.GetNotificationSetting, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.notificationType = res.body.notificationSetting;
        if (this.notificationType === 'On') {
          this.sound = true;
        } else {
          this.sound = false;
        }
        console.log(this.sound, 'tettttttttttttttttttttttt');
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
    if (this.notificationForm.valid) {
      const data = {
        'id': 0,
        'UserID': this.commonService.getLoggedInUserId(),
        'OnOff': this.notificationForm.value.sound,
      };

      this.layoutService.postData(ParentAPIURLs.SaveNotificationSetting, data, null).subscribe(res => {
        if (res.body.statusCode === 200) {
          $('.notificationsound').modal('hide');
          this.spinner.hide();
          this.notification.success({ message: 'Notification setting updated successfully', title: '' });
          this.GetNotificationSetting();
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
      this.commonService.validateAllFields(this.notificationForm);
    }

  }


  /**To delete device token for fcm */
  deleteDeviceToken() {
    const reqdata = {
      'BusinessToken': localStorage.getItem('fcmtkn')
    };
    this.layoutService.postData(LayoutAPIURLs.DeleteToken, reqdata, null).subscribe(res => {
      if (res.body.statusCode === 200) {
      } else {
        //  this.error.unknownError();
      }
    }, err => {
      this.spinner.hide();
    });
  }

  // this method is use to show notification for chat messages
  signalRConnectionToGetMsgNotifivation() {
    let msgSenderId = 0;
    const loggedInUserID = this.commonService.getLoggedInUserId();
    const url = environment.baseUrl + '' + 'chat';
    this._hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(url)
      .build();
    this._hubConnection
      .start()
      .then(() => {
        console.log('Connection started!');
        this._hubConnection.invoke('getConnectionId', loggedInUserID)
          .then((connectionId) => {
            // Send the connectionId to controller
            // this.token = connectionId;
          });
      })
      .catch(err => console.log('Error while establishing connection :(',
        this.signalRConnectionToGetMsgNotifivation()));
    this._hubConnection.on('messageReceived', (nick: string, receivedMessage: string) => {
      const text = `${nick}: ${receivedMessage}`;
      const str = text.substring(text.indexOf(':') + 1);
      const Obj = JSON.parse(str);
      msgSenderId = Obj.sender;
      if (this.kiosklogn !== true) {
      this.notification.info({ message: Obj.message.substr(0, 25), title: 'Message from' + ' ' + Obj.senderName });
      if (this.sound === true) {
        this.playAudio();
      }}
    });
  }


  // Play Notification
  playAudio() {
    const audio = new Audio();
    audio.src = 'assets/audio/juntos.mp3';
    audio.load();
    audio.play();
  }



}

