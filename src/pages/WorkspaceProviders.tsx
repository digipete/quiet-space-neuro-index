import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle, Users, TrendingUp, Award, FileCheck, MessageSquare, Building2, Star, Clock, Zap } from 'lucide-react';

export default function WorkspaceProviders() {
  useEffect(() => {
    // Load Stripe buy button script
    const script = document.createElement('script');
    script.src = 'https://js.stripe.com/v3/buy-button.js';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // Cleanup script on unmount
      const existingScript = document.querySelector('script[src="https://js.stripe.com/v3/buy-button.js"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  const handleStripePurchase = () => {
    // Create Stripe buy button element dynamically
    const buyButton = document.createElement('stripe-buy-button');
    buyButton.setAttribute('buy-button-id', 'buy_btn_1RvMLOJ4zutBRYV5kbcjJIu9');
    buyButton.setAttribute('publishable-key', 'pk_live_51FHqPXJ4zutBRYV5T82KHTZ8iqj5bljVJjV8O3gU91TGoACgfjkViMxidzzsyJ0hhQRzWjHmlSC1wID90OWYb2YB00tVMqBXDR');
    
    // Append to body temporarily to trigger the purchase flow
    document.body.appendChild(buyButton);
    
    // Trigger the click
    setTimeout(() => {
      buyButton.click();
      // Remove after a short delay
      setTimeout(() => {
        if (document.body.contains(buyButton)) {
          document.body.removeChild(buyButton);
        }
      }, 1000);
    }, 100);
  };

  const businessBenefits = [
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Attract More Customers",
      description: "Reach the growing community of neurodivergent professionals actively seeking inclusive workspaces for their teams."
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-primary" />,
      title: "Increase Bookings",
      description: "Fill more desks and meeting rooms by attracting members who prioritise neuro-friendly environments."
    },
    {
      icon: <Building2 className="h-8 w-8 text-primary" />,
      title: "Higher Occupancy Rates",
      description: "Create a more diverse and inclusive community that drives higher utilisation across your space."
    },
    {
      icon: <Award className="h-8 w-8 text-primary" />,
      title: "Premium Market Position",
      description: "Stand out in a competitive market as a certified neuro-accessible workspace provider."
    },
    {
      icon: <Star className="h-8 w-8 text-primary" />,
      title: "Enhanced Reputation",
      description: "Build trust and credibility with evidence-based accessibility improvements and certification."
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-primary" />,
      title: "Data-Driven Improvements",
      description: "Receive detailed, actionable recommendations to enhance your space based on scientific research."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/5 to-secondary/5 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Transform Your Co-working Space
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto">
            Get certified for neuro-accessibility and unlock new revenue streams. 
            Join the leading co-working spaces creating inclusive environments for neurodivergent professionals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button 
              size="lg" 
              className="text-lg px-8 py-3 bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={handleStripePurchase}
            >
              Get Started Today
            </Button>
          </div>
          <p className="text-sm text-gray-500">
            Trusted by forward-thinking workspace providers across the UK
          </p>
        </div>
      </div>

      {/* Value Proposition */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Drive Business Growth with Neuro-Accessibility
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our certification programme helps co-working spaces attract new customers, 
              increase bookings, and build a thriving inclusive community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {businessBenefits.map((benefit, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="mb-4 flex justify-center">{benefit.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple, straightforward pricing with no hidden costs
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="p-8 border-2">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">One-Off Setup</h3>
                <div className="text-4xl font-bold text-primary mb-2">£5,000</div>
                <p className="text-gray-600">Initial assessment and certification</p>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Comprehensive space assessment</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Detailed improvement recommendations</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Initial NeuroFlow certification</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Platform listing setup</span>
                </li>
              </ul>
            </Card>

            <Card className="p-8 border-2 border-primary bg-primary/5">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Annual Listing</h3>
                <div className="text-4xl font-bold text-primary mb-2">£5,000</div>
                <p className="text-gray-600">Per property per year</p>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Active listing on Quiet Space Club</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Booking enquiry management</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Ongoing certification maintenance</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Priority customer support</span>
                </li>
              </ul>
            </Card>
          </div>

          <div className="text-center mt-12">
            <p className="text-lg text-gray-600 mb-6">
              Ready to get started? Begin your certification journey today.
            </p>
            <Button 
              size="lg" 
              className="text-lg px-8 py-3 bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={handleStripePurchase}
            >
              Start Certification Process
            </Button>
          </div>
        </div>
      </div>

      {/* Process Section */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Simple 4-Step Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get certified and listed in just 2-3 weeks
            </p>
          </div>

          <Card className="p-8 bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">1</div>
                <h4 className="font-semibold mb-2">Apply & Pay</h4>
                <p className="text-sm text-gray-600">Complete your application and secure your certification slot</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">2</div>
                <h4 className="font-semibold mb-2">Assessment</h4>
                <p className="text-sm text-gray-600">Our experts evaluate your space using our comprehensive framework</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">3</div>
                <h4 className="font-semibold mb-2">Recommendations</h4>
                <p className="text-sm text-gray-600">Receive detailed improvement suggestions and implementation support</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">4</div>
                <h4 className="font-semibold mb-2">Go Live</h4>
                <p className="text-sm text-gray-600">Get listed on our platform and start attracting new customers</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Join the Network?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Transform your co-working space into a certified neuro-accessible environment 
            and start attracting new customers today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button 
              size="lg" 
              variant="secondary" 
              className="text-lg px-8 py-3 bg-secondary text-secondary-foreground hover:bg-secondary/80"
              onClick={handleStripePurchase}
            >
              Get Certified Now
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-primary bg-transparent"
            >
              Schedule a Demo
            </Button>
          </div>
          <div className="grid sm:grid-cols-3 gap-6 max-w-2xl mx-auto text-sm opacity-90">
            <div className="flex items-center justify-center gap-2">
              <Clock className="h-4 w-4" />
              <span>2-3 week certification</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span>hello@quietspace.club</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <FileCheck className="h-4 w-4" />
              <span>Trusted certification process</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}