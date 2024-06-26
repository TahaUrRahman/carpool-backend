import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto, SignUpDto } from "./dto";

@Controller('auth')
export class AuthController{
    constructor(private authService: AuthService){}

    @Post('signup')
    signup(@Body() dto: SignUpDto){
        return this.authService.signUp(dto)
    }

    @Post('login')
    signin(@Body() dto: LoginDto){
        return this.authService.login(dto)
    }
}