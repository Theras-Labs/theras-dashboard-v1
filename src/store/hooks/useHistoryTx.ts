import React, { useEffect, useState, useRef } from "react";
import { useUserDataStore } from "src/store/useUserDetail";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  where,
  orderBy,
  startAfter,
  limit,
} from "firebase/firestore";
import { db } from "firebase.config";

export function useHistoryTx(collectionName = "widget-msg", handlerName = "") {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { userID, userData } = useUserDataStore();
  const [error, setError] = useState(null);
  const [myNumber, setMyNumber] = useState(null);

  useEffect(() => {
    setIsLoading(true);

    if (!userData && !userData?.handler) return;

    const q = query(
      collection(db, collectionName),
      where("to", "==", userData?.handler)
      //   orderBy("createdAt", "desc") // todo fix
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const results = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(results);
        setIsLoading(false);
      },
      (error) => {
        setError(error);
        setIsLoading(false);
      }
    );

    return unsubscribe;
  }, [userData]);

  return { data, isLoading, error, setData, myNumber };
}
