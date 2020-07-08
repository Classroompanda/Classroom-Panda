import { Component, OnInit, Renderer } from '@angular/core';
import { UserVM } from '../shared/view-model/userVM';
import { ChatViewModel } from 'src/app/layout/teacher/shared/view-model/chatVM';
import { AgencyApiService } from '../shared/services/agency-api-service/agency-api.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler/error-handler.service';
import { NotificationService } from 'src/app/shared/services/notification-service/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from 'src/app/shared/services/common/common.service';
import * as signalR from '@aspnet/signalr';
import { AgencyAPIURLs } from '../shared/constatant';
import { environment } from 'src/environments/environment';
import { TeacherAPIURLs } from '../../../teacher/shared/constant';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminStripKey } from 'src/app/shared/constdata';
import { AdminAPIURLs } from 'src/app/layout/admin/shared/constant';
declare var $: any;
@Component({
  selector: 'app-agency-admin-msg-brodcast',
  templateUrl: './agency-admin-msg-brodcast.component.html',
  styleUrls: ['./agency-admin-msg-brodcast.component.css']
})
export class AgencyAdminMsgBrodcastComponent implements OnInit {
  userList: UserVM[] = [];
  token: string;
  UserName: string;
  receiverName: string;
  receiverPic: string;
  receiverId: number;
  senderArray: any[] = [];
  receiverArray: any[] = [];
  emailArray: any[] = [];
  phoneArray: any[] = [];
  msgSenderId: number;
  private _hubConnection: signalR.HubConnection;
  nick = '';
  message = '';
  subject = '';
  emailmessage = '';
  txtmessage = '';
  messages: string[] = [];
  previousChatList: ChatViewModel[] = [];
  agencyId: number;
  loggedInUserID: number;
  nameSearch = '';
  loader = true;
  markAllStudents = false;
  url: string;
  userType = 0;
  totalRows: number;
  totalPages: number;
  classList: any[] = [];
  totalRecord = 0;
  serchByClass = 0;
  agencyName: any;
  remainingMessage = 0;
  buyTextForm: FormGroup;
  globalListener: any;
  txtPlanList: any[];
  constructor(private apiService: AgencyApiService, private error: ErrorHandlerService, private fb: FormBuilder, private renderer: Renderer,
    private spinner: NgxSpinnerService, private notification: NotificationService,
    private commonService: CommonService) {
    this.url = environment.baseUrl + '' + 'chat';
  }

  ngOnInit() {
    this.txtPlanList = [];
    console.log(this.agencyName);
    this.agencyId = this.commonService.getAgencyId();
    this.loggedInUserID = this.commonService.getLoggedInUserId();
    this.createBuyTextForm();
    this.getUserList();
    this.signalRWebConnection();
    this.trySignalRConnection();
    this.getRemainingMessageCount();
    this.getAllClassess();
    this.getPlan();
  }

  createBuyTextForm() {
    this.buyTextForm = this.fb.group({
      txtplan: ['', Validators.required]
    });
  }

  get f() { return this.buyTextForm.controls; }

  getAllClassess() {
    this.spinner.show();
    const data = {
      'agencyID': this.commonService.getAgencyId()
    };
    this.apiService.postData(TeacherAPIURLs.GetAllClasses, data, null).subscribe(res => {
      this.spinner.hide();
      if (res.body.statusCode === 200) {
        this.totalRecord = res.body.totalRows;
        this.classList = res.body.data;
      } else {
        this.spinner.hide();
        this.error.unknownError();
      }

    }, err => {
      this.spinner.hide();
      this.error.commonError(err);
    });
  }



  signalRWebConnection() {
    this._hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(this.url)
      .build();
    this._hubConnection
      .start()
      .then(() => {
        console.log('Connection started!');
        this._hubConnection.invoke('getConnectionId', this.loggedInUserID)
          .then((connectionId) => {
            // Send the connectionId to controller
            this.token = connectionId;
          });
      })
      .catch(err => console.log('Error while establishing connection :('));
  }


  trySignalRConnection() {
    this._hubConnection.on('messageReceived', (nick: string, receivedMessage: string) => {
      const text = `${nick}: ${receivedMessage}`;
      this.messages.push(text);
      const str = text.substring(text.indexOf(':') + 1);
      const Obj = JSON.parse(str);
      this.msgSenderId = Obj.sender;
      console.log('signal', Obj);
      console.log('this.selectedId,this.receiverId', this.msgSenderId, this.receiverId);
    });

    this._hubConnection.on('messageSent', (nick: string, receivedMessage: string) => {
      const text = `${nick}: ${receivedMessage}`;
      this.messages.push(text);
      const str = text.substring(text.indexOf(':') + 1);
      const Obj = JSON.parse(str);
      this.msgSenderId = Obj.sender;
      console.log('signal', Obj);
      console.log('this.selectedId,this.receiverId', this.msgSenderId, this.receiverId);
    });
  }


