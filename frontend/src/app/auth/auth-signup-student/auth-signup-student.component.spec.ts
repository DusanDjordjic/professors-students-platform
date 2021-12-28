import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthSignupStudentComponent } from './auth-signup-student.component';

describe('AuthSignupStudentComponent', () => {
  let component: AuthSignupStudentComponent;
  let fixture: ComponentFixture<AuthSignupStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthSignupStudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthSignupStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
