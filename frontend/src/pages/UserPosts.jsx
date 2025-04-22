import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import { useNavigate } from "react-router-dom";

const UserPosts = () => {
  const { userPosts, isLoggedIn, updatePost, deletePost } = useContext(StoreContext);
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [editPostData, setEditPostData] = useState({
    id: null,
    title: "",
    body: "",
    category: "Others",
  });

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/Auth");
    }
  }, [isLoggedIn]);

  const handleEditClick = (post) => {
    setEditPostData({
      id: post.id,
      title: post.title,
      body: post.body,
      category: post.category || "Others",
    });
    setIsEditing(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditPostData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    await updatePost(editPostData.id, {
      title: editPostData.title,
      body: editPostData.body,
      category: editPostData.category,
    });
    setIsEditing(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 mt-6 font-mono">
      <h2 className="text-3xl font-extrabold text-center mb-6 underline decoration-4 decoration-pink-500">
        My Posts
      </h2>

      {userPosts.length === 0 ? (
        <p className="text-gray-800 text-center text-lg">You haven't posted anything yet.</p>
      ) : (
        <div className="space-y-6">
          {userPosts.map((post) => (
            <div
              key={post.id}
              className="bg-yellow-100 border-4 border-black p-5 shadow-[6px_6px_0_0_#000] transition-all duration-200"
            >
              <h3 className="text-2xl font-bold mb-1 text-black">{post.title}</h3>
              <p className="text-gray-900 text-md">{post.body}</p>
              <p className="text-sm mt-2 italic text-pink-600">Category: {post.category}</p>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  className="bg-white text-black border-2 border-black px-4 py-1 hover:bg-yellow-300 transition-all duration-200"
                  onClick={() => handleEditClick(post)}
                >
                  ✏️ Edit
                </button>
                <button
                  className="bg-red-500 text-white border-2 border-black px-4 py-1 hover:bg-red-700 transition-all duration-200"
                  onClick={() => deletePost(post.id)}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Popup */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white border-4 border-black p-6 w-full max-w-md shadow-[6px_6px_0_0_#000]">
            <h3 className="text-2xl font-bold mb-4 text-center underline decoration-blue-500">
              Edit Post
            </h3>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={editPostData.title}
                  onChange={handleEditChange}
                  className="w-full border-2 border-black px-3 py-2 bg-yellow-50"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Body</label>
                <textarea
                  name="body"
                  value={editPostData.body}
                  onChange={handleEditChange}
                  className="w-full border-2 border-black px-3 py-2 bg-yellow-50"
                  rows="4"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Category</label>
                <select
                  name="category"
                  value={editPostData.category}
                  onChange={handleEditChange}
                  className="w-full border-2 border-black px-3 py-2 bg-yellow-50"
                  required
                >
                  <option value="Others">Others</option>
                  <option value="Travel">Travel</option>
                  <option value="Food">Food</option>
                  <option value="Tech">Tech</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  className="bg-gray-200 border-2 border-black text-black px-4 py-1 hover:bg-gray-400"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 border-2 border-black text-white px-4 py-1 hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPosts;
