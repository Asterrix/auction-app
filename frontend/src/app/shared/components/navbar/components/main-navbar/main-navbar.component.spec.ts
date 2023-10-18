import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainNavbarComponent } from './main-navbar.component';

describe('MainNavbarComponent', () => {
  let component: MainNavbarComponent;
  let fixture: ComponentFixture<MainNavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MainNavbarComponent]
    });
    fixture = TestBed.createComponent(MainNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
