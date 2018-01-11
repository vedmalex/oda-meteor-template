 export interface IStudent {
  id: string;
  person?: string;
  group?: string;
}

export type PartialStudent = {
  [P in keyof IStudent]?: IStudent[P]
}

export interface IStudentEdge {
  cursor: String;
  node: IStudent;
}

export interface IStudentConnection {
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor?: string;
    endCursor?: string;
    count?: number;
  };
  edges: IStudentEdge[];
}




