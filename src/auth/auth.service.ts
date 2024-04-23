import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { compare } from 'bcrypt';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  private SALT_ROUNDS = Number(this.configService.get('HASH_SALT_ROUNDS'));
  private JWT_SECRET = this.configService.get('JWT_SECRET');

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService) { }

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  async signIn(signInDto: SignInDto): Promise<any> {
    const { email, pass } = signInDto;
    const user = await this.userRepository.createQueryBuilder('users').where({ email }).getOne();

    if (!user) {
      throw new NotFoundException('User nor found!');
    }

    const comparePass = await compare(pass, user.password)

    if (!comparePass) {
      throw new UnauthorizedException();
    }

    const payload = { id: user.uuid };
    const token = this.jwtService.signAsync(payload, {
      secret: this.JWT_SECRET,
    })
    const { password, ...result } = user;
    return { result, token };
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  async verifyPassword(id: string) {
    const payload = { id };

    try {
      const token = await this.jwtService.signAsync(payload, {
        secret: this.JWT_SECRET,
      });

      return {
        message: 'ACCEPTED',
        token,
      };
    } catch (err) {
      throw new InternalServerErrorException(
        `Failed to generate token: ${err}`,
      );
    }
  }

}
