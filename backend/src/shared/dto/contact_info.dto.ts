import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class ConactInfoDto {
  @IsEmail()
  @MaxLength(255)
  @IsNotEmpty()
  email: string;
  @IsOptional()
  @IsString()
  @MaxLength(255)
  phoneNumber: string;
  @IsOptional()
  @IsString()
  @MaxLength(255)
  website: string;
}
export class UpdateContactInfoDto {
  @IsOptional()
  @IsEmail()
  @MaxLength(255)
  @IsNotEmpty()
  email: string;
  @IsOptional()
  @IsString()
  @MaxLength(255)
  phoneNumber: string;
  @IsOptional()
  @IsString()
  @MaxLength(255)
  website: string;
}
