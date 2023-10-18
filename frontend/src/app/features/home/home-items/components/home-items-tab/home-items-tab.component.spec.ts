import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeItemsTabComponent } from './home-items-tab.component';

describe('HomeItemsTabComponent', () => {
  let component: HomeItemsTabComponent;
  let fixture: ComponentFixture<HomeItemsTabComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HomeItemsTabComponent]
    });
    fixture = TestBed.createComponent(HomeItemsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
