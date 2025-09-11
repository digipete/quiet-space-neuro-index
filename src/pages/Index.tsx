import { useState, useMemo, useEffect } from 'react';
import { ListingCard } from '../components/ListingCard';
import { AdvancedSearchFilter } from '../components/AdvancedSearchFilter';
import { Brain, MapPin } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { SEOHead } from '@/components/SEOHead';

interface Amenity {
  name: string;
  icon: string;
}

interface Listing {
  id: string;
  title: string;
  description: string;
  location: string;
  image_url: string;
  neuro_score: number;
  user_rating: number;
  certification: string;
  amenities: Amenity[];
  full_description: string;
  price: string;
  capacity: string;
  hours_of_operation: string;
}

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCertification, setSelectedCertification] = useState('all');
  const [minNeuroScore, setMinNeuroScore] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const { data, error } = await supabase
        .from('listings')
        .select('*')
        .order('title');

      if (error) {
        console.error('Error fetching listings:', error);
        return;
      }

      // Transform the data to match our interface
      const transformedListings: Listing[] = (data || []).map(item => ({
        id: item.id,
        title: item.title,
        description: item.description,
        location: item.location,
        image_url: item.image_url,
        neuro_score: item.neuro_score,
        user_rating: item.user_rating,
        certification: item.certification,
        amenities: Array.isArray(item.amenities) ? item.amenities as unknown as Amenity[] : [],
        full_description: item.full_description,
        price: item.price,
        capacity: item.capacity,
        hours_of_operation: item.hours_of_operation
      }));

      setListings(transformedListings);
    } catch (error) {
      console.error('Error fetching listings:', error);
    } finally {
      setLoading(false);
    }
  };

  const availableLocations = useMemo(() => {
    const locations: string[] = listings.map(listing => {
      // Extract city/region from location string
      const parts = listing.location.split(',');
      return parts[parts.length - 1]?.trim() || listing.location; // Get country/region
    });
    return [...new Set(locations)].sort();
  }, [listings]);

  const filteredListings = useMemo(() => {
    return listings.filter(listing => {
      // Search term filter
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        const matchesSearch = 
          listing.title.toLowerCase().includes(term) ||
          listing.description.toLowerCase().includes(term) ||
          listing.location.toLowerCase().includes(term) ||
          listing.amenities.some(amenity => 
            amenity.name.toLowerCase().includes(term)
          );
        if (!matchesSearch) return false;
      }

      // Certification filter
      if (selectedCertification !== 'all' && listing.certification !== selectedCertification) {
        return false;
      }

      // Neuro score filter
      if (listing.neuro_score < minNeuroScore) {
        return false;
      }

      // Location filter
      if (selectedLocation !== 'all') {
        const listingRegion = listing.location.split(',').pop()?.trim();
        if (listingRegion !== selectedLocation) {
          return false;
        }
      }

      return true;
    });
  }, [searchTerm, selectedCertification, minNeuroScore, selectedLocation, listings]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading workspaces...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Search Neuro-Friendly Workspaces | NeuroIndex - Quiet Space Club"
        description="Find and book neuro-inclusive workspaces near you. Browse certified sensory-friendly offices, coworking spaces, and meeting rooms with detailed accessibility profiles."
        keywords="search neuro workspaces, find autism friendly office, ADHD workplace near me, sensory friendly coworking spaces, quiet office rental, neurodiverse workspace directory, accessible meeting rooms, neuro-inclusive office spaces"
      />
      {/* Header */}
      {/* <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-2">
            <Brain className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold">Quiet Space Club</h1>
          </div>
          <p className="text-muted-foreground">
            Discover neuro-friendly workspaces designed for focus and comfort
          </p>
        </div>
      </header> */}

      <main className="container mx-auto px-4 py-8">
        {/* Search Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold mb-3">Find Your Perfect Workspace</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Browse curated neuro-friendly spaces with detailed sensory profiles, 
              amenities, and community ratings.
            </p>
          </div>
          
          <AdvancedSearchFilter 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedCertification={selectedCertification}
            onCertificationChange={setSelectedCertification}
            minNeuroScore={minNeuroScore}
            onNeuroScoreChange={setMinNeuroScore}
            selectedLocation={selectedLocation}
            onLocationChange={setSelectedLocation}
            availableLocations={availableLocations}
            resultCount={filteredListings.length}
          />
        </div>

        {/* Results Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">
              {filteredListings.length === listings.length 
                ? `${listings.length} Available Spaces` 
                : `${filteredListings.length} Results`}
            </h3>
            
            {selectedLocation !== 'all' && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{selectedLocation}</span>
              </div>
            )}
          </div>
        </div>

        {/* Listings Grid */}
        {filteredListings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map((listing) => (
              <ListingCard
                key={listing.id}
                id={listing.id}
                title={listing.title}
                description={listing.description}
                location={listing.location}
                imageUrl={listing.image_url}
                neuroScore={listing.neuro_score}
                userRating={listing.user_rating}
                amenities={listing.amenities}
                certification={listing.certification}
                price={listing.price}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-muted-foreground text-lg mb-2">No spaces found</div>
            <p className="text-muted-foreground">
              Try adjusting your search terms or browse all available spaces.
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/30 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-muted-foreground">
            <p className="mb-2">Quiet Space Club - Neuro Index</p>
            <p className="text-sm">Connecting neurodiverse professionals with thoughtfully designed workspaces</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
