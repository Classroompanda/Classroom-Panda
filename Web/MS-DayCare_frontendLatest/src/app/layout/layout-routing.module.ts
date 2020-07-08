import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { AdminAuthGuard, SuperAdminAuthGuard, TeacherAuthGuard, ParentAuthGuard, IsLoggedInAuthGuard } from '../shared/services/guard';




const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'agencydashboard', loadChildren: './agency-admin/agency-admin.module#AgencyAdminModule',
                canActivate: [AdminAuthGuard]
            },
            {
                path: 'superadmin', loadChildren: './admin/admin.module#AdminModule',
                canActivate: [SuperAdminAuthGuard]
            },
            {
                path: 'teacherdashboard', loadChildren: './teacher/teacher.module#TeacherModule',
                canActivate: [TeacherAuthGuard]
            },
            {
                path: 'parentdashboard', loadChildren: './parent/parent.module#ParentModule',
                canActivate: [ParentAuthGuard]
            },
            {
                path: 'livefeed', loadChildren: './livefeed/livefeed.module#LivefeedModule'
            },
            {
                path: 'global', loadChildren: './global/global.module#GlobalModule'
            },
            {
                path: 'kioskdashboard', loadChildren: './parent/parent.module#ParentModule',
                canActivate: [ParentAuthGuard]
            },

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }
