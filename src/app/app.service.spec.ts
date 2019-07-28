import {TestBed, inject} from '@angular/core/testing';
import {AppService} from './app.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {of} from 'rxjs';

describe('AppService', () => {
    const teamsData = require('src/testing/data/teams.json');

    let httpClientSpy: { get: jasmine.Spy };

    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

        TestBed.configureTestingModule({
            providers: [AppService, {provide: HttpClient, useValue: httpClientSpy}],
            imports: [HttpClientModule],
        });
    });

    it('should be created', inject([AppService], (service: AppService) => {
        httpClientSpy.get.and.returnValues(of(teamsData));

        expect(service).toBeTruthy();

        service.getTeams().then(
            teams => expect(teams).toEqual(teamsData, 'expected teams'),
            fail
        );

        expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
    }));
});
