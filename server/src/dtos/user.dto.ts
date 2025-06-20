import { User } from 'src/database';

export class UserResponseDto {
  id!: string;
  name!: string;
  email!: string;
}

export const mapUser = (entity: User): UserResponseDto => {
  return {
    id: entity.id,
    name: entity.name,
    email: entity.email,
  };
};
