import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class AddProfessorDto {
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  firstName: string;
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  lastName: string;
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  username: string;
  @IsEmail()
  email: string;
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  phoneNumber: string;
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  price: number;
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  subjects: string;
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  password: string;
}
