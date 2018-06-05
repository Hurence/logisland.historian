import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonLabelledComponent } from './button-labelled.component';

describe('ButtonLabelledComponent', () => {
  let component: ButtonLabelledComponent;
  let fixture: ComponentFixture<ButtonLabelledComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonLabelledComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonLabelledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
