import { Controller, Delete, Param, Patch, Put, Req, UseGuards } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CancelBookingDto } from './dto/cancelBooking.dto';
import { JwtGuard } from 'src/auth/guard';

@Controller('booking')
export class BookingController {
    constructor(private bookingService: BookingService){}

    
    @UseGuards(JwtGuard)
    @Patch(':bookingId/cancel')
    cancelBooking(@Req() req, @Param() cancelBookingDto: CancelBookingDto) {
      const userId = req.user.id;
      return this.bookingService.cancelBooking(userId, cancelBookingDto.bookingId);
    }


}
