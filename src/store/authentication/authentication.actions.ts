import * as firebase from "firebase/app";
import { ActionTree } from "vuex";
import { State } from "./authentication.state";
import router from "@/router";
import { isNil } from "lodash";
import UsersDB from "@/firebase/firestore/collections/users-db";
import { createNewUserFromFirebaseAuthUser } from "@/helpers";

export const actions: ActionTree<State, any> = {
  /**
   * Callback fired when user logs in
   */
  login: async ({ commit }, firebaseAuthUser: firebase.User) => {
    const usersDB: UsersDB = new UsersDB();
    const { uid, emailVerified } = firebaseAuthUser;
    const userFromFirebase = await usersDB.read(uid);

    let user = isNil(userFromFirebase)
      ? await createNewUserFromFirebaseAuthUser(firebaseAuthUser)
      : userFromFirebase;

    // If Firebase Auth says that the email has been verified
    // but Firestore does not have this info updated yet
    if (emailVerified && !user.emailVerified) {
      // Note: update() returns the uid of the updated doc
      user = await usersDB.read(
        await usersDB.update({
          id: uid,
          emailVerified,
        })
      );
    }

    if (!emailVerified) {
      console.log("Email not verified. Sending email verification...");
      try {
        firebase.analytics().logEvent("send_email_verification");
        await firebaseAuthUser.sendEmailVerification();
      } catch (error) {
        firebase
          .analytics()
          .logEvent("send_email_verification_error", { error });
        commit("setError", error);
        console.info({ error });
      }
    }

    firebase.analytics().setUserId(uid);
    firebase.analytics().logEvent("user_login");
    commit("setUser", user);
    commit("setError", null);
  },

  /**
   * Callback fired when user logout
   */
  logout: ({ commit }) => {
    firebase.analytics().logEvent("user_logout");
    commit("setUser", null);
    commit("setError", null);
    const currentRouter = router.app.$route;
    if (!(currentRouter.meta && currentRouter.meta.authNotRequired)) {
      router.push("/login");
    }
  },

  /**
   * Callback fired when an authentication process is running
   */
  setLoadingState: ({ commit }, isActive) => {
    const action = isActive ? true : false;
    commit("setLoading", action);
  },

  /**
   * Callback fired when there is an authentication error
   */
  error: ({ commit }, error: Error) => {
    firebase.analytics().logEvent("auth_error", { error });
    commit("setUser", null);
    commit("setError", error);
  },
};
