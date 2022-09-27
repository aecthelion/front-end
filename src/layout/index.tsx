import React from 'react';
import {Box, Button, Divider, Paper, Typography} from "@mui/material";
import Logo from "../components/ui/logo";
import SideMenu from "../components/sideMenu";
import {SearchOutlined} from "@mui/icons-material";

interface ILayout {
    children: JSX.Element
}

function Layout(props: ILayout) {
    return (
        <Box sx={{height: "100vh", width: "100vw", overflow: "hidden"}}>
            <header>
                <Box sx={{
                    padding: "20px",
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}>
                    <Logo type='white'/>
                    <Box>
                        <Button sx={{
                            display: "flex",
                            gap: "10px",
                            alignItems: "center",
                            textTransform: "none"
                        }}>
                            <SearchOutlined />
                            <Typography sx={{
                                color: "primary.dark",
                                fontWeight: "bold",
                            }}>Пошук</Typography>
                        </Button>
                    </Box>
                </Box>
                <Divider/>
            </header>
            <Box sx={{
                display: "flex",
                flexGrow: 1,
                height: "100%"
            }}>
                <SideMenu/>
                <Divider orientation='vertical'/>
                <Box sx={{flexGrow: 1, backgroundColor: "secondary.light"}}>
                    <main style={{height: "100%", padding: "30px 0"}}>
                        {props.children}
                    </main>
                </Box>
            </Box>

        </Box>
    );
}

export default Layout;