import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTagFormComponent } from './add-tag-form.component';

describe('AddTagFormComponent', () => {
  let component: AddTagFormComponent;
  let fixture: ComponentFixture<AddTagFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTagFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTagFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
