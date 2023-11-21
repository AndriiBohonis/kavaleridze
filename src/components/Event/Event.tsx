import { FC, useCallback, useEffect, useState } from 'react';

import { Container, useMediaQuery, useTheme } from '@mui/material';

import Section from '../Common/Section';
import BackToEventsBtn from './parts/BackToEventsBtn';
import EventDetails from './parts/EventDetails';
import EventTitle from './parts/EventTitle';
import { ContentBox } from './styles';
import { useNavigate, useParams } from 'react-router-dom';
import { IEvent } from '@/types';
import { getCurrentEvents, getEventById } from '@/api';
import { useFetch } from '@/hooks/useFetch';
import Loader from '../Loader/Loader';
import { urlFor } from '../../lib/client.ts';
const Event: FC = () => {
  const { breakpoints } = useTheme();
  const isMobile = useMediaQuery(breakpoints.down('md'));
  const { title } = useParams();
  // const [breadcrumbTitle, setBreadcrumbTitle] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // const paramRequest = useCallback(() => getEventById(title || ''), [title]);
  const [dataEvent, setDataEvent] = useState();
  // const { data, isLoading, isFulfilled, error } = useFetch<IEvent, unknown>(paramRequest);

  // useEffect(() => {
  //   if (isFulfilled && data) {
  //     setBreadcrumbTitle(data.title);
  //     navigate(`/events/${data.slug}`, { state: { title: breadcrumbTitle } });
  //   }
  // }, [isFulfilled, data, navigate, breadcrumbTitle]);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const response = await getCurrentEvents(title || '');
      return await response;
    };

    getData().then((data) => {
      setDataEvent(...data);
      setIsLoading(false);
    });
  }, []);

  return (
    <Section variant="light">
      <Container>
        {isLoading && <Loader visible={isLoading} />}
        {dataEvent && (
          <ContentBox>
            <EventTitle {...dataEvent} />
            <EventDetails banner={urlFor(dataEvent.imgSrc)} content={dataEvent.description} />
            <BackToEventsBtn title={isMobile ? 'До всіх подій' : 'Повернутися до всіх подій'} />
          </ContentBox>
        )}
      </Container>
    </Section>
  );
};

export default Event;
