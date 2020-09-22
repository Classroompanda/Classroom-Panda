import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherRoutingModule } from 'src/app/layout/teacher/teacher-routing.module';
import { TeacherAttendenceComponent } from './components/teacher-attendence/teacher-attendence.component';
import { TeacherDailyActivityComponent } from './components/teacher-daily-activity/teacher-daily-activity.component';
import { TeacherPostActivityComponent } from './components/teacher-post-activity/teacher-post-activity.component';
import { TeacherMessageComponent } from './components/teacher-message/teacher-message.component';
import { TeacherincedentComponent } from './components/teacherincedent/teacherincedent.component';
import { TeacherMealPlannerComponent } from './components/teacher-meal-planner/teacher-meal-planner.component';
import { TeacherEventPlannerComponent } from './components/teacher-event-planner/teacher-event-planner.component';
import { DialogModule } from 'primeng/dialog';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TeacherDashboardComponent } from './components/teacher-dashboard/teacher-dashboard.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { TeacherActivityDetailsComponent } from './components/teacher-activity-details/teacher-activity-details.component';
import { CarouselModule } from 'primeng/carousel';
import { CalendarModule } from 'primeng/calendar';
import { FullCalendarModule } from 'ng-fullcalendar';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TeacherStudentListComponent } from './components/teacher-student-list/teacher-student-list.component';
import { TeacherStudentDetailsComponent } from './components/teacher-student-details/teacher-student-details.component';
import { PaginatorModule } from 'primeng/paginator';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { SharedModule } from '../../shared/shared.module';
import { TeacherProfileComponent } from './components/teacher-profile/teacher-profile.component';
import {FileUploadModule} from 'primeng/fileupload';
import {RadioButtonModule} from 'primeng/radiobutton';
import {InputSwitchModule} from 'primeng/inputswitch';
import { TeacherStudentbreakComponent } from './components/teacher-studentbreak/teacher-studentbreak.component';
import { TeacherBreaksComponent } from './components/teacher-breaks/teacher-breaks.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
  imports: [
    CommonModule,
    TeacherRoutingModule,
    FullCalendarModule,
    DialogModule,
    ReactiveFormsModule,
    FormsModule,
    MultiSelectModule,
    CalendarModule,
    CarouselModule,
    NgxSpinnerModule,
    PaginatorModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    AutoCompleteModule,
    SharedModule,
    FileUploadModule,
    RadioButtonModule,
    InputSwitchModule,
    ConfirmDialogModule
  ],
  declarations: [TeacherAttendenceComponent,
    TeacherDailyActivityComponent, TeacherPostActivityComponent,
    TeacherMessageComponent, TeacherincedentComponent,
    TeacherMealPlannerComponent, TeacherEventPlannerComponent,
    TeacherDashboardComponent, TeacherActivityDetailsComponent,
    TeacherStudentListComponent, TeacherStudentDetailsComponent,
    TeacherProfileComponent,
    TeacherStudentbreakComponent,
    TeacherBreaksComponent],
  providers: []
})
export class TeacherModule { }
