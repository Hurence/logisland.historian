import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcTagTreeAutomaticComponent } from './opc-tag-tree-automatic.component';

describe('OpcTagTreeComponent', () => {
  let component: OpcTagTreeAutomaticComponent;
  let fixture: ComponentFixture<OpcTagTreeAutomaticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpcTagTreeAutomaticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpcTagTreeAutomaticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
