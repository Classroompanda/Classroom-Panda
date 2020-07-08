import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { TeacherApiService } from '../../shared/services/teacher-api-service/teacher-api.service';
import { CommonService } from '../../../../shared/services/common/common.service';
import { TeacherAPIURLs } from '../../shared/constant';
import { ErrorHandlerService } from '../../../../shared/services/error-handler/error-handler.service';
import { HttpHeaders } from '@angular/common/http';
import { NotificationService } from '../../../../shared/services/notification-service/notification.service';
import { HealthVM } from '../../shared/view-model/daily-activityVM';
declare var $: any;
@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.css']
})
export class TeacherDashboardComponent implements OnInit, AfterViewInit {
  agencyidv: any;
  postdt: any;
  idv: any;
  classList: any[] = [];
  cars: any[] = [];
  studentList: any[] = [];
  teacherList: any[] = [];
  closeModal = '';
  ImageUploadForm: FormGroup;
  healthForm: FormGroup;
  participantSudents: any[] = [];
  participantsList: any[] = [];
  // uploadedFiles: any[] = [];
  uploadedFiles = new FormData();
  writePost: any;
  formData = new FormData();
  showUploadBtn = true;
  totalFilesBeforeUpload = 0;
  isImageUploaderDisplay = true;
  allowedImageFileType = 'image/*';
  allowedVideoFileType = 'video/mp4';
  flag = false;
  imageUrlArray: any[] = [];
  videoUrlArray: any[] = [];
  isImageArray: boolean;
  userImage: string;
  userVideo: string;
  classLogList: any[] = [];
  classDetails: any;
  today = new Date();
  editedCheckedInTime: any;
  editedCheckedOutTime: any;
  perticularClassDetailsForEdit: any;
  classIDForMedication: any;
  classId = 0;
  medicationList: any[] = [];
  allergyList: any[] = [];
  classNameForMedication = '';
  studentListId: any[] = [];
  HealthVM: HealthVM = {};
  studentMedicationDetails: any;
  currentCheckinClassId = 0;
  currentCheckStatus = 0;
  presentStudentCount = 0;
  studentEnrolledCountForClass = 0;
  eventCountForClass = 0;
  classIDForInfo = 0;
  loader: boolean;
  @ViewChild('pform') pform: any;
  @ViewChild('pformvideo') pformvideo: any;

  // PostActivityVM: PostActivityVM = {};
  // ImagesVM: ImagesVM = {};
  // VideosVM: VideosVM ={};
  // tslint:disable-next-line:max-line-length
  constructor(private spinner: NgxSpinnerService, private apiService: TeacherApiService, public commonService: CommonService,
    private fb: FormBuilder, private error: ErrorHandlerService, private notification: NotificationService) {
    //  this.getTeacherClassLog();
  }

  ngOnInit() {
     this.spinner.show();
  //  this.getData();
    this.getTeacherClassLog();
    this.createImageUploadForm();
    this.userImage = this.commonService.getUserImage('userdetails');
    this.createHealthForm();
    // this.getTeacherCurrentClassLogStatus();
  }

  ngAfterViewInit() {
    this.getTeacherOperationalClasses();
    // this.getAllClassess();
    this.getAllTeachers();
    //  this.getAllParticipants();
  }

  createHealthForm() {
    // if (this.healthId === 0) {
    this.healthForm = this.fb.group({
      temperature: [''],
      tempcmnt: ['', Validators.required],
      teacherack: [true]
    });
  }



  createImageUploadForm() {

    this.ImageUploadForm = this.fb.group({
      studentname: ['', Validators.required],
      participants: [''],
      public: [true, Validators.required],
      class: ['', Validators.required],
      text: [''],
      isvideo: [''],
      isimage: ['Image'],
      title: ['', Validators.required]

    });
  }

  get f() { return this.ImageUploadForm.controls; }
  getData() {
    setTimeout(() => {
      this.spinner.hide();
    }, 500);

    //
  }
  clearForm() {
    this.participantsList = [];
    this.studentList = [];
    // this.ImageUploadForm();
  }
  closeDialog() {
    this.closeModal = 'modal';
    $('.addimage').modal('hide');
  }
  onUpload(event) {
    // for (const file of event.files) {
    this.formData.append('image', event.files[0]);
    // this.uploadedFiles.push(file);
    // }
  }



