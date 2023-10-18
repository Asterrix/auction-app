import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeHeaderSidebarComponent } from './home-header-sidebar.component';

describe('HomeHeaderSidebarComponent', () => {
  let component: HomeHeaderSidebarComponent;
  let fixture: ComponentFixture<HomeHeaderSidebarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HomeHeaderSidebarComponent]
    });
    fixture = TestBed.createComponent(HomeHeaderSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
