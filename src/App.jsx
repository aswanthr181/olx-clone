import { useContext, useEffect } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import SignupPage from './Pages/Signup'
import LoginPage from './Pages/Login'
import CreatePage from './Pages/Create'
import { AuthContext, FirebaseContext } from './store/firebaseContex'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import Post from './store/PostContext'
import ViewPost from './Pages/ViewPost'



function App() {

  const { user, setUser } = useContext(AuthContext)
  const { firebase } = useContext(FirebaseContext)
  useEffect(() => {
    console.log(user);
    const auth = getAuth()

    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })

    // console.log(user.displayName);

  })

  return (
    <>
      <Post>
        <Routes>

          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/create' element={<CreatePage />} />
          <Route path='/view' element={<ViewPost/>} />


        </Routes>
      </Post>
    </>
  )
}

export default App
