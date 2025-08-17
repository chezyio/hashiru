"use client";

import { Card, CardContent } from "@/components/ui/card";

interface Photo {
    urls: { [key: string]: string };
}

interface PhotoGridProps {
    photos: Photo[];
}

const PhotoGrid: React.FC<PhotoGridProps> = ({ photos }) => {
    return (
        <section className="px-6 md:px-12">
            <h2 className="text-3xl font-bold mb-6">Photos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {photos.map((photo, index) => (
                    <Card key={index} className="overflow-hidden">
                        <CardContent className="p-0">
                            <img
                                src={
                                    photo.urls?.["600"] ||
                                    photo.urls?.["100"] ||
                                    "/placeholder.jpg"
                                }
                                alt={`Activity photo ${index + 1}`}
                                className="w-full h object-cover"
                                onError={(e) =>
                                    (e.currentTarget.src = "/placeholder.jpg")
                                } // Fallback image
                            />
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
};

export default PhotoGrid;
