
import * as log4js from 'log4js';
let logger = log4js.getLogger('api:connector:Student');

import { MongooseApi } from 'oda-api-graphql';
import StudentSchema from './schema';
import RegisterConnectors from '../../registerConnectors';
import * as Dataloader from 'dataloader';

import { PartialStudent } from '../types/model';
import { StudentConnector } from './interface';

export default class Student extends MongooseApi<RegisterConnectors, PartialStudent> implements StudentConnector {
  constructor({mongoose, connectors, user, owner, acls, userGroup}) {
    logger.trace('constructor');
    super({mongoose, connectors, user, acls, userGroup, owner    });
    this.initSchema('Student', StudentSchema());

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

  public async create(payload: PartialStudent) {
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
      student?: string,
      person?: string,
  }) {
    logger.trace(`addToPerson`);
    let opposite = await this.connectors.Person.findOneById(args.person );
    if (opposite) {
      await this.findOneByIdAndUpdate(args.student,
      { person: opposite.id });
    }
  }

  public async removeFromPerson(args: {
      student?: string,
      person?: string,
  }) {
    logger.trace(`removeFromPerson`);
    await this.findOneByIdAndUpdate(args.student, { person: null });
  }

  public async addToGroup(args: {
      student?: string,
      group?: string,
  }) {
    logger.trace(`addToGroup`);
    let opposite = await this.connectors.Group.findOneById(args.group );
    if (opposite) {
      await this.findOneByIdAndUpdate(args.student,
      { group: opposite.id });
    }
  }

  public async removeFromGroup(args: {
      student?: string,
      group?: string,
  }) {
    logger.trace(`removeFromGroup`);
    await this.findOneByIdAndUpdate(args.student, { group: null });
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
      logger.error('no unique key provided findOneById "Student"');
      throw new Error('no unique key provided findOneById "Student"');
    }
    let result = await this.model.findById(condition.id).exec();
    return result;
  } */

  public getPayload(args: PartialStudent, update?: boolean) {
    let entity: any = {};
      if (args.id !== undefined) {
        entity.id = args.id;
      }
      if (args.person !== undefined) {
        entity.person = args.person;
      }
      if (args.group !== undefined) {
        entity.group = args.group;
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
