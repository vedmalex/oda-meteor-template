
import User from './User/adapter/connector';
import { UserConnector } from './User/adapter/interface';

import Student from './Student/adapter/connector';
import { StudentConnector } from './Student/adapter/interface';

import Curator from './Curator/adapter/connector';
import { CuratorConnector } from './Curator/adapter/interface';

import Group from './Group/adapter/connector';
import { GroupConnector } from './Group/adapter/interface';

import Person from './Person/adapter/connector';
import { PersonConnector } from './Person/adapter/interface';

import SocialNetwork from './SocialNetwork/adapter/connector';
import { SocialNetworkConnector } from './SocialNetwork/adapter/interface';

import SocialNetworkType from './SocialNetworkType/adapter/connector';
import { SocialNetworkTypeConnector } from './SocialNetworkType/adapter/interface';

import Email from './Email/adapter/connector';
import { EmailConnector } from './Email/adapter/interface';

import EmailType from './EmailType/adapter/connector';
import { EmailTypeConnector } from './EmailType/adapter/interface';

import Phone from './Phone/adapter/connector';
import { PhoneConnector } from './Phone/adapter/interface';

import PhoneType from './PhoneType/adapter/connector';
import { PhoneTypeConnector } from './PhoneType/adapter/interface';


import { acl } from 'oda-api-graphql';

export default class RegisterConnectors {
  public get User(): UserConnector {
    return this.InitUser();
  }

  public InitUser(): UserConnector {
    if (!this._User) {
      this._User = new User({ mongoose: this.mongoose, connectors: this, user: this.user, owner: this.owner, acls: this.acls, userGroup: this.userGroup });
    }
    return this._User;
  }

  public get Student(): StudentConnector {
    return this.InitStudent();
  }

  public InitStudent(): StudentConnector {
    if (!this._Student) {
      this._Student = new Student({ mongoose: this.mongoose, connectors: this, user: this.user, owner: this.owner, acls: this.acls, userGroup: this.userGroup });
    }
    return this._Student;
  }

  public get Curator(): CuratorConnector {
    return this.InitCurator();
  }

  public InitCurator(): CuratorConnector {
    if (!this._Curator) {
      this._Curator = new Curator({ mongoose: this.mongoose, connectors: this, user: this.user, owner: this.owner, acls: this.acls, userGroup: this.userGroup });
    }
    return this._Curator;
  }

  public get Group(): GroupConnector {
    return this.InitGroup();
  }

  public InitGroup(): GroupConnector {
    if (!this._Group) {
      this._Group = new Group({ mongoose: this.mongoose, connectors: this, user: this.user, owner: this.owner, acls: this.acls, userGroup: this.userGroup });
    }
    return this._Group;
  }

  public get Person(): PersonConnector {
    return this.InitPerson();
  }

  public InitPerson(): PersonConnector {
    if (!this._Person) {
      this._Person = new Person({ mongoose: this.mongoose, connectors: this, user: this.user, owner: this.owner, acls: this.acls, userGroup: this.userGroup });
    }
    return this._Person;
  }

  public get SocialNetwork(): SocialNetworkConnector {
    return this.InitSocialNetwork();
  }

  public InitSocialNetwork(): SocialNetworkConnector {
    if (!this._SocialNetwork) {
      this._SocialNetwork = new SocialNetwork({ mongoose: this.mongoose, connectors: this, user: this.user, owner: this.owner, acls: this.acls, userGroup: this.userGroup });
    }
    return this._SocialNetwork;
  }

  public get SocialNetworkType(): SocialNetworkTypeConnector {
    return this.InitSocialNetworkType();
  }

  public InitSocialNetworkType(): SocialNetworkTypeConnector {
    if (!this._SocialNetworkType) {
      this._SocialNetworkType = new SocialNetworkType({ mongoose: this.mongoose, connectors: this, user: this.user, owner: this.owner, acls: this.acls, userGroup: this.userGroup });
    }
    return this._SocialNetworkType;
  }

  public get Email(): EmailConnector {
    return this.InitEmail();
  }

  public InitEmail(): EmailConnector {
    if (!this._Email) {
      this._Email = new Email({ mongoose: this.mongoose, connectors: this, user: this.user, owner: this.owner, acls: this.acls, userGroup: this.userGroup });
    }
    return this._Email;
  }

  public get EmailType(): EmailTypeConnector {
    return this.InitEmailType();
  }

  public InitEmailType(): EmailTypeConnector {
    if (!this._EmailType) {
      this._EmailType = new EmailType({ mongoose: this.mongoose, connectors: this, user: this.user, owner: this.owner, acls: this.acls, userGroup: this.userGroup });
    }
    return this._EmailType;
  }

  public get Phone(): PhoneConnector {
    return this.InitPhone();
  }

  public InitPhone(): PhoneConnector {
    if (!this._Phone) {
      this._Phone = new Phone({ mongoose: this.mongoose, connectors: this, user: this.user, owner: this.owner, acls: this.acls, userGroup: this.userGroup });
    }
    return this._Phone;
  }

  public get PhoneType(): PhoneTypeConnector {
    return this.InitPhoneType();
  }

  public InitPhoneType(): PhoneTypeConnector {
    if (!this._PhoneType) {
      this._PhoneType = new PhoneType({ mongoose: this.mongoose, connectors: this, user: this.user, owner: this.owner, acls: this.acls, userGroup: this.userGroup });
    }
    return this._PhoneType;
  }


  protected _User: UserConnector;
  protected _Student: StudentConnector;
  protected _Curator: CuratorConnector;
  protected _Group: GroupConnector;
  protected _Person: PersonConnector;
  protected _SocialNetwork: SocialNetworkConnector;
  protected _SocialNetworkType: SocialNetworkTypeConnector;
  protected _Email: EmailConnector;
  protected _EmailType: EmailTypeConnector;
  protected _Phone: PhoneConnector;
  protected _PhoneType: PhoneTypeConnector;

  public mongoose;
  public sequelize;
  public user;
  public owner;
  public acls: acl.secureAny.ACLCRUD<(object) => object>;
  public userGroup;
  public userGQL;
  public systemGQL;

  public initGQL({
      userGQL,
      systemGQL
    }:{
      userGQL?,
      systemGQL?,}){
    this.userGQL = userGQL ? userGQL : this.userGQL;
    this.systemGQL = systemGQL ? systemGQL : this.systemGQL;
  }

  constructor({
    user,
    owner,
    mongoose,
    sequelize,
    acls,
    userGroup,
    userGQL,
    systemGQL,
  }:
    {
      user?: any,
      owner?: any,
      mongoose?: any,
      sequelize?: any,
      acls?: acl.secureAny.Acls<(object) => object>;
      userGroup?: string;
      userGQL?,
      systemGQL?,
    }) {
    this.user = user;
    this.owner = owner;
    this.mongoose = mongoose;
    this.sequelize = sequelize;
    this.acls = { read: new acl.secureAny.Secure<(object) => object>({ acls }) };
    this.userGroup = userGroup;
    this.initGQL({userGQL, systemGQL});
  }

  async syncDb(force: boolean = false) {
    await this.sequelize.sync({force});
  }

  async close(){
    await this.sequelize.close();
    await this.mongoose.close();
  }
};
