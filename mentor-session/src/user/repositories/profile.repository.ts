import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Profile } from '../entities/profile.entity';

@Injectable()
export class ProfileRepository extends Repository<Profile> {}
