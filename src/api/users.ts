import { Friendship, User } from "../constants/types";
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

export const fetchAllUsers = () => {
  try {
    const q = query(collection(db, "users"), orderBy("createdAt", "desc"));
    onSnapshot(q, (querySnapshot) => {
      return querySnapshot.docs;
    });
  } catch (e) {
    return {
      error: "Unable to Load Users",
    };
  }
};

export const addUser = async (data: User) => {
  try {
    const docRef = await addDoc(collection(db, "users"), { ...data, createdAt: Timestamp.now() });
    console.log("Document written with ID: ", docRef.id);
    return "User data saved successfully";
  } catch (e) {
    console.error("Error adding document: ", e);
    return {
      message: "Error saving User",
    };
  }
};

export const addUserFriendship = async (data: Friendship) => {
  try {
    const taskDocRef1 = doc(db, "users", data.user_id_one);
    const taskDocRef2 = doc(db, "users", data.user_id_two);
    await updateDoc(taskDocRef1, {
      friends: [data.user_id_two],
    });
    await updateDoc(taskDocRef2, {
      friends: [data.user_id_one],
    });
    return "Added as Friend";
  } catch (e) {
    console.error("Error adding document: ", e);
    return {
      message: "Error adding friendship",
    };
  }
};
