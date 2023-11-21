import { FC, useCallback, useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Container, Box, Typography } from '@mui/material';
import { useFetch } from '@/hooks/useFetch';
import ButtonWithIcon from '../../Common/ButtonWithIcon';
import Slider from './Slider';
import { getAllEvents, getEvents } from '@/api';
import { EventsPreviewSection, EmptyEventsSection } from './styles';
import { IEvent, IMuseumEventData } from '@/types';

const EventsPreview: FC = () => {
  const [eventsData, setEventsData] = useState<IEvent[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // const paramRequest = useCallback(() => getEventById(title || ''), [title]);

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
  // useEffect(() => {
  //   if (isFulfilled) {
  //     const content = data?.content || [];
  //     setEventsData(content);
  //   }
  // }, [data, isFulfilled]);

  // if (eventsData.length === 0 || isLoading) {
  //   return <EmptyEventsSection />;
  // }

  return (
    <EventsPreviewSection>
      <Container>
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
