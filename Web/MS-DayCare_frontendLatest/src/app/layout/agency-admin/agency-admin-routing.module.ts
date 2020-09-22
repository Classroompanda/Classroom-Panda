import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgencyAdminDashboardComponent } from './components/agency-admin-dashboard/agency-admin-dashboard.component';
import { AgencyAdminActivitydetailComponent } from './components/agency-admin-activitydetail/agency-admin-activitydetail.component';
import { AgencyAdminDailyActivityComponent } from './components/agency-admin-daily-activity/agency-admin-daily-activity.component';
import { AgencyAdminPostActivityComponent } from './components/agency-admin-post-activity/agency-admin-post-activity.component';
import { AgencyAdminParentComponent } from './components/agency-admin-parent/agency-admin-parent.component';
import { AgencyAdminTeacherstaffComponent } from './components/agency-admin-teacherstaff/agency-admin-teacherstaff.component';
import { AgencyAdminSettingsComponent } from './components/agency-admin-settings/agency-admin-settings.component';
import { AgencyAdminPaymentComponent } from './components/agency-admin-payment/agency-admin-payment.component';
import { AgencyAdminAttendenceComponent } from './components/agency-admin-attendence/agency-admin-attendence.component';
import { AgencyAdminMessageComponent } from './components/agency-admin-message/agency-admin-message.component';
import { AgencyAdminStudentListComponent } from './components/agency-admin-student-list/agency-admin-student-list.component';
import { AgencyAdminIncidentReportComponent } from './components/agency-admin-incident-report/agency-admin-incident-report.component';
import { AgencyAdminClassesComponent } from './components/agency-admin-classes/agency-admin-classes.component';
import { AgencyAdminAddStudentComponent } from './components/agency-admin-add-student/agency-admin-add-student.component';
import { AgencyAdminEventPlannerComponent } from './components/agency-admin-event-planner/agency-admin-event-planner.component';
import { AgencyAdminMealPlannerComponent } from './components/agency-admin-meal-planner/agency-admin-meal-planner.component';
import { AgencyStudentDetailsComponent } from './components/agency-student-details/agency-student-details.component';
import { AgencyStudentBreakComponent } from './components/agency-student-break/agency-student-break.component';
import { AgencyAdminClassassignmentComponent } from './components/agency-admin-classassignment/agency-admin-classassignment.component';
import { AgencyAdminPlanPageComponent } from './components/agency-admin-plan-page/agency-admin-plan-page.component';
import { AgencyAdminProfileComponent } from './components/agency-admin-profile/agency-admin-profile.component';
import { AgencyAdminReportsComponent } from './components/agency-admin-birth-reports/agency-admin-reports.component';
import { AgencyAdminAttendanceReportComponent } from './components/agency-admin-attendance-report/agency-admin-attendance-report.component';
import { AgencyAdminDuepaymentReportComponent } from './components/agency-admin-duepayment-report/agency-admin-duepayment-report.component';
import { AgencyAdminEnrollmentReportComponent } from './components/agency-admin-enrollment-report/agency-admin-enrollment-report.component';
import { AgencyAdminLedgerReportComponent } from './components/agency-admin-ledger-report/agency-admin-ledger-report.component';
import { AgencyAdminKiosklogReportComponent } from './components/agency-admin-kiosklog-report/agency-admin-kiosklog-report.component';
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
import { AgencyAdminSubsidyComponent } from './components/agency-admin-subsidy/agency-admin-subsidy.component';
import { AdvancePaymentComponent } from './components/advance-payment/advance-payment.component';
// tslint:disable-next-line:max-line-length
import { AgencyAdminClasstransferreportComponent } from './components/agency-admin-class-transfer-report/agency-admin-classtransferreport.component';
import { AgencyAdminMealServereportComponent } from './components/agency-admin-mealserve-report/agency-admin-mealservereport.component';
import { AgencyAdminNewmealplannerComponent } from './components/agency-admin-newmealplanner/agency-admin-newmealplanner.component';
import { AgencyAdminTeacherHoursComponent } from './components/agency-admin-teacher-hours/agency-admin-teacher-hours.component';
import { AgencyAdminPaymentLedgerComponent } from './components/agency-admin-payment-ledger/agency-admin-payment-ledger.component';
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


