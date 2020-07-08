import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from 'src/app/auth/components/login/login.component';
import { ForgotPasswordComponent } from 'src/app/auth/components/forgot-password/forgot-password.component';
import { CreatePasswordComponent } from 'src/app/auth/components/create-password/create-password.component';
import { ParentsRegistrationComponent } from './components/parents-registration/parents-registration.component';
import { AgencyRegistrationComponent } from './components/agency-registration/agency-registration.component';
import { KioskLoginComponent } from './components/kiosk-login/kiosk-login.component';


const routes: Routes = [
     { path: '', component: LoginComponent },
     { path: 'forgotpassword', component: ForgotPasswordComponent },
     { path: 'createpassword/:id', component: CreatePasswordComponent },
     { path: 'parentsregistration', component: ParentsRegistrationComponent },
     { path: 'agencyregistration', component: AgencyRegistrationComponent },
     { path: 'kiosklogin', component: KioskLoginComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {}
