import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentSectionAddComponent } from './student-section-add.component';

describe('StudentSectionAddComponent', () => {
  let component: StudentSectionAddComponent;
  let fixture: ComponentFixture<StudentSectionAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentSectionAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentSectionAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
