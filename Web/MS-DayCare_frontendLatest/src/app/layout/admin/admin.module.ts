import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AgencyListComponent } from './components/agency-list/agency-list.component';
import { PricingPlanComponent } from './components/pricing-plan/pricing-plan.component';
import { AddStateComponent } from './components/add-state/add-state.component';
import { AddCityComponent } from './components/add-city/add-city.component';
import { PlanPageComponent } from './components/plan-page/plan-page.component';
import { SuperAdminDashboardComponent } from './components/super-admin-dashboard/super-admin-dashboard.component';
import { DialogModule } from 'primeng/dialog';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { CalendarModule } from 'primeng/calendar';
import { CarouselModule, BsDatepickerModule, TimepickerModule } from 'ngx-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PaginatorModule } from 'primeng/paginator';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FileUploadModule } from 'primeng/fileupload';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { SharedModule } from '../../shared/shared.module';
import { AddInfoVideoComponent } from './components/add-info-video/add-info-video.component';
import { AddAllergyComponent } from './components/add-allergy/add-allergy.component';
import { AddCouponComponent } from './components/add-coupon/add-coupon.component';
import { AddDeactivateReasonComponent } from './components/add-deactivate-reason/add-deactivate-reason.component';
import { TextPlanComponent } from './components/text-plan/text-plan.component';
import { AddDoseComponent } from './components/add-dose/add-dose.component';
import { PolicyAcceptListComponent } from './components/policy-accept-list/policy-accept-list.component';
import { ParentListComponent } from './components/parent-list/parent-list.component';


@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
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
    InputSwitchModule
  ],
  // tslint:disable-next-line: max-line-length
  declarations: [ AgencyListComponent, AddStateComponent, AddCityComponent, PricingPlanComponent, PlanPageComponent, SuperAdminDashboardComponent, AddInfoVideoComponent, AddAllergyComponent, AddCouponComponent, AddDeactivateReasonComponent, TextPlanComponent, AddDoseComponent, PolicyAcceptListComponent, ParentListComponent]
})
export class AdminModule { }
