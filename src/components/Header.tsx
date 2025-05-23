
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Search, ShoppingCart, User, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import LocationSelector from "./LocationSelector";
import SearchBar from "./SearchBar";
import { useProducts } from "@/contexts/ProductContext";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  onSearch?: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const [location, setLocation] = useState("");
  const [isLocationSelectorOpen, setIsLocationSelectorOpen] = useState(false);
  const [coordinates, setCoordinates] = useState<[number, number] | null>(null);
  const { getCartItemCount } = useProducts();
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLocationSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLocationSelectorOpen(true);
  };

  const handleSelectLocation = (locationData: { address: string; coordinates: [number, number] }) => {
    setLocation(locationData.address);
    setCoordinates(locationData.coordinates);
    console.log("Selected location:", locationData);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out",
        description: "You have been successfully signed out",
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive",
      });
    }
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
            {/* User Menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-6 w-6" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>{user.email}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut} className="flex items-center">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="ghost" size="icon" asChild>
                <Link to="/auth">
                  <User className="h-6 w-6" />
                </Link>
              </Button>
            )}

            {/* Cart */}
            <div className="relative">
              <Button variant="ghost" size="icon" asChild>
                <Link to="/cart">
                  <ShoppingCart className="h-6 w-6" />
                  {getCartItemCount() > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-600 text-xs text-white">
                      {getCartItemCount()}
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
