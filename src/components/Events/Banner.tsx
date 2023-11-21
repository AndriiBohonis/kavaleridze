import { Grow, Button, Typography, useMediaQuery, useTheme } from '@mui/material';
import { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { truncateDescription } from '../../helpers/truncateString';
import { BannerWrapper, ButtonBox, ContentBox, TextBox } from './styles';
import { urlFor } from '../../lib/client.js';

interface MuseumEventProps {
  title: string;
  summary: string;
  banner: string;
  slug: string;
  imgSrc: string;
  shortDec: any[];
}

const Banner: FC<{ event: MuseumEventProps }> = ({ event }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  const buttonText = isSmallScreen ? 'Детальніше' : 'Детальніше про подію';

  return (
    <Grow in={true} timeout={1000}>
      <BannerWrapper img={urlFor(event.imgSrc)}>
        <ContentBox>
          <TextBox>
            <Typography
              variant="h2"
              sx={{
                color: theme.palette.text.primary,
              }}>
              {truncateDescription(event.title, 100)}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: theme.palette.text.primary,
              }}>
              {truncateDescription(
                event.shortDec?.map((item) => item.text),
                200
              )}
            </Typography>
          </TextBox>
          <ButtonBox>
            <Button
              component={RouterLink}
              to={event._id}
              sx={{
                minWidth: { xs: '143px' },
                borderColor: theme.palette.text.primary,
                color: theme.palette.text.primary,
              }}
              variant="secondary">
              {buttonText}
            </Button>
          </ButtonBox>
        </ContentBox>
      </BannerWrapper>
    </Grow>
  );
};

export default Banner;
