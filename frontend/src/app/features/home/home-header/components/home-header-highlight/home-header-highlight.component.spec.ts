import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeHeaderHighlightComponent } from './home-header-highlight.component';

describe('HomeHeaderHighlightComponent', () => {
  let component: HomeHeaderHighlightComponent;
  let fixture: ComponentFixture<HomeHeaderHighlightComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HomeHeaderHighlightComponent]
    });
    fixture = TestBed.createComponent(HomeHeaderHighlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
