
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Star, MapPin, Users, Clock, Brain, CheckCircle, Award } from 'lucide-react';
import { listings } from '../data/listings';
import { AmenityIcon } from '../components/AmenityIcon';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function SpaceDetail() {
  const { id } = useParams();
  const listing = listings.find(l => l.id === id);

  if (!listing) {
    return <Navigate to="/" replace />;
  }

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-5 h-5 fill-warning text-warning" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star key="half" className="w-5 h-5 fill-warning/50 text-warning" />
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="w-5 h-5 text-muted-foreground/30" />
      );
    }

    return stars;
  };

  const getNeuroScoreColor = (score: number) => {
    if (score >= 9) return 'bg-success text-success-foreground';
    if (score >= 7) return 'bg-warning text-warning-foreground';
    return 'bg-muted text-muted-foreground';
  };

  const getNeuroScoreDescription = (score: number) => {
    if (score >= 9) return 'Exceptional neuro-friendly environment with comprehensive accommodations';
    if (score >= 7) return 'Good neuro-friendly features with most accommodations available';
    return 'Basic neuro-friendly considerations with some accommodations';
  };

  const neuroFeatures = [
    { name: 'Sensory-Friendly Lighting', available: listing.neuroScore >= 7 },
    { name: 'Quiet Zones Available', available: listing.neuroScore >= 6 },
    { name: 'Noise Control Systems', available: listing.neuroScore >= 8 },
    { name: 'Flexible Workspace Options', available: listing.neuroScore >= 7 },
    { name: 'Clear Navigation & Signage', available: listing.neuroScore >= 6 },
    { name: 'Sensory Break Areas', available: listing.neuroScore >= 9 }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <Link 
            to="/spaces"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Neuro Index
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Hero Image */}
        <div className="relative rounded-xl overflow-hidden mb-8 shadow-lg">
          <img
            src={listing.imageUrl}
            alt={listing.title}
            className="w-full h-80 md:h-96 object-cover"
          />
          <div className="absolute top-4 right-4">
            <Badge className={`${getNeuroScoreColor(listing.neuroScore)} text-xl px-4 py-2 shadow-lg`}>
              <Brain className="w-5 h-5 mr-2" />
              <span className="font-bold">{listing.neuroScore}/10</span>
              <span className="ml-1 font-normal">Neuro Score</span>
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{listing.title}</h1>
              <div className="flex items-center gap-2 text-muted-foreground mb-4">
                <MapPin className="w-5 h-5" />
                <span>{listing.location}</span>
              </div>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  {renderStars(listing.userRating)}
                  <span className="text-sm text-muted-foreground">
                    ({listing.userRating} rating)
                  </span>
                </div>
              </div>

              {/* Neuro Score Explanation */}
              <div className="bg-primary-soft/20 border border-primary/20 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-primary">Neuro-Accessibility Score</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  {getNeuroScoreDescription(listing.neuroScore)}
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">About This Space</h2>
              <p className="text-muted-foreground leading-relaxed">
                {listing.fullDescription}
              </p>
            </div>

            {/* Neuro-Friendly Features */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Neuro-Friendly Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {neuroFeatures.map((feature, index) => (
                  <div 
                    key={index}
                    className={`flex items-center gap-3 p-3 rounded-lg border ${
                      feature.available 
                        ? 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-200' 
                        : 'bg-gray-50 border-gray-200 text-gray-600 dark:bg-gray-800/50 dark:border-gray-700 dark:text-gray-400'
                    }`}
                  >
                    <CheckCircle className={`w-5 h-5 ${
                      feature.available ? 'text-green-600 dark:text-green-400' : 'text-gray-400 dark:text-gray-600'
                    }`} />
                    <span className="text-sm font-medium">{feature.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {listing.amenities.map((amenity, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-3 p-3 bg-accent/30 rounded-lg border border-border/30"
                  >
                    <AmenityIcon name={amenity.icon} className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium">{amenity.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-primary" />
                  Neuro Score Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className={`text-4xl font-bold mb-2 ${
                    listing.neuroScore >= 9 ? 'text-success' :
                    listing.neuroScore >= 7 ? 'text-warning' : 'text-muted-foreground'
                  }`}>
                    {listing.neuroScore}/10
                  </div>
                  <div className="text-sm text-muted-foreground">Overall Neuro Score</div>
                </div>

                <div className="space-y-3 border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Lighting Quality</span>
                    <span className="font-medium">{Math.min(10, listing.neuroScore + 0.5)}/10</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Noise Control</span>
                    <span className="font-medium">{Math.min(10, listing.neuroScore + 0.2)}/10</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Space Flexibility</span>
                    <span className="font-medium">{Math.max(5, listing.neuroScore - 0.3)}/10</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Sensory Accommodations</span>
                    <span className="font-medium">{listing.neuroScore}/10</span>
                  </div>
                </div>

                <Button className="w-full" variant="outline">
                  Get Directions
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="font-semibold">Space Details</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium">Capacity</div>
                      <div className="text-xs text-muted-foreground">{listing.capacity}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium">Hours</div>
                      <div className="text-xs text-muted-foreground">{listing.hoursOfOperation}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Award className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium">Certification</div>
                      <div className="text-xs text-muted-foreground">{listing.certification}</div>
                    </div>
                  </div>

                  {listing.price && (
                    <div className="flex items-center gap-3">
                      <span className="w-5 h-5 text-center text-sm">💰</span>
                      <div>
                        <div className="text-sm font-medium">Pricing</div>
                        <div className="text-xs text-muted-foreground">{listing.price}</div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3">Questions about accessibility?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Our team can provide detailed information about neuro-friendly features and accommodations.
                </p>
                <Button variant="outline" className="w-full">
                  Contact for Info
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
