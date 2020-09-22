import { Component, OnInit } from '@angular/core';
import { AgencyApiService } from '../shared/services/agency-api-service/agency-api.service';
import { ErrorHandlerService } from '../../../../shared/services/error-handler/error-handler.service';
import { NotificationService } from '../../../../shared/services/notification-service/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../../../../shared/services/common/common.service';
import { AgencyAPIURLs } from '../shared/constatant';
import { ConfirmationService } from 'primeng/api';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import { TeacherAPIURLs } from 'src/app/layout/teacher/shared/constant';

declare var $: any;

@Component({
  selector: 'app-agency-admin-settings',
  templateUrl: './agency-admin-settings.component.html',
  styleUrls: ['./agency-admin-settings.component.css']
})
export class AgencyAdminSettingsComponent implements OnInit {
  toiletingTimeIntervalId: any;
  NapIntervalId: any;
  NapminIntervalId: any;
  mealIntervalId: any;
  agencyId = this.commonService.getAgencyId();
  currentDDSeting: any[] = [];
  toiletingActiviId = 0;
  napActiviId = 0;
  mealActiviId = 0;
  addSubsidyForm: FormGroup;
  isSubscriptionActive: boolean;
  subsidyList: any [] = [];
  subsidyId = 0;
  isDownloading: boolean;
  showMessage: boolean;
  loader = true;
  activationType = 'Activated';
  totalRecord = 0;
  nameSearch = '';
  videoPath = '';

  parentList: any[] = [];
  studentList: any[] = [];
  teacherList: any[] = [];
  csvFileNameForParent = 'ParentList';
  csvFileNameForStudent = 'StudentList';
  csvFileNameForTeacher = 'TeacherList';
  ParentDataForCsv = [];
  StudentDataForCsv = [];
  TeacherDataForCsv = [];

