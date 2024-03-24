import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RideDto } from './dto';
import { User } from '@prisma/client';
import { RideQueryDto } from './dto/rideQuery.dto';

@Injectable()
export class RideService {
  constructor(private prisma: PrismaService) {}


  async bookRide(userId: number, rideId: number) {
    try {
      const ride = await this.prisma.ride.findUnique({
        where: {
          id: rideId,
        },
      });
      if (!ride) {
        throw new NotFoundException('Ride not found');
      } else if (ride.driverId === userId) {
        throw new BadRequestException('You cannot book your own ride');
      } else {
        const existingBooking = await this.prisma.booking.findFirst({
          where: {
            rideId: ride.id,
            passengerId: userId,
          },
        });

        if (existingBooking) {
          throw new BadRequestException('You already have a booking in this ride');
        }
        await this.prisma.booking.create({
          data: {
            ride: { connect: { id: ride.id } },
            passenger: { connect: { id: userId } },
          },
        })
        return { message: 'Ride booked successfully' }; 

      }
    } catch (error) {
      console.log('Cant book ride: ', error);
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

  async getAllRides() {
    try {
      return await this.prisma.ride.findMany();
    } catch (error) {
      console.log('Cant fetch rides: ', error);
      throw new InternalServerErrorException('Unknown error occurred');
    }
  }
  async getUserRides(userid: number) {
    try {
      return await this.prisma.ride.findMany({
        where: {
          driverId: userid,
        },
      });
    } catch (error) {
      console.log('Cant fetch user rides: ', error);
      throw new InternalServerErrorException('Unknown error occurred');
    }
  }

  async searchAvailableRides(query: RideQueryDto) {
    try {
      const boundingBox = this.calculateBoundingBox(query);
      const availableRides = await this.prisma.ride.findMany({
        where: {
          AND: [
            {
              sourceLatitude: {
                gte: boundingBox.riderMinLatitude,
                lte: boundingBox.riderMaxLatitude,
              },
            },
            {
              sourceLongitude: {
                gte: boundingBox.riderMinLongitude,
                lte: boundingBox.riderMaxLongitude,
              },
            },
            {
              destinationLatitude: {
                gte: boundingBox.destinationMinLatitude,
                lte: boundingBox.destinationMaxLatitude,
              },
            },
            {
              destinationLongitude: {
                gte: boundingBox.destinationMinLongitude,
                lte: boundingBox.destinationMaxLongitude,
              },
            },
          ],
        },
      });
      return availableRides;
    } catch (error) {
      console.log('Cant fetch available rides: ', error);
      throw new InternalServerErrorException('Unknown error occurred');
    }
  }

  private calculateBoundingBox(query: RideQueryDto) {
    const radius = 20;

    const riderMinLatitude = query.riderLatitude - radius;
    const riderMaxLatitude = query.riderLatitude + radius;
    const riderMinLongitude = query.riderLongitude - radius;
    const riderMaxLongitude = query.riderLongitude + radius;

    const destinationMinLatitude = query.destinationLatitude - radius;
    const destinationMaxLatitude = query.destinationLatitude + radius;
    const destinationMinLongitude = query.destinationLongitude - radius;
    const destinationMaxLongitude = query.destinationLongitude + radius;

    return {
      riderMinLatitude,
      riderMaxLatitude,
      riderMinLongitude,
      riderMaxLongitude,
      destinationMinLatitude,
      destinationMaxLatitude,
      destinationMinLongitude,
      destinationMaxLongitude,
    };
  }

  async createRide(dto: RideDto, user: User) {
    try {
      const { source, destination, dateTime } = dto;

      const ride = await this.prisma.ride.create({
        data: {
          sourceLatitude: source.latitude,
          sourceLongitude: source.longitude,
          destinationLatitude: destination.latitude,
          destinationLongitude: destination.longitude,
          dateTime: new Date(dateTime),
          driver: { connect: { id: user.id } },
        },
      });

      return ride;
    } catch (error) {
      console.log('Cant create Ride: ', error);
      throw new InternalServerErrorException('Unknown error occurred');
    }
  }
}
