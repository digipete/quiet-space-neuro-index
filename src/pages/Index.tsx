import { useState, useMemo } from 'react';
import { listings } from '../data/listings';
import { ListingCard } from '../components/ListingCard';
import { SearchAndFilter } from '../components/SearchAndFilter';
import { Brain, MapPin } from 'lucide-react';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredListings = useMemo(() => {
    if (!searchTerm.trim()) return listings;
    
    const term = searchTerm.toLowerCase();
    return listings.filter(listing => 
      listing.title.toLowerCase().includes(term) ||
      listing.description.toLowerCase().includes(term) ||
      listing.location.toLowerCase().includes(term) ||
      listing.amenities.some(amenity => 
        amenity.name.toLowerCase().includes(term)
      )
    );
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-2">
            <Brain className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold">Quiet Space Club</h1>
          </div>
          <p className="text-muted-foreground">
            Discover neuro-friendly workspaces designed for focus and comfort
          </p>
        </div>
      </header>

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
          
          <SearchAndFilter 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
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
            
            {searchTerm && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>All locations</span>
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
                imageUrl={listing.imageUrl}
                neuroScore={listing.neuroScore}
                userRating={listing.userRating}
                amenities={listing.amenities}
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
