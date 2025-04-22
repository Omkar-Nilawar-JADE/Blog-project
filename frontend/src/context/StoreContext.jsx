import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const navigate = useNavigate();

  const name = "Omkar Nilawar";
  const url = "http://127.0.0.1:8000/";

  const [posts, setPosts] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${url}api/fetchPosts/`);
      setPosts(response.data);
      console.log("Fetched posts:", response.data);
    } catch (error) {
      console.error("Error while fetching posts:", error);
    }
  };

  const fetchPostById = async (id) => {
    try {
      const response = await axios.get(`${url}api/fetchPosts/${id}/`);
      return response.data;
    } catch (error) {
      console.error("Error fetching single post:", error);
      return null;
    }
  };

  const fetchCommentsByPostId = async (id) => {
    try {
      const response = await axios.get(`${url}api/comments/${id}/`);
      return response.data;
    } catch (error) {
      console.error("Error fetching comments:", error);
      return [];
    }
  };

  const loginUser = async (username, password) => {
    try {
      const response = await axios.post(`${url}/api/login/`, { username, password });
      const { access, refresh, message } = response.data;

      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);

      await fetchUserData();
      alert(message || "Login successful");
      navigate("/");
    } catch (error) {
      alert("Login failed. Please check credentials.");
      console.error("Login error:", error);
    }
  };

  const registerUser = async (username, password, email) => {
    try {
      const response = await axios.post(`${url}api/register/`, {
        username,
        password,
        email,
      });

      const { access, refresh, message } = response.data;

      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);

      await fetchUserData();
      alert(message || "Registration successful");
      navigate("/");
    } catch (error) {
      alert("Registration failed. Try again.");
      console.error("Registration error:", error);
    }
  };

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("access");
      if (!token) return;

      const response = await axios.get(`${url}api/fetchUser/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { id, username, email, posts } = response.data;
      setUserInfo({ id, username, email });
      setUserPosts(posts);
      setIsLoggedIn(true);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setIsLoggedIn(false);
    }
  };


  const addPost = async (postData) => {
    try {
      const token = localStorage.getItem("access"); // Assuming you stored it
      const res = await axios.post(`${url}api/addPost/`, postData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Post added:", res.data);
      fetchPosts(); // Refresh posts
    } catch (err) {
      console.error("Error adding post:", err);
    }
  };


  // 👇 Add these two functions inside StoreContextProvider

  const deletePost = async (postId) => {
    try {
      const token = localStorage.getItem("access");
      if (!token) return;

      await axios.delete(`${url}api/deletePost/${postId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Post deleted successfully");
      fetchUserData(); // Refresh userPosts
      fetchPosts();    // Optional: refresh global posts if needed
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post");
    }
  };

  const updatePost = async (postId, updatedData) => {
    try {
      const token = localStorage.getItem("access");
      if (!token) return;

      const res = await axios.put(`${url}api/updatePost/${postId}/`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Post updated successfully");
      fetchUserData(); // Refresh userPosts
      fetchPosts();    // Optional: refresh global posts if needed
      return res.data;
    } catch (error) {
      console.error("Error updating post:", error);
      alert("Failed to update post");
      return null;
    }
  };


  const logoutUser = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.setItem("logout", Date.now()); // Broadcast logout to other tabs

    setUserInfo(null);
    setUserPosts([]);
    setIsLoggedIn(false);
    alert("Logged out successfully");
    navigate("/");
  };

  const sendPasswordResetEmail = async (email) => {
    try {
      const res = await axios.post(`${url}api/forgotPassword/`, { email });
      return { success: true, message: res.data.message };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.error || "Failed to send reset email",
      };
    }
  };

  const resetUserPassword = async (uid, token, password) => {
    try {
      const res = await axios.post(`${url}api/resetPassword/`, {
        uid,
        token,
        password,
      });

      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      localStorage.setItem("logout", Date.now()); // Sync logout to all tabs

      setUserInfo(null);
      setUserPosts([]);
      setIsLoggedIn(false);

      return { success: true, message: res.data.message };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.error || "Password reset failed",
      };
    }
  };

  useEffect(() => {
    fetchPosts();
    const token = localStorage.getItem("access");
    if (token) {
      fetchUserData();
      setIsLoggedIn(true);
    }

    const handleStorageChange = (event) => {
      if (
        (event.key === "access" && event.newValue === null) ||
        event.key === "logout"
      ) {
        setIsLoggedIn(false);
        setUserInfo(null);
        setUserPosts([]);
        navigate("/Auth");
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const contextValue = {
    name,
    url,
    posts,
    fetchPosts,
    fetchPostById,
    fetchCommentsByPostId,
    loginUser,
    registerUser,
    isLoggedIn,
    userInfo,
    userPosts,
    logoutUser,
    sendPasswordResetEmail,
    resetUserPassword,
    addPost,
    deletePost,
    updatePost,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
