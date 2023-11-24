import { Box, BoxProps, Grow, Stack, Typography, TypographyProps, styled } from '@mui/material';
import { PortableText } from '@portabletext/react';
import { FC, ReactNode } from 'react';
interface EventDetailsProps {
  banner: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any;
}

interface IBlokProps {
  value: {
    blank: string;
    href: string;
  };
  children: ReactNode;
}
const components = {
  marks: {
    link: ({ value, children }: IBlokProps) => {
      const { blank, href } = value;
      console.log(value);
      return blank ? (
        <a href={href} target="_blank" rel="noopener">
          {children}
        </a>
      ) : (
        <a href={href}>{children}</a>
      );
    },
  },
};
const EventDetails: FC<EventDetailsProps> = ({ banner, content }) => {
  const ImageBox = styled(Box)<BoxProps>(({ theme }) => ({
    borderRadius: '4px',
    overflow: 'hidden',

    [theme.breakpoints.only('sm')]: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  }));

  const EventText = styled(Typography)<TypographyProps>(({ theme }) => ({
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
  return (
    <Stack
      sx={{
        rowGap: {
          lg: '40px',
          md: '32px',
          sm: '24px',
        },
      }}>
      <ImageBox>
        <Grow in={true} timeout={1000}>
          <Box
            component={'img'}
            src={banner}
            sx={{
              width: '100%',
              height: 'auto',
            }}
          />
        </Grow>
      </ImageBox>

      <Grow in={true} timeout={1200}>
        <EventText
          component={'div'}
          sx={{
            '& a': {
              color: (theme) => theme.palette.primary.light,
            },
            '& p': {
              paddingBottom: '10px',
            },
          }}>
          <PortableText value={content} components={components as any} />
        </EventText>
      </Grow>
    </Stack>
  );
};

export default EventDetails;
