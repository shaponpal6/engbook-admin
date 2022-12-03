import { signOut } from "firebase/auth";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import React, { useContext, useState } from "react";
import { useSendEmailVerification } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import { AiOutlineLogout } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { GoUnverified } from "react-icons/go";
import { MdVerified } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../App";
import Header from "../Components/Header";
import { auth, db } from "../Firebase/Firebase.config";
import { Link } from 'react-router-dom'
import Todo from '../Pages/Vocabulary/index';
import Sidebar from "../Components/Sidebar";
import Menu from "../Components/Menu";

const HomeLayout = (props) => {
  const { loading, setIsAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [sendEmailVerification, sending] = useSendEmailVerification(auth);
  /* handleLogOut */
  const handleLogOut = () => {
    signOut(auth).then(() => {
      toast.success("Log out successfully done.");
      navigate("/login");
      setIsAuth(false);
    });
  };

  /*  verify email  */
  const verifyEmail = () => {
    if (auth?.currentUser?.email === null) {
      return toast.error("Not available email of this credential");
    }
    sendEmailVerification(auth?.currentUser?.email);
    toast.success(
      `we sent you email with verification link on your ${auth?.currentUser?.email}`
    );
  };

  /* create todo field  */
  const [todoText, setTodoText] = useState("");
  const handleAddTodo = async () => {
    if (!todoText) return toast.error("Todo text is empty!");

    /* add todo on firebase storage */
    const todoRef = collection(db, "/todos");
    await addDoc(todoRef, {
      todo: todoText,
      createdAt: Timestamp.now().toDate(),
      author: {
        name: auth?.currentUser?.displayName,
        uid: auth?.currentUser?.uid,
      },
    })
      .then(() => {
        toast.success("Todo Added Successfully.");
        setTodoText("");
      })
      .catch((err) => console.log(err));
  };
  /* check user isVerified or not */
  const isUserVerified = auth?.currentUser?.emailVerified;

  return (
    <CreateTodoContainer>
      
      
      <div className="container">
      <Sidebar/>
      <div>
      
        <div className="title">
          <h3>
          <Link to='/home/'>
            {/* <span
              className={`${
                !auth?.currentUser.emailVerified ? "text-danger" : "colorize"
              }`}
            > */}
              {/* {auth?.currentUser?.displayName} */}
              {/* {auth?.currentUser.emailVerified ? (
                <>
                  <span className="cursor-pointer" title="Verified.">
                    <MdVerified />
                  </span>
                </>
              ) : (
                <>
                  <span
                    className="cursor-pointer text-danger"
                    title="Unverified."
                  >
                    <GoUnverified />
                  </span>{" "}
                  <small
                    onClick={() => verifyEmail()}
                    className="colorize cursor-pointer"
                    style={{ fontSize: "12px" }}
                  >
                    {sending ? "verifying...." : "verify"}
                  </small>
                </>
              )} */}
            {/* </span> */}
            </Link>
          </h3>
          <Menu/>
          <div className="action">
            {/* <img
              width={24}
              height={24}
              src={
                loading
                  ? "https://www.commpartners.com/wp-content/plugins/wp-meta-seo/assets/images/white-loader.gif"
                  : auth?.currentUser?.photoURL
              }
              alt={auth?.currentUser?.displayName}
            /> */}
            <span
              onClick={handleLogOut}
              className="cursor-pointer text-danger d-flex"
            >
              <AiOutlineLogout />
              {/* Log out */}
            </span>
          </div>
        </div>
        {props.children ?? null}
      </div>
      </div>
    </CreateTodoContainer>
  );
};

const CreateTodoContainer = styled.div`
  position: relative;
  margin: 1rem 0rem;
  .menu a{
    color: #fff;
    font-size: 16px;
    padding: 0 6px;
  }

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

export default HomeLayout;
