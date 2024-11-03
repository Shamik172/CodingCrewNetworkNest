import React, { useState } from 'react';
import { FaHeart, FaComment, FaShare, FaTimes } from 'react-icons/fa';
import LikeCommentShere from './LikeCommentShere';
import UserHeader from './UserHeader';
import ContentSection from './ContentSection';
import pic from '../../assets/avengers.jpg';

function UserProfileCard() {
  let UserProfile = {
    ProfileUrl: '',
    name: 'Hemanta Sahoo',
    bio: 'full stack developer',
    skill: 'think about pic',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum possimus molestiae voluptatem, aut ea numquam nulla obcaecati est sequi ipsum. Temporibus atque quidem veritatis sed dignissimos culpa dicta ipsum molestias! Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum voluptatum, amet rem maiores vitae nesciunt error minima aliquam, omnis excepturi ab corrupti praesentium ducimus tempora neque. Quidem voluptas commodi recusandae. Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo dolorem earum sed officia? Doloremque provident dolorum quas hic quam voluptatum id, dolore repellat reiciendis! Eius quis suscipit animi quibusdam ipsam.',
    coverUrl: pic,
  };

  // State to manage connection status and visibility of the card
  const [connection, setConnection] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Toggle connection state
  const connectionHandler = () => {
    setConnection(!connection);
  };

  // Handle remove card
  const removeCard = () => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return null; // Don't render the card if not visible
  }

  return (
    <div className="relative w-full md:mx-auto border-2 border-black shadow-white rounded-lg shadow-md overflow-hidden bg-slate-100 mx-1 inline-block mb-8 mt-2 text-black">
      {/* Remove Icon */}
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
      />

      {/* Content Section */}
      <ContentSection img={UserProfile.coverUrl} desc={UserProfile.desc} />

      {/* Footer */}
      <div className="flex justify-around p-3 text-sm font-serif">
        <LikeCommentShere Icon={FaHeart} title={'Like'} col={'red'} />
        <LikeCommentShere Icon={FaComment} title={'Comment'} col={'white'} />
        <LikeCommentShere Icon={FaShare} title={'Share'} col={'blue'} />
      </div>
    </div>
  );
}

export default UserProfileCard;
