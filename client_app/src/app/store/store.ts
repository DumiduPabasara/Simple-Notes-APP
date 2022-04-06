import { createContext, useContext } from "react";
import NoteStore from "./noteStore";

interface Store {
  noteStore: NoteStore;
}

export const store: Store = {
  noteStore: new NoteStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
