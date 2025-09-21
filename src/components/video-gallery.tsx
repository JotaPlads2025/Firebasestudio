"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, Video } from 'lucide-react';

const MAX_VIDEOS = 5;

export default function VideoGallery() {
  const [videos, setVideos] = useState<string[]>([]);

  const handleUpload = () => {
    // Placeholder for future upload logic
    console.log("Upload video logic goes here");
  };

  const emptySlots = Array(MAX_VIDEOS - videos.length).fill(null);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {videos.map((videoSrc, index) => (
        <div key={index} className="aspect-video rounded-md overflow-hidden">
          <video src={videoSrc} controls className="w-full h-full object-cover" />
        </div>
      ))}
      {emptySlots.map((_, index) => (
        <Card
          key={`empty-${index}`}
          className="aspect-video flex flex-col items-center justify-center bg-muted/50 border-2 border-dashed"
        >
          <CardContent className="p-0 flex flex-col items-center justify-center gap-2">
            <Video className="h-8 w-8 text-muted-foreground" />
             <Button variant="ghost" size="sm" onClick={handleUpload}>
                <Upload className="mr-2 h-4 w-4" />
                Subir
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
