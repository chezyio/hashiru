import { getActivity } from "../../lib/strava";
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
} from "lucide-react";
import ActivityMap from "../../components/ActivityMap";
import PhotoGrid from "../../components/PhotoGrid";

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

const Page = async (props: { params: Promise<{ id: number }> }) => {
    const params = await props.params;
    const activity = await getActivity(params.id);
    console.log(activity);

    const { id } = params;

    // Extract photos from activity
    const photos =
        activity.photos?.photos ||
        (activity.photos?.primary ? [activity.photos.primary] : []);

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

            {/* Stats Grid */}
            <section className="flex flex-col lg:flex-row justify-between py-12">
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
                    </div>
                </div>

                <div className="basis-2/3">
                    {photos.length > 0 && <PhotoGrid photos={photos} />}
                </div>
            </section>

            {/* Additional Info Section */}
            <section className="py-12">
                <h2 className="text-3xl font-bold mb-6">More Details</h2>
                <div className="space-y-4">
                    <p className="text-gray-700 dark:text-gray-300">
                        {activity.description || "No description provided."}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Device: {activity.device_name || "N/A"}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Gear:{" "}
                        {activity.gear_id
                            ? `Gear ID: ${activity.gear_id}`
                            : "N/A"}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Activity ID: {id}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Visibility: {activity.visibility}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Start Location:{" "}
                        {activity.start_latlng
                            ? `${activity.start_latlng[0].toFixed(
                                  4
                              )}, ${activity.start_latlng[1].toFixed(4)}`
                            : "N/A"}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        End Location:{" "}
                        {activity.end_latlng
                            ? `${activity.end_latlng[0].toFixed(
                                  4
                              )}, ${activity.end_latlng[1].toFixed(4)}`
                            : "N/A"}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Average Speed: {formatSpeed(activity.average_speed)}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Max Speed: {formatSpeed(activity.max_speed)}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Workout Type: {activity.workout_type || "N/A"}
                    </p>
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
