import { Injectable, NotFoundException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { UserRole } from "@prisma/client";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'custom-strategy'){
    constructor(config: ConfigService, private prisma: PrismaService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.get('JWT_SECRET')
        })
    }

    async validate(payload: {sub: number, email: string, role: UserRole}){
        const user = await this.prisma.user.findUnique({
            where: {
                id: payload.sub
            }
        })  
        if (!user) {
            throw new NotFoundException('User not found');
          }
        delete user.hash
        return user
    }
}