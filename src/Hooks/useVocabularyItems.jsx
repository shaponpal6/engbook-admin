import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../Firebase/Firebase.config";

const collectionName = "vocabularies"
const collectionName2 = "items"
const useVocabularyItems = (docId=null) => {
  const [toDos, setToDos] = useState([]);
  const [loading, setLoading] = useState(false);
  const getToDos = async () => {
    await onSnapshot(
      query(collection(db, collectionName,docId, collectionName2), orderBy("createdAt")),
      (docs) => {
        const allTodos = docs.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const currentUserToDos = allTodos.filter(
          (toDos) => toDos.author.uid === auth?.currentUser?.uid
        );
        setToDos(currentUserToDos);
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    if(docId) getToDos();
  }, []);

  return { toDos, loading };
};

export default useVocabularyItems;
