import { JwtPayload } from 'jwt-decode';
import React from 'react';
import { EKeyHeader, ERole } from './enum';

interface ITimestamps {
  createdAt?: Date;
  updatedAt?: Date;
  id: number;
}

export interface JwtPayloadUser extends JwtPayload {
  userId: number;
  email: string;
  role: ERole[];
}

export interface IResponse<T = any> {
  data: T | null;
  message: string;
}

export type KeyHeaderValue =
  | EKeyHeader.ACCESS_TOKEN
  | EKeyHeader.USER_ID
  | EKeyHeader.REFRESH_TOKEN
  | EKeyHeader.AUTH_TOKEN;

export interface IUser extends ITimestamps {
  name: string;
  email: string;
  isVerify?: boolean;
  avatar: string;
  role: ERole;
  isHaveOtp: boolean;
  isActive?: boolean;
}

export interface IPost<A = string> extends ITimestamps {
  title: string;
  content: string;
  background?: string;
  cmt_count?: number;
  authorId?: A;
  tags: string[];
}

export interface IConTextRouter {
  setIsOpenModalSignIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface PropsForm {
  name: string;
  children?: React.ReactNode[];
  style?: React.CSSProperties;
}

export interface ISignIn {
  email: string;
  password: string;
}

export interface IFormRes {
  email: string;
  first_name: string;
  last_name: string;
  major?: string;
  age?: number;
  content?: string;
  require?: { [K: string]: boolean };
  [K: string]: any;
}
