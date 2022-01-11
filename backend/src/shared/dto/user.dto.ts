import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsDefined,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
  Validate,
  ValidateNested,
} from 'class-validator';
import { IsArrayDistinct } from '../class-validators/array-dstinct.validator';
import { isTypeValid } from '../class-validators/type-validator.validator';
import { AddressDto, UpdateAddressDto } from './address.dto';
import { ConactInfoDto, UpdateContactInfoDto } from './contact_info.dto';

export class CreateUserDto {
  @IsString()
  @MinLength(8)
  @MaxLength(255)
  username: string;
  @IsString()
  @MinLength(8)
  @MaxLength(255)
  password: string;
  @IsString()
  @IsNotEmpty()
  firstname: string;
  @IsString()
  @IsNotEmpty()
  lastname: string;
  @IsNotEmpty()
  @IsString()
  @Validate(isTypeValid)
  type: 'student' | 'professor';
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  about: string;
  @IsDefined()
  @ValidateNested()
  @Type(() => ConactInfoDto)
  contactInfo: ConactInfoDto;
  @IsDefined()
  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;
  @IsDefined()
  @ArrayNotEmpty()
  @Validate(IsArrayDistinct)
  @Min(0, { each: true })
  subjects: number[];
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(8)
  @MaxLength(255)
  username: string;
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  firstname: string;
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  lastname: string;
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateContactInfoDto)
  contactInfo: UpdateContactInfoDto;
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateAddressDto)
  address: UpdateAddressDto;
}
