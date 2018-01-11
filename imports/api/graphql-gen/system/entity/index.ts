
import { common } from 'oda-gen-graphql';
import { NodeEntity } from './node';
import { ViewerEntity } from './viewer';

import { UserEntity } from './User';
import { StudentEntity } from './Student';
import { CuratorEntity } from './Curator';
import { GroupEntity } from './Group';
import { PersonEntity } from './Person';
import { SocialNetworkEntity } from './SocialNetwork';
import { SocialNetworkTypeEntity } from './SocialNetworkType';
import { EmailEntity } from './Email';
import { EmailTypeEntity } from './EmailType';
import { PhoneEntity } from './Phone';
import { PhoneTypeEntity } from './PhoneType';

export class SystemEntities extends common.types.GQLModule {
  protected _extend = [
    new NodeEntity({}),
    new ViewerEntity({}),
    new UserEntity({}),
    new StudentEntity({}),
    new CuratorEntity({}),
    new GroupEntity({}),
    new PersonEntity({}),
    new SocialNetworkEntity({}),
    new SocialNetworkTypeEntity({}),
    new EmailEntity({}),
    new EmailTypeEntity({}),
    new PhoneEntity({}),
    new PhoneTypeEntity({}),
  ];
}

