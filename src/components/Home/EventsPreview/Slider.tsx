import { Box, Button, Typography } from '@mui/material';

import { Link as RouterLink } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { truncateDescription } from '@/helpers/truncateString';
import { WrapperImg } from './styles';
import { urlFor } from '../../../lib/client';

interface IDataSliderProps {
  _id: string;
  title: string;
  start: string;
  end: string;
  description: string;
  banner: string;
  slug: string;
  shortDec: string;
  imgSrc: string;
}

interface IFullData {
  sliderInfo: IDataSliderProps[];
}

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Import custom styles for Swiper
import './sliderStyles.css';

// import required modules
import { Keyboard, Navigation, Pagination } from 'swiper/modules';
import { formatDate } from '@/helpers/formatDate';

import { FC } from 'react';

const Slider: FC<IFullData> = ({ sliderInfo }) => {
  return (
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
      {sliderInfo.map((event) => (
        <SwiperSlide key={event._id}>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column-reverse', md: 'row' }, gap: { xs: '24px', lg: '26px' } }}>
            <Box sx={{ width: { xs: '100%', lg: '452px' }, display: 'flex', flexDirection: 'column', gap: { xs: '24px', lg: '40px' } }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <Typography sx={{ fontWeight: '500' }} variant="h3Kyiv" component="h3">
                  {event.title}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: '600' }}>
                  {formatDate(event.start, event.end)}
                </Typography>
                <Typography variant="caption">{truncateDescription(event.shortDec, 150)}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', md: 'flex-start' } }}>
                <RouterLink state={{ title: event.title }} to={`events/${event.slug}`}>
                  <Button
                    variant="secondary"
                    sx={{ width: { xs: '288px', md: '242px', lg: '248px' }, height: '48px', fontSize: { xs: '16px', lg: '18px' } }}>
                    Детальніше про подію
                  </Button>
                </RouterLink>
              </Box>
            </Box>
            <WrapperImg>
              <img src={urlFor(event.imgSrc).url()} />
            </WrapperImg>
          </Box>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
