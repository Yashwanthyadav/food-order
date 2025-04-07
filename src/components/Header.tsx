
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Search, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import LocationSelector from "./LocationSelector";

const Header = () => {
  const [location, setLocation] = useState("");
  const [cartItems, setCartItems] = useState(0);
  const [isLocationSelectorOpen, setIsLocationSelectorOpen] = useState(false);
  const [coordinates, setCoordinates] = useState<[number, number] | null>(null);

  const handleLocationSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Open the location selector instead of just logging
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

          {/* Location Search */}
          <form 
            onSubmit={handleLocationSearch}
            className="flex-1 max-w-md mx-4"
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
                <Search className="h-4 w-4 text-muted-foreground" />
              </Button>
            </div>
          </form>

          {/* Cart */}
          <div className="relative">
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-6 w-6" />
              {cartItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  {cartItems}
                </span>
              )}
            </Button>
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
