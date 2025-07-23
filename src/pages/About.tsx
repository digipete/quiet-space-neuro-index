
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Heart, Target, Users, Award, Globe } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Brain,
      title: "Neuro-Inclusive",
      description: "We believe every mind deserves a workspace that supports their unique way of thinking and processing information."
    },
    {
      icon: Heart,
      title: "Empathy-Driven",
      description: "Our approach is grounded in understanding the real challenges faced by neurodiverse professionals."
    },
    {
      icon: Target,
      title: "Evidence-Based",
      description: "Every recommendation is backed by scientific research and validated through community feedback."
    },
    {
      icon: Users,
      title: "Community-Focused",
      description: "We're building a supportive network where neurodiverse professionals can share experiences and insights."
    }
  ];

  const team = [
    {
      name: "Dr. Sarah Chen",
      role: "Founder & CEO",
      description: "Neuroscientist and workplace accessibility advocate with 15 years of research experience."
    },
    {
      name: "Marcus Thompson",
      role: "Head of Research",
      description: "Occupational therapist specializing in sensory processing and environmental design."
    },
    {
      name: "Elena Rodriguez",
      role: "Community Manager",
      description: "Passionate about creating inclusive spaces and fostering neurodiverse communities."
    }
  ];

  const milestones = [
    {
      year: "2023",
      title: "Founded",
      description: "Quiet Space Club was born from personal experience and research into neuro-accessibility."
    },
    {
      year: "2023",
      title: "First 100 Spaces",
      description: "Launched with carefully curated spaces across London and Manchester."
    },
    {
      year: "2024",
      title: "Research Partnership",
      description: "Partnered with leading universities to validate our neuro-accessibility framework."
    },
    {
      year: "2024",
      title: "Community Growth",
      description: "Reached 10,000+ members and expanded to 50+ cities across the UK and Europe."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our Mission: Creating
              <span className="text-primary block">Neuro-Inclusive Workspaces</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              We're dedicated to transforming how neurodiverse professionals find and experience workspaces, 
              ensuring everyone has access to environments that support their unique needs.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-4 bg-card/30">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Story</h2>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="text-lg leading-relaxed mb-6">
                Quiet Space Club began when our founder, Dr. Sarah Chen, struggled to find workspaces that 
                accommodated her ADHD and sensory processing needs. Despite being a successful neuroscientist, 
                she found herself constantly battling environments that were too noisy, too bright, or simply 
                too overwhelming to focus in.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                After years of research and personal experience, Sarah realized that millions of neurodiverse 
                professionals face similar challenges. The solution wasn't just about finding quiet spaces—it 
                was about creating a systematic approach to evaluate and match individuals with environments 
                that truly support their cognitive and sensory needs.
              </p>
              <p className="text-lg leading-relaxed">
                Today, Quiet Space Club combines cutting-edge research in neuroscience, environmental psychology, 
                and accessibility to create the world's first comprehensive neuro-accessibility index for workspaces.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              These principles guide everything we do and shape how we approach workspace accessibility.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
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
              A diverse group of researchers, advocates, and professionals united by a common goal.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-center">{member.name}</CardTitle>
                  <CardDescription className="text-center text-primary font-medium">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Journey</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Key milestones in our mission to create neuro-inclusive workspaces.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-bold">{milestone.year}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{milestone.title}</h3>
                    <p className="text-muted-foreground">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Recognition Section */}
      <section className="py-20 px-4 bg-primary/5">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <Award className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Recognized by Leading Organizations
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Our work has been acknowledged by accessibility advocates, research institutions, 
              and neurodiverse communities worldwide.
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                <span>UN Accessibility Initiative</span>
              </div>
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                <span>Neurodiversity Foundation</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                <span>Inclusive Design Awards</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
