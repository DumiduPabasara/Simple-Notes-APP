import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import NoteForm from "../../feature/notes/NoteForm";
import NoteList from "../../feature/notes/NoteList";
import LinearProgressBar from "../common/LinearProgressBar";
import { useStore } from "../store/store";
import AppBarNav from "./AppBarNav";

function App() {
  const [open, setOpen] = React.useState(false);
  const {
    noteStore: { loadNotes, loading, noteRegistry },
  } = useStore();

  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  const handleClickOpen = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="App">
      <AppBarNav handleClickOpen={handleClickOpen} />
      {loading ? <LinearProgressBar /> : null}
      <Container fixed>
        {noteRegistry.length > 0 ? <NoteList /> : <p>No Notes Yet!</p>}
        <NoteForm open={open} handleClose={handleClose} />
      </Container>
    </div>
  );
}

export default observer(App);
