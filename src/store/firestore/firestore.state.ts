// In order for Vuexfire to work, initial states must be declared properly.
// For Firestore, collections and queries are bound as arrays while documents are bound as objects.
export class State {
  users: any = [];
  error: any = null;
  isActionPending = false;
}
