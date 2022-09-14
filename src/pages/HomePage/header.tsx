import { Box, Button, Grid } from "@mui/material";
import React from "react";

import Logo from "../../components/ui/logo";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";

const Header: React.FC = () => {
  return (
    <Box
      display="flex"
      sx={{
        padding: "30px 0",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Logo type="dark" />

      <Grid container spacing={2} sx={{ width: 140 }}>
        <Grid item xs={6}>
          <Button sx={{ color: "primary.dark", width: 64 }}>
            <SearchIcon fontSize="large" />
          </Button>
        </Grid>

        <Grid item xs={6}>
          <Button>
            <MenuIcon
              fontSize="large"
              sx={{ color: "primary.dark", width: 64 }}
            />
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Header;
