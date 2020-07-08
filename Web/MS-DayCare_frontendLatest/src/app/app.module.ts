import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {AccordionModule} from 'primeng/accordion';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AuthGuard, IsLoggedInAuthGuard } from './shared/services/guard';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { JwtInterceptor } from './shared/services/interceptors/jwt.interceptor';
import { ErrorInterceptor } from './shared/services/interceptors/error.interceptor';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { MessagingService } from './shared/services/firebace-messaging/messaging.service';
import { AsyncPipe } from '@angular/common';
import { DatePipe } from '@angular/common';
import { NgOtpInputModule } from 'ng-otp-input';
import { SignaturePadModule } from 'angular2-signaturepad';


@NgModule({
  declarations: [
    AppComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AccordionModule,
    ToastrModule.forRoot({ preventDuplicates : true, progressBar : true}),
    LoadingBarHttpClientModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireMessagingModule,
    AngularFireModule.initializeApp(environment.firebase),
    NgOtpInputModule,
    SignaturePadModule
  ],
  providers: [AuthGuard, IsLoggedInAuthGuard, MessagingService, AsyncPipe, DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],

  bootstrap: [AppComponent]
})
export class AppModule { }
