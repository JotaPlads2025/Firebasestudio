'use client';

import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { useState, useMemo, useCallback } from 'react';
import { Card } from './ui/card';
import { Loader2 } from 'lucide-react';
import type { Class, Venue } from '@/lib/types';
import Link from 'next/link';
import { Button } from './ui/button';

interface MapViewProps {
  classes: Class[];
  venues: Venue[];
}

const containerStyle = {
  width: '100%',
  height: '600px',
  borderRadius: '0.5rem',
};

const defaultCenter = {
  lat: -33.4489,
  lng: -70.6693,
};

// A simple in-memory cache for geocoded results
const geocodeCache = new Map<string, { lat: number; lng: number }>();

export default function MapView({ classes, venues }: MapViewProps) {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries: ['geocoding'],
  });

  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [geocodedVenues, setGeocodedVenues] = useState<Record<string, { lat: number; lng: number }>>({});
  const [loadingGeocodes, setLoadingGeocodes] = useState(false);

  const geocodeAddress = useCallback(async (address: string) => {
    if (geocodeCache.has(address)) {
      return geocodeCache.get(address);
    }
    if (!window.google || !window.google.maps) {
        console.error("Google Maps API not loaded");
        return null;
    }
    const geocoder = new window.google.maps.Geocoder();
    try {
        const results = await geocoder.geocode({ address });
        if (results.results[0]) {
            const location = {
                lat: results.results[0].geometry.location.lat(),
                lng: results.results[0].geometry.location.lng(),
            };
            geocodeCache.set(address, location);
            return location;
        }
    } catch (e) {
        console.error(`Geocode was not successful for the following reason: ${e}`);
    }
    return null;
  }, []);

  React.useEffect(() => {
    if (isLoaded && classes.length > 0 && venues.length > 0) {
      setLoadingGeocodes(true);
      const uniqueVenueIds = [...new Set(classes.map(c => c.venueId))];
      const newGeocodes: Record<string, { lat: number; lng: number }> = {};
      
      const geocodePromises = uniqueVenueIds.map(async (venueId) => {
        const venue = venues.find(v => v.id === venueId);
        if (venue && !geocodedVenues[venueId] && !geocodeCache.has(venue.address)) {
          const fullAddress = `${venue.address}, ${venue.commune}, Chile`;
          const location = await geocodeAddress(fullAddress);
          if (location) {
            newGeocodes[venueId] = location;
          }
        } else if (geocodeCache.has(venue?.address || '')) {
            newGeocodes[venueId] = geocodeCache.get(venue!.address)!;
        }
      });

      Promise.all(geocodePromises).then(() => {
        setGeocodedVenues(prev => ({...prev, ...newGeocodes}));
        setLoadingGeocodes(false);
      });
    }
  }, [isLoaded, classes, venues, geocodeAddress, geocodedVenues]);


  const markers = useMemo(() => {
    return classes
      .map(cls => {
        const location = geocodedVenues[cls.venueId];
        if (!location) return null;
        return {
          ...cls,
          position: location,
        };
      })
      .filter((m): m is Class & { position: { lat: number; lng: number } } => m !== null);
  }, [classes, geocodedVenues]);


  if (loadError) {
    return (
      <Card className="h-[600px] flex items-center justify-center bg-destructive/10 text-destructive">
        <div className="text-center">
          <h3 className="text-lg font-semibold">Error al cargar el mapa</h3>
          <p>La clave de API de Google Maps podría ser inválida o estar mal configurada.</p>
        </div>
      </Card>
    );
  }

  if (!isLoaded) {
    return (
      <Card className="h-[600px] flex items-center justify-center bg-muted">
        <Loader2 className="h-8 w-8 animate-spin" />
      </Card>
    );
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={defaultCenter}
      zoom={11}
    >
      {markers.map((marker) => (
        <Marker
          key={marker.id}
          position={marker.position}
          onClick={() => setSelectedClass(marker)}
        />
      ))}

      {selectedClass && geocodedVenues[selectedClass.venueId] && (
        <InfoWindow
          position={geocodedVenues[selectedClass.venueId]}
          onCloseClick={() => setSelectedClass(null)}
        >
          <div className="p-1 space-y-2 max-w-xs">
            <h4 className="font-bold text-base">{selectedClass.name}</h4>
            <p className="text-sm text-muted-foreground">{venues.find(v => v.id === selectedClass.venueId)?.name}</p>
            <Link href={`/search-classes/${selectedClass.id}`}>
              <Button size="sm">Ver Detalles</Button>
            </Link>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}
