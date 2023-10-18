import {TestBed} from "@angular/core/testing";

import {NavigationTrailService} from "./navigation-trail.service";

describe("NavigationTrailService", () => {
  let service: NavigationTrailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavigationTrailService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
