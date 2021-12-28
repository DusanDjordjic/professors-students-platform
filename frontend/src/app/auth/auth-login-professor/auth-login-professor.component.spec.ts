import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthLoginProfessorComponent } from './auth-login-professor.component';

describe('AuthLoginProfessorComponent', () => {
  let component: AuthLoginProfessorComponent;
  let fixture: ComponentFixture<AuthLoginProfessorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthLoginProfessorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthLoginProfessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
