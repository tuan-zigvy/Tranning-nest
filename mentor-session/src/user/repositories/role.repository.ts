import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Role } from '../entities/Role.entity';

@Injectable()
export class RoleRepository extends Repository<Role> {}
