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
import AsyncStorage from "@react-native-async-storage/async-storage";
const id = "WY5BZ0bcinh1nHPJG6X2MQmWxAu2"
export async function GetStore() {
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("foodStoreID");
      if (value !== null) {
        const store = [];
        const ref = doc(db, "food_stores", value);
        const docSnap = await getDoc(ref);
        if (docSnap.exists()) {
          store.push(docSnap.data());
        } else {
          console.log("No such document!");
        }
        return store;
      }
    } catch (e) {
      console.log("ErrorError");
    }
  };
}

export async function GetAllOrder() {
  // const getData = async () => {
  //   try {
  const value = await AsyncStorage.getItem("foodStoreID");

  if (value !== null) {
    const allOrder = [];
    const orderRef = collection(db, "orders");
    const q = query(orderRef, where("food_store_id", "==", value));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((docRef) => {
      allOrder.push({
        ...docRef.data(),
        orderDate: docRef.data().order_date.seconds,
        id: docRef.id,
      });
    });

    console.log("allOrder", allOrder);
    return allOrder;
  }
  // } catch (e) {
  //   console.log("ErrorError");
  // }
  // };
  // getData()
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
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("foodStoreID");
      if (value !== null) {
        const orders = [];
        const orderRef = collection(db, "orders");
        const q = query(orderRef, where(documentId(), "in", value));

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
    } catch (e) {
      console.log("ErrorError");
    }
  };
}

export async function GetAllCate() {
  const allCate = [];
  const cateRef = collection(db, "categories");
  const q = query(cateRef);
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
  const q = query(cateRef);
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((docRef) => {
    if (ids.some((id) => id === docRef.id)) {
      allCate.push({
        ...docRef.data(),
        id: docRef.id,
      });
    }
  });
  return allCate;
}

export async function GetOpenTimeOfFoodStore() {
  const openTime = [];
  const timeRef = collection(db, "food_stores");
  const q = query(timeRef);
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((docRef) => {
    openTime.push({
      ...docRef.data(),
      id: docRef.id,
    });
  });
  return openTime;
}

export async function GetAllRatting() {
  const allRating = [];
  const orderRef = collection(db, "ratting");
  const q = query(orderRef, where("Store_ID", "==", id));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((docRef) => {
    allRating.push({
      ...docRef.data(),
      id: docRef.id,
    });
  });
  return allRating;
}
