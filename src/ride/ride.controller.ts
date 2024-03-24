import { Body, Controller, Delete, Get, Param, Post, Query, Req, UseGuards } from "@nestjs/common";
import { RideService } from "./ride.service";
import { RideDto } from "./dto";
import { JwtGuard } from "src/auth/guard";
import { RideQueryDto } from "./dto/rideQuery.dto";
import { UserRole } from "@prisma/client";
import { BookRideDto } from "./dto/bookRide.dto";

@Controller('rides')
export class RideController{
    constructor(private rideService: RideService){}
    
    @UseGuards(JwtGuard)
    @Post('')
    createRide(@Body() ride: RideDto, @Req() req: any){
        return this.rideService.createRide(ride, req.user)
    }

    @UseGuards(JwtGuard)
    @Get('search')
    searchAvailableRides(@Query() query: RideQueryDto){
        return this.rideService.searchAvailableRides(query)
    }

    @UseGuards(JwtGuard)
    @Get('')
    getRides(@Req() req: any){
        if (req.user.role == UserRole.ADMIN){
            return this.rideService.getAllRides()
        }else{
            return this.rideService.getUserRides(req.user.id)
        }
    }

    @UseGuards(JwtGuard)
    @Post(':rideId/book')
    bookRide(@Req() req, @Param() bookRideDto: BookRideDto) {
      const userId = req.user.id;
      return this.rideService.bookRide(userId, bookRideDto.rideId);
    }

}