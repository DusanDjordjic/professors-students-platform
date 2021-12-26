import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class AddStudentDto {
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  name: string;
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
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  interests: string;
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  password: string;
}
