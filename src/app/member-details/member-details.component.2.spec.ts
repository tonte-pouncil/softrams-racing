import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { MemberDetailsComponent } from './member-details.component';
import { FormBuilder } from '@angular/forms';

import { HttpClient, HTTP_INTERCEPTORS, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MembersComponent } from '../members/members.component';
import { LoginComponent } from '../login/login.component';
import { Directive, NO_ERRORS_SCHEMA, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { doesNotThrow } from 'assert';

@Injectable()
class TestHttpRequestInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {
        return new Observable<any>(observer => {
            observer.next({} as HttpEvent<any>);
        });
    }
}

class MockActivatedRoute extends ActivatedRoute {
    constructor() {
        super();
        this.params = of({ memberId: '1234' });
    }
}

// Bonus points!
describe('MemberDetailsComponent', () => {
    let component: MemberDetailsComponent;
    let fixture: ComponentFixture<MemberDetailsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MemberDetailsComponent, MembersComponent, LoginComponent],
            imports: [
                FormsModule,
                ReactiveFormsModule,
                HttpClientModule,
                RouterTestingModule
            ],
            providers: [
                HttpClient,
                FormBuilder,
                {
                    provide: HTTP_INTERCEPTORS, useClass: TestHttpRequestInterceptor, multi: true
                },
                MockActivatedRoute
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MemberDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('appService should have memberId & return teams', fakeAsync((done) => {
        component.appService.getTeams().then(teams => {
            done();
            expect(component.route.snapshot.paramMap.get('memberId')).toBe('1234');
            expect(teams).toBeDefined();
        });
    }));
});
