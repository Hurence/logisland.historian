import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JsTreeComponent } from './js-tree.component';

describe('JsTreeComponent', () => {
  let component: JsTreeComponent;
  let fixture: ComponentFixture<JsTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JsTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JsTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
