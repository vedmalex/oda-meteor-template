
import { Connector } from 'oda-api-graphql';
import { PartialSocialNetwork } from '../types/model';

export interface SocialNetworkConnector extends Connector<PartialSocialNetwork>{
  findOneById: (id: string)=> Promise<PartialSocialNetwork>
  findOneByIdAndUpdate: (id: string, payload: PartialSocialNetwork)=> Promise<PartialSocialNetwork>
  findOneByIdAndRemove: (id: string)=> Promise<PartialSocialNetwork>

  findOneByAccount: (account: string)=> Promise<PartialSocialNetwork>
  findOneByAccountAndUpdate: (account: string, payload: PartialSocialNetwork)=> Promise<PartialSocialNetwork>
  findOneByAccountAndRemove: (account: string)=> Promise<PartialSocialNetwork>

  addToType(args: {
      socialNetwork?: string,
      socialNetworkType?: string,
  }): Promise<void>;
  removeFromType(args: {
      socialNetwork?: string,
      socialNetworkType?: string,
  }): Promise<void>;

  addToPerson(args: {
      socialNetwork?: string,
      person?: string,
  }): Promise<void>;
  removeFromPerson(args: {
      socialNetwork?: string,
      person?: string,
  }): Promise<void>;

}

