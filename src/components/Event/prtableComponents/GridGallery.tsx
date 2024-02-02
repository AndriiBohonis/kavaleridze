import { Box, Dialog, ImageList, ImageListItem, Typography } from '@mui/material';
import { FC, useState } from 'react';

import { urlFor } from '@/lib/client';
import { IImage, IPortableImgGallery } from '@/types';

const GridGallery: FC<IPortableImgGallery> = ({ value }) => {
  const { images, title } = value;
  const [open, setOpen] = useState(false);
  const [imgSrc, setImg] = useState<IImage>();
  const handleClickOpen = (img: IImage) => {
    setImg(img);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  console.log(value);

  if (!images) return null;
  return (
    <Box sx={{ mb: '12px' }}>
      <ImageList variant="quilted" cols={4} rowHeight={'auto'}>
        {images.map((item) => {
          if (item.asset)
            return (
              <ImageListItem key={item._key} cols={item.photoLayout.cols || 1} rows={item.photoLayout.rows || 1}>
                <img
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleClickOpen(item)}
                  src={urlFor(item).width(700).height(460).auto('format').url()}
                  alt={item.title || ''}
                  loading="lazy"
                />
              </ImageListItem>
            );
        })}
      </ImageList>

      <Dialog fullWidth={true} maxWidth={'md'} onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        {imgSrc && (
          <img
            style={{ width: '100%', objectFit: 'contain' }}
            width={'100%'}
            height={'auto'}
            src={urlFor(imgSrc).auto('format').url()}
            loading="lazy"
          />
        )}
      </Dialog>

      <Typography variant="body2Kyiv">{title}</Typography>
    </Box>
  );
};

export default GridGallery;
