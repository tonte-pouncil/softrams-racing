import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AppService } from '../app.service';

@Injectable()
export class LoginGaurd implements CanActivate {
    constructor(private appService: AppService, private router: Router) {}

    canActivate() {
        return this.checkIfLoggedin();
    }

    private checkIfLoggedin(): boolean {
        let isLoggedIn = false;
        if (this.appService.getUsername() !== null && this.appService.getUsername() !== undefined) {
            isLoggedIn = true;
        } else {
            this.router.navigate(['/login']);
        }
        return isLoggedIn;
    }
}
