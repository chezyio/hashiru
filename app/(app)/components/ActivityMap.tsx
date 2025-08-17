"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import polyline from "@mapbox/polyline";
import { useTheme } from "next-themes";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";

interface ActivityMapProps {
    polyline: string;
}

const ActivityMap: React.FC<ActivityMapProps> = ({
    polyline: encodedPolyline,
}) => {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const { theme, resolvedTheme } = useTheme();

    useEffect(() => {
        if (!mapContainer.current || !encodedPolyline) return;

        // Determine map style based on theme
        const mapStyle =
            (theme || resolvedTheme) === "dark"
                ? "mapbox://styles/mapbox/dark-v11"
                : "mapbox://styles/mapbox/streets-v12";

        // Initialize map only if not already initialized
        if (!map.current) {
            map.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: mapStyle,
                center: [103.755, 1.373],
                zoom: 12,
            });

            map.current.on("load", () => {
                const decodedCoords = polyline.decode(encodedPolyline);
                const coords = decodedCoords.map(
                    ([lat, lng]) => [lng, lat] as [number, number]
                );

                if (coords.length === 0) return;

                map.current!.addSource("route", {
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

                map.current!.addLayer({
                    id: "route",
                    type: "line",
                    source: "route",
                    layout: {
                        "line-join": "round",
                        "line-cap": "round",
                    },
                    paint: {
                        "line-color":
                            (theme || resolvedTheme) === "dark"
                                ? "#3b82f6"
                                : "#888", // Blue for dark mode, gray for light
                        "line-width": 8,
                    },
                });

                // Fit the map to the route bounds
                const bounds = new mapboxgl.LngLatBounds(coords[0], coords[0]);
                coords.forEach((coord) => bounds.extend(coord));
                map.current!.fitBounds(bounds, { padding: 50 });
            });
        } else {
            // Update map style if theme changes
            map.current.setStyle(mapStyle);
        }

        return () => {
            if (map.current) {
                map.current.remove();
                map.current = null;
            }
        };
    }, [encodedPolyline, theme, resolvedTheme]);

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
