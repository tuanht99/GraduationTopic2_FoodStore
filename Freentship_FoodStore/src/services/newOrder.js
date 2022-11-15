import { db } from "../services";
import {
  collection,
  getDocs,
  updateDoc,
  query,
  doc,
  getDoc,
  onSnapshot,
  where,
} from "firebase/firestore";
import { async } from "@firebase/util";
export async function GetNewOrder() {
  const q = query(
    collection(db, "orders"),
    where("food_store_id", "==", "4dpAvRWJVrvdbml9vKDL")
    // where("status", "==", 3)
  );
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const orders = [];
    querySnapshot.forEach((doc) => {
      orders.push(...doc.data());
    });
    console.log("Current cities in CA: ", orders.join(", "));
  });
  unsubscribe;
}
export async function GetOrderDetail(id) {
  const docRef = doc(db, "orders", `${id}`);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
}

export async function UpdateStatus(id) {
  const washingtonRef = doc(db, "orders", `${id}`);
  // Set the "capital" field of the city 'DC'
  await updateDoc(washingtonRef, {
    status: 4,
  });
}
