import { FC, useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Container, Box, Typography } from '@mui/material';

import ButtonWithIcon from '../../Common/ButtonWithIcon';
import Slider from './Slider';
import { getAllEvents } from '@/api';
import { EventsPreviewSection } from './styles';
import { IEvent } from '@/types';
import Loader from '@/components/Loader/Loader';

const EventsPreview: FC = () => {
  const [eventsData, setEventsData] = useState<IEvent[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const response = await getAllEvents();
      return await response;
    };

    getData().then((data) => {
      setEventsData(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <EventsPreviewSection>
      <Container>
        {isLoading && <Loader visible={isLoading} />}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: { md: 'space-between' },
            gap: { xs: '24px', md: '0' },
            alignItems: { xs: 'flex-start', md: 'flex-end' },
            marginBottom: { xs: '24px', md: '32px', lg: '40px' },
          }}>
          <Typography variant="h1" component="h2">
            Події музею
          </Typography>
          <ButtonWithIcon
            variant="tertiary"
            component={RouterLink}
            to="/events"
            svgSpriteId="breadcrumbsSeparator_icon"
            title="Дивитись усі події"
          />
        </Box>
        <Slider sliderInfo={eventsData} />
      </Container>
    </EventsPreviewSection>
  );
};

export default EventsPreview;
