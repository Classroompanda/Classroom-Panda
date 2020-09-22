import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { GlobalComponent } from './global.component';
import { GlobalRoutingModule } from './global-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { GlobalAuthorizedPersonComponent } from './components/global-authorized-person/global-authorized-person.component';
import {MultiSelectModule} from 'primeng/multiselect';
import { SharedModule } from 'src/app/shared/shared.module';
import { PaginatorModule } from 'primeng/paginator';
import { GlobalRestrictedPersonComponent } from './components/global-restricted-person/global-restricted-person.component';
@NgModule({
  imports: [
    CommonModule,
    GlobalRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    MultiSelectModule,
    SharedModule,
    PaginatorModule
  ],
  declarations: [ResetPasswordComponent, GlobalComponent, GlobalAuthorizedPersonComponent, GlobalRestrictedPersonComponent]
})
export class GlobalModule { }
