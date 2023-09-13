import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { getFilterData } from '@utils/otherUtil';

import BaseService from '@/base.service';
import { Profile } from '../entities/Profile.entity';
import { ProfileRepository } from '../repositories/profile.repository';
import { User } from '../entities/User.entity';
import { UpdateInfoDto, UpdatePrivateInfoDto } from '../dto/profile.dto';

@Injectable()
export class ProfileService extends BaseService<Profile> {
  constructor(
    @InjectRepository(Profile) private readonly profileRepository: ProfileRepository,
  ) {
    super(profileRepository);
  }

  async getProfile(user: User) {
    const profile = await this.profileRepository.findOne({
      where: {
        ownerId: user.id,
      },
    });

    return profile;
  }

  override store(data: Profile) {
    return this.profileRepository.save(data);
  }

  async updatePrivateInfo(newUpdate: UpdatePrivateInfoDto, ownerId: number) {
    const profileDb = await this.profileRepository.findOne({ where: { ownerId } });

    profileDb.meta_data.private_info = newUpdate;

    await profileDb.save();

    return 'update private info success';
  }

  async updateInfo(newUpdate: UpdateInfoDto, ownerId: number) {
    const profileDb = await this.profileRepository.findOne({ where: { ownerId } });

    profileDb.meta_data.info = newUpdate;

    await profileDb.save();

    return 'Update info success';
  }

  async getDataForPageMentor(ownerId: number) {
    const profileDb = await this.profileRepository.findOne({ where: { ownerId } });

    profileDb.meta_data = getFilterData(['info'], profileDb.meta_data);
    return profileDb;
  }
}
