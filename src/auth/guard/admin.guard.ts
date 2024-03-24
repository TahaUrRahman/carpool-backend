import { ExecutionContext, Injectable } from "@nestjs/common";
import { JwtGuard } from "./jwt.guard";
import { Observable } from "rxjs";
import { UserRole } from "@prisma/client";

@Injectable()
export class AdminGuard extends JwtGuard {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user && user.role === UserRole.ADMIN) {
      return super.canActivate(context);
    }
    return false;
  }
}
