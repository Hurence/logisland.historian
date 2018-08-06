import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormQuestionRadioComponent } from './dynamic-form-question-radio.component';

describe('DynamicFormQuestionRadioComponent', () => {
  let component: DynamicFormQuestionRadioComponent;
  let fixture: ComponentFixture<DynamicFormQuestionRadioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicFormQuestionRadioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormQuestionRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
