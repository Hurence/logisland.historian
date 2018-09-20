import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTagFormComponent } from './edit-tag-form.component';

describe('EditTagFormComponent', () => {
  let component: EditTagFormComponent;
  let fixture: ComponentFixture<EditTagFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTagFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTagFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
