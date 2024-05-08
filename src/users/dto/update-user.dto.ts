import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsDate, IsEnum, IsOptional, IsPhoneNumber, IsString, Length } from "class-validator";
import { UserGender } from '../user.types';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  email: string;

  @IsString()
  @Length(6, 6, { message: 'password must contain 6 digits ' })
  password: string;

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
