 export interface IPhone {
  id: string;
  phoneNumber: string;
  type?: string;
  person?: string;
}

export type PartialPhone = {
  [P in keyof IPhone]?: IPhone[P]
}

export interface IPhoneEdge {
  cursor: String;
  node: IPhone;
}

export interface IPhoneConnection {
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor?: string;
    endCursor?: string;
    count?: number;
  };
  edges: IPhoneEdge[];
}




