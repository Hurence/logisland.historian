import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSelectionComponent } from './dashboard-selection.component';

describe('DashboardSelectionComponent', () => {
  let component: DashboardSelectionComponent;
  let fixture: ComponentFixture<DashboardSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
