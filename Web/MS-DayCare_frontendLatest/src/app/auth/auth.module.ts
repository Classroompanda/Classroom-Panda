import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from 'src/app/auth/auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { AuthComponent } from 'src/app/auth/auth.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { AccordionModule } from 'primeng/accordion';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'primeng/components/common/shared';
import { AuthApiService } from './shared/services/auth-api-service/auth-api.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CreatePasswordComponent } from './components/create-password/create-password.component';
import { ParentsRegistrationComponent } from './components/parents-registration/parents-registration.component';
import { DialogModule } from 'primeng/dialog';
import { ConfirmationService } from 'primeng/api';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { ConfirmBoxComponent } from './shared/confirm-box/confirm-box.component';
import { AgencyRegistrationComponent } from './components/agency-registration/agency-registration.component';
import { KioskLoginComponent } from './components/kiosk-login/kiosk-login.component';
import { NgOtpInputModule } from 'ng-otp-input';


@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    AccordionModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    SharedModule,
    NgxSpinnerModule,
    ConfirmDialogModule,
    NgOtpInputModule
  ],
  declarations: [LoginComponent,
    AuthComponent,
    ForgotPasswordComponent,
    CreatePasswordComponent,
    ParentsRegistrationComponent,
    ConfirmBoxComponent,
    AgencyRegistrationComponent,
    KioskLoginComponent],
    providers: [AuthApiService, ConfirmationService]
})
export class AuthModule { }
