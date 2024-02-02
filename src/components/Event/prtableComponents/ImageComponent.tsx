import { Box } from '@mui/material';
import { FC, Suspense, lazy } from 'react';
import { PortableSwiper } from './Swiper/Swiper';
import { urlFor } from '@/lib/client';
import { IImage, IPortableImgGallery } from '@/types';

const GridGallery = lazy(() => import('./GridGallery'));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ImageComponent = ({ value }: { value: IImage }) => {
  return (
    <Box sx={{ my: { xs: '32px', md: '40px' } }}>
      <Box
        component={'img'}
        sx={{
          width: '100%',
          height: { xs: 'auto', md: '408px' },
          objectFit: { sx: 'none', md: 'cover' },
        }}
        src={value.asset && urlFor(value).auto('format').width(920).height(520).fit('fill').url().toString()}
        alt={value.alt || ''}
        loading="lazy"
      />
    </Box>
  );
};
export const ImagesArray: FC<IPortableImgGallery> = ({ value }) => {
  const { option } = value;

  if (option) {
    return (
      <Suspense>
        <GridGallery value={value} />
      </Suspense>
    );
  } else {
    return (
      <Suspense>
        <PortableSwiper value={value} />
      </Suspense>
    );
  }
};
