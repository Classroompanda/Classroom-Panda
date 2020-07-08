import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-confirm-box',
  templateUrl: './confirm-box.component.html',
  styleUrls: ['./confirm-box.component.css']
})
export class ConfirmBoxComponent implements OnInit {
  @Input() IsLabel = false;
  buttonText: string;
  rejectVisible: boolean;
  constructor() { }

  ngOnInit() {
  }

}
