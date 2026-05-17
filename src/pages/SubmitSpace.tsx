import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import DOMPurify from 'dompurify';
import { SEO } from '@/components/SEO';
import { CheckCircle, Star, Users, Award, Heart, Loader2 } from 'lucide-react';

const NEURO_FEATURES = [
  'Quiet Zones',
  'Adjustable Lighting',
  'No Fluorescent Lights',
  'Acoustic Treatment',
  'Sensory Break Room',
  'Biophilic Design',
  'Natural Light',
  'Air Filtration',
  'Temperature Control',
  'Ergonomic Seating',
  'Private Pods',
  'White Noise Systems',
  'Calm Colour Palette',
  'Minimal Visual Clutter',
  'Flexible Layout',
];

const BENEFITS = [
  {
    icon: Users,
    text: 'Reach 10,000+ neurodiverse professionals',
  },
  {
    icon: Star,
    text: 'Free to list during beta',
  },
  {
    icon: Award,
    text: 'Get your QSC Neuro Score',
  },
  {
    icon: Heart,
    text: 'Become part of an inclusive movement',
  },
];

interface FormState {
  space_name: string;
  website: string;
  location: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  description: string;
  capacity: string;
  pricing: string;
  hours: string;
  notes: string;
  honeypot: string;
}

const INITIAL_FORM: FormState = {
  space_name: '',
  website: '',
  location: '',
  contact_name: '',
  contact_email: '',
  contact_phone: '',
  description: '',
  capacity: '',
  pricing: '',
  hours: '',
  notes: '',
  honeypot: '',
};

const sanitize = (value: string): string => DOMPurify.sanitize(value.trim());

