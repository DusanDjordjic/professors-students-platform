import { ArgumentMetadata, PipeTransform } from '@nestjs/common';

export class GroupsTransformPipe implements PipeTransform {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    return JSON.parse(value);
  }
}
