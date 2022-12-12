import { db } from "../services";
import {
  collection,
  getDocs,
  query,
  doc,
  getDoc,
  onSnapshot,
  documentId,
  where,
} from "firebase/firestore";
import { async } from "@firebase/util";

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
      id: docRef.id,
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

export async function SeacrhOrderById() {
  const orders = [];
  const orderRef = collection(db, "orders");
  const q = query(orderRef, where(documentId(), "in", "3MiJP5Ywfn4mmbvFW4MN"));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((docRef) => {
    orders.push({
      ...docRef.data(),
      orderDate: docRef.data().order_date.seconds,
      id: docRef.id,
    });
  });
  return orders;
}

export async function GetAllCate() {
  const allCate = [];
  const cateRef = collection(db, "categories");
  const q = query(
    cateRef
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((docRef) => {
    allCate.push({
      ...docRef.data(),
      id: docRef.id,
    });
  });
  // console.log("logvate", allCate);
  return allCate;
 
}

export async function GetCategoriesByIds(ids) {
  const allCate = [];
  const cateRef = collection(db, "categories");
  const q = query(
    cateRef
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((docRef) => {
    if (ids.some(id => id === docRef.id)) {
      allCate.push({
        ...docRef.data(),
        id: docRef.id
      })
    }
  });
  return allCate;
}

export async function GetOpenTimeOfFoodStore() {
  const openTime = [];
  const timeRef = collection(db, "food_stores");
  const q = query(timeRef);
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((docRef)=>{
    openTime.push({
      ...docRef.data(),
      id: docRef.id,
    });
  });
  return openTime;
}