import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefreshRateSelectionComponent } from './refresh-rate-selection.component';

describe('RefreshRateSelectionComponent', () => {
  let component: RefreshRateSelectionComponent;
  let fixture: ComponentFixture<RefreshRateSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefreshRateSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefreshRateSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
