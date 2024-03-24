import { Type } from 'class-transformer';
import { IsInt, IsNumber } from 'class-validator';

export class CancelBookingDto {
  @Type(() => Number)
  @IsInt({})

  bookingId: number;
}
