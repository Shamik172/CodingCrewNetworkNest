import React, { useState } from 'react';
import { FaHeart, FaComment, FaShare, FaTimes } from 'react-icons/fa';
import LikeCommentShere from './LikeCommentShere';
import UserHeader from './UserHeader';
import ContentSection from './ContentSection';
import Comments from './Comments';
import SharePost from './SharePost';
import axios from 'axios';
// Dummy user data for sharing (replace with real user data from props or state)
const availableUsers = [
  { id: 1, name: "John Doe", profileUrl: "path/to/john-profile.jpg", isOnline: true },
  { id: 2, name: "Jane Smith", profileUrl: "path/to/jane-profile.jpg", isOnline: false },
  { id: 3, name: "Alice Johnson", profileUrl: "path/to/alice-profile.jpg", isOnline: true },
];

function UserPost({ UserProfile, isLogin, myconnect }) {
  const [connection, setConnection] = useState(false);
  const [isVisibleCard, setIsVisibleCard] = useState(true);
  const [CommentVisible, setCommentVisible] = useState(false);
  const [comments, setComments] = useState([]);
  const [isShareModalVisible, setIsShareModalVisible] = useState(false);

  // States for tracking Like, Comment, Share actions
  const [isLiked, setIsLiked] = useState(false);
  const [isCommented, setIsCommented] = useState(false);
  const [isShared, setIsShared] = useState(false);

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

  // Like, Comment, Share handlers
  const handleLike = () =>{ 
    axios.post(`http://localhost:3000/post/like/${UserProfile._id}`)
    .then(result=>{
        if (isLogin) {
          setIsLiked(!isLiked); // Toggle the like state
        } else {
          console.log('Please log in to like');
        }
    })
    .catch(err=>console.log(err));
  };

  const handleComment = () => {
    if (isLogin) {
      setCommentHandler(); // Open the comment section
      setIsCommented(true); // Mark as commented
    } else {
      console.log('Please log in to comment');
    }
  };

  const handleShare = () => {
    if (isLogin) {
      toggleShareModal(); // Open the share modal
      setIsShared(true); // Mark as shared
    } else {
      console.log('Please log in to share');
    }
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

       {myconnect === true? <div></div> : (<UserHeader
          onHandler={connectionHandler}
          username = {UserProfile.username}
          isConnection={connection}
          name={UserProfile.name}
          bio={UserProfile.bio}
          img={UserProfile.profileUrl}
          isLogin={isLogin}
        />)}

        <ContentSection img={UserProfile.images} desc={UserProfile.description} />

        <div className="flex justify-around text-sm font-serif border-t-2 dark:border-slate-900 divide-x dark:divide-slate-900">
          <LikeCommentShere
            Icon={FaHeart}
            title={'Like'}
            col={isLiked ? 'red' : 'white'} // Change color based on like state
            isLogin={isLogin}
            ClickHandler={handleLike}
           
          />
          <LikeCommentShere
            Icon={FaComment}
            title={'Comment'}
            col={isCommented ? 'green' : 'white'} // Change color based on comment state
            isLogin={isLogin}
            ClickHandler={handleComment}
          />
          <LikeCommentShere
            Icon={FaShare}
            title={'Share'}
            col={isShared ? 'blue' : 'white'} // Change color based on share state
            isLogin={isLogin}
            ClickHandler={handleShare}
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
