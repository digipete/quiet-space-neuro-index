
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Brain, Search, Star, MapPin, CheckCircle, Users, Shield, Target, Lightbulb, Activity, Eye, Volume2, Thermometer, Zap } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      title: "Intelligent Search & Filtering",
      description: "Our advanced search considers your specific neurodiverse needs—ADHD, autism, sensory processing differences—alongside traditional location and amenity filters."
    },
    {
      icon: Brain,
      title: "Comprehensive Neuro-Accessibility Score",
      description: "Each space receives a detailed score based on our scientifically-validated framework covering sensory environment, cognitive load, and environmental predictability."
    },
    {
      icon: Star,
      title: "Authentic Community Insights",
      description: "Read detailed reviews from other neurodiverse professionals who share your specific challenges and understand what makes a workspace truly functional."
    },
    {
      icon: MapPin,
      title: "Visit with Confidence",
      description: "Book your space knowing it's been rigorously assessed and validated by both experts and community members with similar needs."
    }
  ];

  const scoringFactors = [
    {
      category: "Acoustic Environment",
      icon: Volume2,
      factors: [
        "Ambient noise levels (measured in dB)",
        "Sound absorption materials and ratings",
        "Noise control policies and enforcement",
        "Availability of quiet zones and phone booths",
        "Acoustic separation between work areas"
      ],
      weight: "25%",
      details: "Based on WHO guidelines for cognitive performance and sensory processing research"
    },
    {
      category: "Lighting & Visual Environment",
      icon: Eye,
      factors: [
        "Natural light availability and quality",
        "Adjustable artificial lighting options",
        "Glare reduction measures",
        "Visual distraction management",
        "Color temperature consistency"
      ],
      weight: "20%",
      details: "Evaluated using environmental psychology standards for cognitive load reduction"
    },
    {
      category: "Spatial Design & Layout",
      icon: Target,
      factors: [
        "Clear wayfinding and navigation",
        "Predictable spatial organization",
        "Personal space boundaries",
        "Flexibility and customization options",
        "Escape routes and break areas"
      ],
      weight: "20%",
      details: "Based on universal design principles and neurodiverse accessibility research"
    },
    {
      category: "Sensory Comfort",
      icon: Thermometer,
      factors: [
        "Temperature control and consistency",
        "Air quality and ventilation",
        "Texture variety and comfort",
        "Scent management policies",
        "Tactile considerations"
      ],
      weight: "15%",
      details: "Assessed through occupational therapy sensory processing frameworks"
    },
    {
      category: "Cognitive Support",
      icon: Brain,
      factors: [
        "Distraction management systems",
        "Focus-supporting tools and resources",
        "Variety in stimulation levels",
        "Predictable routines and policies",
        "Stress reduction features"
      ],
      weight: "20%",
      details: "Evaluated using cognitive load theory and ADHD-specific research"
    }
  ];

  const assessmentProcess = [
    {
      phase: "Initial Assessment",
      description: "Certified accessibility specialists conduct comprehensive on-site evaluations using standardized protocols.",
      tools: ["Decibel meters for sound measurement", "Lux meters for lighting analysis", "Environmental sensors", "Spatial analysis tools"]
    },
    {
      phase: "Expert Review",
      description: "Occupational therapists and environmental psychologists validate findings and provide detailed recommendations.",
      tools: ["Sensory processing assessments", "Cognitive load evaluations", "Universal design audits", "Accessibility compliance checks"]
    },
    {
      phase: "Community Validation",
      description: "Neurodiverse professionals test the space and provide detailed feedback on real-world functionality.",
      tools: ["User experience testing", "Sensory comfort surveys", "Productivity impact assessments", "Long-term usage studies"]
    },
    {
      phase: "Continuous Monitoring",
      description: "Regular reassessments ensure spaces maintain their standards and adapt to changing needs.",
      tools: ["Quarterly reviews", "User feedback integration", "Environmental monitoring", "Policy update tracking"]
    }
  ];

  const certificationLevels = [
    {
      level: "Neuro-Aware",
      score: "6.0 - 7.4",
      description: "Demonstrates basic understanding of neurodiverse needs with some accommodations available. Suitable for less sensitive individuals or short-term use.",
      color: "bg-amber-100 text-amber-800",
      features: ["Basic noise management", "Some lighting options", "Clear policies"]
    },
    {
      level: "Neuro-Friendly",
      score: "7.5 - 8.9",
      description: "Comprehensive neuro-accessibility features with multiple support options. Well-suited for most neurodiverse professionals.",
      color: "bg-blue-100 text-blue-800",
      features: ["Quiet zones available", "Adjustable environments", "Sensory considerations", "Flexible policies"]
    },
    {
      level: "Neuro-Optimized",
      score: "9.0 - 10.0",
      description: "Exceptional neuro-accessibility with comprehensive support systems. Ideal for highly sensitive individuals or those with complex needs.",
      color: "bg-emerald-100 text-emerald-800",
      features: ["Dedicated quiet spaces", "Full environmental control", "Sensory tools available", "Specialized support staff"]
    }
  ];

  const researchBasis = [
    {
      area: "Environmental Psychology",
      studies: ["Cognitive Load Theory applications", "Attention Restoration Theory", "Person-Environment Fit models"],
      impact: "Informs spatial design and environmental factor weighting"
    },
    {
      area: "Sensory Processing Research",
      studies: ["Sensory Processing Disorder frameworks", "Occupational therapy assessments", "Sensory modulation research"],
      impact: "Guides sensory environment evaluation criteria"
    },
    {
      area: "Neurodiversity Research",
      studies: ["ADHD workplace accommodations", "Autism environmental needs", "Executive function support systems"],
      impact: "Shapes scoring algorithms and user matching"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              How NeuroFlow Works
              <span className="text-primary block">The Science Behind Our Assessment</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Our NeuroFlow methodology combines cutting-edge research in environmental psychology, neuroscience, and occupational therapy to create the world's first comprehensive neuro-accessibility index.
            </p>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16 px-4 bg-card/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Your Journey to the Perfect Workspace</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From search to productivity—here's how we help you find environments that actually work for your brain.
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
                  <CardDescription className="text-base leading-relaxed">
                    {step.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Scoring Framework */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our NeuroFlow Scoring Framework
            </h2>
            <p className="text-xl text-muted-foreground">
              Each workspace is evaluated with NeuroFlow across five scientifically-validated dimensions that directly impact neurodiverse productivity and well-being.
            </p>
            </div>

            <div className="space-y-8">
              {scoringFactors.map((factor, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader className="bg-primary/5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <factor.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-xl">{factor.category}</CardTitle>
                          <CardDescription className="text-sm">{factor.details}</CardDescription>
                        </div>
                      </div>
                      <span className="text-lg font-bold bg-primary/10 text-primary px-3 py-1 rounded-full">
                        {factor.weight}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {factor.factors.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Assessment Process */}
      <section className="py-20 px-4 bg-card/30">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our NeuroFlow Assessment Process
            </h2>
            <p className="text-xl text-muted-foreground">
              Every space undergoes our comprehensive NeuroFlow four-phase evaluation to ensure accuracy and reliability.
            </p>
            </div>

            <div className="space-y-8">
              {assessmentProcess.map((phase, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <CardTitle className="text-xl">{phase.phase}</CardTitle>
                        <CardDescription className="text-base">{phase.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {phase.tools.map((tool, toolIndex) => (
                        <div key={toolIndex} className="flex items-center gap-2 text-sm">
                          <Activity className="w-4 h-4 text-primary" />
                          <span className="text-muted-foreground">{tool}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certification Levels */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Understanding Certification Levels
              </h2>
              <p className="text-xl text-muted-foreground">
                Our three-tier certification system helps you quickly identify spaces that match your specific needs and sensitivity levels.
              </p>
            </div>

            <div className="space-y-6">
              {certificationLevels.map((cert, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl flex items-center gap-2">
                          <Shield className="w-5 h-5 text-primary" />
                          {cert.level} Certification
                        </CardTitle>
                        <CardDescription className="text-base mt-2">{cert.description}</CardDescription>
                      </div>
                      <span className={`text-lg font-bold px-4 py-2 rounded-full ${cert.color}`}>
                        {cert.score}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                      {cert.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-success" />
                          <span className="text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Research Foundation */}
      <section className="py-20 px-4 bg-card/30">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Scientific Foundation
              </h2>
              <p className="text-xl text-muted-foreground">
                Our methodology is grounded in peer-reviewed research and validated through academic partnerships.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {researchBasis.map((research, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lightbulb className="w-5 h-5 text-primary" />
                      {research.area}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Key Studies:</h4>
                      <ul className="space-y-1">
                        {research.studies.map((study, studyIndex) => (
                          <li key={studyIndex} className="text-sm text-muted-foreground">• {study}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Impact:</h4>
                      <p className="text-sm text-muted-foreground">{research.impact}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary/5">
        <div className="container mx-auto text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Experience the Difference Science Makes
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of neurodiverse professionals who've discovered workspaces that truly support their unique needs through our evidence-based approach.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <Link to="/spaces">
                  <Search className="w-5 h-5 mr-2" />
                  Find Your Perfect Space
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
                <Link to="/about">
                  <Brain className="w-5 h-5 mr-2" />
                  Learn About Our Research
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
