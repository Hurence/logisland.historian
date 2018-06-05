import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagHelpComponent } from './tag-help.component';

describe('TagHelpComponent', () => {
  let component: TagHelpComponent;
  let fixture: ComponentFixture<TagHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagHelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
