import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LinearProgressBar from "../common/loading/LinearProgressBar";
import { observer } from "mobx-react-lite";

interface Props {
  handleClickOpen: () => void;
  setIsCreate: (flag: boolean) => void;
  loading: boolean;
}

export default observer(function AppBarNav({
  handleClickOpen,
  setIsCreate,
  loading,
}: Props) {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
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
        {loading ? <LinearProgressBar /> : null}
      </Box>
    </>
  );
});
