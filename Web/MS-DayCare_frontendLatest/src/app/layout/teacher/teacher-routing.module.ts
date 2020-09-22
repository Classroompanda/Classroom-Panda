import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeacherAttendenceComponent } from './components/teacher-attendence/teacher-attendence.component';
import { TeacherDailyActivityComponent } from './components/teacher-daily-activity/teacher-daily-activity.component';
import { TeacherPostActivityComponent } from './components/teacher-post-activity/teacher-post-activity.component';
import { TeacherMessageComponent } from './components/teacher-message/teacher-message.component';
import { TeacherincedentComponent } from 'src/app/layout/teacher/components/teacherincedent/teacherincedent.component';
import { TeacherEventPlannerComponent } from './components/teacher-event-planner/teacher-event-planner.component';
import { TeacherMealPlannerComponent } from './components/teacher-meal-planner/teacher-meal-planner.component';
import { TeacherDashboardComponent } from './components/teacher-dashboard/teacher-dashboard.component';
import { TeacherActivityDetailsComponent } from './components/teacher-activity-details/teacher-activity-details.component';
import { TeacherStudentListComponent } from './components/teacher-student-list/teacher-student-list.component';
import { TeacherStudentDetailsComponent } from './components/teacher-student-details/teacher-student-details.component';
import { TeacherProfileComponent } from './components/teacher-profile/teacher-profile.component';
import { TeacherStudentbreakComponent } from './components/teacher-studentbreak/teacher-studentbreak.component';
import { TeacherBreaksComponent } from './components/teacher-breaks/teacher-breaks.component';



const routes: Routes = [
    {
        path: '',
        component: TeacherDashboardComponent
    },
    {
        path: 'attendence',
        component: TeacherAttendenceComponent
    },
    {
        path: 'dailysheet',
        component: TeacherDailyActivityComponent
    },
    {
        path: 'postactivity',
        component: TeacherPostActivityComponent
    },
    // {
    //     path: 'calender',
    //     component: TeacherCalenderComponent
    // },
    {
        path: 'message',
        component: TeacherMessageComponent
    },
    {
        path: 'teacherincidentlog',
        component: TeacherincedentComponent
    },
    {
        path: 'eventplan',
        component: TeacherEventPlannerComponent
    },
    {
        path: 'mealplan',
        component: TeacherMealPlannerComponent
    },
    {
        path: 'activitydetails/:id/:classid',
        component: TeacherActivityDetailsComponent
    },
    {
        path: 'studentlist',
        component: TeacherStudentListComponent
    },
    {
        path: 'studentdetails/:id/:parentid',
        component: TeacherStudentDetailsComponent
    },
    {
        path: 'profile/:id',
        component: TeacherProfileComponent
    },
    {
        path: 'studentbreaks/:id/:attendanceid/:allowedit',
        component: TeacherStudentbreakComponent
    },
    {
        path: 'teacherbreaks',
        component: TeacherBreaksComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TeacherRoutingModule {}
