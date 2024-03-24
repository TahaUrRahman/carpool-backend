import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { RideModule } from './ride/ride.module';
import { LocationModule } from './location/location.module';
import { BookingModule } from './booking/booking.module';


@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}), AuthModule, UserModule, PrismaModule, RideModule, LocationModule, BookingModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
