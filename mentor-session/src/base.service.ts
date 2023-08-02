import { BaseEntity, Repository } from 'typeorm';
import { EntityId } from 'typeorm/repository/EntityId';
import { IBaseService } from './utils/interface';

export default class BaseService<T extends BaseEntity> implements IBaseService<T> {
  constructor(private readonly BaseRepository: Repository<T>) {}

  index() {
    return this.BaseRepository.find();
  }

  findById(id: EntityId) {
    return this.BaseRepository.findOneById(id);
  }

  findByIds = (ids: EntityId[]) => this.BaseRepository.findByIds(ids);

  store(data: any) {
    return this.BaseRepository.save(data);
  }

  async update(id: EntityId, data: any) {
    await this.BaseRepository.update(id, data);
    return this.findById(id);
  }

  delete(id: EntityId) {
    return this.BaseRepository.delete(id);
  }
}
