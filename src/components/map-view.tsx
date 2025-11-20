'use client';

import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { useState, useMemo } from 'react';
import { Card } from './ui/card';
import { Loader2 } from 'lucide-react';
import type { Class } from '@/lib/types';
import Link from 'next/link';
import { Button } from './ui/button';

interface MapViewProps {
  classes: Class[];
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

export default function MapView({ classes }: MapViewProps) {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  });

  const [selectedClass, setSelectedClass] = useState<Class | null>(null);

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
      zoom={12}
    >
      {/* Markers will be added here in the next step */}
    </GoogleMap>
  );
}
