import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionDashboardComponent } from './selection-dashboard.component';

describe('SelectionDashboardComponent', () => {
  let component: SelectionDashboardComponent;
  let fixture: ComponentFixture<SelectionDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectionDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
