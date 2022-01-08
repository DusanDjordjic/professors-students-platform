import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
@ValidatorConstraint({ name: 'IsArrayDistinct', async: false })
export class IsArrayDistinct implements ValidatorConstraintInterface {
  validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): boolean | Promise<boolean> {
    if (Array.isArray(value)) {
      const distinct = [...new Set(value)];
      return distinct.length === value.length;
    }
    return false;
  }
  defaultMessage(validationArguments?: ValidationArguments): string {
    return 'Vrednosti se ne smeju ponavljati';
  }
}