  myImageUploader(event) {
    this.spinner.show();
    this.flag = true;
    this.isImageArray = true;
    this.formData = new FormData();
    let count = 0;
    if (event.files.length <= 3) {
      for (let index = 0; index < event.files.length; index++) {
        this.formData.append(event.files[index].name, event.files[index]);
        count = index;
        if (count === event.files.length - 1) {
          // this.spinner.hide();
          // this.notification.success({ message: 'Ready to upload', title: 'Done!' });
          // console.log('upload call', count);
          this.uploadMedia();
        }
      }
    } else {
      this.spinner.hide();
      this.notification.warning({ message: 'You can upload maximum 3 images only', title: '' });
    }
  }

  myVideoUploader(event) {
    this.spinner.show();
    this.flag = true;
    this.isImageArray = false;
    this.formData = new FormData();
    this.formData.append(event.files[0].name, event.files[0]);
    // this.notification.success({ message: 'Video is ready to upload', title: 'Done!' });
    this.uploadMedia();
  }


 public savePostDetails() {
    this.spinner.show();
    if (this.flag === true) {
      this.uploadMedia();
    } else {
      this.savePost();
    }
  }




  limitOnFiles(event) {
    for (let index = 0; index < event.files.length; index++) {

      if (index > 3) {
        this.showUploadBtn = false;
        this.notification.warning({ message: 'You can upload maximum 4 files only', title: 'Limit reached' });
      } else {
        this.showUploadBtn = true;
      }
    }
  }

  limitOnImageFiles(event) {
    if (event.files.length > 3) {
      this.notification.warning({ message: 'You can upload maximum 3 images only', title: '' });
    }

  }


