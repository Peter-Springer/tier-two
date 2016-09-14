const firebase = require('./firebase');
const auth = firebase.auth();
const database = firebase.database();

module.exports = {
  get allPurchases() {
    return database.ref(`${auth.currentUser.uid}/allPurchases`);
  },
  get monthlyBudget() {
    return database.ref(`${auth.currentUser.uid}/monthlyBudget`);
  },
  get remainingBudget() {
    return database.ref(`${auth.currentUser.uid}/remainingBudget`);
  }
}
