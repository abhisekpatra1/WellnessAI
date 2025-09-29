export interface WellnessGoal {
  id: string;
  goal: string;
  icon: string;
  category: string;
  description: string;
}

export const wellnessGoals: WellnessGoal[] = [
  // Physical Health
  { id: "weight-loss", goal: "Weight Loss", icon: "⚖️", category: "Physical Health", description: "Achieve healthy weight reduction through balanced lifestyle changes" },
  { id: "muscle-gain", goal: "Muscle Gain", icon: "🏋️", category: "Physical Health", description: "Build lean muscle mass with targeted strength training" },
  { id: "endurance", goal: "Endurance", icon: "🏃", category: "Physical Health", description: "Improve cardiovascular fitness and stamina" },
  { id: "flexibility", goal: "Flexibility", icon: "🤸", category: "Physical Health", description: "Enhance mobility and prevent injury through stretching" },
  { id: "strength", goal: "Strength", icon: "💪", category: "Physical Health", description: "Build functional strength for daily activities" },
  
  // Mental Health
  { id: "stress-relief", goal: "Stress Relief", icon: "🧘", category: "Mental Health", description: "Manage stress through mindfulness and relaxation techniques" },
  { id: "mindfulness", goal: "Mindfulness", icon: "🧠", category: "Mental Health", description: "Develop present-moment awareness and mental clarity" },
  { id: "emotional-balance", goal: "Emotional Balance", icon: "😊", category: "Mental Health", description: "Cultivate emotional stability and resilience" },
  { id: "anxiety-relief", goal: "Anxiety Relief", icon: "🌸", category: "Mental Health", description: "Reduce anxiety through proven coping strategies" },
  
  // Lifestyle
  { id: "better-sleep", goal: "Better Sleep", icon: "😴", category: "Lifestyle", description: "Improve sleep quality and establish healthy sleep patterns" },
  { id: "healthy-diet", goal: "Healthy Diet", icon: "🥗", category: "Lifestyle", description: "Develop nutritious eating habits for optimal health" },
  { id: "work-life-balance", goal: "Work-Life Balance", icon: "⚖️", category: "Lifestyle", description: "Create harmony between professional and personal life" },
  { id: "skin-care", goal: "Skin Care", icon: "🌞", category: "Lifestyle", description: "Maintain healthy, glowing skin through proper care" },
  { id: "hydration", goal: "Hydration", icon: "💧", category: "Lifestyle", description: "Maintain optimal hydration for better health" },
  
  // Preventive Health
  { id: "immunity-boost", goal: "Immunity Boost", icon: "🛡️", category: "Preventive Health", description: "Strengthen immune system through natural methods" },
  { id: "heart-health", goal: "Heart Health", icon: "❤️", category: "Preventive Health", description: "Support cardiovascular health and prevent disease" },
  { id: "strong-bones", goal: "Strong Bones", icon: "🦴", category: "Preventive Health", description: "Maintain bone density and prevent osteoporosis" },
  { id: "energy-boost", goal: "Energy Boost", icon: "⚡", category: "Preventive Health", description: "Increase natural energy levels throughout the day" },
  
  // General Wellness
  { id: "general-wellness", goal: "General Wellness", icon: "🌿", category: "General Wellness", description: "Achieve overall health and well-being" },
  { id: "mental-clarity", goal: "Mental Clarity", icon: "✨", category: "General Wellness", description: "Enhance focus, concentration, and cognitive function" }
];