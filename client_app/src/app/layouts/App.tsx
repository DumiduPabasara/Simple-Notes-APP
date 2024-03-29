import Container from "@mui/material/Container";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import NoteForm from "../../feature/notes/NoteForm";
import NoteList from "../../feature/notes/NoteList";
import LinearProgressBar from "../common/loading/LinearProgressBar";
import { useStore } from "../store/store";
import AppBarNav from "./AppBarNav";
import "./App.css";
import { AlertDialog } from "../model/alert";
import AlertDialogComponent from "../common/alerts/AlertDialogComponent";
import { Divider } from "@mui/material";

function App() {
  const [open, setOpen] = React.useState(false);
  const [alert, setAlert] = React.useState<AlertDialog>(new AlertDialog());
  const [isCreate, setIsCreate] = React.useState(false);
  const {
    noteStore: { loadNotes, loading, noteRegistry, selectedNote },
  } = useStore();

  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  const handleClickOpenNoteForm = () => {
    setOpen(!open);
  };

  const handleCloseNoteForm = () => {
    setOpen(false);
  };

  const handleClickOpenAlertDialog = (alert: AlertDialog) => {
    setAlert(alert);
  };

  const handleCloseAlertDialog = () => {
    setAlert(new AlertDialog());
  };

  return (
    <div className="App">
      <AppBarNav
        handleClickOpen={handleClickOpenNoteForm}
        setIsCreate={setIsCreate}
        loading={loading}
      />
      <Divider sx={{ marginTop: 1 }} />
      <Container fixed sx={{ backgroundColor: "blueviolet", marginTop: 7.5 }}>
        {loading ? <LinearProgressBar /> : null}
        {noteRegistry.size > 0 ? (
          <NoteList
            handleClickOpen={handleClickOpenNoteForm}
            setIsCreate={setIsCreate}
            handleClickOpenAlertDialog={handleClickOpenAlertDialog}
          />
        ) : (
          <p>No Notes Yet!</p>
        )}
        <>
          <NoteForm
            open={open}
            handleClose={handleCloseNoteForm}
            note={selectedNote}
            isCreate={isCreate}
          />
          <AlertDialogComponent
            alert={alert}
            handleCloseAlertDialog={handleCloseAlertDialog}
          />
        </>
        {loading ? <LinearProgressBar /> : null}
      </Container>
    </div>
  );
}

export default observer(App);
