import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, TrendingUp, Users, Shield, Database, Code, Globe } from 'lucide-react';

const WorkspaceProviders = () => {
  const certificationBenefits = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Industry Recognition",
      description: "Alignment with the latest standards and expectations for inclusivity"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Human-Centered Design",
      description: "Certifications ensure humans feel valued, understood and comfortable"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Business Growth",
      description: "Neuro-inclusive environments increase utilisation, reputation and revenue"
    }
  ];

  const dataFeatures = [
    {
      icon: <Database className="w-6 h-6" />,
      title: "Standardised Register",
      description: "Comprehensive registry of certifications and accessibility ratings"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Community Index",
      description: "Curated index of places that provide for the neurodiverse community"
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "AI-Ready Data",
      description: "Structured data for AI and language models to build from a trusted source"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Join the <span className="text-primary">NeuroIndex</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
          Get your workspace certified and become part of the globally recognised directory 
          for trusted neuro-accessible environments.
        </p>
        <Button size="lg" className="mr-4">
          Start Certification
        </Button>
        <Button variant="outline" size="lg">
          View Sample Report
        </Button>
      </div>

      {/* Get Certified Section */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Get Certified with NeuroFlow</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our comprehensive 150-point certification ensures your workspaces are designed to 
            minimise sensory overload with features like noise control, adaptable lighting, and quiet zones.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {certificationBenefits.map((benefit, index) => (
            <Card key={index} className="text-center">
              <CardHeader>
                <div className="flex justify-center mb-4 text-primary">
                  {benefit.icon}
                </div>
                <CardTitle className="text-xl">{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {benefit.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Certification Process */}
        <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Certification Process</CardTitle>
            <CardDescription>Simple steps to get your workspace certified</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                  1
                </div>
                <h4 className="font-semibold mb-2">Application</h4>
                <p className="text-sm text-muted-foreground">Submit your workspace details and schedule assessment</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                  2
                </div>
                <h4 className="font-semibold mb-2">NeuroFlow Assessment</h4>
                <p className="text-sm text-muted-foreground">Our experts conduct comprehensive 150-point evaluation</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                  3
                </div>
                <h4 className="font-semibold mb-2">Recommendations</h4>
                <p className="text-sm text-muted-foreground">Receive detailed report with improvement suggestions</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                  4
                </div>
                <h4 className="font-semibold mb-2">Certification</h4>
                <p className="text-sm text-muted-foreground">Get listed on NeuroIndex with your accessibility rating</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data & API Section */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Data & API Solutions</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We deliver well-structured data around people and places that can feed generative AI 
            and language models to make this information accessible to all internet users.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {dataFeatures.map((feature, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="text-primary">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Card className="bg-gradient-to-r from-secondary/20 to-secondary/30 border-secondary/40 max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl">Enterprise API Access</CardTitle>
              <CardDescription className="text-lg">
                Integrate NeuroIndex data into your applications and services
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium">Real-time accessibility data</p>
                    <p className="text-sm text-muted-foreground">Live updates on workspace ratings and certifications</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium">Comprehensive search filters</p>
                    <p className="text-sm text-muted-foreground">Filter by location, amenities, and accessibility features</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium">Machine-readable formats</p>
                    <p className="text-sm text-muted-foreground">JSON, XML, and GraphQL endpoints available</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium">Developer documentation</p>
                    <p className="text-sm text-muted-foreground">Complete API docs with code examples</p>
                  </div>
                </div>
              </div>
              <div className="pt-4">
                <Button className="mr-4">
                  Request API Access
                </Button>
                <Button variant="outline">
                  View Documentation
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Contact Section */}
      <div className="text-center bg-muted/50 rounded-lg p-8">
        <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Join the growing network of neuro-inclusive workspaces. Contact us to begin your certification 
          process or learn more about our API solutions.
        </p>
        <Button size="lg" className="mr-4">
          Contact Sales Team
        </Button>
        <Button variant="outline" size="lg">
          Schedule Demo
        </Button>
        <div className="mt-4 text-sm text-muted-foreground">
          Questions? Email us at <a href="mailto:hello@quietspace.club" className="text-primary hover:underline">hello@quietspace.club</a>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceProviders;