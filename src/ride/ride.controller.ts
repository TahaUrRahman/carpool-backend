import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { RideService } from "./ride.service";
import { RideDto } from "./dto";
import { AuthGuard } from "@nestjs/passport";

@Controller('rides')
export class RideController{
    constructor(private rideService: RideService){}

    @Post('')
    createRide(@Body() ride: RideDto){
        console.log({ride,})
        return this.rideService.createRide(ride)
    }

    // @UseGuards(AuthGuard('jwt'))
    @Get('')
    getRides(){
        return this.rideService.getRides()
    }

}