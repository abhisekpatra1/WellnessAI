import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, RefreshCw, ArrowLeft, Bookmark } from 'lucide-react';
import TipCard from '@/components/TipCard';
import TipDetail from '@/components/TipDetail';
import { useWellness } from '@/context/WellnessContext';
import { generateTips } from '@/services/tipService';
import { useNavigate } from 'react-router-dom';

const TipsPage: React.FC = () => {
  const navigate = useNavigate();
  const { 
    profile, 
    tips, 
    setTips, 
    savedTips, 
    saveTip, 
    unsaveTip, 
    isLoading, 
    setIsLoading,
    error,
    setError
  } = useWellness();

  const [selectedTip, setSelectedTip] = useState<any>(null);
  const [isRegenerating, setIsRegenerating] = useState(false);

  useEffect(() => {
    if (profile && tips.length === 0) {
      generateWellnessTips();
    }
  }, [profile]);

  const generateWellnessTips = async () => {
    if (!profile) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const newTips = await generateTips(profile);
      setTips(newTips);
    } catch (err) {
      setError('Failed to generate tips. Please try again.');
      console.error('Error generating tips:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerate = async () => {
    setIsRegenerating(true);
    await generateWellnessTips();
    setIsRegenerating(false);
  };

  const isTipSaved = (tipId: string) => {
    return savedTips.some(saved => saved.id === tipId);
  };

  if (!profile) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-calm">
      {/* Header */}
      <div className="bg-card/80 backdrop-blur-sm border-b border-border/50 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/')}
                className="wellness-button"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  Your Wellness Tips
                </h1>
                <p className="text-muted-foreground">
                  Personalized for {profile.gender}, age {profile.age} • Goals: {profile.goals.join(', ')}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/saved')}
                className="wellness-button"
              >
                <Bookmark className="h-4 w-4 mr-2" />
                Saved ({savedTips.length})
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleRegenerate}
                disabled={isRegenerating}
                className="wellness-button"
              >
                {isRegenerating ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4 mr-2" />
                )}
                Regenerate
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Generating Your Wellness Tips
            </h3>
            <p className="text-muted-foreground text-center max-w-md">
              Our AI is creating personalized wellness recommendations based on your profile...
            </p>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">⚠️</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Oops! Something went wrong
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              {error}
            </p>
            <Button 
              onClick={generateWellnessTips}
              className="wellness-button gradient-wellness text-white"
            >
              Try Again
            </Button>
          </div>
        ) : tips.length > 0 ? (
          <>
            {/* Tips Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tips.map((tip, index) => (
                <div 
                  key={tip.id} 
                  className="slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <TipCard
                    tip={tip}
                    isSaved={isTipSaved(tip.id)}
                    onSave={() => saveTip(tip)}
                    onUnsave={() => unsaveTip(tip.id)}
                    onClick={() => setSelectedTip(tip)}
                    className="h-full"
                  />
                </div>
              ))}
            </div>

            {/* CTA for more tips */}
            <div className="text-center mt-12 p-8 bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl border border-primary/10">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Want fresh ideas?
              </h3>
              <p className="text-muted-foreground mb-4">
                Get a new set of personalized wellness tips
              </p>
              <Button 
                onClick={handleRegenerate}
                disabled={isRegenerating}
                className="wellness-button gradient-wellness text-white"
              >
                {isRegenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Generate New Tips
                  </>
                )}
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🌿</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No tips yet
            </h3>
            <p className="text-muted-foreground mb-6">
              Click the button below to generate your personalized wellness tips
            </p>
            <Button 
              onClick={generateWellnessTips}
              className="wellness-button gradient-wellness text-white"
            >
              Generate Tips
            </Button>
          </div>
        )}
      </div>

      {/* Tip Detail Modal */}
      <TipDetail
        tip={selectedTip}
        isOpen={!!selectedTip}
        onClose={() => setSelectedTip(null)}
        isSaved={selectedTip ? isTipSaved(selectedTip.id) : false}
        onSave={() => selectedTip && saveTip(selectedTip)}
        onUnsave={() => selectedTip && unsaveTip(selectedTip.id)}
      />
    </div>
  );
};

export default TipsPage;