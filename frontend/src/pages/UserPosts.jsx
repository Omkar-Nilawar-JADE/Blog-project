import React, { useContext, useEffect } from "react";
import { StoreContext } from "../context/StoreContext";
import { useNavigate } from "react-router-dom";

const UserPosts = () => {
  const { userPosts, isLoggedIn} = useContext(StoreContext);
  const navigate = useNavigate();

   useEffect(() => {
      if (!isLoggedIn) {
        navigate("/Auth");
      }
    }, [isLoggedIn]);

  return (
    <div className="max-w-3xl mx-auto p-6 mt-6">
      <h2 className="text-2xl font-bold mb-4 text-center">My Posts</h2>
      {userPosts.length === 0 ? (
        <p className="text-gray-600 text-center">You haven't posted anything yet.</p>
      ) : (
        <div className="space-y-4">
          {userPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white p-4 rounded-lg border border-black shadow-md"
            >
              <h3 className="text-xl font-semibold">{post.title}</h3>
              <p className="text-gray-700 mt-2">{post.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserPosts;
