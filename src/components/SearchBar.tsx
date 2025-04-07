
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log("Searching for:", searchQuery);
  };

  return (
    <form onSubmit={handleSearch} className="flex-1 max-w-md mx-4">
      <div className="relative flex items-center">
        <Search className="absolute left-2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search products..."
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
