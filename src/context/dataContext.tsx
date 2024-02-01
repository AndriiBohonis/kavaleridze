import { FC, PropsWithChildren, createContext, useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { getContacts } from '@/api';
// import { useFetch } from '@/hooks/useFetch.ts';
import { IMuseumData } from '@/types';

interface DataContextType {
  email: string;
  tel: string;
  data: IMuseumData | null;
  isLoading: boolean;

  error: AxiosError<unknown, unknown> | null;
}

const getData = async () => {
  const response = await getContacts();
  return await response;
};

export const DataContext = createContext<DataContextType>(null!);

export const DataProvider: FC<PropsWithChildren> = ({ children }) => {
  // const { data, isLoading, error } = useFetch<IMuseumData, unknown>(getMuseumData);
  const [data, setData] = useState();

  useEffect(() => {
    getData().then((res) => setData(res[0]));
  }, []);
  if (!data) return;

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};
