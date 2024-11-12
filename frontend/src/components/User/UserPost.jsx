import React, { useState,useEffect } from 'react';
import { FaHeart, FaComment, FaShare, FaTimes } from 'react-icons/fa';
import LikeCommentShere from './LikeCommentShere';
import UserHeader from './UserHeader';
import ContentSection from './ContentSection';
import Comments from './Comments';
import SharePost from './SharePost';
import AOS from 'aos'; // Import AOS for initialization

// Dummy user data for sharing (replace with real user data from props or state)
// availableUsers data (example)
const availableUsers = [
  { id: 1, name: "John Doe", profileUrl: "path/to/john-profile.jpg", isOnline: true },
  { id: 2, name: "Jane Smith", profileUrl: "path/to/jane-profile.jpg", isOnline: false },
  { id: 3, name: "Alice Johnson dljfladsjflasd flkadsjfladjsfjlsakdjf", profileUrl: "path/to/alice-profile.jpg", isOnline: true },
];


function UserPost({ UserProfile, isLogin }) {
  const [connection, setConnection] = useState(false);
  const [isVisibleCard, setIsVisibleCard] = useState(true);
  const [CommentVisible, setCommentVisible] = useState(false);
  const [comments, setComments] = useState([]);
  const [isShareModalVisible, setIsShareModalVisible] = useState(false);

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

  const toggleShareModal = () => {
    setIsShareModalVisible(!isShareModalVisible);
  };

  const shareWithUser = (userId) => {
    console.log(`Shared with user ID: ${userId}`);
    // Implement actual sharing logic here
    toggleShareModal(); // Close the modal after sharing
  };

   // Initialize AOS animation
   useEffect(() => {
    AOS.init({
        duration: 800, // Duration of the animation
        easing: 'ease-in-out', // Easing function for the animation
        once: false, // Only animate once when scrolled into view
        offset:200,
    });
}, []);

  if (!isVisibleCard) {
    return null;
  }

  return (
    <>
      <div  data-aos="zoom-in" data-aos-delay="100" className=" relative w-full md:mx-auto shadow-blue-300 border-none rounded-lg shadow-md overflow-hidden bg-white dark:bg-black inline-block mb-8 mt-2 text-black ">
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
            ClickHandler={toggleShareModal}
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

      {isShareModalVisible && (
        <SharePost
          availableUsers={availableUsers}
          onClose={toggleShareModal}
          onShare={shareWithUser}
        />
      )}
    </>
  );
}

export default UserPost;
