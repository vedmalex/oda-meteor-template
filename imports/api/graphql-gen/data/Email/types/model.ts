 export interface IEmail {
  id: string;
  email: string;
  type?: string;
  person?: string;
}

export type PartialEmail = {
  [P in keyof IEmail]?: IEmail[P]
}

export interface IEmailEdge {
  cursor: String;
  node: IEmail;
}

export interface IEmailConnection {
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor?: string;
    endCursor?: string;
    count?: number;
  };
  edges: IEmailEdge[];
}




