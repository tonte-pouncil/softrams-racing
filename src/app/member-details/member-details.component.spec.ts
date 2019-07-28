import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {MemberDetailsComponent} from './member-details.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';

import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {AppService} from 'src/app/app.service';
import {ActivatedRouteStub} from 'src/testing/activated-route-stub';

// Bonus points!
describe('MemberDetailsComponent', () => {
    const teamsData = require('src/testing/data/teams.json');
    const membersData = require('src/testing/data/members.json');
    let activatedRouteStub: ActivatedRouteStub;
    let component: MemberDetailsComponent;
    let fixture: ComponentFixture<MemberDetailsComponent>;
    let appServiceSpy;

    beforeEach(async(() => {
        activatedRouteStub = new ActivatedRouteStub({memberId: '1'});

        const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl', 'navigate', 'snapshot']);

        appServiceSpy = jasmine.createSpyObj('AppService', ['getTeams', 'addMember', 'updateMember', 'getMember']);


        TestBed.configureTestingModule({
            declarations: [MemberDetailsComponent],
            imports: [
                FormsModule,
                ReactiveFormsModule,
                HttpClientModule,
                RouterModule
            ],
            providers: [
                HttpClient,
                FormBuilder,
                {provide: Router, useValue: routerSpy},
                {provide: AppService, useValue: appServiceSpy},
                {provide: ActivatedRoute, useValue: activatedRouteStub}
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(MemberDetailsComponent);
        component = fixture.componentInstance;
    }));

    it('should create', async(() => {
        expect(component).toBeTruthy();
        activatedRouteStub.setParamMap({memberId: '1'});
        appServiceSpy.getTeams.and.returnValues(Promise.resolve(teamsData));
        appServiceSpy.getMember.and.returnValue(Promise.resolve(membersData[0]));

        fixture.detectChanges();

        expect(component.mode).toBe('update');

        fixture.whenStable().then(() => {
            fixture.detectChanges();
            expect(component.teams).toEqual(teamsData);
            expect(component.memberForm).toBeDefined();
            expect(component.memberForm.value.id).toBe(membersData[0].id.toString());
            expect(component.memberForm.value.firstName).toBe(membersData[0].firstName);
            expect(component.memberForm.value.lastName).toBe(membersData[0].lastName);
            expect(component.memberForm.value.jobTitle).toBe(membersData[0].jobTitle);
            expect(component.memberForm.value.team.name).toBe(membersData[0].team);
            expect(component.memberForm.value.status).toBe(membersData[0].status);
        });
    }));
});
