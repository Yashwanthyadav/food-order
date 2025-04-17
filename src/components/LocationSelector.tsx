
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import * as maptilersdk from '@maptiler/sdk';
import '@maptiler/sdk/dist/maptiler-sdk.css';

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
  const map = useRef<maptilersdk.Map | null>(null);
  const marker = useRef<maptilersdk.Marker | null>(null);
  const [selectedCoordinates, setSelectedCoordinates] = useState<[number, number] | null>(null);
  const [address, setAddress] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Set your MapTiler API key
  const MAPTILER_API_KEY = "7j9dJtmvROJGqZV6sYKF";
  
  useEffect(() => {
    if (!isOpen || !mapRef.current) return;
    
    maptilersdk.config.apiKey = MAPTILER_API_KEY;

    const initMap = async () => {
      // Initialize the map
      map.current = new maptilersdk.Map({
        container: mapRef.current,
        style: maptilersdk.MapStyle.STREETS,
        center: [0, 0],
        zoom: 2
      });

      // Try to get user's location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { longitude, latitude } = position.coords;
            map.current?.setCenter([longitude, latitude]);
            map.current?.setZoom(14);
            setMarker([longitude, latitude]);
            reverseGeocode([longitude, latitude]);
          },
          () => {
            console.log("Unable to retrieve your location");
          }
        );
      }

      // Add click event to map
      map.current.on('click', (e) => {
        const coordinates: [number, number] = [e.lngLat.lng, e.lngLat.lat];
        setMarker(coordinates);
        reverseGeocode(coordinates);
      });
    };

    initMap();

    return () => {
      if (marker.current) {
        marker.current.remove();
        marker.current = null;
      }
      map.current?.remove();
      map.current = null;
    };
  }, [isOpen]);

  const setMarker = (coordinates: [number, number]) => {
    if (marker.current) {
      marker.current.remove();
    }
    
    if (map.current) {
      // Create a new marker
      marker.current = new maptilersdk.Marker({
        color: "#FF0000"
      })
        .setLngLat(coordinates)
        .addTo(map.current);
    }
    
    setSelectedCoordinates(coordinates);
  };

  const reverseGeocode = async (coordinates: [number, number]) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.maptiler.com/geocoding/${coordinates[0]},${coordinates[1]}.json?key=${SzoN1tadoVqraQZTVwYX}`
      );
      const data = await response.json();
      
      if (data.features && data.features.length > 0) {
        setAddress(data.features[0].place_name || "Selected location");
      } else {
        setAddress("Selected location");
      }
    } catch (error) {
      console.error("Error fetching address:", error);
      setAddress("Selected location");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmLocation = () => {
    if (selectedCoordinates) {
      onSelectLocation({
        address: address || "Selected location",
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