  csvOptionsForParent = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: false,
    headers: [
      'FirstName',
      'LastName',
      'EmailId',
      'Contact Phone',
      'Address',
      'DateofBirth',
      'Profession',
      'Gender',
      'EmployeeName',
      'EmployerNumber'
    ],
    showTitle: false,
    title: [
      'FirstName',
      'LastName',
      'EmailId',
      'Contact Phone',
      'Address',
      'DateofBirth',
      'Profession',
      'Gender',
      'EmployeeName',
      'EmployerNumber'
    ],
    useBom: false,
    removeNewLines: true,
    keys: [
      'FirstName',
      'LastName',
      'EmailId',
      'ContactPhone',
      'Address',
      'DateofBirth',
      'Profession',
      'Gender',
      'EmployeeName',
      'EmployerNumber'
    ],
  };

  csvOptionsForStudent = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: false,
    headers: [
      'FirstName',
      'LastName',
      'EmailId',
      'Contact Phone',
      'DateofBirth',
      'Gender',
      'Address',
      'Physician Name',
      'Preferred Hospital',
      'Physician ContactNumber',
      'SPFirstName',
      'SPLastName',
      'SPEmailId',
      'SPContactNumber',
      'SPAddress',
      'SPDateOfBirth',
      'SPProfession',
      'SPGender',
      'SPEmployerName',
      'SPEmployerNumber'
    ],
    showTitle: false,
    title: [
      'FirstName',
      'LastName',
      'EmailId',
      'Contact Phone',
      'DateofBirth',
      'Gender',
      'Address',
      'Physician Name',
      'Preferred Hospital',
      'Physician ContactNumber',
      'SPFirstName',
      'SPLastName',
      'SPEmailId',
      'SPContactNumber',
      'SPAddress',
      'SPDateOfBirth',
      'SPProfession',
      'SPGender',
      'SPEmployerName',
      'SPEmployerNumber'
    ],
    useBom: false,
    removeNewLines: true,
    keys: [
      'FirstName',
      'LastName',
      'EmailId',
      'ContactPhone',
      'DateofBirth',
      'Gender',
      'Address',
      'PhysicianName',
      'PreferredHospital',
      'PhysicianContactNumber',
      'SPFirstName',
      'SPLastName',
      'SPEmailId',
      'SPContactNumber',
      'SPAddress',
      'SPDateOfBirth',
      'SPProfession',
      'SPGender',
      'SPEmployerName',
      'SPEmployerNumber'
    ],
  };

  csvOptionsForTeacher = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: false,
    headers: [
      'FirstName',
      'LastName',
      'EmailId',
      'Contact Phone',
      'Address',
      'DateofBirth',
      'DateofHiring',
      'GrossPay',
      'Certification'
    ],
    showTitle: false,
    title: [
      'FirstName',
      'LastName',
      'EmailId',
      'Contact Phone',
      'Address',
      'DateofBirth',
      'DateofHiring',
      'GrossPay',
      'Certification'
    ],
    useBom: false,
    removeNewLines: true,
    keys: [
      'FirstName',
      'LastName',
      'EmailId',
      'Contact Phone',
      'Address',
      'DateofBirth',
      'DateofHiring',
      'GrossPay',
      'Certification'
    ],
  };



  constructor(private confirmationService: ConfirmationService, private apiService: AgencyApiService, private error: ErrorHandlerService,
    private spinner: NgxSpinnerService, private notification: NotificationService,
    private fb: FormBuilder, public commonService: CommonService) {
      this.isSubscriptionActive = this.commonService.getSubscriptionStatus();
    }

  ngOnInit() {   
    this.spinner.show();
    this.getCuurentSettingForDD();
    this.getSubsidyList();
    this.createAddSubsidyForm();
    this.getSectionVideo();
  }

  OpenInfoVideo(data) {
    $('#infovideo').modal('show');
  }

  getSectionVideo() {
    const req = {
      'SectionID': 16
    };
    this.apiService.postData(TeacherAPIURLs.GetVideoForSection, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.videoPath = res.body.filePath;
        console.log(this.videoPath, 'bbbbbbbbbbbbbbb');
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




  saveToiletNotyInterval() {
    this.spinner.show();
    if (this.toiletingTimeIntervalId) {
      const req = {
        'agencyID': this.agencyId,
        'ActivityTypeID': 7,
        'interval': this.toiletingTimeIntervalId,
        'id': this.toiletingActiviId
      };
      this.apiService.postData(AgencyAPIURLs.SaveDDMasterInformation, req, null).subscribe(res => {
        if (res.body.statusCode === 200) {
          this.getCuurentSettingForDD();
          this.notification.success({ message: 'Time interval updated', title: '' });
        } else {
          this.spinner.hide();
          this.error.unknownError();
        }
      }, err => {
        this.spinner.hide();
        this.error.commonError(err);
      }
      );
    } else {
      this.spinner.hide();
      this.notification.warning({ message: 'Please select time interval', title: '' });
    }
  }


  saveNapNotyInterval() {
    this.spinner.show();
    if (this.NapIntervalId || this.NapminIntervalId) {
      if(this.NapIntervalId == "")
      {
        this.NapIntervalId = 0;
      }
      if(this.NapminIntervalId == "")
      {
        this.NapminIntervalId = 0;
      }
      const req = {
        'agencyID': this.agencyId,
        'ActivityTypeID': 6,
        'interval': this.NapIntervalId,
        'minInterval': this.NapminIntervalId,
        'id': this.napActiviId
      };     
      this.apiService.postData(AgencyAPIURLs.SaveDDMasterInformation, req, null).subscribe(res => {
        if (res.body.statusCode === 200) {
          this.getCuurentSettingForDD();
          this.notification.success({ message: 'Time interval updated', title: '' });
        } else {
          this.spinner.hide();
          this.error.unknownError();
        }
      }, err => {
        this.spinner.hide();
        this.error.commonError(err);
      }
      );
    } else {
      this.spinner.hide();
      this.notification.warning({ message: 'Please select time interval', title: '' });
    }
  }

  saveMealNotyInterval() {
    this.spinner.show();
    if (this.mealIntervalId) {
      const req = {
        'agencyID': this.agencyId,
        'ActivityTypeID': 3,
        'interval': this.mealIntervalId,
        'id': this.mealActiviId
      };
      this.apiService.postData(AgencyAPIURLs.SaveDDMasterInformation, req, null).subscribe(res => {
        if (res.body.statusCode === 200) {
          this.getCuurentSettingForDD();
          this.notification.success({ message: 'Time interval updated', title: '' });
        } else {
          this.spinner.hide();
          this.error.unknownError();
        }
      }, err => {
        this.spinner.hide();
        this.error.commonError(err);
      }
      );
    } else {
      this.spinner.hide();
      this.notification.warning({ message: 'Please select time interval', title: '' });
    }
  }



  getCuurentSettingForDD() {
  const  req = {
      'agencyID': this.agencyId
    };
    this.apiService.postData(AgencyAPIURLs.getCurrentDDActivityIntervalSetting, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        if (res.body.data.length > 0) {
          res.body.data.forEach(element => {
            if (element.activityID === 7) {
              this.toiletingTimeIntervalId = element.timeIntervalId;
              this.toiletingActiviId = element.id;
            }
            if (element.activityID === 6) {
              this.NapIntervalId = element.timeIntervalId;
              this.NapminIntervalId = element.minIntervalId
              this.napActiviId = element.id;
            }
            if (element.activityID === 3) {
              this.mealIntervalId = element.timeIntervalId;
              this.mealActiviId = element.id;
            }
          });
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


  /** Add subsidy section */
  createAddSubsidyForm() {
    this.addSubsidyForm = this.fb.group({
      name: ['', Validators.required],
      amount: ['', Validators.required],
      description: [''],
    });
  }


 get f() { return this.addSubsidyForm.controls; }

 clearAddSubForm() {
  this.subsidyId = 0;
  this.createAddSubsidyForm();
}


addNewSubsidy() {
  if (this.addSubsidyForm.valid) {
    const val = + this.addSubsidyForm.controls.amount.value;
if (isNaN(val) || val <= 0) {
 this.notification.warning({message: 'Amount should be valid number or greater than zero ', title: ''});
  } else {
     const req = {
       'subsidyName': this.addSubsidyForm.controls.name.value,
       'subsidyAmount': this.addSubsidyForm.controls.amount.value,
       'subsidyDescription': this.addSubsidyForm.controls.description.value,
       'agencyID': this.agencyId,
       'id': this.subsidyId,
     };
     this.successAddNewSubsidy(req);
  }
} else {
  this.spinner.hide();
  this.commonService.validateAllFields(this.addSubsidyForm);
}
}

successAddNewSubsidy(data) {
 this.apiService.postData(AgencyAPIURLs.SaveSubsidyDetails, data, null).subscribe(res => {
   if (res.body.statusCode === 200) {
    $('.addsub').modal('hide');
     this.getSubsidyList();
     this.notification.success({ message: res.body.message, title : 'Success'});
   } else {

   }
 });
}


getSubsidyList() {
const data =  {
  'AgencyId': this.agencyId
};
this.apiService.postData(AgencyAPIURLs.GetSubsidyDetails, data, null).subscribe(res => {
  if (res.body.statusCode === 200) {
    this.subsidyList = res.body.data.data;
  } else {
    this.notification.warning({message: res.body.message, title: ''});
}
}, err => {
  this.spinner.hide();
  this.error.commonError(err);
});
}


getSubsidyDetails(data) {
  this.subsidyId = data.id;
  this.addSubsidyForm.controls['name'].setValue(data.subsidyName);
  this.addSubsidyForm.controls['name'].updateValueAndValidity();
  this.addSubsidyForm.controls['amount'].setValue(data.subsidyAmount);
  this.addSubsidyForm.controls['amount'].updateValueAndValidity();
  this.addSubsidyForm.controls['description'].setValue(data.subsidyDescription);
  this.addSubsidyForm.controls['description'].updateValueAndValidity();
  $('.addsub').modal('show');
}

deleteSubsidy(value) {
  this.confirmationService.confirm({
    message: 'Do you want to delete this subsidy record?',
    accept: () => {
      this.spinner.show();
      const req = {
        'AgencyID': this.commonService.getAgencyId(),
        'id': value.id,
        'DeletedBy': this.commonService.getReleventUserId('userdetails')
      };
      this.apiService.postData(AgencyAPIURLs.DeleteSubsidyType, req, null).subscribe(res => {
        if (res.body.statusCode === 200) {
          this.spinner.hide();
          this.notification.success({message: res.body.message, title: ''});
          this.getSubsidyList();
        } else {
          this.spinner.hide();
          this.notification.warning({message: res.body.message, title: ''});
        }
      }, err => {
        this.spinner.hide();
        this.error.commonError(err);
      });
    }
  });
}

getAllParentList() {
  this.spinner.show();
  this.isDownloading = true;
  this.loader = true;
  this.parentList = [];
  const req = {
    'AgencyID': this.commonService.getAgencyId(),
    'ActivationType': this.activationType,
    'ParentName': this.nameSearch
  };
  this.apiService.postData(AgencyAPIURLs.GetAllParentInformationForCSV, req, null).subscribe(res => {
    if (res.body.statusCode === 200) {
      this.totalRecord = res.body.totalRows;
      this.parentList = res.body.data;
      console.log(this.parentList);
      this.generateParentCsvFile(this.parentList);
      this.loader = false;
      this.spinner.hide();
      this.notification.success({ message: 'Parents details CSV downloaded successfully', title: '' });
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

generateParentCsvFile(data) {
  const csvArrayForParent = [];
  console.log(data);
  data.forEach(element => {
    csvArrayForParent.push({
      FirstName: element.firstName,
      LastName: element.lastName,
      EmailId: element.email,
      ContactPhone: element.mobile,
      Address: element.address,
      DateofBirth: element.dateOfBirth,
      Profession: element.profession,
      Gender: element.genderName,
      EmployeeName: element.employerName,
      EmployerNumber: element.employerNumber,
    });
  });
  this.ParentDataForCsv = csvArrayForParent;
  // tslint:disable-next-line: no-unused-expression
  new Angular2Csv(this.ParentDataForCsv, this.csvFileNameForParent, this.csvOptionsForParent);
  this.isDownloading = false;
}

getAllStudentList() {
  this.spinner.show();
  this.isDownloading = true;
  this.loader = true;
  this.studentList = [];
  const req = {
    'studentName': this.nameSearch,
    'agencyID': this.commonService.getAgencyId(),
    'ActivationType': this.activationType,
  };
  this.apiService.postData(AgencyAPIURLs.GetAllStudentInformationForCSV, req, null).subscribe(res => {
    if (res.body.statusCode === 200) {
      this.totalRecord = res.body.totalRows;
      this.studentList = res.body.data;
      console.log(this.studentList);
      this.generateStudentCsvFile(this.studentList);
      this.loader = false;
      this.spinner.hide();
      this.notification.success({ message: 'Students details CSV downloaded successfully', title: '' });
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

generateStudentCsvFile(data) {
  const csvArrayForStudent = [];
  console.log(data);
  data.forEach(element => {
    csvArrayForStudent.push({
      FirstName: element.firstName,
      LastName: element.lastName,
      EmailId: element.email,
      ContactPhone: element.childsContactNumber,
      DateofBirth: element.dateOfBirth,
      Gender: element.genderName,
      Address: element.address,
      PhysicianName: element.physicianName,
      PreferredHospital: element.preferredHospital,
      PhysicianContactNumber: element.physicianNumber,

      SPFirstName: element.parentFirstName,
      SPLastName: element.parentLastName,
      SPEmailId: element.parentEmailAddress,
      SPContactNumber: element.parentContactNumber,
      SPAddress: element.parentAddress,
      SPDateOfBirth: element.parentDateOfBirth,
      SPProfession: element.parentProfession,
      SPGender: element.parentGenderName,
      SPEmployerName: element.employerName,
      SPEmployerNumber: element.employerNumber,

    });
  });
  console.log(csvArrayForStudent, ' final data for CSV Parent list');
  this.StudentDataForCsv = csvArrayForStudent;
  // tslint:disable-next-line: no-unused-expression
  new Angular2Csv(this.StudentDataForCsv, this.csvFileNameForStudent, this.csvOptionsForStudent);
  this.isDownloading = false;
}

getAllTeacherList() {
  this.spinner.show();
  this.isDownloading = true;
  this.loader = true;
  this.teacherList = [];
  const req = {
    'agencyID': this.commonService.getAgencyId(),
    'ActivationType': 'activated',
    'limit': 0,
    'page': 0,
    'TeacherName': this.nameSearch
  };
  this.apiService.postData(AgencyAPIURLs.GetAllTeacherForAgency, req, null).subscribe(res => {
    if (res.body.statusCode === 200) {
      this.totalRecord = res.body.totalRows;
      this.teacherList = res.body.data;
      console.log(this.teacherList);
      this.generateTeacherCsvFile(this.teacherList);
      this.loader = false;
      this.spinner.hide();
      this.notification.success({ message: 'Teacher details CSV downloaded successfully', title: '' });
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

generateTeacherCsvFile(data) {
  const csvArrayForTeacher = [];
  console.log(data);
  data.forEach(element => {
    csvArrayForTeacher.push({
      FirstName: element.firstName,
      LastName: element.lastName,
      EmailId: element.email,
      ContactPhone: element.mPhoneNumber,
      Address: element.address,
      DateofBirth: element.dateOfBirth,
      DateofHiring: element.dateHired,
      GrossPay: element.grossPayPerHour,
      Certification: element.certification
    });
  });
  this.TeacherDataForCsv = csvArrayForTeacher;
  // tslint:disable-next-line: no-unused-expression
  new Angular2Csv(this.TeacherDataForCsv, this.csvFileNameForTeacher, this.csvOptionsForTeacher);
  this.isDownloading = false;
}

}
