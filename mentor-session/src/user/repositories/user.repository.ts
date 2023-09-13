import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { User } from '../entities/User.entity';

@Injectable()
export class UserRepository extends Repository<User> {}
