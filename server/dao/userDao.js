const database = require("../config/firebase");
const _ = require("lodash");

const userDao = {
  addUser: async (user) => {
    return await database.collection("users").add(user);
  },
  getUsers: async () => {
    const usersRef = database.collection("users");
    const snapshot = await usersRef.get();

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return _.toArray(data);
  },
  getUser: async (id) => {
    const usersRef = database.collection("users").doc(id);
    const snapshot = await usersRef.get();

    if (!snapshot.exists) return;

    return { id: snapshot.id, ...snapshot.data() };
  },
};

module.exports = userDao;
