import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParentMessageComponent } from './components/parent-message/parent-message.component';
import { ParentActivityReportComponent } from './components/parent-activity-report/parent-activity-report.component';
import { ParentAttendanceHistoryComponent } from './components/parent-attendance-history/parent-attendance-history.component';
import { ParentChildFillFormComponent } from './components/parent-child-fill-form/parent-child-fill-form.component';
import { ParentPaymentHistoryComponent } from './components/parent-payment-history/parent-payment-history.component';
import { ParentIncidentReportViewComponent } from './components/parent-incident-report-view/parent-incident-report-view.component';
import { ParentDashboardComponent } from './components/parent-dashboard/parent-dashboard.component';
import { ParentMealPlannerComponent } from './components/parent-meal-planner/parent-meal-planner.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ParentRoutingModule } from './parent-routing.module';
import { FullCalendarModule } from 'ng-fullcalendar';
import { CalendarModule } from 'primeng/calendar';
import { ParentApiService } from './shared/services/parent-api-service';
import { ParentProfileComponent } from './components/parent-profile/parent-profile.component';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MultiSelectModule } from 'primeng/multiselect';
import { SharedModule } from '../../shared/shared.module';
import { ParentChildBreklogComponent } from './components/parent-child-breklog/parent-child-breklog.component';
import { ParentEventPlannerComponent } from './components/parent-event-planner/parent-event-planner.component';
import { RadioButtonModule} from 'primeng/radiobutton';
import { ParentUserManagementComponent } from './components/parent-user-management/parent-user-management.component';
import { IsGuardianAuthGuard } from 'src/app/shared/services/guard/auth.guard';
import {InputSwitchModule} from 'primeng/inputswitch';
import { PaginatorModule } from 'primeng/paginator';
import { ParentPaymentAchComponent } from './components/parent-payment-ach/parent-payment-ach.component';
import { ParentKioskComponent } from './components/parent-kiosk/parent-kiosk.component';
import { SignaturePadModule } from 'angular2-signaturepad';


@NgModule({
  imports: [
    CommonModule,
    ParentRoutingModule,
    FullCalendarModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    CalendarModule,
    BsDatepickerModule.forRoot(),
    NgxSpinnerModule,
    MultiSelectModule,
    SharedModule,
    RadioButtonModule,
    InputSwitchModule,
    PaginatorModule,
    SignaturePadModule

  ],
  declarations: [ParentMessageComponent,
    ParentActivityReportComponent,
    ParentAttendanceHistoryComponent,
    ParentChildFillFormComponent,
    ParentPaymentHistoryComponent,
    ParentIncidentReportViewComponent,
    ParentDashboardComponent,
    ParentMealPlannerComponent,
    ParentProfileComponent,
    ParentChildBreklogComponent,
    ParentEventPlannerComponent,
    ParentUserManagementComponent,
    ParentPaymentAchComponent,
    ParentKioskComponent,

    ],
    providers: [ParentApiService, IsGuardianAuthGuard]

})
export class ParentModule { }
