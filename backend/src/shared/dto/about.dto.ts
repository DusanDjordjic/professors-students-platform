import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class AboutDto {
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  text: string;
}
