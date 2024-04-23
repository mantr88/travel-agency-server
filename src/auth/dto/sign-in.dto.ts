import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthDto } from './create-auth.dto';
import { IsString } from 'class-validator';

export class SignInDto extends PartialType(CreateAuthDto) {
  @IsString()
  email: string;

  @IsString()
  pass: string;
}