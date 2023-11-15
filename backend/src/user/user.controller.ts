import {
  Controller,
  Get,
  Put,
  Param,
  Body,
  ParseIntPipe,
  Delete,
  UseGuards
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { UpdateUserDto } from './dtos/UpdateUser.dto';
import { AtGuard } from 'src/auth/common/guards';
import { Public } from 'src/auth/common/decorators';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  async getAll(): Promise<User[]> {
    return this.userService.getAll();
  }

  @Put(':id')
  async updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  async deleteUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUser(id);
  }
}
