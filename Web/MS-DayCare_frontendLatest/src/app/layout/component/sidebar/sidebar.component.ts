import { Component, OnInit, AfterViewInit, ViewChild, NgZone } from '@angular/core';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { CommonService } from '../../../shared/services/common/common.service';
import { ErrorHandlerService } from '../../../shared/services/error-handler/error-handler.service';
import { TeacherAPIURLs } from '../../teacher/shared/constant';
import { TeacherApiService } from '../../teacher/shared/services/teacher-api-service/teacher-api.service';
import { NgScrollbar } from 'ngx-scrollbar';
import * as signalR from '@aspnet/signalr';
import { NotificationService } from 'src/app/shared/services/notification-service/notification.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, AfterViewInit {
showChildNav: any;
user: number;
isSuperAdminHidden: boolean;
isTeacherHidden: boolean;
isAgencyAdminHidden: boolean;
isParentHidden: boolean;
isKioskParentHidden: boolean;
incidentCont: any;
parentType: string;
shown: string;
loggedInUserID: number;
messageCount = 0;
msgSenderId: number;
receiverId: number;
IsMessageTabActive = false;
token: string;
private _hubConnection: signalR.HubConnection;
@ViewChild(NgScrollbar) scrollRef: NgScrollbar;
  constructor(private router: Router, private commonService: CommonService,
     private error: ErrorHandlerService, private apiService: TeacherApiService,
     private ngZone: NgZone, private notification: NotificationService) {

    this.isSuperAdminHidden = false;
    this.isTeacherHidden = false;
    this.isAgencyAdminHidden = false;
    this.isParentHidden = false;
    this.isKioskParentHidden = false;
    if (this.commonService.getUserRole('userdetails') === 1) {// Agency Admin
      this.isSuperAdminHidden = true;
    } else if (this.commonService.getUserRole('userdetails') === 2) {// Agency Admin
      this.isAgencyAdminHidden = true;
    } else if (this.commonService.getUserRole('userdetails') === 3) { // Teacher
      this.isTeacherHidden = true;
    } else if (this.commonService.getUserRole('userdetails') === 4) { // Parent
      if (this.commonService.getIsKioskLogin() === 'true') { // for Kiosk login
        this.isKioskParentHidden = true;
      } else {
      this.isParentHidden  = true;
      }
    } else {
      this.error.unknownError();
      this.commonService.logOut();
    }
  }


  ngOnInit() {
    this.loggedInUserID = this.commonService.getLoggedInUserId();
    console.log('oarent', this.parentType = this.commonService.getParentType());
    if (this.commonService.isAuthenticate()) {
      this.getAllIncidents();
      this.getAllMessages();
    }
    this.commonService.getIncidentCount().subscribe(count => {
      this.incidentCont = count;
    });
    this.eshtablishConnectionSignalR();

    this._hubConnection.on('messageReceived', (nick: string, receivedMessage: string) => {
      const text = `${nick}: ${receivedMessage}`;
      const str = text.substring(text.indexOf(':') + 1);
      const Obj = JSON.parse(str);
      this.msgSenderId = Obj.sender;
      console.log('signal', Obj);
      console.log('this.selectedId,this.receiverId', this.msgSenderId, this.receiverId);

      if (Obj.receiver === this.loggedInUserID && this.IsMessageTabActive === false) {
        this.messageCount = this.messageCount + 1;
      }
    });
  }

  ngAfterViewInit() {
    const currentWindowWidth = window.innerWidth;
    if (currentWindowWidth < 992) {
      document.getElementsByTagName('body')[0].classList.toggle('collapsedSidebar');
      document.getElementById('sidebarLinksParent').classList.toggle('collapse');
    }
      this.shown = 'always';
  }


  getAllIncidents() {
    const req = {
      'agencyID': this.commonService.getAgencyId(),
    };
    this.apiService.postData(TeacherAPIURLs.GetAllIncidents, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        let count = 0;
        if (res.body.data) {
        res.body.data.forEach(element => {
            if (element.actionTaken === '') {
                count ++;
            }
        });
        this.incidentCont = count;
        console.log('sidebr incident', this.incidentCont);
        } else {
          this.incidentCont = count;
        }
      } else {
      }

    }, err => {
    }
    );
  }

  getAllMessages() {
    const req = {
      'ReceiverUserID': this.loggedInUserID,
    };
    this.apiService.postData(TeacherAPIURLs.GetUnReadMessageCount, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        if (res.body.totalRows) {
        this.messageCount = res.body.totalRows;
        console.log('Message Count', this.messageCount);
        } else {
          this.messageCount = 0;
        }
      } else {
      }
    }, err => {
    }
    );
  }

  inprogress() {
    this.notification.info({message: 'Functionality in progress', title: 'Comming Soon!'});
  }

  readMessage() {
    this.messageCount = 0;
    this.IsMessageTabActive = true;
  }

  unReadMessage() {
    this.IsMessageTabActive = false;
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

}
