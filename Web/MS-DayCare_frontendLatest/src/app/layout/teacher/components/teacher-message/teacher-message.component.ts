import { Component, OnInit, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';
import { TeacherAPIURLs } from '../../shared/constant';
import { TeacherApiService } from '../../shared/services/teacher-api-service/teacher-api.service';
import { ErrorHandlerService } from '../../../../shared/services/error-handler/error-handler.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from '../../../../shared/services/notification-service/notification.service';
import { CommonService } from '../../../../shared/services/common/common.service';
import { ParentDetailsVM } from '../../../parent/shared/view-model/parent-detailsvm';
import * as signalR from '@aspnet/signalr';
import { ChatViewModel } from '../../shared/view-model/chatVM';
import { environment } from '../../../../../environments/environment';
import { ParentAPIURLs } from '../../../parent/shared/constant';
@Component({
  selector: 'app-teacher-message',
  templateUrl: './teacher-message.component.html',
  styleUrls: ['./teacher-message.component.css']
})
export class TeacherMessageComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollMessageBox') private myScrollContainer: ElementRef;
  parentList: ParentDetailsVM[] = [];
  UserName: string;
  receiverName: string;
  receiverPic: string;
  receiverId: number;
  loggedInUserId: number;
  outMsg = '';
  previousChatList: ChatViewModel[] = [];
  private _hubConnection: signalR.HubConnection;
  nick = '';
  message = '';
  messages: string[] = [];
  token: string;
  senderArray: any[] = [];
  receiverArray: any[] = [];
  agencyId: number;
  msgSenderId: number;
  nameSearch = '';
  constructor(private apiService: TeacherApiService, private error: ErrorHandlerService,
    private spinner: NgxSpinnerService, private notification: NotificationService,
    private commonService: CommonService) { }
  ngOnInit() {
    this.agencyId = this.commonService.getAgencyId();
    this.loggedInUserId = this.commonService.getLoggedInUserId();
    // const url = 'https://localhost:44391/chat';
    //
    this.establishSignalRConnection();

    this._hubConnection.on('messageReceived', (nick: string, receivedMessage: string) => {
      const text = `${nick}: ${receivedMessage}`;
      this.messages.push(text);
      const str = text.substring(text.indexOf(':') + 1);
      const Obj = JSON.parse(str);
      this.msgSenderId = Obj.sender;
      //  this.previousChatList.push({senderUserID: Obj.sender, receiverUserID: Obj.receiver, message: Obj.message});
      if (this.msgSenderId === this.receiverId || this.loggedInUserId === this.msgSenderId) {
        this.previousChatList.push({senderUserID: Obj.sender, receiverUserID: Obj.receiver, message: Obj.message,
          createdDateTime: new Date() });
       }

       if (this.msgSenderId === this.receiverId && this.loggedInUserId === Obj.receiver) {
        this.UnreadMessageByID();
       }

       if (Obj.receiver === this.loggedInUserId && Obj.sender !== this.receiverId) {
        const no = this.parentList.findIndex(r => r.listUserId === Obj.sender);
        this.parentList[no].count = this.parentList[no].count + 1;
      }
     // this.getPreviousChat();
    });

    this._hubConnection.on('messageSent', (nick: string, receivedMessage: string) => {
      const text = `${nick}: ${receivedMessage}`;
      console.log('new Msg', text);
      this.messages.push(text);
      const str = text.substring(text.indexOf(':') + 1);
      const Obj = JSON.parse(str);
      this.msgSenderId = Obj.sender;
      //  this.previousChatList.push({senderUserID: Obj.sender, receiverUserID: Obj.receiver, message: Obj.message});
      if (this.msgSenderId === this.receiverId || this.loggedInUserId === this.msgSenderId) {
        this.previousChatList.push({senderUserID: Obj.sender, receiverUserID: Obj.receiver, message: Obj.message,
          createdDateTime: new Date() });
       }
     // this.getPreviousChat();
    });
    this.UserName = this.commonService.getUserFullName('userdetails');
    this.nick = '2212';
    this.UserName = this.commonService.getUserFullName('userdetails');
    this.getParentList();
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

  getParentList() {
    this.parentList = [];
    this.spinner.show();
    const model = {
      'agencyID': this.commonService.getAgencyId(),
      'roleID': 4,
      'teacherID' : this.commonService.getReleventUserId('userdetails'),
      'userID': this.commonService.getLoggedInUserId()
    };
    this.apiService.postData(TeacherAPIURLs.GetListForChat, model, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        // this.totalRecord = res.body.totalRows;
        if (res.body.data !== null && res.body.data !== [] && res.body.data.length > 0) {
          this.parentList = res.body.data;
          this.parentList[0].isActive = true;
          this.receiverName = this.parentList[0].listUserName;
          this.receiverPic = this.parentList[0].imagePath;
          this.receiverId = this.parentList[0].listUserId;
          this.parentList[0].count = 0;
          this.getPreviousChat();
        }
        this.spinner.hide();
      }
    }, err => {
      this.spinner.hide();
      this.error.commonError(err);
    }
    );
  }

  addActivClassParentList(value) {
    this.message = '';
    const no = this.parentList.findIndex(r => r.listUserId === value.listUserId);
    this.parentList[no].count = 0;
    this.parentList.forEach(x => {
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


  public sendMessage(): void {
    if (this.message !== '') {
      console.log(this._hubConnection);
      if (true || this.receiverId !== undefined && this.receiverId !== null &&
        this.receiverId !== 0) {
        console.log(this._hubConnection);
        this._hubConnection
          .invoke('SendMessage', this.nick, this.message, this.agencyId, this.loggedInUserId, this.receiverId)
          .then(() => this.message = '')
          .catch(err => console.error(err,
            this.establishSignalRConnection())
          );
      }
    }
  }


  getPreviousChat() {
    this.previousChatList = [];
    //   this.spinner.show();
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


  establishSignalRConnection() {
    const url = environment.baseUrl + '' + 'chat';
    this._hubConnection = new signalR.HubConnectionBuilder()
    .withUrl(url)
    .build();
  this._hubConnection
    .start()
    .then(() => {
      console.log('Connection started!');
      this._hubConnection.invoke('getConnectionId', this.loggedInUserId)
        .then((connectionId) => {
          console.log('connectionId', connectionId);
          // Send the connectionId to controller
          this.token = connectionId;
        });
    })
    .catch(err =>
      console.log('Error while establishing connection :(', this.establishSignalRConnection())
    );
  }

  // Unread Messages
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
