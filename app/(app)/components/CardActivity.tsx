import {
    Bike,
    Footprints,
    WavesLadder,
    Mountain,
    Dumbbell,
} from "lucide-react"; // Assuming lucide-react for icons, install if needed
export const revalidate = 3600;

type ActivityType = {
    name: string;
    type: string;
    start_date_local: string;
    distance: number;
};

// Map activity types to icons
const getActivityIcon = (sportType: string) => {
    switch (sportType.toLowerCase()) {
        case "ride":
        case "ebikeride":
            return <Bike className="w-6 h-6 text-indigo-600" />;
        case "run":
        case "trailrun":
            return <Footprints className="w-6 h-6 text-indigo-600" />;
        case "swim":
            return <WavesLadder className="w-6 h-6 text-indigo-600" />;
        case "hike":
        case "walk":
            return <Mountain className="w-6 h-6 text-indigo-600" />;
        case "weighttraining":
        case "workout":
            return <Dumbbell className="w-6 h-6 text-indigo-600" />;
        default:
            return <Bike className="w-6 h-6 text-indigo-600" />; // Fallback icon
    }
};

const CardActivity = ({ activity }: { activity: ActivityType }) => (
    <div className="dark:bg-neutral-900 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6">
        <div className="flex items-center space-x-2 mb-4">
            {getActivityIcon(activity.type)}
            <h2 className="text-xl font-bold truncate">{activity.name}</h2>
        </div>
        <p className="text-sm">
            {new Date(activity.start_date_local).toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
                year: "numeric",
            })}
        </p>
    </div>
);

export default CardActivity;
