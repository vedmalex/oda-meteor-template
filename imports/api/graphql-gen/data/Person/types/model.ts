 export interface IPerson {
  id: string;
  spiritualName: string;
  fullName: string;
  dateOfBirth?: Date;
  user?: string;
  specialNotes?: string;
}

export type PartialPerson = {
  [P in keyof IPerson]?: IPerson[P]
}

export interface IPersonEdge {
  cursor: String;
  node: IPerson;
}

export interface IPersonConnection {
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor?: string;
    endCursor?: string;
    count?: number;
  };
  edges: IPersonEdge[];
}




