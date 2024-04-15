const assert = require("assert");
const firebase = require("@firebase/testing");
const { clear } = require("console");

const MY_PROJECT_ID = "web-dancers";
const userTest1 = {
  uid: "user_id_1",
  name: "User One",
  email: "user_1@gmail.com",
};

const userTest2 = {
  uid: "user_id_2",
  name: "User Two",
  email: "user_2@gmail.com",
};

const dbConnectionSetting = {
  host: "127.0.0.1:8080",
  ssl: false,
};

function getFirestore(auth) {
  return firebase
    .initializeTestApp({ projectId: MY_PROJECT_ID, auth })
    .firestore();
}

describe("Test", () => {
  // test 1
  it("Can setup user 1", (done) => {
    setTimeout(() => {
      const db = getFirestore(userTest1);
      const userDoc = db.collection("users").doc(userTest1.uid);
      firebase.assertSucceeds(
        userDoc.set({ name: "User One", email: "user_1@gmail.com" })
      );
      done();
    }, 1000);
  });

  // test 2
  it("Can setup user 2", () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const db = getFirestore(userTest2);
        const userDoc = db.collection("users").doc(userTest2.uid);
        firebase.assertSucceeds(
          userDoc.set({ name: "User Two", email: "user_2@gmail.com" })
        );
        resolve();
      }, 1000);
    });
  });

  // test 3
  it("Can write to the user document with the same ID as the web user", async function () {
    this.timeout(10000);
    const db = getFirestore(userTest1);
    const userDoc = db
      .collection("users")
      .doc(userTest1.uid)
      .collection("blogs2")
      .doc();
    await firebase.assertSucceeds(
      userDoc.set({ blog: "write successfully from test 3" })
    );
  });

  // test 4
  it("Can write another blog to the user document with the same ID as the web user", async function () {
    this.timeout(10000);
    const db = getFirestore(userTest1);
    const userDoc = db
      .collection("users")
      .doc(userTest1.uid)
      .collection("blogs2")
      .doc();
    await firebase.assertSucceeds(
      userDoc.set({ blog: "write successfully from test 4" })
    );
  });

  // test 5
  it("Can't write to the user document without sign-in", async function () {
    this.timeout(10000);
    const db = getFirestore(null);
    const userDoc = db
      .collection("users")
      .doc(userTest1.uid)
      .collection("blogs2")
      .doc();
    await firebase.assertFails(
      userDoc.set({ blog: "should not write successfully from test 5" })
    );
  });

  // test 6
  it("Can read other users document with sign-in", async function () {
    this.timeout(10000);
    const db = getFirestore(userTest2);
    const userDoc = db
      .collection("users")
      .doc(userTest1.uid)
      .collection("blogs2");
    await firebase.assertSucceeds(userDoc.get());
  });

  // test 7
  it("Can read other users document without sign-in", async function () {
    this.timeout(10000);
    const db = getFirestore(null);
    const userDoc = db
      .collection("users")
      .doc(userTest1.uid)
      .collection("blogs2");
    await firebase.assertSucceeds(userDoc.get());
  });

  // test 8
  it("Handle database disconnecting error", async function () {
    this.timeout(10000);
    const db = getFirestore(null);
    db.settings(dbConnectionSetting);
    const userDoc = db
      .collection("users")
      .doc(userTest1.uid)
      .collection("blogs2");

    await db.terminate();

    try {
      await userDoc.get();
    } catch (error) {
      assert.equal(error.message, "The client has already been terminated.");
    }
  });

  // test 9
  it("Database reconnecting successfully", async function () {
    this.timeout(10000);
    // terminate the connection
    let db = getFirestore(null);
    db.settings(dbConnectionSetting);
    await db.terminate();
    // reinitialize the connection
    db = getFirestore(null);
    db.settings(dbConnectionSetting);
    const userDoc = db
      .collection("users")
      .doc(userTest1.uid)
      .collection("blogs2");

    await firebase.assertSucceeds(userDoc.get());
  });
});
