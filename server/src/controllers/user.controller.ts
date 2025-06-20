import { Controller, Get, Param } from "@nestjs/common";
import { AuthDto } from "src/dtos/auth.dto";
import { UserResponseDto } from "src/dtos/user.dto";
import { Auth } from "src/middleware/auth.guard";
import { UserService } from "src/services/user.service";
import { UUIDParamDto } from "src/validation";

@Controller('users')
export class UserController {
  constructor(private service: UserService) {};

  @Get('me')
  async getMe(@Auth() auth: AuthDto) {
    return this.service.getMe(auth);
  }

  @Get(':id')
  getUser(@Auth() auth: AuthDto, @Param() { id }: UUIDParamDto): Promise<UserResponseDto> {
    return this.service.get(auth, id);
  }
}
