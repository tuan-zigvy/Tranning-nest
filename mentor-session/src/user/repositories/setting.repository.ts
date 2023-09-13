import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Setting } from '../entities/Setting.entity';

@Injectable()
export class SettingRepository extends Repository<Setting> {}
