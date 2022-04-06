import { makeAutoObservable, runInAction } from "mobx";
import apis from "../api/apis";
import { Note } from "../model/note";

export default class NoteStore {
  noteRegistry = new Map<string, Note>();
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
    } catch (err) {
      console.error(err);
    } finally {
      this.loading = false;
    }
  };

  private setNote = (note: Note) => {
    this.noteRegistry.set(note.id, note);
  };

  private getNote = (noteId: string) => {
    return this.noteRegistry.get(noteId);
  };

  createNote = async (note: Note) => {
    this.loading = true;
    try {
      //const result = await apis.Notes.create(note);
      await apis.Notes.create(note);
      this.setNote(note);
    } catch (err) {
      console.error(err);
    } finally {
      this.loading = false;
    }
  };

  updateNote = async (note: Note) => {
    this.loading = true;
    try {
      await apis.Notes.update(note);
      this.setNote(note);
    } catch (err) {
      console.error(err);
    } finally {
      this.loading = false;
    }
  };

  setSelectedNote = (id: string) => {
    this.selectedNote = this.getNote(id);
  };

  deleteActivity = async (noteId: string) => {
    this.loading = true;
    try {
      await apis.Notes.delete(noteId);
      runInAction(() => {
        this.noteRegistry.delete(noteId);
      });
    } catch (err) {
      console.error(err);
    } finally {
      this.loading = false;
    }
  };

  /*   sampleCrudHelperMethodTemplate = async () => {
      this.loading = true;
      try{

      }catch(err){
          console.error(err)
      }finally{
          this.loading = false;
      }
  } */
}
