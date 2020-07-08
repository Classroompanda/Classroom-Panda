import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './services/api-service/api.service';
import { NotificationService } from './services/notification-service/notification.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PagerService } from './services/Pager-service/pager.service';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import { ConfirmBoxComponent } from './components/confirm-box/confirm-box.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { FormattedTimePipe } from './pipes/time-pipe/formatted-time.pipe';
import { SearchPipe } from './pipes/search-pipe/search.pipe';


@NgModule({
  imports: [
    CommonModule,
    ConfirmDialogModule
  ],
  declarations: [ConfirmBoxComponent, PaginationComponent, FormattedTimePipe, SearchPipe],
  exports: [ConfirmBoxComponent, PaginationComponent, FormattedTimePipe, SearchPipe],
  providers: [ApiService, NotificationService, PagerService, ConfirmationService]
})
export class SharedModule { }
