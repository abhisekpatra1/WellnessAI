import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Search, Heart, Trash2 } from 'lucide-react';
import TipCard from '@/components/TipCard';
import TipDetail from '@/components/TipDetail';
import { useWellness } from '@/context/WellnessContext';
import { useNavigate } from 'react-router-dom';

const SavedTipsPage: React.FC = () => {
  const navigate = useNavigate();
  const { savedTips, unsaveTip } = useWellness();
  const [selectedTip, setSelectedTip] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTips = savedTips.filter(tip =>
    tip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tip.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tip.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-calm">
      {/* Header */}
      <div className="bg-card/80 backdrop-blur-sm border-b border-border/50 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/tips')}
                className="wellness-button"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Tips
              </Button>
              
              <div>
                <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                  <Heart className="h-6 w-6 fill-destructive text-destructive" />
                  Saved Tips
                </h1>
                <p className="text-muted-foreground">
                  {savedTips.length} tip{savedTips.length !== 1 ? 's' : ''} saved for later
                </p>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          {savedTips.length > 0 && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search saved tips..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background/50 border-border focus:ring-primary"
              />
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {savedTips.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">💝</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No saved tips yet
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Start saving wellness tips that resonate with you. Your saved tips will appear here for easy access anytime.
            </p>
            <Button 
              onClick={() => navigate('/tips')}
              className="wellness-button gradient-wellness text-white"
            >
              Explore Tips
            </Button>
          </div>
        ) : filteredTips.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No tips match your search
            </h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search terms or browse all your saved tips
            </p>
            <Button 
              onClick={() => setSearchQuery('')}
              variant="outline"
              className="wellness-button"
            >
              Clear Search
            </Button>
          </div>
        ) : (
          <>
            {/* Results Count */}
            <div className="mb-6">
              <p className="text-muted-foreground">
                {searchQuery ? (
                  <>Showing {filteredTips.length} of {savedTips.length} saved tips</>
                ) : (
                  <>Showing all {savedTips.length} saved tips</>
                )}
              </p>
            </div>

            {/* Tips Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTips.map((tip, index) => (
                <div 
                  key={tip.id} 
                  className="slide-up relative group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <TipCard
                    tip={tip}
                    isSaved={true}
                    onUnsave={() => unsaveTip(tip.id)}
                    onClick={() => setSelectedTip(tip)}
                    className="h-full"
                  />
                  
                  {/* Quick delete button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute bottom-4 right-4 p-2 h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity bg-destructive/10 hover:bg-destructive/20"
                    onClick={(e) => {
                      e.stopPropagation();
                      unsaveTip(tip.id);
                    }}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              ))}
            </div>

            {/* Footer message */}
            <div className="text-center mt-12 p-6 bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl border border-primary/10">
              <p className="text-muted-foreground">
                💡 <strong>Tip:</strong> Click on any saved tip to view detailed instructions and steps!
              </p>
            </div>
          </>
        )}
      </div>

      {/* Tip Detail Modal */}
      <TipDetail
        tip={selectedTip}
        isOpen={!!selectedTip}
        onClose={() => setSelectedTip(null)}
        isSaved={true}
        onUnsave={() => selectedTip && unsaveTip(selectedTip.id)}
      />
    </div>
  );
};

export default SavedTipsPage;