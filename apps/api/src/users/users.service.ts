import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity, UserRepository } from '@qvik/db';

@Injectable()
export class UsersService {
  constructor(private userRepo: UserRepository) {}

  /**
   * Find all users
   *
   * @returns {Promise<UserEntity[]>} Array of UserEntity
   */
  async findAll(): Promise<UserEntity[]> {
    return this.userRepo.findAll();
  }

  /**
   * Find a user by ID
   *
   * @param {string} id Unique ID of the user
   * @returns {Promise<UserEntity>} UserEntity
   * @throws {NotFoundException}
   */
  async findOne(id: string): Promise<UserEntity> {
    const user = await this.userRepo.findOne(id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  /**
   * Find a user by email
   *
   * @param {string} email Email of the user
   * @returns {Promise<UserEntity>} UserEntity
   * @throws {NotFoundException}
   */
  async findOneByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepo.findOne({ email });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }
}
