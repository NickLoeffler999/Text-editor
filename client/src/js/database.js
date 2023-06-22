import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  // Creates the connection to the database
  const jateDB = await openDB("jate", 1);
  // Creates a new transaction and specifies the database and data privileges.
  const tx = jateDB.transaction("jate", "readwrite");
  // This open up the desired object store
  const store = tx.objectStore("jate");
  // Adds the content to the object store
  const request = store.add(content);

  const result = await request;
  console.log("Added to database", result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const jateDB = await openDB("jate", 1);
  const tx = jateDB.transaction("jate", "readonly");
  const store = tx.objectStore("jate");
  const request = store.getAll();

  const result = await request;
  console.log("Got from database", result);
  return result;
};

initdb();
