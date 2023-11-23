import { Grow, Box, Button, Container, Typography, useMediaQuery, useTheme } from '@mui/material';
import { FC, useCallback, useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { getAllEvents, getEvents } from '@/api';
import { useFetch } from '@/hooks/useFetch';
import { formatDate } from '@/helpers/formatDate';
import { truncateDescription } from '@/helpers/truncateString';
import ButtonWithIcon from '../Common/ButtonWithIcon';
import Section from '../Common/Section';
import Loader from '../Loader/Loader';
import Banner from './Banner';
import EmptyEventsPage from './EmptyEventsPage';
import { WrapperImg } from './styles';
import { IEvent, IMuseumEventData } from '@/types';
import { urlFor } from '../../lib/client.ts';

const Events: FC = () => {
  const [cardsEvent, setCardsEvent] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalEvents, setTotalEvents] = useState<number>(0);
  const [pageSize, setPageSize] = useState(4);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

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

  console.log(totalEvents);
  const handlerLoadMore = () => {
    setIsButtonLoading(true);
    setCurrentPage((prevPage) => prevPage + 1);
    setPageSize((prevPage) => prevPage + 3);
    setIsButtonLoading(false);
  };

  const bannerEvent = cardsEvent.filter((item) => item.isBanner)[0];
  const visibleEvents = cardsEvent.filter((item) => !item.isBanner).slice(1, pageSize);

  return (
    <Section variant="light">
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
                          <img src={urlFor(event.imgSrc).url()} alt="event logo" />
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
                            <Typography variant="caption">
                              {truncateDescription(
                                event.shortDec?.map((item) => item.text),
                                150
                              )}
                            </Typography>
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
