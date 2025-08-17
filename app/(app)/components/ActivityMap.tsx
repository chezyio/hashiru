"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import polyline from "@mapbox/polyline";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";

interface ActivityMapProps {
    polyline: string;
}

const ActivityMap: React.FC<ActivityMapProps> = ({
    polyline: encodedPolyline,
}) => {
    const mapContainer = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mapContainer.current || !encodedPolyline) return;

        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/mapbox/streets-v12", // Use 'dark-v11' for dark mode if needed
            center: [0, 0],
            zoom: 2,
        });

        map.on("load", () => {
            const decodedCoords = polyline.decode(encodedPolyline);
            const coords = decodedCoords.map(
                ([lat, lng]) => [lng, lat] as [number, number]
            );

            if (coords.length === 0) return;

            map.addSource("route", {
                type: "geojson",
                data: {
                    type: "Feature",
                    properties: {},
                    geometry: {
                        type: "LineString",
                        coordinates: coords,
                    },
                },
            });

            map.addLayer({
                id: "route",
                type: "line",
                source: "route",
                layout: {
                    "line-join": "round",
                    "line-cap": "round",
                },
                paint: {
                    "line-color": "#888",
                    "line-width": 8,
                },
            });

            // Fit the map to the route bounds
            const bounds = new mapboxgl.LngLatBounds(coords[0], coords[0]);
            coords.forEach((coord) => bounds.extend(coord));
            map.fitBounds(bounds, { padding: 50 });
        });

        return () => map.remove();
    }, [encodedPolyline]);

    return (
        <div
            ref={mapContainer}
            className="h-80 md:h-96 rounded-xl overflow-hidden"
        >
            {!encodedPolyline && (
                <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
                    No route data available
                </div>
            )}
        </div>
    );
};

export default ActivityMap;
