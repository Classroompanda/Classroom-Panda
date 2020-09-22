(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["teacher-teacher-module"],{

/***/ "./src/app/layout/teacher/components/teacher-activity-details/teacher-activity-details.component.css":
/*!***********************************************************************************************************!*\
  !*** ./src/app/layout/teacher/components/teacher-activity-details/teacher-activity-details.component.css ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".messaging {max-height: 650px;\r\n    min-height: 650px;padding: 15px;}\r\n  img{ max-width:100%;}\r\n  .inbox_people {\r\n    background: #F6FBFF;\r\n    float: left;\r\n    overflow: hidden;\r\n    width: 30%; ;\r\n    max-height: 650px;\r\n\r\n  }\r\n  .inbox_msg {\r\n    border: 1px solid #c4c4c4;\r\n    clear: both;\r\n    overflow: hidden;\r\n  }\r\n  .top_spac{ margin: 20px 0 0;}\r\n  /* .recent_heading h4 {\r\n    color: #707070;\r\n    font-size: 15px;\r\n    padding: 20px 10px;\r\n  font-weight: 400\r\n  } */\r\n  /* .chat_ib h5{ font-size:15px; color:#464646; margin:0 0 8px 0;}\r\n  .chat_ib h5 span{ font-size:13px; float:right;}\r\n  .chat_ib p{ font-size:14px; color:#989898; margin:auto} */\r\n  .chat_img {\r\n    float: left;\r\n    width: 15%;\r\n    max-width: 100px;\r\n  }\r\n  .chat_people{ overflow:hidden; clear:both;}\r\n  .chat_list {\r\n    border-bottom: 1px solid #E2F0FF;\r\n    margin: 0;\r\n    padding: 15px;\r\n  }\r\n  .inbox_chat { height: 550px; overflow-y: auto;}\r\n  .active_chat{ background:#FF6C6C;color: #fff!important;}\r\n  .active_chat .kidname,.active_chat .chat_ib h5,.active_chat .chat_ib .status{color: #fff}\r\n  .incoming_msg_img {\r\n    display: inline-block;\r\n    width: 6%;\r\n  }\r\n  .received_msg {\r\n    display: inline-block;\r\n    padding: 0 0 0 10px;\r\n    vertical-align: top;\r\n    width: 92%;\r\n   }\r\n  .received_withd_msg p {\r\n    background: #ebebeb none repeat scroll 0 0;\r\n    border-radius: 3px;\r\n    color: #646464;\r\n    font-size: 14px;\r\n    margin: 0;\r\n    padding: 5px 10px 5px 12px;\r\n    width: 100%;\r\n  }\r\n  .time_date {\r\n    color: #747474;\r\n    display: block;\r\n    font-size: 12px;\r\n    margin: 8px 0 0;\r\n  }\r\n  .received_withd_msg { width: 57%;}\r\n  .mesgs {\r\n      float: left;\r\n      padding:0 0 0 15px;\r\n      width: 70%;\r\n      max-height: 650px;\r\n  }\r\n  .sent_msg p {\r\n    background: #05728f none repeat scroll 0 0;\r\n    border-radius: 3px;\r\n    font-size: 14px;\r\n    margin: 0; color:#fff;\r\n    padding: 5px 10px 5px 12px;\r\n    width:100%;\r\n  }\r\n  .outgoing_msg{ overflow:hidden; margin:26px 0 26px;}\r\n  .sent_msg {\r\n    float: right;\r\n    width: 46%;\r\n  }\r\n  .input_msg_write input {\r\n    background: rgba(0, 0, 0, 0) none repeat scroll 0 0;\r\n    border: medium none;\r\n    color: #4c4c4c;\r\n    font-size: 15px;\r\n    min-height: 48px;\r\n    width: 100%;\r\n  }\r\n  .type_msg {border-top: 1px solid #c4c4c4;position: relative;margin: 20px 0}\r\n  .msg_send_btn {\r\n    background: #05728f none repeat scroll 0 0;\r\n    border: medium none;\r\n    border-radius: 50%;\r\n    color: #fff;\r\n    cursor: pointer;\r\n    font-size: 17px;\r\n    height: 33px;\r\n    position: absolute;\r\n    right: 0;\r\n    top: 11px;\r\n    width: 33px;\r\n  }\r\n  .msg_history {\r\n    height: 500px;\r\n    overflow: hidden;\r\n    overflow-y: auto;\r\n    margin: 10px 0\r\n  }\r\n  @media (max-width: 640px) {\r\n  .inbox_people{width: 100%;min-height: 400px;max-height: 400px;margin-bottom: 30px;}\r\n  .inbox_chat {height: 350px;}\r\n  .mesgs{width: 100%;}\r\n  .messaging{min-height: 100%;max-height: 100%}\r\n  .mesgs{padding:  0 10px}\r\n  }\r\n  .techNotes h3{\r\n    margin: 15px 0 10px 0;\r\n    font-size: 15px;\r\n    color: #707070;\r\n    font-weight: 400;\r\n  }\r\n  .techNotes p{\r\n    font-size: 13px;\r\n    color: #707070;\r\n    font-weight: 300;\r\n  }\r\n  select {\r\n    font-size: 12px;\r\n    color: #fff;\r\n    background: #58A7FE;\r\n    /* width: 140px; */\r\n  height: 30px;\r\n  }\r\n  .activity-post {\r\n    display: flex;\r\n  }\r\n  .activity-post .postmsg {width: 100%;}\r\n  .mr15 {\r\n    margin-right: 15px;\r\n  }\r\n  .chat_people {\r\n    display: flex;\r\n    align-items: center;\r\n  }\r\n  /* Added By aniket 21 Feb 2019 */\r\n  .postimg .cont img:first-child{ height: 150px;}\r\n  .detailschildimg {\r\n    width: 100px !important;\r\n    height: 100px !important;\r\n  }\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGF5b3V0L3RlYWNoZXIvY29tcG9uZW50cy90ZWFjaGVyLWFjdGl2aXR5LWRldGFpbHMvdGVhY2hlci1hY3Rpdml0eS1kZXRhaWxzLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxpQkFBaUI7SUFDekIsaUJBQWlCLENBQUMsYUFBYSxDQUFDO0VBQ2xDLEtBQUssY0FBYyxDQUFDO0VBQ3BCO0lBQ0UsbUJBQW1CO0lBQ25CLFdBQVc7SUFDWCxnQkFBZ0I7SUFDaEIsVUFBVTtJQUNWLGlCQUFpQjs7RUFFbkI7RUFDQTtJQUNFLHlCQUF5QjtJQUN6QixXQUFXO0lBQ1gsZ0JBQWdCO0VBQ2xCO0VBQ0EsV0FBVyxnQkFBZ0IsQ0FBQztFQUk1Qjs7Ozs7S0FLRztFQUdIOzsyREFFeUQ7RUFDekQ7SUFDRSxXQUFXO0lBQ1gsVUFBVTtJQUNWLGdCQUFnQjtFQUNsQjtFQUtBLGNBQWMsZUFBZSxFQUFFLFVBQVUsQ0FBQztFQUMxQztJQUNFLGdDQUFnQztJQUNoQyxTQUFTO0lBQ1QsYUFBYTtFQUNmO0VBQ0EsY0FBYyxhQUFhLEVBQUUsZ0JBQWdCLENBQUM7RUFFOUMsY0FBYyxrQkFBa0IsQ0FBQyxxQkFBcUIsQ0FBQztFQUN2RCw2RUFBNkUsV0FBVztFQUV4RjtJQUNFLHFCQUFxQjtJQUNyQixTQUFTO0VBQ1g7RUFDQTtJQUNFLHFCQUFxQjtJQUNyQixtQkFBbUI7SUFDbkIsbUJBQW1CO0lBQ25CLFVBQVU7R0FDWDtFQUNBO0lBQ0MsMENBQTBDO0lBQzFDLGtCQUFrQjtJQUNsQixjQUFjO0lBQ2QsZUFBZTtJQUNmLFNBQVM7SUFDVCwwQkFBMEI7SUFDMUIsV0FBVztFQUNiO0VBQ0E7SUFDRSxjQUFjO0lBQ2QsY0FBYztJQUNkLGVBQWU7SUFDZixlQUFlO0VBQ2pCO0VBQ0Esc0JBQXNCLFVBQVUsQ0FBQztFQUNqQztNQUNJLFdBQVc7TUFDWCxrQkFBa0I7TUFDbEIsVUFBVTtNQUNWLGlCQUFpQjtFQUNyQjtFQUVDO0lBQ0MsMENBQTBDO0lBQzFDLGtCQUFrQjtJQUNsQixlQUFlO0lBQ2YsU0FBUyxFQUFFLFVBQVU7SUFDckIsMEJBQTBCO0lBQzFCLFVBQVU7RUFDWjtFQUNBLGVBQWUsZUFBZSxFQUFFLGtCQUFrQixDQUFDO0VBQ25EO0lBQ0UsWUFBWTtJQUNaLFVBQVU7RUFDWjtFQUNBO0lBQ0UsbURBQW1EO0lBQ25ELG1CQUFtQjtJQUNuQixjQUFjO0lBQ2QsZUFBZTtJQUNmLGdCQUFnQjtJQUNoQixXQUFXO0VBQ2I7RUFFQSxXQUFXLDZCQUE2QixDQUFDLGtCQUFrQixDQUFDLGNBQWM7RUFDMUU7SUFDRSwwQ0FBMEM7SUFDMUMsbUJBQW1CO0lBQ25CLGtCQUFrQjtJQUNsQixXQUFXO0lBQ1gsZUFBZTtJQUNmLGVBQWU7SUFDZixZQUFZO0lBQ1osa0JBQWtCO0lBQ2xCLFFBQVE7SUFDUixTQUFTO0lBQ1QsV0FBVztFQUNiO0VBRUE7SUFDRSxhQUFhO0lBQ2IsZ0JBQWdCO0lBQ2hCLGdCQUFnQjtJQUNoQjtFQUNGO0VBRUE7RUFDQSxjQUFjLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxpQkFBaUIsQ0FBQyxtQkFBbUIsQ0FBQztFQUNsRixhQUFhLGFBQWEsQ0FBQztFQUMzQixPQUFPLFdBQVcsQ0FBQztFQUNuQixXQUFXLGdCQUFnQixDQUFDLGdCQUFnQjtFQUM1QyxPQUFPLGdCQUFnQjtFQUN2QjtFQUdBO0lBQ0UscUJBQXFCO0lBQ3JCLGVBQWU7SUFDZixjQUFjO0lBQ2QsZ0JBQWdCO0VBQ2xCO0VBQ0E7SUFDRSxlQUFlO0lBQ2YsY0FBYztJQUNkLGdCQUFnQjtFQUNsQjtFQUVDO0lBQ0MsZUFBZTtJQUNmLFdBQVc7SUFDWCxtQkFBbUI7SUFDbkIsa0JBQWtCO0VBQ3BCLFlBQVk7RUFDWjtFQUVBO0lBQ0UsYUFBYTtFQUNmO0VBQ0EseUJBQXlCLFdBQVcsQ0FBQztFQUNyQztJQUNFLGtCQUFrQjtFQUNwQjtFQUNBO0lBQ0UsYUFBYTtJQUNiLG1CQUFtQjtFQUNyQjtFQUVBLGdDQUFnQztFQUNoQyxnQ0FBZ0MsYUFBYSxDQUFDO0VBSTlDO0lBQ0UsdUJBQXVCO0lBQ3ZCLHdCQUF3QjtFQUMxQiIsImZpbGUiOiJzcmMvYXBwL2xheW91dC90ZWFjaGVyL2NvbXBvbmVudHMvdGVhY2hlci1hY3Rpdml0eS1kZXRhaWxzL3RlYWNoZXItYWN0aXZpdHktZGV0YWlscy5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLm1lc3NhZ2luZyB7bWF4LWhlaWdodDogNjUwcHg7XHJcbiAgICBtaW4taGVpZ2h0OiA2NTBweDtwYWRkaW5nOiAxNXB4O31cclxuICBpbWd7IG1heC13aWR0aDoxMDAlO31cclxuICAuaW5ib3hfcGVvcGxlIHtcclxuICAgIGJhY2tncm91bmQ6ICNGNkZCRkY7XHJcbiAgICBmbG9hdDogbGVmdDtcclxuICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgICB3aWR0aDogMzAlOyA7XHJcbiAgICBtYXgtaGVpZ2h0OiA2NTBweDtcclxuXHJcbiAgfVxyXG4gIC5pbmJveF9tc2cge1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2M0YzRjNDtcclxuICAgIGNsZWFyOiBib3RoO1xyXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICB9XHJcbiAgLnRvcF9zcGFjeyBtYXJnaW46IDIwcHggMCAwO31cclxuICBcclxuICBcclxuICBcclxuICAvKiAucmVjZW50X2hlYWRpbmcgaDQge1xyXG4gICAgY29sb3I6ICM3MDcwNzA7XHJcbiAgICBmb250LXNpemU6IDE1cHg7XHJcbiAgICBwYWRkaW5nOiAyMHB4IDEwcHg7XHJcbiAgZm9udC13ZWlnaHQ6IDQwMFxyXG4gIH0gKi9cclxuICBcclxuICBcclxuICAvKiAuY2hhdF9pYiBoNXsgZm9udC1zaXplOjE1cHg7IGNvbG9yOiM0NjQ2NDY7IG1hcmdpbjowIDAgOHB4IDA7fVxyXG4gIC5jaGF0X2liIGg1IHNwYW57IGZvbnQtc2l6ZToxM3B4OyBmbG9hdDpyaWdodDt9XHJcbiAgLmNoYXRfaWIgcHsgZm9udC1zaXplOjE0cHg7IGNvbG9yOiM5ODk4OTg7IG1hcmdpbjphdXRvfSAqL1xyXG4gIC5jaGF0X2ltZyB7XHJcbiAgICBmbG9hdDogbGVmdDtcclxuICAgIHdpZHRoOiAxNSU7XHJcbiAgICBtYXgtd2lkdGg6IDEwMHB4O1xyXG4gIH1cclxuXHJcbiAgXHJcbiAgXHJcbiAgXHJcbiAgLmNoYXRfcGVvcGxleyBvdmVyZmxvdzpoaWRkZW47IGNsZWFyOmJvdGg7fVxyXG4gIC5jaGF0X2xpc3Qge1xyXG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNFMkYwRkY7XHJcbiAgICBtYXJnaW46IDA7XHJcbiAgICBwYWRkaW5nOiAxNXB4O1xyXG4gIH1cclxuICAuaW5ib3hfY2hhdCB7IGhlaWdodDogNTUwcHg7IG92ZXJmbG93LXk6IGF1dG87fVxyXG4gIFxyXG4gIC5hY3RpdmVfY2hhdHsgYmFja2dyb3VuZDojRkY2QzZDO2NvbG9yOiAjZmZmIWltcG9ydGFudDt9XHJcbiAgLmFjdGl2ZV9jaGF0IC5raWRuYW1lLC5hY3RpdmVfY2hhdCAuY2hhdF9pYiBoNSwuYWN0aXZlX2NoYXQgLmNoYXRfaWIgLnN0YXR1c3tjb2xvcjogI2ZmZn1cclxuICBcclxuICAuaW5jb21pbmdfbXNnX2ltZyB7XHJcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICB3aWR0aDogNiU7XHJcbiAgfVxyXG4gIC5yZWNlaXZlZF9tc2cge1xyXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgcGFkZGluZzogMCAwIDAgMTBweDtcclxuICAgIHZlcnRpY2FsLWFsaWduOiB0b3A7XHJcbiAgICB3aWR0aDogOTIlO1xyXG4gICB9XHJcbiAgIC5yZWNlaXZlZF93aXRoZF9tc2cgcCB7XHJcbiAgICBiYWNrZ3JvdW5kOiAjZWJlYmViIG5vbmUgcmVwZWF0IHNjcm9sbCAwIDA7XHJcbiAgICBib3JkZXItcmFkaXVzOiAzcHg7XHJcbiAgICBjb2xvcjogIzY0NjQ2NDtcclxuICAgIGZvbnQtc2l6ZTogMTRweDtcclxuICAgIG1hcmdpbjogMDtcclxuICAgIHBhZGRpbmc6IDVweCAxMHB4IDVweCAxMnB4O1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgfVxyXG4gIC50aW1lX2RhdGUge1xyXG4gICAgY29sb3I6ICM3NDc0NzQ7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIGZvbnQtc2l6ZTogMTJweDtcclxuICAgIG1hcmdpbjogOHB4IDAgMDtcclxuICB9XHJcbiAgLnJlY2VpdmVkX3dpdGhkX21zZyB7IHdpZHRoOiA1NyU7fVxyXG4gIC5tZXNncyB7XHJcbiAgICAgIGZsb2F0OiBsZWZ0O1xyXG4gICAgICBwYWRkaW5nOjAgMCAwIDE1cHg7XHJcbiAgICAgIHdpZHRoOiA3MCU7XHJcbiAgICAgIG1heC1oZWlnaHQ6IDY1MHB4O1xyXG4gIH1cclxuICBcclxuICAgLnNlbnRfbXNnIHAge1xyXG4gICAgYmFja2dyb3VuZDogIzA1NzI4ZiBub25lIHJlcGVhdCBzY3JvbGwgMCAwO1xyXG4gICAgYm9yZGVyLXJhZGl1czogM3B4O1xyXG4gICAgZm9udC1zaXplOiAxNHB4O1xyXG4gICAgbWFyZ2luOiAwOyBjb2xvcjojZmZmO1xyXG4gICAgcGFkZGluZzogNXB4IDEwcHggNXB4IDEycHg7XHJcbiAgICB3aWR0aDoxMDAlO1xyXG4gIH1cclxuICAub3V0Z29pbmdfbXNneyBvdmVyZmxvdzpoaWRkZW47IG1hcmdpbjoyNnB4IDAgMjZweDt9XHJcbiAgLnNlbnRfbXNnIHtcclxuICAgIGZsb2F0OiByaWdodDtcclxuICAgIHdpZHRoOiA0NiU7XHJcbiAgfVxyXG4gIC5pbnB1dF9tc2dfd3JpdGUgaW5wdXQge1xyXG4gICAgYmFja2dyb3VuZDogcmdiYSgwLCAwLCAwLCAwKSBub25lIHJlcGVhdCBzY3JvbGwgMCAwO1xyXG4gICAgYm9yZGVyOiBtZWRpdW0gbm9uZTtcclxuICAgIGNvbG9yOiAjNGM0YzRjO1xyXG4gICAgZm9udC1zaXplOiAxNXB4O1xyXG4gICAgbWluLWhlaWdodDogNDhweDtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gIH1cclxuICBcclxuICAudHlwZV9tc2cge2JvcmRlci10b3A6IDFweCBzb2xpZCAjYzRjNGM0O3Bvc2l0aW9uOiByZWxhdGl2ZTttYXJnaW46IDIwcHggMH1cclxuICAubXNnX3NlbmRfYnRuIHtcclxuICAgIGJhY2tncm91bmQ6ICMwNTcyOGYgbm9uZSByZXBlYXQgc2Nyb2xsIDAgMDtcclxuICAgIGJvcmRlcjogbWVkaXVtIG5vbmU7XHJcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgICBjb2xvcjogI2ZmZjtcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgIGZvbnQtc2l6ZTogMTdweDtcclxuICAgIGhlaWdodDogMzNweDtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHJpZ2h0OiAwO1xyXG4gICAgdG9wOiAxMXB4O1xyXG4gICAgd2lkdGg6IDMzcHg7XHJcbiAgfVxyXG4gIFxyXG4gIC5tc2dfaGlzdG9yeSB7XHJcbiAgICBoZWlnaHQ6IDUwMHB4O1xyXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgIG92ZXJmbG93LXk6IGF1dG87XHJcbiAgICBtYXJnaW46IDEwcHggMFxyXG4gIH1cclxuICBcclxuICBAbWVkaWEgKG1heC13aWR0aDogNjQwcHgpIHtcclxuICAuaW5ib3hfcGVvcGxle3dpZHRoOiAxMDAlO21pbi1oZWlnaHQ6IDQwMHB4O21heC1oZWlnaHQ6IDQwMHB4O21hcmdpbi1ib3R0b206IDMwcHg7fVxyXG4gIC5pbmJveF9jaGF0IHtoZWlnaHQ6IDM1MHB4O31cclxuICAubWVzZ3N7d2lkdGg6IDEwMCU7fVxyXG4gIC5tZXNzYWdpbmd7bWluLWhlaWdodDogMTAwJTttYXgtaGVpZ2h0OiAxMDAlfVxyXG4gIC5tZXNnc3twYWRkaW5nOiAgMCAxMHB4fVxyXG4gIH1cclxuICBcclxuICBcclxuICAudGVjaE5vdGVzIGgze1xyXG4gICAgbWFyZ2luOiAxNXB4IDAgMTBweCAwO1xyXG4gICAgZm9udC1zaXplOiAxNXB4O1xyXG4gICAgY29sb3I6ICM3MDcwNzA7XHJcbiAgICBmb250LXdlaWdodDogNDAwO1xyXG4gIH1cclxuICAudGVjaE5vdGVzIHB7XHJcbiAgICBmb250LXNpemU6IDEzcHg7XHJcbiAgICBjb2xvcjogIzcwNzA3MDtcclxuICAgIGZvbnQtd2VpZ2h0OiAzMDA7XHJcbiAgfVxyXG4gIFxyXG4gICBzZWxlY3Qge1xyXG4gICAgZm9udC1zaXplOiAxMnB4O1xyXG4gICAgY29sb3I6ICNmZmY7XHJcbiAgICBiYWNrZ3JvdW5kOiAjNThBN0ZFO1xyXG4gICAgLyogd2lkdGg6IDE0MHB4OyAqL1xyXG4gIGhlaWdodDogMzBweDtcclxuICB9XHJcbiAgXHJcbiAgLmFjdGl2aXR5LXBvc3Qge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICB9XHJcbiAgLmFjdGl2aXR5LXBvc3QgLnBvc3Rtc2cge3dpZHRoOiAxMDAlO31cclxuICAubXIxNSB7XHJcbiAgICBtYXJnaW4tcmlnaHQ6IDE1cHg7XHJcbiAgfVxyXG4gIC5jaGF0X3Blb3BsZSB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICB9XHJcblxyXG4gIC8qIEFkZGVkIEJ5IGFuaWtldCAyMSBGZWIgMjAxOSAqL1xyXG4gIC5wb3N0aW1nIC5jb250IGltZzpmaXJzdC1jaGlsZHsgaGVpZ2h0OiAxNTBweDt9XHJcblxyXG5cclxuXHJcbiAgLmRldGFpbHNjaGlsZGltZyB7XHJcbiAgICB3aWR0aDogMTAwcHggIWltcG9ydGFudDtcclxuICAgIGhlaWdodDogMTAwcHggIWltcG9ydGFudDtcclxuICB9Il19 */"

/***/ }),

/***/ "./src/app/layout/teacher/components/teacher-activity-details/teacher-activity-details.component.html":
/*!************************************************************************************************************!*\
  !*** ./src/app/layout/teacher/components/teacher-activity-details/teacher-activity-details.component.html ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"wrapper\">\r\n  <div class=\"container-fluid\">\r\n\r\n    <div class=\"pagetitle\">\r\n      <div>\r\n        <h2>Post Activity\r\n          <span>/ Activity Detail </span>\r\n        </h2>\r\n      </div>\r\n      <!-- <div>\r\n          <button type=\"submit\" class=\"btn btn-red\">Approve All</button>\r\n        </div> -->\r\n    </div>\r\n\r\n    <div class=\"subhead d-flex justify-content-between mt-20\">\r\n      <div>\r\n        <h3>Activity Detail</h3>\r\n      </div>\r\n      <div>\r\n        <!-- <i class=\"fa fa-print\"></i> -->\r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"mt-20\"></div>\r\n    <!-- <div class=\"row\">\r\n          <div class=\"col-lg-8\">\r\n            <h3>Class LKG</h3>\r\n          </div>\r\n          <div class=\"col-lg-4\">\r\n            <div class=\"row\">\r\n            <div class=\"col-lg-4\">\r\n              <div> Select Class : </div>\r\n            </div>\r\n            <div class=\"col-lg-8\">\r\n              <div class=\"form-group\">\r\n                <select class=\"form-control\" id=\"exampleFormControlSelect1\">\r\n                  <option>L-KG</option>\r\n                  <option>1st</option>\r\n                  <option>2nd</option>\r\n                  <option>3rd</option>\r\n                  <option>4th</option>\r\n                </select>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          </div>\r\n        </div> -->\r\n\r\n    <!-- <div class=\"row\">\r\n         <div class=\"col-lg-4\">\r\n          <div class=\"card cardup \">\r\n            <div class=\"crdhead\">\r\n              <div class=\"title\"> Upcoming Classes</div>\r\n              <div>View all</div>\r\n            </div>\r\n            <div class=\"cardbody\">\r\n  \r\n              <ul class=\"upcmng\">\r\n                <li class=\"d-flex justify-content-between\">\r\n                  <div class=\"d-flex\">\r\n                    <div class=\"chatimg\">\r\n                      <img src=\"https://ptetutorials.com/images/user-profile.png\" alt=\"sunil\" class=\"img-fluid\">\r\n                    </div>\r\n                    <div class=\"chatdet\">\r\n                      <h5>1245PM - 1:45PM</h5>\r\n                      <p>James</p>\r\n                    </div>\r\n                  </div>\r\n                  <div>\r\n                    <a href=\"\">View</a>\r\n                  </div>\r\n                </li>\r\n                <li class=\"d-flex justify-content-between\">\r\n                  <div class=\"d-flex\">\r\n                    <div class=\"chatimg\">\r\n                      <img src=\"https://ptetutorials.com/images/user-profile.png\" alt=\"sunil\" class=\"img-fluid\">\r\n                    </div>\r\n                    <div class=\"chatdet\">\r\n                      <h5>1245PM - 1:45PM</h5>\r\n                      <p>Mark</p>\r\n                    </div>\r\n                  </div>\r\n                  <div>\r\n                    <a href=\"\">View</a>\r\n                  </div>\r\n                </li>\r\n                <li class=\"d-flex justify-content-between\">\r\n                  <div class=\"d-flex\">\r\n                    <div class=\"chatimg\">\r\n                      <img src=\"https://ptetutorials.com/images/user-profile.png\" alt=\"sunil\" class=\"img-fluid\">\r\n                    </div>\r\n                    <div class=\"chatdet\">\r\n                      <h5>1245PM - 1:45PM</h5>\r\n                      <p>Peter</p>\r\n                    </div>\r\n                  </div>\r\n                  <div>\r\n                    <a href=\"\">View</a>\r\n                  </div>\r\n                </li>\r\n              </ul>\r\n  \r\n            </div>\r\n  \r\n          </div>\r\n        </div> \r\n        <div class=\"col-lg-8\">\r\n          <div class=\"card mb-20\" style=\"margin-bottom: 20px;\">\r\n            <div class=\"post\">\r\n              <div class=\"row\">\r\n                <div class=\"col-lg-1\">\r\n                  <div class=\"chatimg w-20\">\r\n                    <img src=\"https://ptetutorials.com/images/user-profile.png\" alt=\"sunil\" class=\"img-fluid\">\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-lg-11\">\r\n                  <div class=\"postmsg\">\r\n                    <textarea name=\"\" id=\"\" rows=\"5\" placeholder=\"Write somethings to post\"></textarea>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-lg-12\">\r\n                    <div class=\"type_msg\">\r\n                        <div class=\"input_msg_write\">\r\n           \r\n                         <div class=\"sndbtn text-right\">\r\n                           <a href=\"\"> <i class=\"fa fa-video-camera\" aria-hidden=\"true\"></i>   </a>\r\n                            <a href=\"\"><i class=\"fa fa-camera\" aria-hidden=\"true\"></i></a>\r\n                          <button class=\"btn btn-send\" type=\"button\">Post</button>\r\n                          </div>\r\n                      </div>\r\n                      </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>  -->\r\n\r\n    <div class=\"card\">\r\n      <div class=\"messaging\">\r\n        <!-- <div class=\"inbox_people\">\r\n          <div class=\"headind_srch\">\r\n            <div class=\"recent_heading\">\r\n              <h4>Class L-KG - Student(35)</h4>\r\n            </div>\r\n          </div>\r\n          <div class=\"inbox_chat\">\r\n            <div class=\"chat_list active_chat\">\r\n              <div class=\"chat_people\">\r\n                <div class=\"chat_img\">\r\n                  <img src=\"https://ptetutorials.com/images/user-profile.png\" alt=\"sunil\"> </div>\r\n                <div class=\"chat_ib\">\r\n                  <h5>ID : C123456\r\n                  </h5>\r\n                  <p class=\"kidname\">Dev James</p>\r\n                  <p class=\"status\">Enjoying the dance</p>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"chat_list\">\r\n              <div class=\"chat_people\">\r\n                <div class=\"chat_img\">\r\n                  <img src=\"https://ptetutorials.com/images/user-profile.png\" alt=\"sunil\"> </div>\r\n                <div class=\"chat_ib\">\r\n                  <h5>ID : C123456\r\n                   \r\n                  </h5>\r\n                  <p class=\"kidname\">Dev James</p>\r\n                  <p class=\"status\">Enjoying the dance</p>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"chat_list\">\r\n              <div class=\"chat_people\">\r\n                <div class=\"chat_img\">\r\n                  <img src=\"https://ptetutorials.com/images/user-profile.png\" alt=\"sunil\"> </div>\r\n                <div class=\"chat_ib\">\r\n                  <h5>ID : C123456\r\n                   \r\n                  </h5>\r\n                  <p class=\"kidname\">Dev James</p>\r\n                  <p class=\"status\">Enjoying the dance</p>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"chat_list\">\r\n              <div class=\"chat_people\">\r\n                <div class=\"chat_img\">\r\n                  <img src=\"https://ptetutorials.com/images/user-profile.png\" alt=\"sunil\"> </div>\r\n                <div class=\"chat_ib\">\r\n                  <h5>ID : C123456\r\n                  \r\n                  </h5>\r\n                  <p class=\"kidname\">Dev James</p>\r\n                  <p class=\"status\">Enjoying the dance</p>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"chat_list\">\r\n              <div class=\"chat_people\">\r\n                <div class=\"chat_img\">\r\n                  <img src=\"https://ptetutorials.com/images/user-profile.png\" alt=\"sunil\"> </div>\r\n                <div class=\"chat_ib\">\r\n                  <h5>ID : C123456\r\n                   \r\n                  </h5>\r\n                  <p class=\"kidname\">Dev James</p>\r\n                  <p class=\"status\">Enjoying the dance</p>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"chat_list\">\r\n              <div class=\"chat_people\">\r\n                <div class=\"chat_img\">\r\n                  <img src=\"https://ptetutorials.com/images/user-profile.png\" alt=\"sunil\"> </div>\r\n                <div class=\"chat_ib\">\r\n                  <h5>ID : C123456\r\n                    \r\n                  </h5>\r\n                  <p class=\"kidname\">Dev James</p>\r\n                  <p class=\"status\">Enjoying the dance</p>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n  \r\n  \r\n  \r\n  \r\n        </div> -->\r\n        <div class=\"mesgs\">\r\n          <div class=\"headind_srch\">\r\n            <div class=\"recent_heading\">\r\n              <h4>Recent Post Gallery</h4>\r\n            </div>\r\n          </div>\r\n          <div class=\"brdr\"></div>\r\n          <div class=\"msg_history\">\r\n            <div class=\"chat_people\">\r\n              <div class=\"chat_img\">\r\n\r\n                <img src=\"{{postdetails.imagePath}}\" alt=\"\" onError=\"this.src='assets/img/user.png'\"\r\n                  class=\"img-circle detailschildimg\">\r\n                <!-- <img *ngIf=\"(postdetails.imagePath == null)\" src=\"assets/img/user.png\" alt=\"\" > -->\r\n\r\n              </div>\r\n              <div class=\"chat_ib\">\r\n                <!-- <h5>ID : C123456 </h5> -->\r\n                <p class=\"kidname\">{{postdetails.studentName}}</p>\r\n                <p class=\"status\">{{postdetails.postedDate | date}}</p>\r\n              </div>\r\n            </div>\r\n            <div class=\"techNotes\">\r\n              <h3>{{postdetails.postTitle }}</h3>\r\n              <p>{{postdetails.postDescription}}</p>\r\n              <p><i class=\"fa fa-gittip\">{{postdetails.totalLikes}}</i>Like</p>\r\n            </div>\r\n            <div class=\"brdr\"></div>\r\n\r\n            <div class=\"postimges\">\r\n              <div class=\"row\" *ngIf=\"postdetails.postActivityImages\">\r\n\r\n                <div class=\"col-lg-3\" *ngFor=\"let img of postdetails.postActivityImages\">\r\n                  <div class=\"postimg\">\r\n                    <div class=\"cont\"> <img src=\"{{img.imageServerPath}}\" onError=\"this.src='assets/img/user.png'\"\r\n                        alt=\"\" class=\"img-fluiud\"></div>\r\n                    <!-- <p ><img src=\"assets/img/happy.svg\" alt=\"\">{{img.likeCount}}</p> -->\r\n\r\n                  </div>\r\n                </div>\r\n\r\n                <!-- <div class=\"col-lg-3\">\r\n                        <div class=\"postimg\">\r\n                            <div class=\"cont\"> <img src=\"assets/img/img1.svg\" alt=\"\" class=\"img-fluiud\"></div>\r\n                            <p ><img src=\"assets/img/happy.svg\" alt=\"\">123</p>\r\n                          </div>\r\n                    </div>\r\n                    <div class=\"col-lg-3\">\r\n                        <div class=\"postimg\">\r\n                            <div class=\"cont\"> <img src=\"assets/img/img1.svg\" alt=\"\" class=\"img-fluiud\"></div>\r\n                            <p ><img src=\"assets/img/happy.svg\" alt=\"\">123</p>\r\n                          </div>\r\n                    </div>\r\n                    <div class=\"col-lg-3\">\r\n                        <div class=\"postimg\">\r\n                            <div class=\"cont\"> <img src=\"assets/img/img1.svg\" alt=\"\" class=\"img-fluiud\"></div>\r\n                            <p ><img src=\"assets/img/happy.svg\" alt=\"\">123</p>\r\n                          </div>\r\n                    </div> -->\r\n              </div>\r\n              <div class=\"row\" *ngIf=\"postdetails.postActivityVideos\">\r\n\r\n\r\n\r\n                <div *ngIf=\"postdetails.postActivityVideos\">\r\n                  <div class=\"col-lg-3\" *ngFor=\"let img of postdetails.postActivityVideos\">\r\n                    <div class=\"\">\r\n                      <div class=\"cont\">\r\n                        <!-- <img src=\"{{img.vedioServerPath}}\" alt=\"\" class=\"img-fluiud\"> -->\r\n                        <video controls width=\"420\" height=\"350\">\r\n                          <source src=\"{{img.vedioServerPath}}\" type=\"video/mp4\" />\r\n                          <source src=\"{{img.vedioServerPath}}\" type=\"video/ogg\">\r\n                          <source src=\"{{img.vedioServerPath}}\" type=\"video/webm\">\r\n\r\n                          Browser not supported\r\n                        </video>\r\n                      </div>\r\n                      <!-- <p > -->\r\n                      <!-- <img src=\"assets/img/happy.svg\" alt=\"\"> -->\r\n                      <!-- {{img.likeCount}}</p> -->\r\n                    </div>\r\n                    <!-- <div class=\"video\">\r\n                        <video controls width=\"420\" height=\"350\" >\r\n                            <source src=\"{{postdetails.postActivityVideos}}\" type=\"video/mp4\" />\r\n                            Browser not supported\r\n                        </video>\r\n                    </div> -->\r\n                  </div>\r\n                </div>\r\n                <!-- <div class=\"col-lg-3\">\r\n                          <div class=\"postimg\">\r\n                              <div class=\"cont\"> <img src=\"assets/img/img1.svg\" alt=\"\" class=\"img-fluiud\"></div>\r\n                              <p ><img src=\"assets/img/happy.svg\" alt=\"\">123</p>\r\n                            </div>\r\n                      </div>\r\n                      <div class=\"col-lg-3\">\r\n                          <div class=\"postimg\">\r\n                              <div class=\"cont\"> <img src=\"assets/img/img1.svg\" alt=\"\" class=\"img-fluiud\"></div>\r\n                              <p ><img src=\"assets/img/happy.svg\" alt=\"\">123</p>\r\n                            </div>\r\n                      </div>\r\n                      <div class=\"col-lg-3\">\r\n                          <div class=\"postimg\">\r\n                              <div class=\"cont\"> <img src=\"assets/img/img1.svg\" alt=\"\" class=\"img-fluiud\"></div>\r\n                              <p ><img src=\"assets/img/happy.svg\" alt=\"\">123</p>\r\n                            </div>\r\n                      </div> -->\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <!-- <div class=\"type_msg\">\r\n            <div class=\"input_msg_write\">\r\n              <input type=\"text\" class=\"write_msg\" placeholder=\"Type a message\" />\r\n              <button class=\"btn msg_send_btn\" type=\"button\">\r\n                <i class=\"fa fa-paper-plane-o\" aria-hidden=\"true\"></i>\r\n              </button>\r\n            </div>\r\n          </div> -->\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n  </div>\r\n</div>"

/***/ }),

/***/ "./src/app/layout/teacher/components/teacher-activity-details/teacher-activity-details.component.ts":
/*!**********************************************************************************************************!*\
  !*** ./src/app/layout/teacher/components/teacher-activity-details/teacher-activity-details.component.ts ***!
  \**********************************************************************************************************/
/*! exports provided: TeacherActivityDetailsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TeacherActivityDetailsComponent", function() { return TeacherActivityDetailsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var _shared_services_teacher_api_service_teacher_api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/services/teacher-api-service/teacher-api.service */ "./src/app/layout/teacher/shared/services/teacher-api-service/teacher-api.service.ts");
/* harmony import */ var _shared_services_common_common_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../shared/services/common/common.service */ "./src/app/shared/services/common/common.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _shared_services_error_handler_error_handler_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../shared/services/error-handler/error-handler.service */ "./src/app/shared/services/error-handler/error-handler.service.ts");
/* harmony import */ var _shared_services_notification_service_notification_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../shared/services/notification-service/notification.service */ "./src/app/shared/services/notification-service/notification.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared_constant__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../shared/constant */ "./src/app/layout/teacher/shared/constant.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var TeacherActivityDetailsComponent = /** @class */ (function () {
    function TeacherActivityDetailsComponent(spinner, apiService, commonService, fb, error, notification, route) {
        this.spinner = spinner;
        this.apiService = apiService;
        this.commonService = commonService;
        this.fb = fb;
        this.error = error;
        this.notification = notification;
        this.route = route;
        this.postdetails = {};
        this.mediaList = [];
    }
    TeacherActivityDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        //  this.testPath = 'https://localhost:44391/ReviewTemplateImage/iphonvideo.mov';
        this.route.params.subscribe(function (params) {
            _this.id = params['id'];
            _this.classID = params['classid'];
            _this.getPostDetails();
        });
    };
    TeacherActivityDetailsComponent.prototype.getTeacherOperationalClasses = function () {
    };
    /**Get All class list */
    TeacherActivityDetailsComponent.prototype.getPostDetails = function () {
        var _this = this;
        this.spinner.show();
        var data = {
            'agencyID': this.commonService.getAgencyId(),
            'id': this.id,
            'classesID': this.classID
        };
        this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_8__["TeacherAPIURLs"].GetPostActivityInfo, data, null).subscribe(function (res) {
            if (res.body.statusCode === 200) {
                _this.postdetails = res.body.data;
                // if (this.postdetails) {
                //   ;
                // }
                // if (this.postdetails) {
                //     if (this.postdetails.postActivityImages) {
                //       this.showImage = true;
                //         this.mediaList = this.postdetails.postActivityImages;
                //     } else {
                //       this.showImage = false;
                //       this.mediaList = this.postdetails.postActivityVideos;
                //     }
                // }
                _this.spinner.hide();
                console.log('details', _this.postdetails);
            }
            else {
                _this.spinner.hide();
                _this.error.unknownError();
            }
        }, function (err) {
            _this.spinner.hide();
            _this.error.commonError(err);
        });
    };
    TeacherActivityDetailsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-teacher-activity-details',
            template: __webpack_require__(/*! ./teacher-activity-details.component.html */ "./src/app/layout/teacher/components/teacher-activity-details/teacher-activity-details.component.html"),
            styles: [__webpack_require__(/*! ./teacher-activity-details.component.css */ "./src/app/layout/teacher/components/teacher-activity-details/teacher-activity-details.component.css")]
        }),
        __metadata("design:paramtypes", [ngx_spinner__WEBPACK_IMPORTED_MODULE_1__["NgxSpinnerService"], _shared_services_teacher_api_service_teacher_api_service__WEBPACK_IMPORTED_MODULE_2__["TeacherApiService"], _shared_services_common_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"], _shared_services_error_handler_error_handler_service__WEBPACK_IMPORTED_MODULE_5__["ErrorHandlerService"],
            _shared_services_notification_service_notification_service__WEBPACK_IMPORTED_MODULE_6__["NotificationService"], _angular_router__WEBPACK_IMPORTED_MODULE_7__["ActivatedRoute"]])
    ], TeacherActivityDetailsComponent);
    return TeacherActivityDetailsComponent;
}());



/***/ }),

/***/ "./src/app/layout/teacher/components/teacher-attendence/teacher-attendence.component.css":
/*!***********************************************************************************************!*\
  !*** ./src/app/layout/teacher/components/teacher-attendence/teacher-attendence.component.css ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".tgl-flip + .tgl-btn {\r\n  /* padding: 2px; */\r\n  transition: all .2s ease;\r\n  font-family: sans-serif;\r\n  -webkit-perspective: 100px;\r\n          perspective: 100px;\r\n  width: 100px;\r\n  padding: 10px;   \r\n  height: 28px;\r\n  line-height: 28px;\r\n  margin-bottom: 0;\r\n   \r\n}\r\n.tgl-flip + .tgl-btn:after, .tgl-flip + .tgl-btn:before {\r\n  display: inline-block;\r\n  transition: all .4s ease;\r\n  width: 100%;\r\n  text-align: center;\r\n  position: absolute;\r\n  /* line-height: 2em; */\r\n  font-weight: bold;\r\n  color: #fff;\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n  -webkit-backface-visibility: hidden;\r\n          backface-visibility: hidden;\r\n  border-radius: 4px;\r\n}\r\n.tgl-flip + .tgl-btn:after {\r\n  content: attr(data-tg-on);\r\n  background: #02C66F;\r\n  -webkit-transform: rotateY(-180deg);\r\n          transform: rotateY(-180deg);\r\n}\r\n.tgl-flip + .tgl-btn:before {\r\n  background: #FF3A19;\r\n  content: attr(data-tg-off);\r\n}\r\n.tgl-flip + .tgl-btn:active:before {\r\n  -webkit-transform: rotateY(-20deg);\r\n          transform: rotateY(-20deg);\r\n          height: 28px;\r\n          line-height: 28px;\r\n      \r\n}\r\n.tgl-flip:checked + .tgl-btn:before {\r\n  -webkit-transform: rotateY(180deg);\r\n          transform: rotateY(180deg);\r\n}\r\n.tgl-flip:checked + .tgl-btn:after {\r\n  -webkit-transform: rotateY(0);\r\n          transform: rotateY(0);\r\n  left: 0;\r\n  background: #7FC6A6;\r\n}\r\n.tgl-flip:checked + .tgl-btn:active:after {\r\n  -webkit-transform: rotateY(20deg);\r\n          transform: rotateY(20deg);\r\n}\r\ninput#cb5 {\r\n  display: none;\r\n}\r\ntextarea {border: 1px solid #efefef; width: 100%;padding:5px 10px}\r\ninput[type=\"radio\"]:checked + span {\r\n  color: #fff;\r\n  background-color: #58A7FE;\r\n  border-radius: 5px;\r\n  height: 28px;\r\n\r\n  line-height: 28px;\r\n}\r\ninput[type=\"radio\"] + span{\r\n  color: #333;\r\nfont-size: 14px;\r\nfont-weight: 400;\r\n  border-radius: 5px;\r\n  height: 28px;\r\n\r\n  line-height: 28px;\r\n\r\n}\r\n.btn-info, .btn-success, .btn-warning {\r\n  border-radius: 4px;\r\n  height: 28px;\r\n  width: 99px;\r\n  font-size: 14px;\r\n}\r\n.attedit {\r\n  margin-left: 28px;\r\n  cursor: pointer;\r\n}\r\n.checkboxcustom {\r\n  display: block;\r\n  position: relative;\r\n  padding:5px 0 0 35px;\r\n  cursor: pointer;\r\n  font-size: 14px;\r\n  font-weight: 400;\r\n  font-family: \"Poppins\";\r\n}\r\n@media (max-width:992px) {\r\n  .subhead {\r\n    padding: 15px 20px;\r\n  }\r\n  .subbhead h3 {\r\n    margin-bottom: 10px;\r\n  }\r\n  .form-control {\r\n    margin-bottom: 10px;\r\n  }\r\n}\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGF5b3V0L3RlYWNoZXIvY29tcG9uZW50cy90ZWFjaGVyLWF0dGVuZGVuY2UvdGVhY2hlci1hdHRlbmRlbmNlLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxrQkFBa0I7RUFDbEIsd0JBQXdCO0VBQ3hCLHVCQUF1QjtFQUN2QiwwQkFBMEI7VUFDbEIsa0JBQWtCO0VBQzFCLFlBQVk7RUFDWixhQUFhO0VBQ2IsWUFBWTtFQUNaLGlCQUFpQjtFQUNqQixnQkFBZ0I7O0FBRWxCO0FBQ0E7RUFDRSxxQkFBcUI7RUFDckIsd0JBQXdCO0VBQ3hCLFdBQVc7RUFDWCxrQkFBa0I7RUFDbEIsa0JBQWtCO0VBQ2xCLHNCQUFzQjtFQUN0QixpQkFBaUI7RUFDakIsV0FBVztFQUNYLGtCQUFrQjtFQUNsQixNQUFNO0VBQ04sT0FBTztFQUNQLG1DQUFtQztVQUMzQiwyQkFBMkI7RUFDbkMsa0JBQWtCO0FBQ3BCO0FBQ0E7RUFDRSx5QkFBeUI7RUFDekIsbUJBQW1CO0VBQ25CLG1DQUFtQztVQUMzQiwyQkFBMkI7QUFDckM7QUFDQTtFQUNFLG1CQUFtQjtFQUNuQiwwQkFBMEI7QUFDNUI7QUFDQTtFQUNFLGtDQUFrQztVQUMxQiwwQkFBMEI7VUFDMUIsWUFBWTtVQUNaLGlCQUFpQjs7QUFFM0I7QUFDQTtFQUNFLGtDQUFrQztVQUMxQiwwQkFBMEI7QUFDcEM7QUFDQTtFQUNFLDZCQUE2QjtVQUNyQixxQkFBcUI7RUFDN0IsT0FBTztFQUNQLG1CQUFtQjtBQUNyQjtBQUNBO0VBQ0UsaUNBQWlDO1VBQ3pCLHlCQUF5QjtBQUNuQztBQUNBO0VBQ0UsYUFBYTtBQUNmO0FBRUEsVUFBVSx5QkFBeUIsRUFBRSxXQUFXLENBQUMsZ0JBQWdCO0FBRWpFO0VBQ0UsV0FBVztFQUNYLHlCQUF5QjtFQUN6QixrQkFBa0I7RUFDbEIsWUFBWTs7RUFFWixpQkFBaUI7QUFDbkI7QUFFQTtFQUNFLFdBQVc7QUFDYixlQUFlO0FBQ2YsZ0JBQWdCO0VBQ2Qsa0JBQWtCO0VBQ2xCLFlBQVk7O0VBRVosaUJBQWlCOztBQUVuQjtBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLFlBQVk7RUFDWixXQUFXO0VBQ1gsZUFBZTtBQUNqQjtBQUVBO0VBQ0UsaUJBQWlCO0VBQ2pCLGVBQWU7QUFDakI7QUFHQTtFQUNFLGNBQWM7RUFDZCxrQkFBa0I7RUFDbEIsb0JBQW9CO0VBQ3BCLGVBQWU7RUFDZixlQUFlO0VBQ2YsZ0JBQWdCO0VBQ2hCLHNCQUFzQjtBQUN4QjtBQUVBO0VBQ0U7SUFDRSxrQkFBa0I7RUFDcEI7RUFDQTtJQUNFLG1CQUFtQjtFQUNyQjtFQUNBO0lBQ0UsbUJBQW1CO0VBQ3JCO0FBQ0YiLCJmaWxlIjoic3JjL2FwcC9sYXlvdXQvdGVhY2hlci9jb21wb25lbnRzL3RlYWNoZXItYXR0ZW5kZW5jZS90ZWFjaGVyLWF0dGVuZGVuY2UuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi50Z2wtZmxpcCArIC50Z2wtYnRuIHtcclxuICAvKiBwYWRkaW5nOiAycHg7ICovXHJcbiAgdHJhbnNpdGlvbjogYWxsIC4ycyBlYXNlO1xyXG4gIGZvbnQtZmFtaWx5OiBzYW5zLXNlcmlmO1xyXG4gIC13ZWJraXQtcGVyc3BlY3RpdmU6IDEwMHB4O1xyXG4gICAgICAgICAgcGVyc3BlY3RpdmU6IDEwMHB4O1xyXG4gIHdpZHRoOiAxMDBweDtcclxuICBwYWRkaW5nOiAxMHB4OyAgIFxyXG4gIGhlaWdodDogMjhweDtcclxuICBsaW5lLWhlaWdodDogMjhweDtcclxuICBtYXJnaW4tYm90dG9tOiAwO1xyXG4gICBcclxufVxyXG4udGdsLWZsaXAgKyAudGdsLWJ0bjphZnRlciwgLnRnbC1mbGlwICsgLnRnbC1idG46YmVmb3JlIHtcclxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgdHJhbnNpdGlvbjogYWxsIC40cyBlYXNlO1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgLyogbGluZS1oZWlnaHQ6IDJlbTsgKi9cclxuICBmb250LXdlaWdodDogYm9sZDtcclxuICBjb2xvcjogI2ZmZjtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgdG9wOiAwO1xyXG4gIGxlZnQ6IDA7XHJcbiAgLXdlYmtpdC1iYWNrZmFjZS12aXNpYmlsaXR5OiBoaWRkZW47XHJcbiAgICAgICAgICBiYWNrZmFjZS12aXNpYmlsaXR5OiBoaWRkZW47XHJcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xyXG59XHJcbi50Z2wtZmxpcCArIC50Z2wtYnRuOmFmdGVyIHtcclxuICBjb250ZW50OiBhdHRyKGRhdGEtdGctb24pO1xyXG4gIGJhY2tncm91bmQ6ICMwMkM2NkY7XHJcbiAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZVkoLTE4MGRlZyk7XHJcbiAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZVkoLTE4MGRlZyk7XHJcbn1cclxuLnRnbC1mbGlwICsgLnRnbC1idG46YmVmb3JlIHtcclxuICBiYWNrZ3JvdW5kOiAjRkYzQTE5O1xyXG4gIGNvbnRlbnQ6IGF0dHIoZGF0YS10Zy1vZmYpO1xyXG59XHJcbi50Z2wtZmxpcCArIC50Z2wtYnRuOmFjdGl2ZTpiZWZvcmUge1xyXG4gIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGVZKC0yMGRlZyk7XHJcbiAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZVkoLTIwZGVnKTtcclxuICAgICAgICAgIGhlaWdodDogMjhweDtcclxuICAgICAgICAgIGxpbmUtaGVpZ2h0OiAyOHB4O1xyXG4gICAgICBcclxufVxyXG4udGdsLWZsaXA6Y2hlY2tlZCArIC50Z2wtYnRuOmJlZm9yZSB7XHJcbiAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZVkoMTgwZGVnKTtcclxuICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlWSgxODBkZWcpO1xyXG59XHJcbi50Z2wtZmxpcDpjaGVja2VkICsgLnRnbC1idG46YWZ0ZXIge1xyXG4gIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGVZKDApO1xyXG4gICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGVZKDApO1xyXG4gIGxlZnQ6IDA7XHJcbiAgYmFja2dyb3VuZDogIzdGQzZBNjtcclxufVxyXG4udGdsLWZsaXA6Y2hlY2tlZCArIC50Z2wtYnRuOmFjdGl2ZTphZnRlciB7XHJcbiAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZVkoMjBkZWcpO1xyXG4gICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGVZKDIwZGVnKTtcclxufVxyXG5pbnB1dCNjYjUge1xyXG4gIGRpc3BsYXk6IG5vbmU7XHJcbn1cclxuXHJcbnRleHRhcmVhIHtib3JkZXI6IDFweCBzb2xpZCAjZWZlZmVmOyB3aWR0aDogMTAwJTtwYWRkaW5nOjVweCAxMHB4fVxyXG5cclxuaW5wdXRbdHlwZT1cInJhZGlvXCJdOmNoZWNrZWQgKyBzcGFuIHtcclxuICBjb2xvcjogI2ZmZjtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNThBN0ZFO1xyXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcclxuICBoZWlnaHQ6IDI4cHg7XHJcblxyXG4gIGxpbmUtaGVpZ2h0OiAyOHB4O1xyXG59XHJcblxyXG5pbnB1dFt0eXBlPVwicmFkaW9cIl0gKyBzcGFue1xyXG4gIGNvbG9yOiAjMzMzO1xyXG5mb250LXNpemU6IDE0cHg7XHJcbmZvbnQtd2VpZ2h0OiA0MDA7XHJcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xyXG4gIGhlaWdodDogMjhweDtcclxuXHJcbiAgbGluZS1oZWlnaHQ6IDI4cHg7XHJcblxyXG59XHJcblxyXG4uYnRuLWluZm8sIC5idG4tc3VjY2VzcywgLmJ0bi13YXJuaW5nIHtcclxuICBib3JkZXItcmFkaXVzOiA0cHg7XHJcbiAgaGVpZ2h0OiAyOHB4O1xyXG4gIHdpZHRoOiA5OXB4O1xyXG4gIGZvbnQtc2l6ZTogMTRweDtcclxufVxyXG5cclxuLmF0dGVkaXQge1xyXG4gIG1hcmdpbi1sZWZ0OiAyOHB4O1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxufVxyXG5cclxuXHJcbi5jaGVja2JveGN1c3RvbSB7XHJcbiAgZGlzcGxheTogYmxvY2s7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIHBhZGRpbmc6NXB4IDAgMCAzNXB4O1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxuICBmb250LXNpemU6IDE0cHg7XHJcbiAgZm9udC13ZWlnaHQ6IDQwMDtcclxuICBmb250LWZhbWlseTogXCJQb3BwaW5zXCI7XHJcbn1cclxuXHJcbkBtZWRpYSAobWF4LXdpZHRoOjk5MnB4KSB7XHJcbiAgLnN1YmhlYWQge1xyXG4gICAgcGFkZGluZzogMTVweCAyMHB4O1xyXG4gIH1cclxuICAuc3ViYmhlYWQgaDMge1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMTBweDtcclxuICB9XHJcbiAgLmZvcm0tY29udHJvbCB7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xyXG4gIH1cclxufSJdfQ== */"

/***/ }),

/***/ "./src/app/layout/teacher/components/teacher-attendence/teacher-attendence.component.html":
/*!************************************************************************************************!*\
  !*** ./src/app/layout/teacher/components/teacher-attendence/teacher-attendence.component.html ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"wrapper\">\r\n  <div class=\"container-fluid\">\r\n\r\n    <div class=\"pagetitle\">\r\n      <div>\r\n        <h2>Attendance\r\n          <!-- <span>/ Attendance </span> -->\r\n        </h2>\r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"subhead d-flex justify-content-between mt-20\">\r\n      <div>\r\n        <h3>{{className}}</h3>\r\n      </div>\r\n    </div>\r\n\r\n    <!-- <div class=\"subhead justify-content-between mt-20\">\r\n        <div class=\"row algcenter\">\r\n          <div class=\"col-lg-1\">\r\n            <h3></h3>\r\n          </div>\r\n          <div class=\"col-lg-11\">\r\n            <div class=\"row algcenter\">\r\n              <div class=\"col-lg-2\">\r\n                <div> Search Date : </div>\r\n              </div>\r\n              <div class=\"col-lg-2\">\r\n                <div class=\"form-group\">\r\n                  <input type=\"text\" placeholder=\"Search by date\" [(ngModel)]=\"searchDate\" (bsValueChange)=\"getSerchDate()\"\r\n                    showWeekNumbers=\"false\" [maxDate]=\"today\" class=\"form-control\" [bsConfig]=\"dpConfig\" bsDatepicker>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-lg-2\">\r\n                  <div> Search Date : </div>\r\n              </div>\r\n              <div class=\"col-lg-2\">\r\n                <div class=\"form-group\">\r\n                  <select class=\"form-control\" placeholder=\"Serch\" [(ngModel)]=\"serchByClass\" (change)=\"getSerchClass($event)\"\r\n                    id=\"exampleFormControlSelect1\">\r\n                    <option value=\"\">Select class</option>\r\n                    <option *ngFor=\"let classes of classList\" [value]=\"classes.classesID\">{{classes.className}}</option>\r\n                  </select>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-lg-4\">\r\n                <div class=\"row\">\r\n                  <div class=\"col-lg-6\"> <button type=\"submit\" class=\"btn btn-send\" (click)=\"getAttendenceList()\">Search</button>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div> -->\r\n\r\n\r\n    <div class=\"card cardfilter\">\r\n      <!-- <div class=\"col-lg-10\"> -->\r\n      <div class=\"row algcenter\">\r\n        <div class=\"leftfilter\">\r\n          <!-- <div class=\"pr15\">Search Date : </div>\r\n                <input type=\"text\" placeholder=\"Search by date\" [(ngModel)]=\"searchDate\"  (bsValueChange)=\"getSerchDate($event)\"\r\n                  showWeekNumbers=\"false\" [maxDate]=\"today\" class=\"form-control mr15\" [bsConfig]=\"dpConfig\" bsDatepicker>\r\n                  <div class=\"pr15\"> Search Class : </div> -->\r\n          <div class=\"search-date\">\r\n            <div class=\"pr15 label-text\">Search Date : </div>\r\n            <input type=\"text\" placeholder=\"Search by date\" [(ngModel)]=\"searchDate\"\r\n            (bsValueChange)=\"getSerchDate($event)\" showWeekNumbers=\"false\" [maxDate]=\"today\" class=\"form-control mr15\"\r\n              [bsConfig]=\"dpConfig\" bsDatepicker>\r\n          </div>\r\n          <!-- <div class=\"pr15\">\r\n                  <div class=\"form-group\">\r\n                      <select class=\"form-control\" placeholder=\"Serch\" [(ngModel)]=\"serchByClass\" (change)=\"getSerchClass($event)\"\r\n                        id=\"exampleFormControlSelect1\">\r\n                        <option value=\"\">Select class</option>\r\n                        <option *ngFor=\"let classes of classList\" [value]=\"classes.value\">{{classes.label}}</option>\r\n                      </select>\r\n                  </div>\r\n                </div> -->\r\n          <div class=\"search-class\">\r\n            <div class=\"pr15 label-text\"> Search Class : </div>\r\n            <div class=\"pr15\">\r\n              <div class=\"form-group\">\r\n                <select class=\"form-control\" placeholder=\"Serch\" [(ngModel)]=\"serchByClass\"\r\n                  (change)=\"onClickSearch($event)\" id=\"exampleFormControlSelect1\">\r\n                  <option value=\"\">Select class</option>\r\n                  <option *ngFor=\"let classes of classList\" [value]=\"classes.value\">{{classes.label}}</option>\r\n                </select>\r\n              </div>\r\n            </div>\r\n          \r\n          </div>\r\n\r\n          <!-- <div><button type=\"submit\" class=\"btn btn-send\" (click)=\"getAttendenceList()\">Search</button> </div> -->\r\n          <div class=\"filter-buttons\">\r\n            <button type=\"submit\" class=\"btn btn-send\" (click)=\"onClickSearch($event)\">Search</button>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <!-- </div> -->\r\n    </div>\r\n\r\n\r\n\r\n\r\n\r\n    <div class=\"innertable studentListSearch\">\r\n      <div class=\"table-responsive\">\r\n        <table class=\"table\">\r\n          <thead class=\"thead-light\">\r\n            <tr>\r\n              <!-- <th>\r\n                  <label class=\"checkboxcustom\">\r\n                    <input type=\"checkbox\" (click)=\"MarkUnmarkAll($event)\">\r\n                    <span class=\"checkmark\"></span>\r\n                  </label>\r\n                </th> -->\r\n              <!-- <th>Select All</th> -->\r\n              <th>Image</th>\r\n              <!-- <th scope=\"col\">#ID</th> -->\r\n              <th scope=\"col\">Student Name</th>\r\n              <th scope=\"col\">Status</th>\r\n              <th scope=\"col\">Attendance</th>\r\n              <th>Edit Time</th>\r\n              <th>Absent Reason </th>\r\n              <th>Transfer</th>\r\n              <th class=\"text-center\">Break Status</th>\r\n              <th>Break Log</th>\r\n\r\n            </tr>\r\n          </thead>\r\n          <tbody *ngIf=\"studentList.length != 0\">\r\n            <tr *ngFor=\"let students of studentList\">\r\n              <!-- <td>\r\n                  <label class=\"checkboxcustom\">\r\n                    <input type=\"checkbox\" [checked]=\"students.marked\" (click)=\"markAsPresentMultipleStudents(students, $event)\">\r\n                    <span class=\"checkmark\"></span>\r\n                  </label>\r\n                </td> -->\r\n              <td *ngIf=\"students.imagePath != ''\">\r\n                <img src=\"{{students.imagePath}}\" alt=\"\" class=\"img-circle childimg\">\r\n              </td>\r\n              <td *ngIf=\"students.imagePath == ''\">\r\n                <img src=\"assets/img/user.png\" alt=\"\" class=\"img-circle childimg\">\r\n              </td>\r\n              <!-- <td scope=\"row\">{{students.studentID}}</td>  -->\r\n              <td style=\"cursor:pointer\">{{students.studentName}}</td>\r\n              <td> <span *ngIf=\"students.attendenceStatusID == 2\">Attendance Not Done Yet</span>\r\n                <span *ngIf=\"students.attendenceStatusID == 3\">Checked In</span>\r\n                <span *ngIf=\"students.attendenceStatusID == 4\">Checked Out</span>\r\n                <span *ngIf=\"students.attendenceStatusID == 5\">Absent</span>\r\n              <td>\r\n                <div *ngIf=\"students.attendenceStatusID != 4\">\r\n                  <input class=\"tgl tgl-flip\" id=\"cb5\" type=\"checkbox\" />\r\n                  <!-- <label class=\"tgl-btn\" data-tg-off=\"Check in\" data-tg-on=\"Check out\" for=\"cb5\" data-toggle=\"modal\" data-target=\"#checkin\" (click)=\"checkIn(showCheckInn)\"></label> -->\r\n                  <button class=\"btn btn-info attbtn\" *ngIf=\"students.attendenceStatusID == 2\" data-toggle=\"modal\"\r\n                    data-target=\"#checkin\" (click)=\"getStudentDetails(students)\">Check In</button>\r\n                  <button class=\"btn btn-success attbtn\"\r\n                    *ngIf=\"students.attendenceStatusID == 3 && students.breakStatusId != 1\" data-toggle=\"modal\"\r\n                    data-target=\"#checkout\" (click)=\"getStudentDetails(students)\">Check\r\n                    Out</button>\r\n\r\n                  <button class=\"btn btn-success attbtn\" title=\"Student is on break\"\r\n                    *ngIf=\"students.attendenceStatusID == 3 && students.breakStatusId == 1\" disabled\r\n                    style=\"cursor: not-allowed\">Check\r\n                    Out</button>\r\n                </div>\r\n                <div *ngIf=\"(students.attendenceStatusID == 4 || students.attendenceStatusID == 5)\">\r\n                  <!-- <button class=\"btn btn-info\"  data-toggle=\"modal\" title=\"view Attendance details\" data-target=\"#checkinandout\">Submitted </button> -->\r\n                  <!-- <span  data-toggle=\"modal\" data-target=\"#checkinandout\" title=\"view attendance details\"\r\n                     >Submitted</span> -->\r\n                  <button class=\"btn btn-warning attbtn\" [disabled]=\"true\" style=\"cursor:not-allowed\">Submitted</button>\r\n                </div>\r\n              </td>\r\n              <td>\r\n                <div>\r\n                  <a data-toggle=\"modal\" data-target=\"#edittimecheckout\" class=\"attedit\" title=\"Edit checked out time \"\r\n                    *ngIf=\"students.attendenceStatusID == 4\" (click)=\"getEditCheckOutDetails(students)\"><i\r\n                      class=\"fa fa-pencil attend1\"></i></a>\r\n                  <a data-toggle=\"modal\" data-target=\"#edittimecheckin\" class=\"attedit\" title=\"Edit checked in time \"\r\n                    *ngIf=\"students.attendenceStatusID == 3\" (click)=\"getEditCheckinDetails(students)\"><i\r\n                      class=\"fa fa-pencil attend1\"></i></a>\r\n                </div>\r\n              </td>\r\n              <td>\r\n                <div class=\"button-wrap\" *ngIf=\"students.attendenceStatusID == 2 || students.attendenceStatusID == 5\">\r\n                  <!-- <input class=\"btn hidden radio-label\" type=\"button\" (click)=\"getAbsentStudentDetails(students)\" name=\"accept-offers\" id=\"late-button\" data-toggle=\"modal\"\r\n                      data-target=\"#excuse\" /> -->\r\n                  <button class=\"btn btn-success\" data-toggle=\"modal\" data-target=\"#excuse\"\r\n                    (click)=\"getAbsentStudentDetails(students)\">Absent\r\n                  </button>\r\n                  <!-- <label class=\"button-label\" for=\"late-button\">\r\n                      <h1>Absent</h1>\r\n  \r\n                    </label> -->\r\n                </div>\r\n              </td>\r\n              <td>\r\n                <div *ngIf=\"(students.attendenceStatusID == 2 || students.attendenceStatusID == 3)\">\r\n                  <button class=\"btn btn-info attbtn\" *ngIf=\"showTransferButton\"\r\n                    (click)=\"getStudentDetailsForTranfer(students)\">Transfer</button>\r\n                  <button class=\"btn btn-info attbtn\" *ngIf=\"!showTransferButton\" disabled>Transfer</button>\r\n                </div>\r\n              </td>\r\n              <td class=\"text-center\">\r\n                <label for=\"\" *ngIf=\"students.breakStatusId == 1\" style=\"color: #d61313; cursor: pointer\">On\r\n                  Break</label>\r\n              </td>\r\n              <td>\r\n                <a style=\"color: #58A7FE; cursor: pointer\" (click)=\"goToBreak(students)\">View break </a>\r\n\r\n              </td>\r\n\r\n            </tr>\r\n          </tbody>\r\n        </table>\r\n        <div class=\"text-center\">\r\n          <span *ngIf=\"studentList.length == 0 && !loader\">No result found</span>\r\n        </div>\r\n      </div>\r\n      <!-- <div class=\"mainpagination\">\r\n  \r\n          <ul class=\"pagination\" style=\"margin: 0;float: right;\">\r\n            <li class=\"bar_pag\">Showing 1 to 10 of 23 entries </li>\r\n            <li class=\"paginate_button previous disabled\" id=\"example_previous\">\r\n              <i class=\"fa fa-chevron-left\" aria-hidden=\"true\"></i>\r\n            </li>\r\n            <li class=\"paginate_button active\">\r\n              <a href=\"#\" aria-controls=\"example\" data-dt-idx=\"1\" tabindex=\"0\">1</a>\r\n            </li>\r\n            <li class=\"paginate_button \">\r\n              <a href=\"#\" aria-controls=\"example\" data-dt-idx=\"2\" tabindex=\"0\">2</a>\r\n            </li>\r\n            <li class=\"paginate_button next\" id=\"example_next\">\r\n              <i class=\"fa fa-chevron-right\" aria-hidden=\"true\"></i>\r\n            </li >\r\n          </ul>\r\n        </div> -->\r\n\r\n      <p-paginator #atndpage [alwaysShow]=\"false\" [rows]=\"limit\" [totalRecords]=\"totalRecord\" (onPageChange)=\"paginate($event)\">\r\n      </p-paginator>\r\n    </div>\r\n\r\n\r\n    <!-- Absent Modal -->\r\n    <div class=\"modal fade\" id=\"excuse\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"excuseLabel\" aria-hidden=\"true\">\r\n      <div class=\"modal-dialog\" role=\"document\">\r\n        <div class=\"modal-content\">\r\n          <div class=\"modal-header\">\r\n            <h5 class=\"modal-title\" id=\"excuseLabel\">Add Absent Reason</h5>\r\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n              <span aria-hidden=\"true\">&times;</span>\r\n            </button>\r\n          </div>\r\n          <div class=\"modal-body\">\r\n            <form [formGroup]=\"absentForm\">\r\n\r\n              <!-- <label for=\"\">Add Absent Reason</label> -->\r\n              <div class=\"d-flex\">\r\n                <!-- <div class=\"mR-20\">\r\n                  <label>\r\n                    <input name=\"group1\" type=\"radio\" checked />\r\n                    <span>Absent</span>\r\n                  </label>\r\n                </div> -->\r\n\r\n                <!-- <div>\r\n                  <label>\r\n                    <input name=\"group1\" type=\"radio\" />\r\n                    <span>Late</span>\r\n                  </label>\r\n                </div> -->\r\n              </div>\r\n\r\n              <div class=\"row mb-20\">\r\n                <div class=\"col-lg-12\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"\">Absent Due To</label>\r\n                    <!-- <p-multiSelect [options]=\"cars\" formControlName=\"absentreason\"  [panelStyle]=\"{minWidth:'200px'}\" [maxSelectedLabels]=\"5\"></p-multiSelect> -->\r\n                    <select class=\"form-control\" formControlName=\"absentreason\" (change)=\"getAbsentReasonId($event)\"\r\n                      id=\"exampleFormControlSelect1\">\r\n                      <option value=\"\">Select Reason</option>\r\n                      <option *ngFor=\"let reason of absentReasonList\" [value]=\"reason.leaveReasonTypeID\">\r\n                        {{reason.leaveReasonTypeName}}</option>\r\n                    </select>\r\n                    <div *ngIf=\"absentreason.invalid && (absentreason.dirty || absentreason.touched)\"\r\n                      class=\"text-left errormsg\">\r\n                      <span *ngIf=\"absentreason.errors.required\">\r\n                        <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please select reason</span>\r\n                      </span>\r\n                    </div>\r\n                    <div class=\"form-group mt-20\" *ngIf=\"showUndoAbsent\">\r\n                      <label class=\"checkboxcustom \"><input type=\"checkbox\" (click)=\"UndoAbsent($event)\">\r\n                        <span class=\"checkmark\"></span>&nbsp;&nbsp;&nbsp; Undo Absent\r\n                      </label>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n\r\n              <div>\r\n                <!-- <div class=\"checkbox\">\r\n                    <label>\r\n                      <input type=\"checkbox\" value=\"false\">\r\n                      Undo Absent\r\n                    </label>\r\n                  </div> -->\r\n\r\n              </div>\r\n\r\n              <div *ngIf=\"showOtherAbsentReason\">\r\n                <textarea name=\"\" formControlName=\"other\" id=\"\" cols=\"5\" rows=\"10\"\r\n                  placeholder=\"Absent due to\"></textarea>\r\n              </div>\r\n            </form>\r\n          </div>\r\n          <div class=\"modal-footer\">\r\n            <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\r\n            <button type=\"button\" class=\"btn btn-primary\" data-dismiss=\"modal\" [disabled]=\"!absentForm.valid\"\r\n              (click)=\"saveAbsentData()\">Save\r\n              changes</button>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n    <!-- CheckIn Model -->\r\n    <div class=\"modal fade\" id=\"checkin\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"checkinLabel\" aria-hidden=\"true\">\r\n      <div class=\"modal-dialog\" role=\"document\">\r\n        <div class=\"modal-content\">\r\n          <div class=\"modal-header\">\r\n            <h5 class=\"modal-title\" id=\"checkinLabel\">Update Attendance </h5>\r\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n              <span aria-hidden=\"true\">&times;</span>\r\n            </button>\r\n          </div>\r\n          <div class=\"modal-body\">\r\n\r\n            <form [formGroup]=\"checkInForm\">\r\n\r\n\r\n              <div class=\"row mb-20 mt-20\">\r\n                <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"\">Date</label>\r\n                    <!-- <input type=\"datetime\" class=\"form-control\" formControlName=\"indate\" id=\"\" aria-describedby=\"\"\r\n                        placeholder=\"Date\" [attr.disabled]=\"true\"> -->\r\n                    <input type=\"text\" placeholder=\"Date\" formControlName=\"indate\" showWeekNumbers=\"false\"\r\n                      [maxDate]=\"today\" class=\"form-control\" [bsConfig]=\"dpConfig\" bsDatepicker [attr.disabled]=\"true\">\r\n                    <!-- <p-calendar formControlName=\"indate\" styleClass=\"form-control\" ></p-calendar> -->\r\n                    <!-- <div *ngIf=\"indate.invalid && (indate.dirty || indate.touched)\" class=\"text-left errormsg\">\r\n                        <span *ngIf=\"indate.errors.required\">\r\n                          <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please enter date</span>\r\n                        </span>\r\n                      </div> -->\r\n                    <div class=\"form-group\">\r\n\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"\">Class </label>\r\n                    <input type=\"text \" formControlName=\"inclass\" class=\"form-control\" id=\"\" aria-describedby=\"\"\r\n                      [readonly]=\"true\">\r\n                    <div *ngIf=\"inclass.invalid && (inclass.dirty || inclass.touched)\" class=\"text-left errormsg\">\r\n                      <span *ngIf=\"inclass.errors.required\">\r\n                        <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please enter class name</span>\r\n                      </span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"row mb-20 mt-20\">\r\n                <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"\">Drop-off By</label>\r\n                    <!-- <input type=\"text \" class=\"form-control\" id=\"\" aria-describedby=\"\" placeholder=\"Enter First Name\"> -->\r\n                    <div class=\"form-group\">\r\n                      <select class=\"form-control\" formControlName=\"dropby\"\r\n                        (change)=\"getDropOfDropDownValue($event.target.value)\" id=\"exampleFormControlSelect1\">\r\n                        <option value=\"\">Select option</option>\r\n                        <option *ngFor=\"let guardians of guardiansList\" [value]=\"guardians.guardianId\">\r\n                          {{guardians.guardianName}}</option>\r\n\r\n                        <!-- <option value=\"1\">Mark, Cousin</option>\r\n                          <option value=\"1\">By Bus</option>\r\n                          <option value=\"1\">By Cab</option> -->\r\n                      </select>\r\n                      <div *ngIf=\"dropby.invalid && (dropby.dirty || dropby.touched)\" class=\"text-left errormsg\">\r\n                        <span *ngIf=\"dropby.errors.required\">\r\n                          <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please select option from list</span>\r\n                        </span>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"\">Checked-in time</label>\r\n                    <!-- <timepicker formControlName=\"intime\"></timepicker> -->\r\n                    <p-calendar class=\"custom-textbox-checkedin\" styleClass=\"form-control\" formControlName=\"intime\"\r\n                      [timeOnly]=\"true\" hourFormat=\"12\" icon=\"pi pi-clock\" [showIcon]=\"true\"></p-calendar>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </form>\r\n          </div>\r\n          <div class=\"modal-footer\">\r\n            <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\r\n            <button type=\"button\" class=\"btn btn-primary\" data-dismiss=\"modal\" [disabled]=\"!checkInForm.valid\"\r\n              (click)=\"saveCheckInDetails()\">Save\r\n              changes</button>\r\n            <!-- <button type=\"button\" *ngIf=\"!showCheckInn\" class=\"btn btn-primary\" [disabled]=\"!checkInForm.valid\"  data-dismiss=\"modal\" (click)=\"saveCheckOutDetails(showCheckInn)\">Save changes</button> -->\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n    <!-- CheckOut Model -->\r\n\r\n    <div class=\"modal fade\" id=\"checkout\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"checkOutLabel\"\r\n      aria-hidden=\"true\">\r\n      <div class=\"modal-dialog\" role=\"document\">\r\n        <div class=\"modal-content\">\r\n          <div class=\"modal-header\">\r\n            <h5 class=\"modal-title\" id=\"checkoutLabel\">Update Attendance </h5>\r\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n              <span aria-hidden=\"true\">&times;</span>\r\n            </button>\r\n          </div>\r\n          <div class=\"modal-body\">\r\n\r\n            <form [formGroup]=\"checkOutForm\">\r\n              <div class=\"row mb-20 mt-20\">\r\n                <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"\">Date</label>\r\n                    <!-- <input type=\"text \" class=\"form-control\" id=\"\" formControlName=\"outdate\" aria-describedby=\"\"\r\n                        [readOnly]=\"true\"> -->\r\n\r\n                    <input type=\"text\" placeholder=\"Date\" formControlName=\"outdate\" showWeekNumbers=\"false\"\r\n                      [maxDate]=\"today\" class=\"form-control\" [bsConfig]=\"dpConfig\" bsDatepicker [attr.disabled]=\"true\">\r\n                    <div class=\"form-group\">\r\n\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"\">Class </label>\r\n                    <input type=\"text \" formControlName=\"outclass\" class=\"form-control\" id=\"\" aria-describedby=\"\"\r\n                      [readOnly]=\"true\">\r\n                    <!-- <div *ngIf=\"outclass.invalid && (outclass.dirty || outclass.touched)\" class=\"text-left errormsg\">\r\n                          <span *ngIf=\"outclass.errors.required\">\r\n                            <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please enter class name</span>\r\n                          </span>\r\n                        </div>  -->\r\n                  </div>\r\n                </div>\r\n              </div>\r\n\r\n\r\n              <!-- Save checked out form  -->\r\n              <div class=\"row mb-20 mt-20\">\r\n                <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"\">Picked Up By</label>\r\n                    <select class=\"form-control\" formControlName=\"pickupby\"\r\n                      (change)=\"getPickUpDropDownValue($event.target.value)\" id=\"exampleFormControlSelect1\">\r\n                      <option value=\"\">Select option</option>\r\n                      <option *ngFor=\"let guardians of guardiansList\" [value]=\"guardians.guardianId\">\r\n                        {{guardians.guardianName}}</option>\r\n\r\n                      <!-- <option value=\"1\">Mark, Cousin</option>\r\n                        <option value=\"1\">By Bus</option>\r\n                        <option value=\"1\">By Cab</option> -->\r\n                    </select>\r\n                    <div *ngIf=\"pickupby.invalid && (pickupby.dirty || pickupby.touched)\" class=\"text-left errormsg\">\r\n                      <span *ngIf=\"pickupby.errors.required\">\r\n                        <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please select option from list</span>\r\n                      </span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"\">Checked-out time</label>\r\n                    <!-- <timepicker formControlName=\"outtime\"></timepicker> -->\r\n                    <p-calendar styleClass=\"form-control\" class=\"custom-textbox-checkedin\" formControlName=\"outtime\"\r\n                      [timeOnly]=\"true\" hourFormat=\"12\" icon=\"pi pi-clock\" [showIcon]=\"true\"></p-calendar>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </form>\r\n\r\n          </div>\r\n          <div class=\"modal-footer\">\r\n            <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\r\n            <!-- <button type=\"button\" class=\"btn btn-primary\" [disabled]=\"!checkOutForm.valid\" (click)=\"sendDailySheetReport()\">Send\r\n              Dailysheet</button> -->\r\n            <button type=\"button\" class=\"btn btn-primary\" data-dismiss=\"modal\" [disabled]=\"!checkOutForm.valid\"\r\n              (click)=\"saveCheckOutDetails()\">Save\r\n              changes</button>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <!-- Edit Time modal  -->\r\n    <div class=\"modal fade\" id=\"edittime\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"checkinLabel\" aria-hidden=\"true\">\r\n      <div class=\"modal-dialog\" role=\"document\">\r\n        <div class=\"modal-content\">\r\n          <div class=\"modal-header\">\r\n            <h5 class=\"modal-title\" id=\"checkinLabel\">Excuse</h5>\r\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n              <span aria-hidden=\"true\">&times;</span>\r\n            </button>\r\n          </div>\r\n          <div class=\"modal-body\">\r\n\r\n            <form [formGroup]=\"excuseForm\">\r\n              <div class=\"row\">\r\n                <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"\">Student ID</label>\r\n                    <input type=\"text \" class=\"form-control\" formControlName=\"studentid\" id=\"\" aria-describedby=\"\"\r\n                      placeholder=\"#123456\" [attr.disabled]=\"true\">\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"\">Student Name</label>\r\n                    <input type=\"text \" class=\"form-control\" formControlName=\"studentname\" id=\"\" aria-describedby=\"\"\r\n                      placeholder=\"Student Name\">\r\n                    <div *ngIf=\"studentname.invalid && (studentname.dirty || studentname.touched)\"\r\n                      class=\"text-left errormsg\">\r\n                      <span *ngIf=\"studentname.errors.required\">\r\n                        <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please enter student name</span>\r\n                      </span>\r\n                    </div>\r\n                  </div>\r\n\r\n                </div>\r\n              </div>\r\n\r\n              <div class=\"row\">\r\n                <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"\">Start Time</label>\r\n                    <!-- <input type=\"time\" class=\"form-control\" formControlName=\"starttime\" id=\"\" aria-describedby=\"\" placeholder=\"\"> -->\r\n                    <p-calendar [timeOnly]=\"true\" hourFormat=\"12\" class=\"custom-textbox-checkedin\" styleClass=\"form-control\"\r\n                      formControlName=\"starttime\" placeholder=\"Select start time\"></p-calendar>\r\n                    <div *ngIf=\"starttime.invalid && (starttime.dirty || starttime.touched)\" class=\"text-left errormsg\">\r\n                      <span *ngIf=\"starttime.errors.required\">\r\n                        <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please enter start time</span>\r\n                      </span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"\">Until</label>\r\n                    <!-- <input type=\"time\" class=\"form-control\" formControlName=\"endtime\" id=\"\" aria-describedby=\"\" placeholder=\"\"> -->\r\n                    <p-calendar [timeOnly]=\"true\" hourFormat=\"12\" class=\"custom-textbox-checkedin\" styleClass=\"form-control\"\r\n                      formControlName=\"endtime\" placeholder=\"Select end time\"></p-calendar>\r\n                    <div *ngIf=\"endtime.invalid && (endtime.dirty || endtime.touched)\" class=\"text-left errormsg\">\r\n                      <span *ngIf=\"endtime.errors.required\">\r\n                        <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please enter end time</span>\r\n                      </span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </form>\r\n\r\n          </div>\r\n          <div class=\"modal-footer\">\r\n            <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\r\n            <button type=\"submit\" class=\"btn btn-primary\" data-dismiss=\"modal\" disabled=\"!excuseForm.valid\"\r\n              (click)=\"saveExuseData($event)\">Update</button>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n    <!-- Edit Time Checked In -->\r\n\r\n    <div class=\"modal fade\" id=\"edittimecheckin\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"checkinLabel\"\r\n      aria-hidden=\"true\">\r\n      <div class=\"modal-dialog\" role=\"document\">\r\n        <div class=\"modal-content\">\r\n          <div class=\"modal-header\">\r\n            <h5 class=\"modal-title\" id=\"checkinLabel\">Update Attendance </h5>\r\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n              <span aria-hidden=\"true\">&times;</span>\r\n            </button>\r\n          </div>\r\n          <div class=\"modal-body\">\r\n\r\n            <form [formGroup]=\"checkInForm\">\r\n\r\n\r\n              <div class=\"row mb-20 mt-20\">\r\n                <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"\">Date</label>\r\n                    <!-- <input type=\"datetime\" class=\"form-control\" formControlName=\"indate\" id=\"\" aria-describedby=\"\"\r\n                        placeholder=\"Date\" [attr.disabled]=\"true\"> -->\r\n                    <input type=\"text\" placeholder=\"Date\" formControlName=\"indate\" showWeekNumbers=\"false\"\r\n                      [maxDate]=\"today\" class=\"form-control\" [bsConfig]=\"dpConfig\" bsDatepicker [attr.disabled]=\"true\">\r\n                    <!-- <p-calendar formControlName=\"indate\" styleClass=\"form-control\" ></p-calendar> -->\r\n                    <!-- <div *ngIf=\"indate.invalid && (indate.dirty || indate.touched)\" class=\"text-left errormsg\">\r\n                          <span *ngIf=\"indate.errors.required\">\r\n                            <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please enter date</span>\r\n                          </span>\r\n                        </div> -->\r\n                    <div class=\"form-group\">\r\n\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"\">Class </label>\r\n                    <input type=\"text \" formControlName=\"inclass\" class=\"form-control\" id=\"\" aria-describedby=\"\"\r\n                      [readonly]=\"true\">\r\n                    <div *ngIf=\"inclass.invalid && (inclass.dirty || inclass.touched)\" class=\"text-left errormsg\">\r\n                      <span *ngIf=\"inclass.errors.required\">\r\n                        <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please enter class name</span>\r\n                      </span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"row mb-20 mt-20\">\r\n                <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"\">Drop-off By</label>\r\n                    <!-- <input type=\"text \" class=\"form-control\" id=\"\" aria-describedby=\"\" placeholder=\"Enter First Name\"> -->\r\n                    <div class=\"form-group\">\r\n                      <select class=\"form-control\" formControlName=\"dropby\"\r\n                        (change)=\"getDropOfDropDownValue($event.target.value)\" id=\"exampleFormControlSelect1\">\r\n                        <option value=\"\">Select option</option>\r\n                        <option *ngFor=\"let guardians of guardiansList\" [value]=\"guardians.guardianId\">\r\n                          {{guardians.guardianName}}</option>\r\n\r\n                        <!-- <option value=\"1\">Mark, Cousin</option>\r\n                            <option value=\"1\">By Bus</option>\r\n                            <option value=\"1\">By Cab</option> -->\r\n                      </select>\r\n                      <div *ngIf=\"dropby.invalid && (dropby.dirty || dropby.touched)\" class=\"text-left errormsg\">\r\n                        <span *ngIf=\"dropby.errors.required\">\r\n                          <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please select option from list</span>\r\n                        </span>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"\">Checked-in time </label>\r\n                    <!-- <timepicker formControlName=\"intime\"></timepicker> -->\r\n                    <p-calendar class=\"custom-textbox-checkedin\" styleClass=\"form-control\" formControlName=\"intime\"\r\n                      [timeOnly]=\"true\" hourFormat=\"12\" icon=\"pi pi-clock\" [showIcon]=\"true\"></p-calendar>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </form>\r\n          </div>\r\n          <div class=\"modal-footer\">\r\n            <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\r\n            <button type=\"button\" class=\"btn btn-primary\" data-dismiss=\"modal\" [disabled]=\"!checkInForm.valid\"\r\n              (click)=\"updateCheckInDetails()\">Save\r\n              changes</button>\r\n            <!-- <button type=\"button\" *ngIf=\"!showCheckInn\" class=\"btn btn-primary\" [disabled]=\"!checkInForm.valid\"  data-dismiss=\"modal\" (click)=\"saveCheckOutDetails(showCheckInn)\">Save changes</button> -->\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <!-- </div> -->\r\n\r\n    <!-- Edit Time Checked Out -->\r\n\r\n    <!-- last added model for in and out -->\r\n    <div class=\"modal fade\" id=\"edittimecheckout\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"checkoutLabel  \"\r\n      aria-hidden=\"true\">\r\n      <div class=\"modal-dialog\" role=\"document\">\r\n        <div class=\"modal-content\">\r\n          <div class=\"modal-header\">\r\n            <h5 class=\"modal-title\" id=\"checkoutLabel\">Update Attendance </h5>\r\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n              <span aria-hidden=\"true\">&times;</span>\r\n            </button>\r\n          </div>\r\n          <div class=\"modal-body\">\r\n            <ul class=\"nav nav-tabs\" id=\"myTab\" role=\"tablist\">\r\n              <li class=\"nav-item\">\r\n                <a class=\"nav-link active\" id=\"checkout-tab\" (click)=\"getCheckOutTabDetails('checkouttab')\"\r\n                  data-toggle=\"tab\" href=\"#chekoutedit\" role=\"tab\" aria-controls=\"editcheckout1\" aria-selected=\"false\">\r\n                  <!-- <i class=\"fa fa-child\" aria-hidden=\"true\"></i> -->\r\n                  <!-- <img src=\"assets/img/circular-clock.svg\" alt=\"\"> -->\r\n                  Checked out\r\n                </a>\r\n              </li>\r\n              <li class=\"nav-item\">\r\n                <a class=\"nav-link\" id=\"checkin-tab\" (click)=\"getCheckInTabDetails('checkintab')\" data-toggle=\"tab\"\r\n                  href=\"#chekinedit\" role=\"tab\" aria-controls=\"meal\" aria-selected=\"false\">\r\n                  <!-- <i class=\"fa fa-child\" aria-hidden=\"true\"></i> -->\r\n                  <!-- <img src=\"assets/img/restaurant.svg\" alt=\"\"> -->\r\n                  Checked In\r\n                </a>\r\n              </li>\r\n            </ul>\r\n            <div class=\"tab-content\" id=\"myTabContent\">\r\n              <div class=\"tab-pane fade show active\" id=\"chekoutedit\" role=\"tabpanel\" aria-labelledby=\"checkout-tab\">\r\n                <form [formGroup]=\"checkOutForm\">\r\n                  <div class=\"row mb-20 mt-20\">\r\n                    <div class=\"col-lg-6\">\r\n                      <div class=\"form-group\">\r\n                        <label for=\"\">Date</label>\r\n                        <!-- <input type=\"text \" class=\"form-control\" id=\"\" formControlName=\"outdate\" aria-describedby=\"\"\r\n                    [readOnly]=\"true\"> -->\r\n\r\n                        <input type=\"text\" placeholder=\"Date\" formControlName=\"outdate\" showWeekNumbers=\"false\"\r\n                          [maxDate]=\"today\" class=\"form-control\" [bsConfig]=\"dpConfig\" bsDatepicker\r\n                          [attr.disabled]=\"true\">\r\n                        <div class=\"form-group\">\r\n\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                    <div class=\"col-lg-6\">\r\n                      <div class=\"form-group\">\r\n                        <label for=\"\">Class </label>\r\n                        <input type=\"text \" formControlName=\"outclass\" class=\"form-control\" id=\"\" aria-describedby=\"\"\r\n                          [readOnly]=\"true\">\r\n                        <!-- <div *ngIf=\"outclass.invalid && (outclass.dirty || outclass.touched)\" class=\"text-left errormsg\">\r\n                      <span *ngIf=\"outclass.errors.required\">\r\n                        <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please enter class name</span>\r\n                      </span>\r\n                    </div>  -->\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n\r\n\r\n                  <!-- Checked out update -->\r\n                  <div class=\"row mb-20 mt-20\">\r\n                    <div class=\"col-lg-6\">\r\n                      <div class=\"form-group\">\r\n                        <label for=\"\">Picked Up By</label>\r\n                        <select class=\"form-control\" formControlName=\"pickupby\"\r\n                          (change)=\"getPickUpDropDownValue($event.target.value)\" id=\"exampleFormControlSelect1\">\r\n                          <option value=\"\">Select option</option>\r\n                          <option *ngFor=\"let guardians of guardiansList\" [value]=\"guardians.guardianId\">\r\n                            {{guardians.guardianName}}</option>\r\n\r\n                          <!-- <option value=\"1\">Mark, Cousin</option>\r\n                    <option value=\"1\">By Bus</option>\r\n                    <option value=\"1\">By Cab</option> -->\r\n                        </select>\r\n                        <div *ngIf=\"pickupby.invalid && (pickupby.dirty || pickupby.touched)\"\r\n                          class=\"text-left errormsg\">\r\n                          <span *ngIf=\"pickupby.errors.required\">\r\n                            <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please select option from\r\n                              list</span>\r\n                          </span>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                    <div class=\"col-lg-6\">\r\n                      <div class=\"form-group\">\r\n                        <label for=\"\">Checked-out time</label>\r\n                        <p-calendar class=\"custom-textbox-checkedin\" styleClass=\"form-control\" formControlName=\"outtime\"\r\n                          [timeOnly]=\"true\" hourFormat=\"12\" icon=\"pi pi-clock\" [showIcon]=\"true\"></p-calendar>\r\n\r\n                        <!-- <timepicker formControlName=\"outtime\"></timepicker> -->\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </form>\r\n              </div>\r\n\r\n              <div class=\"tab-pane\" id=\"chekinedit\" role=\"tabpanel\" aria-labelledby=\"checkin-tab\">\r\n                <form [formGroup]=\"checkInForm\">\r\n\r\n\r\n                  <div class=\"row mb-20 mt-20\">\r\n                    <div class=\"col-lg-6\">\r\n                      <div class=\"form-group\">\r\n                        <label for=\"\">Date</label>\r\n                        <!-- <input type=\"datetime\" class=\"form-control\" formControlName=\"indate\" id=\"\" aria-describedby=\"\"\r\n                placeholder=\"Date\" [attr.disabled]=\"true\"> -->\r\n                        <input type=\"text\" placeholder=\"Date\" formControlName=\"indate\" showWeekNumbers=\"false\"\r\n                          [maxDate]=\"today\" class=\"form-control\" [bsConfig]=\"dpConfig\" bsDatepicker\r\n                          [attr.disabled]=\"true\">\r\n                        <!-- <p-calendar formControlName=\"indate\" styleClass=\"form-control\" ></p-calendar> -->\r\n                        <!-- <div *ngIf=\"indate.invalid && (indate.dirty || indate.touched)\" class=\"text-left errormsg\">\r\n                  <span *ngIf=\"indate.errors.required\">\r\n                    <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please enter date</span>\r\n                  </span>\r\n                </div> -->\r\n                        <div class=\"form-group\">\r\n\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                    <div class=\"col-lg-6\">\r\n                      <div class=\"form-group\">\r\n                        <label for=\"\">Class </label>\r\n                        <input type=\"text \" formControlName=\"inclass\" class=\"form-control\" id=\"\" aria-describedby=\"\"\r\n                          [readonly]=\"true\">\r\n                        <div *ngIf=\"inclass.invalid && (inclass.dirty || inclass.touched)\" class=\"text-left errormsg\">\r\n                          <span *ngIf=\"inclass.errors.required\">\r\n                            <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please enter class name</span>\r\n                          </span>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"row mb-20 mt-20\">\r\n                    <div class=\"col-lg-6\">\r\n                      <div class=\"form-group\">\r\n                        <label for=\"\">Drop-off By</label>\r\n                        <!-- <input type=\"text \" class=\"form-control\" id=\"\" aria-describedby=\"\" placeholder=\"Enter First Name\"> -->\r\n                        <div class=\"form-group\">\r\n                          <select class=\"form-control\" formControlName=\"dropby\"\r\n                            (change)=\"getDropOfDropDownValue($event.target.value)\" id=\"exampleFormControlSelect1\">\r\n                            <option value=\"\">Select option</option>\r\n                            <option *ngFor=\"let guardians of guardiansList\" [value]=\"guardians.guardianId\">\r\n                              {{guardians.guardianName}}</option>\r\n\r\n                            <!-- <option value=\"1\">Mark, Cousin</option>\r\n                    <option value=\"1\">By Bus</option>\r\n                    <option value=\"1\">By Cab</option> -->\r\n                          </select>\r\n                          <div *ngIf=\"dropby.invalid && (dropby.dirty || dropby.touched)\" class=\"text-left errormsg\">\r\n                            <span *ngIf=\"dropby.errors.required\">\r\n                              <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please select option from\r\n                                list</span>\r\n                            </span>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                    <div class=\"col-lg-6\">\r\n                      <div class=\"form-group\">\r\n                        <label for=\"\">Checked-in time </label>\r\n                        <!-- <timepicker formControlName=\"intime\"></timepicker> -->\r\n                        <p-calendar class=\"custom-textbox-checkedin\" styleClass=\"form-control\" formControlName=\"intime\"\r\n                          [timeOnly]=\"true\" hourFormat=\"12\" icon=\"pi pi-clock\" [showIcon]=\"true\"></p-calendar>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </form>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"modal-footer\">\r\n            <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\r\n            <button type=\"button\" class=\"btn btn-primary\" data-dismiss=\"modal\" [disabled]=\"!checkOutForm.valid\"\r\n              (click)=\"updateCheckInAndOutModal()\">Save\r\n              changes</button>\r\n            <!-- <button type=\"button\" *ngIf=\"!showCheckInn\" class=\"btn btn-primary\" data-dismiss=\"modal\" (click)=\"saveCheckOutDetails(showCheckInn)\">Save changes</button> -->\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n    <!-- Modal for class transfer of student -->\r\n    <div class=\"modal fade\" id=\"transfer\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"checkoutLabel  \"\r\n      aria-hidden=\"true\">\r\n      <div class=\"modal-dialog\" role=\"document\">\r\n        <div class=\"modal-content\">\r\n          <div class=\"modal-header\">\r\n            <h5 class=\"modal-title\" id=\"checkoutLabel\">Transfer Student</h5>\r\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n              <span aria-hidden=\"true\">&times;</span>\r\n            </button>\r\n          </div>\r\n          <div class=\"modal-body\">\r\n            <!-- <form [formGroup]=\"transferForm\"> -->\r\n            <div class=\"d-flex\">\r\n            </div>\r\n            <div class=\"row mb-20\">\r\n              <div class=\"col-lg-12\">\r\n                <div>\r\n                  <label for=\"\">Select Class*</label>\r\n                  <select class=\"form-control\" placeholder=\"Search\" [(ngModel)]=\"selectClass\"\r\n                    id=\"exampleFormControlSelect1\">\r\n                    <option value=\"\">Select class</option>\r\n                    <option *ngFor=\"let classes of transferclasses\" [value]=\"classes.classesID\">{{classes.className}}\r\n                    </option>\r\n                  </select>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div>\r\n            </div>\r\n            <!-- </form> -->\r\n          </div>\r\n          <div class=\"modal-footer\">\r\n            <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\" >Close</button>\r\n            <button type=\"button\" class=\"btn btn-primary\" (click)=\"getStudentClassTransferReport()\">Save\r\n              changes</button>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n\r\n    <ngx-spinner type=\"ball-atom\" size=\"medium\" color=\"#58A7FE\"></ngx-spinner>\r\n    <p-confirmDialog header=\"Confirmation\" icon=\"pi pi-exclamation-triangle\"></p-confirmDialog>\r\n"

/***/ }),

/***/ "./src/app/layout/teacher/components/teacher-attendence/teacher-attendence.component.ts":
/*!**********************************************************************************************!*\
  !*** ./src/app/layout/teacher/components/teacher-attendence/teacher-attendence.component.ts ***!
  \**********************************************************************************************/
/*! exports provided: TeacherAttendenceComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TeacherAttendenceComponent", function() { return TeacherAttendenceComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_services_teacher_api_service_teacher_api_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/services/teacher-api-service/teacher-api.service */ "./src/app/layout/teacher/shared/services/teacher-api-service/teacher-api.service.ts");
/* harmony import */ var _shared_constant__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/constant */ "./src/app/layout/teacher/shared/constant.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _shared_services_error_handler_error_handler_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../shared/services/error-handler/error-handler.service */ "./src/app/shared/services/error-handler/error-handler.service.ts");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var _shared_services_notification_service_notification_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../shared/services/notification-service/notification.service */ "./src/app/shared/services/notification-service/notification.service.ts");
/* harmony import */ var _shared_services_common_common_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../shared/services/common/common.service */ "./src/app/shared/services/common/common.service.ts");
/* harmony import */ var ngx_bootstrap_datepicker__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-bootstrap/datepicker */ "./node_modules/ngx-bootstrap/datepicker/fesm5/ngx-bootstrap-datepicker.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! primeng/api */ "./node_modules/primeng/api.js");
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(primeng_api__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var primeng_paginator__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! primeng/paginator */ "./node_modules/primeng/paginator.js");
/* harmony import */ var primeng_paginator__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(primeng_paginator__WEBPACK_IMPORTED_MODULE_11__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var TeacherAttendenceComponent = /** @class */ (function () {
    function TeacherAttendenceComponent(apiService, fb, error, spinner, confirmationService, notification, commonService, router) {
        this.apiService = apiService;
        this.fb = fb;
        this.error = error;
        this.spinner = spinner;
        this.confirmationService = confirmationService;
        this.notification = notification;
        this.commonService = commonService;
        this.router = router;
        this.cars = [];
        this.transferList = [];
        this.studentList = [];
        this.checkInOutDetails = [];
        this.transferclasses = [];
        this.markedStudentsList = [];
        this.guardiansList = [];
        this.today = new Date();
        this.classList = [];
        this.absentReasonList = [];
        this.mytime = new Date();
        this.showUndoAbsent = false;
        this.loader = true;
        this.tabType = 'checkouttab';
        this.showTransferButton = true;
        this.count = 0;
        this.pageNo = 0;
        this.limit = 10;
        this.totalRecord = 0;
        this.isCurrentDate = true;
        // tslint:disable-next-line:no-input-rename
        this.dpConfig = new ngx_bootstrap_datepicker__WEBPACK_IMPORTED_MODULE_8__["BsDatepickerConfig"]();
    }
    TeacherAttendenceComponent.prototype.ngOnInit = function () {
        this.searchDate = new Date();
        this.searchByDateString = this.commonService.getStringLocalDateTimeFromUTC(this.searchDate);
        this.className = '';
        this.showEditCheckInOutButton = true;
        this.showAbsentButton = false;
        this.showOtherAbsentReason = false;
        // this.dpConfig.showWeekNumbers = false;
        this.dpConfig = Object.assign({}, { containerClass: 'theme-dark-blue' }, { showWeekNumbers: false });
        this.showCheckInn = true;
        this.showStatus = true;
        this.createexcuseForm();
        this.creatCheckInForm();
        this.creatCheckOutForm();
        this.createabsentForm();
        this.creatCheckOutForm();
        // this.getAllClassess();
        this.getAbsentReasonList();
        // this.getAttendenceList();
        this.getTeacherOperationalClasses();
        this.getAllClassessForTransfer();
    };
    TeacherAttendenceComponent.prototype.getSerchDate = function (event) {
        console.log(event);
        this.count++; // this count help to restrct to call multiple time onload this function by bsdatepcker
        if (this.count > 2) {
            this.searchDate = event;
            this.searchByDateString = this.commonService.getStringLocalDateTimeFromUTC(this.searchDate);
            this.classList = [];
            //  this.paginator.changePageToFirst(event);
            this.getTeacherOperationalClasses();
        }
    };
    TeacherAttendenceComponent.prototype.createexcuseForm = function () {
        // this.spinner.hide();
        this.excuseForm = this.fb.group({
            studentid: ['#12333', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            studentname: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            starttime: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            endtime: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]
        });
    };
    TeacherAttendenceComponent.prototype.createabsentForm = function () {
        this.absentForm = this.fb.group({
            absentreason: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            other: ['']
        });
    };
    TeacherAttendenceComponent.prototype.creatCheckInForm = function () {
        this.checkInForm = this.fb.group({
            indate: [this.searchDate, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            inclass: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            dropby: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            intime: [this.mytime, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
        });
    };
    TeacherAttendenceComponent.prototype.creatCheckOutForm = function () {
        this.checkOutForm = this.fb.group({
            outdate: [this.searchDate, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            outclass: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            pickupby: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            outtime: [this.mytime, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
        });
    };
    Object.defineProperty(TeacherAttendenceComponent.prototype, "studentname", {
        // createTransferForm() {
        //   this.transferForm = this.fb.group({
        //     studentid: ['', Validators.required],
        //     fromClassId: ['', Validators.required],
        //     toClassId: ['', Validators.required],
        //     teacherId: ['', Validators.required]
        //   });
        // }
        // getters for components
        // Excuse form
        get: function () { return this.excuseForm.get('studentname'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TeacherAttendenceComponent.prototype, "starttime", {
        get: function () { return this.excuseForm.get('starttime'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TeacherAttendenceComponent.prototype, "endtime", {
        get: function () { return this.excuseForm.get('endtime'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TeacherAttendenceComponent.prototype, "absentreason", {
        // Absent Form
        get: function () { return this.absentForm.get('absentreason'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TeacherAttendenceComponent.prototype, "other", {
        get: function () { return this.absentForm.get('other'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TeacherAttendenceComponent.prototype, "outdate", {
        // Check In Form
        get: function () { return this.checkInForm.get('outdate'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TeacherAttendenceComponent.prototype, "inclass", {
        get: function () { return this.checkInForm.get('inclass'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TeacherAttendenceComponent.prototype, "dropby", {
        get: function () { return this.checkInForm.get('dropby'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TeacherAttendenceComponent.prototype, "indate", {
        // Check Out Form
        get: function () { return this.checkOutForm.get('indate'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TeacherAttendenceComponent.prototype, "outclass", {
        get: function () { return this.checkOutForm.get('outclass'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TeacherAttendenceComponent.prototype, "pickupby", {
        get: function () { return this.checkOutForm.get('pickupby'); },
        enumerable: true,
        configurable: true
    });
    TeacherAttendenceComponent.prototype.getAttendenceList = function () {
        var _this = this;
        this.loader = true;
        this.spinner.show();
        this.showHideAbsentButton();
        this.hideTransferButton();
        this.getAllClassessForTransfer();
        var data = {
            'agencyId': this.commonService.getAgencyId(),
            'classId': this.serchByClass,
            'askedDate': this.searchDate,
            'askedDateString': this.searchByDateString,
            'limit': this.limit,
            'page': this.pageNo
            // this.searchDate === '' ? this.getOnlyDate() : this.searchDate;
        };
        //  this.apiService.getData('../../../../../assets/users.json', null).subscribe(res => {
        //   this.studentList = res.body.data;
        //  });
        this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_2__["TeacherAPIURLs"].GetClassAttendence, data, null).subscribe(function (res) {
            if (res.body.statusCode === 200) {
                _this.totalRecord = res.body.totalRows;
                _this.studentList = res.body.data;
                if (res.body.data.length > 0) {
                    _this.className = res.body.data[0].className;
                    _this.studentId = res.body.data[0].studentID;
                    _this.getAllClassessForTransfer();
                }
            }
            else {
                _this.spinner.hide();
                _this.error.unknownError();
            }
            _this.spinner.hide();
        }, function (err) {
            _this.spinner.hide();
            _this.error.commonError(err);
        });
    };
    TeacherAttendenceComponent.prototype.onClickSearch = function (event) {
        this.pageNo = 0;
        this.paginator.changePageToFirst(event);
        this.getAttendenceList();
    };
    TeacherAttendenceComponent.prototype.paginate = function (event) {
        this.pageNo = event.page;
        // this.limit = event.page;
        this.getAttendenceList();
    };
    TeacherAttendenceComponent.prototype.getTeacherOperationalClasses = function () {
        var _this = this;
        this.classList = [];
        this.spinner.show();
        var data = {
            'agencyID': this.commonService.getAgencyId(),
            'askingDate': this.searchDate,
            'teacherID': this.commonService.getReleventUserId('userdetails'),
        };
        this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_2__["TeacherAPIURLs"].GetTeacherOperationalClasses, data, null).subscribe(function (res) {
            _this.spinner.hide();
            if (res.body.statusCode === 200) {
                _this.classList = res.body.data;
                if (_this.classList.length !== 0) {
                    _this.serchByClass = _this.classList[0].value;
                }
                else {
                    _this.serchByClass = '';
                    //   this.notification.info({message: 'It seems like you have not checked-in into the class yet', title: '' });
                }
                _this.getAttendenceList();
            }
            else {
                _this.spinner.hide();
                _this.error.unknownError();
            }
        }, function (err) {
            _this.spinner.hide();
            _this.error.commonError(err);
        });
    };
    TeacherAttendenceComponent.prototype.getAllClassess = function () {
        var _this = this;
        this.spinner.show();
        var data = {
            'agencyID': this.commonService.getAgencyId()
        };
        this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_2__["TeacherAPIURLs"].GetAllClasses, data, null).subscribe(function (res) {
            _this.spinner.hide();
            if (res.body.statusCode === 200) {
                _this.classList = res.body.data;
                if (_this.classList.length !== 0) {
                    _this.serchByClass = _this.classList[0].classesID;
                }
                _this.getAttendenceList();
            }
            else {
                _this.spinner.hide();
                _this.error.unknownError();
            }
        }, function (err) {
            _this.spinner.hide();
            _this.error.commonError(err);
        });
    };
    TeacherAttendenceComponent.prototype.getAbsentReasonList = function () {
        var _this = this;
        var data = {
            'agencyID': this.commonService.getAgencyId()
        };
        this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_2__["TeacherAPIURLs"].GetAllLeaveReasonType, data, null).subscribe(function (res) {
            _this.absentReasonList = res.body.data;
        }, function (err) {
            _this.spinner.hide();
            _this.error.commonError(err);
        });
    };
    TeacherAttendenceComponent.prototype.getAbsentReasonId = function (event) {
        if (this.absentForm.value.absentreason === '6') {
            this.showOtherAbsentReason = true;
        }
        else {
            this.showOtherAbsentReason = false;
        }
    };
    TeacherAttendenceComponent.prototype.getCheckInOutDetails = function (data) {
    };
    // Save check in status
    TeacherAttendenceComponent.prototype.saveCheckInDetails = function () {
        // this.showCheckInn = false;
        //  this.showStatus = true;
        var _this = this;
        var data = {
            'AgencyID': this.commonService.getAgencyId(),
            'StudentID': this.studentId,
            'ClassName': this.checkInForm.value.inclass,
            'Date': this.searchDate,
            'IsEditModeOn': this.consideredAttendenceId === 0 || this.consideredAttendenceId === undefined ? false : true,
            'DropedById': this.checkInForm.value.dropby,
            'AttendenceStatusID': 3,
            'ClassesID': this.serchByClass,
            'AttendanceDate': this.searchDate,
            'Id': this.consideredAttendenceId,
            'checkInTime': this.checkInForm.value.intime,
            'createdBy': this.commonService.getLoggedInUserId()
        };
        this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_2__["TeacherAPIURLs"].CheckInAttendenceStudent, data, null).subscribe(function (res) {
            if (res.body.isSuccess === true) {
                _this.getAttendenceList();
                _this.notification.success({ message: 'Checked in succsessfully', title: '' });
            }
            else {
                _this.spinner.hide();
                _this.error.unknownError();
            }
        }, function (err) {
            _this.spinner.hide();
            _this.error.commonError(err);
        });
    };
    // Edit check in status
    TeacherAttendenceComponent.prototype.updateCheckInDetails = function () {
        var _this = this;
        var data = {
            'AgencyID': this.commonService.getAgencyId(),
            'StudentID': this.studentId,
            'ClassName': this.checkInForm.value.inclass,
            'Date': this.checkInForm.value.indate,
            'IsEditModeOn': true,
            'DropedById': this.checkInForm.value.dropby,
            'AttendenceStatusID': 3,
            'ClassesID': this.serchByClass,
            'AttendanceDate': this.searchDate,
            'Id': this.consideredAttendenceId,
            'checkInTime': this.checkInForm.value.intime,
            'updatedBy': this.commonService.getLoggedInUserId()
        };
        this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_2__["TeacherAPIURLs"].CheckInAttendenceStudent, data, null).subscribe(function (res) {
            if (res.body.isSuccess === true) {
                _this.getAttendenceList();
                _this.notification.success({ message: 'Checked in details updated succsessfully', title: '' });
            }
            else {
                _this.spinner.hide();
                _this.error.unknownError();
            }
        }, function (err) {
            _this.spinner.hide();
            _this.error.commonError(err);
        });
    };
    // Save check out status
    TeacherAttendenceComponent.prototype.saveCheckOutDetails = function () {
        //  this.showCheckInn = false;
        //  this.showStatus = false;
        var _this = this;
        var data = {
            'AgencyID': this.commonService.getAgencyId(),
            'StudentID': this.studentId,
            'ClassName': this.checkOutForm.value.outclass,
            'Date': this.checkOutForm.value.outdate,
            'IsEditModeOn': true,
            'PickupById': this.checkOutForm.value.pickupby,
            'AttendenceStatusID': 4,
            'ClassesID': this.serchByClass,
            'AttendanceDate': this.searchDate,
            'Id': this.consideredAttendenceId,
            'CheckOutTime': this.checkOutForm.value.outtime,
            'updatedBy': this.commonService.getLoggedInUserId()
        };
        this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_2__["TeacherAPIURLs"].CheckOutAttendenceStudent, data, null).subscribe(function (res) {
            if (res.body.isSuccess === true) {
                _this.sendDailySheetReport();
                _this.notification.success({ message: 'Checked out succsessfully', title: '' });
            }
            else {
                _this.spinner.hide();
                _this.error.unknownError();
            }
        }, function (err) {
            _this.spinner.hide();
            _this.error.commonError(err);
        });
    };
    // Save check out status
    TeacherAttendenceComponent.prototype.UpdateCheckOutDetails = function () {
        var _this = this;
        //  this.showCheckInn = false;
        //  this.showStatus = false;
        var data = {
            'AgencyID': this.commonService.getAgencyId(),
            'StudentID': this.studentId,
            'ClassName': this.checkOutForm.value.outclass,
            'Date': this.checkOutForm.value.outdate,
            'IsEditModeOn': true,
            'PickupById': this.checkOutForm.value.pickupby,
            'AttendenceStatusID': 4,
            'ClassesID': this.serchByClass,
            'AttendanceDate': this.searchDate,
            'Id': this.consideredAttendenceId,
            'CheckOutTime': this.checkOutForm.value.outtime,
            'updatedBy': this.commonService.getLoggedInUserId()
        };
        this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_2__["TeacherAPIURLs"].CheckOutAttendenceStudent, data, null).subscribe(function (res) {
            if (res.body.isSuccess === true) {
                _this.getAttendenceList();
                _this.notification.success({ message: 'Checked out details updated succsessfully', title: '' });
            }
            else {
                _this.error.unknownError();
            }
        }, function (err) { return _this.error.commonError(err); });
    };
    TeacherAttendenceComponent.prototype.saveExuseData = function (event) {
        alert('excuse');
    };
    TeacherAttendenceComponent.prototype.saveAbsentData = function () {
        var _this = this;
        var data = {
            'Id': ((this.consideredAttendenceId === undefined || this.consideredAttendenceId === null) ? 0 : this.consideredAttendenceId),
            'agencyID': this.commonService.getAgencyId(),
            'studentID': this.studentId,
            'reasonId': this.undoAbsentBtn ? 0 : this.absentForm.value.absentreason,
            'onLeave': this.undoAbsentBtn ? false : true,
            'onLeaveComment': this.absentForm.value.other,
            'attendenceStatusID': this.undoAbsentBtn ? 2 : 5,
            'AttendanceDate': this.searchDate,
            'ClassesID': this.serchByClass,
            'createdBy': (this.consideredAttendenceId === undefined ||
                this.consideredAttendenceId === null) ? this.commonService.getLoggedInUserId() : null,
            'updatedBy': (this.consideredAttendenceId === undefined ||
                this.consideredAttendenceId === null) ? null : this.commonService.getLoggedInUserId()
        };
        this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_2__["TeacherAPIURLs"].AbsentAttendenceStudent, data, null).subscribe(function (res) {
            if (res.body.statusCode === 200) {
                _this.consideredAttendenceId = res.body.saveId;
                _this.notification.success({
                    message: _this.undoAbsentBtn ? 'Unmarked student as absent succsessfully' :
                        'Marked student as absent succsessfully', title: ''
                });
                _this.getAttendenceList();
            }
            else {
                _this.error.unknownError();
            }
        }, function (err) {
            _this.spinner.hide();
            _this.error.commonError(err);
        });
    };
    // Get check in Out Details
    TeacherAttendenceComponent.prototype.getStudentDetails = function (data) {
        var _this = this;
        this.clearCheckinForm();
        this.clearCheckOutForm();
        this.checkInOutDetails = data;
        this.studentId = data.studentID;
        this.consideredAttendenceId = data.id;
        var req = {
            'studentID': this.studentId,
            'agencyID': this.commonService.getAgencyId(),
            'classID': this.serchByClass,
            'isAuthorized': true
        };
        this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_2__["TeacherAPIURLs"].GetAllGuardiansForStudents, req, null).subscribe(function (res) {
            if (res.body.statusCode === 200) {
                _this.guardiansList = res.body.data;
            }
            else {
                _this.error.unknownError();
            }
        }, function (err) {
            _this.spinner.hide();
            _this.error.commonError(err);
        });
        // this.guardiansList = data.associatedGuardians;
        // const date = this.commonService.GetFormattedDate(data.date);
        this.checkInForm.controls['indate'].setValue(this.searchDate);
        this.checkInForm.controls['inclass'].setValue(data.className);
        this.checkOutForm.controls['outdate'].setValue(this.searchDate);
        this.checkOutForm.controls['outclass'].setValue(data.className);
    };
    TeacherAttendenceComponent.prototype.getEditCheckinDetails = function (data) {
        var _this = this;
        $('.modal').on('hidden.bs.modal', function () {
            $('.modal-body1').html('');
        });
        var studentArray;
        this.clearCheckinForm();
        this.checkInOutDetails = data;
        this.studentId = data.studentID;
        this.consideredAttendenceId = data.id;
        this.studentList.forEach(function (res) {
            if (res.studentID === data.studentID) {
                studentArray = res;
            }
        });
        // const date = this.commonService.GetFormattedDate(data.date);
        var req = {
            'studentID': this.studentId,
            'agencyID': this.commonService.getAgencyId(),
            'classID': this.serchByClass,
            'isAuthorized': true
        };
        this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_2__["TeacherAPIURLs"].GetAllGuardiansForStudents, req, null).subscribe(function (res) {
            if (res.body.statusCode === 200) {
                _this.guardiansList = res.body.data;
            }
            else {
                _this.error.unknownError();
            }
        }, function (err) {
            _this.spinner.hide();
            _this.error.commonError(err);
        });
        this.guardiansList = data.associatedGuardians;
        this.checkInForm.controls['dropby'].setValue(studentArray.dropedById);
        this.checkInForm.controls['indate'].setValue(this.searchDate);
        this.checkInForm.controls['inclass'].setValue(studentArray.className);
        this.checkInForm.controls['intime'].setValue(this.commonService.getLocalDateTimeFromUTC(studentArray.checkInTime));
    };
    TeacherAttendenceComponent.prototype.getEditCheckOutDetails = function (data) {
        var _this = this;
        $('#checkout-tab').tab('show');
        this.clearCheckOutForm();
        var studentArray;
        this.studentId = data.studentID;
        this.consideredAttendenceId = data.id;
        this.studentList.forEach(function (res) {
            if (res.studentID === data.studentID) {
                studentArray = res;
            }
        });
        var req = {
            'studentID': this.studentId,
            'agencyID': this.commonService.getAgencyId(),
            'classID': this.serchByClass,
            'isAuthorized': true
        };
        this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_2__["TeacherAPIURLs"].GetAllGuardiansForStudents, req, null).subscribe(function (res) {
            if (res.body.statusCode === 200) {
                _this.guardiansList = res.body.data;
            }
            else {
                _this.error.unknownError();
            }
        }, function (err) {
            _this.spinner.hide();
            _this.error.commonError(err);
        });
        this.guardiansList = data.associatedGuardians;
        // const date = this.commonService.GetFormattedDate(data.date);
        this.checkOutForm.controls['pickupby'].setValue(studentArray.pickupById);
        this.checkOutForm.controls['outdate'].setValue(this.searchDate);
        this.checkOutForm.controls['outclass'].setValue(studentArray.className);
        this.checkOutForm.controls['outtime'].setValue(this.commonService.getLocalDateTimeFromUTC(studentArray.checkOutTime));
    };
    // Mark multiple students as present
    TeacherAttendenceComponent.prototype.markAsPresentMultipleStudents = function (data, event) {
        if (event.target.checked) {
            data.marked = true;
            this.markedStudentsList.push(data);
        }
        else if (event.target.checked === false) {
            var index = this.markedStudentsList.findIndex(function (r) { return r.studentId === data.studentId; });
            this.markedStudentsList.splice(index, 1);
        }
    };
    // Select or unselect all students
    TeacherAttendenceComponent.prototype.MarkUnmarkAll = function (event) {
        var _this = this;
        if (event.target.checked) {
            this.studentList.forEach(function (element) {
                element.marked = true;
                _this.markedStudentsList.push(element);
            });
        }
        else if (event.target.checked === false) {
            this.studentList.forEach(function (element) {
                element.marked = false;
            });
            this.markedStudentsList = [];
        }
    };
    // Method to save multiple student status at a time
    TeacherAttendenceComponent.prototype.saveMarkedAsPresentStudents = function () {
        var sendMarkedStudentList = [];
        this.markedStudentsList.forEach(function (element) {
            if (element.marked === true) {
                sendMarkedStudentList.push(element);
            }
        });
        if (sendMarkedStudentList.length > 0) {
        }
        else {
            this.notification.info({ message: 'Please select students', title: '' });
        }
    };
    TeacherAttendenceComponent.prototype.getPegination = function () {
        var totalPages = Math.ceil(this.studentList.length / this.pageSize);
    };
    // get Selected guardian id
    TeacherAttendenceComponent.prototype.getDropOfDropDownValue = function (value) {
        this.checkInForm.controls['dropby'].setValue(value);
    };
    TeacherAttendenceComponent.prototype.getPickUpDropDownValue = function (value) {
        this.checkOutForm.controls['pickupby'].setValue(value);
    };
    // Method to get only date
    TeacherAttendenceComponent.prototype.getOnlyDate = function (date) {
        var todayDate = new Date(date);
        todayDate.setHours(0, 0, 0, 0);
        return todayDate;
    };
    TeacherAttendenceComponent.prototype.showHideAbsentButton = function () {
        if (this.searchDate !== '' && this.searchDate !== undefined && this.searchDate !== null) {
            if (this.getOnlyDate(this.searchDate) < this.getOnlyDate(this.today)) {
                this.showAbsentButton = true;
                this.showEditCheckInOutButton = false;
            }
            else {
                this.showAbsentButton = false;
                this.showEditCheckInOutButton = true;
            }
        }
        else {
            this.showAbsentButton = false;
            this.showEditCheckInOutButton = true;
        }
    };
    TeacherAttendenceComponent.prototype.getAbsentStudentDetails = function (data) {
        this.clearAbsentReasonForm();
        this.studentId = data.studentID;
        this.consideredAttendenceId = data.id;
        this.guardiansList = data.associatedGuardians;
        this.absentForm.controls['absentreason'].setValue(data.reasonId ? data.reasonId : '');
        this.absentForm.controls['other'].setValue(data.onLeaveComment);
        if (data.attendenceStatusID === 5) {
            this.showUndoAbsent = true;
        }
        else {
            this.showUndoAbsent = false;
        }
        var date = this.commonService.GetFormattedDate(data.date);
    };
    // Check for unmarked student as absent
    TeacherAttendenceComponent.prototype.UndoAbsent = function (event) {
        if (event.target.checked === true) {
            this.undoAbsentBtn = true;
        }
        else {
            this.undoAbsentBtn = false;
        }
    };
    TeacherAttendenceComponent.prototype.clearCheckinForm = function () {
        this.creatCheckInForm();
    };
    TeacherAttendenceComponent.prototype.clearCheckOutForm = function () {
        this.creatCheckOutForm();
    };
    TeacherAttendenceComponent.prototype.getCheckInTabDetails = function (value) {
        var _this = this;
        this.tabType = value;
        var studentArray;
        if (value === 'checkintab') {
            this.studentList.forEach(function (res) {
                if (res.studentID === _this.studentId) {
                    studentArray = res;
                }
            });
            // const date = this.commonService.GetFormattedDate(data.date);
            var req = {
                'studentID': this.studentId,
                'agencyID': this.commonService.getAgencyId(),
                'classID': this.serchByClass,
                'isAuthorized': true
            };
            this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_2__["TeacherAPIURLs"].GetAllGuardiansForStudents, req, null).subscribe(function (res) {
                if (res.body.statusCode === 200) {
                    _this.guardiansList = res.body.data;
                }
                else {
                    _this.error.unknownError();
                }
            }, function (err) {
                _this.spinner.hide();
                _this.error.commonError(err);
            });
            //   this.guardiansList = data.associatedGuardians;
            this.checkInForm.controls['dropby'].setValue(studentArray.dropedById);
            this.checkInForm.controls['indate'].setValue(this.searchDate);
            this.checkInForm.controls['inclass'].setValue(studentArray.className);
            this.checkInForm.controls['intime'].setValue(this.commonService.getLocalDateTimeFromUTC(studentArray.checkInTime));
        }
    };
    TeacherAttendenceComponent.prototype.getCheckOutTabDetails = function (type) {
        this.tabType = type;
    };
    TeacherAttendenceComponent.prototype.updateCheckInAndOutModal = function () {
        if (this.tabType === 'checkintab') {
            this.updateCheckInDetails();
        }
        else if (this.tabType === 'checkouttab') {
            this.UpdateCheckOutDetails();
        }
        else {
        }
    };
    TeacherAttendenceComponent.prototype.goToBreak = function (values) {
        var allowedit = false;
        if (values.attendenceStatusID > 2 && values.attendenceStatusID !== 5) {
            if (this.searchDate < this.today) {
                allowedit = false;
            }
            else {
                allowedit = true;
            }
            var navigationExtras = {
                queryParams: {
                    'Name': values.studentName,
                    'ImagePath': values.imagePath,
                    'Date': this.searchDate,
                    'attendenceStatusID': values.attendenceStatusID
                }
            };
            this.router.navigate(['./home/teacherdashboard/studentbreaks', values.studentID, values.id, allowedit], navigationExtras);
        }
    };
    TeacherAttendenceComponent.prototype.getAllClassessForTransfer = function () {
        var _this = this;
        this.spinner.show();
        var data = {
            'agencyID': this.commonService.getAgencyId(),
            'ClassID': this.serchByClass
        };
        this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_2__["TeacherAPIURLs"].GetAllClassesForStudentAttendenceTransfer, data, null).subscribe(function (res) {
            _this.spinner.hide();
            if (res.body.statusCode === 200) {
                _this.transferclasses = res.body.data;
                // if (this.transferclasses.length !== 0) {
                //   this.selectClass = this.transferclasses[0].classesID;
                // }
            }
            else {
                _this.spinner.hide();
                _this.error.unknownError();
            }
        }, function (err) {
            _this.spinner.hide();
            _this.error.commonError(err);
        });
    };
    TeacherAttendenceComponent.prototype.clearAbsentReasonForm = function () {
        this.showOtherAbsentReason = false;
        this.createabsentForm();
    };
    // getStudentClassTransferReport1() {
    //   this.loader = true;
    //   this.transferList = [];
    //   if (this.selectClass === null || this.selectClass === '' || this.selectClass === undefined) {
    //     this.notification.warning({ message: 'Please select valid class', title: '' });
    //   } else {
    //     this.spinner.show();
    //     const data = {
    //       'agencyID': this.commonService.getAgencyId(),
    //       'studentID': this.studentId,
    //       'fromClassID': this.serchByClass,
    //       'toClassID': this.selectClass,
    //       'teacherID': this.commonService.getReleventUserId('userdetails')
    //     };
    //     this.apiService.postData(TeacherAPIURLs.StudentClassTransferAttendence, data, null).subscribe(res => {
    //       if (res.body.statusCode === 987) {
    //         this.spinner.hide();
    //         this.notification.warning({ message: 'Student already exist in selected class', title: '' });
    //       } else if (res.body.statusCode === 200) {
    //           this.spinner.hide();
    //           this.transferList = res.body.data;
    //           this.getAttendenceList();
    //           this.notification.success({ message: 'Student has been transferred', title: '' });
    //           $('#transfer').modal('hide');
    //         }   else {
    //           this.spinner.hide();
    //           this.error.unknownError();
    //         }
    //         this.loader = false;
    //       }, err => {
    //         this.spinner.hide();
    //         this.error.commonError(err);
    //       });
    //     }
    //   }
    TeacherAttendenceComponent.prototype.getStudentClassTransferReport = function () {
        var _this = this;
        this.loader = true;
        this.transferList = [];
        if (this.selectClass === null || this.selectClass === '' || this.selectClass === undefined) {
            this.notification.warning({ message: 'Please select valid class', title: '' });
        }
        else {
            this.spinner.show();
            var data = {
                'agencyID': this.commonService.getAgencyId(),
                'studentID': this.studentId,
                'fromClassID': this.serchByClass,
                'toClassID': this.selectClass,
                'teacherID': this.commonService.getReleventUserId('userdetails')
            };
            this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_2__["TeacherAPIURLs"].StudentClassTransferAttendence, data, null).subscribe(function (res) {
                if (res.body.statusCode === 200 && !res.body.transferwithcheckout) {
                    _this.spinner.hide();
                    _this.transferList = res.body.data;
                    _this.getAttendenceList();
                    _this.notification.success({ message: 'Student has been transferred', title: '' });
                    $('#transfer').modal('hide');
                    //  this.createTransferForm();
                }
                else if (res.body.statusCode === 987) {
                    _this.spinner.hide();
                    _this.notification.warning({ message: 'Student already exist in selected class', title: '' });
                }
                else if (res.body.statusCode === 200 && res.body.transferwithcheckout) {
                    _this.spinner.hide();
                    _this.transferList = res.body.data;
                    //  this.getAttendenceList();
                    _this.notification.success({ message: 'Student has been transferred', title: '' });
                    $('#transfer').modal('hide');
                    _this.sendDailySheetReport();
                    //  this.createTransferForm();
                }
                else {
                    _this.spinner.hide();
                    _this.error.unknownError();
                }
                _this.loader = false;
            }, function (err) {
                _this.spinner.hide();
                _this.error.commonError(err);
            });
        }
    };
    TeacherAttendenceComponent.prototype.hideTransferButton = function () {
        if (new Date(this.searchDate).toDateString() !== (this.today).toDateString()) {
            this.showTransferButton = false;
        }
        else {
            this.showTransferButton = true;
        }
    };
    TeacherAttendenceComponent.prototype.getStudentDetailsForTranfer = function (data) {
        this.selectClass = '';
        this.studentId = data.studentID;
        $('#transfer').modal('show');
    };
    TeacherAttendenceComponent.prototype.sendDailySheetReport = function () {
        var _this = this;
        this.confirmationService.confirm({
            message: 'Do you want to send the daily activity report?',
            accept: function () {
                _this.sendDailySheetReportSuccess();
            },
            reject: function () {
                _this.getAttendenceList();
            }
        });
    };
    TeacherAttendenceComponent.prototype.sendDailySheetReportSuccess = function () {
        var _this = this;
        this.spinner.show();
        // const date = this.commonService.GetFormattedDate(data.date);
        var req = {
            'studentID': this.studentId,
            'agencyID': this.commonService.getAgencyId(),
            'classID': this.serchByClass,
            'askedDate': this.searchDate,
            'askedDateString': this.searchByDateString
        };
        this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_2__["TeacherAPIURLs"].GetDailySheetActivityReportByEmail, req, null).subscribe(function (res) {
            if (res.body.statusCode === 200) {
                _this.spinner.hide();
                _this.getAttendenceList();
                _this.notification.success({ message: 'Student Daily sheet details send successfully ', title: '' });
            }
            else if (res.body.statusCode === 987) {
                _this.getAttendenceList();
                _this.notification.warning({ message: 'No activity found ', title: '' });
            }
            else {
                _this.notification.warning({ message: 'Report sending faild! ', title: '' });
                _this.getAttendenceList();
            }
        }, function (err) {
            _this.spinner.hide();
            _this.error.commonError(err);
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('atndpage'),
        __metadata("design:type", primeng_paginator__WEBPACK_IMPORTED_MODULE_11__["Paginator"])
    ], TeacherAttendenceComponent.prototype, "paginator", void 0);
    TeacherAttendenceComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-teacher-attendence',
            template: __webpack_require__(/*! ./teacher-attendence.component.html */ "./src/app/layout/teacher/components/teacher-attendence/teacher-attendence.component.html"),
            styles: [__webpack_require__(/*! ./teacher-attendence.component.css */ "./src/app/layout/teacher/components/teacher-attendence/teacher-attendence.component.css")]
        }),
        __metadata("design:paramtypes", [_shared_services_teacher_api_service_teacher_api_service__WEBPACK_IMPORTED_MODULE_1__["TeacherApiService"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"], _shared_services_error_handler_error_handler_service__WEBPACK_IMPORTED_MODULE_4__["ErrorHandlerService"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_5__["NgxSpinnerService"], primeng_api__WEBPACK_IMPORTED_MODULE_10__["ConfirmationService"],
            _shared_services_notification_service_notification_service__WEBPACK_IMPORTED_MODULE_6__["NotificationService"], _shared_services_common_common_service__WEBPACK_IMPORTED_MODULE_7__["CommonService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_9__["Router"]])
    ], TeacherAttendenceComponent);
    return TeacherAttendenceComponent;
}());



/***/ }),

/***/ "./src/app/layout/teacher/components/teacher-breaks/teacher-breaks.component.css":
/*!***************************************************************************************!*\
  !*** ./src/app/layout/teacher/components/teacher-breaks/teacher-breaks.component.css ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2xheW91dC90ZWFjaGVyL2NvbXBvbmVudHMvdGVhY2hlci1icmVha3MvdGVhY2hlci1icmVha3MuY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/layout/teacher/components/teacher-breaks/teacher-breaks.component.html":
/*!****************************************************************************************!*\
  !*** ./src/app/layout/teacher/components/teacher-breaks/teacher-breaks.component.html ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"wrapper\">\r\n    <div class=\"container-fluid\">\r\n  \r\n      <div class=\"pagetitle\">\r\n        <div>\r\n          <h2>My Breaks\r\n            <!-- <span>/ My Breaks </span> -->\r\n          </h2>\r\n        </div>\r\n      </div>\r\n  \r\n      <!-- <div class=\"subhead d-flex justify-content-between mt-20\">\r\n        <div>\r\n          <h3>{{className}}</h3>\r\n        </div>\r\n      </div> -->\r\n\r\n      <div class=\"card cardfilter\">\r\n          <div class=\"row algcenter\">\r\n              <div class=\"leftfilter\">\r\n                  <div class=\"pr15\">Search Date : </div>\r\n                  <input type=\"text\" placeholder=\"Search by date\" [(ngModel)]=\"searchDate\" \r\n                showWeekNumbers=\"false\" [maxDate]=\"today\" class=\"form-control mr15\" [bsConfig]=\"dpConfig\" bsDatepicker>\r\n                  <div><button type=\"submit\" class=\"btn btn-send\" (click)=\"getBreakLog()\">Search</button> </div>\r\n                </div> \r\n          </div>\r\n        </div> \r\n\r\n        <div class=\"innertable studentListSearch\">\r\n            <div class=\"table-responsive\">\r\n              <table class=\"table\">\r\n                <thead class=\"thead-light\">\r\n                  <tr>\r\n                    <th scope=\"col\">Break-Out Time</th>\r\n                    <th scope=\"col\">Break-In Time</th>\r\n                    <th scope=\"col\">Reason</th>\r\n                  </tr>\r\n                </thead>\r\n                <tbody>\r\n                  <tr *ngFor=\"let brek of breakList\">\r\n                      <!-- {{brek.breakOutTime|date: 'h:mm a'}} -->\r\n                    <td >\r\n                      {{brek.breakOut | formattedTime}}\r\n                    </td>\r\n                    <td *ngIf=\"brek.breakStatusID != 2\">\r\n                       --\r\n                    </td>\r\n                    <td *ngIf=\"brek.breakStatusID == 2\">\r\n                      {{brek.breakIn| formattedTime}}\r\n                    </td>\r\n                    <td>\r\n                      {{brek.breakReason}}\r\n                    </td>\r\n                  </tr>\r\n                </tbody>\r\n              </table>\r\n              <div class=\"text-center\">\r\n                <span *ngIf=\"!breakList\">No result found</span>\r\n              </div>\r\n            </div>\r\n          </div>\r\n    </div>\r\n      </div>\r\n\r\n      <ngx-spinner type=\"ball-atom\" size=\"medium\" color=\"#58A7FE\"></ngx-spinner>"

/***/ }),

/***/ "./src/app/layout/teacher/components/teacher-breaks/teacher-breaks.component.ts":
/*!**************************************************************************************!*\
  !*** ./src/app/layout/teacher/components/teacher-breaks/teacher-breaks.component.ts ***!
  \**************************************************************************************/
/*! exports provided: TeacherBreaksComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TeacherBreaksComponent", function() { return TeacherBreaksComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_services_teacher_api_service_teacher_api_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/services/teacher-api-service/teacher-api.service */ "./src/app/layout/teacher/shared/services/teacher-api-service/teacher-api.service.ts");
/* harmony import */ var _shared_services_error_handler_error_handler_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../shared/services/error-handler/error-handler.service */ "./src/app/shared/services/error-handler/error-handler.service.ts");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var _shared_services_notification_service_notification_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../shared/services/notification-service/notification.service */ "./src/app/shared/services/notification-service/notification.service.ts");
/* harmony import */ var _shared_services_common_common_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../shared/services/common/common.service */ "./src/app/shared/services/common/common.service.ts");
/* harmony import */ var _shared_constant__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../shared/constant */ "./src/app/layout/teacher/shared/constant.ts");
/* harmony import */ var ngx_bootstrap__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-bootstrap */ "./node_modules/ngx-bootstrap/esm5/ngx-bootstrap.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var TeacherBreaksComponent = /** @class */ (function () {
    function TeacherBreaksComponent(apiService, error, spinner, notification, commonService) {
        this.apiService = apiService;
        this.error = error;
        this.spinner = spinner;
        this.notification = notification;
        this.commonService = commonService;
        this.breakList = [];
        this.searchDate = new Date();
        this.today = new Date();
        this.dpConfig = new ngx_bootstrap__WEBPACK_IMPORTED_MODULE_7__["BsDatepickerConfig"]();
    }
    TeacherBreaksComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dpConfig = Object.assign({}, { containerClass: 'theme-dark-blue' }, { showWeekNumbers: false });
        this.commonService.getTeacherBreakLogAPI().subscribe(function (name) {
            _this.getBreakLog();
            // console.log('nm', this.userName);
        });
        this.getBreakLog();
    };
    TeacherBreaksComponent.prototype.getBreakLog = function () {
        var _this = this;
        this.spinner.show();
        var data = {
            'agencyID': this.commonService.getAgencyId(),
            'askingDate': this.searchDate,
            'teacherID': this.commonService.getReleventUserId('userdetails'),
        };
        this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_6__["TeacherAPIURLs"].GetTeacherBreakLog, data, null).subscribe(function (res) {
            if (res.body.statusCode === 200) {
                _this.spinner.hide();
                _this.breakList = res.body.data;
                if (_this.breakList) {
                    _this.breakList.forEach(function (value) {
                        value.breakOut = _this.commonService.getLocalDateTimeFromUTC(value.breakOut);
                        value.breakIn = _this.commonService.getLocalDateTimeFromUTC(value.breakIn);
                    });
                }
            }
            else {
                _this.spinner.hide();
                _this.error.unknownError();
            }
        }, function (err) {
            _this.spinner.hide();
            _this.error.commonError(err);
        });
    };
    TeacherBreaksComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-teacher-breaks',
            template: __webpack_require__(/*! ./teacher-breaks.component.html */ "./src/app/layout/teacher/components/teacher-breaks/teacher-breaks.component.html"),
            providers: [],
            styles: [__webpack_require__(/*! ./teacher-breaks.component.css */ "./src/app/layout/teacher/components/teacher-breaks/teacher-breaks.component.css")]
        }),
        __metadata("design:paramtypes", [_shared_services_teacher_api_service_teacher_api_service__WEBPACK_IMPORTED_MODULE_1__["TeacherApiService"], _shared_services_error_handler_error_handler_service__WEBPACK_IMPORTED_MODULE_2__["ErrorHandlerService"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_3__["NgxSpinnerService"], _shared_services_notification_service_notification_service__WEBPACK_IMPORTED_MODULE_4__["NotificationService"],
            _shared_services_common_common_service__WEBPACK_IMPORTED_MODULE_5__["CommonService"]])
    ], TeacherBreaksComponent);
    return TeacherBreaksComponent;
}());



/***/ }),

/***/ "./src/app/layout/teacher/components/teacher-daily-activity/teacher-daily-activity.component.css":
/*!*******************************************************************************************************!*\
  !*** ./src/app/layout/teacher/components/teacher-daily-activity/teacher-daily-activity.component.css ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/* .p-act .nav-link img{width:30px }\r\n.p-act .nav-item{text-align: center}\r\n.p-act.nav-pills .nav-link{background: transparent}\r\n.p-act.nav-pills .nav-link.active, .p-act.nav-pills .show > .nav-link {\r\n    color: #fff;\r\n    background-color: #007bff;\r\n}\r\n\r\n.p-cont input[type=\"radio\"] + span{\r\n    height: 50px;width: 50px;border-radius: 5px;line-height: 50px;\r\n}\r\n\r\n.p-cont #radios label{text-align: center} */\r\n\r\n\r\n#editactivity .nav-link {padding: 5px 20px;}\r\n\r\n\r\n#editactivity .modal-body{padding: 20px}\r\n\r\n\r\n#editactivity ul li{text-align: center}\r\n\r\n\r\n#editactivity .tab-content{min-height: 200px;padding: 15px 0}\r\n\r\n\r\n#editactivity .Moods{ margin: 0}\r\n\r\n\r\n#editactivity .nav-tabs .nav-link.active, .nav-tabs .nav-item.show .nav-link{box-shadow:  0px 4px 8px 0px #dedede;border: none; color: #fff;background-color: #FF6C6C;}\r\n\r\n\r\n#editactivity .nav-link p{margin: 0}\r\n\r\n\r\n#editactivity .nav-link img,#editmeal .nav-link img, #edithealth .nav-link img,#editpost .nav-link img { height:  30px}\r\n\r\n\r\n/* switchcss */\r\n\r\n\r\n.middle {\r\n  width: 100%;\r\n}\r\n\r\n\r\n.middle input[type=\"radio\"] {\r\n  display: none;\r\n}\r\n\r\n\r\n.middle input[type=\"radio\"]:checked + .box {\r\n  background-color: #A8D4FE;\r\n  border-radius: 5px;\r\n}\r\n\r\n\r\n.middle input[type=\"radio\"]:checked + .box span {\r\n  color: white;\r\n  -webkit-transform: translateY(70px);\r\n          transform: translateY(70px);\r\n}\r\n\r\n\r\n.middle input[type=\"radio\"]:checked + .box span:before {\r\n  -webkit-transform: translateY(0px);\r\n          transform: translateY(0px);\r\n  opacity: 1;\r\n}\r\n\r\n\r\n.middle .box {\r\n  width: 80px;\r\n  height: 70px;\r\n  background-color: #fff;\r\n  transition: all 250ms ease;\r\n  will-change: transition;\r\n  text-align: center;\r\n  cursor: pointer;\r\n  line-height: 35px;\r\n}\r\n\r\n\r\n.middle .box:active {\r\n  -webkit-transform: translateY(10px);\r\n          transform: translateY(10px);\r\n}\r\n\r\n\r\n.middle .box span {\r\n  -webkit-transform: translate(0, 60px);\r\n          transform: translate(0, 60px);\r\n  transition: all 300ms ease;\r\n  font-size: 12px;\r\n  -webkit-user-select: none;\r\n     -moz-user-select: none;\r\n      -ms-user-select: none;\r\n          user-select: none;\r\n  color: #007e90;\r\n}\r\n\r\n\r\n.middle .box span:before {\r\n  font-size: 12px;\r\n  font-family: FontAwesome;\r\n  display: block;\r\n  -webkit-transform: translateY(-80px);\r\n          transform: translateY(-80px);\r\n  opacity: 0;\r\n  transition: all 300ms ease-in-out;\r\n  font-weight: normal;\r\n  color: white;\r\n}\r\n\r\n\r\n.middle .box span img{width: 25px;}\r\n\r\n\r\n@media (max-width:1024px) and (min-width:768px) {\r\n   .margt15 {\r\n     margin-top:15px;\r\n   }\r\n   .btn-red {\r\n    padding: 8px 20px;\r\n    font-size: 12px;\r\n    margin-left: 0;\r\n    margin-right: 10px;\r\n}\r\n}\r\n\r\n\r\n.modal-content {\r\n  position: relative;\r\n  display: flex;\r\n  flex-direction: column;\r\n  width: 112%;\r\n  pointer-events: auto;\r\n  background-clip: padding-box;\r\n  border-radius: 0.3rem;\r\n  outline: 0;\r\n}\r\n\r\n\r\n.napimg {\r\n  width: 40px;\r\n}\r\n\r\n\r\n.scrolldiv {\r\n  /* height:80px;\r\n  overflow-y: scroll; */\r\n  height: auto;\r\n  overflow-y: auto;\r\n  overflow-x: auto;\r\n}\r\n\r\n\r\n.list5Item{ list-style-type: none; margin: 0; padding: 0;}\r\n\r\n\r\n.list5Item li{ display: inline-block; margin: 5px;}\r\n\r\n\r\n.othernotebtn {\r\n  background: #FF6C6C;padding: 5px 12px;color: #fff;font-size: 14px;border-radius: 30px;\r\n}\r\n\r\n\r\n.editshadow{\r\n  /* display: block; */\r\n  z-index: 1051;\r\n  /* padding-left: 17px; */\r\n  background: rgba(0,0,0,0.5);\r\n}\r\n\r\n\r\n.studchatimg {\r\n  width: 40px;\r\n  height: 40px;\r\n  border-radius: 19px;\r\n}\r\n\r\n\r\nul.activityhis li a{\r\n  cursor: pointer;\r\n}\r\n\r\n\r\n@media(max-width: 991px){\r\n  .modal-content{\r\n    width: 100%;\r\n  }\r\n  .scrolldiv .btn.othernotebtn{\r\n    margin: 7px;\r\n  }\r\n}\r\n\r\n\r\n.scrolldiv{\r\n  padding: 10px 30px 10px 0px;\r\n}\r\n\r\n\r\n.cardfilter button.btn-send{\r\n  margin-top: 0px;\r\n}\r\n\r\n\r\n/**Comented By Aniket at 12 FEB 2018  */\r\n\r\n\r\n/* \r\nbody .ui-inputswitch.ui-inputswitch-checked .ui-inputswitch-slider:before {\r\n  -webkit-transform: translateX(37px);\r\n  transform: translateX(37px);\r\n}\r\nbody .ui-inputswitch .ui-inputswitch-slider:before {\r\n  height: 37px;\r\n  width: 37px;\r\n}\r\n.ui-inputswitch {\r\n  width: 80px !important;\r\n  height: 45px !important;\r\n}\r\n.modal-body .first {\r\n  display: block !important;\r\n} */\r\n\r\n\r\n.plusIcon{ font-size: 18px;color: #FF6C6C; }\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGF5b3V0L3RlYWNoZXIvY29tcG9uZW50cy90ZWFjaGVyLWRhaWx5LWFjdGl2aXR5L3RlYWNoZXItZGFpbHktYWN0aXZpdHkuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7OzJDQVkyQzs7O0FBRzNDLHlCQUF5QixpQkFBaUIsQ0FBQzs7O0FBQzNDLDBCQUEwQixhQUFhOzs7QUFDdkMsb0JBQW9CLGtCQUFrQjs7O0FBQ3RDLDJCQUEyQixpQkFBaUIsQ0FBQyxlQUFlOzs7QUFDNUQsc0JBQXNCLFNBQVM7OztBQUMvQiw2RUFBNkUsb0NBQW9DLENBQUMsWUFBWSxFQUFFLFdBQVcsQ0FBQyx5QkFBeUIsQ0FBQzs7O0FBQ3RLLDBCQUEwQixTQUFTOzs7QUFDbkMseUdBQXlHLGFBQWE7OztBQUd0SCxjQUFjOzs7QUFDZDtFQUNFLFdBQVc7QUFDYjs7O0FBQ0E7RUFDRSxhQUFhO0FBQ2Y7OztBQUNBO0VBQ0UseUJBQXlCO0VBQ3pCLGtCQUFrQjtBQUNwQjs7O0FBQ0E7RUFDRSxZQUFZO0VBQ1osbUNBQTJCO1VBQTNCLDJCQUEyQjtBQUM3Qjs7O0FBQ0E7RUFDRSxrQ0FBMEI7VUFBMUIsMEJBQTBCO0VBQzFCLFVBQVU7QUFDWjs7O0FBQ0E7RUFDRSxXQUFXO0VBQ1gsWUFBWTtFQUNaLHNCQUFzQjtFQUN0QiwwQkFBMEI7RUFDMUIsdUJBQXVCO0VBQ3ZCLGtCQUFrQjtFQUNsQixlQUFlO0VBQ2YsaUJBQWlCO0FBQ25COzs7QUFDQTtFQUNFLG1DQUEyQjtVQUEzQiwyQkFBMkI7QUFDN0I7OztBQUNBO0VBQ0UscUNBQTZCO1VBQTdCLDZCQUE2QjtFQUM3QiwwQkFBMEI7RUFDMUIsZUFBZTtFQUNmLHlCQUFpQjtLQUFqQixzQkFBaUI7TUFBakIscUJBQWlCO1VBQWpCLGlCQUFpQjtFQUNqQixjQUFjO0FBQ2hCOzs7QUFDQTtFQUNFLGVBQWU7RUFDZix3QkFBd0I7RUFDeEIsY0FBYztFQUNkLG9DQUE0QjtVQUE1Qiw0QkFBNEI7RUFDNUIsVUFBVTtFQUNWLGlDQUFpQztFQUNqQyxtQkFBbUI7RUFDbkIsWUFBWTtBQUNkOzs7QUFFQSxzQkFBc0IsV0FBVyxDQUFDOzs7QUFFbEM7R0FDRztLQUNFLGVBQWU7R0FDakI7R0FDQTtJQUNDLGlCQUFpQjtJQUNqQixlQUFlO0lBQ2YsY0FBYztJQUNkLGtCQUFrQjtBQUN0QjtBQUNBOzs7QUFHQTtFQUNFLGtCQUFrQjtFQUNsQixhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLFdBQVc7RUFDWCxvQkFBb0I7RUFDcEIsNEJBQTRCO0VBQzVCLHFCQUFxQjtFQUNyQixVQUFVO0FBQ1o7OztBQUdBO0VBQ0UsV0FBVztBQUNiOzs7QUFHQTtFQUNFO3VCQUNxQjtFQUNyQixZQUFZO0VBQ1osZ0JBQWdCO0VBQ2hCLGdCQUFnQjtBQUNsQjs7O0FBRUEsWUFBWSxxQkFBcUIsRUFBRSxTQUFTLEVBQUUsVUFBVSxDQUFDOzs7QUFDekQsZUFBZSxxQkFBcUIsRUFBRSxXQUFXLENBQUM7OztBQUNsRDtFQUNFLG1CQUFtQixDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsbUJBQW1CO0FBQ3ZGOzs7QUFFQTtFQUNFLG9CQUFvQjtFQUNwQixhQUFhO0VBQ2Isd0JBQXdCO0VBQ3hCLDJCQUEyQjtBQUM3Qjs7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsWUFBWTtFQUNaLG1CQUFtQjtBQUNyQjs7O0FBQ0E7RUFDRSxlQUFlO0FBQ2pCOzs7QUFDQTtFQUNFO0lBQ0UsV0FBVztFQUNiO0VBQ0E7SUFDRSxXQUFXO0VBQ2I7QUFDRjs7O0FBQ0E7RUFDRSwyQkFBMkI7QUFDN0I7OztBQUNBO0VBQ0UsZUFBZTtBQUNqQjs7O0FBRUEsdUNBQXVDOzs7QUFFdkM7Ozs7Ozs7Ozs7Ozs7OztHQWVHOzs7QUFFSCxXQUFXLGVBQWUsQ0FBQyxjQUFjLEVBQUUiLCJmaWxlIjoic3JjL2FwcC9sYXlvdXQvdGVhY2hlci9jb21wb25lbnRzL3RlYWNoZXItZGFpbHktYWN0aXZpdHkvdGVhY2hlci1kYWlseS1hY3Rpdml0eS5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLyogLnAtYWN0IC5uYXYtbGluayBpbWd7d2lkdGg6MzBweCB9XHJcbi5wLWFjdCAubmF2LWl0ZW17dGV4dC1hbGlnbjogY2VudGVyfVxyXG4ucC1hY3QubmF2LXBpbGxzIC5uYXYtbGlua3tiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudH1cclxuLnAtYWN0Lm5hdi1waWxscyAubmF2LWxpbmsuYWN0aXZlLCAucC1hY3QubmF2LXBpbGxzIC5zaG93ID4gLm5hdi1saW5rIHtcclxuICAgIGNvbG9yOiAjZmZmO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzAwN2JmZjtcclxufVxyXG5cclxuLnAtY29udCBpbnB1dFt0eXBlPVwicmFkaW9cIl0gKyBzcGFue1xyXG4gICAgaGVpZ2h0OiA1MHB4O3dpZHRoOiA1MHB4O2JvcmRlci1yYWRpdXM6IDVweDtsaW5lLWhlaWdodDogNTBweDtcclxufVxyXG5cclxuLnAtY29udCAjcmFkaW9zIGxhYmVse3RleHQtYWxpZ246IGNlbnRlcn0gKi9cclxuXHJcblxyXG4jZWRpdGFjdGl2aXR5IC5uYXYtbGluayB7cGFkZGluZzogNXB4IDIwcHg7fVxyXG4jZWRpdGFjdGl2aXR5IC5tb2RhbC1ib2R5e3BhZGRpbmc6IDIwcHh9XHJcbiNlZGl0YWN0aXZpdHkgdWwgbGl7dGV4dC1hbGlnbjogY2VudGVyfVxyXG4jZWRpdGFjdGl2aXR5IC50YWItY29udGVudHttaW4taGVpZ2h0OiAyMDBweDtwYWRkaW5nOiAxNXB4IDB9XHJcbiNlZGl0YWN0aXZpdHkgLk1vb2RzeyBtYXJnaW46IDB9XHJcbiNlZGl0YWN0aXZpdHkgLm5hdi10YWJzIC5uYXYtbGluay5hY3RpdmUsIC5uYXYtdGFicyAubmF2LWl0ZW0uc2hvdyAubmF2LWxpbmt7Ym94LXNoYWRvdzogIDBweCA0cHggOHB4IDBweCAjZGVkZWRlO2JvcmRlcjogbm9uZTsgY29sb3I6ICNmZmY7YmFja2dyb3VuZC1jb2xvcjogI0ZGNkM2Qzt9XHJcbiNlZGl0YWN0aXZpdHkgLm5hdi1saW5rIHB7bWFyZ2luOiAwfVxyXG4jZWRpdGFjdGl2aXR5IC5uYXYtbGluayBpbWcsI2VkaXRtZWFsIC5uYXYtbGluayBpbWcsICNlZGl0aGVhbHRoIC5uYXYtbGluayBpbWcsI2VkaXRwb3N0IC5uYXYtbGluayBpbWcgeyBoZWlnaHQ6ICAzMHB4fVxyXG5cclxuXHJcbi8qIHN3aXRjaGNzcyAqL1xyXG4ubWlkZGxlIHtcclxuICB3aWR0aDogMTAwJTtcclxufVxyXG4ubWlkZGxlIGlucHV0W3R5cGU9XCJyYWRpb1wiXSB7XHJcbiAgZGlzcGxheTogbm9uZTtcclxufVxyXG4ubWlkZGxlIGlucHV0W3R5cGU9XCJyYWRpb1wiXTpjaGVja2VkICsgLmJveCB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI0E4RDRGRTtcclxuICBib3JkZXItcmFkaXVzOiA1cHg7XHJcbn1cclxuLm1pZGRsZSBpbnB1dFt0eXBlPVwicmFkaW9cIl06Y2hlY2tlZCArIC5ib3ggc3BhbiB7XHJcbiAgY29sb3I6IHdoaXRlO1xyXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSg3MHB4KTtcclxufVxyXG4ubWlkZGxlIGlucHV0W3R5cGU9XCJyYWRpb1wiXTpjaGVja2VkICsgLmJveCBzcGFuOmJlZm9yZSB7XHJcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDBweCk7XHJcbiAgb3BhY2l0eTogMTtcclxufVxyXG4ubWlkZGxlIC5ib3gge1xyXG4gIHdpZHRoOiA4MHB4O1xyXG4gIGhlaWdodDogNzBweDtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xyXG4gIHRyYW5zaXRpb246IGFsbCAyNTBtcyBlYXNlO1xyXG4gIHdpbGwtY2hhbmdlOiB0cmFuc2l0aW9uO1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgbGluZS1oZWlnaHQ6IDM1cHg7XHJcbn1cclxuLm1pZGRsZSAuYm94OmFjdGl2ZSB7XHJcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDEwcHgpO1xyXG59XHJcbi5taWRkbGUgLmJveCBzcGFuIHtcclxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCA2MHB4KTtcclxuICB0cmFuc2l0aW9uOiBhbGwgMzAwbXMgZWFzZTtcclxuICBmb250LXNpemU6IDEycHg7XHJcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XHJcbiAgY29sb3I6ICMwMDdlOTA7XHJcbn1cclxuLm1pZGRsZSAuYm94IHNwYW46YmVmb3JlIHtcclxuICBmb250LXNpemU6IDEycHg7XHJcbiAgZm9udC1mYW1pbHk6IEZvbnRBd2Vzb21lO1xyXG4gIGRpc3BsYXk6IGJsb2NrO1xyXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtODBweCk7XHJcbiAgb3BhY2l0eTogMDtcclxuICB0cmFuc2l0aW9uOiBhbGwgMzAwbXMgZWFzZS1pbi1vdXQ7XHJcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcclxuICBjb2xvcjogd2hpdGU7XHJcbn1cclxuXHJcbi5taWRkbGUgLmJveCBzcGFuIGltZ3t3aWR0aDogMjVweDt9XHJcblxyXG5AbWVkaWEgKG1heC13aWR0aDoxMDI0cHgpIGFuZCAobWluLXdpZHRoOjc2OHB4KSB7XHJcbiAgIC5tYXJndDE1IHtcclxuICAgICBtYXJnaW4tdG9wOjE1cHg7XHJcbiAgIH1cclxuICAgLmJ0bi1yZWQge1xyXG4gICAgcGFkZGluZzogOHB4IDIwcHg7XHJcbiAgICBmb250LXNpemU6IDEycHg7XHJcbiAgICBtYXJnaW4tbGVmdDogMDtcclxuICAgIG1hcmdpbi1yaWdodDogMTBweDtcclxufVxyXG59XHJcblxyXG5cclxuLm1vZGFsLWNvbnRlbnQge1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgd2lkdGg6IDExMiU7XHJcbiAgcG9pbnRlci1ldmVudHM6IGF1dG87XHJcbiAgYmFja2dyb3VuZC1jbGlwOiBwYWRkaW5nLWJveDtcclxuICBib3JkZXItcmFkaXVzOiAwLjNyZW07XHJcbiAgb3V0bGluZTogMDtcclxufVxyXG5cclxuXHJcbi5uYXBpbWcge1xyXG4gIHdpZHRoOiA0MHB4O1xyXG59XHJcblxyXG5cclxuLnNjcm9sbGRpdiB7XHJcbiAgLyogaGVpZ2h0OjgwcHg7XHJcbiAgb3ZlcmZsb3cteTogc2Nyb2xsOyAqL1xyXG4gIGhlaWdodDogYXV0bztcclxuICBvdmVyZmxvdy15OiBhdXRvO1xyXG4gIG92ZXJmbG93LXg6IGF1dG87XHJcbn1cclxuXHJcbi5saXN0NUl0ZW17IGxpc3Qtc3R5bGUtdHlwZTogbm9uZTsgbWFyZ2luOiAwOyBwYWRkaW5nOiAwO31cclxuLmxpc3Q1SXRlbSBsaXsgZGlzcGxheTogaW5saW5lLWJsb2NrOyBtYXJnaW46IDVweDt9XHJcbi5vdGhlcm5vdGVidG4ge1xyXG4gIGJhY2tncm91bmQ6ICNGRjZDNkM7cGFkZGluZzogNXB4IDEycHg7Y29sb3I6ICNmZmY7Zm9udC1zaXplOiAxNHB4O2JvcmRlci1yYWRpdXM6IDMwcHg7XHJcbn1cclxuXHJcbi5lZGl0c2hhZG93e1xyXG4gIC8qIGRpc3BsYXk6IGJsb2NrOyAqL1xyXG4gIHotaW5kZXg6IDEwNTE7XHJcbiAgLyogcGFkZGluZy1sZWZ0OiAxN3B4OyAqL1xyXG4gIGJhY2tncm91bmQ6IHJnYmEoMCwwLDAsMC41KTtcclxufVxyXG5cclxuLnN0dWRjaGF0aW1nIHtcclxuICB3aWR0aDogNDBweDtcclxuICBoZWlnaHQ6IDQwcHg7XHJcbiAgYm9yZGVyLXJhZGl1czogMTlweDtcclxufVxyXG51bC5hY3Rpdml0eWhpcyBsaSBhe1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxufVxyXG5AbWVkaWEobWF4LXdpZHRoOiA5OTFweCl7XHJcbiAgLm1vZGFsLWNvbnRlbnR7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICB9XHJcbiAgLnNjcm9sbGRpdiAuYnRuLm90aGVybm90ZWJ0bntcclxuICAgIG1hcmdpbjogN3B4O1xyXG4gIH1cclxufVxyXG4uc2Nyb2xsZGl2e1xyXG4gIHBhZGRpbmc6IDEwcHggMzBweCAxMHB4IDBweDtcclxufVxyXG4uY2FyZGZpbHRlciBidXR0b24uYnRuLXNlbmR7XHJcbiAgbWFyZ2luLXRvcDogMHB4O1xyXG59XHJcblxyXG4vKipDb21lbnRlZCBCeSBBbmlrZXQgYXQgMTIgRkVCIDIwMTggICovXHJcblxyXG4vKiBcclxuYm9keSAudWktaW5wdXRzd2l0Y2gudWktaW5wdXRzd2l0Y2gtY2hlY2tlZCAudWktaW5wdXRzd2l0Y2gtc2xpZGVyOmJlZm9yZSB7XHJcbiAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMzdweCk7XHJcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDM3cHgpO1xyXG59XHJcbmJvZHkgLnVpLWlucHV0c3dpdGNoIC51aS1pbnB1dHN3aXRjaC1zbGlkZXI6YmVmb3JlIHtcclxuICBoZWlnaHQ6IDM3cHg7XHJcbiAgd2lkdGg6IDM3cHg7XHJcbn1cclxuLnVpLWlucHV0c3dpdGNoIHtcclxuICB3aWR0aDogODBweCAhaW1wb3J0YW50O1xyXG4gIGhlaWdodDogNDVweCAhaW1wb3J0YW50O1xyXG59XHJcbi5tb2RhbC1ib2R5IC5maXJzdCB7XHJcbiAgZGlzcGxheTogYmxvY2sgIWltcG9ydGFudDtcclxufSAqL1xyXG5cclxuLnBsdXNJY29ueyBmb250LXNpemU6IDE4cHg7Y29sb3I6ICNGRjZDNkM7IH0iXX0= */"

/***/ }),

/***/ "./src/app/layout/teacher/components/teacher-daily-activity/teacher-daily-activity.component.html":
/*!********************************************************************************************************!*\
  !*** ./src/app/layout/teacher/components/teacher-daily-activity/teacher-daily-activity.component.html ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = " <div class=\"wrapper\">\r\n  <div class=\"container-fluid\">\r\n\r\n    <div class=\"pagetitle\">\r\n      <div>\r\n        <h2>Daily Sheets\r\n          <!-- <span>/ Daily Sheets </span> -->\r\n        </h2>\r\n      </div>\r\n      <div *ngIf=\"showNeweEntryButton\">\r\n        <button type=\"submit\" class=\"btn btn-red btn_current\" (click)=\"clearAllForm();checkIsStudentSelected()\">New\r\n          Entry</button>\r\n        <!-- <button type=\"submit\" class=\"btn btn-red currentclass\">Approve All</button> -->\r\n      </div>\r\n    </div>\r\n    <div class=\"subhead d-flex justify-content-between \">\r\n      <div>\r\n        <h3>Daily Activity</h3>\r\n      </div>\r\n    </div>\r\n    <div class=\"card cardfilter\">\r\n      <div class=\"row algcenter\">\r\n\r\n        <div class=\"leftfilter\">\r\n          <div class=\"search-date\">\r\n            <div class=\"label-text\">Search Date:</div>\r\n            <div class=\"pr15\">\r\n              <div class=\"form-group\">\r\n                <input type=\"text\" placeholder=\"Search by Date\" [(ngModel)]=\"searchByDate\" showWeekNumbers=\"false\" [maxDate]=\"today\" class=\"form-control mr15\"\r\n                  [bsConfig]=\"dpConfig\" (bsValueChange)=\"getSerchDate($event)\" bsDatepicker>\r\n              </div>\r\n            </div>\r\n          </div>\r\n         <div class=\"search-class\">\r\n          <div class=\"label-text\">Search class:</div>\r\n          <div class=\"pr15\">\r\n            <div class=\"form-group\">\r\n              <select class=\"form-control\" placeholder=\"Search\" [(ngModel)]=\"serchByClass\" id=\"exampleFormControlSelect1\">\r\n                <option value=\"\">Select class</option>\r\n                <option *ngFor=\"let classes of classList\" [value]=\"classes.value\">{{classes.label}}</option>\r\n              </select>\r\n            </div>\r\n          </div>\r\n        </div>\r\n          <!-- <div> <button type=\"submit\" class=\"btn btn-send\" (click)=\"getDailySheet()\">Search</button> </div> -->\r\n          <div class=\"filter-buttons\">\r\n            <button type=\"submit\" class=\"btn btn-send\" (click)=\"getDailySheet()\">Search</button>\r\n          </div>\r\n        \r\n        </div>\r\n\r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"innertable studentListSearch\">\r\n      <div class=\"table-responsive\">\r\n        <table class=\"table\">\r\n          <thead class=\"thead-light\">\r\n            <tr>\r\n              <th class=\"text-center\">\r\n                <label class=\"checkboxcustom\" title=\"Mark/Unmark all \">\r\n                  <input type=\"checkbox\" [(ngModel)]=\"markAllStudents\" (click)=\"getAllMarkedStudent($event)\">\r\n                  <span class=\"checkmark\"></span>\r\n                </label>\r\n              </th>\r\n              <th class=\"text-center\">Photo</th>\r\n              <!-- <th scope=\"col\">#ID</th> -->\r\n              <th scope=\"col\" class=\"text-center\">Student Name</th>\r\n              <!-- <th scope=\"col\">Last Name</th> -->\r\n              <!-- <th scope=\"col\">Class</th> -->\r\n              <th scope=\"col\" >Activity</th>\r\n              <!-- <th scope=\"col\" class=\"text-center\">Review</th> -->\r\n              <th scope=\"col\" class=\"text-center\">Action</th>\r\n            </tr>\r\n          </thead>\r\n          <tbody>\r\n            <tr *ngFor=\"let dailysheet of listOfStudents \">\r\n              <td>\r\n                <label class=\"checkboxcustom\">\r\n                  <input type=\"checkbox\" [checked]=\"dailysheet.isMarked\" (click)=\"getSingleMarkedStudent(dailysheet,$event)\">\r\n                  <span class=\"checkmark\"></span>\r\n                </label>\r\n              </td>\r\n              <td  class=\"text-center\" >\r\n                <img src=\"{{dailysheet.imagePath}}\" onError=\"this.src='assets/img/user.png'\" alt=\"\" class=\"img-circle childimg\">\r\n              </td>\r\n              <td class=\"text-center\">{{dailysheet.studentName}}</td>\r\n              <td class=\"text-center\">\r\n                <ul class=\"activityhis\">\r\n                  <li *ngFor=\"let actobj of dailysheet.myActivity | slice:0:6\">\r\n                    <a data-toggle=\"popover\" *ngIf=\"actobj.activityTypeID == 1\" (click)=\"getActivityDetails(actobj,'health', dailysheet.studentID)\"\r\n                      data-toggle=\"modal\" data-target=\"#edithealth\" data-placement=\"bottom\" data-content=\"Vivamussagittis lacus vel augue laoreet rutrum faucibus.\">\r\n                      <img src=\"assets/img/stethoscope.svg\" alt=\"\">\r\n                    </a>\r\n                    <a data-toggle=\"popover\" *ngIf=\"actobj.activityTypeID == 2\" (click)=\"getActivityDetails(actobj,'notes',dailysheet.studentID)\"\r\n                      data-toggle=\"modal\" data-target=\"#editpost\" data-placement=\"bottom\" data-content=\"Vivamussagittis lacus vel augue laoreet rutrum faucibus.\">\r\n                      <img src=\"assets/img/post-it.svg\" alt=\"\"> </a>\r\n                    <a data-toggle=\"popover\" *ngIf=\"actobj.activityTypeID == 4\" (click)=\"getActivityDetails(actobj,'mood',dailysheet.studentID)\"\r\n                      data-toggle=\"modal\" data-target=\"#editmood\" data-placement=\"bottom\" data-content=\"Vivamus sagittis lacus vel augue laoreet rutrum faucibus.\">\r\n                      <img src=\"assets/img/satisfaction.svg\" alt=\"\">\r\n                    </a>\r\n                    <a data-toggle=\"popover\" *ngIf=\"actobj.activityTypeID == 5\" (click)=\"getActivityDetails(actobj,'activity',dailysheet.studentID)\"\r\n                      data-toggle=\"modal\" data-target=\"#editactivity\" data-placement=\"bottom\" data-content=\"Vivamussagittis lacus vel augue laoreet rutrum faucibus.\">\r\n                      <img src=\"assets/img/circular-clock.svg\" alt=\"\"> </a>\r\n                    <a data-toggle=\"popover\" *ngIf=\"actobj.activityTypeID == 3\" (click)=\"getMealActivityByAPI(actobj,'meal',dailysheet.studentID)\"\r\n                      data-toggle=\"modal\" data-target=\"#editmeal\" data-placement=\"bottom\" data-content=\"Vivamus sagittis lacus vel augue laoreet rutrum faucibus.\">\r\n                      <img src=\"assets/img/restaurant.svg\" alt=\"\">\r\n                    </a>\r\n                    <a data-toggle=\"popover\" *ngIf=\"actobj.activityTypeID == 6\" (click)=\"getActivityDetails(actobj,'nap',dailysheet.studentID)\"\r\n                      data-toggle=\"modal\" data-target=\"#editnap\" data-placement=\"bottom\" data-content=\"Vivamus sagittis lacus vel augue laoreet rutrum faucibus.\">\r\n                      <img src=\"assets/img/napsm.svg\" alt=\"\">\r\n                    </a>\r\n                    <a data-toggle=\"popover\" *ngIf=\"actobj.activityTypeID == 7\" (click)=\"getActivityDetails(actobj,'diper',dailysheet.studentID)\"\r\n                    data-toggle=\"modal\" data-target=\"#editdiper\" data-placement=\"bottom\" data-content=\"Vivamus sagittis lacus vel augue laoreet rutrum faucibus.\">\r\n                    <img src=\"assets/img/toiletsm.svg\" alt=\"\" style=\"height:25px\">\r\n                  </a>\r\n                  </li>\r\n                  <a *ngIf=\"dailysheet.myActivity.length > 6\"  data-toggle=\"modal\" data-target=\"#viewactivity\" (click)=\"viewAllActivityList(dailysheet)\" title=\"View All\" style=\"cursor: pointer; margin-left: 10px\">\r\n                    <i class=\"fa fa-chevron-circle-right plusIcon\" aria-hidden=\"true\"></i>\r\n                  </a>\r\n                </ul>\r\n                <!-- <ul class=\"activityhis\">\r\n                        <li> <a data-toggle=\"popover\" data-placement=\"bottom\"\r\n                            data-content=\"Vivamus\r\n                          sagittis lacus vel augue laoreet rutrum faucibus.\"><img\r\n                              src=\"assets/img/stethoscope.svg\" alt=\"\"></a></li>\r\n      \r\n                        <li> <a data-toggle=\"popover\" data-toggle=\"modal\" data-target=\"#editpost\" data-placement=\"bottom\" data-content=\"Vivamus\r\n                          sagittis lacus vel augue laoreet rutrum faucibus.\"><img\r\n                              src=\"assets/img/post-it.svg\" alt=\"\"> </a></li>\r\n      \r\n                        <li> <a data-toggle=\"popover\" data-toggle=\"modal\" data-target=\"#editmood\" data-placement=\"bottom\" data-content=\"Vivamus\r\n                            sagittis lacus vel augue laoreet rutrum faucibus.\"><img\r\n                              src=\"assets/img/satisfaction.svg\" alt=\"\"></a></li>\r\n      \r\n                        <li> <a data-toggle=\"popover\" data-toggle=\"modal\" data-target=\"#editmeal\" data-placement=\"bottom\" data-content=\"Vivamus\r\n                            sagittis lacus vel augue laoreet rutrum faucibus.\"><img\r\n                              src=\"assets/img/restaurant.svg\" alt=\"\"></a></li>\r\n      \r\n                        <li> <a data-toggle=\"popover\" data-toggle=\"modal\" data-target=\"#editactivity\" data-placement=\"bottom\" data-content=\"Vivamus\r\n                              sagittis lacus vel augue laoreet rutrum faucibus.\"><img\r\n                              src=\"assets/img/circular-clock.svg\" alt=\"\"> </a> </li>\r\n                      </ul> -->\r\n              </td >\r\n              <!-- <td class=\"text-center\" class=\"text-center\">\r\n                <img src=\"assets/img/danger.svg\" alt=\"\" width=\"20px\">\r\n              </td> -->\r\n              <td class=\"text-center\">\r\n                <!-- <a href=\"\" data-toggle=\"modal\" data-target=\"#editactivity12\">\r\n                  <i class=\"fa fa-plus-circle\" aria-hidden=\"true\"></i>\r\n                </a> -->\r\n                <a data-toggle=\"modal\" data-target=\"#viewactivity\" title=\"View All\" (click)=\"viewAllActivityList(dailysheet)\">\r\n                  <i class=\"fa fa-eye\" aria-hidden=\"true\"></i>\r\n                </a>\r\n                <!-- <a href=\"\" data-toggle=\"modal\" data-target=\"#viewactivity\">\r\n                  <i class=\"fa fa-trash\" aria-hidden=\"true\"></i>\r\n                </a> -->\r\n              </td>\r\n          </tbody>\r\n        </table>\r\n        <div class=\"text-center\">\r\n\r\n          <span *ngIf=\"listOfStudents.length == 0 && !loader\" class=\"text-center\">No result found</span>\r\n        </div>\r\n      </div>\r\n      <!-- Pagination -->\r\n      <!-- <div class=\"mainpagination\">\r\n\r\n        <ul class=\"pagination\" style=\"margin: 0;float: right;\">\r\n          <li class=\"bar_pag\">Showing 1 to 10 of 23 entries </li>\r\n          <li class=\"paginate_button previous disabled\" id=\"example_previous\">\r\n            <i class=\"fa fa-chevron-left\" aria-hidden=\"true\"></i>\r\n          </li>\r\n          <li class=\"paginate_button active\">\r\n            <a href=\"#\" aria-controls=\"example\" data-dt-idx=\"1\" tabindex=\"0\">1</a>\r\n          </li>\r\n          <li class=\"paginate_button \">\r\n            <a href=\"#\" aria-controls=\"example\" data-dt-idx=\"2\" tabindex=\"0\">2</a>\r\n          </li>\r\n          <li class=\"paginate_button next\" id=\"example_next\">\r\n            <i class=\"fa fa-chevron-right\" aria-hidden=\"true\"></i>\r\n          </li>\r\n        </ul>\r\n      </div> -->\r\n      <!-- <p-paginator [alwaysShow]=\"false\" [rows]=\"limit\" [totalRecords]=\"totalRecord\" (onPageChange)=\"paginate($event)\"></p-paginator> -->\r\n    </div>\r\n\r\n\r\n\r\n    <!-- Model for edit Other Activity -->\r\n    <div class=\"modal fade editshadow\" id=\"editactivity\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"editactivityLabel\"\r\n      aria-hidden=\"true\">\r\n      <div class=\"modal-dialog\" role=\"document\">\r\n        <div class=\"modal-content\">\r\n          <div class=\"modal-header\">\r\n            <h5 class=\"modal-title\" id=\"editactivityLabel\">Update Daily Activity</h5>\r\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n              <span aria-hidden=\"true\">&times;</span>\r\n            </button>\r\n          </div>\r\n          <div class=\"modal-body\">\r\n            <ul class=\"nav nav-tabs\" id=\"myTab\" role=\"tablist\">\r\n              <li class=\"nav-item\">\r\n                <a class=\"nav-link active\" id=\"activity-tab\" data-toggle=\"tab\" href=\"#activity\" role=\"tab\"\r\n                  aria-controls=\"activity\" aria-selected=\"true\">\r\n                  <!-- <i class=\"fa fa-child\" aria-hidden=\"true\"></i> -->\r\n                  <img src=\"assets/img/circular-clock.svg\" alt=\"\">\r\n                  <p>Activity</p>\r\n                </a>\r\n              </li>\r\n            </ul>\r\n            <div class=\"tab-content\" id=\"myTabContent\">\r\n              <div class=\"tab-pane fade show active\" id=\"activity\" role=\"tabpanel\" aria-labelledby=\"activity-tab\">\r\n                <form [formGroup]=\"activityForm\">\r\n                  <div class=\"row mt-20\">\r\n                    <div class=\"col-lg-6\">\r\n                      <div class=\"form-group\">\r\n                        <label for=\"\">Start Time </label>\r\n                        <!-- <input type=\"text \" class=\"form-control\" id=\"\" aria-describedby=\"\" placeholder=\"Select Start Time\"> -->\r\n                        <p-calendar class=\"cutom-text-box-dailyactivity-one\" styleClass=\"form-control\" formControlName=\"starttime\"\r\n                          [timeOnly]=\"true\" hourFormat=\"12\" icon=\"pi pi-clock\" [showIcon]=\"true\"></p-calendar>\r\n                      </div>\r\n                    </div>\r\n                    <div class=\"col-lg-6\">\r\n                      <div class=\"form-group\">\r\n                        <label for=\"\">End Time</label>\r\n                        <!-- <input type=\"text \" class=\"form-control\" id=\"\" aria-describedby=\"\" placeholder=\"Select End Time\"> -->\r\n                        <p-calendar class=\"cutom-text-box-dailyactivity-one\" styleClass=\"form-control\" formControlName=\"endtime\"\r\n                          [timeOnly]=\"true\" hourFormat=\"12\" icon=\"pi pi-clock\" [showIcon]=\"true\"></p-calendar>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"row\">\r\n                    <div class=\"col-lg-12\">\r\n                      <div class=\"form-group\">\r\n                        <label for=\"\"></label>\r\n                        <textarea aria-describedby=\"\" row=\"10\" formControlName=\"activity\" class=\"form-control\" id=\"\"\r\n                          placeholder=\"Enter student activity\"></textarea>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"row\">\r\n                    <div class=\"col-lg-12\">\r\n                      <div class=\"form-group\">\r\n                        <label for=\"\">Auto Key </label>\r\n                        <div class=\"scrolldiv\">\r\n                          <div class=\"row\">\r\n                            <div class=\"col-md-2\" *ngFor=\"let sbact of subActivityList\">\r\n                              <button type=\"button\" class=\"btn othernotebtn\" (click)=\"updateSuggestion(sbact)\">{{sbact.subActivityLabel}}</button>\r\n                            </div>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </form>\r\n              </div>\r\n\r\n            </div>\r\n          </div>\r\n          <div class=\"modal-footer\">\r\n            <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\r\n            <button type=\"button\" *ngIf=\"showNeweEntryButton\" class=\"btn btn-primary\" (click)=\"addNewEntry(2,'activity')\">Update changes</button>\r\n            <button type=\"button\" *ngIf=\"!showNeweEntryButton\" class=\"btn btn-primary\" disabled>Update changes</button>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n\r\n    <!-- Model for edit meal -->\r\n\r\n    <div class=\"modal fade editshadow\" id=\"editmeal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"editactivityLabel\"\r\n      aria-hidden=\"true\">\r\n      <div class=\"modal-dialog\" role=\"document\">\r\n        <div class=\"modal-content\">\r\n          <div class=\"modal-header\">\r\n            <h5 class=\"modal-title\" id=\"editactivityLabel\">Update Daily Activity</h5>\r\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n              <span aria-hidden=\"true\">&times;</span>\r\n            </button>\r\n          </div>\r\n          <div class=\"modal-body\">\r\n            <ul class=\"nav nav-tabs\" id=\"myTab\" role=\"tablist\">\r\n              <li class=\"nav-item\">\r\n                <a class=\"nav-link active\" id=\"meal-tab\" data-toggle=\"tab\" href=\"#meal\" role=\"tab\" aria-controls=\"meal\"\r\n                  aria-selected=\"false\">\r\n                  <!-- <i class=\"fa fa-child\" aria-hidden=\"true\"></i> -->\r\n                  <img src=\"assets/img/restaurant.svg\" alt=\"\">\r\n                  <p>Meal</p>\r\n                </a>\r\n              </li>\r\n\r\n            </ul>\r\n            <!-- <form>\r\n              <div class=\"row mb-20 mt-20\">\r\n\r\n                <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"\">Meal </label>\r\n                    <select class=\"form-control\" id=\"exampleFormControlSelect1\">\r\n                      <option>Select Meal</option>\r\n                      <option>Cereal</option>\r\n                    </select>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"\">Comment</label>\r\n                    <input type=\"text \" class=\"form-control\" id=\"\" aria-describedby=\"\" placeholder=\"Enter Comment\">\r\n                  </div>\r\n                </div>\r\n              </div>\r\n\r\n              <div class=\"row mb-20 mt-20\">\r\n\r\n                <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"\">Other than plan meal </label>\r\n                    <input type=\"text \" class=\"form-control\" id=\"\" aria-describedby=\"\" placeholder=\"Enter Other Meal\">\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"\">Comment</label>\r\n                    <input type=\"text \" class=\"form-control\" id=\"\" aria-describedby=\"\" placeholder=\"Enter Comment\">\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </form> -->\r\n            <form [formGroup]=\"mealForm\">\r\n\r\n\r\n              <div class=\"row mb-20 mt-20\">\r\n                <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"exampleFormControlSelect1\">Meal Plan*</label>\r\n                    <!-- <select class=\"form-control\" placeholder=\"Meal Plan\" disabled formControlName=\"plantype\" id=\"exampleFormControlSelect1\"\r\n                      (change)=\"getSelectedMealPlan()\">\r\n                      <option value=\"\">Select </option>\r\n                      <option *ngFor=\"let obj of mealPlanList\" [value]=\"obj.mealPlannerID\">{{obj.mealPlanTitle}}</option>\r\n                    </select> -->\r\n                    <input type=\"text\" class=\"form-control\" placeholder=\"Meal plan\" disabled formControlName=\"plantype\">\r\n                  </div>\r\n                </div>\r\n              </div>\r\n\r\n              <!-- <div class=\"row mb-20 mt-20\"> -->\r\n              <div class=\"table-responsive white_box_table\" *ngIf=\"foodList.length != 0\">\r\n                <table class=\"table\">\r\n                  <thead class=\"thead-light\">\r\n                    <tr>\r\n                      <!-- <th scope=\"col\">#ID</th> -->\r\n                      <th scope=\"col\">Food Item</th>\r\n                      <th scope=\"col\">Amount</th>\r\n                      <!-- <th scope=\"col\">Quantity</th> -->\r\n                      <th scope=\"col\">Unit</th>\r\n                      <!-- <th>consumed Amount (For milk only)*</th> -->\r\n                      <!--    <th>consume Quantity*</th> -->\r\n                      <!-- <th>consumed Unit(For milk only)*</th> -->\r\n                      <th>consumed Amount*</th>\r\n                    </tr>\r\n                  </thead>\r\n                  <tbody>\r\n                    <tr *ngFor=\"let food of foodList ; let item of mealForm.get('foodconsumption').controls; let i = index;\"  formArrayName=\"foodconsumption\">\r\n                      <!-- <div [formGroupName]=\"i\">  -->\r\n                      <td>{{food.foodTypeName}}</td>\r\n                      <td>{{food.amount}}</td>\r\n                      <!-- <td>{{food.measureQuantityTypeName}}</td> -->\r\n                      <!-- <td>{{food.measureQuantityTypeName}}</td> -->\r\n                      <td>{{food.measureUnitTypeName}}</td>\r\n                      <!-- <td >\r\n                                    <input type=\"text \" [attr.disabled]=\"((food.foodTypeName != 'Milk')? '' : null) \" class=\"form-control\" formControlName=\"amount\" id=\"\" (input)=\"getConsumedAmount(food)\" aria-describedby=\"\"\r\n                                    placeholder=\"Enter amount\">\r\n                                </td> -->\r\n                      <!-- <td>\r\n                                    <select class=\"form-control\"  formControlName=\"quantity\" placeholder=\"Select\" (change)=\"getConsumedAmount(food)\" id=\"exampleFormControlSelect1\">\r\n                                        <option  value=\"\">Select</option>\r\n                                        <option *ngFor=\"let obj of mealQuantityType\" [value]=\"obj.value\">{{obj.label}}</option>\r\n                                      </select>\r\n                                </td> [attr.disabled]=\"((food.foodTypeName != 'Milk')? '' : null) \"-->\r\n                      <td [formGroupName]=\"i\">\r\n                        <!-- <select *ngIf=\"(food.foodTypeName == 'Milk' )\" class=\"form-control\" placeholder=\"Select\" (change)=\"getConsumedAmount(food)\" formControlName=\"unit\"  id=\"exampleFormControlSelect1\">\r\n                                        <option value=\"\" >Select </option>\r\n                                        <option *ngFor=\"let obj of MealMeasureType\" [value]=\"obj.value\">{{obj.label}}</option>\r\n                                      </select> -->\r\n\r\n                        <input type=\"text \" *ngIf=\"(food.measureUnitTypeID == 8 )\" class=\"form-control\" (blur)=\"getConsumedAmount(food)\"\r\n                          formControlName=\"milkconsumptionquantity\" id=\"\" aria-describedby=\"\" placeholder=\"consumed amount\">\r\n\r\n                        <select class=\"form-control\" *ngIf=\"food.measureUnitTypeID != 8 \" placeholder=\"Select\" (change)=\"getConsumedAmount(food)\"\r\n                          formControlName=\"foodconsumtionid\" id=\"exampleFormControlSelect1\">\r\n                          <option value=\"\">Select </option>\r\n                          <option *ngFor=\"let obj of foodConsumptionType\" [value]=\"obj.id\">{{obj.foodConsumtionName}}</option>\r\n                        </select>\r\n                      </td>\r\n                      <!-- <td >\r\n                                    <select class=\"form-control\" *ngIf=\"food.foodTypeName == 'Milk' \" placeholder=\"Select\" (change)=\"getConsumedAmount(food)\" formControlName=\"quantity\"  id=\"exampleFormControlSelect1\">\r\n                                        <option value=\"\" >Select </option>\r\n                                        <option *ngFor=\"let obj of foodConsumptionType\" [value]=\"obj.id\">{{obj.foodConsumtionName}}</option>\r\n                                      </select>\r\n                                </td> -->\r\n                      <!-- </div> -->\r\n                    </tr>\r\n\r\n\r\n                  </tbody>\r\n                </table>\r\n\r\n              </div>\r\n\r\n              <div class=\"row mb-20 mt-20\">\r\n                <div class=\"col-lg-12\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"\">Other than plan meal </label>\r\n                    <!-- <input type=\"text \" class=\"form-control\" formControlName=\"othermealplan\" id=\"\" aria-describedby=\"\"\r\n                      placeholder=\"Enter Other Meal\"> -->\r\n                      <textarea name=\"\" id=\"\" cols=\"30\" rows=\"6\" placeholder=\"Other than plan meal\" class=\"form-control\" formControlName=\"othermealplan\"></textarea>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n\r\n              <div class=\"row mb-20 mt-20\">\r\n\r\n                <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"\">Other plan meal comment</label>\r\n                    <input type=\"text \" class=\"form-control\" formControlName=\"othermealcmnt\" id=\"\" aria-describedby=\"\"\r\n                      placeholder=\"Enter Comment\">\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-lg-6\">\r\n                    <div class=\"form-group\">\r\n                      <label for=\"\">Comment</label>\r\n                      <input type=\"text \" class=\"form-control\" formControlName=\"mealcmnt\" id=\"\" aria-describedby=\"\"\r\n                        placeholder=\"Enter Comment\">\r\n                    </div>\r\n                  </div>\r\n              </div>\r\n            </form>\r\n          </div>\r\n          <div class=\"modal-footer\">\r\n            <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\r\n            <button type=\"button\" *ngIf=\"showNeweEntryButton\" class=\"btn btn-primary\" (click)=\"addNewEntry(2,'meal')\">Update changes</button>\r\n            <button type=\"button\" *ngIf=\"!showNeweEntryButton\" class=\"btn btn-primary\" disabled>Update changes</button>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n    <!-- Model for edit Mood -->\r\n\r\n    <div class=\"modal fade editshadow\" id=\"editmood\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"editactivityLabel\"\r\n      aria-hidden=\"true\">\r\n      <div class=\"modal-dialog\" role=\"document\">\r\n        <div class=\"modal-content\">\r\n          <div class=\"modal-header\">\r\n            <h5 class=\"modal-title\" id=\"editactivityLabel\">Update Daily Activity</h5>\r\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n              <span aria-hidden=\"true\">&times;</span>\r\n            </button>\r\n          </div>\r\n          <div class=\"modal-body\">\r\n            <ul class=\"nav nav-tabs\" id=\"myTab\" role=\"tablist\">\r\n              <li class=\"nav-item\">\r\n                <a class=\"nav-link active\" id=\"mood-tab\" data-toggle=\"tab\" href=\"#mood\" role=\"tab\" aria-controls=\"mood\"\r\n                  aria-selected=\"false\">\r\n                  <!-- <i class=\"fa fa-child\" aria-hidden=\"true\"></i> -->\r\n                  <img src=\"assets/img/satisfaction.svg\" alt=\"\">\r\n                  <p>Mood</p>\r\n                </a>\r\n              </li>\r\n\r\n            </ul>\r\n            <form [formGroup]=\"moodForm\">\r\n              <div class=\"Moods\">\r\n                <!-- \r\n         <div class=\"forall\">\r\n  \r\n           For All Day\r\n           <label class=\"switch\">\r\n             <input class=\"switch-input\" type=\"checkbox\" />\r\n             <span class=\"switch-label1\" data-on=\"On\" data-off=\"Off\"></span>\r\n             <span class=\"switch-handle\"></span>\r\n           </label>\r\n  \r\n         </div> -->\r\n\r\n                <h3> My Mood was... </h3>\r\n                <div class=\"middle\">\r\n                  <label>\r\n                    <input type=\"radio\" name=\"radio\" id=\"hp\" [checked]=\"showHappy\" (click)=\"getMarkedMood(1)\" />\r\n                    <div class=\"front-end box\">\r\n                      <span>\r\n                        <img src=\"assets/img/happymob.svg\" alt=\"\">\r\n                      </span>\r\n                      <p>Happy</p>\r\n                    </div>\r\n                  </label>\r\n                  <label>\r\n                    <input type=\"radio\" name=\"radio\" id=\"sd\" [checked]=\"showSad\" (click)=\"getMarkedMood(2)\" />\r\n                    <div class=\"front-end box\">\r\n                      <span>\r\n                        <img src=\"assets/img/cryingmob.svg\" alt=\"\">\r\n                      </span>\r\n                      <p>Sad</p>\r\n                    </div>\r\n                  </label>\r\n\r\n                  <label>\r\n                    <input type=\"radio\" name=\"radio\" id=\"sl\" [checked]=\"showSleepy\" (click)=\"getMarkedMood(3)\" />\r\n                    <div class=\"back-end box\">\r\n                      <span>\r\n                        <img src=\"assets/img/playfull.png\" alt=\"\">\r\n                      </span>\r\n                      <p> Playful</p>\r\n                    </div>\r\n                  </label>\r\n                  <label>\r\n                    <input type=\"radio\" name=\"radio\" id=\"fs\" [checked]=\"showFussy\" (click)=\"getMarkedMood(4)\" />\r\n                    <div class=\"back-end box\">\r\n                      <span>\r\n                        <img src=\"assets/img/tired.png\" alt=\"\">\r\n                      </span>\r\n                      <p>Fussy </p>\r\n                    </div>\r\n                  </label>\r\n                  <label>\r\n                    <input type=\"radio\" name=\"radio\" id=\"gr\" [checked]=\"showGrumpy\" (click)=\"getMarkedMood(5)\" />\r\n                    <div class=\"back-end box\">\r\n                      <span>\r\n                        <img src=\"assets/img/Grumpy.png\" alt=\"\">\r\n                      </span>\r\n                      <p>Grumpy</p>\r\n                    </div>\r\n                  </label>\r\n\r\n                  <div class=\"form-group\">\r\n                    <label for=\"\"></label>\r\n                    <textarea aria-describedby=\"\" formControlName=\"moodcomment\" row=\"10\" class=\"form-control\" id=\"\"\r\n                      placeholder=\"Enter Comment\"></textarea>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </form>\r\n\r\n          </div>\r\n          <div class=\"modal-footer\">\r\n            <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\r\n            <button type=\"button\" *ngIf=\"showNeweEntryButton\" class=\"btn btn-primary\" (click)=\"addNewEntry(2,'mood')\">Save changes</button>\r\n            <button type=\"button\" *ngIf=\"!showNeweEntryButton\" class=\"btn btn-primary\" disabled>Update changes</button>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n    <!-- Model for edit Notes -->\r\n\r\n    <div class=\"modal fade editshadow\" id=\"editpost\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"editactivityLabel\"\r\n      aria-hidden=\"true\">\r\n      <div class=\"modal-dialog\" role=\"document\">\r\n        <div class=\"modal-content\">\r\n          <div class=\"modal-header\">\r\n            <h5 class=\"modal-title\" id=\"editactivityLabel\">Update Daily Activity</h5>\r\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n              <span aria-hidden=\"true\">&times;</span>\r\n            </button>\r\n          </div>\r\n          <div class=\"modal-body\">\r\n            <ul class=\"nav nav-tabs\" id=\"myTab\" role=\"tablist\">\r\n              <li class=\"nav-item\">\r\n                <a class=\"nav-link active\" id=\"notes-tab\" data-toggle=\"tab\" href=\"#notes\" role=\"tab\" aria-controls=\"notes\"\r\n                  aria-selected=\"false\">\r\n                  <!-- <i class=\"fa fa-child\" aria-hidden=\"true\"></i> -->\r\n                  <img src=\"assets/img/post-it.svg\" alt=\"\">\r\n                  <p>Notes</p>\r\n                </a>\r\n              </li>\r\n\r\n            </ul>\r\n            <form [formGroup]=\"notesForm\">\r\n              <div class=\"form-group\">\r\n                <label for=\"\">Notes if any *</label>\r\n                <textarea aria-describedby=\"\" formControlName=\"notes\" row=\"10\" class=\"form-control\" id=\"\" placeholder=\"Notes if any\"></textarea>\r\n              </div>\r\n            </form>\r\n\r\n          </div>\r\n          <div class=\"modal-footer\">\r\n            <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\r\n            <button type=\"button\" *ngIf=\"showNeweEntryButton\" class=\"btn btn-primary\" (click)=\"addNewEntry(2,'notes')\">Update changes</button>\r\n            <button type=\"button\" *ngIf=\"!showNeweEntryButton\" class=\"btn btn-primary\" disabled>Update changes</button>\r\n            \r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n    <!-- Model for edit Health -->\r\n\r\n    <div class=\"modal fade editshadow\" id=\"edithealth\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"editactivityLabel\"\r\n      aria-hidden=\"true\">\r\n      <div class=\"modal-dialog\" role=\"document\">\r\n        <div class=\"modal-content\">\r\n          <div class=\"modal-header\">\r\n            <h5 class=\"modal-title\" id=\"editactivityLabel\">Update Daily Activity</h5>\r\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n              <span aria-hidden=\"true\">&times;</span>\r\n            </button>\r\n          </div>\r\n          <div class=\"modal-body\">\r\n            <ul class=\"nav nav-tabs\" id=\"myTab\" role=\"tablist\">\r\n              <li class=\"nav-item\">\r\n                <a class=\"nav-link active\" id=\"health-tab\" data-toggle=\"tab\" href=\"#health\" role=\"tab\" aria-controls=\"health\"\r\n                  aria-selected=\"false\">\r\n                  <!-- <i class=\"fa fa-child\" aria-hidden=\"true\"></i> -->\r\n                  <img src=\"assets/img/stethoscope.svg\" alt=\"\">\r\n                  <p>Health</p>\r\n                </a>\r\n              </li>\r\n            </ul>\r\n            <form [formGroup]=\"healthForm\">\r\n              <div class=\"row mt-20\">\r\n                <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"\">Add Temperature (°F)</label>\r\n                    <input aria-describedby=\"\" formControlName=\"temperature\" class=\"form-control\" id=\"\" placeholder=\"\"\r\n                      type=\"text\">\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-lg-6\"></div>\r\n                <div class=\"col-lg-12\">\r\n                  <div class=\"form-group\">\r\n                    <label>Health Note*</label>\r\n                    <textarea aria-describedby=\"\" formControlName=\"tempcmnt\" row=\"10\" class=\"form-control\" id=\"\"\r\n                      placeholder=\"Health Note\"></textarea>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"row\" *ngIf=\"(this.HealthVM.studentMedicationID != 0 )\">\r\n                  <div class=\"col-lg-6\">\r\n                    <div class=\"form-group\">\r\n                      <label for=\"\">Medicine Name</label>\r\n                      <input aria-describedby=\"\" disabled formControlName=\"medicationName\" class=\"form-control\" id=\"\" placeholder=\"\"\r\n                        type=\"text\">\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"col-lg-6\">\r\n                      <div class=\"form-group\">\r\n                        <label for=\"\">How to take</label>\r\n                        <input aria-describedby=\"\" disabled formControlName=\"howtotake\" class=\"form-control\" id=\"\" placeholder=\"\"\r\n                          type=\"text \">\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"row\" *ngIf=\"(this.HealthVM.studentMedicationID != 0 )\">\r\n                      <div class=\"col-lg-6\">\r\n                        <div class=\"form-group\">\r\n                          <label for=\"\">Dosage</label>\r\n                          <input aria-describedby=\"\" disabled formControlName=\"repeatdose\" class=\"form-control\" id=\"\" placeholder=\"\"\r\n                            type=\"text \">\r\n                        </div>\r\n                      </div>\r\n                      <div class=\"col-lg-6\">\r\n                          <div class=\"form-group\">\r\n                            <label for=\"\">Unit</label>\r\n                            <input aria-describedby=\"\" disabled formControlName=\"unit\" class=\"form-control\" id=\"\" placeholder=\"\"\r\n                              type=\"text \">\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                      <div class=\"row mb-20\" *ngIf=\"HealthVM.studentMedicationID\">\r\n                        <div *ngIf=\"HealthVM.isTeacherAcknowledge\" class=\"col-lg-6\">\r\n                            <p>  Acknowledge by  - <b>{{HealthVM.acknowledgeTeacherName}}</b> </p>\r\n                      </div>\r\n                      <div *ngIf=\"HealthVM.isParentAcknowledge\" class=\"col-lg-6\" >\r\n                          <p>  Acknowledge by parent - <b>{{HealthVM.acknowledgeParentName}}</b> </p>\r\n                      </div>\r\n                      </div>\r\n            </form>\r\n          </div>\r\n          <div class=\"modal-footer\">\r\n            <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\r\n            <button type=\"button\" *ngIf=\"showNeweEntryButton\" class=\"btn btn-primary\" (click)=\"addNewEntry(2,'health')\">Update changes</button>\r\n            <button type=\"button\" *ngIf=\"!showNeweEntryButton\" class=\"btn btn-primary\" disabled>Update changes</button>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n    <!-- Edit Nap -->\r\n    <div class=\"modal fade editshadow \" id=\"editnap\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"editactivityLabel\"\r\n      aria-hidden=\"true\">\r\n      <div class=\"modal-dialog\" role=\"document\">\r\n        <div class=\"modal-content\">\r\n          <div class=\"modal-header\">\r\n            <h5 class=\"modal-title\" id=\"editactivityLabel\">Update Daily Activity</h5>\r\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n              <span aria-hidden=\"true\">&times;</span>\r\n            </button>\r\n          </div>\r\n          <div class=\"modal-body\">\r\n            <ul class=\"nav nav-tabs\" id=\"myTab\" role=\"tablist\">\r\n              <li class=\"nav-item\">\r\n                <a class=\"nav-link active\" id=\"activity-tab\" data-toggle=\"tab\" href=\"#activity\" role=\"tab\"\r\n                  aria-controls=\"activity\" aria-selected=\"true\">\r\n                  <!-- <i class=\"fa fa-child\" aria-hidden=\"true\"></i> -->\r\n                  <img src=\"assets/img/napsm.svg\" class=\"napimg\" alt=\"\">\r\n                  <p>Nap</p>\r\n                </a>\r\n              </li>\r\n            </ul>\r\n            <div class=\"tab-content\" id=\"myTabContent\">\r\n              <div class=\"tab-pane fade show active\" id=\"activity\" role=\"tabpanel\" aria-labelledby=\"activity-tab\">\r\n                <form [formGroup]=\"napForm\">\r\n                  <div class=\"row mt-20\">\r\n                    <div class=\"col-lg-6\">\r\n                      <div class=\"form-group\">\r\n                        <label for=\"\">Sleep-At Time*</label>\r\n                        <p-calendar class=\"cutom-text-box-dailyactivity\" styleClass=\"form-control\" formControlName=\"napstart\"\r\n                          [timeOnly]=\"true\" hourFormat=\"12\" icon=\"pi pi-clock\" [showIcon]=\"true\"></p-calendar>\r\n                      </div>\r\n                    </div>\r\n                    <div class=\"col-lg-6\">\r\n                      <div class=\"form-group\">\r\n                        <label for=\"\">Woke-Up Time*</label>\r\n                        <p-calendar class=\"cutom-text-box-dailyactivity\" styleClass=\"form-control\" formControlName=\"napend\"\r\n                          [timeOnly]=\"true\" hourFormat=\"12\" icon=\"pi pi-clock\" [showIcon]=\"true\"></p-calendar>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"row\">\r\n                    <div class=\"col-lg-12\">\r\n                      <div class=\"form-group\">\r\n                        <label for=\"\">Description</label>\r\n                        <textarea aria-describedby=\"\" formControlName=\"napdiscription\" row=\"10\" class=\"form-control\" id=\"\"\r\n                          placeholder=\"Description\"></textarea>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </form>\r\n              </div>\r\n\r\n            </div>\r\n          </div>\r\n          <div class=\"modal-footer\">\r\n            <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\r\n            <button type=\"button\" *ngIf=\"showNeweEntryButton\" class=\"btn btn-primary\" (click)=\"addNewEntry(2,'nap')\">Update changes</button>\r\n            <button type=\"button\" *ngIf=\"!showNeweEntryButton\" class=\"btn btn-primary\" disabled>Update changes</button>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n\r\n     <!-- Edit Diper -->\r\n     <div class=\"modal fade editshadow \" id=\"editdiper\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"editactivityLabel\"\r\n     aria-hidden=\"true\">\r\n     <div class=\"modal-dialog\" role=\"document\">\r\n       <div class=\"modal-content\">\r\n         <div class=\"modal-header\">\r\n           <h5 class=\"modal-title\" id=\"editactivityLabel\">Update Daily Activity</h5>\r\n           <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n             <span aria-hidden=\"true\">&times;</span>\r\n           </button>\r\n         </div>\r\n         <div class=\"modal-body\">\r\n           <ul class=\"nav nav-tabs\" id=\"myTab\" role=\"tablist\">\r\n             <li class=\"nav-item\">\r\n               <a class=\"nav-link active\" id=\"activity-tab\" data-toggle=\"tab\" href=\"#activity\" role=\"tab\"\r\n                 aria-controls=\"activity\" aria-selected=\"true\">\r\n                 <!-- <i class=\"fa fa-child\" aria-hidden=\"true\"></i> -->\r\n                 <img src=\"assets/img/toiletsm.svg\" class=\"napimg\" style=\"height:25px\" alt=\"\">\r\n                 <p>Toileting</p>\r\n               </a>\r\n             </li>\r\n           </ul>\r\n           <div class=\"tab-content\" id=\"myTabContent\">\r\n             <div class=\"tab-pane fade show active\" id=\"activity\" role=\"tabpanel\" aria-labelledby=\"activity-tab\">\r\n               <form [formGroup]=\"diperForm\">\r\n                 <div class=\"row mt-20\">\r\n                   <div class=\"col-lg-6\">\r\n                     <div class=\"form-group\">\r\n                       <label for=\"\">Time*</label>\r\n                       <p-calendar class=\"cutom-text-box-dailyactivity\" styleClass=\"form-control\" formControlName=\"diperchangetime\"\r\n                         [timeOnly]=\"true\" hourFormat=\"12\" icon=\"pi pi-clock\" [showIcon]=\"true\"></p-calendar>\r\n                     </div>\r\n                   </div>\r\n                  \r\n                 </div>\r\n                 <div class=\"row\">\r\n                   <div class=\"col-lg-12\">\r\n                     <div class=\"form-group\">\r\n                       <label for=\"\">Description</label>\r\n                       <textarea aria-describedby=\"\" formControlName=\"description\" row=\"10\" class=\"form-control\" id=\"\"\r\n                         placeholder=\"Description\"></textarea>\r\n                     </div>\r\n                   </div>\r\n                 </div>\r\n                 <div class=\"row\">\r\n                  <div class=\"col-lg-12\">\r\n                    <div class=\"form-group\">\r\n                      <label for=\"\">Auto Key </label>\r\n                      <div class=\"scrolldiv\">\r\n                        <div class=\"row\">\r\n                           <div class=\"col-md-2\">\r\n                            <button type=\"button\" class=\"btn othernotebtn\" (click)=\"addDiaperSuggestion('Toilet Training / Toilet Used ')\">Toilet</button>\r\n                            </div>\r\n                            <div class=\"col-md-2\">\r\n                            <button type=\"button\" class=\"btn othernotebtn\" (click)=\"addDiaperSuggestion('Wet ')\">Wet</button>\r\n                            </div>\r\n                            <div class=\"col-md-2\">\r\n                            <button type=\"button\" class=\"btn othernotebtn\" (click)=\"addDiaperSuggestion('B/M')\">B/M</button>\r\n                          </div>\r\n                          <div class=\"col-md-2\">\r\n                            <button type=\"button\" class=\"btn othernotebtn\" (click)=\"addDiaperSuggestion('Diaper Change')\">Diaper</button>\r\n                           </div>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n               </form>\r\n             </div>\r\n\r\n           </div>\r\n         </div>\r\n         <div class=\"modal-footer\">\r\n           <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\r\n           <button type=\"button\" *ngIf=\"showNeweEntryButton\" class=\"btn btn-primary\" (click)=\"addNewEntry(2,'diper')\">Update changes</button>\r\n           <button type=\"button\" *ngIf=\"!showNeweEntryButton\" class=\"btn btn-primary\" disabled>Update changes</button>\r\n          </div>\r\n       </div>\r\n     </div>\r\n   </div>\r\n\r\n\r\n\r\n\r\n\r\n\r\n    <!-- (VIEW ACTIVITY) -->\r\n    <!-- Modal for update activity of individual as well as group -->\r\n    <div class=\"modal fade\" id=\"viewactivity\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"viewactivityLabel\"\r\n      aria-hidden=\"true\">\r\n      <div class=\"modal-dialog\" role=\"document\">\r\n        <div class=\"modal-content\">\r\n          <div class=\"modal-header\">\r\n            <h5 class=\"modal-title\" id=\"viewactivityLabel\">Activity Summary</h5>\r\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n              <span aria-hidden=\"true\">&times;</span>\r\n            </button>\r\n          </div>\r\n          <div class=\"modal-body\">\r\n\r\n\r\n            <div class=\"kiddetail d-flex justify-content-between mb-20 align-items-center\">\r\n              <div class=\"d-flex\">\r\n                <!-- <div class=\"chatimg\" *ngIf=\"studImage== ''\">\r\n                  <img src=\"assets/img/user.png\" alt=\"image\" class=\"img-fluid studchatimg\">\r\n                </div> -->\r\n                <div class=\"chatimg\" >\r\n                  <img src=\"{{studImage}}\" onError=\"this.src='assets/img/user.png'\" alt=\"image\" class=\"img-fluid studchatimg\">\r\n                </div>\r\n                <div>\r\n\r\n                </div>\r\n                <div class=\"chatdet\">\r\n                  <h5>{{studentName}}</h5>\r\n                  <p>{{className}}</p>\r\n\r\n                </div>\r\n              </div>\r\n\r\n              <div class=\"leftdetail\">\r\n                <ul>\r\n                  <!-- <li>\r\n                    <label for=\"exampleInputEmail1\">From</label>\r\n                  </li>\r\n                  <li>\r\n                    <div class=\"form-group\">\r\n                      <input type=\"date\" class=\"form-control\" id=\"exampleInputEmail1\" aria-describedby=\"emailHelp\"\r\n                        placeholder=\"dd/mm/yy\">\r\n                    </div>\r\n                  </li>\r\n                  <li>\r\n                    <label for=\"exampleInputEmail1\">To</label>\r\n                  </li>\r\n                  <li>\r\n                    <div class=\"form-group\">\r\n\r\n                      <input type=\"date\" class=\"form-control\" id=\"exampleInputEmail1\" aria-describedby=\"emailHelp\"\r\n                        placeholder=\"dd/mm/yy\">\r\n                    </div>\r\n                  </li> -->\r\n                  <!-- <li>\r\n                    <img src=\"assets/img/print.svg\" alt=\"\">\r\n                  </li> -->\r\n                  <!-- <li>\r\n                    <button type=\"submit\" class=\"btn btn-red\">Approve All</button>\r\n                  </li> -->\r\n                </ul>\r\n              </div>\r\n            </div>\r\n            <div class=\"row\">\r\n              <div class=\"col-lg-12\">\r\n                <ul class=\"nav nav-tabs\" id=\"myTab\" role=\"tablist\">\r\n                  <li class=\"nav-item\">\r\n                    <a class=\"nav-link active\" id=\"Health-tab\" data-toggle=\"tab\" href=\"#HealthList\" role=\"tab\"\r\n                      aria-controls=\"Health\" aria-selected=\"true\">Health</a>\r\n                  </li>\r\n                  <li class=\"nav-item\">\r\n                    <a class=\"nav-link\" id=\"Notes-tab\" data-toggle=\"tab\" href=\"#NotesList\" role=\"tab\" aria-controls=\"Notes\"\r\n                      aria-selected=\"false\">Notes</a>\r\n                  </li>\r\n                  <li class=\"nav-item\">\r\n                    <a class=\"nav-link\" id=\"Meal-tab\" data-toggle=\"tab\" href=\"#MealList\" role=\"tab\" aria-controls=\"Meal\"\r\n                      aria-selected=\"false\">Meal</a>\r\n                  </li>\r\n                  <li class=\"nav-item\">\r\n                    <a class=\"nav-link\" id=\"Mood-tab\" data-toggle=\"tab\" href=\"#MoodList\" role=\"tab\" aria-controls=\"Mood\"\r\n                      aria-selected=\"false\">Mood</a>\r\n                  </li>\r\n                  <li class=\"nav-item\">\r\n                    <a class=\"nav-link\" id=\"Activity-tab\" data-toggle=\"tab\" href=\"#ActivityList\" role=\"tab\"\r\n                      aria-controls=\"Activity\" aria-selected=\"false\">Activity</a>\r\n                  </li>\r\n                  <li class=\"nav-item\">\r\n                    <a class=\"nav-link\" id=\"Nap-tab\" data-toggle=\"tab\" href=\"#NapList\" role=\"tab\" aria-controls=\"Nap\"\r\n                      aria-selected=\"false\">Nap</a>\r\n                  </li>\r\n                  <li class=\"nav-item\">\r\n                    <a class=\"nav-link\" id=\"Diper-tab\" data-toggle=\"tab\" href=\"#DiperList\" role=\"tab\" aria-controls=\"Diper\"\r\n                      aria-selected=\"false\">Toileting</a>\r\n                  </li>\r\n                </ul>\r\n                <div class=\"tab-content\" id=\"myTabContent\">\r\n                  <div class=\"tab-pane fade show active\" id=\"HealthList\" role=\"tabpanel\" aria-labelledby=\"Health-tab\">\r\n                    <div class=\"innertable white_box_table\">\r\n                      <div class=\"table-responsive\">\r\n                        <table class=\"table\">\r\n                          <thead class=\"thead-light\">\r\n                            <!-- <tr> -->\r\n                            <th scope=\"col\">Temperature(°F)</th>\r\n                            <th scope=\"col\">Health Note</th>\r\n                            <th scope=\"col\">Action</th>\r\n                            <!-- </tr> -->\r\n                          </thead>\r\n                          <tbody *ngFor=\"let myact of myactivityList\">\r\n                            <!-- <tr *ngFor=\"let class of classList\">\r\n                              <td>{{class.className}}</td>\r\n                              \r\n                            </tr> -->\r\n                            <tr *ngIf=\"myact.activityTypeID == 1\">\r\n                              <td>{{myact.recordedTemparture}}</td>\r\n                              <td>{{myact.studentHealthDescription}}</td>\r\n                              <td>\r\n                                <a  data-toggle=\"modal\" data-target=\"#edithealth\" (click)=\"getActivityDetails(myact,'health',myact.studentID)\">\r\n                                  <i class=\"fa fa-pencil\" aria-hidden=\"true\"></i>\r\n                                </a>\r\n                                <a *ngIf=\"showNeweEntryButton\" (click)=\"deleteActivity(myact)\">\r\n                                  <i class=\"fa fa-trash\" aria-hidden=\"true\"></i>\r\n                                </a>\r\n                              </td>\r\n                            </tr>\r\n                            <!-- <tr>\r\n                              <td>20:30</td>\r\n                              <td>21:30</td>\r\n                              <td>He is dancing.</td>\r\n                            </tr> -->\r\n\r\n                          </tbody>\r\n                          <div class=\"text-center\">\r\n                            <span *ngIf=\"classList.length == 0\">No record found</span>\r\n                          </div>\r\n                        </table>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"tab-pane fade\" id=\"MealList\" role=\"tabpanel\" aria-labelledby=\"Meal-tab\">\r\n                    <div class=\"innertable white_box_table\">\r\n                      <div class=\"table-responsive\">\r\n                        <table class=\"table\">\r\n                          <thead class=\"thead-light\">\r\n                            <!-- <tr> -->\r\n                            <th>Meal plan</th>\r\n                            <th>Comments</th>\r\n                            <th>Other Meal plan</th>\r\n                            <th>Other Comments</th>\r\n                            <th>Action</th>\r\n\r\n                            <!-- </tr> -->\r\n                          </thead>\r\n                          <tbody *ngFor=\"let myact of myactivityList\">\r\n                            <tr *ngIf=\"myact.activityTypeID == 3\">\r\n                              <td>{{myact.mealPlanTitle}}</td>\r\n                              <td>{{myact.otherThanPlanMeal}}</td>\r\n                              <td>{{myact.mealComment}}</td>\r\n                              <td>{{myact.otherThanPlanMealComment}}</td>\r\n                              <td>\r\n                                <a href=\"\" data-toggle=\"modal\" data-target=\"#editmeal\" (click)=\"getActivityDetails(myact,'meal',myact.studentID)\">\r\n                                  <i class=\"fa fa-pencil\" aria-hidden=\"true\"></i>\r\n                                </a>\r\n                                <a (click)=\"deleteActivity(myact)\">\r\n                                  <i class=\"fa fa-trash\" aria-hidden=\"true\"></i>\r\n                                </a>\r\n                              </td>\r\n                            </tr>\r\n                          </tbody>\r\n                          <div class=\"text-center\">\r\n                            <span *ngIf=\"classList.length == 0\">No record found</span>\r\n                          </div>\r\n                        </table>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"tab-pane fade\" id=\"MoodList\" role=\"tabpanel\" aria-labelledby=\"Mood-tab\">\r\n                    <div class=\"innertable white_box_table\">\r\n                      <div class=\"table-responsive\">\r\n                        <table class=\"table\">\r\n                          <thead class=\"thead-light\">\r\n                            <!-- <tr> -->\r\n                            <th>My Mood was</th>\r\n                            <th>Comments</th>\r\n                            <th>Action</th>\r\n\r\n                            <!-- </tr> -->\r\n                          </thead>\r\n                          <tbody *ngFor=\"let myact of myactivityList\">\r\n                            <tr *ngIf=\"myact.activityTypeID == 4\">\r\n                              <td>{{myact.moodTypeName}}</td>\r\n                              <td>{{myact.studentMoodDescription}}</td>\r\n                              <td>\r\n                                <a href=\"\" data-toggle=\"modal\" data-target=\"#editmood\" (click)=\"getActivityDetails(myact,'mood',myact.studentID)\">\r\n                                  <i class=\"fa fa-pencil\" aria-hidden=\"true\"></i>\r\n                                </a>\r\n                                <a *ngIf=\"showNeweEntryButton\" (click)=\"deleteActivity(myact)\">\r\n                                  <i class=\"fa fa-trash\" aria-hidden=\"true\"></i>\r\n                                </a>\r\n                              </td>\r\n                            </tr>\r\n                          </tbody>\r\n                          <div class=\"text-center\">\r\n                            <span *ngIf=\"classList.length == 0\">No record found</span>\r\n                          </div>\r\n                        </table>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"tab-pane fade\" id=\"ActivityList\" role=\"tabpanel\" aria-labelledby=\"Activity-tab\">\r\n                    <div class=\"innertable white_box_table\">\r\n                      <div class=\"table-responsive\">\r\n                        <table class=\"table\">\r\n                          <thead class=\"thead-light\">\r\n                            <!-- <tr> -->\r\n                            <th scope=\"col\">Start Time</th>\r\n                            <th scope=\"col\">End Time</th>\r\n                            <th scope=\"col\">Activity Note</th>\r\n                            <th scope=\"col\">Action</th>\r\n                            <!-- </tr> -->\r\n                          </thead>\r\n                          <tbody *ngFor=\"let myact of myactivityList\">\r\n                            <!-- <tr *ngFor=\"let class of classList\">\r\n                              <td>{{class.className}}</td>\r\n                              \r\n                            </tr> -->\r\n                            <tr *ngIf=\"myact.activityTypeID == 5\">\r\n                              <td>{{myact.startTime |date: 'h:mm a'}}</td>\r\n                              <td>{{myact.endTime| date: 'h:mm a'}}</td>\r\n                              <td>{{myact.otherActivityNote}}</td>\r\n                              <td>\r\n                                <a href=\"\" data-toggle=\"modal\" data-target=\"#editactivity\" (click)=\"getActivityDetails(myact,'activity',myact.studentID)\">\r\n                                  <i class=\"fa fa-pencil\" aria-hidden=\"true\"></i>\r\n                                </a>\r\n                                <a *ngIf=\"showNeweEntryButton\" (click)=\"deleteActivity(myact)\">\r\n                                  <i class=\"fa fa-trash\" aria-hidden=\"true\"></i>\r\n                                </a>\r\n                              </td>\r\n                            </tr>\r\n                            <!-- <tr>\r\n                              <td>20:30</td>\r\n                              <td>21:30</td>\r\n                              <td>He is dancing.</td>\r\n                            </tr> -->\r\n\r\n                          </tbody>\r\n                          <div class=\"text-center\">\r\n                            <span *ngIf=\"classList.length == 0\">No record found</span>\r\n                          </div>\r\n                        </table>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"tab-pane fade\" id=\"NapList\" role=\"tabpanel\" aria-labelledby=\"Nap-tab\">\r\n                    <div class=\"innertable white_box_table\">\r\n                      <div class=\"table-responsive\">\r\n                        <table class=\"table\">\r\n                          <thead class=\"thead-light\">\r\n                            <!-- <tr> -->\r\n                            <th scope=\"col\">Sleep-At Time</th>\r\n                            <th scope=\"col\">Woke-Up Time</th>\r\n                            <th scope=\"col\">Description</th>\r\n                            <th scope=\"col\">Action</th>\r\n                            <!-- </tr> -->\r\n                          </thead>\r\n                          <tbody *ngFor=\"let myact of myactivityList\">\r\n                            <!-- <tr *ngFor=\"let class of classList\">\r\n                              <td>{{class.className}}</td>\r\n                              \r\n                            </tr> -->\r\n                            <tr *ngIf=\"myact.activityTypeID == 6\">\r\n                              <td>{{myact.sleptAtTime | date: 'h:mm a'}}</td>\r\n                              <td>{{myact.workUpTime| date: 'h:mm a'}}</td>\r\n                              <td>{{myact.napNote}}</td>\r\n                              <td>\r\n                                <a href=\"\" data-toggle=\"modal\" data-target=\"#editnap\" (click)=\"getActivityDetails(myact,'nap',myact.studentID)\">\r\n                                  <i class=\"fa fa-pencil\" aria-hidden=\"true\"></i>\r\n                                </a>\r\n                                <a *ngIf=\"showNeweEntryButton\" (click)=\"deleteActivity(myact)\">\r\n                                  <i class=\"fa fa-trash\" aria-hidden=\"true\"></i>\r\n                                </a>\r\n                              </td>\r\n                            </tr>\r\n                            <!-- <tr>\r\n                              <td>20:30</td>\r\n                              <td>21:30</td>\r\n                              <td>He is dancing.</td>\r\n                            </tr> -->\r\n\r\n                          </tbody>\r\n                          <div class=\"text-center\">\r\n                            <span *ngIf=\"classList.length == 0\">No record found</span>\r\n                          </div>\r\n                        </table>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"tab-pane fade\" id=\"NotesList\" role=\"tabpanel\" aria-labelledby=\"Note-tab\">\r\n                    <div class=\"innertable white_box_table\">\r\n                      <div class=\"table-responsive\">\r\n                        <table class=\"table\">\r\n                          <thead class=\"thead-light\">\r\n                            <!-- <tr> -->\r\n                            <th scope=\"col\">Note If Any</th>\r\n                            <th scope=\"col\">Action</th>\r\n                            <!-- </tr> -->\r\n                          </thead>\r\n                          <tbody *ngFor=\"let myact of myactivityList\">\r\n                            <!-- <tr *ngFor=\"let class of classList\">\r\n                              <td>{{class.className}}</td>\r\n                              \r\n                            </tr> -->\r\n                            <tr *ngIf=\"myact.activityTypeID == 2\">\r\n                              <td>{{myact.noteDescription}}</td>\r\n                              <td>\r\n                                <a href=\"\" data-toggle=\"modal\" data-target=\"#editpost\" (click)=\"getActivityDetails(myact,'notes',myact.studentID)\">\r\n                                  <i class=\"fa fa-pencil\" aria-hidden=\"true\"></i>\r\n                                </a>\r\n                                <a *ngIf=\"showNeweEntryButton\" (click)=\"deleteActivity(myact)\">\r\n                                  <i class=\"fa fa-trash\" aria-hidden=\"true\"></i>\r\n                                </a>\r\n                              </td>\r\n                            </tr>\r\n                            <!-- <tr>\r\n                              <td>20:30</td>\r\n                              <td>21:30</td>\r\n                              <td>He is dancing.</td>\r\n                            </tr> -->\r\n\r\n                          </tbody>\r\n                          <div class=\"text-center\">\r\n                            <span *ngIf=\"classList.length == 0\">No record found</span>\r\n                          </div>\r\n                        </table>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n\r\n\r\n                  <div class=\"tab-pane fade\" id=\"DiperList\" role=\"tabpanel\" aria-labelledby=\"Diper-tab\">\r\n                    <div class=\"innertable white_box_table\">\r\n                      <div class=\"table-responsive\">\r\n                        <table class=\"table\">\r\n                          <thead class=\"thead-light\">\r\n                            <!-- <tr> -->\r\n                            \r\n                            <th scope=\"col\">Time</th>\r\n                            <th scope=\"col\">Description</th>\r\n                            <th scope=\"col\">Action</th>\r\n                            <!-- </tr> -->\r\n                          </thead>\r\n                          <tbody *ngFor=\"let myact of myactivityList\">\r\n                            \r\n                            <tr *ngIf=\"myact.activityTypeID == 7\">\r\n                              <td>{{myact.diaperChangeTime |  date: 'h:mm a'}}</td>\r\n                              <td>{{myact.studentActivityDiaperNote}}</td>\r\n                              <td>\r\n                                <a href=\"\" data-toggle=\"modal\" data-target=\"#editdiper\" (click)=\"getActivityDetails(myact,'diper',myact.studentID)\">\r\n                                  <i class=\"fa fa-pencil\" aria-hidden=\"true\"></i>\r\n                                </a>\r\n                                <a *ngIf=\"showNeweEntryButton\" (click)=\"deleteActivity(myact)\">\r\n                                  <i class=\"fa fa-trash\" aria-hidden=\"true\"></i>\r\n                                </a>\r\n                              </td>\r\n                            </tr>\r\n                            <!-- <tr>\r\n                              <td>20:30</td>\r\n                              <td>21:30</td>\r\n                              <td>He is dancing.</td>\r\n                            </tr> -->\r\n\r\n                          </tbody>\r\n                          <div class=\"text-center\">\r\n                            <span *ngIf=\"classList.length == 0\">No record found</span>\r\n                          </div>\r\n                        </table>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"modal-footer\">\r\n            <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n\r\n\r\n\r\n<!-- Modal for update activity of individual as well as group  Group12-->\r\n<div class=\"modal fade\" id=\"editactivity12\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"editactivityLabel\" aria-hidden=\"true\">\r\n  <div class=\"modal-dialog\" role=\"document\">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h5 class=\"modal-title\" id=\"editactivityLabel\">Update Daily Activity</h5>\r\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-body\">\r\n        <!-- <ul class=\"nav nav-pills p-act mb-3\" id=\"pills-tab\" role=\"tablist\">\r\n                 <li class=\"nav-item\">\r\n                   <a class=\"nav-link active\" id=\"pills-activity-tab\" data-toggle=\"pill\" href=\"#pills-activity\" role=\"tab\" aria-controls=\"pills-activity\"\r\n                     aria-selected=\"true\">\r\n                     <img src=\"assets/img/pdf.svg\" alt=\"\">\r\n                     <p>Activity</p>\r\n                   </a>\r\n                 </li>\r\n                 <li class=\"nav-item\">\r\n                   <a class=\"nav-link\" id=\"pills-meal-tab\" data-toggle=\"pill\" href=\"#pills-meal\" role=\"tab\" aria-controls=\"pills-meal\" aria-selected=\"false\">\r\n                     <img src=\"assets/img/pdf.svg\" alt=\"\">\r\n                     <p>Meal</p>\r\n                   </a>\r\n                 </li>\r\n                 <li class=\"nav-item\">\r\n                   <a class=\"nav-link\" id=\"pills-health-tab\" data-toggle=\"pill\" href=\"#pills-health\" role=\"tab\" aria-controls=\"pills-health\"\r\n                     aria-selected=\"false\">\r\n                     <img src=\"assets/img/pdf.svg\" alt=\"\">\r\n                     <p>Health</p>\r\n                   </a>\r\n                 </li>\r\n                 <li class=\"nav-item\">\r\n                   <a class=\"nav-link\" id=\"pills-mood-tab\" data-toggle=\"pill\" href=\"#pills-mood\" role=\"tab\" aria-controls=\"pills-mood\" aria-selected=\"false\">\r\n                     <img src=\"assets/img/pdf.svg\" alt=\"\">\r\n                     <p> Mood</p>\r\n                   </a>\r\n                 </li>\r\n             </ul>\r\n             <div class=\"tab-content p-cont\" id=\"pills-tabContent\">\r\n               <div class=\"tab-pane fade show active\" id=\"pills-activity\" role=\"tabpanel\" aria-labelledby=\"pills-activity-tab\">\r\n                 Activty\r\n               </div>\r\n               <div class=\"tab-pane fade\" id=\"pills-meal\" role=\"tabpanel\" aria-labelledby=\"pills-meal-tab\">Meal</div>\r\n               <div class=\"tab-pane fade\" id=\"pills-health\" role=\"tabpanel\" aria-labelledby=\"pills-health-tab\">Health</div>\r\n               <div class=\"tab-pane fade\" id=\"pills-mood\" role=\"tabpanel\" aria-labelledby=\"pills-mood-tab\">\r\n                 <div class=\"Moods\">\r\n                   <h2>My Mood was...</h2>\r\n                   <div id=\"radios\">\r\n                     <label for=\"m1\" class=\"material-icons\">\r\n                       <input type=\"radio\" name=\"mode\" id=\"m1\" value=\"driving\" checked/>\r\n                       <span>\r\n                         <img src=\"assets/img/sleeping.svg\" alt=\"\">\r\n                       </span>\r\n                       <p> Sleeping</p>\r\n                     </label>\r\n                     <label for=\"m2\" class=\"material-icons\">\r\n                       <input type=\"radio\" name=\"mode\" id=\"m2\" value=\"cycling\" />\r\n                       <span>\r\n                         <img src=\"assets/img/happy.svg\" alt=\"\">\r\n                       </span>\r\n                       <p>Happy</p>\r\n                     </label>\r\n                     <label for=\"m3\" class=\"material-icons\">\r\n                       <input type=\"radio\" name=\"mode\" id=\"m3\" value=\"walking\" />\r\n                       <span>\r\n                         <img src=\"assets/img/sad.svg\" alt=\"\">\r\n                       </span>\r\n                       <p>Sad</p>\r\n                     </label>\r\n                   </div>\r\n                 </div>\r\n               </div>\r\n             </div> -->\r\n\r\n        <ul class=\"nav nav-tabs\" id=\"myTab\" role=\"tablist\">\r\n          <li class=\"nav-item\" (click)=\"getFormType('activity')\">\r\n            <a class=\"nav-link active\" id=\"activity-tab\" data-toggle=\"tab\" href=\"#activity1\" role=\"tab\" aria-controls=\"activity\"\r\n              aria-selected=\"false\">\r\n              <!-- <i class=\"fa fa-child\" aria-hidden=\"true\"></i> -->\r\n              <img src=\"assets/img/circular-clock.svg\" alt=\"\">\r\n              <p>Activity</p>\r\n            </a>\r\n          </li>\r\n          <li class=\"nav-item\" (click)=\"getFormType('meal')\">\r\n            <a class=\"nav-link\" id=\"meal-tab\" data-toggle=\"tab\" href=\"#meal\" role=\"tab\" aria-controls=\"meal\"\r\n              aria-selected=\"false\">\r\n              <!-- <i class=\"fa fa-child\" aria-hidden=\"true\"></i> -->\r\n              <img src=\"assets/img/restaurant.svg\" alt=\"\">\r\n              <p>Meal</p>\r\n            </a>\r\n          </li>\r\n          <li class=\"nav-item\" (click)=\"getFormType('health')\">\r\n            <a class=\"nav-link\" id=\"health-tab\" data-toggle=\"tab\" href=\"#health\" role=\"tab\" aria-controls=\"health\"\r\n              aria-selected=\"false\">\r\n              <!-- <i class=\"fa fa-child\" aria-hidden=\"true\"></i> -->\r\n              <img src=\"assets/img/stethoscope.svg\" alt=\"\" width=\"25px\">\r\n              <p>Health</p>\r\n            </a>\r\n          </li>\r\n          <li class=\"nav-item\" (click)=\"getFormType('mood')\">\r\n            <a class=\"nav-link\" id=\"mood-tab\" data-toggle=\"tab\" href=\"#mood\" role=\"tab\" aria-controls=\"mood\"\r\n              aria-selected=\"false\">\r\n              <!-- <i class=\"fa fa-child\" aria-hidden=\"true\"></i> -->\r\n              <img src=\"assets/img/satisfaction.svg\" alt=\"\">\r\n              <p>Mood</p>\r\n            </a>\r\n          </li>\r\n          <li class=\"nav-item\" (click)=\"getFormType('notes')\">\r\n            <a class=\"nav-link\" id=\"notes-tab\" data-toggle=\"tab\" href=\"#notes\" role=\"tab\" aria-controls=\"notes\"\r\n              aria-selected=\"false\">\r\n              <!-- <i class=\"fa fa-child\" aria-hidden=\"true\"></i> -->\r\n              <img src=\"assets/img/post-it.svg\" alt=\"\" width=\"25px\">\r\n              <p>Notes</p>\r\n            </a>\r\n          </li>\r\n          <li class=\"nav-item\" (click)=\"getFormType('nap')\">\r\n            <a class=\"nav-link\" id=\"nap-tab\" data-toggle=\"tab\" href=\"#nap1\" role=\"tab\" aria-controls=\"nap\"\r\n              aria-selected=\"false\">\r\n              <!-- <i class=\"fa fa-child\" aria-hidden=\"true\"></i> -->\r\n              <img src=\"assets/img/napsm.svg\" alt=\"\" width=\"25px\">\r\n              <p>Nap</p>\r\n            </a>\r\n          </li>\r\n\r\n          <li class=\"nav-item\" (click)=\"getFormType('diper')\">\r\n            <a class=\"nav-link\" id=\"nap-tab\" data-toggle=\"tab\" href=\"#diper1\" role=\"tab\" aria-controls=\"diper\"\r\n              aria-selected=\"false\">\r\n              <!-- <i class=\"fa fa-child\" aria-hidden=\"true\"></i> -->\r\n              <img src=\"assets/img/toiletsm.svg\" alt=\"\" style=\"height:25px\" width=\"25px\">\r\n              <p>Toileting</p>\r\n            </a>\r\n          </li>\r\n        </ul>\r\n        <div class=\"tab-content\" id=\"myTabContent\">\r\n          <div class=\"tab-pane fade show active\" id=\"activity1\" role=\"tabpanel\" aria-labelledby=\"activity-tab\">\r\n\r\n            <form [formGroup]=\"activityForm\">\r\n              <div class=\"row mt-20\">\r\n                <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"\">Start Time* </label>\r\n                    <!-- <input type=\"text \"  formControlName=\"starttime\" class=\"form-control\" id=\"\" aria-describedby=\"\" placeholder=\"Select Start Time\"> -->\r\n                    <p-calendar class=\"cutom-text-box-dailyactivity\" styleClass=\"form-control\" formControlName=\"starttime\"\r\n                      [timeOnly]=\"true\" hourFormat=\"12\" icon=\"pi pi-clock\" [showIcon]=\"true\"></p-calendar>\r\n                    <!-- <div *ngIf=\"activity.starttime.invalid && (activity.starttime.dirty || activity.starttime.touched)\" class=\"text-left errormsg\">\r\n                      <span *ngIf=\"activity.starttime.errors.required\">\r\n                        <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please select time</span>\r\n                      </span>\r\n                    </div> -->\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"\">End Time*</label>\r\n                    <!-- <input type=\"text \"  formControlName=\"endtime\" class=\"form-control\" id=\"\" aria-describedby=\"\" placeholder=\"Select End Time\"> -->\r\n                    <p-calendar class=\"cutom-text-box-dailyactivity\" styleClass=\"form-control\" formControlName=\"endtime\"\r\n                      [timeOnly]=\"true\" hourFormat=\"12\" icon=\"pi pi-clock\" [showIcon]=\"true\"></p-calendar>\r\n                    <!-- <div *ngIf=\"activity.endtime.invalid && (activity.endtime.dirty || activity.endtime.touched)\" class=\"text-left errormsg\">\r\n                      <span *ngIf=\"activity.endtime.errors.required\">\r\n                        <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please select time</span>\r\n                      </span>\r\n                    </div> -->\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"row\">\r\n                <div class=\"col-lg-12\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"\">Activity Notes*</label>\r\n                    <textarea aria-describedby=\"\" formControlName=\"activity\" row=\"10\" class=\"form-control\" id=\"\"\r\n                      placeholder=\"Activity Notes\"></textarea>\r\n                    <!-- <div *ngIf=\"activity.activity.invalid && (activity.activity.dirty || activity.activity.touched)\" class=\"text-left errormsg\">\r\n                    <span *ngIf=\"activity.activity.errors.required\">\r\n                      <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please eneter activity notes </span>\r\n                    </span>\r\n                  </div> -->\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"row\">\r\n                  <div class=\"col-lg-12\">\r\n                    <div class=\"form-group\">\r\n                      <label for=\"\">Auto Key </label>\r\n                      <div class=\"scrolldiv\">\r\n                        <div class=\"row\">\r\n                          <div class=\"col-md-12 col-lg-12\">\r\n                            <ul class=\"list5Item\">\r\n                              <li  *ngFor=\"let sbact of subActivityList\">  <button type=\"button\" class=\"btn othernotebtn\" (click)=\"addSuggestion(sbact,subActivityList.length)\">{{sbact.subActivityLabel}}</button></li>\r\n                            </ul>\r\n                          </div>                        \r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n\r\n            </form>\r\n\r\n          </div>\r\n\r\n          <div class=\"tab-pane fade\" id=\"meal\" role=\"tabpanel\" aria-labelledby=\"meal-tab\">\r\n\r\n            <form [formGroup]=\"mealForm\">\r\n\r\n\r\n              <div class=\"row mb-20 mt-20\">\r\n                <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"exampleFormControlSelect1\">Meal Plan*</label>\r\n                    <select class=\"form-control\" placeholder=\"Meal Plan\" formControlName=\"plantype\" id=\"exampleFormControlSelect1\"\r\n                      (change)=\"getSelectedMealPlan()\">\r\n                      <option value=\"\">Select </option>\r\n                      <option *ngFor=\"let obj of mealPlanList\" [value]=\"obj.mealPlannerID\">{{obj.mealPlanTitle}}</option>\r\n                    </select>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n\r\n              <!-- <div class=\"row mb-20 mt-20\"> -->\r\n              <div class=\"table-responsive\" *ngIf=\"foodList.length != 0\">\r\n                <table class=\"table\">\r\n                  <thead class=\"thead-light\">\r\n                    <tr>\r\n                      <!-- <th scope=\"col\">#ID</th> -->\r\n                      <th scope=\"col\">Food Item</th>\r\n                      <th scope=\"col\">Amount</th>\r\n                      <th scope=\"col\">Unit</th>\r\n                      <th>consumed Amount*</th>\r\n                    </tr>\r\n                  </thead>\r\n                  <tbody>\r\n                    <tr *ngFor=\"let food of foodList; let item of mealForm.get('foodconsumption').controls; let i = index;\"  formArrayName=\"foodconsumption\">\r\n                      <td>{{food.foodTypeName}}</td>\r\n                      <td>{{food.amount}}</td>\r\n                      <td>{{food.measureUnitTypeName}}</td>\r\n\r\n                      <td  [formGroupName]=\"i\">\r\n                        <input type=\"text \" *ngIf=\"(food.measureUnitTypeID == 8 )\" class=\"form-control\" (blur)=\"getConsumedAmount(food)\"\r\n                          formControlName=\"milkconsumptionquantity\" id=\"\" aria-describedby=\"\" placeholder=\"consumed amount\">\r\n                        <select class=\"form-control\" *ngIf=\"food.measureUnitTypeID != 8 \" placeholder=\"Select\" (change)=\"getConsumedAmount(food)\"\r\n                          formControlName=\"foodconsumtionid\" id=\"exampleFormControlSelect1\">\r\n                          <option value=\"\">Select </option>\r\n                          <option *ngFor=\"let obj of foodConsumptionType\" [value]=\"obj.id\">{{obj.foodConsumtionName}}</option>\r\n                        </select>\r\n                      </td>\r\n\r\n                    </tr>\r\n\r\n\r\n                  </tbody>\r\n                </table>\r\n\r\n              </div>\r\n\r\n              <div class=\"row mb-20 mt-20\">\r\n                <div class=\"col-lg-12\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"\">Other than plan meal </label>\r\n                    <!-- <input type=\"text \" class=\"form-control\" formControlName=\"othermealplan\" id=\"\" aria-describedby=\"\"\r\n                      placeholder=\"Enter Other Meal\"> -->\r\n                      <textarea name=\"\" id=\"\" cols=\"30\" rows=\"6\" placeholder=\"Other than plan meal\" class=\"form-control\" formControlName=\"othermealplan\"></textarea>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n\r\n              <div class=\"row mb-20 mt-20\">\r\n                  <div class=\"col-lg-6\">\r\n                      <div class=\"form-group\">\r\n                        <label for=\"\">Other than plan meal comment</label>\r\n                        <input type=\"text \" class=\"form-control\" formControlName=\"othermealcmnt\" id=\"\" aria-describedby=\"\"\r\n                          placeholder=\"Other than plan meal comment\">\r\n                      </div>\r\n                    </div>\r\n                <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"\">Comment</label>\r\n                    <input type=\"text \" class=\"form-control\" formControlName=\"mealcmnt\" id=\"\" aria-describedby=\"\"\r\n                      placeholder=\"Enter Comment\">\r\n                  </div>\r\n                </div> \r\n              </div>\r\n            </form>\r\n\r\n          </div>\r\n          <div class=\"tab-pane fade\" id=\"health\" role=\"tabpanel\" aria-labelledby=\"health-tab\">\r\n            <form [formGroup]=\"healthForm\">\r\n              <div class=\"row mt-20\">\r\n                <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"\">Add Temperature(°F) </label>\r\n                    <input aria-describedby=\"\" class=\"form-control\" formControlName=\"temperature\" id=\"\" placeholder=\"\"\r\n                      type=\"text \">\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-lg-6\"></div>\r\n                <div class=\"col-lg-12\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"\">Health Note*</label>\r\n                    <textarea aria-describedby=\"\" row=\"10\" formControlName=\"tempcmnt\" class=\"form-control\" id=\"\"\r\n                      placeholder=\"Health note\"></textarea>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </form>\r\n          </div>\r\n          <div class=\"tab-pane fade\" id=\"mood\" role=\"tabpanel\" aria-labelledby=\"mood-tab\">\r\n            <form [formGroup]=\"moodForm\">\r\n              <!-- <div class=\"Moods\"> -->\r\n\r\n              <!-- <div class=\"forall\">\r\n\r\n                For All Day\r\n                <label class=\"switch1\">\r\n                  <input class=\"switch-input\" type=\"checkbox\" />\r\n                  <span class=\"switch-label1\" data-on=\"On\" data-off=\"Off\"></span>\r\n                  <span class=\"switch-handle\"></span>\r\n                </label>\r\n              </div> -->\r\n\r\n              <h3> My Mood was...*</h3>\r\n              <div class=\"middle\">\r\n                <label>\r\n                  <input type=\"radio\" name=\"radio\" (click)=\"getMarkedMood(1)\" />\r\n                  <div class=\"front-end box\">\r\n                    <span>\r\n                      <img src=\"assets/img/happymob.svg\" alt=\"\">\r\n                    </span>\r\n                    <p>Happy</p>\r\n                  </div>\r\n                </label>\r\n                <label>\r\n                  <input type=\"radio\" name=\"radio\" (click)=\"getMarkedMood(2)\" />\r\n                  <div class=\"front-end box\">\r\n                    <span>\r\n                      <img src=\"assets/img/cryingmob.svg\" alt=\"\">\r\n                    </span>\r\n                    <p>Sad</p>\r\n                  </div>\r\n                </label>\r\n\r\n                <label>\r\n                  <input type=\"radio\" name=\"radio\" (click)=\"getMarkedMood(3)\" />\r\n                  <div class=\"back-end box\">\r\n                    <span>\r\n                      <img src=\"assets/img/playfull.png\" alt=\"\">\r\n                    </span>\r\n                    <p> Playful</p>\r\n                  </div>\r\n                </label>\r\n\r\n                <label>\r\n                  <input type=\"radio\" name=\"radio\" (click)=\"getMarkedMood(4)\" />\r\n                  <div class=\"back-end box\">\r\n                    <span>\r\n                      <img src=\"assets/img/tired.png\" alt=\"\">\r\n                    </span>\r\n                    <p>Fussy </p>\r\n                  </div>\r\n                </label>\r\n\r\n                <label>\r\n                  <input type=\"radio\" name=\"radio\" (click)=\"getMarkedMood(5)\" />\r\n                  <div class=\"back-end box\">\r\n                    <span>\r\n                      <img src=\"assets/img/Grumpy.png\" alt=\"\">\r\n                    </span>\r\n                    <p>Grumpy</p>\r\n                  </div>\r\n                </label>\r\n              </div>\r\n              <!-- </div> -->\r\n              <div class=\"form-group\">\r\n                <label for=\"\">Comments*</label>\r\n                <textarea aria-describedby=\"\" row=\"10\" class=\"form-control\" formControlName=\"moodcomment\" id=\"\"\r\n                  placeholder=\"Enter Comment\"></textarea>\r\n              </div>\r\n            </form>\r\n\r\n          </div>\r\n          <div class=\"tab-pane fade\" id=\"notes\" role=\"tabpanel\" aria-labelledby=\"notes-tab\">\r\n            <form [formGroup]=\"notesForm\">\r\n              <div class=\"form-group\">\r\n                <label for=\"\">Notes if any *</label>\r\n                <textarea aria-describedby=\"\" row=\"10\" formControlName=\"notes\" class=\"form-control\" id=\"\" placeholder=\"Notes if any\"></textarea>\r\n              </div>\r\n            </form>\r\n          </div>\r\n          <div class=\"tab-pane \" id=\"nap1\" role=\"tabpanel\" aria-labelledby=\"nap-tab\">\r\n\r\n            <form [formGroup]=\"napForm\">\r\n              <div class=\"row mt-20\">\r\n                <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"\">Sleep-At Time*</label>\r\n                    <p-calendar class=\"cutom-text-box-dailyactivity\" styleClass=\"form-control\" formControlName=\"napstart\"\r\n                      [timeOnly]=\"true\" hourFormat=\"12\" icon=\"pi pi-clock\" [showIcon]=\"true\"></p-calendar>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"\">Woke-Up Time*</label>\r\n                    <p-calendar class=\"cutom-text-box-dailyactivity\" styleClass=\"form-control\" formControlName=\"napend\"\r\n                      [timeOnly]=\"true\" hourFormat=\"12\" icon=\"pi pi-clock\" [showIcon]=\"true\"></p-calendar>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"row\">\r\n                <div class=\"col-lg-12\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"\">Description</label>\r\n                    <textarea aria-describedby=\"\" formControlName=\"napdiscription\" row=\"10\" class=\"form-control\" id=\"\"\r\n                      placeholder=\"Description\"></textarea>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n\r\n            </form>\r\n\r\n          </div>\r\n\r\n          <div class=\"tab-pane \" id=\"diper1\" role=\"tabpanel\" aria-labelledby=\"nap-tab\">\r\n\r\n            <form [formGroup]=\"diperForm\">\r\n              <div class=\"row mt-20\">\r\n                <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"\">Time*</label>\r\n                    <p-calendar class=\"cutom-text-box-dailyactivity\" styleClass=\"form-control\" formControlName=\"diperchangetime\"\r\n                      [timeOnly]=\"true\" hourFormat=\"12\" icon=\"pi pi-clock\" [showIcon]=\"true\"></p-calendar>\r\n                  </div>\r\n                </div>\r\n                \r\n              </div>\r\n              <div class=\"row\">\r\n                <div class=\"col-lg-12\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"\">Description</label>\r\n                    <textarea aria-describedby=\"\" formControlName=\"description\" row=\"10\" class=\"form-control\" id=\"\"\r\n                      placeholder=\"Description\"></textarea>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"row\">\r\n                <div class=\"col-lg-12\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"\">Auto Key </label>\r\n                    <div class=\"scrolldiv\">\r\n                      <div class=\"row\">\r\n                        <div class=\"col-md-2\">\r\n                          <button type=\"button\" class=\"btn othernotebtn\" (click)=\"addDiaperSuggestion('Diaper Change')\">Diaper</button>\r\n                         </div>\r\n                         <div class=\"col-md-2\">\r\n                          <button type=\"button\" class=\"btn othernotebtn\" (click)=\"addDiaperSuggestion('Toilet Training / Toilet Used ')\">Toilet</button>\r\n                          </div>\r\n                          <div class=\"col-md-2\">\r\n                          <button type=\"button\" class=\"btn othernotebtn\" (click)=\"addDiaperSuggestion('Wet ')\">Wet</button>\r\n                          </div>\r\n                          <div class=\"col-md-2\">\r\n                          <button type=\"button\" class=\"btn othernotebtn\" (click)=\"addDiaperSuggestion('B/M')\">B/M</button>\r\n                        </div>\r\n                        <div class=\"col-md-2\">\r\n                          <button type=\"button\" class=\"btn othernotebtn\" (click)=\"addDiaperSuggestion('Dry')\">Dry</button>\r\n                          </div>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n\r\n            </form>\r\n\r\n          </div>\r\n\r\n\r\n        </div>\r\n\r\n      </div>\r\n      <div class=\"modal-footer\">\r\n        <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\r\n        <button type=\"submit\" class=\"btn btn-primary\" (click)=\"addNewEntry(1,'activity')\">Save changes</button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n\r\n<ngx-spinner type=\"ball-atom\" size=\"medium\" color=\"#58A7FE\"></ngx-spinner>\r\n<app-confirm-box></app-confirm-box>\r\n"

/***/ }),

/***/ "./src/app/layout/teacher/components/teacher-daily-activity/teacher-daily-activity.component.ts":
/*!******************************************************************************************************!*\
  !*** ./src/app/layout/teacher/components/teacher-daily-activity/teacher-daily-activity.component.ts ***!
  \******************************************************************************************************/
/*! exports provided: TeacherDailyActivityComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TeacherDailyActivityComponent", function() { return TeacherDailyActivityComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_services_teacher_api_service_teacher_api_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/services/teacher-api-service/teacher-api.service */ "./src/app/layout/teacher/shared/services/teacher-api-service/teacher-api.service.ts");
/* harmony import */ var _shared_services_error_handler_error_handler_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../shared/services/error-handler/error-handler.service */ "./src/app/shared/services/error-handler/error-handler.service.ts");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var _shared_services_notification_service_notification_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../shared/services/notification-service/notification.service */ "./src/app/shared/services/notification-service/notification.service.ts");
/* harmony import */ var _shared_services_common_common_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../shared/services/common/common.service */ "./src/app/shared/services/common/common.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! primeng/api */ "./node_modules/primeng/api.js");
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(primeng_api__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _shared_constant__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../shared/constant */ "./src/app/layout/teacher/shared/constant.ts");
/* harmony import */ var ngx_bootstrap__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ngx-bootstrap */ "./node_modules/ngx-bootstrap/esm5/ngx-bootstrap.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var TeacherDailyActivityComponent = /** @class */ (function () {
    function TeacherDailyActivityComponent(apiService, error, spinner, notification, commonService, fb, confirmationService) {
        this.apiService = apiService;
        this.error = error;
        this.spinner = spinner;
        this.notification = notification;
        this.commonService = commonService;
        this.fb = fb;
        this.confirmationService = confirmationService;
        this.classList = [];
        this.serchByClass = '';
        this.activityVM = {};
        this.mealVm = {};
        this.HealthVM = {};
        this.MoodVM = {};
        this.NotesVM = {};
        this.NapVM = {};
        this.DiperVM = {};
        this.formType = 'activity';
        this.today = new Date();
        this.dailySheetList = [];
        this.mealTyptList = [];
        this.studentListId = [];
        this.suggestArr = [];
        this.updateSuggestArr = [];
        this.suggestArrDiper = [];
        this.listOfStudents = [];
        this.moodList = [];
        this.studentActivitiesID = 0;
        this.activityId = 0;
        this.mealId = 0;
        this.moodId = 0;
        this.healthId = 0;
        this.notesId = 0;
        this.napId = 0;
        this.diperId = 0;
        this.showHappy = false;
        this.showSad = false;
        this.showSleepy = false;
        this.showFussy = false;
        this.showGrumpy = false;
        this.subActivityList = [];
        this.myactivityList = [];
        this.mealPlanList = [];
        this.foodList = [];
        this.tempfoodList = [];
        this.allFoodItemList = [];
        this.MealMeasureType = [];
        this.mealQuantityType = [];
        this.studentListIdForEdit = [];
        this.studImage = '';
        this.className = '';
        this.loader = true;
        this.markAllStudents = false;
        this.foodConsumptionType = [];
        this.count = 0;
        this.countAfterUpdate = 0;
        this.foodListToSaveConsumption = [];
        this.pageNo = 0;
        this.limit = 10;
        this.totalRecord = 0;
        this.showNeweEntryButton = true;
        this.dpConfig = new ngx_bootstrap__WEBPACK_IMPORTED_MODULE_9__["BsDatepickerConfig"]();
    }
    TeacherDailyActivityComponent.prototype.ngOnInit = function () {
        this.searchByDate = new Date();
        this.searchByDateString = this.commonService.getStringLocalDateTimeFromUTC(this.searchByDate);
        this.dpConfig = Object.assign({}, { containerClass: 'theme-dark-blue' }, { showWeekNumbers: false });
        // this.getAllClassess();
        this.getTeacherOperationalClasses();
        this.creteActivityForm();
        this.createHealthForm();
        this.createMoodForm();
        this.createNotesForm();
        this.creteMealForm();
        this.creteNapForm();
        this.creteDiperForm();
        this.getMealType();
        this.getotherActivitySuggetion();
        // this.getMealMeasureType();
        // this.getAllMood();
    };
    TeacherDailyActivityComponent.prototype.ngAfterViewInit = function () {
        this.getFoodItems();
        this.getQuantityType();
        this.getMealMeasureType();
        this.getFoodConsumption();
    };
    TeacherDailyActivityComponent.prototype.creteActivityForm = function () {
        if (this.activityId === 0) {
            this.activityForm = this.fb.group({
                starttime: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].required],
                endtime: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].required],
                activity: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].required]
            });
        }
        else {
            this.activityForm = this.fb.group({
                starttime: [this.activityVM.startTime, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].required],
                endtime: [this.activityVM.endTime, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].required],
                activity: [this.activityVM.otherActivityNote, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].required]
            });
            this.updateSuggestArr = this.activityForm.value.activity.split(',');
        }
    };
    TeacherDailyActivityComponent.prototype.creteNapForm = function () {
        if (this.napId !== 0) {
            this.napForm = this.fb.group({
                napstart: [this.NapVM.sleptAtTime, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].required],
                napend: [this.NapVM.workUpTime, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].required],
                napdiscription: [this.NapVM.napNote]
            });
        }
        else {
            this.napForm = this.fb.group({
                napstart: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].required],
                napend: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].required],
                napdiscription: ['']
            });
        }
    };
    TeacherDailyActivityComponent.prototype.creteMealForm = function () {
        if (this.mealId === 0) {
            this.mealForm = this.fb.group({
                mealcmnt: [''],
                othermealplan: [''],
                othermealcmnt: [''],
                plantype: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].required],
                amount: [''],
                quantity: [''],
                unit: [''],
                foodconsumption: this.fb.array([]),
            });
        }
        else {
            this.mealForm = this.fb.group({
                mealcmnt: [this.mealVm.mealComment],
                othermealplan: [this.mealVm.otherThanPlanMeal],
                othermealcmnt: [this.mealVm.otherThanPlanMealComment],
                plantype: [this.mealVm.mealPlanTitle, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].required],
                amount: [''],
                quantity: [''],
                unit: [''],
                foodconsumption: this.fb.array([]),
            });
            this.initItemRows();
        }
    };
    TeacherDailyActivityComponent.prototype.creteDiperForm = function () {
        if (this.diperId !== 0) {
            this.diperForm = this.fb.group({
                diperchangetime: [this.DiperVM.diaperChangeTime, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].required],
                description: [this.DiperVM.StudentActivityDiaperNote]
            });
        }
        else {
            this.diperForm = this.fb.group({
                diperchangetime: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].required],
                description: ['']
            });
        }
    };
    TeacherDailyActivityComponent.prototype.initItemRows = function () {
        if (this.mealId === 0) {
            var ctrl = this.mealForm.get('foodconsumption');
            for (var i = 0; i < this.foodList.length; i++) {
                ctrl.push(this.fb.group({
                    foodconsumtionid: [''],
                    milkconsumptionquantity: ['']
                }));
            }
        }
        else {
            var ctrl = this.mealForm.get('foodconsumption');
            for (var i = 0; i < this.foodList.length; i++) {
                ctrl.push(this.fb.group({
                    foodconsumtionid: [this.foodList[i].foodConsumtionID],
                    milkconsumptionquantity: [this.foodList[i].milkConsumptionQuantity]
                }));
            }
        }
    };
    Object.defineProperty(TeacherDailyActivityComponent.prototype, "consumption", {
        get: function () {
            return this.mealForm.get('consumption_arr');
        },
        enumerable: true,
        configurable: true
    });
    TeacherDailyActivityComponent.prototype.createHealthForm = function () {
        if (this.healthId === 0) {
            this.healthForm = this.fb.group({
                temperature: [''],
                tempcmnt: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].required],
                howtotake: [''],
                repeatdose: [''],
                medicationName: [''],
                unit: ['']
            });
        }
        else {
            this.healthForm = this.fb.group({
                temperature: [this.HealthVM.recordedTemparture],
                tempcmnt: [this.HealthVM.studentHealthDescription, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].required],
                howtotake: [this.HealthVM.howTaken],
                repeatdose: [this.HealthVM.doseRepeatName],
                medicationName: [this.HealthVM.studentMedicationName],
                unit: [this.HealthVM.unit]
            });
        }
    };
    TeacherDailyActivityComponent.prototype.createMoodForm = function () {
        if (this.moodId === 0) {
            this.moodForm = this.fb.group({
                mood: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].required],
                moodcomment: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].required],
                happy: [1],
                sad: [0],
                sleepy: [0],
                fussy: [0],
                Grumpy: [0]
            });
        }
        else {
            this.moodForm = this.fb.group({
                mood: [this.MoodVM.moodTypeID, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].required],
                moodcomment: [this.MoodVM.studentMoodDescription, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].required],
                happy: [this.MoodVM.moodTypeID],
                sad: [this.MoodVM.moodTypeID],
                sleepy: [this.MoodVM.moodTypeID],
                fussy: [this.MoodVM.moodTypeID],
                Grumpy: [this.MoodVM.moodTypeID]
            });
        }
    };
    TeacherDailyActivityComponent.prototype.createNotesForm = function () {
        if (this.notesId === 0) {
            this.notesForm = this.fb.group({
                notes: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].required]
            });
        }
        else {
            this.notesForm = this.fb.group({
                notes: [this.NotesVM.noteDescription, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].required]
            });
        }
    };
    Object.defineProperty(TeacherDailyActivityComponent.prototype, "activity", {
        // convenience getter for easy access to form fields for activityForm
        get: function () { return this.activityForm.controls; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TeacherDailyActivityComponent.prototype, "meal", {
        // convenience getter for easy access to form fields for mealForm
        get: function () { return this.mealForm.controls; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TeacherDailyActivityComponent.prototype, "health", {
        // convenience getter for easy access to form fields for healthForm
        get: function () { return this.healthForm.controls; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TeacherDailyActivityComponent.prototype, "mood", {
        // convenience getter for easy access to form fields for moodForm
        get: function () { return this.moodForm.controls; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TeacherDailyActivityComponent.prototype, "notes", {
        // convenience getter for easy access to form fields for notesForm
        get: function () { return this.notesForm.controls; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TeacherDailyActivityComponent.prototype, "nap", {
        // convenience getter for easy access to form fields for napForm
        get: function () { return this.napForm.controls; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TeacherDailyActivityComponent.prototype, "diper", {
        // convenience getter for easy access to form fields for diperForm
        get: function () { return this.diperForm.controls; },
        enumerable: true,
        configurable: true
    });
    /**Method to get meal quantity type   */
    TeacherDailyActivityComponent.prototype.getQuantityType = function () {
        var _this = this;
        var data = {
            'agencyID': this.commonService.getAgencyId()
        };
        this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_8__["TeacherAPIURLs"].GetAllMeasureQuantityDropdown, data, null).subscribe(function (res) {
            if (res.body.statusCode === 200) {
                //   this.spinner.hide();
                _this.mealQuantityType = res.body.data;
            }
            else {
                _this.spinner.hide();
                _this.error.unknownError();
            }
        }, function (err) {
            _this.spinner.hide();
            _this.error.commonError(err);
        });
    };
    /**Method to get meal measer type   */
    TeacherDailyActivityComponent.prototype.getMealMeasureType = function () {
        var _this = this;
        var data = {
            'agencyID': this.commonService.getAgencyId()
        };
        this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_8__["TeacherAPIURLs"].GetAllMeasureUnitTypeDropdown, data, null).subscribe(function (res) {
            if (res.body.statusCode === 200) {
                //   this.spinner.hide();
                _this.MealMeasureType = res.body.data;
            }
            else {
                _this.spinner.hide();
                _this.error.unknownError();
            }
        }, function (err) {
            _this.spinner.hide();
            _this.error.commonError(err);
        });
    };
    /**Method to get Food items   */
    TeacherDailyActivityComponent.prototype.getFoodItems = function () {
        var _this = this;
        var data = {
            'agencyID': this.commonService.getAgencyId()
        };
        this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_8__["TeacherAPIURLs"].GetAllFoodTypeDropdown, data, null).subscribe(function (res) {
            if (res.body.statusCode === 200) {
                //   this.spinner.hide();
                var arr = res.body.data;
                arr.forEach(function (x) {
                    _this.foodList.forEach(function (z) {
                        if (x.value === z.foodTypeID) {
                            _this.allFoodItemList.push(x);
                        }
                    });
                });
            }
            else {
                _this.spinner.hide();
                _this.error.unknownError();
            }
        }, function (err) {
            _this.spinner.hide();
            _this.error.commonError(err);
        });
    };
    TeacherDailyActivityComponent.prototype.getTodaysMealPlan = function () {
        var _this = this;
        var data = {
            'studentActivitiesId': 0,
            'agencyID': this.commonService.getAgencyId(),
            'studentID': 0,
            'classID': this.serchByClass,
            'askedDate': this.searchByDate,
            'limit': 0,
            'page': 0
        };
        this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_8__["TeacherAPIURLs"].GetTodayMealPlan, data, null).subscribe(function (res) {
            _this.spinner.hide();
            if (res.body.statusCode === 200) {
                _this.mealPlanList = res.body.data;
            }
            else {
                _this.spinner.hide();
                _this.error.unknownError();
            }
        }, function (err) {
            _this.spinner.hide();
            _this.error.commonError(err);
        });
    };
    TeacherDailyActivityComponent.prototype.filterMealPlan = function () {
        var _this = this;
        if (this.mealPlanList) {
            this.mealPlanList.forEach(function (x) {
                _this.tempfoodList = [];
                if (x.mealPlannerID.toString() === _this.selectedMealPlanId) {
                    _this.foodList = [];
                    x.studentActivityMealFoodItems.forEach(function (element) {
                        //  this.items = this.mealForm.get('items') as FormArray;
                        // this.consumption.push(this.createMealConsumptionForm());
                        _this.foodList.push(element);
                        // this.foodList.push( element);
                        //   this.foodList.push( element);
                        // this.foodList.push( element);
                    });
                }
                // this.foodList.push( x.studentActivityMealFoo.mealForm);
                _this.initItemRows();
            });
        }
    };
    /**Method to get meal type  */
    TeacherDailyActivityComponent.prototype.getSelectedMealPlan = function () {
        this.selectedMealPlanId = this.mealForm.value.plantype;
        this.filterMealPlan();
    };
    TeacherDailyActivityComponent.prototype.getMealType = function () {
        var _this = this;
        var data = {
            'agencyID': this.commonService.getAgencyId()
        };
        this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_8__["TeacherAPIURLs"].GetAllMealTypeDropdown, data, null).subscribe(function (res) {
            if (res.body.statusCode === 200) {
                //   this.spinner.hide();
                _this.mealTyptList = res.body.data;
            }
            else {
                _this.spinner.hide();
                _this.error.unknownError();
            }
        }, function (err) {
            _this.spinner.hide();
            _this.error.commonError(err);
        });
    };
    // Another Activity suggestion for comments
    TeacherDailyActivityComponent.prototype.getotherActivitySuggetion = function () {
        this.subActivityList = [
            // { subActivityLabel: 'Crying', subActivityText: 'Crying a lot.'},
            { subActivityLabel: 'Playing', subActivityText: ' Playing in classroom.' },
            { subActivityLabel: 'Playing Outside', subActivityText: 'Playing Outside.' },
            { subActivityLabel: 'Music', subActivityText: 'Music' },
            { subActivityLabel: 'Dancing', subActivityText: 'Dancing' },
            { subActivityLabel: 'Science', subActivityText: 'Science' },
            { subActivityLabel: 'Colored', subActivityText: 'Colored' },
            { subActivityLabel: 'Free Draw', subActivityText: 'Free Draw' },
            { subActivityLabel: 'Reading', subActivityText: 'Reading' },
            { subActivityLabel: 'Centers', subActivityText: 'Centers' },
            { subActivityLabel: 'Share Day', subActivityText: 'Share Day' },
            { subActivityLabel: 'Circle Time', subActivityText: 'Circle Time' },
            { subActivityLabel: 'Flash Card', subActivityText: 'Flash Card' },
            { subActivityLabel: 'Puzzles', subActivityText: 'Puzzles' },
            { subActivityLabel: 'Blocks', subActivityText: 'Blocks' },
            { subActivityLabel: 'Legos', subActivityText: 'Legos' }
        ];
    };
    /**Get All class list */
    TeacherDailyActivityComponent.prototype.getAllClassess = function () {
        var _this = this;
        this.spinner.show();
        var data = {
            'agencyID': this.commonService.getAgencyId()
        };
        this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_8__["TeacherAPIURLs"].GetAllClasses, data, null).subscribe(function (res) {
            _this.spinner.hide();
            if (res.body.statusCode === 200) {
                _this.classList = res.body.data;
                if (_this.classList.length !== 0) {
                    _this.serchByClass = _this.classList[0].classesID;
                }
                _this.getDailySheet();
            }
            else {
                _this.spinner.hide();
                _this.error.unknownError();
            }
        }, function (err) {
            _this.spinner.hide();
            _this.error.commonError(err);
        });
    };
    /**Get All Mood list */
    TeacherDailyActivityComponent.prototype.getAllMood = function () {
        var _this = this;
        this.spinner.show();
        var data = {
            'agencyID': this.commonService.getAgencyId()
        };
        this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_8__["TeacherAPIURLs"].GetAllMoodTypeDropdown, data, null).subscribe(function (res) {
            _this.spinner.hide();
            var mood = ['assets/img/happy.svg', 'assets/img/sad.svg', 'assets/img/sleeping.svg'];
            if (res.body.statusCode === 200) {
                _this.moodList = res.body.data;
                for (var index = 0; index < _this.moodList.length; index++) {
                    _this.moodList[index].imagepath = mood[index];
                }
            }
            else {
                _this.spinner.hide();
                _this.error.unknownError();
            }
        }, function (err) {
            _this.spinner.hide();
            _this.error.commonError(err);
        });
    };
    TeacherDailyActivityComponent.prototype.getDailySheet = function () {
        var _this = this;
        this.loader = true;
        this.markAllStudents = false;
        if (new Date(this.searchByDate).toDateString() === (this.today).toDateString()) {
            this.showNeweEntryButton = true;
        }
        else {
            this.showNeweEntryButton = false;
        }
        this.studentListId = [];
        var myActivity = [];
        this.spinner.show();
        var data = {
            'agencyID': this.commonService.getAgencyId(),
            'studentActivitiesId': 0,
            'studentID': 0,
            'classID': this.serchByClass,
            'askedDate': this.searchByDate,
            'askedDateString': this.searchByDateString
        };
        this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_8__["TeacherAPIURLs"].GetDailySheet, data, null).subscribe(function (res) {
            _this.spinner.hide();
            if (res.body.statusCode === 200) {
                _this.totalRecord = res.body.totalRows;
                // const  tempStudent: any [] = [];
                _this.countAfterUpdate = 0;
                _this.listOfStudents = [];
                var list_1 = res.body.data;
                _this.getTodaysMealPlan();
                list_1.forEach(function (element) {
                    if (_this.listOfStudents.length === 0) {
                        _this.listOfStudents.push(element);
                    }
                    else {
                        var index = _this.listOfStudents.findIndex(function (r) { return r.studentID === element.studentID; });
                        if (index === -1) {
                            _this.listOfStudents.push(element);
                        }
                    }
                });
                _this.listOfStudents.forEach(function (x) {
                    list_1.forEach(function (element) {
                        if (element.studentID === x.studentID) {
                            if (element.activityTypeID === 1) {
                                if (element.studentActivityMedications.length > 0) {
                                    myActivity.push(element.studentActivityMedications[0]);
                                }
                            }
                            else if (element.activityTypeID === 2) {
                                if (element.studentActivityNotes.length > 0) {
                                    myActivity.push(element.studentActivityNotes[0]);
                                }
                            }
                            else if (element.activityTypeID === 3) {
                                if (element.studentActivityMeals.length > 0) {
                                    myActivity.push(element.studentActivityMeals[0]);
                                }
                            }
                            else if (element.activityTypeID === 4) {
                                if (element.studentActivityMoods.length > 0) {
                                    myActivity.push(element.studentActivityMoods[0]);
                                }
                            }
                            else if (element.activityTypeID === 5) {
                                if (element.studentOtherActivity.length > 0) {
                                    element.studentOtherActivity[0].endTime =
                                        _this.commonService.getLocalDateTimeFromUTC(element.studentOtherActivity[0].endTime);
                                    element.studentOtherActivity[0].startTime =
                                        _this.commonService.getLocalDateTimeFromUTC(element.studentOtherActivity[0].startTime);
                                    myActivity.push(element.studentOtherActivity[0]);
                                }
                            }
                            else if (element.activityTypeID === 6) {
                                if (element.studentAcitivityNap.length > 0) {
                                    element.studentAcitivityNap[0].sleptAtTime =
                                        _this.commonService.getLocalDateTimeFromUTC(element.studentAcitivityNap[0].sleptAtTime);
                                    element.studentAcitivityNap[0].workUpTime =
                                        _this.commonService.getLocalDateTimeFromUTC(element.studentAcitivityNap[0].workUpTime);
                                    myActivity.push(element.studentAcitivityNap[0]);
                                }
                            }
                            else if (element.activityTypeID === 7) {
                                if (element.studentActivityDiaper.length > 0) {
                                    element.studentActivityDiaper[0].diaperChangeTime =
                                        _this.commonService.getLocalDateTimeFromUTC(element.studentActivityDiaper[0].diaperChangeTime);
                                    myActivity.push(element.studentActivityDiaper[0]);
                                }
                            }
                            else {
                            }
                            x.myActivity = myActivity;
                            _this.countAfterUpdate = _this.countAfterUpdate + 1;
                            //  x.myActivity = [];
                        }
                        if (_this.countAfterUpdate === list_1.length) {
                            _this.viewAllActivityListAfterUpdate(_this.listOfStudents);
                        }
                    });
                    myActivity = [];
                    _this.spinner.hide();
                });
                _this.loader = false;
                //  this.serchByClass = this.classList[0].classesID;
                _this.spinner.hide();
            }
            else {
                _this.spinner.hide();
                _this.error.unknownError();
            }
        }, function (err) {
            _this.spinner.hide();
            _this.error.commonError(err);
        });
    };
    TeacherDailyActivityComponent.prototype.getSerchClass = function (event) {
    };
    /** Save  Activity */
    TeacherDailyActivityComponent.prototype.addNewEntry = function (option, type) {
        this.spinner.show();
        if (option === 2) {
            this.formType = type;
        }
        else {
            this.activityVM = {};
            this.mealVm = {};
            this.MoodVM = {};
            this.HealthVM = {};
            this.NotesVM = {};
            this.NapVM = {};
            this.DiperVM = {};
        }
        var agencyID = this.commonService.getAgencyId();
        if (this.studentListId.length > 0 || option === 2) {
            if (this.formType === 'activity') {
                if (this.activityForm.valid) {
                    if (this.activityForm.value.starttime > this.activityForm.value.endtime) {
                        this.spinner.hide();
                        this.notification.warning({ message: 'End time should be greater than Start time  ', title: '' });
                    }
                    else {
                        this.activityVM.agencyID = agencyID;
                        this.activityVM.startTime = this.activityForm.value.starttime;
                        this.activityVM.endTime = this.activityForm.value.endtime;
                        this.activityVM.otherActivityNote = (this.activityForm.value.activity).toString();
                        this.activityVM.id = this.activityId;
                        this.activityVM.studentActivitiesID = this.activityVM.studentActivitiesID === null ||
                            this.activityVM.studentActivitiesID === undefined ?
                            0 : this.activityVM.studentActivitiesID;
                        this.addNewEntrySuccess(this.formType);
                    }
                }
                else {
                    this.spinner.hide();
                    this.notification.warning({ message: 'Please fill mandetory fields marked as star', title: '' });
                    this.commonService.validateAllFields(this.activityForm);
                }
            }
            else if (this.formType === 'meal') {
                if (this.mealForm.valid) {
                    this.mealVm.agencyID = agencyID;
                    //  this.mealVm.mealTypeID = this.mealForm.value.meal;
                    this.mealVm.mealComment = this.mealForm.value.mealcmnt;
                    this.mealVm.otherThanPlanMeal = this.mealForm.value.othermealplan;
                    this.mealVm.otherThanPlanMealComment = this.mealForm.value.othermealcmnt;
                    this.mealVm.studentActivitiesID = this.mealVm.studentActivitiesID === null || this.mealVm.studentActivitiesID === undefined ?
                        0 : this.mealVm.studentActivitiesID;
                    this.mealVm.id = this.mealId;
                    this.mealVm.StudentActivityMealFoodItems = this.foodListToSaveConsumption;
                    this.mealVm.MealPlannerID = option === 1 ? this.mealForm.value.plantype : this.mealVm.MealPlannerID;
                    this.addNewEntrySuccess(this.formType);
                }
                else {
                    this.spinner.hide();
                    this.notification.warning({ message: 'Please fill mandetory fields marked as star', title: '' });
                    this.commonService.validateAllFields(this.mealForm);
                }
            }
            else if (this.formType === 'health') {
                if (this.healthForm.valid) {
                    this.HealthVM.id = this.healthId;
                    this.HealthVM.studentActivitiesID = this.HealthVM.studentActivitiesID === null ||
                        this.HealthVM.studentActivitiesID === undefined ?
                        0 : this.HealthVM.studentActivitiesID;
                    this.HealthVM.agencyID = agencyID;
                    this.HealthVM.recordedTemparture = this.healthForm.value.temperature;
                    this.HealthVM.studentHealthDescription = this.healthForm.value.tempcmnt;
                    this.HealthVM.doseRepeatName = this.healthForm.value.repeatdose;
                    this.HealthVM.studentMedicationName = this.healthForm.value.medicationName;
                    this.HealthVM.unit = this.HealthVM.unit ? this.HealthVM.unit : 0;
                    this.HealthVM.howTaken = this.healthForm.value.howtotake;
                    this.HealthVM.doseRepeatID = this.HealthVM.doseRepeatID === undefined ? 0 : this.HealthVM.doseRepeatID;
                    this.HealthVM.dosageQuantityID = this.HealthVM.dosageQuantityID === undefined ? 0 : this.HealthVM.dosageQuantityID;
                    this.HealthVM.studentMedicationID = this.HealthVM.studentMedicationID === undefined ? 0 : this.HealthVM.studentMedicationID;
                    this.HealthVM.AcknowledgeTeacherID = this.HealthVM.AcknowledgeTeacherID ? this.HealthVM.AcknowledgeTeacherID : 0;
                    this.HealthVM.isParentAcknowledge = this.HealthVM.isParentAcknowledge === undefined ? false : this.HealthVM.isParentAcknowledge;
                    this.HealthVM.isTeacherAcknowledge = this.HealthVM.isTeacherAcknowledge === undefined ? false
                        : this.HealthVM.isTeacherAcknowledge;
                    this.HealthVM.AcknowledgeParentID = this.HealthVM.AcknowledgeParentID ? this.HealthVM.AcknowledgeParentID :
                        0;
                    this.addNewEntrySuccess(this.formType);
                }
                else {
                    this.spinner.hide();
                    this.notification.warning({ message: 'Please fill mandetory fields marked as star', title: '' });
                    this.commonService.validateAllFields(this.healthForm);
                }
            }
            else if (this.formType === 'mood') {
                if (this.moodForm.valid) {
                    this.MoodVM.studentMoodDescription = this.moodForm.value.moodcomment;
                    this.MoodVM.id = this.moodId;
                    this.MoodVM.studentActivitiesID = this.MoodVM.studentActivitiesID === null || this.MoodVM.studentActivitiesID === undefined ?
                        0 : this.MoodVM.studentActivitiesID;
                    this.MoodVM.agencyID = agencyID;
                    this.MoodVM.moodTypeID = this.moodForm.value.mood;
                    this.addNewEntrySuccess(this.formType);
                }
                else {
                    this.spinner.hide();
                    this.notification.warning({ message: 'Please fill mandetory fields marked as star', title: '' });
                    this.commonService.validateAllFields(this.moodForm);
                }
            }
            else if (this.formType === 'notes') {
                if (this.notesForm.valid) {
                    this.NotesVM.noteDescription = this.notesForm.value.notes;
                    this.NotesVM.id = this.notesId;
                    this.NotesVM.studentActivitiesID = this.NotesVM.studentActivitiesID === null || this.NotesVM.studentActivitiesID === undefined ?
                        0 : this.NotesVM.studentActivitiesID;
                    this.NotesVM.agencyID = agencyID;
                    this.addNewEntrySuccess(this.formType);
                }
                else {
                    this.spinner.hide();
                    this.notification.warning({ message: 'Please fill mandetory fields marked as star', title: '' });
                    this.commonService.validateAllFields(this.notesForm);
                }
            }
            else if (this.formType === 'nap') {
                if (this.napForm.valid) {
                    if (this.napForm.value.napstart > this.napForm.value.napend) {
                        this.spinner.hide();
                        this.notification.warning({ message: 'slept at time  should be greater than woke-up time  ', title: '' });
                    }
                    else {
                        this.NapVM.id = this.napId;
                        this.NapVM.agencyID = agencyID;
                        this.NapVM.studentActivitiesID = this.NapVM.studentActivitiesID === null || this.NapVM.studentActivitiesID === undefined ?
                            0 : this.NapVM.studentActivitiesID;
                        this.NapVM.sleptAtTime = this.napForm.value.napstart;
                        this.NapVM.workUpTime = this.napForm.value.napend;
                        this.NapVM.napNote = this.napForm.value.napdiscription;
                        this.addNewEntrySuccess(this.formType);
                    }
                }
                else {
                    this.spinner.hide();
                    this.notification.warning({ message: 'Please fill mandetory fields marked as star', title: '' });
                    this.commonService.validateAllFields(this.napForm);
                }
            }
            else if (this.formType === 'diper') {
                if (this.diperForm.valid) {
                    this.DiperVM.id = this.diperId;
                    this.DiperVM.agencyID = agencyID;
                    this.DiperVM.studentActivitiesID = this.DiperVM.studentActivitiesID === null || this.DiperVM.studentActivitiesID === undefined ?
                        0 : this.DiperVM.studentActivitiesID;
                    this.DiperVM.diaperChangeTime = this.diperForm.value.diperchangetime;
                    this.DiperVM.StudentActivityDiaperNote = (this.diperForm.value.description).toString();
                    this.addNewEntrySuccess(this.formType);
                }
                else {
                    this.spinner.hide();
                    this.notification.warning({ message: 'Please fill mandetory fields marked as star', title: '' });
                    this.commonService.validateAllFields(this.diperForm);
                }
            }
            else {
                this.spinner.hide();
                this.notification.warning({ message: 'Please select students', title: '' });
            }
        }
    };
    TeacherDailyActivityComponent.prototype.addNewEntrySuccess = function (data) {
        var agencyID = this.commonService.getAgencyId();
        var finalReq = {};
        if (data === 'activity') {
            var req = {
                'studentOtherActivity': this.activityVM,
                'activityTypeID': 5,
                'selectedStudents': this.editMode === false ? this.studentListId : this.studentListIdForEdit,
                'agencyID': agencyID,
                'classesID': this.serchByClass,
                'id': this.activityVM.studentActivitiesID,
                'updatedBy': this.commonService.getLoggedInUserId(),
                'activityRegisterDate': new Date()
            };
            finalReq = req;
        }
        else if (data === 'meal') {
            var req = {
                'studentActivityMeals': this.mealVm,
                'activityTypeID': 3,
                'selectedStudents': this.editMode === false ? this.studentListId : this.studentListIdForEdit,
                'agencyID': agencyID,
                'classesID': this.serchByClass,
                'id': this.mealVm.studentActivitiesID,
                'updatedBy': this.commonService.getLoggedInUserId(),
                'activityRegisterDate': new Date()
            };
            finalReq = req;
        }
        else if (data === 'health') {
            var req = {
                'studentActivityMedications': this.HealthVM,
                'activityTypeID': 1,
                'selectedStudents': this.editMode === false ? this.studentListId : this.studentListIdForEdit,
                'agencyID': agencyID,
                'classesID': this.serchByClass,
                'id': this.HealthVM.studentActivitiesID,
                'updatedBy': this.commonService.getLoggedInUserId(),
                'activityRegisterDate': new Date()
            };
            finalReq = req;
        }
        else if (data === 'mood') {
            var req = {
                'studentActivityMoods': this.MoodVM,
                'activityTypeID': 4,
                'selectedStudents': this.editMode === false ? this.studentListId : this.studentListIdForEdit,
                'agencyID': agencyID,
                'classesID': this.serchByClass,
                'id': this.MoodVM.studentActivitiesID,
                'updatedBy': this.commonService.getLoggedInUserId(),
                'activityRegisterDate': new Date()
            };
            finalReq = req;
        }
        else if (data === 'notes') {
            var req = {
                'studentActivityNotes': this.NotesVM,
                'activityTypeID': 2,
                'selectedStudents': this.editMode === false ? this.studentListId : this.studentListIdForEdit,
                'agencyID': agencyID,
                'classesID': this.serchByClass,
                'id': this.NotesVM.studentActivitiesID,
                'updatedBy': this.commonService.getLoggedInUserId(),
                'activityRegisterDate': new Date()
            };
            finalReq = req;
        }
        else if (data === 'nap') {
            var req = {
                'studentAcitivityNap': this.NapVM,
                'activityTypeID': 6,
                'selectedStudents': this.editMode === false ? this.studentListId : this.studentListIdForEdit,
                'agencyID': agencyID,
                'classesID': this.serchByClass,
                'id': this.NapVM.studentActivitiesID,
                'updatedBy': this.commonService.getLoggedInUserId(),
                'activityRegisterDate': new Date()
            };
            finalReq = req;
        }
        else if (data === 'diper') {
            var req = {
                'studentActivityDiaper': this.DiperVM,
                'activityTypeID': 7,
                'selectedStudents': this.editMode === false ? this.studentListId : this.studentListIdForEdit,
                'agencyID': agencyID,
                'classesID': this.serchByClass,
                'id': this.DiperVM.studentActivitiesID,
                'updatedBy': this.commonService.getLoggedInUserId(),
                'activityRegisterDate': new Date()
            };
            finalReq = req;
        }
        this.saveNewDailyActivity(finalReq);
    };
    /**Methd to save new activity over API */
    TeacherDailyActivityComponent.prototype.saveNewDailyActivity = function (req) {
        var _this = this;
        this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_8__["TeacherAPIURLs"].SaveStudentActivity, req, null).subscribe(function (res) {
            _this.spinner.hide();
            if (res.body.statusCode === 200) {
                _this.markAllStudents = false;
                $('#editactivity12').modal('hide');
                $('#edithealth').modal('hide');
                $('#editactivity').modal('hide');
                $('#editmeal').modal('hide');
                $('#editmood').modal('hide');
                $('#editpost').modal('hide');
                $('#editnap').modal('hide');
                $('#editdiper').modal('hide');
                _this.notification.success({ message: req.id === 0 ? 'Activity added successfully' : 'Activity updated successfully', title: '' });
                _this.getDailySheet();
            }
            else {
                _this.spinner.hide();
                _this.error.unknownError();
            }
        }, function (err) {
            _this.spinner.hide();
            _this.error.commonError(err);
        });
    };
    /**Get student id using checkbox */
    TeacherDailyActivityComponent.prototype.getSingleMarkedStudent = function (student, event) {
        this.markAllStudents = false;
        if (event.target.checked === true) {
            if (this.studentListId.length === 0) {
                this.studentListId.push(student.studentID);
                var no = this.listOfStudents.findIndex(function (r) { return r.studentID === student.studentID; });
                if (no !== -1) {
                    this.listOfStudents[no].isMarked = true;
                }
            }
            else {
                var index = this.studentListId.findIndex(function (r) { return r === student.studentID; });
                if (index !== -1) {
                    this.studentListId.push(student.studentID);
                    var no = this.listOfStudents.findIndex(function (r) { return r.studentID === student.studentID; });
                    if (no !== -1) {
                        this.listOfStudents[no].isMarked = true;
                    }
                }
            }
        }
        else if (event.target.checked === false) {
            if (this.studentListId.length > 0) {
                var index = this.studentListId.findIndex(function (r) { return r === student.studentID; });
                this.studentListId.splice(index, 1);
                var no = this.listOfStudents.findIndex(function (r) { return r.studentID === student.studentID; });
                if (no !== -1) {
                    this.listOfStudents[no].isMarked = false;
                }
            }
        }
    };
    TeacherDailyActivityComponent.prototype.getAllMarkedStudent = function (event) {
        var _this = this;
        if (event.target.checked === true) {
            this.studentListId = [];
            this.listOfStudents.forEach(function (data) {
                _this.studentListId.push(data.studentID);
                data.isMarked = true;
            });
        }
        else {
            this.studentListId = [];
            this.listOfStudents.forEach(function (element) {
                element.isMarked = false;
            });
        }
    };
    TeacherDailyActivityComponent.prototype.saveActivity = function () {
    };
    TeacherDailyActivityComponent.prototype.getFormType = function (type) {
        this.clearAllForm();
        if (type === 'activity') {
            this.formType = 'activity';
        }
        else if (type === 'meal') {
            this.formType = 'meal';
        }
        else if (type === 'health') {
            this.formType = 'health';
        }
        else if (type === 'notes') {
            this.formType = 'notes';
        }
        else if (type === 'mood') {
            this.formType = 'mood';
        }
        else if (type === 'activity') {
            this.formType = 'activity';
        }
        else if (type === 'diper') {
            this.formType = 'diper';
        }
        else {
            this.formType = 'nap';
        }
    };
    TeacherDailyActivityComponent.prototype.clearAllForm = function () {
        this.editMode = false;
        this.mealId = 0;
        this.notesId = 0;
        this.moodId = 0;
        this.activityId = 0;
        this.healthId = 0;
        this.napId = 0;
        this.diperId = 0;
        this.creteDiperForm();
        this.createHealthForm();
        this.createMoodForm();
        this.createNotesForm();
        this.creteActivityForm();
        this.creteMealForm();
        this.creteNapForm();
        this.suggestArr = [];
        this.foodList = [];
        this.foodListToSaveConsumption = [];
    };
    TeacherDailyActivityComponent.prototype.getMarkedMood = function (data) {
        this.moodForm.controls['mood'].setValue(data);
        this.moodForm.controls['mood'].updateValueAndValidity();
    };
    // Get Activity details
    TeacherDailyActivityComponent.prototype.getActivityDetails = function (data, formType, studId) {
        this.editMode = true;
        this.markAllStudents = false;
        this.studentListId = [];
        this.listOfStudents.forEach(function (element) {
            element.isMarked = false;
        });
        this.studentListId = [];
        this.studentListIdForEdit = [];
        this.showHappy = false;
        this.showSad = false;
        this.showSleepy = false;
        this.showFussy = false;
        this.showGrumpy = false;
        this.studentListIdForEdit.push(studId);
        // this.studentListId.push(studId);
        if (formType === 'activity') {
            // this.activityVM.agencyID = agecyID;
            this.activityVM.startTime = data.startTime;
            this.activityVM.endTime = data.endTime;
            this.activityVM.otherActivityNote = data.otherActivityNote;
            this.activityVM.id = data.id;
            this.activityId = data.id;
            this.activityVM.studentActivitiesID = data.studentActivitiesID;
            this.creteActivityForm();
        }
        else if (formType === 'meal') {
            // this.mealVm.agencyID = agencyID;
            this.getSelectedMealPlan();
            this.mealForm.controls['unit'].setValue('');
            this.mealForm.controls['quantity'].setValue('');
            this.mealForm.updateValueAndValidity();
            this.foodList = [];
            //  this.mealVm.mealTypeID = this.mealForm.value.meal;
            this.mealVm.mealComment = data.mealComment;
            this.mealVm.otherThanPlanMeal = data.otherThanPlanMeal;
            this.mealVm.otherThanPlanMealComment = data.otherThanPlanMealComment;
            this.mealVm.studentActivitiesID = data.studentActivitiesID;
            this.mealVm.MealPlannerID = data.mealPlannerID;
            this.mealVm.id = this.mealId;
            this.mealVm.studentID = studId;
            this.mealId = data.id;
            this.foodList = data.studentActivityMealFoodItems;
            this.creteMealForm();
            // data.studentActivityMealFoodItems.forEach(element => {
            //   this.foodList.push(element);
            //  // this.mealForm.controls['amount'].setValue(element.consumedAmount);
            //   this.mealForm.controls['quantity'].setValue(element.foodConsumtionID);
            //   this.mealForm.controls['unit'].setValue(element.consumedMeasureUnitTypeID);
            //   this.mealForm.updateValueAndValidity();
            // });
        }
        else if (formType === 'health') {
            this.HealthVM.id = data.id;
            this.HealthVM.studentActivitiesID = data.studentActivitiesID;
            // this.HealthVM.agencyID = agencyID;
            this.HealthVM.recordedTemparture = data.recordedTemparture;
            this.HealthVM.studentHealthDescription = data.studentHealthDescription;
            this.HealthVM.studentID = studId;
            this.healthId = data.id;
            this.HealthVM.studentMedicationName = data.studentMedicationName;
            this.HealthVM.howTaken = data.howTaken;
            this.HealthVM.doseRepeatName = data.doseRepeatName;
            this.HealthVM.unit = data.unit;
            this.HealthVM.studentMedicationID = data.studentMedicationID,
                this.HealthVM.doseRepeatID = data.doseRepeatID,
                this.HealthVM.dosageQuantityID = data.dosageQuantityID,
                this.HealthVM.AcknowledgeTeacherID = data.acknowledgeTeacherID;
            this.HealthVM.isParentAcknowledge = data.isParentAcknowledge;
            this.HealthVM.isTeacherAcknowledge = data.isTeacherAcknowledge;
            this.HealthVM.acknowledgeTeacherName = data.acknowledgeTeacherName;
            this.HealthVM.AcknowledgeParentID = data.acknowledgeParentID;
            this.HealthVM.acknowledgeParentName = data.acknowledgeParentName;
            this.createHealthForm();
        }
        else if (formType === 'mood') {
            this.MoodVM.studentMoodDescription = data.studentMoodDescription;
            this.MoodVM.id = data.id;
            this.moodId = data.id;
            this.MoodVM.studentActivitiesID = data.studentActivitiesID;
            this.MoodVM.moodTypeID = data.moodTypeID;
            if (this.MoodVM.moodTypeID === 1) {
                $('#hp').prop('checked', true);
                this.showHappy = true;
                this.showSleepy = false;
                this.showSad = false;
                this.showFussy = false;
                this.showGrumpy = false;
            }
            else if (this.MoodVM.moodTypeID === 2) {
                this.showSad = true;
                this.showHappy = false;
                this.showSleepy = false;
                this.showFussy = false;
                this.showGrumpy = false;
                $('#sd').prop('checked', true);
            }
            else if (this.MoodVM.moodTypeID === 3) {
                this.showSleepy = true;
                this.showSad = false;
                this.showHappy = false;
                this.showFussy = false;
                this.showGrumpy = false;
                $('#sl').prop('checked', true);
            }
            else if (this.MoodVM.moodTypeID === 4) {
                this.showSleepy = false;
                this.showSad = false;
                this.showHappy = false;
                this.showFussy = true;
                this.showGrumpy = false;
                $('#fs').prop('checked', true);
            }
            else {
                this.showSleepy = false;
                this.showSad = false;
                this.showHappy = false;
                this.showFussy = false;
                this.showGrumpy = true;
                $('#gr').prop('checked', true);
            }
            this.MoodVM.studentID = studId;
            this.createMoodForm();
            //  this.MoodVM.agencyID = agencyID ;
            this.MoodVM.moodTypeID = data.moodTypeID;
        }
        else if (formType === 'notes') {
            this.NotesVM.noteDescription = data.noteDescription;
            this.NotesVM.id = data.id;
            this.NotesVM.studentActivitiesID = data.studentActivitiesID;
            this.notesId = data.id;
            this.NotesVM.studentID = studId;
            this.createNotesForm();
            // this.NotesVM.agencyID = agencyID ;
        }
        else if (formType === 'nap') {
            this.NapVM.id = data.id;
            // this.NapVM.agencyID = agencyID;
            // this.NapVM.activityTypeID = this.napId;
            this.NapVM.sleptAtTime = data.sleptAtTime;
            this.NapVM.workUpTime = data.workUpTime;
            this.NapVM.napNote = data.napNote;
            this.NapVM.id = data.id;
            this.NapVM.studentActivitiesID = data.studentActivitiesID;
            this.napId = data.id;
            this.NotesVM.studentID = studId;
            this.creteNapForm();
        }
        else if (formType === 'diper') {
            // this.commonService.getLocalDateTimeFromUTC(data.diaperChangeTime);
            this.suggestArrDiper = [];
            this.DiperVM.id = data.id;
            this.DiperVM.diaperChangeTime = data.diaperChangeTime;
            this.DiperVM.StudentActivityDiaperNote = data.studentActivityDiaperNote;
            this.NapVM.studentActivitiesID = data.studentActivitiesID;
            this.diperId = data.id;
            this.NotesVM.studentID = studId;
            this.creteDiperForm();
        }
        else {
        }
    };
    TeacherDailyActivityComponent.prototype.addSuggestion = function (data, length) {
        if (this.activityForm.value.activity) {
            // const index = this.suggestArr.findIndex(r => r === data.subActivityText);
            // if (index === -1) {
            //   this.suggestArr.push(data.subActivityText);
            //   this.activityForm.controls['activity'].setValue(this.suggestArr);
            //   this.activityForm.controls['activity'].updateValueAndValidity();
            // }
            this.suggestArr.push(data.subActivityText);
            this.activityForm.controls['activity'].setValue(this.suggestArr);
            this.activityForm.controls['activity'].updateValueAndValidity();
        }
        else {
            this.suggestArr = [];
            this.suggestArr.push(data.subActivityText);
            this.activityForm.controls['activity'].setValue(this.suggestArr);
            this.activityForm.controls['activity'].updateValueAndValidity();
        }
    };
    TeacherDailyActivityComponent.prototype.updateSuggestion = function (data) {
        if (this.activityForm.value.activity) {
            // (this.activityForm.value.activity).split(',');
            // const index = this.updateSuggestArr.findIndex(r => r === data.subActivityText);
            // if (index === -1) {
            this.updateSuggestArr.push(data.subActivityText);
            this.activityForm.controls['activity'].setValue(this.updateSuggestArr);
            this.activityForm.controls['activity'].updateValueAndValidity();
            // }
        }
        else {
            this.updateSuggestArr = [];
            this.updateSuggestArr.push(data.subActivityText);
            this.activityForm.controls['activity'].setValue(this.updateSuggestArr);
            this.activityForm.controls['activity'].updateValueAndValidity();
        }
    };
    TeacherDailyActivityComponent.prototype.viewAllActivityList = function (dailysheet) {
        this.studentID = dailysheet.studentID;
        if (dailysheet.myActivity.length > 0) {
            this.myactivityList = dailysheet.myActivity;
            this.studentName = dailysheet.studentName;
            this.studImage = dailysheet.imagePath;
            this.className = dailysheet.className;
        }
        else {
            this.myactivityList = [];
        }
        // myactivityList = dailysheet.
    };
    TeacherDailyActivityComponent.prototype.viewAllActivityListAfterUpdate = function (studentList) {
        var _this = this;
        studentList.forEach(function (element) {
            if (element.studentID === _this.studentID) {
                _this.studentID = element.studentID;
                if (element.myActivity.length > 0) {
                    _this.myactivityList = element.myActivity;
                    _this.studentName = element.studentName;
                    _this.studImage = element.imagePath;
                }
                else {
                    _this.myactivityList = [];
                }
            }
        });
        // myactivityList = dailysheet.
    };
    // Method to delete the incident
    TeacherDailyActivityComponent.prototype.deleteActivity = function (value) {
        var _this = this;
        var stid = [];
        stid.push(value.studentID);
        this.confirmationService.confirm({
            message: 'Do you want to delete this activity?',
            accept: function () {
                _this.spinner.show();
                var data = {
                    'agencyID': _this.commonService.getAgencyId(),
                    // 'Id': value.id,
                    'IsDeleted': true,
                    'DeletedDate': new Date(),
                    'DeletedBy': 1,
                    // 'studentAcitivityNap': this.NapVM,
                    'activityTypeID': value.activityTypeID,
                    'selectedStudents': stid,
                    'classesID': _this.serchByClass,
                    'studentActivitiesID': value.studentActivitiesID,
                    'id': value.studentActivitiesID,
                    'deletedBy': _this.commonService.getLoggedInUserId()
                };
                _this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_8__["TeacherAPIURLs"].SaveStudentActivity, data, null).subscribe(function (res) {
                    if (res.body.statusCode === 200) {
                        //   this.spinner.hide();
                        _this.deleteActivitySuccess(value);
                    }
                    else {
                        _this.spinner.hide();
                        _this.error.unknownError();
                    }
                }, function (err) {
                    _this.spinner.hide();
                    _this.error.commonError(err);
                });
            }
        });
    };
    TeacherDailyActivityComponent.prototype.deleteActivitySuccess = function (data) {
        // if (res.body === 1) {
        var index = this.myactivityList.findIndex(function (r) { return r.id === data.id; });
        this.myactivityList.splice(index, 1);
        this.spinner.hide();
        this.notification.success({ message: 'Activity deleted successfully', title: '' });
        // } else {
        //   this.error.unknownError();
        // }
    };
    /** Get food Consumption values for students from form */
    TeacherDailyActivityComponent.prototype.getConsumedAmount = function (data) {
        this.foodListToSaveConsumption = this.foodList;
        for (var index = 0; index < this.foodList.length; index++) {
            if (data.foodTypeID === this.foodListToSaveConsumption[index].foodTypeID) {
                // this.foodListToSaveConsumption[index].consumedAmount = this.mealForm.value.amount;
                this.foodListToSaveConsumption[index].milkConsumptionQuantity = this.mealForm.value.foodconsumption[index].milkconsumptionquantity;
                this.foodListToSaveConsumption[index].foodConsumtionID = this.mealForm.value.foodconsumption[index].foodconsumtionid === ''
                    ? 0 : this.mealForm.value.foodconsumption[index].foodconsumtionid;
            }
        }
    };
    TeacherDailyActivityComponent.prototype.checkIsStudentSelected = function () {
        if (this.studentListId.length === 0) {
            this.notification.warning({ message: 'You cannot add new activity without selecting student ', title: 'Please select student' });
        }
        else {
            this.initItemRows();
            $('#editactivity12').modal('show');
        }
    };
    // **  Api for amount consumption for food other than milk */
    TeacherDailyActivityComponent.prototype.getFoodConsumption = function () {
        var _this = this;
        var data = {
            'agencyID': this.commonService.getAgencyId()
        };
        this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_8__["TeacherAPIURLs"].GetAllFoodConsumtion, data, null).subscribe(function (res) {
            if (res.body.statusCode === 200) {
                //   this.spinner.hide();
                if (res.body.data !== null && res.body.data !== undefined) {
                    var temp = [];
                    _this.foodConsumptionType = [];
                    temp = res.body.data;
                    var nameList = ['None', 'Some', 'Most', 'All'];
                    for (var index = 0; index < temp.length; index++) {
                        for (var j = 0; j < temp.length; j++) {
                            if (nameList[index] === temp[j].foodConsumtionName) {
                                _this.foodConsumptionType.push(temp[j]);
                            }
                        }
                    }
                }
            }
            else {
                _this.spinner.hide();
                _this.error.unknownError();
            }
        }, function (err) {
            _this.spinner.hide();
            _this.error.commonError(err);
        });
    };
    TeacherDailyActivityComponent.prototype.getMealActivityByAPI = function (data, formType, studId) {
        var _this = this;
        this.editMode = true;
        this.markAllStudents = false;
        this.studentListId = [];
        this.studentListIdForEdit = [];
        this.listOfStudents.forEach(function (element) {
            element.isMarked = false;
        });
        this.studentListIdForEdit.push(studId);
        this.spinner.show();
        var req = {
            'agencyID': this.commonService.getAgencyId(),
            'studentAcitivityId': data.studentActivitiesID,
            'studentID': studId,
        };
        this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_8__["TeacherAPIURLs"].GetParticularStudentActivityMeals, req, null).subscribe(function (res) {
            if (res.body.statusCode === 200) {
                _this.mealForm.controls['unit'].setValue('');
                _this.mealForm.controls['quantity'].setValue('');
                _this.mealForm.updateValueAndValidity();
                _this.foodList = [];
                //  this.mealVm.mealTypeID = this.mealForm.value.meal;
                _this.mealVm.mealComment = res.body.data.mealComment;
                _this.mealVm.otherThanPlanMeal = res.body.data.otherThanPlanMeal;
                _this.mealVm.otherThanPlanMealComment = res.body.data.otherThanPlanMealComment;
                _this.mealVm.studentActivitiesID = res.body.data.studentActivitiesID;
                _this.mealVm.MealPlannerID = res.body.data.mealPlannerID;
                _this.mealVm.mealPlanTitle = res.body.data.mealPlanTitle;
                _this.mealVm.id = _this.mealId;
                _this.mealVm.studentID = studId;
                _this.mealId = res.body.data.id;
                _this.foodList = res.body.data.studentActivityMealFoodItems;
                _this.creteMealForm();
                _this.spinner.hide();
            }
            else {
                _this.spinner.hide();
                _this.error.unknownError();
            }
        }, function (err) {
            _this.spinner.hide();
            _this.error.commonError(err);
        });
    };
    TeacherDailyActivityComponent.prototype.getTeacherOperationalClasses = function () {
        var _this = this;
        this.classList = [];
        this.spinner.show();
        var data = {
            'agencyID': this.commonService.getAgencyId(),
            'askingDate': this.searchByDate,
            'teacherID': this.commonService.getReleventUserId('userdetails'),
        };
        this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_8__["TeacherAPIURLs"].GetTeacherOperationalClasses, data, null).subscribe(function (res) {
            _this.spinner.hide();
            if (res.body.statusCode === 200) {
                if (res.body.data !== null && res.body.data !== undefined) {
                    _this.classList = res.body.data;
                    if (_this.classList.length !== 0) {
                        _this.serchByClass = _this.classList[0].value;
                        _this.getDailySheet();
                    }
                    else {
                        _this.serchByClass = '';
                        //  this.notification.info({message: 'It seems like you have not checked-in into the class yet', title: '' });
                    }
                }
            }
            else {
                _this.spinner.hide();
                _this.error.unknownError();
            }
        }, function (err) {
            _this.spinner.hide();
            _this.error.commonError(err);
        });
    };
    TeacherDailyActivityComponent.prototype.getSerchDate = function (event) {
        this.count++;
        if (this.count > 2) {
            this.searchByDate = event;
            this.searchByDateString = this.commonService.getStringLocalDateTimeFromUTC(this.searchByDate);
            this.classList = [];
            this.studentListId = [];
            this.listOfStudents = [];
            this.getTeacherOperationalClasses();
        }
    };
    TeacherDailyActivityComponent.prototype.addDiaperSuggestion = function (text) {
        if (this.diperForm.value.description) {
            // (this.activityForm.value.activity).split(',');
            // const index = this.updateSuggestArr.findIndex(r => r === data.subActivityText);
            // if (index === -1) {
            this.suggestArrDiper.push(text);
            this.diperForm.controls['description'].setValue(this.suggestArrDiper);
            this.diperForm.controls['description'].updateValueAndValidity();
            // }
        }
        else {
            this.suggestArrDiper = [];
            this.suggestArrDiper.push(text);
            this.diperForm.controls['description'].setValue(this.suggestArrDiper);
            this.diperForm.controls['description'].updateValueAndValidity();
        }
    };
    TeacherDailyActivityComponent.prototype.paginate = function (event) {
        this.pageNo = event.page;
        // this.limit = event.page;
        this.getDailySheet();
    };
    TeacherDailyActivityComponent.prototype.getLocalDate = function () {
        this.commonService.getLocalDate(new Date);
    };
    TeacherDailyActivityComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-teacher-daily-activity',
            template: __webpack_require__(/*! ./teacher-daily-activity.component.html */ "./src/app/layout/teacher/components/teacher-daily-activity/teacher-daily-activity.component.html"),
            styles: [__webpack_require__(/*! ./teacher-daily-activity.component.css */ "./src/app/layout/teacher/components/teacher-daily-activity/teacher-daily-activity.component.css")]
        }),
        __metadata("design:paramtypes", [_shared_services_teacher_api_service_teacher_api_service__WEBPACK_IMPORTED_MODULE_1__["TeacherApiService"], _shared_services_error_handler_error_handler_service__WEBPACK_IMPORTED_MODULE_2__["ErrorHandlerService"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_3__["NgxSpinnerService"], _shared_services_notification_service_notification_service__WEBPACK_IMPORTED_MODULE_4__["NotificationService"],
            _shared_services_common_common_service__WEBPACK_IMPORTED_MODULE_5__["CommonService"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormBuilder"], primeng_api__WEBPACK_IMPORTED_MODULE_7__["ConfirmationService"]])
    ], TeacherDailyActivityComponent);
    return TeacherDailyActivityComponent;
}());



/***/ }),

/***/ "./src/app/layout/teacher/components/teacher-dashboard/teacher-dashboard.component.css":
/*!*********************************************************************************************!*\
  !*** ./src/app/layout/teacher/components/teacher-dashboard/teacher-dashboard.component.css ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".tgl-flip + .tgl-btn {\r\n  /* padding: 2px; */\r\n  transition: all .2s ease;\r\n  font-family: sans-serif;\r\n  -webkit-perspective: 100px;\r\n          perspective: 100px;\r\n  width: 100px;\r\n  padding: 10px;   \r\n  height: 28px;\r\n  line-height: 28px;\r\n  margin-bottom: 0;\r\n   \r\n}\r\n.tgl-flip + .tgl-btn:after, .tgl-flip + .tgl-btn:before {\r\n  display: inline-block;\r\n  transition: all .4s ease;\r\n  width: 100%;\r\n  text-align: center;\r\n  position: absolute;\r\n  /* line-height: 2em; */\r\n  font-weight: bold;\r\n  color: #fff;\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n  -webkit-backface-visibility: hidden;\r\n          backface-visibility: hidden;\r\n  border-radius: 4px;\r\n}\r\n.tgl-flip + .tgl-btn:after {\r\n  content: attr(data-tg-on);\r\n  background: #02C66F;\r\n  -webkit-transform: rotateY(-180deg);\r\n          transform: rotateY(-180deg);\r\n}\r\n.tgl-flip + .tgl-btn:before {\r\n  background: #FF3A19;\r\n  content: attr(data-tg-off);\r\n}\r\n.tgl-flip + .tgl-btn:active:before {\r\n  -webkit-transform: rotateY(-20deg);\r\n          transform: rotateY(-20deg);\r\n          height: 28px;\r\n          line-height: 28px;\r\n      \r\n}\r\n.tgl-flip:checked + .tgl-btn:before {\r\n  -webkit-transform: rotateY(180deg);\r\n          transform: rotateY(180deg);\r\n}\r\n.tgl-flip:checked + .tgl-btn:after {\r\n  -webkit-transform: rotateY(0);\r\n          transform: rotateY(0);\r\n  left: 0;\r\n  background: #7FC6A6;\r\n}\r\n.tgl-flip:checked + .tgl-btn:active:after {\r\n  -webkit-transform: rotateY(20deg);\r\n          transform: rotateY(20deg);\r\n}\r\ninput#cb5 {\r\n  display: none;\r\n}\r\ntextarea {border: 1px solid #efefef; width: 100%}\r\ninput[type=\"radio\"]:checked + span {\r\n  color: #fff;\r\n  background-color: #58A7FE;\r\n  border-radius: 5px;\r\n  height: 28px;\r\n\r\n  line-height: 28px;\r\n}\r\ninput[type=\"radio\"] + span{\r\n  color: #333;\r\nfont-size: 14px;\r\nfont-weight: 400;\r\n  border-radius: 5px;\r\n  height: 28px;\r\n\r\n  line-height: 28px;\r\n\r\n}\r\n.form-group{margin: 0}\r\n.marg10 {\r\n  margin: 10px 0 20px 0;\r\n}\r\n.currntcls {\r\n  padding: 0;\r\n  box-shadow: 0 0 5px 0 #ccc;\r\n  background: #fdfdfd;\r\n  border-radius: 10px;\r\n  position: relative;\r\n  display: flex;\r\n  margin-top: 20px;\r\n}\r\n.currntcls .title {\r\n  padding: 20px;\r\n  border-right: 1px solid #ccc;\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\n.title span.month {\r\n  color: #969696;\r\n  display: block;\r\n}\r\n.title span.day {\r\n  font-size: 12px;\r\n}\r\n.title span.date {\r\n  display: block;\r\n  width: 100%;\r\n  color: #ff6c6c;\r\n  font-size: 60px;\r\n  padding: 0;\r\n  margin: 0;\r\n  line-height: 48px;\r\n}\r\n.edit-btn {\r\n  position: absolute;\r\n  right: 5px;\r\n  top: 5px;\r\n  z-index: 2;\r\n}\r\n.edit-btn img {\r\n  height: 20px;\r\n  width: 20px;\r\n}\r\n.edit-btn button {\r\n  background: none;\r\n  border: 0;\r\n}\r\n.clsname {\r\n  font-size: 18px;\r\n  color: #58A7FE;\r\n  font-weight: 600;\r\n  font-family: \"Poppins\";\r\n  margin: 10px;\r\n  text-align: left;\r\n}\r\n.algcenter .form-group p {\r\n  background: #58a7fe;\r\n    padding: 10px;\r\n    max-width: 100px;\r\n    left: 0;\r\n    right: 0;\r\n    margin: 0 auto 20px auto;\r\n    color: #ffffff;\r\n}\r\n.algcenter .form-group {\r\n  padding: 20px 0;\r\n}\r\n.whitebox {\r\n  min-height: 280px;\r\n}\r\n.create-post {\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\n.create-post img {\r\n  max-height: 150px;\r\n  max-width: 150px;\r\n  margin: 10px 20px;\r\n  cursor: pointer;\r\n  transition: all ease-in 0.3ms;\r\n}\r\n.create-post img:hover {\r\n  box-shadow: 0 0 15px 0 #ccc;\r\n}\r\n.mr-50 {\r\n  margin-right: 50px;\r\n}\r\n/** Added by aniket*/\r\n/* .img-fluid {\r\n  max-width: 100%;\r\n  height: 30px;\r\n  border-radius: 36px;\r\n} */\r\n@media (max-width:767px) {\r\n  .type_msg {\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: flex-end;\r\n  }\r\n  .whitebox {\r\n    max-height: 390px;\r\n  }\r\n  .w-20 {\r\n    width: 50px;\r\n    left: 0;\r\n    right: 0;\r\n    margin: 0 auto 10px auto;\r\n}\r\n.currntcls {\r\n  flex-direction: column-reverse;\r\n  padding: 10px;\r\n}\r\n.algcenter .form-group {\r\n  padding: 10px 0 0 0;\r\n}\r\n.currntcls .title {\r\n  padding: 10px 20px 10px 20px;\r\n  border-right: 0;\r\n  border-top: 1px solid #f5f5f5;\r\n}\r\n.currntcls .title div {\r\n  display: flex;\r\n    justify-content: center;\r\n    align-items: center;\r\n}\r\n.title span.date {\r\n  font-size: 48px\r\n}\r\n.tchschdule1 .ui-carousel .ui-carousel-header {\r\n  margin-top: 120px;\r\n}\r\n.create-post img {\r\n  max-height: 100px;\r\n  max-width: 100px;\r\n  margin: 10px;\r\n}\r\n.img-fluid {\r\n  max-width: 100%;\r\n  height: 50px;\r\n  border-radius: 36px;\r\n  width: 50px;\r\n}\r\n}\r\n#editactivity .nav-link img,#editmeal .nav-link img, #edithealth .nav-link img,#editpost .nav-link img { height:  25px}\r\n.align_Class{\r\n  align-content: center;\r\n  text-align: center;\r\n}\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGF5b3V0L3RlYWNoZXIvY29tcG9uZW50cy90ZWFjaGVyLWRhc2hib2FyZC90ZWFjaGVyLWRhc2hib2FyZC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0Usa0JBQWtCO0VBQ2xCLHdCQUF3QjtFQUN4Qix1QkFBdUI7RUFDdkIsMEJBQTBCO1VBQ2xCLGtCQUFrQjtFQUMxQixZQUFZO0VBQ1osYUFBYTtFQUNiLFlBQVk7RUFDWixpQkFBaUI7RUFDakIsZ0JBQWdCOztBQUVsQjtBQUNBO0VBQ0UscUJBQXFCO0VBQ3JCLHdCQUF3QjtFQUN4QixXQUFXO0VBQ1gsa0JBQWtCO0VBQ2xCLGtCQUFrQjtFQUNsQixzQkFBc0I7RUFDdEIsaUJBQWlCO0VBQ2pCLFdBQVc7RUFDWCxrQkFBa0I7RUFDbEIsTUFBTTtFQUNOLE9BQU87RUFDUCxtQ0FBbUM7VUFDM0IsMkJBQTJCO0VBQ25DLGtCQUFrQjtBQUNwQjtBQUNBO0VBQ0UseUJBQXlCO0VBQ3pCLG1CQUFtQjtFQUNuQixtQ0FBbUM7VUFDM0IsMkJBQTJCO0FBQ3JDO0FBQ0E7RUFDRSxtQkFBbUI7RUFDbkIsMEJBQTBCO0FBQzVCO0FBQ0E7RUFDRSxrQ0FBa0M7VUFDMUIsMEJBQTBCO1VBQzFCLFlBQVk7VUFDWixpQkFBaUI7O0FBRTNCO0FBQ0E7RUFDRSxrQ0FBa0M7VUFDMUIsMEJBQTBCO0FBQ3BDO0FBQ0E7RUFDRSw2QkFBNkI7VUFDckIscUJBQXFCO0VBQzdCLE9BQU87RUFDUCxtQkFBbUI7QUFDckI7QUFDQTtFQUNFLGlDQUFpQztVQUN6Qix5QkFBeUI7QUFDbkM7QUFDQTtFQUNFLGFBQWE7QUFDZjtBQUVBLFVBQVUseUJBQXlCLEVBQUUsV0FBVztBQUVoRDtFQUNFLFdBQVc7RUFDWCx5QkFBeUI7RUFDekIsa0JBQWtCO0VBQ2xCLFlBQVk7O0VBRVosaUJBQWlCO0FBQ25CO0FBRUE7RUFDRSxXQUFXO0FBQ2IsZUFBZTtBQUNmLGdCQUFnQjtFQUNkLGtCQUFrQjtFQUNsQixZQUFZOztFQUVaLGlCQUFpQjs7QUFFbkI7QUFJQSxZQUFZLFNBQVM7QUFDckI7RUFDRSxxQkFBcUI7QUFDdkI7QUFDQTtFQUNFLFVBQVU7RUFDViwwQkFBMEI7RUFDMUIsbUJBQW1CO0VBQ25CLG1CQUFtQjtFQUNuQixrQkFBa0I7RUFDbEIsYUFBYTtFQUNiLGdCQUFnQjtBQUNsQjtBQUNBO0VBQ0UsYUFBYTtFQUNiLDRCQUE0QjtFQUM1QixhQUFhO0VBQ2IsdUJBQXVCO0VBQ3ZCLG1CQUFtQjtBQUNyQjtBQUNBO0VBQ0UsY0FBYztFQUNkLGNBQWM7QUFDaEI7QUFDQTtFQUNFLGVBQWU7QUFDakI7QUFDQTtFQUNFLGNBQWM7RUFDZCxXQUFXO0VBQ1gsY0FBYztFQUNkLGVBQWU7RUFDZixVQUFVO0VBQ1YsU0FBUztFQUNULGlCQUFpQjtBQUNuQjtBQUNBO0VBQ0Usa0JBQWtCO0VBQ2xCLFVBQVU7RUFDVixRQUFRO0VBQ1IsVUFBVTtBQUNaO0FBQ0E7RUFDRSxZQUFZO0VBQ1osV0FBVztBQUNiO0FBQ0E7RUFDRSxnQkFBZ0I7RUFDaEIsU0FBUztBQUNYO0FBQ0E7RUFDRSxlQUFlO0VBQ2YsY0FBYztFQUNkLGdCQUFnQjtFQUNoQixzQkFBc0I7RUFDdEIsWUFBWTtFQUNaLGdCQUFnQjtBQUNsQjtBQUNBO0VBQ0UsbUJBQW1CO0lBQ2pCLGFBQWE7SUFDYixnQkFBZ0I7SUFDaEIsT0FBTztJQUNQLFFBQVE7SUFDUix3QkFBd0I7SUFDeEIsY0FBYztBQUNsQjtBQUNBO0VBQ0UsZUFBZTtBQUNqQjtBQUNBO0VBQ0UsaUJBQWlCO0FBQ25CO0FBQ0E7RUFDRSxhQUFhO0VBQ2IsdUJBQXVCO0VBQ3ZCLG1CQUFtQjtBQUNyQjtBQUNBO0VBQ0UsaUJBQWlCO0VBQ2pCLGdCQUFnQjtFQUNoQixpQkFBaUI7RUFDakIsZUFBZTtFQUNmLDZCQUE2QjtBQUMvQjtBQUNBO0VBQ0UsMkJBQTJCO0FBQzdCO0FBRUE7RUFDRSxrQkFBa0I7QUFDcEI7QUFFQSxvQkFBb0I7QUFDcEI7Ozs7R0FJRztBQUNIO0VBQ0U7SUFDRSxhQUFhO0lBQ2IsbUJBQW1CO0lBQ25CLHlCQUF5QjtFQUMzQjtFQUNBO0lBQ0UsaUJBQWlCO0VBQ25CO0VBQ0E7SUFDRSxXQUFXO0lBQ1gsT0FBTztJQUNQLFFBQVE7SUFDUix3QkFBd0I7QUFDNUI7QUFDQTtFQUNFLDhCQUE4QjtFQUM5QixhQUFhO0FBQ2Y7QUFDQTtFQUNFLG1CQUFtQjtBQUNyQjtBQUNBO0VBQ0UsNEJBQTRCO0VBQzVCLGVBQWU7RUFDZiw2QkFBNkI7QUFDL0I7QUFDQTtFQUNFLGFBQWE7SUFDWCx1QkFBdUI7SUFDdkIsbUJBQW1CO0FBQ3ZCO0FBQ0E7RUFDRTtBQUNGO0FBQ0E7RUFDRSxpQkFBaUI7QUFDbkI7QUFDQTtFQUNFLGlCQUFpQjtFQUNqQixnQkFBZ0I7RUFDaEIsWUFBWTtBQUNkO0FBQ0E7RUFDRSxlQUFlO0VBQ2YsWUFBWTtFQUNaLG1CQUFtQjtFQUNuQixXQUFXO0FBQ2I7QUFDQTtBQUdBLHlHQUF5RyxhQUFhO0FBQ3RIO0VBQ0UscUJBQXFCO0VBQ3JCLGtCQUFrQjtBQUNwQiIsImZpbGUiOiJzcmMvYXBwL2xheW91dC90ZWFjaGVyL2NvbXBvbmVudHMvdGVhY2hlci1kYXNoYm9hcmQvdGVhY2hlci1kYXNoYm9hcmQuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi50Z2wtZmxpcCArIC50Z2wtYnRuIHtcclxuICAvKiBwYWRkaW5nOiAycHg7ICovXHJcbiAgdHJhbnNpdGlvbjogYWxsIC4ycyBlYXNlO1xyXG4gIGZvbnQtZmFtaWx5OiBzYW5zLXNlcmlmO1xyXG4gIC13ZWJraXQtcGVyc3BlY3RpdmU6IDEwMHB4O1xyXG4gICAgICAgICAgcGVyc3BlY3RpdmU6IDEwMHB4O1xyXG4gIHdpZHRoOiAxMDBweDtcclxuICBwYWRkaW5nOiAxMHB4OyAgIFxyXG4gIGhlaWdodDogMjhweDtcclxuICBsaW5lLWhlaWdodDogMjhweDtcclxuICBtYXJnaW4tYm90dG9tOiAwO1xyXG4gICBcclxufVxyXG4udGdsLWZsaXAgKyAudGdsLWJ0bjphZnRlciwgLnRnbC1mbGlwICsgLnRnbC1idG46YmVmb3JlIHtcclxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgdHJhbnNpdGlvbjogYWxsIC40cyBlYXNlO1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgLyogbGluZS1oZWlnaHQ6IDJlbTsgKi9cclxuICBmb250LXdlaWdodDogYm9sZDtcclxuICBjb2xvcjogI2ZmZjtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgdG9wOiAwO1xyXG4gIGxlZnQ6IDA7XHJcbiAgLXdlYmtpdC1iYWNrZmFjZS12aXNpYmlsaXR5OiBoaWRkZW47XHJcbiAgICAgICAgICBiYWNrZmFjZS12aXNpYmlsaXR5OiBoaWRkZW47XHJcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xyXG59XHJcbi50Z2wtZmxpcCArIC50Z2wtYnRuOmFmdGVyIHtcclxuICBjb250ZW50OiBhdHRyKGRhdGEtdGctb24pO1xyXG4gIGJhY2tncm91bmQ6ICMwMkM2NkY7XHJcbiAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZVkoLTE4MGRlZyk7XHJcbiAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZVkoLTE4MGRlZyk7XHJcbn1cclxuLnRnbC1mbGlwICsgLnRnbC1idG46YmVmb3JlIHtcclxuICBiYWNrZ3JvdW5kOiAjRkYzQTE5O1xyXG4gIGNvbnRlbnQ6IGF0dHIoZGF0YS10Zy1vZmYpO1xyXG59XHJcbi50Z2wtZmxpcCArIC50Z2wtYnRuOmFjdGl2ZTpiZWZvcmUge1xyXG4gIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGVZKC0yMGRlZyk7XHJcbiAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZVkoLTIwZGVnKTtcclxuICAgICAgICAgIGhlaWdodDogMjhweDtcclxuICAgICAgICAgIGxpbmUtaGVpZ2h0OiAyOHB4O1xyXG4gICAgICBcclxufVxyXG4udGdsLWZsaXA6Y2hlY2tlZCArIC50Z2wtYnRuOmJlZm9yZSB7XHJcbiAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZVkoMTgwZGVnKTtcclxuICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlWSgxODBkZWcpO1xyXG59XHJcbi50Z2wtZmxpcDpjaGVja2VkICsgLnRnbC1idG46YWZ0ZXIge1xyXG4gIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGVZKDApO1xyXG4gICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGVZKDApO1xyXG4gIGxlZnQ6IDA7XHJcbiAgYmFja2dyb3VuZDogIzdGQzZBNjtcclxufVxyXG4udGdsLWZsaXA6Y2hlY2tlZCArIC50Z2wtYnRuOmFjdGl2ZTphZnRlciB7XHJcbiAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZVkoMjBkZWcpO1xyXG4gICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGVZKDIwZGVnKTtcclxufVxyXG5pbnB1dCNjYjUge1xyXG4gIGRpc3BsYXk6IG5vbmU7XHJcbn1cclxuXHJcbnRleHRhcmVhIHtib3JkZXI6IDFweCBzb2xpZCAjZWZlZmVmOyB3aWR0aDogMTAwJX1cclxuXHJcbmlucHV0W3R5cGU9XCJyYWRpb1wiXTpjaGVja2VkICsgc3BhbiB7XHJcbiAgY29sb3I6ICNmZmY7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzU4QTdGRTtcclxuICBib3JkZXItcmFkaXVzOiA1cHg7XHJcbiAgaGVpZ2h0OiAyOHB4O1xyXG5cclxuICBsaW5lLWhlaWdodDogMjhweDtcclxufVxyXG5cclxuaW5wdXRbdHlwZT1cInJhZGlvXCJdICsgc3BhbntcclxuICBjb2xvcjogIzMzMztcclxuZm9udC1zaXplOiAxNHB4O1xyXG5mb250LXdlaWdodDogNDAwO1xyXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcclxuICBoZWlnaHQ6IDI4cHg7XHJcblxyXG4gIGxpbmUtaGVpZ2h0OiAyOHB4O1xyXG5cclxufVxyXG5cclxuXHJcblxyXG4uZm9ybS1ncm91cHttYXJnaW46IDB9XHJcbi5tYXJnMTAge1xyXG4gIG1hcmdpbjogMTBweCAwIDIwcHggMDtcclxufVxyXG4uY3Vycm50Y2xzIHtcclxuICBwYWRkaW5nOiAwO1xyXG4gIGJveC1zaGFkb3c6IDAgMCA1cHggMCAjY2NjO1xyXG4gIGJhY2tncm91bmQ6ICNmZGZkZmQ7XHJcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBtYXJnaW4tdG9wOiAyMHB4O1xyXG59XHJcbi5jdXJybnRjbHMgLnRpdGxlIHtcclxuICBwYWRkaW5nOiAyMHB4O1xyXG4gIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICNjY2M7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG59XHJcbi50aXRsZSBzcGFuLm1vbnRoIHtcclxuICBjb2xvcjogIzk2OTY5NjtcclxuICBkaXNwbGF5OiBibG9jaztcclxufVxyXG4udGl0bGUgc3Bhbi5kYXkge1xyXG4gIGZvbnQtc2l6ZTogMTJweDtcclxufVxyXG4udGl0bGUgc3Bhbi5kYXRlIHtcclxuICBkaXNwbGF5OiBibG9jaztcclxuICB3aWR0aDogMTAwJTtcclxuICBjb2xvcjogI2ZmNmM2YztcclxuICBmb250LXNpemU6IDYwcHg7XHJcbiAgcGFkZGluZzogMDtcclxuICBtYXJnaW46IDA7XHJcbiAgbGluZS1oZWlnaHQ6IDQ4cHg7XHJcbn1cclxuLmVkaXQtYnRuIHtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgcmlnaHQ6IDVweDtcclxuICB0b3A6IDVweDtcclxuICB6LWluZGV4OiAyO1xyXG59XHJcbi5lZGl0LWJ0biBpbWcge1xyXG4gIGhlaWdodDogMjBweDtcclxuICB3aWR0aDogMjBweDtcclxufVxyXG4uZWRpdC1idG4gYnV0dG9uIHtcclxuICBiYWNrZ3JvdW5kOiBub25lO1xyXG4gIGJvcmRlcjogMDtcclxufVxyXG4uY2xzbmFtZSB7XHJcbiAgZm9udC1zaXplOiAxOHB4O1xyXG4gIGNvbG9yOiAjNThBN0ZFO1xyXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgZm9udC1mYW1pbHk6IFwiUG9wcGluc1wiO1xyXG4gIG1hcmdpbjogMTBweDtcclxuICB0ZXh0LWFsaWduOiBsZWZ0O1xyXG59XHJcbi5hbGdjZW50ZXIgLmZvcm0tZ3JvdXAgcCB7XHJcbiAgYmFja2dyb3VuZDogIzU4YTdmZTtcclxuICAgIHBhZGRpbmc6IDEwcHg7XHJcbiAgICBtYXgtd2lkdGg6IDEwMHB4O1xyXG4gICAgbGVmdDogMDtcclxuICAgIHJpZ2h0OiAwO1xyXG4gICAgbWFyZ2luOiAwIGF1dG8gMjBweCBhdXRvO1xyXG4gICAgY29sb3I6ICNmZmZmZmY7XHJcbn1cclxuLmFsZ2NlbnRlciAuZm9ybS1ncm91cCB7XHJcbiAgcGFkZGluZzogMjBweCAwO1xyXG59XHJcbi53aGl0ZWJveCB7XHJcbiAgbWluLWhlaWdodDogMjgwcHg7XHJcbn1cclxuLmNyZWF0ZS1wb3N0IHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbn1cclxuLmNyZWF0ZS1wb3N0IGltZyB7XHJcbiAgbWF4LWhlaWdodDogMTUwcHg7XHJcbiAgbWF4LXdpZHRoOiAxNTBweDtcclxuICBtYXJnaW46IDEwcHggMjBweDtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgdHJhbnNpdGlvbjogYWxsIGVhc2UtaW4gMC4zbXM7XHJcbn1cclxuLmNyZWF0ZS1wb3N0IGltZzpob3ZlciB7XHJcbiAgYm94LXNoYWRvdzogMCAwIDE1cHggMCAjY2NjO1xyXG59XHJcblxyXG4ubXItNTAge1xyXG4gIG1hcmdpbi1yaWdodDogNTBweDtcclxufVxyXG5cclxuLyoqIEFkZGVkIGJ5IGFuaWtldCovXHJcbi8qIC5pbWctZmx1aWQge1xyXG4gIG1heC13aWR0aDogMTAwJTtcclxuICBoZWlnaHQ6IDMwcHg7XHJcbiAgYm9yZGVyLXJhZGl1czogMzZweDtcclxufSAqL1xyXG5AbWVkaWEgKG1heC13aWR0aDo3NjdweCkge1xyXG4gIC50eXBlX21zZyB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XHJcbiAgfVxyXG4gIC53aGl0ZWJveCB7XHJcbiAgICBtYXgtaGVpZ2h0OiAzOTBweDtcclxuICB9XHJcbiAgLnctMjAge1xyXG4gICAgd2lkdGg6IDUwcHg7XHJcbiAgICBsZWZ0OiAwO1xyXG4gICAgcmlnaHQ6IDA7XHJcbiAgICBtYXJnaW46IDAgYXV0byAxMHB4IGF1dG87XHJcbn1cclxuLmN1cnJudGNscyB7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbi1yZXZlcnNlO1xyXG4gIHBhZGRpbmc6IDEwcHg7XHJcbn1cclxuLmFsZ2NlbnRlciAuZm9ybS1ncm91cCB7XHJcbiAgcGFkZGluZzogMTBweCAwIDAgMDtcclxufVxyXG4uY3Vycm50Y2xzIC50aXRsZSB7XHJcbiAgcGFkZGluZzogMTBweCAyMHB4IDEwcHggMjBweDtcclxuICBib3JkZXItcmlnaHQ6IDA7XHJcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNmNWY1ZjU7XHJcbn1cclxuLmN1cnJudGNscyAudGl0bGUgZGl2IHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG59XHJcbi50aXRsZSBzcGFuLmRhdGUge1xyXG4gIGZvbnQtc2l6ZTogNDhweFxyXG59XHJcbi50Y2hzY2hkdWxlMSAudWktY2Fyb3VzZWwgLnVpLWNhcm91c2VsLWhlYWRlciB7XHJcbiAgbWFyZ2luLXRvcDogMTIwcHg7XHJcbn1cclxuLmNyZWF0ZS1wb3N0IGltZyB7XHJcbiAgbWF4LWhlaWdodDogMTAwcHg7XHJcbiAgbWF4LXdpZHRoOiAxMDBweDtcclxuICBtYXJnaW46IDEwcHg7XHJcbn1cclxuLmltZy1mbHVpZCB7XHJcbiAgbWF4LXdpZHRoOiAxMDAlO1xyXG4gIGhlaWdodDogNTBweDtcclxuICBib3JkZXItcmFkaXVzOiAzNnB4O1xyXG4gIHdpZHRoOiA1MHB4O1xyXG59XHJcbn1cclxuXHJcblxyXG4jZWRpdGFjdGl2aXR5IC5uYXYtbGluayBpbWcsI2VkaXRtZWFsIC5uYXYtbGluayBpbWcsICNlZGl0aGVhbHRoIC5uYXYtbGluayBpbWcsI2VkaXRwb3N0IC5uYXYtbGluayBpbWcgeyBoZWlnaHQ6ICAyNXB4fVxyXG4uYWxpZ25fQ2xhc3N7XHJcbiAgYWxpZ24tY29udGVudDogY2VudGVyO1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxufSJdfQ== */"

/***/ }),

/***/ "./src/app/layout/teacher/components/teacher-dashboard/teacher-dashboard.component.html":
/*!**********************************************************************************************!*\
  !*** ./src/app/layout/teacher/components/teacher-dashboard/teacher-dashboard.component.html ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"wrapper\">\r\n  <div class=\"container-fluid\">\r\n    <div class=\"pagetitle\">\r\n      <div>\r\n        <h2>Dashboard <span> </span></h2>\r\n      </div>\r\n      <div class=\"brdcrmbs\">\r\n\r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"pagebadges\">\r\n      <div class=\"row\">\r\n        <div class=\"col-sm-4\">\r\n          <div class=\"badgebox\">\r\n            <div><img src=\"assets/img/group.png\" alt=\"\" /></div>\r\n            <div class=\"text-center\">\r\n              <h3>{{studentEnrolledCountForClass}}</h3>\r\n              <p>Class Students</p>\r\n            </div>\r\n          </div>\r\n        </div>\r\n\r\n        <div class=\"col-sm-4\">\r\n          <div class=\"badgebox\">\r\n            <div><img src=\"assets/img/present.png\" alt=\"\" /></div>\r\n            <div class=\"text-center\">\r\n              <h3>{{presentStudentCount}}</h3>\r\n              <p>Present Students</p>\r\n            </div>\r\n          </div>\r\n        </div>\r\n\r\n        <div class=\"col-sm-4\">\r\n          <div class=\"badgebox\">\r\n            <div><img src=\"assets/img/event.png\" alt=\"\" /></div>\r\n            <div class=\"text-center\">\r\n              <h3>{{eventCountForClass}}</h3>\r\n              <p>Events</p>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"row\">\r\n      <div class=\"col-xl-5 col-lg-12\">\r\n        <div class=\"whitebox\">\r\n          <div class=\"head\">Class Check-in/Check-out</div>\r\n          <div class=\"brdr\"></div>\r\n\r\n          <div class=\"tchschdule1\">\r\n            <p-carousel [value]=\"classLogList\" [numVisible]=\"1\" (onPage)=getPageDetailsForClass($event)>\r\n              <ng-template let-item pTemplate=\"item\">\r\n                <div class=\"currntcls\">\r\n                  <div class=\"title\">\r\n                    <div>\r\n                      <span class=\"month\">{{today|date: 'MMMM y'}}</span>\r\n                      <span class=\"date\">{{today|date: 'dd'}}</span>\r\n                      <span class=\"day\">{{today|date: 'EEEE'}}</span>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"edit-btn\">\r\n                    <button type=\"submit\" style=\"cursor: pointer\"\r\n                      (click)=\"getTeacherCurrentClassLogStatus(classDetails, 1)\" title=\"Check In\">\r\n                      <img src=\"assets/img/checkin.png\" alt=\"\" />\r\n                    </button>\r\n                    <button type=\"submit\" style=\"cursor: pointer\"\r\n                      (click)=\"getTeacherCurrentClassLogStatus(classDetails, 2)\" title=\"Check Out\">\r\n                      <img src=\"assets/img/checkout.png\" alt=\"\" />\r\n                    </button>\r\n                    <button *ngIf=\"classDetails.checkStatus == 2\" title=\"Edit checked-in and checked-out time\"\r\n                      (click)=\"getCheckOutDetails(classDetails)\" type=\"submit\" data-toggle=\"modal\"\r\n                      data-target=\"#edittime\">\r\n                      <img src=\"assets/img/edit-ico.png\" alt=\"img\" />\r\n                    </button>\r\n                    <button *ngIf=\"classDetails.checkStatus == 1\" title=\"Edit checked in time\"\r\n                      (click)=\"getCheckInDetails(classDetails)\" type=\"submit\" data-toggle=\"modal\"\r\n                      data-target=\"#checkinedittime\">\r\n                      <img src=\"assets/img/edit-ico.png\" alt=\"img\" />\r\n                    </button>\r\n                  </div>\r\n                  <div class=\"\" style=\"width:100%;\">\r\n                    <div class=\"row algcenter\">\r\n                      <div class=\"col-lg-12\">\r\n                        <h3 class=\"clsname\">{{classDetails.className}}</h3>\r\n                      </div>\r\n                    </div>\r\n                    <div class=\"row algcenter\">\r\n                      <div class=\"col-lg-6 col-6 text-center\">\r\n                        <div class=\"form-group\">\r\n                          <label for=\"\">Time From</label>\r\n                          <p>{{classDetails.classStartTime | date:' hh:mm a'}}</p>\r\n                        </div>\r\n                      </div>\r\n                      <div class=\"col-lg-6 col-6 text-center\">\r\n                        <div class=\"form-group\">\r\n                          <label for=\"\">Untill</label>\r\n                          <p>{{classDetails.classEndTime | date:' hh:mm a'}}</p>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </ng-template>\r\n            </p-carousel>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"col-xl-7 col-lg-12\">\r\n        <div class=\"whitebox\">\r\n          <div class=\"head\">Create Post</div>\r\n          <div class=\"brdr\"></div>\r\n          <div class=\"post\">\r\n            <div class=\"row\">\r\n              <div class=\"col-lg-1\">\r\n                <div class=\"chatimg w-20\">\r\n                  <img src=\"{{userImage}}\" alt=\"img\" class=\"img-fluid\" onError=\"this.src='assets/img/user.png'\" />\r\n                </div>\r\n              </div>\r\n              <div class=\"col-lg-11\">\r\n                <div class=\"create-post\">\r\n                  <img src=\"assets/img/camera.png\" (click)=\"openImagePostModal();clearPost()\" alt=\"\">\r\n                  <img src=\"assets/img/video-post.png\" (click)=\"openVideoPostModal();clearPost()\" alt=\"\">\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n\r\n    <div class=\"row\">\r\n      <div class=\"col-lg-12 col-md-12\">\r\n        <div class=\"whitebox white_box_table\">\r\n          <div class=\"head\">Student Medication (Class : {{classNameForMedication}})</div>\r\n          <div class=\"table-responsive\">\r\n            <table class=\"table\">\r\n              <thead class=\"thead-light\">\r\n                <tr>\r\n                  <th scope=\"col\">Student Name</th>\r\n                  <!-- <th scope=\"col\">Class Name</th> -->\r\n                  <th scope=\"col\">Medicine Name</th>\r\n                  <th scope=\"col\">Units</th>\r\n                  <th scope=\"col\">Dosage</th>\r\n                  <th scope=\"col\">How To Take</th>\r\n                  <th scope=\"col\">Action</th>\r\n                </tr>\r\n              </thead>\r\n              <tbody>\r\n                <tr *ngFor=\" let med of medicationList\">\r\n                  <td>{{med.studentName}}</td>\r\n                  <td>{{med.medicationName}}</td>\r\n                  <td>{{med.units}}</td>\r\n                  <td>{{med.doseRepeatName}}</td>\r\n                  <td>{{med.howTaken}}</td>\r\n                  <td>\r\n                    <a *ngIf=\"med.isMedicationDone == false\" style=\"cursor:pointer\" data-toggle=\"modal\"\r\n                      data-target=\"#edithealth\" (click)=\"getStudentDetailsOfMedication(med)\">\r\n                      <i class=\"fa fa-pencil\" aria-hidden=\"true\"></i>\r\n                    </a>\r\n                    <a><i *ngIf=\"med.isMedicationDone == true\" class=\"fa fa-check fa-lg\" style=\"color:#0afe0a;\"\r\n                        aria-hidden=\"true\"></i></a>\r\n\r\n                    <!-- <button class=\"btn btn-info\" data-toggle=\"modal\" data-target=\"#edithealth\"  \r\n                      >Done</button>\r\n                    </td> -->\r\n                </tr>\r\n                <tr *ngIf=\"medicationList && medicationList.length == 0 && !loader\">\r\n                  <td colspan=\"6\" class=\"align_Class\">\r\n                    No Records Found!\r\n                  </td>\r\n                </tr>\r\n              </tbody>\r\n            </table>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"row\">\r\n      <div class=\"col-lg-12 col-md-12\">\r\n        <div class=\"whitebox white_box_table\">\r\n          <div class=\"head\">Student Allergy (Class : {{classNameForMedication}})</div>\r\n          <div class=\"table-responsive\">\r\n            <table class=\"table\">\r\n              <thead class=\"thead-light\">\r\n                <tr>\r\n                  <th scope=\"col\">Student Name</th>\r\n                  <th scope=\"col\">Allergy Name</th>\r\n                  <th scope=\"col\">Allergy Type</th>\r\n                  <th scope=\"col\">Symptoms</th>\r\n                  <th scope=\"col\">Action</th>\r\n                </tr>\r\n              </thead>\r\n              <tbody>\r\n                <tr *ngFor=\" let allergy of allergyList\">\r\n                  <td>{{allergy.studentName}}</td>\r\n                  <td>{{allergy.allergyName}}</td>\r\n                  <td>{{allergy.allergyTypeName}}</td>\r\n                  <td>{{allergy.allergyReactionTypeName}}</td>\r\n                  <td>{{allergy.treatment}}</td>\r\n                </tr>\r\n                <tr *ngIf=\"allergyList && allergyList.length == 0 && !loader\">\r\n                  <td colspan=\"6\" class=\"align_Class\">\r\n                    No Records Found!\r\n                  </td>\r\n                </tr>\r\n              </tbody>\r\n            </table>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n\r\n    <!-- Edit Check in And Out  Time modal  -->\r\n    <div class=\"modal fade\" id=\"edittime\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"checkinLabel\" aria-hidden=\"true\">\r\n      <div class=\"modal-dialog\" role=\"document\">\r\n        <div class=\"modal-content\">\r\n          <div class=\"modal-header\">\r\n            <h5 class=\"modal-title\" id=\"checkinLabel\">Edit Checked-in & Checked-out Time</h5>\r\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n              <span aria-hidden=\"true\">&times;</span>\r\n            </button>\r\n          </div>\r\n          <div class=\"modal-body\">\r\n\r\n            <div class=\"row\">\r\n              <div class=\"col-lg-6\">\r\n                <div class=\"form-group\">\r\n                  <label for=\"\">Checked-in Time </label>\r\n                  <p-calendar class=\"cutom-text-box-dailyactivity-one\" styleClass=\"form-control\"\r\n                    [(ngModel)]=\"editedCheckedInTime\" [timeOnly]=\"true\" hourFormat=\"12\" icon=\"pi pi-clock\" [showIcon]=\"true\"\r\n                    [maxDate]=\"today\"></p-calendar>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-lg-6\">\r\n                <div class=\"form-group\">\r\n                  <label for=\"\">Checked-out Time </label>\r\n                  <p-calendar class=\"cutom-text-box-dailyactivity-one\" styleClass=\"form-control\"\r\n                    [(ngModel)]=\"editedCheckedOutTime\" [timeOnly]=\"true\" hourFormat=\"12\" icon=\"pi pi-clock\" [showIcon]=\"true\"\r\n                    [maxDate]=\"today\"></p-calendar>\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n          </div>\r\n          <div class=\"modal-footer\">\r\n            <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">\r\n              Close\r\n            </button>\r\n            <button type=\"button\" class=\"btn btn-primary\" (click)=\"editCheckedOutDetails()\">\r\n              Save Changes\r\n            </button>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n    <!-- Edit Check in  Time modal  -->\r\n    <div class=\"modal fade\" id=\"checkinedittime\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"checkinLabel\"\r\n      aria-hidden=\"true\">\r\n      <div class=\"modal-dialog\" role=\"document\">\r\n        <div class=\"modal-content\">\r\n          <div class=\"modal-header\">\r\n            <h5 class=\"modal-title\" id=\"checkinLabel\">Edit Checked-in Time</h5>\r\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n              <span aria-hidden=\"true\">&times;</span>\r\n            </button>\r\n          </div>\r\n          <div class=\"modal-body\">\r\n\r\n            <div class=\"row\">\r\n              <div class=\"col-lg-6\">\r\n                <div class=\"form-group\">\r\n                  <label for=\"\">Checked-in Time </label>\r\n                  <p-calendar class=\"cutom-text-box-dailyactivity-one\" styleClass=\"form-control\"\r\n                    [(ngModel)]=\"editedCheckedInTime\" [timeOnly]=\"true\" hourFormat=\"12\" icon=\"pi pi-clock\" [showIcon]=\"true\"\r\n                    [maxDate]=\"today\"></p-calendar>\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n          </div>\r\n          <div class=\"modal-footer\">\r\n            <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">\r\n              Close\r\n            </button>\r\n            <button type=\"button\" class=\"btn btn-primary\" (click)=\"editCheckedInDetails()\">\r\n              Update\r\n            </button>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"modal fade addimage\" id=\"#addimage\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myLargeModalLabel\"\r\n      aria-hidden=\"true\">\r\n      <div class=\"modal-dialog modal-lg\">\r\n        <div class=\"modal-content\">\r\n          <div class=\"modal-header\">\r\n            <h5 class=\"modal-title\" id=\"exampleModalLongTitle\">\r\n              <div class=\" w-20\">\r\n                <img src=\"{{userImage}}\" alt=\"img\" class=\"img-fluid\" onError=\"this.src='assets/img/user.png'\" />\r\n              </div> Create Post\r\n            </h5>\r\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n              <span aria-hidden=\"true\">&times;</span>\r\n            </button>\r\n          </div>\r\n          <div class=\"modal-body\">\r\n            <form [formGroup]=\"ImageUploadForm\">\r\n\r\n              <div class=\"row mb-15\">\r\n                <div class=\"col-lg-6 mb-15\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"exampleFormControlSelect1\">Title*</label>\r\n                    <input type=\"text\" class=\"form-control\" placeholder=\"Title\" formControlName=\"title\"\r\n                      id=\"exampleFormControlSelect1\">\r\n                    <div *ngIf=\"f.title.invalid &&\r\n                            (f.title.dirty || f.title.touched) \" class=\"text-left errormsg\">\r\n                      <span *ngIf=\"f.title.errors.required\">\r\n                        <i class=\"fa fa-exclamation-circle\"></i>\r\n                        <span class=\"\"> Please enter title</span>\r\n                      </span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-lg-6 mb-15 \">\r\n                  <div class=\"form-group pop-switch\">\r\n                    <label class=\"first\" for=\"exampleFormControlSelect1\">Public*</label>\r\n                    <p-inputSwitch formControlName=\"public\"></p-inputSwitch>\r\n                    <div *ngIf=\"f.public.invalid && (f.public.dirty || f.public.touched) \" class=\"text-left errormsg\">\r\n                      <span *ngIf=\"f.public.errors.required\">\r\n                        <i class=\"fa fa-exclamation-circle\"></i>\r\n                        <span class=\"\"> Please select option</span>\r\n                      </span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n\r\n              <div class=\"row mb-15\">\r\n                <div class=\"col-lg-12\">\r\n                  <div class=\"postmsg\">\r\n                    <textarea name=\"\" id=\"\" rows=\"8\" formControlName=\"text\"\r\n                      placeholder=\"Write somethings to post\"></textarea>\r\n                    <div *ngIf=\"f.text.invalid && (f.text.dirty || f.text.touched)\" text=\"text-left errormsg\">\r\n                      <span *ngIf=\"f.text.errors.required\" class=\"errormsg\">\r\n                        <i class=\"fa fa-exclamation-circle\"></i>\r\n                        <span> Please Write somethings</span>\r\n                      </span>\r\n                    </div>\r\n                  </div>\r\n\r\n                </div>\r\n              </div>\r\n              <div class=\"row mb-15\">\r\n                <div class=\"col-lg-6 \">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"exampleFormControlSelect1\">Class*</label>\r\n                    <select class=\"form-control\" placeholder=\"Serch\" (change)=\"getStudentsList()\"\r\n                      formControlName=\"class\" id=\"exampleFormControlSelect1\">\r\n                      <option value=\"\">Select class</option>\r\n                      <option *ngFor=\"let classes of classList\" [value]=\"classes.value\">{{ classes.label }}</option>\r\n                    </select>\r\n                    <div *ngIf=\"f.class.invalid && (f.class.dirty || f.class.touched)\" class=\"text-left errormsg\">\r\n                      <span *ngIf=\"f.class.errors.required\">\r\n                        <i class=\"fa fa-exclamation-circle\"></i>\r\n                        <span class=\"\"> Please select class</span>\r\n                      </span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-lg-6  \">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"exampleFormControlSelect1\">Student Name*</label>\r\n                    <p-multiSelect [options]=\"studentList\" formControlName=\"studentname\"\r\n                      [panelStyle]=\"{minWidth:'200px'}\" formControlName=\"studentname\" [maxSelectedLabels]=\"5\">\r\n                    </p-multiSelect>\r\n                    <div *ngIf=\"  f.studentname.invalid &&\r\n                          (f.studentname.dirty || f.studentname.touched)\" class=\"text-left errormsg\">\r\n                      <span *ngIf=\"f.studentname.errors.required\">\r\n                        <i class=\"fa fa-exclamation-circle\"></i>\r\n                        <span class=\"\"> Please select student</span>\r\n                      </span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"row mb-15 \">\r\n                <div class=\"col-lg-12\">\r\n                  <div class=\"form-group\">\r\n                    <h4>Upload Image(Max limit 3)</h4>\r\n                    <p-fileUpload name=\"myfile[]\" #pform uploadLabel=\"Post\" maxFileSize=\"5000000\"\r\n                      [accept]=\"allowedImageFileType\" multiple=\"multiple\" (onSelect)=\"limitOnImageFiles($event)\"\r\n                      [showUploadButton]=\"showUploadBtn\" customUpload=\"true\" (uploadHandler)=\"myImageUploader($event)\">\r\n                    </p-fileUpload>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </form>\r\n          </div>\r\n          <div class=\"modal-footer\">\r\n            <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"modal fade addvideo\" id=\"#addvideo\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myLargeModalLabel\"\r\n      aria-hidden=\"true\">\r\n      <div class=\"modal-dialog modal-lg\">\r\n        <div class=\"modal-content\">\r\n          <div class=\"modal-header\">\r\n            <h5 class=\"modal-title\" id=\"exampleModalLongTitle2\">\r\n              <div class=\" w-20\">\r\n                <img src=\"{{userImage}}\" alt=\"img\" class=\"img-fluid\" onError=\"this.src='assets/img/user.png'\" />\r\n              </div> Create Post\r\n            </h5>\r\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n              <span aria-hidden=\"true\">&times;</span>\r\n            </button>\r\n          </div>\r\n          <div class=\"modal-body\">\r\n            <form [formGroup]=\"ImageUploadForm\">\r\n              <div class=\"row mb-15\">\r\n                <div class=\"col-lg-6 mb-15\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"exampleFormControlSelect1\">Title*</label>\r\n                    <input type=\"text\" class=\"form-control\" placeholder=\"Title\" formControlName=\"title\"\r\n                      id=\"exampleFormControlSelect1\">\r\n                    <!-- <select class=\"form-control\" placeholder=\"Serch\" formControlName=\"reporter\" id=\"exampleFormControlSelect1\">\r\n                          <option value=\"\">Select reported by</option>\r\n                          <option *ngFor=\"let teachers of teacherList\" [value]=\"teachers.id\">{{ teachers.teacherName }}</option>\r\n                        </select> -->\r\n                    <div *ngIf=\"f.title.invalid &&\r\n                            (f.title.dirty || f.title.touched) \" class=\"text-left errormsg\">\r\n                      <span *ngIf=\"f.title.errors.required\">\r\n                        <i class=\"fa fa-exclamation-circle\"></i>\r\n                        <span class=\"\"> Please enter title</span>\r\n                      </span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-lg-6 mb-15 \">\r\n                  <div class=\"form-group pop-switch\">\r\n                    <label class=\"first\" for=\"exampleFormControlSelect1\">Public*</label>\r\n                    <!-- <select class=\"form-control\" formControlName=\"public\" id=\"exampleFormControlSelect1\">\r\n                          <option value=\"\">Select option</option>\r\n                          <option value=\"true\">Yes</option>\r\n                          <option value=\"false\">No</option>\r\n                        </select> -->\r\n                    <p-inputSwitch formControlName=\"public\"></p-inputSwitch>\r\n                    <div *ngIf=\"f.public.invalid && (f.public.dirty || f.public.touched) \" class=\"text-left errormsg\">\r\n                      <span *ngIf=\"f.public.errors.required\">\r\n                        <i class=\"fa fa-exclamation-circle\"></i>\r\n                        <span class=\"\"> Please select option</span>\r\n                      </span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"row mb-15\">\r\n                <!-- <div class=\"col-lg-1\">\r\n                      <div class=\"chatimg w-20\">\r\n                        <img src=\"https://ptetutorials.com/images/user-profile.png\" alt=\"img\" class=\"img-fluid\" />\r\n                      </div>\r\n                    </div> -->\r\n\r\n                <div class=\"col-lg-12\">\r\n                  <div class=\"postmsg\">\r\n                    <textarea name=\"\" id=\"\" rows=\"8\" formControlName=\"text\"\r\n                      placeholder=\"Write somethings to post\"></textarea>\r\n                    <div *ngIf=\"f.text.invalid && (f.text.dirty || f.text.touched)\" text=\"text-left errormsg\">\r\n                      <span *ngIf=\"f.text.errors.required\" class=\"errormsg\">\r\n                        <i class=\"fa fa-exclamation-circle\"></i>\r\n                        <span> Please Write somethings</span>\r\n                      </span>\r\n                    </div>\r\n                  </div>\r\n\r\n                </div>\r\n              </div>\r\n              <div class=\"row mb-15\">\r\n                <div class=\"col-lg-6 \">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"exampleFormControlSelect1\">Class*</label>\r\n                    <select class=\"form-control\" placeholder=\"Serch\" (change)=\"getStudentsList()\"\r\n                      formControlName=\"class\" id=\"exampleFormControlSelect1\">\r\n                      <option value=\"\">Select class</option>\r\n                      <option *ngFor=\"let classes of classList\" [value]=\"classes.value\">{{ classes.label }}</option>\r\n                    </select>\r\n                    <div *ngIf=\"f.class.invalid && (f.class.dirty || f.class.touched)\" class=\"text-left errormsg\">\r\n                      <span *ngIf=\"f.class.errors.required\">\r\n                        <i class=\"fa fa-exclamation-circle\"></i>\r\n                        <span class=\"\"> Please select class</span>\r\n                      </span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-lg-6  \">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"exampleFormControlSelect1\">Student Name*</label>\r\n                    <p-multiSelect [options]=\"studentList\" formControlName=\"studentname\"\r\n                      [panelStyle]=\"{minWidth:'200px'}\" formControlName=\"studentname\" [maxSelectedLabels]=\"5\">\r\n                    </p-multiSelect>\r\n                    <div *ngIf=\"  f.studentname.invalid &&\r\n                          (f.studentname.dirty || f.studentname.touched)\" class=\"text-left errormsg\">\r\n                      <span *ngIf=\"f.studentname.errors.required\">\r\n                        <i class=\"fa fa-exclamation-circle\"></i>\r\n                        <span class=\"\"> Please select student</span>\r\n                      </span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"row mb-15 \">\r\n                <div class=\"col-lg-12\">\r\n                  <div class=\"form-group\">\r\n                    <h4>Upload Video (.mp4 extention only)</h4>\r\n                    <p-fileUpload name=\"myfile[]\" #pformvideo uploadLabel=\"Post\" [accept]=\"allowedVideoFileType\"\r\n                      maxFileSize=\"200000000\" [showUploadButton]=\"showUploadBtn\" customUpload=\"true\"\r\n                      (uploadHandler)=\"myVideoUploader($event)\"></p-fileUpload>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </form>\r\n          </div>\r\n          <div class=\"modal-footer\">\r\n            <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n\r\n\r\n    <div class=\"modal fade editshadow\" id=\"edithealth\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"editactivityLabel\"\r\n      aria-hidden=\"true\">\r\n      <div class=\"modal-dialog\" role=\"document\">\r\n        <div class=\"modal-content\">\r\n          <div class=\"modal-header\">\r\n            <h5 class=\"modal-title\" id=\"editactivityLabel\">Today's Medication</h5>\r\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n              <span aria-hidden=\"true\">&times;</span>\r\n            </button>\r\n          </div>\r\n          <div class=\"modal-body\">\r\n            <ul class=\"nav nav-tabs\" id=\"myTab\" role=\"tablist\">\r\n              <li class=\"nav-item\">\r\n                <a class=\"nav-link active\" id=\"health-tab\" data-toggle=\"tab\" href=\"#health\" role=\"tab\"\r\n                  aria-controls=\"health\" aria-selected=\"false\">\r\n                  <!-- <i class=\"fa fa-child\" aria-hidden=\"true\"></i> -->\r\n                  <img src=\"assets/img/stethoscope.svg\" alt=\"\">\r\n                  <p>Medications</p>\r\n                </a>\r\n              </li>\r\n            </ul>\r\n\r\n            <form [formGroup]=\"healthForm\">\r\n              <div class=\"row mt-20\">\r\n                <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"\">Add Temperature (°F)</label>\r\n                    <input aria-describedby=\"\" type=\"text\" formControlName=\"temperature\" class=\"form-control\" id=\"\"\r\n                      placeholder=\"\">\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"row\">\r\n                <div class=\"col-lg-12 botm10\">\r\n                  <div class=\"form-group\">\r\n                    <label>Health Note*</label>\r\n                    <textarea aria-describedby=\"\" formControlName=\"tempcmnt\" row=\"10\" class=\"form-control\" id=\"\"\r\n                      placeholder=\"Health Note\"></textarea>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n\r\n              <div class=\"row mt-20\">\r\n                <div class=\"col-lg-6 \">\r\n                  <div class=\"\">\r\n                    <label class=\"checkboxcustom\">\r\n                      <input type=\"checkbox\" id=\"checkbox-in\" class=\"abc\" formControlName=\"teacherack\">\r\n                      <span class=\"checkmark abc\"></span> <label style=\"margin-left: 15px;\"> Acknowledge</label>\r\n                    </label>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n\r\n\r\n            </form>\r\n\r\n          </div>\r\n          <div class=\"modal-footer\">\r\n            <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\r\n            <button type=\"button\" class=\"btn btn-primary\" (click)=\"medicationDone()\">Save</button>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n  </div>\r\n</div>\r\n<ngx-spinner type=\"ball-atom\" size=\"medium\" color=\"#58A7FE\"></ngx-spinner>"

/***/ }),

/***/ "./src/app/layout/teacher/components/teacher-dashboard/teacher-dashboard.component.ts":
/*!********************************************************************************************!*\
  !*** ./src/app/layout/teacher/components/teacher-dashboard/teacher-dashboard.component.ts ***!
  \********************************************************************************************/
/*! exports provided: TeacherDashboardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TeacherDashboardComponent", function() { return TeacherDashboardComponent; });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var _shared_services_teacher_api_service_teacher_api_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/services/teacher-api-service/teacher-api.service */ "./src/app/layout/teacher/shared/services/teacher-api-service/teacher-api.service.ts");
/* harmony import */ var _shared_services_common_common_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../shared/services/common/common.service */ "./src/app/shared/services/common/common.service.ts");
/* harmony import */ var _shared_constant__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../shared/constant */ "./src/app/layout/teacher/shared/constant.ts");
/* harmony import */ var _shared_services_error_handler_error_handler_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../shared/services/error-handler/error-handler.service */ "./src/app/shared/services/error-handler/error-handler.service.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _shared_services_notification_service_notification_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../shared/services/notification-service/notification.service */ "./src/app/shared/services/notification-service/notification.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var TeacherDashboardComponent = /** @class */ (function () {
    // PostActivityVM: PostActivityVM = {};
    // ImagesVM: ImagesVM = {};
    // VideosVM: VideosVM ={};
    // tslint:disable-next-line:max-line-length
    function TeacherDashboardComponent(spinner, apiService, commonService, fb, error, notification) {
        this.spinner = spinner;
        this.apiService = apiService;
        this.commonService = commonService;
        this.fb = fb;
        this.error = error;
        this.notification = notification;
        this.classList = [];
        this.cars = [];
        this.studentList = [];
        this.teacherList = [];
        this.closeModal = '';
        this.participantSudents = [];
        this.participantsList = [];
        // uploadedFiles: any[] = [];
        this.uploadedFiles = new FormData();
        this.formData = new FormData();
        this.showUploadBtn = true;
        this.totalFilesBeforeUpload = 0;
        this.isImageUploaderDisplay = true;
        this.allowedImageFileType = 'image/*';
        this.allowedVideoFileType = 'video/mp4';
        this.flag = false;
        this.imageUrlArray = [];
        this.videoUrlArray = [];
        this.classLogList = [];
        this.today = new Date();
        this.classId = 0;
        this.medicationList = [];
        this.allergyList = [];
        this.classNameForMedication = '';
        this.studentListId = [];
        this.HealthVM = {};
        this.currentCheckinClassId = 0;
        this.currentCheckStatus = 0;
        this.presentStudentCount = 0;
        this.studentEnrolledCountForClass = 0;
        this.eventCountForClass = 0;
        this.classIDForInfo = 0;
        //  this.getTeacherClassLog();
    }
    TeacherDashboardComponent.prototype.ngOnInit = function () {
        this.spinner.show();
        //  this.getData();
        this.getTeacherClassLog();
        this.createImageUploadForm();
        this.userImage = this.commonService.getUserImage('userdetails');
        this.createHealthForm();
        // this.getTeacherCurrentClassLogStatus();
    };
    TeacherDashboardComponent.prototype.ngAfterViewInit = function () {
        this.getTeacherOperationalClasses();
        // this.getAllClassess();
        this.getAllTeachers();
        //  this.getAllParticipants();
    };
    TeacherDashboardComponent.prototype.createHealthForm = function () {
        // if (this.healthId === 0) {
        this.healthForm = this.fb.group({
            temperature: [''],
            tempcmnt: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_0__["Validators"].required],
            teacherack: [true]
        });
    };
    TeacherDashboardComponent.prototype.createImageUploadForm = function () {
        this.ImageUploadForm = this.fb.group({
            studentname: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_0__["Validators"].required],
            participants: [''],
            public: [true, _angular_forms__WEBPACK_IMPORTED_MODULE_0__["Validators"].required],
            class: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_0__["Validators"].required],
            text: [''],
            isvideo: [''],
            isimage: ['Image'],
            title: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_0__["Validators"].required]
        });
    };
    Object.defineProperty(TeacherDashboardComponent.prototype, "f", {
        get: function () { return this.ImageUploadForm.controls; },
        enumerable: true,
        configurable: true
    });
    TeacherDashboardComponent.prototype.getData = function () {
        var _this = this;
        setTimeout(function () {
            _this.spinner.hide();
        }, 500);
        //
    };
    TeacherDashboardComponent.prototype.clearForm = function () {
        this.participantsList = [];
        this.studentList = [];
        // this.ImageUploadForm();
    };
    TeacherDashboardComponent.prototype.closeDialog = function () {
        this.closeModal = 'modal';
        $('.addimage').modal('hide');
    };
    TeacherDashboardComponent.prototype.onUpload = function (event) {
        // for (const file of event.files) {
        this.formData.append('image', event.files[0]);
        // this.uploadedFiles.push(file);
        // }
    };
    TeacherDashboardComponent.prototype.myImageUploader = function (event) {
        this.spinner.show();
        this.flag = true;
        this.isImageArray = true;
        this.formData = new FormData();
        var count = 0;
        if (event.files.length <= 3) {
            for (var index = 0; index < event.files.length; index++) {
                this.formData.append(event.files[index].name, event.files[index]);
                count = index;
                if (count === event.files.length - 1) {
                    // this.spinner.hide();
                    // this.notification.success({ message: 'Ready to upload', title: 'Done!' });
                    // console.log('upload call', count);
                    this.uploadMedia();
                }
            }
        }
        else {
            this.spinner.hide();
            this.notification.warning({ message: 'You can upload maximum 3 images only', title: '' });
        }
    };
    TeacherDashboardComponent.prototype.myVideoUploader = function (event) {
        this.spinner.show();
        this.flag = true;
        this.isImageArray = false;
        this.formData = new FormData();
        this.formData.append(event.files[0].name, event.files[0]);
        // this.notification.success({ message: 'Video is ready to upload', title: 'Done!' });
        this.uploadMedia();
    };
    TeacherDashboardComponent.prototype.savePostDetails = function () {
        this.spinner.show();
        if (this.flag === true) {
            this.uploadMedia();
        }
        else {
            this.savePost();
        }
    };
    TeacherDashboardComponent.prototype.limitOnFiles = function (event) {
        for (var index = 0; index < event.files.length; index++) {
            if (index > 3) {
                this.showUploadBtn = false;
                this.notification.warning({ message: 'You can upload maximum 4 files only', title: 'Limit reached' });
            }
            else {
                this.showUploadBtn = true;
            }
        }
    };
    TeacherDashboardComponent.prototype.limitOnImageFiles = function (event) {
        if (event.files.length > 3) {
            this.notification.warning({ message: 'You can upload maximum 3 images only', title: '' });
        }
    };
    TeacherDashboardComponent.prototype.getAllTeachers = function () {
        var _this = this;
        // this.spinner.show();
        var req = {
            'agencyID': this.commonService.getAgencyId(),
        };
        this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_5__["TeacherAPIURLs"].GetAllTeachers, req, null).subscribe(function (res) {
            if (res.body.statusCode === 200) {
                _this.teacherList = res.body.data;
                //  this.spinner.hide();
            }
            else {
                //   this.spinner.hide();
                _this.error.unknownError();
            }
        }, function (err) {
            _this.spinner.hide();
            _this.error.commonError(err);
        });
    };
    TeacherDashboardComponent.prototype.getAllClassess = function () {
        var _this = this;
        // this.spinner.show();
        var data = {
            'agencyID': this.commonService.getAgencyId()
        };
        this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_5__["TeacherAPIURLs"].GetAllClasses, data, null).subscribe(function (res) {
            //  this.spinner.hide();
            if (res.body.statusCode === 200) {
                _this.classList = res.body.data;
            }
            else {
                //     this.spinner.hide();
                _this.error.unknownError();
            }
        }, function (err) {
            _this.spinner.hide();
            _this.error.commonError(err);
        });
    };
    TeacherDashboardComponent.prototype.getStudentsList = function () {
        var _this = this;
        this.ImageUploadForm.controls['studentname'].setValue('');
        this.ImageUploadForm.controls['studentname'].updateValueAndValidity();
        this.studentList = [];
        this.spinner.show();
        var data = {
            'agencyID': this.commonService.getAgencyId(),
            'classID': this.ImageUploadForm.value.class,
            'studentID': 0,
            'studentName': ''
        };
        this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_5__["TeacherAPIURLs"].GetAllStudentsDropDownByClass, data, null).subscribe(function (res) {
            if (res.body.statusCode === 200) {
                _this.spinner.hide();
                _this.studentList = res.body.data;
            }
            else {
                _this.spinner.hide();
                _this.error.unknownError();
            }
        }, function (err) {
            _this.spinner.hide();
            _this.error.commonError(err);
        });
    };
    TeacherDashboardComponent.prototype.getAllStudentsByClass = function () {
        var _this = this;
        this.ImageUploadForm.controls['participants'].setValue('');
        this.participantsList = [];
        var data = {
            'agencyID': this.commonService.getAgencyId(),
            'classID': this.ImageUploadForm.value.class
        };
        this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_5__["TeacherAPIURLs"].GetAllStudentsDropDownByClass, data, null).subscribe(function (res) {
            if (res.body.statusCode === 200) {
                _this.participantsList = res.body.data;
            }
            else {
                _this.spinner.hide();
                _this.error.unknownError();
            }
        }, function (err) {
            _this.spinner.hide();
            _this.error.commonError(err);
        });
    };
    TeacherDashboardComponent.prototype.savePost = function () {
        var _this = this;
        if (this.ImageUploadForm.valid) {
            if (this.imageUrlArray.length > 0 || this.videoUrlArray.length > 0) {
                var data = {
                    'agencyID': this.commonService.getAgencyId(),
                    'id': 0,
                    'classesID': this.ImageUploadForm.value.class,
                    'studentID': 0,
                    'studentName': '',
                    'postedDate': new Date(),
                    'selectedStudents': this.ImageUploadForm.value.studentname,
                    'postActivityImages': this.imageUrlArray,
                    'postActivityvideos': this.videoUrlArray,
                    'postDescription': this.ImageUploadForm.value.text,
                    'teacherID': this.commonService.getReleventUserId('userdetails'),
                    'isPublic': this.ImageUploadForm.value.public,
                    'postTitle': this.ImageUploadForm.value.title,
                    'createdBy': this.commonService.getLoggedInUserId()
                };
                this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_5__["TeacherAPIURLs"].SavePostActivites, data, null).subscribe(function (res) {
                    if (res.body.statusCode === 200) {
                        $('.addimage').modal('hide');
                        $('.addvideo').modal('hide');
                        _this.spinner.hide();
                        _this.notification.success({ message: 'Post created successfully', title: '' });
                    }
                    else {
                        _this.spinner.hide();
                        _this.error.unknownError();
                    }
                }, function (err) {
                    _this.spinner.hide();
                    _this.error.commonError(err);
                });
            }
            else {
                this.spinner.hide();
                this.notification.warning({ message: 'Please upload Image or video', title: '' });
            }
        }
        else {
            this.spinner.hide();
            this.commonService.validateAllFields(this.ImageUploadForm);
        }
    };
    TeacherDashboardComponent.prototype.getMediaType = function (value) {
        if (value === 1) {
            this.isImageUploaderDisplay = true;
        }
        else {
            this.isImageUploaderDisplay = false;
        }
    };
    TeacherDashboardComponent.prototype.uploadMedia = function () {
        var _this = this;
        if (this.ImageUploadForm.valid) {
            this.videoUrlArray = [];
            this.imageUrlArray = [];
            var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_7__["HttpHeaders"]();
            headers.set('Content-Type', null);
            headers.set('Accept', 'multipart/form-data');
            // const  params = headers.set('Content-Disposition', 'multipart/form-data');
            var params = headers;
            var loggedInId = this.commonService.getLoggedInUserId();
            var Id = loggedInId.toString();
            this.formData.append('loggedInId', Id);
            this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_5__["TeacherAPIURLs"].MultipleImageUpload, this.formData, params).subscribe(function (res) {
                if (res.body.statusCode === 200) {
                    _this.flag = false;
                    if (_this.isImageArray === true) {
                        res.body.data.forEach(function (x) {
                            _this.imageUrlArray.push({
                                'id': 0,
                                'postActivitiesID': 0,
                                'imageServerPath': x
                            });
                        });
                    }
                    else {
                        res.body.data.forEach(function (x) {
                            _this.videoUrlArray.push({
                                'id': 0,
                                'postActivitiesID': 0,
                                'vedioServerPath': x
                            });
                        });
                        // this.videoUrlArray = res.body.data;
                    }
                    _this.savePost();
                    _this.formData = new FormData();
                }
                else {
                    _this.spinner.hide();
                    _this.error.unknownError();
                    _this.formData = new FormData();
                }
            }, function (err) {
                _this.spinner.hide();
                _this.error.commonError(err);
                _this.formData = new FormData();
            });
        }
        else {
            this.spinner.hide();
            this.commonService.validateAllFields(this.ImageUploadForm);
        }
    };
    TeacherDashboardComponent.prototype.getTeacherClassLog = function () {
        var _this = this;
        // this.spinner.show();
        this.classLogList = [];
        var data = {
            'agencyID': this.commonService.getAgencyId(),
            'askingDate': new Date(),
            'teacherID': this.commonService.getReleventUserId('userdetails'),
        };
        this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_5__["TeacherAPIURLs"].GetTeacherClassLog, data, null).subscribe(function (res) {
            if (res.body.statusCode === 200) {
                if (res.body.data !== null && res.body.data !== undefined && res.body.data.length !== 0) {
                    _this.classLogList = res.body.data;
                    _this.classLogList.forEach(function (x) {
                        x.classStartTime = _this.commonService.getLocalDateTimeFromUTC(x.classStartTime);
                        x.classEndTime = _this.commonService.getLocalDateTimeFromUTC(x.classEndTime);
                    });
                    _this.classDetails = _this.classLogList[0];
                    _this.classId = _this.classDetails.classesID;
                    _this.classNameForMedication = _this.classDetails.className;
                    if (_this.classDetails.checkStatus > 0) {
                        _this.getStudentMedication();
                        _this.getStudentAllergy();
                    }
                }
                _this.spinner.hide();
            }
            else {
                _this.spinner.hide();
                _this.error.unknownError();
            }
        }, function (err) {
            _this.spinner.hide();
            _this.error.commonError(err);
        });
    };
    TeacherDashboardComponent.prototype.openImagePostModal = function () {
        if (this.classList.length === 0) {
            this.notification.info({ message: 'It seems like you have not checked-in into the class yet ', title: '' });
        }
        this.createImageUploadForm();
        $('.addimage').modal('show');
    };
    TeacherDashboardComponent.prototype.openVideoPostModal = function () {
        if (this.classList.length === 0) {
            this.notification.info({ message: 'It seems like you have not checked-in into the class yet ', title: '' });
        }
        this.createImageUploadForm();
        $('.addvideo').modal('show');
    };
    TeacherDashboardComponent.prototype.clearPost = function () {
        this.createImageUploadForm();
        this.imageUrlArray = [];
        this.videoUrlArray = [];
        this.studentList = [];
        this.pformvideo.clear();
        this.pform.clear();
    };
    TeacherDashboardComponent.prototype.getPageDetailsForClass = function (event) {
        this.medicationList = [];
        this.allergyList = [];
        this.classDetails = [];
        this.classDetails = this.classLogList[event.page];
        if (this.classDetails) {
            this.classNameForMedication = this.classDetails.className;
        }
        if (this.classDetails !== undefined && this.classDetails !== null && this.classDetails.checkStatus > 0) {
            this.classId = this.classDetails.classesID;
            this.classNameForMedication = this.classDetails.className;
            this.classIDForInfo = this.classDetails.classesID;
            this.getStudentMedication();
            this.getStudentAllergy();
            this.getTeacherDashboardInfo();
        }
    };
    TeacherDashboardComponent.prototype.verifyCheckIn = function (value, type, classname) {
        // value.checkStatus !== 2
        if (this.currentCheckinClassId !== value.classesID && this.currentCheckinClassId !== 0 && this.currentCheckStatus !== 2) {
            this.spinner.hide();
            this.notification.warning({ message: 'Please first checkout  from' + ' ' + classname + ' ' + 'class', title: '' });
        }
        else {
            // || value.checkStatus === 2
            if (value.checkStatus === 1) {
                this.spinner.hide();
                this.notification.warning({ message: 'You have already checked in for this class', title: '' });
            }
            else {
                var data = {
                    'agencyID': this.commonService.getAgencyId(),
                    'teacherID': this.commonService.getReleventUserId('userdetails'),
                    'teacherDailyAttendenceID': localStorage.getItem('teacherTodayAttendenceId'),
                    'classesID': value.classesID,
                    'checkInTime': new Date(),
                    'classStartTime': value.classStartTime,
                    'classEndTime': value.classEndTime,
                    'classAssignmentLogID': value.classAssignmentLogID,
                    'checkStatus': 1
                };
                var msg = 'Checked in successfully!';
                this.classCheckInCheckOut(data, msg);
            }
        }
    };
    TeacherDashboardComponent.prototype.verifyCheckOut = function (value, type, classname) {
        if (value.checkStatus === 2) {
            this.spinner.hide();
            this.notification.warning({ message: 'You have already checked out for this class', title: '' });
        }
        else if (value.checkStatus === 0) {
            this.spinner.hide();
            this.notification.warning({ message: 'Please first checked in for this class', title: '' });
        }
        else {
            var data = {
                'agencyID': this.commonService.getAgencyId(),
                'teacherID': this.commonService.getReleventUserId('userdetails'),
                'teacherDailyAttendenceID': localStorage.getItem('teacherTodayAttendenceId'),
                'classesID': value.classesID,
                'checkInTime': value.checkInTime,
                'checkOutTime': new Date(),
                'classStartTime': value.classStartTime,
                'classEndTime': value.classEndTime,
                'classAssignmentLogID': value.classAssignmentLogID,
                'id': value.id,
                'checkStatus': 2,
                'updatedBy': this.commonService.getLoggedInUserId()
            };
            var msg = 'Checked out successfully!';
            this.classCheckInCheckOut(data, msg);
        }
    };
    TeacherDashboardComponent.prototype.classCheckInCheckOut = function (data, msg) {
        var _this = this;
        $('#edittime').modal('hide');
        $('#checkinedittime').modal('hide');
        this.spinner.show();
        this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_5__["TeacherAPIURLs"].TeacherCheckInCheckOut, data, null).subscribe(function (res) {
            if (res.body.statusCode === 200) {
                _this.spinner.hide();
                _this.getTeacherOperationalClasses();
                _this.getTeacherClassLog();
                _this.notification.success({ message: msg, title: '' });
            }
            else {
                _this.spinner.hide();
                _this.error.unknownError();
            }
        }, function (err) {
            _this.spinner.hide();
            _this.error.commonError(err);
        });
    };
    TeacherDashboardComponent.prototype.getCheckInDetails = function (value) {
        this.perticularClassDetailsForEdit = [];
        this.editedCheckedInTime = this.commonService.getLocalDateTimeFromUTC(value.checkInTime);
        this.perticularClassDetailsForEdit = value;
    };
    TeacherDashboardComponent.prototype.editCheckedInDetails = function () {
        var data = {
            'agencyID': this.commonService.getAgencyId(),
            'teacherID': this.commonService.getReleventUserId('userdetails'),
            'teacherDailyAttendenceID': localStorage.getItem('teacherTodayAttendenceId'),
            'classesID': this.perticularClassDetailsForEdit.classesID,
            'checkInTime': this.editedCheckedInTime,
            'classStartTime': this.perticularClassDetailsForEdit.classStartTime,
            'classEndTime': this.perticularClassDetailsForEdit.classEndTime,
            'classAssignmentLogID': this.perticularClassDetailsForEdit.classAssignmentLogID,
            'checkStatus': 1,
            'id': this.perticularClassDetailsForEdit.id
        };
        var msg = 'Checked in time updated successfully!';
        this.classCheckInCheckOut(data, msg);
    };
    TeacherDashboardComponent.prototype.getCheckOutDetails = function (value) {
        this.perticularClassDetailsForEdit = [];
        this.editedCheckedInTime = this.commonService.getLocalDateTimeFromUTC(value.checkInTime);
        this.editedCheckedOutTime = this.commonService.getLocalDateTimeFromUTC(value.checkOutTime);
        this.perticularClassDetailsForEdit = value;
    };
    TeacherDashboardComponent.prototype.editCheckedOutDetails = function () {
        var data = {
            'agencyID': this.commonService.getAgencyId(),
            'teacherID': this.commonService.getReleventUserId('userdetails'),
            'teacherDailyAttendenceID': localStorage.getItem('teacherTodayAttendenceId'),
            'classesID': this.perticularClassDetailsForEdit.classesID,
            'checkOutTime': this.editedCheckedOutTime,
            'checkInTime': this.editedCheckedInTime,
            'classStartTime': this.perticularClassDetailsForEdit.classStartTime,
            'classEndTime': this.perticularClassDetailsForEdit.classEndTime,
            'classAssignmentLogID': this.perticularClassDetailsForEdit.classAssignmentLogID,
            'checkStatus': 2,
            'id': this.perticularClassDetailsForEdit.id
        };
        var msg = 'Checked out time updated successfully!';
        this.classCheckInCheckOut(data, msg);
    };
    TeacherDashboardComponent.prototype.getStudentMedication = function () {
        var _this = this;
        console.log('ttttttttttttttttttttttttttt');
        this.loader = true;
        var reqData = {
            'agencyID': this.commonService.getAgencyId(),
            'askingDate': new Date(),
            'teacherID': this.commonService.getReleventUserId('userdetails'),
            'classID': this.classId
        };
        this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_5__["TeacherAPIURLs"].GetTeacherTodayMedicationTasks, reqData, null).subscribe(function (res) {
            if (res.body.statusCode === 200) {
                if (res.body.data !== null && res.body.data !== undefined) {
                    _this.medicationList = res.body.data;
                    _this.loader = false;
                }
                _this.spinner.hide();
            }
            else {
                _this.spinner.hide();
                _this.error.unknownError();
            }
        }, function (err) {
            _this.spinner.hide();
            _this.error.commonError(err);
        });
    };
    TeacherDashboardComponent.prototype.getTeacherOperationalClasses = function () {
        var _this = this;
        this.classList = [];
        // this.spinner.show();
        var data = {
            'agencyID': this.commonService.getAgencyId(),
            'askingDate': new Date(),
            'teacherID': this.commonService.getReleventUserId('userdetails'),
        };
        this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_5__["TeacherAPIURLs"].GetTeacherOperationalClasses, data, null).subscribe(function (res) {
            _this.spinner.hide();
            if (res.body.statusCode === 200) {
                if (res.body.data !== null && res.body.data !== undefined) {
                    _this.classList = res.body.data;
                    if (_this.classList.length !== 0) {
                        // this.notification.info({message: 'It seems like you have not checked-in into the class yet', title: '' });
                        _this.classId = _this.classList[0].value;
                        _this.classIDForInfo = _this.classList[0].value;
                        _this.getTeacherDashboardInfo();
                    }
                    else {
                        _this.classId = 0;
                    }
                }
            }
            else {
                _this.spinner.hide();
                _this.error.unknownError();
            }
        }, function (err) {
            _this.spinner.hide();
            _this.error.commonError(err);
        });
    };
    TeacherDashboardComponent.prototype.medicationDone = function () {
        if (this.healthForm.valid) {
            var agencyID = this.commonService.getAgencyId();
            this.HealthVM.id = 0;
            this.HealthVM.studentActivitiesID = 0;
            this.HealthVM.agencyID = agencyID;
            this.HealthVM.recordedTemparture = this.healthForm.value.temperature;
            this.HealthVM.studentHealthDescription = this.healthForm.value.tempcmnt;
            this.HealthVM.howTaken = this.studentMedicationDetails.howTaken;
            this.HealthVM.studentMedicationID = this.studentMedicationDetails.studentMedicationID;
            this.HealthVM.doseRepeatID = this.studentMedicationDetails.doseRepeatID;
            this.HealthVM.isTeacherAcknowledge = this.healthForm.value.teacherack;
            this.HealthVM.AcknowledgeTeacherID = this.commonService.getLoggedInUserId();
            this.HealthVM.AcknowledgeParentID = 0;
            this.HealthVM.IsMedicationDoneToday = true;
            var req = {
                'studentActivityMedications': this.HealthVM,
                'activityTypeID': 1,
                'selectedStudents': this.studentListId,
                'agencyID': agencyID,
                'classesID': this.classId,
                'id': 0,
                'createdBy': this.commonService.getLoggedInUserId(),
                'activityRegisterDate': this.today.toDateString(),
            };
            this.saveMedication(req);
        }
        else {
            this.notification.warning({ message: 'Please add health note', title: '' });
        }
    };
    TeacherDashboardComponent.prototype.saveMedication = function (req) {
        var _this = this;
        this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_5__["TeacherAPIURLs"].SaveStudentActivity, req, null).subscribe(function (res) {
            _this.spinner.hide();
            if (res.body.statusCode === 200) {
                $('#edithealth').modal('hide');
                _this.notification.success({ message: 'Activity added successfully', title: '' });
                _this.getStudentMedication();
            }
            else {
                _this.spinner.hide();
                _this.error.unknownError();
            }
        }, function (err) {
            _this.spinner.hide();
            _this.error.commonError(err);
        });
    };
    TeacherDashboardComponent.prototype.getStudentDetailsOfMedication = function (value) {
        this.createHealthForm();
        this.studentListId = [];
        this.studentMedicationDetails = [];
        this.studentListId.push(value.studentID);
        this.studentMedicationDetails = value;
    };
    TeacherDashboardComponent.prototype.getTeacherCurrentClassLogStatus = function (value, type) {
        var _this = this;
        this.spinner.show();
        var data = {
            'agencyID': this.commonService.getAgencyId(),
            'askingDate': new Date(),
            'teacherID': this.commonService.getReleventUserId('userdetails'),
        };
        this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_5__["TeacherAPIURLs"].GetTeacherCurrentClassLogStatus, data, null).subscribe(function (res) {
            var className;
            if (res.body.statusCode === 200) {
                _this.spinner.hide();
                _this.currentCheckinClassId = 0;
                _this.currentCheckStatus = 0;
                if (res.body.data !== null) {
                    _this.currentCheckinClassId = res.body.data.classesID;
                    _this.currentCheckStatus = res.body.data.checkStatus;
                    className = res.body.data.className;
                    if (type === 1) {
                        _this.verifyCheckIn(value, type, className);
                    }
                    else {
                        _this.verifyCheckOut(value, type, className);
                    }
                }
                else {
                    if (type === 1) {
                        _this.verifyCheckIn(value, type, className);
                    }
                    else {
                        _this.verifyCheckOut(value, type, className);
                    }
                }
            }
            else {
                _this.spinner.hide();
                _this.error.unknownError();
            }
        }, function (err) {
            _this.spinner.hide();
            _this.error.commonError(err);
        });
    };
    TeacherDashboardComponent.prototype.getTeacherDashboardInfo = function () {
        var _this = this;
        this.spinner.show();
        var req = {
            'teacherID': this.commonService.getReleventUserId('userdetails'),
            'classID': this.classIDForInfo,
            'agencyID': this.commonService.getAgencyId(),
            'askingDate': new Date()
        };
        this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_5__["TeacherAPIURLs"].TeacherDashboardInfo, req, null).subscribe(function (res) {
            if (res.body.statusCode === 200) {
                if (res.body.data) {
                    _this.eventCountForClass = res.body.data.eventCount;
                    _this.presentStudentCount = res.body.data.presentStudentCount;
                    _this.studentEnrolledCountForClass = res.body.data.studentEnrolledCount;
                }
                _this.spinner.hide();
            }
            else {
                _this.spinner.hide();
                _this.error.unknownError();
            }
        }, function (err) {
            _this.spinner.hide();
            _this.error.commonError(err);
        });
    };
    // Allergies
    TeacherDashboardComponent.prototype.getStudentAllergy = function () {
        var _this = this;
        this.loader = true;
        var reqData = {
            'agencyID': this.commonService.getAgencyId(),
            'askingDate': new Date(),
            'teacherID': this.commonService.getReleventUserId('userdetails'),
            'classID': this.classId
        };
        this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_5__["TeacherAPIURLs"].GetStudentAllergy, reqData, null).subscribe(function (res) {
            if (res.body.statusCode === 200) {
                if (res.body.data !== null && res.body.data !== undefined) {
                    _this.allergyList = res.body.data;
                    console.log(_this.allergyList, 'llllllllllllllllllllllllllllll');
                    _this.loader = false;
                }
                _this.spinner.hide();
            }
            else {
                _this.spinner.hide();
                _this.error.unknownError();
            }
        }, function (err) {
            _this.spinner.hide();
            _this.error.commonError(err);
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('pform'),
        __metadata("design:type", Object)
    ], TeacherDashboardComponent.prototype, "pform", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('pformvideo'),
        __metadata("design:type", Object)
    ], TeacherDashboardComponent.prototype, "pformvideo", void 0);
    TeacherDashboardComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-teacher-dashboard',
            template: __webpack_require__(/*! ./teacher-dashboard.component.html */ "./src/app/layout/teacher/components/teacher-dashboard/teacher-dashboard.component.html"),
            styles: [__webpack_require__(/*! ./teacher-dashboard.component.css */ "./src/app/layout/teacher/components/teacher-dashboard/teacher-dashboard.component.css")]
        }),
        __metadata("design:paramtypes", [ngx_spinner__WEBPACK_IMPORTED_MODULE_2__["NgxSpinnerService"], _shared_services_teacher_api_service_teacher_api_service__WEBPACK_IMPORTED_MODULE_3__["TeacherApiService"], _shared_services_common_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormBuilder"], _shared_services_error_handler_error_handler_service__WEBPACK_IMPORTED_MODULE_6__["ErrorHandlerService"], _shared_services_notification_service_notification_service__WEBPACK_IMPORTED_MODULE_8__["NotificationService"]])
    ], TeacherDashboardComponent);
    return TeacherDashboardComponent;
}());



/***/ }),

/***/ "./src/app/layout/teacher/components/teacher-event-planner/teacher-event-planner.component.css":
/*!*****************************************************************************************************!*\
  !*** ./src/app/layout/teacher/components/teacher-event-planner/teacher-event-planner.component.css ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2xheW91dC90ZWFjaGVyL2NvbXBvbmVudHMvdGVhY2hlci1ldmVudC1wbGFubmVyL3RlYWNoZXItZXZlbnQtcGxhbm5lci5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/layout/teacher/components/teacher-event-planner/teacher-event-planner.component.html":
/*!******************************************************************************************************!*\
  !*** ./src/app/layout/teacher/components/teacher-event-planner/teacher-event-planner.component.html ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"wrapper\">\r\n  <div class=\"container-fluid\">\r\n\r\n    <div class=\"pagetitle\">\r\n      <div>\r\n        <h2>Calendar\r\n          <span>/ Event Planner </span>\r\n        </h2>\r\n      </div>\r\n      <div>\r\n        <button type=\"submit\" class=\"btn btn-red\" data-toggle=\"modal\" data-target=\".addevent\" (click)=\"clearForm();cleareRepeateIDStatus()\">Add\r\n          Event</button>\r\n      </div>\r\n    </div>\r\n    <div *ngIf=\"calendarOptions\">\r\n      <ng-fullcalendar #ucCalendar [options]=\"calendarOptions\" (eventClick)=\"gotoDate($event.detail)\" (eventDrop)=\"updateEvent($event.detail)\"\r\n        (eventResize)=\"updateEvent($event.detail)\" (clickButton)=\"clickButton($event.detail)\" (eventRender)=\"eventRenderMethod($event.detail)\"\r\n        (click)=\"click($event)\"></ng-fullcalendar>\r\n    </div>\r\n\r\n\r\n    <div class=\"modal fade addevent\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myLargeModalLabel\" aria-hidden=\"true\">\r\n      <div class=\"modal-dialog modal-lg\">\r\n        <div class=\"modal-content\">\r\n          <div class=\"modal-header\">\r\n            <h5 class=\"modal-title\" id=\"exampleModalLongTitle\">Add Events</h5>\r\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n              <span aria-hidden=\"true\">&times;</span>\r\n            </button>\r\n          </div>\r\n          <div class=\"modal-body\">\r\n            <form [formGroup]=\"calenderForm\">\r\n\r\n              <div class=\"row mb-20\">\r\n                <div class=\"col-lg-3\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"\">Begins*</label>\r\n                    <!-- <input type=\"date\" class=\"form-control\" id=\"\" aria-describedby=\"\" placeholder=\"Select Start Date and Time\"> -->\r\n                    <input type=\"text\" placeholder=\"Begin\" formControlName=\"startdate\" showWeekNumbers=\"false\"\r\n                      [minDate]=\"today\" class=\"form-control\" [minDate]=\"today\" [bsConfig]=\"dpConfig\" bsDatepicker>\r\n                    <div *ngIf=\"f.startdate.invalid && (f.startdate.dirty || f.startdate.touched)\" class=\"text-left errormsg\">\r\n                      <span *ngIf=\"f.startdate.errors.required\">\r\n                        <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please select date</span>\r\n                      </span>\r\n                    </div>\r\n                  </div>\r\n\r\n                </div>\r\n                <div class=\"col-lg-3\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"\">End*</label>\r\n                    <!-- <input type=\"date\" class=\"form-control\" id=\"\" aria-describedby=\"\" placeholder=\"Select Start Date and Time\"> -->\r\n                    <input type=\"text\" placeholder=\"End\" formControlName=\"enddate\" showWeekNumbers=\"false\" [minDate]=\"today\"\r\n                      [minDate]=\"today\" class=\"form-control\" [bsConfig]=\"dpConfig\" bsDatepicker [readOnly]=\"disableEndDate\">\r\n                    <div *ngIf=\"f.enddate.invalid && (f.enddate.dirty || f.enddate.touched)\" class=\"text-left errormsg\">\r\n                      <span *ngIf=\"f.enddate.errors.required\">\r\n                        <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please select date</span>\r\n                      </span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-lg-3\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"\">Start time</label>\r\n                    <!-- <input type=\"date\" class=\"form-control\" id=\"\" aria-describedby=\"\" placeholder=\"Select Start Date and Time\"> -->\r\n                    <p-calendar class=\"custom-textbox-addevent\" styleClass=\"form-control\" formControlName=\"starttime\" [timeOnly]=\"true\" hourFormat=\"12\" icon=\"pi pi-clock\"\r\n                      [showIcon]=\"true\"></p-calendar>\r\n                    <div *ngIf=\"f.starttime.invalid && (f.starttime.dirty || f.starttime.touched)\" class=\"text-left errormsg\">\r\n                      <span *ngIf=\"f.starttime.errors.required\">\r\n                        <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please select time</span>\r\n                      </span>\r\n                    </div>\r\n                  </div>\r\n\r\n                </div>\r\n                <div class=\"col-lg-3\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"\">End time</label>\r\n                    <!-- <input type=\"date\" class=\"form-control\" id=\"\" aria-describedby=\"\" placeholder=\"Select Start Date and Time\"> -->\r\n                    <p-calendar styleClass=\"form-control\" class=\"custom-textbox-addevent\" formControlName=\"endtime\" [timeOnly]=\"true\" hourFormat=\"12\" icon=\"pi pi-clock\"\r\n                      [showIcon]=\"true\"></p-calendar>\r\n                    <div *ngIf=\"f.endtime.invalid && (f.endtime.dirty || f.endtime.touched)\" class=\"text-left errormsg\">\r\n                      <span *ngIf=\"f.endtime.errors.required\">\r\n                        <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please select time</span>\r\n                      </span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <!-- <input type=\"date\" class=\"form-control\" id=\"\" aria-describedby=\"\" placeholder=\"Select Start Date and Time\"> -->\r\n              <!-- <input type=\"date\" class=\"form-control\" id=\"\" aria-describedby=\"\" placeholder=\"Select Start Date and Time\"> -->\r\n              <!-- <div class=\"row mb-20\">\r\n                    <div class=\"col-lg-6\">\r\n                        <div class=\"form-group\">\r\n                          <label for=\"\">Start time</label>\r\n                          \r\n                          <p-calendar  styleClass=\"form-control\" [timeOnly]=\"true\" [showIcon]=\"true\"></p-calendar>\r\n                        </div>\r\n                       \r\n                      </div>\r\n                    <div class=\"col-lg-6\">\r\n                      <div class=\"form-group\">\r\n                        <label for=\"\">End Time</label>\r\n                        \r\n                        <p-calendar [timeOnly]=\"true\"></p-calendar>\r\n                      </div>\r\n                    </div>                     \r\n              </div> -->\r\n              <div class=\"row mb-20\">\r\n                <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"exampleFormControlSelect1\">Class*</label>\r\n                    <p-multiSelect [options]=\"classList\" [panelStyle]=\"{minWidth:'200px'}\" formControlName=\"class\"\r\n                      [maxSelectedLabels]=\"5\"></p-multiSelect>\r\n                    <div *ngIf=\"f.class.invalid && (f.class.dirty || f.class.touched)\" class=\"text-left errormsg\">\r\n                      <span *ngIf=\"f.class.errors.required\">\r\n                        <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please select class</span>\r\n                      </span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"exampleFormControlSelect1\">Title*</label>\r\n                    <!-- <select class=\"form-control\" id=\"exampleFormControlSelect1\">\r\n                                <option>Lunch</option>\r\n                                <option>Snacks</option>\r\n                                <option>Dinner</option>\r\n                              </select> -->\r\n                    <input type=\"text\" class=\"form-control\" formControlName=\"title\" id=\"\" aria-describedby=\"\"\r\n                      placeholder=\"Enter Event Title\">\r\n                    <div *ngIf=\"f.title.invalid && (f.title.dirty || f.title.touched)\" class=\"text-left errormsg\">\r\n                      <span *ngIf=\"f.title.errors.required\">\r\n                        <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please enter title</span>\r\n                      </span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n\r\n              <div class=\"row mb-20\">\r\n                <div class=\"col-lg-12\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"exampleFormControlSelect1\">Description* (Max limit 500 characters)</label>\r\n                    <textarea name=\"\" id=\"\" cols=\"3\" rows=\"3\" class=\"form-control\" formControlName=\"description\"></textarea>\r\n                    <div *ngIf=\"f.description.invalid && (f.description.dirty || f.description.touched)\" class=\"text-left errormsg\">\r\n                      <span *ngIf=\"f.description.errors.required\">\r\n                        <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please enter description</span>\r\n                      </span>\r\n                      <span *ngIf=\"f.description.errors.maxlength\">\r\n                          <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Cannot enter more then 500 characters</span>\r\n                        </span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n\r\n\r\n              <div class=\"row mb-20\">\r\n                <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"exampleFormControlSelect1\">Repeat*</label>\r\n                    <select class=\"form-control\" placeholder=\"First Aid Administered by\" formControlName=\"repeat\" id=\"exampleFormControlSelect1\"\r\n                      (change)=\"getRepeatOptions()\">\r\n                      <option *ngFor=\"let obj of repeatList\" [value]=\"obj.value\">{{obj.label}}</option>\r\n                    </select>\r\n                  </div>\r\n                </div>\r\n\r\n                <div class=\"col-lg-6\" *ngIf=\"showEndsOn\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"\">Ends on*</label>\r\n                    <!-- <input type=\"date\" class=\"form-control\" id=\"\" aria-describedby=\"\" placeholder=\"\"> -->\r\n                    <input type=\"text\" container=\"\" placeholder=\"Ends on\" formControlName=\"endson\" showWeekNumbers=\"false\" [minDate]=\"today\"\r\n                      class=\"form-control\" [bsConfig]=\"dpConfig\" [minDate]=\"bsDatepicker\" bsDatepicker>\r\n                    <div *ngIf=\"f.endson.invalid && (f.endson.dirty || f.endson.touched)\" class=\"text-left errormsg\">\r\n                      <span *ngIf=\"f.endson.errors.required\">\r\n                        <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please select date</span>\r\n                      </span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <!-- <div class=\"row mb-20\" *ngIf=\"showDays\">\r\n                    <div class=\"col-lg-6\">\r\n                      <div class=\"form-group\"><label>Select days to show event</label> </div>  \r\n                    </div>\r\n                    </div>\r\n                  <div class=\"row mb-20\" *ngIf=\"showDays\">\r\n                    \r\n                    <div class=\"col-lg-2\">\r\n                        <div class=\"form-group\">\r\n                            \r\n                             \r\n                             <div class=\"checkbox\">\r\n                               <label>\r\n                                 <input type=\"checkbox\" value=\"\">\r\n                                 Sunday\r\n                               </label>\r\n                             </div>\r\n                               \r\n                          </div>\r\n                    </div>\r\n                    <div class=\"col-lg-2\">\r\n                        <div class=\"form-group\">\r\n                            <div class=\"checkbox\">\r\n                                <label>\r\n                                  <input type=\"checkbox\" value=\"\">\r\n                                  Monday\r\n                                </label>\r\n                              </div>\r\n                          </div>\r\n                    </div>\r\n                    <div class=\"col-lg-2\">\r\n                        <div class=\"form-group\">\r\n                            <div class=\"checkbox\">\r\n                                <label>\r\n                                  <input type=\"checkbox\" value=\"\">\r\n                                  Tuesday\r\n                                </label>\r\n                              </div>\r\n                          </div>\r\n                    </div>\r\n                    <div class=\"col-lg-2\">\r\n                        <div class=\"form-group\">\r\n                            <div class=\"checkbox\">\r\n                                <label>\r\n                                  <input type=\"checkbox\" value=\"\">\r\n                                  Wednesday\r\n                                </label>\r\n                              </div>\r\n                          </div>\r\n                    </div>\r\n                    <div class=\"col-lg-2\">\r\n                        <div class=\"form-group\">\r\n                            <div class=\"checkbox\">\r\n                                <label>\r\n                                  <input type=\"checkbox\" value=\"\">\r\n                                  Thursday\r\n                                </label>\r\n                              </div>\r\n                          </div>\r\n                    </div>\r\n                    <div class=\"col-lg-2\">\r\n                        <div class=\"form-group\">\r\n                            <div class=\"checkbox\">\r\n                                <label>\r\n                                  <input type=\"checkbox\" value=\"\">\r\n                                  Friday\r\n                                </label>\r\n                              </div>\r\n                          </div>\r\n                    </div>\r\n                  </div> -->\r\n              <!-- <div class=\"row mb-20\" *ngIf=\"showEndsOn\">\r\n                      <div class=\"col-lg-2\">\r\n                          <div class=\"checkbox\">\r\n                              <label>\r\n                                <input type=\"checkbox\" value=\"\">\r\n                                Saturday\r\n                              </label>\r\n                            </div>\r\n         </div> \r\n         </div> -->\r\n            </form>\r\n          </div>\r\n          <div class=\"modal-footer\">\r\n            <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\r\n            <button type=\"button\" class=\"btn btn-primary\" (click)=\"saveEvent()\">Add Event</button>\r\n          </div>\r\n        </div>\r\n\r\n\r\n      </div>\r\n    </div>\r\n    <!-- Update model -->\r\n    <p-dialog class=\"update-event-popup\" header=\"Update Event\" [(visible)]=\"display\" [width]=\"600\">\r\n      <form [formGroup]=\"calenderForm\" class=\"pl-10 pr-20\">\r\n        <div class=\"row mb-20\">\r\n          <div class=\"col-lg-3\">\r\n            <div class=\"form-group\">\r\n              <label for=\"\">Begins*</label>\r\n              <!-- <input type=\"date\" class=\"form-control\" id=\"\" aria-describedby=\"\" placeholder=\"Select Start Date and Time\"> -->\r\n              <input type=\"text\" placeholder=\"Ends on\" formControlName=\"startdate\" showWeekNumbers=\"false\" [minDate]=\"today\"\r\n                class=\"form-control\" [bsConfig]=\"dpConfig\" bsDatepicker>\r\n              <div *ngIf=\"f.startdate.invalid && (f.startdate.dirty || f.startdate.touched)\" class=\"text-left errormsg\">\r\n                <span *ngIf=\"f.startdate.errors.required\">\r\n                  <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please select date</span>\r\n                </span>\r\n              </div>\r\n            </div>\r\n\r\n          </div>\r\n          <div class=\"col-lg-3\">\r\n            <div class=\"form-group\">\r\n              <label for=\"\">End*</label>\r\n              <!-- <input type=\"date\" class=\"form-control\" id=\"\" aria-describedby=\"\" placeholder=\"Select Start Date and Time\"> -->\r\n              <input type=\"text\" placeholder=\"Ends on\" formControlName=\"enddate\" showWeekNumbers=\"false\" [minDate]=\"today\"\r\n                class=\"form-control\" [bsConfig]=\"dpConfig\" bsDatepicker [readOnly]=\"disableEndDate\">\r\n              <div *ngIf=\"f.enddate.invalid && (f.enddate.dirty || f.enddate.touched)\" class=\"text-left errormsg\">\r\n                <span *ngIf=\"f.enddate.errors.required\">\r\n                  <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please select date</span>\r\n                </span>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-lg-3\">\r\n            <div class=\"form-group\">\r\n              <label for=\"\">Start time</label>\r\n              <!-- <input type=\"date\" class=\"form-control\" id=\"\" aria-describedby=\"\" placeholder=\"Select Start Date and Time\"> -->\r\n              <p-calendar class=\"custom-textbox-eventplan\" styleClass=\"form-control\" formControlName=\"starttime\" [timeOnly]=\"true\" hourFormat=\"12\" icon=\"pi pi-clock\"\r\n                [showIcon]=\"true\"></p-calendar>\r\n              <div *ngIf=\"f.starttime.invalid && (f.starttime.dirty || f.starttime.touched)\" class=\"text-left errormsg\">\r\n                <span *ngIf=\"f.starttime.errors.required\">\r\n                  <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\">select time</span>\r\n                </span>\r\n              </div>\r\n            </div>\r\n\r\n          </div>\r\n          <div class=\"col-lg-3\">\r\n            <div class=\"form-group\">\r\n              <label for=\"\">End time</label>\r\n              <!-- <input type=\"date\" class=\"form-control\" id=\"\" aria-describedby=\"\" placeholder=\"Select Start Date and Time\"> -->\r\n              <p-calendar class=\"custom-textbox-eventplan\" styleClass=\"form-control\" formControlName=\"endtime\" [timeOnly]=\"true\" hourFormat=\"12\" icon=\"pi pi-clock\"\r\n                [showIcon]=\"true\"></p-calendar>\r\n              <div *ngIf=\"f.endtime.invalid && (f.endtime.dirty || f.endtime.touched)\" class=\"text-left errormsg\">\r\n                <span *ngIf=\"f.endtime.errors.required\">\r\n                  <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\">select time</span>\r\n                </span>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"row mb-20\">\r\n          <div class=\"col-lg-6\">\r\n            <div class=\"form-group\">\r\n              <label for=\"exampleFormControlSelect1\">Class*</label>\r\n              <p-multiSelect [options]=\"classList\" [panelStyle]=\"{minWidth:'200px'}\" formControlName=\"class\"\r\n                [maxSelectedLabels]=\"5\"></p-multiSelect>\r\n              <div *ngIf=\"f.class.invalid && (f.class.dirty || f.class.touched)\" class=\"text-left errormsg\">\r\n                <span *ngIf=\"f.class.errors.required\">\r\n                  <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please select class</span>\r\n                </span>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-lg-6\">\r\n            <div class=\"form-group\">\r\n              <label for=\"exampleFormControlSelect1\">Title*</label>\r\n              <!-- <select class=\"form-control\" formControlName=\"category\" id=\"exampleFormControlSelect1\">\r\n                  <option>Lunch</option>\r\n                  <option>Snacks</option>\r\n                  <option>Dinner</option>\r\n                </select> -->\r\n              <input type=\"text\" class=\"form-control\" formControlName=\"title\" id=\"\" aria-describedby=\"\" placeholder=\"Enter Event Title\">\r\n              <div *ngIf=\"f.title.invalid && (f.title.dirty || f.title.touched)\" class=\"text-left errormsg\">\r\n                <span *ngIf=\"f.title.errors.required\">\r\n                  <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please enter title</span>\r\n                </span>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n\r\n        <div class=\"row mb-20\">\r\n          <div class=\"col-lg-12\">\r\n            <div class=\"form-group\">\r\n              <label for=\"exampleFormControlSelect1\">Description* (Max limit 500 characters)</label>\r\n              <textarea name=\"\" formControlName=\"description\" id=\"\" cols=\"3\" rows=\"3\" class=\"form-control\" maxlength=\"500\"></textarea>\r\n              <div *ngIf=\"f.description.invalid && (f.description.dirty || f.description.touched)\" class=\"text-left errormsg\">\r\n                <span *ngIf=\"f.description.errors.required\">\r\n                  <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please enter description</span>\r\n                </span>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n\r\n\r\n        <div class=\"row mb-20\">\r\n          <div class=\"col-lg-6\">\r\n            <div class=\"form-group\">\r\n              <label for=\"exampleFormControlSelect1\">Repeat*</label>\r\n              <select class=\"form-control\" placeholder=\"First Aid Administered by\" formControlName=\"repeat\" id=\"exampleFormControlSelect1\"\r\n                (change)=\"getRepeatOptions()\" disabled>\r\n                <option *ngFor=\"let obj of repeatList\" [value]=\"obj.value\">{{obj.label}}</option>\r\n              </select>\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"col-lg-6\" *ngIf=\"showEndsOn\">\r\n            <div class=\"form-group\">\r\n              <label for=\"\">Ends on*</label>\r\n              <!-- <input type=\"date\" class=\"form-control\"  formControlName=\"endson\" id=\"\" aria-describedby=\"\" placeholder=\"\"> -->\r\n              <input type=\"text\"  placeholder=\"Ends on\" formControlName=\"endson\" showWeekNumbers=\"false\" [minDate]=\"today\"\r\n                class=\"form-control\" [bsConfig]=\"dpConfig\" bsDatepicker disabled>\r\n              <div *ngIf=\"f.endson.invalid && (f.endson.dirty || f.endson.touched)\" class=\"text-left errormsg\">\r\n                <span *ngIf=\"f.endson.errors.required\">\r\n                  <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please select date</span>\r\n                </span>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n\r\n        <!-- <div class=\"row mb-20\" *ngIf=\"showEndsOn\">\r\n        <div class=\"col-lg-6\">\r\n          <div class=\"form-group\"><label>Select days to show event</label> </div>  \r\n        </div>\r\n        </div>\r\n      <div class=\"row mb-20\" *ngIf=\"showEndsOn\">\r\n        \r\n        <div class=\"col-lg-2\">\r\n            <div class=\"form-group\">\r\n                \r\n                 \r\n                 <div class=\"checkbox\">\r\n                   <label>\r\n                     <input type=\"checkbox\" value=\"\">\r\n                     Sunday\r\n                   </label>\r\n                 </div>\r\n                   \r\n              </div>\r\n        </div>\r\n        <div class=\"col-lg-2\">\r\n            <div class=\"form-group\">\r\n                <div class=\"checkbox\">\r\n                    <label>\r\n                      <input type=\"checkbox\" value=\"\">\r\n                      Monday\r\n                    </label>\r\n                  </div>\r\n              </div>\r\n        </div>\r\n        <div class=\"col-lg-2\">\r\n            <div class=\"form-group\">\r\n                <div class=\"checkbox\">\r\n                    <label>\r\n                      <input type=\"checkbox\" value=\"\">\r\n                      Tuesday\r\n                    </label>\r\n                  </div>\r\n              </div>\r\n        </div>\r\n        <div class=\"col-lg-2\">\r\n            <div class=\"form-group\">\r\n                <div class=\"checkbox\">\r\n                    <label>\r\n                      <input type=\"checkbox\" value=\"\">\r\n                      Wednesday\r\n                    </label>\r\n                  </div>\r\n              </div>\r\n        </div>\r\n        <div class=\"col-lg-2\">\r\n            <div class=\"form-group\">\r\n                <div class=\"checkbox\">\r\n                    <label>\r\n                      <input type=\"checkbox\" value=\"\">\r\n                      Thursday\r\n                    </label>\r\n                  </div>\r\n              </div>\r\n        </div>\r\n        <div class=\"col-lg-2\">\r\n            <div class=\"form-group\">\r\n                <div class=\"checkbox\">\r\n                    <label>\r\n                      <input type=\"checkbox\" value=\"\">\r\n                      Friday\r\n                    </label>\r\n                  </div>\r\n              </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"row mb-20\" *ngIf=\"showEndsOn\">\r\n          <div class=\"col-lg-2\">\r\n              <div class=\"checkbox\">\r\n                  <label>\r\n                    <input type=\"checkbox\" value=\"\">\r\n                    Saturday\r\n                  </label>\r\n                </div>\r\n</div> \r\n</div> -->\r\n\r\n\r\n      </form>\r\n      <p-footer>\r\n        <button type=\"button\" class=\"btn dlt\" (click)=\"deleteEvent()\"> Delete</button>\r\n        <button type=\"button\" class=\"btn btn-primary\" (click)=\"saveEvent()\">Update Event</button>\r\n      </p-footer>\r\n    </p-dialog>\r\n\r\n  </div>\r\n</div>\r\n<ngx-spinner type=\"ball-atom\" size=\"medium\" color=\"#58A7FE\"></ngx-spinner>\r\n<app-confirm-box></app-confirm-box>\r\n"

/***/ }),

/***/ "./src/app/layout/teacher/components/teacher-event-planner/teacher-event-planner.component.ts":
/*!****************************************************************************************************!*\
  !*** ./src/app/layout/teacher/components/teacher-event-planner/teacher-event-planner.component.ts ***!
  \****************************************************************************************************/
/*! exports provided: TeacherEventPlannerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TeacherEventPlannerComponent", function() { return TeacherEventPlannerComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ng_fullcalendar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ng-fullcalendar */ "./node_modules/ng-fullcalendar/ng-fullcalendar.es5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _shared_services_teacher_api_service_teacher_api_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/services/teacher-api-service/teacher-api.service */ "./src/app/layout/teacher/shared/services/teacher-api-service/teacher-api.service.ts");
/* harmony import */ var _shared_services_error_handler_error_handler_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../shared/services/error-handler/error-handler.service */ "./src/app/shared/services/error-handler/error-handler.service.ts");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var _shared_services_notification_service_notification_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../shared/services/notification-service/notification.service */ "./src/app/shared/services/notification-service/notification.service.ts");
/* harmony import */ var _shared_services_common_common_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../shared/services/common/common.service */ "./src/app/shared/services/common/common.service.ts");
/* harmony import */ var _shared_constant__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../shared/constant */ "./src/app/layout/teacher/shared/constant.ts");
/* harmony import */ var ngx_bootstrap__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ngx-bootstrap */ "./node_modules/ngx-bootstrap/esm5/ngx-bootstrap.js");
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! primeng/api */ "./node_modules/primeng/api.js");
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(primeng_api__WEBPACK_IMPORTED_MODULE_10__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var TeacherEventPlannerComponent = /** @class */ (function () {
    function TeacherEventPlannerComponent(apiService, fb, error, spinner, notification, commonService, confirmationService) {
        this.apiService = apiService;
        this.fb = fb;
        this.error = error;
        this.spinner = spinner;
        this.notification = notification;
        this.commonService = commonService;
        this.confirmationService = confirmationService;
        this.cars = [];
        this.today = new Date();
        this.classList = [];
        this.repeatList = [];
        this.eventList = [];
        this.eventVM = {};
        this.repeatNeverID = 0;
        this.multiClass = [];
        this.classListArray = [];
        this.eventId = 0;
        this.selectFoodList = [];
        this.shoEventList = [];
        this.disableEndDate = false;
        this.showDays = false;
        this.minEndDate = false;
        this.dpConfig = new ngx_bootstrap__WEBPACK_IMPORTED_MODULE_9__["BsDatepickerConfig"]();
    }
    TeacherEventPlannerComponent.prototype.ngOnInit = function () {
        this.currentDate = new Date();
        this.eventId = 0;
        this.classListArray = [];
        this.getAllClassess();
        this.getRepeatTypelist();
        this.dpConfig = Object.assign({}, { containerClass: 'theme-dark-blue' }, { showWeekNumbers: false });
        this.calendarOptions = {
            editable: false,
            eventLimit: false,
            displayEventTime: false,
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay,listMonth'
            },
            events: this.eventList,
        };
        this.showEndsOn = false;
        this.multiarray1 = ['Yoga', 'Singing'];
        this.multiarray2 = ['Yoga'];
        this.display = false;
        this.createEventForm();
        this.callEvent(this.currentDate);
        this.getFirstDayOfMonth();
        this.getLastDayOfMonth();
    };
    TeacherEventPlannerComponent.prototype.eventClick = function (data) {
    };
    TeacherEventPlannerComponent.prototype.createEventForm = function () {
        if (this.eventId === 0) {
            this.calenderForm = this.fb.group({
                startdate: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
                enddate: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
                starttime: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
                endtime: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
                class: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
                title: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
                description: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].maxLength(500)]],
                repeat: [this.repeatNeverID],
                endson: ['']
            });
        }
    };
    TeacherEventPlannerComponent.prototype.editEventForm = function () {
        if (this.eventId !== 0) {
            this.calenderForm = this.fb.group({
                startdate: [this.eventVM.start, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
                enddate: [this.eventVM.end, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
                starttime: [this.eventVM.startTime, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
                endtime: [this.eventVM.endTime, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
                class: [this.classListArray, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
                title: [this.eventVM.title, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
                description: [this.eventVM.description, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
                repeat: [this.eventVM.plannerRepeatTypeID],
                endson: [this.eventVM.endsOn]
            });
        }
    };
    Object.defineProperty(TeacherEventPlannerComponent.prototype, "f", {
        // convenience getter for easy access to form fields
        get: function () { return this.calenderForm.controls; },
        enumerable: true,
        configurable: true
    });
    TeacherEventPlannerComponent.prototype.callEvent = function (date) {
        this.getAllEvent(date);
    };
    /**Method to get event details */
    TeacherEventPlannerComponent.prototype.gotoDate = function (event) {
        var _this = this;
        this.display = true;
        this.disableEndDate = false;
        this.eventVM = {};
        this.classListArray = [];
        this.eventList.forEach(function (x) {
            if (x.id === event.event.id) {
                _this.eventId = event.event.id;
                _this.eventVM.title = event.event.title;
                _this.eventVM.start = (new Date(x.start));
                _this.eventVM.end = (new Date(x.end));
                _this.eventVM.description = x.description;
                _this.eventVM.startTime = _this.commonService.getLocalDateTimeFromUTC(x.startTime);
                _this.eventVM.endTime = _this.commonService.getLocalDateTimeFromUTC(x.endTime);
                if (x.plannerRepeatTypeID === 2) {
                    _this.disableEndDate = true;
                }
                else {
                    _this.disableEndDate = false;
                }
                _this.eventVM.plannerRepeatTypeID = x.plannerRepeatTypeID;
                _this.eventVM.endsOn = new Date(x.endsOn);
                if (x.involvedEventClassesList.length !== 0) {
                    x.involvedEventClassesList.forEach(function (element) {
                        _this.classListArray.push(element.classesID);
                    });
                }
                _this.editEventForm();
                if (_this.calenderForm.value.repeat !== _this.repeatNeverID) {
                    _this.showEndsOn = true;
                    _this.calenderForm.controls['endson'].setValidators(_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required);
                }
                else if (_this.calenderForm.value.repeat === _this.repeatNeverID) {
                    _this.calenderForm.controls['endson'].setValidators(_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator);
                    _this.showEndsOn = false;
                }
                else {
                }
            }
        });
    };
    TeacherEventPlannerComponent.prototype.closeUpdateDialogBox = function () {
        this.display = false;
    };
    /**Method to get previous and next month events */
    TeacherEventPlannerComponent.prototype.clickButton = function (value) {
        if (value.buttonType === 'prev' || value.buttonType === 'next') {
            var newDate = new Date(value.data._d);
            newDate.setHours(newDate.getHours() + 24);
            this.currentDate = newDate;
            this.callEvent(newDate);
        }
    };
    TeacherEventPlannerComponent.prototype.updateEvent = function (data) {
        console.log('update', this.calenderForm);
    };
    TeacherEventPlannerComponent.prototype.addNewEvent = function () {
        var temp = this.calenderForm.controls['repeat'].value;
    };
    // Method to hide and show reapet end date field
    TeacherEventPlannerComponent.prototype.getRepeatOptions = function () {
        this.showEndsOn = false;
        if (this.calenderForm.value.repeat !== this.repeatNeverID.toString()) {
            this.showEndsOn = true;
            this.calenderForm.controls['endson'].setValidators(_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required);
            this.calenderForm.controls['endson'].updateValueAndValidity();
        }
        else if (this.calenderForm.value.repeat === this.repeatNeverID.toString()) {
            this.calenderForm.controls['endson'].setValidators(_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator);
            this.calenderForm.controls['endson'].updateValueAndValidity();
            this.showEndsOn = false;
        }
        else {
        }
        if (this.calenderForm.value.repeat === '2') {
            this.disableEndDate = true;
            this.notification.warning({ message: 'This event will repeat daily from "Begins" to "Ends On" date you will select', title: '' });
        }
        else {
            this.disableEndDate = false;
        }
    };
    TeacherEventPlannerComponent.prototype.getAllClassess = function () {
        var _this = this;
        // this.spinner.show();
        var data = {
            'agencyID': this.commonService.getAgencyId()
        };
        this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_8__["TeacherAPIURLs"].GetAllClassesDropdown, data, null).subscribe(function (res) {
            //  this.spinner.hide();
            if (res.body.statusCode === 200) {
                _this.classList = res.body.data;
            }
            else {
                //     this.spinner.hide();
                _this.error.unknownError();
            }
        }, function (err) {
            _this.spinner.hide();
            _this.error.commonError(err);
        });
    };
    TeacherEventPlannerComponent.prototype.getRepeatTypelist = function () {
        var _this = this;
        // this.spinner.show();
        var data = {
            'agencyID': this.commonService.getAgencyId()
        };
        this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_8__["TeacherAPIURLs"].GetAllRepeatTypeDropdown, data, null).subscribe(function (res) {
            //  this.spinner.hide();
            if (res.body.statusCode === 200) {
                _this.repeatList = res.body.data;
                _this.repeatList.forEach(function (element) {
                    if (element.label === 'Never') {
                        _this.repeatNeverID = element.value;
                        _this.createEventForm();
                    }
                });
            }
            else {
                //     this.spinner.hide();
                _this.error.unknownError();
            }
        }, function (err) {
            _this.spinner.hide();
            _this.error.commonError(err);
        });
    };
    TeacherEventPlannerComponent.prototype.getAllEvent = function (date) {
        var _this = this;
        this.spinner.show();
        var data = {
            'agencyID': this.commonService.getAgencyId(),
            'eventSearchFromDate': this.commonService.getFirstDayOfMonth(date),
            'eventSearchToDate': this.commonService.getLastDayOfMonth(date),
        };
        this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_8__["TeacherAPIURLs"].GetAllEvents, data, null).subscribe(function (res) {
            //  this.spinner.hide();
            if (res.body.statusCode === 200) {
                _this.eventList = res.body.data;
                _this.eventList.forEach(function (x) {
                    var lastdt = new Date(x.end);
                    var enddt = new Date(x.end);
                    lastdt.setHours(enddt.getHours() + 9);
                    x.end = lastdt;
                });
                _this.configureScheduler();
            }
            else {
                _this.spinner.hide();
                _this.error.unknownError();
            }
        }, function (err) {
            _this.spinner.hide();
            _this.error.commonError(err);
        });
    };
    TeacherEventPlannerComponent.prototype.clearForm = function () {
        this.disableEndDate = false;
        // this.showDays = false;
        this.eventId = 0;
        this.createEventForm();
    };
    // method to bring repeate id and endson field inital state
    TeacherEventPlannerComponent.prototype.cleareRepeateIDStatus = function () {
        this.showEndsOn = false;
        this.calenderForm.controls['repeat'].setValue(this.repeatNeverID);
        this.calenderForm.controls['endson'].setValidators(_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator);
    };
    TeacherEventPlannerComponent.prototype.getFirstDayOfMonth = function () {
        var date = this.currentDate, y = date.getFullYear(), m = date.getMonth();
        var firstDay = new Date(y, m, 1);
        return firstDay.toDateString();
    };
    TeacherEventPlannerComponent.prototype.getLastDayOfMonth = function () {
        var date = this.currentDate, y = date.getFullYear(), m = date.getMonth();
        var lastDay = new Date(y, m + 1, 0);
        return lastDay.toDateString();
    };
    TeacherEventPlannerComponent.prototype.configureScheduler = function () {
        this.ucCalendar.renderEvents(this.eventList);
        this.spinner.hide();
    };
    TeacherEventPlannerComponent.prototype.removeEventPopupShow = function (event) {
    };
    TeacherEventPlannerComponent.prototype.click = function (event) {
    };
    TeacherEventPlannerComponent.prototype.eventRenderMethod = function (event) {
        // event.element.children('.fc-content')
        // .append(`<span>x</span>`);
    };
    TeacherEventPlannerComponent.prototype.saveEvent = function () {
        var _this = this;
        this.validateEndDate();
        this.multiClass = [];
        if (this.calenderForm.valid) {
            if (this.calenderForm.value.startdate.setHours(0, 0, 0) > this.calenderForm.value.enddate.setHours(0, 0, 0)) {
                this.notification.warning({ message: 'End date should be greater or equal than Begins date ', title: '' });
            }
            else if (this.calenderForm.value.starttime > this.calenderForm.value.endtime) {
                this.notification.warning({ message: 'End time should be greater than Start time  ', title: '' });
            }
            else if (this.showEndsOn &&
                (this.calenderForm.value.enddate.setHours(0, 0, 0) > this.calenderForm.value.endson.setHours(0, 0, 0))) {
                this.notification.warning({ message: 'Ends On  date should be greater than End date ', title: '' });
            }
            else {
                debugger;
                this.spinner.show();
                this.eventVM.agencyID = this.commonService.getAgencyId();
                this.eventVM.title = this.calenderForm.value.title;
                this.eventVM.start = new Date(this.calenderForm.value.startdate).toDateString();
                this.eventVM.end = new Date(this.calenderForm.value.enddate).toDateString();
                this.eventVM.description = this.calenderForm.value.description;
                this.eventVM.plannerRepeatTypeID = this.calenderForm.value.repeat;
                this.eventVM.endsOn = this.calenderForm.value.endson === '' ? new Date() : new Date(this.calenderForm.value.endson).toDateString();
                this.eventVM.startTime = this.calenderForm.value.starttime;
                this.eventVM.endTime = this.calenderForm.value.endtime;
                this.eventVM.id = this.eventId !== 0 ? this.eventId : 0;
                this.eventVM.createdBy = this.eventId !== 0 ? null : this.commonService.getLoggedInUserId();
                this.eventVM.updatedBy = this.eventId !== 0 ? this.commonService.getLoggedInUserId() : null;
                if (this.calenderForm.value.class.length !== 0) {
                    this.calenderForm.value.class.forEach(function (element) {
                        _this.multiClass.push({
                            'agencyID': _this.commonService.getAgencyId(),
                            'classesID': element,
                            'eventID': _this.eventId !== 0 ? _this.eventId : 0
                        });
                    });
                }
                this.eventVM.involvedEventClassesList = this.multiClass;
                this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_8__["TeacherAPIURLs"].SaveEvent, this.eventVM, null).subscribe(function (res) {
                    if (res.body.statusCode === 200) {
                        $('.addevent').modal('hide');
                        _this.display = false;
                        _this.callEvent(_this.currentDate);
                        _this.notification.success({
                            message: _this.eventId === 0 ? 'Event created successfully' :
                                'Event updated successfully', title: ''
                        });
                        // this.spinner.hide();
                    }
                    else {
                        _this.spinner.hide();
                        _this.error.unknownError();
                    }
                }, function (err) {
                    _this.spinner.hide();
                    _this.error.commonError(err);
                });
            }
        }
        else if (this.calenderForm.value.startdate <= this.today || this.calenderForm.value.enddate <= this.today) {
            this.notification.warning({ message: 'Your begins or End date should be greater or equal to current date', title: '' });
        }
        else {
            this.spinner.hide();
            this.commonService.validateAllFields(this.calenderForm);
        }
    };
    /**Delete event method */
    TeacherEventPlannerComponent.prototype.deleteEvent = function () {
        var _this = this;
        this.confirmationService.confirm({
            message: 'Do you want to delete this event?',
            accept: function () {
                if (_this.eventId > 0) {
                    _this.spinner.show();
                    var data = {
                        'agencyID': _this.commonService.getAgencyId(),
                        'Id': _this.eventId,
                        'IsDeleted': true,
                        'DeletedDate': new Date(),
                        'DeletedBy': _this.commonService.getLoggedInUserId()
                    };
                    _this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_8__["TeacherAPIURLs"].DeleteEvent, data, null).subscribe(function (res) {
                        if (res.body.statusCode === 200) {
                            // this.spinner.hide();
                            _this.deleteIncidentSuccess(_this.eventId);
                        }
                        else {
                            _this.spinner.hide();
                            _this.error.unknownError();
                        }
                    }, function (err) {
                        _this.spinner.hide();
                        _this.error.commonError(err);
                    });
                }
                else {
                    _this.error.unknownError();
                }
            }
        });
    };
    /**Success method for delete event */
    TeacherEventPlannerComponent.prototype.deleteIncidentSuccess = function (data) {
        var index = this.eventList.findIndex(function (r) { return r.id === data; });
        this.eventList.splice(index, 1);
        this.spinner.hide();
        this.ucCalendar.renderEvents(this.eventList);
        this.display = false;
        this.notification.success({ message: 'Event deleted successfully', title: '' });
    };
    TeacherEventPlannerComponent.prototype.validateEndDate = function () {
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(ng_fullcalendar__WEBPACK_IMPORTED_MODULE_1__["CalendarComponent"]),
        __metadata("design:type", ng_fullcalendar__WEBPACK_IMPORTED_MODULE_1__["CalendarComponent"])
    ], TeacherEventPlannerComponent.prototype, "ucCalendar", void 0);
    TeacherEventPlannerComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-teacher-event-planner',
            template: __webpack_require__(/*! ./teacher-event-planner.component.html */ "./src/app/layout/teacher/components/teacher-event-planner/teacher-event-planner.component.html"),
            styles: [__webpack_require__(/*! ./teacher-event-planner.component.css */ "./src/app/layout/teacher/components/teacher-event-planner/teacher-event-planner.component.css")]
        }),
        __metadata("design:paramtypes", [_shared_services_teacher_api_service_teacher_api_service__WEBPACK_IMPORTED_MODULE_3__["TeacherApiService"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"], _shared_services_error_handler_error_handler_service__WEBPACK_IMPORTED_MODULE_4__["ErrorHandlerService"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_5__["NgxSpinnerService"], _shared_services_notification_service_notification_service__WEBPACK_IMPORTED_MODULE_6__["NotificationService"], _shared_services_common_common_service__WEBPACK_IMPORTED_MODULE_7__["CommonService"],
            primeng_api__WEBPACK_IMPORTED_MODULE_10__["ConfirmationService"]])
    ], TeacherEventPlannerComponent);
    return TeacherEventPlannerComponent;
}());



/***/ }),

/***/ "./src/app/layout/teacher/components/teacher-meal-planner/teacher-meal-planner.component.css":
/*!***************************************************************************************************!*\
  !*** ./src/app/layout/teacher/components/teacher-meal-planner/teacher-meal-planner.component.css ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2xheW91dC90ZWFjaGVyL2NvbXBvbmVudHMvdGVhY2hlci1tZWFsLXBsYW5uZXIvdGVhY2hlci1tZWFsLXBsYW5uZXIuY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/layout/teacher/components/teacher-meal-planner/teacher-meal-planner.component.html":
/*!****************************************************************************************************!*\
  !*** ./src/app/layout/teacher/components/teacher-meal-planner/teacher-meal-planner.component.html ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"wrapper\">\r\n  <div class=\"container-fluid\">\r\n\r\n    <div class=\"pagetitle\">\r\n      <div>\r\n        <h2>Calendar\r\n          <span> / View Meal </span>\r\n        </h2>\r\n      </div>\r\n      <!-- <div>\r\n        <button type=\"submit\" class=\"btn btn-red\" data-toggle=\"modal\" data-target=\".addmeal\">Add Meal</button>\r\n      </div> -->\r\n    </div>\r\n    <div *ngIf=\"calendarOptions\">\r\n      <ng-fullcalendar #ucCalendar [options]=\"calendarOptions\" (eventClick)=\"gotoDate($event.detail)\"\r\n        (eventDrop)=\"updateEvent($event.detail)\" (eventResize)=\"updateEvent($event.detail)\"\r\n        (clickButton)=\"clickButton($event.detail)\"></ng-fullcalendar>\r\n    </div>\r\n\r\n\r\n\r\n\r\n    <!-- Meal Details Model -->\r\n\r\n    <div class=\"modal fade mealdetails modal_padding\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myLargeModalLabel\"\r\n      aria-hidden=\"true\">\r\n      <div class=\"modal-dialog modal-lg\">\r\n        <div class=\"modal-content\">\r\n          <div class=\"modal-header\">\r\n            <h5 class=\"modal-title\" id=\"exampleModalLongTitle\">Meal Details</h5>\r\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n              <span aria-hidden=\"true\">&times;</span>\r\n            </button>\r\n          </div>\r\n          <div class=\"modal-body\">\r\n            <div class=\"row mb-20\">\r\n              <!-- <div class=\"col-lg-3\">\r\n                <div class=\"form-group\">\r\n                  <label for=\"\">Begins</label>\r\n\r\n                  <input type=\"text\" placeholder=\"Begin\" [(ngModel)]=\"mealVM.start\" showWeekNumbers=\"false\"\r\n                    [minDate]=\"today\" class=\"form-control\" [minDate]=\"today\" [bsConfig]=\"dpConfig\" bsDatepicker\r\n                    disabled>\r\n                </div>\r\n              </div> -->\r\n              <!-- <div class=\"col-lg-3\">\r\n                <div class=\"form-group\">\r\n                  <label for=\"\">End</label>\r\n                  <input type=\"text\" placeholder=\"Begin\" [(ngModel)]=\"mealVM.end\" showWeekNumbers=\"false\"\r\n                    [minDate]=\"today\" class=\"form-control\" [minDate]=\"today\" [bsConfig]=\"dpConfig\" bsDatepicker\r\n                    disabled>\r\n                </div>\r\n              </div> -->\r\n\r\n              <div class=\"col-lg-6\">\r\n                <div class=\"form-group\">\r\n                  <label for=\"exampleFormControlSelect1\">Title</label>\r\n                  <input type=\"text\" class=\"form-control\" [(ngModel)]=\"mealVM.title\" id=\"\" aria-describedby=\"\"\r\n                    placeholder=\"Title\" disabled>\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n\r\n            <div class=\"row mb-20\" *ngFor=\"let obj of involvedFoodList\">\r\n              <div class=\"col-lg-4\">\r\n                <div class=\"form-group\">\r\n                  <div class=\"form-group\">\r\n                    <label>\r\n                      Food\r\n                    </label>\r\n                    <input type=\"text\" name=\"\" [(ngModel)]=\"obj.foodTypeName\" placeholder=\"Food\" class=\"form-control\"\r\n                      id=\"\" disabled>\r\n                  </div>\r\n\r\n                </div>\r\n              </div>\r\n              <div class=\"col-lg-4\">\r\n                <div class=\"form-group\">\r\n                  <label for=\"exampleFormControlSelect1\">Amount</label>\r\n                  <input type=\"text\" name=\"\" [(ngModel)]=\"obj.amount\" placeholder=\"Amount\" class=\"form-control\"\r\n                    placeholde=\"Amount\" id=\"\" disabled>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-lg-4\">\r\n                <div class=\"form-group\">\r\n                  <label for=\"exampleFormControlSelect1\">Unit</label>\r\n                  <select class=\"form-control\" [(ngModel)]=\"obj.measureUnitTypeID\" placeholder=\"Quantity\"\r\n                    id=\"exampleFormControlSelect1\" disabled>\r\n                    <option value=\"\">Select</option>\r\n                    <option *ngFor=\"let obj of mealQuantityType\" [value]=\"obj.value\">{{obj.label}}</option>\r\n                  </select>\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n            <div class=\"row mb-20\">\r\n              <div class=\"col-lg-12\">\r\n                <div class=\"form-group\">\r\n                  <label for=\"exampleFormControlSelect1\">Description</label>\r\n                  <!-- <textarea name=\"\" [(ngModel)]=\"eventDetails.description\" id=\"\" cols=\"3\" rows=\"3\" class=\"form-control\"></textarea> -->\r\n                  <textarea name=\"\" id=\"\" class=\"form-control\" cols=\"3\" rows=\"3\" [(ngModel)]=\"mealVM.description\"\r\n                    class=\"form-control\" placeholder=\"Description\" disabled></textarea>\r\n\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"row mb-20\">\r\n              <div class=\"col-lg-12\">\r\n                <div class=\"form-group\">\r\n                  <label for=\"exampleFormControlSelect1\">Class</label>\r\n                  <textarea name=\"\" id=\"\" cols=\"30\" rows=\"3\" class=\"form-control\" [(ngModel)]=\"showClassName\"\r\n                    disabled></textarea>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"modal-footer\">\r\n            <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n  </div>\r\n</div>\r\n\r\n<ngx-spinner type=\"ball-atom\" size=\"medium\" color=\"#58A7FE\"></ngx-spinner>\r\n"

/***/ }),

/***/ "./src/app/layout/teacher/components/teacher-meal-planner/teacher-meal-planner.component.ts":
/*!**************************************************************************************************!*\
  !*** ./src/app/layout/teacher/components/teacher-meal-planner/teacher-meal-planner.component.ts ***!
  \**************************************************************************************************/
/*! exports provided: TeacherMealPlannerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TeacherMealPlannerComponent", function() { return TeacherMealPlannerComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ng_fullcalendar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ng-fullcalendar */ "./node_modules/ng-fullcalendar/ng-fullcalendar.es5.js");
/* harmony import */ var _shared_services_teacher_api_service_teacher_api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/services/teacher-api-service/teacher-api.service */ "./src/app/layout/teacher/shared/services/teacher-api-service/teacher-api.service.ts");
/* harmony import */ var _shared_services_error_handler_error_handler_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../shared/services/error-handler/error-handler.service */ "./src/app/shared/services/error-handler/error-handler.service.ts");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var _shared_services_notification_service_notification_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../shared/services/notification-service/notification.service */ "./src/app/shared/services/notification-service/notification.service.ts");
/* harmony import */ var _shared_services_common_common_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../shared/services/common/common.service */ "./src/app/shared/services/common/common.service.ts");
/* harmony import */ var _shared_constant__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../shared/constant */ "./src/app/layout/teacher/shared/constant.ts");
/* harmony import */ var ngx_bootstrap__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-bootstrap */ "./node_modules/ngx-bootstrap/esm5/ngx-bootstrap.js");
/* harmony import */ var _agency_admin_components_shared_constatant__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../agency-admin/components/shared/constatant */ "./src/app/layout/agency-admin/components/shared/constatant.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var TeacherMealPlannerComponent = /** @class */ (function () {
    function TeacherMealPlannerComponent(apiService, error, spinner, notification, commonService) {
        this.apiService = apiService;
        this.error = error;
        this.spinner = spinner;
        this.notification = notification;
        this.commonService = commonService;
        this.cars = [];
        this.display = false;
        this.today = new Date();
        this.eventDetails = [];
        this.repeatList = [];
        this.repeatNeverID = 0;
        this.mealVM = {};
        this.eventList = [];
        this.cuurentDate = new Date();
        this.classList = [];
        this.mealTyptList = [];
        this.mealQuantityType = [];
        this.MealMeasureType = [];
        this.foodItemList = [];
        this.getFood = [];
        this.displayFoodList = [];
        this.classListArray = [];
        this.foodListArray = [];
        this.involvedFoodList = [];
        this.dpConfig = new ngx_bootstrap__WEBPACK_IMPORTED_MODULE_8__["BsDatepickerConfig"]();
    }
    TeacherMealPlannerComponent.prototype.ngOnInit = function () {
        this.showEndsOn = false;
        this.dpConfig = Object.assign({}, { containerClass: 'theme-dark-blue' }, { showWeekNumbers: false });
        this.events = [
            {
                'title': 'Todays Meal',
                'start': this.today,
                'end': this.today,
                'id': 'a',
                'description': 'Snacks type as follows ',
                'class': this.multiarray1,
                'repeate': 'Never'
            }
        ];
        this.calendarOptions = {
            editable: false,
            eventLimit: false,
            displayEventTime: false,
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay,listMonth'
            },
            events: this.eventList
        };
        this.callEvent(this.cuurentDate);
        this.getRepeatTypelist();
        this.getAllClasses();
        this.getMealType();
        this.getQuantityType();
        this.getMealMeasureType();
        this.getFoodItems();
    };
    TeacherMealPlannerComponent.prototype.eventClick = function (data) {
    };
    TeacherMealPlannerComponent.prototype.gotoDate = function (event) {
        var _this = this;
        this.showClassName = '';
        this.spinner.show();
        // this.dailogbox = '.addmenu1';
        this.mealVM = {};
        this.classListArray = [];
        this.foodListArray = [];
        this.display = true;
        var req = {
            'mealPlanID': event.event.id,
            'agencyID': this.commonService.getAgencyId(),
        };
        this.apiService.postData(_agency_admin_components_shared_constatant__WEBPACK_IMPORTED_MODULE_9__["AgencyAPIURLs"].GetParticularMealPlan, req, null).subscribe(function (res) {
            //  this.spinner.hide();
            if (res.body.statusCode === 200) {
                if (res.body.data[0].involvedClass.length !== 0) {
                    res.body.data[0].involvedClass.forEach(function (element) {
                        _this.showClassName = _this.showClassName + ',' + element.className;
                        _this.showClassName = _this.showClassName.replace(/(,\s*$)|(^,*)/, '');
                    });
                }
                _this.mealVM.start = new Date(res.body.data[0].start);
                _this.mealVM.end = new Date(res.body.data[0].end);
                _this.mealVM.involvedEventClassesList = res.body.data[0].involvedClass;
                _this.mealVM.description = res.body.data[0].description;
                _this.mealVM.title = res.body.data[0].title;
                _this.mealVM.endsOn = res.body.data[0].endsOn;
                _this.mealVM.endTime = _this.commonService.getUTCToLocalFormatedTime(res.body.data[0].endTime);
                _this.mealVM.startTime = _this.commonService.getUTCToLocalFormatedTime(res.body.data[0].startTime);
                _this.mealVM.MealTypeID = res.body.data[0].mealTypeID;
                _this.mealVM.plannerRepeatTypeID = res.body.data[0].plannerRepeatTypeID;
                _this.mealVM.endsOn = new Date(res.body.data[0].endsOn);
                _this.mealVM.MealTypeID = res.body.data[0].mealTypeID;
                if (res.body.data[0].involvedMealFoodItems.length !== 0) {
                    res.body.data[0].involvedMealFoodItems.forEach(function (element) {
                        _this.foodListArray.push(element.foodTypeID);
                    });
                }
                _this.involvedFoodList = res.body.data[0].involvedMealFoodItems;
                _this.spinner.hide();
            }
            else {
                _this.error.unknownError();
                _this.spinner.hide();
            }
        });
        $('.mealdetails').modal('show');
    };
    TeacherMealPlannerComponent.prototype.closeUpdateDialogBox = function () {
        this.display = false;
    };
    /**Method to get previous and next month events */
    TeacherMealPlannerComponent.prototype.clickButton = function (value) {
        if (value.buttonType === 'prev' || value.buttonType === 'next') {
            var newDate = new Date(value.data._d);
            newDate.setHours(newDate.getHours() + 24);
            this.callEvent(newDate);
        }
    };
    TeacherMealPlannerComponent.prototype.updateEvent = function (data) {
    };
    TeacherMealPlannerComponent.prototype.callEvent = function (date) {
        this.getAllEvent(date);
    };
    TeacherMealPlannerComponent.prototype.getAllEvent = function (date) {
        var _this = this;
        this.spinner.show();
        var data = {
            'agencyID': this.commonService.getAgencyId(),
            'eventSearchFromDate': this.commonService.getFirstDayOfMonth(date),
            'eventSearchToDate': this.commonService.getLastDayOfMonth(date),
        };
        this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_7__["TeacherAPIURLs"].GetAllMealPlan, data, null).subscribe(function (res) {
            //  this.spinner.hide();
            if (res.body.statusCode === 200) {
                _this.eventList = res.body.data;
                _this.eventList.forEach(function (x) {
                    var lastdt = new Date(x.end);
                    var enddt = new Date(x.end);
                    lastdt.setHours(enddt.getHours() + 9);
                    x.end = lastdt;
                });
                _this.configureScheduler();
                // this.events = event;
            }
            else {
                _this.spinner.hide();
                _this.error.unknownError();
            }
        }, function (err) {
            _this.spinner.hide();
            _this.error.commonError(err);
        });
    };
    TeacherMealPlannerComponent.prototype.configureScheduler = function () {
        this.ucCalendar.renderEvents(this.eventList);
        this.spinner.hide();
    };
    TeacherMealPlannerComponent.prototype.getRepeatTypelist = function () {
        var _this = this;
        // this.spinner.show();
        var data = {
            'agencyID': this.commonService.getAgencyId()
        };
        this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_7__["TeacherAPIURLs"].GetAllRepeatTypeDropdown, data, null).subscribe(function (res) {
            //  this.spinner.hide();
            if (res.body.statusCode === 200) {
                _this.repeatList = res.body.data;
                // this.repeatList.forEach(element => {
                //   if (element.label === 'Never') {
                //     this.repeatNeverID = element.value;
                //   }
                // });
            }
            else {
                //     this.spinner.hide();
                _this.error.unknownError();
            }
        }, function (err) {
            _this.spinner.hide();
            _this.error.commonError(err);
        });
    };
    /**Method to get class list for multiselect component */
    TeacherMealPlannerComponent.prototype.getAllClasses = function () {
        var _this = this;
        this.classList = [];
        var data = {
            'agencyID': this.commonService.getAgencyId()
        };
        this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_7__["TeacherAPIURLs"].GetAllClassesDropdown, data, null).subscribe(function (res) {
            if (res.body.statusCode === 200) {
                //   this.spinner.hide();
                _this.classList = res.body.data;
            }
            else {
                _this.spinner.hide();
                _this.error.unknownError();
            }
        }, function (err) {
            _this.spinner.hide();
            _this.error.commonError(err);
        });
    };
    /**Method to get meal type  */
    TeacherMealPlannerComponent.prototype.getMealType = function () {
        var _this = this;
        var data = {
            'agencyID': this.commonService.getAgencyId()
        };
        this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_7__["TeacherAPIURLs"].GetAllMealTypeDropdown, data, null).subscribe(function (res) {
            if (res.body.statusCode === 200) {
                //   this.spinner.hide();
                _this.mealTyptList = res.body.data;
            }
            else {
                _this.spinner.hide();
                _this.error.unknownError();
            }
        }, function (err) {
            _this.spinner.hide();
            _this.error.commonError(err);
        });
    };
    /**Method to get meal quantity type   */
    TeacherMealPlannerComponent.prototype.getQuantityType = function () {
        var _this = this;
        var data = {
            'agencyID': this.commonService.getAgencyId()
        };
        this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_7__["TeacherAPIURLs"].GetAllMeasureUnitTypeDropdown, data, null).subscribe(function (res) {
            if (res.body.statusCode === 200) {
                //   this.spinner.hide();
                _this.mealQuantityType = res.body.data;
            }
            else {
                _this.spinner.hide();
                _this.error.unknownError();
            }
        }, function (err) {
            _this.spinner.hide();
            _this.error.commonError(err);
        });
    };
    /**Method to get meal measer type   */
    TeacherMealPlannerComponent.prototype.getMealMeasureType = function () {
        var _this = this;
        var data = {
            'agencyID': this.commonService.getAgencyId()
        };
        this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_7__["TeacherAPIURLs"].GetAllMeasureQuantityDropdown, data, null).subscribe(function (res) {
            if (res.body.statusCode === 200) {
                //   this.spinner.hide();
                _this.MealMeasureType = res.body.data;
            }
            else {
                _this.spinner.hide();
                _this.error.unknownError();
            }
        }, function (err) {
            _this.spinner.hide();
            _this.error.commonError(err);
        });
    };
    /**Method to get Food items   */
    TeacherMealPlannerComponent.prototype.getFoodItems = function () {
        var _this = this;
        var data = {
            'agencyID': this.commonService.getAgencyId()
        };
        this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_7__["TeacherAPIURLs"].GetAllFoodTypeDropdown, data, null).subscribe(function (res) {
            if (res.body.statusCode === 200) {
                //   this.spinner.hide();
                _this.foodItemList = res.body.data;
            }
            else {
                _this.spinner.hide();
                _this.error.unknownError();
            }
        }, function (err) {
            _this.spinner.hide();
            _this.error.commonError(err);
        });
    };
    TeacherMealPlannerComponent.prototype.AddFood = function () {
        // this.displayFoodList.push(this.getFood);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(ng_fullcalendar__WEBPACK_IMPORTED_MODULE_1__["CalendarComponent"]),
        __metadata("design:type", ng_fullcalendar__WEBPACK_IMPORTED_MODULE_1__["CalendarComponent"])
    ], TeacherMealPlannerComponent.prototype, "ucCalendar", void 0);
    TeacherMealPlannerComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-teacher-meal-planner',
            template: __webpack_require__(/*! ./teacher-meal-planner.component.html */ "./src/app/layout/teacher/components/teacher-meal-planner/teacher-meal-planner.component.html"),
            styles: [__webpack_require__(/*! ./teacher-meal-planner.component.css */ "./src/app/layout/teacher/components/teacher-meal-planner/teacher-meal-planner.component.css")]
        }),
        __metadata("design:paramtypes", [_shared_services_teacher_api_service_teacher_api_service__WEBPACK_IMPORTED_MODULE_2__["TeacherApiService"], _shared_services_error_handler_error_handler_service__WEBPACK_IMPORTED_MODULE_3__["ErrorHandlerService"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_4__["NgxSpinnerService"], _shared_services_notification_service_notification_service__WEBPACK_IMPORTED_MODULE_5__["NotificationService"], _shared_services_common_common_service__WEBPACK_IMPORTED_MODULE_6__["CommonService"]])
    ], TeacherMealPlannerComponent);
    return TeacherMealPlannerComponent;
}());



/***/ }),

/***/ "./src/app/layout/teacher/components/teacher-message/teacher-message.component.css":
/*!*****************************************************************************************!*\
  !*** ./src/app/layout/teacher/components/teacher-message/teacher-message.component.css ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n  \r\n  .chat_people{ overflow:hidden; clear:both;}\r\n  .chat_list {\r\n    border-bottom: 1px solid #E2F0FF;\r\n    margin: 0;\r\n    padding: 15px;\r\n  }\r\n  .inbox_chat { height: 550px; overflow-y: auto;}\r\n  .inbox_people{background: #F6FBFF;}\r\n  .active_chat{ background:#FF6C6C;color: #fff!important;}\r\n  .active_chat .kidname,.active_chat .chat_ib h5,.active_chat .chat_ib .status{color: #fff}\r\n  .recent_heading h4 {\r\n    color: #fff;\r\n    font-size: 15px;\r\n    padding: 10px 10px;\r\n    font-weight: 400;\r\n}\r\n  .inbox_chat1 \r\n{ \r\n  height: 550px;\r\n  overflow-y: scroll;  \r\n}\r\n  .recent_heading{margin-bottom:10px;}\r\n  .count {\r\n  margin-left: 135px;\r\n  margin-bottom: -4px;\r\n  font-size: 15px;\r\n  color: #58a7fe;\r\n}\r\n\r\n\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGF5b3V0L3RlYWNoZXIvY29tcG9uZW50cy90ZWFjaGVyLW1lc3NhZ2UvdGVhY2hlci1tZXNzYWdlLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7RUFFRSxjQUFjLGVBQWUsRUFBRSxVQUFVLENBQUM7RUFDMUM7SUFDRSxnQ0FBZ0M7SUFDaEMsU0FBUztJQUNULGFBQWE7RUFDZjtFQUNBLGNBQWMsYUFBYSxFQUFFLGdCQUFnQixDQUFDO0VBQzlDLGNBQWMsbUJBQW1CLENBQUM7RUFDbEMsY0FBYyxrQkFBa0IsQ0FBQyxxQkFBcUIsQ0FBQztFQUN2RCw2RUFBNkUsV0FBVztFQUN4RjtJQUNFLFdBQVc7SUFDWCxlQUFlO0lBQ2Ysa0JBQWtCO0lBQ2xCLGdCQUFnQjtBQUNwQjtFQUVBOztFQUVFLGFBQWE7RUFDYixrQkFBa0I7QUFDcEI7RUFFQSxnQkFBZ0Isa0JBQWtCLENBQUM7RUFFbkM7RUFDRSxrQkFBa0I7RUFDbEIsbUJBQW1CO0VBQ25CLGVBQWU7RUFDZixjQUFjO0FBQ2hCIiwiZmlsZSI6InNyYy9hcHAvbGF5b3V0L3RlYWNoZXIvY29tcG9uZW50cy90ZWFjaGVyLW1lc3NhZ2UvdGVhY2hlci1tZXNzYWdlLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuICBcclxuICAuY2hhdF9wZW9wbGV7IG92ZXJmbG93OmhpZGRlbjsgY2xlYXI6Ym90aDt9XHJcbiAgLmNoYXRfbGlzdCB7XHJcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI0UyRjBGRjtcclxuICAgIG1hcmdpbjogMDtcclxuICAgIHBhZGRpbmc6IDE1cHg7XHJcbiAgfVxyXG4gIC5pbmJveF9jaGF0IHsgaGVpZ2h0OiA1NTBweDsgb3ZlcmZsb3cteTogYXV0bzt9XHJcbiAgLmluYm94X3Blb3BsZXtiYWNrZ3JvdW5kOiAjRjZGQkZGO31cclxuICAuYWN0aXZlX2NoYXR7IGJhY2tncm91bmQ6I0ZGNkM2Qztjb2xvcjogI2ZmZiFpbXBvcnRhbnQ7fVxyXG4gIC5hY3RpdmVfY2hhdCAua2lkbmFtZSwuYWN0aXZlX2NoYXQgLmNoYXRfaWIgaDUsLmFjdGl2ZV9jaGF0IC5jaGF0X2liIC5zdGF0dXN7Y29sb3I6ICNmZmZ9XHJcbiAgLnJlY2VudF9oZWFkaW5nIGg0IHtcclxuICAgIGNvbG9yOiAjZmZmO1xyXG4gICAgZm9udC1zaXplOiAxNXB4O1xyXG4gICAgcGFkZGluZzogMTBweCAxMHB4O1xyXG4gICAgZm9udC13ZWlnaHQ6IDQwMDtcclxufVxyXG5cclxuLmluYm94X2NoYXQxIFxyXG57IFxyXG4gIGhlaWdodDogNTUwcHg7XHJcbiAgb3ZlcmZsb3cteTogc2Nyb2xsOyAgXHJcbn1cclxuXHJcbi5yZWNlbnRfaGVhZGluZ3ttYXJnaW4tYm90dG9tOjEwcHg7fVxyXG5cclxuLmNvdW50IHtcclxuICBtYXJnaW4tbGVmdDogMTM1cHg7XHJcbiAgbWFyZ2luLWJvdHRvbTogLTRweDtcclxuICBmb250LXNpemU6IDE1cHg7XHJcbiAgY29sb3I6ICM1OGE3ZmU7XHJcbn1cclxuXHJcblxyXG4iXX0= */"

/***/ }),

/***/ "./src/app/layout/teacher/components/teacher-message/teacher-message.component.html":
/*!******************************************************************************************!*\
  !*** ./src/app/layout/teacher/components/teacher-message/teacher-message.component.html ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"wrapper\">\r\n  <div class=\"container-fluid\">\r\n\r\n    <div class=\"pagetitle\">\r\n      <div>\r\n        <h2>Message\r\n          <!-- <span>/ Message </span> -->\r\n        </h2>\r\n      </div>\r\n      <!-- <div>\r\n          <button type=\"submit\" class=\"btn btn-red\">Compose New Message</button>\r\n        </div> -->\r\n    </div>\r\n    <div class=\"subhead d-flex justify-content-between mt-20\">\r\n      <div>\r\n        <h3>Messages</h3>\r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"row mt-20 parent_section\">\r\n      <div class=\"col-lg-3 col-md-4  pr-0\">\r\n        <div class=\"inbox_people mesg\">\r\n          <div class=\"headind_srch\">\r\n            <div class=\"\">\r\n              <!-- <h4>{{UserName}}</h4> -->\r\n              <input type=\"text\" class=\"form-control\" [(ngModel)]=\"nameSearch\" placeholder=\"Search Name\">\r\n            </div>\r\n          </div>\r\n          <!-- [ngClass]=\"{active: child.isActive}\" (click)=\"addActivClassTeacherList(child)\" -->\r\n          <div class=\"inbox_chat\">\r\n            <div class=\"chat_list \" [ngClass]=\"{active_chat: parent.isActive}\" (click)=\"addActivClassParentList(parent)\"\r\n              *ngFor=\"let parent of parentList | searchfilter: nameSearch\">\r\n              <div class=\"chat_people \">\r\n                <div class=\"chat_img\">\r\n                  <img src=\"{{parent.imagePath}}\" onError=\"this.src='assets/img/user.png'\" alt=\"img\"\r\n                    class=\"img-fluid img-circle\"> </div>\r\n                <div class=\"chat_ib\">\r\n                  <!-- <h5>ID : C123456\r\n              </h5> -->\r\n                  <p class=\"kidname\">{{parent.listUserName}}</p>\r\n                  <p class=\"status\" *ngIf=\"parent.isAgencyAdminAdmin\">(Agency Admin)</p>\r\n                  <p class=\"count\" *ngIf=\"parent.count != 0\">{{parent.count}} New</p>\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n          </div>\r\n        </div>\r\n\r\n      </div>\r\n\r\n\r\n      <div class=\"col-lg-9 col-md-8 pl-0\">\r\n        <div class=\"card viewchat\">\r\n          <div class=\"chat_people\">\r\n            <div class=\"chat_img\">\r\n              <img src=\"{{receiverPic}}\" onError=\"this.src='assets/img/user.png'\" alt=\"img\"\r\n                class=\"img-fluid img-circle\"> </div>\r\n            <div class=\"chat_ib\">\r\n              <p class=\"kidname\">{{receiverName}}</p>\r\n              <!-- <p class=\"status\">Enjoying the dance</p> -->\r\n            </div>\r\n          </div>\r\n          <div class=\"brdr\"></div>\r\n          <div class=\"inbox_chat1\" #scrollMessageBox>\r\n            <div class=\"chatmsg\" *ngFor=\"let msg of previousChatList\">\r\n              <div class=\"incoming_msg\" *ngIf=\"loggedInUserId != msg.senderUserID\">\r\n                <div class=\"received_msg\">\r\n                  <div class=\"received_withd_msg\">\r\n                    <p>{{msg.message}}\r\n                    </p>\r\n                    <div class=\"d-flex justify-content-around\">\r\n                      <div>\r\n                        <span class=\"time_date\"> {{msg.createdDateTime| date: 'hh:mm a' }} |\r\n                          {{msg.createdDateTime| date: 'MMM d, y' }}</span>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n\r\n              <div class=\"outgoing_msg\" *ngIf=\"loggedInUserId == msg.senderUserID\">\r\n                <div class=\"sent_msg\">\r\n                  <p>{{msg.message}}</p>\r\n                  <div class=\"d-flex justify-content-around\">\r\n                    <div>\r\n                      <span class=\"time_date\"> {{msg.createdDateTime| date: 'hh:mm a' }} |\r\n                        {{msg.createdDateTime| date: 'MMM d, y' }} </span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n\r\n            </div>\r\n          </div>\r\n\r\n          <!-- <div class=\"overscroll\">\r\n            <div class=\"chatmsg\" *ngFor=\"let msg of previousChatList\">\r\n                <div class=\"incoming_msg\" *ngIf=\"loggedInUserID != msg.senderUserID\">\r\n                  <div class=\"received_msg\">\r\n                    <div class=\"received_withd_msg\">\r\n                      <p>{{msg.message}} \r\n                      </p>\r\n                      <div class=\"d-flex justify-content-around\">\r\n                          <div>\r\n                              <span class=\"time_date\"> {{msg.createdDateTime| date: 'hh:mm a' }} | {{msg.createdDateTime| date: 'MMM d, y' }}</span>\r\n                              </div>\r\n                          </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n        \r\n                <div class=\"outgoing_msg\" *ngIf=\"loggedInUserID == msg.senderUserID\">\r\n                  <div class=\"sent_msg\">\r\n                    <p>{{msg.message}}</p>\r\n                    <div class=\"d-flex justify-content-around\">\r\n                      <div>\r\n                          <span class=\"time_date\"> {{msg.createdDateTime| date: 'hh:mm a' }} | {{msg.createdDateTime| date: 'MMM d, y' }} </span>\r\n                          </div>\r\n                      </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n        </div> -->\r\n          <div class=\"type_msg\">\r\n            <div class=\"input_msg_write\">\r\n              <textarea type=\"text\" class=\"write_msg\" placeholder=\"Type a message\" [(ngModel)]=\"message\"></textarea>\r\n              <div class=\"sndbtn text-right\">\r\n                <!-- <a href=\"\"> <i class=\"fa fa-video-camera\" aria-hidden=\"true\"></i>   </a>\r\n                <a href=\"\"><i class=\"fa fa-camera\" aria-hidden=\"true\"></i></a> -->\r\n                <button class=\"btn btn-send\" type=\"button\" (click)=\"sendMessage()\">Send</button>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n\r\n\r\n  </div>\r\n</div>\r\n<ngx-spinner type=\"ball-atom\" size=\"medium\" color=\"#58A7FE\"></ngx-spinner>"

/***/ }),

/***/ "./src/app/layout/teacher/components/teacher-message/teacher-message.component.ts":
/*!****************************************************************************************!*\
  !*** ./src/app/layout/teacher/components/teacher-message/teacher-message.component.ts ***!
  \****************************************************************************************/
/*! exports provided: TeacherMessageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TeacherMessageComponent", function() { return TeacherMessageComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_constant__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/constant */ "./src/app/layout/teacher/shared/constant.ts");
/* harmony import */ var _shared_services_teacher_api_service_teacher_api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/services/teacher-api-service/teacher-api.service */ "./src/app/layout/teacher/shared/services/teacher-api-service/teacher-api.service.ts");
/* harmony import */ var _shared_services_error_handler_error_handler_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../shared/services/error-handler/error-handler.service */ "./src/app/shared/services/error-handler/error-handler.service.ts");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var _shared_services_notification_service_notification_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../shared/services/notification-service/notification.service */ "./src/app/shared/services/notification-service/notification.service.ts");
/* harmony import */ var _shared_services_common_common_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../shared/services/common/common.service */ "./src/app/shared/services/common/common.service.ts");
/* harmony import */ var _aspnet_signalr__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @aspnet/signalr */ "./node_modules/@aspnet/signalr/dist/esm/index.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _parent_shared_constant__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../parent/shared/constant */ "./src/app/layout/parent/shared/constant.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var TeacherMessageComponent = /** @class */ (function () {
    function TeacherMessageComponent(apiService, error, spinner, notification, commonService) {
        this.apiService = apiService;
        this.error = error;
        this.spinner = spinner;
        this.notification = notification;
        this.commonService = commonService;
        this.parentList = [];
        this.outMsg = '';
        this.previousChatList = [];
        this.nick = '';
        this.message = '';
        this.messages = [];
        this.senderArray = [];
        this.receiverArray = [];
        this.nameSearch = '';
    }
    TeacherMessageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.agencyId = this.commonService.getAgencyId();
        this.loggedInUserId = this.commonService.getLoggedInUserId();
        // const url = 'https://localhost:44391/chat';
        //
        this.establishSignalRConnection();
        this._hubConnection.on('messageReceived', function (nick, receivedMessage) {
            var text = nick + ": " + receivedMessage;
            _this.messages.push(text);
            var str = text.substring(text.indexOf(':') + 1);
            var Obj = JSON.parse(str);
            _this.msgSenderId = Obj.sender;
            //  this.previousChatList.push({senderUserID: Obj.sender, receiverUserID: Obj.receiver, message: Obj.message});
            if (_this.msgSenderId === _this.receiverId || _this.loggedInUserId === _this.msgSenderId) {
                _this.previousChatList.push({ senderUserID: Obj.sender, receiverUserID: Obj.receiver, message: Obj.message,
                    createdDateTime: new Date() });
            }
            if (_this.msgSenderId === _this.receiverId && _this.loggedInUserId === Obj.receiver) {
                _this.UnreadMessageByID();
            }
            if (Obj.receiver === _this.loggedInUserId && Obj.sender !== _this.receiverId) {
                var no = _this.parentList.findIndex(function (r) { return r.listUserId === Obj.sender; });
                _this.parentList[no].count = _this.parentList[no].count + 1;
            }
            // this.getPreviousChat();
        });
        this._hubConnection.on('messageSent', function (nick, receivedMessage) {
            var text = nick + ": " + receivedMessage;
            console.log('new Msg', text);
            _this.messages.push(text);
            var str = text.substring(text.indexOf(':') + 1);
            var Obj = JSON.parse(str);
            _this.msgSenderId = Obj.sender;
            //  this.previousChatList.push({senderUserID: Obj.sender, receiverUserID: Obj.receiver, message: Obj.message});
            if (_this.msgSenderId === _this.receiverId || _this.loggedInUserId === _this.msgSenderId) {
                _this.previousChatList.push({ senderUserID: Obj.sender, receiverUserID: Obj.receiver, message: Obj.message,
                    createdDateTime: new Date() });
            }
            // this.getPreviousChat();
        });
        this.UserName = this.commonService.getUserFullName('userdetails');
        this.nick = '2212';
        this.UserName = this.commonService.getUserFullName('userdetails');
        this.getParentList();
        this.scrollToBottom();
    };
    TeacherMessageComponent.prototype.ngAfterViewChecked = function () {
        this.scrollToBottom();
    };
    TeacherMessageComponent.prototype.scrollToBottom = function () {
        try {
            this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        }
        catch (err) { }
    };
    TeacherMessageComponent.prototype.getParentList = function () {
        var _this = this;
        this.parentList = [];
        this.spinner.show();
        var model = {
            'agencyID': this.commonService.getAgencyId(),
            'roleID': 4,
            'teacherID': this.commonService.getReleventUserId('userdetails'),
            'userID': this.commonService.getLoggedInUserId()
        };
        this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_1__["TeacherAPIURLs"].GetListForChat, model, null).subscribe(function (res) {
            if (res.body.statusCode === 200) {
                // this.totalRecord = res.body.totalRows;
                if (res.body.data !== null && res.body.data !== [] && res.body.data.length > 0) {
                    _this.parentList = res.body.data;
                    _this.parentList[0].isActive = true;
                    _this.receiverName = _this.parentList[0].listUserName;
                    _this.receiverPic = _this.parentList[0].imagePath;
                    _this.receiverId = _this.parentList[0].listUserId;
                    _this.parentList[0].count = 0;
                    _this.getPreviousChat();
                }
                _this.spinner.hide();
            }
        }, function (err) {
            _this.spinner.hide();
            _this.error.commonError(err);
        });
    };
    TeacherMessageComponent.prototype.addActivClassParentList = function (value) {
        var _this = this;
        this.message = '';
        var no = this.parentList.findIndex(function (r) { return r.listUserId === value.listUserId; });
        this.parentList[no].count = 0;
        this.parentList.forEach(function (x) {
            if (x.listUserId === value.listUserId) {
                x.isActive = true;
                _this.receiverName = value.listUserName;
                _this.receiverPic = value.imagePath;
                _this.receiverId = value.listUserId;
                _this.getPreviousChat();
            }
            else {
                x.isActive = false;
            }
        });
    };
    TeacherMessageComponent.prototype.sendMessage = function () {
        var _this = this;
        if (this.message !== '') {
            console.log(this._hubConnection);
            if (true) {
                console.log(this._hubConnection);
                this._hubConnection
                    .invoke('SendMessage', this.nick, this.message, this.agencyId, this.loggedInUserId, this.receiverId)
                    .then(function () { return _this.message = ''; })
                    .catch(function (err) { return console.error(err, _this.establishSignalRConnection()); });
            }
        }
    };
    TeacherMessageComponent.prototype.getPreviousChat = function () {
        var _this = this;
        this.previousChatList = [];
        //   this.spinner.show();
        var model = {
            'agencyID': this.commonService.getAgencyId(),
            'senderUserID': this.commonService.getLoggedInUserId(),
            'receiverUserID': this.receiverId
        };
        this.apiService.postData(_parent_shared_constant__WEBPACK_IMPORTED_MODULE_9__["ParentAPIURLs"].GetMessageByID, model, null).subscribe(function (res) {
            if (res.body.statusCode === 200) {
                // this.totalRecord = res.body.totalRows;
                if (res.body.data !== null && res.body.data !== [] && res.body.data !== []) {
                    _this.previousChatList = res.body.data;
                }
                _this.spinner.hide();
            }
        }, function (err) {
            _this.spinner.hide();
            _this.error.commonError(err);
        });
    };
    TeacherMessageComponent.prototype.establishSignalRConnection = function () {
        var _this = this;
        var url = _environments_environment__WEBPACK_IMPORTED_MODULE_8__["environment"].baseUrl + '' + 'chat';
        this._hubConnection = new _aspnet_signalr__WEBPACK_IMPORTED_MODULE_7__["HubConnectionBuilder"]()
            .withUrl(url)
            .build();
        this._hubConnection
            .start()
            .then(function () {
            console.log('Connection started!');
            _this._hubConnection.invoke('getConnectionId', _this.loggedInUserId)
                .then(function (connectionId) {
                console.log('connectionId', connectionId);
                // Send the connectionId to controller
                _this.token = connectionId;
            });
        })
            .catch(function (err) {
            return console.log('Error while establishing connection :(', _this.establishSignalRConnection());
        });
    };
    // Unread Messages
    TeacherMessageComponent.prototype.UnreadMessageByID = function () {
        var _this = this;
        var model = {
            'receiverUserID': this.commonService.getLoggedInUserId(),
            'senderUserID': this.msgSenderId
        };
        this.apiService.postData(_parent_shared_constant__WEBPACK_IMPORTED_MODULE_9__["ParentAPIURLs"].UnreadMessageByID, model, null).subscribe(function (res) {
            if (res.body.statusCode === 200) {
                // this.totalRecord = res.body.totalRows;
            }
        }, function (err) {
            _this.spinner.hide();
            _this.error.commonError(err);
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('scrollMessageBox'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], TeacherMessageComponent.prototype, "myScrollContainer", void 0);
    TeacherMessageComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-teacher-message',
            template: __webpack_require__(/*! ./teacher-message.component.html */ "./src/app/layout/teacher/components/teacher-message/teacher-message.component.html"),
            styles: [__webpack_require__(/*! ./teacher-message.component.css */ "./src/app/layout/teacher/components/teacher-message/teacher-message.component.css")]
        }),
        __metadata("design:paramtypes", [_shared_services_teacher_api_service_teacher_api_service__WEBPACK_IMPORTED_MODULE_2__["TeacherApiService"], _shared_services_error_handler_error_handler_service__WEBPACK_IMPORTED_MODULE_3__["ErrorHandlerService"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_4__["NgxSpinnerService"], _shared_services_notification_service_notification_service__WEBPACK_IMPORTED_MODULE_5__["NotificationService"],
            _shared_services_common_common_service__WEBPACK_IMPORTED_MODULE_6__["CommonService"]])
    ], TeacherMessageComponent);
    return TeacherMessageComponent;
}());



/***/ }),

/***/ "./src/app/layout/teacher/components/teacher-post-activity/teacher-post-activity.component.css":
/*!*****************************************************************************************************!*\
  !*** ./src/app/layout/teacher/components/teacher-post-activity/teacher-post-activity.component.css ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".currentact {padding: 0;}\r\n.currentact h5.redcolor {\r\n    padding: 10px;\r\n    text-align: center;\r\n    background: #FF6C6C;\r\n    color: #fff;\r\n}\r\n.currentact h5.bluecolor {\r\n    padding: 15px 10px 0px 10px;\r\n    text-align: center;\r\n}\r\n.currentact p {\r\n    text-align: center;\r\n    padding: 5px 10px 15px 10px;\r\n}\r\n.d-pdf {\r\n    position: absolute;\r\n    right: 15px;\r\n    font-size: 20px;\r\n    color: #eb547c;\r\n}\r\n.d-pdf a {color: #eb547c;}\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGF5b3V0L3RlYWNoZXIvY29tcG9uZW50cy90ZWFjaGVyLXBvc3QtYWN0aXZpdHkvdGVhY2hlci1wb3N0LWFjdGl2aXR5LmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsYUFBYSxVQUFVLENBQUM7QUFDeEI7SUFDSSxhQUFhO0lBQ2Isa0JBQWtCO0lBQ2xCLG1CQUFtQjtJQUNuQixXQUFXO0FBQ2Y7QUFDQTtJQUNJLDJCQUEyQjtJQUMzQixrQkFBa0I7QUFDdEI7QUFDQTtJQUNJLGtCQUFrQjtJQUNsQiwyQkFBMkI7QUFDL0I7QUFDQTtJQUNJLGtCQUFrQjtJQUNsQixXQUFXO0lBQ1gsZUFBZTtJQUNmLGNBQWM7QUFDbEI7QUFDQSxVQUFVLGNBQWMsQ0FBQyIsImZpbGUiOiJzcmMvYXBwL2xheW91dC90ZWFjaGVyL2NvbXBvbmVudHMvdGVhY2hlci1wb3N0LWFjdGl2aXR5L3RlYWNoZXItcG9zdC1hY3Rpdml0eS5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmN1cnJlbnRhY3Qge3BhZGRpbmc6IDA7fVxyXG4uY3VycmVudGFjdCBoNS5yZWRjb2xvciB7XHJcbiAgICBwYWRkaW5nOiAxMHB4O1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgYmFja2dyb3VuZDogI0ZGNkM2QztcclxuICAgIGNvbG9yOiAjZmZmO1xyXG59XHJcbi5jdXJyZW50YWN0IGg1LmJsdWVjb2xvciB7XHJcbiAgICBwYWRkaW5nOiAxNXB4IDEwcHggMHB4IDEwcHg7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbn1cclxuLmN1cnJlbnRhY3QgcCB7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBwYWRkaW5nOiA1cHggMTBweCAxNXB4IDEwcHg7XHJcbn1cclxuLmQtcGRmIHtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHJpZ2h0OiAxNXB4O1xyXG4gICAgZm9udC1zaXplOiAyMHB4O1xyXG4gICAgY29sb3I6ICNlYjU0N2M7XHJcbn1cclxuLmQtcGRmIGEge2NvbG9yOiAjZWI1NDdjO30iXX0= */"

/***/ }),

/***/ "./src/app/layout/teacher/components/teacher-post-activity/teacher-post-activity.component.html":
/*!******************************************************************************************************!*\
  !*** ./src/app/layout/teacher/components/teacher-post-activity/teacher-post-activity.component.html ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"wrapper\">\r\n  <div class=\"container-fluid\">\r\n\r\n    <div class=\"pagetitle\">\r\n      <div>\r\n        <h2>Post Activity\r\n          <!-- <span>/ Post Activity </span> -->\r\n        </h2>\r\n      </div>\r\n      <div>\r\n\r\n      </div>\r\n    </div>\r\n\r\n    <!-- <h3>Ongoing Activity</h3>\r\n    <div class=\"row\">\r\n\r\n      <div class=\"col-lg-3\">\r\n        <div class=\"card currentact\">\r\n          <h5 class=\"redcolor\">Singing & Dancing</h5>\r\n          <h5 class=\"bluecolor\">James Adam</h5>\r\n          <p class=\"dt\">11:45AM - 12:45PM</p>\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"col-lg-3\">\r\n        <div class=\"card currentact\">\r\n          <h5 class=\"redcolor\">Puppets</h5>\r\n          <h5 class=\"bluecolor\">Gwen Tennyson</h5>\r\n          <p class=\"dt\">11:45AM - 12:45PM</p>\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"col-lg-3\">\r\n        <div class=\"card currentact\">\r\n          <h5 class=\"redcolor\">Play with bubbles</h5>\r\n          <h5 class=\"bluecolor\">Dean Winchester</h5>\r\n          <p class=\"dt\">11:45AM - 12:45PM</p>\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"col-lg-3\">\r\n        <div class=\"card currentact\">\r\n          <h5 class=\"redcolor\">Feed to Duck </h5>\r\n          <h5 class=\"bluecolor\">Sam Adam</h5>\r\n          <p class=\"dt\">11:45AM - 12:45PM</p>\r\n        </div>\r\n      </div>\r\n\r\n    </div> -->\r\n\r\n\r\n    <!--   \r\n    <div class=\"row\">\r\n      <div class=\"col\">\r\n        <div class=\"card cardfilter\">\r\n          <ul class=\"leftfilter\">\r\n            <li class=\"count\">Activity (200)</li>\r\n            <li>Add Filter</li>\r\n          </ul>\r\n          <ul class=\"lastfilter\">\r\n            <li>\r\n              <input type=\"text\" placeholder=\"Serach by Activity\">\r\n            </li>\r\n            <li>\r\n              <input type=\"text\" placeholder=\"Serach by ID\">\r\n            </li>\r\n            <li>\r\n              <div>\r\n                <input type=\"date\" id=\"start\" name=\"trip\" value=\"2018-07-22\" min=\"2018-01-01\" max=\"2018-12-31\" />\r\n              </div>\r\n            </li>\r\n            <li>\r\n              <img src=\"assets/img/pdf.svg\" alt=\"\">\r\n            </li>\r\n          </ul>\r\n        </div>\r\n      </div>\r\n    </div> -->\r\n    <div class=\"card cardfilter\">\r\n      <div class=\"row algcenter\">\r\n\r\n        <div class=\"leftfilter\">\r\n          <!-- <div class=\"count\">Student (200)</div> -->\r\n          <!-- <div>Search Class:</div>\r\n            <div  class=\"pr15\">\r\n              <div class=\"form-group\">\r\n                <input type=\"text\" placeholder=\"Serch by Date\" [(ngModel)]=\"searchByDate\" showWeekNumbers=\"false\" [maxDate]=\"today\"\r\n          class=\"form-control mr15\" [bsConfig]=\"dpConfig\" (bsValueChange)=\"getSerchDate($event)\" bsDatepicker>\r\n              </div>\r\n            </div> -->\r\n          <div class=\"search-date\">\r\n            <div class=\" label-text\">Search Date:</div>\r\n            <div class=\"pr15\">\r\n              <div class=\"form-group\">\r\n                <input type=\"text\" placeholder=\"Serch by Date\" [(ngModel)]=\"searchByDate\" showWeekNumbers=\"false\"\r\n                  [maxDate]=\"today\" class=\"form-control mr15\" [bsConfig]=\"dpConfig\"\r\n                  (bsValueChange)=\"getSerchDate($event)\" bsDatepicker>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"search-class\">\r\n            <div class=\" label-text\">Search Class:</div>\r\n            <div class=\"pr15\">\r\n              <div class=\"form-group\">\r\n                <select class=\"form-control\" placeholder=\"Serch\" [(ngModel)]=\"serchByClass\"\r\n                  id=\"exampleFormControlSelect1\">\r\n                  <option value=\"\">Select class</option>\r\n                  <option *ngFor=\"let classes of classList\" [value]=\"classes.value\">{{classes.label}}</option>\r\n                </select>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <!-- <div> <button type=\"submit\" class=\"btn btn-send\" (click)=\"getPostActivityList()\">Search</button></div> -->\r\n          <div class=\"filter-buttons\">\r\n            <button type=\"submit\" class=\"btn btn-send\" (click)=\"onClickSearch($event)\">Search</button>\r\n          </div>\r\n        </div>\r\n        <!-- <div class=\"col-lg-1\">\r\n          <img src=\"assets/img/pdf.svg\" alt=\"\">\r\n        </div> -->\r\n      </div>\r\n    </div>\r\n    <div class=\"innertable studentListSearch\">\r\n      <div class=\"table-responsive\">\r\n        <table class=\"table\">\r\n          <thead class=\"thead-light\">\r\n            <tr>\r\n              <!-- <th>\r\n                <label class=\"checkboxcustom\">\r\n                  <input type=\"checkbox\" checked=\"checked\">\r\n                  <span class=\"checkmark\"></span>\r\n                </label>\r\n              </th> -->\r\n              <!-- <th></th>-->\r\n              <th scope=\"col\">Post Title</th>\r\n              <th scope=\"col\">Student Name</th>\r\n              <th scope=\"col\">Sender</th>\r\n              <th scope=\"col\">Date</th>\r\n              <th scope=\"col\" class=\"text-center\">Gallery</th>\r\n              <th scope=\"col\">Action</th>\r\n            </tr>\r\n          </thead>\r\n          <tbody>\r\n            <tr *ngFor=\"let post of postActivityList\">\r\n              <!-- <td>\r\n                <label class=\"checkboxcustom\">\r\n                  <input type=\"checkbox\">\r\n                  <span class=\"checkmark\"></span>\r\n                </label>\r\n              </td> -->\r\n              <!-- <td>\r\n                <img src=\"assets/img/child1.png\" alt=\"\" class=\"img-circle childimg\">\r\n              </td>-->\r\n              <td>{{post.postTitle}}</td>\r\n              <td>{{post.studentName}}</td>\r\n              <td>{{post.sender}}</td>\r\n              <td>{{post.postedDate| date}}</td>\r\n              <td class=\"text-center\">\r\n                <div *ngIf=\"post.postActivityImages\">\r\n                  <img *ngFor=\"let img of post.postActivityImages  | slice:0:3\" src=\"{{img.imageServerPath}}\"\r\n                    onError=\"this.src='assets/img/user.png'\" alt=\"\" class=\"galrythumb\">\r\n                </div>\r\n                <div *ngIf=\"post.postActivityVideos\">\r\n                  <img *ngFor=\"let img of post.postActivityVideos\" src=\"assets/img/video.jpg\" alt=\"\" class=\"galrythumb\">\r\n                </div>\r\n                <!-- <img src=\"assets/img/child1.png\" alt=\"\" class=\"galrythumb\">\r\n                   <img src=\"assets/img/child1.png\" alt=\"\" class=\"galrythumb\"> -->\r\n                <a *ngIf=\"post.postActivityImages.length > 3\" class=\"defltthumb\" style=\"color:#FF6C6C\">3+</a>\r\n              </td>\r\n              <td>\r\n                <!-- <a [routerLink]=\"['../activitydetails',post.id,post.classesID]\">\r\n                  <img src=\"assets/img/view.png\" class=\"action-items\" aria-hidden=\"true\">\r\n                </a>\r\n                <a (click)=\"deletePost(post)\">\r\n                  <img src=\"assets/img/delete.png\" class=\"action-items\" aria-hidden=\"true\">\r\n                </a> -->\r\n                <a [routerLink]=\"['../activitydetails',post.id,post.classesID]\">\r\n                  <i class=\"fa fa-eye\"></i>\r\n                </a>\r\n                <a (click)=\"deletePost(post)\">\r\n                  <i class=\"fa fa-trash\"></i>\r\n                </a>\r\n              </td>\r\n            </tr>\r\n          </tbody>\r\n        </table>\r\n        <div class=\"text-center\">\r\n\r\n          <span *ngIf=\"postActivityList.length == 0 && !loader\" class=\"text-center\">No result found</span>\r\n        </div>\r\n      </div>\r\n      <!-- <div class=\"mainpagination\">\r\n\r\n        <ul class=\"pagination\" style=\"margin: 0;float: right;\">\r\n          <li class=\"bar_pag\">Showing 1 to 10 of 23 entries </li>\r\n          <li class=\"paginate_button previous disabled\" id=\"example_previous\">\r\n            <i class=\"fa fa-chevron-left\" aria-hidden=\"true\"></i>\r\n          </li>\r\n          <li class=\"paginate_button active\">\r\n            <a href=\"#\" aria-controls=\"example\" data-dt-idx=\"1\" tabindex=\"0\">1</a>\r\n          </li>\r\n          <li class=\"paginate_button \">\r\n            <a href=\"#\" aria-controls=\"example\" data-dt-idx=\"2\" tabindex=\"0\">2</a>\r\n          </li>\r\n          <li class=\"paginate_button next\" id=\"example_next\">\r\n            <i class=\"fa fa-chevron-right\" aria-hidden=\"true\"></i>\r\n          </li>\r\n        </ul>\r\n      </div> -->\r\n      <p-paginator #postpage [alwaysShow]=\"false\" [rows]=\"limit\" [totalRecords]=\"totalRecord\"\r\n        (onPageChange)=\"paginate($event)\"></p-paginator>\r\n    </div>\r\n\r\n  </div>\r\n\r\n</div>\r\n<ngx-spinner type=\"ball-atom\" size=\"medium\" color=\"#58A7FE\"></ngx-spinner>\r\n<app-confirm-box></app-confirm-box>"

/***/ }),

/***/ "./src/app/layout/teacher/components/teacher-post-activity/teacher-post-activity.component.ts":
/*!****************************************************************************************************!*\
  !*** ./src/app/layout/teacher/components/teacher-post-activity/teacher-post-activity.component.ts ***!
  \****************************************************************************************************/
/*! exports provided: TeacherPostActivityComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TeacherPostActivityComponent", function() { return TeacherPostActivityComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-bootstrap */ "./node_modules/ngx-bootstrap/esm5/ngx-bootstrap.js");
/* harmony import */ var _shared_services_teacher_api_service_teacher_api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/services/teacher-api-service/teacher-api.service */ "./src/app/layout/teacher/shared/services/teacher-api-service/teacher-api.service.ts");
/* harmony import */ var _shared_services_error_handler_error_handler_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../shared/services/error-handler/error-handler.service */ "./src/app/shared/services/error-handler/error-handler.service.ts");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var _shared_services_notification_service_notification_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../shared/services/notification-service/notification.service */ "./src/app/shared/services/notification-service/notification.service.ts");
/* harmony import */ var _shared_services_common_common_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../shared/services/common/common.service */ "./src/app/shared/services/common/common.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! primeng/api */ "./node_modules/primeng/api.js");
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(primeng_api__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _shared_constant__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../shared/constant */ "./src/app/layout/teacher/shared/constant.ts");
/* harmony import */ var primeng_paginator__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! primeng/paginator */ "./node_modules/primeng/paginator.js");
/* harmony import */ var primeng_paginator__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(primeng_paginator__WEBPACK_IMPORTED_MODULE_10__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var TeacherPostActivityComponent = /** @class */ (function () {
    function TeacherPostActivityComponent(apiService, error, spinner, notification, commonService, fb, confirmationService) {
        this.apiService = apiService;
        this.error = error;
        this.spinner = spinner;
        this.notification = notification;
        this.commonService = commonService;
        this.fb = fb;
        this.confirmationService = confirmationService;
        this.dpConfig = new ngx_bootstrap__WEBPACK_IMPORTED_MODULE_1__["BsDatepickerConfig"]();
        this.classList = [];
        this.postActivityList = [];
        this.today = new Date();
        this.count = 0;
        this.pageNo = 0;
        this.limit = 10;
        this.totalRecord = 0;
        this.loader = true;
    }
    TeacherPostActivityComponent.prototype.ngOnInit = function () {
        this.searchByDate = new Date();
        this.dpConfig = Object.assign({}, { containerClass: 'theme-dark-blue' }, { showWeekNumbers: false });
        // this.getAllClassess();
        this.getTeacherOperationalClasses();
    };
    /**Get All class list */
    TeacherPostActivityComponent.prototype.getAllClassess = function () {
        var _this = this;
        this.spinner.show();
        var data = {
            'agencyID': this.commonService.getAgencyId()
        };
        this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_9__["TeacherAPIURLs"].GetAllClasses, data, null).subscribe(function (res) {
            //   this.spinner.hide();
            if (res.body.statusCode === 200) {
                _this.classList = res.body.data;
                if (_this.classList.length !== 0) {
                    _this.serchByClass = _this.classList[0].classesID;
                }
                _this.getPostActivityList();
            }
            else {
                _this.spinner.hide();
                _this.error.unknownError();
            }
        }, function (err) {
            _this.spinner.hide();
            _this.error.commonError(err);
        });
    };
    /**Get post activity list */
    TeacherPostActivityComponent.prototype.getPostActivityList = function () {
        var _this = this;
        this.loader = true;
        this.spinner.show();
        var data = {
            'agencyID': this.commonService.getAgencyId(),
            'id': 0,
            'classesID': this.serchByClass,
            'postedDate': this.searchByDate,
            'userID': this.commonService.getReleventUserId('userdetails'),
            'limit': this.limit,
            'page': this.pageNo
        };
        this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_9__["TeacherAPIURLs"].GetAllPostActivities, data, null).subscribe(function (res) {
            if (res.body.statusCode === 200) {
                _this.totalRecord = res.body.totalRows;
                _this.postActivityList = res.body.data;
                console.log('ppppppppp', _this.postActivityList);
                _this.loader = false;
                _this.spinner.hide();
            }
            else {
                _this.spinner.hide();
                _this.error.unknownError();
            }
        }, function (err) {
            _this.spinner.hide();
            _this.error.commonError(err);
        });
    };
    TeacherPostActivityComponent.prototype.deletePost = function (value) {
        var _this = this;
        this.confirmationService.confirm({
            message: 'Do you want to delete this Post?',
            accept: function () {
                _this.spinner.show();
                console.log(value);
                value.deletedBy = _this.commonService.getLoggedInUserId();
                value.deletedDate = new Date();
                value.isDeleted = true;
                if (value.postActivityImages.length !== 0) {
                    value.postActivityImages.forEach(function (element) {
                        element.deletedBy = _this.commonService.getLoggedInUserId();
                        element.deletedDate = new Date();
                        element.isDeleted = true;
                    });
                }
                else if (value.postActivityVideos.length !== 0) {
                    value.postActivityVideos.forEach(function (element) {
                        element.deletedBy = _this.commonService.getLoggedInUserId();
                        element.deletedDate = new Date();
                        element.isDeleted = true;
                    });
                }
                else {
                }
                _this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_9__["TeacherAPIURLs"].SavePostActivites, value, null).subscribe(function (res) {
                    if (res.body.statusCode === 200) {
                        _this.deletePostSuccess(value);
                    }
                    else {
                        _this.spinner.hide();
                        _this.error.unknownError();
                    }
                }, function (err) {
                    _this.spinner.hide();
                    _this.error.commonError(err);
                });
            }
        });
    };
    TeacherPostActivityComponent.prototype.deletePostSuccess = function (data) {
        var index = this.postActivityList.findIndex(function (r) { return r.id === data.id; });
        this.postActivityList.splice(index, 1);
        this.spinner.hide();
        this.notification.success({ message: 'Post deleted successfully', title: '' });
    };
    TeacherPostActivityComponent.prototype.getTeacherOperationalClasses = function () {
        var _this = this;
        this.classList = [];
        this.spinner.show();
        var data = {
            'agencyID': this.commonService.getAgencyId(),
            'askingDate': this.searchByDate,
            'teacherID': this.commonService.getReleventUserId('userdetails'),
        };
        this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_9__["TeacherAPIURLs"].GetTeacherOperationalClasses, data, null).subscribe(function (res) {
            _this.spinner.hide();
            if (res.body.statusCode === 200) {
                _this.classList = res.body.data;
                if (_this.classList.length !== 0) {
                    _this.serchByClass = _this.classList[0].value;
                }
                else {
                    _this.serchByClass = 0;
                    //  this.notification.info({message: 'It seems like you have not checked-in into the class yet', title: '' });
                }
                _this.getPostActivityList();
            }
            else {
                _this.spinner.hide();
                _this.error.unknownError();
            }
        }, function (err) {
            _this.spinner.hide();
            _this.error.commonError(err);
        });
    };
    TeacherPostActivityComponent.prototype.getSerchDate = function (event) {
        this.count++;
        if (this.count > 2) {
            this.searchByDate = event;
            this.pageNo = 0;
            this.classList = [];
            this.getTeacherOperationalClasses();
        }
    };
    TeacherPostActivityComponent.prototype.paginate = function (event) {
        this.pageNo = event.page;
        // this.limit = event.page;
        this.getPostActivityList();
    };
    TeacherPostActivityComponent.prototype.onClickSearch = function (event) {
        this.pageNo = 0;
        this.paginator.changePageToFirst(event);
        this.getPostActivityList();
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('postpage'),
        __metadata("design:type", primeng_paginator__WEBPACK_IMPORTED_MODULE_10__["Paginator"])
    ], TeacherPostActivityComponent.prototype, "paginator", void 0);
    TeacherPostActivityComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-teacher-post-activity',
            template: __webpack_require__(/*! ./teacher-post-activity.component.html */ "./src/app/layout/teacher/components/teacher-post-activity/teacher-post-activity.component.html"),
            styles: [__webpack_require__(/*! ./teacher-post-activity.component.css */ "./src/app/layout/teacher/components/teacher-post-activity/teacher-post-activity.component.css")]
        }),
        __metadata("design:paramtypes", [_shared_services_teacher_api_service_teacher_api_service__WEBPACK_IMPORTED_MODULE_2__["TeacherApiService"], _shared_services_error_handler_error_handler_service__WEBPACK_IMPORTED_MODULE_3__["ErrorHandlerService"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_4__["NgxSpinnerService"], _shared_services_notification_service_notification_service__WEBPACK_IMPORTED_MODULE_5__["NotificationService"],
            _shared_services_common_common_service__WEBPACK_IMPORTED_MODULE_6__["CommonService"], _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormBuilder"], primeng_api__WEBPACK_IMPORTED_MODULE_8__["ConfirmationService"]])
    ], TeacherPostActivityComponent);
    return TeacherPostActivityComponent;
}());



/***/ }),

/***/ "./src/app/layout/teacher/components/teacher-profile/teacher-profile.component.css":
/*!*****************************************************************************************!*\
  !*** ./src/app/layout/teacher/components/teacher-profile/teacher-profile.component.css ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n/* Added By Aniket */\r\n/* .profileupdate {\r\n    margin-left: 10%;\r\n    margin-right: 10%\r\n} */\r\n.spaceb {\r\n    margin-bottom: 20px;\r\n}\r\n.upload-profile {\r\n    text-align: center;\r\n    padding: 15px;\r\n}\r\n.form-fields {\r\n    width: 100%;\r\n    padding: 15px;\r\n    border: 1px solid #f5f5f5;\r\n    margin: 10px;\r\n}\r\n.upload-profile img {\r\n    height: 120px;\r\n    width: 120px;\r\n    border-radius: 50%;\r\n    margin-bottom: 10px;\r\n}\r\n.modal-container {\r\n    border-radius: 10px;\r\n    box-shadow: 0 4px 14px 0px rgba(0,0,0,0.09);\r\n    padding: 10px;\r\n    background: #ffffff;\r\n}\r\n.modal-container form {\r\n    display: flex;\r\n}\r\n.btn-send {\r\n    background: none;\r\n    padding: 5px 20px;\r\n    color: #58A7FE;\r\n    font-size: 14px;\r\n    border-radius: 30px;\r\n    border: 1px solid #58A7FE;\r\n}\r\n.btn-send:hover {\r\n    background: #58A7FE;\r\n    padding: 5px 20px;\r\n    color: #ffffff;\r\n    font-size: 14px;\r\n    border-radius: 30px;\r\n    border: 1px solid #58A7FE;\r\n}\r\n@media (max-width: 767px) {\r\n    .modal-container form {\r\n        display: block;\r\n    }\r\n    .form-fields {margin: 0;}\r\n}\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGF5b3V0L3RlYWNoZXIvY29tcG9uZW50cy90ZWFjaGVyLXByb2ZpbGUvdGVhY2hlci1wcm9maWxlLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLG9CQUFvQjtBQUNwQjs7O0dBR0c7QUFHSDtJQUNJLG1CQUFtQjtBQUN2QjtBQUNBO0lBQ0ksa0JBQWtCO0lBQ2xCLGFBQWE7QUFDakI7QUFDQTtJQUNJLFdBQVc7SUFDWCxhQUFhO0lBQ2IseUJBQXlCO0lBQ3pCLFlBQVk7QUFDaEI7QUFDQTtJQUNJLGFBQWE7SUFDYixZQUFZO0lBQ1osa0JBQWtCO0lBQ2xCLG1CQUFtQjtBQUN2QjtBQUNBO0lBQ0ksbUJBQW1CO0lBQ25CLDJDQUEyQztJQUMzQyxhQUFhO0lBQ2IsbUJBQW1CO0FBQ3ZCO0FBQ0E7SUFDSSxhQUFhO0FBQ2pCO0FBQ0E7SUFDSSxnQkFBZ0I7SUFDaEIsaUJBQWlCO0lBQ2pCLGNBQWM7SUFDZCxlQUFlO0lBQ2YsbUJBQW1CO0lBQ25CLHlCQUF5QjtBQUM3QjtBQUNBO0lBQ0ksbUJBQW1CO0lBQ25CLGlCQUFpQjtJQUNqQixjQUFjO0lBQ2QsZUFBZTtJQUNmLG1CQUFtQjtJQUNuQix5QkFBeUI7QUFDN0I7QUFDQTtJQUNJO1FBQ0ksY0FBYztJQUNsQjtJQUNBLGNBQWMsU0FBUyxDQUFDO0FBQzVCIiwiZmlsZSI6InNyYy9hcHAvbGF5b3V0L3RlYWNoZXIvY29tcG9uZW50cy90ZWFjaGVyLXByb2ZpbGUvdGVhY2hlci1wcm9maWxlLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuLyogQWRkZWQgQnkgQW5pa2V0ICovXHJcbi8qIC5wcm9maWxldXBkYXRlIHtcclxuICAgIG1hcmdpbi1sZWZ0OiAxMCU7XHJcbiAgICBtYXJnaW4tcmlnaHQ6IDEwJVxyXG59ICovXHJcblxyXG5cclxuLnNwYWNlYiB7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xyXG59XHJcbi51cGxvYWQtcHJvZmlsZSB7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBwYWRkaW5nOiAxNXB4O1xyXG59XHJcbi5mb3JtLWZpZWxkcyB7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIHBhZGRpbmc6IDE1cHg7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjZjVmNWY1O1xyXG4gICAgbWFyZ2luOiAxMHB4O1xyXG59XHJcbi51cGxvYWQtcHJvZmlsZSBpbWcge1xyXG4gICAgaGVpZ2h0OiAxMjBweDtcclxuICAgIHdpZHRoOiAxMjBweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XHJcbn1cclxuLm1vZGFsLWNvbnRhaW5lciB7XHJcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xyXG4gICAgYm94LXNoYWRvdzogMCA0cHggMTRweCAwcHggcmdiYSgwLDAsMCwwLjA5KTtcclxuICAgIHBhZGRpbmc6IDEwcHg7XHJcbiAgICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xyXG59XHJcbi5tb2RhbC1jb250YWluZXIgZm9ybSB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG59XHJcbi5idG4tc2VuZCB7XHJcbiAgICBiYWNrZ3JvdW5kOiBub25lO1xyXG4gICAgcGFkZGluZzogNXB4IDIwcHg7XHJcbiAgICBjb2xvcjogIzU4QTdGRTtcclxuICAgIGZvbnQtc2l6ZTogMTRweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDMwcHg7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjNThBN0ZFO1xyXG59XHJcbi5idG4tc2VuZDpob3ZlciB7XHJcbiAgICBiYWNrZ3JvdW5kOiAjNThBN0ZFO1xyXG4gICAgcGFkZGluZzogNXB4IDIwcHg7XHJcbiAgICBjb2xvcjogI2ZmZmZmZjtcclxuICAgIGZvbnQtc2l6ZTogMTRweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDMwcHg7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjNThBN0ZFO1xyXG59XHJcbkBtZWRpYSAobWF4LXdpZHRoOiA3NjdweCkge1xyXG4gICAgLm1vZGFsLWNvbnRhaW5lciBmb3JtIHtcclxuICAgICAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIH1cclxuICAgIC5mb3JtLWZpZWxkcyB7bWFyZ2luOiAwO31cclxufSJdfQ== */"

/***/ }),

/***/ "./src/app/layout/teacher/components/teacher-profile/teacher-profile.component.html":
/*!******************************************************************************************!*\
  !*** ./src/app/layout/teacher/components/teacher-profile/teacher-profile.component.html ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n<div class=\"wrapper\">\r\n  <div class=\"container-fluid\">\r\n<div class=\"pagetitle\">\r\n  <div>\r\n    <h2>My Profile\r\n      <!-- <span>/ My Profile </span> -->\r\n    </h2>\r\n  </div>\r\n</div>\r\n\r\n  <div class=\"modal-container\">\r\n      <div class=\"modal-body profileupdate\">\r\n        <form [formGroup]=\"profileForm\">\r\n              <div class=\"upload-profile\">\r\n                \r\n                <div *ngIf=\"image !=''\"> <img src=\"{{image}}\" alt=\"image\" class=\"img-fluid img-circle\" onError=\"this.src='assets/img/user.png'\">   </div>\r\n                <div *ngIf=\"image ==''\"> <img src=\"{{image}}\" alt=\"image\" class=\"img-fluid img-circle\" onError=\"this.src='assets/img/user.png'\">   </div>\r\n                <div class=\"upload-btn-wrapper\">\r\n                  <button class=\"btn btn-send\">Upload a photo</button>\r\n                  <input\r\n                  type=\"file\"\r\n                  #input\r\n                  (change)=\"processFile($event)\">\r\n                  <!-- <input type=\"file\" name=\"myfile\" formControlName=\"photo\" /> -->\r\n                </div>\r\n              </div>\r\n              <div class=\"form-fields\">\r\n          <div class=\"row mb-10 \">\r\n            <div class=\"col-lg-6\">\r\n              <div class=\"form-group\">\r\n                <label for=\"\">First name</label>\r\n                <input type=\"text \"  maxlength=\"35\" class=\"form-control\" formControlName =\"firstname\" id=\"\" aria-describedby=\"\" placeholder=\"Enter First Name\">\r\n                <div *ngIf=\"f.firstname.invalid && (f.firstname.dirty || f.firstname.touched)\" class=\"text-left errormsg\">\r\n                  <span *ngIf=\"f.firstname.errors.required\">\r\n                    <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please enter name</span>\r\n                  </span>\r\n                  <span *ngIf=\"f.firstname.errors.minlength\">\r\n                    <i class=\"fa fa-exclamation-circle errtext\" ></i> <span class=\"errtext\"> Minimum 3 characters required</span> \r\n                </span>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-lg-6\">\r\n              <div class=\"form-group\">\r\n                <label for=\"\">Last name</label>\r\n                <input type=\"text \" maxlength=\"35\" class=\"form-control\" id=\"\" formControlName =\"lastname\" aria-describedby=\"\" placeholder=\"Enter Last Name\">\r\n                <div *ngIf=\"f.lastname.invalid && (f.lastname.dirty || f.lastname.touched)\" class=\"text-left errormsg\">\r\n                  <span *ngIf=\"f.lastname.errors.required\">\r\n                    <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please enter last name</span>\r\n                  </span>\r\n                  <span *ngIf=\"f.lastname.errors.minlength\">\r\n                    <i class=\"fa fa-exclamation-circle errtext\" ></i> <span class=\"errtext\"> Minimum 3 characters required</span> \r\n                </span>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n\r\n\r\n\r\n          <div class=\"row mb-10\">\r\n              <div class=\"col-lg-6\">\r\n                <div class=\"form-group\">\r\n                  <label for=\"\">Email Address</label>\r\n                  <input type=\"email \" disabled class=\"form-control\" formControlName =\"email\" id=\"\" aria-describedby=\"\" placeholder=\"Email address\">\r\n                  <div *ngIf=\"f.email.invalid && (f.email.dirty || f.email.touched)\" class=\"text-left errormsg\">\r\n                    <span *ngIf=\"f.email.errors.required\">\r\n                      <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please enter email</span>\r\n                    </span>\r\n                    <span *ngIf=\"f.email.errors.pattern\">\r\n                      <i class=\"fa fa-exclamation-circle errtext\" ></i> <span class=\"errtext\"> Please enter valid email address</span>\r\n                  </span>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-lg-6\">\r\n                <div class=\"form-group\">\r\n                  <label for=\"\">Mobile</label>\r\n                  <input type=\"text \" maxlength=\"10\" class=\"form-control\" formControlName =\"mobile\" id=\"\" aria-describedby=\"\" (keypress)=\"allowOnlyNumber($event)\" placeholder=\"Mobile\">\r\n                  <div *ngIf=\"f.mobile.invalid && (f.mobile.dirty || f.mobile.touched)\" class=\"text-left errormsg\">\r\n                    <span *ngIf=\"f.mobile.errors.required\">\r\n                      <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please enter phone number</span>\r\n                    </span>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n          <!-- <div class=\"row mb-10\">\r\n            <div class=\"col-lg-6\">\r\n              <div class=\"form-group\">\r\n                <label for=\"\">Password</label>\r\n                <input type=\"password \" class=\"form-control\" formControlName =\"forstname\" id=\"\" aria-describedby=\"\" placeholder=\"Pasword\">\r\n              </div>\r\n            </div>\r\n            <div class=\"col-lg-6\">\r\n              <div class=\"form-group\">\r\n                <label for=\"\">Confirm Password</label>\r\n                <input type=\"text \" class=\"form-control\" formControlName =\"forstname\" id=\"\" aria-describedby=\"\" placeholder=\"Confirm Password\">\r\n              </div>\r\n            </div>\r\n          </div> -->\r\n\r\n\r\n          <div class=\"row mb-10\">\r\n            <div class=\"col-lg-6\">\r\n              <div class=\"form-group\">\r\n                <label for=\"\">Address</label>\r\n                <input type=\"text \" maxlength=\"255\" class=\"form-control\" formControlName =\"address\" id=\"\" aria-describedby=\"\" placeholder=\"Address\">\r\n              </div>\r\n              <div *ngIf=\"f.address.invalid && (f.address.dirty || f.address.touched)\" class=\"text-left errormsg\">\r\n                <span *ngIf=\"f.address.errors.required\">\r\n                  <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please enter address</span>\r\n                </span>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-lg-6\">\r\n              <div class=\"form-group\">\r\n                <label for=\"exampleInputEmail1\">Country</label>\r\n                <!-- <input type=\"text \" class=\"form-control\" formControlName =\"country\" id=\"\" aria-describedby=\"\" placeholder=\"Country\"> -->\r\n                <select class=\"form-control\" placeholder=\"Country\" formControlName=\"country\"\r\n                id=\"exampleFormControlSelect1\" (change)=\"getStatesList();clearStateCity()\">\r\n                <option value=\"\">Select Country</option>\r\n                <option *ngFor=\"let countries of countryList\" [value]=\"countries.id\" >{{countries.countryName}}</option>\r\n              </select>\r\n              <div *ngIf=\"f.country.invalid && (f.country.dirty || f.country.touched)\" class=\"text-left errormsg\">\r\n                <span *ngIf=\"f.country.errors.required\">\r\n                  <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please select country</span>\r\n                </span>\r\n              </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n\r\n\r\n          <div class=\"row mb-10\">\r\n              <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                      <label for=\"exampleFormControlSelect1\">State</label>\r\n                      <select class=\"form-control\" placeholder=\"State\" formControlName=\"state\"\r\n                      id=\"exampleFormControlSelect1\" (change)=\"getCitiesList();clearCity()\">\r\n                      <option value=\"\">Select State</option>\r\n                      <option *ngFor=\"let states of stateList\" [value]=\"states.id\" >{{states.stateName}}</option>\r\n                    </select>\r\n                    <div *ngIf=\"f.state.invalid && (f.state.dirty || f.state.touched)\" class=\"text-left errormsg\">\r\n                      <span *ngIf=\"f.state.errors.required\">\r\n                        <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please select state</span>\r\n                      </span>\r\n                    </div>\r\n                    </div>\r\n              </div>\r\n            <div class=\"col-lg-6\">\r\n              <div class=\"form-group\">\r\n                <label for=\"\">City</label>\r\n                <!-- <input type=\"text \" class=\"form-control\" formControlName =\"city\" id=\"\" aria-describedby=\"\" placeholder=\"Enter First Name\"> -->\r\n                <select class=\"form-control\" placeholder=\"City\" formControlName=\"city\"\r\n                id=\"exampleFormControlSelect1\" >\r\n                <option value=\"\">Select City</option>\r\n                <option *ngFor=\"let cities of cityList\" [value]=\"cities.id\" >{{cities.cityName}}</option>\r\n              </select>\r\n              <div *ngIf=\"f.city.invalid && (f.city.dirty || f.city.touched)\" class=\"text-left errormsg\">\r\n                <span *ngIf=\"f.city.errors.required\">\r\n                  <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please select city</span>\r\n                </span>\r\n              </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"row mb-10\">\r\n              <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"\">Zip Code</label>\r\n                    <input type=\"number \" maxlength=\"6\" class=\"form-control\" formControlName =\"zipcode\" id=\"\" aria-describedby=\"\" placeholder=\"Zip code\">\r\n                  </div>\r\n                </div>\r\n              <!-- <div class=\"col-lg-6\">\r\n                <div class=\"form-group\">\r\n                  <label for=\"\">Location</label>\r\n                  <input type=\"text\" class=\"form-control\" formControlName =\"forstname\" id=\"\" aria-describedby=\"\" placeholder=\"Location\">\r\n                </div>\r\n              </div>  -->\r\n              <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"\">Date Of Birth</label>\r\n                    <!-- <input type=\"date\" class=\"form-control\" formControlName =\"birthdate\" id=\"\" aria-describedby=\"\" placeholder=\"DOB\"> -->\r\n                    <input type=\"text\" placeholder=\"Select date\" formControlName=\"birthdate\"\r\n                showWeekNumbers=\"false\" [maxDate]=\"today\"  class=\"form-control\" [bsConfig]=\"dpConfig\" bsDatepicker>\r\n                <div *ngIf=\"f.birthdate.invalid && (f.birthdate.dirty || f.birthdate.touched)\" class=\"text-left errormsg\">\r\n                  <span *ngIf=\"f.birthdate.errors.required\">\r\n                    <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please select birthdate</span>\r\n                  </span>\r\n                </div>\r\n              </div>\r\n                </div>\r\n            </div>\r\n\r\n\r\n            <div class=\"row mb-10\">\r\n\r\n                <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"exampleInputEmail1\">Date of Hiring</label>\r\n                    <!-- <input type=\"date \" class=\"form-control\" formControlName =\"hiringdate\" id=\"\" aria-describedby=\"\" placeholder=\"DOH\"> -->\r\n                    <input type=\"text\" placeholder=\"Select date\" formControlName=\"hiringdate\"\r\n                showWeekNumbers=\"false\" [maxDate]=\"today\"  class=\"form-control\" [bsConfig]=\"dpConfig\" bsDatepicker>\r\n                <div *ngIf=\"f.hiringdate.invalid && (f.hiringdate.dirty || f.hiringdate.touched)\" class=\"text-left errormsg\">\r\n                  <span *ngIf=\"f.hiringdate.errors.required\">\r\n                    <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please select hiring date</span>\r\n                  </span>\r\n                </div>\r\n              </div>\r\n                </div>\r\n                <div class=\"col-lg-6\">\r\n                    <div class=\"form-group\">\r\n                      <label for=\"\">Gross Pay</label>\r\n                      <input type=\"number\" class=\"form-control\" formControlName =\"grospay\" id=\"\" aria-describedby=\"\" placeholder=\"Gross pay\" [attr.disabled]=\"true\">\r\n                    </div>\r\n                  </div>\r\n              </div>\r\n\r\n          <div class=\"row mb-10\">\r\n\r\n              <div class=\"col-lg-6\">\r\n                <div class=\"form-group\">\r\n                  <label for=\"\">Certification</label>\r\n                  <input type=\"text\" class=\"form-control\" maxlength=\"200\" formControlName =\"certification\" id=\"\" aria-describedby=\"\" placeholder=\"Certification\">\r\n                  <div *ngIf=\"f.certification.invalid && (f.certification.dirty || f.certification.touched)\" class=\"text-left errormsg\">\r\n                    <span *ngIf=\"f.certification.errors.required\">\r\n                      <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please enter certification</span>\r\n                    </span>\r\n                    <span *ngIf=\"f.certification.errors.maxlength\">\r\n                        <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Cannot enter more then 200 chracters</span>\r\n                      </span>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"\">Home phone</label>\r\n                    <input type=\"text\" maxlength=\"10\" class=\"form-control\" formControlName =\"homephone\" id=\"\" (keypress)=\"allowOnlyNumber($event)\"  aria-describedby=\"\" placeholder=\"home phone\">\r\n                  </div>\r\n                </div>\r\n            </div>\r\n            </div>\r\n      </form>\r\n    </div>\r\n    <div class=\"modal-footer profileupdate\">\r\n      <!-- <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button> -->\r\n      <button type=\"button\" class=\"btn btn-primary\" (click)=\"SaveTeacherDetails()\">Update Profile</button>\r\n    </div>\r\n  </div>\r\n  </div>\r\n  </div>\r\n\r\n  <ngx-spinner type=\"ball-atom\" size=\"medium\" color=\"#58A7FE\"></ngx-spinner>\r\n"

/***/ }),

/***/ "./src/app/layout/teacher/components/teacher-profile/teacher-profile.component.ts":
/*!****************************************************************************************!*\
  !*** ./src/app/layout/teacher/components/teacher-profile/teacher-profile.component.ts ***!
  \****************************************************************************************/
/*! exports provided: TeacherProfileComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TeacherProfileComponent", function() { return TeacherProfileComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _shared_services_teacher_api_service_teacher_api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/services/teacher-api-service/teacher-api.service */ "./src/app/layout/teacher/shared/services/teacher-api-service/teacher-api.service.ts");
/* harmony import */ var _shared_services_error_handler_error_handler_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../shared/services/error-handler/error-handler.service */ "./src/app/shared/services/error-handler/error-handler.service.ts");
/* harmony import */ var _shared_services_notification_service_notification_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../shared/services/notification-service/notification.service */ "./src/app/shared/services/notification-service/notification.service.ts");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var _shared_services_common_common_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../shared/services/common/common.service */ "./src/app/shared/services/common/common.service.ts");
/* harmony import */ var _shared_constant__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../shared/constant */ "./src/app/layout/teacher/shared/constant.ts");
/* harmony import */ var ngx_bootstrap__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-bootstrap */ "./node_modules/ngx-bootstrap/esm5/ngx-bootstrap.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var TeacherProfileComponent = /** @class */ (function () {
    function TeacherProfileComponent(apiService, error, spinner, notification, commonService, fb, route) {
        this.apiService = apiService;
        this.error = error;
        this.spinner = spinner;
        this.notification = notification;
        this.commonService = commonService;
        this.fb = fb;
        this.route = route;
        this.today = new Date();
        this.flag = false;
        this.formData = new FormData();
        this.emailPattern = /^([\w-\.]+\u0040([\w-]+\.)+[\w-]{2,4})?$/;
        this.dpConfig = new ngx_bootstrap__WEBPACK_IMPORTED_MODULE_8__["BsDatepickerConfig"]();
    }
    TeacherProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.id = params['id'];
        });
        this.dpConfig = Object.assign({}, { containerClass: 'theme-dark-blue' }, { showWeekNumbers: false });
        this.image = '';
        this.countryList = [];
        this.cityList = [];
        this.stateList = [];
        this.teacherDetailsVM = {};
        this.getTeacherDetails();
        this.editIncidentForm();
    };
    TeacherProfileComponent.prototype.editIncidentForm = function () {
        this.profileForm = this.fb.group({
            firstname: [this.teacherDetailsVM.FirstName, [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].minLength(3)]],
            lastname: [this.teacherDetailsVM.LastName, [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].minLength(3)]],
            email: [this.teacherDetailsVM.Email],
            mobile: [this.teacherDetailsVM.mPhoneNumber, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            address: [this.teacherDetailsVM.Address, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            country: [this.teacherDetailsVM.CountryId, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            city: [this.teacherDetailsVM.CityId, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            state: [this.teacherDetailsVM.StateId, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            zipcode: [this.teacherDetailsVM.PostalCode],
            birthdate: [this.teacherDetailsVM.DateOfBirth, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            hiringdate: [this.teacherDetailsVM.DateHired, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            grospay: [this.teacherDetailsVM.GrossPayPerHour],
            certification: [this.teacherDetailsVM.Certification, [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(200)]],
            photo: [''],
            homephone: [this.teacherDetailsVM.mHomePhone]
        });
    };
    Object.defineProperty(TeacherProfileComponent.prototype, "f", {
        // convenience getter for easy access to form fields
        get: function () { return this.profileForm.controls; },
        enumerable: true,
        configurable: true
    });
    TeacherProfileComponent.prototype.getTeacherDetails = function () {
        var _this = this;
        this.spinner.show();
        var req = {
            'AgencyID': this.commonService.getAgencyId(),
            'TeacherID': this.id,
        };
        this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_7__["TeacherAPIURLs"].GetTeacherInformation, req, null).subscribe(function (res) {
            if (res.body.statusCode === 200) {
                _this.teacherDetailsVM.FirstName = res.body.data.firstName;
                _this.teacherDetailsVM.LastName = res.body.data.lastName;
                _this.teacherDetailsVM.Email = res.body.data.email;
                _this.teacherDetailsVM.PhoneNumber = res.body.data.phoneNumber;
                _this.teacherDetailsVM.mPhoneNumber = res.body.data.mPhoneNumber;
                _this.teacherDetailsVM.Address = res.body.data.address;
                _this.teacherDetailsVM.CityId = res.body.data.cityId;
                _this.teacherDetailsVM.StateId = res.body.data.stateId;
                _this.teacherDetailsVM.CountryId = res.body.data.countryId;
                _this.teacherDetailsVM.PostalCode = res.body.data.postalCode;
                _this.teacherDetailsVM.DateOfBirth = _this.commonService.getLocalDateTimeFromUTC(res.body.data.dateOfBirth);
                _this.teacherDetailsVM.DateHired = _this.commonService.getLocalDateTimeFromUTC(res.body.data.dateHired);
                _this.teacherDetailsVM.GrossPayPerHour = res.body.data.grossPayPerHour;
                _this.teacherDetailsVM.Certification = res.body.data.certification;
                _this.teacherDetailsVM.HomePhone = res.body.data.homePhone;
                _this.teacherDetailsVM.mHomePhone = res.body.data.mHomePhone;
                _this.image = res.body.data.imagePath;
                _this.commonService.saveUserProfileImage(_this.image);
                _this.commonService.saveUserFullNameFromProfile(res.body.data.firstName + ' ' + res.body.data.lastName);
                localStorage.setItem('imagepath', _this.image);
                _this.editIncidentForm();
                _this.getAllCountries();
                _this.getStatesList();
                _this.getCitiesList();
                _this.spinner.hide();
            }
            else {
                _this.spinner.hide();
                _this.error.unknownError();
            }
        }, function (err) {
            _this.spinner.hide();
            _this.error.commonError(err);
        });
    };
    TeacherProfileComponent.prototype.getAllCountries = function () {
        var _this = this;
        // this.spinner.show();
        this.countryList = [];
        var req = {
            'AgencyID': this.commonService.getAgencyId(),
        };
        this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_7__["TeacherAPIURLs"].GetAllCountry, req, null).subscribe(function (res) {
            if (res.body.statusCode === 200) {
                _this.countryList = res.body.data;
                //  this.spinner.hide();
            }
            else {
                _this.spinner.hide();
                _this.error.unknownError();
            }
        }, function (err) {
            _this.spinner.hide();
            _this.error.commonError(err);
        });
    };
    TeacherProfileComponent.prototype.getStatesList = function () {
        var _this = this;
        this.stateList = [];
        this.cityList = [];
        var req = {
            'AgencyID': this.commonService.getAgencyId(),
            'CountryId': this.profileForm.value.country
        };
        this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_7__["TeacherAPIURLs"].GetAllStates, req, null).subscribe(function (res) {
            if (res.body.statusCode === 200) {
                _this.stateList = res.body.data;
                //  this.spinner.hide();
            }
            else {
                _this.spinner.hide();
                _this.error.unknownError();
            }
        }, function (err) {
            _this.spinner.hide();
            _this.error.commonError(err);
        });
    };
    TeacherProfileComponent.prototype.getCitiesList = function () {
        var _this = this;
        this.cityList = [];
        var req = {
            'AgencyID': this.commonService.getAgencyId(),
            'StateId': this.profileForm.value.state
        };
        this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_7__["TeacherAPIURLs"].GetAllCities, req, null).subscribe(function (res) {
            if (res.body.statusCode === 200) {
                _this.cityList = res.body.data;
                console.log('city', _this.cityList);
                //  this.spinner.hide();
            }
            else {
                _this.spinner.hide();
                _this.error.unknownError();
            }
        }, function (err) {
            _this.spinner.hide();
            _this.error.commonError(err);
        });
    };
    TeacherProfileComponent.prototype.SaveTeacherDetails = function () {
        if (this.flag === true) {
            this.UploadImage();
            this.flag = false;
        }
        else {
            this.updateProfile();
        }
    };
    TeacherProfileComponent.prototype.updateProfile = function () {
        var _this = this;
        if (this.profileForm.valid) {
            this.spinner.show();
            this.teacherDetailsVM.FirstName = this.profileForm.value.firstname;
            this.teacherDetailsVM.LastName = this.profileForm.value.lastname;
            this.teacherDetailsVM.Email = this.profileForm.value.email;
            this.teacherDetailsVM.PhoneNumber = 0;
            this.teacherDetailsVM.mPhoneNumber = this.profileForm.value.mobile;
            this.teacherDetailsVM.Address = this.profileForm.value.address;
            this.teacherDetailsVM.CityId = this.profileForm.value.city;
            this.teacherDetailsVM.StateId = this.profileForm.value.state;
            this.teacherDetailsVM.CountryId = this.profileForm.value.country;
            this.teacherDetailsVM.PostalCode = this.profileForm.value.zipcode;
            this.teacherDetailsVM.DateOfBirth = this.commonService.getUTCDate(this.profileForm.value.birthdate);
            this.teacherDetailsVM.DateHired = this.profileForm.value.hiringdate;
            this.teacherDetailsVM.GrossPayPerHour = this.profileForm.value.grospay;
            this.teacherDetailsVM.Certification = this.profileForm.value.certification;
            // this.teacherDetailsVM.HomePhone = this.profileForm.value.homephone;
            this.teacherDetailsVM.mHomePhone = this.profileForm.value.homephone;
            this.teacherDetailsVM.ImagePath = this.image;
            // this.image = this.profileimage;
            this.teacherDetailsVM.AgencyID = this.commonService.getAgencyId();
            this.teacherDetailsVM.Id = this.id;
            this.teacherDetailsVM.updatedBy = this.commonService.getLoggedInUserId();
            this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_7__["TeacherAPIURLs"].SaveTeacherDetails, this.teacherDetailsVM, null).subscribe(function (res) {
                if (res.body.statusCode === 200) {
                    //  this.spinner.hide();
                    _this.notification.success({ message: 'Profile updated successfully', title: '' });
                    _this.getTeacherDetails();
                }
                else {
                    _this.spinner.hide();
                    _this.error.unknownError();
                }
            }, function (err) {
                _this.spinner.hide();
                _this.error.commonError(err);
            });
        }
        else {
            this.spinner.hide();
            this.commonService.validateAllFields(this.profileForm);
        }
    };
    TeacherProfileComponent.prototype.allowOnlyNumber = function (event) {
        this.commonService.allowOnlyNumber(event);
    };
    TeacherProfileComponent.prototype.clearStateCity = function () {
        this.profileForm.controls['state'].setValue('');
        this.profileForm.controls['city'].setValue('');
    };
    TeacherProfileComponent.prototype.clearCity = function () {
        this.profileForm.controls['city'].setValue('');
    };
    TeacherProfileComponent.prototype.processFile = function (event) {
        this.formData = new FormData();
        var self = this;
        if (event.target.files && event.target.files[0]) {
            if (event.target.files[0].type !== 'image/png' && event.target.files[0].type !== 'image/jpeg' &&
                event.target.files[0].type !== 'image/jpg') {
                self.fileData = null;
                self.profileimage = '';
                // self.toasterService.error('error', 'Please select image only');
                return false;
            }
            var reader_1 = new FileReader();
            // self.filepath = event.target.files[0];
            // self.filename = event.target.files[0].name;
            this.formData.append('fileData', event.target.files[0], event.target.files[0].name);
            self.fileData = this.formData;
            reader_1.readAsDataURL(event.target.files[0]); // read file as data url
            reader_1.onload = function (e) {
                self.profileimage = reader_1.result;
                self.image = reader_1.result;
            };
            this.flag = true;
            // this.UploadImage();
        }
    };
    TeacherProfileComponent.prototype.UploadImage = function () {
        var _this = this;
        // this.apiService.uploadImage(this.fileData).subscribe(
        this.apiService.uploadImage(_shared_constant__WEBPACK_IMPORTED_MODULE_7__["TeacherAPIURLs"].UploadImage, this.fileData, null).subscribe(function (res) {
            if (res.status === 200) {
                _this.image = res.body.data;
                _this.updateProfile();
            }
        }, function (err) {
        });
    };
    TeacherProfileComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-teacher-profile',
            template: __webpack_require__(/*! ./teacher-profile.component.html */ "./src/app/layout/teacher/components/teacher-profile/teacher-profile.component.html"),
            styles: [__webpack_require__(/*! ./teacher-profile.component.css */ "./src/app/layout/teacher/components/teacher-profile/teacher-profile.component.css")]
        }),
        __metadata("design:paramtypes", [_shared_services_teacher_api_service_teacher_api_service__WEBPACK_IMPORTED_MODULE_2__["TeacherApiService"], _shared_services_error_handler_error_handler_service__WEBPACK_IMPORTED_MODULE_3__["ErrorHandlerService"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_5__["NgxSpinnerService"], _shared_services_notification_service_notification_service__WEBPACK_IMPORTED_MODULE_4__["NotificationService"],
            _shared_services_common_common_service__WEBPACK_IMPORTED_MODULE_6__["CommonService"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"], _angular_router__WEBPACK_IMPORTED_MODULE_9__["ActivatedRoute"]])
    ], TeacherProfileComponent);
    return TeacherProfileComponent;
}());



/***/ }),

/***/ "./src/app/layout/teacher/components/teacher-student-details/teacher-student-details.component.css":
/*!*********************************************************************************************************!*\
  !*** ./src/app/layout/teacher/components/teacher-student-details/teacher-student-details.component.css ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".guardianinfo .checkboxcustom {color: #333;}\r\n.guardianinfo .checkboxcustom input{width: 17px;height: 17px}\r\n.borderbtm {\r\n    border-bottom: 5px solid red;\r\n}\r\n.stud-details .nav-link {\r\n    border-radius: 10px 10px 0 0;\r\n}\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGF5b3V0L3RlYWNoZXIvY29tcG9uZW50cy90ZWFjaGVyLXN0dWRlbnQtZGV0YWlscy90ZWFjaGVyLXN0dWRlbnQtZGV0YWlscy5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLCtCQUErQixXQUFXLENBQUM7QUFDM0Msb0NBQW9DLFdBQVcsQ0FBQyxZQUFZO0FBRzVEO0lBQ0ksNEJBQTRCO0FBQ2hDO0FBQ0E7SUFDSSw0QkFBNEI7QUFDaEMiLCJmaWxlIjoic3JjL2FwcC9sYXlvdXQvdGVhY2hlci9jb21wb25lbnRzL3RlYWNoZXItc3R1ZGVudC1kZXRhaWxzL3RlYWNoZXItc3R1ZGVudC1kZXRhaWxzLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuZ3VhcmRpYW5pbmZvIC5jaGVja2JveGN1c3RvbSB7Y29sb3I6ICMzMzM7fVxyXG4uZ3VhcmRpYW5pbmZvIC5jaGVja2JveGN1c3RvbSBpbnB1dHt3aWR0aDogMTdweDtoZWlnaHQ6IDE3cHh9XHJcblxyXG5cclxuLmJvcmRlcmJ0bSB7XHJcbiAgICBib3JkZXItYm90dG9tOiA1cHggc29saWQgcmVkO1xyXG59XHJcbi5zdHVkLWRldGFpbHMgLm5hdi1saW5rIHtcclxuICAgIGJvcmRlci1yYWRpdXM6IDEwcHggMTBweCAwIDA7XHJcbn0iXX0= */"

/***/ }),

/***/ "./src/app/layout/teacher/components/teacher-student-details/teacher-student-details.component.html":
/*!**********************************************************************************************************!*\
  !*** ./src/app/layout/teacher/components/teacher-student-details/teacher-student-details.component.html ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"wrapper\">\r\n  <div class=\"container-fluid\">\r\n    <div class=\"pagetitle\">\r\n      <div>\r\n        <h2> <a [routerLink]=\"['../../../studentlist']\"> StudentList</a>\r\n          <span>/Student Details </span>\r\n        </h2>\r\n      </div>\r\n      <div>\r\n        <!-- <button type=\"submit\" class=\"btn btn-red\">Add Kid</button> -->\r\n      </div>\r\n    </div>\r\n    <div class=\"subhead d-flex justify-content-between studentInfo\">\r\n      <div>\r\n        <h3>{{StudentVm.studentName}}</h3>\r\n      </div>\r\n\r\n    </div>\r\n\r\n    <div class=\"row\">\r\n      <div class=\"col-lg-12\">\r\n        <div class=\"row mb-20\">\r\n          <div class=\"col-lg-2 col-sm-2\">\r\n            <div class=\"upload-profile\">\r\n              <div *ngIf=\"image != ''\">\r\n                <img src=\"{{image}}\" alt=\"\" class=\"img-fluid img-circle\">\r\n              </div>\r\n              <div *ngIf=\"image == ''\">\r\n                <img src=\"assets/img/boy.svg\" alt=\"\" class=\"img-circle childimg\">\r\n              </div>\r\n              <div class=\"upload-btn-wrapper\">\r\n                <button class=\"btn btn-send\">Upload a photo</button>\r\n                <input type=\"file\" #input (change)=\"processFile($event)\">\r\n                <!-- <input type=\"file\" name=\"myfile\" formControlName=\"photo\" /> -->\r\n              </div>\r\n            </div>\r\n            <div class=\"row mb-20\">\r\n              <div class=\"col-lg\">\r\n                <div class=\"form-group\">\r\n                  <div class=\"d-flex justify-content-between mt-20 subhead\">\r\n                    <div>\r\n                      <h3>Enrolled Classes </h3>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"innertable\">\r\n                    <div class=\"table-responsive\">\r\n                      <table class=\"table\">\r\n                        <thead class=\"thead-light\">\r\n                          <tr>\r\n                            <th scope=\"col\">Class Name</th>\r\n                          </tr>\r\n                        </thead>\r\n                        <tbody *ngIf=\"classList.length != 0\">\r\n                          <tr *ngFor=\"let class of classList\">\r\n                            <td>{{class.className}}</td>\r\n                          </tr>\r\n                        </tbody>\r\n                        <div class=\"text-center\">\r\n                          <span *ngIf=\"classList.length == 0 && !loader\">No record found</span>\r\n                        </div>\r\n                      </table>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-lg-10 col-sm-10\">\r\n            <ul class=\"nav nav-tabs stud-details\" id=\"myTab\" role=\"tablist\">\r\n              <li class=\"nav-item\">\r\n                <a class=\"nav-link active\" id=\"basicinfo-tab\" data-toggle=\"tab\" href=\"#basicinfo\" role=\"tab\"\r\n                  aria-controls=\"basicinfo\" aria-selected=\"true\">Basic Information</a>\r\n              </li>\r\n              <li class=\"nav-item\">\r\n                <a class=\"nav-link\" id=\"Gurardianinfo-tab\" data-toggle=\"tab\" href=\"#Gurardianinfo\" role=\"tab\"\r\n                  aria-controls=\"Gurardianinfo\" aria-selected=\"false\">Guardian Information</a>\r\n              </li>\r\n              <li class=\"nav-item\">\r\n                <a class=\"nav-link\" id=\"Allergies-tab\" data-toggle=\"tab\" href=\"#Allergies\" role=\"tab\"\r\n                  aria-controls=\"Allergies\" aria-selected=\"false\">Health Information</a>\r\n              </li>\r\n            </ul>\r\n            <div class=\"tab-content\" id=\"myTabContent\">\r\n              <div class=\"tab-pane fade show active\" id=\"basicinfo\" role=\"tabpanel\" aria-labelledby=\"basicinfo-tab\">\r\n                <!-- <form> -->\r\n                <div class=\"row mb-20 mt-20\">\r\n                  <div class=\"col-lg-4\">\r\n                    <div class=\"form-group\">\r\n                      <label for=\"\">First name</label>\r\n                      <input type=\"text \" class=\"form-control\" id=\"\" [(ngModel)]=\"StudentVm.firstName\"\r\n                        aria-describedby=\"\" placeholder=\"Enter First Name\" disabled>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"col-lg-4\">\r\n                    <div class=\"form-group\">\r\n                      <label for=\"\">Last name</label>\r\n                      <input type=\"text \" class=\"form-control\" [(ngModel)]=\"StudentVm.lastName\" id=\"\"\r\n                        aria-describedby=\"\" placeholder=\"Enter Last Name\" disabled>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"col-lg-4\">\r\n                    <div class=\"form-group\">\r\n                      <label for=\"\">Parent contact number</label>\r\n                      <input type=\"text \" class=\"form-control\" [(ngModel)]=\"StudentVm.ParentContactNumber\" id=\"\"\r\n                        aria-describedby=\"\" placeholder=\"Parent contact number\" disabled>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n\r\n                <div class=\"row mb-20\">\r\n\r\n                  <div class=\"col-lg-4\">\r\n                    <div class=\"form-group\">\r\n                      <label for=\"\">Child contact number</label>\r\n                      <input type=\"text \" class=\"form-control\" [(ngModel)]=\"StudentVm.ChildsContactNumber\" id=\"\"\r\n                        aria-describedby=\"\" placeholder=\"Child contact number\" disabled>\r\n                      <!-- <select class=\"form-control\" id=\"exampleFormControlSelect1\">\r\n  \r\n                        <option>Select Class</option>\r\n                        <option>Toddler </option>\r\n                        <option>Infant </option>\r\n                        <option>LKG </option>\r\n                        <option>UKG </option>\r\n                      </select> -->\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"col-lg-4\">\r\n                    <div class=\"form-group\">\r\n                      <label for=\"exampleFormControlSelect1\">Gender</label>\r\n                      <!-- <select class=\"form-control\" id=\"exampleFormControlSelect1\">\r\n                        <option>Boy</option>\r\n                        <option>Girl</option>\r\n                      </select> -->\r\n                      <input type=\"text \" class=\"form-control\" *ngIf=\"(!StudentVm.genderID)\" id=\"\" aria-describedby=\"\"\r\n                        placeholder=\"Gender\" disabled>\r\n                      <input type=\"text \" class=\"form-control\" *ngIf=\"(StudentVm.genderID == 2)\" [(ngModel)]=\"girl\"\r\n                        id=\"\" aria-describedby=\"\" placeholder=\"Gender\" disabled>\r\n                      <input type=\"text \" class=\"form-control\" *ngIf=\"(StudentVm.genderID == 1)\" [(ngModel)]=\"boy\" id=\"\"\r\n                        aria-describedby=\"\" placeholder=\"Gender\" disabled>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"col-lg-4\">\r\n                    <div class=\"form-group\">\r\n                      <label for=\"\">Date of Birth (mm/dd/yyyy)</label>\r\n                      <input type=\"text \" class=\"form-control\" [(ngModel)]=\"StudentVm.dateOfBirth\" aria-describedby=\"\"\r\n                        placeholder=\"DOB\" disabled>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n\r\n\r\n                <div class=\"row mb-20\">\r\n\r\n                </div>\r\n\r\n                <div class=\"row mb-20\">\r\n                </div>\r\n\r\n\r\n                <div class=\"row mb-20\">\r\n                  <div class=\"col-lg-4\">\r\n                    <div class=\"form-group\">\r\n                      <label for=\"\">Address</label>\r\n                      <input type=\"text \" class=\"form-control\" [(ngModel)]=\"StudentVm.address\" id=\"\" aria-describedby=\"\"\r\n                        placeholder=\"Address\" disabled>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"col-lg-4\">\r\n                    <div class=\"form-group\">\r\n                      <label for=\"exampleInputEmail1\">Apt/Suite</label>\r\n                      <input type=\"text \" class=\"form-control\" id=\"\" aria-describedby=\"\" placeholder=\"Apt/Suite\"\r\n                        disabled>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"col-lg-4\">\r\n                    <div class=\"form-group\">\r\n                      <label for=\"\">City</label>\r\n                      <input type=\"text \" class=\"form-control\" [(ngModel)]=\"StudentVm.cityName\" id=\"\"\r\n                        aria-describedby=\"\" placeholder=\" City Name\" disabled>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n\r\n\r\n                <div class=\"row mb-20\">\r\n\r\n                  <div class=\"col-lg-4\">\r\n                    <div class=\"form-group\">\r\n                      <label for=\"exampleFormControlSelect1\">State</label>\r\n                      <!-- <select class=\"form-control\" id=\"exampleFormControlSelect1\">\r\n  \r\n                        <option>Select State</option>\r\n                        <option>Alaska </option>\r\n                        <option>Arizona </option>\r\n                        <option>Arkansas </option>\r\n                        <option>California </option>\r\n                      </select> -->\r\n                      <input type=\"text \" class=\"form-control\" [(ngModel)]=\"StudentVm.stateName\" id=\"\"\r\n                        aria-describedby=\"\" placeholder=\"State Name\" disabled>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"col-lg-4\">\r\n                    <div class=\"form-group\">\r\n                      <label for=\"\">Zip Code</label>\r\n                      <input type=\"text\" class=\"form-control\" [(ngModel)]=\"StudentVm.postalCode\" id=\"\"\r\n                        aria-describedby=\"\" placeholder=\"Zip Code\" disabled>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"col-lg-4\">\r\n                    <div class=\"form-group\">\r\n                      <label for=\"exampleFormControlSelect1\">Country</label>\r\n                      <input type=\"text \" class=\"form-control\" [(ngModel)]=\"StudentVm.countryName\" id=\"\"\r\n                        aria-describedby=\"\" placeholder=\"Country\" disabled>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n\r\n\r\n                <div class=\"row mb-20\">\r\n\r\n\r\n                </div>\r\n\r\n                <div class=\"row mb-20\">\r\n                  <div class=\"col-lg-4\">\r\n                    <div class=\"form-group\">\r\n                      <label for=\"\">Physician name</label>\r\n                      <input type=\"text\" class=\"form-control\" [(ngModel)]=\"StudentVm.PhysicianName\" id=\"\"\r\n                        aria-describedby=\"\" placeholder=\"Physician name\" disabled>\r\n                    </div>\r\n                  </div>\r\n\r\n                  <div class=\"col-lg-4\">\r\n                    <div class=\"form-group\">\r\n                      <label for=\"\">Physician address</label>\r\n                      <input type=\"text\" class=\"form-control\" [(ngModel)]=\"StudentVm.PhysicianAddress\" id=\"\"\r\n                        aria-describedby=\"\" placeholder=\"Physician Address\" disabled>\r\n                    </div>\r\n                  </div>\r\n\r\n                  <div class=\"col-lg-4\">\r\n                    <div class=\"form-group\">\r\n                      <label for=\"exampleFormControlSelect1\">Preferred hospital</label>\r\n                      <input type=\"text \" class=\"form-control\" [(ngModel)]=\"StudentVm.PreferredHospital\" id=\"\"\r\n                        aria-describedby=\"\" placeholder=\"Preferred hospital\" disabled>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n\r\n                <div class=\"row mb-20\">\r\n                  <div class=\"col-lg-4\">\r\n                    <div class=\"form-group\">\r\n                      <label for=\"\">Child Start Date (mm/dd/yyyy)</label>\r\n                      <input type=\"text \" class=\"form-control\" [(ngModel)]=\"StudentVm.childStartDate\" aria-describedby=\"\"\r\n                        placeholder=\"Child start date\" disabled>\r\n                    </div>\r\n                  </div>\r\n\r\n                  <div class=\"col-lg-8\">\r\n                    <div class=\"form-group\">\r\n                      <label for=\"\">Child Note</label>\r\n                      <input type=\"text\" class=\"form-control\" [(ngModel)]=\"StudentVm.ChildNotes\" id=\"\"\r\n                        aria-describedby=\"\" placeholder=\"Child Note\" disabled>\r\n                    </div>\r\n                  </div>\r\n\r\n                </div>\r\n\r\n                <div class=\"modal-footer profileupdate\">\r\n                  <!-- <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button> -->\r\n                  <button type=\"button\" class=\"btn btn-primary\" (click)=\"SaveStudentDetails()\">Update Profile\r\n                    Picture</button>\r\n                </div>\r\n\r\n              </div>\r\n              <div class=\"tab-pane fade\" id=\"Gurardianinfo\" role=\"tabpanel\" aria-labelledby=\"Gurardianinfo-tab\">\r\n\r\n\r\n                <div class=\"d-flex justify-content-between mt-20 subhead\">\r\n                  <div>\r\n                    <h3>Guardian Information</h3>\r\n                  </div>\r\n                  <!-- <div>\r\n                  <button type=\"submit\" class=\"btn btn-send\"  data-toggle=\"modal\" data-target=\".guardianinfo\">Add Guardian</button>\r\n                </div> -->\r\n                </div>\r\n                <div class=\"innertable\">\r\n                  <div class=\"table-responsive\">\r\n                    <table class=\"table\">\r\n                      <thead class=\"thead-light\">\r\n                        <tr>\r\n                          <th scope=\"col\">First Name</th>\r\n                          <th scope=\"col\">Last Name</th>\r\n                          <th scope=\"col\">Relation</th>\r\n                          <th scope=\"col\">Phone No</th>\r\n                          <th scope=\"col\">Allow Pickup</th>\r\n                          <th scope=\"col\">View Details</th>\r\n                        </tr>\r\n                      </thead>\r\n                      <tbody *ngIf=\"guardianList.length != 0\">\r\n                        <tr *ngFor=\"let guardians of guardianList\">\r\n                          <td>{{guardians.firstName}} </td>\r\n                          <td>{{guardians.lastName}}</td>\r\n                          <td>{{guardians.relationTypeName}}</td>\r\n                          <td> {{guardians.mobile}}</td>\r\n                          <td *ngIf=\"guardians.isAuthorizedToPickup == false\">No</td>\r\n                          <td *ngIf=\"guardians.isAuthorizedToPickup == true\">Yes</td>\r\n                          <td class=\"text-center\">\r\n                            <a data-toggle=\"modal\" data-target=\".guardianinfo\" (click)=\"getAllGuardianInfo(guardians)\">\r\n                              <i class=\"fa fa-eye \" aria-hidden=\"true\" title=\"view details\"></i>\r\n                            </a>\r\n                          </td>\r\n                        </tr>\r\n\r\n                      </tbody>\r\n                    </table>\r\n                    <div class=\"text-center\">\r\n                      <span *ngIf=\"guardianList.length == 0 && !loader\">No record found</span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"tab-pane fade\" id=\"Allergies\" role=\"tabpanel\" aria-labelledby=\"Allergies-tab\">\r\n\r\n                <div class=\"d-flex justify-content-between mt-20 subhead\">\r\n                  <div>\r\n                    <h3>Immunization</h3>\r\n                  </div>\r\n                  <!-- <div>\r\n                  <button type=\"submit\" class=\"btn btn-send\"  data-toggle=\"modal\" data-target=\".immunization\">Add Immunization</button>\r\n                </div> -->\r\n                </div>\r\n                <div class=\"innertable\">\r\n                  <div class=\"table-responsive\">\r\n                    <table class=\"table\">\r\n                      <thead class=\"thead-light\">\r\n                        <tr>\r\n                          <th scope=\"col\">Immunization</th>\r\n                          <th scope=\"col\">Date Received</th>\r\n                          <th scope=\"col\">Other Immunization</th>\r\n                          <th scope=\"col\">Abbreviation</th>\r\n                          <!-- <th scope=\"col\">Actions</th> -->\r\n                        </tr>\r\n                      </thead>\r\n                      <tbody *ngIf=\"immunizationList.length != 0\">\r\n                        <tr *ngFor=\"let immunizetion of immunizationList\">\r\n                          <td>{{immunizetion.immunizationName}}</td>\r\n                          <td>{{immunizetion.dateReceived| date}}</td>\r\n                          <td>{{immunizetion.otherImmunization}}</td>\r\n                          <td>{{immunizetion.abbreviation}}</td>\r\n                        </tr>\r\n\r\n                      </tbody>\r\n                    </table>\r\n                    <div class=\"text-center\">\r\n                      <span *ngIf=\"immunizationList.length == 0 && !loader\">No record found</span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n\r\n\r\n\r\n                <div class=\"d-flex justify-content-between mt-20 subhead\">\r\n                  <div>\r\n                    <h3>Allergies</h3>\r\n                  </div>\r\n                  <!-- <div>\r\n                  <button type=\"submit\" class=\"btn btn-send\"  data-toggle=\"modal\" data-target=\".allergies\">Add Allergies</button>\r\n                </div> -->\r\n                </div>\r\n\r\n                <div class=\"innertable\">\r\n                  <div class=\"table-responsive\">\r\n                    <table class=\"table\">\r\n                      <thead class=\"thead-light\">\r\n                        <tr>\r\n                          <th scope=\"col\">Allergy</th>\r\n                          <th scope=\"col\">Allergy Name</th>\r\n                          <th scope=\"col\">Reaction</th>\r\n                          <th scope=\"col\">Treatement</th>\r\n                          <th scope=\"col\">Actions</th>\r\n                        </tr>\r\n                      </thead>\r\n                      <tbody *ngIf=\"allergyList.length != 0\">\r\n                        <tr *ngFor=\"let allergies of allergyList\">\r\n                          <td>{{allergies.allergyTypeName}}</td>\r\n                          <td>{{allergies.allergyName}}</td>\r\n                          <td>{{allergies.allergyReactionTypeName}} </td>\r\n                          <td> {{allergies.treatment}}</td>\r\n                          <td class=\"text-center\">\r\n                            <a data-toggle=\"modal\" data-target=\".allergies\" (click)=\"getAllergyDetails(allergies)\">\r\n                              <i class=\"fa fa-eye\" aria-hidden=\"true\" title=\"view details\"></i>\r\n                            </a>\r\n                            <!-- <a href=\"\">\r\n                            <i class=\"fa fa-pencil\" aria-hidden=\"true\"></i>\r\n                          </a>\r\n                          <a href=\"\">\r\n                            <i class=\"fa fa-trash\" aria-hidden=\"true\"></i>\r\n                          </a> -->\r\n                          </td>\r\n                        </tr>\r\n                      </tbody>\r\n                    </table>\r\n                    <div class=\"text-center\">\r\n                      <span *ngIf=\"allergyList.length == 0 && !loader\">No record found</span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <div class=\"d-flex justify-content-between mt-20 subhead\">\r\n                  <div>\r\n                    <h3>Medication</h3>\r\n                  </div>\r\n                  <!-- <div>\r\n                  <button type=\"submit\" class=\"btn btn-send\"  data-toggle=\"modal\" data-target=\".medication\">Add Medication</button>\r\n                </div> -->\r\n                </div>\r\n\r\n\r\n                <div class=\"innertable\">\r\n                  <div class=\"table-responsive\">\r\n                    <table class=\"table\">\r\n                      <thead class=\"thead-light\">\r\n                        <tr>\r\n                          <th scope=\"col\">Medication</th>\r\n                          <th scope=\"col\">Strength</th>\r\n                          <th scope=\"col\">Units</th>\r\n                          <th scope=\"col\">Dose</th>\r\n                          <th scope=\"col\">How Taken?</th>\r\n                          <th scope=\"col\">Other Medication</th>\r\n                          <th scope=\"col\">Actions</th>\r\n                        </tr>\r\n                      </thead>\r\n                      <tbody *ngIf=\"medicationList.length != 0\">\r\n                        <tr *ngFor=\"let medication of medicationList\">\r\n                          <td>{{medication.medicationName}}</td>\r\n                          <td class=\"text-center\">{{medication.strength}}</td>\r\n                          <td class=\"text-center\">{{medication.units}} </td>\r\n                          <td class=\"text-center\">{{medication.doseRepeatName}}</td>\r\n                          <td class=\"text-center\">{{medication.howTaken}}</td>\r\n                          <td class=\"text-center\">{{medication.otherMedication}}</td>\r\n                          <td class=\"text-center\">\r\n                            <a data-toggle=\"modal\" data-target=\".medication\" (click)=\"getMedicationDetails(medication)\">\r\n                              <i class=\"fa fa-eye text-center\" aria-hidden=\"true\" title=\"view details\"></i>\r\n                            </a>\r\n                            <!-- <a href=\"\">\r\n                            <i class=\"fa fa-pencil\" aria-hidden=\"true\"></i>\r\n                          </a>\r\n                          <a href=\"\">\r\n                            <i class=\"fa fa-trash\" aria-hidden=\"true\"></i>\r\n                          </a> -->\r\n                          </td>\r\n                        </tr>\r\n\r\n                      </tbody>\r\n                    </table>\r\n                    <div class=\"text-center\">\r\n                      <span *ngIf=\"medicationList.length == 0 && !loader\">No record found</span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n\r\n                <div class=\"d-flex justify-content-between mt-20 subhead\">\r\n                  <div>\r\n                    <h3>Disability</h3>\r\n                  </div>\r\n                  <!-- <div>\r\n                  <button type=\"submit\" class=\"btn btn-send\"  data-toggle=\"modal\" data-target=\".medication\">Add Medication</button>\r\n                </div> -->\r\n                </div>\r\n                <div class=\"innertable\">\r\n                  <div class=\"table-responsive\">\r\n                    <table class=\"table\">\r\n                      <thead class=\"thead-light\">\r\n                        <tr>\r\n                          <th scope=\"col\">Description</th>\r\n                        </tr>\r\n                      </thead>\r\n                      <tbody *ngIf=\"disabilityList.length != 0\">\r\n                        <tr *ngFor=\"let disabilty of disabilityList\">\r\n                          <td>{{disabilty.description}}</td>\r\n                          <!-- <a data-toggle=\"modal\" data-target=\".medication\" (click)=\"getMedicationDetails(medication)\">\r\n                            <i class=\"fa fa-eye text-center\" aria-hidden=\"true\" title=\"view details\"></i>\r\n                          </a> -->\r\n                        </tr>\r\n\r\n                      </tbody>\r\n                      <div class=\"text-center\">\r\n                        <span *ngIf=\"disabilityList.length == 0 && !loader\">No record found</span>\r\n                      </div>\r\n                    </table>\r\n                  </div>\r\n                </div>\r\n\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n\r\n      </div>\r\n    </div>\r\n\r\n\r\n    <!-- imminization -->\r\n    <div class=\"modal fade immunization\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myLargeModalLabel\"\r\n      aria-hidden=\"true\">\r\n      <div class=\"modal-dialog modal-lg\">\r\n        <div class=\"modal-content\">\r\n          <div class=\"modal-header\">\r\n            <h5 class=\"modal-title\" id=\"exampleModalLongTitle\">View Immunization</h5>\r\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n              <span aria-hidden=\"true\">&times;</span>\r\n            </button>\r\n          </div>\r\n          <div class=\"modal-body\">\r\n            <!-- <form> -->\r\n            <div class=\"row mb-20 mt-20\">\r\n              <div class=\"col-lg-6\">\r\n                <div class=\"form-group\">\r\n                  <label for=\"\">Immunization</label>\r\n                  <input type=\"text \" class=\"form-control\" [(ngModel)]=\"immunizationName\" immunizationNameid=\"\"\r\n                    aria-describedby=\"\" placeholder=\"Immunization\" disabled>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-lg-6\">\r\n                <div class=\"form-group\">\r\n                  <label for=\"\">Date Received</label>\r\n                  <input type=\"date \" class=\"form-control\" [(ngModel)]=\"immunizationDateRecived\" id=\"\"\r\n                    aria-describedby=\"\" placeholder=\"Select Date\" disabled>\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n\r\n            <div class=\"row mb-20\">\r\n              <div class=\"col-lg-6\">\r\n                <div class=\"form-group\">\r\n                  <label for=\"\">Other Immunization</label>\r\n                  <input type=\"text \" class=\"form-control\" [(ngModel)]=\"otherImmunization\" id=\"\" aria-describedby=\"\"\r\n                    placeholder=\"Other Immunization\" disabled>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-lg-6\">\r\n                <div class=\"form-group\">\r\n                  <label for=\"\">Abbreviation </label>\r\n                  <input type=\"text \" class=\"form-control\" [(ngModel)]=\"abbreviation\" id=\"\" aria-describedby=\"\"\r\n                    placeholder=\"Abbreviation\" disabled>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <!-- </form> -->\r\n          </div>\r\n          <!-- <div class=\"modal-footer\">\r\n          <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\r\n          <button type=\"button\" class=\"btn btn-primary\">Add</button>\r\n        </div> -->\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n    <!-- allergies -->\r\n\r\n\r\n    <div class=\"modal fade allergies\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myLargeModalLabel\"\r\n      aria-hidden=\"true\">\r\n      <div class=\"modal-dialog modal-lg\">\r\n        <div class=\"modal-content\">\r\n          <div class=\"modal-header\">\r\n            <h5 class=\"modal-title\" id=\"exampleModalLongTitle\">View Allergies</h5>\r\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n              <span aria-hidden=\"true\">&times;</span>\r\n            </button>\r\n          </div>\r\n          <div class=\"modal-body\">\r\n            <!-- <form> -->\r\n            <div class=\"row mb-20 mt-20\">\r\n              <div class=\"col-lg-6\">\r\n                <div class=\"form-group\">\r\n                  <label for=\"\">Allergy</label>\r\n                  <input type=\"text \" class=\"form-control\" [(ngModel)]=\"allergyTypeName\" id=\"\" aria-describedby=\"\"\r\n                    placeholder=\"Enter Reaction\" disabled>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-lg-6\">\r\n                <div class=\"form-group\">\r\n                  <label for=\"\">Allergy Name</label>\r\n                  <input type=\"text \" class=\"form-control\" [(ngModel)]=\"allergyName\" id=\"\" aria-describedby=\"\"\r\n                    placeholder=\"Enter Reaction\" disabled>\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n            <div class=\"row mb-20\">\r\n              <div class=\"col-lg-6\">\r\n                <div class=\"form-group\">\r\n                  <label for=\"\">Reaction</label>\r\n                  <input type=\"text \" class=\"form-control\" [(ngModel)]=\"reaction\" id=\"\" aria-describedby=\"\"\r\n                    placeholder=\"Enter Reaction\" disabled>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-lg-6\">\r\n                <div class=\"form-group\">\r\n                  <label for=\"\">Treatment </label>\r\n                  <input type=\"text \" class=\"form-control\" [(ngModel)]=\"treatment\" id=\"\" aria-describedby=\"\"\r\n                    placeholder=\"Enter Treatment\" disabled>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <!-- </form> -->\r\n          </div>\r\n          <!-- <div class=\"modal-footer\">\r\n          <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\r\n          <button type=\"button\" class=\"btn btn-primary\">Add</button>\r\n        </div> -->\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n    <!-- MEdication -->\r\n    <div class=\"modal fade medication\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myLargeModalLabel\"\r\n      aria-hidden=\"true\">\r\n      <div class=\"modal-dialog modal-lg\">\r\n        <div class=\"modal-content\">\r\n          <div class=\"modal-header\">\r\n            <h5 class=\"modal-title\" id=\"exampleModalLongTitle\">View Medication</h5>\r\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n              <span aria-hidden=\"true\">&times;</span>\r\n            </button>\r\n          </div>\r\n          <div class=\"modal-body\">\r\n            <!-- <form> -->\r\n            <div class=\"row mb-20 mt-20\">\r\n              <div class=\"col-lg-6\">\r\n                <div class=\"form-group\">\r\n                  <label for=\"\">Medication</label>\r\n                  <input type=\"text \" class=\"form-control\" [(ngModel)]=\"medicationName\" id=\"\" aria-describedby=\"\"\r\n                    placeholder=\"Medication Name\" disabled>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-lg-6\">\r\n                <div class=\"form-group\">\r\n                  <label for=\"\">Strength</label>\r\n                  <input type=\"text \" class=\"form-control\" [(ngModel)]=\"strength\" id=\"\" aria-describedby=\"\"\r\n                    placeholder=\"Enter Strength\" disabled>\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n\r\n            <div class=\"row mb-20\">\r\n              <div class=\"col-lg-6\">\r\n                <div class=\"form-group\">\r\n                  <label for=\"\">Units</label>\r\n                  <input type=\"text \" class=\"form-control\" [(ngModel)]=\"units\" id=\"\" aria-describedby=\"\"\r\n                    placeholder=\"Enter Unit\" disabled>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-lg-6\">\r\n                <div class=\"form-group\">\r\n                  <label for=\"\">Dose </label>\r\n                  <input type=\"text \" class=\"form-control\" id=\"\" [(ngModel)]=\"dose\" aria-describedby=\"\"\r\n                    placeholder=\"Enter Dose\" disabled>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"row mb-20\">\r\n              <div class=\"col-lg-6\">\r\n                <div class=\"form-group\">\r\n                  <label for=\"\">How Taken?</label>\r\n                  <input type=\"text \" class=\"form-control\" [(ngModel)]=\"hoeToTake\" id=\"\" aria-describedby=\"\"\r\n                    placeholder=\"Enter How Taken?\" disabled>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-lg-6\">\r\n                <div class=\"form-group\">\r\n                  <label for=\"\">Other Medication </label>\r\n                  <input type=\"text \" class=\"form-control\" [(ngModel)]=\"otherMedication\" id=\"\" aria-describedby=\"\"\r\n                    placeholder=\"Other Medication\" disabled>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <!-- </form> -->\r\n          </div>\r\n          <!-- <div class=\"modal-footer\">\r\n          <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\r\n          <button type=\"button\" class=\"btn btn-primary\">Add</button>\r\n        </div> -->\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n\r\n    <!-- guardian info -->\r\n    <div class=\"modal fade guardianinfo\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myLargeModalLabel\"\r\n      aria-hidden=\"true\">\r\n      <div class=\"modal-dialog modal-lg\">\r\n        <div class=\"modal-content\">\r\n          <div class=\"modal-header\">\r\n            <h5 class=\"modal-title\" id=\"exampleModalLongTitle\">Guardian Details</h5>\r\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n              <span aria-hidden=\"true\">&times;</span>\r\n            </button>\r\n          </div>\r\n          <div class=\"modal-body\">\r\n\r\n            <!-- <form> -->\r\n            <div class=\"row mb-20 mt-20\">\r\n              <div class=\"col-lg-6\">\r\n                <div class=\"form-group\">\r\n                  <label for=\"\">First name</label>\r\n                  <input type=\"text \" class=\"form-control\" [(ngModel)]=\"this.guardianDetailsVm.firstName\" id=\"\"\r\n                    aria-describedby=\"\" placeholder=\"Enter First Name\" disabled>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-lg-6\">\r\n                <div class=\"form-group\">\r\n                  <label for=\"\">Last name</label>\r\n                  <input type=\"text \" class=\"form-control\" id=\"\" [(ngModel)]=\"this.guardianDetailsVm.lastName\"\r\n                    aria-describedby=\"\" placeholder=\"Enter Last Name\" disabled>\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n            <div class=\"row mb-20\">\r\n              <div class=\"col-lg-6\">\r\n                <div class=\"form-group\">\r\n                  <label for=\"\">Relation</label>\r\n                  <input type=\"text \" class=\"form-control\" id=\"\" [(ngModel)]=\"relation\" aria-describedby=\"\"\r\n                    placeholder=\"Enter Relation\" disabled>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-lg-6\">\r\n                <div class=\"form-group\">\r\n                  <label for=\"\">Phone number</label>\r\n                  <input type=\"text \" class=\"form-control\" id=\"\" [(ngModel)]=\"this.guardianDetailsVm.mobile\"\r\n                    aria-describedby=\"\" placeholder=\"Enter Phone number\" disabled>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-lg-6\" *ngIf=\"!showResonFieldNotAllowed\">\r\n                <div class=\"form-group\">\r\n                  <label for=\"\">Reason for irresponsibility for check in & check out </label>\r\n                  <textarea name=\"\" class=\"form-control\" id=\"\" placeholder=\"Reason\" cols=\"30\" rows=\"10\"></textarea>\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n            <!-- <label class=\"checkboxcustom\">\r\n              <input type=\"checkbox\" checked=\"checked\">\r\n              <span class=\"checkmark\"></span>Make Responsible for Check-in & Check-out\r\n            </label> -->\r\n            <!-- </form> -->\r\n          </div>\r\n          <!-- <div class=\"modal-footer\">\r\n          <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\r\n          <button type=\"button\" class=\"btn btn-primary\">Add</button>\r\n        </div> -->\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <!-- <div class=\"d-flex justify-content-between mt-20 subhead\"><div><h3>Kids List</h3></div> </div> -->\r\n  </div>\r\n  <ngx-spinner type=\"ball-atom\" size=\"medium\" color=\"#58A7FE\"></ngx-spinner>\r\n</div>"

/***/ }),

/***/ "./src/app/layout/teacher/components/teacher-student-details/teacher-student-details.component.ts":
/*!********************************************************************************************************!*\
  !*** ./src/app/layout/teacher/components/teacher-student-details/teacher-student-details.component.ts ***!
  \********************************************************************************************************/
/*! exports provided: TeacherStudentDetailsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TeacherStudentDetailsComponent", function() { return TeacherStudentDetailsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_services_teacher_api_service_teacher_api_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/services/teacher-api-service/teacher-api.service */ "./src/app/layout/teacher/shared/services/teacher-api-service/teacher-api.service.ts");
/* harmony import */ var _shared_services_error_handler_error_handler_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../shared/services/error-handler/error-handler.service */ "./src/app/shared/services/error-handler/error-handler.service.ts");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var _shared_services_notification_service_notification_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../shared/services/notification-service/notification.service */ "./src/app/shared/services/notification-service/notification.service.ts");
/* harmony import */ var _shared_services_common_common_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../shared/services/common/common.service */ "./src/app/shared/services/common/common.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared_constant__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../shared/constant */ "./src/app/layout/teacher/shared/constant.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var TeacherStudentDetailsComponent = /** @class */ (function () {
    function TeacherStudentDetailsComponent(apiService, error, spinner, notification, commonService, route) {
        this.apiService = apiService;
        this.error = error;
        this.spinner = spinner;
        this.notification = notification;
        this.commonService = commonService;
        this.route = route;
        this.studentDetailsList = [];
        this.StudentVm = {};
        this.guardianDetailsVm = {};
        this.guardianList = [];
        this.girl = 'Girl';
        this.boy = 'Boy';
        this.sectionName = 'A';
        this.allergyList = [];
        this.immunizationList = [];
        this.medicationList = [];
        this.disabilityList = [];
        this.classList = [];
        this.allergyName = '';
        this.allergyTypeName = '';
        this.reaction = '';
        this.treatment = '';
        this.medicationName = '';
        this.strength = '';
        this.units = '';
        this.dose = '';
        this.loader = true;
        this.hoeToTake = 'After Meal';
        this.otherMedication = 'No';
        this.immunizationName = '';
        this.otherImmunization = '';
        this.abbreviation = '';
        this.isimageSelected = false;
    }
    TeacherStudentDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.spinner.show();
        this.showResonFieldNotAllowed = false;
        this.route.params.subscribe(function (params) {
            _this.id = params['id'];
            _this.parentId = params['parentid'];
        });
        this.getStudentDetails();
    };
    TeacherStudentDetailsComponent.prototype.processFile = function (event) {
        this.formData = new FormData();
        var self = this;
        if (event.target.files && event.target.files[0]) {
            if (event.target.files[0].type !== 'image/png' && event.target.files[0].type !== 'image/jpeg' &&
                event.target.files[0].type !== 'image/jpg') {
                self.fileData = null;
                self.profileimage = '';
                // self.toasterService.error('error', 'Please select image only');
                return false;
            }
            var reader_1 = new FileReader();
            this.formData.append('fileData', event.target.files[0], event.target.files[0].name);
            self.fileData = this.formData;
            reader_1.readAsDataURL(event.target.files[0]); // read file as data url
            reader_1.onload = function (e) {
                self.profileimage = reader_1.result;
                self.image = reader_1.result;
            };
        }
        this.isimageSelected = true;
    };
    TeacherStudentDetailsComponent.prototype.UploadImage = function () {
        var _this = this;
        // this.apiService.uploadImage(this.fileData).subscribe(
        this.apiService.uploadImage(_shared_constant__WEBPACK_IMPORTED_MODULE_7__["TeacherAPIURLs"].UploadImage, this.fileData, null).subscribe(function (res) {
            if (res.status === 200) {
                _this.image = res.body.data;
                _this.updateProfile();
            }
        }, function (err) {
        });
    };
    TeacherStudentDetailsComponent.prototype.SaveStudentDetails = function () {
        if (this.isimageSelected === true) {
            this.UploadImage();
            this.isimageSelected = false;
        }
        else {
            this.updateProfile();
        }
    };
    TeacherStudentDetailsComponent.prototype.updateProfile = function () {
        var _this = this;
        if (this.image) {
            this.spinner.show();
            var modal = {
                'StudentId': this.StudentVm.id,
                'AgencyID': this.commonService.getAgencyId(),
                'ImagePath': this.image
            };
            this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_7__["TeacherAPIURLs"].UpdateStudentProfilePicByTeacher, modal, null).subscribe(function (res) {
                if (res.body.statusCode === 200) {
                    //  this.spinner.hide();
                    _this.notification.success({ message: 'Profile picture updated successfully', title: '' });
                    _this.getStudentDetails();
                }
                else {
                    _this.spinner.hide();
                    _this.error.unknownError();
                }
            }, function (err) {
                _this.spinner.hide();
                _this.error.commonError(err);
            });
        }
        else {
            this.spinner.hide();
            this.notification.warning({ message: 'Somthing went wrong', title: 'Please Try Again' });
        }
    };
    TeacherStudentDetailsComponent.prototype.getStudentDetails = function () {
        var _this = this;
        this.loader = true;
        var data = {
            'agencyID': this.commonService.getAgencyId(),
            'studentID': this.id,
            'ParentID': this.parentId
        };
        this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_7__["TeacherAPIURLs"].GetStudentInformation, data, null).subscribe(function (res) {
            if (res.body.statusCode === 200) {
                if (res.body.data) {
                    console.log(res.body.data, 'd');
                    _this.studentDetailsList = res.body.data;
                    _this.StudentVm.firstName = res.body.data.firstName;
                    _this.StudentVm.lastName = res.body.data.lastName;
                    _this.StudentVm.className = res.body.data.className;
                    _this.StudentVm.countryName = res.body.data.countryName;
                    _this.StudentVm.stateName = res.body.data.address;
                    _this.StudentVm.dateOfBirth = _this.commonService.GetFormattedDate(res.body.data.dateOfBirth);
                    _this.StudentVm.postalCode = res.body.data.postalCode;
                    _this.StudentVm.imagePath = res.body.data.imagePath;
                    _this.image = res.body.data.imagePath;
                    _this.StudentVm.id = res.body.data.studentId;
                    _this.StudentVm.genderID = res.body.data.genderID;
                    _this.StudentVm.address = res.body.data.address;
                    _this.StudentVm.cityName = res.body.data.cityName;
                    _this.StudentVm.stateName = res.body.data.stateName;
                    _this.StudentVm.studentName = res.body.data.studentName;
                    _this.allergyList = res.body.data.studentAllergies;
                    _this.immunizationList = res.body.data.studentImmunizations;
                    _this.medicationList = res.body.data.studentMedications;
                    _this.disabilityList = res.body.data.studentDisabilities;
                    _this.classList = res.body.data.enrolledClassesInformation;
                    _this.StudentVm.PhysicianName = res.body.data.physicianName;
                    _this.StudentVm.ChildNotes = res.body.data.childNotes;
                    _this.StudentVm.PhysicianAddress = res.body.data.physicianAddress;
                    if (res.body.data.childStartDate == null) {
                        _this.StudentVm.childStartDate = '';
                    }
                    else {
                        _this.StudentVm.childStartDate = _this.commonService.GetFormattedDate(res.body.data.childStartDate);
                    }
                    _this.StudentVm.PreferredHospital = res.body.data.preferredHospital;
                    _this.StudentVm.ParentContactNumber = res.body.data.parentContactNumber;
                    _this.StudentVm.ChildsContactNumber = res.body.data.childsContactNumber;
                    _this.guardianList = res.body.data.guardians;
                    _this.spinner.hide();
                    _this.loader = false;
                }
                else {
                    _this.spinner.hide();
                }
            }
            else {
                _this.spinner.hide();
                _this.error.unknownError();
            }
        }, function (err) {
            _this.spinner.hide();
            _this.error.commonError(err);
        });
    };
    /**Method not in used */
    TeacherStudentDetailsComponent.prototype.getGuardianInfo = function () {
        var _this = this;
        this.loader = true;
        this.spinner.show();
        var req = {
            'studentID': this.StudentVm.id,
            'agencyID': this.commonService.getAgencyId(),
            'isAuthorized': true
        };
        this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_7__["TeacherAPIURLs"].GetAllGuardiansForStudents, req, null).subscribe(function (res) {
            if (res.body.statusCode === 200) {
                _this.spinner.hide();
                _this.guardianList = res.body.data;
                _this.loader = false;
            }
            else {
                _this.spinner.hide();
                _this.error.unknownError();
            }
        }, function (err) {
            _this.spinner.hide();
            _this.error.commonError(err);
        });
    };
    TeacherStudentDetailsComponent.prototype.getAllGuardianInfo = function (data) {
        this.showResonFieldNotAllowed = data.isAuthorizedToPickup;
        this.guardianDetailsVm.firstName = data.firstName;
        this.guardianDetailsVm.lastName = data.lastName;
        this.guardianDetailsVm.mobile = data.mobile;
        // this.guardianDetailsVm.RelationTypeName = data.RelationTypeName;
        //  if (data.relationTypeId === 1) {
        //   this.relation = 'Father';
        //  } else if (data.relationTypeId === 2) {
        //   this.relation = 'Mother';
        //  } else if (data.relationTypeId === 3) {
        //   this.relation = 'Uncle';
        //  } else if (data.relationTypeId === 4) {
        //   this.relation = 'Brother';
        //  } else if (data.relationTypeId === 5) {
        //   this.relation = 'Aunt';
        //  } else {
        //   this.relation = '';
        //  }
        this.relation = data.relationTypeName;
    };
    TeacherStudentDetailsComponent.prototype.getAllergyDetails = function (data) {
        this.allergyName = data.allergyName;
        this.reaction = data.allergyReactionTypeName;
        this.allergyTypeName = data.allergyTypeName;
    };
    TeacherStudentDetailsComponent.prototype.getImmunizationDetails = function (data) {
        this.immunizationName = data.immunizationName;
        this.immunizationDateRecived = data.immunizationDateRecived,
            this.otherImmunization = data.otherImmunization,
            this.abbreviation = data.abbreviation;
    };
    TeacherStudentDetailsComponent.prototype.getMedicationDetails = function (data) {
        this.medicationName = data.medicationName;
        this.strength = data.strength,
            this.units = data.units,
            this.dose = data.doses;
    };
    TeacherStudentDetailsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-teacher-student-details',
            template: __webpack_require__(/*! ./teacher-student-details.component.html */ "./src/app/layout/teacher/components/teacher-student-details/teacher-student-details.component.html"),
            styles: [__webpack_require__(/*! ./teacher-student-details.component.css */ "./src/app/layout/teacher/components/teacher-student-details/teacher-student-details.component.css")]
        }),
        __metadata("design:paramtypes", [_shared_services_teacher_api_service_teacher_api_service__WEBPACK_IMPORTED_MODULE_1__["TeacherApiService"], _shared_services_error_handler_error_handler_service__WEBPACK_IMPORTED_MODULE_2__["ErrorHandlerService"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_3__["NgxSpinnerService"], _shared_services_notification_service_notification_service__WEBPACK_IMPORTED_MODULE_4__["NotificationService"],
            _shared_services_common_common_service__WEBPACK_IMPORTED_MODULE_5__["CommonService"], _angular_router__WEBPACK_IMPORTED_MODULE_6__["ActivatedRoute"]])
    ], TeacherStudentDetailsComponent);
    return TeacherStudentDetailsComponent;
}());



/***/ }),

/***/ "./src/app/layout/teacher/components/teacher-student-list/teacher-student-list.component.css":
/*!***************************************************************************************************!*\
  !*** ./src/app/layout/teacher/components/teacher-student-list/teacher-student-list.component.css ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".fa-eye {\r\n    margin-left: 22px\r\n}\r\n.subhead {\r\n    padding: 15px 20px;\r\n}\r\n.subbhead h3 {\r\n    margin-bottom: 10px;\r\n}\r\n.form-control {\r\n    margin-bottom: 10px;\r\n}\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGF5b3V0L3RlYWNoZXIvY29tcG9uZW50cy90ZWFjaGVyLXN0dWRlbnQtbGlzdC90ZWFjaGVyLXN0dWRlbnQtbGlzdC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0k7QUFDSjtBQUNBO0lBQ0ksa0JBQWtCO0FBQ3RCO0FBQ0E7SUFDSSxtQkFBbUI7QUFDdkI7QUFDQTtJQUNJLG1CQUFtQjtBQUN2QiIsImZpbGUiOiJzcmMvYXBwL2xheW91dC90ZWFjaGVyL2NvbXBvbmVudHMvdGVhY2hlci1zdHVkZW50LWxpc3QvdGVhY2hlci1zdHVkZW50LWxpc3QuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5mYS1leWUge1xyXG4gICAgbWFyZ2luLWxlZnQ6IDIycHhcclxufVxyXG4uc3ViaGVhZCB7XHJcbiAgICBwYWRkaW5nOiAxNXB4IDIwcHg7XHJcbn1cclxuLnN1YmJoZWFkIGgzIHtcclxuICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XHJcbn1cclxuLmZvcm0tY29udHJvbCB7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xyXG59Il19 */"

/***/ }),

/***/ "./src/app/layout/teacher/components/teacher-student-list/teacher-student-list.component.html":
/*!****************************************************************************************************!*\
  !*** ./src/app/layout/teacher/components/teacher-student-list/teacher-student-list.component.html ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"wrapper\">\r\n  <div class=\"container-fluid\">\r\n\r\n    <div class=\"pagetitle\">\r\n      <div>\r\n        <h2>Student\r\n          <!-- <span>/ Student </span> -->\r\n        </h2>\r\n      </div>\r\n    </div>\r\n    <div class=\"subhead d-flex justify-content-between mt-20\">\r\n      <div>\r\n        <h3>Enrolled Students List</h3>\r\n      </div>\r\n    </div>\r\n    <div class=\"card cardfilter\">\r\n      <!-- <div class=\"col-lg-10\"> -->\r\n         <div class=\"leftfilter\">\r\n        <div class=\"row algcenter\">\r\n          <div class=\"search-date\">\r\n            <div class=\"pr15 label-text\">Search Name : </div>\r\n            <input type=\"text\" placeholder=\"Search student name\" [(ngModel)]=\"searchByStudentName\" class=\"form-control mr15\" id=\"\">\r\n          </div>\r\n          <div class=\"search-class\">\r\n          <div class=\"pr15 label-text\"> Search Class : </div>\r\n          <div class=\"pr15\">\r\n            <div class=\"form-group\">\r\n              <select class=\"form-control\" placeholder=\"Serch\" [(ngModel)]=\"searchByClass\" (change)=\"getSerchClass($event)\" id=\"exampleFormControlSelect1\">\r\n                <option value=\"\">All</option>\r\n                <option *ngFor=\"let classes of classList\" [value]=\"classes.classesID\">{{classes.className}}</option>\r\n              </select>\r\n            </div>\r\n          </div>\r\n        </div>\r\n          <div class=\"filter-buttons\">\r\n            <button type=\"submit\" class=\"btn btn-send\" (click)=\"getStudentsList()\">Search</button>\r\n          </div>\r\n      </div> \r\n    </div>\r\n\r\n    <div class=\"studentlist\">\r\n      <div class=\"tab-content\" id=\"pills-tabContent\">\r\n        <div class=\"tab-pane fade show active\" id=\"pills-appstudent\" role=\"tabpanel\" aria-labelledby=\"appStudent\">\r\n\r\n          <div class=\"innertable studentListSearch\">\r\n            <div class=\"table-responsive\">\r\n              <table class=\"table \">\r\n                <thead class=\"thead-light\">\r\n                  <tr>\r\n                    <th>Photo</th>\r\n                    <th scope=\"col\">Student Name</th>\r\n                    <th scope=\"col\">Parent Name</th>\r\n                    <th scope=\"col\">Class Name</th>\r\n                    <th scope=\"col\">Actions</th>\r\n                  </tr>\r\n                </thead>\r\n                <tbody *ngIf=\"studentList.length != 0\">\r\n                  <tr *ngFor=\"let students of studentList\">\r\n                    <td >\r\n                      <img src=\"{{students.imagePath}}\" onError=\"this.src='assets/img/user.png'\" alt=\"\" class=\"img-circle childimg\">\r\n                    </td>\r\n                 \r\n                    <!-- <td scope=\"row\">SID: 343432</td> -->\r\n                    <td>{{students.studentName }}</td>\r\n                    <!-- <td>{{students.className}} </td> -->\r\n                    <td>{{students.parentName}}</td>\r\n                    <td>{{students.className}}</td>\r\n                    <td>\r\n                      <a [routerLink]=\"['../studentdetails', students.studentId,students.parentID]\">\r\n                        <i class=\"fa fa-eye\" aria-hidden=\"true\" title=\"view details\"></i>\r\n                      </a>\r\n                    </td>\r\n                  </tr>\r\n                </tbody>\r\n                <!-- </tbody> -->\r\n              </table>\r\n              <div class=\"text-center\">\r\n\r\n                <span *ngIf=\"studentList.length == 0 && !loader\" class=\"text-center\">No result found</span>\r\n              </div>\r\n            </div>\r\n            <p-paginator [alwaysShow]=\"false\" [rows]=\"limit\" [totalRecords]=\"totalRecord\" (onPageChange)=\"paginate($event)\"\r\n            ></p-paginator>\r\n\r\n          </div>\r\n\r\n        </div>\r\n\r\n      </div>\r\n\r\n\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<ngx-spinner type=\"ball-atom\" size=\"medium\" color=\"#58A7FE\"></ngx-spinner>\r\n"

/***/ }),

/***/ "./src/app/layout/teacher/components/teacher-student-list/teacher-student-list.component.ts":
/*!**************************************************************************************************!*\
  !*** ./src/app/layout/teacher/components/teacher-student-list/teacher-student-list.component.ts ***!
  \**************************************************************************************************/
/*! exports provided: TeacherStudentListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TeacherStudentListComponent", function() { return TeacherStudentListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_services_teacher_api_service_teacher_api_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/services/teacher-api-service/teacher-api.service */ "./src/app/layout/teacher/shared/services/teacher-api-service/teacher-api.service.ts");
/* harmony import */ var _shared_services_error_handler_error_handler_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../shared/services/error-handler/error-handler.service */ "./src/app/shared/services/error-handler/error-handler.service.ts");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var _shared_services_notification_service_notification_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../shared/services/notification-service/notification.service */ "./src/app/shared/services/notification-service/notification.service.ts");
/* harmony import */ var _shared_services_common_common_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../shared/services/common/common.service */ "./src/app/shared/services/common/common.service.ts");
/* harmony import */ var _shared_constant__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../shared/constant */ "./src/app/layout/teacher/shared/constant.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var TeacherStudentListComponent = /** @class */ (function () {
    function TeacherStudentListComponent(apiService, error, spinner, notification, commonService) {
        this.apiService = apiService;
        this.error = error;
        this.spinner = spinner;
        this.notification = notification;
        this.commonService = commonService;
        this.studentList = [];
        this.classList = [];
        this.pageNo = 0;
        this.limit = 10;
        this.loader = true;
        this.totalRecord = 0;
    }
    TeacherStudentListComponent.prototype.ngOnInit = function () {
        this.searchByClass = '';
        this.searchByStudentName = '';
        this.getAllClassess();
        this.getStudentsList();
    };
    TeacherStudentListComponent.prototype.getSerchClass = function (event) { };
    TeacherStudentListComponent.prototype.getStudentsList = function () {
        var _this = this;
        this.loader = true;
        if (this.searchByClass === '') {
            this.spinner.show();
            var data = {
                'agencyID': this.commonService.getAgencyId(),
                'classID': this.searchByClass,
                'studentID': 0,
                'studentName': this.searchByStudentName,
                'page': this.pageNo,
                'limit': this.limit,
            };
            this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_6__["TeacherAPIURLs"].GetAllStudents, data, null).subscribe(function (res) {
                if (res.body.statusCode === 200) {
                    _this.totalRecord = res.body.totalRows;
                    _this.spinner.hide();
                    _this.studentList = res.body.data;
                    _this.loader = false;
                }
                else {
                    _this.spinner.hide();
                    _this.error.unknownError();
                }
                console.log('list student', res);
            }, function (err) {
                _this.spinner.hide();
                _this.error.commonError(err);
            });
        }
        else {
            this.getAllStudentsListByClass();
        }
    };
    TeacherStudentListComponent.prototype.getAllStudentsListByClass = function () {
        var _this = this;
        this.loader = true;
        this.spinner.show();
        var data = {
            'agencyID': this.commonService.getAgencyId(),
            'classID': this.searchByClass,
            'studentID': 0,
            'studentName': this.searchByStudentName
        };
        this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_6__["TeacherAPIURLs"].GetAllStudentsByClass, data, null).subscribe(function (res) {
            if (res.body.statusCode === 200) {
                _this.totalRecord = res.body.totalRows;
                _this.spinner.hide();
                _this.studentList = res.body.data;
                _this.loader = false;
            }
            else {
                _this.spinner.hide();
                _this.error.unknownError();
            }
            console.log('list student', res);
        }, function (err) {
            _this.spinner.hide();
            _this.error.commonError(err);
        });
    };
    TeacherStudentListComponent.prototype.getAllClassess = function () {
        var _this = this;
        this.spinner.show();
        var data = {
            'agencyID': this.commonService.getAgencyId()
        };
        this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_6__["TeacherAPIURLs"].GetAllClasses, data, null).subscribe(function (res) {
            console.log(res);
            if (res.body.statusCode === 200) {
                _this.spinner.hide();
                _this.classList = res.body.data;
            }
            else {
                _this.spinner.hide();
                _this.error.unknownError();
            }
            // this.searchByClass = this.classList[0].classesID;
            console.log('this.classList', _this.classList);
        }, function (err) {
            _this.spinner.hide();
            _this.error.commonError(err);
        });
    };
    TeacherStudentListComponent.prototype.paginate = function (event) {
        this.pageNo = event.page;
        // this.limit = event.page;
        this.getStudentsList();
    };
    TeacherStudentListComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-teacher-student-list',
            template: __webpack_require__(/*! ./teacher-student-list.component.html */ "./src/app/layout/teacher/components/teacher-student-list/teacher-student-list.component.html"),
            styles: [__webpack_require__(/*! ./teacher-student-list.component.css */ "./src/app/layout/teacher/components/teacher-student-list/teacher-student-list.component.css")]
        }),
        __metadata("design:paramtypes", [_shared_services_teacher_api_service_teacher_api_service__WEBPACK_IMPORTED_MODULE_1__["TeacherApiService"], _shared_services_error_handler_error_handler_service__WEBPACK_IMPORTED_MODULE_2__["ErrorHandlerService"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_3__["NgxSpinnerService"], _shared_services_notification_service_notification_service__WEBPACK_IMPORTED_MODULE_4__["NotificationService"],
            _shared_services_common_common_service__WEBPACK_IMPORTED_MODULE_5__["CommonService"]])
    ], TeacherStudentListComponent);
    return TeacherStudentListComponent;
}());



/***/ }),

/***/ "./src/app/layout/teacher/components/teacher-studentbreak/teacher-studentbreak.component.css":
/*!***************************************************************************************************!*\
  !*** ./src/app/layout/teacher/components/teacher-studentbreak/teacher-studentbreak.component.css ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2xheW91dC90ZWFjaGVyL2NvbXBvbmVudHMvdGVhY2hlci1zdHVkZW50YnJlYWsvdGVhY2hlci1zdHVkZW50YnJlYWsuY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/layout/teacher/components/teacher-studentbreak/teacher-studentbreak.component.html":
/*!****************************************************************************************************!*\
  !*** ./src/app/layout/teacher/components/teacher-studentbreak/teacher-studentbreak.component.html ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"wrapper\">\r\n  <div class=\"container-fluid\">\r\n\r\n    <div class=\"pagetitle\">\r\n      <div>\r\n        <h2>Attendance\r\n          <span> / Breaks</span>\r\n        </h2>\r\n      </div>\r\n      <div *ngIf=\"isSubscriptionActive\">\r\n          <button type=\"submit\" *ngIf=\"!disableNewEntry\"  class=\"btn btn-red btn_current\"  data-target=\"#checkout\"\r\n          (click)=\"clearForm();openModalForNewEntry()\">\r\n          Add Entry</button>\r\n        <button type=\"submit\" *ngIf=\"disableNewEntry\" [disabled]=\"disableNewEntry\" class=\"btn btn-red btn_current\"  \r\n          >\r\n          Add Entry</button>\r\n      </div>\r\n     \r\n    </div>\r\n\r\n    <div class=\"subhead d-flex justify-content-between mt-20\">\r\n      <div>\r\n            <td *ngIf=\"(imagePath !== '')\">\r\n                <img src=\"{{imagePath}}\" alt=\"\" class=\"img-circle childimg\">\r\n              </td>\r\n              <td *ngIf=\"(imagePath == '')\">\r\n                <img src=\"assets/img/user.png\" alt=\"\" class=\"img-circle childimg\">\r\n              </td>\r\n            <h3>{{studentName}} / {{attendanceaDate|date}}</h3>  \r\n      </div>\r\n    </div>\r\n    <div class=\"innertable studentListSearch\">\r\n      <div class=\"table-responsive\">\r\n        <table class=\"table\">\r\n          <thead class=\"thead-light\">\r\n            <tr>\r\n              <th scope=\"col\">Break-Out Time</th>\r\n              <th scope=\"col\" class=\"text-center\">Break-In Time</th>\r\n              <th scope=\"col\" class=\"text-center\">Reason</th>\r\n              <th scope=\"col\">Break In</th>\r\n              <th scope=\"col\">Edit</th>\r\n            </tr>\r\n          </thead>\r\n          <tbody>\r\n            <tr *ngFor=\"let brek of breakList\">\r\n                <!-- {{brek.breakOutTime|date: 'h:mm a'}} -->\r\n              <td >\r\n                {{brek.breakOutTime|date: 'h:mm a'}}\r\n              </td>\r\n              <td *ngIf=\"brek.breakStatusId != 2\" class=\"text-center\">\r\n                 --\r\n              </td>\r\n              <td *ngIf=\"brek.breakStatusId == 2\" class=\"text-center\">\r\n                {{brek.breakInTime| date: 'h:mm a'}}\r\n              </td>\r\n\r\n              <td class=\"text-center\">\r\n                {{brek.breakReason}}\r\n              </td>\r\n          <td>\r\n            <button *ngIf=\"(brek.breakStatusId == 1 && allowedit)\"  class=\"btn btn-info \" data-target=\"#checkin\" (click)=\"getBreakId(brek)\" data-toggle=\"modal\">Break In</button>\r\n          </td>\r\n              <td>\r\n                  <div *ngIf=\"allowedit\">\r\n                      <a data-toggle=\"modal\" data-target=\"#checkout\" class=\"attedit\" title=\"Edit Breaked out time \"\r\n                        *ngIf=\"brek.breakStatusId == 1\" (click)=\"getBreakOutDetails(brek)\"><i class=\"fa fa-pencil attend1\"></i></a>\r\n                      <a data-toggle=\"modal\" data-target=\"#edittimecheckout\" class=\"attedit\" title=\"Edit Break \"\r\n                        *ngIf=\"brek.breakStatusId == 2\" (click)=\"getAllBreakInDetails(brek);clearTabs()\"><i class=\"fa fa-pencil attend1\"></i></a>\r\n                    </div>\r\n              </td>\r\n            </tr>\r\n          </tbody>\r\n        </table>\r\n        <div class=\"text-center\">\r\n          <span *ngIf=\"breakList.length == 0 && !loader\">No result found</span>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n    \r\n<!-- Break Out Modal -->\r\n    <div class=\"modal fade BreakNew\" id=\"checkout\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"checkOutLabel\" aria-hidden=\"true\">\r\n        <div class=\"modal-dialog\" role=\"document\">\r\n          <div class=\"modal-content\">\r\n            <div class=\"modal-header\">\r\n              <h5 class=\"modal-title\" id=\"checkoutLabel\">Update Break-out</h5>\r\n              <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n                <span aria-hidden=\"true\">&times;</span>\r\n              </button>\r\n            </div>\r\n            <div class=\"modal-body\">\r\n              <form [formGroup]=\"breakOutForm\">\r\n                <div class=\"row mb-20 mt-20\">\r\n                  <div class=\"col-lg-6\">\r\n                    <div class=\"form-group\">\r\n                      <label for=\"\">Date</label>\r\n                      <!-- <input type=\"text \" class=\"form-control\" id=\"\" formControlName=\"outdate\" aria-describedby=\"\"\r\n                        [readOnly]=\"true\"> -->\r\n  \r\n                      <input type=\"text\" placeholder=\"Date\" formControlName=\"outdate\" showWeekNumbers=\"false\" [maxDate]=\"today\"\r\n                        class=\"form-control\" [bsConfig]=\"dpConfig\" bsDatepicker [attr.disabled]=\"true\">\r\n                      <div class=\"form-group\">\r\n  \r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"col-lg-6\">\r\n                    <div class=\"form-group\">\r\n                      <label for=\"\">Reason </label>\r\n                      <input type=\"text \" formControlName=\"reason\" class=\"form-control\" id=\"\" aria-describedby=\"\">\r\n                      <div *ngIf=\"reason.invalid && (reason.dirty || reason.touched)\" class=\"text-left errormsg\">\r\n                          <span *ngIf=\"reason.errors.required\">\r\n                            <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please enter reason</span>\r\n                          </span>\r\n                        </div> \r\n                    </div>\r\n                  </div>\r\n                </div>\r\n  \r\n  \r\n             \r\n                <div class=\"row mb-20 mt-20\">\r\n                  <div class=\"col-lg-6\">\r\n                    <div class=\"form-group\">\r\n                      <label for=\"\">Picked Up By</label>\r\n                      <select class=\"form-control\" formControlName=\"pickupby\" id=\"exampleFormControlSelect1\">\r\n                        <option value=\"\">Select option</option>\r\n                        <option *ngFor=\"let guardians of guardiansList\" [value]=\"guardians.guardianId\">{{guardians.guardianName}}</option>\r\n  \r\n                      </select>\r\n                      <div *ngIf=\"pickupby.invalid && (pickupby.dirty || pickupby.touched)\" class=\"text-left errormsg\">\r\n                        <span *ngIf=\"pickupby.errors.required\">\r\n                          <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please select option from list</span>\r\n                        </span>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"col-lg-6\">\r\n                    <div class=\"form-group\">\r\n                      <label for=\"\">Breaked-out time</label>\r\n                     \r\n                      <p-calendar styleClass=\"form-control\" class=\"custom-textbox-checkedin\" formControlName=\"outtime\" [timeOnly]=\"true\" hourFormat=\"12\" icon=\"pi pi-clock\"\r\n                        [showIcon]=\"true\"></p-calendar>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </form>\r\n  \r\n            </div>\r\n            <div class=\"modal-footer\">\r\n              <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\r\n              <button type=\"button\" class=\"btn btn-primary\" data-dismiss=\"modal\" [disabled]=\"!breakOutForm.valid\" (click)=\"saveBreakOut(1)\">Save\r\n                changes</button>\r\n              <!-- <button type=\"button\" *ngIf=\"!showCheckInn\" class=\"btn btn-primary\" data-dismiss=\"modal\" (click)=\"saveCheckOutDetails(showCheckInn)\">Save changes</button> -->\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n<!-- Break in modal -->\r\n<div class=\"modal fade\" id=\"checkin\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"checkinLabel\" aria-hidden=\"true\">\r\n        <div class=\"modal-dialog\" role=\"document\">\r\n          <div class=\"modal-content\">\r\n            <div class=\"modal-header\">\r\n              <h5 class=\"modal-title\" id=\"checkinLabel\">Update Break-in </h5>\r\n              <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n                <span aria-hidden=\"true\">&times;</span>\r\n              </button>\r\n            </div>\r\n            <div class=\"modal-body\">\r\n  \r\n              <form [formGroup]=\"breakInForm\">\r\n                <div class=\"row mb-20 mt-20\">\r\n                  <div class=\"col-lg-6\">\r\n                    <div class=\"form-group\">\r\n                      <label for=\"\">Date</label>\r\n                      <input type=\"text\" placeholder=\"Date\" formControlName=\"indate\" showWeekNumbers=\"false\" [maxDate]=\"today\"\r\n                        class=\"form-control\" [bsConfig]=\"dpConfig\" bsDatepicker [attr.disabled]=\"true\">\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"col-lg-6\">\r\n                      <div class=\"form-group\">\r\n                        <label for=\"\">Drop-off By</label>\r\n                        <div class=\"form-group\">\r\n                          <select class=\"form-control\" formControlName=\"dropby\"\r\n                            id=\"exampleFormControlSelect1\">\r\n                            <option value=\"\">Select option</option>\r\n                            <option *ngFor=\"let guardians of guardiansList\" [value]=\"guardians.guardianId\">{{guardians.guardianName}}</option>\r\n                          </select>\r\n                          <div *ngIf=\"dropby.invalid && (dropby.dirty || dropby.touched)\" class=\"text-left errormsg\">\r\n                            <span *ngIf=\"dropby.errors.required\">\r\n                              <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please select option </span>\r\n                            </span>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                </div>\r\n                <div class=\"row mb-20 mt-20\">\r\n                   \r\n                  <div class=\"col-lg-6\">\r\n                    <div class=\"form-group\">\r\n                      <label for=\"\">Breaked-in time</label>\r\n                      <p-calendar class=\"custom-textbox-checkedin\" styleClass=\"form-control\" formControlName=\"intime\" [timeOnly]=\"true\" hourFormat=\"12\" icon=\"pi pi-clock\"\r\n                        [showIcon]=\"true\"></p-calendar>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </form>\r\n            </div>\r\n            <div class=\"modal-footer\">\r\n              <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\r\n              <button type=\"button\" class=\"btn btn-primary\"  [disabled]=\"!breakInForm.valid\" (click)=\"saveBreakIn()\">Save\r\n                changes</button>\r\n              <!-- <button type=\"button\" *ngIf=\"!showCheckInn\" class=\"btn btn-primary\" [disabled]=\"!checkInForm.valid\"  data-dismiss=\"modal\" (click)=\"saveCheckOutDetails(showCheckInn)\">Save changes</button> -->\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n<!-- BREAK IN AND OUT MODAL -->\r\n<div class=\"modal fade\" id=\"edittimecheckout\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"checkoutLabel  \" aria-hidden=\"true\">\r\n    <div class=\"modal-dialog\" role=\"document\">\r\n      <div class=\"modal-content\">\r\n        <div class=\"modal-header\">\r\n          <h5 class=\"modal-title\" id=\"checkoutLabel\">Update Break </h5>\r\n          <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n            <span aria-hidden=\"true\">&times;</span>\r\n          </button>\r\n        </div>\r\n        <div class=\"modal-body\">\r\n          <ul class=\"nav nav-tabs\" id=\"myTab\" role=\"tablist\">\r\n            <li class=\"nav-item\" (click)=\"getBreakTabDetails('breakouttab')\">\r\n              <a class=\"nav-link active\" id=\"checkout-tab\"  data-toggle=\"tab\" href=\"#chekoutedit\" role=\"tab\"\r\n                aria-controls=\"editcheckout1\" aria-selected=\"false\">\r\n               Break out\r\n              </a>\r\n            </li>\r\n            <li class=\"nav-item\">\r\n              <a class=\"nav-link\" id=\"checkin-tab\"  (click)=\"getBreakTabDetails('breakintab')\"  data-toggle=\"tab\" href=\"#chekinedit\" role=\"tab\" aria-controls=\"meal\"\r\n                aria-selected=\"false\">\r\n                Breaked In\r\n              </a>\r\n            </li>\r\n          </ul>\r\n          <div class=\"tab-content\" id=\"myTabContent\">\r\n            <div class=\"tab-pane fade show active\" id=\"chekoutedit\" role=\"tabpanel\" aria-labelledby=\"checkout-tab\">\r\n              <form [formGroup]=\"breakOutForm\">\r\n                <div class=\"row mb-20 mt-20\">\r\n                  <div class=\"col-lg-6\">\r\n                    <div class=\"form-group\">\r\n                      <label for=\"\">Date</label>\r\n                      <!-- <input type=\"text \" class=\"form-control\" id=\"\" formControlName=\"outdate\" aria-describedby=\"\"\r\n                    [readOnly]=\"true\"> -->\r\n  \r\n                      <input type=\"text\" placeholder=\"Date\" formControlName=\"outdate\" showWeekNumbers=\"false\" [maxDate]=\"today\"\r\n                        class=\"form-control\" [bsConfig]=\"dpConfig\" bsDatepicker [attr.disabled]=\"true\">\r\n                      <div class=\"form-group\">\r\n  \r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"col-lg-6\">\r\n                    <div class=\"form-group\">\r\n                      <label for=\"\">Reason </label>\r\n                      <input type=\"text \" formControlName=\"reason\" class=\"form-control\" id=\"\" aria-describedby=\"\"\r\n                        >\r\n                      <div *ngIf=\"reason.invalid && (reason.dirty || reason.touched)\" class=\"text-left errormsg\">\r\n                      <span *ngIf=\"reason.errors.required\">\r\n                        <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please enter reason</span>\r\n                      </span>\r\n                    </div> \r\n                    </div>\r\n                  </div>\r\n                </div>\r\n  \r\n  \r\n                <!-- Checked out update -->\r\n                <div class=\"row mb-20 mt-20\">\r\n                  <div class=\"col-lg-6\">\r\n                    <div class=\"form-group\">\r\n                      <label for=\"\">Picked Up By</label>\r\n                      <select class=\"form-control\" formControlName=\"pickupby\"\r\n                        id=\"exampleFormControlSelect1\">\r\n                        <option value=\"\">Select option</option>\r\n                        <option *ngFor=\"let guardians of guardiansList\" [value]=\"guardians.guardianId\">{{guardians.guardianName}}</option>\r\n  \r\n                      </select>\r\n                      <div *ngIf=\"pickupby.invalid && (pickupby.dirty || pickupby.touched)\" class=\"text-left errormsg\">\r\n                        <span *ngIf=\"pickupby.errors.required\">\r\n                          <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please select option from list</span>\r\n                        </span>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"col-lg-6\">\r\n                    <div class=\"form-group\">\r\n                      <label for=\"\">Checked-out time</label>\r\n                      <p-calendar class=\"custom-textbox-checkedin\" styleClass=\"form-control\" formControlName=\"outtime\" [timeOnly]=\"true\" hourFormat=\"12\" icon=\"pi pi-clock\"\r\n                        [showIcon]=\"true\"></p-calendar>\r\n  \r\n                      <!-- <timepicker formControlName=\"outtime\"></timepicker> -->\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </form>\r\n            </div>\r\n  \r\n            <div class=\"tab-pane\" id=\"chekinedit\" role=\"tabpanel\" aria-labelledby=\"checkin-tab\">\r\n              <form [formGroup]=\"breakInForm\">\r\n                <div class=\"row mb-20 mt-20\">\r\n                  <div class=\"col-lg-6\">\r\n                    <div class=\"form-group\">\r\n                      <label for=\"\">Date</label>\r\n                      <input type=\"text\" placeholder=\"Date\" formControlName=\"indate\" showWeekNumbers=\"false\" [maxDate]=\"today\"\r\n                        class=\"form-control\" [bsConfig]=\"dpConfig\" bsDatepicker [attr.disabled]=\"true\">\r\n                      <div class=\"form-group\">\r\n  \r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"col-lg-6\">\r\n                      <div class=\"form-group\">\r\n                        <label for=\"\">Drop-off By</label>\r\n                        <div class=\"form-group\">\r\n                          <select class=\"form-control\" formControlName=\"dropby\" \r\n                            id=\"exampleFormControlSelect1\">\r\n                            <option value=\"\">Select option</option>\r\n                            <option *ngFor=\"let guardians of guardiansList\" [value]=\"guardians.guardianId\">{{guardians.guardianName}}</option>\r\n                          </select>\r\n                          <div *ngIf=\"dropby.invalid && (dropby.dirty || dropby.touched)\" class=\"text-left errormsg\">\r\n                            <span *ngIf=\"dropby.errors.required\">\r\n                              <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please select option from list</span>\r\n                            </span>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                </div>\r\n                <div class=\"row mb-20 mt-20\">\r\n                \r\n                  <div class=\"col-lg-6\">\r\n                    <div class=\"form-group\">\r\n                      <label for=\"\">Breaked-in time </label>\r\n                      <!-- <timepicker formControlName=\"intime\"></timepicker> -->\r\n                      <p-calendar class=\"custom-textbox-checkedin\" styleClass=\"form-control\" formControlName=\"intime\" [timeOnly]=\"true\" hourFormat=\"12\" icon=\"pi pi-clock\"\r\n                        [showIcon]=\"true\"></p-calendar>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </form>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"modal-footer\">\r\n          <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\r\n          <button type=\"button\" *ngIf=\"tabType == 'breakouttab'\" class=\"btn btn-primary\" data-dismiss=\"modal\" [disabled]=\"!breakOutForm.valid\" (click)=\"saveBreakOut(2)\">Save\r\n            changes</button>\r\n            <button type=\"button\"  *ngIf=\"tabType == 'breakintab'\"  class=\"btn btn-primary\"  [disabled]=\"!breakInForm.valid\" (click)=\"saveBreakIn()\">Save\r\n                changes</button>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/layout/teacher/components/teacher-studentbreak/teacher-studentbreak.component.ts":
/*!**************************************************************************************************!*\
  !*** ./src/app/layout/teacher/components/teacher-studentbreak/teacher-studentbreak.component.ts ***!
  \**************************************************************************************************/
/*! exports provided: TeacherStudentbreakComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TeacherStudentbreakComponent", function() { return TeacherStudentbreakComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_services_teacher_api_service_teacher_api_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/services/teacher-api-service/teacher-api.service */ "./src/app/layout/teacher/shared/services/teacher-api-service/teacher-api.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _shared_services_error_handler_error_handler_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../shared/services/error-handler/error-handler.service */ "./src/app/shared/services/error-handler/error-handler.service.ts");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var _shared_services_notification_service_notification_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../shared/services/notification-service/notification.service */ "./src/app/shared/services/notification-service/notification.service.ts");
/* harmony import */ var _shared_services_common_common_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../shared/services/common/common.service */ "./src/app/shared/services/common/common.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared_constant__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../shared/constant */ "./src/app/layout/teacher/shared/constant.ts");
/* harmony import */ var ngx_bootstrap__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ngx-bootstrap */ "./node_modules/ngx-bootstrap/esm5/ngx-bootstrap.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var TeacherStudentbreakComponent = /** @class */ (function () {
    function TeacherStudentbreakComponent(apiService, fb, error, spinner, notification, commonService, router, routedata) {
        var _this = this;
        this.apiService = apiService;
        this.fb = fb;
        this.error = error;
        this.spinner = spinner;
        this.notification = notification;
        this.commonService = commonService;
        this.router = router;
        this.routedata = routedata;
        this.breakList = [];
        this.searchDate = new Date();
        this.mytime = new Date();
        this.guardiansList = [];
        this.tabType = 'breakouttab';
        this.idForBreakIn = 0;
        this.idForEditBreakout = 0;
        this.disableNewEntry = true;
        this.today = new Date();
        this.allowedit = false;
        this.loader = true;
        this.isSubscriptionActive = false;
        this.dpConfig = new ngx_bootstrap__WEBPACK_IMPORTED_MODULE_9__["BsDatepickerConfig"]();
        this.routedata.queryParams.subscribe(function (params) {
            _this.studentName = params['Name'];
            _this.imagePath = params['ImagePath'];
            _this.attendanceaDate = params['Date'];
            _this.attendanceStatus = params['attendenceStatusID'];
        });
        this.isSubscriptionActive = this.commonService.getSubscriptionStatus();
    }
    TeacherStudentbreakComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.createBreakInForm();
        this.createBreakOutForm();
        this.routedata.params.subscribe(function (params) {
            _this.studentId = params['id'];
            _this.attendanceId = params['attendanceid'];
            _this.allowentry = params['allowedit'];
            var allowFlag = _this.allowEditMethod();
            if (_this.allowentry === 'true' && allowFlag === true) {
                _this.allowedit = true;
            }
            else {
                _this.allowedit = false;
            }
            _this.getAllStudentsBreakLogs();
            _this.getGuardianList();
        });
    };
    TeacherStudentbreakComponent.prototype.createBreakInForm = function () {
        this.breakInForm = this.fb.group({
            indate: [this.searchDate, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            inclass: [null],
            dropby: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            intime: [this.mytime, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
        });
    };
    TeacherStudentbreakComponent.prototype.createBreakOutForm = function () {
        this.breakOutForm = this.fb.group({
            outdate: [this.searchDate, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            reason: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            pickupby: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            outtime: [this.mytime, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
        });
    };
    Object.defineProperty(TeacherStudentbreakComponent.prototype, "outdate", {
        // Check In Form
        get: function () { return this.breakInForm.get('outdate'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TeacherStudentbreakComponent.prototype, "inclass", {
        get: function () { return this.breakInForm.get('inclass'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TeacherStudentbreakComponent.prototype, "dropby", {
        get: function () { return this.breakInForm.get('dropby'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TeacherStudentbreakComponent.prototype, "indate", {
        // Check Out Form
        get: function () { return this.breakOutForm.get('indate'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TeacherStudentbreakComponent.prototype, "reason", {
        get: function () { return this.breakOutForm.get('reason'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TeacherStudentbreakComponent.prototype, "pickupby", {
        get: function () { return this.breakOutForm.get('pickupby'); },
        enumerable: true,
        configurable: true
    });
    TeacherStudentbreakComponent.prototype.getAllStudentsBreakLogs = function () {
        var _this = this;
        this.loader = true;
        this.spinner.show();
        var data = {
            'agencyID': this.commonService.getAgencyId(),
            'studentID': this.studentId,
            'classAttendenceID': this.attendanceId
        };
        this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_8__["TeacherAPIURLs"].GetStudentBreakLogs, data, null).subscribe(function (res) {
            if (res.body.statusCode === 200) {
                _this.spinner.hide();
                _this.breakList = res.body.data;
                if (_this.breakList.length > 0) {
                    if (res.body.data[(res.body.data.length - 1)].breakStatusId === 2) {
                        _this.disableNewEntry = false;
                    }
                    else {
                        _this.disableNewEntry = true;
                    }
                    _this.breakList.forEach(function (x) {
                        x.breakOutTime = _this.commonService.getLocalDateTimeFromUTC(x.breakOutTime);
                        x.breakInTime = _this.commonService.getLocalDateTimeFromUTC(x.breakInTime);
                    });
                }
                else {
                    _this.disableNewEntry = false;
                }
                _this.loader = false;
            }
            else {
                _this.spinner.hide();
                _this.error.unknownError();
            }
        }, function (err) {
            _this.spinner.hide();
            _this.error.commonError(err);
        });
    };
    // Get check in Out Details
    TeacherStudentbreakComponent.prototype.getGuardianList = function () {
        var _this = this;
        // this.clearbreakInForm();
        // this.clearCheckOutForm();
        // this.checkInOutDetails = data;
        // this.studentId = data.studentID;
        // this.consideredAttendenceId = data.id;
        var req = {
            'studentID': this.studentId,
            'agencyID': this.commonService.getAgencyId(),
            'isAuthorized': true
        };
        this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_8__["TeacherAPIURLs"].GetAllGuardiansForStudents, req, null).subscribe(function (res) {
            if (res.body.statusCode === 200) {
                _this.guardiansList = res.body.data;
            }
            else {
                _this.error.unknownError();
            }
        }, function (err) {
            _this.spinner.hide();
            _this.error.commonError(err);
        });
    };
    TeacherStudentbreakComponent.prototype.saveBreakIn = function () {
        var _this = this;
        if (this.breakOutDateTime > this.breakInForm.value.intime) {
            this.notification.warning({ message: 'Break-In time should be greater than break-Out time', title: '' });
        }
        else {
            var data = {
                'id': this.idForBreakIn,
                'agencyID': this.commonService.getAgencyId(),
                'studentID': this.studentId,
                'classAttendenceID': this.attendanceId,
                'breakInTime': this.breakInForm.value.intime,
                'attendenceStatusID': 0,
                'attendanceDate': '2019-02-07T04:05:42.198Z',
                'dropedById': this.breakInForm.value.dropby,
                'dropedByOtherId': 0,
                'pickupById': 0,
                'pickupByOtherId': 0,
                'approvedDropedById': 0,
                'approvedPickupById': 0,
                'dropedByOtherNames': 'string',
                'pickupByOtherName': 'string',
                'breakStatusId': 2,
                'updatedBy': this.commonService.getLoggedInUserId()
            };
            this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_8__["TeacherAPIURLs"].BreakInAttendenceStudent, data, null).subscribe(function (res) {
                if (res.body.statusCode === 200) {
                    $('#checkin').modal('hide');
                    $('#edittimecheckout').modal('hide');
                    _this.notification.success({ message: 'Breaked In Successfully', title: '' });
                    _this.getAllStudentsBreakLogs();
                }
                else {
                    _this.error.unknownError();
                }
            }, function (err) {
                _this.spinner.hide();
                _this.error.commonError(err);
            });
        }
    };
    TeacherStudentbreakComponent.prototype.openModalForNewEntry = function () {
        if (this.allowEditMethod() && this.attendanceStatus === '3') {
            $('#checkout').modal('show');
            return true;
        }
        else if (this.attendanceStatus === '4' && this.allowEditMethod()) {
            this.notification.warning({ message: 'Student has been checked out', title: 'Break not allowed!' });
        }
        else {
            this.notification.warning({ message: 'You can create new entry for today only', title: '' });
            return false;
        }
    };
    TeacherStudentbreakComponent.prototype.allowEditMethod = function () {
        var today = this.commonService.getOnlyDate(new Date());
        var breakdate = this.commonService.getOnlyDate(this.attendanceaDate);
        if (today.toDateString() === breakdate.toDateString()) {
            return true;
        }
        else {
            return false;
        }
    };
    TeacherStudentbreakComponent.prototype.saveBreakOut = function (statusid) {
        var _this = this;
        var data = {
            'id': this.idForEditBreakout,
            'agencyID': this.commonService.getAgencyId(),
            'studentID': this.studentId,
            'classAttendenceID': this.attendanceId,
            'breakOutTime': this.breakOutForm.value.outtime,
            'attendenceStatusID': 0,
            'attendanceDate': '2019-02-07T04:05:42.198Z',
            'dropedById': 0,
            'dropedByOtherId': 0,
            'pickupById': this.breakOutForm.value.pickupby,
            'pickupByOtherId': 0,
            'approvedDropedById': 0,
            'approvedPickupById': 0,
            'dropedByOtherNames': 'string',
            'pickupByOtherName': 'string',
            'breakReason': this.breakOutForm.value.reason,
            'breakStatusId': statusid,
            'updatedBy': this.commonService.getLoggedInUserId()
        };
        this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_8__["TeacherAPIURLs"].BreakOutAttendenceStudent, data, null).subscribe(function (res) {
            if (res.body.statusCode === 200) {
                //  this.idForBreakIn = res.body.saveId;
                _this.notification.success({ message: 'Breaked out Successfully', title: '' });
                _this.getAllStudentsBreakLogs();
            }
            else {
                _this.error.unknownError();
            }
        }, function (err) {
            _this.spinner.hide();
            _this.error.commonError(err);
        });
    };
    TeacherStudentbreakComponent.prototype.getBreakTabDetails = function (type) {
        this.tabType = type;
        // this.createBreakInForm();
        // this.createBreakOutForm();
    };
    TeacherStudentbreakComponent.prototype.clearForm = function () {
        this.breakOutForm.controls['outtime'].setValue(new Date());
        this.idForEditBreakout = 0;
        this.createBreakInForm();
        this.createBreakOutForm();
    };
    TeacherStudentbreakComponent.prototype.clearTabs = function () {
        this.tabType = 'breakouttab';
        $('#checkout-tab').tab('show');
    };
    TeacherStudentbreakComponent.prototype.getBreakId = function (value) {
        this.idForBreakIn = value.id;
        this.idForEditBreakout = value.id;
        this.breakOutDateTime = this.commonService.getLocalDateTimeFromUTC(value.breakOutTime);
    };
    TeacherStudentbreakComponent.prototype.getBreakOutDetails = function (value) {
        this.idForEditBreakout = value.id;
        var outdate = this.commonService.getLocalDateTimeFromUTC(value.breakOutTime);
        this.breakOutForm.controls['outdate'].setValue(outdate);
        this.breakOutForm.controls['reason'].setValue(value.breakReason);
        this.breakOutForm.controls['pickupby'].setValue(value.pickupById);
        this.breakOutForm.controls['outtime'].setValue(this.commonService.getLocalDateTimeFromUTC(value.breakOutTime));
    };
    TeacherStudentbreakComponent.prototype.getAllBreakInDetails = function (value) {
        this.idForEditBreakout = value.id;
        this.idForBreakIn = value.id;
        var indate = this.commonService.getLocalDateTimeFromUTC(value.breakInTime);
        var outdate = this.commonService.getLocalDateTimeFromUTC(value.breakOutTime);
        this.breakOutDateTime = outdate;
        this.breakOutForm.controls['outdate'].setValue(outdate);
        this.breakOutForm.controls['reason'].setValue(value.breakReason);
        this.breakOutForm.controls['pickupby'].setValue(value.pickupById);
        this.breakOutForm.controls['outtime'].setValue(this.commonService.getLocalDateTimeFromUTC(value.breakOutTime));
        this.breakInForm.controls['indate'].setValue(indate);
        this.breakInForm.controls['dropby'].setValue(value.dropedById);
        this.breakInForm.controls['intime'].setValue(this.commonService.getLocalDateTimeFromUTC(value.breakInTime));
    };
    TeacherStudentbreakComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-teacher-studentbreak',
            template: __webpack_require__(/*! ./teacher-studentbreak.component.html */ "./src/app/layout/teacher/components/teacher-studentbreak/teacher-studentbreak.component.html"),
            styles: [__webpack_require__(/*! ./teacher-studentbreak.component.css */ "./src/app/layout/teacher/components/teacher-studentbreak/teacher-studentbreak.component.css")]
        }),
        __metadata("design:paramtypes", [_shared_services_teacher_api_service_teacher_api_service__WEBPACK_IMPORTED_MODULE_1__["TeacherApiService"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"], _shared_services_error_handler_error_handler_service__WEBPACK_IMPORTED_MODULE_3__["ErrorHandlerService"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_4__["NgxSpinnerService"], _shared_services_notification_service_notification_service__WEBPACK_IMPORTED_MODULE_5__["NotificationService"], _shared_services_common_common_service__WEBPACK_IMPORTED_MODULE_6__["CommonService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_7__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_7__["ActivatedRoute"]])
    ], TeacherStudentbreakComponent);
    return TeacherStudentbreakComponent;
}());



/***/ }),

/***/ "./src/app/layout/teacher/components/teacherincedent/teacherincedent.component.css":
/*!*****************************************************************************************!*\
  !*** ./src/app/layout/teacher/components/teacherincedent/teacherincedent.component.css ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n#myInput {\r\n  background-image: url('/css/searchicon.png');\r\n  background-position: 10px 12px;\r\n  background-repeat: no-repeat;\r\n  width: 100%;\r\n  font-size: 16px;\r\n  padding: 12px 20px 12px 40px;\r\n  border: 1px solid #ddd;\r\n  margin-bottom: 12px;\r\n}\r\n\r\n#myUL {\r\n  list-style-type: none;\r\n  padding: 0;\r\n  margin: 0;\r\n}\r\n\r\n#myUL li a {\r\n  border: 1px solid #ddd;\r\n  margin-top: -1px; /* Prevent double borders */\r\n  background-color: #f6f6f6;\r\n  padding: 12px;\r\n  text-decoration: none;\r\n  font-size: 18px;\r\n  color: black;\r\n  display: block\r\n}\r\n\r\n#myUL li a:hover:not(.header) {\r\n  background-color: #eee;\r\n}\r\n\r\n/* Added sby Aniket */\r\n\r\n.fa-pencil, .fa-eye, .fa-chevron-left, .fa-chevron-right, .fa-plus-circle {\r\n  color: #58A7FE;\r\n  padding-right: 22px;\r\n  font-size: 15px;\r\n}\r\n\r\n.incident-tabs {\r\n  margin-top: 20px;\r\n  margin-bottom: 5px !important;\r\n  border-bottom: 1px solid #e8e8e8;\r\n  text-align: center;\r\n  display: flex;\r\n  justify-content: center;\r\n}\r\n\r\n.incident-tabs .nav-link {\r\n  border-radius: 10px 10px 0 0;\r\n}\r\n\r\n.modal-body {\r\n  padding: 20px;\r\n}\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGF5b3V0L3RlYWNoZXIvY29tcG9uZW50cy90ZWFjaGVyaW5jZWRlbnQvdGVhY2hlcmluY2VkZW50LmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBO0VBQ0UsNENBQTRDO0VBQzVDLDhCQUE4QjtFQUM5Qiw0QkFBNEI7RUFDNUIsV0FBVztFQUNYLGVBQWU7RUFDZiw0QkFBNEI7RUFDNUIsc0JBQXNCO0VBQ3RCLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLHFCQUFxQjtFQUNyQixVQUFVO0VBQ1YsU0FBUztBQUNYOztBQUVBO0VBQ0Usc0JBQXNCO0VBQ3RCLGdCQUFnQixFQUFFLDJCQUEyQjtFQUM3Qyx5QkFBeUI7RUFDekIsYUFBYTtFQUNiLHFCQUFxQjtFQUNyQixlQUFlO0VBQ2YsWUFBWTtFQUNaO0FBQ0Y7O0FBRUE7RUFDRSxzQkFBc0I7QUFDeEI7O0FBRUEscUJBQXFCOztBQUVyQjtFQUNFLGNBQWM7RUFDZCxtQkFBbUI7RUFDbkIsZUFBZTtBQUNqQjs7QUFDQTtFQUNFLGdCQUFnQjtFQUNoQiw2QkFBNkI7RUFDN0IsZ0NBQWdDO0VBQ2hDLGtCQUFrQjtFQUNsQixhQUFhO0VBQ2IsdUJBQXVCO0FBQ3pCOztBQUNBO0VBQ0UsNEJBQTRCO0FBQzlCOztBQUNBO0VBQ0UsYUFBYTtBQUNmIiwiZmlsZSI6InNyYy9hcHAvbGF5b3V0L3RlYWNoZXIvY29tcG9uZW50cy90ZWFjaGVyaW5jZWRlbnQvdGVhY2hlcmluY2VkZW50LmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuI215SW5wdXQge1xyXG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybCgnL2Nzcy9zZWFyY2hpY29uLnBuZycpO1xyXG4gIGJhY2tncm91bmQtcG9zaXRpb246IDEwcHggMTJweDtcclxuICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIGZvbnQtc2l6ZTogMTZweDtcclxuICBwYWRkaW5nOiAxMnB4IDIwcHggMTJweCA0MHB4O1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkICNkZGQ7XHJcbiAgbWFyZ2luLWJvdHRvbTogMTJweDtcclxufVxyXG5cclxuI215VUwge1xyXG4gIGxpc3Qtc3R5bGUtdHlwZTogbm9uZTtcclxuICBwYWRkaW5nOiAwO1xyXG4gIG1hcmdpbjogMDtcclxufVxyXG5cclxuI215VUwgbGkgYSB7XHJcbiAgYm9yZGVyOiAxcHggc29saWQgI2RkZDtcclxuICBtYXJnaW4tdG9wOiAtMXB4OyAvKiBQcmV2ZW50IGRvdWJsZSBib3JkZXJzICovXHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y2ZjZmNjtcclxuICBwYWRkaW5nOiAxMnB4O1xyXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcclxuICBmb250LXNpemU6IDE4cHg7XHJcbiAgY29sb3I6IGJsYWNrO1xyXG4gIGRpc3BsYXk6IGJsb2NrXHJcbn1cclxuXHJcbiNteVVMIGxpIGE6aG92ZXI6bm90KC5oZWFkZXIpIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWVlO1xyXG59XHJcblxyXG4vKiBBZGRlZCBzYnkgQW5pa2V0ICovXHJcblxyXG4uZmEtcGVuY2lsLCAuZmEtZXllLCAuZmEtY2hldnJvbi1sZWZ0LCAuZmEtY2hldnJvbi1yaWdodCwgLmZhLXBsdXMtY2lyY2xlIHtcclxuICBjb2xvcjogIzU4QTdGRTtcclxuICBwYWRkaW5nLXJpZ2h0OiAyMnB4O1xyXG4gIGZvbnQtc2l6ZTogMTVweDtcclxufVxyXG4uaW5jaWRlbnQtdGFicyB7XHJcbiAgbWFyZ2luLXRvcDogMjBweDtcclxuICBtYXJnaW4tYm90dG9tOiA1cHggIWltcG9ydGFudDtcclxuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2U4ZThlODtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxufVxyXG4uaW5jaWRlbnQtdGFicyAubmF2LWxpbmsge1xyXG4gIGJvcmRlci1yYWRpdXM6IDEwcHggMTBweCAwIDA7XHJcbn1cclxuLm1vZGFsLWJvZHkge1xyXG4gIHBhZGRpbmc6IDIwcHg7XHJcbn0iXX0= */"

/***/ }),

/***/ "./src/app/layout/teacher/components/teacherincedent/teacherincedent.component.html":
/*!******************************************************************************************!*\
  !*** ./src/app/layout/teacher/components/teacherincedent/teacherincedent.component.html ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"wrapper\">\r\n  <div class=\"container-fluid\">\r\n\r\n    <div class=\"pagetitle\">\r\n      <div>\r\n        <h2>Incident Report          \r\n        </h2>\r\n      </div>\r\n      <div>\r\n        <button type=\"submit\" class=\"btn btn-red\" data-toggle=\"modal\" data-target=\".addincident\" (click)=\"clearForm()\">Add\r\n          Incident Report</button>\r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"subhead d-flex justify-content-between mt-20 mb-20\">\r\n      <div>\r\n        <h3>Incident Report</h3>\r\n      </div>\r\n       \r\n    </div>\r\n\r\n    <ul class=\"nav nav-pills mb-3 incident-tabs\" id=\"pills-tab\" role=\"tablist\">\r\n      <li class=\"nav-item\" (click)=\"getAllIncidents();onTabChange()\">\r\n        <a class=\"nav-link active\" id=\"incidentLog\" data-toggle=\"pill\" href=\"#pills-incidentLog\" role=\"tab\"\r\n          aria-controls=\"pills-incidentLog\" aria-selected=\"false\">Incident Log</a>\r\n      </li>\r\n      <li class=\"nav-item\">\r\n        <a class=\"nav-link \" (click)=\"getAllBitingIncidents();onTabChange()\" id=\"bittingLog\" data-toggle=\"pill\" href=\"#pills-bittingLog\" role=\"tab\" aria-controls=\"pills-bittingLog\"\r\n          aria-selected=\"true\">Biting Log</a>\r\n      </li>\r\n    </ul>\r\n\r\n    <div class=\"tab-content\" id=\"pills-tabContent\">\r\n      <div class=\"tab-pane fade show active\"  id=\"pills-incidentLog\" role=\"tabpanel\" aria-labelledby=\"incidentLog\">\r\n        \r\n          <div class=\"leftfilter searchwitoutcard\">\r\n              <div class=\"row algcenter\">\r\n                <div class=\"search-date\">\r\n                  <div class=\"pr15 label-text\">Search Name : </div>\r\n                  <input type=\"text\" placeholder=\"Search Student name\" [(ngModel)]=\"searchByStudentName\" class=\"form-control mr15\" id=\"\">\r\n                </div>\r\n                <div class=\"search-date\">\r\n                  <div class=\"pr15 label-text\">From Date : </div>\r\n                  <input type=\"text\" placeholder=\"Search incident date\" [(ngModel)]=\"fromDate\"  showWeekNumbers=\"false\"\r\n                    class=\"form-control mr15\" [bsConfig]=\"dpConfig\" bsDatepicker>\r\n                    </div>\r\n                    <div class=\"search-date\">\r\n                      <div class=\"pr15 label-text\">To Date : </div>\r\n                      <input type=\"text\" placeholder=\"Search incident date\" [(ngModel)]=\"toDate\"  showWeekNumbers=\"false\"\r\n                        class=\"form-control mr15\" [bsConfig]=\"dpConfig\" bsDatepicker>\r\n                        </div>\r\n                <div class=\"filter-buttons\">\r\n                  <button type=\"submit\" class=\"btn btn-send\" *ngIf=\"!showClearBtn\" (click)=\"search()\">Search</button>\r\n                  <button type=\"submit\" class=\"btn btn-secondary\" *ngIf=\"showClearBtn\" (click)=\"clearSearch()\">Clear</button>\r\n                </div>\r\n            </div> \r\n          </div>\r\n        \r\n      \r\n        <div class=\"innertable\">\r\n          <div class=\"table-responsive\">\r\n            <table class=\"table\">\r\n              <thead class=\"thead-light\">\r\n                <tr>                  \r\n                  <th scope=\"col\">Date</th>\r\n                  <th scope=\"col\">Student</th>\r\n                  <th scope=\"col\">Location</th>\r\n                  <th scope=\"col\">Incident</th>\r\n                  <th scope=\"col\">Report Date</th>\r\n                  <th scope=\"col\">Reporter</th>\r\n                  <th scope=\"col\">Action Taken</th>\r\n                  <th scope=\"col\" class=\"text-center\">Actions</th>\r\n                </tr>\r\n              </thead>\r\n              <tbody *ngIf=\"incidentsList.length != 0\">\r\n                <tr *ngFor=\"let incidents of incidentsList\">\r\n                  \r\n                  <td>{{incidents.incidentDate | date}}</td>\r\n                  <td>{{incidents.studentName}}</td>\r\n                  <td>{{incidents.placeOfIncident}} </td>\r\n                  <td>{{incidents.description}}</td>\r\n                  <td>{{incidents.createdDate | date}}</td>\r\n                  <td>{{incidents.teacherName}}</td>\r\n                  <td>{{incidents.actionTaken}}</td>\r\n                  <td class=\"text-center\">\r\n                   \r\n                    <a data-toggle=\"modal\" data-target=\".addincident\" title=\"Edit/View incident\" (click)=\"getIncidentsDetails(incidents,1)\">\r\n                      <i class=\"fa fa-pencil\" aria-hidden=\"true\"></i>\r\n                    </a>\r\n                    <a title=\"Delete incident\">\r\n                      <i class=\"fa fa-trash\" *ngIf=\"!incidents.isAcknowledge\" aria-hidden=\"true\" title=\"Edit/View incident\" (click)=\"deleteIncident(incidents)\"></i>\r\n                    </a>\r\n                  </td>\r\n                </tr>\r\n              </tbody>\r\n            </table>\r\n            <div class=\"text-center\">\r\n                <span *ngIf=\"(incidentsList.length == 0 && !loader )\">No result found</span>\r\n              </div>\r\n          </div>\r\n        </div>\r\n        <p-paginator [alwaysShow]=\"false\" [rows]=\"limit\" [totalRecords]=\"totalRecord\" (onPageChange)=\"paginate($event,1)\"></p-paginator>\r\n      </div>\r\n\r\n      <div class=\"tab-pane fade show\" id=\"pills-bittingLog\" role=\"tabpanel\" aria-labelledby=\"bittingLog\">\r\n        <div class=\"innertable\">\r\n          <div class=\"table-responsive\">\r\n            <table class=\"table\">\r\n              <thead class=\"thead-light\">\r\n                <tr>                  \r\n                  <th scope=\"col\">Date</th>\r\n                  <th scope=\"col\">Student</th>\r\n                  <th scope=\"col\">Location</th>\r\n                  <th scope=\"col\">Incident</th>\r\n                  <th scope=\"col\">Report Date</th>\r\n                  <th scope=\"col\">Reporter</th>\r\n                  <th scope=\"col\">Action Taken</th>\r\n                  <th scope=\"col\" class=\"text-center\">Actions</th>\r\n                </tr>\r\n              </thead>\r\n              <tbody *ngIf=\"incidentsList.length != 0\">\r\n                <tr *ngFor=\"let incidents of bitingLogList\">\r\n                  \r\n                  <td>{{incidents.incidentDate | date}}</td>\r\n                  <td>{{incidents.studentName}}</td>\r\n                  <td>{{incidents.placeOfIncident}} </td>\r\n                  <td>{{incidents.description}}</td>\r\n                  <td>{{incidents.createdDate | date}}</td>\r\n                  <td>{{incidents.teacherName}}</td>\r\n                  <td>{{incidents.actionTaken}}</td>\r\n                  <td class=\"text-center\">\r\n                   \r\n                    <a data-toggle=\"modal\" data-target=\".addincident\" title=\"Edit/View incident\" (click)=\"getIncidentsDetails(incidents, 2)\">\r\n                      <i class=\"fa fa-pencil\" aria-hidden=\"true\"></i>\r\n                    </a>\r\n                    <a title=\"Delete incident\">\r\n                      <i class=\"fa fa-trash\" *ngIf=\"!incidents.isAcknowledge\" aria-hidden=\"true\" title=\"Edit/View incident\" (click)=\"deleteIncident(incidents)\"></i>\r\n                    </a>\r\n                  </td>\r\n                </tr>\r\n              </tbody>\r\n            </table>\r\n            <div class=\"text-center\">\r\n                <span *ngIf=\"(incidentsList.length == 0 && !loader )\">No result found</span>\r\n              </div>\r\n          </div>\r\n          <p-paginator [alwaysShow]=\"false\" [rows]=\"limit\" [totalRecords]=\"totalRecord\" (onPageChange)=\"paginate($event,2)\"></p-paginator>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n\r\n    <!-- modal start -->\r\n\r\n    <div class=\"modal fade addincident\" id=\"#addincident\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myLargeModalLabel\"\r\n      aria-hidden=\"true\">\r\n      <div class=\"modal-dialog modal-lg\">\r\n        <div class=\"modal-content\">\r\n          <div class=\"modal-header\">\r\n            <h5 class=\"modal-title\" id=\"exampleModalLongTitle\">Add Incident</h5>\r\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n              <span aria-hidden=\"true\">&times;</span>\r\n            </button>\r\n          </div>\r\n          <div class=\"modal-body\">\r\n            <form [formGroup]=\"incidentForm\">\r\n              <div class=\"row mb-20\">\r\n                <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"exampleFormControlSelect1\">Class*</label>\r\n                    <select class=\"form-control\" placeholder=\"Serch\" formControlName=\"class\" id=\"exampleFormControlSelect1\"\r\n                      (change)=\"getStudentsList()\">\r\n                      <option value=\"\">Select class</option>\r\n                      <option *ngFor=\"let classes of classList\" [value]=\"classes.classesID\">{{classes.className}}</option>\r\n                    </select>\r\n                    <div *ngIf=\"f.class.invalid && (f.class.dirty || f.class.touched)\" class=\"text-left errormsg\">\r\n                      <span *ngIf=\"f.class.errors.required\">\r\n                        <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please select class</span>\r\n                      </span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"exampleFormControlSelect1\">Student Name*</label>\r\n                    <select class=\"form-control\" placeholder=\"Serch\" formControlName=\"studentname\" id=\"exampleFormControlSelect2\"\r\n                      (change)=\"getAllParticipants()\">\r\n                      <option value=\"\">Select student name </option>\r\n                      <option *ngFor=\"let students of studentList\" [value]=\"students.studentId\">{{students.studentName}}</option>\r\n                    </select>                   \r\n                    <div *ngIf=\"f.studentname.invalid && (f.studentname.dirty || f.studentname.touched)\" class=\"text-left errormsg\">\r\n                      <span *ngIf=\"f.studentname.errors.required\">\r\n                        <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please select student</span>\r\n                      </span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n\r\n\r\n\r\n              <div class=\"row mb-20\">\r\n               \r\n                <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"\">Place of Incident*</label>\r\n                    <input type=\"text \" class=\"form-control\" formControlName=\"location\" id=\"\" aria-describedby=\"\"\r\n                      placeholder=\"Enter place of incident\">\r\n                    <div *ngIf=\"f.location.invalid && (f.location.dirty || f.location.touched)\" class=\"text-left errormsg\">\r\n                      <span *ngIf=\"f.location.errors.required\">\r\n                        <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please enter place of incident</span>\r\n                      </span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"\">Nature of Injury*</label>\r\n                    <!-- <input type=\"text \" class=\"form-control\" formControlName=\"nature\" id=\"nature\" aria-describedby=\"\" placeholder=\"Enter Nature of Injury \"> -->\r\n                    <select class=\"form-control\" placeholder=\"Nature of injury\" formControlName=\"nature\" id=\"exampleFormControlSelect1\">\r\n                      <option value=\"\">Select option</option>\r\n                      <option *ngFor=\"let injuries of injurriesList\" [value]=\"injuries.id\">{{injuries.natureOfInjuryName}}</option>\r\n                    </select>\r\n\r\n                    <div *ngIf=\"f.nature.invalid && (f.nature.dirty || f.nature.touched)\" class=\"text-left errormsg\">\r\n                      <span *ngIf=\"f.nature.errors.required\">\r\n                        <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please enter nature of injury</span>\r\n                      </span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n\r\n              <div class=\"row mb-20\">\r\n                \r\n                <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"\">Involved Participant(s)</label>\r\n                    <p-multiSelect [options]=\"participantsList\" formControlName=\"participants\" [panelStyle]=\"{minWidth:'200px'}\"\r\n                      [maxSelectedLabels]=\"5\"></p-multiSelect>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"exampleFormControlSelect1\"> First Aid Administered By*</label>\r\n                    <select class=\"form-control\" placeholder=\"First Aid Administered by\" formControlName=\"firstaidadmin\" id=\"exampleFormControlSelect1\">\r\n                      <option value=\"\">Select Reporter</option>\r\n                      <option *ngFor=\"let teachers of teacherList\" [value]=\"teachers.id\">{{teachers.teacherName}}</option>\r\n                    </select>\r\n                    <div *ngIf=\"f.firstaidadmin.invalid && (f.firstaidadmin.dirty || f.firstaidadmin.touched)\" class=\"text-left errormsg\">\r\n                      <span *ngIf=\"f.firstaidadmin.errors.required\">\r\n                        <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please select first aid Administered by</span>\r\n                      </span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n\r\n              \r\n\r\n\r\n              <div class=\"row mb-20\">\r\n                \r\n                <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"exampleFormControlSelect1\"> Doctor Required?*</label>\r\n                    <select class=\"form-control\" formControlName=\"doctorrequired\" id=\"exampleFormControlSelect1\">\r\n                      <option value=\"\">Select option</option>\r\n                      <option value=\"true\">Yes</option>\r\n                      <option value=\"false\">No</option>\r\n                    </select>\r\n                    <div *ngIf=\"f.doctorrequired.invalid && (f.doctorrequired.dirty || f.doctorrequired.touched)\" class=\"text-left errormsg\">\r\n                      <span *ngIf=\"f.doctorrequired.errors.required\">\r\n                        <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please select option</span>\r\n                      </span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"\">Date of Incident*</label>\r\n                    <!-- <input type=\"date \" class=\"form-control\" formControlName=\"dateofincident\" id=\"\" aria-describedby=\"\" placeholder=\"Select Incident Date\"> -->\r\n                    <input type=\"text\" placeholder=\"Select date of incident\" formControlName=\"dateofincident\" showWeekNumbers=\"false\"\r\n                      [maxDate]=\"today\" class=\"form-control\" [bsConfig]=\"dpConfig\" bsDatepicker>\r\n\r\n                    <div *ngIf=\"f.dateofincident.invalid && (f.dateofincident.dirty || f.dateofincident.touched)\" class=\"text-left errormsg\">\r\n                      <span *ngIf=\"f.dateofincident.errors.required\">\r\n                        <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please select date of incident</span>\r\n                      </span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n\r\n              <div class=\"row mb-20\">\r\n                <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"\">Time of Incident*</label>\r\n                    <p-calendar class=\"custom-inputbox-incedent\"  styleClass=\"form-control\"  formControlName=\"timeofincident\" [timeOnly]=\"true\" hourFormat=\"12\" icon=\"pi pi-clock\" [showIcon]=\"true\" placeholder=\"Time of Incident\"></p-calendar>\r\n                    <!-- <timepicker formControlName=\"timeofincident\"></timepicker> -->\r\n                    <div *ngIf=\"f.timeofincident.invalid && (f.timeofincident.dirty || f.timeofincident.touched)\" class=\"text-left errormsg\">\r\n                      <span *ngIf=\"f.timeofincident.errors.required\">\r\n                        <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please select time</span>\r\n                      </span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"exampleFormControlSelect1\">Was Parent Informed?*</label>\r\n                    <select class=\"form-control\" formControlName=\"parentinformed\" id=\"exampleFormControlSelect1\">\r\n                      <option value=\"\">Select option</option>\r\n                      <option value=\"true\">Yes</option>\r\n                      <option value=\"false\">No</option>\r\n                    </select>\r\n                    <div *ngIf=\"f.parentinformed.invalid && (f.parentinformed.dirty || f.parentinformed.touched)\" class=\"text-left errormsg\">\r\n                      <span *ngIf=\"f.parentinformed.errors.required\">\r\n                        <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please select option</span>\r\n                      </span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n\r\n              <div class=\"row mb-20\">\r\n              \r\n\r\n                <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"\">If Yes, Then How?</label>\r\n                    <input type=\"text\" class=\"form-control\" formControlName=\"wayofinform\" id=\"\" aria-describedby=\"\"\r\n                      placeholder=\"Enter How We Inform To Parent\">\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"\">Description of the Injury</label>\r\n                    <textarea type=\"text\" formControlName=\"description\" class=\"form-control\" id=\"\" aria-describedby=\"\"\r\n                      placeholder=\"Enter Description\"> </textarea>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n\r\n              <div class=\"row mb-20\">\r\n               \r\n                <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"\">Action Taken</label>\r\n                    <textarea type=\"text\" formControlName=\"action\" class=\"form-control\" id=\"\" aria-describedby=\"\"\r\n                      placeholder=\"Enter Action Taken\"> </textarea>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"\">Incident Priority</label>\r\n                    <select class=\"form-control\" formControlName=\"priority\" id=\"exampleFormControlSelect1\">\r\n                      <option value=\"\">Select priority</option>\r\n                      <option *ngFor=\"let obj of incidentPrioritiesList\" [value]=\"obj.value\">{{obj.label}}</option>\r\n                    </select>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"row mb-20\">\r\n                <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"\">Part of Body</label>\r\n                    <input type=\"text\" class=\"form-control\" formControlName=\"partofbody\" id=\"\" aria-describedby=\"\"\r\n                      placeholder=\"Injured body part\">\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"\">Context Environment</label>\r\n                    <input type=\"text\" class=\"form-control\" formControlName=\"contextenviroment\" id=\"\" aria-describedby=\"\"\r\n                    placeholder=\"Context Environment\">\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"row mb-20\" *ngIf=\"incidentId\">\r\n                <div class=\"col-lg-12\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"\">Comment From Parent</label>\r\n                    <textarea disabled type=\"text\" rows=\"5\" maxlength=\"500\" formControlName=\"parentcomment\" class=\"form-control\" id=\"\" aria-describedby=\"\" placeholder=\"Enter comment\"> </textarea>\r\n                    </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"row mb-20\">\r\n                <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"\">Context Child</label>\r\n                    <input type=\"text\" class=\"form-control\" formControlName=\"contextchild\" id=\"\" aria-describedby=\"\"\r\n                      placeholder=\"Context Child\">\r\n                  </div>\r\n                </div>                \r\n              </div>\r\n            </form>\r\n            <div class=\"row mb-20\" *ngIf=\"incidentId != 0 && incidentVm.isAcknowledge\">\r\n              <div class=\"col-lg-6\">\r\n               <p> <b>Note:</b> This incident is acknowledge by parent, You can't edit or delete it.</p>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"modal-footer\">\r\n            <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\r\n            <button type=\"button\" *ngIf=\"incidentId == 0\" class=\"btn btn-primary\" (click)=\"saveIncident(2)\"> Add\r\n              Incident Report </button>\r\n            <button type=\"button\" *ngIf=\"incidentId != 0 && !incidentVm.isAcknowledge\" class=\"btn btn-primary\" (click)=\"saveIncident(3)\"> Update\r\n              Incident Report </button>\r\n              <button type=\"button\" *ngIf=\"incidentId != 0 && incidentVm.isAcknowledge\" disabled class=\"btn btn-primary\"> Update\r\n                Incident Report </button>\r\n          </div>\r\n        </div>\r\n\r\n\r\n      </div>\r\n    </div>\r\n\r\n\r\n\r\n  </div>\r\n</div>\r\n\r\n\r\n<ngx-spinner type=\"ball-atom\" size=\"medium\" color=\"#58A7FE\"></ngx-spinner>\r\n<app-confirm-box></app-confirm-box>\r\n"

/***/ }),

/***/ "./src/app/layout/teacher/components/teacherincedent/teacherincedent.component.ts":
/*!****************************************************************************************!*\
  !*** ./src/app/layout/teacher/components/teacherincedent/teacherincedent.component.ts ***!
  \****************************************************************************************/
/*! exports provided: TeacherincedentComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TeacherincedentComponent", function() { return TeacherincedentComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_services_teacher_api_service_teacher_api_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/services/teacher-api-service/teacher-api.service */ "./src/app/layout/teacher/shared/services/teacher-api-service/teacher-api.service.ts");
/* harmony import */ var _shared_services_error_handler_error_handler_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../shared/services/error-handler/error-handler.service */ "./src/app/shared/services/error-handler/error-handler.service.ts");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var _shared_services_notification_service_notification_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../shared/services/notification-service/notification.service */ "./src/app/shared/services/notification-service/notification.service.ts");
/* harmony import */ var _shared_services_common_common_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../shared/services/common/common.service */ "./src/app/shared/services/common/common.service.ts");
/* harmony import */ var _shared_constant__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../shared/constant */ "./src/app/layout/teacher/shared/constant.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ngx_bootstrap__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-bootstrap */ "./node_modules/ngx-bootstrap/esm5/ngx-bootstrap.js");
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! primeng/api */ "./node_modules/primeng/api.js");
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(primeng_api__WEBPACK_IMPORTED_MODULE_9__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var TeacherincedentComponent = /** @class */ (function () {
    function TeacherincedentComponent(apiService, error, spinner, notification, commonService, fb, confirmationService) {
        this.apiService = apiService;
        this.error = error;
        this.spinner = spinner;
        this.notification = notification;
        this.commonService = commonService;
        this.fb = fb;
        this.confirmationService = confirmationService;
        this.incidentsList = [];
        this.incidentDetails = [];
        this.incidentVm = {};
        this.classList = [];
        this.studentList = [];
        this.searchedStudentList = [];
        this.IncidentInvolvments = [];
        this.participantSudents = [];
        this.participantsList = [];
        this.teacherList = [];
        this.closeModal = '';
        this.injurriesList = [];
        this.incidentPrioritiesList = [];
        this.bitingLogList = [];
        this.loader = true;
        this.mode = 0;
        this.activeTab = 1;
        this.pageNo = 0;
        this.limit = 10;
        this.totalRecord = 0;
        this.showClearBtn = false;
        this.dpConfig = new ngx_bootstrap__WEBPACK_IMPORTED_MODULE_8__["BsDatepickerConfig"]();
    }
    TeacherincedentComponent.prototype.ngOnInit = function () {
        this.loader = true;
        this.participantSudents = [];
        this.incidentVm = {};
        this.incidentId = 0;
        this.dpConfig = Object.assign({}, { containerClass: 'theme-dark-blue' }, { showWeekNumbers: false });
        // this.spinner.show();
        this.today = new Date();
        this.createIncidentForm();
        this.getAllIncidents();
        this.getAllClassess();
        this.getAllTeachers();
        this.getAllNatureofinjury();
        this.getIncidentPriorities();
    };
    TeacherincedentComponent.prototype.createIncidentForm = function () {
        if (this.incidentId === 0) {
            this.incidentForm = this.fb.group({
                studentname: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].required],
                age: [''],
                reporter: [''],
                location: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].required],
                nature: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].required],
                participants: [''],
                firstaidadmin: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].required],
                doctorrequired: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].required],
                dateofincident: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].required],
                timeofincident: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].required],
                parentinformed: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].required],
                wayofinform: [''],
                description: [''],
                action: [''],
                class: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].required],
                priority: [''],
                partofbody: [''],
                contextenviroment: [''],
                contextchild: [''],
                parentcomment: [''],
                acknowledge: [false]
            });
        }
    };
    TeacherincedentComponent.prototype.createEditablrForm = function () {
        if (this.incidentId !== 0) {
            this.incidentForm = this.fb.group({
                studentname: [this.incidentVm.StudentID, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].required],
                age: [''],
                reporter: [this.incidentVm.Reporter],
                location: [this.incidentVm.IncidentLocation, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].required],
                nature: [this.incidentVm.NatureOfInjuryID, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].required],
                participants: [this.participantSudents],
                firstaidadmin: [this.incidentVm.FirstAidAdministeredID, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].required],
                doctorrequired: [this.incidentVm.IsDoctorRequired, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].required],
                dateofincident: [this.incidentVm.IncidentDate, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].required],
                timeofincident: [this.incidentVm.IncidentTime, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].required],
                parentinformed: [this.incidentVm.WasParentInformed, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].required],
                wayofinform: [this.incidentVm.ParentInformedBy],
                description: [this.incidentVm.Description],
                action: [this.incidentVm.ActionTaken],
                class: [this.incidentVm.ClassesID, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].required],
                priority: [this.incidentVm.IncidentPriortyTypeID],
                partofbody: [this.incidentVm.partOfBody],
                contextenviroment: [this.incidentVm.contextEnviroment],
                contextchild: [this.incidentVm.contextChild],
                parentcomment: [this.incidentVm.ParentComment],
                acknowledge: [this.incidentVm.isAcknowledge]
            });
        }
    };
    Object.defineProperty(TeacherincedentComponent.prototype, "f", {
        // convenience getter for easy access to form fields
        get: function () { return this.incidentForm.controls; },
        enumerable: true,
        configurable: true
    });
    TeacherincedentComponent.prototype.getIncidentsDetails = function (data, type) {
        var _this = this;
        this.mode = type;
        this.getAllParticipants();
        this.incidentVm = {};
        this.spinner.show();
        var req = {
            'agencyID': this.commonService.getAgencyId(),
            'incidentID': data.id,
        };
        this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_6__["TeacherAPIURLs"].GetIncidentsDetails, req, null).subscribe(function (res) {
            if (res.body.statusCode === 200) {
                if (res.body.data !== null) {
                    _this.incidentVm.AgencyID = _this.commonService.getAgencyId();
                    _this.incidentId = res.body.data.id;
                    _this.incidentVm.ClassesID = res.body.data.classesID;
                    _this.incidentVm.StudentID = res.body.data.studentID;
                    _this.incidentVm.Reporter = res.body.data.teacherID;
                    _this.incidentVm.IncidentLocation = res.body.data.placeOfIncident;
                    _this.incidentVm.NatureOfInjuryID = res.body.data.natureOfInjuryID;
                    _this.incidentVm.FirstAidAdministeredID = res.body.data.firstAidAdministeredID;
                    _this.incidentVm.IsDoctorRequired = res.body.data.isDoctorRequired;
                    _this.incidentVm.IncidentDate = _this.commonService.getLocalDateTimeFromUTC(res.body.data.incidentDate);
                    _this.incidentVm.IncidentTime = _this.commonService.getLocalDateTimeFromUTC(res.body.data.incidentTime);
                    // this.incidentForm.controls['timeofincident'].setValue(this.incidentVm.IncidentTime);
                    _this.incidentVm.WasParentInformed = res.body.data.wasParentInformed;
                    _this.incidentVm.Description = res.body.data.description;
                    _this.incidentVm.ActionTaken = res.body.data.actionTaken;
                    _this.incidentVm.IncidentPriortyTypeID = res.body.data.incidentPriortyTypeID;
                    _this.incidentVm.ParentInformedBy = res.body.data.parentInformedBy;
                    _this.incidentVm.contextChild = res.body.data.contextChild;
                    _this.incidentVm.contextEnviroment = res.body.data.contextEnviroment;
                    _this.incidentVm.partOfBody = res.body.data.partOfBody;
                    _this.incidentVm.isAcknowledge = res.body.data.isAcknowledge;
                    _this.incidentVm.ParentComment = res.body.data.parentComment;
                    _this.participantSudents = [];
                    res.body.data.incidentInvolvments.forEach(function (element) {
                        _this.participantSudents.push(element.studentID);
                    });
                    _this.createEditablrForm();
                    _this.getStudentsList();
                    _this.spinner.hide();
                }
            }
            else {
                _this.spinner.hide();
                _this.error.unknownError();
            }
        }, function (err) {
            _this.spinner.hide();
            _this.error.commonError(err);
        });
    };
    TeacherincedentComponent.prototype.getAllIncidents = function () {
        var _this = this;
        this.loader = true;
        this.spinner.show();
        var req = {
            'agencyID': this.commonService.getAgencyId(),
            'limit': this.limit,
            'page': this.pageNo,
            'fromDate': this.fromDate ? this.fromDate : this.blankDate,
            'toDate': this.toDate ? this.toDate : this.blankDate,
            'studentName': this.searchByStudentName
        };
        this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_6__["TeacherAPIURLs"].GetAllIncidents, req, null).subscribe(function (res) {
            if (res.body.statusCode === 200) {
                _this.totalRecord = res.body.totalRows;
                _this.incidentsList = res.body.data;
                _this.getIncidentCountWithActionTaken(_this.incidentsList);
                _this.spinner.hide();
                _this.loader = false;
            }
            else {
                _this.spinner.hide();
                _this.error.unknownError();
            }
        }, function (err) {
            _this.spinner.hide();
            _this.error.commonError(err);
        });
    };
    TeacherincedentComponent.prototype.getAllBitingIncidents = function () {
        var _this = this;
        this.spinner.show();
        var req = {
            'agencyID': this.commonService.getAgencyId(),
            'limit': this.limit,
            'page': this.pageNo
        };
        this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_6__["TeacherAPIURLs"].GetBittingIncidentsDetails, req, null).subscribe(function (res) {
            if (res.body.statusCode === 200) {
                _this.totalRecord = res.body.totalRows;
                _this.bitingLogList = res.body.data;
                // this.getIncidentCountWithActionTaken(this.incidentsList);
                _this.spinner.hide();
                _this.loader = false;
            }
            else {
                _this.spinner.hide();
                _this.error.unknownError();
            }
        }, function (err) {
            _this.spinner.hide();
            _this.error.commonError(err);
        });
    };
    // Get All teacher List
    TeacherincedentComponent.prototype.getAllTeachers = function () {
        var _this = this;
        // this.spinner.show();
        var req = {
            'agencyID': this.commonService.getAgencyId(),
        };
        this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_6__["TeacherAPIURLs"].GetAllTeachers, req, null).subscribe(function (res) {
            if (res.body.statusCode === 200) {
                _this.teacherList = res.body.data;
                //  this.spinner.hide();
            }
            else {
                //   this.spinner.hide();
                _this.error.unknownError();
            }
        }, function (err) {
            _this.spinner.hide();
            _this.error.commonError(err);
        });
    };
    // Method to create incident
    TeacherincedentComponent.prototype.saveIncident = function (type) {
        var _this = this;
        this.IncidentInvolvments = [];
        if (this.incidentForm.valid) {
            this.spinner.show();
            this.incidentVm.StudentID = this.incidentForm.value.studentname;
            //  this.incidentVm.Age =  this.incidentForm.value.age;
            this.incidentVm.AgencyID = this.commonService.getAgencyId();
            this.incidentVm.TeacherID = this.commonService.getReleventUserId('userdetails'); // sending teacher id as reporter id
            this.incidentVm.IncidentPriortyTypeID = this.incidentForm.value.priority === '' ? 0 : this.incidentForm.value.priority;
            this.incidentVm.Reporter = this.incidentForm.value.reporter;
            this.incidentVm.PlaceOfIncident = this.incidentForm.value.location;
            this.incidentVm.contextChild = this.incidentForm.value.contextchild;
            this.incidentVm.contextEnviroment = this.incidentForm.value.contextenviroment;
            this.incidentVm.partOfBody = this.incidentForm.value.partofbody;
            this.incidentVm.Id = this.incidentId !== 0 ? this.incidentId : 0;
            this.incidentVm.NatureOfInjuryID = this.incidentForm.value.nature;
            this.incidentVm.IncidentTime = new Date(this.incidentForm.value.timeofincident);
            if (this.incidentForm.value.participants.length !== 0) {
                this.incidentForm.value.participants.forEach(function (element) {
                    _this.IncidentInvolvments.push({
                        'id': 0,
                        'agencyID': _this.commonService.getAgencyId(),
                        'studentID': element,
                        'studentName': '',
                        'classesID': _this.incidentForm.value.class,
                        'className': '',
                        'incidentID': _this.incidentId !== 0 ? _this.incidentId : 0
                    });
                });
            }
            this.incidentVm.FirstAidAdministeredID = this.incidentForm.value.firstaidadmin;
            this.incidentVm.IncidentDate = this.incidentForm.value.dateofincident;
            this.incidentVm.ParentInformedBy = this.incidentForm.value.wayofinform;
            this.incidentVm.WasParentInformed = this.incidentForm.value.parentinformed;
            this.incidentVm.Description = this.incidentForm.value.description;
            this.incidentVm.ActionTaken = this.incidentForm.value.action;
            this.incidentVm.ClassesID = this.incidentForm.value.class;
            this.incidentVm.IncidentInvolvments = this.IncidentInvolvments;
            this.incidentVm.isAcknowledge = this.incidentForm.value.acknowledge;
            this.incidentVm.ParentComment = this.incidentForm.value.parentcomment;
            this.incidentVm.createdBy = this.incidentId === 0 ? null : this.commonService.getLoggedInUserId();
            this.incidentVm.updatedBy = this.incidentId !== 0 ? this.commonService.getLoggedInUserId() : null;
            this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_6__["TeacherAPIURLs"].SaveIncident, this.incidentVm, null).subscribe(function (res) {
                if (res.body.statusCode === 200) {
                    // this.incidentForm.reset();
                    _this.notification.success({
                        message: _this.incidentId !== 0 ? 'Incident report updated successfully'
                            : 'Incident report added successfully', title: ''
                    });
                    if (type === 2 || _this.mode === 1) {
                        _this.activeTab = 2;
                        $('#incidentLog').tab('show');
                        _this.getAllIncidents();
                    }
                    else {
                        _this.getAllBitingIncidents();
                    }
                    $('.addincident').modal('hide');
                    // this.spinner.hide();
                }
                else {
                    _this.spinner.hide();
                    _this.error.unknownError();
                }
            }, function (err) {
                _this.spinner.hide();
                _this.error.commonError(err);
            });
        }
        else {
            //  this.validateAllFields(this.incidentForm);
            this.spinner.hide();
            this.commonService.validateAllFields(this.incidentForm);
        }
    };
    TeacherincedentComponent.prototype.changeForm = function () {
        this.activeTab = 2;
        $('#incidentLog').tab('show');
    };
    TeacherincedentComponent.prototype.closeDialog = function () {
        this.closeModal = 'modal';
        $('.addincident').modal('hide');
    };
    TeacherincedentComponent.prototype.getAllClassess = function () {
        var _this = this;
        // this.spinner.show();
        var data = {
            'agencyID': this.commonService.getAgencyId()
        };
        this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_6__["TeacherAPIURLs"].GetAllClasses, data, null).subscribe(function (res) {
            //  this.spinner.hide();
            if (res.body.statusCode === 200) {
                _this.classList = res.body.data;
            }
            else {
                //     this.spinner.hide();
                _this.error.unknownError();
            }
        }, function (err) {
            _this.spinner.hide();
            _this.error.commonError(err);
        });
    };
    TeacherincedentComponent.prototype.getStudentsList = function () {
        var _this = this;
        this.spinner.show();
        var data = {
            'agencyID': this.commonService.getAgencyId(),
            'classID': this.incidentForm.value.class,
            'studentID': 0,
            'studentName': ''
        };
        this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_6__["TeacherAPIURLs"].GetAllStudentsByClass, data, null).subscribe(function (res) {
            if (res.body.statusCode === 200) {
                _this.spinner.hide();
                _this.studentList = res.body.data;
                // student.forEach(element => {
                //   this.studentList.push(element.studentName);
                // });
            }
            else {
                _this.spinner.hide();
                _this.error.unknownError();
            }
        }, function (err) {
            _this.spinner.hide();
            _this.error.commonError(err);
        });
    };
    // Method to search organization name
    //  searchStudent(text) {
    // if (text.query.length <= 2 && text.query !== '') {
    //   return;
    // }
    // this.searchedStudentList = [];
    // for (let i = 0; i < this..length; i++) {
    //   const organization = this.allOrganizationList[i];
    //   if (organization.toLowerCase().indexOf(text.query.toLowerCase()) === 0) {
    //     this.organizationList.push(organization);
    //     }
    //   }
    // }
    TeacherincedentComponent.prototype.searchStudent = function (text) { };
    TeacherincedentComponent.prototype.clearForm = function () {
        this.incidentId = 0;
        this.participantsList = [];
        this.studentList = [];
        // this.incidentForm.reset();
        this.createIncidentForm();
    };
    // Method to delete the incident
    TeacherincedentComponent.prototype.deleteIncident = function (value) {
        var _this = this;
        this.confirmationService.confirm({
            message: 'Do you want to delete this record?',
            accept: function () {
                _this.spinner.show();
                var data = {
                    'agencyID': _this.commonService.getAgencyId(),
                    'Id': value.id,
                    'IsDeleted': true,
                    'DeletedDate': new Date(),
                    'DeletedBy': _this.commonService.getLoggedInUserId()
                };
                _this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_6__["TeacherAPIURLs"].DeleteIncident, data, null).subscribe(function (res) {
                    if (res.body.statusCode === 200) {
                        // this.spinner.hide();
                        _this.deleteIncidentSuccess(value);
                    }
                    else {
                        _this.spinner.hide();
                        _this.error.unknownError();
                    }
                }, function (err) {
                    _this.spinner.hide();
                    _this.error.commonError(err);
                });
            }
        });
    };
    TeacherincedentComponent.prototype.deleteIncidentSuccess = function (data) {
        // if (res.body === 1) {
        var index = this.incidentsList.findIndex(function (r) { return r.id === data.id; });
        this.incidentsList.splice(index, 1);
        var index2 = this.bitingLogList.findIndex(function (r) { return r.id === data.id; });
        this.bitingLogList.splice(index2, 1);
        this.getIncidentCountWithActionTaken(this.incidentsList);
        this.spinner.hide();
        this.notification.success({ message: 'Incident report deleted successfully', title: '' });
        // } else {
        //   this.error.unknownError();
        // }
    };
    TeacherincedentComponent.prototype.getAllNatureofinjury = function () {
        var _this = this;
        // this.spinner.show();
        var data = {
            'agencyID': this.commonService.getAgencyId()
        };
        this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_6__["TeacherAPIURLs"].GetAllNatureofinjury, data, null).subscribe(function (res) {
            if (res.body.statusCode === 200) {
                //   this.spinner.hide();
                _this.injurriesList = res.body.data;
                // student.forEach(element => {
                //   this.studentList.push(element.studentName);
                // });
            }
            else {
                _this.spinner.hide();
                _this.error.unknownError();
            }
        }, function (err) {
            _this.spinner.hide();
            _this.error.commonError(err);
        });
    };
    TeacherincedentComponent.prototype.getAllParticipants = function () {
        var _this = this;
        this.incidentForm.controls['participants'].setValue('');
        this.participantsList = [];
        var data = {
            'agencyID': this.commonService.getAgencyId()
        };
        this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_6__["TeacherAPIURLs"].GetAllStudentDropdown, data, null).subscribe(function (res) {
            if (res.body.statusCode === 200) {
                //   this.spinner.hide();
                var list = res.body.data;
                list.forEach(function (element) {
                    if (element.value.toString() !== _this.incidentForm.value.studentname) {
                        _this.participantsList.push(element);
                    }
                });
            }
            else {
                _this.spinner.hide();
                _this.error.unknownError();
            }
        }, function (err) {
            _this.spinner.hide();
            _this.error.commonError(err);
        });
    };
    TeacherincedentComponent.prototype.getIncidentPriorities = function () {
        var _this = this;
        this.incidentForm.controls['participants'].setValue('');
        this.participantsList = [];
        var data = {
            'agencyID': this.commonService.getAgencyId()
        };
        this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_6__["TeacherAPIURLs"].GetAllIncidentPriortyTypeDropdown, data, null).subscribe(function (res) {
            if (res.body.statusCode === 200) {
                //   this.spinner.hide();
                _this.incidentPrioritiesList = res.body.data;
            }
            else {
                _this.spinner.hide();
                _this.error.unknownError();
            }
        }, function (err) {
            _this.spinner.hide();
            _this.error.commonError(err);
        });
    };
    /**Method to get incident counts on which action is not taken*/
    TeacherincedentComponent.prototype.getIncidentCountWithActionTaken = function (listofincident) {
        var count = 0;
        listofincident.forEach(function (element) {
            if (element.actionTaken === '') {
                count++;
            }
        });
        this.commonService.saveIncidentCount(count);
    };
    TeacherincedentComponent.prototype.paginate = function (event, tab) {
        this.pageNo = event.page;
        // this.limit = event.page;
        if (tab === 1) {
            this.getAllIncidents();
        }
        else {
            this.getAllBitingIncidents();
        }
    };
    TeacherincedentComponent.prototype.onTabChange = function () {
        this.pageNo = 0;
    };
    TeacherincedentComponent.prototype.search = function () {
        this.showClearBtn = true;
        this.getAllIncidents();
    };
    TeacherincedentComponent.prototype.clearSearch = function () {
        this.searchByStudentName = '';
        this.fromDate = null;
        this.toDate = null;
        this.showClearBtn = false;
        this.getAllIncidents();
    };
    TeacherincedentComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-teacherincedent',
            template: __webpack_require__(/*! ./teacherincedent.component.html */ "./src/app/layout/teacher/components/teacherincedent/teacherincedent.component.html"),
            styles: [__webpack_require__(/*! ./teacherincedent.component.css */ "./src/app/layout/teacher/components/teacherincedent/teacherincedent.component.css")]
        }),
        __metadata("design:paramtypes", [_shared_services_teacher_api_service_teacher_api_service__WEBPACK_IMPORTED_MODULE_1__["TeacherApiService"], _shared_services_error_handler_error_handler_service__WEBPACK_IMPORTED_MODULE_2__["ErrorHandlerService"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_3__["NgxSpinnerService"], _shared_services_notification_service_notification_service__WEBPACK_IMPORTED_MODULE_4__["NotificationService"],
            _shared_services_common_common_service__WEBPACK_IMPORTED_MODULE_5__["CommonService"], _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormBuilder"], primeng_api__WEBPACK_IMPORTED_MODULE_9__["ConfirmationService"]])
    ], TeacherincedentComponent);
    return TeacherincedentComponent;
}());



/***/ }),

/***/ "./src/app/layout/teacher/teacher-routing.module.ts":
/*!**********************************************************!*\
  !*** ./src/app/layout/teacher/teacher-routing.module.ts ***!
  \**********************************************************/
/*! exports provided: TeacherRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TeacherRoutingModule", function() { return TeacherRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _components_teacher_attendence_teacher_attendence_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/teacher-attendence/teacher-attendence.component */ "./src/app/layout/teacher/components/teacher-attendence/teacher-attendence.component.ts");
/* harmony import */ var _components_teacher_daily_activity_teacher_daily_activity_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/teacher-daily-activity/teacher-daily-activity.component */ "./src/app/layout/teacher/components/teacher-daily-activity/teacher-daily-activity.component.ts");
/* harmony import */ var _components_teacher_post_activity_teacher_post_activity_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/teacher-post-activity/teacher-post-activity.component */ "./src/app/layout/teacher/components/teacher-post-activity/teacher-post-activity.component.ts");
/* harmony import */ var _components_teacher_message_teacher_message_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/teacher-message/teacher-message.component */ "./src/app/layout/teacher/components/teacher-message/teacher-message.component.ts");
/* harmony import */ var src_app_layout_teacher_components_teacherincedent_teacherincedent_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/layout/teacher/components/teacherincedent/teacherincedent.component */ "./src/app/layout/teacher/components/teacherincedent/teacherincedent.component.ts");
/* harmony import */ var _components_teacher_event_planner_teacher_event_planner_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/teacher-event-planner/teacher-event-planner.component */ "./src/app/layout/teacher/components/teacher-event-planner/teacher-event-planner.component.ts");
/* harmony import */ var _components_teacher_meal_planner_teacher_meal_planner_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/teacher-meal-planner/teacher-meal-planner.component */ "./src/app/layout/teacher/components/teacher-meal-planner/teacher-meal-planner.component.ts");
/* harmony import */ var _components_teacher_dashboard_teacher_dashboard_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/teacher-dashboard/teacher-dashboard.component */ "./src/app/layout/teacher/components/teacher-dashboard/teacher-dashboard.component.ts");
/* harmony import */ var _components_teacher_activity_details_teacher_activity_details_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/teacher-activity-details/teacher-activity-details.component */ "./src/app/layout/teacher/components/teacher-activity-details/teacher-activity-details.component.ts");
/* harmony import */ var _components_teacher_student_list_teacher_student_list_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/teacher-student-list/teacher-student-list.component */ "./src/app/layout/teacher/components/teacher-student-list/teacher-student-list.component.ts");
/* harmony import */ var _components_teacher_student_details_teacher_student_details_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./components/teacher-student-details/teacher-student-details.component */ "./src/app/layout/teacher/components/teacher-student-details/teacher-student-details.component.ts");
/* harmony import */ var _components_teacher_profile_teacher_profile_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./components/teacher-profile/teacher-profile.component */ "./src/app/layout/teacher/components/teacher-profile/teacher-profile.component.ts");
/* harmony import */ var _components_teacher_studentbreak_teacher_studentbreak_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./components/teacher-studentbreak/teacher-studentbreak.component */ "./src/app/layout/teacher/components/teacher-studentbreak/teacher-studentbreak.component.ts");
/* harmony import */ var _components_teacher_breaks_teacher_breaks_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./components/teacher-breaks/teacher-breaks.component */ "./src/app/layout/teacher/components/teacher-breaks/teacher-breaks.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
















var routes = [
    {
        path: '',
        component: _components_teacher_dashboard_teacher_dashboard_component__WEBPACK_IMPORTED_MODULE_9__["TeacherDashboardComponent"]
    },
    {
        path: 'attendence',
        component: _components_teacher_attendence_teacher_attendence_component__WEBPACK_IMPORTED_MODULE_2__["TeacherAttendenceComponent"]
    },
    {
        path: 'dailysheet',
        component: _components_teacher_daily_activity_teacher_daily_activity_component__WEBPACK_IMPORTED_MODULE_3__["TeacherDailyActivityComponent"]
    },
    {
        path: 'postactivity',
        component: _components_teacher_post_activity_teacher_post_activity_component__WEBPACK_IMPORTED_MODULE_4__["TeacherPostActivityComponent"]
    },
    // {
    //     path: 'calender',
    //     component: TeacherCalenderComponent
    // },
    {
        path: 'message',
        component: _components_teacher_message_teacher_message_component__WEBPACK_IMPORTED_MODULE_5__["TeacherMessageComponent"]
    },
    {
        path: 'teacherincidentlog',
        component: src_app_layout_teacher_components_teacherincedent_teacherincedent_component__WEBPACK_IMPORTED_MODULE_6__["TeacherincedentComponent"]
    },
    {
        path: 'eventplan',
        component: _components_teacher_event_planner_teacher_event_planner_component__WEBPACK_IMPORTED_MODULE_7__["TeacherEventPlannerComponent"]
    },
    {
        path: 'mealplan',
        component: _components_teacher_meal_planner_teacher_meal_planner_component__WEBPACK_IMPORTED_MODULE_8__["TeacherMealPlannerComponent"]
    },
    {
        path: 'activitydetails/:id/:classid',
        component: _components_teacher_activity_details_teacher_activity_details_component__WEBPACK_IMPORTED_MODULE_10__["TeacherActivityDetailsComponent"]
    },
    {
        path: 'studentlist',
        component: _components_teacher_student_list_teacher_student_list_component__WEBPACK_IMPORTED_MODULE_11__["TeacherStudentListComponent"]
    },
    {
        path: 'studentdetails/:id/:parentid',
        component: _components_teacher_student_details_teacher_student_details_component__WEBPACK_IMPORTED_MODULE_12__["TeacherStudentDetailsComponent"]
    },
    {
        path: 'profile/:id',
        component: _components_teacher_profile_teacher_profile_component__WEBPACK_IMPORTED_MODULE_13__["TeacherProfileComponent"]
    },
    {
        path: 'studentbreaks/:id/:attendanceid/:allowedit',
        component: _components_teacher_studentbreak_teacher_studentbreak_component__WEBPACK_IMPORTED_MODULE_14__["TeacherStudentbreakComponent"]
    },
    {
        path: 'teacherbreaks',
        component: _components_teacher_breaks_teacher_breaks_component__WEBPACK_IMPORTED_MODULE_15__["TeacherBreaksComponent"]
    },
];
var TeacherRoutingModule = /** @class */ (function () {
    function TeacherRoutingModule() {
    }
    TeacherRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], TeacherRoutingModule);
    return TeacherRoutingModule;
}());



/***/ }),

/***/ "./src/app/layout/teacher/teacher.module.ts":
/*!**************************************************!*\
  !*** ./src/app/layout/teacher/teacher.module.ts ***!
  \**************************************************/
/*! exports provided: TeacherModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TeacherModule", function() { return TeacherModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var src_app_layout_teacher_teacher_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/layout/teacher/teacher-routing.module */ "./src/app/layout/teacher/teacher-routing.module.ts");
/* harmony import */ var _components_teacher_attendence_teacher_attendence_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/teacher-attendence/teacher-attendence.component */ "./src/app/layout/teacher/components/teacher-attendence/teacher-attendence.component.ts");
/* harmony import */ var _components_teacher_daily_activity_teacher_daily_activity_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/teacher-daily-activity/teacher-daily-activity.component */ "./src/app/layout/teacher/components/teacher-daily-activity/teacher-daily-activity.component.ts");
/* harmony import */ var _components_teacher_post_activity_teacher_post_activity_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/teacher-post-activity/teacher-post-activity.component */ "./src/app/layout/teacher/components/teacher-post-activity/teacher-post-activity.component.ts");
/* harmony import */ var _components_teacher_message_teacher_message_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/teacher-message/teacher-message.component */ "./src/app/layout/teacher/components/teacher-message/teacher-message.component.ts");
/* harmony import */ var _components_teacherincedent_teacherincedent_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/teacherincedent/teacherincedent.component */ "./src/app/layout/teacher/components/teacherincedent/teacherincedent.component.ts");
/* harmony import */ var _components_teacher_meal_planner_teacher_meal_planner_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/teacher-meal-planner/teacher-meal-planner.component */ "./src/app/layout/teacher/components/teacher-meal-planner/teacher-meal-planner.component.ts");
/* harmony import */ var _components_teacher_event_planner_teacher_event_planner_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/teacher-event-planner/teacher-event-planner.component */ "./src/app/layout/teacher/components/teacher-event-planner/teacher-event-planner.component.ts");
/* harmony import */ var primeng_dialog__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! primeng/dialog */ "./node_modules/primeng/dialog.js");
/* harmony import */ var primeng_dialog__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(primeng_dialog__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _components_teacher_dashboard_teacher_dashboard_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./components/teacher-dashboard/teacher-dashboard.component */ "./src/app/layout/teacher/components/teacher-dashboard/teacher-dashboard.component.ts");
/* harmony import */ var primeng_multiselect__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! primeng/multiselect */ "./node_modules/primeng/multiselect.js");
/* harmony import */ var primeng_multiselect__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(primeng_multiselect__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _components_teacher_activity_details_teacher_activity_details_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./components/teacher-activity-details/teacher-activity-details.component */ "./src/app/layout/teacher/components/teacher-activity-details/teacher-activity-details.component.ts");
/* harmony import */ var primeng_carousel__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! primeng/carousel */ "./node_modules/primeng/carousel.js");
/* harmony import */ var primeng_carousel__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(primeng_carousel__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var primeng_calendar__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! primeng/calendar */ "./node_modules/primeng/calendar.js");
/* harmony import */ var primeng_calendar__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(primeng_calendar__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var ng_fullcalendar__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ng-fullcalendar */ "./node_modules/ng-fullcalendar/ng-fullcalendar.es5.js");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var _components_teacher_student_list_teacher_student_list_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./components/teacher-student-list/teacher-student-list.component */ "./src/app/layout/teacher/components/teacher-student-list/teacher-student-list.component.ts");
/* harmony import */ var _components_teacher_student_details_teacher_student_details_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./components/teacher-student-details/teacher-student-details.component */ "./src/app/layout/teacher/components/teacher-student-details/teacher-student-details.component.ts");
/* harmony import */ var primeng_paginator__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! primeng/paginator */ "./node_modules/primeng/paginator.js");
/* harmony import */ var primeng_paginator__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(primeng_paginator__WEBPACK_IMPORTED_MODULE_21__);
/* harmony import */ var ngx_bootstrap_datepicker__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ngx-bootstrap/datepicker */ "./node_modules/ngx-bootstrap/datepicker/fesm5/ngx-bootstrap-datepicker.js");
/* harmony import */ var ngx_bootstrap__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ngx-bootstrap */ "./node_modules/ngx-bootstrap/esm5/ngx-bootstrap.js");
/* harmony import */ var primeng_autocomplete__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! primeng/autocomplete */ "./node_modules/primeng/autocomplete.js");
/* harmony import */ var primeng_autocomplete__WEBPACK_IMPORTED_MODULE_24___default = /*#__PURE__*/__webpack_require__.n(primeng_autocomplete__WEBPACK_IMPORTED_MODULE_24__);
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ../../shared/shared.module */ "./src/app/shared/shared.module.ts");
/* harmony import */ var _components_teacher_profile_teacher_profile_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./components/teacher-profile/teacher-profile.component */ "./src/app/layout/teacher/components/teacher-profile/teacher-profile.component.ts");
/* harmony import */ var primeng_fileupload__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! primeng/fileupload */ "./node_modules/primeng/fileupload.js");
/* harmony import */ var primeng_fileupload__WEBPACK_IMPORTED_MODULE_27___default = /*#__PURE__*/__webpack_require__.n(primeng_fileupload__WEBPACK_IMPORTED_MODULE_27__);
/* harmony import */ var primeng_radiobutton__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! primeng/radiobutton */ "./node_modules/primeng/radiobutton.js");
/* harmony import */ var primeng_radiobutton__WEBPACK_IMPORTED_MODULE_28___default = /*#__PURE__*/__webpack_require__.n(primeng_radiobutton__WEBPACK_IMPORTED_MODULE_28__);
/* harmony import */ var primeng_inputswitch__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! primeng/inputswitch */ "./node_modules/primeng/inputswitch.js");
/* harmony import */ var primeng_inputswitch__WEBPACK_IMPORTED_MODULE_29___default = /*#__PURE__*/__webpack_require__.n(primeng_inputswitch__WEBPACK_IMPORTED_MODULE_29__);
/* harmony import */ var _components_teacher_studentbreak_teacher_studentbreak_component__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./components/teacher-studentbreak/teacher-studentbreak.component */ "./src/app/layout/teacher/components/teacher-studentbreak/teacher-studentbreak.component.ts");
/* harmony import */ var _components_teacher_breaks_teacher_breaks_component__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./components/teacher-breaks/teacher-breaks.component */ "./src/app/layout/teacher/components/teacher-breaks/teacher-breaks.component.ts");
/* harmony import */ var primeng_confirmdialog__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! primeng/confirmdialog */ "./node_modules/primeng/confirmdialog.js");
/* harmony import */ var primeng_confirmdialog__WEBPACK_IMPORTED_MODULE_32___default = /*#__PURE__*/__webpack_require__.n(primeng_confirmdialog__WEBPACK_IMPORTED_MODULE_32__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

































var TeacherModule = /** @class */ (function () {
    function TeacherModule() {
    }
    TeacherModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                src_app_layout_teacher_teacher_routing_module__WEBPACK_IMPORTED_MODULE_2__["TeacherRoutingModule"],
                ng_fullcalendar__WEBPACK_IMPORTED_MODULE_17__["FullCalendarModule"],
                primeng_dialog__WEBPACK_IMPORTED_MODULE_10__["DialogModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_11__["ReactiveFormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_11__["FormsModule"],
                primeng_multiselect__WEBPACK_IMPORTED_MODULE_13__["MultiSelectModule"],
                primeng_calendar__WEBPACK_IMPORTED_MODULE_16__["CalendarModule"],
                primeng_carousel__WEBPACK_IMPORTED_MODULE_15__["CarouselModule"],
                ngx_spinner__WEBPACK_IMPORTED_MODULE_18__["NgxSpinnerModule"],
                primeng_paginator__WEBPACK_IMPORTED_MODULE_21__["PaginatorModule"],
                ngx_bootstrap_datepicker__WEBPACK_IMPORTED_MODULE_22__["BsDatepickerModule"].forRoot(),
                ngx_bootstrap__WEBPACK_IMPORTED_MODULE_23__["TimepickerModule"].forRoot(),
                primeng_autocomplete__WEBPACK_IMPORTED_MODULE_24__["AutoCompleteModule"],
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_25__["SharedModule"],
                primeng_fileupload__WEBPACK_IMPORTED_MODULE_27__["FileUploadModule"],
                primeng_radiobutton__WEBPACK_IMPORTED_MODULE_28__["RadioButtonModule"],
                primeng_inputswitch__WEBPACK_IMPORTED_MODULE_29__["InputSwitchModule"],
                primeng_confirmdialog__WEBPACK_IMPORTED_MODULE_32__["ConfirmDialogModule"]
            ],
            declarations: [_components_teacher_attendence_teacher_attendence_component__WEBPACK_IMPORTED_MODULE_3__["TeacherAttendenceComponent"],
                _components_teacher_daily_activity_teacher_daily_activity_component__WEBPACK_IMPORTED_MODULE_4__["TeacherDailyActivityComponent"], _components_teacher_post_activity_teacher_post_activity_component__WEBPACK_IMPORTED_MODULE_5__["TeacherPostActivityComponent"],
                _components_teacher_message_teacher_message_component__WEBPACK_IMPORTED_MODULE_6__["TeacherMessageComponent"], _components_teacherincedent_teacherincedent_component__WEBPACK_IMPORTED_MODULE_7__["TeacherincedentComponent"],
                _components_teacher_meal_planner_teacher_meal_planner_component__WEBPACK_IMPORTED_MODULE_8__["TeacherMealPlannerComponent"], _components_teacher_event_planner_teacher_event_planner_component__WEBPACK_IMPORTED_MODULE_9__["TeacherEventPlannerComponent"],
                _components_teacher_dashboard_teacher_dashboard_component__WEBPACK_IMPORTED_MODULE_12__["TeacherDashboardComponent"], _components_teacher_activity_details_teacher_activity_details_component__WEBPACK_IMPORTED_MODULE_14__["TeacherActivityDetailsComponent"],
                _components_teacher_student_list_teacher_student_list_component__WEBPACK_IMPORTED_MODULE_19__["TeacherStudentListComponent"], _components_teacher_student_details_teacher_student_details_component__WEBPACK_IMPORTED_MODULE_20__["TeacherStudentDetailsComponent"],
                _components_teacher_profile_teacher_profile_component__WEBPACK_IMPORTED_MODULE_26__["TeacherProfileComponent"],
                _components_teacher_studentbreak_teacher_studentbreak_component__WEBPACK_IMPORTED_MODULE_30__["TeacherStudentbreakComponent"],
                _components_teacher_breaks_teacher_breaks_component__WEBPACK_IMPORTED_MODULE_31__["TeacherBreaksComponent"]],
            providers: []
        })
    ], TeacherModule);
    return TeacherModule;
}());



/***/ })

}]);
//# sourceMappingURL=teacher-teacher-module.js.map