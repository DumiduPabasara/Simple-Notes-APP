import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";
import CommentStore from "./commentStore";
import CommonStore from "./commonStore";
import ModalStore from "./modalStore";
import ProfileStore from "./profileStore";
import TestStore1 from "./testStore1";
import TestStore2 from "./testStore2";
import UserStore from "./userStore";

interface Store {
  activityStore: ActivityStore;
  commonStore: CommonStore;
  userStore: UserStore;
  profileStore: ProfileStore;
  modalStore: ModalStore;
  commentStore: CommentStore;
  testStore1: TestStore1;
  testStore2: TestStore2;
}

export const store: Store = {
  activityStore: new ActivityStore(),
  commonStore: new CommonStore(),
  userStore: new UserStore(),
  profileStore: new ProfileStore(),
  modalStore: new ModalStore(),
  commentStore: new CommentStore(),
  testStore1: new TestStore1(),
  testStore2: new TestStore2(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
