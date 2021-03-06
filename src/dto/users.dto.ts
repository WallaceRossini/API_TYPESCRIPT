import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { RoleType } from '../enum';

export class RegisterDto {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  password: string

  @IsEnum(RoleType)
  @IsOptional()
  role?: RoleType

}

export class AuthenticationDto {

  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  password: string
  
}

export class ForgotPasswordDto {

  @IsEmail()
  @IsNotEmpty()
  email: string

}

export class ResetPasswordDto {

  @IsString()
  @IsString()
  password:string

}