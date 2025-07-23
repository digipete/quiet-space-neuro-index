
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Brain, Search, Star, MapPin, CheckCircle, Users, Shield, Target } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      title: "Search & Filter",
      description: "Use our advanced search to find spaces based on your specific needs—location, amenities, and neuro-accessibility features."
    },
    {
      icon: Brain,
      title: "Review Neuro Score",
      description: "Each space has a comprehensive neuro-accessibility score based on sensory comfort, cognitive load, and environmental factors."
    },
    {
      icon: Star,
      title: "Read Reviews",
      description: "Get insights from other neurodiverse professionals who have experienced these spaces firsthand."
    },
    {
      icon: MapPin,
      title: "Visit & Experience",
      description: "Book your space with confidence, knowing it's been vetted for neuro-accessibility and comfort."
    }
  ];

  const scoringFactors = [
    {
      category: "Acoustic Environment",
      factors: ["Background noise levels", "Sound absorption", "Noise control measures", "Quiet zones availability"],
      weight: "25%"
    },
    {
      category: "Lighting & Visual",
      factors: ["Natural light access", "Adjustable lighting", "Glare reduction", "Visual distractions"],
      weight: "20%"
    },
    {
      category: "Spatial Design",
      factors: ["Layout clarity", "Wayfinding", "Personal space", "Flexibility options"],
      weight: "20%"
    },
    {
      category: "Sensory Comfort",
      factors: ["Temperature control", "Air quality", "Texture variety", "Scent management"],
      weight: "15%"
    },
    {
      category: "Cognitive Support",
      factors: ["Distraction management", "Focus tools", "Break spaces", "Stimulation options"],
      weight: "20%"
    }
  ];

  const certificationLevels = [
    {
      level: "Bronze",
      score: "6.0 - 7.4",
      description: "Basic neuro-accessibility features with some accommodations available.",
      color: "bg-amber-100 text-amber-800"
    },
    {
      level: "Silver",
      score: "7.5 - 8.9",
      description: "Good neuro-accessibility with multiple support features and flexible options.",
      color: "bg-gray-100 text-gray-800"
    },
    {
      level: "Gold",
      score: "9.0 - 10.0",
      description: "Exceptional neuro-accessibility with comprehensive support and inclusive design.",
      color: "bg-yellow-100 text-yellow-800"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              How Our
              <span className="text-primary block">Neuro-Accessibility Index Works</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Discover how we evaluate and score workspaces to ensure they meet the unique needs 
              of neurodiverse professionals.
            </p>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16 px-4 bg-card/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple Process, Powerful Results</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Finding your perfect workspace is just four steps away.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <Card key={index} className="text-center relative">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <CardTitle className="text-lg">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    {step.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Neuro Score Explanation */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Understanding the Neuro-Accessibility Score
              </h2>
              <p className="text-xl text-muted-foreground">
                Our proprietary scoring system evaluates workspaces across five key dimensions 
                that impact neurodiverse professionals.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              <div>
                <h3 className="text-2xl font-bold mb-6">Scoring Framework</h3>
                <div className="space-y-4">
                  {scoringFactors.map((factor, index) => (
                    <Card key={index}>
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{factor.category}</CardTitle>
                          <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded">
                            {factor.weight}
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {factor.factors.map((item, itemIndex) => (
                            <div key={itemIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <CheckCircle className="w-4 h-4 text-success" />
                              {item}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-6">Certification Levels</h3>
                <div className="space-y-4">
                  {certificationLevels.map((cert, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{cert.level} Certification</CardTitle>
                          <span className={`text-sm px-3 py-1 rounded-full ${cert.color}`}>
                            {cert.score}
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{cert.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Validation Process */}
      <section className="py-20 px-4 bg-card/30">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Our Validation Process
              </h2>
              <p className="text-xl text-muted-foreground">
                Every space in our index undergoes rigorous evaluation to ensure accuracy and reliability.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Expert Assessment</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Trained accessibility specialists conduct on-site evaluations using standardized protocols.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Community Feedback</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Real experiences from neurodiverse users validate and refine our assessments.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Ongoing Monitoring</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Regular reviews ensure spaces maintain their standards and adapt to changing needs.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary/5">
        <div className="container mx-auto text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Experience the Difference?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Start exploring neuro-accessible workspaces that truly support your unique needs.
            </p>
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <Link to="/spaces">
                <Search className="w-5 h-5 mr-2" />
                Find Your Perfect Space
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
