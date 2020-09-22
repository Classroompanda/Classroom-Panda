import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgencyListComponent } from 'src/app/layout/admin/components/agency-list/agency-list.component';
import { PricingPlanComponent } from 'src/app/layout/admin/components/pricing-plan/pricing-plan.component';
import { PlanPageComponent } from './components/plan-page/plan-page.component';
import { SuperAdminDashboardComponent } from './components/super-admin-dashboard/super-admin-dashboard.component';
import { AddStateComponent } from 'src/app/layout/admin/components/add-state/add-state.component';
import { AddCityComponent } from 'src/app/layout/admin/components/add-city/add-city.component';
import { AddInfoVideoComponent } from './components/add-info-video/add-info-video.component';
import { AddAllergyComponent } from './components/add-allergy/add-allergy.component';
import { AddCouponComponent } from './components/add-coupon/add-coupon.component';
import { AddDeactivateReasonComponent } from './components/add-deactivate-reason/add-deactivate-reason.component';
import { TextPlanComponent } from './components/text-plan/text-plan.component';
import { AddDoseComponent } from './components/add-dose/add-dose.component';
import { PolicyAcceptListComponent } from './components/policy-accept-list/policy-accept-list.component';
import { ParentListComponent } from './components/parent-list/parent-list.component';
const routes: Routes = [
    {
        path: '',
        component: SuperAdminDashboardComponent,
    },
    {
        path: 'agencylist',
        component: AgencyListComponent
    },
    {
        path: 'pricingplan',
        component: PricingPlanComponent
    },
    {
        path: 'planlist',
        component: PlanPageComponent
    },
    {
        path: 'addstate',
        component: AddStateComponent
    },
    {
        path: 'addcity',
        component: AddCityComponent
    },
    {
        path: 'addinfovideo',
        component: AddInfoVideoComponent
    },
    {
        path: 'addallergy',
        component: AddAllergyComponent
    },
    {
        path: 'addcoupon',
        component: AddCouponComponent
    },
    {
        path: 'addreason',
        component: AddDeactivateReasonComponent
    },
    {
        path: 'textplan',
        component: TextPlanComponent
    },
    {
        path: 'adddose',
        component: AddDoseComponent
    },
    {
        path: 'policyacceptagency',
        component: PolicyAcceptListComponent
    },
    {
        path: 'joinclassroomparent',
        component: ParentListComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
