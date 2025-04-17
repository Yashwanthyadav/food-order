
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface LocationSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLocation: (location: { address: string; coordinates: [number, number] }) => void;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({
  isOpen,
  onClose,
  onSelectLocation,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const map = useRef<google.maps.Map | null>(null);
  const marker = useRef<google.maps.Marker | null>(null);
  const [selectedCoordinates, setSelectedCoordinates] = useState<[number, number] | null>(null);
  const [address, setAddress] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen || !mapRef.current) return;

    const initMap = async () => {
      const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
      
      map.current = new Map(mapRef.current, {
        center: { lat: 0, lng: 0 },
        zoom: 2,
        styles: [
          {
            featureType: "all",
            elementType: "geometry",
            stylers: [{ color: "#242f3e" }]
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#17263c" }]
          }
        ]
      });

      // Try to get user's location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            map.current?.setCenter({ lat: latitude, lng: longitude });
            map.current?.setZoom(14);
            setMarker([longitude, latitude]);
            reverseGeocode([longitude, latitude]);
          },
          () => {
            console.log("Unable to retrieve your location");
          }
        );
      }

      map.current.addListener("click", (e: google.maps.MapMouseEvent) => {
        if (e.latLng) {
          const lat = e.latLng.lat();
          const lng = e.latLng.lng();
          setMarker([lng, lat]);
          reverseGeocode([lng, lat]);
        }
      });
    };

    // Load Google Maps script
    const loadGoogleMaps = () => {
      if (!window.google) {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCoj82YIM_sFeFzO1w75M0RaL7PrB2yZK4&libraries=places`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
        script.onload = () => initMap();
      } else {
        initMap();
      }
    };

    loadGoogleMaps();

    return () => {
      if (marker.current) {
        marker.current.setMap(null);
        marker.current = null;
      }
      map.current = null;
    };
  }, [isOpen]);

  const setMarker = (coordinates: [number, number]) => {
    if (marker.current) {
      marker.current.setMap(null);
    }
    
    if (map.current) {
      marker.current = new google.maps.Marker({
        position: { lng: coordinates[0], lat: coordinates[1] },
        map: map.current,
        animation: google.maps.Animation.DROP
      });
    }
    
    setSelectedCoordinates(coordinates);
  };

  const reverseGeocode = async (coordinates: [number, number]) => {
    setLoading(true);
    try {
      const geocoder = new google.maps.Geocoder();
      const response = await geocoder.geocode({
        location: { lng: coordinates[0], lat: coordinates[1] }
      });
      
      if (response.results[0]) {
        setAddress(response.results[0].formatted_address);
      }
    } catch (error) {
      console.error("Error fetching address:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmLocation = () => {
    if (selectedCoordinates && address) {
      onSelectLocation({
        address,
        coordinates: selectedCoordinates,
      });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">Select Your Location</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="relative flex-1 min-h-[400px]">
          <div ref={mapRef} className="absolute inset-0" />
        </div>
        
        <div className="p-4 border-t">
          <div className="mb-4">
            <p className="text-sm text-muted-foreground mb-1">Selected location:</p>
            <p className="font-medium">
              {loading ? "Loading address..." : address || "No location selected"}
            </p>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleConfirmLocation}
              disabled={!selectedCoordinates || loading}
            >
              Confirm Location
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationSelector;
