
import * as log4js from 'log4js';
let logger = log4js.getLogger('api:connector:SocialNetwork');

import { MongooseApi } from 'oda-api-graphql';
import SocialNetworkSchema from './schema';
import RegisterConnectors from '../../registerConnectors';
import * as Dataloader from 'dataloader';

import { PartialSocialNetwork } from '../types/model';
import { SocialNetworkConnector } from './interface';

export default class SocialNetwork extends MongooseApi<RegisterConnectors, PartialSocialNetwork> implements SocialNetworkConnector {
  constructor({mongoose, connectors, user, owner, acls, userGroup}) {
    logger.trace('constructor');
    super({mongoose, connectors, user, acls, userGroup, owner    });
    this.initSchema('SocialNetwork', SocialNetworkSchema());

    this.loaderKeys = {
      byId: 'id',
      byAccount: 'account',
    };

    this.updaters = {
      byId: this.updateLoaders('byId'),
      byAccount: this.updateLoaders('byAccount'),
    };

    const byId = async (keys) => {
      let result = await this._getList({ filter: { id: { in: keys } } });
      let map = result.reduce((_map, item) => {
        _map[item.id] = item;
        return _map;
      }, {});
      return keys.map(id => map[id]);
    };

    const byAccount = async (keys) => {
      let result = await this._getList({ filter: { account: { in: keys } } });
      let map = result.reduce((_map, item) => {
        _map[item.account] = item;
        return _map;
      }, {});
      return keys.map(id => map[id]);
    };

    this.loaders = {
      byId: new Dataloader(keys => byId(keys)
        .then(this.updaters.byId), {
          cacheKeyFn: key => typeof key !== 'object' ? key : key.toString(),
        }),
      byAccount: new Dataloader(keys => byAccount(keys)
        .then(this.updaters.byAccount)),
    };
  }

  public async create(payload: PartialSocialNetwork) {
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

  public async findOneByAccountAndUpdate(account: string, payload: any) {
    logger.trace(`findOneByAccountAndUpdate`);
    let entity = this.getPayload(payload, true);
    let result = await this.loaders.byAccount.load(account);
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

  public async findOneByAccountAndRemove(account: string) {
    logger.trace(`findOneByAccountAndRemove`);
    let result = await this.loaders.byAccount.load(account);
    if( result ){
      result = await result.remove();
      this.storeToCache([result]);
      return this.ensureId((result && result.toJSON) ? result.toJSON() : result);
    } else {
      return result;
    }
  }


  public async addToType(args: {
      socialNetwork?: string,
      socialNetworkType?: string,
  }) {
    logger.trace(`addToType`);
    let opposite = await this.connectors.SocialNetworkType.findOneById(args.socialNetworkType );
    if (opposite) {
      await this.findOneByIdAndUpdate(args.socialNetwork,
      { type: opposite.name });
    }
  }

  public async removeFromType(args: {
      socialNetwork?: string,
      socialNetworkType?: string,
  }) {
    logger.trace(`removeFromType`);
    await this.findOneByIdAndUpdate(args.socialNetwork, { type: null });
  }

  public async addToPerson(args: {
      socialNetwork?: string,
      person?: string,
  }) {
    logger.trace(`addToPerson`);
    let opposite = await this.connectors.Person.findOneById(args.person );
    if (opposite) {
      await this.findOneByIdAndUpdate(args.socialNetwork,
      { person: opposite.id });
    }
  }

  public async removeFromPerson(args: {
      socialNetwork?: string,
      person?: string,
  }) {
    logger.trace(`removeFromPerson`);
    await this.findOneByIdAndUpdate(args.socialNetwork, { person: null });
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
      logger.error('no unique key provided findOneById "SocialNetwork"');
      throw new Error('no unique key provided findOneById "SocialNetwork"');
    }
    let result = await this.model.findById(condition.id).exec();
    return result;
  } */

  public async findOneByAccount(account?: string) {
    logger.trace(`findOneByAccount with ${account} `);
    let result = await this.loaders.byAccount.load(account);
    return this.ensureId((result && result.toJSON) ? result.toJSON() : result);
  }

/*   public async _findOneByAccount(account?: string) {
    logger.trace(`_findOneByAccount with ${account} ${typeof account} `);
    let condition: any;
    if (
        account !== undefined
        && account !== ''    ) {
      condition = {account};
    }
    if (!condition) {
      logger.error('no unique key provided findOneByAccount "SocialNetwork"');
      throw new Error('no unique key provided findOneByAccount "SocialNetwork"');
    }
    let result = await this.model.findOne(condition).exec();
    return result;
  } */

  public getPayload(args: PartialSocialNetwork, update?: boolean) {
    let entity: any = {};
      if (args.id !== undefined) {
        entity.id = args.id;
      }
      if (args.account !== undefined) {
        entity.account = args.account;
      }
      if (args.url !== undefined) {
        entity.url = args.url;
      }
      if (args.type !== undefined) {
        entity.type = args.type;
      }
      if (args.person !== undefined) {
        entity.person = args.person;
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
