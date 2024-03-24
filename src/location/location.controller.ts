import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { LocationService } from './location.service';
import { JwtGuard } from 'src/auth/guard';


@UseGuards(JwtGuard)
@Controller('locations')
export class LocationController {
    constructor(private locationService: LocationService){}
    @Get('')
    getLocations(@Req() req: any){
        return this.locationService.getLocations()
    }


}
