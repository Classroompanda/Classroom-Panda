import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agency-admin-message',
  template: `
  <app-reset-password> </app-reset-password>
  <router-outlet><router-outlet>`
})
export class GlobalComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
