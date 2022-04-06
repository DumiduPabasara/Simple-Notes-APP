import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useStore } from "../../app/store/store";
import { observer } from "mobx-react-lite";

export default observer(function NoteList() {
  const { noteStore } = useStore();

  const { noteRegistry } = noteStore;

  return (
    <>
      {noteRegistry.map((note) => (
        <Card key={note.id}>
          <CardContent>
            <Typography variant="h4" component="div">
              {note.title}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Description
            </Typography>
            <Typography variant="body2">{note.description}</Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Update</Button>
            <Button size="small" color="error">
              Delete
            </Button>
          </CardActions>
        </Card>
      ))}
    </>
  );
});
