import { AuthGuard } from "@nestjs/passport";

export class JwtGuard extends AuthGuard('custom-strategy'){
    constructor(){
        super()
    }
}