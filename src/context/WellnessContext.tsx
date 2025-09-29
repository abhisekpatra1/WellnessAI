import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserProfile {
  age: number;
  gender: 'male' | 'female' | 'other';
  goals: string[]; // Changed from single goal to multiple goals
}

export interface WellnessTip {
  id: string;
  title: string;
  description: string;
  icon: string;
  explanation?: string;
  steps?: string[];
  category: string;
  goals: string[]; // Tips can be relevant to multiple goals
}

interface WellnessContextType {
  profile: UserProfile | null;
  setProfile: (profile: UserProfile) => void;
  tips: WellnessTip[];
  setTips: (tips: WellnessTip[]) => void;
  savedTips: WellnessTip[];
  saveTip: (tip: WellnessTip) => void;
  unsaveTip: (tipId: string) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
}

const WellnessContext = createContext<WellnessContextType | undefined>(undefined);

export const useWellness = () => {
  const context = useContext(WellnessContext);
  if (!context) {
    throw new Error('useWellness must be used within a WellnessProvider');
  }
  return context;
};

export const WellnessProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [tips, setTips] = useState<WellnessTip[]>([]);
  const [savedTips, setSavedTips] = useState<WellnessTip[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load saved tips from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('savedWellnessTips');
    if (saved) {
      try {
        setSavedTips(JSON.parse(saved));
      } catch (error) {
        console.error('Failed to load saved tips:', error);
      }
    }
  }, []);

  // Save tips to localStorage whenever savedTips changes
  useEffect(() => {
    localStorage.setItem('savedWellnessTips', JSON.stringify(savedTips));
  }, [savedTips]);

  const saveTip = (tip: WellnessTip) => {
    setSavedTips(prev => {
      if (prev.find(t => t.id === tip.id)) {
        return prev; // Already saved
      }
      return [...prev, tip];
    });
  };

  const unsaveTip = (tipId: string) => {
    setSavedTips(prev => prev.filter(tip => tip.id !== tipId));
  };

  return (
    <WellnessContext.Provider value={{
      profile,
      setProfile,
      tips,
      setTips,
      savedTips,
      saveTip,
      unsaveTip,
      isLoading,
      setIsLoading,
      error,
      setError
    }}>
      {children}
    </WellnessContext.Provider>
  );
};