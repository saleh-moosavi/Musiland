/***************** Data Types *****************/

export interface IAlbum {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface IAlbumResponse {
  success: boolean;
  data?: IAlbum;
  message?: string;
}

export interface IGetAllAlbumResponse {
  success: boolean;
  data?: IAlbum[];
  message?: string;
}
