import React, { useContext, useState, useEffect } from 'react';
import { StoreContext } from '../context/StoreContext.jsx';
import { useNavigate } from 'react-router-dom';
import PostCard from "../components/PostCard.jsx";
import Masonry from 'react-masonry-css';
import {
  FaThLarge, FaList, FaPlane,
  FaUtensils, FaLaptopCode, FaQuestion
} from 'react-icons/fa';
import { MdSearch } from 'react-icons/md';
import Footer from '../components/Footer.jsx';

const categories = ['Travel', 'Food', 'Tech', 'Other'];

const categoryIcons = {
  Travel: <FaPlane className="mr-2" />,
  Food: <FaUtensils className="mr-2" />,
  Tech: <FaLaptopCode className="mr-2" />,
  Other: <FaQuestion className="mr-2" />
};

const breakpointColumnsObj = {
  default: 3,
  1024: 2,
  640: 1
};

const Home = () => {
  const { posts, isLoggedIn } = useContext(StoreContext);
  const [active, setActive] = useState('');
  const [isGridView, setIsGridView] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) navigate('/Auth');
  }, [isLoggedIn]);

  const toggleCategory = (cat) => {
    setActive(prev => (prev === cat ? '' : cat));
  };

  const toggleView = () => {
    setIsGridView(prev => !prev);
  };

  const getGifForCategory = () => {
    if (!active) return '/all.gif';
    return `/${active.toLowerCase()}.gif`;
  };

  const filtered = active
    ? posts.filter(p => p.category.toLowerCase() === active.toLowerCase())
    : posts;

  const displayed = filtered.filter(p =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-[#FDF8E2] min-h-screen p-6 flex flex-col items-center relative">
      {/* Search Bar with GIF */}
      <div className="w-full max-w-4xl mb-6 flex items-center justify-center gap-6">
        <div className="w-[120px] h-[120px] rounded-full border-2 border-black overflow-hidden shadow-[4px_4px_0_#000] bg-white flex items-center justify-center">
          <img src={getGifForCategory()} alt="Category GIF" className="w-full h-full object-cover" />
        </div>
        <div className="flex items-center border-2 border-black rounded-full px-4 py-2 bg-white shadow-[5px_5px_0_#000] w-[60%] h-[60px]">
          <MdSearch className="text-black text-3xl mr-2" />
          <input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full outline-none bg-transparent text-sm"
          />
        </div>
      </div>

      {/* Category Filters + View Toggle */}
      <div className="w-full max-w-4xl flex flex-col items-center mb-8 relative">
        <div className="flex flex-wrap justify-center gap-4 mb-4">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => toggleCategory(cat)}
              className={`flex items-center px-4 py-2 rounded-full border-2 border-black shadow-[2px_2px_0_#000] transition-all duration-200
                ${active === cat ? 'bg-black text-white' : 'bg-[#fff0f9] text-black'}`}
            >
              {categoryIcons[cat]}
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

      {/* Posts Section */}
      {displayed.length === 0 ? (
        <div className="flex flex-col items-center justify-center">
          <img
            src="/notfound.gif"
            alt="No posts found"
            className="w-60 h-50 object-contain"
          />
          <p className="text-lg font-semibold text-gray-600">No posts found.</p>
        </div>
      ) : isGridView ? (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex w-auto gap-6"
          columnClassName="masonry-column"
        >
          {[...displayed].reverse().map((post, i) => (
            <PostCard key={post.id} post={post} idx={i} />
          ))}
        </Masonry>
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
