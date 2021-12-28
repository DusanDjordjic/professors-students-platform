import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const checkPasswordsValidator: ValidatorFn = function (
  group: AbstractControl
): ValidationErrors | null {
  let pass = group.get('password')?.value;
  let confirmPass = group.get('passwordRepeat')?.value;
  return pass === confirmPass ? null : { notSame: true };
};
