import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ParentActivityReportComponent } from './components/parent-activity-report/parent-activity-report.component';
import { ParentAttendanceHistoryComponent } from './components/parent-attendance-history/parent-attendance-history.component';
import { ParentChildFillFormComponent } from './components/parent-child-fill-form/parent-child-fill-form.component';
import { ParentIncidentReportViewComponent } from './components/parent-incident-report-view/parent-incident-report-view.component';
import { ParentMessageComponent } from './components/parent-message/parent-message.component';
import { ParentPaymentHistoryComponent } from './components/parent-payment-history/parent-payment-history.component';
import { ParentDashboardComponent } from './components/parent-dashboard/parent-dashboard.component';
import { ParentMealPlannerComponent } from './components/parent-meal-planner/parent-meal-planner.component';
import { ParentProfileComponent } from './components/parent-profile/parent-profile.component';
import { ParentChildBreklogComponent } from './components/parent-child-breklog/parent-child-breklog.component';
import { ParentEventPlannerComponent } from './components/parent-event-planner/parent-event-planner.component';
import { ParentUserManagementComponent } from './components/parent-user-management/parent-user-management.component';
import { IsGuardianAuthGuard } from 'src/app/shared/services/guard/auth.guard';
import { ParentPaymentAchComponent } from './components/parent-payment-ach/parent-payment-ach.component';
import { ParentKioskComponent } from './components/parent-kiosk/parent-kiosk.component';



const routes: Routes = [
    {
        path: '',
        component: ParentDashboardComponent
    },

    {
        path: 'parentactivityreport',
        component: ParentActivityReportComponent
    },
    {
        path: 'parentattendancehistory',
        component: ParentAttendanceHistoryComponent
    },
    {
        path: 'parentchildfillform',
        component: ParentChildFillFormComponent
    },
    {
        path: 'parentincidentreport',
        component: ParentIncidentReportViewComponent
    },
    {
        path: 'parentmessage',
        component: ParentMessageComponent
    },
    {
        path: 'parentpayment',
        component: ParentPaymentHistoryComponent,
        canActivate: [IsGuardianAuthGuard]
    },
    {
        path: 'parentpaymentach',
        component: ParentPaymentAchComponent,
        canActivate: [IsGuardianAuthGuard]
    },
    {
        path: 'parentmealplanner',
        component: ParentMealPlannerComponent
    },
    {
        path: 'parentprofile/:id',
        component: ParentProfileComponent
    },
    {
        path: 'studentbreaks/:id/:attendanceid',
        component: ParentChildBreklogComponent
    },
    {
        path: 'parenteventplanner',
        component: ParentEventPlannerComponent
    },
    {
        path: 'parentandguardian',
        component: ParentUserManagementComponent,
        canActivate: [IsGuardianAuthGuard]
    },
    {
        path: 'kiosk',
        component: ParentKioskComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ParentRoutingModule {}
