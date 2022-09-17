import { Box, Button, Container, Grid } from "@mui/material";
import FooterBtn from "../../components/ui/footerBtn";
import LoginIcon from "@mui/icons-material/Login";
import Logo from "../../components/ui/logo";

const Footer = () => {
  return (
    <footer>
      <Box
        sx={{ width: "100%", height: "400px", backgroundColor: "primary.dark" }}
      >
        <Container
          maxWidth="xl"
          sx={{
            overflow: "hidden",
            padding: "50px 0",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            flexDirection: {
              xl: "row",
              lg: "row",
              md: "row",
              sm: "row",
              xs: "row",
            },
            gap: {
              xl: "0px",
              lg: "0px",
              md: "0px",
              sm: "15px",
              xs: "15px",
            },
          }}
        >
          <Box width="118px">
            <Logo type="light" />
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: "15px",
              alignItems: "center",
              flexDirection: {
                xl: "row",
                lg: "row",
                md: "row",
                sm: "column",
                xs: "column",
              },
            }}
          >
            <FooterBtn text="frontend" />
            <FooterBtn text="qa" />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              gap: "15px",
              alignItems: "center",
            }}
          >
            <FooterBtn text="register" />
            <Button
              sx={{
                display: "flex",
                color: "primary.light",
                gap: "5px",

                fontWeight: "bold",
                fontSize: {
                  xl: "1.1rem",
                  lg: "1.1rem",
                  md: "0.9rem",
                  sm: "0.9rem",
                  xs: "0.8rem",
                },
                "&:hover": {
                  color: "primary.main",
                },
              }}
            >
              <LoginIcon fontSize="large" />
              Login
            </Button>
          </Box>
        </Container>
      </Box>
    </footer>
  );
};

export default Footer;
