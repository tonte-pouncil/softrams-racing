import {convertToParamMap, ParamMap, Params} from '@angular/router';
import {ReplaySubject} from 'rxjs';
import {ActivatedRouteSnapshotStub} from './activated-route-snapshot-stub';

/**
 * An ActivateRoute test double with a `paramMap` observable.
 * Use the `setParamMap()` method to add the next `paramMap` value.
 */
export class ActivatedRouteStub {
    public snapshot: ActivatedRouteSnapshotStub;
    // Use a ReplaySubject to share previous values with subscribers
    // and pump new values into the `paramMap` observable
    private subjectParamMap = new ReplaySubject<ParamMap>();

    /** The mock paramMap observable */
    readonly paramMap = this.subjectParamMap.asObservable();

    constructor(initialParams?: Params) {
        this.setParamMap(initialParams);
        this.paramMap.subscribe(paramMap => {
            this.snapshot = new ActivatedRouteSnapshotStub(paramMap);
        });
    }

    /** Set the paramMap observables's next value */
    setParamMap(params?: Params) {
        this.subjectParamMap.next(convertToParamMap(params));
    }
}
