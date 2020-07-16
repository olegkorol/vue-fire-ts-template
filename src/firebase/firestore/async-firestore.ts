import firebase from "firebase/app";
import { isNil } from "lodash";

let asyncFirestore: Promise<firebase.firestore.Firestore> | null = null;

// Lazy load firestore with async import is important for performance
// Savings: 358.6K (gzipped: 89.2K)

export default (): Promise<firebase.firestore.Firestore> => {
  if (isNil(asyncFirestore)) {
    asyncFirestore = import(
      /* webpackChunkName: "firestore" */ "firebase/firestore"
    ).then(
      (): firebase.firestore.Firestore => {
        firebase.firestore().settings({});
        firebase.firestore().enablePersistence({ synchronizeTabs: true });
        return firebase.firestore();
      }
    );
  }
  return asyncFirestore;
};
