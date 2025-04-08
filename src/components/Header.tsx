
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Search, ShoppingCart, User } from "lucide-react";
import { Link } from "react-router-dom";
import LocationSelector from "./LocationSelector";
import SearchBar from "./SearchBar";

interface HeaderProps {
  onSearch?: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const [location, setLocation] = useState("");
  const [cartItems, setCartItems] = useState(0); // Starting with a sample count
  const [isLocationSelectorOpen, setIsLocationSelectorOpen] = useState(false);
  const [coordinates, setCoordinates] = useState<[number, number] | null>(null);

  const handleLocationSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLocationSelectorOpen(true);
  };

  const handleSelectLocation = (locationData: { address: string; coordinates: [number, number] }) => {
    setLocation(locationData.address);
    setCoordinates(locationData.coordinates);
    console.log("Selected location:", locationData);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold">
            ShopNearby
          </Link>

          {/* Location Selection */}
          <form 
            onSubmit={handleLocationSearch}
            className="flex items-center"
          >
            <div className="relative flex items-center">
              <MapPin className="absolute left-2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Enter your location..."
                className="pl-8 pr-10"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onClick={() => setIsLocationSelectorOpen(true)}
                readOnly
              />
              <Button 
                type="submit" 
                size="icon" 
                variant="ghost" 
                className="absolute right-0"
              >
                <MapPin className="h-4 w-4 text-muted-foreground" />
              </Button>
            </div>
          </form>

          {/* Search */}
          <SearchBar onSearch={onSearch} />

          <div className="flex items-center space-x-4">
            {/* Login Button */}
            <Button variant="ghost" size="icon" asChild>
              <Link to="/login">
                <User className="h-6 w-6" />
              </Link>
            </Button>

            {/* Cart */}
            <div className="relative">
              <Button variant="ghost" size="icon" asChild>
                <Link to="/cart">
                  <ShoppingCart className="h-6 w-6" />
                  {cartItems > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-600 text-xs text-white">
                      {cartItems}
                    </span>
                  )}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Location Selector Modal */}
      <LocationSelector 
        isOpen={isLocationSelectorOpen} 
        onClose={() => setIsLocationSelectorOpen(false)}
        onSelectLocation={handleSelectLocation}
      />
    </header>
  );
};

export default Header;
