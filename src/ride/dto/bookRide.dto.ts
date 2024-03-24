import { Type } from 'class-transformer';
import { IsInt, IsNumber } from 'class-validator';

export class BookRideDto {
  @Type(() => Number)
  @IsInt({})

  rideId: number;
}
