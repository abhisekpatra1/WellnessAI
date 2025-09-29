import React from 'react';
import { Heart, HeartIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WellnessTip } from '@/context/WellnessContext';

interface TipCardProps {
  tip: WellnessTip;
  isSaved?: boolean;
  onSave?: () => void;
  onUnsave?: () => void;
  onClick?: () => void;
  className?: string;
}

const TipCard: React.FC<TipCardProps> = ({ 
  tip, 
  isSaved = false, 
  onSave, 
  onUnsave, 
  onClick,
  className = ""
}) => {
  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSaved) {
      onUnsave?.();
    } else {
      onSave?.();
    }
  };

  return (
    <div 
      className={`tip-card group relative ${className}`}
      onClick={onClick}
    >
      {/* Save/Unsave Button */}
      {(onSave || onUnsave) && (
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-4 right-4 p-2 h-8 w-8 rounded-full wellness-button z-10"
          onClick={handleSaveClick}
        >
          {isSaved ? (
            <Heart className="h-4 w-4 fill-destructive text-destructive" />
          ) : (
            <HeartIcon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
          )}
        </Button>
      )}

      {/* Tip Icon */}
      <div className="text-4xl mb-4 text-center">
        {tip.icon}
      </div>

      {/* Tip Content */}
      <div className="text-center space-y-3">
        <h3 className="font-semibold text-lg text-foreground leading-tight">
          {tip.title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {tip.description}
        </p>
        
        {/* Category Badge */}
        <div className="flex justify-center">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
            {tip.category}
          </span>
        </div>
      </div>

      {/* Hover Effect Indicator */}
      {onClick && (
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl pointer-events-none" />
      )}
    </div>
  );
};

export default TipCard;