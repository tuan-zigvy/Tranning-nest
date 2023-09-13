/* eslint-disable max-classes-per-file */
import { FindOptionsWhere, In, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { IBaseService } from './types/base.interface';
import { BaseEntityExtend } from './types/entity.interface';

export default class BaseService<T extends BaseEntityExtend> implements IBaseService<T> {
  constructor(private readonly baseRepository: Repository<T>) {}

  index() {
    return this.baseRepository.find();
  }

  findById(id: T['id']): Promise<T | null> {
    return this.baseRepository.findOneBy({ id } as FindOptionsWhere<T>);
  }

  findByIds = (ids: T['id'][]): Promise<T[]> =>
    this.baseRepository.findBy({ id: In(ids) } as FindOptionsWhere<T>);

  store(data) {
    return this.baseRepository.save(data);
  }

  async update(id: T['id'], data: QueryDeepPartialEntity<T>): Promise<T | null> {
    await this.baseRepository.update(id as number, data);
    return this.findById(id);
  }

  delete(id: T['id']) {
    return this.baseRepository.delete(id as number);
  }
}
