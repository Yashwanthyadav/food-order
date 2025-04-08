import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SearchBarProps {
  onSearch?: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    
    if (onSearch) {
      onSearch(searchQuery);
    } else {
      navigate(`/?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex-1 max-w-md mx-4">
      <div className="relative flex items-center">
        <Search className="absolute left-2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search for biryani, mandi, paratha..."
          className="pl-8 pr-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button 
          type="submit" 
          size="icon" 
          variant="ghost" 
          className="absolute right-0"
        >
          <Search className="h-4 w-4 text-muted-foreground" />
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
