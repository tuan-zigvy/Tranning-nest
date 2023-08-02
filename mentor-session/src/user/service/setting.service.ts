import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RedisServiceCaching } from '@redis/redis.service';
import * as dayjs from 'dayjs';
import BaseService from '@/base.service';
import { Setting } from '../entities/setting.entity';
import { SettingRepository } from '../repositories/setting.repository';
import { User } from '../entities/user.entity';
import { UpdateAvailabilityDto, UpdateFormBookingDto } from '../dto/setting.dto';

// 86400

@Injectable()
export class SettingService extends BaseService<Setting> {
  constructor(
    @InjectRepository(Setting) private readonly settingRepository: SettingRepository,
    private readonly redisServer: RedisServiceCaching,
  ) {
    super(settingRepository);
  }

  override store(id: number) {
    const newSetting: Setting = new Setting();
    newSetting.ownerId = id;

    return this.settingRepository.save(newSetting);
  }

  async getSetting(user: User) {
    const setting = await this.settingRepository.findOne({
      where: {
        ownerId: user.id,
      },
    });

    if (!setting) {
      return this.store(user.id);
    }

    return setting;
  }

  async updateAvailability(availability: UpdateAvailabilityDto, ownerId: number) {
    const settingDb = await this.settingRepository.findOne({ where: { ownerId } });

    if (!settingDb) throw new NotFoundException('Not found setting');

    const durationWorkPerDay =
      (availability.duration_work_per_day[1] - availability.duration_work_per_day[0]) /
      availability.duration_session;

    settingDb.availability.number_session_per_day = Math.round(durationWorkPerDay);

    settingDb.availability = {
      ...settingDb.availability,
      ...availability,
    };

    await settingDb.save();

    return 'Update availability successful';
  }

  async updateFormBooking(newForm: UpdateFormBookingDto, ownerId: number) {
    const settingDb = await this.settingRepository.findOne({ where: { ownerId } });

    if (!settingDb) throw new NotFoundException('Not found setting');

    settingDb.booking_form = { ...settingDb.booking_form, ...newForm };

    await settingDb.save();
    return 'Update from booking successful';
  }

  findByUrl(name_url: string) {
    return this.settingRepository.findOne({ where: { name_url } });
  }

  async updateUrl(ownerId: number, url: string): Promise<string> {
    const settingDb = await this.settingRepository.findOne({ where: { ownerId } });

    settingDb.availability.isActive = true;

    settingDb.name_url = url;

    await settingDb.save();

    return 'Update from booking url';
  }

  async createBooking(date: Date, url: string) {
    const dateNumber = dayjs(date).unix();
    const isBooking = await this.redisServer.checkValueSadd(
      `booking-list::${url}`,
      dateNumber,
    );
    if (isBooking) throw new ConflictException('This time was booked');

    await this.redisServer.sadd(`booking-list::${url}`, [dateNumber]);

    return 'Create booking success';
  }
}
