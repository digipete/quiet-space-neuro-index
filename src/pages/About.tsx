
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Heart, Target, Users, Award, Globe, Lightbulb, CheckCircle } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Brain,
      title: "Evidence-Based Approach",
      description: "Every aspect of our platform is grounded in neuroscience research, environmental psychology, and occupational therapy principles."
    },
    {
      icon: Heart,
      title: "Lived Experience",
      description: "Our team includes neurodiverse professionals who understand firsthand the challenges of finding suitable workspaces."
    },
    {
      icon: Target,
      title: "Precision Matching",
      description: "We go beyond generic accessibility to provide detailed, specific information about sensory and cognitive compatibility."
    },
    {
      icon: Users,
      title: "Community-Centered",
      description: "Our platform thrives on authentic feedback from the neurodiverse community, ensuring real-world relevance."
    }
  ];

  const team = [
    {
      name: "Dr. Sarah Chen",
      role: "Founder & CEO",
      description: "Neuroscientist with ADHD who struggled for years to find workspaces that didn't overwhelm her sensory processing. Her personal journey combined with 12 years of research led to the creation of our neuro-accessibility framework.",
      expertise: "Environmental Neuroscience, ADHD Research"
    },
    {
      name: "Marcus Thompson",
      role: "Head of Research & Assessment",
      description: "Occupational therapist and autism advocate who developed our sensory evaluation protocols. His work focuses on translating complex sensory needs into actionable workspace modifications.",
      expertise: "Sensory Processing, Occupational Therapy"
    },
    {
      name: "Elena Rodriguez",
      role: "Community & User Experience",
      description: "UX researcher with dyslexia who ensures our platform is accessible and intuitive. She leads our community feedback integration and user advocacy initiatives.",
      expertise: "Accessible Design, Community Management"
    }
  ];

  const milestones = [
    {
      year: "2022",
      title: "The Struggle Begins",
      description: "Dr. Sarah Chen's personal experience with sensory overload in traditional coworking spaces sparked the initial research into neuro-accessibility."
    },
    {
      year: "2023",
      title: "Research Foundation",
      description: "Partnered with University College London to develop the first scientifically-validated neuro-accessibility scoring system."
    },
    {
      year: "2023",
      title: "Beta Launch",
      description: "Launched with 50 carefully assessed spaces across London, Manchester, and Birmingham, serving our first 500 users."
    },
    {
      year: "2024",
      title: "Community Growth",
      description: "Reached 2,400+ neurodiverse professionals and expanded to 340+ certified spaces across 28 UK cities."
    },
    {
      year: "2024",
      title: "Research Validation",
      description: "Published findings in the Journal of Environmental Psychology, validating our approach and methodology."
    }
  ];

  const researchPartners = [
    "University College London - Environmental Psychology Lab",
    "Imperial College London - Neuroscience Department",
    "Autism Research Centre, University of Cambridge",
    "National Autistic Society - Research Division"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Born from Personal Experience,
              <span className="text-primary block">Backed by Science</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              What started as one neuroscientist's struggle with sensory overload has become a movement to transform how neurodiverse professionals find and experience workspaces.
            </p>
          </div>
        </div>
      </section>

      {/* Founder Story Section */}
      <section className="py-16 px-4 bg-card/30">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">The Story Behind Our Mission</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p className="text-lg leading-relaxed">
                    "Quiet Space Club was born from a deeply personal journey by our founding team over the last 25 years."
                  </p>
                  <p className="text-lg leading-relaxed">
                    "Throughout their career, our founders struggled to find a place where thery truly fit in. Misunderstood and often pushed aside due to their neurodivergence often facing environments that stifled potential instead of nurturing it."
                  </p>
                  <p className="text-lg leading-relaxed">
                    "These experiences planted a seed: what if workplaces could be different? What if they could embrace the unique strengths of neurodivergent individuals instead of marginalising them?"
                  </p>
                  <p className="text-lg leading-relaxed">
                    "Driven by this vision, Quiet Space Club was created to redefine what it means to belong in the workplace. It’s a mission rooted in personal experience but aimed at creating a truly accessible future of work for everyone."
                  </p>
                </div>
              </div>
              <div className="bg-primary/5 rounded-lg p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Lightbulb className="w-6 h-6 text-primary" />
                  <span className="font-semibold">The Breakthrough Moment</span>
                </div>
                <p className="text-muted-foreground mb-4">
                  "I realized that what we needed wasn't just another workspace directory—we needed a platform that understood the neuroscience behind productivity and environmental compatibility."
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span className="text-sm">20% of workforce is neurodiverse</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span className="text-sm">78% struggle with sensory overload</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span className="text-sm">3x productivity increase in suitable environments</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Values</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              These principles guide every decision we make and every feature we develop.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-left">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 bg-card/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A diverse group of researchers, advocates, and professionals who understand the neurodiverse experience from both scientific and personal perspectives.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-left">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Brain className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-center">{member.name}</CardTitle>
                  <CardDescription className="text-center text-primary font-medium">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {member.description}
                  </p>
                  <div className="text-xs text-primary font-medium">
                    Expertise: {member.expertise}
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
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Research Foundation</h2>
              <p className="text-xl text-muted-foreground">
                Our methodology is validated through partnerships with leading research institutions.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary" />
                    Research Partners
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {researchPartners.map((partner, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                        <span>{partner}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-primary" />
                    Published Research
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    <li>
                      <strong>Journal of Environmental Psychology (2024)</strong><br />
                      "Neuro-Accessibility in Workspace Design: A Framework for Evaluation"
                    </li>
                    <li>
                      <strong>Applied Ergonomics (2024)</strong><br />
                      "Sensory Processing and Cognitive Load in Coworking Environments"
                    </li>
                    <li>
                      <strong>Autism Research (2024)</strong><br />
                      "User-Centered Design for Neurodiverse Workspace Platforms"
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-20 px-4 bg-card/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Journey</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From personal struggle to scientific breakthrough—the milestones that shaped our mission.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-bold text-sm">{milestone.year}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{milestone.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 px-4 bg-primary/5">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Making a Real Difference
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Every neurodiverse professional who finds their ideal workspace through our platform validates our mission and drives us to reach more people who need support.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-card rounded-lg p-6 border border-border/50">
                <div className="text-3xl font-bold text-primary mb-2">2,400+</div>
                <p className="text-muted-foreground">Professionals matched with suitable workspaces</p>
              </div>
              <div className="bg-card rounded-lg p-6 border border-border/50">
                <div className="text-3xl font-bold text-primary mb-2">340+</div>
                <p className="text-muted-foreground">Spaces certified for neuro-accessibility</p>
              </div>
              <div className="bg-card rounded-lg p-6 border border-border/50">
                <div className="text-3xl font-bold text-primary mb-2">92%</div>
                <p className="text-muted-foreground">Report improved productivity and well-being</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
