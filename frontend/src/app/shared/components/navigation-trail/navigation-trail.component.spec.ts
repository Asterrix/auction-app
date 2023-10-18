import {ComponentFixture, TestBed} from "@angular/core/testing";

import {NavigationTrailComponent} from "./navigation-trail.component";

describe("NavigationTrailComponent", () => {
  let component: NavigationTrailComponent;
  let fixture: ComponentFixture<NavigationTrailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NavigationTrailComponent]
    });
    fixture = TestBed.createComponent(NavigationTrailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
