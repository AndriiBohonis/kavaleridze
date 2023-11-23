import axios from 'axios';
import { IFormInput } from '../types';
import { client } from '../lib/client.ts';
const BASE_URL = import.meta.env.VITE_SERVER_URL;

const instance = axios.create({
  baseURL: BASE_URL,
});

export const sendFeedbackForm = (data: IFormInput) => {
  return instance.post('/feedback/submit', data);
};

export const getEvents = (size = 5, page = 1) => {
  return instance.get(`/events?size=${size}&page=${page}`);
};

export const getEventById = (id: string) => {
  return instance.get(`/events/${id}`);
};

export const getMuseumData = () => {
  return instance.get(`/museum-data`);
};

export const getSearchResults = async (query: string) => {
  try {
    const { data } = await instance.get(`/search/${query}`);
    return data;
  } catch (e) {
    return null;
  }
};

export const getSearchSanity = async (query: string) => {
  const events = await client.fetch(`*[_type == 'events' && title match '${query}*']{
  'id': _id,
  title,
 'pathName':slug.current,
  'description':shortDec[0].children[0].text,
  'contentType':category,
  }`);

  const pages = await client.fetch(`*[_type == 'search'&& description match '${query}*']{
   description,
      pathName,
          "title":name
        }`);

  return [...pages, ...events];
};

export async function getAllEvents() {
  return client.fetch(`*[_type == 'events']{
  _id,
  title,
  start,
  isBanner,
  end,
  'slug':slug.current,
    imgSrc,
    'shortDec': shortDec[0].children,
}
  `);
}
export async function getCurrentEvents(slug: string) {
  return client.fetch(`*[_type == 'events' && slug.current  == '${slug}']{
  _id,
  title,
  start,
  end,
  imgSrc,
  'shortDec': shortDec[0].children,
   description
  
    }
  `);
}

export async function getContacts() {
  return client.fetch(`*[_type == 'contacts']`);
}
