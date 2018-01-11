 export interface IUser {
  id: string;
  userName: string;
  password: string;
  isAdmin?: boolean;
  isSystem?: boolean;
  enabled?: boolean;
}

export type PartialUser = {
  [P in keyof IUser]?: IUser[P]
}

export interface IUserEdge {
  cursor: String;
  node: IUser;
}

export interface IUserConnection {
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor?: string;
    endCursor?: string;
    count?: number;
  };
  edges: IUserEdge[];
}




