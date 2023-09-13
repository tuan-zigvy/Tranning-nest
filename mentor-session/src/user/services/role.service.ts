import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import BaseService from '@/base.service';
import { Role } from '../entities/Role.entity';
import { RoleRepository } from '../repositories/role.repository';

@Injectable()
export class RoleService extends BaseService<Role> {
  constructor(@InjectRepository(Role) private readonly roleRepository: RoleRepository) {
    super(roleRepository);
  }
}
