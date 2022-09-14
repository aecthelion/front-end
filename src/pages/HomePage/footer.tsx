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
          }}
        >
          <Grid container>
            <Grid item xs={4}>
              <Logo type="light" />
            </Grid>
            <Grid
              item
              xs={4}
              sx={{
                display: "flex",
                gap: "30px",
                justifyContent: "center",
              }}
            >
              <FooterBtn text="frontend" size="normal" />
              <FooterBtn text="qa" size="normal" />
            </Grid>
            <Grid
              item
              xs={4}
              sx={{
                display: "flex",
                gap: "30px",
                justifyContent: "center",
              }}
            >
              <FooterBtn text="зареєструватись" size="large" />
              <Button
                sx={{
                  display: "flex",
                  color: "primary.light",
                  gap: "10px",

                  fontWeight: "bold",
                  fontSize: "1.1rem",
                  "&:hover": {
                    color: "primary.main",
                  },
                }}
              >
                <LoginIcon fontSize="large" />
                Login
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </footer>
  );
};

export default Footer;
