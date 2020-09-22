import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { CommonService } from '../common/common.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router) { }

    canActivate() {
        const currentUser = JSON.parse(localStorage.getItem('isauthenticated'));
        if (currentUser === true) {
            return true;
        }

        this.router.navigate(['/']);
        return false;
    }
}


@Injectable()
export class SuperAdminAuthGuard implements CanActivate {

    constructor(private router: Router, private commonService: CommonService) { }

    canActivate(next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot) {
        const path = localStorage.getItem('path');
        // if (this.commonService.getUserRole('userdetails') === 1) {
        //     return true;
        // }
        let role = 0;
        const user = JSON.parse(localStorage.getItem('userdetails'));
        if (user) {
            role = user.data.roleId;
        }
        let token = '';
        if (role === 1) {
            return true;
        }
        const data = JSON.parse(localStorage.getItem('userdetails'));
        if (data) {
            token = data.access_token;
        }
        if (path !== null && token !== '') {
            this.router.navigate([path]);
        } else {
            this.router.navigate(['/']);
        }
        return false;
    }
}

@Injectable()
export class AdminAuthGuard implements CanActivate {

    constructor(private router: Router, private commonService: CommonService) { }

    canActivate(next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot) {
        const path = localStorage.getItem('path');
        let role = 0;
        const user = JSON.parse(localStorage.getItem('userdetails'));
        if (user) {
            role = user.data.roleId;
        }
        if (role === 2) {
            return true;
        }
        let token = '';
        const data = JSON.parse(localStorage.getItem('userdetails'));
        if (data) {
            token = data.access_token;
        }
        if (path !== null && token !== '') {
            this.router.navigate([path]);
        } else {
            this.router.navigate(['/']);
        }
        return false;
    }
}

@Injectable()
export class TeacherAuthGuard implements CanActivate {

    constructor(private router: Router, private commonService: CommonService) { }


    canActivate(next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot) {
        let role = 0;
        const path = localStorage.getItem('path');
        const user = JSON.parse(localStorage.getItem('userdetails'));
        if (user) {
            role = user.data.roleId;
        }
        if (role === 3) {
            return true;
        }
        let token = '';
        const data = JSON.parse(localStorage.getItem('userdetails'));
        if (data) {
            token = data.access_token;
        }
        if (path !== null && token !== '') {
            this.router.navigate([path]);
        } else {
            this.router.navigate(['/']);
        }
        return false;
    }
}

@Injectable()
export class ParentAuthGuard implements CanActivate {

    constructor(private router: Router, private commonService: CommonService) { }

    canActivate(next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot) {
debugger;
        const path = localStorage.getItem('path');
        // if (this.commonService.getUserRole('userdetails') === 4) {
        //     return true;
        // }
        let role = 0;
        const user = JSON.parse(localStorage.getItem('userdetails'));
        if (user) {
            role = user.data.roleId;
        }
        if (role === 4) {
            return true;
        }
        let token = '';
        const data = JSON.parse(localStorage.getItem('userdetails'));
        if (data) {
            token = data.access_token;
        }
        if (path !== null && token !== '') {
            this.router.navigate([path]);
        } else {
            this.router.navigate(['/']);
        }
        return false;
    }
}



@Injectable()
export class IsLoggedInAuthGuard implements CanActivate {

    constructor(private router: Router, private commonService: CommonService) { }

    canActivate() {
        const path = localStorage.getItem('path');
        let token = '';
        const user = JSON.parse(localStorage.getItem('userdetails'));
        if (user) {
            token = user.access_token;
        }
        if (token === '') {
            return true;
        }
        this.router.navigate([path]);
        return false;
    }
}


@Injectable()
export class IsGuardianAuthGuard implements CanActivate {

    constructor(private router: Router, private commonService: CommonService) { }

    canActivate() {
        const path = localStorage.getItem('path');
        let isGuardian: boolean;
        const user = JSON.parse(localStorage.getItem('userdetails'));
        if (user) {
            isGuardian = user.data.isGaurdian;
        }
        if (isGuardian === false) {
            return true;
        }
        this.router.navigate([path]);
        return false;
    }
}