  getUserList() {
    this.loader = true;
    this.receiverArray = [];
    this.emailArray = [];
    this.phoneArray = [];
    this.markAllStudents = false;
    this.userList = [];
    this.spinner.show();
    const model = {
      'agencyID': this.commonService.getAgencyId(),
      'roleID': 2,
      'FilteredUser': this.userType,
      'SerachByName': this.nameSearch,
      'ClassID': this.serchByClass
    };
    this.apiService.postData(AgencyAPIURLs.GetListForChat, model, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.loader = false;
        if (res.body.data !== null && res.body.data !== [] && res.body.data.length > 0) {
          this.userList = res.body.data;
          this.userList.forEach(r => {
            r.isMarked = false;
          });
          this.userList[0].isActive = true;
          this.receiverName = this.userList[0].listUserName;
          this.receiverPic = this.userList[0].imagePath;
          this.receiverId = this.userList[0].listUserId;
        }
      }
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.error.commonError(err);
    }
    );
  }



  /**Get student id using checkbox */
  getSingleMarkedStudent(value, event) {
    this.markAllStudents = false;
    if (event.target.checked === true) {
      if (this.receiverArray.length === 0) {
        this.receiverArray.push(value.listUserId);
        this.emailArray.push(value.emailID);
        this.phoneArray.push(value.phoneNumber);
        const no = this.userList.findIndex(r => r.listUserId === value.listUserId);
        if (no !== -1) {
          this.userList[no].isMarked = true;
        }
      } else {
        const index = this.receiverArray.findIndex(r => r.listUserId === value.listUserId);
        if (index === -1) {
          this.receiverArray.push(value.listUserId);
          this.emailArray.push(value.emailID);
          this.phoneArray.push(value.phoneNumber);
          const no = this.userList.findIndex(r => r.listUserId === value.listUserId);
          if (no !== -1) {
            this.userList[no].isMarked = true;
          }
        }
      }
    } else if (event.target.checked === false) {
      if (this.receiverArray.length > 0) {
        const index = this.receiverArray.indexOf(value.listUserId);
        this.receiverArray.splice(index, 1);
        this.emailArray.splice(index, 1);
        this.phoneArray.splice(index, 1);
        const no = this.userList.findIndex(r => r.listUserId === value.listUserId);
        if (no !== -1) {
          this.userList[no].isMarked = false;
        }
      }
    }
  }


  getAllMarkedStudent(event) {
    if (event.target.checked === true) {
      this.receiverArray = [];
      this.emailArray = [];
      this.phoneArray = [];
      this.userList.forEach(data => {
        this.receiverArray.push(data.listUserId);
        this.emailArray.push(data.emailID);
        this.phoneArray.push(data.phoneNumber);
        data.isMarked = true;
      });
      this.markAllStudents = true;
    } else {
      this.receiverArray = [];
      this.emailArray = [];
      this.phoneArray = [];
      this.userList.forEach(element => {
        element.isMarked = false;
      });
      this.markAllStudents = false;
    }
  }


  public sendMessage(): void {
    if (this.message !== '') {
      console.log(this._hubConnection);
      if (this.receiverArray.length > 0) {
        console.log(this._hubConnection);
        this._hubConnection
          .invoke('SendMessageMultiple', this.nick, this.message, this.agencyId, this.loggedInUserID, this.receiverArray)
          .then(() => this.message = '')
          .catch(err => console.error('send err', err));
        this.receiverArray = [];
        this.userList.forEach(element => {
          element.isMarked = false;
        });
        this.markAllStudents = false;
        $('.mybrodmsg').modal('hide');
      }
    }
  }

  checkReceiver() {
    if (this.receiverArray.length > 0) {
      this.message = '';
      $('.mybrodmsg').modal('show');
    } else {
      this.notification.warning({ message: 'Please select User', title: '' });
    }
  }

  clearMessageForm() {
    this.message = '';
  }

  // Send Multiple Email

  clearEmailForm() {
    this.subject = '';
    this.emailmessage = '';
  }

  checkEmailReceiver() {
    if (this.receiverArray.length > 0) {
      this.emailmessage = '';
      this.subject = '';
      $('.mybrodemail').modal('show');
    } else {
      this.notification.warning({ message: 'Please select User', title: '' });
    }
  }

  sendEmail() {
    if (this.emailmessage === '' && this.subject === '') {
      this.notification.warning({ message: 'Please enter message and subject', title: '' });
    } else {
      if (this.emailArray.length > 0) {
        this.loader = true;
        this.spinner.show();
        const model = {
          'agencyID': this.commonService.getAgencyId(),
          'senderID': this.loggedInUserID,
          'message': this.emailmessage,
          'subject': this.subject,
          'emailArray': this.emailArray
        };
        this.apiService.postData(AgencyAPIURLs.SendEmail, model, null).subscribe(res => {
          if (res.body.statusCode === 200) {
            this.loader = false;
            this.receiverArray = [];
            this.emailArray = [];
            this.phoneArray = [];
            this.userList.forEach(element => {
              element.isMarked = false;
            });
            this.markAllStudents = false;
            $('.mybrodemail').modal('hide');
          }
          this.spinner.hide();
        }, err => {
          this.spinner.hide();
          this.error.commonError(err);
        }
        );
      }
      this.signalRWebConnection();
      this.trySignalRConnection();
    }
  }

  // For text Message

  getPlan() {
    const req = {
      'isActive': true,
      'agencyID': this.commonService.getAgencyId()
    };
    this.apiService.postData(AdminAPIURLs.GetTextMessagePlan, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.txtPlanList = res.body.data;
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

  clearTextForm() {
    this.txtmessage = '';
  }

  checkTextReceiver() {
    if (this.receiverArray.length > 0) {
      this.txtmessage = '';
      $('.mybrodtxtmsg').modal('show');
    } else {
      this.notification.warning({ message: 'Please select User', title: '' });
    }
  }

  sendTextMessage() {
    if (this.emailmessage !== '') {
      this.notification.warning({ message: 'Please enter message', title: '' });
    } else {
      if (this.phoneArray.length > 0) {
        this.loader = true;
        this.spinner.show();
        const model = {
          'agencyID': this.commonService.getAgencyId(),
          'senderID': this.loggedInUserID,
          'message': this.txtmessage,
          'phoneArray': this.phoneArray,
        };
        this.apiService.postData(AgencyAPIURLs.SendTextMessage, model, null).subscribe(res => {
          if (res.body.statusCode === 200) {
            this.loader = false;
            this.receiverArray = [];
            this.emailArray = [];
            this.phoneArray = [];
            this.userList.forEach(element => {
              element.isMarked = false;
            });
            this.markAllStudents = false;
            $('.mybrodtxtmsg').modal('hide');
            this.notification.success({ message: 'Message Send successfully', title: 'Success' });
            this.getRemainingMessageCount();
            this.spinner.hide();
          } else if (res.body.statusCode === 206) {
            this.notification.warning({ message: 'Your Remaining Messages Is Low', title: '' });
            this.spinner.hide();
          } else if (res.body.statusCode === 207) {
            this.notification.warning({ message: 'Your Messages is long, Please write short message', title: '' });
            this.spinner.hide();
          } else if (res.body.statusCode === 986) {
            this.notification.warning({ message: 'Message Not send', title: '' });
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
    }
  }

  getRemainingMessageCount() {
    this.spinner.show();
    const data = {
      'agencyID': this.commonService.getAgencyId(),
      'askedDateString': this.commonService.getStringLocalDateTimeFromUTC(new Date)
    };
    this.apiService.postData(AgencyAPIURLs.GetRemainingTextMessages, data, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.remainingMessage = res.body.count;
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

  buyMessage() {
    this.createBuyTextForm();
    $('.buymessages').modal('show');
  }

  openCheckout() {
    if (this.buyTextForm.valid) {
      const amounttopay = this.buyTextForm.value.txtplan;
      const handler = (<any>window).StripeCheckout.configure({
        key: AdminStripKey.publishableKey,
        locale: 'auto',
        token: token => {
          this.spinner.show();
          console.log(token);
          const model = {
            'agencyID': this.commonService.getAgencyId(),
            'tokenID': token.id,
            'CreatedBy': this.commonService.getReleventUserId('userdetails'),
            'Amount': this.buyTextForm.value.txtplan
          };
          console.log(model);
          this.apiService.postData(AgencyAPIURLs.BuyTextMessagePlan, model, null).subscribe(result => {
            if (result.body.statusCode === 200) {
              this.spinner.hide();
              this.notification.success({ message: 'Payment Successfull!', title: '' });
              $('.buymessages').modal('hide');
              this.getRemainingMessageCount();
            } else if (result.body.statusCode === 986) {
              this.notification.warning({ message: 'Missing Parameter', title: '' });
              this.spinner.hide();
            } else {
              this.spinner.hide();
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
        amount: amounttopay * 100,
        email: this.commonService.getAgencyemailid(),
      });
      this.globalListener = this.renderer.listenGlobal('window', 'popstate', () => {
        handler.close();
      });
    } else {
      this.spinner.hide();
      this.commonService.validateAllFields(this.buyTextForm);
    }
  }




}
