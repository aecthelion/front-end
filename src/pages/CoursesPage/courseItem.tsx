import React from 'react';
import {Box, Button, Paper, Typography} from "@mui/material";
import {BugReport, Javascript} from "@mui/icons-material";

interface ICourseItem {
    title: string,
}

interface ICourseProps {
  course: ICourseItem
}

const CourseItem = ({course}: ICourseProps) => {

    return (
        <Button sx={{
            borderRadius: "12px",
            padding: "5px",
        }}>
            <Paper sx={{
                width: {
                    xl: "400px",
                    lg: "400px",
                    md: "300px",
                    sm: "300px",
                    xs: "170px"
                },
                height: "150px",
                borderRadius: "12px",
                padding: "20px",
                display: "flex",
                alignItems: "flex-start",
                "&:hover": {
                    backgroundColor: "rgba(59,117,126, 0.5)",
                    transition: "background-color 500ms linear",
                }
            }}>
                <Box sx={{
                    display: "flex",
                    gap: "20px",
                    alignItems: "center",
                    flexWrap: "wrap"
                }}>
                    <Box sx={{
                        height: "50px",
                        width: "50px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: 'secondary.light',
                        borderRadius: "50%",
                    }}>
                        {course.title === "Frontend" ? <Javascript fontSize='large'/> : <BugReport/>}
                    </Box>
                    <Typography sx={{
                        color: 'primary.dark',
                        fontWeight: "bold",
                        fontSize: "1.3rem"
                    }}>{course.title}</Typography>
                </Box>
            </Paper>
        </Button>
    );
};

export default CourseItem;