import { Box, Divider, Link, Stack, Typography, styled, useTheme } from '@mui/material';
import { FC, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

const MAX_DESC_LENGTH = 200;

const ContentBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  rowGap: '16px',
  [theme.breakpoints.up('lg')]: {
    maxWidth: '800px',
  },
  [theme.breakpoints.between('md', 'lg')]: {
    maxWidth: '670px',
  },
}));

interface SearchListItemProps {
  id?: string;
  title?: string;
  description?: string;
  contentType?: string;
  pathName: string;
}

const SearchListItem: FC<SearchListItemProps> = ({ title, description, contentType, pathName }) => {
  const [isMouseOn, setIsMouseOn] = useState(false);
  const theme = useTheme();

  const isEventRoute = (id: string | undefined, contentType: string | undefined) => (contentType ? pathName : `/events/${id}`);

  const trimDescription = (desc: string, length: number): string => {
    if (desc.length > length) return desc.slice(0, length + 1) + '...';
    return desc;
  };

  return (
    <Box component={'li'}>
      <ContentBox>
        <Typography variant="body2" component={'p'} sx={{ color: theme.palette.text.secondary }}>
          Перейти на сторінку "
          <Link
            sx={{ color: 'inherit', textDecoration: 'underline', cursor: 'pointer' }}
            component={RouterLink}
            to={`${isEventRoute(pathName, contentType)}`}>
            {title}"
          </Link>
        </Typography>
        <Stack
          spacing={2}
          component={RouterLink}
          to={`${isEventRoute(pathName, contentType)}`}
          onMouseEnter={() => setIsMouseOn(true)}
          onMouseLeave={() => setIsMouseOn(false)}>
          <Typography
            variant="subhead"
            sx={{
              fontWeight: 600,
              color: isMouseOn ? theme.palette.primary.dark : 'inherit',
            }}>
            {title}
          </Typography>
          {description?.length && (
            <Typography
              component={'p'}
              sx={{
                fontSize: {
                  lg: '1.125rem',
                  md: '1rem',
                  sm: '0.875rem',
                },
                lineHeight: 1.5,
              }}>
              {trimDescription(description, MAX_DESC_LENGTH)}
            </Typography>
          )}
        </Stack>
      </ContentBox>
      <Divider
        sx={{
          width: '100%',
          height: '1px',
          bgcolor: theme.palette.gray.main,
          borderColor: theme.palette.gray.main,
          mt: '8px',
        }}
      />
    </Box>
  );
};

export default SearchListItem;
