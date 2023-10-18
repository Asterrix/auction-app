import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTermsConditionsComponent } from './home-terms-conditions.component';

describe('HomeTermsConditionsComponent', () => {
  let component: HomeTermsConditionsComponent;
  let fixture: ComponentFixture<HomeTermsConditionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HomeTermsConditionsComponent]
    });
    fixture = TestBed.createComponent(HomeTermsConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
