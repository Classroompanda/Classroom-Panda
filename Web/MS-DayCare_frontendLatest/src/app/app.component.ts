import { Component, OnInit } from '@angular/core';
import { MessagingService } from './shared/services/firebace-messaging/messaging.service';
import { CommonService } from './shared/services/common/common.service';
import { ApiService } from './shared/services/api-service/api.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'DayCareSolution';
  message: any;
  agencyId = 0;
  constructor(private messagingService: MessagingService, private commonService: CommonService, private apiService: ApiService) {
    this.messagingService.requestPermission(1234);
  this.agencyId = this.commonService.getAgencyId();

    
    /**this method is alternate for local storage */
     // this.getAuthData();
  }
  ngOnInit() {
    this.messagingService.requestPermission(1234);
    this.messagingService.receiveMessage();
    this.message = this.messagingService.currentMessage;
  }

  getAuthData() {
    const url = 'api/User/GetAuthData';
    const data = {
     'Token': this.commonService.getToken('userdetails'),
     'UserName': 'User'
    };
    this.apiService.postData(url, data, null).subscribe( res => {
     console.log(res);
     this.commonService.saveLoginUserDetails(res.body);
    }, err => {
      console.log(err);
    });
  }



}
