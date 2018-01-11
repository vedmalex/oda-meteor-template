
import * as log4js from 'log4js';
let logger = log4js.getLogger('api:connector:Group');

import { MongooseApi } from 'oda-api-graphql';
import GroupSchema from './schema';
import RegisterConnectors from '../../registerConnectors';
import * as Dataloader from 'dataloader';

import { PartialGroup } from '../types/model';
import { GroupConnector } from './interface';

export default class Group extends MongooseApi<RegisterConnectors, PartialGroup> implements GroupConnector {
  constructor({mongoose, connectors, user, owner, acls, userGroup}) {
    logger.trace('constructor');
    super({mongoose, connectors, user, acls, userGroup, owner    });
    this.initSchema('Group', GroupSchema());

    this.loaderKeys = {
      byId: 'id',
      byName: 'name',
    };

    this.updaters = {
      byId: this.updateLoaders('byId'),
      byName: this.updateLoaders('byName'),
    };

    const byId = async (keys) => {
      let result = await this._getList({ filter: { id: { in: keys } } });
      let map = result.reduce((_map, item) => {
        _map[item.id] = item;
        return _map;
      }, {});
      return keys.map(id => map[id]);
    };

    const byName = async (keys) => {
      let result = await this._getList({ filter: { name: { in: keys } } });
      let map = result.reduce((_map, item) => {
        _map[item.name] = item;
        return _map;
      }, {});
      return keys.map(id => map[id]);
    };

    this.loaders = {
      byId: new Dataloader(keys => byId(keys)
        .then(this.updaters.byId), {
          cacheKeyFn: key => typeof key !== 'object' ? key : key.toString(),
        }),
      byName: new Dataloader(keys => byName(keys)
        .then(this.updaters.byName)),
    };
  }

  public async create(payload: PartialGroup) {
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

  public async findOneByNameAndUpdate(name: string, payload: any) {
    logger.trace(`findOneByNameAndUpdate`);
    let entity = this.getPayload(payload, true);
    let result = await this.loaders.byName.load(name);
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

  public async findOneByNameAndRemove(name: string) {
    logger.trace(`findOneByNameAndRemove`);
    let result = await this.loaders.byName.load(name);
    if( result ){
      result = await result.remove();
      this.storeToCache([result]);
      return this.ensureId((result && result.toJSON) ? result.toJSON() : result);
    } else {
      return result;
    }
  }


  public async addToStudents(args: {
      group?: string,
      student?: string,
  }) {
    logger.trace(`addToStudents`);
    let current = await this.findOneById(args.group);
    if (current) {
      await this.connectors.Student.findOneByIdAndUpdate(
        args.student,
        { group: current.id});
    }
  }

  public async removeFromStudents(args: {
      group?: string,
      student?: string,
  }) {
    logger.trace(`removeFromStudents`);
    await this.connectors.Student.findOneByIdAndUpdate(args.student,
    { group: null });
  }

  public async addToCurator(args: {
      group?: string,
      curator?: string,
  }) {
    logger.trace(`addToCurator`);
    let opposite = await this.connectors.Curator.findOneById(args.curator );
    if (opposite) {
      await this.findOneByIdAndUpdate(args.group,
      { curator: opposite.id });
    }
  }

  public async removeFromCurator(args: {
      group?: string,
      curator?: string,
  }) {
    logger.trace(`removeFromCurator`);
    await this.findOneByIdAndUpdate(args.group, { curator: null });
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
      logger.error('no unique key provided findOneById "Group"');
      throw new Error('no unique key provided findOneById "Group"');
    }
    let result = await this.model.findById(condition.id).exec();
    return result;
  } */

  public async findOneByName(name?: string) {
    logger.trace(`findOneByName with ${name} `);
    let result = await this.loaders.byName.load(name);
    return this.ensureId((result && result.toJSON) ? result.toJSON() : result);
  }

/*   public async _findOneByName(name?: string) {
    logger.trace(`_findOneByName with ${name} ${typeof name} `);
    let condition: any;
    if (
        name !== undefined
        && name !== ''    ) {
      condition = {name};
    }
    if (!condition) {
      logger.error('no unique key provided findOneByName "Group"');
      throw new Error('no unique key provided findOneByName "Group"');
    }
    let result = await this.model.findOne(condition).exec();
    return result;
  } */

  public getPayload(args: PartialGroup, update?: boolean) {
    let entity: any = {};
      if (args.id !== undefined) {
        entity.id = args.id;
      }
      if (args.name !== undefined) {
        entity.name = args.name;
      }
      if (args.curator !== undefined) {
        entity.curator = args.curator;
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
