import { useState } from 'react'
import './App.css'
import Home from './pages/Home.jsx'
import Navbar from './components/Navbar.jsx'
import AuthPage from './pages/AuthPage.jsx';
import PostDetail from './pages/PostDetail.jsx';
import UserProfile from './pages/UserProfile.jsx';
import UserPosts from './pages/UserPosts.jsx';
import ResetPassword from './components/ResetPassword.jsx';
import AddPost from './pages/AddPost.jsx';
import {Routes,Route} from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Auth' element={<AuthPage />} />
        <Route path='/post/:id' element={<PostDetail />} />
        <Route path='/profile' element={<UserProfile />} />
        <Route path='/userPosts' element={<UserPosts />} />
        <Route path='/resetPassword/:uid/:token' element={<ResetPassword />} />
        <Route path='/addPost' element={<AddPost />} />
      </Routes>
    </>
  )
}

export default App
