import React, {useEffect, useState} from 'react';
import {Box, Container, LinearProgress, Paper, Typography} from "@mui/material";
import {Assignment, Contactless, ContactMail, Task} from "@mui/icons-material";
import Layout from "../../layout";
import {
    getVacancyApplications,
    updateVacancyApplication
} from "../../store/reducers/vacancyApplication/vacancyApplicationSlice";
import {useDispatch, useSelector} from "react-redux";
import FadeIn from "../../components/ui/fadeIn";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {COLORS} from "../../helpers/theme";
import moment from "moment";

const initialStages = [
    {
        id: 0,
        title: "Відправлено CV",
        icon: <ContactMail color="primary"/>,
        items: []
    },
    {
        id: 1,
        title: "Контакт з HR",
        icon: <Contactless color={"primary"}/>, items: []
    }, {
        id: 2,
        title: "Тестове / Співбесіда",
        icon: <Assignment color='primary'/>,
        items: []
    }, {
        id: 3,
        title: "Офер",
        icon: <Task color='primary'/>, items: []
    }]

const VacanciesPage = () => {
    const dispatch = useDispatch()
    const [stages, setStages] = useState([...initialStages])
    const {vacancyApplications, isLoading, isError, isSuccess, message} = useSelector(
        (state) => state.vacancyApplications
    );
    useEffect(() => {

        if (!vacancyApplications.length && !isError) {
            dispatch(getVacancyApplications({pageSize: 15, page: 1, searchParams: ''}))
        } else {
            if (vacancyApplications.length) {
                const updatedStages = [...initialStages]
                vacancyApplications.forEach(stage => {
                    updatedStages[Number(stage.status)].items.push(stage)
                })
                setStages(updatedStages)
            }
        }
    }, [vacancyApplications, dispatch])
    const onDragEnd = (result, stages, setStages) => {
        if (!result.destination) return;
        const {source, destination} = result;
            console.log(result)
        if (source.droppableId !== destination.droppableId) {
            let sourceColumn
            let destColumn
            stages.forEach(stage => {
                if (stage.id == source.droppableId) {
                    sourceColumn = {...stage}
                } else if (stage.id == destination.droppableId) {
                    destColumn = {...stage}
                }
            })
            const sourceItems = [...sourceColumn.items];
            const destItems = [...destColumn.items];
            const [removed] = sourceItems.splice(source.index, 1);
            console.log(removed)
            destItems.splice(destination.index, 0, removed);

            dispatch(updateVacancyApplication({_id: removed._id, status: destination.droppableId}))

        } else {
            const column = stages.find(stage => stage.id == source.droppableId);
            const copiedItems = [...column.items];
            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index, 0, removed);

        }
    };


    console.log(stages)
    return (
        <Layout>
            {isLoading ? <LinearProgress/> :
                <FadeIn type={"default"}>
                    <Container maxWidth={"xl"} sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "center",
                        height: "calc(100vh - 150px)",
                        gap: "40px"
                    }}>
                        <DragDropContext
                            onDragEnd={result => onDragEnd(result, stages, setStages)}
                        >
                            {stages.map((stage, index) =>
                                <div key={index + stage.title} style={{height: "100%"}}>
                                    <Paper
                                        sx={{
                                            padding: "20px",
                                            borderRadius: "10px",
                                            height: "100%",
                                            width: "300px",
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "10px",
                                                marginBottom: "10px"
                                            }}>
                                            {stage.icon}
                                            <Typography sx={{fontWeight: "bold"}}>{stage.title}</Typography>
                                        </Box>
                                        <Droppable droppableId={String(stage.id)} key={index}>
                                            {(provided, snapshot) =>
                                                (<div  {...provided.droppableProps}
                                                       ref={provided.innerRef}
                                                       style={{
                                                           height: "calc(100% - 40px)",
                                                           padding: "5px",
                                                           display: "flex",
                                                           flexDirection: "column",
                                                           background: snapshot.isDraggingOver
                                                               ? COLORS.mainLight
                                                               : COLORS.light,

                                                           borderRadius: "10px",
                                                       }}>
                                                    {stage.items.map((item, index) => {
                                                            return (
                                                                <Draggable
                                                                    draggableId={String(item.id)}
                                                                    index={index}
                                                                    key={item.id}
                                                                >
                                                                    {(provided, snapshot) => (
                                                                        <div ref={provided.innerRef}
                                                                             {...provided.draggableProps}
                                                                             {...provided.dragHandleProps}>
                                                                            <Paper sx={{
                                                                                display: "flex",
                                                                                alignItems: "flex-start",
                                                                                flexDirection: "column",
                                                                                padding: "10px",
                                                                                borderRadius: "8px",
                                                                                backgroundColor: "secondary.light",
                                                                                marginBottom: "7px"
                                                                            }} key={index + item.title}>
                                                                                <Typography
                                                                                    sx={{fontWeight: "bold"}}>{item.companyName}</Typography>
                                                                                <Typography
                                                                                    sx={{fontSize: "0.8rem"}}>{item.jobTitle}</Typography>
                                                                                <Typography
                                                                                    sx={{marginLeft: "auto"}}>{moment(new Date(item.updatedAt)).fromNow()}</Typography>
                                                                            </Paper>
                                                                        </div>)}
                                                                </Draggable>)
                                                        }
                                                    )}
                                                    {provided.placeholder}
                                                </div>)}
                                        </Droppable>
                                    </Paper>
                                </div>
                            )}
                        </DragDropContext>
                    </Container>
                </FadeIn>}
        </Layout>
    );
};

export default VacanciesPage;