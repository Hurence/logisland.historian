import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GaugeFormComponent } from './gauge-form.component';

describe('GaugeFormComponent', () => {
  let component: GaugeFormComponent;
  let fixture: ComponentFixture<GaugeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GaugeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GaugeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
