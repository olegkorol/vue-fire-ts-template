import { ActionTree } from "vuex";
import { State } from "./firestore.state";
import { firestoreAction } from "vuexfire";
import firestore from "@/firebase/firestore/async-firestore";

export const actions: ActionTree<State, any> = {
  bindUsers: firestoreAction(async ({ bindFirestoreRef }) => {
    const db = await firestore();
    // return the promise returned by `bindFirestoreRef`
    try {
      await bindFirestoreRef("users", db.collection("users"), {
        wait: true,
      });
    } catch (error) {
      console.error({ error });
    }
  }),
};
