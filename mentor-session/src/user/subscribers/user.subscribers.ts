import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import * as argon from 'argon2';
import { ERegistrationType } from '@utils/enum';
import { IAvailability, IForm } from '@utils/interface';
import { User } from '../entities/user.entity';
import { Profile } from '../entities/profile.entity';
import { Setting } from '../entities/setting.entity';

const availabilityDefault: IAvailability = {
  duration_session: 2700,
  available_time: [false, true, true, true, true, true, false],
  duration_work_per_day: [28800, 61200],
  number_session_per_day: 12,
  absent_date: [],
  isActive: false,
};

const bookingFormDefault: IForm = {
  email: '',
  last_name: '',
  first_name: '',
};
@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  /**
   * Indicates that this subscriber only listen to Post events.
   */
  listenTo() {
    return User;
  }

  async beforeInsert(event: InsertEvent<User>) {
    if (event.entity.registrationType.includes(ERegistrationType.PASSWORD)) {
      event.entity.password = await argon.hash(event.entity.password);
    }
  }

  async beforeUpdate(event: UpdateEvent<User>) {
    if (event.entity?.password && event.entity?.password < 21) {
      event.entity.password = await argon.hash(event.entity.password);

      if (!event.entity.registrationType.includes(ERegistrationType.PASSWORD)) {
        event.entity.registrationType = [
          ...event.entity.registrationType,
          ERegistrationType.PASSWORD,
        ];
      }
    }
  }

  async afterInsert(event: InsertEvent<User>) {
    const { entity } = event;
    if (!entity.profile) {
      const profile = new Profile();
      profile.ownerId = entity.id;

      await event.manager.save(Profile, profile);
      entity.profile = profile;

      await event.manager.save(User, entity);
    }

    if (!entity.setting) {
      const setting = new Setting();
      setting.availability = { ...availabilityDefault };
      setting.booking_form = { ...bookingFormDefault };
      setting.ownerId = entity.id;

      await event.manager.save(Setting, setting);

      entity.setting = setting;
      await event.manager.save(User, entity);
    }
  }
}
