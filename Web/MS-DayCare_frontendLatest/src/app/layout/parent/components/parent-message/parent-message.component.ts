import { Component, OnInit, OnDestroy, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';
import { ParentApiService } from '../../shared/services/parent-api-service';
import { ErrorHandlerService } from '../../../../shared/services/error-handler/error-handler.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from '../../../../shared/services/notification-service/notification.service';
import { CommonService } from '../../../../shared/services/common/common.service';
import { FormBuilder } from '@angular/forms';
import { ParentAPIURLs } from '../../shared/constant';
import { TeacherDetailsVM } from '../../../teacher/shared/view-model/teacher-detailsVM';
import * as signalR from '@aspnet/signalr';
import { ChatViewModel } from 'src/app/layout/teacher/shared/view-model/chatVM';
import { environment } from '../../../../../environments/environment';
declare var $: any;
@Component({
  selector: 'app-parent-message',
  templateUrl: './parent-message.component.html',
  styleUrls: ['./parent-message.component.css']
})
export class ParentMessageComponent implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild('scrollMessageBox') private myScrollContainer: ElementRef;
  teacherList: TeacherDetailsVM[] = [];
  token: string;
  UserName: string;
  receiverName: string;
  receiverPic: string;
  receiverId: number;
  senderArray: any[] = [];
  receiverArray: any[] = [];
  msgSenderId: number;
  private _hubConnection: signalR.HubConnection;
  nick = '';
  message = '';
  messages: string[] = [];
  previousChatList: ChatViewModel[] = [];
  agencyId: number;
  loggedInUserID: number;
  nameSearch = '';
  constructor(private apiService: ParentApiService, private error: ErrorHandlerService,
    private spinner: NgxSpinnerService, private notification: NotificationService,
    private commonService: CommonService, private fb: FormBuilder) { }

  ngOnInit() {
    this.agencyId = this.commonService.getAgencyId();
    this.loggedInUserID = this.commonService.getLoggedInUserId();
    this.establishConnection();
    this._hubConnection.on('messageReceived', (nick: string, receivedMessage: string) => {
      const text = `${nick}: ${receivedMessage}`;
      this.messages.push(text);
      const str = text.substring(text.indexOf(':') + 1);
      // const  jsonObj = JSON.stringify(text);
      const Obj = JSON.parse(str);
      // console.log('sdfs', Obj);
      this.msgSenderId = Obj.sender;
      //   console.log('this.selectedId,this.receiverId', this.msgSenderId, this.receiverId);
      //  this.getPreviousChat();
      if (this.msgSenderId === this.receiverId || this.loggedInUserID === this.msgSenderId) {
        this.previousChatList.push({
          senderUserID: Obj.sender, receiverUserID: Obj.receiver, message: Obj.message,
          createdDateTime: new Date()
        });
      }
      if (this.msgSenderId === this.receiverId && this.loggedInUserID === Obj.receiver) {
        this.UnreadMessageByID();
       }
      if (Obj.receiver === this.loggedInUserID && Obj.sender !== this.receiverId) {
        const no = this.teacherList.findIndex(r => r.listUserId === Obj.sender);
        this.teacherList[no].count = this.teacherList[no].count + 1;
      }
    });

    this._hubConnection.on('messageSent', (nick: string, receivedMessage: string) => {
      const text = `${nick}: ${receivedMessage}`;
      this.messages.push(text);
      const str = text.substring(text.indexOf(':') + 1);
      // const  jsonObj = JSON.stringify(text);
      const Obj = JSON.parse(str);
      // console.log('sdfs', Obj);
      this.msgSenderId = Obj.sender;
      //  console.log('this.selectedId,this.receiverId', this.msgSenderId, this.receiverId);
      //  this.getPreviousChat();
      if (this.msgSenderId === this.receiverId || this.loggedInUserID === this.msgSenderId) {
        this.previousChatList.push({
          senderUserID: Obj.sender, receiverUserID: Obj.receiver, message: Obj.message,
          createdDateTime: new Date()
        });
      }
    });

    this.UserName = this.commonService.getUserFullName('userdetails');

    this.nick = '2212';
    // this._hubConnection = new signalR.HubConnection('http://localhost:5000/chat');

    this.getTeacherList();
    this.scrollToBottom();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
}


  public sendMessage(): void {
    if (this.message !== '') {
      //   console.log(this._hubConnection);
      if (true || this.receiverId !== undefined && this.receiverId !== null &&
        this.receiverId !== 0) {
        //   console.log(this._hubConnection);
        this._hubConnection
          .invoke('SendMessage', this.nick, this.message, this.agencyId, this.loggedInUserID, this.receiverId)
          .then(() => this.message = '')
          .catch(err => console.error(err, this.establishConnection()));
      }
    }

  }

  getTeacherList() {
    this.teacherList = [];
    this.spinner.show();
    const model = {
      'agencyID': this.commonService.getAgencyId(),
      'roleID': 3,
      'parentID': this.commonService.getReleventUserId('userdetails'),
      'userID': this.commonService.getLoggedInUserId()
    };
    this.apiService.postData(ParentAPIURLs.GetListForChat, model, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        // this.totalRecord = res.body.totalRows;
        if (res.body.data !== null && res.body.data !== [] && res.body.data.length > 0) {
          this.teacherList = res.body.data;
          this.teacherList[0].isActive = true;
          this.receiverName = this.teacherList[0].listUserName;
          this.receiverPic = this.teacherList[0].imagePath;
          this.receiverId = this.teacherList[0].listUserId;
          this.teacherList[0].count = 0;
          this.getPreviousChat();
          // this.teacherList.push(res.body.data[0]);
        }
      }
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.error.commonError(err);
    }
    );
  }


  addActivClassTeacherList(value) {
    this.message = '';
    const no = this.teacherList.findIndex(r => r.listUserId === value.listUserId);
    this.teacherList[no].count = 0;
    this.teacherList.forEach(x => {
      if (x.listUserId === value.listUserId) {
        x.isActive = true;
        this.receiverName = value.listUserName;
        this.receiverPic = value.imagePath;
        this.receiverId = value.listUserId;
        this.getPreviousChat();
      } else {
        x.isActive = false;
      }
    });
  }


  getPreviousChat() {
    this.previousChatList = [];
    //  this.spinner.show();
    const model = {
      'agencyID': this.commonService.getAgencyId(),
      'senderUserID': this.commonService.getLoggedInUserId(),
      'receiverUserID': this.receiverId
    };
    this.apiService.postData(ParentAPIURLs.GetMessageByID, model, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        // this.totalRecord = res.body.totalRows;
        if (res.body.data !== null && res.body.data !== [] && res.body.data !== []) {
          this.previousChatList = res.body.data;
        }
        this.spinner.hide();
      }
    }, err => {
      this.spinner.hide();
      this.error.commonError(err);
    }
    );
  }



  establishConnection() {
    const url = environment.baseUrl + '' + 'chat';
    this._hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(url)
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
      .catch(err => console.log('Error while establishing connection :(',
        this.establishConnection()));
  }

  ngOnDestroy() {
    //   this._hubConnection.invoke('OnConnectedAsync', this.loggedInUserID).then((res) => {
    //     console.log('remove con', res);
    // });
  }

  UnreadMessageByID() {
    const model = {
      'receiverUserID': this.commonService.getLoggedInUserId(),
      'senderUserID': this.msgSenderId
    };
    this.apiService.postData(ParentAPIURLs.UnreadMessageByID, model, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        // this.totalRecord = res.body.totalRows;
      }
    }, err => {
      this.spinner.hide();
      this.error.commonError(err);
    }
    );
  }
}
