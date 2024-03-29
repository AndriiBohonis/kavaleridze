import { IIGallery, IImage, IImageP } from '@/types';
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: 'oqxqohoj',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-05-03',

  ignoreBrowserTokenWarning: false,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: IImageP | IImage | IIGallery | string) {
  return builder.image(source);
}
