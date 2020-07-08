import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { TeacherApiService } from '../../shared/services/teacher-api-service/teacher-api.service';
import { TeacherAPIURLs } from '../../shared/constant';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ErrorHandlerService } from '../../../../shared/services/error-handler/error-handler.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from '../../../../shared/services/notification-service/notification.service';
import { PagerService } from '../../../../shared/services/Pager-service/pager.service';
import { CommonService } from '../../../../shared/services/common/common.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Router, NavigationExtras } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { TransferVM } from '../../shared/view-model/transfer-vm';
import { Paginator } from 'primeng/paginator';
declare var $: any;
@Component({
  selector: 'app-teacher-attendence',
  templateUrl: './teacher-attendence.component.html',
  styleUrls: ['./teacher-attendence.component.css']
})
export class TeacherAttendenceComponent implements OnInit {
  cars: any[] = [];
  transferVM: TransferVM;
  transferList: any[] = [];
  checkInForm: FormGroup;
  checkOutForm: FormGroup;
  excuseForm: FormGroup;
  absentForm: FormGroup;
  transferForm: FormGroup;
  showStatus: boolean;
  showCheckInn: boolean;
  serchByClass: string;
  selectClass: string;
  searchDate: any;
  searchByDateString: any;
  studentList: any[] = [];
  checkInOutDetails: any[] = [];
  transferclasses: any[] = [];
  consideredAttendenceId: any;
  markedStudentsList: any[] = [];
  pageSize: number;
  studentId: string;
  studentListid: 0;
  guardiansList: any[] = [];
  today = new Date();
  showAbsentButton: boolean;
  showEditCheckInOutButton: boolean;
  totalRows: number;
  totalPages: number;
  classList: any[] = [];
  absentReasonList: any[] = [];
  showOtherAbsentReason: boolean;
  mytime: Date = new Date();
  showUndoAbsent = false;
  className: string;
  undoAbsentBtn: boolean;
  loader = true;
  tabType = 'checkouttab';
  showTransferButton = true;
  count = 0;
  pageNo = 0;
  limit = 10;
  totalRecord = 0;
  isCurrentDate = true;
  @ViewChild('atndpage') paginator: Paginator;
  // tslint:disable-next-line:no-input-rename
  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  constructor(private apiService: TeacherApiService, private fb: FormBuilder, private error: ErrorHandlerService,
    private spinner: NgxSpinnerService, private confirmationService: ConfirmationService,
    private notification: NotificationService, private commonService: CommonService,
    private router: Router) { }

  ngOnInit() {
    this.searchDate = new Date();
    this.searchByDateString = this.commonService.getStringLocalDateTimeFromUTC(this.searchDate);
    this.className = '';
    this.showEditCheckInOutButton = true;
    this.showAbsentButton = false;
    this.showOtherAbsentReason = false;
    // this.dpConfig.showWeekNumbers = false;
    this.dpConfig = Object.assign({}, { containerClass: 'theme-dark-blue' }, { showWeekNumbers: false }
    );
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

  }


  getSerchDate(event: Date) {
    console.log(event);
    this.count++; // this count help to restrct to call multiple time onload this function by bsdatepcker
    if (this.count > 2) {
      this.searchDate = event;
      this.searchByDateString = this.commonService.getStringLocalDateTimeFromUTC(this.searchDate);
      this.classList = [];
    //  this.paginator.changePageToFirst(event);
      this.getTeacherOperationalClasses();
    }
  }

  createexcuseForm() {
    // this.spinner.hide();
    this.excuseForm = this.fb.group({
      studentid: ['#12333', Validators.required],
      studentname: ['', Validators.required],
      starttime: ['', Validators.required],
      endtime: ['', Validators.required]

    });
  }

  createabsentForm() {
    this.absentForm = this.fb.group({
      absentreason: ['', Validators.required],
      other: ['']
    });
  }

  creatCheckInForm() {
    this.checkInForm = this.fb.group({
      indate: [this.searchDate, Validators.required],
      inclass: [null, Validators.required],
      dropby: ['', Validators.required],
      intime: [this.mytime, Validators.required],
    });
  }

