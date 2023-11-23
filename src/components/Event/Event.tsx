import { FC, useEffect, useState } from 'react';

import { Container, useMediaQuery, useTheme } from '@mui/material';

import { getEventById } from '@/api';
import { useFetch } from '@/hooks/useFetch';
import { IEvent } from '@/types';
import { useNavigate, useParams } from 'react-router-dom';
import Section from '../Common/Section';
import Loader from '../Loader/Loader';
import BackToEventsBtn from './parts/BackToEventsBtn';
import EventDetails from './parts/EventDetails';
import EventTitle from './parts/EventTitle';
import { ContentBox } from './styles';
import { useParams } from 'react-router-dom';
import { IEvent } from '@/types';
import { getCurrentEvents } from '@/api';
import { useFetch } from '@/hooks/useFetch';
import Loader from '../Loader/Loader';
import { urlFor } from '../../lib/client.ts';
const Event: FC = () => {
  const { breakpoints } = useTheme();
  const isMobile = useMediaQuery(breakpoints.down('md'));
  const { title } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [dataEvent, setDataEvent] = useState();

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const response = await getCurrentEvents(title || '');
      return await response;
    };

    getData().then((data) => {
      setDataEvent(data[0]);
      setIsLoading(false);
    });
  }, [title]);

  return (
    <Section variant="light">
      <Container>
        {isLoading && <Loader visible={isLoading} />}
        {dataEvent && (
          <ContentBox>
            <EventTitle {...dataEvent} />
            <EventDetails banner={urlFor(dataEvent.imgSrc).auto('format').url()} content={dataEvent.description} />
            <BackToEventsBtn title={isMobile ? 'До всіх подій' : 'Повернутися до всіх подій'} />
          </ContentBox>
        )}
      </Container>
    </Section>
  );
};

export default Event;
