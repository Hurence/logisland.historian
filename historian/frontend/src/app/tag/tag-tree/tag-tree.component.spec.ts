import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagTreeComponent } from './tag-tree.component';

describe('TagsListComponent', () => {
  let component: TagTreeComponent;
  let fixture: ComponentFixture<TagTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
/*
  it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
