import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasourceSearchComponent } from './datasource-search.component';

describe('DatasourceSearchComponent', () => {
  let component: DatasourceSearchComponent;
  let fixture: ComponentFixture<DatasourceSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatasourceSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasourceSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
