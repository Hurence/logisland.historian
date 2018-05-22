import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasourceDashboardComponent } from './datasource-dashboard.component';

describe('DatasourceDashboardComponent', () => {
  let component: DatasourceDashboardComponent;
  let fixture: ComponentFixture<DatasourceDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatasourceDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasourceDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
