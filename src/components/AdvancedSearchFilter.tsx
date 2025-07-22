import { useState } from 'react';
import { Search, X, Filter, MapPin, Award, Brain } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface AdvancedSearchFilterProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedCertification: string;
  onCertificationChange: (certification: string) => void;
  minNeuroScore: number;
  onNeuroScoreChange: (score: number) => void;
  selectedLocation: string;
  onLocationChange: (location: string) => void;
  availableLocations: string[];
  resultCount: number;
  placeholder?: string;
}

export function AdvancedSearchFilter({ 
  searchTerm, 
  onSearchChange,
  selectedCertification,
  onCertificationChange,
  minNeuroScore,
  onNeuroScoreChange,
  selectedLocation,
  onLocationChange,
  availableLocations,
  resultCount,
  placeholder = "Search spaces by name, location, or amenities..." 
}: AdvancedSearchFilterProps) {
  const [localSearch, setLocalSearch] = useState(searchTerm);
  const [showFilters, setShowFilters] = useState(false);

  const handleSearchChange = (value: string) => {
    setLocalSearch(value);
    onSearchChange(value);
  };

  const clearSearch = () => {
    setLocalSearch('');
    onSearchChange('');
  };

  const clearAllFilters = () => {
    setLocalSearch('');
    onSearchChange('');
    onCertificationChange('all');
    onNeuroScoreChange(0);
    onLocationChange('all');
  };

  const hasActiveFilters = searchTerm || selectedCertification !== 'all' || minNeuroScore > 0 || selectedLocation !== 'all';
  const activeFilterCount = [
    searchTerm,
    selectedCertification !== 'all',
    minNeuroScore > 0,
    selectedLocation !== 'all'
  ].filter(Boolean).length;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      {/* Main Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
        <Input
          type="text"
          placeholder={placeholder}
          value={localSearch}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-10 pr-20 h-12 bg-card border-border/50 focus:border-primary/50 transition-colors text-base"
        />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
          {localSearch && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearSearch}
              className="h-8 w-8 p-0 hover:bg-muted"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
          <Button
            variant={showFilters ? "default" : "outline"}
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="h-8 px-3"
          >
            <Filter className="w-4 h-4 mr-1" />
            {activeFilterCount > 0 && (
              <Badge variant="secondary" className="ml-1 h-5 px-1 text-xs">
                {activeFilterCount}
              </Badge>
            )}
          </Button>
        </div>
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Location Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Location
              </label>
              <Select value={selectedLocation} onValueChange={onLocationChange}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Any location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All locations</SelectItem>
                  {availableLocations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Certification Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <Award className="w-4 h-4" />
                Certification
              </label>
              <Select value={selectedCertification} onValueChange={onCertificationChange}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Any certification" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All certifications</SelectItem>
                  <SelectItem value="QSC Certified">QSC Certified</SelectItem>
                  <SelectItem value="Self Certified">Self Certified</SelectItem>
                  <SelectItem value="Not certified">Not certified</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Neuro Score Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <Brain className="w-4 h-4" />
                Minimum Neuro Score: {minNeuroScore.toFixed(1)}
              </label>
              <div className="px-2">
                <Slider
                  value={[minNeuroScore]}
                  onValueChange={(values) => onNeuroScoreChange(values[0])}
                  max={10}
                  min={0}
                  step={0.1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>0.0</span>
                  <span>5.0</span>
                  <span>10.0</span>
                </div>
              </div>
            </div>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <>
              <Separator className="my-4" />
              <div className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  {resultCount} space{resultCount !== 1 ? 's' : ''} found
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearAllFilters}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Clear all filters
                </Button>
              </div>
            </>
          )}
        </Card>
      )}

      {/* Active Search/Filter Summary */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="text-muted-foreground">Active filters:</span>
          {searchTerm && (
            <Badge variant="secondary" className="gap-1">
              Search: "{searchTerm}"
              <X 
                className="w-3 h-3 cursor-pointer hover:bg-muted-foreground/20 rounded-full" 
                onClick={clearSearch}
              />
            </Badge>
          )}
          {selectedLocation !== 'all' && (
            <Badge variant="secondary" className="gap-1">
              <MapPin className="w-3 h-3" />
              {selectedLocation}
              <X 
                className="w-3 h-3 cursor-pointer hover:bg-muted-foreground/20 rounded-full" 
                onClick={() => onLocationChange('all')}
              />
            </Badge>
          )}
          {selectedCertification !== 'all' && (
            <Badge variant="secondary" className="gap-1">
              <Award className="w-3 h-3" />
              {selectedCertification}
              <X 
                className="w-3 h-3 cursor-pointer hover:bg-muted-foreground/20 rounded-full" 
                onClick={() => onCertificationChange('all')}
              />
            </Badge>
          )}
          {minNeuroScore > 0 && (
            <Badge variant="secondary" className="gap-1">
              <Brain className="w-3 h-3" />
              Score ≥ {minNeuroScore.toFixed(1)}
              <X 
                className="w-3 h-3 cursor-pointer hover:bg-muted-foreground/20 rounded-full" 
                onClick={() => onNeuroScoreChange(0)}
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}