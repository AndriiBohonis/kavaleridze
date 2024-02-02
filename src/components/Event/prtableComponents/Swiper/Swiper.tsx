import { Box, Typography, useMediaQuery } from '@mui/material';

import { FC } from 'react';
import { Navigation, Pagination, Keyboard } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './sliderStyles.css';

import { theme } from '@/theme';
import { urlFor } from '@/lib/client';
import { IPortableImgGallery } from '@/types';

export const PortableSwiper: FC<IPortableImgGallery> = ({ value }) => {
  const { images, title } = value;

  const isMob = useMediaQuery(theme.breakpoints.down('md'));
  if (!images) return null;

  return (
    <Box sx={{ my: { xs: '20px', md: '24px', lg: '28px' } }}>
      <Swiper
        navigation={true}
        pagination={{
          clickable: true,
        }}
        keyboard={true}
        speed={700}
        spaceBetween={80}
        modules={[Navigation, Pagination, Keyboard]}
        className="mySwiper">
        {images.map((item) => {
          if (item.asset)
            return (
              <SwiperSlide key={item._key}>
                <Box
                  component={'img'}
                  loading="lazy"
                  src={
                    item &&
                    urlFor(item)
                      .width(isMob ? 288 : 930)
                      .height(isMob ? 309 : 480)
                      .auto('format')
                      .fit('fill')
                      .url()
                  }
                />
              </SwiperSlide>
            );
        })}
      </Swiper>
      <Box sx={{ my: { xs: '14px', md: '24px' } }}></Box>
      <Typography
        sx={{
          display: 'block',
          mt: { xs: '16px', md: '24px' },
        }}
        variant="caption">
        {title}
      </Typography>
    </Box>
  );
};
