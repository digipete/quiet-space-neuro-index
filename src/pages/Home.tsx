
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, MapPin, Star, Shield, Search, Users } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: Brain,
      title: "Neuro-Accessibility Index",
      description: "Scientifically-backed scoring system evaluating sensory comfort, cognitive load, and environmental factors."
    },
    {
      icon: MapPin,
      title: "Curated Locations",
      description: "Handpicked spaces that prioritize neurodiverse needs with detailed accessibility profiles."
    },
    {
      icon: Star,
      title: "Community Reviews",
      description: "Real experiences from neurodiverse professionals help you make informed decisions."
    },
    {
      icon: Shield,
      title: "Certified Spaces",
      description: "Verified by accessibility experts and validated through user feedback."
    }
  ];

  const stats = [
    { value: "500+", label: "Verified Spaces" },
    { value: "50+", label: "Cities Covered" },
    { value: "10,000+", label: "Community Members" },
    { value: "4.8/5", label: "Average Rating" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Find Your Perfect
              <span className="text-primary block">Neuro-Friendly Workspace</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Discover thoughtfully designed workspaces that support neurodiverse professionals. 
              Our scientific approach ensures every space meets your unique needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <Link to="/spaces">
                  <Search className="w-5 h-5 mr-2" />
                  Find Spaces
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
                <Link to="/how-it-works">
                  Learn How It Works
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 bg-card/30">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose Quiet Space Club?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We understand that finding the right workspace can make all the difference 
              in your productivity and well-being.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary/5">
        <div className="container mx-auto text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Find Your Ideal Workspace?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of neurodiverse professionals who have found their perfect workspace 
              through our platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <Link to="/spaces">
                  <Users className="w-5 h-5 mr-2" />
                  Start Exploring
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
                <Link to="/about">
                  Learn More About Us
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
