import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { v4 as uuid } from "uuid";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/store/store";
import { Note } from "../../app/model/note";

interface Props {
  open: boolean;
  handleClose: () => void;
  note?: Note;
  isCreate: boolean;
}

export default observer(function NoteForm({
  open,
  handleClose,
  note,
  isCreate,
}: Props) {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [editNote, setEditNote] = useState<Note | undefined>(undefined);

  const {
    noteStore: { createNote, updateNote, setSelectedNote },
  } = useStore();

  function reset() {
    setEditNote(undefined);
    setTitle("");
    setDescription("");
  }

  useEffect(() => {
    if (!isCreate) {
      if (note !== undefined) {
        setEditNote(note);
        setTitle(note!.title);
        setDescription(note!.description);
      }
    } else {
      reset();
    }
  }, [note, isCreate]);

  function handleFormSubmit() {
    if (isCreate) {
      let newNote: Note = {
        id: uuid(),
        title: title,
        description: description,
      };
      createNote(newNote);
      reset();
      handleClose();
    } else {
      if (editNote !== undefined) {
        if (editNote.title !== title || editNote.description !== description) {
          let updatedNote: Note = {
            id: editNote.id,
            title: title,
            description: description,
          };
          updateNote(updatedNote);
        }
        //reset();
        handleClose();
      } else {
        console.error("No edit note selected");
      }
    }
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        {isCreate ? <p>Create Note </p> : <p>Update Note</p>}
      </DialogTitle>
      <DialogContent>
        <TextField
          required
          autoFocus
          margin="dense"
          id="title"
          name="title"
          label="Title"
          type="text"
          fullWidth
          variant="standard"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          required
          id="description"
          name="description"
          label="Description"
          placeholder="Description"
          multiline
          fullWidth
          variant="standard"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          type="submit"
          disabled={title === "" || description === ""}
          onClick={handleFormSubmit}
        >
          {isCreate ? <p>Create</p> : <p>Update</p>}
        </Button>
      </DialogActions>
    </Dialog>
  );
});
