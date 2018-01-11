
import * as log4js from 'log4js';
let logger = log4js.getLogger('api:connector:User');

import { MongooseApi } from 'oda-api-graphql';
import UserSchema from './schema';
import RegisterConnectors from '../../registerConnectors';
import * as Dataloader from 'dataloader';

import { PartialUser } from '../types/model';
import { UserConnector } from './interface';

export default class User extends MongooseApi<RegisterConnectors, PartialUser> implements UserConnector {
  constructor({mongoose, connectors, user, owner, acls, userGroup}) {
    logger.trace('constructor');
    super({mongoose, connectors, user, acls, userGroup, owner    });
    this.initSchema('User', UserSchema());

    this.loaderKeys = {
      byId: 'id',
      byUserName: 'userName',
    };

    this.updaters = {
      byId: this.updateLoaders('byId'),
      byUserName: this.updateLoaders('byUserName'),
    };

    const byId = async (keys) => {
      let result = await this._getList({ filter: { id: { in: keys } } });
      let map = result.reduce((_map, item) => {
        _map[item.id] = item;
        return _map;
      }, {});
      return keys.map(id => map[id]);
    };

    const byUserName = async (keys) => {
      let result = await this._getList({ filter: { userName: { in: keys } } });
      let map = result.reduce((_map, item) => {
        _map[item.userName] = item;
        return _map;
      }, {});
      return keys.map(id => map[id]);
    };

    this.loaders = {
      byId: new Dataloader(keys => byId(keys)
        .then(this.updaters.byId), {
          cacheKeyFn: key => typeof key !== 'object' ? key : key.toString(),
        }),
      byUserName: new Dataloader(keys => byUserName(keys)
        .then(this.updaters.byUserName)),
    };
  }

  public async create(payload: PartialUser) {
    logger.trace('create');
    let entity = this.getPayload(payload);
    let result = await  (new (this.model)(entity)).save();
    this.storeToCache([result]);
    return this.ensureId((result && result.toJSON) ? result.toJSON() : result);
  }

  public async findOneByIdAndUpdate(id: string, payload: any) {
    logger.trace(`findOneByIdAndUpdate`);
    let entity = this.getPayload(payload, true);
    let result = await this.loaders.byId.load(id);
    if(result){
      for (let f in entity) {
        if (entity.hasOwnProperty(f)) {
          result.set(f, entity[f]);
        }
      }
      result = await result.save();
      this.storeToCache([result]);
      return this.ensureId((result && result.toJSON) ? result.toJSON() : result);
    } else {
      return result;
    }
  }

  public async findOneByUserNameAndUpdate(userName: string, payload: any) {
    logger.trace(`findOneByUserNameAndUpdate`);
    let entity = this.getPayload(payload, true);
    let result = await this.loaders.byUserName.load(userName);
    if(result){
      for (let f in entity) {
        if (entity.hasOwnProperty(f)) {
          result.set(f, entity[f]);
        }
      }
      result = await result.save();
      this.storeToCache([result]);
      return this.ensureId((result && result.toJSON) ? result.toJSON() : result);
    } else {
      return result;
    }
  }



  public async findOneByIdAndRemove(id: string) {
    logger.trace(`findOneByIdAndRemove`);
    let result = await this.loaders.byId.load(id);
    if( result ){
      result = await result.remove();
      this.storeToCache([result]);
      return this.ensureId((result && result.toJSON) ? result.toJSON() : result);
    } else {
      return result;
    }
  }

  public async findOneByUserNameAndRemove(userName: string) {
    logger.trace(`findOneByUserNameAndRemove`);
    let result = await this.loaders.byUserName.load(userName);
    if( result ){
      result = await result.remove();
      this.storeToCache([result]);
      return this.ensureId((result && result.toJSON) ? result.toJSON() : result);
    } else {
      return result;
    }
  }


  public async findOneById(id?: string) {
    logger.trace(`findOneById with ${id} `);
    let result = await this.loaders.byId.load(id);
    return this.ensureId((result && result.toJSON) ? result.toJSON() : result);
  }

/*   public async _findOneById(id?: string) {
    logger.trace(`_findOneById with ${id} ${typeof id} `);
    let condition: any;
    if (
        id !== undefined
        && id !== ''    ) {
      condition = {id};
    }
    if (!condition) {
      logger.error('no unique key provided findOneById "User"');
      throw new Error('no unique key provided findOneById "User"');
    }
    let result = await this.model.findById(condition.id).exec();
    return result;
  } */

  public async findOneByUserName(userName?: string) {
    logger.trace(`findOneByUserName with ${userName} `);
    let result = await this.loaders.byUserName.load(userName);
    return this.ensureId((result && result.toJSON) ? result.toJSON() : result);
  }

/*   public async _findOneByUserName(userName?: string) {
    logger.trace(`_findOneByUserName with ${userName} ${typeof userName} `);
    let condition: any;
    if (
        userName !== undefined
        && userName !== ''    ) {
      condition = {userName};
    }
    if (!condition) {
      logger.error('no unique key provided findOneByUserName "User"');
      throw new Error('no unique key provided findOneByUserName "User"');
    }
    let result = await this.model.findOne(condition).exec();
    return result;
  } */

  public getPayload(args: PartialUser, update?: boolean) {
    let entity: any = {};
      if (args.id !== undefined) {
        entity.id = args.id;
      }
      if (args.userName !== undefined) {
        entity.userName = args.userName;
      }
      if (args.password !== undefined) {
        entity.password = args.password;
      }
      if (args.isAdmin !== undefined) {
        entity.isAdmin = args.isAdmin;
      }
      if (args.isSystem !== undefined) {
        entity.isSystem = args.isSystem;
      }
      if (args.enabled !== undefined) {
        entity.enabled = args.enabled;
      }
    if (update) {
      delete entity.id;
      delete entity._id;
    } else {
      if (entity.id) {
        entity._id = entity.id;
        delete entity.id;
      }
    }
    return entity;
  }
};
