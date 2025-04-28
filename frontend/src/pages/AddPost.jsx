import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import { useNavigate } from "react-router-dom";

const AddPost = () => {
  const { isLoggedIn, addPost, addDraft } = useContext(StoreContext);
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    description: "",
    category: "Other",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/Auth");
    }
  }, [isLoggedIn, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    await addPost(formData);
    navigate("/home");
  };

  const handleSaveDraft = async (e) => {
    e.preventDefault();
    await addDraft(formData);
    alert("Saved as draft!");
    navigate("/home");
  };

  const handleCancel = () => {
    navigate("/home");
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow border border-gray-300">
      <h2 className="text-2xl font-semibold mb-4 text-center">Add New Post</h2>
      <form className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="body"
          placeholder="Body"
          value={formData.body}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          rows={4}
          required
        />
        <textarea
          name="description"
          placeholder="Short Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          rows={2}
          required
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="Other">Other</option>
          <option value="Food">Food</option>
          <option value="Tech">Tech</option>
          <option value="Travel">Travel</option>
        </select>

        <div className="flex gap-2">
          <button
            type="submit"
            onClick={handlePublish}
            className="flex-1 bg-black text-white py-2 rounded hover:bg-gray-800"
          >
            Publish Post
          </button>
          <button
            onClick={handleSaveDraft}
            className="flex-1 bg-gray-200 text-black py-2 rounded hover:bg-gray-300"
          >
            Save as Draft
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPost;
