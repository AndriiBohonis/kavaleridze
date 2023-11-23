import { Box, Typography } from '@mui/material';
import { FC } from 'react';

interface EventTitleProps {
  title: string;
  start?: string;
  end?: string;
}

const EventTitle: FC<EventTitleProps> = ({ title, start, end }) => {
  return (
    <Box
      sx={{
        padding: {
          lg: '40px 0',
          md: '32px 0',
          sm: '24px 0',
        },
      }}>
      <Typography variant="h1">{title}</Typography>

      {end ? (
        <Typography component={'p'} variant="subhead" sx={{ paddingTop: '16px' }}>
          {start} &mdash; {end}
        </Typography>
      ) : (
        <Typography component={'p'} variant="subhead" sx={{ paddingTop: '16px' }}>
          {start}
        </Typography>
      )}
    </Box>
  );
};

export default EventTitle;
