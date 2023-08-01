import api from '..';
import { ArtObject } from './type';

interface ObjectResponse extends ArtObject {}

export const getObjectById = async (id: number) => {
  const res = await api.get<ObjectResponse>(`/objects/${id}`);

  if (res.status !== 200) throw new Error('Not Found');

  return res.data;
};

interface SearchResponse {
  total: number;
  objectIDs: number[] | null;
}

export const searchObjects = async (query: string) => {
  const res = await api.get<SearchResponse>(`/search?q=${query}`);

  if (res.status !== 200) throw new Error('Failed to search objects');

  return res.data;
};
