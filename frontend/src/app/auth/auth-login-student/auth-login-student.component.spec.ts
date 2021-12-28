import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthLoginStudentComponent } from './auth-login-student.component';

describe('AuthLoginStudentComponent', () => {
  let component: AuthLoginStudentComponent;
  let fixture: ComponentFixture<AuthLoginStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthLoginStudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthLoginStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
