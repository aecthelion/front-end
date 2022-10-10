import { useEffect, useState } from 'react';
import {
  Box,
  Container,
  LinearProgress,
  Paper,
  Typography,
  Button,
} from '@mui/material';
import {
  AddBox,
  Assignment,
  Contactless,
  ContactMail,
  Task,
} from '@mui/icons-material';
import Layout from '../../layout';
import {
  getVacancies,
  updateVacancy,
  resetStatus,
} from '../../store/reducers/vacancy/vacancySlice';
import FadeIn from '../../components/ui/fadeIn';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { COLORS } from '../../helpers/theme';
import moment from 'moment';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { openCenterModal } from '../../store/reducers/modal/modalSlice';

const initialStages = [
  {
    id: 0,
    title: 'Відправлено CV',
    icon: <ContactMail color="primary" />,
    items: [],
  },
  {
    id: 1,
    title: 'Контакт з HR',
    icon: <Contactless color={'primary'} />,
    items: [],
  },
  {
    id: 2,
    title: 'Тестове / Співбесіда',
    icon: <Assignment color="primary" />,
    items: [],
  },
  {
    id: 3,
    title: 'Офер',
    icon: <Task color="primary" />,
    items: [],
  },
];

const VacanciesPage = () => {
  const dispatch = useAppDispatch();

  const [currentItemsIds, setCurrentItemIds] = useState({
    droppableTargetId: null,
    droppableSourceId: null,
  });
  const { vacancies, isLoading, isSuccess } = useAppSelector(
    (state) => state.vacancies
  );

  useEffect(() => {
    dispatch(getVacancies({ pageSize: 15, page: 1, searchParams: '' }));
  }, [dispatch]);

  useEffect(() => {
    if (
      isSuccess &&
      (currentItemsIds.droppableSourceId || currentItemsIds.droppableSourceId)
    ) {
      setCurrentItemIds({ droppableTargetId: null, droppableSourceId: null });
    }
    dispatch(resetStatus());
  }, [isLoading, isSuccess, currentItemsIds, dispatch]);

  const onDragEnd = async (result: any) => {
    if (!result.destination) return;
    const { source, destination, draggableId } = result;

    if (source.droppableId !== destination.droppableId) {
      setCurrentItemIds({
        droppableSourceId: source.droppableId,
        droppableTargetId: destination.droppableId,
      });

      dispatch(
        updateVacancy({
          _id: draggableId,
          status: destination.droppableId,
        })
      );
    }
  };

  const handleOpenModal = (status: number) => {
    dispatch(
      openCenterModal({
        type: 'AddNewVacancy',
        props: {
          status,
        },
      })
    );
  };

  return (
    <Layout>
      {isLoading && !vacancies.length ? (
        <LinearProgress />
      ) : (
        <FadeIn type={'default'}>
          <Container
            maxWidth={'xl'}
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'center',
              height: 'calc(100vh - 150px)',
              gap: '40px',
            }}
          >
            <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
              {initialStages.map((stage, index) => (
                <div key={index + stage.title} style={{ height: '100%' }}>
                  <Paper
                    sx={{
                      padding: '20px',
                      borderRadius: '10px',
                      height: '100%',
                      width: '300px',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '10px',
                          marginBottom: '10px',
                          height: '36px',
                        }}
                      >
                        {stage.icon}
                        <Typography sx={{ fontWeight: 'bold' }}>
                          {stage.title}
                        </Typography>
                      </Box>
                      <Button onClick={() => handleOpenModal(index)}>
                        <AddBox />
                      </Button>
                    </Box>
                    {(currentItemsIds.droppableSourceId &&
                      String(currentItemsIds.droppableSourceId) ===
                        String(stage.id)) ||
                    (currentItemsIds.droppableTargetId &&
                      String(currentItemsIds.droppableTargetId) ===
                        String(stage.id)) ? (
                      <div
                        style={{
                          height: 'calc(100% - 40px)',
                          padding: '5px',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'column',
                          background: COLORS.light,
                          borderRadius: '10px',
                        }}
                      >
                        <LinearProgress />
                      </div>
                    ) : (
                      <Droppable droppableId={String(stage.id)} key={index}>
                        {(provided, snapshot) => (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={{
                              height: 'calc(100% - 40px)',
                              padding: '5px',
                              display: 'flex',
                              flexDirection: 'column',
                              background: snapshot.isDraggingOver
                                ? COLORS.mainLight
                                : COLORS.light,

                              borderRadius: '10px',
                            }}
                          >
                            {vacancies &&
                              vacancies.map((item) =>
                                Number(item.status) === index ? (
                                  <Draggable
                                    draggableId={String(item._id)}
                                    index={index}
                                    key={item._id}
                                  >
                                    {(provided) => (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                      >
                                        <Paper
                                          sx={{
                                            display: 'flex',
                                            alignItems: 'flex-start',
                                            flexDirection: 'column',
                                            padding: '10px',
                                            borderRadius: '8px',
                                            backgroundColor: 'secondary.light',
                                            marginBottom: '7px',
                                          }}
                                        >
                                          <Typography
                                            sx={{ fontWeight: 'bold' }}
                                          >
                                            {item.companyName}
                                          </Typography>
                                          <Typography
                                            sx={{ fontSize: '0.8rem' }}
                                          >
                                            {item.jobTitle}
                                          </Typography>
                                          {item.updatedAt && (
                                            <Typography
                                              sx={{ marginLeft: 'auto' }}
                                            >
                                              {moment(item.updatedAt).fromNow()}
                                            </Typography>
                                          )}
                                        </Paper>
                                      </div>
                                    )}
                                  </Draggable>
                                ) : (
                                  ''
                                )
                              )}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    )}
                  </Paper>
                </div>
              ))}
            </DragDropContext>
          </Container>
        </FadeIn>
      )}
    </Layout>
  );
};

export default VacanciesPage;
