import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Heart, Brain, Zap, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '@/components/ThemeToggle';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Heart className="h-8 w-8 text-primary" />,
      title: "Personalized Tips",
      description: "Get wellness recommendations tailored to your unique goals and lifestyle"
    },
    {
      icon: <Brain className="h-8 w-8 text-accent" />,
      title: "AI-Powered Insights",
      description: "Advanced algorithms analyze your profile to deliver the most relevant advice"
    },
    {
      icon: <Zap className="h-8 w-8 text-primary" />,
      title: "Instant Results",
      description: "Receive your personalized wellness plan in seconds, not hours"
    },
    {
      icon: <Shield className="h-8 w-8 text-accent" />,
      title: "Science-Based",
      description: "All recommendations are backed by scientific research and expert knowledge"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-calm">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50 p-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌿</span>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              WellnessAI
            </span>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="fade-in">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Your Personal
              <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Wellness Journey
              </span>
              Starts Here
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Discover AI-powered wellness recommendations tailored specifically for you. 
              Transform your health with personalized tips that fit your lifestyle and goals.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Button 
                onClick={() => navigate('/profile')}
                size="lg"
                className="wellness-button gradient-wellness text-white text-lg px-8 py-4 rounded-full shadow-xl hover:shadow-2xl"
              >
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button 
                variant="outline"
                size="lg"
                className="wellness-button text-lg px-8 py-4 rounded-full border-2"
                onClick={() => {
                  document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Learn More
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">20+</div>
                <div className="text-muted-foreground">Wellness Categories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-2">AI</div>
                <div className="text-muted-foreground">Powered Recommendations</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">∞</div>
                <div className="text-muted-foreground">Personalized Tips</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 slide-up">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Why Choose WellnessAI?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the future of personalized wellness with our cutting-edge AI technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="wellness-card bg-card/80 backdrop-blur-sm border-border/50 text-center p-6 slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="wellness-card bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20 p-12">
            <CardContent>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Ready to Transform Your Wellness?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of users who have already started their personalized wellness journey
              </p>
              <Button 
                onClick={() => navigate('/profile')}
                size="lg"
                className="wellness-button gradient-wellness text-white text-lg px-12 py-4 rounded-full shadow-xl"
              >
                Get Started Now
                <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border/20">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-2xl">🌿</span>
            <span className="text-lg font-semibold text-foreground">WellnessAI</span>
          </div>
          <p className="text-muted-foreground text-sm">
            Empowering your wellness journey with AI-driven insights
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;