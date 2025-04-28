import React, { useContext, useState, useEffect } from 'react';
import { StoreContext } from '../context/StoreContext.jsx';
import { useNavigate } from 'react-router-dom';
import PostCard from "../components/PostCard.jsx";
import { FaThLarge, FaList } from 'react-icons/fa'; // For icons

const categories = ['Travel', 'Food', 'Tech', 'Other'];

const Home = () => {
  const { posts, isLoggedIn} = useContext(StoreContext);
  const [active, setActive] = useState('');
  const [isGridView, setIsGridView] = useState(true); // Added state for grid/list toggle
  const navigate = useNavigate();

  useEffect(() => {
    if(!isLoggedIn)
      navigate('/Auth') 
  },[isLoggedIn])

  const toggleCategory = (cat) => {
    setActive(prev => (prev === cat ? '' : cat));
  };

  const toggleView = () => {
    setIsGridView(prev => !prev); // Toggle between grid and list views
  };

  const displayed = active
    ? posts.filter(p => p.category.toLowerCase() === active.toLowerCase())
    : posts;

  return (
    <div className="bg-[#fdf6e3] min-h-screen p-6 flex flex-col items-center relative">
      {/* Category Filters + View Toggle */}
      <div className="w-full max-w-4xl flex flex-col items-center mb-8 relative">
        <div className="flex flex-wrap justify-center gap-4 mb-4">
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
        <button
          onClick={toggleView}
          className="absolute right-0 top-0 flex items-center justify-center p-2 bg-black text-white rounded-full shadow-lg hover:bg-gray-800 transition"
          title={isGridView ? 'Switch to List View' : 'Switch to Grid View'}
        >
          {isGridView ? <FaList /> : <FaThLarge />}
        </button>
      </div>

      {/* Posts Container */}
      {isGridView ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...displayed].reverse().map((post, i) => (
            <PostCard key={post.id} post={post} idx={i} />
          ))}
        </div>
      ) : (
        <div className="w-full max-w-4xl">
          {[...displayed].reverse().map(post => (
            <div
              key={post.id}
              onClick={() => navigate(`/post/${post.id}`)}
              className="cursor-pointer flex items-center border-b-2 border-black py-4 hover:bg-gray-100 transition rounded-lg"
            >
              <div className="flex-1">
                <h2 className="text-lg font-bold">{post.title}</h2>
                <p className="text-sm text-gray-600">{post.description}</p>
              </div>
              <div className="text-xs text-gray-500 ml-4 whitespace-nowrap">
                <span className="font-medium">{post.category}</span>
                <span className="mx-2">|</span>
                <span className="font-medium">{post.author}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Post Button */}
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
