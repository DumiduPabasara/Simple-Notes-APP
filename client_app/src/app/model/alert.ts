export interface AlertDialog {
  isOpen: boolean;
  title: string;
  type: AlertDialogType;
  situation: AlertDialogSituation;
  description: string;
  generalCancelButtonName: string;
  generalOkButtonName: string;
  functionParams: string | string[];
}

export enum AlertDialogType {
  confirm,
  inform,
}

export enum AlertDialogSituation {
  deleteNote,
}

export class AlertDialog implements AlertDialog {
  constructor() {
    this.isOpen = false;
    this.title = "";
    this.type = AlertDialogType.confirm;
    this.situation = AlertDialogSituation.deleteNote;
    this.description = "";
    this.functionParams = "";
    this.generalCancelButtonName = "Cancel";
    this.generalOkButtonName = "Ok";
  }
}
