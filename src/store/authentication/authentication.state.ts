import * as firebase from "firebase/app";

export class State {
  user: firebase.User | undefined | null = undefined;
  error: null | string = null;
  isLoading = false;
}
