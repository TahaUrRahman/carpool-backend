import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { BookingStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookingService {
  constructor(private prisma: PrismaService) {}

  async getBookings(userId: number) {
    try {
      const bookingsWithRides = await this.prisma.booking.findMany({
        where: {
          passengerId: userId,
        },
        include: {
          ride: true,
        },
      });
      return bookingsWithRides;
    } catch (error) {
      console.log('Cant fetch bookings: ', error);
      throw new InternalServerErrorException('Unknown error occurred');
    }
  }

  async cancelBooking(userId: number, bookingId: number) {
    try {
      const booking = await this.prisma.booking.findUnique({
        where: {
          id: bookingId,
        },
      });
      if (!booking) {
        throw new NotFoundException('Booking not found');
      } else if (booking.passengerId !== userId) {
        throw new BadRequestException('You do not have booking in the ride');
      } else if (booking.status === BookingStatus.CANCELLED) {
        throw new BadRequestException('Booking is already cancelled');
      }
      {
        await this.prisma.booking.update({
          where: {
            id: bookingId,
          },
          data: {
            status: BookingStatus.CANCELLED,
          },
        });
        return { message: 'Booking canceled' };
      }
    } catch (error) {
      console.log('Cant cancel booking: ', error);
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      } else {
        throw new InternalServerErrorException('Unknown error occurred');
      }
    }
  }
}
