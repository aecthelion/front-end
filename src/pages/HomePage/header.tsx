import { Box, Button } from "@mui/material";
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

      <Box sx={{ width: 140, display: "flex", alignItems: "center" }}>
        <Button sx={{ color: "primary.dark" }}>
          <SearchIcon fontSize="large" />
        </Button>

        <Button>
          <MenuIcon fontSize="large" sx={{ color: "primary.dark" }} />
        </Button>
      </Box>
    </Box>
  );
};

export default Header;
