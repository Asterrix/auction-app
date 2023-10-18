import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnchorImageComponent } from './anchor-image.component';

describe('AnchorImageComponent', () => {
  let component: AnchorImageComponent;
  let fixture: ComponentFixture<AnchorImageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AnchorImageComponent]
    });
    fixture = TestBed.createComponent(AnchorImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
