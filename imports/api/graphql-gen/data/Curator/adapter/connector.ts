
import * as log4js from 'log4js';
let logger = log4js.getLogger('api:connector:Curator');

import { MongooseApi } from 'oda-api-graphql';
import CuratorSchema from './schema';
import RegisterConnectors from '../../registerConnectors';
import * as Dataloader from 'dataloader';

import { PartialCurator } from '../types/model';
import { CuratorConnector } from './interface';

export default class Curator extends MongooseApi<RegisterConnectors, PartialCurator> implements CuratorConnector {
  constructor({mongoose, connectors, user, owner, acls, userGroup}) {
    logger.trace('constructor');
    super({mongoose, connectors, user, acls, userGroup, owner    });
    this.initSchema('Curator', CuratorSchema());

    this.loaderKeys = {
      byId: 'id',
    };

    this.updaters = {
      byId: this.updateLoaders('byId'),
    };

    const byId = async (keys) => {
      let result = await this._getList({ filter: { id: { in: keys } } });
      let map = result.reduce((_map, item) => {
        _map[item.id] = item;
        return _map;
      }, {});
      return keys.map(id => map[id]);
    };

    this.loaders = {
      byId: new Dataloader(keys => byId(keys)
        .then(this.updaters.byId), {
          cacheKeyFn: key => typeof key !== 'object' ? key : key.toString(),
        }),
    };
  }

  public async create(payload: PartialCurator) {
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


  public async addToPerson(args: {
      curator?: string,
      person?: string,
  }) {
    logger.trace(`addToPerson`);
    let opposite = await this.connectors.Person.findOneById(args.person );
    if (opposite) {
      await this.findOneByIdAndUpdate(args.curator,
      { person: opposite.id });
    }
  }

  public async removeFromPerson(args: {
      curator?: string,
      person?: string,
  }) {
    logger.trace(`removeFromPerson`);
    await this.findOneByIdAndUpdate(args.curator, { person: null });
  }

  public async addToGroups(args: {
      curator?: string,
      group?: string,
  }) {
    logger.trace(`addToGroups`);
    let current = await this.findOneById(args.curator);
    if (current) {
      await this.connectors.Group.findOneByIdAndUpdate(
        args.group,
        { curator: current.id});
    }
  }

  public async removeFromGroups(args: {
      curator?: string,
      group?: string,
  }) {
    logger.trace(`removeFromGroups`);
    await this.connectors.Group.findOneByIdAndUpdate(args.group,
    { curator: null });
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
      logger.error('no unique key provided findOneById "Curator"');
      throw new Error('no unique key provided findOneById "Curator"');
    }
    let result = await this.model.findById(condition.id).exec();
    return result;
  } */

  public getPayload(args: PartialCurator, update?: boolean) {
    let entity: any = {};
      if (args.id !== undefined) {
        entity.id = args.id;
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
