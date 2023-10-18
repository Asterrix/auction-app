import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePrivacyPolicyComponent } from './home-privacy-policy.component';

describe('HomePrivacyPolicyComponent', () => {
  let component: HomePrivacyPolicyComponent;
  let fixture: ComponentFixture<HomePrivacyPolicyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HomePrivacyPolicyComponent]
    });
    fixture = TestBed.createComponent(HomePrivacyPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
