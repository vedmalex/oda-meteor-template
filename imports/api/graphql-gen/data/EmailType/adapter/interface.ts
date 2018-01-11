
import { Connector } from 'oda-api-graphql';
import { PartialEmailType } from '../types/model';

export interface EmailTypeConnector extends Connector<PartialEmailType>{
  findOneById: (id: string)=> Promise<PartialEmailType>
  findOneByIdAndUpdate: (id: string, payload: PartialEmailType)=> Promise<PartialEmailType>
  findOneByIdAndRemove: (id: string)=> Promise<PartialEmailType>

  findOneByName: (name: string)=> Promise<PartialEmailType>
  findOneByNameAndUpdate: (name: string, payload: PartialEmailType)=> Promise<PartialEmailType>
  findOneByNameAndRemove: (name: string)=> Promise<PartialEmailType>

}

