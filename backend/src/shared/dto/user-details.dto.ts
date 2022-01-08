import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { isTypeValid } from '../class-validators/type-validator.validator';

export class UserDetailsDto {
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
}
