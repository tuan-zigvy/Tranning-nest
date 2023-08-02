import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Setting } from '../entities/setting.entity';

@Injectable()
export class SettingRepository extends Repository<Setting> {}
