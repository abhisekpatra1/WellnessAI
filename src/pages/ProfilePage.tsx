import React from 'react';
import { useNavigate } from 'react-router-dom';
import MultiGoalProfileForm from '@/components/MultiGoalProfileForm';
import { useWellness } from '@/context/WellnessContext';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { setProfile } = useWellness();

  const handleProfileSubmit = (profile: any) => {
    setProfile(profile);
    navigate('/tips');
  };

  return <MultiGoalProfileForm onSubmit={handleProfileSubmit} />;
};

export default ProfilePage;