import { useState } from 'react';
import styles from './ProfileCard.module.css'


const ProfileCard = ({ profileImage, coverImage, name, description }) => {
  
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const [isOverlayVisibleCover, setOverlayVisibleCover] = useState(false);

  function handleCoverButtonClick() {
    setOverlayVisibleCover(true);
  }

  function handleOverlayButtonCover() {
    setOverlayVisibleCover(false);
  }

  function handleButtonClick() {
    setOverlayVisible(true);
  }

  const handleOverlayClick = () => {
    setOverlayVisible(false);
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileCard}>
        <img
          className={styles.coverPhoto}
          src={coverImage}
          alt="Cover"
          onClick={handleCoverButtonClick}
        />
        <img
          className={styles.profilePhoto}
          src={profileImage}
          alt="Profile"
          onClick={handleButtonClick}
        />
      </div>
      <div className={styles.bioSection}>
        <ul>
          <li className="text-center text-2xl font-semibold">
            <h2>{name}</h2>
          </li>
          <li className="text-center font-semibold underline">{description}</li>
        </ul>
      </div>

      {isOverlayVisible && (
        <div className={styles.overlay} onClick={handleOverlayClick}>
          <img className={styles.fullScreenImage} src={profileImage} alt="Full Screen" />
        </div>
      )}

      {isOverlayVisibleCover && (
        <div className={styles.overlay} onClick={handleOverlayButtonCover}>
          <img className={styles.fullScreenImage} src={coverImage} alt="Full Screen" />
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
