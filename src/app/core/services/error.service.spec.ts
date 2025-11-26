import {TestBed} from '@angular/core/testing';

import {ErrorService} from './error.service';
import {Router} from '@angular/router';

describe('ErrorService', () => {
  let service: ErrorService;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      providers: [ErrorService, {provide: Router, useValue: routerSpy}]
    });
    service = TestBed.inject(ErrorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should redirect to error page when calling logErrorAndRedirect', () => {
    routerSpy.navigate.and.returnValue(Promise.resolve(true));

    service.logErrorAndRedirect('failure');
    expect(routerSpy.navigate).toHaveBeenCalledOnceWith(["/error"]);
  })
});
