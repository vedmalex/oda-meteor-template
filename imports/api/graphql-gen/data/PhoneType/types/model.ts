 export interface IPhoneType {
  id: string;
  name: string;
}

export type PartialPhoneType = {
  [P in keyof IPhoneType]?: IPhoneType[P]
}

export interface IPhoneTypeEdge {
  cursor: String;
  node: IPhoneType;
}

export interface IPhoneTypeConnection {
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor?: string;
    endCursor?: string;
    count?: number;
  };
  edges: IPhoneTypeEdge[];
}




