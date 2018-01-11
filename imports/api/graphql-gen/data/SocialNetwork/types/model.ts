 export interface ISocialNetwork {
  id: string;
  account: string;
  url?: string;
  type?: string;
  person?: string;
}

export type PartialSocialNetwork = {
  [P in keyof ISocialNetwork]?: ISocialNetwork[P]
}

export interface ISocialNetworkEdge {
  cursor: String;
  node: ISocialNetwork;
}

export interface ISocialNetworkConnection {
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor?: string;
    endCursor?: string;
    count?: number;
  };
  edges: ISocialNetworkEdge[];
}




