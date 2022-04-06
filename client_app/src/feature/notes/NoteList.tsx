import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useStore } from "../../app/store/store";
import { observer } from "mobx-react-lite";
import {
  AlertDialog,
  AlertDialogSituation,
  AlertDialogType,
} from "../../app/model/alert";

interface Props {
  handleClickOpen: () => void;
  setIsCreate: (flag: boolean) => void;
  handleClickOpenAlertDialog: (alert: AlertDialog) => void;
}

export default observer(function NoteList({
  handleClickOpen,
  setIsCreate,
  handleClickOpenAlertDialog,
}: Props) {
  const { noteStore } = useStore();

  const { noteRegistry, setSelectedNote } = noteStore;

  function handleUpdate(noteId: string) {
    setSelectedNote(noteId);
    setIsCreate(false);
    handleClickOpen();
  }

  function handleDelete(noteId: string) {
    let alertObject: AlertDialog = {
      isOpen: true,
      description: "Are you sure you want to delete this Note ?",
      generalOkButtonName: "Yes",
      generalCancelButtonName: "No",
      title: "Confirmation",
      situation: AlertDialogSituation.deleteNote,
      type: AlertDialogType.confirm,
      functionParams: noteId,
    };
    handleClickOpenAlertDialog(alertObject);
  }

  return (
    <>
      {Array.from(noteRegistry, ([key, note]) => (
        <Card key={key}>
          <CardContent>
            <Typography variant="h4" component="div">
              {note.title}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Description
            </Typography>
            <Typography variant="body2">{note.description}</Typography>
          </CardContent>
          <CardActions
            sx={{
              WebkitAlignContent: "flex-end",
              display: "block",
              marginLeft: "75%",
            }}
          >
            <Button size="small" onClick={() => handleUpdate(note.id)}>
              Update
            </Button>
            <Button
              size="small"
              color="error"
              onClick={() => handleDelete(note.id)}
            >
              Delete
            </Button>
          </CardActions>
        </Card>
      ))}
    </>
  );
});
