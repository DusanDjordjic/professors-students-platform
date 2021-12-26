import { ArgumentMetadata, HttpException, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
export class LoginStudentValidationPipe implements PipeTransform {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || this.toValidate(metatype)) {
      return value;
    }

    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new HttpException(errors, 400);
    } else {
      return value;
    }
  }
  toValidate(metatype: Function) {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return types.includes(metatype);
  }
}
