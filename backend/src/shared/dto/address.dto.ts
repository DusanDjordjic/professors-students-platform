import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class AddressDto {
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  city: string;
  @IsOptional()
  @IsString()
  @MaxLength(255)
  street: string;
  @IsOptional()
  @IsString()
  @MaxLength(255)
  streetNumber: string;
}
export class UpdateAddressDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  city: string;
  @IsOptional()
  @IsString()
  @MaxLength(255)
  street: string;
  @IsOptional()
  @IsString()
  @MaxLength(255)
  streetNumber: string;
}
