import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LocationService {
    constructor(private prisma: PrismaService){}

    async getLocations(){
        try {
            const coordinates = await this.prisma.coordinates.findMany();
            return coordinates;
          } catch (error) {
            console.error('Error fetching coordinates:', error);
            throw new Error('Failed to fetch coordinates');
          }
    }
}
