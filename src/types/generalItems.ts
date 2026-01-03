export interface generalItems {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IGeneralRes {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
  status?: number;
}

export interface GenreListResponse {
  success: boolean;
  data: IGeneralRes[];
}
