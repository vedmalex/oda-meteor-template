 export interface ICurator {
  id: string;
  person?: string;
}

export type PartialCurator = {
  [P in keyof ICurator]?: ICurator[P]
}

export interface ICuratorEdge {
  cursor: String;
  node: ICurator;
}

export interface ICuratorConnection {
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor?: string;
    endCursor?: string;
    count?: number;
  };
  edges: ICuratorEdge[];
}




