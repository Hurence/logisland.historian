import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasourceHelpComponent } from './datasource-help.component';

describe('DatasourceHelpComponent', () => {
  let component: DatasourceHelpComponent;
  let fixture: ComponentFixture<DatasourceHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatasourceHelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasourceHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
