import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DasboardRoutingModule } from './agency-admin-routing.module';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { AgencyAdminDashboardComponent } from './components/agency-admin-dashboard/agency-admin-dashboard.component';
import { AgencyAdminAddStudentComponent } from './components/agency-admin-add-student/agency-admin-add-student.component';
import { AgencyAdminActivitydetailComponent } from './components/agency-admin-activitydetail/agency-admin-activitydetail.component';
import { AgencyAdminAttendenceComponent } from './components/agency-admin-attendence/agency-admin-attendence.component';
import { AgencyAdminClassesComponent } from './components/agency-admin-classes/agency-admin-classes.component';
import { AgencyAdminDailyActivityComponent } from './components/agency-admin-daily-activity/agency-admin-daily-activity.component';
import { AgencyAdminEventPlannerComponent } from './components/agency-admin-event-planner/agency-admin-event-planner.component';
import { AgencyAdminIncidentReportComponent } from './components/agency-admin-incident-report/agency-admin-incident-report.component';
import { AgencyAdminMealPlannerComponent } from './components/agency-admin-meal-planner/agency-admin-meal-planner.component';
import { AgencyAdminMessageComponent } from './components/agency-admin-message/agency-admin-message.component';
import { AgencyAdminParentComponent } from './components/agency-admin-parent/agency-admin-parent.component';
import { AgencyAdminPaymentComponent } from './components/agency-admin-payment/agency-admin-payment.component';
import { AgencyAdminPostActivityComponent } from './components/agency-admin-post-activity/agency-admin-post-activity.component';
import { AgencyAdminSettingsComponent } from './components/agency-admin-settings/agency-admin-settings.component';
import { AgencyAdminTeacherstaffComponent } from './components/agency-admin-teacherstaff/agency-admin-teacherstaff.component';
import { AgencyAdminViewchatComponent } from './components/agency-admin-viewchat/agency-admin-viewchat.component';
import { AgencyAdminStudentListComponent } from './components/agency-admin-student-list/agency-admin-student-list.component';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { ChartsModule } from 'ng2-charts';
import {MultiSelectModule} from 'primeng/multiselect';
import { FullCalendarModule } from 'ng-fullcalendar';
import { AgencyStudentDetailsComponent } from './components/agency-student-details/agency-student-details.component';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SharedModule } from '../../shared/shared.module';
import { PaginatorModule } from 'primeng/paginator';
import { AgencyStudentBreakComponent } from './components/agency-student-break/agency-student-break.component';
import { AgencyAdminClassassignmentComponent } from './components/agency-admin-classassignment/agency-admin-classassignment.component';
import {RadioButtonModule} from 'primeng/radiobutton';
import {InputSwitchModule} from 'primeng/inputswitch';
import { AgencyAdminPlanPageComponent } from './components/agency-admin-plan-page/agency-admin-plan-page.component';
import { AgencyAdminProfileComponent } from './components/agency-admin-profile/agency-admin-profile.component';
import { AgencyAdminAttendanceReportComponent } from './components/agency-admin-attendance-report/agency-admin-attendance-report.component';
import { AgencyAdminReportsComponent } from './components/agency-admin-birth-reports/agency-admin-reports.component';
import { AgencyAdminDuepaymentReportComponent } from './components/agency-admin-duepayment-report/agency-admin-duepayment-report.component';
import { AgencyAdminEnrollmentReportComponent } from './components/agency-admin-enrollment-report/agency-admin-enrollment-report.component';
import { AgencyAdminLedgerReportComponent } from './components/agency-admin-ledger-report/agency-admin-ledger-report.component';
import { AgencyAdminKiosklogReportComponent } from './components/agency-admin-kiosklog-report/agency-admin-kiosklog-report.component';
import { CarouselModule } from 'primeng/carousel';
// tslint:disable-next-line:max-line-length
import { AgencyAdminFamilyDetailsReportComponent } from './components/agency-admin-family-details-report/agency-admin-family-details-report.component';
import { AgencyAdminMedicationReportComponent } from './components/agency-admin-medication-report/agency-admin-medication-report.component';
import { AgencyAdminAllergyReportComponent } from './components/agency-admin-allergy-report/agency-admin-allergy-report.component';
// tslint:disable-next-line:max-line-length
import { AgencyAdminGivenmedicationReportComponent } from './components/agency-admin-givenmedication-report/agency-admin-givenmedication-report.component';
// tslint:disable-next-line:max-line-length
import { AgencyAdminTeacherAttendanceReportComponent } from './components/agency-admin-teacher-attendance-report/agency-admin-teacher-attendance-report.component';
import { AgencyAdminAccountComponent } from './components/agency-admin-account/agency-admin-account.component';
import { AgencyAccledgerReportComponent } from './components/agency-accledger-report/agency-accledger-report.component';
import { AgencyAdminAddFeesComponent } from './components/agency-admin-add-fees/agency-admin-add-fees.component';
import { AgencyAdminMsgBrodcastComponent } from './components/agency-admin-msg-brodcast/agency-admin-msg-brodcast.component';
import { AgencyAdminDiscountComponent } from './components/agency-admin-discount/agency-admin-discount.component';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { AgencyAdminSubsidyComponent } from './components/agency-admin-subsidy/agency-admin-subsidy.component';
import { AdvancePaymentComponent } from './components/advance-payment/advance-payment.component';
// tslint:disable-next-line:max-line-length
import { AgencyAdminClasstransferreportComponent } from './components/agency-admin-class-transfer-report/agency-admin-classtransferreport.component';
import { AgencyAdminMealServereportComponent } from './components/agency-admin-mealserve-report/agency-admin-mealservereport.component';
import { AgencyAdminNewmealplannerComponent } from './components/agency-admin-newmealplanner/agency-admin-newmealplanner.component';
import { AgencyAdminTeachertimeComponent } from './components/agency-admin-teachertime/agency-admin-teachertime.component';
import { AgencyAdminTeacherHoursComponent } from './components/agency-admin-teacher-hours/agency-admin-teacher-hours.component';
import {FileUploadModule} from 'primeng/fileupload';
import { AgencyAdminPaymentLedgerComponent } from './components/agency-admin-payment-ledger/agency-admin-payment-ledger.component';
//import { JwPaginationComponent } from 'jw-angular-pagination';
// import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {NgxPaginationModule} from 'ngx-pagination';
import { AgencyAdminParentLedgerComponent } from './components/agency-admin-parent-ledger/agency-admin-parent-ledger.component';
import { AgencyAdminReportComponent } from './components/agency-admin-report/agency-admin-report.component';
// tslint:disable-next-line: max-line-length
import { AgencyAdminBankDepositReportComponent } from './components/agency-admin-bank-deposit-report/agency-admin-bank-deposit-report.component';
import { AgencyAdminStudentsDeactivatedReportComponent } from './components/agency-admin-students-deactivated-report/agency-admin-students-deactivated-report.component';
import { AgencyAdminStaffBirthReportComponent } from './components/agency-admin-staff-birth-report/agency-admin-staff-birth-report.component';
import { AgencyAdminKioskidReportComponent } from './components/agency-admin-kioskid-report/agency-admin-kioskid-report.component';
import { AgencyAdminTaxStatementReportComponent } from './components/agency-admin-tax-statement-report/agency-admin-tax-statement-report.component';
import { AgencyAdminBusComponent } from './components/agency-admin-bus/agency-admin-bus.component';
import { AgencyAdminBusReportComponent } from './components/agency-admin-bus-report/agency-admin-bus-report.component';
import { AgencyAdminFoodListComponent } from './components/agency-admin-food-list/agency-admin-food-list.component';

