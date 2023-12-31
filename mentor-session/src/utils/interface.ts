import { DeleteResult } from 'typeorm';
import { EntityId } from 'typeorm/repository/EntityId';
import { JwtPayload } from 'jsonwebtoken';
import { Request, Response } from 'express';

import { ERegistrationType, ERole } from './enum';
import { InfoSchema, PrivateInfoSchema } from '@/user/dto/profile.dto';

export interface IBaseService<T> {
  index: () => Promise<T[]>;

  findById: (id: EntityId) => Promise<T | null>;

  findByIds: (id: EntityId[]) => Promise<T[]>;

  store: (data: T) => Promise<T>;

  update: (id: EntityId, data: any) => Promise<T | null>;

  delete: (id: EntityId) => Promise<DeleteResult>;
}

export interface IAvailability {
  duration_session: number; // số chẳn
  available_time: boolean[];
  duration_work_per_day: number[];
  number_session_per_day: number;
  absent_date: Date[];
  isActive: boolean;
  [K: string]: any;
}
export interface IMetaDataSetting {
  info?: InfoSchema;
  private_info?: PrivateInfoSchema;
  [K: string]: any;
}
export interface IForm {
  email: string;
  first_name: string;
  last_name: string;
  major?: string;
  age?: number;
  content?: string;
  [K: string]: string | number | (string | number)[] | boolean;
}

export interface IMetaDataProfile {
  [K: string]: any;
}

export interface IPayloadToken extends JwtPayload {
  email: string;
  userId: number;
  roles: ERole[];
}

export interface IHttpMessages {
  req: Request;
  res: Response;
}

export interface ICustomGraphQLError {
  message: string;
  extensions?: {
    exception?: {
      response?: string;
    };
  };
}

export interface IThirdPartyUser {
  email: string;
  firstName: string;
  lastName: string;
  picture: string;
  accessToken: string;
  gender: string;
  registrationType: ERegistrationType;
}

export type IGoogleUser = IThirdPartyUser;

export interface IFacebookUser extends IThirdPartyUser {
  gender: string;
  birthday: string;
}
