import {
  ArgumentMetadata,
  HttpException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class UserTypeValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    if (value == 'student' || value == 'professor') {
      return value;
    } else {
      throw new HttpException('UserType ne valja', 400);
    }
  }
}
