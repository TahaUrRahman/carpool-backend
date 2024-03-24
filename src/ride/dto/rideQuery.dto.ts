import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsNumberString } from 'class-validator';

export class RideQueryDto {
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  riderLatitude: number

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  riderLongitude: number

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  destinationLatitude: number

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  destinationLongitude: number
}