  getAllTeachers() {
    // this.spinner.show();
    const req = {
      'agencyID': this.commonService.getAgencyId(),
    };
    this.apiService.postData(TeacherAPIURLs.GetAllTeachers, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.teacherList = res.body.data;
        //  this.spinner.hide();
      } else {
        //   this.spinner.hide();
        this.error.unknownError();
      }
    }, err => {
      this.spinner.hide();
      this.error.commonError(err);
    }
    );
  }

  getAllClassess() {
    // this.spinner.show();
    const data = {
      'agencyID': this.commonService.getAgencyId()
    };
    this.apiService.postData(TeacherAPIURLs.GetAllClasses, data, null).subscribe(res => {
      //  this.spinner.hide();
      if (res.body.statusCode === 200) {
        this.classList = res.body.data;
      } else {
        //     this.spinner.hide();
        this.error.unknownError();
      }

    }, err => {
      this.spinner.hide();
      this.error.commonError(err);
    });
  }

  getStudentsList() {
    this.ImageUploadForm.controls['studentname'].setValue('');
    this.ImageUploadForm.controls['studentname'].updateValueAndValidity();
    this.studentList = [];
    this.spinner.show();
    const data = {
      'agencyID': this.commonService.getAgencyId(),
      'classID': this.ImageUploadForm.value.class,
      'studentID': 0,
      'studentName': ''
    };

    this.apiService.postData(TeacherAPIURLs.GetAllStudentsDropDownByClass, data, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.spinner.hide();
        this.studentList = res.body.data;
      } else {
        this.spinner.hide();
        this.error.unknownError();
      }
    }, err => {
      this.spinner.hide();
      this.error.commonError(err);
    });
  }

  getAllStudentsByClass() {
    this.ImageUploadForm.controls['participants'].setValue('');
    this.participantsList = [];
    const data = {
      'agencyID': this.commonService.getAgencyId(),
      'classID': this.ImageUploadForm.value.class

    };

    this.apiService.postData(TeacherAPIURLs.GetAllStudentsDropDownByClass, data, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.participantsList = res.body.data;
      } else {
        this.spinner.hide();
        this.error.unknownError();
      }
    }, err => {
      this.spinner.hide();
      this.error.commonError(err);
    });

  }

  savePost() {
    if (this.ImageUploadForm.valid) {
      if (this.imageUrlArray.length > 0 || this.videoUrlArray.length > 0) {
        const data = {
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

        this.apiService.postData(TeacherAPIURLs.SavePostActivites, data, null).subscribe(res => {
          if (res.body.statusCode === 200) {
            $('.addimage').modal('hide');
            $('.addvideo').modal('hide');
            this.spinner.hide();
            this.notification.success({ message: 'Post created successfully', title: '' });
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
        this.notification.warning({ message: 'Please upload Image or video', title: '' });
      }
    } else {
      this.spinner.hide();
      this.commonService.validateAllFields(this.ImageUploadForm);
    }

  }

  getMediaType(value) {
    if (value === 1) {
      this.isImageUploaderDisplay = true;
    } else {
      this.isImageUploaderDisplay = false;
    }
  }


  uploadMedia() {
    if (this.ImageUploadForm.valid) {
      this.videoUrlArray = [];
      this.imageUrlArray = [];
      const headers = new HttpHeaders();
      headers.set('Content-Type', null);
      headers.set('Accept', 'multipart/form-data');
      // const  params = headers.set('Content-Disposition', 'multipart/form-data');
      const params = headers;
      const loggedInId = this.commonService.getLoggedInUserId();
      const Id = loggedInId.toString();
      this.formData.append('loggedInId', Id);
      this.apiService.postData(TeacherAPIURLs.MultipleImageUpload, this.formData, params).subscribe(res => {
        if (res.body.statusCode === 200) {
          this.flag = false;
          if (this.isImageArray === true) {           
            res.body.data.forEach(x => {
              this.imageUrlArray.push({
                'id': 0,
                'postActivitiesID': 0,
                'imageServerPath': x
              });
            });
          } else {
            res.body.data.forEach(x => {
              this.videoUrlArray.push({
                'id': 0,
                'postActivitiesID': 0,
                'vedioServerPath': x
              });
            });
            // this.videoUrlArray = res.body.data;
          }
          this.savePost();
          this.formData = new FormData();
        } else {
          this.spinner.hide();
          this.error.unknownError();
          this.formData = new FormData();
        }
      }, err => {
        this.spinner.hide();
        this.error.commonError(err);
        this.formData = new FormData();
      });
    } else {
      this.spinner.hide();
      this.commonService.validateAllFields(this.ImageUploadForm);
    }
  }


  getTeacherClassLog() {
    // this.spinner.show();
    this.classLogList = [];
    const data = {
      'agencyID': this.commonService.getAgencyId(),
      'askingDate': new Date(),
      'teacherID': this.commonService.getReleventUserId('userdetails'),
    };

    this.apiService.postData(TeacherAPIURLs.GetTeacherClassLog, data, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        if (res.body.data !== null && res.body.data !== undefined && res.body.data.length !== 0) {
          this.classLogList = res.body.data;
          this.classLogList.forEach(x => {
            x.classStartTime = this.commonService.getLocalDateTimeFromUTC(x.classStartTime);
            x.classEndTime = this.commonService.getLocalDateTimeFromUTC(x.classEndTime);
          });
          this.classDetails = this.classLogList[0];
          this.classId = this.classDetails.classesID;
          this.classNameForMedication = this.classDetails.className;
          if (this.classDetails.checkStatus > 0) {
            this.getStudentMedication();
            this.getStudentAllergy();
          }
        }
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



  openImagePostModal() {
    if (this.classList.length === 0) {
      this.notification.info({ message: 'It seems like you have not checked-in into the class yet ', title: '' });
    }
    this.createImageUploadForm();
    $('.addimage').modal('show');
  }

  openVideoPostModal() {
    if (this.classList.length === 0) {
      this.notification.info({ message: 'It seems like you have not checked-in into the class yet ', title: '' });
    }
    this.createImageUploadForm();
    $('.addvideo').modal('show');
  }

  clearPost() {
    this.createImageUploadForm();
    this.imageUrlArray = [];
    this.videoUrlArray = [];
    this.studentList = [];
    this.pformvideo.clear();
    this.pform.clear();
  }


  getPageDetailsForClass(event) {
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
  }



  verifyCheckIn(value, type, classname) {
    // value.checkStatus !== 2
    if (this.currentCheckinClassId !== value.classesID && this.currentCheckinClassId !== 0 && this.currentCheckStatus !== 2) {
      this.spinner.hide();
      this.notification.warning({ message: 'Please first checkout  from' + ' ' + classname + ' ' + 'class', title: '' });
    } else {
      // || value.checkStatus === 2
      if (value.checkStatus === 1 ) {
        this.spinner.hide();
        this.notification.warning({ message: 'You have already checked in for this class', title: '' });
      } else {
        const data = {
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
        const msg = 'Checked in successfully!';
        this.classCheckInCheckOut(data, msg);
      }
    }
  }


  verifyCheckOut(value, type, classname) {
    if (value.checkStatus === 2) {
      this.spinner.hide();
      this.notification.warning({ message: 'You have already checked out for this class', title: '' });
    } else if (value.checkStatus === 0) {
      this.spinner.hide();
      this.notification.warning({ message: 'Please first checked in for this class', title: '' });
    } else {
      const data = {
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
      const msg = 'Checked out successfully!';
      this.classCheckInCheckOut(data, msg);
    }


  }

  classCheckInCheckOut(data, msg) {
    $('#edittime').modal('hide');
    $('#checkinedittime').modal('hide');
    this.spinner.show();
    this.apiService.postData(TeacherAPIURLs.TeacherCheckInCheckOut, data, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.spinner.hide();
        this.getTeacherOperationalClasses();
        this.getTeacherClassLog();
        this.notification.success({ message: msg, title: '' });
      } else {
        this.spinner.hide();
        this.error.unknownError();
      }
    }, err => {
      this.spinner.hide();
      this.error.commonError(err);
    });
  }

  getCheckInDetails(value) {
    this.perticularClassDetailsForEdit = [];
    this.editedCheckedInTime = this.commonService.getLocalDateTimeFromUTC(value.checkInTime);
    this.perticularClassDetailsForEdit = value;
  }

  editCheckedInDetails() {
    const data = {
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
    const msg = 'Checked in time updated successfully!';
    this.classCheckInCheckOut(data, msg);
  }

  getCheckOutDetails(value) {
    this.perticularClassDetailsForEdit = [];
    this.editedCheckedInTime = this.commonService.getLocalDateTimeFromUTC(value.checkInTime);
    this.editedCheckedOutTime = this.commonService.getLocalDateTimeFromUTC(value.checkOutTime);
    this.perticularClassDetailsForEdit = value;
  }

  editCheckedOutDetails() {
    const data = {
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

    const msg = 'Checked out time updated successfully!';
    this.classCheckInCheckOut(data, msg);
  }


  getStudentMedication() {
    console.log('ttttttttttttttttttttttttttt');
    this.loader = true;
    const reqData = {
      'agencyID': this.commonService.getAgencyId(),
      'askingDate': new Date(),
      'teacherID': this.commonService.getReleventUserId('userdetails'),
      'classID': this.classId
    };
    this.apiService.postData(TeacherAPIURLs.GetTeacherTodayMedicationTasks, reqData, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        if (res.body.data !== null && res.body.data !== undefined) {
          this.medicationList = res.body.data;
          this.loader = false;
        }
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

  getTeacherOperationalClasses() {
    this.classList = [];
    // this.spinner.show();
    const data = {
      'agencyID': this.commonService.getAgencyId(),
      'askingDate': new Date(),
      'teacherID': this.commonService.getReleventUserId('userdetails'),
    };
    this.apiService.postData(TeacherAPIURLs.GetTeacherOperationalClasses, data, null).subscribe(res => {
      this.spinner.hide();
      if (res.body.statusCode === 200) {
        if (res.body.data !== null && res.body.data !== undefined) {
          this.classList = res.body.data;
          if (this.classList.length !== 0) {
            // this.notification.info({message: 'It seems like you have not checked-in into the class yet', title: '' });
            this.classId = this.classList[0].value;
            this.classIDForInfo = this.classList[0].value;
            this.getTeacherDashboardInfo();
          } else {
            this.classId = 0;
          }

        }
      } else {
        this.spinner.hide();
        this.error.unknownError();
      }

    }, err => {
      this.spinner.hide();
      this.error.commonError(err);
    });
  }



  medicationDone() {
    if (this.healthForm.valid) {
      const agencyID = this.commonService.getAgencyId();
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

      const req = {
        'studentActivityMedications': this.HealthVM,
        'activityTypeID': 1,
        'selectedStudents': this.studentListId,
        'agencyID': agencyID,
        'classesID': this.classId,
        'id': 0,
        'createdBy': this.commonService.getLoggedInUserId(),
        'activityRegisterDate' :  this.today.toDateString(),
      };
      this.saveMedication(req);
    } else {
      this.notification.warning({ message: 'Please add health note', title: '' });
    }

  }


  saveMedication(req) {
    this.apiService.postData(TeacherAPIURLs.SaveStudentActivity, req, null).subscribe(res => {
      this.spinner.hide();
      if (res.body.statusCode === 200) {
        $('#edithealth').modal('hide');
        this.notification.success({ message: 'Activity added successfully', title: '' });
        this.getStudentMedication();
      } else {
        this.spinner.hide();
        this.error.unknownError();
      }

    }, err => {
      this.spinner.hide();
      this.error.commonError(err);
    });
  }

  getStudentDetailsOfMedication(value) {
   this.createHealthForm();
    this.studentListId = [];
    this.studentMedicationDetails = [];
    this.studentListId.push(value.studentID);
    this.studentMedicationDetails = value;
  }

  getTeacherCurrentClassLogStatus(value, type) {
    this.spinner.show();
    const data = {
      'agencyID': this.commonService.getAgencyId(),
      'askingDate': new Date(),
      'teacherID': this.commonService.getReleventUserId('userdetails'),
    };
    this.apiService.postData(TeacherAPIURLs.GetTeacherCurrentClassLogStatus, data, null).subscribe(res => {
      let className: string;
      if (res.body.statusCode === 200) {
        this.spinner.hide();
        this.currentCheckinClassId = 0;
        this.currentCheckStatus = 0;
        if (res.body.data !== null) {
          this.currentCheckinClassId = res.body.data.classesID;
          this.currentCheckStatus = res.body.data.checkStatus;
          className = res.body.data.className;
          if (type === 1) {
            this.verifyCheckIn(value, type, className);
          } else {
            this.verifyCheckOut(value, type, className);
          }
        } else {
          if (type === 1) {
            this.verifyCheckIn(value, type, className);
          } else {
            this.verifyCheckOut(value, type, className);
          }
        }
      } else {
        this.spinner.hide();
        this.error.unknownError();
      }
    }, err => {
      this.spinner.hide();
      this.error.commonError(err);
    });
  }


  getTeacherDashboardInfo() {
    this.spinner.show();
    const req = {
      'teacherID': this.commonService.getReleventUserId('userdetails'),
      'classID': this.classIDForInfo,
      'agencyID': this.commonService.getAgencyId(),
      'askingDate': new Date()
    };
    this.apiService.postData(TeacherAPIURLs.TeacherDashboardInfo, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        if (res.body.data) {
          this.eventCountForClass = res.body.data.eventCount;
          this.presentStudentCount = res.body.data.presentStudentCount;
          this.studentEnrolledCountForClass = res.body.data.studentEnrolledCount;
        }
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

  // Allergies

  getStudentAllergy() {
    this.loader = true;
    const reqData = {
      'agencyID': this.commonService.getAgencyId(),
      'askingDate': new Date(),
      'teacherID': this.commonService.getReleventUserId('userdetails'),
      'classID': this.classId
    };
    this.apiService.postData(TeacherAPIURLs.GetStudentAllergy, reqData, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        if (res.body.data !== null && res.body.data !== undefined) {
          this.allergyList = res.body.data;
          console.log(this.allergyList , 'llllllllllllllllllllllllllllll');
          this.loader = false;
        }
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

}


