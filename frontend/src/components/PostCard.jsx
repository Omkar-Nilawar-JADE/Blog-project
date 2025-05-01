import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';

const PostCard = ({
  post,
  idx,
  hoverColor = 'hover:bg-[#c198db]'
}) => {
  const timeAgo = formatDistanceToNow(new Date(post.created_at), { addSuffix: true });
  const colors = ['#EBDBCE','#A7B74A','#ED6474','#509A89','#AE9DAD','#D4DBA7','#C4C3E3','#FCDD9D','#E7A0CC'];
  const bgColor = colors[idx % colors.length]


  return (
    <Link to={`/post/${post.id}`}>
      <div
        className={`
          relative
          transition-colors duration-300
          border-2 border-black
          shadow-[8px_8px_0_#000]
          rounded-sm
          p-4
          w-[300px]
          flex flex-col justify-between
        `}
        style={{ backgroundColor: bgColor }}
      >
        <div>
          <h2 className="text-2xl font-bold mb-2 leading-snug break-words">{post.title}</h2>
          {post.description && (
            <p className="text-sm mb-4">{post.description}</p>
          )}
        </div>

        <div className="flex items-center justify-between text-xs text-gray-700 mb-2">
          <span>{timeAgo}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="bg-white text-black text-xs font-medium px-2 py-1 rounded-full border border-black shadow-[2px_2px_0_#000]">
            {post.category}
          </span>
          <div className="flex items-center text-sm font-medium">
            <FaUserCircle className="mr-1" />
            <span>{post.author}</span>
          </div>
        </div>

        {/* offset shadow layer */}
        <div className="absolute bottom-[-4px] right-[-4px] w-full h-full bg-black rounded-lg -z-10" />
      </div>
    </Link>
  );
};

export default PostCard;
