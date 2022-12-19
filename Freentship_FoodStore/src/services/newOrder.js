import { db } from "../services";
import {
  collection,
  updateDoc,
  query,
  doc,
  getDoc,
  onSnapshot,
  where,
} from "firebase/firestore";
export async function GetNewOrder(id) {
  const q = query(
    collection(db, "orders"),
    where("food_store_id", "==", `${id}`)
    // where("status", "==", 3)
  );
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const orders = [];
    querySnapshot.forEach((doc) => {
      orders.push(...doc.data());
    });
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

export async function UpdateOrderConfirm(id) {
  const washingtonRef = doc(db, "orders", `${id}`);
  // Set the "capital" field of the city 'DC'
  await updateDoc(washingtonRef, {
    status: 1,
  });
}
