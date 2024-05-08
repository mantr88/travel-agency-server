import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { compare, hash } from 'bcrypt';
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

  async create(createAuthDto: CreateAuthDto) {
    const { email, pass, firstName, lastName, phone, dateOfBirth, gender, country } = createAuthDto;
    const user = await this.userRepository.createQueryBuilder('users').where({ email }).getOne();

    if (user) {
      throw new BadRequestException('User already exists');
    }

    const hashPass = await hash(pass, this.SALT_ROUNDS);
    const newUser = { firstName, lastName, email, phone, dateOfBirth, gender, country, password: hashPass };

    const savedNewUser = await this.userRepository.save(newUser);

    const payload = { id: savedNewUser.uuid };
    const token = await this.jwtService.signAsync(payload, {
      secret: this.JWT_SECRET,
    })
    const { password, ...result } = savedNewUser;
    return { result, token };
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
    const token = await this.jwtService.signAsync(payload, {
      secret: this.JWT_SECRET,
    })
    const { password, ...result } = user;
    return { result, token };
  }

  async logout(request: Request) {
    // let token = request['user'];

    // if (!token) {
    //   throw new UnauthorizedException();
    // }
    // const decodedToken = this.jwtService.decode(token) as { id: string };
    // if (!decodedToken) {
    //   throw new UnauthorizedException();
    // }
    // const userId = decodedToken.id;
    const token = '';

    return { message: 'Logout successful', token };
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


}
