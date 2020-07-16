import firebase from "firebase/app";
import { isNil } from "lodash";

let asyncStorage: Promise<firebase.storage.Storage> | null = null;

// Lazy load cloud storage with async import is important for performance
// Savings: 107.9K (gzipped: 23.6K)

export default (): Promise<firebase.storage.Storage> => {
  if (isNil(asyncStorage)) {
    asyncStorage = import(
      /* webpackChunkName: "storage" */ "firebase/storage"
    ).then(
      (): firebase.storage.Storage => {
        return firebase.storage();
      }
    );
  }
  return asyncStorage;
};