const SubmitSpace = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormState>(INITIAL_FORM);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const toggleFeature = (feature: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(feature)
        ? prev.filter((f) => f !== feature)
        : [...prev, feature]
    );
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormState, string>> = {};

    if (!formData.space_name.trim()) {
      newErrors.space_name = 'Space name is required.';
    }
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required.';
    }
    if (!formData.contact_name.trim()) {
      newErrors.contact_name = 'Contact name is required.';
    }
    if (!formData.contact_email.trim()) {
      newErrors.contact_email = 'Contact email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contact_email.trim())) {
      newErrors.contact_email = 'Please enter a valid email address.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check — silently succeed for bots
    if (formData.honeypot) {
      setSubmitted(true);
      return;
    }

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        space_name: sanitize(formData.space_name),
        website: sanitize(formData.website) || null,
        location: sanitize(formData.location),
        contact_name: sanitize(formData.contact_name),
        contact_email: sanitize(formData.contact_email),
        contact_phone: sanitize(formData.contact_phone) || null,
        description: sanitize(formData.description) || null,
        neuro_features: selectedFeatures.length > 0 ? selectedFeatures : null,
        capacity: sanitize(formData.capacity) || null,
        pricing: sanitize(formData.pricing) || null,
        hours: sanitize(formData.hours) || null,
        notes: sanitize(formData.notes) || null,
      };

      const { error } = await supabase.from('space_submissions').insert([payload]);

      if (error) {
        throw error;
      }

      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting space:', error);
      toast({
        title: 'Something went wrong',
        description:
          'We could not submit your space right now. Please try again in a moment or email us directly.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="List Your Space"
        description="Submit your workspace for inclusion in the UK's leading neuro-inclusive workspace directory."
        keywords="list neuro-friendly workspace, submit ADHD-friendly space, autism-friendly workspace directory, neuro-inclusive workspace, quiet space provider"
      />

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4" variant="secondary">
              For Workspace Providers
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              List Your Space
              <span className="text-primary block mt-1">on Quiet Space Club</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Join the UK's leading directory of neuro-inclusive workspaces and connect
              with the neurodivergent professionals who need you most.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            {submitted ? (
              /* Thank-you state */
              <div className="max-w-2xl mx-auto text-center py-16">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-primary" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Thank You for Submitting!</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  We've received your submission and our team will review it carefully.
                </p>
                <Card className="text-left">
                  <CardContent className="pt-6">
                    <p className="text-muted-foreground">
                      We'll review your submission within{' '}
                      <strong className="text-foreground">5 business days</strong>. If your
                      space meets our neuro-inclusive criteria, we'll be in touch with next
                      steps — including your QSC Neuro Score assessment.
                    </p>
                    <p className="text-muted-foreground mt-4">
                      In the meantime, if you have any questions please email{' '}
                      <a
                        href="mailto:hello@quietspace.club"
                        className="text-primary underline underline-offset-4"
                      >
                        hello@quietspace.club
                      </a>
                      .
                    </p>
                  </CardContent>
                </Card>
              </div>
            ) : (
              /* Two-column layout */
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Form — takes 2 of 3 columns on desktop */}
                <div className="lg:col-span-2">
                  <h2 className="text-2xl font-bold mb-8">Tell us about your space</h2>
                  <form onSubmit={handleSubmit} noValidate className="space-y-8">
                    {/* Honeypot — hidden from real users */}
                    <div style={{ display: 'none' }} aria-hidden="true">
                      <Label htmlFor="website_url">Website URL (leave blank)</Label>
                      <Input
                        id="website_url"
                        name="honeypot"
                        value={formData.honeypot}
                        onChange={handleInputChange}
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>

                    {/* Space Details */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Space Details</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-5">
                        <div className="space-y-2">
                          <Label htmlFor="space_name">
                            Space Name <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="space_name"
                            name="space_name"
                            placeholder="e.g. The Calm Co-Working Hub"
                            value={formData.space_name}
                            onChange={handleInputChange}
                            aria-describedby={errors.space_name ? 'space_name_error' : undefined}
                            aria-invalid={!!errors.space_name}
                          />
                          {errors.space_name && (
                            <p id="space_name_error" className="text-sm text-destructive">
                              {errors.space_name}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="website">Website</Label>
                          <Input
                            id="website"
                            name="website"
                            type="url"
                            placeholder="https://yourspace.co.uk"
                            value={formData.website}
                            onChange={handleInputChange}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="location">
                            Location (City &amp; Country){' '}
                            <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="location"
                            name="location"
                            placeholder="e.g. Manchester, UK"
                            value={formData.location}
                            onChange={handleInputChange}
                            aria-describedby={errors.location ? 'location_error' : undefined}
                            aria-invalid={!!errors.location}
                          />
                          {errors.location && (
                            <p id="location_error" className="text-sm text-destructive">
                              {errors.location}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="description">Describe Your Space</Label>
                          <Textarea
                            id="description"
                            name="description"
                            placeholder="Tell us what makes your space neuro-friendly. What's the atmosphere like? What facilities do you offer?"
                            value={formData.description}
                            onChange={handleInputChange}
                            rows={5}
                            maxLength={2000}
                          />
                          <p className="text-xs text-muted-foreground text-right">
                            {formData.description.length}/2000
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Neuro Features */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Neuro-Inclusive Features</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          Select all that apply to your space
                        </p>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {NEURO_FEATURES.map((feature) => (
                            <div key={feature} className="flex items-center space-x-3">
                              <Checkbox
                                id={`feature-${feature}`}
                                checked={selectedFeatures.includes(feature)}
                                onCheckedChange={() => toggleFeature(feature)}
                              />
                              <Label
                                htmlFor={`feature-${feature}`}
                                className="cursor-pointer font-normal"
                              >
                                {feature}
                              </Label>
                            </div>
                          ))}
                        </div>
                        {selectedFeatures.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-5 pt-5 border-t">
                            {selectedFeatures.map((f) => (
                              <Badge key={f} variant="secondary">
                                {f}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    {/* Practical Information */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Practical Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div className="space-y-2">
                            <Label htmlFor="capacity">Capacity</Label>
                            <Input
                              id="capacity"
                              name="capacity"
                              placeholder="e.g. Up to 30 people"
                              value={formData.capacity}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="hours">Opening Hours</Label>
                            <Input
                              id="hours"
                              name="hours"
                              placeholder="e.g. Mon–Fri 8am–8pm"
                              value={formData.hours}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="pricing">Pricing</Label>
                          <Input
                            id="pricing"
                            name="pricing"
                            placeholder="e.g. From £15/day, monthly memberships available"
                            value={formData.pricing}
                            onChange={handleInputChange}
                          />
                        </div>
                      </CardContent>
                    </Card>

                    {/* Contact Details */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Your Contact Details</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          We'll use these to follow up on your submission. They won't be
                          published on the directory.
                        </p>
                      </CardHeader>
                      <CardContent className="space-y-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div className="space-y-2">
                            <Label htmlFor="contact_name">
                              Your Name <span className="text-destructive">*</span>
                            </Label>
                            <Input
                              id="contact_name"
                              name="contact_name"
                              placeholder="Jane Smith"
                              value={formData.contact_name}
                              onChange={handleInputChange}
                              aria-describedby={
                                errors.contact_name ? 'contact_name_error' : undefined
                              }
                              aria-invalid={!!errors.contact_name}
                            />
                            {errors.contact_name && (
                              <p id="contact_name_error" className="text-sm text-destructive">
                                {errors.contact_name}
                              </p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="contact_phone">Phone Number</Label>
                            <Input
                              id="contact_phone"
                              name="contact_phone"
                              type="tel"
                              placeholder="+44 7700 900000"
                              value={formData.contact_phone}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="contact_email">
                            Email Address <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="contact_email"
                            name="contact_email"
                            type="email"
                            placeholder="jane@yourspace.co.uk"
                            value={formData.contact_email}
                            onChange={handleInputChange}
                            aria-describedby={
                              errors.contact_email ? 'contact_email_error' : undefined
                            }
                            aria-invalid={!!errors.contact_email}
                          />
                          {errors.contact_email && (
                            <p id="contact_email_error" className="text-sm text-destructive">
                              {errors.contact_email}
                            </p>
                          )}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Anything Else */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Anything Else?</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <Label htmlFor="notes">Additional Notes</Label>
                          <Textarea
                            id="notes"
                            name="notes"
                            placeholder="Anything else you'd like us to know about your space or your submission…"
                            value={formData.notes}
                            onChange={handleInputChange}
                            rows={4}
                            maxLength={1000}
                          />
                          <p className="text-xs text-muted-foreground text-right">
                            {formData.notes.length}/1000
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Submitting…
                        </>
                      ) : (
                        'Submit Your Space'
                      )}
                    </Button>

                    <p className="text-xs text-center text-muted-foreground">
                      By submitting you agree to our{' '}
                      <a href="/privacy" className="underline underline-offset-4">
                        Privacy Policy
                      </a>
                      . We'll only use your details to process your listing.
                    </p>
                  </form>
                </div>

                {/* Benefits Sidebar */}
                <div className="lg:col-span-1">
                  <div className="sticky top-8 space-y-6">
                    <Card className="border-primary/20 bg-primary/5">
                      <CardHeader>
                        <CardTitle className="text-lg">Why list with us?</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-5">
                          {BENEFITS.map(({ icon: Icon, text }) => (
                            <li key={text} className="flex items-start gap-3">
                              <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                                <Icon className="w-5 h-5 text-primary" />
                              </div>
                              <span className="text-sm leading-snug">{text}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">What happens next?</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ol className="space-y-4 text-sm text-muted-foreground">
                          <li className="flex gap-3">
                            <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0">
                              1
                            </span>
                            <span>
                              We review your submission against our neuro-inclusive criteria.
                            </span>
                          </li>
                          <li className="flex gap-3">
                            <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0">
                              2
                            </span>
                            <span>
                              Our team may contact you for a short call or site visit.
                            </span>
                          </li>
                          <li className="flex gap-3">
                            <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0">
                              3
                            </span>
                            <span>
                              Your space is published with a QSC Neuro Score and full
                              feature listing.
                            </span>
                          </li>
                        </ol>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="pt-5">
                        <p className="text-sm text-muted-foreground">
                          Questions before submitting? Email{' '}
                          <a
                            href="mailto:hello@quietspace.club"
                            className="text-primary underline underline-offset-4"
                          >
                            hello@quietspace.club
                          </a>
                          .
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SubmitSpace;
