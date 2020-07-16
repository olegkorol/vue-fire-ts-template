import firebase from "firebase/app";
import auth from "./async-auth";
import { isNil } from "lodash";
import store from "@/store";

(async () => {
  (await auth()).onAuthStateChanged((firebaseUser: firebase.User | null) => {
    const actionToDispatch: string = isNil(firebaseUser) ? "logout" : "login";
    store.dispatch(`authentication/${actionToDispatch}`, firebaseUser);
  });
})();
