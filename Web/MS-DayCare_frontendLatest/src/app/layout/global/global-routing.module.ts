import { RouterModule, Routes } from '@angular/router';
import { Component, NgModule } from '@angular/core';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { GlobalComponent } from './global.component';
import { GlobalAuthorizedPersonComponent } from './components/global-authorized-person/global-authorized-person.component';
import { GlobalRestrictedPersonComponent } from './components/global-restricted-person/global-restricted-person.component';
const routes: Routes = [
{
    path: '',
    component: ResetPasswordComponent,
},
{
    path: 'authorizedperson',
    component: GlobalAuthorizedPersonComponent,
},

{
    path: 'restrictedperson',
    component: GlobalRestrictedPersonComponent,
},

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GlobalRoutingModule {}

