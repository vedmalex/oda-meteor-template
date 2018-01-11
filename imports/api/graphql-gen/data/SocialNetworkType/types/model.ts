 export interface ISocialNetworkType {
  id: string;
  name: string;
}

export type PartialSocialNetworkType = {
  [P in keyof ISocialNetworkType]?: ISocialNetworkType[P]
}

export interface ISocialNetworkTypeEdge {
  cursor: String;
  node: ISocialNetworkType;
}

export interface ISocialNetworkTypeConnection {
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor?: string;
    endCursor?: string;
    count?: number;
  };
  edges: ISocialNetworkTypeEdge[];
}




