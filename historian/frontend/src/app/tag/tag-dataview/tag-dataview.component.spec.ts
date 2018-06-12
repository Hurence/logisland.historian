import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagDataviewComponent } from './tag-dataview.component';

describe('TagDataviewComponent', () => {
  let component: TagDataviewComponent;
  let fixture: ComponentFixture<TagDataviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagDataviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagDataviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
