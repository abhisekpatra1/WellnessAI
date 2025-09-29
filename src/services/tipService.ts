import { UserProfile, WellnessTip } from '../context/WellnessContext';

// Mock tip database organized by categories
const tipDatabase: Record<string, WellnessTip[]> = {
  "weight-loss": [
    {
      id: '1',
      title: 'Hydrate Before Meals',
      description: 'Drink a glass of water 30 minutes before eating',
      icon: '💧',
      category: 'Weight Loss',
      goals: ['weight-loss', 'hydration'],
      explanation: 'Drinking water before meals helps you feel fuller and can reduce overall calorie intake. This simple habit can boost your metabolism and support your weight loss journey naturally.',
      steps: [
        'Set a timer for 30 minutes before each meal',
        'Drink 16-20 oz of water slowly',
        'Wait the full 30 minutes before eating',
        'Notice how you feel less hungry during meals'
      ]
    },
    {
      id: '2',
      title: 'Walk After Meals',
      description: 'Take a 10-minute walk after eating to aid digestion',
      icon: '🚶',
      category: 'Weight Loss',
      goals: ['weight-loss', 'endurance'],
      explanation: 'A gentle walk after meals helps regulate blood sugar levels and improves digestion. This practice can significantly boost your metabolism and support healthy weight management.',
      steps: [
        'Finish your meal completely',
        'Wait 15-20 minutes, then start walking',
        'Walk at a comfortable, steady pace',
        'Aim for 10-15 minutes of continuous movement'
      ]
    },
    {
      id: '3',
      title: 'Mindful Eating Practice',
      description: 'Eat slowly and savor each bite to improve satiety',
      icon: '🍽️',
      category: 'Weight Loss',
      goals: ['weight-loss', 'mindfulness'],
      explanation: 'Mindful eating helps you recognize hunger and fullness cues, leading to better portion control and improved digestion. This practice enhances your relationship with food.',
      steps: [
        'Put down utensils between bites',
        'Chew each bite 20-30 times',
        'Focus on taste, texture, and aroma',
        'Check in with your hunger level halfway through'
      ]
    }
  ],
  "muscle-gain": [
    {
      id: '4',
      title: 'Protein Within 30 Minutes',
      description: 'Consume protein immediately after your workout',
      icon: '🥛',
      category: 'Muscle Gain',
      goals: ['muscle-gain', 'strength'],
      explanation: 'Post-workout protein intake is crucial for muscle recovery and growth. Your muscles are most receptive to nutrients within the first 30 minutes after exercise.',
      steps: [
        'Have protein ready before your workout',
        'Consume 20-30g of protein immediately after',
        'Choose fast-absorbing options like whey or Greek yogurt',
        'Pair with simple carbs for better absorption'
      ]
    },
    {
      id: '5',
      title: 'Progressive Overload',
      description: 'Gradually increase weight or reps each week',
      icon: '📈',
      category: 'Muscle Gain',
      goals: ['muscle-gain', 'strength'],
      explanation: 'Progressive overload is the key principle for muscle growth. By consistently challenging your muscles with increased demands, you stimulate adaptation and strength gains.',
      steps: [
        'Track your current weights and reps',
        'Increase weight by 2.5-5lbs when you can complete all sets',
        'Add 1-2 extra reps before increasing weight',
        'Review and adjust your program weekly'
      ]
    }
  ],
  "better-sleep": [
    {
      id: '6',
      title: 'Digital Sunset Ritual',
      description: 'Turn off screens 1 hour before bedtime',
      icon: '📱',
      category: 'Better Sleep',
      goals: ['better-sleep', 'mental-clarity'],
      explanation: 'Blue light from screens interferes with melatonin production, making it harder to fall asleep. Creating a digital sunset helps your body prepare for rest naturally.',
      steps: [
        'Set a phone alarm for 1 hour before bed',
        'Turn on blue light filters after sunset',
        'Replace screen time with reading or journaling',
        'Keep devices charging outside the bedroom'
      ]
    },
    {
      id: '7',
      title: 'Cool Sleep Environment',
      description: 'Keep bedroom temperature between 65-68°F',
      icon: '🌙',
      category: 'Better Sleep',
      goals: ['better-sleep'],
      explanation: 'Your body temperature naturally drops when preparing for sleep. A cool environment supports this process and helps you achieve deeper, more restorative sleep.',
      steps: [
        'Set thermostat to 65-68°F before bed',
        'Use breathable bedding materials',
        'Open windows for fresh air circulation',
        'Consider a fan for consistent airflow'
      ]
    }
  ],
  "stress-relief": [
    {
      id: '8',
      title: 'Box Breathing Technique',
      description: 'Practice 4-4-4-4 breathing pattern for instant calm',
      icon: '🧘',
      category: 'Stress Relief',
      goals: ['stress-relief', 'mindfulness', 'anxiety-relief'],
      explanation: 'Box breathing activates your parasympathetic nervous system, quickly reducing stress and anxiety. This technique can be used anywhere, anytime you need to center yourself.',
      steps: [
        'Inhale slowly for 4 counts',
        'Hold your breath for 4 counts',
        'Exhale slowly for 4 counts',
        'Hold empty for 4 counts, then repeat'
      ]
    },
    {
      id: '9',
      title: 'Nature Connection',
      description: 'Spend 15 minutes outdoors daily for mental reset',
      icon: '🌿',
      category: 'Stress Relief',
      goals: ['stress-relief', 'general-wellness', 'mental-clarity'],
      explanation: 'Spending time in nature reduces cortisol levels and improves mood. Even brief outdoor exposure can significantly impact your stress levels and overall well-being.',
      steps: [
        'Step outside without any devices',
        'Find a green space or natural area',
        'Focus on sounds, smells, and sights around you',
        'Take slow, deep breaths and relax your shoulders'
      ]
    }
  ]
};

