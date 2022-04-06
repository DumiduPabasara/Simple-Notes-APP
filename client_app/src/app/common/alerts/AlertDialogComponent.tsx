import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { AlertDialog, AlertDialogSituation } from "../../model/alert";
import { observer } from "mobx-react-lite";
import { useStore } from "../../store/store";

interface Props {
  alert: AlertDialog;
  handleCloseAlertDialog: () => void;
}

export default observer(function AlertDialogComponent({
  alert,
  handleCloseAlertDialog,
}: Props) {
  const {
    noteStore: { deleteActivity },
  } = useStore();

  function handleOk() {
    switch (alert.situation) {
      case AlertDialogSituation.deleteNote:
        deleteActivity(alert.functionParams as string).then(() => {
          handleCloseAlertDialog();
        });
        break;
    }
  }

  return (
    <Dialog
      open={alert.isOpen}
      onClose={handleCloseAlertDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{alert.title}</DialogTitle>
      <DialogContent>
        {alert.description && alert.description !== "" && (
          <DialogContentText id="alert-dialog-description">
            {alert.description}
          </DialogContentText>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseAlertDialog}>
          {alert.generalCancelButtonName}
        </Button>
        <Button onClick={handleOk} autoFocus>
          {alert.generalOkButtonName}
        </Button>
      </DialogActions>
    </Dialog>
  );
});
