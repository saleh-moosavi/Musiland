import apiClient from '@/configs/axios';
import { generalItems } from '@/types/generalItems';

export const getSingers = (): Promise<generalItems[]> =>
  apiClient.get('/singers').then(res => res.data);