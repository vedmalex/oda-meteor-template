
import * as log4js from 'log4js';
let logger = log4js.getLogger('api:connector:Phone');

import { MongooseApi } from 'oda-api-graphql';
import PhoneSchema from './schema';
import RegisterConnectors from '../../registerConnectors';
import * as Dataloader from 'dataloader';

import { PartialPhone } from '../types/model';
import { PhoneConnector } from './interface';

export default class Phone extends MongooseApi<RegisterConnectors, PartialPhone> implements PhoneConnector {
  constructor({mongoose, connectors, user, owner, acls, userGroup}) {
    logger.trace('constructor');
    super({mongoose, connectors, user, acls, userGroup, owner    });
    this.initSchema('Phone', PhoneSchema());

    this.loaderKeys = {
      byId: 'id',
      byPhoneNumber: 'phoneNumber',
    };

    this.updaters = {
      byId: this.updateLoaders('byId'),
      byPhoneNumber: this.updateLoaders('byPhoneNumber'),
    };

    const byId = async (keys) => {
      let result = await this._getList({ filter: { id: { in: keys } } });
      let map = result.reduce((_map, item) => {
        _map[item.id] = item;
        return _map;
      }, {});
      return keys.map(id => map[id]);
    };

    const byPhoneNumber = async (keys) => {
      let result = await this._getList({ filter: { phoneNumber: { in: keys } } });
      let map = result.reduce((_map, item) => {
        _map[item.phoneNumber] = item;
        return _map;
      }, {});
      return keys.map(id => map[id]);
    };

    this.loaders = {
      byId: new Dataloader(keys => byId(keys)
        .then(this.updaters.byId), {
          cacheKeyFn: key => typeof key !== 'object' ? key : key.toString(),
        }),
      byPhoneNumber: new Dataloader(keys => byPhoneNumber(keys)
        .then(this.updaters.byPhoneNumber)),
    };
  }

  public async create(payload: PartialPhone) {
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

  public async findOneByPhoneNumberAndUpdate(phoneNumber: string, payload: any) {
    logger.trace(`findOneByPhoneNumberAndUpdate`);
    let entity = this.getPayload(payload, true);
    let result = await this.loaders.byPhoneNumber.load(phoneNumber);
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

  public async findOneByPhoneNumberAndRemove(phoneNumber: string) {
    logger.trace(`findOneByPhoneNumberAndRemove`);
    let result = await this.loaders.byPhoneNumber.load(phoneNumber);
    if( result ){
      result = await result.remove();
      this.storeToCache([result]);
      return this.ensureId((result && result.toJSON) ? result.toJSON() : result);
    } else {
      return result;
    }
  }


  public async addToType(args: {
      phone?: string,
      phoneType?: string,
  }) {
    logger.trace(`addToType`);
    let opposite = await this.connectors.PhoneType.findOneById(args.phoneType );
    if (opposite) {
      await this.findOneByIdAndUpdate(args.phone,
      { type: opposite.name });
    }
  }

  public async removeFromType(args: {
      phone?: string,
      phoneType?: string,
  }) {
    logger.trace(`removeFromType`);
    await this.findOneByIdAndUpdate(args.phone, { type: null });
  }

  public async addToPerson(args: {
      phone?: string,
      person?: string,
  }) {
    logger.trace(`addToPerson`);
    let opposite = await this.connectors.Person.findOneById(args.person );
    if (opposite) {
      await this.findOneByIdAndUpdate(args.phone,
      { person: opposite.id });
    }
  }

  public async removeFromPerson(args: {
      phone?: string,
      person?: string,
  }) {
    logger.trace(`removeFromPerson`);
    await this.findOneByIdAndUpdate(args.phone, { person: null });
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
      logger.error('no unique key provided findOneById "Phone"');
      throw new Error('no unique key provided findOneById "Phone"');
    }
    let result = await this.model.findById(condition.id).exec();
    return result;
  } */

  public async findOneByPhoneNumber(phoneNumber?: string) {
    logger.trace(`findOneByPhoneNumber with ${phoneNumber} `);
    let result = await this.loaders.byPhoneNumber.load(phoneNumber);
    return this.ensureId((result && result.toJSON) ? result.toJSON() : result);
  }

/*   public async _findOneByPhoneNumber(phoneNumber?: string) {
    logger.trace(`_findOneByPhoneNumber with ${phoneNumber} ${typeof phoneNumber} `);
    let condition: any;
    if (
        phoneNumber !== undefined
        && phoneNumber !== ''    ) {
      condition = {phoneNumber};
    }
    if (!condition) {
      logger.error('no unique key provided findOneByPhoneNumber "Phone"');
      throw new Error('no unique key provided findOneByPhoneNumber "Phone"');
    }
    let result = await this.model.findOne(condition).exec();
    return result;
  } */

  public getPayload(args: PartialPhone, update?: boolean) {
    let entity: any = {};
      if (args.id !== undefined) {
        entity.id = args.id;
      }
      if (args.phoneNumber !== undefined) {
        entity.phoneNumber = args.phoneNumber;
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
