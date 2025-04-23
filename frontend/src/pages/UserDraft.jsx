import React, { useEffect, useState, useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import { useNavigate } from "react-router-dom";

const UserDrafts = () => {
  const {
    fetchDrafts,
    deleteDraft,
    addPost,
    editDraft,
    isLoggedIn,
  } = useContext(StoreContext);
  
  const [drafts, setDrafts] = useState([]);
  const [editingDraft, setEditingDraft] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: "",
    body: "",
    description: "",
    category: "Other",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/Auth");
    } else {
      loadDrafts();
    }
  }, [isLoggedIn]);

  const loadDrafts = async () => {
    const data = await fetchDrafts();
    setDrafts(data || []);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this draft?")) {
      await deleteDraft(id);
      loadDrafts();
    }
  };

  const handlePublish = async (draft) => {
    await addPost({
      title: draft.title,
      body: draft.body,
      description: draft.description,
      category: draft.category,
    });
    await deleteDraft(draft.id); // Remove draft after publishing
    loadDrafts();
  };

  const openEditForm = (draft) => {
    setEditingDraft(draft.id);
    setEditFormData({
      title: draft.title,
      body: draft.body,
      description: draft.description,
      category: draft.category,
    });
  };

  const closeEditForm = () => {
    setEditingDraft(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    await editDraft(editingDraft, editFormData);
    setEditingDraft(null);
    loadDrafts();
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <h1 className="text-4xl font-black text-center mb-10 bg-yellow-300 border-4 border-black p-4 rounded-lg shadow-xl">
        ✍️ Your Drafts
      </h1>

      {drafts.length === 0 ? (
        <p className="text-center text-black bg-pink-200 border-2 border-black p-3 rounded-lg font-bold">
          No drafts found.
        </p>
      ) : (
        <div className="space-y-4">
          {drafts.map((draft) => (
            <div
              key={draft.id}
              className="bg-white border-4 border-black rounded-lg p-5 flex justify-between items-center shadow-lg"
            >
              <div>
                <h2 className="text-2xl font-extrabold">{draft.title}</h2>
                <p className="text-sm font-bold bg-green-100 inline-block px-2 py-1 mt-1 border-2 border-black">
                  Category: {draft.category}
                </p>
                <p className="text-xs mt-1 text-gray-700">
                  🗓 Created: {new Date(draft.created_at).toLocaleString()}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => openEditForm(draft)}
                  className="bg-yellow-300 border-2 border-black px-4 py-2 rounded hover:bg-yellow-400 font-bold"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(draft.id)}
                  className="bg-red-400 border-2 border-black px-4 py-2 rounded hover:bg-red-500 font-bold"
                >
                  ❌ Delete
                </button>
                <button
                  onClick={() => handlePublish(draft)}
                  className="bg-green-300 border-2 border-black px-4 py-2 rounded hover:bg-green-400 font-bold"
                >
                  🚀 Publish
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {editingDraft && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white border-4 border-black rounded-lg p-6 w-full max-w-xl shadow-2xl relative">
            <h2 className="text-3xl font-black text-center mb-6 bg-purple-200 border-2 border-black p-2">
              🛠 Edit Draft
            </h2>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <input
                type="text"
                name="title"
                value={editFormData.title}
                onChange={handleEditChange}
                placeholder="Title"
                className="w-full border-2 border-black p-2 rounded bg-gray-100 font-bold"
                required
              />
              <textarea
                name="body"
                value={editFormData.body}
                onChange={handleEditChange}
                placeholder="Body"
                rows={4}
                className="w-full border-2 border-black p-2 rounded bg-gray-100 font-bold"
                required
              />
              <textarea
                name="description"
                value={editFormData.description}
                onChange={handleEditChange}
                placeholder="Short Description"
                rows={2}
                className="w-full border-2 border-black p-2 rounded bg-gray-100 font-bold"
                required
              />
              <select
                name="category"
                value={editFormData.category}
                onChange={handleEditChange}
                className="w-full border-2 border-black p-2 rounded bg-gray-100 font-bold"
              >
                <option value="Other">Other</option>
                <option value="Food">Food</option>
                <option value="Tech">Tech</option>
                <option value="Travel">Travel</option>
              </select>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={closeEditForm}
                  className="px-4 py-2 bg-gray-300 border-2 border-black rounded font-bold hover:bg-gray-400"
                >
                  ❎ Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-300 border-2 border-black rounded font-bold hover:bg-blue-400"
                >
                  💾 Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDrafts;
