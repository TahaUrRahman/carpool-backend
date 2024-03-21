import { IsNotEmpty, IsString } from "class-validator"

export class RideDto{
    @IsString()
    @IsNotEmpty()
    source: string
    @IsString()
    @IsNotEmpty()
    destination: string
}