// Generate personalized tips based on user profile
export const generateTips = async (profile: UserProfile): Promise<WellnessTip[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Get tips for all selected goals
  const allTips: WellnessTip[] = [];
  
  profile.goals.forEach(goal => {
    const goalTips = tipDatabase[goal] || [];
    allTips.push(...goalTips);
  });
  
  // Also add some general wellness tips
  const generalTips = Object.values(tipDatabase).flat().filter(tip => 
    tip.goals.includes('general-wellness') || tip.goals.includes('mental-clarity')
  );
  
  // Combine and shuffle tips, return 5 random ones
  const combinedTips = [...allTips, ...generalTips];
  const uniqueTips = combinedTips.filter((tip, index, self) => 
    index === self.findIndex(t => t.id === tip.id)
  );
  
  const shuffled = uniqueTips.sort(() => Math.random() - 0.5);
  
  // Add unique IDs and personalize based on age/gender
  return shuffled.slice(0, 5).map((tip, index) => ({
    ...tip,
    id: `${Date.now()}-${index}`,
    description: personalizeDescription(tip.description, profile)
  }));
};

const personalizeDescription = (description: string, profile: UserProfile): string => {
  // Simple personalization based on age and gender
  if (profile.age > 50) {
    return description.replace('10-minute', '5-minute').replace('20-30', '15-20');
  }
  return description;
};

// Get detailed explanation for a specific tip
export const getTipDetails = async (tipTitle: string, profile: UserProfile): Promise<{ explanation: string; steps: string[] }> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Find the tip in our database
  const allTips = Object.values(tipDatabase).flat();
  const tip = allTips.find(t => t.title === tipTitle);
  
  if (tip && tip.explanation && tip.steps) {
    return {
      explanation: tip.explanation,
      steps: tip.steps
    };
  }
  
  // Fallback generic response
  return {
    explanation: "This wellness tip is designed to support your health journey. Regular practice can lead to significant improvements in your overall well-being.",
    steps: [
      "Start with small, manageable changes",
      "Be consistent with daily practice",
      "Track your progress and adjust as needed",
      "Celebrate small wins along the way"
    ]
  };
};