const routes: Routes = [
    {
        path: '',
        component: AgencyAdminDashboardComponent
    },
    {
        path: 'dailyactivity',
        component: AgencyAdminDailyActivityComponent
    },
    {
        path: 'postactivity',
        component: AgencyAdminPostActivityComponent
    },
    {
        path: 'activitydetails/:id/:classid',
        component: AgencyAdminActivitydetailComponent
    },
    {
        path: 'parentlist',
        component: AgencyAdminParentComponent
    },
    {
        path: 'teacherlist',
        component: AgencyAdminTeacherstaffComponent
    },
    {
        path: 'setting',
        component: AgencyAdminSettingsComponent
    },
    {
        path: 'payment/:code',
        component: AgencyAdminPaymentComponent
    },
    {
        path: 'payment',
        component: AgencyAdminPaymentComponent
    },
    {
        path: 'parentledger',
        component: AgencyAdminParentLedgerComponent
    },
    {
        path: 'attendence',
        component: AgencyAdminAttendenceComponent
    },
    {
        path: 'birthreport',
        component: AgencyAdminReportsComponent
    },
    {
        path: 'message',
        component: AgencyAdminMessageComponent
    },
    {
        path: 'studentlist',
        component: AgencyAdminStudentListComponent
    },
    {
        path: 'adminincidentreport',
        component: AgencyAdminIncidentReportComponent
    },
    {
        path: 'adminclasses',
        component: AgencyAdminClassesComponent
    },
    {
        path: 'addstudent',
        component: AgencyAdminAddStudentComponent
    },
    {
        path: 'eventplan',
        component: AgencyAdminEventPlannerComponent
    },
    {
        path: 'mealplan',
        component: AgencyAdminMealPlannerComponent
    },
    {
        path: 'studentdetails/:id/:parentid',
        component: AgencyStudentDetailsComponent
    },
    {
        path: 'studentbreaks/:id/:attendanceid/:allowedit',
        component: AgencyStudentBreakComponent
    },
    {
        path: 'classassignment',
        component: AgencyAdminClassassignmentComponent
    },
    // {
    //     path: 'planpage',
    //     component: AgencyAdminPlanPageComponent
    // },
    {
        path: 'report',
        component: AgencyAdminReportComponent
    },
    {
        path: 'profile/:id',
        component: AgencyAdminProfileComponent
    },
    {
        path: 'attendancereport',
        component: AgencyAdminAttendanceReportComponent
    },
    {
        path: 'paymentreport',
        component: AgencyAdminDuepaymentReportComponent
    },
    {
        path: 'enrollmentreport',
        component: AgencyAdminEnrollmentReportComponent
    },
    {
        path: 'ledgerreport',
        component: AgencyAdminLedgerReportComponent
    },
    {
        path: 'kioskereport',
        component: AgencyAdminKiosklogReportComponent
    },
    {
        path: 'familyreport',
        component: AgencyAdminFamilyDetailsReportComponent
    },
    {
        path: 'medicationreport',
        component: AgencyAdminMedicationReportComponent
    },
    {
        path: 'allergyreport',
        component: AgencyAdminAllergyReportComponent
    },
    {
        path: 'givenmedicationreport',
        component: AgencyAdminGivenmedicationReportComponent
    },

    {
        path: 'teacherattendancereport',
        component: AgencyAdminTeacherAttendanceReportComponent
    },
    {
        path: 'account',
        component: AgencyAdminAccountComponent
    },
    {
        path: 'accountledger',
        component: AgencyAccledgerReportComponent
    },
    {
        path: 'addfees',
        component: AgencyAdminAddFeesComponent
    },
    {
        path: 'brodcast',
        component: AgencyAdminMsgBrodcastComponent
    },
    {
        path: 'discount',
        component: AgencyAdminDiscountComponent
    },
    {
        path: 'subsidy',
        component: AgencyAdminSubsidyComponent
    },
    {
        path: 'advancepayment',
        component: AdvancePaymentComponent
    },
    {
        path: 'classtransferreport',
        component: AgencyAdminClasstransferreportComponent
    },
    {
        path: 'newmealplanner',
        component: AgencyAdminNewmealplannerComponent
    },
    {
        path: 'teacherhours',
        component: AgencyAdminTeacherHoursComponent
    },
    {
        path: 'mealservereport',
        component: AgencyAdminMealServereportComponent
    },
    {
        path: 'paymentledger/:parentid',
        component: AgencyAdminPaymentLedgerComponent
    },
    {
        path: 'bankdepositreport',
        component: AgencyAdminBankDepositReportComponent
    },
    {
        path: 'deactivatestudentreport',
        component: AgencyAdminStudentsDeactivatedReportComponent
    },
    {
        path: 'staffbirthreport',
        component: AgencyAdminStaffBirthReportComponent
    },
    {
        path: 'kioskidreport',
        component: AgencyAdminKioskidReportComponent
    },
    {
        path: 'taxstatement',
        component: AgencyAdminTaxStatementReportComponent
    },
    {
        path: 'buslist',
        component: AgencyAdminBusComponent
    },
    {
        path: 'busreport',
        component: AgencyAdminBusReportComponent
    },
    {
        path: 'foodlist',
        component: AgencyAdminFoodListComponent
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DasboardRoutingModule { }
