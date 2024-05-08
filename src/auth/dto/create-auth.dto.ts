import { IsDate, IsEnum, IsOptional, IsPhoneNumber, IsString, Length } from 'class-validator';
import { UserGender } from 'src/users/user.types';

export class CreateAuthDto {

  @IsString()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  email: string;

  @IsString()
  @Length(6, 6, { message: 'password must contain 6 digits ' })
  pass: string;

  @IsString()
  @IsOptional()
  @IsPhoneNumber('UA')
  phone?: string;

  @IsDate()
  @IsOptional()
  dateOfBirth?: Date;

  @IsOptional()
  @IsEnum(UserGender)
  gender?: UserGender;

  @IsString()
  @IsOptional()
  country?: string;
}
