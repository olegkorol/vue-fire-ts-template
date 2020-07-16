import firebase from "firebase/app";
import { isNil } from "lodash";

let asyncAuth: Promise<firebase.auth.Auth> | null = null;

// Lazy load firebase auth with async import is important for performance
// Savings: 222.3K (gzipped: 66.5K)

export default (): Promise<firebase.auth.Auth> => {
  if (isNil(asyncAuth)) {
    asyncAuth = import(
      /* webpackChunkName: "firebase-auth" */ "firebase/auth"
    ).then(
      (): firebase.auth.Auth => {
        return firebase.auth();
      }
    );
  }
  return asyncAuth;
};
