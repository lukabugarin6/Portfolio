import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserParams, UpdateUserParams } from './utils/types';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async create(userDetails: CreateUserParams): Promise<User> {
    const newUser = this.userRepository.create({
      username: userDetails.username,
      password: userDetails.password,
      createdAt: new Date(),
    });

    return await this.userRepository.save(newUser);
  }

  async updateUser(
    id: number,
    updateUserDetails: UpdateUserParams,
  ): Promise<User | undefined> {
    const existingUser = await this.userRepository.findOne({ where: { id } });

    if (!existingUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    await this.userRepository.update(id, updateUserDetails);

    return await this.userRepository.findOne({ where: { id } });
  }

  async deleteUser(id: number): Promise<number> {
    const existingUser = await this.userRepository.findOne({ where: { id } });

    if (!existingUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    await this.userRepository.delete(id);

    return id;
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { username } });
  }
}
