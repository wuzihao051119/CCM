import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { AuthDto } from "src/dtos/auth.dto";

export interface AuthenticatedRequest extends Request {
  user: AuthDto;
}

export const Auth = createParamDecorator((data, context: ExecutionContext): AuthDto => {
  return context.switchToHttp().getRequest<AuthenticatedRequest>().user;
});
