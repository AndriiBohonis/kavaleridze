import { FC, useEffect, useState } from 'react';

import { Container, useMediaQuery, useTheme } from '@mui/material';

import Section from '../Common/Section';
import Loader from '../Loader/Loader';
import BackToEventsBtn from './parts/BackToEventsBtn';
import EventDetails from './parts/EventDetails';
import EventTitle from './parts/EventTitle';
import { ContentBox } from './styles';
import { useParams } from 'react-router-dom';

import { getCurrentEvents } from '@/api';

import { urlFor } from '../../lib/client.ts';

interface IData {
  imgSrc: string;
  description: any;
}
const Event: FC = () => {
  const { breakpoints } = useTheme();
  const isMobile = useMediaQuery(breakpoints.down('md'));
  const { title } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [dataEvent, setDataEvent] = useState<IData>();

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
            <EventTitle {...(dataEvent as any)} />
            <EventDetails banner={urlFor(dataEvent?.imgSrc).auto('format').fit('scale').url().toString()} content={dataEvent.description} />
            <BackToEventsBtn title={isMobile ? 'До всіх подій' : 'Повернутися до всіх подій'} />
          </ContentBox>
        )}
      </Container>
    </Section>
  );
};

export default Event;
