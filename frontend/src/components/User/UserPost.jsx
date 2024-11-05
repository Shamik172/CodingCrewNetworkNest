import React, { useState } from 'react';
import { FaHeart, FaComment, FaShare, FaTimes } from 'react-icons/fa';
import LikeCommentShere from './LikeCommentShere';
import UserHeader from './UserHeader';
import ContentSection from './ContentSection';
import UniversalModal from '../UniversalModal';

function UserPost({ UserProfile, isLogin }) {
  const [connection, setConnection] = useState(false);
  const [isVisibleCard, setIsVisibleCard] = useState(true);
  const [CommentVisible, setCommentVisible] = useState(false);

  // Toggle connection state
  const connectionHandler = () => {
    setConnection(!connection);
  };

  // Handle remove card
  const removeCard = () => {
    // console.log('Removing card'); // Debug log to check if function is called
    setIsVisibleCard(false);
  };

  // Handle showing comment modal
  const setCommentHandler = () => {
    setCommentVisible(true);
  };

  // If card is not visible, don't render it
  if (!isVisibleCard) {
    return null;
  }

  return (
    <>
      <div className="relative w-full md:mx-auto shadow-blue-300 border-none rounded-lg shadow-md overflow-hidden bg-[#f9f9f9] mx-1 inline-block mb-8 mt-2 text-black">
        {/* Remove card icon */}
        <FaTimes
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500 cursor-pointer"
          onClick={removeCard}
          size={18}
        />

        {/* Header */}
        <UserHeader
          onHandler={connectionHandler}
          isConnection={connection}
          name={UserProfile.name}
          bio={UserProfile.bio}
          skill={UserProfile.skill}
          img={UserProfile.ProfileUrl}
          isLogin={isLogin}
        />

        {/* Content Section */}
        <ContentSection img={UserProfile.coverUrl} desc={UserProfile.desc} />

        {/* Footer */}
        <div className="flex justify-around text-sm font-serif border-t-2 divide-x">
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

      {/* Comment Modal */}
      {CommentVisible && (
        <UniversalModal unsetModalHandler={() => setCommentVisible(false)}>
          <p>Hi! Leave a comment below.</p>
        </UniversalModal>
      )}
    </>
  );
}

export default UserPost;
