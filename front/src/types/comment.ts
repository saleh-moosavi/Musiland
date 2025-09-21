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

export interface CommentByUserId {
  _id: string;
  description: string;
  user: {
    _id: string;
    name: string;
  };
  song: {
    _id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface getComment {
  ok: boolean;
  count: number;
  data: Comment[];
}

export interface getCommentByUserId {
  ok: boolean;
  count: number;
  data: CommentByUserId[];
}
