import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthSignupProfessorComponent } from './auth-signup-professor.component';

describe('AuthSignupProfessorComponent', () => {
  let component: AuthSignupProfessorComponent;
  let fixture: ComponentFixture<AuthSignupProfessorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthSignupProfessorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthSignupProfessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
