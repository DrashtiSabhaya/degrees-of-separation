import { Friendship } from "../constants/types";
import { db } from "./firebase";
import {
  collection,
  addDoc,
  Timestamp,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
} from "firebase/firestore";

export const fetchAllUsers = async () => {
  try {
    const q = query(collection(db, "users"), orderBy("createdAt", "desc"));
    return new Promise((resolve) => {
      onSnapshot(q, async (querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
        resolve(data);
      });
    });
  } catch (e) {
    return {
      error: "Unable to Load Users",
    };
  }
};

export const addUser = async (username: string) => {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      username: username,
      createdAt: Timestamp.now(),
    });
    console.log("Document written with ID: ", docRef.id);
    return {
      data: {
        successMessage: "User data saved successfully",
        user: {
          id: docRef.id,
          username: username,
          friends: [],
        },
      },
    };
  } catch (e) {
    console.error("Error adding document: ", e);
    return {
      message: "Error while saving User",
    };
  }
};

export const addUserFriendship = async (data: Friendship) => {
  try {
    const taskDocRef1 = doc(db, "users", data.user1.id);
    const taskDocRef2 = doc(db, "users", data.user2.id);
    await updateDoc(taskDocRef1, {
      friends: [...(data.user1?.friends || []), data.user2.id],
    });
    await updateDoc(taskDocRef2, {
      friends: [...(data.user2?.friends || []), data.user1.id],
    });
    return {
      data: {
        message: "Added as Friend",
        user1: { ...data.user1, friends: [...(data.user1?.friends || []), data.user2.id] },
        user2: { ...data.user2, friends: [...(data.user2?.friends || []), data.user1.id] },
      },
    };
  } catch (e) {
    console.error("Error adding document: ", e);
    return {
      message: "Error adding friendship",
    };
  }
};
