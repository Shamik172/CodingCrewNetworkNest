import React, { useState } from 'react';
import { FaHeart, FaComment, FaShare } from 'react-icons/fa';
import LikeCommentShere from './LikeCommentShere';
import UserHeader from './UserHeader';
import ContentSection from './ContentSection';
import pic  from '../../assets/avengers.jpg';

function UserProfileCard() {
    let UserProfile = {
        ProfileUrl : '',
        name: 'Hemanta Sahoo',
        bio: 'full stack developer',
        skill: 'think about pic',
        desc:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum possimus molestiae voluptatem, aut ea numquam nulla obcaecati est sequi ipsum. Temporibus atque quidem veritatis sed dignissimos culpa dicta ipsum molestias! Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum voluptatum, amet rem maiores vitae nesciunt error minima aliquam, omnis excepturi ab corrupti praesentium ducimus tempora neque. Quidem voluptas commodi recusandae. Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo dolorem earum sed officia? Doloremque provident dolorum quas hic quam voluptatum id, dolore repellat reiciendis! Eius quis suscipit animi quibusdam ipsam.',
        coverUrl : pic,

    }


    // use the useState -> you connection ya not connected
   let  [connection, setConnection] = useState(false);
   let connectionHandler = ()=>{
    setConnection(!connection);
   }
  return (
    <div className=" w-full md:mx-auto border border-primary-color shadow-blue-200 rounded-lg shadow-md overflow-hidden bg-primary-color mx-1 inline-block mb-8 mt-2 text-gray-950">


      {/* Header */}
      <UserHeader onHandler={connectionHandler} isConnection={connection} name={UserProfile.name} bio={UserProfile.bio} skill={UserProfile.skill} img={UserProfile.ProfileUrl}/>


      {/* Content Section */}
      <ContentSection img={UserProfile.coverUrl} desc={UserProfile.desc}/>

      {/* Footer */}
      <div className="flex justify-around p-3 bg-primary-color text-sm  font-serif">
        <LikeCommentShere Icon={FaHeart} title={'Like'} col={'red'}/>
        <LikeCommentShere Icon={FaComment} title={'Comment'} col={'white'}/>
        <LikeCommentShere Icon={FaShare} title={'Share'} col={'blue'}/>
        
      </div>
    </div>
  );
}

export default UserProfileCard;
