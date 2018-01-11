
import { Connector } from 'oda-api-graphql';
import { PartialEmail } from '../types/model';

export interface EmailConnector extends Connector<PartialEmail>{
  findOneById: (id: string)=> Promise<PartialEmail>
  findOneByIdAndUpdate: (id: string, payload: PartialEmail)=> Promise<PartialEmail>
  findOneByIdAndRemove: (id: string)=> Promise<PartialEmail>

  findOneByEmail: (email: string)=> Promise<PartialEmail>
  findOneByEmailAndUpdate: (email: string, payload: PartialEmail)=> Promise<PartialEmail>
  findOneByEmailAndRemove: (email: string)=> Promise<PartialEmail>

  addToType(args: {
      email?: string,
      emailType?: string,
  }): Promise<void>;
  removeFromType(args: {
      email?: string,
      emailType?: string,
  }): Promise<void>;

  addToPerson(args: {
      email?: string,
      person?: string,
  }): Promise<void>;
  removeFromPerson(args: {
      email?: string,
      person?: string,
  }): Promise<void>;

}

