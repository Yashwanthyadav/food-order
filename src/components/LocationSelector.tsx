
import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface LocationSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLocation: (location: { address: string; coordinates: [number, number] }) => void;
}

// You'll need to replace this with your own Mapbox token
// For a real application, this should be stored in environment variables
const MAPBOX_TOKEN = "pk.eyJ1IjoibG92YWJsZS1kZXYiLCJhIjoiY2x1cWRhNWZmMGhndjJrcnp1ZGs1YXN3dCJ9.Nv7IIFhGFUvZi4FFcGdGbw";

const LocationSelector: React.FC<LocationSelectorProps> = ({
  isOpen,
  onClose,
  onSelectLocation,
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);
  const [selectedCoordinates, setSelectedCoordinates] = useState<[number, number] | null>(null);
  const [address, setAddress] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;

    if (mapContainer.current && !map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [0, 0],
        zoom: 1,
      });

      map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

      // Try to get user's location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { longitude, latitude } = position.coords;
            map.current?.flyTo({
              center: [longitude, latitude],
              zoom: 14,
              essential: true,
            });
            setMarker([longitude, latitude]);
            reverseGeocode([longitude, latitude]);
          },
          () => {
            console.log("Unable to retrieve your location");
          }
        );
      }

      map.current.on("click", (e) => {
        const coordinates: [number, number] = [e.lngLat.lng, e.lngLat.lat];
        setMarker(coordinates);
        reverseGeocode(coordinates);
      });
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [isOpen]);

  const setMarker = (coordinates: [number, number]) => {
    if (marker.current) {
      marker.current.remove();
    }
    
    marker.current = new mapboxgl.Marker({ color: "#FF0000" })
      .setLngLat(coordinates)
      .addTo(map.current!);
    
    setSelectedCoordinates(coordinates);
  };

  const reverseGeocode = async (coordinates: [number, number]) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${coordinates[0]},${coordinates[1]}.json?access_token=${MAPBOX_TOKEN}`
      );
      const data = await response.json();
      if (data.features && data.features.length > 0) {
        setAddress(data.features[0].place_name);
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
          <div ref={mapContainer} className="absolute inset-0" />
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
