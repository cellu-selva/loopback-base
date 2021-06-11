import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

//TODO move configs to .env

const config = {
  name: 'mongodb',
  connector: 'mongodb',
  url: 'mongodb://fdesadmin:1gD94NNmQ8wiuZ1q@133.125.57.236:27017/fdesdev?authSource=admin',
  host: '133.125.57.236',
  port: 27017,
  user: 'fdesadmin',
  password: '1gD94NNmQ8wiuZ1q',
  database: 'fdesdev',
  useNewUrlParser: true,
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class MongodbDataSource extends juggler.DataSource implements LifeCycleObserver {
  static dataSourceName = 'mongodb';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.mongodb', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
