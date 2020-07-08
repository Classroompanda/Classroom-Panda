import { Component, OnInit } from '@angular/core';
import { TeacherApiService } from '../../shared/services/teacher-api-service/teacher-api.service';
import { ErrorHandlerService } from '../../../../shared/services/error-handler/error-handler.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from '../../../../shared/services/notification-service/notification.service';
import { CommonService } from '../../../../shared/services/common/common.service';
import { ActivatedRoute } from '@angular/router';
import { TeacherAPIURLs } from '../../shared/constant';
import { TeacherStudentDetailsVM, GuardiansDetailsVM } from '../../shared/view-model/teacher-students-detailsVM';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-teacher-student-details',
  templateUrl: './teacher-student-details.component.html',
  styleUrls: ['./teacher-student-details.component.css']
})
export class TeacherStudentDetailsComponent implements OnInit {
  id: any;
  studentDetailsList: any[] = [];
  StudentVm: TeacherStudentDetailsVM = {};
  guardianDetailsVm: GuardiansDetailsVM = {};
  guardianList: any[] = [];
  girl = 'Girl';
  boy = 'Boy';
  showResonFieldNotAllowed: boolean;
  relation: string;
  sectionName = 'A';
  allergyList: any[] = [];
  immunizationList: any[] = [];
  medicationList: any[] = [];
  disabilityList: any[] = [];
  classList: any[] = [];
  allergyName = '';
  allergyTypeName = '';
  reaction = '';
  treatment = '';
  medicationName = '';
  strength = '';
  units = '';
  dose = '';
  loader = true;
  hoeToTake = 'After Meal';
  otherMedication = 'No';
  immunizationName = '';
  immunizationDateRecived: string;
  otherImmunization = '';
  abbreviation = '';
  parentId: number;
  formData: FormData;
  fileData: FormData;
  profileimage: any;
  image: any;
  isimageSelected = false;

  constructor(private apiService: TeacherApiService, private error: ErrorHandlerService,
    private spinner: NgxSpinnerService, private notification: NotificationService,
    private commonService: CommonService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.spinner.show();
    this.showResonFieldNotAllowed = false;
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.parentId = params['parentid'];
    });
    this.getStudentDetails();
  }


  processFile(event) {
    this.formData = new FormData();
    const self = this;
    if (event.target.files && event.target.files[0]) {
      if (event.target.files[0].type !== 'image/png' && event.target.files[0].type !== 'image/jpeg' &&
        event.target.files[0].type !== 'image/jpg') {
        self.fileData = null;
        self.profileimage = '';
        // self.toasterService.error('error', 'Please select image only');
        return false;
      }
      const reader = new FileReader();
      this.formData.append('fileData', event.target.files[0], event.target.files[0].name);
      self.fileData = this.formData;
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = function (e) {
        self.profileimage = reader.result;
        self.image = reader.result;
      };
    }
    this.isimageSelected = true;
  }


  UploadImage() {
    // this.apiService.uploadImage(this.fileData).subscribe(
    this.apiService.uploadImage(TeacherAPIURLs.UploadImage, this.fileData, null).subscribe(
      (res) => {
        if (res.status === 200) {
          this.image = res.body.data;
          this.updateProfile();
        }
      },
      (err) => {

      });
  }



  SaveStudentDetails() {
    if (this.isimageSelected === true) {
      this.UploadImage();
      this.isimageSelected = false;
    } else {
      this.updateProfile();
    }
  }


  updateProfile() {

    if (this.image) {
      this.spinner.show();
      const modal = {
        'StudentId': this.StudentVm.id,
        'AgencyID': this.commonService.getAgencyId(),
        'ImagePath': this.image
      };
      this.apiService.postData(TeacherAPIURLs.UpdateStudentProfilePicByTeacher, modal, null).subscribe(res => {
        if (res.body.statusCode === 200) {
          //  this.spinner.hide();
          this.notification.success({ message: 'Profile picture updated successfully', title: '' });
          this.getStudentDetails();
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
      this.notification.warning({ message: 'Somthing went wrong', title: 'Please Try Again' });

    }
  }




  getStudentDetails() {
    this.loader = true;
    const data = {
      'agencyID': this.commonService.getAgencyId(),
      'studentID': this.id,
      'ParentID': this.parentId
    };

    this.apiService.postData(TeacherAPIURLs.GetStudentInformation, data, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        if (res.body.data) {
          console.log(res.body.data, 'd');
          this.studentDetailsList = res.body.data;
          this.StudentVm.firstName = res.body.data.firstName;
          this.StudentVm.lastName = res.body.data.lastName;
          this.StudentVm.className = res.body.data.className;
          this.StudentVm.countryName = res.body.data.countryName;
          this.StudentVm.stateName = res.body.data.address;
          this.StudentVm.dateOfBirth = this.commonService.GetFormattedDate(res.body.data.dateOfBirth);
          this.StudentVm.postalCode = res.body.data.postalCode;
          this.StudentVm.imagePath = res.body.data.imagePath;
          this.image = res.body.data.imagePath;
          this.StudentVm.id = res.body.data.studentId;
          this.StudentVm.genderID = res.body.data.genderID;
          this.StudentVm.address = res.body.data.address;
          this.StudentVm.cityName = res.body.data.cityName;
          this.StudentVm.stateName = res.body.data.stateName;
          this.StudentVm.studentName = res.body.data.studentName;
          this.allergyList = res.body.data.studentAllergies;
          this.immunizationList = res.body.data.studentImmunizations;
          this.medicationList = res.body.data.studentMedications;
          this.disabilityList = res.body.data.studentDisabilities;
          this.classList = res.body.data.enrolledClassesInformation;
          this.StudentVm.PhysicianName = res.body.data.physicianName;
          this.StudentVm.ChildNotes = res.body.data.childNotes;
          this.StudentVm.PhysicianAddress = res.body.data.physicianAddress;
          if (res.body.data.childStartDate == null) {
            this.StudentVm.childStartDate = '';
          } else {
            this.StudentVm.childStartDate = this.commonService.GetFormattedDate(res.body.data.childStartDate);
          }
          this.StudentVm.PreferredHospital = res.body.data.preferredHospital;
          this.StudentVm.ParentContactNumber = res.body.data.parentContactNumber;
          this.StudentVm.ChildsContactNumber = res.body.data.childsContactNumber;
          this.guardianList = res.body.data.guardians;
          this.spinner.hide();
          this.loader = false;
        } else {
          this.spinner.hide();
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


  /**Method not in used */
  getGuardianInfo() {
    this.loader = true;
    this.spinner.show();
    const req = {
      'studentID': this.StudentVm.id,
      'agencyID': this.commonService.getAgencyId(),
      'isAuthorized': true
    };
    this.apiService.postData(TeacherAPIURLs.GetAllGuardiansForStudents, req, null).subscribe(res => {
      if (res.body.statusCode === 200) {
        this.spinner.hide();
        this.guardianList = res.body.data;
        this.loader = false;
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

  getAllGuardianInfo(data) {
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
  }


  getAllergyDetails(data) {
    this.allergyName = data.allergyName;
    this.reaction = data.allergyReactionTypeName;
    this.allergyTypeName = data.allergyTypeName;
  }

  getImmunizationDetails(data) {
    this.immunizationName = data.immunizationName;
    this.immunizationDateRecived = data.immunizationDateRecived,
      this.otherImmunization = data.otherImmunization,
      this.abbreviation = data.abbreviation;
  }

  getMedicationDetails(data) {
    this.medicationName = data.medicationName;
    this.strength = data.strength,
      this.units = data.units,
      this.dose = data.doses;
  }


}
