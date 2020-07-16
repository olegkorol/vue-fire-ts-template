import firebase from "firebase/app";
import auth from "./async-auth";
import store from "@/store";

function catchError(error: any): void {
  const errorCode = error.code;
  const errorMessage = error.message;
  console.info({ errorCode, errorMessage });
  store.dispatch(`authentication/setLoadingState`, false);
  store.dispatch(`authentication/error`, error);
  // throw new Error(errorMessage);
}

export const createUserWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<void | firebase.auth.UserCredential> => {
  store.dispatch(`authentication/setLoadingState`, true);
  try {
    return (await auth()).createUserWithEmailAndPassword(email, password);
  } catch (error) {
    return catchError(error);
  }
};

export const signInWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<void | firebase.auth.UserCredential> => {
  store.dispatch(`authentication/setLoadingState`, true);
  try {
    const result = await (await auth()).signInWithEmailAndPassword(
      email,
      password
    );
    store.dispatch(`authentication/setLoadingState`, false);
    return result;
  } catch (error) {
    return catchError(error);
  }
};

export const signOut = async (): Promise<any> => {
  try {
    return (await auth()).signOut();
  } catch (error) {
    return catchError(error);
  }
};
