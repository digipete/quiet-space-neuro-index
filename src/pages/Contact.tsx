
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Mail, Phone, MapPin, Clock, MessageCircle, Users, Building } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase, type ContactSubmission } from '@/lib/supabase';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    inquiryType: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Check if Supabase is configured
      if (!supabase) {
        toast({
          title: "Configuration Required",
          description: "Supabase connection is not properly configured. Please check your environment variables.",
          variant: "destructive"
        });
        return;
      }

      const contactSubmission: Omit<ContactSubmission, 'id' | 'created_at'> = {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        inquiry_type: formData.inquiryType,
        status: 'new'
      };

      const { error } = await supabase
        .from('contact_submissions')
        .insert([contactSubmission]);

      if (error) {
        throw error;
      }

      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for your message. We'll get back to you within 24 hours.",
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        inquiryType: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOtherButtonClick = () => {
    toast({
      title: "Contact Form Required",
      description: "Please use the contact form to contact us",
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      description: "hello@quietspace.club",
      action: "Send Email"
    },
    {
      icon: Phone,
      title: "Call Us",
      description: "+44 (0) 20 7123 4567",
      action: "Call Now"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      description: "London, UK",
      action: "Get Directions"
    },
    {
      icon: Clock,
      title: "Office Hours",
      description: "Mon-Fri: 9AM-6PM GMT",
      action: "Schedule Call"
    }
  ];

  const inquiryTypes = [
    { value: "general", label: "General Inquiry" },
    { value: "space-listing", label: "List a Space" },
    { value: "partnership", label: "Partnership Opportunity" },
    { value: "support", label: "Technical Support" },
    { value: "feedback", label: "Feedback & Suggestions" },
    { value: "press", label: "Press & Media" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Get in Touch
              <span className="text-primary block">We're Here to Help</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Have questions about neuro-accessible workspaces? Want to list your space? 
              We'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

     {/* Contact Information */}
     {/* <section className="py-16 px-4 bg-card/30">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <info.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{info.title}</CardTitle>
                  <CardDescription>{info.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    {info.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section> */}

      {/* Contact Form */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Form */}
              <div>
                <h2 className="text-3xl font-bold mb-6">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="inquiryType">Inquiry Type</Label>
                    <Select value={formData.inquiryType} onValueChange={(value) => setFormData(prev => ({ ...prev, inquiryType: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select inquiry type" />
                      </SelectTrigger>
                      <SelectContent>
                        {inquiryTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={6}
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    <MessageCircle className="w-4 h-4 mr-2" />
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </div>

              {/* Additional Information */}
              <div>
                <h2 className="text-3xl font-bold mb-6">Other Ways to Connect</h2>
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <Building className="w-6 h-6 text-primary" />
                        <div>
                          <CardTitle className="text-lg">List Your Space</CardTitle>
                          <CardDescription>
                            Are you a workspace provider interested in joining our network?
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        We're always looking for neuro-friendly spaces to add to our platform. 
                        Get in touch to learn about our certification process.
                      </p>
                      <Button variant="outline" className="w-full" onClick={handleOtherButtonClick}>
                        Partnership Inquiry
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <Users className="w-6 h-6 text-primary" />
                        <div>
                          <CardTitle className="text-lg">Community Support</CardTitle>
                          <CardDescription>
                            Connect with other neurodiverse professionals
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Join our community forums and local meetups to share experiences 
                        and get support from peers.
                      </p>
                      <Button variant="outline" className="w-full" onClick={handleOtherButtonClick}>
                        Join Community
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <MessageCircle className="w-6 h-6 text-primary" />
                        <div>
                          <CardTitle className="text-lg">Live Chat</CardTitle>
                          <CardDescription>
                            Get instant help from our support team
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Our live chat is available during business hours for quick questions 
                        and technical support.
                      </p>
                      <Button variant="outline" className="w-full" onClick={handleOtherButtonClick}>
                        Start Chat
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-card/30">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-muted-foreground">
                Quick answers to common questions about Quiet Space Club.
              </p>
            </div>
            
            <div className="space-y-4">
              {[
                {
                  question: "How do you evaluate spaces for neuro-accessibility?",
                  answer: "We use a comprehensive framework that assesses acoustic comfort, lighting, spatial design, sensory factors, and cognitive support features."
                },
                {
                  question: "Can I suggest a space for evaluation?",
                  answer: "Absolutely! We welcome suggestions from our community. Contact us with the space details and we'll consider it for evaluation."
                },
                {
                  question: "Do you offer training for workspace providers?",
                  answer: "Yes, we provide training and consultation services to help workspace providers improve their neuro-accessibility features."
                },
                {
                  question: "How often are spaces re-evaluated?",
                  answer: "We conduct regular reviews and updates based on user feedback and any changes to the workspace environment."
                }
              ].map((faq, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
