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
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("access"));

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

  const addComment = async (postId, body) => {
    try {
      const token = localStorage.getItem("access");
      if (!token) {
        throw new Error("User not logged in");
      }
  
      const res = await axios.post(
        `${url}api/addComment/`,
        { post_id: postId, body },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      return { success: true, comment: res.data };
    } catch (error) {
      console.error("Error adding comment:", error.response?.data || error.message);
      return {
        success: false,
        message: error.response?.data?.error || "Failed to add comment",
      };
    }
  };

  const deleteComment = async (commentId) => {
    try {
      const token = localStorage.getItem("access");
      if (!token) throw new Error("User not logged in");
  
      await axios.delete(`${url}api/deleteComment/${commentId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      // alert("Comment deleted successfully");
      // No need to refetch entire user or post unless needed
      return { success: true };
    } catch (error) {
      console.error("Error deleting comment:", error.response?.data || error.message);
      return {
        success: false,
        message: error.response?.data?.error || "Failed to delete comment",
      };
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
      navigate("/home");
    } catch (error) {
      alert("Login failed. Please check credentials.");
      console.error("Login error:", error);
    }
  };

  const registerUser = async (username, password, email) => {
    try {
      const response = await axios.post(
        `${url}api/register/`,
        { username, password, email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      const { access, refresh, message } = response.data;
  
      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);
  
      await fetchUserData();
      alert(message || "Registration successful");
      navigate("/home");
    } catch (error) {
      if (error.response && error.response.data) {
        const data = error.response.data;
        const errorMsg =
          data.error || // custom error from backend
          Object.values(data).flat().join("\n") || // serializer errors
          "Registration failed. Try again.";
  
        alert(errorMsg);
      } else {
        alert("Something went wrong. Please try again.");
      }
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
      fetchUserData();
    } catch (err) {
      console.error("Error adding post:", err);
    }
  };



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

  const addDraft = async (data) => {
    try {
      const res = await axios.post(`${url}api/addDraft/`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });
      return res.data;
    } catch (err) {
      console.error("Error saving draft:", err.response?.data || err.message);
    }
  };

  const fetchDrafts = async () => {
    try {
      const res = await axios.get(`${url}api/fetchDrafts/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });
      return res.data;
    } catch (err) {
      console.error("Error fetching drafts:", err.response?.data || err.message);
    }
  };

  const deleteDraft = async (draftId) => {
    try {
      const res = await axios.delete(`${url}api/deleteDraft/${draftId}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });
      return res.data;
    } catch (err) {
      console.error("Error deleting draft:", err.response?.data || err.message);
    }
  };

  const editDraft = async (draftId, updatedData) => {
    try {
      const res = await axios.put(`${url}api/editDraft/${draftId}/`, updatedData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });
      return res.data;
    } catch (err) {
      console.error("Error updating draft:", err.response?.data || err.message);
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
    fetchUserData,
    logoutUser,
    sendPasswordResetEmail,
    resetUserPassword,
    addPost,
    deletePost,
    updatePost,
    addDraft,
    fetchDrafts,
    editDraft,
    deleteDraft,
    addComment,
    deleteComment,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
