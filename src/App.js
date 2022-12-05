import { createContext, useEffect, useState, Component } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import RequireAuth from './Auth/RequireAuth/RequireAuth';
import { auth } from './Firebase/Firebase.config';
import Home from './Pages/Home/Home';
import Header2 from './Components/Header';
import Vocabulary from './Pages/Vocabulary';
import Sentence from './Pages/Sentence';
import Grammar from './Pages/Grammar';
import Course from './Pages/Course';
import Improve from './Pages/Improve';
import News from './Pages/News';
import Story from './Pages/Story';
import Podcast from './Pages/Podcast';
import Quiz from './Pages/Quiz';
import Login from './Pages/Login/Login/Login';
import SignUp from './Pages/Login/SignUp/SignUp';
import Todo from './Pages/Todos';
export const AuthContext = createContext(null)
function App() {
  const [isAuth, setIsAuth] = useState(false)
  const [user, loading] = useAuthState(auth);


  useEffect(()=>{
      if(user?.uid){
          setIsAuth(true)
      }else{
          setIsAuth(false)
      }
  }, [user])

  return (
    <>
    <Toaster />
    <AuthContext.Provider value={{user, loading, isAuth,setIsAuth}}>
      {/* <Header2/> */}
    <Routes>
        <Route path='/improve' element={<RequireAuth><Improve /></RequireAuth>} />
        <Route path='/' element={<RequireAuth><Vocabulary /></RequireAuth>} />
        <Route path='/home' element={<RequireAuth><Vocabulary /></RequireAuth>} />
        <Route path='/vocabulary' element={<RequireAuth><Vocabulary /></RequireAuth>} />
        <Route path='/sentence' element={<RequireAuth><Sentence /></RequireAuth>} />
        <Route path='/grammar' element={<RequireAuth><Grammar /></RequireAuth>} />
        <Route path='/course' element={<RequireAuth><Course /></RequireAuth>} />
        <Route path='/news' element={<RequireAuth><News /></RequireAuth>} />
        <Route path='/podcast' element={<RequireAuth><Podcast /></RequireAuth>} />
        <Route path='/story' element={<RequireAuth><Story /></RequireAuth>} />
        <Route path='/quiz' element={<RequireAuth><Quiz /></RequireAuth>} />
        <Route path='/todos' element={<RequireAuth><Todo /></RequireAuth>} />
        <Route path='/login' element={<Login />} />
        <Route path='/sign-up' element={<SignUp />} />
    </Routes>
    </AuthContext.Provider>
    </>
  );
}

export default App;
