import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class LoginProfessorDto {
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  username: string;
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  password: string;
}
