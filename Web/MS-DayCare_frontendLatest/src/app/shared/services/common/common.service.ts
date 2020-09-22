import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ReplaySubject, BehaviorSubject } from 'rxjs';
import * as moment from 'moment';
import { LoginUserDetails } from '../view-models/login-user-details';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  role = 0;
  userId = 0;
  agencyID = 0;
  emailAddress:any;
  token = '';
  incidentCount: any;
  userImage: any;
  public incidentData = new ReplaySubject<Array<Object>>();
  public userProfileData = new ReplaySubject<Array<Object>>();
  public loginUserData = new BehaviorSubject<LoginUserDetails>({} as LoginUserDetails);
  public fullNameObj = new ReplaySubject();
  public teacherBreklog = new ReplaySubject();
  public isSubscriptionActive: boolean;
  public isStripeAvailable: boolean;
  constructor(private router: Router) { }
  /** Note : name to get user details is 'userdetails' */
  getAgencyId() {
    const name = 'userdetails';
    if (this.getUserDetails(name)) {
      const user = this.getUserDetails(name);
      if (user) {
        this.agencyID = user.data.agencyID;
      }
    }
    return this.agencyID;

    // return 4;
  }
  getAgencyemailid() {
    const name = 'userdetails';
    if (this.getUserDetails(name)) {
      const user = this.getUserDetails(name);
      if (user) {
        this.emailAddress = user.data.emailAddress;
      }
    }
    return this.emailAddress;

    // return 4;
  }



  /** Date Format*/
  GetFormattedDate(date) {
    const todayTime = new Date(date);
    const month = todayTime.getMonth() + 1;
    const day = todayTime.getDate();
    const year = todayTime.getFullYear();
    return month + '/' + day + '/' + year;
  }

  /** Method to show validation on submit */
  validateAllFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).map((controlName) => {
      // tslint:disable-next-line:no-unused-expression
      formGroup.get(controlName).markAsTouched({ onlySelf: true }) ||formGroup.get(controlName).markAsDirty({ onlySelf: true });
    });
  }


  /**Reject numbers */
  checkForNumber(res) {
    const regexp = new RegExp('^[1-9]\d{0,2}$');
    const result = regexp.test(res.key);
    if (result) {
      res.preventDefault();
      return false;
    }
  }



  /** Reject Special Symbol */
  checkForNameSpecialSymbol(res) {
    const regexp = new RegExp('^[A-Za-z0-9\@\.\_\&\*\#\%\!\$\(\)\,\-\/\ ]*$');
    const result = regexp.test(res.key);
    if (!result) {
      res.preventDefault();
      return false;
    }
  }

  // Allow only alphabet
  allowAlphabetOnly(res) {
    const regexp = new RegExp('^[0-9!@#$&()\\-`.+,/\"]*$');
    const result = regexp.test(res.key);
    if (result) {
      res.preventDefault();
      return false;
    }
  }

  /** Allow only Number */
  allowOnlyNumber(res) {
    const regexp = new RegExp('^([0-9])$');
    const result = regexp.test(res.key);
    if (!result) {
      res.preventDefault();
      return false;
    }
  }

   /* Allow only Number with decimal point */
   allowOnlyNumberWithDecimal(res) {
    const regexp = new RegExp(/^\d*\.?\d*$/);
    const result = regexp.test(res.key);
    if (!result) {
      res.preventDefault();
      return false;
    }
  }


  /** Storing user details in local storage */
  setUserDetails(name, data) {
    localStorage.setItem(name, JSON.stringify(data));
  }

  /** Get user details from local storage */
  getUserDetails(name) {
    return JSON.parse(localStorage.getItem(name));
  }
  


  /** Method to get user detals without localstorage */
  getUserDetailsFromAPI(name) {
    let obj: any;
    this.getLoginUserDetails().subscribe(res => {
    obj = res;
    });
    return obj;
  }

  /**Method to check is user admin or not */
  getUserRole(name) {
    if (this.getUserDetails(name)) {
      const user = this.getUserDetails(name);
      if (user) {
        this.role = user.data.roleId;
      }
    }
    return this.role;
  }

  getParentType() {
    let parenttype = '';
    const name = 'userdetails';
    if (this.getUserDetails(name)) {
      const user = this.getUserDetails(name);
      if (user) {
        this.role = user.data.roleId;
        if (user.data.isGaurdian === true) {
          parenttype = 'guardian';
        } else if (user.data.isParent === true) {
          parenttype = 'parent';
        } else {
          parenttype = 'secondparent';
        }
      }
    }
    return parenttype;
  }

 /**Method to check is user admin or not */
 getReleventUserId(name) {
  if (this.getUserDetails(name)) {
    const user = this.getUserDetails(name);
    if (user) {
      this.userId = user.data.releventUserID;
    }
  }
  return this.userId;
}


 /**Method to get user full name */
 getUserFullName(name) {
   let fullName = '';
  if (this.getUserDetails(name)) {
    const user = this.getUserDetails(name);
    if (user) {
      fullName = user.data.firstName + ' ' + user.data.lastName;
    }
  }
  return fullName;
}


 /**Method to get username / email;*/
 getUserMail() {
  let username = '';
 const name = 'userdetails';
 if (this.getUserDetails(name)) {
   const user = this.getUserDetails(name);
   if (user) {
    username = user.data.emailAddress ;
   }
 }
 return username;
}

  /**Method to check is user admin or not */
  getToken(name) {
    if (this.getUserDetails(name)) {
      const user = this.getUserDetails(name);
      if (user) {
        this.token = user.access_token;
      }
    }
    return this.token;
  }


  /**Method to log out */
  logOut() {
    // localStorage.removeItem('isauthenticated');
    // localStorage.removeItem('usertype');
    this.router.navigate(['/']);
    localStorage.removeItem('path');
    localStorage.removeItem('userdetails');
  }

  /**Method to get first day date of month */
  getFirstDayOfMonth(value) {
    const date = value,
      y = date.getFullYear(), m = date.getMonth();
    const firstDay = new Date(y, m, 1);
    console.log('firs', firstDay.toDateString());
    return firstDay.toDateString();
  }

  getLastDayOfMonth(value) {
    const date = value,
      y = date.getFullYear(), m = date.getMonth();
    const lastDay = new Date(y, m + 1, 0);
    console.log('last', lastDay.toDateString());
    return lastDay.toDateString();
  }


  /**Get incident count */

  getIncidentCount() {
    return this.incidentData.asObservable();
  }

  /**Save incident count */
  saveIncidentCount(count) {
    this.incidentData.next(count);
  }

  /**Get User profile image  */

  getUserProfileImage() {
    return this.userProfileData.asObservable();
  }

  /**SaveUser profile image*/
  saveUserProfileImage(data) {
    this.userProfileData.next(data);
  }


   /**SaveUser profile image*/
   saveUserFullNameFromProfile(data) {
    this.fullNameObj.next(data);
  }

 /** Get User profile image */
  getUserFullNameFromProfile() {
    return this.fullNameObj.asObservable();
  }


   /**SaveUser profile image*/
  saveTeacherBreakLogAPI(data) {
  this.teacherBreklog.next(data);
  }

 /** Get User profile image */
  getTeacherBreakLogAPI() {
    return this.teacherBreklog.asObservable();
  }

  getLocalDateTimeFromUTC(date) {
    const stillUtc = moment.utc(date).toDate();
    const local = moment(stillUtc).local().format('YYYY-MM-DD HH:mm:ss');
    return new Date(local);
  }

  getLocalDateTimeFromUTC2(date) {
    const stillUtc = moment.utc(date).toDate();
    const local = moment(stillUtc).local().format('YYYY-MM-DD HH:mm:ss');
    return new Date(local);
  }

  getStringLocalDateTimeFromUTC(date) {
    const stillUtc = moment.utc(date).toDate();
    const local = moment(stillUtc).local().format('YYYY-MM-DD HH:mm:ss');
    return local;
  }

  getUTCToLocalFormatedTime(date) {
    console.log('call');
    return date === undefined ? null : moment.utc(date).local().format('h:mm A');
  }

  getUTCDate(date) {
    debugger;
    const utc = moment.utc(new Date(date)).toDate();
    return utc;
  }


  getLocalDate(date) {
    const local = moment(date).local(true).toDate();
    return local;
  }

