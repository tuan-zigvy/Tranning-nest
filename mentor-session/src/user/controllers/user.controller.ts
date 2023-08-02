import { Body, Controller, Get, Headers, Put, UseGuards } from '@nestjs/common';
import { EntityId } from 'typeorm/repository/EntityId';
import { JwtAuthGuard } from '@guard/access_token.guard';
import { EKeyHeader } from '@utils/enum';
import { UserService } from '../service/user.service';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/me')
  getMe(@Headers(EKeyHeader.USER_ID) id: EntityId) {
    return this.userService.findById(id);
  }

  @Put('/')
  updateUser(@Body() updateUser: any, @Headers(EKeyHeader.USER_ID) id: EntityId) {
    return this.userService.update(id, updateUser);
  }
}
