import { Grow, Box, Button, Container, Typography, useTheme } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { getAllEvents } from '@/api';

import { formatDate } from '@/helpers/formatDate';
import { truncateDescription } from '@/helpers/truncateString';
import ButtonWithIcon from '../Common/ButtonWithIcon';
import Section from '../Common/Section';
import Loader from '../Loader/Loader';
import Banner from './Banner';

import { WrapperImg } from './styles';

import { urlFor } from '../../lib/client.ts';
import { visuallyHidden } from '@/styles/visually-hidden';
import { IEvent } from '@/types.js';

const Events: FC = () => {
  const [cardsEvent, setCardsEvent] = useState<IEvent[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalEvents, setTotalEvents] = useState<number>(0);
  const [pageSize, setPageSize] = useState(4);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);
  const theme = useTheme();

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const response = await getAllEvents();
      return await response;
    };
    getData().then((data) => {
      setCardsEvent(data);
      setIsLoading(false);
      setTotalEvents(data.length);
    });
  }, []);

  const handlerLoadMore = () => {
    setIsButtonLoading(true);
    setCurrentPage((prevPage) => prevPage + 1);
    setPageSize((prevPage) => prevPage + 3);
    setIsButtonLoading(false);
  };

  const bannerEvent = cardsEvent.filter((item) => item.isBanner)[0];

  const visibleEvents = cardsEvent.filter((item) => !item.isBanner).slice(0, pageSize);

  return (
    <Section variant="light">
      <Typography variant="h1" sx={visuallyHidden}>
        Події
      </Typography>
      {isLoading && <Loader visible={isLoading} />}
      {cardsEvent && (
        <>
          {bannerEvent && <Banner event={bannerEvent} />}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: { xs: '32px', lg: '40px' },
              marginTop: { xs: '32px', md: '44px' },
              paddingBottom: { xs: '40px', md: '32px' },
            }}>
            {cardsEvent &&
              visibleEvents.map((event) => (
                <Grow key={event._id} in={true} timeout={1200}>
                  <Container sx={{ borderBottom: `1px solid ${theme.palette.gray.main} ` }}>
                    <Box sx={{ padding: { xs: '24px 0' } }}>
                      <Box
                        sx={{
                          display: 'grid',
                          gridTemplateColumns: { md: '1fr 1fr', lg: '494px 436px' },
                          gap: { xs: '16px', md: '24px', lg: '48px' },
                        }}>
                        <WrapperImg>
                          <img src={urlFor(event.imgSrc).auto('format').fit('scale').url().toString()} alt="event logo" />
                        </WrapperImg>
                        <Box>
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '16px',
                            }}>
                            <Typography variant="h2">{truncateDescription(event.title, 100)}</Typography>
                            <Typography variant="body1" sx={{ fontWeight: '600' }}>
                              {formatDate(event.start, event.end)}
                            </Typography>
                            <Typography variant="caption">{truncateDescription(event.shortDec, 150)}</Typography>
                          </Box>
                          <RouterLink state={{ title: event.title }} to={event.slug}>
                            <ButtonWithIcon
                              variant="tertiary"
                              sx={{ marginTop: '24px' }}
                              svgSpriteId="breadcrumbsSeparator_icon"
                              title="Читати далі"
                            />
                          </RouterLink>
                        </Box>
                      </Box>
                    </Box>
                  </Container>
                </Grow>
              ))}
          </Box>
          <Box sx={{ width: '100%', textAlign: 'center', marginBottom: { xs: '60px', md: '80px' } }}>
            {currentPage * pageSize < totalEvents && !isButtonLoading && (
              <Button onClick={handlerLoadMore} sx={{ width: '248px' }} variant="secondary">
                Показати більше
              </Button>
            )}
          </Box>
        </>
      )}
    </Section>
  );
};

export default Events;
