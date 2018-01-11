
import { Connector } from 'oda-api-graphql';
import { PartialSocialNetworkType } from '../types/model';

export interface SocialNetworkTypeConnector extends Connector<PartialSocialNetworkType>{
  findOneById: (id: string)=> Promise<PartialSocialNetworkType>
  findOneByIdAndUpdate: (id: string, payload: PartialSocialNetworkType)=> Promise<PartialSocialNetworkType>
  findOneByIdAndRemove: (id: string)=> Promise<PartialSocialNetworkType>

  findOneByName: (name: string)=> Promise<PartialSocialNetworkType>
  findOneByNameAndUpdate: (name: string, payload: PartialSocialNetworkType)=> Promise<PartialSocialNetworkType>
  findOneByNameAndRemove: (name: string)=> Promise<PartialSocialNetworkType>

}

