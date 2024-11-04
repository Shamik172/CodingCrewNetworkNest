import React, { useState } from 'react';
import { FaHeart, FaComment, FaShare, FaTimes } from 'react-icons/fa';
import LikeCommentShere from './LikeCommentShere';
import UserHeader from './UserHeader';
import ContentSection from './ContentSection';
import pic from '../../assets/avengers.jpg';
import UniversalModal from '../UniversalModal';

function UserProfileCard({UserProfile, isLogin}) {
  // let UserProfile = {
  //   ProfileUrl: '',
  //   name: 'Hemanta Sahoo',
  //   bio: 'full stack developer',
  //   skill: 'think about pic',
  //   desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum possimus molestiae voluptatem, aut ea numquam nulla obcaecati est sequi ipsum. Temporibus atque quidem veritatis sed dignissimos culpa dicta ipsum molestias! Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum voluptatum, amet rem maiores vitae nesciunt error minima aliquam, omnis excepturi ab corrupti praesentium ducimus tempora neque. Quidem voluptas commodi recusandae. Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo dolorem earum sed officia? Doloremque provident dolorum quas hic quam voluptatum id, dolore repellat reiciendis! Eius quis suscipit animi quibusdam ipsam.',
  //   coverUrl: pic,
  // };

  // State to manage connection status and visibility of the card
  const [connection, setConnection] = useState(false);
  const [isVisibleCard, setIsVisibleCard] = useState(true);

  // Toggle connection state
  const connectionHandler = () => {
    
    
    setConnection(!connection);
  };

  // Handle remove card
  const removeCard = () => {
    setIsVisibleCard(false);
  };

  if (!isVisibleCard) {
    return null; // Don't render the card if not visible
  }

   const [CommentVisible, setCommentVisible] = useState(false);
   //to Click Comment box to Comment to pic 
   const setCommentHandler = ()=>{
    setCommentVisible(true);
   }
   





  return (

    <>
        <div className="relative w-full md:mx-auto  shadow-blue-300 border-none   rounded-lg shadow-md overflow-hidden bg-[#f9f9f9] mx-1 inline-block mb-8 mt-2 text-black ">
          {/* Remove card use  Icon */}
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
            <LikeCommentShere Icon={FaHeart} title={'Like'} col={'red'} isLogin={isLogin} ClickHandler={()=>console.log('Like')}/>
            <LikeCommentShere Icon={FaComment} title={'Comment'} col={'green'} isLogin={isLogin} ClickHandler={setCommentHandler}/>

            <LikeCommentShere Icon={FaShare} title={'Share'} col={'blue'} isLogin={isLogin}  ClickHandler={()=>console.log('Like')}/>
          </div>
        </div>
    
 
        {/* Comment visible */}
        {CommentVisible && 
        
        <UniversalModal unsetModalHandler={()=>setCommentVisible(false)}>

          hii
        </UniversalModal>
          
          }
    </>
  );
}

export default UserProfileCard;
