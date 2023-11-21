import { getContacts, getMuseumData } from '@/api';
import { useFetch } from '@/hooks/useFetch.ts';
import { IMuseumData } from '@/types.js';
import { Container, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import Section from '../Common/Section.tsx';
import FeedBackForm from '../Form/FeedBackForm.tsx';
import ModalDialog from '../Form/ModalDialog.tsx';
import Loader from '../Loader/Loader.tsx';
import { BoxContact, ContactButton, ContactItem, ContactLink, ContactList, ContactPaper, Paragraph, Title } from './styles';
import { useNavigate } from 'react-router-dom';
const Contacts: FC = () => {
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState();
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickButton = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    getContacts;
    const getData = async () => {
      setIsLoading(true);
      const response = await getContacts();
      return await response;
    };

    getData().then((res) => {
      setData(...res);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <Section variant="light">
        <Container>
          {isLoading ? (
            <Loader visible={isLoading} />
          ) : (
            data && (
              <ContactPaper>
                <ContactList>
                  <ContactItem>
                    <Title variant="h3">Подзвонити до нас</Title>
                    <ContactLink href={`tel:${data?.tel}`} className="Blondie">
                      <Typography component="span" variant="body1">
                        {data?.tel}
                      </Typography>
                    </ContactLink>
                  </ContactItem>
                  <ContactItem>
                    <Title variant="h3">Як нас знайти</Title>
                    <BoxContact>
                      <Paragraph>
                        <strong>Метро:</strong> {data?.underground}
                      </Paragraph>
                      <Paragraph>
                        <strong>Фунікулер:</strong> {data?.funicular}
                      </Paragraph>
                      <Paragraph>
                        <strong>Автобус:</strong> {data?.bus}
                      </Paragraph>
                    </BoxContact>
                  </ContactItem>
                  <ContactItem>
                    <Title variant="h3">Написати нам</Title>
                    <ContactButton onClick={handleClickOpen} variant="text">
                      <Typography component="span" variant="body1">
                        {data?.email}
                      </Typography>
                    </ContactButton>
                  </ContactItem>
                </ContactList>
              </ContactPaper>
            )
          )}
        </Container>
      </Section>

      <FeedBackForm handleClickButton={handleClickButton} handleClose={handleClose} open={open} />
      <ModalDialog handleClose={handleCloseDialog} open={openDialog} />
    </>
  );
};

export default Contacts;
