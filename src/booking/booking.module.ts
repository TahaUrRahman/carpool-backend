import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { JwtStrategy } from 'src/auth/strategy';

@Module({
  providers: [BookingService, JwtStrategy],
  controllers: [BookingController]
})
export class BookingModule {}
