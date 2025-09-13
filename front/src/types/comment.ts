export interface Comment {
  _id: string;
  description: string;
  user: {
    _id: string;
    name: string;
  };
  song: string;
  createdAt: string;
  updatedAt: string;
}

export interface getComment {
  ok: boolean;
  count: number;
  data: Comment[];
}
