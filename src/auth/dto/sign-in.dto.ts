import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthDto } from './create-auth.dto';
import { IsString, Length } from 'class-validator';

export class SignInDto extends PartialType(CreateAuthDto) {
  @IsString()
  email: string;

  @IsString()
  @Length(6, 6, { message: 'password must contain 6 digits ' })
  pass: string;
}