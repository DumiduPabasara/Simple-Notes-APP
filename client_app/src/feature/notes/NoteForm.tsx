import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { v4 as uuid } from "uuid";

interface Props {
  open: boolean;
  handleClose: () => void;
}

export default function NoteForm({ open, handleClose }: Props) {
  const validationSchema = Yup.object({
    title: Yup.string().required("The note title is required"),
    description: Yup.string().required("The note description is required"),
  });

  function handleFormSubmit(note: any) {
    if (note.id === null && note.id === "") {
      let newNote = {
        ...note,
        id: uuid(),
      };
    } else {
    }
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create Note</DialogTitle>
      <Formik
        enableReinitialize
        validationSchema={validationSchema}
        initialValues={{ title: null, description: null }}
        onSubmit={(values) => handleFormSubmit(values)}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="title"
                name="title"
                label="Title"
                type="text"
                fullWidth
                variant="standard"
              />
              <TextField
                id="description"
                name="description"
                label="Description"
                placeholder="Description"
                multiline
                fullWidth
                variant="standard"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit" disabled={!isValid || !dirty}>
                Create
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}
