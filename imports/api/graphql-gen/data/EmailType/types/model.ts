 export interface IEmailType {
  id: string;
  name: string;
}

export type PartialEmailType = {
  [P in keyof IEmailType]?: IEmailType[P]
}

export interface IEmailTypeEdge {
  cursor: String;
  node: IEmailType;
}

export interface IEmailTypeConnection {
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor?: string;
    endCursor?: string;
    count?: number;
  };
  edges: IEmailTypeEdge[];
}




