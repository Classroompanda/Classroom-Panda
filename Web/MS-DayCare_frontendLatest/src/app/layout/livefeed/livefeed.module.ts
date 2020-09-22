import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LivefeedRoutingModule } from '../livefeed/live-feed-routing.module';
import { FeedComponent } from './components/feed/feed.component';

@NgModule({
  imports: [
    CommonModule,
    LivefeedRoutingModule
  ],
  declarations: [FeedComponent]
})
export class LivefeedModule { }
