import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Profile } from '../entities/Profile.entity';

@Injectable()
export class ProfileRepository extends Repository<Profile> {}
