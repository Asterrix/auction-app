import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadCrumbComponent } from './bread-crumb.component';

describe('BreadcrumbComponent', () => {
  let component: BreadCrumbComponent;
  let fixture: ComponentFixture<BreadCrumbComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BreadCrumbComponent]
    });
    fixture = TestBed.createComponent(BreadCrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
