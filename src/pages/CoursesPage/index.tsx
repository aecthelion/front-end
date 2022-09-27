import React from 'react';
import {Box} from '@mui/material';
import Layout from "../../layout";
import CourseItem from "./courseItem";

const CoursesPage = () => {
    const courses = [{id: 0, title: "Frontend"}, {id: 1, title: "QA"}]
    return (
        <Layout>
            <Box sx={{
                display: "flex",
                justifyContent: "center",
                padding: {
                    xl: "40px",
                    lg: "40px",
                    md: "40px",
                    sm: "20px",
                    xs: "20px"
                },
                gap: "40px",
                flexWrap: "wrap"
            }}>
                {courses.map(course => <CourseItem course={course} key={course.id}/>)}
            </Box>
        </Layout>
    );
};

export default CoursesPage;