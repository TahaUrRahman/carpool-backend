import { IsISO8601, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CoordinatesDto {
    @IsNumber()
    @IsNotEmpty()
    latitude: number;
  
    @IsNumber()
    @IsNotEmpty()
    longitude: number;
  }
export class RideDto{
    @IsNotEmpty()
    source: CoordinatesDto;
  
    @IsNotEmpty()
    destination: CoordinatesDto;

    @IsISO8601() 
    @IsNotEmpty()
    dateTime: string;
}