import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemShowcaseComponent } from './item-showcase.component';

describe('ItemShowcaseComponent', () => {
  let component: ItemShowcaseComponent;
  let fixture: ComponentFixture<ItemShowcaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ItemShowcaseComponent]
    });
    fixture = TestBed.createComponent(ItemShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
