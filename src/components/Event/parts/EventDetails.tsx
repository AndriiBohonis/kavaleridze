import { Box, BoxProps, Grow, Stack, styled } from '@mui/material';
import { PortableText } from '@portabletext/react';
import { FC } from 'react';
import { components } from '../prtableComponents';
import { PortableTextBlock } from '@portabletext/types';
interface EventDetailsProps {
  banner: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: PortableTextBlock[];
}

const EventDetails: FC<EventDetailsProps> = ({ banner, content }) => {
  console.log(content);
  const ImageBox = styled(Box)<BoxProps>(({ theme }) => ({
    borderRadius: '4px',
    overflow: 'hidden',

    [theme.breakpoints.only('sm')]: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  }));

  return (
    <Stack>
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
      <Box>
        <PortableText value={content} components={components} />
      </Box>
    </Stack>
  );
};

export default EventDetails;
