import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Heart, HeartIcon, X, Loader2 } from 'lucide-react';
import { WellnessTip, useWellness } from '@/context/WellnessContext';
import { getTipDetails } from '@/services/tipService';

interface TipDetailProps {
  tip: WellnessTip | null;
  isOpen: boolean;
  onClose: () => void;
  isSaved?: boolean;
  onSave?: () => void;
  onUnsave?: () => void;
}

const TipDetail: React.FC<TipDetailProps> = ({ 
  tip, 
  isOpen, 
  onClose, 
  isSaved = false,
  onSave,
  onUnsave
}) => {
  const { profile } = useWellness();
  const [details, setDetails] = useState<{ explanation: string; steps: string[] } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (tip && isOpen && profile) {
      setIsLoading(true);
      getTipDetails(tip.title, profile)
        .then(setDetails)
        .catch(console.error)
        .finally(() => setIsLoading(false));
    }
  }, [tip, isOpen, profile]);

  if (!tip) return null;

  const handleSaveClick = () => {
    if (isSaved) {
      onUnsave?.();
    } else {
      onSave?.();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      {/* 👇 only your custom close button now */}
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card/95 backdrop-blur-sm border-border/50">
        <DialogHeader className="relative">
          {/* <Button
            variant="ghost"
            size="sm"
            className="absolute -top-2 -right-2 p-2 h-8 w-8 rounded-full"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button> */}
          
          <div className="text-center space-y-4 pt-4">
            <div className="text-6xl">
              {tip.icon}
            </div>
            <DialogTitle className="text-2xl font-bold text-foreground">
              {tip.title}
            </DialogTitle>
            <p className="text-muted-foreground text-lg">
              {tip.description}
            </p>
            
            {/* Category and Save Button */}
            <div className="flex items-center justify-center gap-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
                {tip.category}
              </span>
              
              {(onSave || onUnsave) && (
                <Button
                  variant="outline"
                  size="sm"
                  className="wellness-button"
                  onClick={handleSaveClick}
                >
                  {isSaved ? (
                    <>
                      <Heart className="h-4 w-4 mr-2 fill-destructive text-destructive" />
                      Saved
                    </>
                  ) : (
                    <>
                      <HeartIcon className="h-4 w-4 mr-2" />
                      Save Tip
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-3 text-muted-foreground">Loading details...</span>
            </div>
          ) : details ? (
            <>
              {/* Explanation */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-foreground">Why This Works</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {details.explanation}
                </p>
              </div>

              {/* Action Steps */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-foreground">How to Get Started</h3>
                <div className="space-y-3">
                  {details.steps.map((step, index) => (
                    <div 
                      key={index} 
                      className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg border border-border/30"
                    >
                      <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                        {index + 1}
                      </div>
                      <p className="text-foreground leading-relaxed">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Encouragement */}
              <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg p-6 text-center border border-primary/10">
                <p className="text-foreground font-medium">
                  Remember: Small, consistent steps lead to lasting wellness changes! 🌱
                </p>
              </div>
            </>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              Failed to load tip details. Please try again.
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TipDetail;
