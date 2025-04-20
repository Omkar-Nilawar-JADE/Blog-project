import React, { useContext, useState } from 'react';
import { StoreContext } from '../context/StoreContext.jsx';
import { useNavigate } from 'react-router-dom';
import PostCard from "../components/PostCard.jsx";

const categories = ['Travel', 'Food', 'Tech', 'Other'];

const Home = () => {
  const { posts } = useContext(StoreContext);
  const [active, setActive] = useState('');
  const navigate = useNavigate();

  const toggleCategory = (cat) => {
    setActive(prev => (prev === cat ? '' : cat));
  };

  const displayed = active
    ? posts.filter(p => p.category.toLowerCase() === active.toLowerCase())
    : posts;

  return (
    <div className="bg-[#fdf6e3] min-h-screen p-6 flex flex-col items-center relative">
      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => toggleCategory(cat)}
            className={`px-4 py-2 rounded-full border-2 border-black shadow-[2px_2px_0_#000] transition-all duration-200
              ${active === cat ? 'bg-black text-white' : 'bg-[#fff0f9] text-black'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...displayed].reverse().map((post, i) => (
          <PostCard key={post.id} post={post} idx={i} />
        ))}
      </div>

      {/* Fixed Add Post Button */}
      <button
        onClick={() => navigate("/addPost")}
        className="fixed bottom-10 right-10 bg-black text-white px-5 py-3 rounded-full shadow-lg hover:bg-gray-800 transition"
        title="Add New Post"
      >
        + 
      </button>
    </div>
  );
};

export default Home;
