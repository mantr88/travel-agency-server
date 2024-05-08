import { IsDate, IsEnum, IsOptional, IsPhoneNumber, IsString, Length } from "class-validator";
import { UserGender } from "../user.types";

export class CreateUserDto {
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
