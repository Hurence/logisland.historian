import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormQuestionArrayComponent } from './dynamic-form-question-array.component';

describe('DynamicFormQuestionArrayComponent', () => {
  let component: DynamicFormQuestionArrayComponent;
  let fixture: ComponentFixture<DynamicFormQuestionArrayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicFormQuestionArrayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormQuestionArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
