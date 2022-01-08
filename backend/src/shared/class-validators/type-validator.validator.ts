import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isTypeValid', async: false })
export class isTypeValid implements ValidatorConstraintInterface {
  validate(
    text: string,
    validationArguments?: ValidationArguments,
  ): boolean | Promise<boolean> {
    if (text == 'student' || text == 'professor') return true;
    return false;
  }
  defaultMessage(validationArguments?: ValidationArguments): string {
    return 'Type mora biti "student" ili "professor"';
  }
}
