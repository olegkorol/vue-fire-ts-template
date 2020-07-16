import { User as FirebaseAuthUser } from "firebase/app";
import UsersDB from "@/firebase/firestore/collections/users-db";

export const createNewUserFromFirebaseAuthUser = (
  firebaseAuthUser: FirebaseAuthUser
) => {
  const { email, emailVerified } = firebaseAuthUser;
  const usersDb = new UsersDB();
  const user = {
    email,
    emailVerified,
  };

  return usersDb.create(user, firebaseAuthUser.uid);
};
