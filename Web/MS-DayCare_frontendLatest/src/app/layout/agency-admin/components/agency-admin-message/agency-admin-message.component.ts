import { Component, OnInit, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';
import { AgencyApiService } from '../shared/services/agency-api-service/agency-api.service';
import { ErrorHandlerService } from '../../../../shared/services/error-handler/error-handler.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from '../../../../shared/services/notification-service/notification.service';
import { CommonService } from '../../../../shared/services/common/common.service';
import { FormBuilder } from '@angular/forms';
import { UserVM } from '../shared/view-model/userVM';
import { ChatViewModel } from '../../../teacher/shared/view-model/chatVM';
import * as signalR from '@aspnet/signalr';
import { environment } from '../../../../../environments/environment';
import { AgencyAPIURLs } from '../shared/constatant';
import { ParentAPIURLs } from '../../../parent/shared/constant';
import { TeacherAPIURLs } from 'src/app/layout/teacher/shared/constant';
declare var $: any;
@Component({
  selector: 'app-agency-admin-message',
  templateUrl: './agency-admin-message.component.html',
  styleUrls: ['./agency-admin-message.component.css']
})
export class AgencyAdminMessageComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollMessageBox') private myScrollContainer: ElementRef;
  userList: UserVM[] = [];
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
  videoPath = '';
  container: HTMLElement;
  constructor(private apiService: AgencyApiService, private error: ErrorHandlerService,
    private spinner: NgxSpinnerService, private notification: NotificationService,
    private commonService: CommonService) { }

  ngOnInit() {
    this.agencyId = this.commonService.getAgencyId();
    this.loggedInUserID = this.commonService.getLoggedInUserId();
    this.eshtablishConnectionSignalR();

    this._hubConnection.on('messageReceived', (nick: string, receivedMessage: string) => {
      const text = `${nick}: ${receivedMessage}`;
      this.messages.push(text);
      const str = text.substring(text.indexOf(':') + 1);
      const Obj = JSON.parse(str);
      this.msgSenderId = Obj.sender;
      console.log('signal', Obj);
      console.log('this.selectedId,this.receiverId', this.msgSenderId, this.receiverId);
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
        const no = this.userList.findIndex(r => r.listUserId === Obj.sender);
        this.userList[no].count = this.userList[no].count + 1;
      }
      if (Obj.receiver === this.loggedInUserID) {
        const user = this.userList.find(item => item.listUserId === Obj.sender);
        if (user) {
          const idx = this.userList.indexOf(user);
          this.userList.splice(idx, 1);
          this.userList.unshift(user);
        }
      }
    });

    this._hubConnection.on('messageSent', (nick: string, receivedMessage: string) => {
      const text = `${nick}: ${receivedMessage}`;
      this.messages.push(text);
      const str = text.substring(text.indexOf(':') + 1);
      const Obj = JSON.parse(str);
      this.msgSenderId = Obj.sender;
      console.log('signal', Obj);
      console.log('this.selectedId,this.receiverId', this.msgSenderId, this.receiverId);
      if (this.msgSenderId === this.receiverId || this.loggedInUserID === this.msgSenderId) {
        this.previousChatList.push({
          senderUserID: Obj.sender, receiverUserID: Obj.receiver, message: Obj.message,
          createdDateTime: new Date()
        });
      }
    });

    this.UserName = this.commonService.getUserFullName('userdetails');
    this.getUserList();
    this.getSectionVideo();
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


  OpenInfoVideo(data) {
    $('#infovideo').modal('show');
  }

  getSectionVideo() {
    const req = {
      'SectionID': 14
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


  public sendMessage(): void {
    if (this.message !== '') {
      console.log(this._hubConnection);
      if (true || this.receiverId !== undefined && this.receiverId !== null &&
        this.receiverId !== 0) {
        console.log(this._hubConnection);
        this._hubConnection
          .invoke('SendMessage', this.nick, this.message, this.agencyId, this.loggedInUserID, this.receiverId)
          .then(() => this.message = '')
          .catch(err => console.error(err, this.eshtablishConnectionSignalR()));
      }
    }

  }

  getUserList() {
    this.userList = [];
    this.spinner.show();
    const model = {
      'agencyID': this.commonService.getAgencyId(),
      'roleID': 2,
      'userID': this.commonService.getLoggedInUserId()
    };
    this.apiService.postData(AgencyAPIURLs.GetListForChat, model, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        if (res.body.data !== null && res.body.data !== [] && res.body.data.length > 0) {
          this.userList = res.body.data;
          this.userList[0].isActive = true;
          this.receiverName = this.userList[0].listUserName;
          this.receiverPic = this.userList[0].imagePath;
          this.receiverId = this.userList[0].listUserId;
          this.userList[0].count = 0;
          this.getPreviousChat();
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
    const no = this.userList.findIndex(r => r.listUserId === value.listUserId);
    this.userList[no].count = 0;
    this.userList.forEach(x => {
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
    const model = {
      'agencyID': this.commonService.getAgencyId(),
      'senderUserID': this.commonService.getLoggedInUserId(),
      'receiverUserID': this.receiverId
    };
    this.apiService.postData(ParentAPIURLs.GetMessageByID, model, null).subscribe(res => {
      if (res.body.statusCode === 200) {
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

  eshtablishConnectionSignalR() {
    const url = environment.baseUrl + '' + 'chat';
    this._hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(url)
      .build();
    this._hubConnection
      .start()
      .then(() => {
        this._hubConnection.invoke('getConnectionId', this.loggedInUserID)
          .then((connectionId) => {
            // Send the connectionId to controller
            this.token = connectionId;
          });
      })
      .catch(err => console.log('Error while establishing connection :(',
        this.eshtablishConnectionSignalR()
      ));
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
