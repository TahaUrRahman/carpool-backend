import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto, SignUpDto } from './dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService,
    private config: ConfigService ) {}
  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) throw new ForbiddenException('Account does not exist');
    else {
      const isPasswordCorrect = await argon.verify(user.hash, dto.password);
      if (!isPasswordCorrect)
        throw new ForbiddenException('Credentials not correct');
      else {
        return this.signToken(user.id,user.email, user.role);
      }
    }
  }
  async signUp(dto: SignUpDto) {
    const hash = await argon.hash(dto.password);
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
          role: dto.role,
          firstName: dto.firstName,
          lastName: dto.lastName,
        },
      });
      return this.signToken(user.id,user.email, user.role);

    } catch (error) {
      if (error.code === 'P2002') {
        throw new ForbiddenException('Account already exists!');
      } else {
        throw new InternalServerErrorException('Unknown error occured');
      }
    }
  }

  async signToken(userId: number, email: string, role: string){
    const payload = {
      sub: userId,
      email: email,
      role: role
    }
    const secret = this.config.get('JWT_SECRET')
    const token =  await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret
    })
    return {
      access_token: token
    }


  }
}
