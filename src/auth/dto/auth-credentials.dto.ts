import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @IsEmail()
  @MinLength(4)
  @MaxLength(20)
  email: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;
}
