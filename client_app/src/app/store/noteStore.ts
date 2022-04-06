import { makeAutoObservable } from "mobx";
import apis from "../api/apis";
import { Note } from "../model/note";

export default class NoteStore {
  noteRegistry: Note[] = [];
  selectedNote: Note | undefined = undefined;
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  loadNotes = async () => {
    this.loading = true;
    try {
      const result = await apis.Notes.list();
      result.forEach((note) => this.setNote(note));
      this.loading = false;
    } catch (err) {
      console.log(err);
      this.loading = false;
    }
  };

  private setNote = (note: Note) => {
    this.noteRegistry.push(note);
  };
}
