import { PortableTextComponents } from '@portabletext/react';
import { ImageComponent, ImagesArray } from './ImageComponent';
import { Link, Typography, TypographyProps, styled } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import YouTube from './YouTube';

export const EventText = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontWeight: 400,
  textAlign: 'justify',
  [theme.breakpoints.only('lg')]: {
    fontSize: '1.125rem',
    lineHeight: 1.55,
  },
  [theme.breakpoints.only('md')]: {
    fontSize: '1.125rem',
    lineHeight: 1.55,
  },
  [theme.breakpoints.only('sm')]: {
    fontSize: '0.875rem',
    lineHeight: 1.42,
  },
}));

export const components: PortableTextComponents = {
  types: {
    gallery: ImagesArray,
    youtube: YouTube,
    image: ImageComponent,
  },
  block: {
    h2: ({ children }) => (
      <Typography
        component={'h2'}
        sx={{
          mb: { xs: '12px', md: '26px' },
          mt: { xs: '12px', md: '20px' },
        }}
        variant="h2">
        {children}
      </Typography>
    ),
    h3: ({ children }) => (
      <Typography
        component={'h3'}
        sx={{
          mb: { xs: '12px', md: '26px' },
          mt: { xs: '12px', md: '20px' },
        }}
        variant="h3">
        {children}
      </Typography>
    ),
    h4: ({ children }) => (
      <Typography
        component={'h4'}
        sx={{
          mb: { xs: '12px', md: '26px' },
          mt: { xs: '12px', md: '20px' },
        }}
        variant="h4">
        {children}
      </Typography>
    ),
    normal: ({ children }) => (
      <EventText
        sx={{
          display: 'block',
          my: { xs: '12px', lg: '16px' },
          textAlign: 'justify',
        }}
        variant="body2">
        {children}
      </EventText>
    ),
    p: ({ children }) => <Typography variant="body2">{children}</Typography>,
    blockquote: ({ children }) => (
      <Typography
        component={'blockquote'}
        sx={{
          fontStyle: 'initial',
          display: 'block',
          pl: '16px',
          borderLeft: 'solid 2px #141414',
          my: { xs: '12px', lg: '16px' },
        }}
        variant="body2Kyiv">
        {children}
      </Typography>
    ),
  },
  marks: {
    link: ({ value, children }) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined;
      return (
        <Link component={RouterLink} variant="navigationRale" to={value?.href} target={target}>
          {children}
        </Link>
      );
    },
  },
  list: {
    bullet: ({ children }) => {
      return (
        <Typography
          component={'ul'}
          sx={{
            display: 'flex',
            gap: '8px',
            flexDirection: 'column',
            my: { xs: '12px', md: '12px', lg: '16px' },
            pl: { xs: '24px', md: '32px' },
            lineHeight: { sx: '24px', md: '28px' },
          }}
          variant="body2">
          {children}
        </Typography>
      );
    },

    number: ({ children }) => (
      <Typography
        component={'ol'}
        sx={{
          display: 'flex',
          gap: '8px',
          flexDirection: 'column',
          my: { xs: '12px', md: '16px' },
          lineHeight: { sx: '24px', md: '28px' },
        }}
        variant="body2">
        {children}
      </Typography>
    ),
  },
};
