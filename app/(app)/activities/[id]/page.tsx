import { getActivity, getActivityStreams } from "../../lib/strava";
import {
    MapPin,
    Clock,
    ArrowUp,
    Heart,
    Flame,
    Trophy,
    ThumbsUp,
    MessageSquare,
    Bike,
    Smartphone,
    Wrench,
    Gauge,
} from "lucide-react";
import ActivityMap from "../../components/ActivityMap";
import PhotoGrid from "../../components/PhotoGrid";
import ActivityCharts from "../../components/ActivityCharts";

// Utility functions for formatting
const formatDistance = (meters: number) => `${(meters / 1000).toFixed(2)} km`;
const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours ? `${hours}h ` : ""}${mins}m ${secs}s`;
};
const formatSpeed = (mps: number) => `${(mps * 3.6).toFixed(1)} km/h`;
const formatElevation = (meters: number) => `${meters.toFixed(0)} m`;
const formatHeartrate = (bpm: number) => `${bpm.toFixed(0)} bpm`;
const formatCalories = (cal: number) => `${cal.toFixed(0)} kcal`;

// Calculate splits for pace, heart rate, and elevation
const calculateSplits = (streams: any, totalDistance: number) => {
    const velocity = streams.velocity_smooth?.data || [];
    const heartrate = streams.heartrate?.data || [];
    const altitude = streams.altitude?.data || [];
    const distance = streams.distance?.data || [];
    const time = streams.time?.data || [];

    if (!velocity.length || !distance.length || !time.length) return [];

    const splits: {
        km: number;
        pace: number;
        heartrate: number;
        elevation: number;
    }[] = [];
    let currentKm = 1;
    let startIndex = 0;
    let totalDistanceCovered = 0;

    for (let i = 1; i < distance.length; i++) {
        totalDistanceCovered = distance[i];
        if (totalDistanceCovered >= currentKm * 1000) {
            const splitTime = time[i] - time[startIndex];
            const splitDistance = distance[i] - distance[startIndex];
            const averageSpeed =
                velocity
                    .slice(startIndex, i + 1)
                    .reduce((sum: number, v: number) => sum + v, 0) /
                (i - startIndex + 1);
            const averageHeartrate = heartrate.length
                ? heartrate
                      .slice(startIndex, i + 1)
                      .reduce((sum: number, v: number) => sum + v, 0) /
                  (i - startIndex + 1)
                : 0;
            const averageElevation = altitude.length
                ? altitude
                      .slice(startIndex, i + 1)
                      .reduce((sum: number, v: number) => sum + v, 0) /
                  (i - startIndex + 1)
                : 0;
            const pace = averageSpeed > 0 ? 60 / (averageSpeed * 3.6) : 0; // min/km
            splits.push({
                km: currentKm,
                pace: pace > 0 && pace < 20 ? pace : 0, // Cap pace at 20 min/km
                heartrate: averageHeartrate > 0 ? averageHeartrate : 0,
                elevation: averageElevation,
            });
            startIndex = i;
            currentKm++;
        }
    }

    // Handle final partial split
    if (totalDistanceCovered > (currentKm - 1) * 1000) {
        const splitTime = time[time.length - 1] - time[startIndex];
        const splitDistance =
            distance[distance.length - 1] - distance[startIndex];
        const averageSpeed =
            velocity
                .slice(startIndex)
                .reduce((sum: number, v: number) => sum + v, 0) /
            (velocity.length - startIndex);
        const averageHeartrate = heartrate.length
            ? heartrate
                  .slice(startIndex)
                  .reduce((sum: number, v: number) => sum + v, 0) /
              (heartrate.length - startIndex)
            : 0;
        const averageElevation = altitude.length
            ? altitude
                  .slice(startIndex)
                  .reduce((sum: number, v: number) => sum + v, 0) /
              (altitude.length - startIndex)
            : 0;
        const pace = averageSpeed > 0 ? 60 / (averageSpeed * 3.6) : 0;
        splits.push({
            km: currentKm,
            pace: pace > 0 && pace < 20 ? pace : 0,
            heartrate: averageHeartrate > 0 ? averageHeartrate : 0,
            elevation: averageElevation,
        });
    }

    return splits;
};

const Page = async (props: { params: Promise<{ id: number }> }) => {
    const params = await props.params;
    const activity = await getActivity(params.id);
    const streams = await getActivityStreams(params.id);
    console.log({ activity, streams });

    const { id } = params;

    // Extract photos from activity
    const photos =
        activity.photos?.photos ||
        (activity.photos?.primary ? [activity.photos.primary] : []);

    // Calculate splits
    const splits = calculateSplits(streams, activity.distance);

    return (
        <div className="container mx-auto min-h-screen transition-colors duration-200">
            {/* Hero Section */}
            <header className="py-12">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                    {activity.name}
                </h1>
                <p className="mt-2 text-sm md:text-lg text-gray-600 dark:text-gray-300">
                    {new Date(activity.start_date).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                    &nbsp;•&nbsp;
                    {new Date(activity.start_date).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </p>
                <p className="mt-2 text-base md:text-lg text-gray-700 dark:text-gray-200">
                    {activity.description || "No description provided."}
                </p>
                <div className="mt-4 flex items-center space-x-4">
                    <Bike className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                    <span className="font-medium">
                        {activity.sport_type || activity.type}
                    </span>
                </div>
            </header>

            {/* Map Section */}
            <section className="py-12">
                <ActivityMap polyline={activity.map?.summary_polyline || ""} />
            </section>

            {/* Stats and Charts Section */}
            <section className="flex flex-col lg:flex-row justify-between py-12 gap-8">
                <div className="basis-1/3">
                    <h2 className="text-3xl font-bold mb-6">Activity Stats</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <StatCard
                            icon={
                                <MapPin className="w-6 h-6 text-blue-500 dark:text-blue-400" />
                            }
                            label="Distance"
                            value={formatDistance(activity.distance)}
                        />
                        <StatCard
                            icon={
                                <Clock className="w-6 h-6 text-green-500 dark:text-green-400" />
                            }
                            label="Moving Time"
                            value={formatTime(activity.moving_time)}
                        />
                        <StatCard
                            icon={
                                <Clock className="w-6 h-6 text-green-500 dark:text-green-400" />
                            }
                            label="Elapsed Time"
                            value={formatTime(activity.elapsed_time)}
                        />
                        <StatCard
                            icon={
                                <ArrowUp className="w-6 h-6 text-red-500 dark:text-red-400" />
                            }
                            label="Elevation Gain"
                            value={formatElevation(
                                activity.total_elevation_gain
                            )}
                        />
                        <StatCard
                            icon={
                                <ArrowUp className="w-6 h-6 text-red-500 dark:text-red-400" />
                            }
                            label="Max Elevation"
                            value={formatElevation(activity.elev_high)}
                        />
                        <StatCard
                            icon={
                                <ArrowUp className="w-6 h-6 text-red-500 dark:text-red-400" />
                            }
                            label="Min Elevation"
                            value={formatElevation(activity.elev_low)}
                        />
                        <StatCard
                            icon={
                                <Heart className="w-6 h-6 text-pink-500 dark:text-pink-400" />
                            }
                            label="Avg Heartrate"
                            value={
                                activity.has_heartrate
                                    ? formatHeartrate(
                                          activity.average_heartrate
                                      )
                                    : "N/A"
                            }
                        />
                        <StatCard
                            icon={
                                <Heart className="w-6 h-6 text-pink-500 dark:text-pink-400" />
                            }
                            label="Max Heartrate"
                            value={
                                activity.has_heartrate
                                    ? formatHeartrate(activity.max_heartrate)
                                    : "N/A"
                            }
                        />
                        <StatCard
                            icon={
                                <Flame className="w-6 h-6 text-orange-500 dark:text-orange-400" />
                            }
                            label="Calories"
                            value={formatCalories(activity.calories)}
                        />
                        <StatCard
                            icon={
                                <Trophy className="w-6 h-6 text-yellow-500 dark:text-yellow-400" />
                            }
                            label="Achievements"
                            value={activity.achievement_count}
                        />
                        <StatCard
                            icon={
                                <ThumbsUp className="w-6 h-6 text-purple-500 dark:text-purple-400" />
                            }
                            label="Kudos"
                            value={activity.kudos_count}
                        />
                        <StatCard
                            icon={
                                <MessageSquare className="w-6 h-6 text-indigo-500 dark:text-indigo-400" />
                            }
                            label="Comments"
                            value={activity.comment_count}
                        />
                        <StatCard
                            icon={
                                <Smartphone className="w-6 h-6 text-teal-500 dark:text-teal-400" />
                            }
                            label="Device"
                            value={activity.device_name || "N/A"}
                        />
                        <StatCard
                            icon={
                                <Wrench className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                            }
                            label="Gear"
                            value={
                                activity.gear_id
                                    ? `ID: ${activity.gear_id}`
                                    : "N/A"
                            }
                        />
                        <StatCard
                            icon={
                                <Gauge className="w-6 h-6 text-cyan-500 dark:text-cyan-400" />
                            }
                            label="Avg Speed"
                            value={formatSpeed(activity.average_speed)}
                        />
                        <StatCard
                            icon={
                                <Gauge className="w-6 h-6 text-cyan-500 dark:text-cyan-400" />
                            }
                            label="Max Speed"
                            value={formatSpeed(activity.max_speed)}
                        />
                    </div>
                </div>

                <div className="basis-2/3">
                    <h2 className="text-3xl font-bold mb-6">
                        Activity Metrics
                    </h2>
                    {splits.length > 0 ? (
                        <ActivityCharts splits={splits} />
                    ) : (
                        <p className="text-gray-500 dark:text-gray-400">
                            No metric data available for this activity.
                        </p>
                    )}
                    {photos.length > 0 && <PhotoGrid photos={photos} />}
                </div>
            </section>
        </div>
    );
};

// Reusable StatCard component
const StatCard = ({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode;
    label: string;
    value: string | number;
}) => (
    <div className="p-4 rounded-lg">
        <div className="flex items-center space-x-2 mb-1">
            {icon}
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                {label}
            </p>
        </div>
        <p className="text-2xl font-bold">{value}</p>
    </div>
);

export default Page;
