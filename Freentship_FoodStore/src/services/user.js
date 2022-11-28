import { db } from "../services";
import {
  collection,
  getDocs,
  query,
  doc,
  getDoc,
  onSnapshot,
  where,
} from "firebase/firestore";

export async function GetShipper(id) {
  const docRef = doc(db, "users", `${id}`);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
}