@NgModule({
  imports: [
    CommonModule,
    DasboardRoutingModule,
    TableModule,
    FormsModule,
    FullCalendarModule,
    NgScrollbarModule,
    DialogModule,
    ReactiveFormsModule,
    CalendarModule,
    ChartsModule,
    MultiSelectModule,
    BsDatepickerModule.forRoot(),
    NgxSpinnerModule,
    SharedModule,
    PaginatorModule,
    RadioButtonModule,
    InputSwitchModule,
    CarouselModule,
    MessageModule,
    MessagesModule,
    FileUploadModule,
    NgxPaginationModule
  ],
  declarations: [
    AgencyAdminDashboardComponent,
    AgencyAdminAddStudentComponent,
    AgencyAdminActivitydetailComponent,
    AgencyAdminAttendenceComponent,
    AgencyAdminClassesComponent,
    AgencyAdminDailyActivityComponent,
    AgencyAdminEventPlannerComponent,
    AgencyAdminIncidentReportComponent,
    AgencyAdminMealPlannerComponent,
    AgencyAdminMessageComponent,
    AgencyAdminParentComponent,
    AgencyAdminPaymentComponent,
    AgencyAdminPostActivityComponent,
    AgencyAdminReportsComponent,
    AgencyAdminSettingsComponent,
    AgencyAdminTeacherstaffComponent,
    AgencyAdminViewchatComponent,
    AgencyAdminStudentListComponent,
    AgencyStudentDetailsComponent,
    AgencyStudentBreakComponent,
    AgencyAdminClassassignmentComponent,
    AgencyAdminPlanPageComponent,
    AgencyAdminProfileComponent,
    AgencyAdminAttendanceReportComponent,
    AgencyAdminDuepaymentReportComponent,
    AgencyAdminEnrollmentReportComponent,
    AgencyAdminLedgerReportComponent,
    AgencyAdminKiosklogReportComponent,
    AgencyAdminFamilyDetailsReportComponent,
    AgencyAdminMedicationReportComponent,
    AgencyAdminAllergyReportComponent,
    AgencyAdminGivenmedicationReportComponent,
    AgencyAdminTeacherAttendanceReportComponent,
    AgencyAdminAccountComponent,
    AgencyAccledgerReportComponent,
    AgencyAdminAddFeesComponent,
    AgencyAdminMsgBrodcastComponent,
    AgencyAdminDiscountComponent,
    AgencyAdminSubsidyComponent,
    AdvancePaymentComponent,
    AgencyAdminClasstransferreportComponent,
    AgencyAdminMealServereportComponent,
    AgencyAdminNewmealplannerComponent,
    AgencyAdminTeachertimeComponent,
    AgencyAdminTeacherHoursComponent,
    AgencyAdminPaymentLedgerComponent,
    AgencyAdminParentLedgerComponent,
    AgencyAdminReportComponent,
    AgencyAdminBankDepositReportComponent,
    AgencyAdminStudentsDeactivatedReportComponent,
    AgencyAdminStaffBirthReportComponent,
    AgencyAdminKioskidReportComponent,
    AgencyAdminTaxStatementReportComponent,
    AgencyAdminBusComponent,
    AgencyAdminBusReportComponent,
    AgencyAdminFoodListComponent
   ]
})
export class AgencyAdminModule { }
