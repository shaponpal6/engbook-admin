import { signOut } from "firebase/auth";
import { addDoc,writeBatch, collection, Timestamp } from "firebase/firestore";
import React, { useContext, useState } from "react";
import { useSendEmailVerification } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import { AiOutlineLogout } from "react-icons/ai";
import { BsReply } from "react-icons/bs";
import { GoUnverified } from "react-icons/go";
import { MdVerified } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../../App";
import { auth, db } from "../../Firebase/Firebase.config";
import TextExtract from "../../Components/TextExtract"

// const collectionName = "sentences"
const CreateTodo = ({ collectionName }) => {

  /* create todo field  */
  const [todoText, setTodoText] = useState("");
  const handleAddTodo = async () => {
    if (!todoText) return toast.error("Text is empty!");
    const todoRef = collection(db, collectionName);
    await addDoc(todoRef, {
      title: todoText,
      createdAt: Timestamp.now().toDate(),
    })
      .then(() => {
        toast.success("Vocabulary Added Successfully.");
        setTodoText("");
      })
      .catch((err) => console.log(err));
  };

  /**
   * Use Batch Update
   * @param {*} items 
   * @returns 
   */
  const batchUpdate = async (items) => {
    if (!items || items.length < 1) return toast.error("list is empty!");
    const todoRef = collection(db, collectionName);
    items.forEach((doc) => {
       addDoc(todoRef, {
        title: doc,
        createdAt: Timestamp.now().toDate(),
      });
    });
  };
  
  /* check user isVerified or not */
  const isUserVerified = auth?.currentUser?.emailVerified;

  return (
    <CreateTodoContainer>
      
      <div className="container">
        {!isUserVerified &&
          auth?.currentUser?.providerData[0]?.providerId === "password" ? null : (
          <div className="wrapper">
            <p>
              <span className="colorize">Create Sentence Type</span>
            </p>
            <div className="todo-create-wrapper">
              <input
                type="text"
                id="create-todo"
                onChange={(e) => setTodoText(e.target.value)}
                value={todoText}
                placeholder="Create Vocabulary"
              />
              <button className="btn" onClick={handleAddTodo}>
                <BsReply />
              </button>
            </div>
            <TextExtract batchUpdate={batchUpdate} />
          </div>
        )}

      </div>
    </CreateTodoContainer>
  );
};

const CreateTodoContainer = styled.div`
  position: relative;
  margin: 1rem 0rem;
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: var(--secondary-color-alt);
    padding: 0.5rem 1rem;
    border-radius: 5px;
    color: var(--accent-color);
    span[title] {
      font-size: 0.9rem;
      margin: 0rem 0.3rem;
    }
    .action {
      position: relative;
      display: flex;
      gap: 1rem;
      img {
        border-radius: 50%;
      }
    }
  }
  .wrapper {
    max-width: min(100% - 2rem, 500px);
    margin: 1rem auto;
    h1 {
      text-align: center;
      margin: 1rem 0rem;
      color: var(--accent-color);
    }
  }
  .todo-create-wrapper {
    position: relative;
    background-color: var(--secondary-color-alt);
    padding: 0.4rem;
    display: flex;
    align-items: stretch;
    input {
      width: 100%;
      padding: 0.7rem;
      background-color: transparent;
      border: none;
      outline: none;
      font-size: 1rem;
      color: var(--accent-color);
    }
    button {
    }
  }
`;

export default CreateTodo;
