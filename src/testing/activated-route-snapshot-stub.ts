import { convertToParamMap, ParamMap, Params} from '@angular/router';
import {BehaviorSubject, Observable, ReplaySubject, Subject} from 'rxjs';

/**
 * An ActivateRoute test double with a `paramMap` observable.
 * Use the `setParamMap()` method to add the next `paramMap` value.
 */
export class ActivatedRouteSnapshotStub {
    // routeConfig: Route | null;
    // url: UrlSegment[];
    // params: Params;
    // queryParams: Params;
    // fragment: string;
    // data: Data;
    // outlet: string;
    // component: Type<any> | string | null;
    // root: ActivatedRouteSnapshot;
    // parent: ActivatedRouteSnapshot | null;
    // firstChild: ActivatedRouteSnapshot | null;
    // children: ActivatedRouteSnapshot[];
    // pathFromRoot: ActivatedRouteSnapshot[];
    /** The mock paramMap observable */
    public paramMap: ParamMap;
    // queryParamMap: ParamMap;
    // toString(): string;

    constructor(initialParamMap?: ParamMap) {
        this.paramMap = initialParamMap;
    }
}
