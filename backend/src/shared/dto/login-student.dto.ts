import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class LoginStudentDto {
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  username: string;
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  password: string;
}
