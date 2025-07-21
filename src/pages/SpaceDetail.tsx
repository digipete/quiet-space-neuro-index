import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Star, MapPin, Users, Clock, DollarSign } from 'lucide-react';
import { listings } from '../data/listings';
import { AmenityIcon } from '../components/AmenityIcon';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <Link 
            to="/"
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
            <Badge variant="secondary" className="bg-card/95 backdrop-blur-sm text-lg px-3 py-1.5">
              <span className="font-semibold text-primary">{listing.neuroScore}/10</span>
              <span className="text-muted-foreground ml-1">Neuro Score</span>
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
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">About This Space</h2>
              <p className="text-muted-foreground leading-relaxed">
                {listing.fullDescription}
              </p>
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
              <CardContent className="p-6 space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-1">
                    {listing.price}
                  </div>
                  <div className="text-sm text-muted-foreground">per day</div>
                </div>

                <Button className="w-full" size="lg">
                  Book This Space
                </Button>

                <div className="text-center text-xs text-muted-foreground">
                  Free cancellation • Instant booking
                </div>
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
                    <DollarSign className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium">Pricing</div>
                      <div className="text-xs text-muted-foreground">Day passes available</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3">Need Help?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Our team is here to help you find the perfect neuro-friendly workspace.
                </p>
                <Button variant="outline" className="w-full">
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}