  creatCheckOutForm() {
    this.checkOutForm = this.fb.group({
      outdate: [this.searchDate, Validators.required],
      outclass: [null, Validators.required],
      pickupby: ['', Validators.required],
      outtime: [this.mytime, Validators.required],
    });
  }
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
  get studentname() { return this.excuseForm.get('studentname'); }
  get starttime() { return this.excuseForm.get('starttime'); }
  get endtime() { return this.excuseForm.get('endtime'); }

  // Absent Form
  get absentreason() { return this.absentForm.get('absentreason'); }
  get other() { return this.absentForm.get('other'); }

  // Check In Form
  get outdate() { return this.checkInForm.get('outdate'); }
  get inclass() { return this.checkInForm.get('inclass'); }
  get dropby() { return this.checkInForm.get('dropby'); }

  // Check Out Form
  get indate() { return this.checkOutForm.get('indate'); }
  get outclass() { return this.checkOutForm.get('outclass'); }
  get pickupby() { return this.checkOutForm.get('pickupby'); }

  getAttendenceList() {
    this.loader = true;
    this.spinner.show();
    this.showHideAbsentButton();
    this.hideTransferButton();
    this.getAllClassessForTransfer();
    const data = {
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
    this.apiService.postData(TeacherAPIURLs.GetClassAttendence, data, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.totalRecord = res.body.totalRows;
        this.studentList = res.body.data;
        if (res.body.data.length > 0) {
          this.className = res.body.data[0].className;
          this.studentId = res.body.data[0].studentID;
          this.getAllClassessForTransfer();
        }
      } else {
        this.spinner.hide();
        this.error.unknownError();
      }
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.error.commonError(err);
    });
  }


   onClickSearch(event) {
     this.pageNo = 0;
     this.paginator.changePageToFirst(event);
     this.getAttendenceList();
   }


  paginate(event) {
    this.pageNo = event.page;
    // this.limit = event.page;
    this.getAttendenceList();
  }

  getTeacherOperationalClasses() {
    this.classList = [];
    this.spinner.show();
    const data = {
      'agencyID': this.commonService.getAgencyId(),
      'askingDate': this.searchDate,
      'teacherID': this.commonService.getReleventUserId('userdetails'),
    };
    this.apiService.postData(TeacherAPIURLs.GetTeacherOperationalClasses, data, null).subscribe(res => {
      this.spinner.hide();
      if (res.body.statusCode === 200) {
        this.classList = res.body.data;
        if (this.classList.length !== 0) {
          this.serchByClass = this.classList[0].value;
        } else {
          this.serchByClass = '';
          //   this.notification.info({message: 'It seems like you have not checked-in into the class yet', title: '' });
        }
        this.getAttendenceList();
      } else {
        this.spinner.hide();
        this.error.unknownError();
      }

    }, err => {
      this.spinner.hide();
      this.error.commonError(err);
    });
  }




  getAllClassess() {
    this.spinner.show();
    const data = {
      'agencyID': this.commonService.getAgencyId()
    };
    this.apiService.postData(TeacherAPIURLs.GetAllClasses, data, null).subscribe(res => {
      this.spinner.hide();
      if (res.body.statusCode === 200) {
        this.classList = res.body.data;
        if (this.classList.length !== 0) {
          this.serchByClass = this.classList[0].classesID;
        }
        this.getAttendenceList();
      } else {
        this.spinner.hide();
        this.error.unknownError();
      }

    }, err => {
      this.spinner.hide();
      this.error.commonError(err);
    });
  }

  getAbsentReasonList() {
    const data = {
      'agencyID': this.commonService.getAgencyId()
    };
    this.apiService.postData(TeacherAPIURLs.GetAllLeaveReasonType, data, null).subscribe(res => {

      this.absentReasonList = res.body.data;
    }, err => {
      this.spinner.hide();
      this.error.commonError(err);
    });
  }

  getAbsentReasonId(event) {
    if (this.absentForm.value.absentreason === '6') {
      this.showOtherAbsentReason = true;
    } else {
      this.showOtherAbsentReason = false;
    }
  }

  getCheckInOutDetails(data) {

  }


  // Save check in status
  saveCheckInDetails() {
    // this.showCheckInn = false;
    //  this.showStatus = true;

    const data = {
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

    this.apiService.postData(TeacherAPIURLs.CheckInAttendenceStudent, data, null).subscribe(res => {
      if (res.body.isSuccess === true) {
        this.getAttendenceList();
        this.notification.success({ message: 'Checked in succsessfully', title: '' });
      } else {
        this.spinner.hide();
        this.error.unknownError();
      }
    }, err => {
      this.spinner.hide();
      this.error.commonError(err);
    });

  }

  // Edit check in status
  updateCheckInDetails() {

    const data = {
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

    this.apiService.postData(TeacherAPIURLs.CheckInAttendenceStudent, data, null).subscribe(res => {
      if (res.body.isSuccess === true) {
        this.getAttendenceList();
        this.notification.success({ message: 'Checked in details updated succsessfully', title: '' });
      } else {
        this.spinner.hide();
        this.error.unknownError();
      }
    }, err => {
      this.spinner.hide();
      this.error.commonError(err);
    });
  }


  // Save check out status
  saveCheckOutDetails() {
    //  this.showCheckInn = false;
    //  this.showStatus = false;

    const data = {
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

    this.apiService.postData(TeacherAPIURLs.CheckOutAttendenceStudent, data, null).subscribe(res => {
      if (res.body.isSuccess === true) {
        this.sendDailySheetReport();
        this.notification.success({ message: 'Checked out succsessfully', title: '' });
      } else {
        this.spinner.hide();
        this.error.unknownError();
      }

    }, err => {
      this.spinner.hide();
      this.error.commonError(err);
    });
  }

  // Save check out status
  UpdateCheckOutDetails() {
    //  this.showCheckInn = false;
    //  this.showStatus = false;
    const data = {
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
    this.apiService.postData(TeacherAPIURLs.CheckOutAttendenceStudent, data, null).subscribe(res => {
      if (res.body.isSuccess === true) {
        this.getAttendenceList();
        this.notification.success({ message: 'Checked out details updated succsessfully', title: '' });
      } else {
        this.error.unknownError();
      }
    }, err => this.error.commonError(err));
  }



  saveExuseData(event) {
    alert('excuse');
  }

  saveAbsentData() {
    const data = {
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

    this.apiService.postData(TeacherAPIURLs.AbsentAttendenceStudent, data, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.consideredAttendenceId = res.body.saveId;
        this.notification.success({
          message: this.undoAbsentBtn ? 'Unmarked student as absent succsessfully' :
            'Marked student as absent succsessfully', title: ''
        });
        this.getAttendenceList();
      } else {
        this.error.unknownError();
      }

    }, err => {
      this.spinner.hide();
      this.error.commonError(err);
    }
    );
  }

  // Get check in Out Details
  getStudentDetails(data) {
    this.clearCheckinForm();
    this.clearCheckOutForm();
    this.checkInOutDetails = data;
    this.studentId = data.studentID;
    this.consideredAttendenceId = data.id;
    const req = {
      'studentID': this.studentId,
      'agencyID': this.commonService.getAgencyId(),
      'classID': this.serchByClass,
      'isAuthorized': true
    };
    this.apiService.postData(TeacherAPIURLs.GetAllGuardiansForStudents, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.guardiansList = res.body.data;
      } else {
        this.error.unknownError();
      }

    }, err => {
      this.spinner.hide();
      this.error.commonError(err);
    }
    );
    // this.guardiansList = data.associatedGuardians;
    // const date = this.commonService.GetFormattedDate(data.date);
    this.checkInForm.controls['indate'].setValue(this.searchDate);
    this.checkInForm.controls['inclass'].setValue(data.className);
    this.checkOutForm.controls['outdate'].setValue(this.searchDate);
    this.checkOutForm.controls['outclass'].setValue(data.className);
  }

  getEditCheckinDetails(data) {
    $('.modal').on('hidden.bs.modal', function () {
      $('.modal-body1').html('');
    });
    let studentArray: any;
    this.clearCheckinForm();
    this.checkInOutDetails = data;
    this.studentId = data.studentID;
    this.consideredAttendenceId = data.id;
    this.studentList.forEach(res => {
      if (res.studentID === data.studentID) {
        studentArray = res;
      }
    });
    // const date = this.commonService.GetFormattedDate(data.date);
    const req = {
      'studentID': this.studentId,
      'agencyID': this.commonService.getAgencyId(),
      'classID': this.serchByClass,
      'isAuthorized': true
    };
    this.apiService.postData(TeacherAPIURLs.GetAllGuardiansForStudents, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.guardiansList = res.body.data;
      } else {
        this.error.unknownError();
      }

    }, err => {
      this.spinner.hide();
      this.error.commonError(err);
    }
    );
    this.guardiansList = data.associatedGuardians;
    this.checkInForm.controls['dropby'].setValue(studentArray.dropedById);
    this.checkInForm.controls['indate'].setValue(this.searchDate);
    this.checkInForm.controls['inclass'].setValue(studentArray.className);
    this.checkInForm.controls['intime'].setValue(this.commonService.getLocalDateTimeFromUTC(studentArray.checkInTime));
  }


  getEditCheckOutDetails(data) {
    $('#checkout-tab').tab('show');
    this.clearCheckOutForm();
    let studentArray: any;
    this.studentId = data.studentID;
    this.consideredAttendenceId = data.id;
    this.studentList.forEach(res => {
      if (res.studentID === data.studentID) {
        studentArray = res;
      }
    });
    const req = {
      'studentID': this.studentId,
      'agencyID': this.commonService.getAgencyId(),
      'classID': this.serchByClass,
      'isAuthorized': true
    };
    this.apiService.postData(TeacherAPIURLs.GetAllGuardiansForStudents, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.guardiansList = res.body.data;
      } else {
        this.error.unknownError();
      }

    }, err => {
      this.spinner.hide();
      this.error.commonError(err);
    }
    );
    this.guardiansList = data.associatedGuardians;
    // const date = this.commonService.GetFormattedDate(data.date);
    this.checkOutForm.controls['pickupby'].setValue(studentArray.pickupById);
    this.checkOutForm.controls['outdate'].setValue(this.searchDate);
    this.checkOutForm.controls['outclass'].setValue(studentArray.className);
    this.checkOutForm.controls['outtime'].setValue(this.commonService.getLocalDateTimeFromUTC(studentArray.checkOutTime));
  }








  // Mark multiple students as present
  markAsPresentMultipleStudents(data, event) {
    if (event.target.checked) {
      data.marked = true;
      this.markedStudentsList.push(data);

    } else if (event.target.checked === false) {
      const index = this.markedStudentsList.findIndex(r => r.studentId === data.studentId);
      this.markedStudentsList.splice(index, 1);

    }
  }

  // Select or unselect all students
  MarkUnmarkAll(event) {
    if (event.target.checked) {
      this.studentList.forEach(element => {
        element.marked = true;
        this.markedStudentsList.push(element);
      });
    } else if (event.target.checked === false) {
      this.studentList.forEach(element => {
        element.marked = false;
      });
      this.markedStudentsList = [];
    }
  }

  // Method to save multiple student status at a time
  saveMarkedAsPresentStudents() {
    const sendMarkedStudentList: any[] = [];
    this.markedStudentsList.forEach(element => {
      if (element.marked === true) {
        sendMarkedStudentList.push(element);
      }
    });

    if (sendMarkedStudentList.length > 0) {

    } else {
      this.notification.info({ message: 'Please select students', title: '' });
    }
  }

  getPegination() {
    const totalPages = Math.ceil(this.studentList.length / this.pageSize);
  }

  // get Selected guardian id
  getDropOfDropDownValue(value) {
    this.checkInForm.controls['dropby'].setValue(value);
  }


  getPickUpDropDownValue(value) {
    this.checkOutForm.controls['pickupby'].setValue(value);
  }

  // Method to get only date
  getOnlyDate(date) {
    const todayDate = new Date(date);
    todayDate.setHours(0, 0, 0, 0);
    return todayDate;
  }

  showHideAbsentButton() {
    if (this.searchDate !== '' && this.searchDate !== undefined && this.searchDate !== null) {
      if (this.getOnlyDate(this.searchDate) < this.getOnlyDate(this.today)) {
        this.showAbsentButton = true;
        this.showEditCheckInOutButton = false;
      } else {
        this.showAbsentButton = false;
        this.showEditCheckInOutButton = true;
      }
    } else {
      this.showAbsentButton = false;
      this.showEditCheckInOutButton = true;
    }
  }

  getAbsentStudentDetails(data) {
    this.clearAbsentReasonForm();
    this.studentId = data.studentID;
    this.consideredAttendenceId = data.id;
    this.guardiansList = data.associatedGuardians;
    this.absentForm.controls['absentreason'].setValue(data.reasonId ? data.reasonId : '');
    this.absentForm.controls['other'].setValue(data.onLeaveComment);

    if (data.attendenceStatusID === 5) {
      this.showUndoAbsent = true;
    } else {
      this.showUndoAbsent = false;
    }
    const date = this.commonService.GetFormattedDate(data.date);

  }

  // Check for unmarked student as absent
  UndoAbsent(event) {
    if (event.target.checked === true) {
      this.undoAbsentBtn = true;
    } else {
      this.undoAbsentBtn = false;
    }
  }

  clearCheckinForm() {
    this.creatCheckInForm();
  }


  clearCheckOutForm() {
    this.creatCheckOutForm();
  }

  getCheckInTabDetails(value) {
    this.tabType = value;
    let studentArray: any;
    if (value === 'checkintab') {
      this.studentList.forEach(res => {
        if (res.studentID === this.studentId) {
          studentArray = res;
        }
      });
      // const date = this.commonService.GetFormattedDate(data.date);
      const req = {
        'studentID': this.studentId,
        'agencyID': this.commonService.getAgencyId(),
        'classID': this.serchByClass,
        'isAuthorized': true
      };
      this.apiService.postData(TeacherAPIURLs.GetAllGuardiansForStudents, req, null).subscribe(res => {
        if (res.body.statusCode === 200) {
          this.guardiansList = res.body.data;
        } else {
          this.error.unknownError();
        }
      }, err => {
        this.spinner.hide();
        this.error.commonError(err);
      }
      );
      //   this.guardiansList = data.associatedGuardians;
      this.checkInForm.controls['dropby'].setValue(studentArray.dropedById);
      this.checkInForm.controls['indate'].setValue(this.searchDate);
      this.checkInForm.controls['inclass'].setValue(studentArray.className);
      this.checkInForm.controls['intime'].setValue(this.commonService.getLocalDateTimeFromUTC(studentArray.checkInTime));
    }
  }


  getCheckOutTabDetails(type) {
    this.tabType = type;
  }

  updateCheckInAndOutModal() {
    if (this.tabType === 'checkintab') {
      this.updateCheckInDetails();
    } else if (this.tabType === 'checkouttab') {
      this.UpdateCheckOutDetails();
    } else {

    }
  }

  goToBreak(values) {
    let allowedit = false;
    if (values.attendenceStatusID > 2 && values.attendenceStatusID !== 5) {
      if (this.searchDate < this.today) {
        allowedit = false;
      } else {
        allowedit = true;
      }
      const navigationExtras: NavigationExtras = {
        queryParams: {
          'Name': values.studentName,
          'ImagePath': values.imagePath,
          'Date': this.searchDate,
          'attendenceStatusID': values.attendenceStatusID
        }
      };

      this.router.navigate(['./home/teacherdashboard/studentbreaks', values.studentID, values.id, allowedit], navigationExtras);
    }
  }
  getAllClassessForTransfer() {
    this.spinner.show();
    const data = {
      'agencyID': this.commonService.getAgencyId(),
      'ClassID': this.serchByClass
    };
    this.apiService.postData(TeacherAPIURLs.GetAllClassesForStudentAttendenceTransfer, data, null).subscribe(res => {
      this.spinner.hide();
      if (res.body.statusCode === 200) {
        this.transferclasses = res.body.data;
        // if (this.transferclasses.length !== 0) {
        //   this.selectClass = this.transferclasses[0].classesID;
        // }
      } else {
        this.spinner.hide();
        this.error.unknownError();
      }

    }, err => {
      this.spinner.hide();
      this.error.commonError(err);
    });
  }

  clearAbsentReasonForm() {
    this.showOtherAbsentReason = false;
    this.createabsentForm();
  }

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


    getStudentClassTransferReport() {
      this.loader = true;
      this.transferList = [];
      if (this.selectClass ===  null || this.selectClass === '' || this.selectClass === undefined) {
        this.notification.warning({message: 'Please select valid class', title: ''});
      } else {
      this.spinner.show();
      const data = {
        'agencyID': this.commonService.getAgencyId(),
        'studentID': this.studentId,
        'fromClassID': this.serchByClass,
        'toClassID': this.selectClass,
        'teacherID': this.commonService.getReleventUserId('userdetails')
      };
        this.apiService.postData(TeacherAPIURLs.StudentClassTransferAttendence, data, null).subscribe(res => {
          if (res.body.statusCode === 200 && !res.body.transferwithcheckout)  {
          this.spinner.hide();
          this.transferList = res.body.data;
          this.getAttendenceList();
          this.notification.success({message: 'Student has been transferred', title: ''});
          $('#transfer').modal('hide');
        //  this.createTransferForm();
        } else if (res.body.statusCode === 987) {
          this.spinner.hide();
          this.notification.warning({ message: 'Student already exist in selected class', title: '' });
        } else  if (res.body.statusCode === 200 && res.body.transferwithcheckout) {
          this.spinner.hide();
          this.transferList = res.body.data;
        //  this.getAttendenceList();
          this.notification.success({message: 'Student has been transferred', title: ''});
          $('#transfer').modal('hide');
          this.sendDailySheetReport();
        //  this.createTransferForm();
        } else  {
          this.spinner.hide();
          this.error.unknownError();
        }
        this.loader = false;
      }, err => {
        this.spinner.hide();
        this.error.commonError (err);
      } );
    }
    }

 



  hideTransferButton() {
    if (new Date(this.searchDate).toDateString() !== (this.today).toDateString()) {
      this.showTransferButton = false;
    } else {
      this.showTransferButton = true;
    }
  }

  getStudentDetailsForTranfer(data) {
    this.selectClass = '';
    this.studentId = data.studentID;
    $('#transfer').modal('show');

  }

  sendDailySheetReport() {
    this.confirmationService.confirm({
      message: 'Do you want to send the daily activity report?',
      accept: () => {
        this.sendDailySheetReportSuccess();
      },
      reject: () => {
        this.getAttendenceList();
       }
    });
  }


  sendDailySheetReportSuccess() {
    this.spinner.show();
      // const date = this.commonService.GetFormattedDate(data.date);
      const req = {
        'studentID': this.studentId,
        'agencyID': this.commonService.getAgencyId(),
        'classID': this.serchByClass,
        'askedDate': this.searchDate,
        'askedDateString': this.searchByDateString
      };
      this.apiService.postData(TeacherAPIURLs.GetDailySheetActivityReportByEmail, req, null).subscribe(res => {
        if (res.body.statusCode === 200) {
            this.spinner.hide();
            this.getAttendenceList();
            this.notification.success({message: 'Student Daily sheet details send successfully ', title: ''});
        } else if (res.body.statusCode === 987) {
          this.getAttendenceList();
          this.notification.warning({message: 'No activity found ', title: ''});
        } else {
          this.notification.warning({message: 'Report sending faild! ', title: ''});
          this.getAttendenceList();
        }
      }, err => {
        this.spinner.hide();
        this.error.commonError(err);
      }
      );

    }


  // clearAll() {
  //   this.transferList = [];
  //   this.transferclasses = [];
  //   this.getAttendenceList();
  //   this.getStudentClassTransferReport();


  // }

}
