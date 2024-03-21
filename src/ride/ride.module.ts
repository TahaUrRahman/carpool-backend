import { Module } from '@nestjs/common';
import { RideService } from './ride.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtStrategy } from 'src/auth/strategy';
import { RideController } from './ride.controller';

@Module({
  providers: [RideService, JwtStrategy],
  controllers: [RideController],
})
export class RideModule {}
