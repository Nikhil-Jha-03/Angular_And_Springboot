interface Join {
  id: string;
  fromObject: string;
  fromField: string;
  toObject: string;
  toField: string;
  joinType: 'INNER' | 'LEFT' | 'RIGHT';
}
