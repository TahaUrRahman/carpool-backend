import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RideDto } from './dto';

@Injectable()
export class RideService {
    constructor(private prisma: PrismaService){}

    getRides(){
        return {"ride": "someride"}
    }
    async createRide(dto: RideDto){
        return (dto)
        
    }
}
