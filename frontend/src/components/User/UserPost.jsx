import React, { useState } from 'react';
import { FaHeart, FaComment, FaShare, FaTimes } from 'react-icons/fa';
import LikeCommentShere from './LikeCommentShere';
import UserHeader from './UserHeader';
import ContentSection from './ContentSection';
import Comments from './Comments';

function UserPost({ UserProfile, isLogin }) {
  const [connection, setConnection] = useState(false);
  const [isVisibleCard, setIsVisibleCard] = useState(true);
  const [CommentVisible, setCommentVisible] = useState(false);
  const [comments, setComments] = useState([]);

  const connectionHandler = () => {
    setConnection(!connection);
  };

  const removeCard = () => {
    setIsVisibleCard(false);
  };

  const setCommentHandler = () => {
    setCommentVisible(true);
  };

  const addComment = (newComment) => {
    setComments([...comments, newComment]);
  };

  if (!isVisibleCard) {
    return null;
  }

  return (
    <>
      <div className="relative w-full md:mx-auto shadow-blue-300 border-none rounded-lg shadow-md overflow-hidden bg-white dark:bg-black mx-1 inline-block mb-8 mt-2 text-black">
        <FaTimes
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500 cursor-pointer"
          onClick={removeCard}
          size={18}
        />

        <UserHeader
          onHandler={connectionHandler}
          isConnection={connection}
          name={UserProfile.name}
          bio={UserProfile.bio}
          img={UserProfile.profileUrl}
          isLogin={isLogin}
        />

        <ContentSection img={UserProfile.coverUrl} desc={UserProfile.description} />

        <div className="flex justify-around text-sm font-serif border-t-2 dark:border-slate-900 divide-x dark:divide-slate-900">
          <LikeCommentShere
            Icon={FaHeart}
            title={'Like'}
            col={'red'}
            isLogin={isLogin}
            ClickHandler={() => console.log('Like')}
          />
          <LikeCommentShere
            Icon={FaComment}
            title={'Comment'}
            col={'green'}
            isLogin={isLogin}
            ClickHandler={setCommentHandler}
          />
          <LikeCommentShere
            Icon={FaShare}
            title={'Share'}
            col={'blue'}
            isLogin={isLogin}
            ClickHandler={() => console.log('Share')}
          />
        </div>
      </div>

      {CommentVisible && (
        <Comments
          comments={comments}
          onClose={() => setCommentVisible(false)}
          onAddComment={addComment}
        />
      )}
    </>
  );
}

export default UserPost;
