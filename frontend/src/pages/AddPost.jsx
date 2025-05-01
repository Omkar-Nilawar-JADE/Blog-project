import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import { useNavigate } from "react-router-dom";

const AddPost = () => {
  const { isLoggedIn, addPost, addDraft } = useContext(StoreContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    body: "",
    description: "",
    category: "Other",
  });

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/Auth");
    }
  }, [isLoggedIn, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const action = e.nativeEvent.submitter?.value;

    if (action === "publish") {
      const { title, body,category } = formData;
      if (!title || !body || !category) {
        alert("Please fill in all fields to publish the post.");
        return;
      }
      await addPost(formData);
      navigate("/home");
    } else if (action === "draft") {
      if (!formData.title.trim()) {
        alert("Please add a title to save the draft.");
        return;
      }
      await addDraft(formData);
      alert("Saved as draft!");
      navigate("/home");
    }
  };

  const handleCancel = () => {
    navigate("/home");
  };

  return (
    <div className="w-full min-h-screen bg-[#B5D6F6] p-4 md:p-10">
      <div className="max-w-5xl w-full mx-auto">
        {/* 🧾 Form */}
        <div className="w-full max-w-xl mx-auto bg-yellow-50 p-8 rounded-lg shadow-2xl border-4 border-black border-solid relative my-auto">
          <h2 className="text-3xl font-bold mb-4 text-center tracking-tight font-mono text-black border-b-4 border-black pb-2">
            <img
              src="/duck.gif"  // Replace this URL with your desired duck GIF URL
              alt="Duck"
              className="inline-block rounded-full w-15 h-15 mr-2 border-3 border-black  bg-gray-500"  // Adjust size as needed
            />
            Add New Post
          </h2>
          <form onSubmit={handleSubmit} className="space-y-3 font-mono text-sm text-black">
            <input
              type="text"
              name="title"
              placeholder="Post Title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border-2 border-black rounded-none bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <textarea
              name="body"
              placeholder="Body"
              value={formData.body}
              onChange={handleChange}
              className="w-full p-2 border-2 border-black rounded-none bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
              rows={4}
            />
            <textarea
              name="description"
              placeholder="Short Description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border-2 border-black rounded-none bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
              rows={2}
            />
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 border-2 border-black rounded-none bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              <option value="Other">❔ Other</option>
              <option value="Food">🍽️ Food</option>
              <option value="Tech">💻 Tech</option>
              <option value="Travel">🌍 Travel</option>
            </select>

            <div className="flex gap-2 font-mono text-sm font-semibold">
              <button
                type="submit"
                value="publish"
                className="flex-1 bg-black text-yellow-300 py-2 border-2 border-black hover:bg-yellow-300 hover:text-black transition-all duration-200"
              >
                PUBLISH
              </button>
              <button
                type="submit"
                value="draft"
                className="flex-1 bg-white text-black py-2 border-2 border-black hover:bg-gray-200 transition-all duration-200"
              >
                SAVE DRAFT
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 bg-red-600 text-white py-2 border-2 border-black hover:bg-red-700 transition-all duration-200"
              >
                CANCEL
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
