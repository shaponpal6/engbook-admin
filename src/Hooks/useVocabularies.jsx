import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../Firebase/Firebase.config";

// const collectionName = "vocabularies"
const useVocabularies = (collectionName) => {
  const [toDos, setToDos] = useState([]);
  const [loading, setLoading] = useState(false);
  const getToDos = async () => {
    await onSnapshot(
      query(collection(db, collectionName), orderBy("createdAt")),
      (docs) => {
        const allTodos = docs.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        // const currentUserToDos = allTodos.filter(
        //   (toDos) => toDos.author.uid === auth?.currentUser?.uid
        // );
        setToDos(allTodos);
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    if(collectionName && collectionName !== "") getToDos();
  }, []);

  return { toDos, loading };
};

export default useVocabularies;
