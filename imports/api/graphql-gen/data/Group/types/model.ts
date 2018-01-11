 export interface IGroup {
  id: string;
  name: string;
  curator?: string;
}

export type PartialGroup = {
  [P in keyof IGroup]?: IGroup[P]
}

export interface IGroupEdge {
  cursor: String;
  node: IGroup;
}

export interface IGroupConnection {
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor?: string;
    endCursor?: string;
    count?: number;
  };
  edges: IGroupEdge[];
}




