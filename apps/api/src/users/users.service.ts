import { Injectable } from '@nestjs/common';
import { UserEntity, UserRepository } from '@qvik/db';

@Injectable()
export class UsersService {
  constructor(private userRepo: UserRepository) {}

  async findAll(): Promise<UserEntity[]> {
    return this.userRepo.findAll();
  }
}
