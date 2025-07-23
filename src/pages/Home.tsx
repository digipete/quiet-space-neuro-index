
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, MapPin, Star, Shield, Search, Users, Award, TrendingUp, Heart } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: Brain,
      title: "Science-Based Neuro Index",
      description: "Our proprietary scoring system combines environmental psychology, neuroscience research, and sensory processing expertise to evaluate workspace compatibility."
    },
    {
      icon: MapPin,
      title: "Verified Accessibility Profiles",
      description: "Every space undergoes rigorous on-site assessment by certified accessibility specialists, ensuring accurate and reliable neuro-accessibility ratings."
    },
    {
      icon: Star,
      title: "Authentic Community Reviews",
      description: "Real experiences from ADHD, autistic, and sensory-sensitive professionals provide genuine insights into workspace functionality."
    },
    {
      icon: Shield,
      title: "Continuous Validation",
      description: "Our dynamic scoring system evolves with user feedback, ensuring spaces maintain their accessibility standards over time."
    }
  ];

  const stats = [
    { value: "2,400+", label: "Neurodiverse Professionals Helped" },
    { value: "340+", label: "Certified Accessible Spaces" },
    { value: "28", label: "UK Cities Covered" },
    { value: "9.2/10", label: "Average User Satisfaction" }
  ];

  const testimonials = [
    {
      quote: "Finding spaces that don't overwhelm my sensory processing has transformed my productivity. The neuro-accessibility scores are incredibly accurate.",
      author: "Sarah M.",
      role: "Software Developer with ADHD",
      rating: 5
    },
    {
      quote: "As someone with autism, I need predictable, low-stimulation environments. Quiet Space Club's detailed profiles help me avoid spaces that would cause meltdowns.",
      author: "Marcus T.",
      role: "Data Analyst",
      rating: 5
    },
    {
      quote: "The community reviews from other neurodiverse professionals are invaluable. They understand the specific challenges I face with sensory overload.",
      author: "Elena R.",
      role: "Graphic Designer",
      rating: 5
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < rating ? 'fill-warning text-warning' : 'text-muted-foreground/30'}`} />
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                <Brain className="w-4 h-4" />
                Backed by Neuroscience Research
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Workspaces That Actually Work
              <span className="text-primary block">For Neurodiverse Minds</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Born from personal experience with ADHD and sensory processing challenges, our platform uses scientific methodology to match you with environments that support your unique cognitive needs—not overwhelm them.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <Link to="/spaces">
                  <Search className="w-5 h-5 mr-2" />
                  Search NeuroIndex
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
                <Link to="/how-it-works">
                  <Brain className="w-5 h-5 mr-2" />
                  See How It Works
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-16 px-4 bg-primary/5">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              The Hidden Workplace Challenge
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-card rounded-lg p-6 border border-border/50">
                <div className="text-3xl font-bold text-primary mb-2">20%</div>
                <p className="text-muted-foreground">of the workforce is neurodiverse</p>
              </div>
              <div className="bg-card rounded-lg p-6 border border-border/50">
                <div className="text-3xl font-bold text-primary mb-2">78%</div>
                <p className="text-muted-foreground">struggle with sensory overload in traditional offices</p>
              </div>
              <div className="bg-card rounded-lg p-6 border border-border/50">
                <div className="text-3xl font-bold text-primary mb-2">3x</div>
                <p className="text-muted-foreground">higher productivity in neuro-accessible spaces</p>
              </div>
            </div>
            <p className="text-lg text-muted-foreground">
              Standard workspace directories ignore the sensory and cognitive needs that make or break productivity for neurodiverse professionals. We're changing that.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4">
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
              Why Neurodiverse Professionals Choose Us
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We understand that finding the right workspace isn't just about location or price—it's about creating an environment where your mind can thrive.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-left">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-card/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Real Stories from Our Community
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Hear from neurodiverse professionals who've found their perfect workspace through our platform.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="text-left">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    {renderStars(testimonial.rating)}
                  </div>
                  <blockquote className="text-muted-foreground mb-4 italic">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="text-sm">
                    <div className="font-semibold">{testimonial.author}</div>
                    <div className="text-muted-foreground">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Research Foundation */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <Award className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Scientifically Validated Approach
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Our methodology is grounded in peer-reviewed research from environmental psychology, occupational therapy, and neuroscience, ensuring every recommendation is evidence-based.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center gap-2">
                <Brain className="w-8 h-8 text-primary" />
                <span className="font-medium">Cognitive Load Theory</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Heart className="w-8 h-8 text-primary" />
                <span className="font-medium">Sensory Processing Research</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <TrendingUp className="w-8 h-8 text-primary" />
                <span className="font-medium">Environmental Psychology</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary/5">
        <div className="container mx-auto text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Find Your Productive Space?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of neurodiverse professionals who've transformed their work experience by finding spaces that truly support their needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <Link to="/spaces">
                  <Search className="w-5 h-5 mr-2" />
                  Explore NeuroIndex
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
                <Link to="/about">
                  <Users className="w-5 h-5 mr-2" />
                  Learn Our Story
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
