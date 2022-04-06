import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

interface Props {
  handleClickOpen: () => void;
  setIsCreate: (flag: boolean) => void;
}

export default function AppBarNav({ handleClickOpen, setIsCreate }: Props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Notes
          </Typography>
          <Button
            color="inherit"
            onClick={() => {
              handleClickOpen();
              setIsCreate(true);
            }}
          >
            Create Note
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
