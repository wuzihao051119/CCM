import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthDto } from 'src/dtos/auth.dto';
import { mapUser, UserResponseDto } from 'src/dtos/user.dto';
import { UserRepository } from 'src/repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async get(auth: AuthDto, id: string): Promise<UserResponseDto> {
    const user = await this.findOrFail(id);
    return mapUser(user);
  }

  async getMe(auth: AuthDto): Promise<UserResponseDto> {
    const user = await this.findOrFail(auth.user.id);
    return mapUser(user);
  }

  private async findOrFail(id: string) {
    const user = await this.userRepository.get(id);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return user;
  }
}
