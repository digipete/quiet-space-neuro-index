import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchAndFilterProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  placeholder?: string;
}

export function SearchAndFilter({ 
  searchTerm, 
  onSearchChange, 
  placeholder = "Search spaces by name, location, or amenities..." 
}: SearchAndFilterProps) {
  const [localSearch, setLocalSearch] = useState(searchTerm);

  const handleSearchChange = (value: string) => {
    setLocalSearch(value);
    onSearchChange(value);
  };

  const clearSearch = () => {
    setLocalSearch('');
    onSearchChange('');
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
        <Input
          type="text"
          placeholder={placeholder}
          value={localSearch}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-10 pr-10 h-12 bg-card border-border/50 focus:border-primary/50 transition-colors"
        />
        {localSearch && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-muted"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>
      
      {localSearch && (
        <div className="mt-2 text-sm text-muted-foreground">
          Searching for: <span className="font-medium text-foreground">"{localSearch}"</span>
        </div>
      )}
    </div>
  );
}