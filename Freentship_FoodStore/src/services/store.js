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

export async function GetStore() {
  const store = [];
  const ref = doc(db, "food_stores", "4dpAvRWJVrvdbml9vKDL");
  const docSnap = await getDoc(ref);
  if (docSnap.exists()) {
    store.push(docSnap.data());
  } else {
    console.log("No such document!");
  }
  return store;
}

export async function GetAllOrder() {
  const allOrder = [];
  const orderRef = collection(db, "orders");
  const q = query(
    orderRef,
    where("food_store_id", "==", "4dpAvRWJVrvdbml9vKDL")
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((docRef) => {
    allOrder.push({
      ...docRef.data(),
      orderDate: docRef.data().order_date.seconds,
    });
  });
  return allOrder;
}

export async function GetFoods(id) {
  const docRef = doc(db, "foods", `${id}`);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
}