import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Role, RolesRelations} from '../models';

export class RolesRepository extends DefaultCrudRepository<Role, typeof Role.prototype.id, RolesRelations> {
  constructor(@inject('datasources.mongodb') dataSource: MongodbDataSource) {
    super(Role, dataSource);
  }
}
