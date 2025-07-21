import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin } from 'lucide-react';
import { AmenityIcon } from './AmenityIcon';
import { Card, CardContent } from '@/components/ui/card';

interface Amenity {
  name: string;
  icon: string;
}

interface ListingCardProps {
  id: string;
  title: string;
  description: string;
  location: string;
  imageUrl: string;
  neuroScore: number;
  userRating: number;
  amenities: Amenity[];
  price: string;
}

export function ListingCard({ 
  id, 
  title, 
  description, 
  location, 
  imageUrl, 
  neuroScore, 
  userRating, 
  amenities,
  price 
}: ListingCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-4 h-4 fill-warning text-warning" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star key="half" className="w-4 h-4 fill-warning/50 text-warning" />
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="w-4 h-4 text-muted-foreground/30" />
      );
    }

    return stars;
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20 bg-card">
      <div className="relative overflow-hidden rounded-t-lg">
        {!imageError ? (
          <div className="relative">
            {!imageLoaded && (
              <div className="aspect-[4/3] bg-muted animate-pulse" />
            )}
            <img
              src={imageUrl}
              alt={title}
              className={`aspect-[4/3] w-full object-cover group-hover:scale-105 transition-transform duration-500 ${
                imageLoaded ? 'opacity-100' : 'opacity-0 absolute inset-0'
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
          </div>
        ) : (
          <div className="aspect-[4/3] bg-muted flex items-center justify-center">
            <span className="text-muted-foreground">Image unavailable</span>
          </div>
        )}
        
        <div className="absolute top-3 right-3 bg-card/95 backdrop-blur-sm rounded-lg px-2 py-1 shadow-sm">
          <span className="text-sm font-semibold text-primary">
            {neuroScore}/10
          </span>
        </div>
      </div>

      <CardContent className="p-5 space-y-4">
        <div className="space-y-2">
          <Link 
            to={`/space/${id}`}
            className="block group-hover:text-primary transition-colors"
          >
            <h3 className="text-lg font-semibold line-clamp-1">{title}</h3>
          </Link>
          
          <div className="flex items-center gap-1 text-muted-foreground text-sm">
            <MapPin className="w-4 h-4" />
            <span className="line-clamp-1">{location}</span>
          </div>
        </div>

        <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
          {description}
        </p>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {renderStars(userRating)}
          </div>
          <span className="text-sm text-muted-foreground">
            ({userRating})
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {amenities.slice(0, 4).map((amenity, index) => (
            <div 
              key={index}
              className="flex items-center gap-1.5 bg-accent/50 rounded-full px-2.5 py-1 text-xs"
            >
              <AmenityIcon name={amenity.icon} className="w-3 h-3" />
              <span className="text-accent-foreground/80">{amenity.name}</span>
            </div>
          ))}
          {amenities.length > 4 && (
            <div className="flex items-center justify-center bg-muted rounded-full px-2.5 py-1 text-xs text-muted-foreground">
              +{amenities.length - 4} more
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <span className="text-lg font-semibold text-primary">{price}</span>
          <Link 
            to={`/space/${id}`}
            className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
          >
            View Details →
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}