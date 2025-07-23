
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Book, Users, FileText, ExternalLink, Download, Video } from 'lucide-react';

const Resources = () => {
  const resourceCategories = [
    {
      icon: Book,
      title: "Research & Guidelines",
      description: "Scientific papers and best practices for neuro-inclusive design",
      resources: [
        "Neuro-Accessibility Design Guidelines",
        "Workspace Sensory Impact Study",
        "Cognitive Load in Office Environments",
        "Universal Design for Neurodiversity"
      ]
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Connect with other neurodiverse professionals and advocates",
      resources: [
        "Online Community Forum",
        "Local Meetup Groups",
        "Peer Support Networks",
        "Professional Development"
      ]
    },
    {
      icon: FileText,
      title: "Tools & Templates",
      description: "Practical resources for individuals and organizations",
      resources: [
        "Workspace Assessment Checklist",
        "Accommodation Request Templates",
        "Employer Guidelines",
        "Personal Needs Assessment"
      ]
    },
    {
      icon: Video,
      title: "Training & Education",
      description: "Learn about neuro-accessibility and inclusive design",
      resources: [
        "Webinar Series",
        "Online Courses",
        "Certification Programs",
        "Workshop Materials"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Resources for
              <span className="text-primary block">Neuro-Inclusive Workspaces</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Explore our comprehensive collection of research, tools, and community resources 
              to support neurodiverse professionals and inclusive organizations.
            </p>
          </div>
        </div>
      </section>

      {/* Resource Categories */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {resourceCategories.map((category, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <category.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{category.title}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {category.resources.map((resource, resourceIndex) => (
                      <li key={resourceIndex} className="flex items-center gap-2">
                        <ExternalLink className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{resource}</span>
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" className="w-full mt-6">
                    <Download className="w-4 h-4 mr-2" />
                    Access Resources
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Resources */}
      <section className="py-20 px-4 bg-card/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Resources</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Popular and recently updated resources from our community.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Neuro-Accessibility Workplace Guide</CardTitle>
                <CardDescription>Comprehensive 50-page guide for employers</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  A complete resource for creating neuro-inclusive workspaces, including assessment tools and implementation strategies.
                </p>
                <Button variant="outline" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Sensory Assessment Toolkit</CardTitle>
                <CardDescription>Interactive tools for personal evaluation</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Self-assessment tools to help identify your sensory preferences and workspace needs.
                </p>
                <Button variant="outline" className="w-full">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Launch Tool
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Community Guidelines</CardTitle>
                <CardDescription>Best practices for inclusive communities</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Guidelines for creating supportive and inclusive environments for neurodiverse professionals.
                </p>
                <Button variant="outline" className="w-full">
                  <Book className="w-4 h-4 mr-2" />
                  Read Online
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary/5">
        <div className="container mx-auto text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Our team is here to help you find the right resources for your needs.
            </p>
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <Link to="/contact">
                Contact Our Team
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Resources;
