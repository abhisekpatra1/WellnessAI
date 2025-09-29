import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { wellnessGoals } from '@/data/wellnessGoals';
import { UserProfile } from '@/context/WellnessContext';

interface ProfileFormProps {
  onSubmit: (profile: UserProfile) => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ onSubmit }) => {
  const [age, setAge] = useState<string>(''); // start as empty string
  const [gender, setGender] = useState<'male' | 'female' | 'other'>('female');
  const [goal, setGoal] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    // Prevent leading zeros
    if (/^0\d+/.test(value)) {
      value = String(parseInt(value, 10));
    }

    // Only allow numbers within range or empty
    if (value === '' || (/^\d+$/.test(value) && Number(value) <= 100)) {
      setAge(value);
      setError('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAge = Number(age);

    if (!age || isNaN(numAge) || numAge < 13 || numAge > 100) {
      setError('Please enter a valid age between 13 and 100.');
      return;
    }

    if (!goal) {
      setError('Please select a wellness goal.');
      return;
    }

    setError('');
    onSubmit({ age: numAge, gender, goals: [goal] });
  };

  const groupedGoals = wellnessGoals.reduce((acc, goal) => {
    if (!acc[goal.category]) {
      acc[goal.category] = [];
    }
    acc[goal.category].push(goal);
    return acc;
  }, {} as Record<string, typeof wellnessGoals>);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md fade-in bg-card/90 backdrop-blur-sm border-border/50">
        <CardHeader className="text-center">
          <div className="text-4xl mb-2">🌿</div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Wellness Journey
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Tell us about yourself to get personalized wellness tips
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="age" className="text-foreground font-medium">Age</Label>
              <Input
                id="age"
                type="number"
                min="13"
                max="100"
                value={age}
                onChange={handleAgeChange}
                className="bg-background/50 border-border focus:ring-primary"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender" className="text-foreground font-medium">Gender</Label>
              <Select value={gender} onValueChange={(value: 'male' | 'female' | 'other') => setGender(value)}>
                <SelectTrigger className="bg-background/50 border-border focus:ring-primary">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="goal" className="text-foreground font-medium">Primary Wellness Goal</Label>
              <Select value={goal} onValueChange={setGoal}>
                <SelectTrigger className="bg-background/50 border-border focus:ring-primary">
                  <SelectValue placeholder="Select your wellness goal" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border max-h-60 overflow-y-auto">
                  {Object.entries(groupedGoals).map(([category, goals]) => (
                    <div key={category}>
                      <div className="px-2 py-1 text-xs font-semibold text-muted-foreground bg-muted/50">
                        {category}
                      </div>
                      {goals.map((goalItem) => (
                        <SelectItem key={goalItem.goal} value={goalItem.goal}>
                          <span className="flex items-center gap-2">
                            <span>{goalItem.icon}</span>
                            <span>{goalItem.goal}</span>
                          </span>
                        </SelectItem>
                      ))}
                    </div>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {error && (
              <p className="text-red-500 text-sm font-medium">{error}</p>
            )}

            <Button 
              type="submit" 
              className="w-full wellness-button gradient-wellness text-white font-semibold py-3 rounded-lg"
              disabled={!age || !goal}
            >
              Generate My Wellness Tips ✨
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileForm;
