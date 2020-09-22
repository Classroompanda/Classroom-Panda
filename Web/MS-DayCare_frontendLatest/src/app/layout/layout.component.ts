import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
    constructor(private router: Router) {}

    ngOnInit() {
        // const path = localStorage.getItem('path');
        // const user = JSON.parse(localStorage.getItem('isauthenticated'));

        // if (this.router.url === '/home' && user === true ) {
        //     this.router.navigate([path]);
        // } else {
        //     this.router.navigate(['/']);
        // }
    }

}
