import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: 'oqxqohoj',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-05-03',
  token:
    'sk4Kzzh9UvmBG5bkJ3JkjmY2KD8GSuVMp6x1BkFfk8DxmnaAkDHcYZa1gChMLnEfeoGn1HrM0zBMgfT6GxDCO8hw5tmvRb2IANOytjJ4ZlpdUv36kEJ8gzRFIFOJCuChl1czHEYihaJTzeeMvKKgiAeqfvoWj48qIrmA2Pug3Kbmhdm41B07',
  ignoreBrowserTokenWarning: true,
});

// export async function updateDocumentTitle(_id:, title) {
//   const result = client.patch(_id).set({ title });
//   return result;
// }

const builder = imageUrlBuilder(client);

export function urlFor(source: string) {
  return builder.image(source);
}