/**Method to get user image path */
  getUserImage(name) {
    if (this.getUserDetails(name)) {
      const user = this.getUserDetails(name);
      if (user) {
        this.userImage = user.data.imagePath;
      }
    }
    return this.userImage;
  }


  getTeacherTodayAttendenceId() {
    return localStorage.getItem('teacherTodayAttendenceId');
  }
  getIsKioskLogin() {
    return localStorage.getItem('iskiosklogin');
  }
  getIsAgencyFieldActive() {
    return localStorage.getItem('agencyLogin');
  }


  // Method to get only date
  getOnlyDate(date) {
    const todayDate = new Date(date);
    todayDate.setHours(0, 0, 0, 0);
    return todayDate;
  }

// Method to get  Subscription Expiration Status for teacher and Agency using local storage
getSubscriptionStatus() {
  let status: boolean;
    const name = 'userdetails';
    if (this.getUserDetails(name)) {
      const user = this.getUserDetails(name);
      if (user) {
        status = user.data.isSubscriptionActive;
      }
    }
    return status;
  }

/** this method return subscription status using API */
   getSubscriptionStatus2() {
    let status: boolean;
      const name = 'userdetails';
      if (this.getUserDetailsFromAPI(name)) {
        const user = this.getUserDetailsFromAPI(name);
        if (user) {
          status = user.data.isSubscriptionActive;
        }
      }
      return status;
    }



// To check that agency admin having a strip account or not
  isStripeAccount() {
    let status: boolean;
    const name = 'userdetails';
    if (this.getUserDetails(name)) {
      const user = this.getUserDetails(name);
      if (user) {
        status = user.data.isStripeAccount;
      }
    }
    return status;
  }

// Method to get primery id of User from user table
  getLoggedInUserId() {
    let loginId = 0;
    const name = 'userdetails';
    if (this.getUserDetails(name)) {
      const user = this.getUserDetails(name);
      if (user) {
        loginId = user.data.loginUserID;
      }
    }
    return loginId;

    // return 4;
  }

  isAuthenticate() {
    let token = '';
    let isAuthenticate = false;
    const user = JSON.parse(localStorage.getItem('userdetails'));
    if (user) {
      token =  user.access_token;
    }
    if (token) {
      isAuthenticate = true;
    } else {
      isAuthenticate = false;
    }

    return isAuthenticate;
  }

/**Save Logged in User data  */
  saveLoginUserDetails(User) {
    this.loginUserData.next(User);
  }

/**To get logged in User data OBSERVABLE  */
  getLoginUserDetails() {
    return this.loginUserData.asObservable();
  }


  /**Reject user Input */
  checkForInput(res) {
    return false;
  }



}





