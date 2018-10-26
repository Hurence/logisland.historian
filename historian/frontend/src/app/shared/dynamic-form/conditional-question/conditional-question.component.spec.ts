import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionalQuestionComponent } from './conditional-question.component';

describe('ConditionalQuestionComponent', () => {
  let component: ConditionalQuestionComponent;
  let fixture: ComponentFixture<ConditionalQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConditionalQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConditionalQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
