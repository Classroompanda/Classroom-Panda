import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { AdminAuthGuard, SuperAdminAuthGuard, TeacherAuthGuard, ParentAuthGuard } from '../shared/services/guard';
import { LayoutApiService } from '../shared/services/lauout-api-service';
import { SharedModule } from '../shared/shared.module';
import { BsDatepickerModule } from 'ngx-bootstrap';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        NgScrollbarModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        BsDatepickerModule.forRoot(),
    ],
    declarations: [LayoutComponent, SidebarComponent, HeaderComponent, FooterComponent],
    providers: [AdminAuthGuard,
        SuperAdminAuthGuard,
        TeacherAuthGuard,
        ParentAuthGuard,
        LayoutApiService
    ]
})
export class LayoutModule { }
