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
import LandingPage from './pages/LandingPage.jsx';
import {Routes,Route} from 'react-router-dom';
import UserDrafts from './pages/UserDraft.jsx';
import Footer from './components/Footer.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/home' element={<Home />} />
        <Route path='/Auth' element={<AuthPage />} />
        <Route path='/post/:id' element={<PostDetail />} />
        <Route path='/profile' element={<UserProfile />} />
        <Route path='/userPosts' element={<UserPosts />} />
        <Route path='/resetPassword/:uid/:token' element={<ResetPassword />} />
        <Route path='/addPost' element={<AddPost />} />
        <Route path='/userDrafts' element={<UserDrafts />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
