import { common } from 'oda-gen-graphql';
import { SystemEntities } from './entity';
import { SystemMutations } from './mutation';

export class SystemPackage extends common.types.GQLModule {
  protected _extend: common.types.GQLModule[] = [
    new SystemEntities({}),
    new SystemMutations({}),
    new common.types.DefaultTypes({}),
  ];
}
