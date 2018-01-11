
import { Connector } from 'oda-api-graphql';
import { PartialPhoneType } from '../types/model';

export interface PhoneTypeConnector extends Connector<PartialPhoneType>{
  findOneById: (id: string)=> Promise<PartialPhoneType>
  findOneByIdAndUpdate: (id: string, payload: PartialPhoneType)=> Promise<PartialPhoneType>
  findOneByIdAndRemove: (id: string)=> Promise<PartialPhoneType>

  findOneByName: (name: string)=> Promise<PartialPhoneType>
  findOneByNameAndUpdate: (name: string, payload: PartialPhoneType)=> Promise<PartialPhoneType>
  findOneByNameAndRemove: (name: string)=> Promise<PartialPhoneType>

}

