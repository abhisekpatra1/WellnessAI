import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X, ArrowLeft } from 'lucide-react';
import { wellnessGoals } from '@/data/wellnessGoals';
import { UserProfile } from '@/context/WellnessContext';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

interface MultiGoalProfileFormProps {
  onSubmit: (profile: UserProfile) => void;
}

const MultiGoalProfileForm: React.FC<MultiGoalProfileFormProps> = ({ onSubmit }) => {
  const navigate = useNavigate();
  const [age, setAge] = useState<number>(25);
  const [gender, setGender] = useState<'male' | 'female' | 'other'>('female');
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedGoals.length > 0) {
      onSubmit({ age, gender, goals: selectedGoals });
    }
  };

  const toggleGoal = (goalId: string) => {
    setSelectedGoals(prev => {
      if (prev.includes(goalId)) {
        return prev.filter(id => id !== goalId);
      } else {
        return [...prev, goalId];
      }
    });
  };

  const removeGoal = (goalId: string) => {
    setSelectedGoals(prev => prev.filter(id => id !== goalId));
  };

  const groupedGoals = wellnessGoals.reduce((acc, goal) => {
    if (!acc[goal.category]) {
      acc[goal.category] = [];
    }
    acc[goal.category].push(goal);
    return acc;
  }, {} as Record<string, typeof wellnessGoals>);

  const getGoalById = (id: string) => wellnessGoals.find(g => g.id === id);

  return (
    <div className="min-h-screen bg-gradient-calm">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50 p-6">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="wellness-button"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          <ThemeToggle />
        </div>
      </header>

      <div className="pt-24 pb-8 px-4 flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-2xl fade-in bg-card/90 backdrop-blur-sm border-border/50">
          <CardHeader className="text-center">
            <div className="text-4xl mb-2">🌿</div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Your Wellness Profile
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Tell us about yourself and select your wellness goals for personalized recommendations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="age" className="text-foreground font-medium">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    min="13"
                    max="100"
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
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
              </div>

              {/* Selected Goals */}
              {selectedGoals.length > 0 && (
                <div className="space-y-3">
                  <Label className="text-foreground font-medium">
                    Selected Goals ({selectedGoals.length})
                  </Label>
                  <div className="flex flex-wrap gap-2 p-4 bg-muted/30 rounded-lg border border-border/30">
                    {selectedGoals.map(goalId => {
                      const goal = getGoalById(goalId);
                      return goal ? (
                        <Badge 
                          key={goalId} 
                          variant="secondary" 
                          className="wellness-button bg-primary/10 text-primary hover:bg-primary/20 px-3 py-1 text-sm"
                        >
                          <span className="mr-2">{goal.icon}</span>
                          {goal.goal}
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="ml-2 h-4 w-4 p-0 hover:bg-destructive/20"
                            onClick={() => removeGoal(goalId)}
                          >
                            <X className="h-3 w-3 text-destructive" />
                          </Button>
                        </Badge>
                      ) : null;
                    })}
                  </div>
                </div>
              )}

              {/* Goal Selection */}
              <div className="space-y-4">
                <Label className="text-foreground font-medium">
                  Choose Your Wellness Goals
                  <span className="text-muted-foreground text-sm font-normal ml-2">
                    (Select multiple goals that matter to you)
                  </span>
                </Label>
                
                {Object.entries(groupedGoals).map(([category, goals]) => (
                  <div key={category} className="space-y-3">
                    <h4 className="text-sm font-semibold text-foreground bg-muted/50 px-3 py-1 rounded">
                      {category}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {goals.map((goal) => {
                        const isSelected = selectedGoals.includes(goal.id);
                        return (
                          <button
                            key={goal.id}
                            type="button"
                            onClick={() => toggleGoal(goal.id)}
                            className={`wellness-button p-4 rounded-lg border-2 text-left transition-all ${
                              isSelected 
                                ? 'border-primary bg-primary/10 shadow-md scale-[1.02]' 
                                : 'border-border hover:border-primary/50 hover:bg-primary/5'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">{goal.icon}</span>
                              <div>
                                <div className="font-medium text-foreground text-sm">
                                  {goal.goal}
                                </div>
                                <div className="text-xs text-muted-foreground line-clamp-2">
                                  {goal.description}
                                </div>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <Button 
                type="submit" 
                className="w-full wellness-button gradient-wellness text-white font-semibold py-4 rounded-lg text-lg"
                disabled={selectedGoals.length === 0}
              >
                Generate My Wellness Tips ✨
                {selectedGoals.length > 0 && (
                  <span className="ml-2">({selectedGoals.length} goals)</span>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MultiGoalProfileForm;