import {
  ArgumentMetadata,
  HttpException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ValidateShapePipe implements PipeTransform {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (value !== 'simple' && value !== 'full') {
      throw new HttpException('Shape type must be simple or full', 400);
    }
    return value;
  }
}
