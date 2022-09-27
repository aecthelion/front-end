import React from 'react';
import {PlayCircle, WorkOutlined} from "@mui/icons-material";
import {Box, Divider, Typography} from '@mui/material'
import {NavLink, useLocation} from "react-router-dom";
import {COLORS} from "../../helpers/theme";


const menuItems = [{
    pathname: '/courses',
    caption: 'Курси',
    icon: <PlayCircle/>
}, {
    pathname: '/vacancies',
    caption: 'Вакансії',
    icon: <WorkOutlined/>
}]

const SideMenu = () => {
    const location = useLocation()
    return (
        <nav>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                gap: "40px",
                width: "100px",
                padding: "40px 20px"
            }}>
                {menuItems.map((item, index) =>
                    <NavLink
                        to={item.pathname}
                        key={item.pathname + index}
                        style={{
                            display: "flex",
                            gap: "5px",
                            height: "45px",
                            alignItems: "center",
                            flexDirection: 'column',
                            color: COLORS.main,
                            textDecoration: "none",
                            position: "relative",

                        }}
                    >
                        {item.icon}
                        <Typography sx={{
                            color: "primary.dark",
                            fontWeight: "bold",
                            fontSize: "0.8rem"
                        }}>{item.caption}</Typography>
                        {location && location.pathname && location.pathname === item.pathname &&
                            <Divider orientation='vertical' sx={{
                                position: "absolute",
                                right: "-20px",
                                height: "100%",
                                width: "5px",
                                backgroundColor: "primary.main",
                                borderRadius: "8px"
                            }}/>
                        }
                    </NavLink>
                )}
            </Box>
        </nav>
    );
};

export default SideMenu;