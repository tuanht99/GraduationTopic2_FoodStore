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
export async function GetNewOrder() {
  // const order = [];
  // const orderRef = collection(db, "orders");
  // const q = query(
  //   orderRef,
  //   where("food_store_id", "==", '4dpAvRWJVrvdbml9vKDL'),
  //   where("status", "==", 3)
  // );
  // const querySnapshot = await getDocs(q);
  // querySnapshot.forEach((docRef) => {
  //     order.push({
  //     ...docRef.data(),
  //     orderDate: docRef.data().order_date.seconds,
  //   });

  // });
  // return order;
  const q = query(
    collection(db, "orders"),
    where("food_store_id", "==", "4dpAvRWJVrvdbml9vKDL"),
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
  const docRef = doc(db, "orders", '9sqoBr9vzZUk3VHdAIKk');
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return docSnap.data()
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
}