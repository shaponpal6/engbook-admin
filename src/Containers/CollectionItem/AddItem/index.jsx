import { deleteDoc, doc } from "firebase/firestore";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { BiCheckDouble } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import styled from "styled-components";
import { db } from "../../../Firebase/Firebase.config";
import useVocabularyItems from "../../../Hooks/useVocabularyItems";
import EditToDo from "./Edit";
import HomeLayout from "../../../Layouts/HomeLayout";
import CreateTodo from "./Create";

// const collectionName = "sentences"
const collectionName2 = "items"
const Todo = ({collectionName, open=false, docRef=null, docId=null}) => {
  const { toDos, loading } = useVocabularyItems(collectionName, docId);
 
 
  const [isEdit, setIsEdit] = useState(false);
  const [updateToDo, setUpdateToDo] = useState("");
  if (!open || !docRef) return null;
  return (
    <>
      <>
        <CreateTodo collectionName={collectionName} docRef={docRef} docId={docId}/>
        <EditToDo collectionName={collectionName} isEdit={isEdit} setIsEdit={setIsEdit} updateToDo={updateToDo} docId={docId}/>
        <TodoContainer>
          <div className="container" >
            {toDos.length > 0 ? (
              !loading ? (
                <>
                  <div className="container0">
                    {/* <div className="container1">
                      <div>Name</div>
                      <div className="container2">
                        <div style={{ width: "100px" }} >Action</div>
                        <div style={{ width: "100px" }}>Edit</div>
                      </div>
                    </div> */}
                    <div style={{width: '100%'}}>
                      {toDos.map((todo, ind) => <Item collectionName={collectionName} key={ind} item={todo} />)}
                    </div>
                  </div>

                </>
              ) : (
                "loading..."
              )
            ) : (
              "No toDos Yet."
            )}
          </div>
        </TodoContainer>
      </>
    </>
  );
};

const Item = ({ collectionName, item }) => {
  const { toDos, loading } = useVocabularyItems(item.id);
  const [isEdit, setIsEdit] = useState(false);
  const [updateToDo, setUpdateToDo] = useState("");
  /* handle remove toDos */
  const handleRemoveItem = async (id) => {
    console.log('id', id)
    const docRef = doc(db, collectionName, item.id, collectionName2, id);
    console.log('docRef', await deleteDoc(docRef))
     await deleteDoc(docRef)
      .then(() => {
        toast.success(`${id} toDos deleted successfully done.`);
      })
      .catch((err) => toast.error(err.message.split(":")[1]));
  };

  /* handle edit toDos */

  const handleEditItem = (id) => {
    console.log('id', id)
    setIsEdit(true);
    const findToDos = toDos.find((todo) => todo.id === id);
    setUpdateToDo({ title: findToDos.title, id: findToDos.id });
  };

  /* handle Add Item */

  const handleAddItem = (id) => {
    setIsEdit(true);
    const findToDos = toDos.find((todo) => todo.id === id);
    setUpdateToDo({ title: findToDos.todo, id: findToDos.id });
  };

  return (
    <ItemContainer key={item.id}>
      <EditToDo collectionName={collectionName} isEdit={isEdit} setIsEdit={setIsEdit} updateToDo={updateToDo} />
      <div  className="container1" style={{backgroundColor: '#653'}}>
        <div>{item.title}</div>
        <div className="container2">
          
          {/* <div>
            <span
              onClick={() => handleAddItem(item.id)}
              className="center check">
              <span style={{ fontSize: '12px' }}>Add +</span>
            </span>
          </div>
          <div>
            <span
              onClick={() => handleEditItem(item.id)}
              className="center"
            >
              <FiEdit />
            </span>
          </div> */}


          <div>
          <span
            className="cursor-pointer"
            onClick={() => handleRemoveItem(item.id)}
          >
            <BsTrash />
          </span>
        </div>
        </div>
      </div>
    </ItemContainer>
  );
};

const TodoContainer = styled.div`
  position: relative;
  color: var(--accent-color);
  
  .container0{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
  }
  .container1{
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    width: 100%;
    margin-bottom: 10px;
  }
  .container2{
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-around;
    width: 100px;
  }
  .check {
    font-size: 2rem;
    color: #07e530ec;
    cursor: pointer;
  }
  .center {
    display: flex;
    align-items: center;
    justify-content: flex-start
  }
`;
const ItemContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  .container1{
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    width: 100%;
    background: #546;
    padding: 10px 4px;
    margin-bottom: 6px;
    border-radius: 4px;
  }
  .container2{
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-around;
    width: 100px;

  }
  .check {
    font-size: 2rem;
    color: #07e530ec;
    cursor: pointer;
  }
  .center {
    display: flex;
    align-items: center;
    justify-content: flex-start
  }
`;

export default Todo;
