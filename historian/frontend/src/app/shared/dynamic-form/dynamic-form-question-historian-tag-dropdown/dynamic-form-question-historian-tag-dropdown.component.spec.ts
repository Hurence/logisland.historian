import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormQuestionHistorianTagDropdownComponent } from './dynamic-form-question-historian-tag-dropdown.component';

describe('DynamicFormQuestionHistorianTagDropdownComponent', () => {
  let component: DynamicFormQuestionHistorianTagDropdownComponent;
  let fixture: ComponentFixture<DynamicFormQuestionHistorianTagDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicFormQuestionHistorianTagDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormQuestionHistorianTagDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
