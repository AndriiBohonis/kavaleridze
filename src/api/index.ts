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

export async function getAllEvents() {
  return client.fetch(`*[_type == 'events']{
  _id,
  title,
  start,
  end,
  isBanner,
  'slug':slug.current,
    'imgSrc':imgSrc.asset._ref,
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
  'imgSrc':imgSrc.asset._ref,
  'shortDec': shortDec[0].children,
   description
  
    }
  `);
}

export async function getContacts() {
  return client.fetch(`*[_type == 'contacts']`);
}
